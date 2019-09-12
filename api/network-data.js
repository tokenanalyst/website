import axios from "axios";
import url from "url";

const isAuthorised = require("./auth/isAuthorised");
import { NATIVE_TOKENS } from "../constants/tokens";
import { setResponseCache } from "./utils/setResponseCache";
import { API_ERROR_MSG } from "../constants/apiErrors";

const LIMITED_DAYS = 90;

function isStableCoin(token) {
  return token !== NATIVE_TOKENS.BTC && token !== NATIVE_TOKENS.ETH;
}

function createUrl(dataPoint, paramString, hasLimit) {
  return `https://api.tokenanalyst.io/analytics/private/v1/${dataPoint}/last?${paramString}${
    hasLimit ? `&limit=${LIMITED_DAYS}` : ``
  }`;
}

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const {
    query: { token }
  } = urlParts;

  if (!token) {
    return res.status(400).send({ message: API_ERROR_MSG.NO_TOKEN_PROVIDED });
  }

  const hasLimit = !(
    req.cookies.apiKey && (await isAuthorised(req.cookies.apiKey))
  );

  const apiResponse = isStableCoin(token)
    ? [
        axios.get(
          createUrl(
            `token_volume_historical`,
            `key=${process.env.API_KEY}&format=json&token=${token}`,
            hasLimit
          )
        ),
        axios.get(
          createUrl(
            `token_count_historical`,
            `key=${process.env.API_KEY}&format=json&token=${token}`,
            hasLimit
          )
        ),
        axios.get(
          createUrl(
            `token_active_address_historical`,
            `key=${process.env.API_KEY}&format=json&token=${token}`,
            hasLimit
          )
        )
      ]
    : [
        axios.get(
          token === NATIVE_TOKENS.BTC
            ? createUrl(
                `token_volume_window_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}&window=1d`,
                hasLimit
              )
            : createUrl(
                `token_volume_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}`,
                hasLimit
              )
        ),
        axios.get(
          token === NATIVE_TOKENS.BTC
            ? createUrl(
                `token_count_window_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}&window=1d`,
                hasLimit
              )
            : createUrl(
                `token_count_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}`,
                hasLimit
              )
        ),
        axios.get(
          token === NATIVE_TOKENS.BTC
            ? createUrl(
                `token_active_address_window_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}&window=1d`,
                hasLimit
              )
            : createUrl(
                `token_active_address_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}`,
                hasLimit
              )
        ),
        axios.get(
          token === NATIVE_TOKENS.BTC
            ? createUrl(
                `token_nvt_window_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}&window=1d`,
                hasLimit
              )
            : createUrl(
                `token_nvt_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}`,
                hasLimit
              )
        ),
        axios.get(
          token === NATIVE_TOKENS.BTC
            ? createUrl(
                `token_fees_window_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}&window=1d`,
                hasLimit
              )
            : createUrl(
                `token_fees_historical`,
                `key=${process.env.API_KEY}&format=json&token=${token}`,
                hasLimit
              )
        )
      ];

  const results = await Promise.all(apiResponse);

  const response = isStableCoin(token)
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
        fees: results[4].data
      };

  setResponseCache().map(cacheHeader => {
    res.setHeader(...cacheHeader);
  });
  res.send({ ta_response: response });
};
