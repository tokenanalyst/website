import React from "react";

import { PageHeader } from "../components/PageHeader";

import { PageHeader } from "../components/PageHeader";
import { TestimonialsWidget } from "../components/widgets/TestimonialsWidget";
import {
  ProductSelectionWidget,
  FeatureTableDesktop,
  FeatureTableMobile
} from "../components/widgets/ProductSelectionWidget";

const Pricing = () => {
  return (
    <div className="container">
      <PageHeader text={"Plans"} />
      <div className="shadow" />
      <div className="product-widget">
        <ProductSelectionWidget />
      </div>
      <div>
        <div className="sub-header">Testimonials</div>
        <TestimonialsWidget />
      </div>
      <div className="sub-header">What you get</div>
      <div className="feature-table">
        <FeatureTableDesktop />
        <FeatureTableMobile />
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            font-family: Space Grotesk;
          }
          .header {
            font-size: 32px;
            font-weight: bold;
            padding: 15px;
            padding-top: 30px;
          }
          .sub-header {
            font-size: 32px;
            font-weight: bold;
            padding: 15px;
            padding-top: 30px;
            opacity: 0.3;
          }
          .product-widget {
            min-width: 100%;
            padding-left: 7px;
            margin-right: 60px;
          }
          .feature-table {
            padding-top: 10px;
          }
          @media only screen and (max-width: 768px) {
            .header {
              text-align: center;
            }
            .product-widget {
              padding-left: 2px;
            }
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
