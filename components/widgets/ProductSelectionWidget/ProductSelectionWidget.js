import React from "react";

import { Product } from "./Product";
import { PRODUCTS } from "./data/productsData";

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
              {index !== PRODUCTS.length - 1 && <Separator />}
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

const Separator = () => (
  <div className="separator">
    <style jsx>{`
      .separator {
        border: solid 0.5px rgba(151, 151, 151, 0.15);
        margin-top: 10px;
        margin-bottom: 10px;
      }
      @media only screen and (max-width: 768px) {
        .separator {
          visibility: hidden;
        }
      }
    `}</style>
  </div>
);
