import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import Router from 'next/router';
import Cookies from 'js-cookie';

import { LoginContext } from '../../../contexts/Login';
import { STRIPE } from '../../../constants/stripe';
import { PLAN_NAMES } from '../../../constants/plans';
import { colors } from '../../../constants/styles/colors';

export const Product = ({ name, price, features, buttonText, stripePlan }) => {
  const loginCtx = useContext(LoginContext);
  const username = Cookies.get('loggedInAsUsername');
  const userId = Cookies.get('loggedInAsUserId');

  const redirectToStripe = async stripeOptions => {
    const stripe = Stripe(STRIPE.apiKey);
    const stripeOpt = {
      items: [
        {
          plan: stripePlan,
          quantity: 1,
        },
      ],
      successUrl: 'https://www.tokenanalyst.io/purchase-success',
      cancelUrl: 'https://www.tokenanalyst.io/',
      ...stripeOptions,
    };

    await stripe.redirectToCheckout(stripeOpt);
  };

  const emitProductEvent = name => {
    ReactGA.event({
      category: 'User',
      action: `Plan select ${name}`,
      label: `Plans`,
    });
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
          <div
            className="purchase-button"
            onClick={
              name === PLAN_NAMES.ENTERPRISE
                ? () => {
                    emitProductEvent(name);
                    window.location = 'mailto:info@tokenanalyst.io';
                  }
                : name === PLAN_NAMES.FREE
                ? () => {
                    emitProductEvent(name);
                    if (!loginCtx.isLoggedIn) {
                      loginCtx.setPaymentData({
                        isFreeTier: true,
                      });
                    }
                    return Router.push('/register');
                  }
                : async () => {
                    emitProductEvent(name);
                    if (!loginCtx.isLoggedIn) {
                      loginCtx.setPaymentData({
                        stripe: { redirectFn: redirectToStripe },
                      });
                      return Router.push('/login');
                    }
                    await redirectToStripe({
                      customerEmail: username,
                      clientReferenceId: userId.toString(),
                    });
                  }
            }
          >
            {buttonText}
          </div>
        </div>
      </div>
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
          color: white;
          min-width: 60px;
          text-align: center;
          background-color: rgba(${colors.primaryGreen});
          max-height: 40px;
          padding: 10px;
          border-radius: 20px;
          cursor: pointer;
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
