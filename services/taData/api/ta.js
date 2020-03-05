/* eslint-disable camelcase */
import merge from 'lodash/merge';
import { map, catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import moment from 'moment';
import { fetchDataFromApi$ } from '../lib/observables';
import { fetchFlows, formatDate } from '../lib';
import { ETH, BTC, USDT_OMNI, EXCHANGE } from './const';

const ta = (function ta() {
  let tokenMetrics;

  let taApi;

  return {
    flowsFor: entityType => ({
      fetch: (entity, symbol, timeFrame, start, end) => {
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

        const flowsApiCall =
          entityType === EXCHANGE
            ? async () =>
                taApi.exchangeFlows({
                  token: symbol.toUpperCase(),
                  exchange: entity.toLowerCase(),
                  timeWindow: window,
                  from_date: startDate,
                  to_date: endDate,
                })
            : async () =>
                taApi.minerFlows({
                  token: symbol.toUpperCase(),
                  miner: entity.toLowerCase(),
                  timeWindow: window,
                  from_date: startDate,
                  to_date: endDate,
                });

        return fetchFlows(flowsApiCall, start, end);
      },
    }),

    fetchSingleMetricProxy: async (
      symbol,
      timeFrame,
      start,
      end,
      metric,
      dataPoint,
      optParams = {}
    ) => {
      const startDate = moment(start).format('YYYY-MM-DD');
      const endDate = moment(end).format('YYYY-MM-DD');
      let timeWindow;

      timeWindow = timeFrame;

      if (timeFrame === 'D') {
        timeWindow = '1d';
      }

      if (timeFrame === '60') {
        timeWindow = '1h';
      }

      const apiCall = async () =>
        taApi.singleMetric({
          token: symbol.toUpperCase(),
          window: timeWindow,
          from_date: startDate,
          to_date: endDate,
          metric,
          ...optParams,
        });

      const transactionsData = async () =>
        fetchDataFromApi$(apiCall)
          .pipe(
            map(response => response.data),
            map(data => {
              const transactions = data.map(entry => {
                return formatDate(entry, ['date', dataPoint]);
              });

              return transactions;
            }),
            map(data => {
              const metricData = data
                .map(item => {
                  const { date } = item;
                  const time = moment.utc(date).valueOf();

                  return {
                    time,
                    open: Number(item[dataPoint]),
                    close: null,
                    high: null,
                    low: null,
                    volume: null,
                  };
                })
                .filter(item => item.time > start && item.time < end);

              return metricData;
            }),
            catchError(() => of([]))
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
          const result = await taApi.exchangeFlowWindowHistorical({
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

        return taApi.erc20ExchangesFlowWindowHistorical({
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
            }),
            catchError(() => of([]))
          )
          .toPromise();

      return flowsData();
    },

    setToken: tp => {
      tokenMetrics = tp;
    },

    getToken: () => tokenMetrics,

    setApi: taInstance => {
      taApi = taInstance;
    },
  };
})();

export default ta;
