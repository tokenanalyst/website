export const PLAN_NAMES = {
  FREE: 'Free',
  HOBBYIST: 'Hobbyist',
  PRO: 'Pro',
  ENTERPRISE: 'Enterprise',
};

export const PLANS = {
  FREE: {
    name: PLAN_NAMES.FREE,
    price: '$0',
    features: ['Fundamental Analytics', '90 Day Data', 'CSV & API'],
    buttonText: 'Get',
  },
  HOBBYIST: {
    name: PLAN_NAMES.HOBBYIST,
    price: '$199',
    features: ['Advanced Analytics', 'Full Historical Data', 'CSV & API'],
    buttonText: 'Purchase',
    stripePlan: 'plan_FZwwbyxH5Pi73S',
  },
  PRO: {
    name: PLAN_NAMES.PRO,
    price: '$799',
    features: ['Exchange Flows', 'Full Historical Data', 'CSV & API'],
    buttonText: 'Purchase',
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
  },
};

export const TEST_PLANS = {
  FREE: {
    name: PLAN_NAMES.FREE,
    price: '$0',
    features: ['Fundamental Analytics', '90 Day Data', 'CSV & API'],
    buttonText: 'Get',
  },
  HOBBYIST: {
    name: PLAN_NAMES.HOBBYIST,
    price: '$99',
    features: ['Advanced Analytics', 'Full Historical Data', 'CSV & API'],
    buttonText: 'Purchase',
    stripePlan: 'plan_F7W6tgvMEc0yRM',
  },
};
