/* eslint-disable camelcase */
const TA = require('ta-api-node/src/ta');
const { defer, merge } = require('rxjs');
const { map, reduce } = require('rxjs/operators');
const moment = require('moment');

const { TOKENS_MINER_SUPPORT } = require('../../../constants/miners');
const makeBalanceSummary = require('../makeBalanceSummary');

const privateApi = TA({ apiKey: process.env.API_KEY });

const balanceHoursReq = (days, token, window) =>
  Object.keys(TOKENS_MINER_SUPPORT[token])
    .filter(miner => miner !== 'others' && miner !== 'unknown')
    .map(miner => {
      const now = moment(new Date());
      const thirtyDaysAgo = moment(new Date()).subtract(days, 'days');
      const params = {
        miner: encodeURIComponent(miner.toLocaleLowerCase()),
        token,
        window,
        format: 'json',
        from_date: thirtyDaysAgo.format('YYYY-MM-DD'),
        to_date: now.format('YYYY-MM-DD'),
      };
      return defer(() => privateApi.minerBalanceWindowHistorical(params));
    });

module.exports = (hours, token) =>
  merge(...balanceHoursReq(hours, token, '1h')).pipe(
    map(res => {
      if (res.status !== 200) {
        throw res;
      }
      return res.data;
    }),
    map(val => {
      return val.reduce((acc, point) => {
        return { ...acc, [point.hour]: point };
      }, {});
    }),
    reduce((acc, val) => {
      Object.values(val).forEach(point => {
        const { datetime, balance, balance_usd } = point;
        if (!acc[datetime]) {
          acc[datetime] = { datetime };
          acc[datetime].balance = 0;
          acc[datetime].balance_usd = 0;
        }
        acc[datetime] = {
          ...acc[datetime],
          balance: acc[datetime].balance + balance,
          balance_usd: acc[datetime].balance_usd + balance_usd,
        };
      });
      return acc;
    }, {}),
    map(val => {
      const dataPoints = Object.values(val);
      const data = dataPoints.map(point => {
        const { balance_usd } = point;
        return balance_usd;
      });

      return {
        data,
        summary: {
          '24h': makeBalanceSummary(24, dataPoints),
        },
      };
    })
  );
