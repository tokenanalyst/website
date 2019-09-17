import { toSingleValueChartData } from "./mappers";

import { NATIVE_TOKENS, CURRENCIES } from "../../constants/tokens";
import { CHART_TYPES } from "../../constants/chartTypes";

const formatTokenSymbol = rawSymbol => rawSymbol.replace("_", " ");

export const getExchangeDataSet = (response, token, timeWindow = "1d") => {
  const USDSymbol = formatTokenSymbol(CURRENCIES.USD);
  const tokenSymbol = formatTokenSymbol(token);

  const baseDataSet = [
    {
      dataPoint: "Price",
      title: "Price",
      chartValues: toSingleValueChartData(
        response.price,
        "date",
        "price_usd",
        timeWindow
      ),
      visible: true,
      solidColor: "#0198E1",
      chartType: CHART_TYPES.line,
      isAlwaysDisplayed: true,
      timeWindow
    },
    {
      dataPoint: `Volume (${tokenSymbol})`,
      title: `Outflow Volume (${tokenSymbol})`,
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "outflow",
        timeWindow
      ),
      visible: true,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)",
      timeWindow
    },
    {
      dataPoint: `Volume (${tokenSymbol})`,
      title: `Inflow Volume (${tokenSymbol})`,
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "inflow",
        timeWindow
      ),
      visible: true,
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)",
      timeWindow
    },
    {
      dataPoint: `Volume (${USDSymbol})`,
      title: `Outflow Volume (${USDSymbol})`,
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "outflow_usd",
        timeWindow
      ),
      visible: false,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)",
      timeWindow
    },
    {
      dataPoint: `Volume (${USDSymbol})`,
      title: `Inflow Volume (${USDSymbol})`,
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "inflow_usd",
        timeWindow
      ),
      visible: false,
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)",
      timeWindow
    },
    {
      dataPoint: "TXN Count",
      title: "Outflow TXN Count",
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "number_of_txns",
        timeWindow
      ),
      visible: false,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)",
      timeWindow
    },
    {
      dataPoint: "TXN Count",
      title: "Inflow TXN Count",
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "number_of_txns",
        timeWindow
      ),
      visible: false,
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)",
      timeWindow
    },
    {
      dataPoint: `Avg. TXN Value (${tokenSymbol})`,
      title: `Outflow Avg. TXN Value (${tokenSymbol})`,
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "avg_txn_value",
        timeWindow
      ),
      visible: false,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)",
      timeWindow
    },
    {
      dataPoint: `Avg. TXN Value (${tokenSymbol})`,
      title: `Inflow Avg. TXN Value (${tokenSymbol})`,
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "avg_txn_value",
        timeWindow
      ),
      visible: false,
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)",
      timeWindow
    },
    {
      dataPoint: `Avg. TXN Value (${USDSymbol})`,
      title: `Outflow Avg. TXN Value (${USDSymbol})`,
      chartValues: toSingleValueChartData(
        response.outflow,
        "date",
        "avg_txn_value_usd",
        timeWindow
      ),
      visible: false,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)",
      timeWindow
    },
    {
      dataPoint: `Avg. TXN Value (${USDSymbol})`,
      title: `Inflow Avg. TXN Value (${USDSymbol})`,
      chartValues: toSingleValueChartData(
        response.inflow,
        "date",
        "avg_txn_value_usd",
        timeWindow
      ),
      visible: false,
      solidColor: "rgba(63, 205, 171, 1)",
      topColor: "rgba(63, 205, 171, 0.7)",
      bottomColor: "rgba(63, 205, 171, 0.04)",
      timeWindow
    }
  ];

  if (token === NATIVE_TOKENS.BTC) {
    const baseDataSetWithBTC = baseDataSet.concat([
      {
        dataPoint: "Add. Count (entity)",
        title: "Outflow No. Sending Addresses",
        chartValues: toSingleValueChartData(
          response.outflow,
          "date",
          "number_of_entity_sending_addresses",
          timeWindow
        ),
        visible: false,
        solidColor: "rgba(250, 78, 150, 1)",
        topColor: "rgba(250, 78, 150, 0.3)",
        bottomColor: "rgba(250, 78, 150, 0.04)",
        timeWindow
      },
      {
        dataPoint: "Add. Count (entity)",
        title: "Inflow No. Receiving Addresses",
        chartValues: toSingleValueChartData(
          response.inflow,
          "date",
          "number_of_entity_receiving_addresses",
          timeWindow
        ),
        visible: false,
        solidColor: "rgba(63, 205, 171, 1)",
        topColor: "rgba(63, 205, 171, 0.7)",
        bottomColor: "rgba(63, 205, 171, 0.04)",
        timeWindow
      },
      {
        dataPoint: "Add. Count (non-ent.)",
        title: "Outflow No. Receiving Addresses",
        chartValues: toSingleValueChartData(
          response.outflow,
          "date",
          "number_of_nonentity_receiving_addresses",
          timeWindow
        ),
        visible: false,
        solidColor: "rgba(250, 78, 150, 1)",
        topColor: "rgba(250, 78, 150, 0.3)",
        bottomColor: "rgba(250, 78, 150, 0.04)",
        timeWindow
      },
      {
        dataPoint: "Add. Count (non-ent.)",
        title: "Inflow No. Sending Addresses",
        chartValues: toSingleValueChartData(
          response.inflow,
          "date",
          "number_of_nonentity_sending_addresses",
          timeWindow
        ),
        visible: false,
        solidColor: "rgba(63, 205, 171, 1)",
        topColor: "rgba(63, 205, 171, 0.7)",
        bottomColor: "rgba(63, 205, 171, 0.04)",
        timeWindow
      }
    ]);
    return baseDataSetWithBTC;
  }

  return baseDataSet;
};
