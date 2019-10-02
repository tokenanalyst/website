export const PLAN_NAMES = {
  FREE: 'Free',
  // PLATFORM: 'Platform',
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
  FREE: {
    name: PLAN_NAMES.FREE,
    price: '$0',
    features: [
      'Fundamental Analytics',
      '90 day daily data + 1 Week hourly data',
    ],
    buttonText: 'Get',
    tier: TIERS['0'],
  },
  PLATFORM: {
    name: PLAN_NAMES.PLATFORM,
    price: '$50',
    features: [
      'Exchange Flows',
      'Full Historical Data',
      'Web Platform Access Only',
    ],
    buttonText: 'Purchase',
    tier: TIERS['1'],
    stripePlan: 'plan_FuFH6oh6AGeUl0',
  },
  // PLATFORM: {
  //   name: PLAN_NAMES.PLATFORM,
  //   price: '$50',
  //   features: [
  //     'Exchange Flows',
  //     'Full Historical Data',
  //     'Web Platform Access Only',
  //   ],
  //   buttonText: 'Purchase',
  //   stripePlan: 'plan_FuFH6oh6AGeUl0',
  // },
  PRO: {
    name: PLAN_NAMES.PRO,
    price: '$799',
    features: [
      'Exchange Flows',
      'Full Historical Data',
      'Web Platform, CSV, and API',
    ],
    buttonText: 'Purchase',
    tier: TIERS['2'],
    stripePlan: 'plan_FZwuSdyp2hRm98',
  },
  ENTERPRISE: {
    name: PLAN_NAMES.ENTERPRISE,
    price: '-',
    features: [
      'Custom Metrics',
      'Full Historical Data',
      'All Formats + Websockets',
    ],
    buttonText: 'Contact Us',
    tier: TIERS['2'],
  },
};

export const TEST_PLANS = {
  FREE: {
    name: PLAN_NAMES.FREE,
    price: '$0',
    features: ['Fundamental Analytics', '90 Day Data', 'CSV & API'],
    buttonText: 'Get',
    tier: -1,
  },
  // PLATFORM: {
  //   name: PLAN_NAMES.PLATFORM,
  //   price: '$50',
  //   features: [
  //     'Exchange Flows',
  //     'Full Historical Data',
  //     'Web Platform Access Only',
  //   ],
  //   buttonText: 'Purchase',
  //   stripePlan: 'plan_FuFaK78eUjiZ9L',
  // },
  HOBBYIST: {
    name: PLAN_NAMES.HOBBYIST,
    price: '$99',
    features: ['Advanced Analytics', 'Full Historical Data', 'CSV & API'],
    buttonText: 'Purchase',
    stripePlan: 'plan_F7W6tgvMEc0yRM',
  },
};
