/**
 * - Creates an at instance
 * - Load all the enpoint funtions into this instance
 * - Binds the functions so they will always receive at as first argument
 *
 * This way we get a regular looking API on top of functional code
 */
const partial = require('lodash/partial');
const { ENDPOINTS } = require('../api/const/endpoints');
const fetchDataFromApi = require('../api/fetchDataFromApi');

module.exports = () => {
  const ta = {};

  const compose = funk => {
    return partial(funk, ta);
  };

  // Private endpoint
  ta.erc20ExchangesFlowWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.erc20_exchanges_flow_window_historical)
  );
  ta.exchangeFlowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.exchange_flow_historical)
  );
  ta.exchangeFlowWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.exchange_flow_window_historical)
  );
  ta.tokenCountHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_count_window_historical)
  );
  ta.tokenVolumeHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_volume_window_historical)
  );
  ta.tokenPriceUsdWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_price_usd_window_historical)
  );

  // Serverless endpoint
  ta.exchangeFlows = compose(
    fetchDataFromApi(ENDPOINTS.serverless.exchange_flows)
  );

  ta.singleMetric = compose(
    fetchDataFromApi(ENDPOINTS.serverless.single_metric)
  );

  // Public endpoint
  ta.allExchangeFlowsAllTokens = compose(
    fetchDataFromApi(ENDPOINTS.public.all_exchange_flows_all_tokens)
  );
  ta.exchangeFlowsAllTokens = compose(
    fetchDataFromApi(ENDPOINTS.public.exchange_flows_all_tokens)
  );
  ta.exchangeFlowsAllTokens30Day = compose(
    fetchDataFromApi(ENDPOINTS.public.exchange_flows_all_tokens_30_day)
  );
  ta.latestPrice = compose(fetchDataFromApi(ENDPOINTS.public.latest_price));
  ta.minerHashrate30Day = compose(
    fetchDataFromApi(ENDPOINTS.public.miner_hashrate_30day)
  );
  ta.minerRewards30Day = compose(
    fetchDataFromApi(ENDPOINTS.public.miner_rewards_30day)
  );

  return ta;
};
