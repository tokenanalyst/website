import pick from 'lodash/pick';
import merge from 'lodash/merge';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import moment from 'moment';
import { fetchDataFromApi$ } from '../lib/observables';
import { ETH, BTC, USDT_OMNI } from './const';

const ta = (function ta() {
  let tradingPair;

  let api;

  return {
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
