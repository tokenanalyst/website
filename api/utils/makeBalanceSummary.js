/* eslint-disable camelcase */
const BigNumber = require('bignumber.js');
const takeRight = require('lodash/takeRight');

module.exports = (period, dataPoints) => {
  const dataSet = takeRight(dataPoints, period);
  const balance_latest = dataSet[dataSet.length - 1].balance;
  const balance_usd_latest = dataSet[dataSet.length - 1].balance_usd;

  const balance_pct_change = new BigNumber(dataSet[dataSet.length - 1].balance)
    .dividedBy(dataSet[0].balance)
    .multipliedBy(100)
    .minus(100);

  const balance_usd_pct_change = new BigNumber(
    dataSet[dataSet.length - 1].balance_usd
  )
    .dividedBy(dataSet[0].balance_usd)
    .multipliedBy(100)
    .minus(100);

  return {
    balance_latest,
    balance_usd_latest,
    balance_pct_change: balance_pct_change.isNaN()
      ? 0
      : balance_pct_change.toNumber(),
    balance_usd_pct_change: balance_usd_pct_change.isNaN()
      ? 0
      : balance_usd_pct_change.toNumber(),
  };
};
