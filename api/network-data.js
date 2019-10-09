const url = require('url');
const TA = require('../services/ta-api-node/ta');
const formatApiError = require('./utils/formatApiError');

const getUserAuth = require('./auth/getUserAuth');
const { API_ERROR_MSG } = require('../constants/apiErrors');
const filterSeriesByTime = require('./utils/filterSeriesByTime');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');
const { tokensDb } = require('../services/tokensDb');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const {
    query: { token },
  } = urlParts;

  if (!token) {
    return res.status(400).send({ message: API_ERROR_MSG.NO_TOKEN_PROVIDED });
  }

  const PARAMS = { window: '1d', format: 'json' };

  const privateApi = TA({ apiKey: process.env.API_KEY });

  const { userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = userData.tier.timeLimits[PARAMS.window];

  const filterTimeLimit = makeUnixtimeLimit(PARAMS.window, tierTimeLimit);

  const params = {
    key: process.env.API_KEY,
    format: PARAMS.format,
    token,
    window: PARAMS.window,
  };

  const starndardRequests = [
    privateApi.tokenVolumeWindowHistorical(params),
    privateApi.tokenCountWindowHistorical(params),
    privateApi.tokenActiveAddressWindowHistorical(params),
    privateApi.tokenPriceUsdWindowHistorical(params),
  ];

  const allRequests = [
    ...starndardRequests,
    privateApi.tokenNvtWindowHistorical(params),
    privateApi.tokenFeesWindowHistorical(params),
  ];

  const apiRequests = !tokensDb.isNative(token)
    ? starndardRequests
    : allRequests;

  let results;

  try {
    results = await Promise.all(apiRequests);
  } catch (err) {
    const { code, body } = formatApiError(err);
    return res.status(code).send(body);
  }

  const [volume, count, address, price, ntv, fees] = results;

  const response = !tokensDb.isNative(token)
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
