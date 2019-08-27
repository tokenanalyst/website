export const getIoTableData = () => ({
  accessors: {
    token: "token",
    exchange: "exchange",
    USD: {
      inflow: "inflow_usd_sum",
      inflowChange: "inflow_usd_sum_pct_change",
      outflow: "outflow_usd_sum",
      outflowChange: "outflow_usd_sum_pct_change"
    },
    CRYPTO: {
      inflow: "inflow_sum",
      inflowChange: "inflow_sum_pct_change",
      outflow: "outflow_sum",
      outflowChange: "outflow_sum_pct_change"
    }
  },
  columnHeaders: {
    token: "Token",
    exchange: "Exchange",
    inflow: "Inflow",
    inflowChange: "Change",
    outflow: "Outflow",
    outflowChange: "Change"
  }
});
