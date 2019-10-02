import { PLANS, TEST_PLANS } from '../../../../constants/plans';

export const PRODUCTS = [
  PLANS.FREE,
  PLANS.PLATFORM,
  PLANS.PRO,
  PLANS.ENTERPRISE,
];

export const TEST_PRODUCTS = [TEST_PLANS.FREE, TEST_PLANS.HOBBYIST];

export const FEATURES = {
  columns: ['Free', 'Platform', 'Pro', 'Enterprise'],
  categories: [
    {
      name: 'Core Blockchain Data',
      items: [
        {
          name: 'Blocks, Transactions, & Address stats',
          entitled: [true, true, true, true],
        },
        {
          name: 'ERC20 Token Transfers',
          entitled: [true, true, true, true],
        },
        {
          name: 'Smart Contract Function Calls & Events',
          entitled: [false, false, true, true],
        },
        {
          name: 'Mempool Transactions',
          entitled: [false, false, false, true],
        },
      ],
    },
    {
      name: 'Visual Analytics',
      items: [
        {
          name: 'Stablecoin/ERC20 Volumes',
          entitled: [false, true, true, true],
        },
        {
          name: 'Supply Metrics',
          entitled: [false, true, true, true],
        },
        {
          name: 'Network stats (address growth, NVT, etc.)',
          entitled: [false, true, true, true],
        },
        {
          name: 'Security Metrics (hashrate, miner rewards, uncle rates)',
          entitled: [false, true, true, true],
        },
      ],
    },
    {
      name: 'Advanced API Analytics',
      items: [
        {
          name: 'Stablecoin/ERC20 Volumes',
          entitled: [false, false, true, true],
        },
        {
          name: 'Supply Metrics',
          entitled: [false, false, true, true],
        },
        {
          name: 'Network stats (address growth, NVT, etc.)',
          entitled: [false, false, true, true],
        },
        {
          name: 'Security Metrics (hashrate, miner rewards, uncle rates)',
          entitled: [false, false, true, true],
        },
      ],
    },
    {
      name: 'Exchange Flows',
      items: [
        {
          name: 'BTC & ETH inflow/outflow',
          entitled: [false, true, true, true],
        },
        {
          name: 'ERC20/Stablecoin inflow/outflow',
          entitled: [false, true, true, true],
        },
        {
          name: 'Significant Transactions into/out of Exchanges',
          entitled: [false, false, true, true],
        },
        {
          name: 'DEX Order Books',
          entitled: [false, false, false, true],
        },
      ],
    },
    {
      name: 'Support',
      items: [
        {
          name: 'Personalized Support	',
          entitled: [false, false, true, true],
        },
        {
          name: 'SLAs and Integration	',
          entitled: [false, false, true, true],
        },
        {
          name: 'Custom Metrics	',
          entitled: [false, false, false, true],
        },
        {
          name: 'Bespoke Dashboards',
          entitled: [false, false, false, true],
        },
      ],
    },
  ],
};

// export const FEATURES = {
//   columns: ['Free', 'Pro', 'Enterprise'],
//   categories: [
//     {
//       name: 'Core Blockchain Data',
//       items: [
//         {
//           name: 'Blocks, Transactions, & Address stats',
//           entitled: [true, true, true],
//         },
//         {
//           name: 'ERC20 Token Transfers',
//           entitled: [true, true, true],
//         },
//         {
//           name: 'Smart Contract Function Calls & Events',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'Mempool Transactions',
//           entitled: [false, false, true],
//         },
//       ],
//     },
//     {
//       name: 'Visual Analytics',
//       items: [
//         {
//           name: 'Stablecoin/ERC20 Volumes',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'Supply Metrics',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'Network stats (address growth, NVT, etc.)',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'Security Metrics (hashrate, miner rewards, uncle rates)',
//           entitled: [false, true, true],
//         },
//       ],
//     },
//     {
//       name: 'Advanced API Analytics',
//       items: [
//         {
//           name: 'Stablecoin/ERC20 Volumes',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'Supply Metrics',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'Network stats (address growth, NVT, etc.)',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'Security Metrics (hashrate, miner rewards, uncle rates)',
//           entitled: [false, true, true],
//         },
//       ],
//     },
//     {
//       name: 'Exchange Flows',
//       items: [
//         {
//           name: 'BTC & ETH inflow/outflow',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'ERC20/Stablecoin inflow/outflow',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'Significant Transactions into/out of Exchanges',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'DEX Order Books',
//           entitled: [false, false, true],
//         },
//       ],
//     },
//     {
//       name: 'Support',
//       items: [
//         {
//           name: 'Personalized Support	',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'SLAs and Integration	',
//           entitled: [false, true, true],
//         },
//         {
//           name: 'Custom Metrics	',
//           entitled: [false, false, true],
//         },
//         {
//           name: 'Bespoke Dashboards',
//           entitled: [false, false, true],
//         },
//       ],
//     },
//   ],
// };
