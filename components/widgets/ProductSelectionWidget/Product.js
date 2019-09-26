import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { Card } from '@blueprintjs/core';

import { LoginContext } from '../../../contexts/Login';
import { STRIPE } from '../../../constants/stripe';
import { PLAN_NAMES } from '../../../constants/plans';
import { PRIMARY_GREEN } from '../../../constants/styles/colors';
import { SimpleButton } from '../../SimpleButton';

export const Product = ({
  name,
  price,
  features,
  buttonText,
  stripePlan,
  isMaxWidth,
}) => {
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
        <Card>
          <div className="header">
            <div className="title">{name}</div>
            <div className="price">
              {price ? (
                <>
                  {price} <span className="monthly">/month</span>
                </>
              ) : null}
            </div>
          </div>
          <div className="body">
            <div className="features">
              <ul className="feature">
                {features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            <SimpleButton
              backGrounColor={PRIMARY_GREEN}
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
            </SimpleButton>
          </div>
        </Card>
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          display: flex;
          flex-direction: column;
          width: 33%;
          margin: 5px;
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
        .features {
          padding-top: 4px;
          padding-bottom: 4px;
        }
        .feature {
          padding-left: 20px;
        }
        @media (min-width: 1400px) and (max-width: 1799px) {
          .container {
            min-width: 450px;
          }
        }
        @media only screen and (max-width: 768px) {
          .container {
            width: 100%;
            min-width: 95%;
          }
          .features {
            padding-right: 2px;
            padding-top: 2px;
            padding-bottom: 2px;
          }
          .feature {
            padding-left: 20px;
          }
        }
      `}</style>
    </>
  );
};
