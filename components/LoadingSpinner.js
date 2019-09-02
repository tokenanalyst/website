import React from "react";
import BarLoader from "react-spinners/ScaleLoader";

import { colors } from "../constants/styles/colors";

export const LoadingSpinner = () => {
  return (
    <>
      <div className="spinner">
        <BarLoader
          sizeUnit={"px"}
          height={100}
          width={10}
          color={`rgba(${colors.primaryGreen})`}
        />
      </div>
      <style jsx>{`
        .spinner {
          position: fixed;
          top: 50%;
          left: 50%;
          margin-top: -50px;
          margin-left: -35px;
          min-height: 1200px;
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
