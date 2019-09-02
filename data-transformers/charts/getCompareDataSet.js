import { toSingleValueChartData } from "./mappers";

import { NATIVE_TOKENS } from "../../constants/tokens";

export const getCompareDataSet = (response, token, color) => {
  const tokenData = response[token];
  const baseDataSet = [
    {
      dataPoint: "Volume (USD)",
      title: `${token} Volume (USD)`,
      chartValues: toSingleValueChartData(
        tokenData.volume,
        "date",
        token === NATIVE_TOKENS.BTC
          ? "volume_real_usd"
          : token === NATIVE_TOKENS.ETH
          ? "volume_gross_usd"
          : "volume_usd"
      ),
      visible: true,
      solidColor: color
    },
    {
      dataPoint: `Volume (${token})`,
      title: `${token} Volume`,
      chartValues: toSingleValueChartData(
        tokenData.volume,
        "date",
        token === NATIVE_TOKENS.BTC
          ? "volume_real"
          : token === NATIVE_TOKENS.ETH
          ? "volume_gross"
          : "volume"
      ),
      visible: false,
      solidColor: color
    },
    {
      dataPoint: "TXN Count",
      title: `${token} TXN Count`,
      chartValues: toSingleValueChartData(
        tokenData.count,
        "date",
        "number_of_txns"
      ),
      visible: false,
      solidColor: color
    },
    {
      dataPoint: "Active Senders",
      title: `${token} Active Senders`,
      chartValues: toSingleValueChartData(
        tokenData.address,
        "date",
        "active_senders"
      ),
      visible: false,
      solidColor: color
    },
    {
      dataPoint: "Active Recipients",
      title: `${token} Active Recipients`,
      chartValues: toSingleValueChartData(
        tokenData.address,
        "date",
        "active_recipients"
      ),
      visible: false,
      solidColor: color
    },
    {
      dataPoint: "Price",
      title: `${token} Price`,
      chartValues: toSingleValueChartData(
        tokenData.volume,
        "date",
        "price_usd"
      ),
      visible: false,
      solidColor: color
    }
  ];

  if (token === NATIVE_TOKENS.BTC || token === NATIVE_TOKENS.ETH) {
    const nativeBaseDataSet = baseDataSet.concat([
      {
        dataPoint: "Volume Change",
        title: `${token} Volume Change`,
        chartValues: toSingleValueChartData(
          tokenData.volume,
          "date",
          "volume_change_usd"
        ),
        visible: false,
        solidColor: color
      },
      {
        dataPoint: "NVT",
        title: `${token} NVT`,
        chartValues: toSingleValueChartData(tokenData.nvt, "date", "nvt"),
        visible: false,
        solidColor: color
      },
      {
        dataPoint: "Fees",
        title: `${token} Fees`,
        chartValues: toSingleValueChartData(
          tokenData.fees,
          "date",
          "total_fee_usd"
        ),
        visible: false,
        solidColor: color
      },
      {
        dataPoint: "Hash Rate",
        title: `${token} Hash Rate TH/s`,
        chartValues: toSingleValueChartData(
          tokenData.hashrate,
          "date",
          "total_daily_hashrate"
        ),
        visible: false,
        solidColor: color
      },
      {
        dataPoint: "Miner Rewards",
        title: `${token} Miner Rewards`,
        chartValues: toSingleValueChartData(
          tokenData.rewards,
          "date",
          "total_daily_block_reward_usd"
        ),
        visible: false,
        solidColor: color
      }
    ]);

    if (token === NATIVE_TOKENS.ETH) {
      return nativeBaseDataSet
        .concat([
          {
            dataPoint: "Uncle Rewards",
            title: `${token} Uncle Rewards`,
            chartValues: toSingleValueChartData(
              tokenData.rewards,
              "date",
              "total_daily_uncle_reward_usd"
            ),
            visible: false,
            solidColor: color
          }
        ])
        .filter(data => data.dataPoint !== "Volume Change");
    }

    return nativeBaseDataSet;
  }

  return baseDataSet;
};
