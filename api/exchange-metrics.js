const url = require("url");
const { API_ERROR_MSG } = require("../constants/apiErrors");
const isAuthorised = require("./auth/isAuthorised");
const setResponseCache = require("./utils/setResponseCache");
const TA = require("./utils/ta-api-node/ta");
const { NATIVE_TOKENS, STABLE_TOKENS } = require("../constants/tokens");

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const { token, exchange, timeWindow } = urlParts.query;
  const isMaxDaysOfData =
    req.cookies.apiKey && (await isAuthorised(req.cookies.apiKey));
  const FORMAT = "json";
  let amountOfTimeUnits = "90";
  const PUBLIC_API_URL = "https://api.tokenanalyst.io/analytics";
  const { ETH, BTC } = NATIVE_TOKENS;

  if (timeWindow === "1h") {
    amountOfTimeUnits = "168"; // 1 week
  }

  if (!token || !exchange || !timeWindow) {
    return res
      .status(400)
      .send({ message: API_ERROR_MSG.TOKEN_EXCHANGE_MISSING });
  }

  const privateApi = TA({ apiKey: process.env.API_KEY });

  const publicApi = TA({
    apiUrl: PUBLIC_API_URL
  });

  const priceApiCall = privateApi.tokenPriceUsdWindowHistorical({
    format: FORMAT,
    token,
    exchange,
    window: timeWindow,
    limit: amountOfTimeUnits
  });

  const exchangeFlowsAllTokensCall = publicApi.exchangeFlowsAllTokens({
    format: FORMAT
  });

  let inFlowApiCall;
  let outFlowApiCall;
  let isStableCoin = false;
  if (token === ETH || token === BTC || token === STABLE_TOKENS.USDT_OMNI) {
    inFlowApiCall = privateApi.exchangeFlowWindowHistorical({
      format: FORMAT,
      token,
      direction: "inflow",
      exchange,
      window: timeWindow,
      limit: amountOfTimeUnits
    });
    outFlowApiCall = privateApi.exchangeFlowWindowHistorical({
      format: FORMAT,
      token,
      direction: "outflow",
      exchange,
      window: timeWindow,
      limit: amountOfTimeUnits
    });
  } else {
    isStableCoin = true;
    inFlowApiCall = privateApi.erc20ExchangesFlowWindowHistorical({
      format: FORMAT,
      token,
      direction: "inflow",
      exchange,
      window: timeWindow,
      limit: amountOfTimeUnits
    });
    outFlowApiCall = privateApi.erc20ExchangesFlowWindowHistorical({
      format: FORMAT,
      token,
      direction: "outflow",
      exchange,
      window: timeWindow,
      limit: amountOfTimeUnits
    });
  }

  const [
    inflowTxnCountApiResponse,
    outflowTxnCountApiResponse,
    publicApiResponse,
    tokenPriceApiResponse
  ] = await Promise.all([
    inFlowApiCall,
    outFlowApiCall,
    exchangeFlowsAllTokensCall,
    priceApiCall
  ]);

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

    // setResponseCache().map(cacheHeader => {
    //   res.setHeader(...cacheHeader);
    // });
    res.send({
      ta_response: {
        inflow: isMaxDaysOfData
          ? filteredInflow
          : filteredInflow.slice(filteredInflow.length - amountOfTimeUnits),
        outflow: isMaxDaysOfData
          ? filteredOutflow
          : filteredOutflow.slice(filteredOutflow.length - amountOfTimeUnits),
        overall: publicApiResponse.data.filter(
          item => item.token === token && item.exchange === exchange
        ),
        price: filteredPrice
      }
    });
  } else {
    // setResponseCache().map(cacheHeader => {
    //   res.setHeader(...cacheHeader);
    // });
    res.send({
      ta_response: {
        inflow: isMaxDaysOfData
          ? inflowTxnCountApiResponse.data
          : inflowTxnCountApiResponse.data.slice(
              inflowTxnCountApiResponse.data.length - amountOfTimeUnits
            ),
        outflow: isMaxDaysOfData
          ? outflowTxnCountApiResponse.data
          : outflowTxnCountApiResponse.data.slice(
              outflowTxnCountApiResponse.data.length - amountOfTimeUnits
            ),
        overall: publicApiResponse.data.filter(
          item => item.token === token && item.exchange === exchange
        ),
        price: isMaxDaysOfData
          ? tokenPriceApiResponse.data
          : tokenPriceApiResponse.data.slice(
              tokenPriceApiResponse.data.length - amountOfTimeUnits
            )
      }
    });
  }
};
