const url = require('url');
const moment = require('moment');

const { API_ERROR_MSG } = require('../constants/apiErrors');
const isAuthorised = require('./auth/isAuthorised');
const TA = require('./utils/ta-api-node/ta');
const { NATIVE_TOKENS, STABLE_TOKENS } = require('../constants/tokens');
const { TIME_WINDOWS } = require('../constants/filters');
const { filterSeriesByExchange } = require('./utils/filterSeriesByExchange');
const { makeNetFlowSeries } = require('./utils/makeNetFlowSeries');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const { token, exchange, timeWindow, from_date, to_date } = urlParts.query;
  const isUnlimited =
    req.cookies.apiKey && (await isAuthorised(req.cookies.apiKey));
  const FORMAT = 'json';
  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';
  const { ETH, BTC } = NATIVE_TOKENS;
  const NINETY_DAYS_IN_HRS = '2160';

  let amountOfTimeUnits = '90';

  const limitDataForFreeUsers = result => {
    if (isUnlimited) {
      return result;
    }

    const ninetyDaysAgo = moment()
      .subtract(90, 'days')
      .valueOf();

    const filterSerie = series =>
      series
        .filter(item => item)
        .filter(item => moment(item.date).valueOf() > ninetyDaysAgo);

    const { inflow, netflow, outflow, price, overall } = result;

    return {
      inflow: filterSerie(inflow),
      outflow: filterSerie(outflow),
      netflow: filterSerie(netflow),
      price: filterSerie(price),
      overall,
    };
  };

  if (timeWindow === TIME_WINDOWS.oneHour) {
    amountOfTimeUnits = NINETY_DAYS_IN_HRS;
  }

  if (!token || !exchange || !timeWindow) {
    return res
      .status(400)
      .send({ message: API_ERROR_MSG.TOKEN_EXCHANGE_MISSING });
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

    if (!isAuthorised) {
      baseParams = { ...baseParams, limit: amountOfTimeUnits };
    }

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

    const filteredOverall = filterSeriesByExchange(
      publicApiResponse.data,
      exchange
    )

    return res.send({
      ta_response: limitDataForFreeUsers({
        inflow: filteredInflow,
        outflow: filteredOutflow,
        netflow: filteredNetFlow,
        overall: filteredOverall,
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
    ta_response: limitDataForFreeUsers({
      inflow: inflowTxnCountApiResponse.data,
      outflow: outflowTxnCountApiResponse.data,
      netflow,
      overall: filterSeriesByExchange(
        publicApiResponse.data,
        exchange
      ),
      price: tokenPriceApiResponse.data,
    }),
  });
};
