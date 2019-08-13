import { toSingleValues } from "../mapper-functions";

export const getExchangeDataSet = response => [
  {
    dataPoint: "Txn Count",
    direction: "outflow",
    title: "Outflow Txn Count",
    chartValues: toSingleValues(response.outflow, "date", "number_of_txns"),
    visible: true,
    color: "red"
  },
  {
    // series: "line",
    dataPoint: "Txn Count",
    direction: "inflow",
    title: "Inflow Txn Count",
    chartValues: toSingleValues(response.inflow, "date", "number_of_txns"),
    visible: true,
    color: "green"
  },
  {
    // series: "line",
    dataPoint: "Address Count",
    direction: "outflow",
    title: "Outflow Address Count",
    chartValues: toSingleValues(
      response.outflow,
      "date",
      "number_of_entity_sending_addresses"
    ),
    visible: true,
    color: "blue"
  },
  {
    // series: "line",
    dataPoint: "Address Count",
    direction: "inflow",
    title: "Inflow Address Count",
    chartValues: toSingleValues(
      response.inflow,
      "date",
      "number_of_entity_receiving_addresses"
    ),
    visible: true,
    colour: "black"
  },
  {
    // series: "line",
    dataPoint: "Txn Value",
    direction: "outflow",
    title: "Outflow Average Txn Value (USD)",
    chartValues: toSingleValues(response.outflow, "date", "avg_txn_value_usd"),
    visible: true,
    color: "purple"
  },
  {
    // series: "line",
    dataPoint: "Txn Value",
    direction: "inflow",
    title: "Inflow Average Txn Value (USD)",
    chartValues: toSingleValues(response.inflow, "date", "avg_txn_value_usd"),
    visible: true,
    color: "pink"
  }
];
