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
          name: 'Averge Size (Bytes)',
          apiValue: 'avg_size_bytes',
        },
        {
          name: 'Averge Satoshis per Byte',
          apiValue: 'avg_satoshis_per_byte',
        },
      ],
    },
    {
      category: 'UTXO Age',
      apiValue: 'token_utxo_age_window_historical',
      values: [
        {
          name: '<1d',
          apiValue: '<1d',
        },
        {
          name: '1-3m',
          apiValue: '1-3m',
        },
        {
          name: '3-6m',
          apiValue: '3-6m',
        },
        {
          name: '6-12m',
          apiValue: '6-12m',
        },
        {
          name: '12-18m',
          apiValue: '12-18m',
        },
        {
          name: '18-24m',
          apiValue: '18-24m',
        },
        {
          name: '1d-1w',
          apiValue: '1d-1w',
        },
        {
          name: '1w-1m',
          apiValue: '1w-1m',
        },
        {
          name: '2-3y',
          apiValue: '2-3y',
        },
        {
          name: '3-5y',
          apiValue: '3-5y',
        },
        {
          name: '5-10y',
          apiValue: '5-10y',
        },
        {
          name: '>10y',
          apiValue: '>10y',
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
