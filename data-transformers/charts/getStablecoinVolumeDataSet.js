import { toSingleValueChartData } from "./mappers";

export const getStablecoinVolumeDataSet = response => [
  {
    title: "USDT_OMNI",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "USDT_OMNI").data,
      "date",
      "volume_usd"
    ),
    visible: true,
    solidColor: "#00CECE"
  },
  {
    title: "USDT_ERC20",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "USDT_ERC20").data,
      "date",
      "volume_usd"
    ),
    visible: true,
    solidColor: "#e1c699"
  },
  {
    title: "USDC",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "USDC").data,
      "date",
      "volume_usd"
    ),
    visible: true,
    solidColor: "#6AABFF"
  },
  {
    title: "PAX",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "PAX").data,
      "date",
      "volume_usd"
    ),
    visible: true,
    solidColor: "#FF8DA1"
  },
  {
    title: "DAI",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "DAI").data,
      "date",
      "volume_usd"
    ),
    visible: true,
    solidColor: "#2BEFBE"
  },
  {
    title: "TUSD",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "TUSD").data,
      "date",
      "volume_usd"
    ),
    visible: true,
    solidColor: "#008080"
  },
  {
    title: "GUSD",
    chartValues: toSingleValueChartData(
      response.find(n => n.name === "GUSD").data,
      "date",
      "volume_usd"
    ),
    visible: true,
    solidColor: "#B49CF2"
  }
];
