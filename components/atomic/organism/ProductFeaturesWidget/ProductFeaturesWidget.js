import React from 'react';

import { ProductFeatures } from './ProductFeatures';
import { PRODUCTS } from './data/productsData';

export const ProductFeaturesWidget = () => {
  return (
    <>
      <div className="container">
        <div className="products-container">
          <div className="products">
            {PRODUCTS.map(({ details, name, stripePlan }) => {
              const { buttons, description, features, image, title } = details;

              return (
                <div className="product" key={name}>
                  <a name={name} />
                  <ProductFeatures
                    name={name}
                    description={description}
                    image={image}
                    features={features}
                    buttons={buttons}
                    title={title}
                    stripePlan={stripePlan}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            padding-bottom: 77px;
          }
          .products {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .product {
          }
          .products-container {
            margin-left: 100px;
          }
          .products-header {
            padding-top: 40px;
            padding-bottom: 40px;
            font-family: Space Grotesk;
            font-size: 30px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.26px;
            color: #000000;
          }
          @media only screen and (max-width: 768px) {
            .container {
              padding-bottom: 20px;
            }
            .products {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .product {
              margin-right: 0px;
              margin-bottom: 15px;
            }
            .products-container {
              margin-left: 0px;
              margin-right: 0px;
            }
            .products-header {
              padding-top: 0px;
              padding-bottom: 0px;
              font-family: Space Grotesk;
              font-size: 30px;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: normal;
              letter-spacing: 0.26px;
              color: #000000;
            }
          }
        `}
      </style>
    </>
  );
};
