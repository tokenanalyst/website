import axios from "axios";
import url from "url";
import { API_ERROR_MSG } from "../constants/apiErrors";

const isAuthorised = require("./auth/isAuthorised");
import { setResponseCache } from "./utils/setResponseCache";

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const { token, exchange, timeWindow } = urlParts.query;
  const isMaxDaysOfData =
    req.cookies.apiKey && (await isAuthorised(req.cookies.apiKey));

  let amountOfTimeUnits = "90";

  if (timeWindow === "1h") {
    amountOfTimeUnits = "168"; // 1 week
  }

  if (!token || !exchange) {
    return res
      .status(400)
      .send({ message: API_ERROR_MSG.TOKEN_EXCHANGE_MISSING });
  }

  const userLimit = isMaxDaysOfData ? '' : `&limit=${amountOfTimeUnits}`

  let urlBase;
  let isStableCoin = false;
  let priceUrl = `https://api.tokenanalyst.io/analytics/private/v1/token_price_historical/last?format=json&token=${token}&key=${process.env.API_KEY}&exchange=${exchange}&window=${timeWindow}${userLimit}`;
  if (token === "ETH" || token === "BTC") {
    urlBase = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical`;
  } else if (token === "USDT_OMNI") {
    urlBase = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical`;
    priceUrl = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical/last?format=json&token=${token}&key=${process.env.API_KEY}&exchange=${exchange}&window=${timeWindow}&direction=inflow${userLimit}`;
  } else {
    isStableCoin = true;
    urlBase = `https://api.tokenanalyst.io/analytics/private/v1/erc20_exchanges_flow_window_historical`;
    priceUrl = `https://api.tokenanalyst.io/analytics/private/v1/erc20_exchanges_flow_window_historical/last?format=json&token=${token}&key=${process.env.API_KEY}&exchange=${exchange}&window=${timeWindow}&direction=inflow${userLimit}`;
  }

  const [
    inflowTxnCountApiResponse,
    outflowTxnCountApiResponse,
    publicApiResponse,
    tokenPriceResponse
  ] = await Promise.all([
    axios.get(
      `${urlBase}/last?key=${process.env.API_KEY}&format=json&token=${token}&direction=inflow&exchange=${exchange}&window=${timeWindow}${userLimit}`
    ),
    axios.get(
      `${urlBase}/last?key=${process.env.API_KEY}&format=json&token=${token}&direction=outflow&exchange=${exchange}&window=${timeWindow}${userLimit}`
    ),
    axios.get(
      `https://api.tokenanalyst.io/analytics/last?job=exchange_flows_all_tokens_v5&format=json`
    ),
    axios.get(priceUrl)
  ]);

  if (isStableCoin) {
    const filteredInflow = inflowTxnCountApiResponse.data.filter(
      item => item.exchange === exchange
    );
    const filteredOutflow = outflowTxnCountApiResponse.data.filter(
      item => item.exchange === exchange
    );
    const filteredPrice = tokenPriceResponse.data.filter(
      item => item.exchange === exchange
    );

    // setResponseCache().map(cacheHeader => {
    //   res.setHeader(...cacheHeader);
    // });
    res.send({
      ta_response: {
        inflow: filteredInflow,
        outflow: filteredOutflow,
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
        inflow: inflowTxnCountApiResponse.data,
        outflow: outflowTxnCountApiResponse.data,
        overall: publicApiResponse.data.filter(
          item => item.token === token && item.exchange === exchange
        ),
        price: tokenPriceResponse.data
      }
    });
  }
};
