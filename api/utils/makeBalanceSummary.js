/* eslint-disable camelcase */
module.exports = (period, dataPoints) => {
  const balance_latest = dataPoints[dataPoints.length - 1].balance;
  const balance_usd_latest = dataPoints[dataPoints.length - 1].balance_usd;
  const firstPointIndex =
    period >= dataPoints.length ? 0 : dataPoints.length - 1 - period;

  const balance_sum_pct_change =
    (dataPoints[dataPoints.length - 1].balance /
      dataPoints[firstPointIndex].balance) *
      100 -
    100;

  const balance_usd_sum_pct_change =
    (dataPoints[dataPoints.length - 1].balance_usd /
      dataPoints[firstPointIndex].balance_usd) *
      100 -
    100;

  return {
    balance_latest,
    balance_usd_latest,
    balance_sum_pct_change,
    balance_usd_sum_pct_change,
  };
};
