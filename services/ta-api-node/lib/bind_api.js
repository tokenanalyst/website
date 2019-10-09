/**
 * - Creates an at instance
 * - Load all the enpoint funtions into this instance
 * - Binds the functions so they will always receive at as first argument
 *
 * This way we get a regular looking API on top of functional code
 */
const partial = require('lodash/partial');
const camelCase = require('lodash/camelCase');
const { ENDPOINTS } = require('../api/const/endpoints');
const fetchDataFromApi = require('../api/fetchDataFromApi');

module.exports = userConfig => {
  const ta = {};

  const compose = funk => {
    return partial(funk, ta);
  };

  // Private endpoints
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

  // Public endpoints
  ta.allExchangeFlowsAllTokensV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.all_exchange_flows_all_tokens_v5)
  );
  ta.exchangeFlowsAllTokensV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.exchange_flows_all_tokens_v5)
  );
  ta.exchangeFlowsAllTokens48hV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.exchange_flows_all_tokens_48h_v5)
  );
  ta.exchangeFlowsAllTokens30Day = compose(
    fetchDataFromApi(ENDPOINTS.public.exchange_flows_all_tokens_30_day)
  );
  ta.latestPriceV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.latest_price_v5)
  );
  ta.minerHashrate30DayV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.miner_hashrate_30day_v5)
  );
  ta.minerRewards30DayV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.miner_rewards_30day_v5)
  );
  ta.holderAddress24hRollingV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.holder_address_24h_rolling_v5)
  );
  ta.volume24HRollingV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.volume_24h_rolling_v5)
  );
  ta.count24HRollingV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.count_24h_rolling_v5)
  );
  ta.publicTotalSupplyV5 = compose(
    fetchDataFromApi(ENDPOINTS.public.public_total_supply_v5)
  );

  // Custom endpoints
  if (userConfig.extend) {
    Object.keys(userConfig.extend).forEach(endpoint => {
      ta[camelCase(endpoint)] = compose(
        fetchDataFromApi(userConfig.extend[endpoint])
      );
    });
  }

  return ta;
};
