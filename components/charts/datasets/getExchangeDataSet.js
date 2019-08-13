import { toSingleValues } from "../mapper-functions";

export const getExchangeDataSet = response => [
  {
    // series: "line",
    title: "Outflow Txn Count",
    chartValues: toSingleValues(response.outflow, "date", "number_of_txns"),
    visible: true
  },
  {
    // series: "line",
    title: "Inflow Txn Count",
    chartValues: toSingleValues(response.inflow, "date", "number_of_txns"),
    visible: false
  },
  {
    // series: "line",
    title: "Outflow Address Count",
    chartValues: toSingleValues(
      response.outflow,
      "date",
      "number_of_entity_sending_addresses"
    ),
    visible: true
  },
  {
    // series: "line",
    title: "Inflow Address Count",
    chartValues: toSingleValues(
      response.inflow,
      "date",
      "number_of_entity_receiving_addresses"
    ),
    visible: true
  },
  {
    // series: "line",
    title: "Outflow Average Txn Value (USD)",
    chartValues: toSingleValues(response.outflow, "date", "avg_txn_value_usd"),
    visible: true
  },
  {
    // series: "line",
    title: "Inflow Average Txn Value (USD)",
    chartValues: toSingleValues(response.inflow, "date", "avg_txn_value_usd"),
    visible: true
  }
];
