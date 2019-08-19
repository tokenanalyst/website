import React from "react";
import { STRIPE } from "../../../constants/stripe";

export const Product = ({ name, price, features, buttonText, stripePlan }) => {
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
          <div
            className="purchase-button"
            onClick={
              stripePlan
                ? async () => {
                    const stripe = Stripe(STRIPE.apiKey);
                    const result = await stripe.redirectToCheckout({
                      items: [
                        {
                          plan: stripePlan,
                          quantity: 1
                        }
                      ],
                      successUrl:
                        "https://website-jamesrford7.tokenanalyst.now.sh/purchase-success",
                      cancelUrl:
                        "https://website-jamesrford7.tokenanalyst.now.sh/"
                    });

                    console.log(result);
                  }
                : () => (window.location = "mailto:info@tokenanalyst.io")
            }
          >
            {buttonText}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          display: flex;
          flex-direction: column;
          min-width: 300px;
          max-width: 300px;
          border-bottom: solid 1px rgba(151, 151, 151, 0.15);
          padding: 10px;
        }
        .header {
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
          color: white;
          min-width: 60px;
          text-align: center;
          background-color: #3fcdab;
          max-height: 20px;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
        }
        @media only screen and (max-width: 768px) {
          .container {
            padding: 10px;
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