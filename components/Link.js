import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

import { colors } from '../constants/styles/colors';

export const Link = ({ href, desktopLabel, mobileLabel, onClick }) => {
  return (
    <>
      <div className="desktop" onClick={onClick}>
        <NextLink href={href}>
          <a>{desktopLabel}</a>
        </NextLink>
      </div>
      <div className="mobile" onClick={onClick}>
        <NextLink href={href}>
          <a>{mobileLabel ? mobileLabel : desktopLabel}</a>
        </NextLink>
      </div>
      <style jsx>{`
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
      `}</style>
    </>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  desktopLabel: PropTypes.string.isRequired,
  mobileLabel: PropTypes.string,
  onClick: PropTypes.func,
};

Link.defaultProps = {
  mobileLabel: null,
  onClick: () => {},
};
