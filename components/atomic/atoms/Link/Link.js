/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

import { colors } from '../../../../constants/styles/colors';

export const Link = ({
  href,
  desktopLabel,
  mobileLabel,
  onClick,
  isOpenInNewWindow,
}) => {
  return (
    <>
      <span
        className="desktop"
        onClick={onClick}
        onKeyDown={onClick}
        role="link"
        tabIndex={0}
      >
        <NextLink href={href}>
          {isOpenInNewWindow ? (
            <a target="_blank" rel="noopener noreferrer">
              {desktopLabel}
            </a>
          ) : (
            <a>{desktopLabel}</a>
          )}
        </NextLink>
      </span>
      <span
        className="mobile"
        onClick={onClick}
        onKeyDown={onClick}
        role="link"
        tabIndex={0}
      >
        <NextLink href={href}>
          {isOpenInNewWindow ? (
            <a target="_blank" rel="noopener noreferrer">
              {mobileLabel || desktopLabel}
            </a>
          ) : (
            <a>{mobileLabel || desktopLabel}</a>
          )}
        </NextLink>
      </span>
      <style jsx>
        {`
          .mobile {
            display: none;
          }
          a {
            color: rgba(${colors.primaryRed}, 1);
            font-weight: 700;
            font-family: Space Grotesk;
            font-size: 18px;
            text-decoration: none;
            border-bottom-style: solid;
            border-bottom-width: 2px;
            border-bottom-color: rgba(${colors.primaryRed}, 1);
          }
          a:visited {
            color: rgba(${colors.primaryRed}, 1);
            font-weight: 700;
            text-decoration: none;
          }
          a:hover {
            color: rgba(${colors.primaryRed}, 1);
            font-weight: 700;
            text-decoration: none;
          }
          @media only screen and (max-width: 768px) {
            .desktop {
              display: none;
            }
            .mobile {
              display: inline-block;
            }
          }
        `}
      </style>
    </>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  isOpenInNewWindow: PropTypes.bool,
  desktopLabel: PropTypes.node.isRequired,
  mobileLabel: PropTypes.string,
  onClick: PropTypes.func,
};

Link.defaultProps = {
  isOpenInNewWindow: false,
  mobileLabel: null,
  onClick: () => {},
};
