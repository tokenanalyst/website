import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

export const Tab = ({ text, link, selected }) => {
  return (
    <>
      <div className="tab">
        <span className="text">
          <Link href={link}>
            <span
              className={classNames(selected ? 'selected' : 'not-selected')}
            >
              {text}
            </span>
          </Link>
        </span>
      </div>
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
          .selected {
            border-bottom: 2px solid rgb(63, 205, 171);
            opacity: 1;
          }
          .not-selected::after {
            display: block;
            content: '';
            border-bottom: 2px solid rgb(63, 205, 171);
            transform: scaleX(0);
            transition: transform 250ms ease-in-out;
            opacity: ${selected ? 1 : 0.5};
          }
          .not-selected:hover:after {
            transform: scaleX(1);
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

Tab.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

Tab.defaultProps = {
  selected: false,
};
