import React from "react";
import PropTypes from "prop-types";
import { Button, Intent } from "@blueprintjs/core";

import { Product } from "./Product";
import { PRODUCTS } from "./data/productsData";

const CustomButton = ({ backGrounColor }) => {
  return (
    <div>
      <Button>Custom Button</Button>
      <style jsx>{`
        /* "div" will be prefixed, but ".bp3-button:not" won't */

        div > :global(.bp3-button:not([class*="bp3-intent-"])) {
          color: red;
          background-color: ${backGrounColor};
        }
      `}</style>
    </div>
  );
};

CustomButton.propTypes = {
  backGrounColor: PropTypes.string
};

CustomButton.defaultProps = {
  backGrounColor: "magenta"
};

export const ProductSelectionWidget = () => {
  return (
    <>
      <CustomButton></CustomButton>
      <CustomButton backGrounColor="DarkGreen"></CustomButton>
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
