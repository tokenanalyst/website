import axios from "axios";
import url from "url";

const isAuthorised = require("./auth/isAuthorised");

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
    res.status(400);
    return res.send({ error: "Token and / or exchange missing" });
  }

  let urlBase;
  let isStableCoin = false;
  let priceUrl = `https://api.tokenanalyst.io/analytics/private/v1/token_price_historical/last?format=json&token=${token}&key=${process.env.API_KEY}&exchange=${exchange}&window=${timeWindow}&limit=${amountOfTimeUnits}`;
  if (token === "ETH" || token === "BTC") {
    urlBase = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical`;
  } else if (token === "USDT_OMNI") {
    urlBase = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical`;
    priceUrl = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical/last?format=json&token=${token}&key=${process.env.API_KEY}&exchange=${exchange}&window=${timeWindow}&direction=inflow&limit=${amountOfTimeUnits}`;
  } else {
    isStableCoin = true;
    urlBase = `https://api.tokenanalyst.io/analytics/private/v1/erc20_exchanges_flow_window_historical`;
    priceUrl = `https://api.tokenanalyst.io/analytics/private/v1/erc20_exchanges_flow_window_historical/last?format=json&token=${token}&key=${process.env.API_KEY}&exchange=${exchange}&window=${timeWindow}&direction=inflow&limit=${amountOfTimeUnits}`;
  }

  const [
    inflowTxnCountApiResponse,
    outflowTxnCountApiResponse,
    publicApiResponse,
    tokenPriceResponse
  ] = await Promise.all([
    axios.get(
      `${urlBase}/last?key=${process.env.API_KEY}&format=json&token=${token}&direction=inflow&exchange=${exchange}&window=${timeWindow}&limit=${amountOfTimeUnits}`
    ),
    axios.get(
      `${urlBase}/last?key=${process.env.API_KEY}&format=json&token=${token}&direction=outflow&exchange=${exchange}&window=${timeWindow}&limit=${amountOfTimeUnits}`
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
        price: isMaxDaysOfData
          ? filteredPrice
          : filteredPrice.slice(filteredPrice.length - amountOfTimeUnits)
      }
    });
  } else {
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
          ? tokenPriceResponse.data
          : tokenPriceResponse.data.slice(
              tokenPriceResponse.data.length - amountOfTimeUnits
            )
      }
    });
  }
};
