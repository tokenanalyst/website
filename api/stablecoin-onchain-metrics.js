import axios from "axios";

import { STABLE_TOKENS } from "../constants/tokens";

const Stablecoins = [
  STABLE_TOKENS.USDT_ERC20,
  STABLE_TOKENS.USDC,
  STABLE_TOKENS.PAX,
  STABLE_TOKENS.DAI,
  STABLE_TOKENS.TUSD,
  STABLE_TOKENS.GUSD
];

module.exports = async (req, res) => {
  const apiResponses = Stablecoins.map(async stablecoin => [
    await axios.get(
      `https://api.tokenanalyst.io/analytics/last?job=${stablecoin}_holder_address_24h_rolling_v5&format=json`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/last?job=${stablecoin}_volume_24h_rolling_v5&format=json`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/last?job=${stablecoin}_count_24h_rolling_v5&format=json`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/last?job=public_${stablecoin}_total_supply_v5&format=json`
    )
  ]);

  const results = await Promise.all(apiResponses);

  const response = results.reduce(
    (acc, curr) => [
      ...acc,
      {
        address: { ...curr[0].data[0] },
        volume: { ...curr[1].data[0] },
        count: { ...curr[2].data[0] },
        supply: { ...curr[3].data[0] }
      }
    ],
    []
  );

  res.send({ ta_response: response });
};
