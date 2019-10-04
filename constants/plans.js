export const PLAN_NAMES = {
  PLATFORM: 'Platform',
  PRO: 'Pro',
  ENTERPRISE: 'Enterprise',
};

export const TIERS = {
  ['nologin']: {
    timeLimits: {
      '1d': 90,
      '1h': 0,
    },
  },
  ['0']: {
    timeLimits: {
      '1d': 90,
      '1h': 168, // 1 week
    },
  },
  ['1']: {
    timeLimits: {
      '1d': 3650, // 10 years
      '1h': 87600, // 10 years
    },
  },
  ['2']: {
    timeLimits: {
      '1d': 3650, // 10 years
      '1h': 87600, // 10 years
    },
  },
};

export const PLANS = {
  PLATFORM: {
    name: PLAN_NAMES.PLATFORM,
    price: '$49',
    features: [
      'Full Historical Data',
      'Web Platform Access Only',
      'Power-User Charting Tools',
    ],
    buttonText: 'Purchase',
    tier: TIERS['1'],
    stripePlan: 'plan_FuFH6oh6AGeUl0',
    isNew: true,
    id: 1,
  },
  PRO: {
    name: PLAN_NAMES.PRO,
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
    name: PLAN_NAMES.ENTERPRISE,
    price: '-',
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
};

export const TEST_PLANS = {
  PLATFORM: {
    name: PLAN_NAMES.PLATFORM,
    price: '$50',
    features: [
      'Exchange Flows',
      'Full Historical Data',
      'Web Platform Access Only',
    ],
    buttonText: 'Purchase',
    stripePlan: 'plan_FuFaK78eUjiZ9L',
  },
  HOBBYIST: {
    name: PLAN_NAMES.HOBBYIST,
    price: '$99',
    features: ['Advanced Analytics', 'Full Historical Data', 'CSV & API'],
    buttonText: 'Purchase',
    stripePlan: 'plan_F7W6tgvMEc0yRM',
  },
};
