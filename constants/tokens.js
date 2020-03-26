export const STABLE_TOKENS = {
  USDT_ERC20: 'USDT_ERC20',
  USDT_OMNI: 'USDT_OMNI',
  DAI: 'DAI',
  PAX: 'PAX',
  GUSD: 'GUSD',
  TUSD: 'TUSD',
  USDC: 'USDC',
  USDT: 'USDT',
  OMNI: 'OMNI',
};

export const ERC20_TOKENS = {
  BAT: 'BAT',
  BNT: 'BNT',
  CVC: 'CVC',
  FET: 'FET',
  GNT: 'GNT',
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

export const TOKEN_TYPES = {
  NATIVE: 'NATIVE',
  ERC_20: 'ERC_20',
  STABLE: 'STABLE',
};

export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
};

export const METRICS = {
  [NATIVE_TOKENS.BTC]: [
    {
      category: 'Volume',
      isDefaultCategory: true,
      defaultIndicator: 'Volume USD',
      values: [
        {
          name: 'USD',
          indicator: 'Volume USD',
          isIntraDay: true,
        },
        {
          name: 'BTC',
          indicator: 'Volume BTC',
          isIntraDay: true,
        },
        {
          name: 'Change USD',
          indicator: 'Volume Change USD',
          isIntraDay: true,
          requiresLogin: true,
        },
        {
          name: 'Change',
          indicator: 'Volume Change',
          isIntraDay: true,
          requiresLogin: true,
        },
        // {
        //   name: 'Gross Real',
        //   indicator: 'Gross Volume Real',
        //   isIntraDay: true,
        //   requiresLogin: true,
        // },
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
          requiresLogin: true,
        },
        {
          name: 'New Addresses',
          indicator: 'New Addresses',
          requiresLogin: true,
        },
        {
          name: 'Total Addresses',
          indicator: 'Total Addresses',
          requiresLogin: true,
        },
      ],
    },
    {
      category: 'Address Balances',
      values: [
        {
          name: '> 0',
          indicator: 'Balance > 0',
        },
        {
          name: '> 1',
          indicator: 'Balance > 1',
        },
        {
          name: '> 10',
          indicator: 'Balance > 10',
        },
        {
          name: '> 100',
          indicator: 'Balance > 100',
        },
        {
          name: '> 1000',
          indicator: 'Balance > 1000',
        },
        {
          name: '> 10000',
          indicator: 'Balance > 10000',
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
          requiresLogin: true,
        },
        {
          name: 'Market Cap',
          indicator: 'Market Cap',
          requiresLogin: true,
        },
      ],
    },
    {
      category: 'Fees',
      values: [
        {
          name: 'Total Fees',
          indicator: 'Total Fees',
        },
        {
          name: 'Total Fees USD',
          indicator: 'Total Fees USD',
        },
        {
          name: 'Average Fees',
          indicator: 'Average Fees',
          requiresLogin: true,
        },
        {
          name: 'Average USD',
          indicator: 'Average Fees USD',
          requiresLogin: true,
        },
        {
          name: 'Average Size (Bytes)',
          indicator: 'Average Size in Bytes',
          requiresLogin: true,
        },
        {
          name: 'Average Satoshis per Byte',
          indicator: 'Average Satoshis per Byte',
          requiresLogin: true,
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
          requiresLogin: true,
        },
        {
          name: '6 - 12 months',
          indicator: 'UTXO 6-12 months',
          requiresLogin: true,
        },
        {
          name: '12 - 18 months',
          indicator: 'UTXO 12-18 months',
          requiresLogin: true,
        },
        {
          name: '18 -  24 months',
          indicator: 'UTXO 18-24 months',
          requiresLogin: true,
        },
        {
          name: '2 - 3 years',
          indicator: 'UTXO 2 years-3 years',
          requiresLogin: true,
        },
        {
          name: '3 - 5 years',
          indicator: 'UTXO 3 years-5 years',
          requiresLogin: true,
        },
        {
          name: '5 - 10 years',
          indicator: 'UTXO 5 years-10 years',
          requiresLogin: true,
        },
        {
          name: '> 10 years',
          indicator: 'UTXO > 10 years',
          requiresLogin: true,
        },
      ],
    },
    {
      category: 'Hashrate',
      values: [
        {
          name: 'Total Daily Hashrate',
          indicator: 'Total Daily Hashrate (BTC)',
        },
        {
          name: 'Total Daily Block Count',
          indicator: 'Total Daily Block Count (BTC)',
          requiresLogin: true,
        },
      ],
    },
    {
      category: 'Rewards',
      values: [
        {
          name: 'Total Daily Block Reward',
          indicator: 'Total Daily Block Reward (BTC)',
        },
        {
          name: 'Total Daily Block Reward USD',
          indicator: 'Total Daily Block Reward USD (BTC)',
          requiresLogin: true,
        },
      ],
    },
    {
      category: 'Spent Outputs Profit Ratio',
      values: [
        {
          name: 'SOPR',
          indicator: 'SOPR',
        },
      ],
    },
  ],
  [NATIVE_TOKENS.ETH]: [
    {
      category: 'Volume',
      isDefaultCategory: true,
      defaultIndicator: 'Internal Volume',
      values: [
        {
          name: 'Internal',
          indicator: 'Internal Volume',
        },
        {
          name: 'Internal USD',
          indicator: 'Internal Volume USD',
        },
        {
          name: 'External',
          indicator: 'External Volume',
          requiresLogin: true,
        },
        {
          name: 'External USD',
          indicator: 'External Volume USD',
          requiresLogin: true,
        },
        {
          name: 'Gross',
          indicator: 'Gross Volume',
          requiresLogin: true,
        },
        {
          name: 'Gross USD',
          indicator: 'Gross Volume USD',
          requiresLogin: true,
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
          requiresLogin: true,
        },
        {
          name: 'New Eth Addresses',
          indicator: 'New Eth Addresses',
          requiresLogin: true,
        },
        {
          name: 'Total Eth Addresses',
          indicator: 'Total Eth Addresses',
          requiresLogin: true,
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
          requiresLogin: true,
        },
        {
          name: 'Market Cap',
          indicator: 'Market Cap',
          requiresLogin: true,
        },
      ],
    },
    {
      category: 'Fees',
      values: [
        {
          name: 'Total Fees',
          indicator: 'Total Fees',
        },
        {
          name: 'Total Fees USD',
          indicator: 'Total Fees USD',
        },
        {
          name: 'Average',
          indicator: 'Average Fees',
          requiresLogin: true,
        },
        {
          name: 'Average USD',
          indicator: 'Average Fees USD',
          requiresLogin: true,
        },
        {
          name: 'Average Gas',
          indicator: 'Average Gas',
          requiresLogin: true,
        },
        {
          name: 'Average Gas Price (Wei)',
          indicator: 'Average Gas Price (Wei)',
          requiresLogin: true,
        },
      ],
    },
    {
      category: 'Hashrate',
      values: [
        {
          name: 'Total Daily Hashrate',
          indicator: 'Total Daily Hashrate (ETH)',
        },
        {
          name: 'Total Daily Block Count',
          indicator: 'Total Daily Block Count (ETH)',
          requiresLogin: true,
        },
        {
          name: 'Total Daily Uncle Count',
          indicator: 'Total Daily Uncle Count',
        },
        {
          name: 'Total Daily Uncle Percent',
          indicator: 'Total Daily Uncle Percent',
          requiresLogin: true,
        },
      ],
    },
    {
      category: 'Rewards',
      values: [
        {
          name: 'Total Daily Block Reward',
          indicator: 'Total Daily Block Reward (ETH)',
        },
        {
          name: 'Total Daily Block Reward USD',
          indicator: 'Total Daily Block Reward USD (ETH)',
          requiresLogin: true,
        },
        {
          name: 'Total Daily Uncle Reward',
          indicator: 'Total Daily Uncle Reward',
          requiresLogin: true,
        },
        {
          name: 'Total Daily Uncle Reward USD',
          indicator: 'Total Daily Uncle Reward USD',
          requiresLogin: true,
        },
      ],
    },
  ],
  ERC_20: [
    {
      category: 'Volume',
      isDefaultCategory: true,
      defaultIndicator: 'ERC20 Volume USD',
      values: [
        {
          name: 'USD',
          indicator: 'ERC20 Volume USD',
        },
        {
          name: 'ERC20',
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
