import { Subject, ReplaySubject } from 'rxjs';
import { map, multicast, takeUntil, tap, repeatWhen } from 'rxjs/operators';
import pick from 'lodash/pick';
import {
  debugError,
  makeCandlesWsApiUrl,
  makeCandlesRestApiUrl,
  fetchCandles,
  updateCandles,
} from '../../utils';
import { ERROR, wsRootUrl, restRootUrl, timeFrames } from './const';
import {
  addTradingPair,
  makeOptions,
  removeTradingPair,
  processStreamEvent,
  makeDataStream,
  addChannelToCandlesData,
} from './utils';
import { EXCHANGE_NAME } from '../../const';

const binance = (function binance() {
  let closeStream$ = new Subject();
  let isConnectionAlive$ = new Subject();
  let addTradingPairToStream$ = new Subject();
  let candlesData = {};
  let pairs = {};
  let data$;
  let wsInstance$;
  let dataSource$;
  let ws;
  let options;
  let status = {
    isRunning: false,
    exchange: { name: EXCHANGE_NAME.BINANCE },
    debug: false,
  };

  const resetConf = () => {
    closeStream$ = new Subject();
    isConnectionAlive$ = new Subject();
    addTradingPairToStream$ = new Subject();
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

      const wsUrl = () =>
        makeCandlesWsApiUrl(status.exchange.name, wsRootUrl, pairs);
      [wsInstance$, dataSource$] = makeDataStream(wsUrl);

      wsInstance$.subscribe(instance => {
        ws = instance;
      });

      data$ = dataSource$.pipe(
        tap(() => {
          isConnectionAlive$.next(true);
        }),
        map(streamEvent => processStreamEvent(streamEvent)),
        map(streamData => {
          candlesData = addChannelToCandlesData(candlesData, streamData);
          return streamData;
        }),
        map(streamData => {
          candlesData = updateCandles(streamData, candlesData, options.format);
          return candlesData;
        }),
        takeUntil(closeStream$),
        repeatWhen(() => addTradingPairToStream$),
        multicast(() => new ReplaySubject(1))
      );
      data$.connect();
      setStatus({ isRunning: true });
      return status;
    },

    stop: (reset = true) => {
      closeStream$.next();
      closeStream$.complete();
      if (reset) {
        resetConf();
      }
      setStatus({ isRunning: false });
    },

    fetchCandles: async (pair, timeFrame, start, end, limit) => {
      const makeCandlesUrlFn = (symbol, interval, startTime, endTime) =>
        makeCandlesRestApiUrl(status.exchange.name, restRootUrl, {
          symbol,
          interval,
          startTime,
          endTime,
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

    addTradingPair(pair, conf) {
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

      pairs = addTradingPair(pairs, channel, config);

      if (status.isRunning) {
        closeStream$.next();
        addTradingPairToStream$.next();
      }

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

binance.options = {
  debug: false,
  timeFrames,
};

export default binance;
