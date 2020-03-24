/* eslint-disable camelcase */
import { of } from 'rxjs';

import makeFlowSummary from '../../makeFlowSummary';
import addSummary from './addSummary';
import { mockDataOutflowSum } from './__fixtures__/fixtures';

jest.mock('../../makeFlowSummary');

makeFlowSummary.mockReturnValue({ test: 'test' });

const expectedData = [
  6380585,
  2577056.12,
  3054664.22,
  737089.98,
  2149964.9,
  1877800.32,
  1324916.84,
  1881307.5,
  1225275.06,
];

const mockData$ = of(mockDataOutflowSum);

const expectedSummary = {
  outflow: {
    data: expectedData,
    summary: { '30d': { test: 'test' } },
  },
};

describe('addSummary function', () => {
  it('should return correct data summary', done => {
    mockData$.pipe(addSummary('outflow', [30])).subscribe(result => {
      expect(makeFlowSummary).toHaveBeenCalledWith(
        30,
        Object.values(mockDataOutflowSum),
        'outflow'
      );
      expect(result).toEqual(expectedSummary);
      done();
    });
  });
});
