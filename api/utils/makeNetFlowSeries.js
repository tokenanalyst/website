const takeRight = require('lodash/takeRight');

module.exports = (inFlowSeries, outFlowSeries, fromDate, toDate) => {
  if (!fromDate || !toDate) {
    return [];
  }

  const safeResultsNumber = Math.min(inFlowSeries.length, outFlowSeries.length);

  const trimmedInFlow = takeRight(inFlowSeries, safeResultsNumber);
  const trimmedOutFlow = takeRight(outFlowSeries, safeResultsNumber);

  return trimmedInFlow.map(({ inflow, inflow_usd, date, hour }, index) => {
    if (trimmedOutFlow[index]) {
      return {
        date,
        hour,
        value: Number((inflow - trimmedOutFlow[index].outflow).toFixed(2)),
        value_usd: Number(
          (inflow_usd - trimmedOutFlow[index].outflow_usd).toFixed(2)
        ),
      };
    }
  });
};
