import React from "react";

import { Product } from "./Product";
import { products } from "./data/productsData";

export const ProductSelectionWidget = () => {
  return (
    <>
      <div className="container">
        {products.map(({ name, price, features }, index) => (
          <>
            <Product name={name} price={price} features={features} />
            {index !== products.length - 1 && <Separator />}
          </>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
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
        margin-left: 20px;
        margin-right: 15px;
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
