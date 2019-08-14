import axios from "axios";
import url from "url";

import { TOKEN_NAMES } from "../constants/token-names";

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const token = urlParts.query.token;
  const exchange = urlParts.query.exchange;

  if (!token || !exchange) {
    res.status(400);
    res.send({ error: "Token and / or exchange missing" });
  } else {
    const UrlBase =
      token === "BTC" || token === "ETH"
        ? "https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_historical"
        : "https://api.tokenanalyst.io/analytics/private/v1/erc20_exchanges_flow_historical";
    const [
      inflowTxnCountApiResponse,
      outflowTxnCountApiResponse
    ] = await Promise.all([
      axios.get(
        `${UrlBase}/last?key=${
          process.env.API_KEY
        }&format=json&token=${token}&direction=inflow&exchange=${exchange}`
      ),
      axios.get(
        `${UrlBase}/last?key=${
          process.env.API_KEY
        }&format=json&token=${token}&direction=outflow&exchange=${exchange}`
      )
    ]);

    res.send({
      ta_response: {
        inflow: inflowTxnCountApiResponse.data.slice(
          inflowTxnCountApiResponse.data.length - 270
        ),
        outflow: outflowTxnCountApiResponse.data.slice(
          outflowTxnCountApiResponse.data.length - 270
        )
      }
    });
  }
};
