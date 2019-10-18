import moment from 'moment';

const formatDate = epoch => moment(epoch).format('DD/MM/YYYY, HH:mm:ss');

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
    '#TRANSACTIONS': async (from, to, resolution) => {
      console.log('(&*^%&^*&*(* IN *)(&*^&$^%*&*(');
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Requesting bars from ${formatDate(from * 1000)} to ${formatDate(
            to * 1000
          )} for #FLOWS`
        );
      }
      const flow = await ta.fetchTransactionsTAProxy(
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
          )} for #TRANSACTIONS`
        );
      }

      return flow;
    },
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
    '#TRANSACTIONS': () => {
      console.log('(&*^%&^*&*(* IN *)(&*^&$^%*&*(');
      const symbolStub = {
        data_status: 'streaming',
        description: '',
        exchange: exchangeName,
        has_intraday: false,
        minmov: 1,
        name: '#TRANSACTIONS',
        pricescale: 100000000,
        session: '24x7',
        supported_resolutions: ['60', '1D'],
        ticker: '#TRANSACTIONS',
        timezone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        type: 'crypto',
        volume_precision: 1,
        has_empty_bars: true,
      };

      return symbolStub;
    },
  },
});
