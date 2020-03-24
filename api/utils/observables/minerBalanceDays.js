/* eslint-disable camelcase */
const TA = require('ta-api-node/src/ta');
const { defer, merge } = require('rxjs');
const { map, reduce } = require('rxjs/operators');
const moment = require('moment');

const { TOKENS_MINER_SUPPORT } = require('../../../constants/miners');
const makeBalanceSummary = require('../makeBalanceSummary');

const privateApi = TA({ apiKey: process.env.API_KEY });

const balanceDaysReq = (days, token) =>
  Object.keys(TOKENS_MINER_SUPPORT[token])
    .filter(miner => miner !== 'others' && miner !== 'unknown')
    .map(miner => {
      const now = moment(new Date());
      const thirtyDaysAgo = moment(new Date()).subtract(days, 'days');
      const params = {
        miner: encodeURIComponent(miner.toLocaleLowerCase()),
        token,
        window: '1d',
        format: 'json',
        from_date: thirtyDaysAgo.format('YYYY-MM-DD'),
        to_date: now.format('YYYY-MM-DD'),
      };
      return defer(() => privateApi.minerBalanceWindowHistorical(params));
    });

module.exports = (days, token, summary = [30, 7]) =>
  merge(...balanceDaysReq(days, token)).pipe(
    map(res => {
      if (res.status !== 200) {
        throw res;
      }
      return res.data;
    }),
    map(val => {
      return val.reduce((acc, point) => {
        return { ...acc, [point.date]: point };
      }, {});
    }),
    reduce((acc, val) => {
      Object.values(val).forEach(point => {
        const { date, balance, balance_usd } = point;
        if (!acc[date]) {
          acc[date] = { date };
          acc[date].balance = 0;
          acc[date].balance_usd = 0;
        }
        acc[date] = {
          ...acc[date],
          balance: acc[date].balance + balance,
          balance_usd: acc[date].balance_usd + balance_usd,
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

      const dataSummary = summary.reduce((acc, period) => {
        return {
          ...acc,
          [`${period}d`]: makeBalanceSummary(period, dataPoints),
        };
      }, {});

      return {
        data,
        summary: {
          ...dataSummary,
        },
      };
    })
  );
