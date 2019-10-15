import { PLANS } from '../../../../constants/plans';

const FEATURES_CONTENT = {
  PLATFORM: {
    title: 'Platform',
    description: `The intelligent analyst’s toolkit with 
    TradingView support, interactive data 
    dashboards, and historical data across a 
    variety of assets and exchanges.`,
    image: '/static/svg/pricing/features_platform.svg',
    features: [
      `Historical Order Book & Exchange Flows`,
      `Web Platform Access Only`,
      `Power-User Charting Tools`,
    ],
    buttons: [
      {
        text: 'Try it out',
        url: 'https://www.tokenanalyst.io/register',
      },
      {
        text: 'Buy Plan',
        url: null,
        isBuy: true,
      },
    ],
  },
  PRO: {
    title: 'API and WebSocket',
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
        url: 'mailto:info@tokenanalyst.io',
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
    title: 'Enterprise',
    description: `Access data faster than the competition 
    and gain unparalleled insights using our 
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
        url: 'mailto:info@tokenanalyst.io',
      },
      {
        text: 'Buy Plan',
        url: 'mailto:info@tokenanalyst.io',
        isBuy: true,
      },
    ],
  },
};

export const PRODUCTS = Object.keys(PLANS)
  .filter(plan => PLANS[plan].id >= 0)
  .map(plan => ({ ...PLANS[plan], details: FEATURES_CONTENT[plan] }));
