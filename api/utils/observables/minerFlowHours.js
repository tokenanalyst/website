/* eslint-disable camelcase */
const TA = require('ta-api-node/src/ta');
const { defer, merge, forkJoin, of } = require('rxjs');
const {
  map,
  retryWhen,
  iif,
  concatMap,
  throwError,
  delay,
} = require('rxjs/operators');
const moment = require('moment');

const { TOKENS_MINER_SUPPORT } = require('../../../constants/miners');
const makeDateMap = require('./operators/makeDateMap');
const addSummary = require('./operators/addSummary');
const sumFlow = require('./operators/sumFlow');

const privateApi = TA({ apiKey: process.env.API_KEY, debug: false });

const flowReq = (days, token, direction, window) =>
  Object.keys(TOKENS_MINER_SUPPORT[token])
    .filter(miner => miner !== 'others' && miner !== 'unknown')
    .map(miner => {
      const now = moment(new Date());
      const thirtyDaysAgo = moment(new Date()).subtract(days, 'days');
      const params = {
        miner: encodeURIComponent(miner.toLocaleLowerCase()),
        token,
        direction,
        window,
        format: 'json',
        from_date: thirtyDaysAgo.format('YYYY-MM-DD'),
        to_date: now.format('YYYY-MM-DD'),
      };
      return defer(() => privateApi.minerFlowWindowHistorical(params)).pipe(
        retryWhen(errors =>
          errors.pipe(
            concatMap((e, i) =>
              iif(() => i > 5, throwError(e), of(e).pipe(delay(500)))
            )
          )
        )
      );
    });

const flow = (days, token, direction, summary) =>
  merge(...flowReq(days, token, direction, '1h')).pipe(
    makeDateMap(24),
    sumFlow(direction),
    addSummary(direction, summary, 'hour')
  );

module.exports = (days, token, summary = [24]) =>
  forkJoin(
    flow(
      days,
      token,
      'inflow',
      summary
    ),
    flow(
      days,
      token,
      'outflow',
      summary
    )
  ).pipe(
    map(val => {
      const [inflow, outflow] = val;
      return {
        ...inflow,
        ...outflow,
      };
    })
  );
