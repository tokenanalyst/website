const url = require('url');

const { API_ERROR_MSG } = require('../constants/apiErrors');
const { DATA_WINDOWS } = require('../constants/filters');
const formatApiError = require('./utils/formatApiError');
const setResponseCache = require('./utils/setResponseCache');
const TA = require('../services/ta-api-node/ta');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const tokensParam = urlParts.query.tokens;
  const tokens = urlParts.query.tokens && tokensParam.split(',');
  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';
  const FORMAT = 'json';

  if (!tokens) {
    return res.status(400).send({ message: API_ERROR_MSG.NO_TOKEN_PROVIDED });
  }

  const publicApi = TA({
    apiUrl: PUBLIC_API_URL,
  });

  const latestPriceRequests = tokens.map(token =>
    publicApi.latestPriceV5({ token, format: FORMAT })
  );

  const latestPriceResponses = await Promise.all(latestPriceRequests).catch(
    err => {
      const { code, body } = formatApiError(err);
      return res.status(code).send(body);
    }
  );

  const exchangeFlows30DayAllTokensRequest = publicApi.exchangeFlowsAllTokens30Day(
    { format: FORMAT }
  );

  const allExchangeFlowsAllTokensRequest = publicApi.allExchangeFlowsAllTokensV5(
    { format: FORMAT }
  );

  const allExchangeFlows24hAllTokensRequest = publicApi.exchangeFlowsAllTokens48hV5(
    { format: FORMAT }
  );

  const [
    exchangeFlows30DayAllTokensResponse,
    allExchangeFlowsAllTokensResponse,
    allExchangeFlows24hAllTokensResponse,
  ] = await Promise.all([
    exchangeFlows30DayAllTokensRequest,
    allExchangeFlowsAllTokensRequest,
    allExchangeFlows24hAllTokensRequest,
  ]).catch(err => {
    const { code, body } = formatApiError(err);
    return res.status(code).send(body);
  });

  const ta_response = {};

  latestPriceResponses.forEach(response => {
    ta_response[response.data[0].token] = { token: response.data[0] };
  });

  tokens.forEach(token => {
    ta_response[token].sparklines = {
      days: {},
      hours: {},
    };
    ta_response[
      token
    ].sparklines.days.inflow = exchangeFlows30DayAllTokensResponse.data
      .filter(item => item.token === token.toLowerCase())
      .map(item => item.inflow_usd);

    ta_response[
      token
    ].sparklines.days.outflow = exchangeFlows30DayAllTokensResponse.data
      .filter(item => item.token === token.toLowerCase())
      .map(item => item.outflow_usd);

    ta_response[
      token
    ].sparklines.hours.inflow = allExchangeFlows24hAllTokensResponse.data
      .filter(item => item.token === token.toLowerCase())
      .map(item => item.inflow_usd);

    ta_response[
      token
    ].sparklines.hours.outflow = allExchangeFlows24hAllTokensResponse.data
      .filter(item => item.token === token.toLowerCase())
      .map(item => item.outflow_usd);

    ta_response[token].values = {};

    DATA_WINDOWS.forEach(dataWindow => {
      const tokenData = allExchangeFlowsAllTokensResponse.data.find(
        item => item.token === token && item.window === dataWindow
      );

      const castToNumber = data => {
        return Object.keys(data).reduce((cur, key) => {
          if (key === 'token' || key === 'window') {
            return {
              ...cur,
              [key]: data[key],
            };
          }
          return {
            ...cur,
            [key]: isNaN(data[key]) ? 0 : Number(data[key]),
          };
        }, {});
      };

      const {
        inflow_sum,
        inflow_usd_sum,
        inflow_sum_pct_change,
        inflow_usd_sum_pct_change,
        outflow_sum,
        outflow_usd_sum,
        outflow_sum_pct_change,
        outflow_usd_sum_pct_change,
      } = castToNumber(tokenData);

      ta_response[token].values[`data-window-${dataWindow}`] = {
        inflow_sum,
        inflow_usd_sum,
        inflow_sum_pct_change,
        inflow_usd_sum_pct_change,
        outflow_sum,
        outflow_usd_sum,
        outflow_sum_pct_change,
        outflow_usd_sum_pct_change,
      };
    });
  });

  setResponseCache().forEach(cacheHeader => {
    res.setHeader(...cacheHeader);
  });

  return res.send(ta_response);
};
