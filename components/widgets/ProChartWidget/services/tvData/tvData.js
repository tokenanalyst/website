/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { config } from './const';

let subscrition;

const formatDate = epoch => moment(epoch).format('DD/MM/YYYY, HH:mm:ss');

const tvData = (exchangeService, exchangeName, symbols) => {
  const { makeTimeFrame } = config[exchangeName.toLowerCase()];

  return {
    onReady: cb => {
      console.log('===== onReady running');
      const { supported_resolutions } = config[exchangeName.toLowerCase()];
      setTimeout(
        () =>
          cb({
            supported_resolutions,
          }),
        0
      );
    },

    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
      console.log('==== Search Symbols running');
    },

    resolveSymbol: async (
      symbolName,
      onSymbolResolvedCallback,
      onResolveErrorCallback
    ) => {
      console.log('====== resolveSymbol running');

      if (symbolName === '#FLOWS') {
        console.log('get flow #FLOWS');
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
        setTimeout(() => {
          onSymbolResolvedCallback(symbolStub);
        }, 0);
        return;
      }

      if (symbolName === '#NET_FLOWS') {
        console.log('get flow #NET_FLOWS');
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
        setTimeout(() => {
          onSymbolResolvedCallback(symbolStub);
        }, 0);
        return;
      }

      if (!config[exchangeName.toLowerCase()]) {
        onResolveErrorCallback(`Exchange ${exchangeName} not supported.`);
      }

      const { intraday_multipliers, supported_resolutions } = config[
        exchangeName.toLowerCase()
      ];

      const symbolStub = {
        data_status: 'streaming',
        description: '',
        exchange: exchangeName,
        has_intraday: true,
        intraday_multipliers,
        minmov: 1,
        name: `${symbols[0]}/${symbols[1]}`,
        pricescale: 100000000,
        session: '24x7',
        supported_resolutions,
        ticker: `${exchangeName}:${symbols[0]}/${symbols[1]}`,
        timezone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        type: 'crypto',
        volume_precision: 6,
        has_empty_bars: true,
      };

      if (symbols[1].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
        symbolStub.pricescale = 100;
      }

      setTimeout(() => {
        onSymbolResolvedCallback(symbolStub);
      }, 0);
    },

    getBars: async (
      symbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    ) => {
      console.log('===== getBars running');
      const [baseSymbol, quoteSymbol] = symbolInfo.name.split('/');

      console.log(
        `Requesting bars from ${formatDate(from * 1000)} to ${formatDate(
          to * 1000
        )} for ${symbolInfo.name}`
      );
      console.log(exchangeService.ta.getTradingPair());
      const taTradingPair = exchangeService.ta.getTradingPair();
      console.log(taTradingPair);
      if (symbolInfo.name === '#FLOWS') {
        const flow = await exchangeService.ta.fetchExchangeFlow(
          symbolInfo.exchange,
          taTradingPair[0],
          resolution,
          from * 1000,
          to * 1000
        );
        console.log(
          `Received bars from ${formatDate(flow[0].time)} to ${formatDate(
            flow[flow.length - 1].time
          )}`
        );
        return onHistoryCallback(cloneDeep(flow), { noData: false });
      }
      if (symbolInfo.name === '#NET_FLOWS') {
        const flow = await exchangeService.ta.fetchExchangeFlow(
          symbolInfo.exchange,
          taTradingPair[0],
          resolution,
          from * 1000,
          to * 1000
        );
        console.log(flow);
        console.log(
          `Received bars from ${formatDate(flow[0].time)} to ${formatDate(
            flow[flow.length - 1].time
          )}`
        );
        return onHistoryCallback(cloneDeep(flow), { noData: false });
      }

      // eslint-disable-next-line max-len
      console.log(
        `exchangeService.fetchCandles(${[
          baseSymbol,
          quoteSymbol,
        ]}, ${makeTimeFrame(resolution)}, ${from * 1000}, ${to * 1000})`
      );

      let bars;
      if (firstDataRequest) {
        bars = await exchangeService.fetchCandles(
          [baseSymbol, quoteSymbol],
          makeTimeFrame(resolution),
          from * 1000,
          to * 1000,
          1000
        );
      } else {
        bars = await exchangeService.fetchCandles(
          [baseSymbol, quoteSymbol],
          makeTimeFrame(resolution),
          from * 1000,
          to * 1000,
          1000
        );
      }
      console.log(bars);
      if (bars.length) {
        console.log(
          `Received bars from ${formatDate(bars[0].time)} to ${formatDate(
            bars[bars.length - 1].time
          )}`
        );
        onHistoryCallback(cloneDeep(bars), { noData: false });
      } else {
        onHistoryCallback(cloneDeep(bars), { noData: true });
      }
    },

    subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    ) {
      console.log('===== subscribeBars runnning');

      const channel = `${makeTimeFrame(resolution)}:${symbols[0]}${symbols[1]}`;

      if (subscrition) {
        subscrition.unsubscribe();
      }
      const exchangeTrafingPairs = exchangeService.getPairs();

      if (exchangeTrafingPairs.channel) {
        const subscribedPairs = exchangeService.getPairs();

        if (!subscribedPairs[channel]) {
          exchangeService.addTradingPair(symbols, {
            timeFrame: makeTimeFrame(resolution),
          });
        }

        subscrition = exchangeService.data$([channel]).subscribe(data => {
          if (
            data &&
            data[channel] &&
            (data[channel].meta.isNewCandle === true ||
              data[channel].meta.isUpdateCandle === true)
          ) {
            onRealtimeCallback(cloneDeep(data[channel].updates));
          }
        });
      }
    },

    unsubscribeBars: subscriberUID => {
      console.log('===== unsubscribeBars running');
    },

    calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
      console.log('===== calculateHistoryDepth running');

      // return resolution < 60 ? { resolutionBack: 'D', intervalBack: '1' } : undefined
      //   if (resolution === '1D') {
      //     return {
      //       resolutionBack: 'M',
      //       intervalBack: 6,
      //     }
      // }
    },

    getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
      console.log('===== getMarks running');
    },

    getTimeScaleMarks: (
      symbolInfo,
      startDate,
      endDate,
      onDataCallback,
      resolution
    ) => {
      console.log('===== getTimeScaleMarks running');
    },

    getServerTime: cb => {
      console.log('===== getServerTime running');
    },
  };
};

export default tvData;
