import React from 'react';

import { DemoCallOutPricing } from '../components/DemoCallOutPricing';
import { ProductSelectionWidget } from '../components/widgets/NewProductSelectionWidget';

const Pricing = () => {
  return (
    <div className="container">
      <div className="callout-container">
        <div className="callout">
          <DemoCallOutPricing />
        </div>
      </div>
      <div className="products-container">
        <div className="products">
          <ProductSelectionWidget />
        </div>
      </div>
      <div className="products-details-container">
        <div className="products-details">Plans details</div>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 1312px;
            width: 1440px;
            margin: auto;
          }
          .callout-container {
            height: 669px;
          }
          .callout {
            padding-left: 100px;
            padding-right: 100px;
            border-style: solid;
            border-width: 1px;
            border-color: lightblue;
            height: 100%;
          }
          .products-container {
            height: 643px;
            background: url('/static/png/pricing/products_list_brg.png');
          }
          .products {
            border-style: solid;
            border-width: 1px;
            border-color: lightblue;
            height: 100%;
          }
          .products-details-container {
          }
          .products-details {
            border-style: solid;
            border-width: 1px;
            border-color: lightblue;
            height: 100%;
          }
          @media only screen and (max-width: 768px) {
            .products-container {
              display: flex;
              flex-direction: column;
              background-color: gray;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Pricing;
