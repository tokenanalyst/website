const TA = require('ta-api-node');

const setResponseCache = require('./utils/setResponseCache');
const formatApiError = require('./utils/formatApiError');

module.exports = async (_, res) => {
  const FORMAT = 'json';
  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';

  const publicApi = TA({
    apiUrl: PUBLIC_API_URL,
    extend: {
      last: 'last',
    },
  });

  let exchangeFlows;

  try {
    exchangeFlows = await publicApi.last({
      job: 'exchange_flows_all_tokens_v5',
      format: FORMAT,
    });
  } catch (err) {
    const { status, body } = formatApiError(err);
    return res.status(status).send(body);
  }

  setResponseCache().forEach(cacheHeader => {
    res.setHeader(...cacheHeader);
  });

  return res.send({ ta_response: exchangeFlows.data });
};
