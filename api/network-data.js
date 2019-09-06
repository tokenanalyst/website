import axios from "axios";
import url from "url";

import { NATIVE_TOKENS } from "../constants/tokens";

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const token = urlParts.query.token;

  const apiResponse =
    token !== NATIVE_TOKENS.BTC && token !== NATIVE_TOKENS.ETH
      ? [
          axios.get(
            `https://api.tokenanalyst.io/analytics/private/v1/token_volume_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&limit=90`
          ),
          axios.get(
            `https://api.tokenanalyst.io/analytics/private/v1/token_count_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&limit=90`
          ),
          axios.get(
            `https://api.tokenanalyst.io/analytics/private/v1/token_active_address_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&limit=90`
          )
        ]
      : [
          axios.get(
            token === NATIVE_TOKENS.BTC
              ? `https://api.tokenanalyst.io/analytics/private/v1/token_volume_window_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&window=1d&limit=90`
              : `https://api.tokenanalyst.io/analytics/private/v1/token_volume_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&limit=90`
          ),
          axios.get(
            token === NATIVE_TOKENS.BTC
              ? `https://api.tokenanalyst.io/analytics/private/v1/token_count_window_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&window=1d&limit=90`
              : `https://api.tokenanalyst.io/analytics/private/v1/token_count_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&limit=90`
          ),
          axios.get(
            token === NATIVE_TOKENS.BTC
              ? `https://api.tokenanalyst.io/analytics/private/v1/token_active_address_window_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&window=1d&limit=30`
              : `https://api.tokenanalyst.io/analytics/private/v1/token_active_address_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&limit=90`
          ),
          axios.get(
            token === NATIVE_TOKENS.BTC
              ? `https://api.tokenanalyst.io/analytics/private/v1/token_nvt_window_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&window=1d&limit=90`
              : `https://api.tokenanalyst.io/analytics/private/v1/token_nvt_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&limit=90`
          ),
          axios.get(
            token === NATIVE_TOKENS.BTC
              ? `https://api.tokenanalyst.io/analytics/private/v1/token_fees_window_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&window=1d&limit=90`
              : `https://api.tokenanalyst.io/analytics/private/v1/token_fees_historical/last?key=${process.env.API_KEY}&format=json&token=${token}&limit=90`
          ),
          axios.get(
            `https://api.tokenanalyst.io/analytics/last?job=${token}_miner_hashrate_30day_v5&format=json`
          ),
          axios.get(
            `https://api.tokenanalyst.io/analytics/last?job=${token}_miner_rewards_30day_v5&format=json`
          )
        ];

  const results = await Promise.all(apiResponse);

  const response =
    token !== NATIVE_TOKENS.BTC && token !== NATIVE_TOKENS.ETH
      ? {
          volume: results[0].data,
          count: results[1].data,
          address: results[2].data
        }
      : {
          volume: results[0].data,
          count: results[1].data,
          address: results[2].data,
          nvt: results[3].data,
          fees: results[4].data,
          hashrate: results[5].data,
          rewards: results[6].data
        };

  res.send({ ta_response: response });
};
