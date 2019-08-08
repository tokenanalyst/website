export const TABLE_DATA = {
  accessors: {
    token: "token",
    exchange: "exchange",
    USD: {
      inflow: "inflow_usd_sum",
      inflowChange: "inflow_usd_sum_pct_change",
      outflow: "outflow_usd_sum",
      outflowChange: "outflow_usd_sum_pct_change"
    },
    BTC: {
      inflow: "inflow_sum",
      inflowChange: "inflow_sum_pct_change",
      outflow: "outflow_sum",
      outflowChange: "outflow_sum_pct_change"
    }
  },
  columnHeaders: {
    exchange: "Exchange",
    token: "Token",
    inflow: "Inflow",
    inflowChange: "Inflow Change",
    outflow: "Outflow",
    outflowChange: "Outflow Change"
  }
};
