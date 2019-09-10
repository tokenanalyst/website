import axios from "axios";
import url from "url";
import { API_ERROR_MSG } from "../constants/apiErrors";

import { DATA_WINDOWS } from "../constants/filters";
import { catchApiError } from "./utils/catchApiError";

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const tokensParam = urlParts.query.tokens;
  const tokens = urlParts.query.tokens && tokensParam.split(",");

  if (!tokens) {
    return res.status(400).send({ message: API_ERROR_MSG.NO_TOKEN_PROVIDED });
  }

  const latestPriceResponses = await Promise.all(
    tokens.map(token =>
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${token}_latest_price_v5&format=json`
      )
    )
  ).catch(err => {
    const { code, body } = catchApiError(err);
    return res.status(code).send(body);
  });

  const exchangeFlowsAllTokensRequest = axios.get(
    "https://api.tokenanalyst.io/analytics/last?job=exchange_flows_all_tokens_30day_v5&format=json"
  );

  const allExchangeFlowsAllTokensRequest = axios.get(
    "https://api.tokenanalyst.io/analytics/last?job=all_exchange_flows_all_tokens_v5&format=json"
  );

  const allExchangeFlows24hAllTokensRequest = axios.get(
    "https://api.tokenanalyst.io/analytics/last?job=exchange_flows_all_tokens_48h_v5&format=json"
  );

  const [
    exchangeFlowsAllTokensResponse,
    allExchangeFlowsAllTokensResponse,
    allExchangeFlows24hAllTokensResponse
  ] = await Promise.all([
    exchangeFlowsAllTokensRequest,
    allExchangeFlowsAllTokensRequest,
    allExchangeFlows24hAllTokensRequest
  ]).catch(err => {
    const { code, body } = catchApiError(err);
    return res.status(code).send(body);
  });

  let ta_response = {};

  latestPriceResponses.forEach(
    response =>
      (ta_response[response.data[0].token] = { token: response.data[0] })
  );

  tokens.forEach(token => {
    ta_response[token].sparklines = {
      days: {},
      hours: {}
    };
    ta_response[
      token
    ].sparklines.days.inflow = exchangeFlowsAllTokensResponse.data
      .filter(item => item.token === token.toLowerCase())
      .map(item => item.inflow_usd);

    ta_response[
      token
    ].sparklines.days.outflow = exchangeFlowsAllTokensResponse.data
      .filter(item => item.token === token.toLowerCase())
      .map(item => item.outflow_usd);

    ta_response[
      token
    ].sparklines.hours.inflow = allExchangeFlows24hAllTokensResponse.data
      .filter(item => item.token === token.toLowerCase())
      .map(item => item.inflow_usd);

    ta_response[
      token
    ].sparklines.hours.outflow = allExchangeFlows24hAllTokensResponse.data
      .filter(item => item.token === token.toLowerCase())
      .map(item => item.outflow_usd);

    ta_response[token].values = {};

    DATA_WINDOWS.forEach(dataWindow => {
      const tokenData = allExchangeFlowsAllTokensResponse.data.find(
        item => item.token === token && item.window === dataWindow
      );

      const {
        inflow_sum,
        inflow_usd_sum,
        inflow_sum_pct_change,
        inflow_usd_sum_pct_change,
        outflow_sum,
        outflow_usd_sum,
        outflow_sum_pct_change,
        outflow_usd_sum_pct_change
      } = tokenData;

      ta_response[token].values[`data-window-${dataWindow}`] = {
        inflow_sum,
        inflow_usd_sum,
        inflow_sum_pct_change,
        inflow_usd_sum_pct_change,
        outflow_sum,
        outflow_usd_sum,
        outflow_sum_pct_change,
        outflow_usd_sum_pct_change
      };
    });
  });

  res.send({ ta_response });
};
