import pick from 'lodash/pick';
import merge from 'lodash/merge';
import { map, filter, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import moment from 'moment';
import { fetchDataFromApi$ } from '../lib/observables';
import { ETH, BTC, USDT_OMNI } from './const';

const ta = (function ta() {
  let tokenMetrics;

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
              const netFlow = flows.netflow
                .filter(value => value) // Hack to fix data as the private API may return a different number of items for inflow and outflow, even if from and to date a set
                .map(entry => {
                  return formatDate(entry, ['date', 'value']);
                });

              const allFlows = merge(inFlow, outFlow, netFlow);
              return merge(allFlows);
            }),
            map(flows => {
              const flowsData = flows
                .map(item => {
                  const {
                    date,
                    inflow,
                    outflow,
                    inflow_avg_txn_value_usd,
                    outflow_avg_txn_value_usd,
                    value,
                  } = item;
                  const time = moment.utc(date).valueOf();

                  return {
                    time,
                    open: Number(inflow),
                    close: Number(outflow),
                    high: Number(inflow_avg_txn_value_usd),
                    low: Number(outflow_avg_txn_value_usd),
                    volume: Number(value),
                  };
                })
                .filter(item => item.time > start && item.time < end);

              return flowsData;
            })
          )
          .toPromise();

      return flowsData();
    },
    fetchSingleMetricProxy: async (symbol, timeFrame, start, end, metric) => {
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

      const apiCall = async () =>
        api.singleMetric({
          token: symbol.toUpperCase(),
          window,
          from_date: startDate,
          to_date: endDate,
          metric,
        });

      const transactionsData = async () =>
        fetchDataFromApi$(apiCall)
          .pipe(
            map(response => response.data),
            map(data => {
              const transactions = data.map(entry => {
                return formatDate(entry, ['date', 'number_of_txns']);
              });

              return transactions;
            }),
            map(flows => {
              const flowsData = flows
                .map(item => {
                  const { date, number_of_txns } = item;
                  const time = moment.utc(date).valueOf();

                  return {
                    time,
                    open: Number(number_of_txns),
                    close: null,
                    high: null,
                    low: null,
                    volume: null,
                  };
                })
                .filter(item => item.time > start && item.time < end);

              return flowsData;
            })
          )
          .toPromise();

      return transactionsData();
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

    setToken: tp => {
      tokenMetrics = tp;
    },

    getToken: () => tokenMetrics,

    setApi: taInstance => {
      api = taInstance;
    },
  };
})();

export default ta;
