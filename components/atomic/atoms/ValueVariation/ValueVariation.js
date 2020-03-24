/* eslint-disable react/jsx-wrap-multilines */
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../../constants/styles/colors';

const setValueChangeStatus = (value, status) => {
  if (value < 0) {
    return status.negative;
  }

  if (value > 0) {
    return status.positive;
  }

  return status.neutral;
};

export const ValueVariation = ({ variation }) => {
  return (
    <>
      <div>
        <img
          src={setValueChangeStatus(variation, {
            negative: '/static/svg/down.svg',
            positive: '/static/svg/up.svg',
            neutral: '/static/svg/nochange.svg',
          })}
          alt="Flow Change"
        />
        <span
          className={setValueChangeStatus(variation, {
            negative: `change-negative`,
            positive: `change-positive`,
            neutral: `change-neutral`,
          })}
        >
          {`${variation.toFixed(2)}%`}
        </span>
      </div>
      <style jsx>
        {`
          .change-negative {
            color: rgba(${colors.primaryRed});
          }
          .change-positive {
            color: rgba(${colors.primaryGreen});
          }
          .change-neutral {
            color: #4a4a4a;
            opacity: 0.4;
          }
          .value-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }

          @media only screen and (max-width: 768px) {
          }
        `}
      </style>
    </>
  );
};

ValueVariation.propTypes = {
  variation: PropTypes.number.isRequired,
};

ValueVariation.defaultProps = {};
