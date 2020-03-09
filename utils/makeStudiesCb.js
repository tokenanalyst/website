/* eslint-disable no-console */
import moment from 'moment';
import { BTC_STUDIES, BTC_SYMBOLS } from './studies/btc';
import { ETH_STUDIES, ETH_SYMBOLS } from './studies/eth';
import { ERC20_STUDIES, ERC20_SYMBOLS } from './studies/erc20';
import { COMMON_STUDIES, COMMON_SYMBOLS } from './studies/common';
import { MINER_STUDIES, MINER_SYMBOLS } from './studies/miner';
import { API_METRICS } from '../constants/apiMetrics';

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
        const data = await ta.fetchSingleMetricProxy(
          TAsymbol,
          resolution,
          from * 1000,
          to * 1000,
          curr.urlSlug,
          curr.dataPoint,
          {}
        );

        if (!data.length) {
          return [];
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(
            `Received bars from ${formatDate(data[0].time)} to ${formatDate(
              data[data.length - 1].time
            )} for ${curr.symbol} and datapoint ${curr.dataPoint}`
          );
        }

        return data;
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

const minerStudiesData = (ta, TAsymbol, minerName) =>
  MINER_STUDIES.reduce(
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

        const data = await ta.fetchSingleMetricProxy(
          TAsymbol,
          resolution,
          from * 1000,
          to * 1000,
          curr.urlSlug,
          curr.dataPoint,
          { miner: encodeURIComponent(minerName) }
        );

        if (!data.length) {
          return [];
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(
            `Received bars from ${formatDate(data[0].time)} to ${formatDate(
              data[data.length - 1].time
            )} for ${curr.symbol} and datapoint ${curr.dataPoint}`
          );
        }

        return data;
      },
    }),
    {}
  );

const minerStudiesSymbols = exchangeName =>
  MINER_SYMBOLS.reduce(
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

export const makeStudiesCb = (ta, exchangeName, minerName, TAsymbol) => ({
  getData: {
    ...metricsStudiesData(ta, TAsymbol, exchangeName),
    ...minerStudiesData(ta, TAsymbol, minerName),
    '#MINER_FLOWS': async (from, to, resolution) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Requesting bars from ${formatDate(from * 1000)} to ${formatDate(
            to * 1000
          )} for #MINER_FLOWS`
        );
      }

      const flow = await ta
        .flowsFor('miner')
        .fetch(
          encodeURIComponent(minerName),
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
          )} for #MINER_FLOWS`
        );
      }

      return flow;
    },
    '#EXCHANGE_FLOWS': async (from, to, resolution) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Requesting bars from ${formatDate(from * 1000)} to ${formatDate(
            to * 1000
          )} for #EXCHANGE_FLOWS`
        );
      }

      const flow = await ta
        .flowsFor('exchange')
        .fetch(
          encodeURIComponent(exchangeName),
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
          )} for #EXCHANGE_FLOWS`
        );
      }

      return flow;
    },
    '#EXCHANGE_BALANCES': async (from, to, resolution) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Requesting bars from ${formatDate(from * 1000)} to ${formatDate(
            to * 1000
          )} for #EXCHANGE_BALANCES`
        );
      }

      const data = await ta.fetchSingleMetricProxy(
        TAsymbol,
        resolution,
        from * 1000,
        to * 1000,
        API_METRICS.ExchangeBalance,
        'balance',
        { exchange: encodeURIComponent(exchangeName) }
      );

      if (!data.length) {
        return [];
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Received bars from ${formatDate(data[0].time)} to ${formatDate(
            data[data.length - 1].time
          )} for #EXCHANGE_BALANCES`
        );
      }

      return data;
    },
  },
  getSymbol: {
    ...metricsStudiesSymbols(exchangeName),
    ...minerStudiesSymbols(exchangeName),
    '#MINER_FLOWS': () => {
      const symbolStub = {
        data_status: 'streaming',
        description: '',
        exchange: exchangeName,
        has_intraday: false,
        minmov: 1,
        name: '#MINER_FLOWS',
        pricescale: 100000000,
        session: '24x7',
        supported_resolutions: ['60', '1D'],
        ticker: '#MINER_FLOWS',
        timezone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        type: 'crypto',
        volume_precision: 1,
        has_empty_bars: true,
      };

      return symbolStub;
    },
    '#EXCHANGE_FLOWS': () => {
      const symbolStub = {
        data_status: 'streaming',
        description: '',
        exchange: exchangeName,
        has_intraday: false,
        minmov: 1,
        name: '#EXCHANGE_FLOWS',
        pricescale: 100000000,
        session: '24x7',
        supported_resolutions: ['60', '1D'],
        ticker: '#EXCHANGE_FLOWS',
        timezone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        type: 'crypto',
        volume_precision: 1,
        has_empty_bars: true,
      };

      return symbolStub;
    },
    '#EXCHANGE_BALANCES': () => {
      const symbolStub = {
        data_status: 'streaming',
        description: '',
        exchange: exchangeName,
        has_intraday: false,
        minmov: 1,
        name: '#EXCHANGE_BALANCES',
        pricescale: 100000000,
        session: '24x7',
        supported_resolutions: ['60', '1D'],
        ticker: '#EXCHANGE_BALANCES',
        timezone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        type: 'crypto',
        volume_precision: 1,
        has_empty_bars: true,
      };

      return symbolStub;
    },
  },
});
