/* eslint-disable camelcase */
import makeFlowSummary from './makeFlowSummary';

export const mockData = [
  {
    date: '2020-03-10',
    outflow: 10,
    outflow_usd: 15,
  },
  {
    date: '2020-03-11',
    outflow: 10,
    outflow_usd: 15,
  },
  {
    date: '2020-03-12',
    outflow: 5,
    outflow_usd: 10,
  },
  {
    date: '2020-03-13',
    outflow: 10,
    outflow_usd: 15,
  },
  {
    date: '2020-03-14',
    outflow: 20,
    outflow_usd: 25,
  },
];

describe('makeFlowSummary function', () => {
  it('should return data summary', () => {
    let outflow_sum = 35;
    let outflow_usd_sum = 50;
    let outflow_latest = 20;
    let outflow_usd_latest = 25;
    let outflow_sum_pct_change = 300;
    let outflow_usd_sum_pct_change = 150;

    let expectedSummary = {
      outflow_sum,
      outflow_usd_sum,
      outflow_latest,
      outflow_usd_latest,
      outflow_sum_pct_change,
      outflow_usd_sum_pct_change,
    };

    let result = makeFlowSummary(3, mockData, 'outflow');
    expect(result).toEqual(expectedSummary);

    outflow_sum = 30;
    outflow_usd_sum = 40;
    outflow_latest = 20;
    outflow_usd_latest = 25;
    outflow_sum_pct_change = 100;
    outflow_usd_sum_pct_change = 66.66666666666667;

    expectedSummary = {
      outflow_sum,
      outflow_usd_sum,
      outflow_latest,
      outflow_usd_latest,
      outflow_sum_pct_change,
      outflow_usd_sum_pct_change,
    };

    result = makeFlowSummary(2, mockData, 'outflow');
    expect(result).toEqual(expectedSummary);
  });
});
