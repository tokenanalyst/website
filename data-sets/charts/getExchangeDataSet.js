import { toSingleValueChartData } from "./mappers";

export const getExchangeDataSet = (response, token) => {
  const baseDataSet = [
    {
      dataPoint: "Volume",
      direction: "outflow",
      title: "Outflow Volume",
      chartValues: toSingleValueChartData(response.outflow, "date", "outflow"),
      visible: true,
      color: "#fa4e96"
    },
    {
      dataPoint: "Volume",
      direction: "inflow",
      title: "Inflow Volume",
      chartValues: toSingleValueChartData(response.inflow, "date", "inflow"),
      visible: true,
      color: "#3fcdab"
    },
    {
      dataPoint: "Volume (USD)",
      direction: "outflow",
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
      direction: "inflow",
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
      dataPoint: "Txn Count",
      direction: "outflow",
      title: "Outflow Txn Count",
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "number_of_txns"
      ),
      visible: false,
      color: "#fa4e96"
    },
    {
      dataPoint: "Txn Count",
      direction: "inflow",
      title: "Inflow Txn Count",
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "number_of_txns"
      ),
      visible: false,
      color: "#3fcdab"
    },
    {
      dataPoint: "Average Txn Value",
      direction: "outflow",
      title: "Outflow Average Txn Value (USD)",
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "avg_txn_value_usd"
      ),
      visible: false,
      color: "#fa4e96"
    },
    {
      dataPoint: "Average Txn Value",
      direction: "inflow",
      title: "Inflow Average Txn Value (USD)",
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
        dataPoint: "Address Count",
        direction: "outflow",
        title: "Outflow Address Count",
        chartValues: toSingleValueChartData(
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
        chartValues: toSingleValueChartData(
          response.inflow,
          "date",
          "number_of_entity_receiving_addresses"
        ),
        visible: false,
        colour: "#3fcdab"
      }
    ]);
  }

  return baseDataSet;
};
