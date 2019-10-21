export const STABLE_TOKENS = {
  DAI: 'DAI',
  PAX: 'PAX',
  GUSD: 'GUSD',
  TUSD: 'TUSD',
  USDC: 'USDC',
  USDT: 'USDT',
  OMNI: 'OMNI',
  USDT_ERC20: 'USDT_ERC20',
  USDT_OMNI: 'USDT_OMNI',
};

export const ERC20_TOKENS = {
  BAT: 'BAT',
  BNT: 'BNT',
  CVC: 'CVC',
  FET: 'FET',
  GNT: 'GNT',
  GUSD: 'GUSD',
  KNC: 'KNC',
  LINK: 'LINK',
  LOOM: 'LOOM',
  MANA: 'MANA',
  MKR: 'MKR',
  NMR: 'NMR',
  OMG: 'OMG',
  REP: 'REP',
  RLC: 'RLC',
  SNT: 'SNT',
  TKN: 'TKN',
  ZIL: 'ZIL',
  ZRX: 'ZRX',
};

export const NATIVE_TOKENS = {
  BTC: 'BTC',
  ETH: 'ETH',
};

export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
};

export const METRICS = {
  [NATIVE_TOKENS.BTC]: [
    {
      category: 'Volume',
      apiValue: 'token_volume_window_historical',
      values: [
        {
          name: 'USD',
          indicator: 'Volume USD',
        },
        {
          name: 'Real',
          indicator: 'Volume Real',
        },
        {
          name: 'Change USD',
          indicator: 'Volume Change USD',
        },
        {
          name: 'Change Real',
          indicator: 'Volume Change Real',
        },
      ],
    },
    {
      category: 'Transactions',
      apiValue: 'token_count_window_historical',
      values: [
        {
          name: 'Number',
          indicator: 'Transactions',
        },
      ],
    },
    {
      category: 'Addresses',
      apiValue: 'token_active_address_window_historical',
      values: [
        {
          name: 'Senders',
          indicator: 'Active Senders',
        },
        {
          name: 'Recipients',
          indicator: 'Active Recipients',
        },
      ],
    },
    {
      category: 'Supply',
      apiValue: 'token_supply_window_historical',
      values: [
        {
          name: 'Amount',
          indicator: 'Supply',
        },
      ],
    },
    {
      category: 'NVT',
      apiValue: 'token_nvt_window_historical',
      values: [
        {
          name: 'NVT',
          indicator: 'NVT',
        },
        {
          name: 'Market Cap',
          indicator: 'Market Cap',
        },
      ],
    },
    {
      category: 'Fees',
      apiValue: 'token_fees_window_historical',
      values: [
        {
          name: 'Total Real',
          indicator: 'Total Fees Real',
        },
        {
          name: 'Total USD',
          indicator: 'Total Fees USD',
        },
        {
          name: 'Avg. Real',
          indicator: 'Average Fees Real',
        },
        {
          name: 'Avg. USD',
          indicator: 'Average Fees USD',
        },
        {
          name: 'Avg. Size (Bytes)',
          indicator: 'Average Size in Bytes',
        },
        {
          name: 'Avg. Satoshis per Byte',
          indicator: 'Average Satoshis per Byte',
        },
      ],
    },
    {
      category: 'UTXO Age',
      apiValue: 'token_utxo_age_window_historical',
      values: [
        {
          name: '< 1 day',
          indicator: 'UTXO < 1 day',
        },
        {
          name: '1 day - 1 week',
          indicator: 'UTXO 1 day-1 week',
        },
        {
          name: '1 week - 1 month',
          indicator: 'UTXO 1 week-1 month',
        },
        {
          name: '1 - 3 months',
          indicator: 'UTXO 1-3 months',
        },
        {
          name: '3 - 6 months',
          indicator: 'UTXO 3-6 months',
        },
        {
          name: '6 - 12 months',
          indicator: 'UTXO 6-12 months',
        },
        {
          name: '12 - 18 months',
          indicator: 'UTXO 12-18 months',
        },
        {
          name: '18 -  24 months',
          indicator: 'UTXO 18-24 months',
        },
        {
          name: '2 - 3 years',
          indicator: 'UTXO 2 years-3 years',
        },
        {
          name: '3 - 5 years',
          indicator: 'UTXO 3 years-5 years',
        },
        {
          name: '5 - 10 years',
          indicator: 'UTXO 5 years-10 years',
        },
        {
          name: '> 10 years',
          indicator: 'UTXO > 10 years',
        },
      ],
    },
  ],
  [NATIVE_TOKENS.ETH]: [
    {
      category: 'Volume',
      apiValue: 'token_volume_window_historical',
      values: [
        {
          name: 'Internal (Real)',
          apiValue: 'volume_internal',
        },
        {
          name: 'Internal (USD)',
          apiValue: 'volume_internal_usd',
        },
        {
          name: 'External (Real)',
          apiValue: 'volume_external',
        },
        {
          name: 'External (USD)',
          apiValue: 'volume_external_usd',
        },
        {
          name: 'Gross (Real)',
          apiValue: 'volume_gross',
        },
        {
          name: 'Gross (USD)',
          apiValue: 'volume_gross_usd',
        },
      ],
    },
    {
      category: 'Transactions',
      apiValue: 'token_count_window_historical',
      values: [
        {
          name: 'Number',
          apiValue: 'number_of_txns',
        },
      ],
    },
    {
      category: 'Addresses',
      apiValue: 'token_active_address_window_historical',
      values: [
        {
          name: 'Senders',
          apiValue: 'active_senders',
        },
        {
          name: 'Recipients',
          apiValue: 'active_recipients',
        },
      ],
    },
    {
      category: 'Supply',
      apiValue: 'token_supply_window_historical',
      values: [
        {
          name: 'Amount',
          apiValue: 'supply',
        },
      ],
    },
    {
      category: 'NVT',
      apiValue: 'token_nvt_window_historical',
      values: [
        {
          name: 'NVT',
          apiValue: 'nvt',
        },
        {
          name: 'Market Cap',
          apiValue: 'marketcap_usd',
        },
      ],
    },
    {
      category: 'Fees',
      apiValue: 'token_fees_window_historical',
      values: [
        {
          name: 'Total (Real)',
          apiValue: 'total_fee',
        },
        {
          name: 'Total (USD)',
          apiValue: 'total_fee_usd',
        },
        {
          name: 'Average (Real)',
          apiValue: 'avg_fee',
        },
        {
          name: 'Average (USD)',
          apiValue: 'avg_fee_usd',
        },
        {
          name: 'Average Gas',
          apiValue: 'avg_gas',
        },
        {
          name: 'Average Gas Price Wei',
          apiValue: 'avg_gas_price_wei',
        },
      ],
    },
  ],
  ERC_20: [
    {
      category: 'Volume',
      apiValue: 'token_volume_window_historical',
      values: [
        {
          name: 'USD',
          apiValue: 'volume_usd',
        },
        {
          name: 'Real',
          apiValue: 'volume',
        },
        {
          name: 'Change',
          apiValue: 'volume_change',
        },
      ],
    },
    {
      category: 'Transactions',
      apiValue: 'token_count_window_historical',
      values: [
        {
          name: 'Number',
          apiValue: 'number_of_txns',
        },
      ],
    },
    {
      category: 'Addresses',
      apiValue: 'token_active_address_window_historical',
      values: [
        {
          name: 'Senders',
          apiValue: 'active_senders',
        },
        {
          name: 'Recipients',
          apiValue: 'active_recipients',
        },
      ],
    },
  ],
};
