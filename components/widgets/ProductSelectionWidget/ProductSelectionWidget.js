import React from 'react';

import { Product } from './Product';
import { PRODUCTS } from './data/productsData';

export const ProductSelectionWidget = () => {
  return (
    <>
      <div className="container">
        {PRODUCTS.map(
          ({ name, price, features, buttonText, stripePlan }, index) => (
            <React.Fragment key={name}>
              <Product
                name={name}
                price={price}
                features={features}
                buttonText={buttonText}
                stripePlan={stripePlan}
              />
            </React.Fragment>
          )
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        @media only screen and (max-width: 768px) {
          .container {
            flex-direction: column;
            width: 100%;
            padding-top: 10px;
          }
        }
      `}</style>
    </>
  );
};
