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
          apiValue: 'volume_real_usd',
        },
        {
          name: 'Real',
          apiValue: 'volume_real',
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
          name: 'Real',
          apiValue: 'total_fee',
        },
        {
          name: 'USD',
          apiValue: 'total_fee_usd',
        },
        {
          name: 'Averge Size (Bytes)',
          apiValue: 'total_fee',
        },
        {
          name: 'Averge Satoshis per Byte',
          apiValue: 'total_fee',
        },
      ],
    },
  ],
};
