export const PLAN_NAMES = {
  PRO: 'Professional',
  ENTERPRISE: 'Enterprise',
  HOBBYIST: 'Hobbyist',
};

const { PRO, ENTERPRISE } = PLAN_NAMES;

export const TIERS = {
  nologin: {
    timeLimits: {
      '1d': 90,
      '1h': 0,
    },
  },
  '0': {
    timeLimits: {
      '1d': 90,
      '1h': 168, // 1 week
    },
  },
  '1': {
    timeLimits: {
      '1d': 3650, // 10 years
      '1h': 87600, // 10 years
    },
  },
  '2': {
    timeLimits: {
      '1d': 3650, // 10 years
      '1h': 87600, // 10 years
    },
  },
  '3': {
    timeLimits: {
      '1d': 3650, // 10 years
      '1h': 87600, // 10 years
    },
  },
};

export const PLANS_PROD = {
  PRO: {
    name: PRO,
    price: '$799',
    features: [
      'Full Historical Data',
      'Real-Time Updates',
      'Access via API, CSV, & Web Platform',
      '50+ Assets & 70+ Metrics',
      'Exchange Flows, Miner Flows, Whale Balances',
      'Stablecoin Mints & Burns, Supply & Demand',
      'Smart Contract & DeFi Metrics',
      'Raw transaction & block level data',
    ],
    buttonText: 'Purchase',
    tier: TIERS['2'],
    stripePlan: 'plan_FZwuSdyp2hRm98',
    id: 2,
    isFeatured: true,
  },
  ENTERPRISE: {
    name: ENTERPRISE,
    price: '',
    features: [
      'Complete Data Access',
      'World’s Fastest Bitcoin Websocket',
      'Custom Metrics Such as Miner to Exchange Flows',
      'Transaction Level Flow Data for Modeling & Backtesting',
      'Slack/Telegram Engineering Support',
    ],
    buttonText: 'Contact Us',
    tier: TIERS['2'],
    id: 3,
    isPremier: true,
  },
  SIGNED_OUT: {
    id: -1,
  },
};

export const PLANS_DEV = {
  PRO: {
    name: PRO,
    price: '$799',
    features: [
      'Full Historical Data',
      'Real-Time Updates',
      'Access via API, CSV, & Web Platform',
      '50+ Assets & 70+ Metrics',
      'Exchange Flows, Miner Flows, Whale Balances',
      'Stablecoin Mints & Burns, Supply & Demand',
      'Smart Contract & DeFi Metrics',
      'Raw transaction & block level data',
    ],
    buttonText: 'Purchase',
    tier: TIERS['2'],
    stripePlan: 'plan_F7W6tgvMEc0yRM',
    id: 2,
    isFeatured: true,
  },
  ENTERPRISE: {
    name: ENTERPRISE,
    price: '',
    features: [
      'Complete Data Access',
      'World’s Fastest Bitcoin Websocket',
      'Custom Metrics Such as Miner to Exchange Flows',
      'Transaction Level Flow Data for Modeling & Backtesting',
      'Slack/Telegram Engineering Support',
    ],
    buttonText: 'Contact Us',
    tier: TIERS['2'],
    id: 3,
    isPremier: true,
  },
  SIGNED_OUT: {
    id: -1,
  },
};

export const PLANS =
  process.env.NODE_ENV === 'development' ? PLANS_DEV : PLANS_PROD;
