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
  ta.tokenCountWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_count_window_historical)
  );
  ta.tokenVolumeWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_volume_window_historical)
  );
  ta.tokenPriceUsdWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_price_usd_window_historical)
  );
  ta.tokenActiveAddressWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_active_address_window_historical)
  );
  ta.tokenNewAddressWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_new_address_window_historical)
  );
  ta.tokenAddressBalancesWindowHistorical = compose(
    fetchDataFromApi(
      ENDPOINTS.private.token_address_balance_group_window_historical
    )
  );
  ta.tokenNvtWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_nvt_window_historical)
  );
  ta.tokenFeesWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_fees_window_historical)
  );
  ta.tokenSupplyWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_supply_window_historical)
  );
  ta.tokenUtxoAgeWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_utxo_age_window_historical)
  );
  ta.tokenHashrateWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_miner_hashrate_window_historical)
  );
  ta.tokenHashrateWindowHistoricalBtc = compose(
    fetchDataFromApi(ENDPOINTS.private.token_hashrate_window_historical)
  );
  ta.tokenRewardsWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_miner_rewards_window_historical)
  );
  ta.tokenRewardsWindowHistoricalBtc = compose(
    fetchDataFromApi(ENDPOINTS.private.token_rewards_window_historical)
  );
  ta.tokenSoprWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.token_sopr_window_historical)
  );
  ta.exchangeBalanceWindowHistorical = compose(
    fetchDataFromApi(ENDPOINTS.private.exchange_balance_window_historical)
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
