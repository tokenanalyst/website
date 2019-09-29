export const makeNetFlowSeries = (
  inFlowSeries,
  outFlowSeries,
  fromDate,
  toDate
) => {
  return !fromDate || !toDate
    ? []
    : inFlowSeries.map(({ inflow, inflow_usd, date, hour }, index) => {
        if (outFlowSeries[index]) {
          return {
            date,
            hour,
            value: Number((inflow - outFlowSeries[index].outflow).toFixed(2)),
            value_usd: Number(
              (inflow_usd - outFlowSeries[index].outflow_usd).toFixed(2)
            ),
          };
        }
      });
};
