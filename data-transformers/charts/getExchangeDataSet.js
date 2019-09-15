import { toSingleValueChartData } from './mappers';

import {
  STABLE_TOKENS,
  NATIVE_TOKENS,
  CURRENCIES
} from '../../constants/tokens';
import { CHART_TYPES } from '../../constants/chartTypes';

const formatTokenSymbol = rawSymbol => rawSymbol.replace('_', ' ');

// const makeTimeKey = (tokens, token) => {
//   return Object.keys(tokens).indexOf(token) >= 0 ? "date" : "date";
// };

const makeValueKey = (tokens, token) => {
  return Object.keys(tokens).indexOf(token) >= 0 ? 'price_usd' : 'price_usd';
};

const addTimeWindow = (baseDataSet, timeWindow) => {
  return baseDataSet.map(dataPoint => {
    return { ...dataPoint, timeWindow };
  });
};

const getUTCDate = datum => {
  if (datum.date && datum.hour) {
    const { date, hour } = datum;
    const splitDate = date.split('-');
    const splitHour = hour.split(':');
    return Date.UTC(
      splitDate[0],
      splitDate[1] - 1,
      splitDate[2],
      splitHour[0],
      splitHour[1],
      splitHour[2]
    );
  }
  if (datum.day) {
    const splitDate = datum.day.split('-');

    return Date.UTC(splitDate[0], splitDate[1] - 1, splitDate[2]);
  }
};

export const getExchangeDataSet = (response, token, timeWindow = '1d') => {
  const USDSymbol = formatTokenSymbol(CURRENCIES.USD);
  const tokenSymbol = formatTokenSymbol(token);

  const toSingleValueChartDataForTimeWindow = (data, timeKey, valueKey) => {
    if (timeWindow === '1h') {
      return data.map(datum => ({
        time: new Date(getUTCDate(datum)).getTime() / 1000,
        value: datum[valueKey]
      }));
    }

    return toSingleValueChartData(data, timeKey, valueKey);
  };

  const baseDataSet = [
    {
      dataPoint: 'Price',
      title: 'Price',
      chartValues: toSingleValueChartDataForTimeWindow(
        response.price,
        'date',
        makeValueKey(STABLE_TOKENS, token)
      ),
      visible: true,
      solidColor: '#0198E1',
      chartType: CHART_TYPES.line,
      isAlwaysDisplayed: true
    },
    {
      dataPoint: `Volume (${tokenSymbol})`,
      title: `Outflow Volume (${tokenSymbol})`,
      chartValues: toSingleValueChartDataForTimeWindow(
        response.outflow,
        'date',
        'outflow'
      ),
      visible: true,
      solidColor: 'rgba(250, 78, 150, 1)',
      topColor: 'rgba(250, 78, 150, 0.3)',
      bottomColor: 'rgba(250, 78, 150, 0.04)'
    },
    {
      dataPoint: `Volume (${tokenSymbol})`,
      title: `Inflow Volume (${tokenSymbol})`,
      chartValues: toSingleValueChartDataForTimeWindow(
        response.inflow,
        'date',
        'inflow'
      ),
      visible: true,
      solidColor: 'rgba(63, 205, 171, 1)',
      topColor: 'rgba(63, 205, 171, 0.7)',
      bottomColor: 'rgba(63, 205, 171, 0.04)'
    },
    {
      dataPoint: `Volume (${USDSymbol})`,
      title: `Outflow Volume (${USDSymbol})`,
      chartValues: toSingleValueChartDataForTimeWindow(
        response.outflow,
        'date',
        'outflow_usd'
      ),
      visible: false,
      solidColor: 'rgba(250, 78, 150, 1)',
      topColor: 'rgba(250, 78, 150, 0.3)',
      bottomColor: 'rgba(250, 78, 150, 0.04)'
    },
    {
      dataPoint: `Volume (${USDSymbol})`,
      title: `Inflow Volume (${USDSymbol})`,
      chartValues: toSingleValueChartDataForTimeWindow(
        response.inflow,
        'date',
        'inflow_usd'
      ),
      visible: false,
      solidColor: 'rgba(63, 205, 171, 1)',
      topColor: 'rgba(63, 205, 171, 0.7)',
      bottomColor: 'rgba(63, 205, 171, 0.04)'
    },
    {
      dataPoint: 'TXN Count',
      title: 'Outflow TXN Count',
      chartValues: toSingleValueChartDataForTimeWindow(
        response.outflow,
        'date',
        'number_of_txns'
      ),
      visible: false,
      solidColor: 'rgba(250, 78, 150, 1)',
      topColor: 'rgba(250, 78, 150, 0.3)',
      bottomColor: 'rgba(250, 78, 150, 0.04)'
    },
    {
      dataPoint: 'TXN Count',
      title: 'Inflow TXN Count',
      chartValues: toSingleValueChartDataForTimeWindow(
        response.inflow,
        'date',
        'number_of_txns'
      ),
      visible: false,
      solidColor: 'rgba(63, 205, 171, 1)',
      topColor: 'rgba(63, 205, 171, 0.7)',
      bottomColor: 'rgba(63, 205, 171, 0.04)'
    },
    {
      dataPoint: `Avg. TXN Value (${tokenSymbol})`,
      title: `Outflow Avg. TXN Value (${tokenSymbol})`,
      chartValues: toSingleValueChartDataForTimeWindow(
        response.outflow,
        'date',
        'avg_txn_value'
      ),
      visible: false,
      solidColor: 'rgba(250, 78, 150, 1)',
      topColor: 'rgba(250, 78, 150, 0.3)',
      bottomColor: 'rgba(250, 78, 150, 0.04)'
    },
    {
      dataPoint: `Avg. TXN Value (${tokenSymbol})`,
      title: `Inflow Avg. TXN Value (${tokenSymbol})`,
      chartValues: toSingleValueChartDataForTimeWindow(
        response.inflow,
        'date',
        'avg_txn_value'
      ),
      visible: false,
      solidColor: 'rgba(63, 205, 171, 1)',
      topColor: 'rgba(63, 205, 171, 0.7)',
      bottomColor: 'rgba(63, 205, 171, 0.04)'
    },
    {
      dataPoint: `Avg. TXN Value (${USDSymbol})`,
      title: `Outflow Avg. TXN Value (${USDSymbol})`,
      chartValues: toSingleValueChartDataForTimeWindow(
        response.outflow,
        'date',
        'avg_txn_value_usd'
      ),
      visible: false,
      solidColor: 'rgba(250, 78, 150, 1)',
      topColor: 'rgba(250, 78, 150, 0.3)',
      bottomColor: 'rgba(250, 78, 150, 0.04)'
    },
    {
      dataPoint: `Avg. TXN Value (${USDSymbol})`,
      title: `Inflow Avg. TXN Value (${USDSymbol})`,
      chartValues: toSingleValueChartDataForTimeWindow(
        response.inflow,
        'date',
        'avg_txn_value_usd'
      ),
      visible: false,
      solidColor: 'rgba(63, 205, 171, 1)',
      topColor: 'rgba(63, 205, 171, 0.7)',
      bottomColor: 'rgba(63, 205, 171, 0.04)'
    }
  ];

  if (token === NATIVE_TOKENS.BTC) {
    const baseDataSetWithBTC = baseDataSet.concat([
      {
        dataPoint: 'Add. Count (entity)',
        title: 'Outflow No. Sending Addresses',
        chartValues: toSingleValueChartDataForTimeWindow(
          response.outflow,
          'date',
          'number_of_entity_sending_addresses'
        ),
        visible: false,
        solidColor: 'rgba(250, 78, 150, 1)',
        topColor: 'rgba(250, 78, 150, 0.3)',
        bottomColor: 'rgba(250, 78, 150, 0.04)'
      },
      {
        dataPoint: 'Add. Count (entity)',
        title: 'Inflow No. Receiving Addresses',
        chartValues: toSingleValueChartDataForTimeWindow(
          response.inflow,
          'date',
          'number_of_entity_receiving_addresses'
        ),
        visible: false,
        solidColor: 'rgba(63, 205, 171, 1)',
        topColor: 'rgba(63, 205, 171, 0.7)',
        bottomColor: 'rgba(63, 205, 171, 0.04)'
      },
      {
        dataPoint: 'Add. Count (non-ent.)',
        title: 'Outflow No. Receiving Addresses',
        chartValues: toSingleValueChartDataForTimeWindow(
          response.outflow,
          'date',
          'number_of_nonentity_receiving_addresses'
        ),
        visible: false,
        solidColor: 'rgba(250, 78, 150, 1)',
        topColor: 'rgba(250, 78, 150, 0.3)',
        bottomColor: 'rgba(250, 78, 150, 0.04)'
      },
      {
        dataPoint: 'Add. Count (non-ent.)',
        title: 'Inflow No. Sending Addresses',
        chartValues: toSingleValueChartDataForTimeWindow(
          response.inflow,
          'date',
          'number_of_nonentity_sending_addresses'
        ),
        visible: false,
        solidColor: 'rgba(63, 205, 171, 1)',
        topColor: 'rgba(63, 205, 171, 0.7)',
        bottomColor: 'rgba(63, 205, 171, 0.04)'
      }
    ]);
    return addTimeWindow(baseDataSetWithBTC, timeWindow);
  }

  return addTimeWindow(baseDataSet, timeWindow);
};
