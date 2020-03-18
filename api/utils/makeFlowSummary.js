/* eslint-disable camelcase */
module.exports = (period, dataPoints, direction) => {
  const latest = dataPoints[dataPoints.length - 1][direction];
  const usd_latest = dataPoints[dataPoints.length - 1][`${direction}_usd`];
  const firstPointIndex =
    period >= dataPoints.length ? 0 : dataPoints.length - 1 - period;

  const sum_pct_change =
    (dataPoints[dataPoints.length - 1][direction] /
      dataPoints[firstPointIndex][direction]) *
      100 -
    100;

  const usd_sum_pct_change =
    (dataPoints[dataPoints.length - 1][`${direction}_usd`] /
      dataPoints[firstPointIndex][`${direction}_usd`]) *
      100 -
    100;

  const { sum, usd_sum } = dataPoints.reduce(
    (acc, point) => ({
      sum: acc.sum + point[direction],
      usd_sum: acc.usd_sum + point[`${direction}_usd`],
    }),
    { sum: 0, usd_sum: 0 }
  );

  return {
    [`${direction}_sum`]: sum,
    [`${direction}_usd_sum`]: usd_sum,
    [`${direction}_latest`]: latest,
    [`${direction}_usd_latest`]: usd_latest,
    [`${direction}_sum_pct_change`]: sum_pct_change,
    [`${direction}_usd_sum_pct_change`]: usd_sum_pct_change,
  };
};
