/* eslint-disable camelcase */
const url = require('url');
const TA = require('ta-api-node');

const { API_ERROR_MSG } = require('../constants/apiErrors');
const { DATA_WINDOWS } = require('../constants/filters');
const { NATIVE_TOKENS } = require('../constants/tokens');
const minerBalanceDays$ = require('./utils/observables/minerBalanceDays');
const minerBalanceHours$ = require('./utils/observables/minerBalanceHours');
const minerFlowDays$ = require('./utils/observables/minerFlowDays');
const minerFlowHours$ = require('./utils/observables/minerFlowHours');

const formatApiError = require('./utils/formatApiError');
const setResponseCache = require('./utils/setResponseCache');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const tokens = urlParts.query.tokens && urlParts.query.tokens.split(',');

  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';
  const FORMAT = 'json';

  if (!tokens) {
    return res.status(400).send({ message: API_ERROR_MSG.NO_TOKEN_PROVIDED });
  }

  if (tokens[0] === 'ETH') {
    return res.status(200).send();
  }

  let balancesDaysData;

  let balancesHoursData;

  let flowsDaysData;

  let flowsHoursData;

  if (tokens[0] === NATIVE_TOKENS.BTC || tokens[0] === NATIVE_TOKENS.ETH) {
    try {
      balancesDaysData = await minerBalanceDays$(30, tokens[0]).toPromise();
      balancesHoursData = await minerBalanceHours$(1, tokens[0]).toPromise();
      flowsDaysData = await minerFlowDays$(30, tokens[0]).toPromise();
      flowsHoursData = await minerFlowHours$(1, tokens[0]).toPromise();
    } catch (err) {
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

    // Balance
    ta_response[token].sparklines.days.balance =
      balancesDaysData && balancesDaysData.data;

    ta_response[token].sparklines.hours.balance =
      balancesHoursData && balancesHoursData.data;

    // Flows
    ta_response[token].sparklines.days.inflow =
      flowsDaysData && flowsDaysData.inflow.data;

    ta_response[token].sparklines.days.outflow =
      flowsDaysData && flowsDaysData.outflow.data;

    ta_response[token].sparklines.hours.inflow =
      flowsHoursData && flowsHoursData.inflow.data;

    ta_response[token].sparklines.hours.outflow =
      flowsHoursData && flowsHoursData.outflow.data;

    ta_response[token].values = {};

    DATA_WINDOWS.forEach(dataWindow => {
      ta_response[token].values[`data-window-${dataWindow}`] = {
        ...(dataWindow === '24h'
          ? balancesHoursData.summary[dataWindow]
          : balancesDaysData.summary[dataWindow]),
        ...(dataWindow === '24h'
          ? flowsHoursData.inflow.summary[dataWindow]
          : flowsDaysData.inflow.summary[dataWindow]),
        ...(dataWindow === '24h'
          ? flowsHoursData.outflow.summary[dataWindow]
          : flowsDaysData.outflow.summary[dataWindow]),
      };
    });
  });

  setResponseCache().forEach(cacheHeader => {
    res.setHeader(...cacheHeader);
  });

  return res.send(ta_response);
};
