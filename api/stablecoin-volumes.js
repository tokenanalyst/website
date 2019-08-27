import axios from "axios";

const Stablecoins = [
  "USDT_OMNI",
  "USDT_ERC20",
  "USDC",
  "PAX",
  "DAI",
  "TUSD",
  "GUSD"
];

module.exports = async (req, res) => {
  const apiResponses = Stablecoins.map(
    async stablecoin =>
      await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${stablecoin}_volume_30day_v5&format=json`
      )
  );

  const results = await Promise.all(apiResponses);

  const response = Stablecoins.map((stablecoin, index) => ({
    name: stablecoin,
    data: results[index].data
  }));

  res.send({ ta_response: response });
};
