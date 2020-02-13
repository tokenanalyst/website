/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import kebabCase from 'lodash/kebabCase';

import { pricingButton } from '../../../../constants/styles/common-styled-jsx';
import { ButtonMarketing } from '../../../ButtonMarketing';
import { emitProductEvent } from './utils/emitProductEvent';

export const ProductCard = ({ title, links, description }) => {
  return (
    <>
      <div className="container">
        <div className="title-container">
          <div className="title">{title}</div>
        </div>
        <div className="description">{description}</div>
        <div className="button-container">
          <div>
            {links.map(link => {
              const { url, isExternal, text, tracking } = link;

              return (
                <div key={kebabCase(text)}>
                  <ButtonMarketing
                    url={url}
                    isExternal={isExternal}
                    text={text}
                    isActive
                    isLoading={false}
                    onClick={() => {
                      emitProductEvent(text, tracking);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          .container {
            width: 390px;
            height: 270px;
            background-color: #ffffff;
            padding-left: 40px;
            padding-top: 30px;
            padding-right: 40px;
            box-shadow: 0 1px 3px #f0eeee, 0 1px 2px rgba(0, 0, 0, 0.24);
          }

          .title-container {
            font-family: Space Grotesk;
            font-size: 25px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.22px;
            color: #000000;
            display: inline-block;
            border-bottom-style: solid;
            border-bottom-width: 2px;
            border-bottom-color: #35caab;
          }
          .title {
            padding-bottom: 2px;
          }
          .description {
            font-family: Open Sans;
            font-size: 15px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.13px;
            color: #2d2d2d;
            padding-bottom: 20px;
            min-height: 100px;
            margin-top: 25px;
          }
          .text {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            opacity: 0.4;
            flex: 1;
          }
          .button-container {
            display: flex;
          }
          .button {
            cursor: pointer;
          }
          a {
            color: #222222;
          }
          a:hover {
            text-decoration: none;
            color: #222222;
          }
          a:active {
            color: #222222;
          }
          a:visited {
            color: #222222;
          }
          @media only screen and (max-width: 768px) {
            .container {
              width: 100%;
              padding: 5px;
              height: 100%;
              padding-bottom: 20px;
            }
            .title-container {
              font-size: 20px;
            }
            .price-text {
              font-size: 15px;
            }
          }
        `}
      </style>
    </>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  links: [],
};
