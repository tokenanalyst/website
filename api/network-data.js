import axios from "axios";
import url from "url";

const isAuthorised = require("./auth/isAuthorised");
import { NATIVE_TOKENS } from "../constants/tokens";
import { API_ERROR_MSG } from "../constants/apiErrors";

const LIMITED_DAYS = 90;

function isStableCoin(token) {
  return token !== NATIVE_TOKENS.BTC && token !== NATIVE_TOKENS.ETH;
}

function makeQuery(params = {}) {
  const query = Object.keys(params).reduce(
    (acc, param) => `${acc}${param}=${params[param]}&`,
    ""
  );

  return `${query.slice(0, -1)}`;
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
            `token_volume_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: "json",
              token,
              window: "1d"
            }),
            hasLimit
          )
        ),
        axios.get(
          createUrl(
            `token_count_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: "json",
              token,
              window: "1d"
            }),
            hasLimit
          )
        ),
        axios.get(
          createUrl(
            `token_active_address_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: "json",
              token,
              window: "1d"
            }),
            hasLimit
          )
        ),
        axios.get(
          createUrl(
            `token_price_usd_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: "json",
              token,
              window: "1d"
            }),
            hasLimit
          )
        )
      ]
    : [
        axios.get(
          token === NATIVE_TOKENS.BTC
            ? createUrl(
                `token_volume_window_historical`,
                makeQuery({
                  key: process.env.API_KEY,
                  format: "json",
                  token,
                  window: "1d"
                }),
                hasLimit
              )
            : createUrl(
                `token_volume_historical`,
                makeQuery({ key: process.env.API_KEY, format: "json", token }),
                hasLimit
              )
        ),
        axios.get(
          createUrl(
            `token_count_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: "json",
              token,
              window: "1d"
            }),
            hasLimit
          )
        ),
        axios.get(
          createUrl(
            `token_active_address_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: "json",
              token,
              window: "1d"
            }),
            hasLimit
          )
        ),
        axios.get(
          createUrl(
            `token_nvt_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: "json",
              token,
              window: "1d"
            }),
            hasLimit
          )
        ),
        axios.get(
          createUrl(
            `token_fees_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: "json",
              token,
              window: "1d"
            }),
            hasLimit
          )
        ),
        axios.get(
          createUrl(
            `token_price_usd_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: "json",
              token,
              window: "1d"
            }),
            hasLimit
          )
        )
      ];

  const results = await Promise.all(apiResponse);

  const response = isStableCoin(token)
    ? {
        volume: results[0].data,
        count: results[1].data,
        address: results[2].data,
        price: results[3].data
      }
    : {
        volume: results[0].data,
        count: results[1].data,
        address: results[2].data,
        nvt: results[3].data,
        fees: results[4].data,
        price: results[5].data
      };

  res.send({ ta_response: response });
};
