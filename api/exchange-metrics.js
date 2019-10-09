const url = require('url');

const { API_ERROR_MSG } = require('../constants/apiErrors');
const getUserAuth = require('./auth/getUserAuth');
const TA = require('./utils/ta-api-node/ta');
const makeNetFlowSeries = require('./utils/makeNetFlowSeries');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');
const filterSeriesByTime = require('./utils/filterSeriesByTime');
const { makeCallParams } = require('./utils/makeCallParams');
const formatApiError = require('./utils/formatApiError');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const { token, exchange, timeWindow, from_date, to_date } = urlParts.query;
  const FORMAT = 'json';
  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';

  if (!token || !exchange || !timeWindow) {
    return res.status(400).send({ message: API_ERROR_MSG.PARAMS_MISSING });
  }

  const { userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = makeUnixtimeLimit(
    timeWindow,
    userData.tier.timeLimits[timeWindow]
  );

  const privateApi = TA({ apiKey: process.env.API_KEY });

  const publicApi = TA({
    apiUrl: PUBLIC_API_URL,
  });

  const baseParams = {
    format: FORMAT,
    token,
    exchange,
    window: timeWindow,
  };

  const priceApiRequest = privateApi.tokenPriceUsdWindowHistorical(
    makeCallParams(baseParams, null, from_date, to_date)
  );

  const exchangeFlowsAllTokensRequest = publicApi.exchangeFlowsAllTokens({
    format: FORMAT,
  });

  const inFlowApiRequest = privateApi.exchangeFlowWindowHistorical(
    makeCallParams(baseParams, 'inflow', from_date, to_date)
  );
  const outFlowApiRequest = privateApi.exchangeFlowWindowHistorical(
    makeCallParams(baseParams, 'outflow', from_date, to_date)
  );

  const [
    inflowTxnCountApiResponse,
    outflowTxnCountApiResponse,
    publicApiResponse,
    tokenPriceApiResponse,
  ] = await Promise.all([
    inFlowApiRequest,
    outFlowApiRequest,
    exchangeFlowsAllTokensRequest,
    priceApiRequest,
  ]).catch(err => {
    const { status, body } = formatApiError(err);
    return res.status(status).send(body);
  });

  if (
    inflowTxnCountApiResponse.data.status ||
    outflowTxnCountApiResponse.data.status
  ) {
    const { status, body } = formatApiError(inflowTxnCountApiResponse);
    return res.status(status).send(body);
  }

  const inFlow = inflowTxnCountApiResponse.data;
  const outFlow = outflowTxnCountApiResponse.data;

  const netflow = makeNetFlowSeries(inFlow, outFlow, from_date, to_date);

  return res.send({
    ta_response: {
      inflow: filterSeriesByTime(inflowTxnCountApiResponse.data, tierTimeLimit),
      outflow: filterSeriesByTime(
        outflowTxnCountApiResponse.data,
        tierTimeLimit
      ),
      netflow: filterSeriesByTime(netflow, tierTimeLimit),
      overall: publicApiResponse.data.filter(
        item =>
          item.token === token &&
          item.exchange.toLowerCase() === exchange.toLowerCase()
      ),
      price: filterSeriesByTime(tokenPriceApiResponse.data, tierTimeLimit),
    },
  });
};
