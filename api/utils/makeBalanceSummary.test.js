/* eslint-disable camelcase */
import makeBalanceSummary from './makeBalanceSummary';

export const mockData = [
  {
    date: '2020-03-10',
    balance: 10,
    balance_usd: 15,
  },
  {
    date: '2020-03-11',
    balance: 10,
    balance_usd: 15,
  },
  {
    date: '2020-03-12',
    balance: 5,
    balance_usd: 10,
  },
  {
    date: '2020-03-13',
    balance: 10,
    balance_usd: 15,
  },
  {
    date: '2020-03-14',
    balance: 20,
    balance_usd: 25,
  },
];

describe('makeBalanceSummary function', () => {
  it('should return data summary', () => {
    let balance_latest = 20;
    let balance_usd_latest = 25;
    let balance_pct_change = 300;
    let balance_usd_pct_change = 150;

    let expectedSummary = {
      balance_latest,
      balance_usd_latest,
      balance_pct_change,
      balance_usd_pct_change,
    };

    let result = makeBalanceSummary(3, mockData);
    expect(result).toEqual(expectedSummary);

    balance_latest = 20;
    balance_usd_latest = 25;
    balance_pct_change = 100;
    balance_usd_pct_change = 66.66666666666667;

    expectedSummary = {
      balance_latest,
      balance_usd_latest,
      balance_pct_change,
      balance_usd_pct_change,
    };

    result = makeBalanceSummary(2, mockData, 'balance');
    expect(result).toEqual(expectedSummary);
  });
});
