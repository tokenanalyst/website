/* eslint-disable react/jsx-wrap-multilines */
import PropTypes from 'prop-types';
import React from 'react';

import { ValueVariation } from '../../atoms/ValueVariation';
import { colors } from '../../../../constants/styles/colors';

const renderCurrentLabel = () => {
  return (
    <>
      <span className="current">&nbsp;&nbsp;(current)</span>
      <style jsx>
        {`
          .current {
            opacity: 0.4;
          }
        `}
      </style>
    </>
  );
};

export const MetricSummaryValues = ({ variation, amount, isCurrent }) => {
  return (
    <>
      <div className="value-container">
        <ValueVariation variation={variation} />
        <div className="value">
          {amount}
          {isCurrent && renderCurrentLabel()}
        </div>
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
          .value {
            text-align: left;
            width: 50%;
          }
          @media only screen and (max-width: 768px) {
            .value {
              text-align: left;
              width: 150px;
            }
          }
        `}
      </style>
    </>
  );
};

MetricSummaryValues.propTypes = {
  variation: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool,
};

MetricSummaryValues.defaultProps = {
  isCurrent: false,
};
