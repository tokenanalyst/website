const axios = require('axios');
const url = require('url');

const getUserAuth = require('./auth/getUserAuth');

const { NATIVE_TOKENS } = require('../constants/tokens');
const { API_ERROR_MSG } = require('../constants/apiErrors');
const filterSeriesByTime = require('./utils/filterSeriesByTime');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');

function isStableCoin(token) {
  return token !== NATIVE_TOKENS.BTC && token !== NATIVE_TOKENS.ETH;
}

function makeQuery(params = {}) {
  const query = Object.keys(params).reduce(
    (acc, param) => `${acc}${param}=${params[param]}&`,
    ''
  );

  return `${query.slice(0, -1)}`;
}

function createUrl(dataPoint, paramString) {
  return `https://api.tokenanalyst.io/analytics/private/v1/${dataPoint}/last?${paramString}`;
}

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const {
    query: { token },
  } = urlParts;

  if (!token) {
    return res.status(400).send({ message: API_ERROR_MSG.NO_TOKEN_PROVIDED });
  }

  const PARAMS = { window: '1d', format: 'json' };

  const { userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = userData.tier.timeLimits[PARAMS.window];

  const filterTimeLimit = makeUnixtimeLimit(PARAMS.window, tierTimeLimit);

  const apiResponse = isStableCoin(token)
    ? [
        axios.get(
          createUrl(
            `token_volume_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_count_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_active_address_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_price_usd_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
      ]
    : [
        axios.get(
          createUrl(
            `token_volume_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_count_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_active_address_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_price_usd_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_nvt_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_fees_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: PARAMS.format,
              token,
              window: PARAMS.window,
            })
          )
        ),
      ];

  const results = await Promise.all(apiResponse);

  const [volume, count, address, price, ntv, fees] = results;

  const response = isStableCoin(token)
    ? {
        volume: filterSeriesByTime(volume.data, filterTimeLimit),
        count: filterSeriesByTime(count.data, filterTimeLimit),
        address: filterSeriesByTime(address.data, filterTimeLimit),
        price: filterSeriesByTime(price.data, filterTimeLimit),
      }
    : {
        volume: filterSeriesByTime(volume.data, filterTimeLimit),
        count: filterSeriesByTime(count.data, filterTimeLimit),
        address: filterSeriesByTime(address.data, filterTimeLimit),
        price: filterSeriesByTime(price.data, filterTimeLimit),
        nvt: filterSeriesByTime(ntv.data, filterTimeLimit),
        fees: filterSeriesByTime(fees.data, filterTimeLimit),
      };

  return res.send({ ta_response: response });
};
