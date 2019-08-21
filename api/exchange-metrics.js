import axios from "axios";
import url from "url";

const isAuthorised = require("./auth/isAuthorised");

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
    if (token === "BTC") {
      urlBase = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_historical`;
    } else if (token === "ETH" || token === "USDT_OMNI") {
      urlBase = `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_window_historical`;
    } else {
      urlBase = `https://api.tokenanalyst.io/analytics/private/v1/erc20_exchanges_flow_historical`;
    }
    const [
      inflowTxnCountApiResponse,
      outflowTxnCountApiResponse,
      publicApiResponse
    ] = await Promise.all([
      axios.get(
        `${urlBase}/last?key=${
          process.env.API_KEY
        }&format=json&token=${token}&direction=inflow&exchange=${exchange}&window=1d`
      ),
      axios.get(
        `${urlBase}/last?key=${
          process.env.API_KEY
        }&format=json&token=${token}&direction=outflow&exchange=${exchange}&window=1d`
      ),
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=exchange_flows_all_tokens_v5&format=json`
      )
    ]);

    res.send({
      ta_response: {
        inflow: isMaxDaysOfData
          ? inflowTxnCountApiResponse.data
          : inflowTxnCountApiResponse.data.slice(
              inflowTxnCountApiResponse.data.length - 30
            ),
        outflow: isMaxDaysOfData
          ? outflowTxnCountApiResponse.data
          : outflowTxnCountApiResponse.data.slice(
              outflowTxnCountApiResponse.data.length - 30
            ),
        overall: publicApiResponse.data.filter(
          item => item.token === token && item.exchange === exchange
        )
      }
    });
  }
};
