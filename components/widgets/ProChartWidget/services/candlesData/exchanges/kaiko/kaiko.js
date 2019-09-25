import moment from 'moment';
import { debugError, makeCandlesRestApiUrl, fetchCandles } from '../../utils';
import {
  ERROR,
  restRootUrl,
  restRootUrlTAProxy,
  timeFrames,
  KAIKO_EXCHANGES,
  KAIKO_EXCHANGES_MAP,
} from './const';
import { addTradingPair, makeOptions, removeTradingPair } from './utils';

import { EXCHANGE_NAME } from '../../const';

const kaiko = (function kaiko() {
  let candlesData = {};
  let pairs = {};
  let ws;
  let options;
  const status = {
    isRunning: false,
    exchange: { name: EXCHANGE_NAME.KAIKO },
    debug: false,
  };

  const supportedExchanges = () =>
    KAIKO_EXCHANGES.map(item => item.name.toLowerCase());

  status.supportedExchanges = supportedExchanges();

  const DEFAULT_OPTIONS = { format: 'tradingview', apiLimit: 100 };

  return {
    start: (opts = {}) => {
      options = makeOptions({ ...DEFAULT_OPTIONS, ...opts });
    },

    fetchCandles: async (pair, timeFrame, start, end, limit, exchangeName) => {
      if (!KAIKO_EXCHANGES_MAP[exchangeName.toLowerCase()]) {
        return debugError(ERROR.EXCHANGE_NOT_SUPPORTED, status.debug);
      }

      const threeDaysAgo = moment()
        .subtract(3, 'days')
        .valueOf();

      console.log(end, threeDaysAgo);

      if (end < threeDaysAgo) {
        return [];
      }

      const makeCandlesUrlFn = (symbol, interval, startTime, endTime) =>
        makeCandlesRestApiUrl(status.exchange.name, restRootUrlTAProxy, {
          instrument: `${pair[0].toLowerCase()}-${pair[1].toLowerCase()}`,
          instrument_class: 'spot',
          interval: interval.toLowerCase(),
          start_time: moment(startTime).toISOString(),
          end_time: moment(endTime).toISOString(),
          exchange: KAIKO_EXCHANGES_MAP[exchangeName.toLowerCase()].code,
          commodity: 'trades',
        });

      return fetchCandles(pair, timeFrame, start, end, limit, {
        status,
        options,
        makeCandlesUrlFn,
      });
    },

    getPairs: () => pairs,

    getStatus: () => status,

    setDebug: (isDebug = false) => {
      status.debug = isDebug;
    },

    addTradingPair: (pair, conf) => {
      if (!conf) {
        return debugError(ERROR.NO_CONFIGURATION_PROVIDED, status.debug);
      }
      if (conf && !conf.timeFrame) {
        return debugError(ERROR.NO_TIME_FRAME_PROVIDED, status.debug);
      }
      if (!Array.isArray(pair)) {
        return debugError(ERROR.PAIR_IS_NOT_ARRAY, status.debug);
      }
      const ticker = `${pair[0]}${pair[1]}`;
      const channel = `${conf.timeFrame}:${ticker}`;
      const config = { ...conf, symbols: [...pair], ticker };

      if (pairs[channel]) {
        return debugError(ERROR.PAIR_ALREADY_DEFINED, status.debug);
      }

      pairs = addTradingPair(ws, pairs, channel, config);

      return pairs;
    },

    removeTradingPair: (pair, timeFrame) => {
      if (!Array.isArray(pair)) {
        return debugError(ERROR.PAIR_IS_NOT_ARRAY, status.debug);
      }

      if (!timeFrame) {
        return debugError(ERROR.NO_TIME_FRAME_PROVIDED, status.debug);
      }

      const channel = `${timeFrame}:${pair[0]}${pair[1]}`;

      if (!pairs[channel]) {
        return debugError(ERROR.PAIR_NOT_DEFINED, status.debug);
      }

      [pairs, candlesData] = removeTradingPair(ws, pairs, channel, candlesData);

      return pairs;
    },
  };
})();

kaiko.options = {
  timeFrames,
};

export default kaiko;
