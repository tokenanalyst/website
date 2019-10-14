/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

import { pricingButton } from '../../../constants/styles/common-styled-jsx';

export const ButtonFeatures = ({
  url,
  isExternal,
  text,
  isActive,
  onClick,
  stripePlan,
}) => {
  return (
    <div>
      {url ? (
        <div className="buttonLink">
          {isExternal ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClick}
            >
              {text}
            </a>
          ) : (
            <Link href={url}>
              <a onClick={onClick}>{text}</a>
            </Link>
          )}
        </div>
      ) : (
        <button
          className={isActive ? 'buttonActive' : ''}
          type="button"
          onClick={onClick}
        >
          {text}
        </button>
      )}
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          .link {
            font-family: Open Sans;
            font-size: 15px;
            font-weight: 700;
            font-style: normal;
            font-stretch: normal;
          }
          a {
            color: #642c2c;
          }
          a:hover {
            color: #642c2c;
            text-decoration: none;
          }
          a:active {
            color: #642c2c;
          }
          a:visited {
            color: #642c2c;
          }
        `}
      </style>
    </div>
  );
};

ButtonFeatures.propTypes = {
  url: PropTypes.string,
  isExternal: PropTypes.bool,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  stripePlan: PropTypes.string,
  onClick: PropTypes.func,
};

ButtonFeatures.defaultProps = {
  url: null,
  stripePlan: null,
  isExternal: false,
  isActive: false,
  onClick: () => {},
};
