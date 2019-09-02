import axios from "axios";

import { STABLE_TOKENS } from "../constants/tokens";

const Stablecoins = [
  STABLE_TOKENS.USDT_OMNI,
  STABLE_TOKENS.USDT_ERC20,
  STABLE_TOKENS.USDC,
  STABLE_TOKENS.PAX,
  STABLE_TOKENS.DAI,
  STABLE_TOKENS.TUSD,
  STABLE_TOKENS.GUSD
];

module.exports = async (req, res) => {
  const apiResponses = Stablecoins.map(
    async stablecoin =>
      await axios.get(
        `https://api.tokenanalyst.io/analytics/private/v1/token_count_historical/last?key=${process.env.API_KEY}&format=json&token=${stablecoin}`
      )
  );

  const results = await Promise.all(apiResponses);

  const response = Stablecoins.map((stablecoin, index) => ({
    name: stablecoin,
    data: results[index].data.slice(results[index].data.length - 90)
  }));

  res.send({ ta_response: response });
};
