/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';
import Link from 'next/link';

import { pricingButton } from '../../../constants/styles/common-styled-jsx';

const renderLinks = links =>
  links.map(link => {
    const { url, isExternal, text } = link;

    return (
      <div key={text}>
        <div className="link">
          {isExternal ? (
            <a href={url} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          ) : (
            <Link href={url}>
              <a>{text}</a>
            </Link>
          )}
        </div>
        <style jsx>
          {`
            .link {
              background-image: url('/static/svg/pricing/arrow.svg');
              background-repeat: no-repeat;
              background-position: left;
              font-family: Open Sans;
              font-size: 15px;
              font-weight: 700;
              font-style: normal;
              font-stretch: normal;
            }
            a {
              padding-left: 25px;
              color: #252525;
            }
            a:hover {
              color: #252525;
            }
            a:active {
              color: #252525;
            }
            a:visited {
              color: #252525;
            }
          `}
        </style>
      </div>
    );
  });

const emitProductEvent = name => {
  ReactGA.event({
    category: 'User',
    action: `View Plan ${name}`,
    label: `New Plans`,
  });
};

export const ProductFeatures = ({
  name,
  title,
  features,
  buttons,
  description,
  image,
}) => {
  return (
    <>
      <div className="container">
        <div className="title-container">
          <div className="title">{title}</div>
        </div>
        {/* <div className="image-container">
          <div className="image">
            <img src={image} alt={`Product ${title}`} />
          </div>
        </div> */}
        <div className="description">{description}</div>
        <div className="features">{renderLinks(links)}</div>
        <div className="buttons-container">
          <button
            className="button"
            type="button"
            onClick={() => emitProductEvent(name)}
          >
            View Plan
          </button>
        </div>
      </div>
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          .container {
            width: 381px;
            height: 446px;
            background-color: #ffffff;
            padding-left: 40px;
            padding-top: 30px;
            padding-right: 40px;
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
            padding-bottom: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .text {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            opacity: 0.4;
            flex: 1;
          }
          .buttons-container {
            text-align: center;
          }
          .button {
            cursor: pointer;
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
  price: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isIncludesPlatform: PropTypes.bool,
};

ProductFeatures.defaultProps = {
  links: [],
  isActive: false,
  isIncludesPlatform: false,
};
