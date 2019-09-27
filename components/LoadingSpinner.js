import React from 'react';
import BarLoader from 'react-spinners/ScaleLoader';

import { colors } from '../constants/styles/colors';

export const LoadingSpinner = () => {
  return (
    <>
      <div className="spinner">
        <BarLoader
          sizeUnit={'px'}
          height={100}
          width={10}
          color={`rgba(${colors.primaryGreen})`}
        />
      </div>
      <style jsx>{`
        .spinner {
          padding: 50px;
          text-align: center;
        }
        @media only screen and (max-width: 768px) {
          .spinner {
            top: 35%;
          }
        }
      `}</style>
    </>
  );
};
