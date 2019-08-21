import React from "react";

import BarLoader from "react-spinners/ScaleLoader";

export const LoadingSpinner = () => {
  return (
    <>
      <div className="spinner">
        <div className="spinner-text">Loading...</div>
        <BarLoader sizeUnit={"px"} size={150} color={"#3fcdab"} />
      </div>
      <style jsx>{`
        .spinner-text {
          font-family: Space Grotesk;
          font-size: 24px;
          padding-bottom: 10px;
        }
        .spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 20px;
        }
      `}</style>
    </>
  );
};
