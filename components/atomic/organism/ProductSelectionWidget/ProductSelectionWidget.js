import React from 'react';

import { ProductCard } from './ProductCard';
import { PRODUCTS } from './data/productsData';
import { PLAN_NAMES } from '../../../../constants/plans';

const { PRO, ENTERPRISE } = PLAN_NAMES;

const makePrice = (product, price) => {
  const PRICE_TEXT = {
    [PRO]: `${price}/month`,
    [ENTERPRISE]: `Tailored services `,
  };

  return PRICE_TEXT[product];
};

export const ProductSelectionWidget = () => {
  return (
    <>
      <div className="container">
        <div className="product-container">
          <h2 className="products-header">Our Products</h2>
          <div className="products">
            {PRODUCTS.map(({ card, name, price }) => {
              const { title, links, description, image } = card;

              return (
                <div className="product" key={name}>
                  <ProductCard
                    name={name}
                    description={description}
                    image={image}
                    links={links}
                    price={makePrice(name, price)}
                    title={title}
                    isActive={name === PRO}
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
            flex-direction: row;
            justify-content: space-between;
          }
          .product {
            margin-right: 50px;
          }
          .product-container {
            margin-left: 100px;
            margin-right: 100px;
          }
          .products-header {
            padding-top: 10px;
            padding-bottom: 10px;
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
            .product-container {
              margin-left: 0px;
              margin-right: 0px;
            }
            .products-header {
              padding-top: 0px;
              padding-bottom: 0px;
              font-family: Space Grotesk;
              font-size: 20px;
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
