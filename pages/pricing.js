import React from "react";

import { ProductSelectionWidget } from "../components/widgets/ProductSelectionWidget/ProductSelectionWidget";
import { FeatureTableDesktop } from "../components/widgets/ProductSelectionWidget/FeatureTableDesktop";
import { FeatureTableMobile } from "../components/widgets/ProductSelectionWidget/FeatureTableMobile";

const products = [
  {
    name: "Free",
    price: "$0",
    features: ["Fundamental Analytics", "90 Day Data", "CSV & API"]
  },
  {
    name: "Hobbyist",
    price: "$199",
    features: ["Advanced Analytics", "Full Historical Data", "CSV & API"]
  },
  {
    name: "Pro",
    price: "$799",
    features: ["Exchange Flows", "Full Historical Data", "CSV & API"]
  },
  {
    name: "Enterprise",
    price: "Variable",
    features: [
      "Custom Metrics",
      "Full Historical Data",
      "All Formats + Websockets"
    ]
  }
];

const features = {
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
const Pricing = () => {
  return (
    <div className="container">
      <div className="header">Plans</div>
      <div className="shadow" />
      <ProductSelectionWidget products={products} />
      <div className="header">What you get</div>
      <div className="feature-table">
        <FeatureTableDesktop features={features} />
        <FeatureTableMobile features={features} />
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .header {
            font-family: Space Grotesk;
            font-size: 32px;
            font-weight: bold;
            padding: 20px;
            padding-top: 30px;
          }
          .feature-table {
            padding-top: 10px;
          }
          @media only screen and (max-width: 768px) {
            .shadow {
              height: 4px;
              box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.05);
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Pricing;
