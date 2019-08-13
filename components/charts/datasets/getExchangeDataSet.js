import { toSingleValues } from "../mapper-functions";

export const getExchangeDataSet = response => [
  {
    dataPoint: "Volume",
    direction: "outflow",
    title: "Outflow Volume",
    chartValues: toSingleValues(response.outflow, "date", "outflow"),
    visible: true,
    color: "#fa4e96"
  },
  {
    dataPoint: "Volume",
    direction: "inflow",
    title: "Inflow Volume",
    chartValues: toSingleValues(response.inflow, "date", "inflow"),
    visible: true,
    color: "#3fcdab"
  },
  {
    dataPoint: "Volume (USD)",
    direction: "outflow",
    title: "Outflow Volume",
    chartValues: toSingleValues(response.outflow, "date", "outflow_usd"),
    visible: false,
    color: "#fa4e96"
  },
  {
    dataPoint: "Volume (USD)",
    direction: "inflow",
    title: "Inflow Volume",
    chartValues: toSingleValues(response.inflow, "date", "inflow_usd"),
    visible: false,
    color: "#3fcdab"
  },
  {
    dataPoint: "Txn Count",
    direction: "outflow",
    title: "Outflow Txn Count",
    chartValues: toSingleValues(response.outflow, "date", "number_of_txns"),
    visible: false,
    color: "#fa4e96"
  },
  {
    dataPoint: "Txn Count",
    direction: "inflow",
    title: "Inflow Txn Count",
    chartValues: toSingleValues(response.inflow, "date", "number_of_txns"),
    visible: false,
    color: "#3fcdab"
  },
  {
    dataPoint: "Address Count",
    direction: "outflow",
    title: "Outflow Address Count",
    chartValues: toSingleValues(
      response.outflow,
      "date",
      "number_of_entity_sending_addresses"
    ),
    visible: false,
    color: "#fa4e96"
  },
  {
    dataPoint: "Address Count",
    direction: "inflow",
    title: "Inflow Address Count",
    chartValues: toSingleValues(
      response.inflow,
      "date",
      "number_of_entity_receiving_addresses"
    ),
    visible: false,
    colour: "#3fcdab"
  },
  {
    dataPoint: "Txn Value",
    direction: "outflow",
    title: "Outflow Average Txn Value (USD)",
    chartValues: toSingleValues(response.outflow, "date", "avg_txn_value_usd"),
    visible: false,
    color: "#fa4e96"
  },
  {
    dataPoint: "Txn Value",
    direction: "inflow",
    title: "Inflow Average Txn Value (USD)",
    chartValues: toSingleValues(response.inflow, "date", "avg_txn_value_usd"),
    visible: false,
    color: "#3fcdab"
  }
];
