/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import kebabCase from 'lodash/kebabCase';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';
import Router from 'next/router';

import { ButtonMarketing } from '../../ButtonMarketing';
import { LoginContext } from '../../../contexts/Login';
import { STRIPE } from '../../../constants/stripe';
import { GA_GOAL_NAME } from './data/casesData';
import { PLAN_NAMES } from '../../../constants/plans';

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
              color: #252525;
              display: flex;
              align-items: center;
              padding-left: 50px;
              margin-bottom: 13px;
              max-width: 370px;
            }
            @media only screen and (max-width: 768px) {
              .feature {
                background-size: 30px 30px;
                padding-left: 40px;
                margin-bottom: 5px;
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

const redirectToStripe = (stripePlan, product) => async stripeOptions => {
  const stripe = Stripe(STRIPE.apiKey);

  const stripeOpt = {
    items: [
      {
        plan: stripePlan,
        quantity: 1,
      },
    ],
    successUrl: `https://www.tokenanalyst.io/purchase-success${
      product ? `?p=${product.toLowerCase()}` : ''
    }`,
    cancelUrl: 'https://www.tokenanalyst.io/',
    ...stripeOptions,
  };

  await stripe.redirectToCheckout(stripeOpt);
};

// Hack on Jendrik request

const setImageUseCaseStyle = (isReverseImagePosition, plan) => {
  if (plan === PLAN_NAMES[plan.toUpperCase()]) {
    return isReverseImagePosition ? 'reverse-image-infrastructure' : 'image';
  }
  return isReverseImagePosition ? 'reverse-image' : 'image';
};

export const UseCase = ({
  name,
  title,
  plan,
  features,
  buttons,
  description,
  stripePlan,
  image,
  isReverseImagePosition,
}) => {
  const loginCtx = useContext(LoginContext);
  const username = Cookies.get('loggedInAsUsername');
  const userId = Cookies.get('loggedInAsUserId');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="container" id={kebabCase(title)}>
        <div className="title-container">
          <div className="title">{title}</div>
          <div className="title-image" />
        </div>
        <div className="plan">{`${plan} Plan`}</div>

        <div className="features-container">
          <div>
            <div className="description">{description}</div>
            <div className="features">{renderFeatures(features)}</div>
            <div className="buttons-container">
              {buttons.map(button => {
                const { url, isExternal, text, isBuy, isIntercom } = button;

                const onBuyPlan = async () => {
                  setIsLoading(true);
                  if (url) {
                    const action = `Plan click ${text}`;
                    return emitProductEvent(action);
                  }

                  const action = `Plan select ${name}`;
                  emitProductEvent(action);

                  if (!loginCtx.isLoggedIn) {
                    loginCtx.setPaymentData({
                      stripe: {
                        redirectFn: redirectToStripe(
                          stripePlan,
                          GA_GOAL_NAME[plan]
                        ),
                      },
                    });
                    document.documentElement.scrollTop = 0;
                    return Router.push('/register');
                  }
                  return redirectToStripe(stripePlan, GA_GOAL_NAME[name])({
                    customerEmail: username,
                    clientReferenceId: userId.toString(),
                  });
                };

                const onClick = isIntercom
                  ? () => window.Intercom('show')
                  : onBuyPlan;

                return (
                  <div key={kebabCase(text)} className="button">
                    <ButtonMarketing
                      url={url}
                      isExternal={isExternal}
                      text={text}
                      stripePlan={stripePlan}
                      isActive={isBuy}
                      onClick={onClick}
                      isLoading={isBuy ? isLoading : false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={setImageUseCaseStyle(isReverseImagePosition, plan)}>
            <img src={image} alt={title} />
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            background-color: #ffffff;
            padding-top: 110px;
            position: relative;
            margin-bottom: 100px;
          }
          .title-container {
            margin-bottom: 13px;
            display: flex;
            flex-direction: row;
          }
          .reverse-image {
            left: -100px;
            top: 230px;
            position: absolute;
          }
          .reverse-image-infrastructure {
            left: 0px;
            top: 250px;
            position: absolute;
          }
          .title {
            font-family: Space Grotesk;
            font-size: 30px;
            line-height: 35px;
            font-weight: 700;
            letter-spacing: 0.260601px;
            color: #000000;
          }
          .plan {
            font-family: Space Grotesk;
            font-size: 25px;
            line-height: 29px;
            letter-spacing: 0.217168px;
            color: #a9a9a9;
            font-weight: 600;
          }
          .title-image {
            background-image: url('/static/svg/pricing/feature_title.svg');
            background-repeat: no-repeat;
            background-position: left;
            width: 500px;
            margin-left: 40px;
          }
          .description {
            max-width: 550px;
            height: 125px;
            font-family: Cardo;
            font-size: 30px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.26px;
            color: #000000;
            margin-bottom: 61px;
            margin-top: 73px;
          }
          .features-container {
            display: flex;
            flex-direction: ${isReverseImagePosition ? 'row-reverse' : 'row'};
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
            height: 210px;
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
          @media only screen and (max-width: 768px) {
            .container {
              width: 100%;
              padding: 5px;
              height: 100%;
              margin-bottom: 20px;
              background-image: none;
            }
            .description {
              width: 100%;
              height: 100px;
              font-size: 15px;
              padding-top: 20px;
              margin-bottom: 0px;
            }
            .buttons-container {
              display: flex;
              flex-direction: column;
            }
            .button {
              padding-bottom: 10px;
            }
            .title-container {
              margin-bottom: 14px;
            }
            .title {
              font-size: 25px;
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
              max-width: 100%;
              padding-bottom: 20px;
            }
            .image {
              display: none;
            }
            .reverse-image {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

UseCase.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  stripePlan: PropTypes.string,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isReverseImagePosition: PropTypes.bool,
};

UseCase.defaultProps = {
  stripePlan: null,
  isReverseImagePosition: false,
};
