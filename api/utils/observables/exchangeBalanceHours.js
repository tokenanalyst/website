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

const privateApi = TA({ apiKey: process.env.API_KEY });
const makeDateMap = require('./operators/makeDateMap');
const sumFlow = require('./operators/sumFlow');

const balanceHoursReq = (days, token, window) =>
  Object.keys(TOKENS_EXCHANGE_SUPPORT[token]).map(exchange => {
    // exchange_balance_window_historical/last?key=API_KEY&limit=2&format=json&exchange=binance&token=btc&window=1h
    const now = moment(new Date());
    const thirtyDaysAgo = moment(new Date()).subtract(days, 'days');
    const params = {
      exchange: exchange.toLocaleLowerCase(),
      token,
      window,
      format: 'json',
      from_hour: thirtyDaysAgo.format('YYYY-MM-DD'),
      to_hour: now.format('YYYY-MM-DD'),
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

export const exchangeBalanceHours$ = (hours, token) =>
  merge(...balanceHoursReq(hours, token, '1h')).pipe(
    makeDateMap(24),
    sumFlow('balance'),
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
