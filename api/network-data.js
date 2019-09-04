import axios from "axios";

import { STABLE_TOKENS, NATIVE_TOKENS } from "../constants/tokens";

module.exports = async (_, res) => {
  const filteredStableCoins = Object.keys(STABLE_TOKENS).filter(
    stableCoin =>
      stableCoin !== STABLE_TOKENS.USDT_OMNI &&
      stableCoin !== STABLE_TOKENS.USDT
  );

  const stableCoinApiResponses = filteredStableCoins.map(async stableCoin => [
    await axios.get(
      `https://api.tokenanalyst.io/analytics/private/v1/token_volume_historical/last?key=${process.env.API_KEY}&format=json&token=${stableCoin}&limit=30`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/private/v1/token_count_historical/last?key=${process.env.API_KEY}&format=json&token=${stableCoin}&limit=30`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/private/v1/token_active_address_historical/last?key=${process.env.API_KEY}&format=json&token=${stableCoin}&limit=30`
    )
  ]);

  const nativeApiResponses = Object.keys(NATIVE_TOKENS).map(
    async nativeCoin => [
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_volume_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d&limit=30`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_volume_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&limit=30`
      ),
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_count_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d&limit=30`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_count_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&limit=30`
      ),
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_active_address_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d&limit=30`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_active_address_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&limit=30`
      ),
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_nvt_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d&limit=30`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_nvt_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&limit=30`
      ),
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_fees_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d&limit=30`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_fees_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&limit=30`
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
          address: stableCoinResults[index][2].data
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
          nvt: nativeResults[index][3].data,
          fees: nativeResults[index][4].data,
          hashrate: nativeResults[index][5].data,
          rewards: nativeResults[index][6].data
        }
      }),
      {}
    )
  };

  res.send({ ta_response: response });
};
