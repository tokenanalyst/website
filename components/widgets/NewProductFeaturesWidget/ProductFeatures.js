/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { ButtonFeatures } from './ButtonFeatures';

import { pricingButton } from '../../../constants/styles/common-styled-jsx';

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

export const ProductFeatures = ({
  title,
  features,
  buttons,
  description,
  stripePlan,
  image,
}) => {
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
            return (
              <div key={kebabCase(text)} className="button">
                <ButtonFeatures
                  url={url}
                  isExternal={isExternal}
                  text={text}
                  stripePlan={stripePlan}
                  isActive={isBuy}
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
