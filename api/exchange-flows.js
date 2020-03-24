/* eslint-disable camelcase */
const url = require('url');
const TA = require('ta-api-node');

const { API_ERROR_MSG } = require('../constants/apiErrors');
const getUserAuth = require('./auth/getUserAuth');
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
    extend: {
      last: 'last',
    },
  });

  const baseParams = {
    format: FORMAT,
    token,
    exchange: encodeURIComponent(exchange),
    window: timeWindow,
  };

  const priceApiRequest = privateApi.tokenPriceUsdWindowHistorical(
    makeCallParams(baseParams, null, from_date, to_date)
  );

  const exchangeFlowsAllTokensRequest = publicApi.last({
    job: 'exchange_flows_all_tokens_v5',
    format: FORMAT,
  });

  const inFlowApiReq = privateApi.exchangeFlowWindowHistorical(
    makeCallParams(baseParams, 'inflow', from_date, to_date)
  );
  const outFlowApiReq = privateApi.exchangeFlowWindowHistorical(
    makeCallParams(baseParams, 'outflow', from_date, to_date)
  );

  const [
    inFlowApiRes,
    outFlowApiRes,
    publicApiResponse,
    tokenPriceApiResponse,
  ] = await Promise.all([
    inFlowApiReq,
    outFlowApiReq,
    exchangeFlowsAllTokensRequest,
    priceApiRequest,
  ]).catch(err => {
    const { status, body } = formatApiError(err);
    return res.status(status).send(body);
  });

  let responseErr;

  [
    inFlowApiRes,
    outFlowApiRes,
    publicApiResponse,
    tokenPriceApiResponse,
  ].forEach(response => {
    if (response.status !== 200) {
      responseErr = response;
    }
  });

  if (responseErr) {
    const { status, body } = formatApiError(responseErr);

    return res.status(status).send(body);
  }

  const inFlow = inFlowApiRes.data;
  const outFlow = outFlowApiRes.data;

  const netflow = makeNetFlowSeries(inFlow, outFlow, from_date, to_date);

  return res.send({
    ta_response: {
      inflow: filterSeriesByTime(inFlowApiRes.data, tierTimeLimit),
      outflow: filterSeriesByTime(outFlowApiRes.data, tierTimeLimit),
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
