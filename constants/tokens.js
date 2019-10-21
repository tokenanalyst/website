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
      isDefault: true,
      values: [
        {
          name: 'USD',
          indicator: 'Volume USD',
          isIntraDay: true,
          info: 'volume_real * price_usd',
        },
        {
          name: 'Real',
          indicator: 'Volume Real',
          isIntraDay: true,
          info: 'volume_gross - volume_change',
        },
        {
          name: 'Change USD',
          indicator: 'Volume Change USD',
          isIntraDay: true,
        },
        {
          name: 'Change Real',
          indicator: 'Volume Change Real',
          isIntraDay: true,
        },
        {
          name: 'Gross Real',
          indicator: 'Gross Volume Real',
          isIntraDay: true,
        },
      ],
    },
    {
      category: 'Transactions',
      values: [
        {
          name: 'Number',
          indicator: 'Transactions',
          isIntraDay: true,
        },
      ],
    },
    {
      category: 'Addresses',
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
      values: [
        {
          name: 'Amount',
          indicator: 'Supply',
        },
      ],
    },
    {
      category: 'NVT',
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
      values: [
        {
          name: 'Internal (Real)',
          indicator: 'Internal Volume Real',
          isIntraDay: true,
        },
        {
          name: 'Internal (USD)',
          indicator: 'Internal Volume USD',
          isIntraDay: true,
        },
        {
          name: 'External (Real)',
          indicator: 'External Volume Real',
          isIntraDay: true,
        },
        {
          name: 'External (USD)',
          indicator: 'External Volume USD',
          isIntraDay: true,
        },
        {
          name: 'Gross (Real)',
          indicator: 'Gross Volume Real',
          isIntraDay: true,
        },
        {
          name: 'Gross (USD)',
          indicator: 'Gross Volume USD',
          isIntraDay: true,
        },
      ],
    },
    {
      category: 'Transactions',
      values: [
        {
          name: 'Number',
          indicator: 'Transactions',
          isIntraDay: true,
        },
      ],
    },
    {
      category: 'Addresses',
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
      values: [
        {
          name: 'Amount',
          indicator: 'Supply',
        },
      ],
    },
    {
      category: 'NVT',
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
          name: 'Avg. Gas',
          indicator: 'Average Gas',
        },
        {
          name: 'Avg. Gas Price (Wei)',
          indicator: 'Average Gas Price (Wei)',
        },
      ],
    },
  ],
  ERC_20: [
    {
      category: 'Volume',
      values: [
        {
          name: 'USD',
          indicator: 'ERC20 Volume USD',
        },
        {
          name: 'Real',
          indicator: 'ERC20 Volume',
        },
      ],
    },
    {
      category: 'Transactions',
      values: [
        {
          name: 'Number',
          indicator: 'Transactions',
        },
      ],
    },
    {
      category: 'Addresses',
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
  ],
};
