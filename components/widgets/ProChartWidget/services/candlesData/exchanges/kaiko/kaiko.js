import { Subject, ReplaySubject } from 'rxjs';
import { map, multicast, takeUntil, filter } from 'rxjs/operators';
import pick from 'lodash/pick';
import moment from 'moment';
import {
  debugError,
  makeCandlesRestApiUrl,
  fetchCandles,
  updateCandles,
} from '../../utils';
import {
  ERROR,
  wsRootUrl,
  restRootUrl,
  timeFrames,
  KAIKO_EXCHANGES,
} from './const';
import {
  makeDataStream,
  addTradingPair,
  makeOptions,
  makeSubs,
  removeTradingPair,
  processStreamEvent,
} from './utils';

import { EXCHANGE_NAME } from '../../const';

const kaiko = (function kaiko() {
  const closeStream$ = new Subject();
  let candlesData = {};
  let pairs = {};
  let data$;
  let wsInstance$;
  let dataSource$;
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
    start: opts => {
      options = makeOptions({ ...DEFAULT_OPTIONS, ...opts });
    },

    fetchCandles: async (pair, timeFrame, start, end, limit) => {
      if (!options.apiKey) {
        return debugError(ERROR.API_KEY_NOT_PROVIDED, status.debug);
      }

      const makeCandlesUrlFn = (symbol, interval, startTime, endTime) =>
        makeCandlesRestApiUrl(status.exchange.name, restRootUrl, {
          symbol: `${pair[0].toLowerCase()}-${pair[1].toLowerCase()}`,
          interval: interval.toLowerCase(),
          start_time: moment(startTime).toISOString(),
          end_time: moment(endTime).toISOString(),
          exchange: 'binance',
        });

      return fetchCandles(pair, timeFrame, start, end, limit, {
        status,
        options,
        makeCandlesUrlFn,
        requestOptions: {
          // mode: 'cors',
          headers: {
            'X-Api-Key': options.apiKey,
            Accept: 'application/json',
          },
        },
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

    data$: channels =>
      data$.pipe(
        map(data => {
          if (channels && channels.length) {
            const candles = pick(data, channels);
            return candles;
          }
          return data;
        })
      ),
  };
})();

kaiko.options = {
  timeFrames,
};

export default kaiko;
