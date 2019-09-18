import React, { useContext } from "react";
import ReactGA from "react-ga";
import Router from "next/router";
import Cookies from "js-cookie";
import { Button, Intent } from "@blueprintjs/core";

import { LoginContext } from "../../../contexts/Login";
import { STRIPE } from "../../../constants/stripe";
import { colors } from "../../../constants/styles/colors";

import css from "styled-jsx/css";

function getLinkStyles(color) {
  return css.resolve`
    :global(.bp3-button:not([class*="bp3-intent-"])) {
      background-color: yellow;
    }
  `;
}

export const Product = ({ name, price, features, buttonText, stripePlan }) => {
  const loginCtx = useContext(LoginContext);
  const username = Cookies.get("loggedInAsUsername");
  const userId = Cookies.get("loggedInAsUserId");

  const { className, styles } = getLinkStyles();

  const redirectToStripe = async stripeOptions => {
    const stripe = Stripe(STRIPE.apiKey);
    const stripeOpt = {
      items: [
        {
          plan: stripePlan,
          quantity: 1
        }
      ],
      successUrl: "https://www.tokenanalyst.io/purchase-success",
      cancelUrl: "https://www.tokenanalyst.io/",
      ...stripeOptions
    };

    await stripe.redirectToCheckout(stripeOpt);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="title">{name}</div>
          <div className="price">
            {price} <span className="monthly">/month</span>
          </div>
        </div>
        <div className="body">
          <div className="features">
            {features.map(feature => (
              <div key={feature} className="feature">
                {feature}
              </div>
            ))}
          </div>
          <div>
            Test text
            <Button
              className={className}
              onClick={
                stripePlan
                  ? async () => {
                      ReactGA.event({
                        category: "User",
                        action: `Plan select ${name}`,
                        label: `Plans`
                      });

                      if (!loginCtx.isLoggedIn) {
                        loginCtx.setPaymentData({
                          stripe: { redirectFn: redirectToStripe }
                        });
                        return Router.push("/login");
                      }
                      await redirectToStripe({
                        customerEmail: username,
                        clientReferenceId: userId.toString()
                      });
                    }
                  : () => {
                      ReactGA.event({
                        category: "User",
                        action: `Plan select ${name}`,
                        label: `Plans`
                      });

                      if (name === "Free") {
                        return Router.push("/register");
                      }

                      window.location = "mailto:info@tokenanalyst.io";
                    }
              }>
              {buttonText}
            </Button>
            {/* <CustomButton></CustomButton> */}
          </div>
        </div>
      </div>
      {styles}
      <style jsx>{`
        .container {
          font-family: Open Sans;
          display: flex;
          flex-direction: column;
          min-width: 300px;
          max-width: 300px;
          border-bottom: solid 1px rgba(151, 151, 151, 0.15);
          padding: 10px;
        }
        .header {
          font-family: Space Grotesk;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
        }
        .price {
          font-size: 20px;
          opacity: 0.4;
        }
        .monthly {
          font-size: 16px;
        }
        .body {
          padding-top: 10px;
          padding-bottom: 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .feature {
          padding-top: 4px;
          padding-bottom: 4px;
        }
        .purchase-button {
          height: 100px;
          width: 200px;
        }
        .merry--override {
          color: yellow;
        }
        @media only screen and (max-width: 768px) {
          .container {
            padding: 5px;
            min-width: 95%;
          }
          .feature {
            padding-top: 2px;
            padding-bottom: 2px;
          }
        }
      `}</style>
    </>
  );
};
