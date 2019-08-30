import axios from "axios";

import { STABLE_TOKENS, NATIVE_TOKENS } from "../constants/tokens";

module.exports = async (_, res) => {
  const filteredStableCoins = Object.keys(STABLE_TOKENS).filter(
    stableCoin => stableCoin !== STABLE_TOKENS.USDT_OMNI
  );

  const stableCoinApiResponses = filteredStableCoins.map(async stableCoin => [
    await axios.get(
      `https://api.tokenanalyst.io/analytics/last?job=${stableCoin}_volume_30day_v5&format=json`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/last?job=${stableCoin}_count_30day_v5&format=json`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/last?job=${stableCoin}_active_address_30day_v5&format=json`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/last?job=${stableCoin}_price_30day_v5&format=json`
    )
  ]);

  const nativeApiResponses = Object.keys(NATIVE_TOKENS).map(
    async nativeCoin => [
      await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${nativeCoin}_volume_30day_v5&format=json`
      ),
      await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${nativeCoin}_count_30day_v5&format=json`
      ),
      await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${nativeCoin}_active_address_30day_v5&format=json`
      ),
      await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${nativeCoin}_price_30day_v5&format=json`
      ),
      await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${nativeCoin}_nvt_30day_v5&format=json`
      ),
      await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${nativeCoin}_fees_30day_v5&format=json`
      ),
      await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${nativeCoin}_miner_hashrate_30day_v5&format=json`
      ),
      await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${nativeCoin}_miner_rewards_30day_v5&format=json`
      )
    ]
  );

  const stableCoinResults = await Promise.all(stableCoinApiResponses);
  const nativeResults = await Promise.all(nativeApiResponses);

  const response = {
    ...filteredStableCoins.reduce(
      (acc, curr, index) => ({
        ...acc,
        [curr]: {
          volume: stableCoinResults[index][0].data,
          count: stableCoinResults[index][1].data,
          address: stableCoinResults[index][2].data,
          price: stableCoinResults[index][3].data
        }
      }),
      {}
    ),
    ...Object.keys(NATIVE_TOKENS).reduce(
      (acc, curr, index) => ({
        ...acc,
        [curr]: {
          volume: nativeResults[index][0].data,
          count: nativeResults[index][1].data,
          address: nativeResults[index][2].data,
          price: nativeResults[index][3].data,
          nvt: nativeResults[index][4].data,
          fees: nativeResults[index][5].data,
          hashrate: nativeResults[index][6].data,
          rewards: nativeResults[index][7].data
        }
      }),
      {}
    )
  };

  res.send({ ta_response: response });
};
