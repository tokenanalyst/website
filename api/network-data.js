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
      `https://api.tokenanalyst.io/analytics/private/v1/token_volume_historical/last?key=${process.env.API_KEY}&format=json&token=${stableCoin}`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/private/v1/token_count_historical/last?key=${process.env.API_KEY}&format=json&token=${stableCoin}`
    ),
    await axios.get(
      `https://api.tokenanalyst.io/analytics/private/v1/token_active_address_historical/last?key=${process.env.API_KEY}&format=json&token=${stableCoin}`
    )
  ]);

  const nativeApiResponses = Object.keys(NATIVE_TOKENS).map(
    async nativeCoin => [
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_volume_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_volume_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}`
      ),
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_count_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_count_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}`
      ),
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_active_address_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_active_address_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}`
      ),
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_nvt_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_nvt_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}`
      ),
      await axios.get(
        nativeCoin === NATIVE_TOKENS.BTC
          ? `https://api.tokenanalyst.io/analytics/private/v1/token_fees_window_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}&window=1d`
          : `https://api.tokenanalyst.io/analytics/private/v1/token_fees_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}`
      ),
      await axios.get(
        `https://api.tokenanalyst.io/analytics/private/v1/token_miner_hashrate_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}`
      ),
      await axios.get(
        `https://api.tokenanalyst.io/analytics/private/v1/token_miner_rewards_historical/last?key=${process.env.API_KEY}&format=json&token=${nativeCoin}`
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
          volume: stableCoinResults[index][0].data.slice(
            stableCoinResults[index][0].data.length - 30
          ),
          count: stableCoinResults[index][1].data.slice(
            stableCoinResults[index][1].data.length - 30
          ),
          address: stableCoinResults[index][2].data.slice(
            stableCoinResults[index][2].data.length - 30
          )
        }
      }),
      {}
    ),
    ...Object.keys(NATIVE_TOKENS).reduce(
      (acc, curr, index) => ({
        ...acc,
        [curr]: {
          volume: nativeResults[index][0].data.slice(
            nativeResults[index][0].data.length - 30
          ),
          count: nativeResults[index][1].data.slice(
            nativeResults[index][1].data.length - 30
          ),
          address: nativeResults[index][2].data.slice(
            nativeResults[index][2].data.length - 30
          ),
          nvt: nativeResults[index][3].data.slice(
            nativeResults[index][3].data.length - 30
          ),
          fees: nativeResults[index][4].data.slice(
            nativeResults[index][4].data.length - 30
          ),
          hashrate: nativeResults[index][5].data.slice(
            nativeResults[index][5].data.length - 30
          ),
          rewards: nativeResults[index][6].data.slice(
            nativeResults[index][6].data.length - 30
          )
        }
      }),
      {}
    )
  };

  res.send({ ta_response: response });
};
