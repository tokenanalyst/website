import React from "react";

import BarLoader from "react-spinners/ScaleLoader";

export const LoadingSpinner = () => {
  return (
    <>
      <div className="spinner">
        <BarLoader sizeUnit={"px"} height={100} width={10} color={"#3fcdab"} />
      </div>
      <style jsx>{`
        .spinner {
          position: fixed;
          top: 50%;
          left: 50%;
          margin-top: -50px;
          margin-left: -100px;
          min-height: 1200px;
        }
      `}</style>
    </>
  );
};
