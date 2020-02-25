import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

export const TabMobile = ({ text, link, selected, onClick, disabled }) => {
  return (
    <>
      <div className="tab">
        <span className="text">
          {!disabled ? (
            <Link href={link} passHref>
              <span
                onClick={() => onClick(text)}
                onKeyDown={() => onClick(text)}
                role="button"
                tabIndex={0}
              >
                {text}
              </span>
            </Link>
          ) : (
            <span>{text}</span>
          )}
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

TabMobile.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

TabMobile.defaultProps = {
  selected: false,
  disabled: false,
  onClick: () => {},
};
