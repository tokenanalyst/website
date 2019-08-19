export const products = [
  {
    name: "Free",
    price: "$0",
    features: ["Fundamental Analytics", "90 Day Data", "CSV & API"],
    buttonText: "Get"
  },
  {
    name: "Hobbyist",
    price: "$199",
    features: ["Advanced Analytics", "Full Historical Data", "CSV & API"],
    buttonText: "Purchase",
    stripePlan: "plan_FZwwbyxH5Pi73S"
  },
  {
    name: "Pro",
    price: "$799",
    features: ["Exchange Flows", "Full Historical Data", "CSV & API"],
    buttonText: "Purchase",
    stripePlan: "plan_FZwuSdyp2hRm98"
  },
  {
    name: "Enterprise",
    price: "Variable",
    features: [
      "Custom Metrics",
      "Full Historical Data",
      "All Formats + Websockets"
    ],
    buttonText: "Contact Us"
  }
];

export const features = {
  columns: ["Free", "Hobbyist", "Pro", "Enterprise"],
  categories: [
    {
      name: "Core Blockchain Data",
      items: [
        {
          name: "Blocks, Transactions, & Address stats",
          entitled: [true, true, true, true]
        },
        {
          name: "ERC20 Token Transfers",
          entitled: [true, true, true, true]
        },
        {
          name: "Smart Contract Function Calls & Events",
          entitled: [false, true, true, true]
        },
        {
          name: "Mempool Transactions",
          entitled: [false, false, false, true]
        }
      ]
    },
    {
      name: "Advanced Analytics",
      items: [
        {
          name: "Stablecoin/ERC20 Volumes",
          entitled: [false, true, true, true]
        },
        {
          name: "Supply Metrics",
          entitled: [false, true, true, true]
        },
        {
          name: "Network stats (address growth, NVT, etc.)",
          entitled: [false, true, true, true]
        },
        {
          name: "De-fi metrics (staking, lending and more)",
          entitled: [false, false, true, true]
        }
      ]
    },
    {
      name: "Exchange Flows",
      items: [
        {
          name: "BTC & ETH inflow/outflow",
          entitled: [false, false, true, true]
        },
        {
          name: "ERC20/Stablecoin inflow/outflow",
          entitled: [false, false, true, true]
        },
        {
          name: "Significant Transactions into/out of Exchanges",
          entitled: [false, false, true, true]
        },
        {
          name: "DEX Order Books",
          entitled: [false, false, false, true]
        }
      ]
    },
    {
      name: "Support",
      items: [
        {
          name: "Personalized Support	",
          entitled: [false, true, true, true]
        },
        {
          name: "SLAs and Integration	",
          entitled: [false, false, true, true]
        },
        {
          name: "Custom Metrics	",
          entitled: [false, false, false, true]
        },
        {
          name: "Bespoke Dashboards",
          entitled: [false, false, false, true]
        }
      ]
    }
  ]
};
