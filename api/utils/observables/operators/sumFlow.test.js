/* eslint-disable camelcase */
import { of } from 'rxjs';

import sumFlow from './sumFlow';
import { mockDataOutflow } from './__fixtures__/fixtures';

const dateMap = mockDataOutflow.reduce((acc, point) => {
  const { date, datetime } = point;
  const key = datetime || date;

  return { ...acc, [key]: point };
}, {});

const mockData$ = of(dateMap, dateMap);

const expectedSum = mockDataOutflow.reduce((acc, point) => {
  const { date, outflow, outflow_usd } = point;
  return {
    ...acc,
    [date]: {
      date,
      outflow: outflow * 2,
      outflow_usd: outflow_usd * 2,
    },
  };
}, {});

describe('sumFlow function', () => {
  it('should return data sum', done => {
    mockData$.pipe(sumFlow('outflow')).subscribe(result => {
      expect(result).toEqual(expectedSum);
      done();
    });
  });
});
