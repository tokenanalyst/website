module.exports = {
  ENDPOINTS: {
    private: {
      token_volume_window_historical: () =>
        'token_volume_window_historical/last',
      token_count_window_historical: () => 'token_count_window_historical/last',
      exchange_flow_historical: () => 'exchange_flow_historical/last',
      exchange_flow_window_historical: () =>
        'exchange_flow_window_historical/last',
      erc20_exchanges_flow_window_historical: () =>
        'erc20_exchanges_flow_window_historical/last',
      token_price_usd_window_historical: () =>
        'token_price_usd_window_historical/last',
      token_active_address_window_historical: () =>
        'token_active_address_window_historical/last',
      token_new_address_window_historical: () =>
        'token_new_address_window_historical/last',
      token_nvt_window_historical: () => 'token_nvt_window_historical/last',
      token_fees_window_historical: () => 'token_fees_window_historical/last',
      token_supply_window_historical: () =>
        'token_supply_window_historical/last',
      token_utxo_age_window_historical: () =>
        'token_utxo_age_window_historical/last',
      token_miner_hashrate_window_historical: () =>
        'token_miner_hashrate_window_historical/last',
      token_miner_rewards_window_historical: () =>
        'token_miner_rewards_window_historical/last',
      token_sopr_window_historical: () => 'token_sopr_window_historical/last',
    },
    public: {
      exchange_flows_all_tokens_v5: () =>
        'last?job=exchange_flows_all_tokens_v5&',
      latest_price_v5: ({ token }) => `last?job=${token}_latest_price_v5&`,
      exchange_flows_all_tokens_30_day: () =>
        'last?job=exchange_flows_all_tokens_30day_v5&',
      exchange_flows_all_tokens_48h_v5: () =>
        'last?job=exchange_flows_all_tokens_48h_v5&',
      all_exchange_flows_all_tokens_v5: () =>
        'last?job=all_exchange_flows_all_tokens_v5&',
      miner_hashrate_30day_v5: () => ({ token }) =>
        `last?job=${token}_miner_hashrate_30day_v5&`,
      miner_rewards_30day_v5: () => ({ token }) =>
        `last?job=${token}_miner_rewards_30day_v5&`,
      holder_address_24h_rolling_v5: ({ token }) =>
        `last?job=${token}_holder_address_24h_rolling_v5&`,
      volume_24h_rolling_v5: ({ token }) =>
        `last?job=${token}_volume_24h_rolling_v5&`,
      count_24h_rolling_v5: ({ token }) =>
        `last?job=${token}_count_24h_rolling_v5&`,
      public_total_supply_v5: ({ token }) =>
        `last?job=public_${token}_total_supply_v5&`,
    },
  },
};
