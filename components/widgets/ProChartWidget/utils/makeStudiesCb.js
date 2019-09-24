import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';

const formatDate = epoch => moment(epoch).format('DD/MM/YYYY, HH:mm:ss');

export const makeStudiesCb = (ta, exchangeName, symbol) => ({
  getData: {
    ['#FLOWS']: async (from, to, resolution) => {
      console.log(
        `Requesting bars from ${formatDate(from * 1000)} to ${formatDate(
          to * 1000
        )} for #FLOWS`
      );
      const flow = await ta.fetchFromTAProxy(
        exchangeName,
        symbol,
        resolution,
        from * 1000,
        to * 1000
      );
      console.log(
        `Received bars from ${formatDate(flow[0].time)} to ${formatDate(
          flow[flow.length - 1].time
        )} for #FLOWS`
      );
      return flow;
    },
    ['#NET_FLOWS']: async (from, to, resolution) => {
      console.log(
        `Requesting bars from ${formatDate(from * 1000)} to ${formatDate(
          to * 1000
        )} for #NET_FLOWS`
      );
      const flow = await ta.fetchFromTAProxy(
        exchangeName,
        symbol,
        resolution,
        from * 1000,
        to * 1000
      );
      console.log(
        `Received bars from ${formatDate(flow[0].time)} to ${formatDate(
          flow[flow.length - 1].time
        )} for #NET_FLOWS`
      );
      return flow;
    },
  },
  getSymbol: {
    ['#FLOWS']: () => {
      const symbolStub = {
        data_status: 'streaming',
        description: '',
        exchange: exchangeName,
        has_intraday: false,
        minmov: 1,
        name: '#FLOWS',
        pricescale: 100000000,
        session: '24x7',
        supported_resolutions: ['1D'],
        ticker: '#FLOWS',
        timezone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        type: 'crypto',
        volume_precision: 1,
        has_empty_bars: true,
      };

      return symbolStub;
    },
    ['#NET_FLOWS']: () => {
      const symbolStub = {
        data_status: 'streaming',
        description: '',
        exchange: exchangeName,
        has_intraday: false,
        minmov: 1,
        name: '#NET_FLOWS',
        pricescale: 100000000,
        session: '24x7',
        supported_resolutions: ['1D'],
        ticker: '#NET_FLOWS',
        timezone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        type: 'crypto',
        volume_precision: 1,
        has_empty_bars: true,
      };

      return symbolStub;
    },
  },
});
