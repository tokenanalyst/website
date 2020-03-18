/* eslint-disable camelcase */
const BigNumber = require('bignumber.js');

module.exports = (period, dataPoints) => {
  const balance_latest = dataPoints[dataPoints.length - 1].balance;
  const balance_usd_latest = dataPoints[dataPoints.length - 1].balance_usd;
  const firstPointIndex =
    period >= dataPoints.length ? 0 : dataPoints.length - 1 - period;

  const balance_pct_change = new BigNumber(
    dataPoints[dataPoints.length - 1].balance
  )
    .dividedBy(dataPoints[firstPointIndex].balance)
    .multipliedBy(100)
    .minus(100);

  const balance_usd_pct_change = new BigNumber(
    dataPoints[dataPoints.length - 1].balance_usd
  )
    .dividedBy(dataPoints[firstPointIndex].balance_usd)
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
