import { PLANS } from '../../../../../constants/plans';

const CARD_CONTENT = {
  PRO: {
    title: 'Professional',
    description: `Access to a plethora of proprietary metrics and insights via historical data APIs.`,
    image: '/static/svg/pricing/api_websocket_small.svg',
    links: [
      {
        text: 'Documentation',
        url: 'https://docs.tokenanalyst.io/#/api',
        isExternal: true,
      },
      {
        text: 'Examples',
        url: 'https://github.com/tokenanalyst/samplecode',
        isExternal: true,
      },
    ],
  },
  ENTERPRISE: {
    title: 'Enterprise',
    description: `We provide deep blockchain intelligence
    reports such as functional calls, smart 
    contract events, miner statistics etc.`,
    image: '/static/svg/pricing/enterprise_small.svg',
    links: [
      {
        text: 'Contact us',
        url: 'mailto:info@tokenanalyst.io',
      },
      {
        text: 'Public Reports',
        url: 'https://research.tokenanalyst.io/',
        isExternal: true,
      },
    ],
  },
};

export const PRODUCTS = Object.keys(PLANS)
  .filter(plan => PLANS[plan].id >= 0)
  .map(plan => ({ ...PLANS[plan], card: CARD_CONTENT[plan] }));
