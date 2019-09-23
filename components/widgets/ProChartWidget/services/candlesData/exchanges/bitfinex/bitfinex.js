import { Subject, ReplaySubject } from 'rxjs';
import { map, multicast, takeUntil, filter } from 'rxjs/operators';
import pick from 'lodash/pick';
import {
  debugError,
  makeCandlesRestApiUrl,
  fetchCandles,
  updateCandles,
} from '../../utils';
import { ERROR, wsRootUrl, restRootUrl, timeFrames } from './const';
import {
  makeDataStream,
  addTradingPair,
  makeOptions,
  makeSubs,
  removeTradingPair,
  processStreamEvent,
} from './utils';

import { EXCHANGE_NAME } from '../../const';

const bitfinex = (function bitfinex() {
  let closeStream$ = new Subject();
  let candlesData = {};
  let pairs = {};
  let data$;
  let wsInstance$;
  let dataSource$;
  let ws;
  let options;
  let status = {
    isRunning: false,
    exchange: { name: EXCHANGE_NAME.BITFINEX },
    debug: false,
  };

  const resetConf = () => {
    closeStream$ = new Subject();
    pairs = {};
    candlesData = {};
    data$ = undefined;
    wsInstance$ = undefined;
    dataSource$ = undefined;
    ws = undefined;
    status = {
      ...status,
      isRunning: false,
    };
  };

  const setStatus = update => {
    status = { ...status, ...update };
  };

  return {
    start: (opts = { format: 'tradingview' }) => {
      if (status.isRunning) {
        return debugError(ERROR.SERVICE_IS_RUNNING, status.debug);
      }

      options = makeOptions(opts);
      if (Object.keys(pairs).length === 0) {
        return debugError(ERROR.NO_INIT_PAIRS_DEFINED, status.debug);
      }

      [wsInstance$, dataSource$] = makeDataStream(wsRootUrl, {
        initSubs: makeSubs(pairs),
        keepAlive: true,
      });

      wsInstance$.subscribe(instance => {
        ws = instance;
      });

      data$ = dataSource$.pipe(
        map(streamEvent => processStreamEvent(streamEvent)),
        filter(streamEvent => streamEvent),
        map(streamData => {
          candlesData = updateCandles(streamData, candlesData, options.format);
          return candlesData;
        }),
        takeUntil(closeStream$),
        multicast(() => new ReplaySubject(1))
      );
      data$.connect();
      setStatus({ isRunning: true });
      return status;
    },

    stop: () => {
      if (ws) {
        closeStream$.next();
        closeStream$.complete();
      }
      resetConf();
      setStatus({ isRunning: false });
    },

    fetchCandles: async (pair, timeFrame, start, end, limit) => {
      const makeCandlesUrlFn = (symbol, interval, startTime, endTime) =>
        makeCandlesRestApiUrl(status.exchange.name, restRootUrl, {
          symbol,
          interval,
          start: startTime,
          end: endTime,
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

bitfinex.options = {
  debug: false,
  timeFrames,
};

export default bitfinex;
