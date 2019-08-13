import axios from "axios";
import url from "url";

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const token = urlParts.query.token;
  const exchange = urlParts.query.exchange;

  if (!token || !exchange) {
    res.status(400);
    res.send({ error: "Token and / or exchange missing" });
  } else {
    const [
      inflowTxnCountApiResponse,
      outflowTxnCountApiResponse
    ] = await Promise.all([
      axios.get(
        `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_historical/last?key=${
          process.env.API_KEY
        }&format=json&token=btc&direction=inflow&exchange=binance`
      ),
      axios.get(
        `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_historical/last?key=${
          process.env.API_KEY
        }&format=json&token=btc&direction=outflow&exchange=binance`
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
