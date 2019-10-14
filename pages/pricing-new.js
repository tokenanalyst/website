import React from 'react';

import { DemoCallOutPricing } from '../components/DemoCallOutPricing';
import { ProductSelectionWidget } from '../components/widgets/NewProductSelectionWidget';
import { ProductFeaturesWidget } from '../components/widgets/NewProductFeaturesWidget';
import { TestimonialsPricing } from '../components/TestimonialsPricing';

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
      <div className="testimonials-container">
        <div className="testimonials">
          <TestimonialsPricing />
        </div>
      </div>
      <div className="products-features-container">
        <div className="products-features">
          <ProductFeaturesWidget />
        </div>
      </div>

      <style jsx>
        {`
          .container {
            height: 100%;
            width: 1440px;
            margin: auto;
            display: flex;
            flex-direction: column;
          }
          .callout-container {
            height: 100%;
          }
          .callout {
            padding-left: 100px;
            padding-right: 100px;
            height: 100%;
            padding-bottom: 35px;
          }
          .products-container {
            height: 100%;
            background: url('/static/png/pricing/products_list_brg.png');
          }
          .products {
            height: 100%;
          }
          .products-features-container {
          }
          .products-features {
            height: 100%;
          }
          @media only screen and (max-width: 768px) {
            .container {
              width: 100%;
              margin: auto;
            }
            .callout-container {
            }
            .callout {
              padding-left: 0px;
              padding-right: 0px;
              height: 100%;
              padding-bottom: 15px;
            }
            .products-container {
              display: flex;
              flex-direction: column;
              height: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Pricing;
