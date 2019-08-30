import { toSingleValueChartData } from "./mappers";

import { STABLE_TOKENS, NATIVE_TOKENS } from "../../constants/tokens";
import { CHART_TYPES } from "../../constants/chartTypes";

export const getExchangeDataSet = (response, token) => {
  const baseDataSet = [
    {
      dataPoint: "Price",
      title: "Price",
      chartValues: toSingleValueChartData(
        response.price,
        Object.keys(STABLE_TOKENS).indexOf(token) >= 0 ? "date" : "day",
        Object.keys(STABLE_TOKENS).indexOf(token) >= 0 ? "price_usd" : "price"
      ),
      visible: true,
      solidColor: "#0198E1",
      chartType: CHART_TYPES.line,
      isAlwaysDisplayed: true
    },
    {
      dataPoint: "Volume",
      title: "Outflow Volume",
      chartValues: toSingleValueChartData(response.outflow, "date", "outflow"),
      visible: true,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
    },
    {
      dataPoint: "Volume",
      title: "Inflow Volume",
      chartValues: toSingleValueChartData(response.inflow, "date", "inflow"),
      visible: true,
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)"
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
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
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
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)"
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
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
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
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)"
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
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
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
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)"
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
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
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
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)"
    }
  ];

  if (token === NATIVE_TOKENS.BTC) {
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
        solidColor: "rgba(250, 78, 150, 1)",
        topColor: "rgba(250, 78, 150, 0.3)",
        bottomColor: "rgba(250, 78, 150, 0.04)"
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
        solidColor: "rgba(63, 205, 171, 1)",
        topColor: "rgba(63, 205, 171, 0.7)",
        bottomColor: "rgba(63, 205, 171, 0.04)"
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
        solidColor: "rgba(250, 78, 150, 1)",
        topColor: "rgba(250, 78, 150, 0.3)",
        bottomColor: "rgba(250, 78, 150, 0.04)"
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
        solidColor: "rgba(63, 205, 171, 1)",
        topColor: "rgba(63, 205, 171, 0.7)",
        bottomColor: "rgba(63, 205, 171, 0.04)"
      }
    ]);
  }

  return baseDataSet;
};
