import PropTypes from 'prop-types';
import React from 'react';
import BarLoader from 'react-spinners/ScaleLoader';

import { colors } from '../../../../constants/styles/colors';

export const LoadingSpinner = ({ height, width, color }) => {
  return (
    <>
      <div className="spinner">
        <BarLoader sizeUnit="px" height={height} width={width} color={color} />
      </div>
      <style jsx>
        {`
          .spinner {
            height: 100%;
            padding: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @media only screen and (max-width: 768px) {
            .spinner {
              top: 35%;
            }
          }
        `}
      </style>
    </>
  );
};

LoadingSpinner.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  height: 100,
  width: 10,
  color: `rgba(${colors.primaryGreen})`,
};
