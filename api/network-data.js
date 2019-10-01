const axios = require('axios');
const url = require('url');

// const isAuthorised = require('./auth/isAuthorised');
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
  const WINDOW = '1d';

  const FORMAT = 'json';

  const { isAuthorised, userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = userData.tier.timeLimits[WINDOW];

  const seriesTimeLimit = makeUnixtimeLimit(
    WINDOW,
    tierTimeLimit,
    isAuthorised
  );

  const apiResponse = isStableCoin(token)
    ? [
        axios.get(
          createUrl(
            `token_volume_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: FORMAT,
              token,
              window: WINDOW,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_count_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: FORMAT,
              token,
              window: WINDOW,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_active_address_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: FORMAT,
              token,
              window: WINDOW,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_price_usd_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: FORMAT,
              token,
              window: WINDOW,
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
              format: FORMAT,
              token,
              window: WINDOW,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_count_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: FORMAT,
              token,
              window: WINDOW,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_active_address_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: FORMAT,
              token,
              window: WINDOW,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_price_usd_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: FORMAT,
              token,
              window: WINDOW,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_nvt_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: FORMAT,
              token,
              window: WINDOW,
            })
          )
        ),
        axios.get(
          createUrl(
            `token_fees_window_historical`,
            makeQuery({
              key: process.env.API_KEY,
              format: FORMAT,
              token,
              window: WINDOW,
            })
          )
        ),
      ];

  const results = await Promise.all(apiResponse);

  const [volume, count, address, price, ntv, fees] = results;

  const response = isStableCoin(token)
    ? {
        volume: filterSeriesByTime(volume.data, seriesTimeLimit),
        count: filterSeriesByTime(count.data, seriesTimeLimit),
        address: filterSeriesByTime(address.data, seriesTimeLimit),
        price: filterSeriesByTime(price.data, seriesTimeLimit),
      }
    : {
        volume: filterSeriesByTime(volume.data, seriesTimeLimit),
        count: filterSeriesByTime(count.data, seriesTimeLimit),
        address: filterSeriesByTime(address.data, seriesTimeLimit),
        price: filterSeriesByTime(price.data, seriesTimeLimit),
        nvt: filterSeriesByTime(ntv.data, seriesTimeLimit),
        fees: filterSeriesByTime(fees.data, seriesTimeLimit),
      };

  res.send({ ta_response: response });
};
