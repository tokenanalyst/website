const TA = require('../services/ta-api-node/ta');

const setResponseCache = require('./utils/setResponseCache');
const formatApiError = require('./utils/formatApiError');

module.exports = async (_, res) => {
  const FORMAT = 'json';
  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';

  const publicApi = TA({
    apiUrl: PUBLIC_API_URL,
  });

  let exchangeFlows;

  try {
    exchangeFlows = await publicApi.exchangeFlowsAllTokensV5({
      format: FORMAT,
    });
  } catch (err) {
    const { code, body } = formatApiError(err);
    return res.status(code).send(body);
  }

  setResponseCache().forEach(cacheHeader => {
    res.setHeader(...cacheHeader);
  });

  res.send({ ta_response: exchangeFlows.data });
};
