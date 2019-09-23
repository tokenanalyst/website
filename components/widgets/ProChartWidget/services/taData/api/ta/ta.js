import pick from 'lodash/pick';
import lodashMerge from 'lodash/merge';
import { map, reduce } from 'rxjs/operators';
import { forkJoin, concat } from 'rxjs';
import moment from 'moment';
import md5 from 'md5';
import { fetchDataFromApi$ } from '../../utils';
import { PROVIDER, ETH, BTC, USDT_OMNI } from '../../const';
import timePeriods from '../../utils/timePeriods';
import makeTimeChunks from '../../utils/makeTimeChunks';

let cache = {};

const ta = (function ta() {
  let options = {
    format: data => data,
  };
  const status = {
    isRunning: false,
    source: { name: PROVIDER.TOKEN_ANALYST },
    debug: false,
    tradingPair: [],
  };
  let api;

  return {
    fetchExchangeFlow: async (
      exchange,
      direction,
      symbol,
      timeFrame,
      start,
      end,
      limit
    ) => {
      const cachedHash = md5(exchange + symbol + timeFrame + start + end);

      if (cache[cachedHash]) {
        return cache[cachedHash];
      }

      const startDate = moment(start)
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
      const endDate = moment(end).format('YYYY-MM-DD');
      let window;

      window = timeFrame;

      if (timeFrame === 'D') {
        window = '1d';
      }

      if (timeFrame === '60') {
        window = '1h';
      }

      // const fetchFromTAChunk = async (flowDirection, fromDate, toDate) => {
      //   if ([ETH, BTC, USDT_OMNI].includes(symbol.toUpperCase())) {
      //     const result = await api.exchangeFlowWindowHistorical({
      //       format: "json",
      //       token: symbol.toLowerCase(),
      //       direction: flowDirection,
      //       exchange: exchange.toLowerCase(),
      //       window,
      //       from_date: moment(fromDate).format("YYYY-MM-DD"),
      //       to_date: moment(toDate).format("YYYY-MM-DD")
      //     });
      //     console.log(result);
      //     return result;
      //   }

      //   return api.erc20ExchangesFlowWindowHistorical({
      //     format: "json",
      //     token: symbol.toLowerCase(),
      //     direction: flowDirection,
      //     exchange: exchange.toLowerCase(),
      //     window,
      //     from_date: moment(fromDate).format("YYYY-MM-DD"),
      //     to_date: moment(toDate).format("YYYY-MM-DD")
      //   });
      // };

      // const apiLimit = 1000;

      // const timePeriod = timePeriods[window.slice(-1)];

      // const unixTimeFrame = moment
      //   .duration(Number(window.slice(0, window.length - 1)), timePeriod)
      //   .asMilliseconds();

      // const chunksSize = Math.ceil(apiLimit * unixTimeFrame);

      // const timeIntervalChunks = makeTimeChunks(start, end, chunksSize);

      // const inflowCallsArray = timeIntervalChunks.map(chunk => {
      //   try {
      //     return fetchFromTAChunk("inflow", chunk.fromTime, chunk.toTime);
      //   } catch (e) {
      //     console.lo(e);
      //   }
      // });

      // const outFlowCallsArray = timeIntervalChunks.map(chunk => {
      //   try {
      //     return fetchFromTAChunk("outflow", chunk.fromTime, chunk.toTime);
      //   } catch (e) {
      //     console.lo(e);
      //   }
      // });

      // const testChunk = async () =>
      //   concat(...inflowCallsArray)
      //     .pipe(
      //       reduce((acc, val) => [...acc, ...val], []),
      //       map(data => {
      //         const candles = data.map(candle => options.format(candle));
      //         // if (status.exchange.name.toLowerCase() === BITFINEX) {
      //         //   candles.sort((a, b) => new Date(a.time) - new Date(b.time));
      //         // }
      //         candles.sort((a, b) => new Date(a.time) - new Date(b.time));
      //         return candles;
      //       })
      //     )
      //     .toPromise();

      // const chunkResults = await testChunk();

      // console.log(chunkResults);

      const formatDate = (item, itemKeys) => {
        let timePoint = item;

        if (item.hour) {
          timePoint = { ...item, date: `${item.date} ${item.hour}` };
        }
        return pick(timePoint, itemKeys);
      };

      const fetchFromTA = async flowDirection => {
        if ([ETH, BTC, USDT_OMNI].includes(symbol.toUpperCase())) {
          const result = await api.exchangeFlowWindowHistorical({
            format: 'json',
            token: symbol.toLowerCase(),
            direction: flowDirection,
            exchange: exchange.toLowerCase(),
            window,
            from_date: startDate,
            to_date: endDate,
          });
          return result;
        }

        return api.erc20ExchangesFlowWindowHistorical({
          format: 'json',
          token: symbol.toLowerCase(),
          direction: flowDirection,
          exchange: exchange.toLowerCase(),
          window,
          from_date: startDate,
          to_date: endDate,
        });
      };

      const inFlowCall = async () => fetchFromTA('inflow');
      const outFlowCall = async () => fetchFromTA('outflow');

      const flowsData = async () =>
        forkJoin(
          fetchDataFromApi$(inFlowCall, {
            format: options.format,
          }).pipe(
            map(flows => {
              return flows.data.map(entry => {
                return formatDate(entry, ['date', 'inflow', 'inflow_usd']);
              });
            })
          ),
          fetchDataFromApi$(outFlowCall, {
            format: options.format,
          }).pipe(
            map(flows => {
              return flows.data.map(entry => {
                return formatDate(entry, ['date', 'outflow', 'outflow_usd']);
              });
            })
          )
        )
          .pipe(
            map(flows => {
              const allFlows = lodashMerge(flows[0], flows[1]);
              return allFlows;
            }),
            map(flows => {
              return flows.map(item => {
                const { date, inflow, outflow, inflow_usd, outflow_usd } = item;
                const time = moment.utc(date).valueOf();
                const netFlow = inflow - outflow;

                return {
                  time,
                  open: Number(inflow_usd),
                  close: Number(outflow_usd),
                  high: Number(inflow),
                  low: Number(outflow),
                  volume: Number(netFlow),
                };
              });
            })
          )
          .toPromise();

      const data = await flowsData();

      cache = { ...cache, [cachedHash]: {} };

      return data;
    },

    setDebug: (isDebug = false) => {
      status.debug = isDebug;
    },

    setOptions: apiOptions => {
      options = { ...options, ...apiOptions };
    },

    setTradingPair: tradingPair => {
      options.tradingPair = tradingPair;
    },

    getTradingPair: () => options.tradingPair,

    getStatus: () => options,

    setApi: taInstance => {
      api = taInstance;
    },
  };
})();

export default ta;
