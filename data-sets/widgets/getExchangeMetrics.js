export const getExchangeMetrics = data => ({
  inflowUsdSum: data.inflow_usd_sum,
  inflowUsdSumPctChange: data.inflow_usd_sum_pct_change,
  outflowUsdSum: data.outflow_usd_sum,
  outflowUsdSumPctChange: data.outflow_usd_sum_pct_change
});
