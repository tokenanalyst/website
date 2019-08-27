export const getStableCoinTableData = apiData => ({
  accessors: {
    coin: "coin",
    volume: "volume",
    volumeChange: "percentChange",
    transactions: "transactions",
    transactionsChange: "transactionsChange",
    supply: "supply"
  },
  columnHeaders: {
    coin: "Coin",
    volume: "Volume",
    volumeChange: "Change",
    transactions: "Txns",
    transactionsChange: "Change",
    supply: "Circulating Supply"
  },
  data: apiData.map(datum => ({
    coin: datum.address.entity,
    volume: datum.volume["current_24h_usd"],
    percentChange: datum.volume["percent_change"],
    transactions: datum.count["current_24h"],
    transactionsChange: datum.count["percent_change"],
    supply: datum.supply["total_supply"]
  }))
});
