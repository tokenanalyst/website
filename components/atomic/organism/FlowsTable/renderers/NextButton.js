import PropTypes from 'prop-types';
import React from 'react';
import { Icon } from '@blueprintjs/core';

export const NextButton = ({ onClick, disabled }) => {
  return (
    <>
      <div className="container">
        <div
          role="button"
          tabIndex={0}
          className="text"
          onClick={disabled ? () => null : onClick}
          onKeyDown={disabled ? () => null : onClick}
        >
          NEXT
        </div>
        <div
          role="button"
          tabIndex={0}
          className="icon"
          onClick={disabled ? () => null : onClick}
          onKeyDown={disabled ? () => null : onClick}
        >
          <Icon icon="chevron-right" iconSize={18} />
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: flex-end;
            opacity: ${disabled ? 0.1 : 1};
          }
          .text {
            color: black;
            padding-right: 20px;
            font-size: 14px;
          }
          .text:hover {
            text-decoration: underline;
          }
          @media only screen and (max-width: 768px) {
            .container {
              display: flex;
              align-items: center;
              height: 100%;
              justify-content: flex-end;
              opacity: ${disabled ? 0.1 : 1};
            }
            .text {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
