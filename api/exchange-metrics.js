const url = require('url');

const { API_ERROR_MSG } = require('../constants/apiErrors');
const isAuthorised = require('./auth/isAuthorised');
const TA = require('./utils/ta-api-node/ta');
const { NATIVE_TOKENS, STABLE_TOKENS } = require('../constants/tokens');
const { TIME_WINDOWS } = require('../constants/filters');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const { token, exchange, timeWindow, from_date, to_date } = urlParts.query;
  const isUnlimited =
    req.cookies.apiKey && (await isAuthorised(req.cookies.apiKey));
  const FORMAT = 'json';
  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';
  const { ETH, BTC } = NATIVE_TOKENS;
  const ONE_WEEK_IN_HRS = '168';

  let amountOfTimeUnits = '90';

  if (timeWindow === TIME_WINDOWS.oneHour) {
    amountOfTimeUnits = ONE_WEEK_IN_HRS;
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
      limit: amountOfTimeUnits,
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
  console.log(getParams('inflow', from_date, to_date));
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

  console.log(inflowTxnCountApiResponse.data);

  const netflow = inflowTxnCountApiResponse.data.map(
    ({ inflow, inflow_usd, date, hour }, index) => ({
      date,
      hour,
      value: Number(
        (inflow - outflowTxnCountApiResponse.data[index].outflow).toFixed(2)
      ),
      value_usd: Number(
        (
          inflow_usd - outflowTxnCountApiResponse.data[index].outflow_usd
        ).toFixed(2)
      ),
    })
  );

  if (isStableCoin) {
    const filteredInflow = inflowTxnCountApiResponse.data.filter(
      item => item.exchange === exchange
    );
    const filteredOutflow = outflowTxnCountApiResponse.data.filter(
      item => item.exchange === exchange
    );
    const filteredPrice = tokenPriceApiResponse.data.filter(
      item => item.exchange === exchange
    );

    res.send({
      ta_response: {
        inflow: filteredInflow,
        outflow: filteredOutflow,
        overall: publicApiResponse.data.filter(
          item => item.token === token && item.exchange === exchange
        ),
        price: filteredPrice,
      },
    });
  } else {
    res.send({
      ta_response: {
        inflow: inflowTxnCountApiResponse.data,
        outflow: outflowTxnCountApiResponse.data,
        netflow,
        overall: publicApiResponse.data.filter(
          item => item.token === token && item.exchange === exchange
        ),
        price: tokenPriceApiResponse.data,
      },
    });
  }
};
