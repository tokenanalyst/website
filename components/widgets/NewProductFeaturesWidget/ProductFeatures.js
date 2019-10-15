/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import kebabCase from 'lodash/kebabCase';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';
import Router from 'next/router';

import { ButtonFeatures } from './ButtonFeatures';
import { LoginContext } from '../../../contexts/Login';
import { STRIPE } from '../../../constants/stripe';

const renderFeatures = features =>
  features.map(feature => {
    return (
      <div key={kebabCase(feature)}>
        <div className="feature">
          <div>{feature}</div>
        </div>
        <style jsx>
          {`
            .feature {
              height: 40px;
              background-image: url('/static/svg/pricing/checkbox.svg');
              background-repeat: no-repeat;
              background-position: left;
              font-size: 15px;
              font-family: Space Grotesk;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: normal;
              letter-spacing: 0.13px;
              color: #642c2c;
              display: flex;
              align-items: center;
              padding-left: 50px;
              margin-bottom: 13px;
              max-width: 370px;
            }
            @media only screen and (max-width: 768px) {
              .feature {
                background-size: 30px 30px;
              }
            }
          `}
        </style>
      </div>
    );
  });

const emitProductEvent = action => {
  ReactGA.event({
    category: 'User',
    action,
    label: `Plans`,
  });
};

const redirectToStripe = async (stripePlan, stripeOptions) => {
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

export const ProductFeatures = ({
  name,
  title,
  features,
  buttons,
  description,
  stripePlan,
  image,
}) => {
  const loginCtx = useContext(LoginContext);
  const username = Cookies.get('loggedInAsUsername');
  const userId = Cookies.get('loggedInAsUserId');

  return (
    <>
      <div className="container">
        <div className="title-container">
          <div className="title">{title}</div>
          <div className="title-image" />
        </div>
        <div className="description">{description}</div>
        <div className="features">{renderFeatures(features)}</div>
        <div className="buttons-container">
          {buttons.map(button => {
            const { url, isExternal, text, isBuy } = button;

            const onClick = async () => {
              if (url) {
                const action = `Plan click ${text}`;
                return emitProductEvent(action);
              }

              const action = `Plan select ${name}`;
              emitProductEvent(action);

              if (!loginCtx.isLoggedIn) {
                loginCtx.setPaymentData({
                  stripe: { redirectFn: redirectToStripe(stripePlan) },
                });
                return Router.push('/login');
              }
              return redirectToStripe(stripePlan, {
                customerEmail: username,
                clientReferenceId: userId.toString(),
              });
            };

            return (
              <div key={kebabCase(text)} className="button">
                <ButtonFeatures
                  url={url}
                  isExternal={isExternal}
                  text={text}
                  stripePlan={stripePlan}
                  isActive={isBuy}
                  onClick={() => onClick()}
                />
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>
        {`
          .container {
            background-color: #ffffff;
            padding-top: 110px;
            background-image: url(${image});
            background-repeat: no-repeat;
            background-position: right;
            height: 774px;
          }
          .title-container {
            font-family: Space Grotesk;
            font-size: 30px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.26px;
            color: #000000;
            margin-bottom: 58px;
            display: flex;
            flex-direction: row;
          }
          .title {
          }
          .title-image {
            background-image: url('/static/svg/pricing/feature_title.svg');
            background-repeat: no-repeat;
            background-position: left;
            width: 500px;
            margin-left: 40px;
          }
          .description {
            width: 503px;
            height: 164px;
            font-family: Cardo;
            font-size: 30px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.26px;
            color: #000000;
            margin-bottom: 61px;
          }
          .features {
            font-family: Open Sans;
            font-size: 15px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #252525;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            height: 200px;
            max-width: 800px;
          }
          .text {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            opacity: 0.4;
            flex: 1;
          }
          .buttons-container {
            display: flex;
            flex-direction: row;
          }
          .button {
            padding-right: 17px;
          }
          .image-container {
            position: relative;
            text-align: center;
            padding-top: 20px;
            padding-bottom: 10px;
            height: 150px;
          }
          .image {
            position: absolute;
            top: 10px;
            right: 20px;
          }
          @media only screen and (max-width: 768px) {
            .container {
              width: 100%;
              padding: 5px;
              height: 100%;
              padding-bottom: 20px;
              background-image: none;
            }
            .description {
              width: 100%;
              height: 100%;
              font-size: 20px;
              margin-bottom: 20px;
            }
            .buttons-container {
              display: flex;
              flex-direction: column;
            }
            .button {
              padding-bottom: 10px;
            }
            .title-container {
              margin-bottom: 20px;
            }
            .title {
              font-size: 30px;
              max-width: 100%;
              background-image: none;
            }
            .title-image {
              display: none;
            }
            .features {
              font-family: Open Sans;
              font-size: 15px;
              font-weight: 500;
              font-style: normal;
              font-stretch: normal;
              line-height: normal;
              letter-spacing: normal;
              color: #252525;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              height: 100%;
              max-width: 100%;
              padding-bottom: 20px;
            }
          }
        `}
      </style>
    </>
  );
};

ProductFeatures.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  stripePlan: PropTypes.string,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

ProductFeatures.defaultProps = {
  stripePlan: null,
};
