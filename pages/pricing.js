import React from "react";

import {
  ProductSelectionWidget,
  FeatureTableDesktop,
  FeatureTableMobile
} from "../components/widgets/ProductSelectionWidget";

const Pricing = () => {
  return (
    <div className="container">
      <div className="header">Plans</div>
      <div className="shadow" />
      <ProductSelectionWidget />
      <div className="header">What you get</div>
      <div className="feature-table">
        <FeatureTableDesktop />
        <FeatureTableMobile />
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