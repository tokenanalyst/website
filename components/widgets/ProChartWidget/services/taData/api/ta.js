import pick from 'lodash/pick';
import merge from 'lodash/merge';
import { map, filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import moment from 'moment';
import { fetchDataFromApi$ } from '../lib/observables';
import { ETH, BTC, USDT_OMNI } from './const';

const ta = (function ta() {
  let tradingPair;

  let api;

  const formatDate = (item, itemKeys) => {
    let timePoint = item;

    if (item.hour) {
      timePoint = { ...item, date: `${item.date} ${item.hour}` };
    }
    return pick(timePoint, itemKeys);
  };

  return {
    fetchFromTAProxy: async (exchange, symbol, timeFrame, start, end) => {
      const startDate = moment(start).format('YYYY-MM-DD');
      const endDate = moment(end).format('YYYY-MM-DD');
      let window;

      window = timeFrame;

      if (timeFrame === 'D') {
        window = '1d';
      }

      if (timeFrame === '60') {
        window = '1h';
      }

      const flowsApiCall = async () =>
        api.exchangeMetrics({
          token: symbol.toUpperCase(),
          exchange: exchange.toLowerCase(),
          timeWindow: window,
          from_date: startDate,
          to_date: endDate,
        });

      const flowsData = async () =>
        fetchDataFromApi$(flowsApiCall)
          .pipe(
            map(response => response.data.ta_response),
            // map(flows =>{
            //   console.log(flows)
            //   return flows
            // }),
            map(flows => {
              const inFlow = flows.inflow.map(entry => {
                const inFlowEntry = formatDate(entry, [
                  'date',
                  'inflow',
                  'inflow_usd',
                  'avg_txn_value_usd',
                ]);
                inFlowEntry.inflow_avg_txn_value_usd =
                  inFlowEntry.avg_txn_value_usd;
                return inFlowEntry;
              });
              const outFlow = flows.outflow.map(entry => {
                const outFlowEntry = formatDate(entry, [
                  'date',
                  'outflow',
                  'outflow_usd',
                  'avg_txn_value_usd',
                ]);
                outFlowEntry.outflow_avg_txn_value_usd =
                  outFlowEntry.avg_txn_value_usd;
                return outFlowEntry;
              });
              const netFlow = flows.netflow.map(entry => {
                return formatDate(entry, ['date', 'value_usd']);
              });
              const allFlows = merge(inFlow, outFlow, netFlow);
              return merge(allFlows);
            }),
            map(flows => {
              const flowsData = flows
                .map(item => {
                  const {
                    date,
                    inflow_usd,
                    outflow_usd,
                    inflow_avg_txn_value_usd,
                    outflow_avg_txn_value_usd,
                    value_usd,
                  } = item;
                  const time = moment.utc(date).valueOf();

                  return {
                    time,
                    open: Number(inflow_usd),
                    close: Number(outflow_usd),
                    high: Number(inflow_avg_txn_value_usd),
                    low: Number(outflow_avg_txn_value_usd),
                    volume: Number(value_usd),
                  };
                })
                .filter(item => item.time > start && item.time < end);

              return flowsData;
            })
          )
          .toPromise();

      return flowsData();
    },

    fetchExchangeFlow: async (exchange, symbol, timeFrame, start, end) => {
      const startDate = moment(start).format('YYYY-MM-DD');
      const endDate = moment(end).format('YYYY-MM-DD');

      let window;

      window = timeFrame;

      if (timeFrame === 'D') {
        window = '1d';
      }

      if (timeFrame === '60') {
        window = '1h';
      }

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
          fetchDataFromApi$(inFlowCall).pipe(
            map(flows => {
              return flows.data.map(entry => {
                return formatDate(entry, ['date', 'inflow', 'inflow_usd']);
              });
            })
          ),
          fetchDataFromApi$(outFlowCall).pipe(
            map(flows => {
              return flows.data.map(entry => {
                return formatDate(entry, ['date', 'outflow', 'outflow_usd']);
              });
            })
          )
        )
          .pipe(
            map(flows => {
              const allFlows = merge(flows[0], flows[1]);
              return allFlows;
            }),
            map(flows => {
              return flows
                .map(item => {
                  const {
                    date,
                    inflow,
                    outflow,
                    inflow_usd,
                    outflow_usd,
                  } = item;
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
                })
                .filter(item => item.time > start && item.time < end);
            })
          )
          .toPromise();

      return flowsData();
    },

    setTradingPair: tp => {
      tradingPair = tp;
    },

    getTradingPair: () => tradingPair,

    setApi: taInstance => {
      api = taInstance;
    },
  };
})();

export default ta;
