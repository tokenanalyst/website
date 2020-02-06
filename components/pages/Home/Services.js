import React from 'react';

import { ProductCard } from './ProductCard';
import { PRODUCTS } from './data/productsData';

export const Services = () => {
  return (
    <>
      <div className="container">
        <div className="product-container">
          <h2 className="products-header">Our Products</h2>
          <div className="products">
            {Object.keys(PRODUCTS).map(({ title, description, links }) => {
              return (
                <div className="product" key={title}>
                  <ProductCard
                    description={description}
                    links={links}
                    title={title}
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
