import React from 'react';

import { ProductCard } from './ProductCard';
import { PRODUCTS } from './data/productsData';

export const Products = () => {
  return (
    <>
      <div className="container">
        <div className="product-container">
          <div className="products">
            {Object.values(PRODUCTS).map(({ title, description, links }) => {
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
            padding-bottom: 100px;
            padding-top: 100px;
          }
          .products {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          @media only screen and (max-width: 768px) {
            .container {
              padding-top: 0px;
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
          }
        `}
      </style>
    </>
  );
};
