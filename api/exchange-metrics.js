import axios from "axios";
import url from "url";

const isAuthorised = require("./auth/isAuthorised");

const FreeAmountOfDays = 90;

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const token = urlParts.query.token;
  const exchange = urlParts.query.exchange;
  const isMaxDaysOfData =
    req.cookies.apiKey && (await isAuthorised(req.cookies.apiKey));

  if (!token || !exchange) {
    res.status(400);
    res.send({ error: "Token and / or exchange missing" });
  } else {
    let urlBase;
    let isStableCoin = false;
    let priceUrl = `https://api.tokenanalyst.io/analytics/private/v1/token_price_historical/last?format=json&token=${token}&key=${process.env.API_KEY}&exchange=${exchange}&window=1d`;
    if (token === "ETH" || token === "BTC") {
      urlBase = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical`;
    } else if (token === "USDT_OMNI") {
      urlBase = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical`;
      priceUrl = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical/last?format=json&token=${token}&key=${process.env.API_KEY}&exchange=${exchange}&window=1d&direction=inflow`;
    } else {
      isStableCoin = true;
      urlBase = `https://api.tokenanalyst.io/analytics/private/v1/erc20_exchanges_flow_window_historical`;
      priceUrl = `https://api.tokenanalyst.io/analytics/private/v1/erc20_exchanges_flow_window_historical/last?format=json&token=${token}&key=${process.env.API_KEY}&exchange=${exchange}&window=1d&direction=inflow`;
    }
    const [
      inflowTxnCountApiResponse,
      outflowTxnCountApiResponse,
      publicApiResponse,
      tokenPriceResponse
    ] = await Promise.all([
      axios.get(
        `${urlBase}/last?key=${process.env.API_KEY}&format=json&token=${token}&direction=inflow&exchange=${exchange}&window=1d`
      ),
      axios.get(
        `${urlBase}/last?key=${process.env.API_KEY}&format=json&token=${token}&direction=outflow&exchange=${exchange}&window=1d`
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
            : filteredInflow.slice(filteredInflow.length - FreeAmountOfDays),
          outflow: isMaxDaysOfData
            ? filteredOutflow
            : filteredOutflow.slice(filteredOutflow.length - FreeAmountOfDays),
          overall: publicApiResponse.data.filter(
            item => item.token === token && item.exchange === exchange
          ),
          price: isMaxDaysOfData
            ? filteredPrice
            : filteredPrice.slice(filteredPrice.length - FreeAmountOfDays)
        }
      });
    } else {
      res.send({
        ta_response: {
          inflow: isMaxDaysOfData
            ? inflowTxnCountApiResponse.data
            : inflowTxnCountApiResponse.data.slice(
                inflowTxnCountApiResponse.data.length - FreeAmountOfDays
              ),
          outflow: isMaxDaysOfData
            ? outflowTxnCountApiResponse.data
            : outflowTxnCountApiResponse.data.slice(
                outflowTxnCountApiResponse.data.length - FreeAmountOfDays
              ),
          overall: publicApiResponse.data.filter(
            item => item.token === token && item.exchange === exchange
          ),
          price: isMaxDaysOfData
            ? tokenPriceResponse.data
            : tokenPriceResponse.data.slice(
                tokenPriceResponse.data.length - FreeAmountOfDays
              )
        }
      });
    }
  }
};
