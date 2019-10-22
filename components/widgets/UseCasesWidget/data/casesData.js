import { PLAN_NAMES } from '../../../../constants/plans';

export const USE_CASES = [
  {
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
  {
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
  {
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
];
