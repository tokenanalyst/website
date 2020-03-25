/* eslint-disable no-console */
/* eslint-disable camelcase */
const url = require('url');
const TA = require('ta-api-node');

const { API_ERROR_MSG } = require('../constants/apiErrors');
const { DATA_WINDOWS } = require('../constants/filters');
const { NATIVE_TOKENS } = require('../constants/tokens');
const {
  exchangeBalanceDays$,
} = require('./utils/observables/exchangeBalanceDays');
const {
  exchangeBalanceHours$,
} = require('./utils/observables/exchangeBalanceHours');

const formatApiError = require('./utils/formatApiError');
const setResponseCache = require('./utils/setResponseCache');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const tokensParam = urlParts.query.tokens;
  const tokens = urlParts.query.tokens && tokensParam.split(',');
  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';
  const FORMAT = 'json';

  if (!tokens) {
    return res.status(400).send({ message: API_ERROR_MSG.NO_TOKEN_PROVIDED });
  }

  let balancesDaysData;

  let balancesHoursData;

  if (tokens[0] === NATIVE_TOKENS.BTC || tokens[0] === NATIVE_TOKENS.ETH) {
    try {
      balancesDaysData = await exchangeBalanceDays$(30, tokens[0]).toPromise();
    } catch (err) {
      console.warn(err);
      const { status, body } = formatApiError(err);
      return res.status(status).send(body);
    }

    try {
      balancesHoursData = await exchangeBalanceHours$(1, tokens[0]).toPromise();
    } catch (err) {
      console.warn(err);
      const { status, body } = formatApiError(err);
      return res.status(status).send(body);
    }
  }

  const ta_response = {};

  const publicApi = TA({
    apiUrl: PUBLIC_API_URL,
    extend: {
      last: 'last',
    },
  });

  const latestPriceRequests = tokens.map(token =>
    publicApi.last({
      token,
      job: `${token}_latest_price_v5`,
      format: FORMAT,
    })
  );

  const latestPriceResponses = await Promise.all(latestPriceRequests).catch(
    err => {
      const { status, body } = formatApiError(err);
      return res.status(status).send(body);
    }
  );

  const exchangeFlows30DayAllTokensRequest = publicApi.last({
    job: 'exchange_flows_all_tokens_30day_v5',
    format: FORMAT,
  });

  const allExchangeFlowsAllTokensRequest = publicApi.last({
    job: 'all_exchange_flows_all_tokens_v5',
    format: FORMAT,
  });

  const allExchangeFlows24hAllTokensRequest = publicApi.last({
    job: 'exchange_flows_all_tokens_48h_v5',
    format: FORMAT,
  });

  const [
    exchangeFlows30DayAllTokensResponse,
    allExchangeFlowsAllTokensResponse,
    allExchangeFlows24hAllTokensResponse,
  ] = await Promise.all([
    exchangeFlows30DayAllTokensRequest,
    allExchangeFlowsAllTokensRequest,
    allExchangeFlows24hAllTokensRequest,
  ]).catch(err => {
    const { status, body } = formatApiError(err);
    return res.status(status).send(body);
  });

  latestPriceResponses.forEach(response => {
    ta_response[response.data[0].token] = { token: response.data[0] };
  });

  tokens.forEach(token => {
    if (!ta_response[token].sparklines) {
      ta_response[token].sparklines = {
        days: {},
        hours: {},
      };
    }

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
      .filter(item => {
        return item.token === token.toLowerCase();
      })
      .map(item => item.inflow_usd)
      .filter((_, index) => index > 23);

    ta_response[
      token
    ].sparklines.hours.outflow = allExchangeFlows24hAllTokensResponse.data
      .filter(item => item.token === token.toLowerCase())
      .map(item => item.outflow_usd)
      .filter((_, index) => index > 23);

    ta_response[token].sparklines.days.balance =
      balancesDaysData && balancesDaysData.data;

    ta_response[token].sparklines.hours.balance =
      balancesHoursData && balancesHoursData.data;

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
            [key]: Number.isNaN(data[key]) ? 0 : Number(data[key]),
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
        ...(dataWindow === '24h'
          ? balancesHoursData.summary[dataWindow]
          : balancesDaysData.summary[dataWindow]),
      };
    });
  });

  setResponseCache().forEach(cacheHeader => {
    res.setHeader(...cacheHeader);
  });

  return res.send(ta_response);
};
