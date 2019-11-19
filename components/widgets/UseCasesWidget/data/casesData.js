import { PLANS, PLAN_NAMES } from '../../../../constants/plans';

const { PRO } = PLAN_NAMES;

export const GA_GOAL_NAME = {
  [PRO]: PRO,
};

export const USE_CASES = {
  PRO: {
    title: 'Quantitative Trading',
    plan: PLAN_NAMES.PRO,
    description: `Be the first to see transactions on-chain, tracking and trading on unconfirmed and confirmed transactions`,
    image: '/static/svg/marketing/quantitative_trading.svg',
    features: [
      `50+ metrics across 70+ digital assets`,
      `Monitor trader / hodler behavior`,
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
    isReverseImagePosition: true,
  },
  ENTERPRISE: {
    title: 'Blockchain Infrastructure',
    plan: PLAN_NAMES.ENTERPRISE,
    description: `Access secure, robust, and reliable blockchain infrastructure for multiple chains.`,
    image: '/static/svg/marketing/blockchain_infrastructure.svg',
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
        text: 'Get in touch',
        url: 'mailto:info@tokenanalyst.io',
        isBuy: true,
      },
    ],
    isReverseImagePosition: true,
  },
};

export const PRODUCTS = Object.keys(PLANS)
  .filter(plan => PLANS[plan].id >= 0)
  .map(plan => ({ ...PLANS[plan], cases: USE_CASES[plan] }))
  .sort((a, b) => {
    return a.cases.index - b.cases.index;
  });
