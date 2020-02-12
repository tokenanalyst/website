import moment from 'moment';
import { BTC_STUDIES, BTC_SYMBOLS } from './studies/btc';
import { ETH_STUDIES, ETH_SYMBOLS } from './studies/eth';
import { ERC20_STUDIES, ERC20_SYMBOLS } from './studies/erc20';
import { COMMON_STUDIES, COMMON_SYMBOLS } from './studies/common';

const formatDate = epoch => moment(epoch).format('DD/MM/YYYY, HH:mm:ss');

const metricsStudiesData = (ta, TAsymbol) =>
  [...BTC_STUDIES, ...ETH_STUDIES, ...COMMON_STUDIES, ...ERC20_STUDIES].reduce(
    (acc, curr) => ({
      ...acc,
      [curr.symbol]: async (from, to, resolution) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `Requesting bars from ${formatDate(from * 1000)} to ${formatDate(
              to * 1000
            )} for ${curr.symbol} and datapoint ${curr.dataPoint}`
          );
        }
        const flow = await ta.fetchSingleMetricProxy(
          TAsymbol,
          resolution,
          from * 1000,
          to * 1000,
          curr.urlSlug,
          curr.dataPoint
        );

        if (!flow.length) {
          return [];
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(
            `Received bars from ${formatDate(flow[0].time)} to ${formatDate(
              flow[flow.length - 1].time
            )} for ${curr.symbol} and datapoint ${curr.dataPoint}`
          );
        }

        return flow;
      },
    }),
    {}
  );

const metricsStudiesSymbols = exchangeName =>
  [...BTC_SYMBOLS, ...ETH_SYMBOLS, ...COMMON_SYMBOLS, ...ERC20_SYMBOLS].reduce(
    (acc, curr) => ({
      ...acc,
      [curr.symbol]: () => {
        const symbolStub = {
          data_status: 'streaming',
          description: '',
          exchange: exchangeName,
          has_intraday: false,
          minmov: 1,
          name: curr.symbol,
          pricescale: 100000000,
          session: '24x7',
          supported_resolutions: ['60', '1D'],
          ticker: curr.symbol,
          timezone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
          type: 'crypto',
          volume_precision: 1,
          has_empty_bars: true,
        };

        return symbolStub;
      },
    }),
    {}
  );

export const makeStudiesCb = (ta, exchangeName, TAsymbol) => ({
  getData: {
    '#FLOWS': async (from, to, resolution) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Requesting bars from ${formatDate(from * 1000)} to ${formatDate(
            to * 1000
          )} for #FLOWS`
        );
      }

      const flow = await ta.fetchFromTAProxy(
        exchangeName,
        TAsymbol,
        resolution,
        from * 1000,
        to * 1000
      );

      if (!flow.length) {
        return [];
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Received bars from ${formatDate(flow[0].time)} to ${formatDate(
            flow[flow.length - 1].time
          )} for #FLOWS`
        );
      }

      return flow;
    },
    ...metricsStudiesData(ta, TAsymbol),
  },
  getSymbol: {
    '#FLOWS': () => {
      const symbolStub = {
        data_status: 'streaming',
        description: '',
        exchange: exchangeName,
        has_intraday: false,
        minmov: 1,
        name: '#FLOWS',
        pricescale: 100000000,
        session: '24x7',
        supported_resolutions: ['60', '1D'],
        ticker: '#FLOWS',
        timezone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        type: 'crypto',
        volume_precision: 1,
        has_empty_bars: true,
      };

      return symbolStub;
    },
    ...metricsStudiesSymbols(exchangeName),
  },
});
