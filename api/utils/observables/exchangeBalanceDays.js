/* eslint-disable camelcase */
const TA = require('ta-api-node');
const { defer, merge, of } = require('rxjs');
const {
  map,
  retryWhen,
  iif,
  concatMap,
  throwError,
  delay,
} = require('rxjs/operators');
const moment = require('moment');

const { TOKENS_EXCHANGE_SUPPORT } = require('../../../constants/exchanges');
const makeBalanceSummary = require('../makeBalanceSummary');
const makeDateMap = require('./operators/makeDateMap');
const sumFlow = require('./operators/sumFlow');

const privateApi = TA({ apiKey: process.env.API_KEY });

const balanceDaysReq = (days, token, window) =>
  Object.keys(TOKENS_EXCHANGE_SUPPORT[token]).map(exchange => {
    const now = moment(new Date());
    const thirtyDaysAgo = moment(new Date()).subtract(days, 'days');
    const params = {
      exchange: exchange.toLocaleLowerCase(),
      token,
      window,
      format: 'json',
      from_date: thirtyDaysAgo.format('YYYY-MM-DD'),
      to_date: now.format('YYYY-MM-DD'),
    };
    return defer(() => privateApi.exchangeBalanceWindowHistorical(params)).pipe(
      retryWhen(errors =>
        errors.pipe(
          concatMap((e, i) =>
            iif(() => i > 5, throwError(e), of(e).pipe(delay(500)))
          )
        )
      )
    );
  });

export const exchangeBalanceDays$ = (days, token, summary = [30, 7]) =>
  merge(...balanceDaysReq(days, token, '1d')).pipe(
    makeDateMap(),
    sumFlow('balance'),
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
