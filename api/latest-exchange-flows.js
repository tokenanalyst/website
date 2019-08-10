import axios from "axios";
import url from "url";

import { DATA_WINDOWS } from "../constants/filters";

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const tokensParam = urlParts.query.tokens;
  const tokens = urlParts.query.tokens && tokensParam.split(",");

  if (!tokens) {
    res.status(400);
    res.send({ error: "No tokens provided" });
  } else {
    const latestPriceResponses = await Promise.all(
      tokens.map(token =>
        axios.get(
          `https://api.tokenanalyst.io/analytics/last?job=${token}_latest_price_v5&format=json`
        )
      )
    );

    const exchangeFlowsAllTokensResponse = await axios.get(
      "https://api.tokenanalyst.io/analytics/last?job=exchange_flows_all_tokens_30day_v5&format=json"
    );

    const allExchangeFlowsAllTokensResponse = await axios.get(
      "https://api.tokenanalyst.io/analytics/last?job=all_exchange_flows_all_tokens_v5&format=json"
    );

    let ta_response = {};

    latestPriceResponses.forEach(
      response =>
        (ta_response[response.data[0].token] = { token: response.data[0] })
    );

    tokens.forEach(token => {
      ta_response[token].sparklines = {};
      ta_response[
        token
      ].sparklines.inflow = exchangeFlowsAllTokensResponse.data
        .filter(item => item.token === token.toLowerCase())
        .map(item => item.inflow_usd);

      ta_response[
        token
      ].sparklines.outflow = exchangeFlowsAllTokensResponse.data
        .filter(item => item.token === token.toLowerCase())
        .map(item => item.outflow_usd);

      ta_response[token].values = {};

      DATA_WINDOWS.forEach(dataWindow => {
        const {
          inflow_usd_sum,
          inflow_usd_sum_pct_change,
          outflow_usd_sum,
          outflow_usd_sum_pct_change
        } = allExchangeFlowsAllTokensResponse.data.find(
          item => item.token === token && item.window === dataWindow
        );

        ta_response[token].values[`data-window-${dataWindow}`] = {
          inflow_usd_sum,
          inflow_usd_sum_pct_change,
          outflow_usd_sum,
          outflow_usd_sum_pct_change
        };
      });
    });

    res.send({ ta_response });
  }
};
