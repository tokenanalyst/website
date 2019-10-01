const url = require('url');
const moment = require('moment');

const { API_ERROR_MSG } = require('../constants/apiErrors');
const getUserAuth = require('./auth/getUserAuth');
const TA = require('./utils/ta-api-node/ta');
const { NATIVE_TOKENS, STABLE_TOKENS } = require('../constants/tokens');
// const { TIME_WINDOWS } = require('../constants/filters');
const { filterSeriesByExchange } = require('./utils/filterSeriesByExchange');
const { makeNetFlowSeries } = require('./utils/makeNetFlowSeries');
const { limitDataForFreeUsers } = require('./utils/limitDataForFreeUsers');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const { token, exchange, timeWindow, from_date, to_date } = urlParts.query;
  const FORMAT = 'json';
  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';
  const { ETH, BTC } = NATIVE_TOKENS;
  const { isAuthorised, userData } = await getUserAuth(req.cookies.apiKey);

  console.log(userData);
  console.log(timeWindow);

  if (!token || !exchange || !timeWindow) {
    return res.status(400).send({ message: API_ERROR_MSG.PARAMS_MISSING });
  }

  const tierTimeLimit = userData.tier.timeLimits[timeWindow];

  let seriesTimeLimit;

  if (timeWindow === '1h') {
    seriesTimeLimit = !isAuthorised
      ? moment()
          .subtract(tierTimeLimit, 'hours')
          .valueOf()
      : null;
  }

  if (timeWindow === '1d') {
    seriesTimeLimit = !isAuthorised
      ? moment()
          .subtract(tierTimeLimit, 'days')
          .valueOf()
      : null;
  }

  const privateApi = TA({ apiKey: process.env.API_KEY });

  const publicApi = TA({
    apiUrl: PUBLIC_API_URL,
  });

  const getParams = (direction, from_date, to_date) => {
    let baseParams = {
      format: FORMAT,
      token,
      exchange,
      window: timeWindow,
    };

    if (direction) {
      baseParams = { ...baseParams, direction };
    }

    if (!from_date && !to_date) {
      return baseParams;
    } else if (!from_date) {
      return {
        ...baseParams,
        to_date,
      };
    } else if (!to_date) {
      return {
        ...baseParams,
        from_date,
      };
    } else {
      return {
        ...baseParams,
        from_date,
        to_date,
      };
    }
  };

  const priceApiCall = privateApi.tokenPriceUsdWindowHistorical(
    getParams(null, from_date, to_date)
  );

  const exchangeFlowsAllTokensCall = publicApi.exchangeFlowsAllTokens({
    format: FORMAT,
  });

  let inFlowApiCall;
  let outFlowApiCall;
  let isStableCoin = false;
  if (token === ETH || token === BTC || token === STABLE_TOKENS.USDT_OMNI) {
    inFlowApiCall = privateApi.exchangeFlowWindowHistorical(
      getParams('inflow', from_date, to_date)
    );
    outFlowApiCall = privateApi.exchangeFlowWindowHistorical(
      getParams('outflow', from_date, to_date)
    );
  } else {
    isStableCoin = true;
    inFlowApiCall = privateApi.erc20ExchangesFlowWindowHistorical(
      getParams('inflow', from_date, to_date)
    );
    outFlowApiCall = privateApi.erc20ExchangesFlowWindowHistorical(
      getParams('outflow', from_date, to_date)
    );
  }

  const [
    inflowTxnCountApiResponse,
    outflowTxnCountApiResponse,
    publicApiResponse,
    tokenPriceApiResponse,
  ] = await Promise.all([
    inFlowApiCall,
    outFlowApiCall,
    exchangeFlowsAllTokensCall,
    priceApiCall,
  ]);

  if (isStableCoin) {
    const filteredInflow = filterSeriesByExchange(
      inflowTxnCountApiResponse.data,
      exchange
    );

    const filteredOutflow = filterSeriesByExchange(
      outflowTxnCountApiResponse.data,
      exchange
    );

    const filteredPrice = tokenPriceApiResponse.data;

    const filteredNetFlow = makeNetFlowSeries(
      filteredInflow,
      filteredOutflow,
      from_date,
      to_date
    );

    return res.send({
      ta_response: limitDataForFreeUsers(seriesTimeLimit, {
        inflow: filteredInflow,
        outflow: filteredOutflow,
        netflow: filteredNetFlow,
        overall: publicApiResponse.data.filter(
          item =>
            item.token === token &&
            item.exchange.toLowerCase() === exchange.toLowerCase()
        ),
        price: filteredPrice,
      }),
    });
  }

  const netflow = makeNetFlowSeries(
    inflowTxnCountApiResponse.data,
    outflowTxnCountApiResponse.data,
    from_date,
    to_date
  );

  return res.send({
    ta_response: limitDataForFreeUsers(seriesTimeLimit, {
      inflow: inflowTxnCountApiResponse.data,
      outflow: outflowTxnCountApiResponse.data,
      netflow,
      overall: publicApiResponse.data.filter(
        item =>
          item.token === token &&
          item.exchange.toLowerCase() === exchange.toLowerCase()
      ),
      price: tokenPriceApiResponse.data,
    }),
  });
};
