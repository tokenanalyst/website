/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Spinner } from '@blueprintjs/core';

import { pricingButton } from '../../../constants/styles/common-styled-jsx';

export const ButtonFeatures = ({
  url,
  isExternal,
  text,
  isActive,
  onClick,
  isLoading,
}) => {
  const linkColor = isActive ? '#ffffff' : '#222';

  return (
    <div>
      {url ? (
        <div
          className={classNames(
            'buttonLink',
            `${isActive ? 'buttonActive' : ''}`
          )}
        >
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
              <a
                onClick={onClick}
                onKeyDown={onClick}
                role="button"
                tabIndex="0"
              >
                {text}
              </a>
            </Link>
          )}
        </div>
      ) : (
        <button
          className={isActive ? 'buttonActive' : ''}
          type="button"
          onClick={onClick}
        >
          {isLoading ? <Spinner size={22} /> : text}
        </button>
      )}
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          a {
            color: ${linkColor};
          }
          a:hover {
            color: ${linkColor};
            text-decoration: none;
          }
          a:active {
            color: ${linkColor};
          }
          a:visited {
            color: ${linkColor};
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
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonFeatures.defaultProps = {
  url: null,
  isExternal: false,
  isActive: false,
  isLoading: false,
  onClick: () => {},
};
