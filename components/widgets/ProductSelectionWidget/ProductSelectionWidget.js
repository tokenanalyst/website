import React from 'react';

import { Product } from './Product';
import { PRODUCTS } from './data/productsData';

export const ProductSelectionWidget = () => {
  return (
    <>
      <div className="container">
        {PRODUCTS.map(
          ({ name, price, features, buttonText, stripePlan }, index) => (
            // <div className="product" key={name}>
            <Product
              name={name}
              price={price}
              features={features}
              buttonText={buttonText}
              stripePlan={stripePlan}
            />
            // </div>
          )
        )}
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          flex-direction: row;
          display: flex;
          justify-content: space-between;
        }
        .product {
          margin: 5px;
          display: flex;
          width: 100%;
          flex-grow: 1;
          font-family: Open Sans;
          flex: 1 1 0px;
          align-content: space-between;
        }
        @media only screen and (max-width: 768px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};
