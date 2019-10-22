const url = require('url');
const getUserAuth = require('./auth/getUserAuth');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');
const filterSeriesByTime = require('./utils/filterSeriesByTime');
import { API_METRICS } from '../constants/apiMetrics';
const TA = require('../services/ta-api-node/ta');
const formatApiError = require('./utils/formatApiError');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const {
    query: { metric, token, window, from_date, to_date },
  } = urlParts;

  const { userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = makeUnixtimeLimit(
    window,
    userData.tier.timeLimits[window]
  );

  const privateApi = TA({ apiKey: process.env.API_KEY });

  const PARAMS = { window, format: 'json' };

  const params = {
    key: process.env.API_KEY,
    format: PARAMS.format,
    token,
    window: PARAMS.window,
    from_date,
    to_date,
  };

  const apiFunctions = {
    [API_METRICS.Volume]: privateApi.tokenVolumeWindowHistorical,
    [API_METRICS.Transactions]: privateApi.tokenCountWindowHistorical,
    [API_METRICS.Addresses]: privateApi.tokenActiveAddressWindowHistorical,
    [API_METRICS.Supply]: privateApi.tokenSupplyWindowHistorical,
    [API_METRICS.Nvt]: privateApi.tokenNvtWindowHistorical,
    [API_METRICS.Fees]: privateApi.tokenFeesWindowHistorical,
    [API_METRICS.Utxo]: privateApi.tokenUtxoAgeWindowHistorical,
  };

  let result;

  try {
    result = await apiFunctions[metric](params);
  } catch (err) {
    const { code, body } = formatApiError(err);
    return res.status(code).send(body);
  }

  res.send(filterSeriesByTime(result.data, tierTimeLimit));
};
