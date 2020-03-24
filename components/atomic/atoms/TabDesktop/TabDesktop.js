import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { styledBorder } from '../../../../constants/styles/common-styled-jsx';

export const TabDesktop = ({ text, link, selected }) => {
  return (
    <>
      <div className="tab">
        <span className="text">
          <Link href={link} passHref>
            <span
              className={classNames(
                selected ? 'bottom-selected' : 'bottom-not-selected'
              )}
            >
              {text}
            </span>
          </Link>
        </span>
      </div>
      <style jsx>{styledBorder}</style>
      <style jsx>
        {`
          .text {
            padding-bottom: 2px;
            text-transform: uppercase;
            font-weight: 700;
            cursor: pointer;
            opacity: ${selected ? 1 : 0.2};
          }
          .link {
            cursor: pointer;
          }
          .tab {
            margin-right: 40px;
            font-family: Open Sans;
            font-size: 14px;
          }
        `}
      </style>
    </>
  );
};

TabDesktop.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

TabDesktop.defaultProps = {
  selected: false,
};
