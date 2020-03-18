/* eslint-disable camelcase */
const BigNumber = require('bignumber.js');
const takeRight = require('lodash/takeRight');

module.exports = (period, dataPoints, direction) => {
  const dataSet = takeRight(dataPoints, period);
  const latest = dataSet[dataSet.length - 1][direction];
  const usd_latest = dataSet[dataSet.length - 1][`${direction}_usd`];

  const sum_pct_change = new BigNumber(dataSet[dataSet.length - 1][direction])
    .dividedBy(dataSet[0][direction])
    .multipliedBy(100)
    .minus(100);

  const usd_sum_pct_change = new BigNumber(
    dataSet[dataSet.length - 1][`${direction}_usd`]
  )
    .dividedBy(dataSet[0][`${direction}_usd`])
    .times(100)
    .minus(100);

  const { sum, usd_sum } = dataSet.reduce(
    (acc, point) => ({
      sum: acc.sum.plus(point[direction]),
      usd_sum: acc.usd_sum.plus(point[`${direction}_usd`]),
    }),
    { sum: new BigNumber(0), usd_sum: new BigNumber(0) }
  );

  return {
    [`${direction}_sum`]: sum.toNumber(),
    [`${direction}_usd_sum`]: usd_sum.toNumber(),
    [`${direction}_latest`]: latest,
    [`${direction}_usd_latest`]: usd_latest,
    [`${direction}_sum_pct_change`]: sum_pct_change.isNaN()
      ? 0
      : sum_pct_change.toNumber(),
    [`${direction}_usd_sum_pct_change`]: usd_sum_pct_change.isNaN()
      ? 0
      : usd_sum_pct_change.toNumber(),
  };
};
