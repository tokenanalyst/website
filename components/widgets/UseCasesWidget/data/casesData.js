import { PLANS, PLAN_NAMES } from '../../../../constants/plans';

const { PLATFORM, PRO } = PLAN_NAMES;

export const GA_GOAL_NAME = {
  [PLATFORM]: PLATFORM,
  [PRO]: PRO,
};

export const USE_CASES = {
  PLATFORM: {
    title: 'Fundamental Analysis',
    plan: PLAN_NAMES.PRO,
    description: `Gain a deep understanding of network security, usage, and economics.`,
    image: '/static/svg/pricing/platform_small.svg',
    features: [
      `Proprietary exchange, miner & OTC flows`,
      `Real time significant event alerting`,
      `Full historical data for modelling & backtesting`,
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
  },
  PRO: {
    title: 'Quantitative Trading',
    plan: PLAN_NAMES.PRO,
    description: `Be the first to see transactions on-chain, tracking and trading on unconfirmed and confirmed transactions`,
    image: '/static/svg/pricing/api_websocket_small.svg',
    features: [
      `50+ metrics across 70+ digital assets`,
      `Monitor trader / hodlers behaviors`,
      `Access via CSV, API, or Web Platform`,
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
  },
  ENTERPRISE: {
    title: 'Blockchain Infrastructure',
    plan: PLAN_NAMES.ENTERPRISE,
    description: `Access secure, robust, and reliable blockchain infrastructure for multiple chains.`,
    image: '/static/svg/pricing/enterprise_small.svg',
    features: [
      `Multi-protpocol nodes & RPC calls`,
      `Transaction level granularity and custom metrics`,
      `Real-time settlements, balances, and confirmations`,
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
  },
};

export const PRODUCTS = Object.keys(PLANS)
  .filter(plan => PLANS[plan].id >= 0)
  .map(plan => ({ ...PLANS[plan], cases: USE_CASES[plan] }))
  .sort((a, b) => {
    return a.cases.index - b.cases.index;
  });
