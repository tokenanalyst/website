import React from "react";

import BarLoader from "react-spinners/ScaleLoader";

export const LoadingSpinner = () => {
  return (
    <>
      <div className="spinner">
        <BarLoader sizeUnit={"px"} size={150} color={"#3fcdab"} />
      </div>
      <style jsx>{`
        .spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding-top: 15%;
          min-height: 1200px;
        }
      `}</style>
    </>
  );
};
