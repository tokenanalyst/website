import React from 'react';

import { DemoCallOutPricing } from '../components/DemoCallOutPricing';
import { ProductSelectionWidget } from '../components/widgets/ProductSelectionWidget';
import { ProductFeaturesWidget } from '../components/widgets/ProductFeaturesWidget';
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
            width: 100%;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .callout-container {
            margin: auto;
            width: calc(1440px - 40px);
            height: 100%;
          }
          .callout {
            padding-left: 100px;
            padding-right: 100px;
            height: 100%;
            padding-bottom: 35px;
          }
          .testimonials-container {
            margin: auto;
            width: calc(1440px - 40px);
            height: 100%;
          }
          .testimonials {
            padding-left: 100px;
            padding-right: 100px;
          }
          .products-container {
            height: 100%;
            background: url('/static/png/pricing/products_list_brg.png');
          }
          .products {
            margin: auto;
            height: 100%;
            width: calc(1440px - 40px);
          }
          .products-features-container {
            margin: auto;
            height: 100%;
            width: calc(1440px - 40px);
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
              width: 100%;
            }
            .callout {
              padding-left: 0px;
              padding-right: 0px;
              height: 100%;
              padding-bottom: 15px;
            }
            .testimonials-container {
              width: 100%;
            }
            .testimonials {
              padding-left: 0px;
              padding-right: 0px;
            }
            .products-container {
              display: flex;
              flex-direction: column;
              height: 100%;
            }
            .products {
              width: 100%;
            }
            .products-features-container {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Pricing;
