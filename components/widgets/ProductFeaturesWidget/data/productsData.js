import { PLANS, PLAN_NAMES } from '../../../../constants/plans';

const { PRO } = PLAN_NAMES;

export const GA_GOAL_NAME = {
  [PRO]: PRO,
};

export const FEATURES = {
  columns: ['Pro', 'Enterprise'],
  categories: [
    {
      name: 'Blockchain Fundamentals',
      items: [
        {
          name: 'On-chain Volumes & Transaction Counts',
          entitled: [true, true],
        },
        {
          name: 'Network Stats (Address Growth, NVT, Fees) ',
          entitled: [true, true],
        },
        {
          name: 'Supply Metrics',
          entitled: [true, true],
        },
        {
          name: 'Security Metrics (hashrate & block rewards by miner)',
          entitled: [true, true],
        },
        {
          name: 'Detailed UTXO Age Band Metrics',
          entitled: [false, true],
        },
      ],
    },
    {
      name: 'On-Chain Flows',
      items: [
        {
          name: 'BTC & ETH Exchange inflow/outflow',
          entitled: [true, true],
        },
        {
          name: 'ERC20/Stablecoin Exchange inflow/outflow',
          entitled: [true, true],
        },
        {
          name: 'Significant Transactions into/out of Exchanges',
          entitled: [true, true],
        },
        {
          name: 'Exchange Cluster Balances ',
          entitled: [true, true],
        },
        {
          name: 'Miner Cluster Balances',
          entitled: [true, true],
        },
        {
          name: 'Miner inflows/outflows',
          entitled: [true, true],
        },
        {
          name: 'Miner to Exchange flows',
          entitled: [false, true],
        },
        {
          name: 'DEX Order Books',
          entitled: [false, true],
        },
      ],
    },
    {
      name: 'Advanced Metrics',
      items: [
        {
          name: 'Entity Labels (Miners, Exchanges, OTC Desks)',
          entitled: [false, true],
        },
        {
          name: 'Smart Contract Function Calls & Events',
          entitled: [false, true],
        },
        {
          name: `ETH 'Internal' Transactions`,
          entitled: [false, true],
        },
        {
          name: 'Mempool Datasets',
          entitled: [false, true],
        },
      ],
    },
    {
      name: 'Access',
      items: [
        {
          name: 'Web Platform (updated hourly)',
          entitled: [true, true],
        },
        {
          name: 'API (updated hourly)',
          entitled: [true, true],
        },
        {
          name: 'WebSocket (real-time)',
          entitled: [true, true],
        },
        {
          name: 'Bespoke Dashboards',
          entitled: [false, true],
        },
        {
          name: 'Full Transaction Level Data Transfer',
          entitled: [false, true],
        },
      ],
    },
    {
      name: 'Support',
      items: [
        {
          name: 'Intercom Support',
          entitled: [true, true],
        },
        {
          name: 'Email Support',
          entitled: [true, true],
        },
        {
          name: 'Speak with a TokenAnalyst Engineer ',
          entitled: [false, true],
        },
      ],
    },
  ],
};

const FEATURES_CONTENT = {
  PRO: {
    title: 'Professional',
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
    and gain insights using our 
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
        text: 'Get in touch',
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
