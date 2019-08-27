import { toSingleValueChartData } from "./mappers";

export const getExchangeDataSet = (response, token) => {
  const baseDataSet = [
    {
      dataPoint: "Volume",
      title: "Outflow Volume",
      chartValues: toSingleValueChartData(response.outflow, "date", "outflow"),
      visible: true,
      color: "#fa4e96"
    },
    {
      dataPoint: "Volume",
      title: "Inflow Volume",
      chartValues: toSingleValueChartData(response.inflow, "date", "inflow"),
      visible: true,
      color: "#3fcdab"
    },
    {
      dataPoint: "Volume (USD)",
      title: "Outflow Volume (USD)",
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "outflow_usd"
      ),
      visible: false,
      color: "#fa4e96"
    },
    {
      dataPoint: "Volume (USD)",
      title: "Inflow Volume (USD)",
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "inflow_usd"
      ),
      visible: false,
      color: "#3fcdab"
    },
    {
      dataPoint: "TXN Count",
      title: "Outflow TXN Count",
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "number_of_txns"
      ),
      visible: false,
      color: "#fa4e96"
    },
    {
      dataPoint: "TXN Count",
      title: "Inflow TXN Count",
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "number_of_txns"
      ),
      visible: false,
      color: "#3fcdab"
    },
    {
      dataPoint: "Avg. TXN Value",
      title: "Outflow Avg. TXN Value",
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "avg_txn_value"
      ),
      visible: false,
      color: "#fa4e96"
    },
    {
      dataPoint: "Avg. TXN Value",
      title: "Inflow Avg. TXN Value",
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "avg_txn_value"
      ),
      visible: false,
      color: "#3fcdab"
    },
    {
      dataPoint: "Avg. TXN Value (USD)",
      title: "Outflow Avg. TXN Value (USD)",
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "avg_txn_value_usd"
      ),
      visible: false,
      color: "#fa4e96"
    },
    {
      dataPoint: "Avg. TXN Value (USD)",
      title: "Inflow Avg. TXN Value (USD)",
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "avg_txn_value_usd"
      ),
      visible: false,
      color: "#3fcdab"
    }
  ];

  if (token === "BTC") {
    return baseDataSet.concat([
      {
        dataPoint: "Add. Count (entity)",
        title: "Outflow No. Sending Addresses",
        chartValues: toSingleValueChartData(
          response.outflow,
          "date",
          "number_of_entity_sending_addresses"
        ),
        visible: false,
        color: "#fa4e96"
      },
      {
        dataPoint: "Add. Count (entity)",
        title: "Inflow No. Receiving Addresses",
        chartValues: toSingleValueChartData(
          response.inflow,
          "date",
          "number_of_entity_receiving_addresses"
        ),
        visible: false,
        color: "#3fcdab"
      },
      {
        dataPoint: "Add. Count (non-ent.)",
        title: "Outflow No. Receiving Addresses",
        chartValues: toSingleValueChartData(
          response.outflow,
          "date",
          "number_of_nonentity_receiving_addresses"
        ),
        visible: false,
        color: "#fa4e96"
      },
      {
        dataPoint: "Add. Count (non-ent.)",
        title: "Inflow No. Sending Addresses",
        chartValues: toSingleValueChartData(
          response.inflow,
          "date",
          "number_of_nonentity_sending_addresses"
        ),
        visible: false,
        color: "#3fcdab"
      }
    ]);
  }

  return baseDataSet;
};
