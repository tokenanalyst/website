import { PLANS } from '../../../../constants/plans';

const CARD_CONTENT = {
  PLATFORM: {
    title: 'Platform',
    priceText: `Just ${PLANS.PLATFORM.price}/month`,
    description: `Combining all important market data 
    sources into one integrated trading
    intelligence platform.`,
    image: '/static/svg/pricing/platform_small.svg',
    links: [{ text: 'Try free version', url: '/register' }],
  },
  PRO: {
    title: 'API and WebSocket',
    priceText: `${PLANS.PRO.price}/month`,
    description: `Programmatic access to our historial
  data set and real-time feeds, using 
  HTTP REST endpoints and WebSocket.`,
    isIncludesPlatform: true,
    image: '/static/svg/pricing/api_websocket_small.svg',
    links: [
      {
        text: 'Documentation',
        url: 'https://docs.tokenanalyst.io/#/api',
        isExternal: true,
      },
      {
        text: 'Examples',
        url: 'https://github.com/tokenanalyst/samplecoder',
        isExternal: true,
      },
    ],
  },
  ENTERPRISE: {
    title: 'Enterprise',
    priceText: `Tailored services`,
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
  .reduce((acc, plan) => {
    console.log(plan);
    return [...acc, { ...PLANS[plan], card: CARD_CONTENT[plan] }];
  }, []);
