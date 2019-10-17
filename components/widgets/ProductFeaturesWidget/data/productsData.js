import { PLANS } from '../../../../constants/plans';

export const FEATURES = {
  columns: ['Platform', 'Pro', 'Enterprise'],
  categories: [
    {
      name: 'Blockchain Fundamentals',
      items: [
        {
          name: 'On-chain Volumes & Transaction Counts',
          entitled: [true, true, true],
        },
        {
          name: 'Network Stats (Address Growth, NVT, Fees) ',
          entitled: [true, true, true],
        },
        {
          name: 'Supply Metrics',
          entitled: [true, true, true],
        },
        {
          name: 'Security Metrics (hashrate & block rewards by miner)',
          entitled: [false, true, true],
        },
        {
          name: 'Detailed UTXO Age Band Metrics',
          entitled: [false, false, true],
        },
      ],
    },
    {
      name: 'On-Chain Flows',
      items: [
        {
          name: 'BTC & ETH Exchange inflow/outflow',
          entitled: [true, true, true],
        },
        {
          name: 'ERC20/Stablecoin Exchange inflow/outflow',
          entitled: [true, true, true],
        },
        {
          name: 'Significant Transactions into/out of Exchanges',
          entitled: [false, true, true],
        },
        {
          name: 'Exchange Cluster Balances ',
          entitled: [false, true, true],
        },
        {
          name: 'Miner Cluster Balances',
          entitled: [false, true, true],
        },
        {
          name: 'Miner inflows/outflows',
          entitled: [false, true, true],
        },
        {
          name: 'Miner to Exchange flows',
          entitled: [false, false, true],
        },
        {
          name: 'DEX Order Books',
          entitled: [false, false, true],
        },
      ],
    },
    {
      name: 'Advanced Metrics',
      items: [
        {
          name: 'Entity Labels (Miners, Exchanges, OTC Desks)',
          entitled: [false, false, true],
        },
        {
          name: 'Smart Contract Function Calls & Events',
          entitled: [false, false, true],
        },
        {
          name: `ETH 'Internal' Transactions`,
          entitled: [false, false, true],
        },
        {
          name: 'Mempool Datasets',
          entitled: [false, false, true],
        },
      ],
    },
    {
      name: 'Access',
      items: [
        {
          name: 'Web Platform (updated hourly)',
          entitled: [true, true, true],
        },
        {
          name: 'API (updated hourly)',
          entitled: [false, true, true],
        },
        {
          name: 'WebSocket (real-time)',
          entitled: [false, true, true],
        },
        {
          name: 'Bespoke Dashboards',
          entitled: [false, false, true],
        },
        {
          name: 'Full Transaction Level Data Transfer',
          entitled: [false, false, true],
        },
      ],
    },
    {
      name: 'Support',
      items: [
        {
          name: 'Intercom Support',
          entitled: [true, true, true],
        },
        {
          name: 'Email Support',
          entitled: [false, true, true],
        },
        {
          name: 'Speak with a TokenAnalyst Engineer ',
          entitled: [false, false, true],
        },
      ],
    },
  ],
};

const FEATURES_CONTENT = {
  PLATFORM: {
    title: 'Platform',
    description: `The intelligent analyst’s toolkit with 
    TradingView support, interactive data 
    dashboards, and historical data across a 
    variety of assets and exchanges.`,
    image: '/static/svg/pricing/features_platform.svg',
    features: [
      `Historical Order Book & Exchange Flows`,
      `Web Platform Access Only`,
      `Power-User Charting Tools`,
    ],
    buttons: [
      {
        text: 'Try it out',
        url: 'https://www.tokenanalyst.io/register',
      },
      {
        text: 'Buy Plan',
        url: null,
        isBuy: true,
      },
    ],
    index: 1,
  },
  PRO: {
    title: 'TokenAnalyst Pro',
    description: `Our signature plan, offering proprietary 
    historical and real-time metrics across 
    a wide-array of assets via API 
    and WebSocket.`,
    image: '/static/svg/pricing/features_pro.svg',
    features: [
      `Full Historical Data + Real-Time Updates`,
      `Access via API, CSV, & Web Platform`,
      `50+ Assets & 70+ Metrics`,
      `Exchange Flows, Miner Flows`,
      `Stablecoin Mints & Burns, S&D`,
      `Smart Contract & DeFi Metrics`,
    ],
    buttons: [
      {
        text: 'Request a Demo',
        isIntercom: true,
      },
      {
        text: 'Documentation',
        url: 'https://docs.tokenanalyst.io/#/api',
        isExternal: true,
      },
      {
        text: 'Buy Plan',
        url: null,
        isBuy: true,
      },
    ],
    index: 0,
  },
  ENTERPRISE: {
    title: 'Enterprise',
    description: `Access data faster than the competition 
    and gain unparalleled insights using our 
    proprietary datasets.`,
    image: '/static/svg/pricing/features_enterprise.svg',
    features: [
      `Complete Data Access`,
      `Customized Metrics`,
      `Transaction Data for Modeling & Backtesting`,
      `World’s Fastest Bitcoin Websocket`,
      `Raw Transaction, Block-level Data`,
      `Personal Support from TokenAnalyst`,
    ],
    buttons: [
      {
        text: 'Request a Demo',
        isIntercom: true,
      },
      {
        text: 'Buy Plan',
        url: 'mailto:info@tokenanalyst.io',
        isBuy: true,
      },
    ],
    index: 2,
  },
};

export const PRODUCTS = Object.keys(PLANS)
  .filter(plan => PLANS[plan].id >= 0)
  .map(plan => ({ ...PLANS[plan], details: FEATURES_CONTENT[plan] }))
  .sort((a, b) => {
    return a.details.index - b.details.index;
  });
