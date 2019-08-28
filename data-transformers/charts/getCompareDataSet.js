import { toSingleValueChartData } from "./mappers";

export const getCompareDataSet = (response, token) => {
  const tokenData = response[token];
  const baseDataSet = [
    {
      dataPoint: "Volume",
      title: "Volume",
      chartValues: toSingleValueChartData(tokenData.volume, "date", "volume"),
      visible: true,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
    },
    {
      dataPoint: "TXN Count",
      title: "TXN Count",
      chartValues: toSingleValueChartData(
        tokenData.count,
        "date",
        "number_of_txns"
      ),
      visible: false,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
    },
    {
      dataPoint: "Active Senders",
      title: "Active Senders",
      chartValues: toSingleValueChartData(
        tokenData.address,
        "date",
        "active_senders"
      ),
      visible: false,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
    },
    {
      dataPoint: "Active Recipients",
      title: "Active Recipients",
      chartValues: toSingleValueChartData(
        tokenData.address,
        "date",
        "active_recipients"
      ),
      visible: false,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
    },
    {
      dataPoint: "Price",
      title: "Price",
      chartValues: toSingleValueChartData(tokenData.price, "day", "price"),
      visible: false,
      solidColor: "rgba(250, 78, 150, 1)",
      topColor: "rgba(250, 78, 150, 0.3)",
      bottomColor: "rgba(250, 78, 150, 0.04)"
    }
  ];

  return baseDataSet;
};
