import { getCompareDataSet } from './getCompareDataSet';
import { toSingleValueChartData } from './mappers/toSingleValueChartData';
import { TEST_TOKEN } from './__fixtures__/responses';

const nonNativeTokenSymbol = 'TEST_TOKEN';

const mockColor = 'red';

const nonNativeTokenResponse = {
  [nonNativeTokenSymbol]: TEST_TOKEN,
};

describe('getCompareDataSet function', () => {
  it('returns dataSet for non native tokens success', () => {
    const token = 'TEST_TOKEN';
    const expectedDataSet = [
      {
        dataPoint: 'Volume (USD)',
        title: `${nonNativeTokenSymbol} Volume (USD)`,
        chartValues: toSingleValueChartData(
          TEST_TOKEN.volume,
          'date',
          'volume_usd'
        ),
        visible: true,
        solidColor: mockColor,
      },
      {
        dataPoint: `Volume (${nonNativeTokenSymbol})`,
        title: `${nonNativeTokenSymbol} Volume`,
        chartValues: toSingleValueChartData(
          TEST_TOKEN.volume,
          'date',
          'volume'
        ),
        visible: false,
        solidColor: mockColor,
      },
      {
        dataPoint: 'TXN Count',
        title: `${nonNativeTokenSymbol} TXN Count`,
        chartValues: toSingleValueChartData(
          TEST_TOKEN.count,
          'date',
          'number_of_txns'
        ),
        visible: false,
        solidColor: mockColor,
      },
      {
        dataPoint: 'Active Senders',
        title: `${nonNativeTokenSymbol} Active Senders`,
        chartValues: toSingleValueChartData(
          TEST_TOKEN.address,
          'date',
          'active_senders'
        ),
        visible: false,
        solidColor: mockColor,
      },
      {
        dataPoint: 'Active Recipients',
        title: `${nonNativeTokenSymbol} Active Recipients`,
        chartValues: toSingleValueChartData(
          TEST_TOKEN.address,
          'date',
          'active_recipients'
        ),
        visible: false,
        solidColor: mockColor,
      },
      {
        dataPoint: 'Price',
        title: `${nonNativeTokenSymbol} Price`,
        chartValues: toSingleValueChartData(
          TEST_TOKEN.volume,
          'date',
          'price_usd'
        ),
        visible: false,
        solidColor: mockColor,
      },
    ];
    const dateSet = getCompareDataSet(
      nonNativeTokenResponse[token],
      token,
      mockColor
    );

    expect(dateSet).toEqual(expectedDataSet);
  });
});
