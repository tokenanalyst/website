export const STRIPE = {
  apiKey: "pk_live_aEqZIEFOmn3PlXWWYaTnP9GE0077TbzveD",
  apiTestKey: "pk_test_jjaNfNXAwhl1WzBigZd8qprV00Z0V4USEu"
};

export const STRIPE_PLANS = {
  FREE: {
    name: "Free",
    price: "$0",
    features: ["Fundamental Analytics", "90 Day Data", "CSV & API"],
    buttonText: "Get"
  },
  HOBBYIST: {
    name: "Hobbyist",
    price: "$199",
    features: ["Advanced Analytics", "Full Historical Data", "CSV & API"],
    buttonText: "Purchase",
    stripePlan: "plan_FZwwbyxH5Pi73S"
  },
  PRO: {
    name: "Pro",
    price: "$799",
    features: ["Exchange Flows", "Full Historical Data", "CSV & API"],
    buttonText: "Purchase",
    stripePlan: "plan_FZwuSdyp2hRm98"
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: "-",
    features: [
      "Custom Metrics",
      "Full Historical Data",
      "All Formats + Websockets"
    ],
    buttonText: "Contact Us"
  }
};

export const TEST_STRIPE_PLANS = {
  FREE: {
    name: "Free",
    price: "$0",
    features: ["Fundamental Analytics", "90 Day Data", "CSV & API"],
    buttonText: "Get"
  },
  HOBBYIST: {
    name: "Hobbyist",
    price: "$99",
    features: ["Advanced Analytics", "Full Historical Data", "CSV & API"],
    buttonText: "Purchase",
    stripePlan: "plan_F7W6tgvMEc0yRM"
  }
};
