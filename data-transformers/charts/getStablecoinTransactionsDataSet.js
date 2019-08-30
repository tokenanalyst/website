import { toSingleValueChartData } from "./mappers";

export const getStablecoinTransactionsDataSet = response => [
  {
    title: "USDT_OMNI",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "USDT_OMNI").data,
      "date",
      "number_of_txns"
    ),
    visible: true,
    solidColor: "#75FFF9"
  },
  {
    title: "USDT_ERC20",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "USDT_ERC20").data,
      "date",
      "number_of_txns"
    ),
    visible: true,
    solidColor: "#e1c699"
  },
  {
    title: "USDC",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "USDC").data,
      "date",
      "number_of_txns"
    ),
    visible: true,
    solidColor: "#6AABFF"
  },
  {
    title: "PAX",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "PAX").data,
      "date",
      "number_of_txns"
    ),
    visible: true,
    solidColor: "#FF8DA1"
  },
  {
    title: "DAI",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "DAI").data,
      "date",
      "number_of_txns"
    ),
    visible: true,
    solidColor: "#2BEFBE"
  },
  {
    title: "TUSD",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "TUSD").data,
      "date",
      "number_of_txns"
    ),
    visible: true,
    solidColor: "#BDFCEE"
  },
  {
    title: "GUSD",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "GUSD").data,
      "date",
      "number_of_txns"
    ),
    visible: true,
    solidColor: "#B49CF2"
  }
];