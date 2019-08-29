import React, { useEffect, useState } from "react";
import { useApi } from "../custom-hooks";

import { getCompareDataSet } from "../data-transformers/charts/getCompareDataSet";
import { CompareChartWidget } from "../components/widgets/CompareChartWidget/CompareChartWidget";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Compare = () => {
  const compareData = useApi("/api/network-data");

  useEffect(() => {
    if (compareData) {
      console.log(getCompareDataSet(compareData, "OMG"));
    }
  }, [compareData]);

  return (
    <>
      <div className="container">
        {compareData ? (
          <>
            <div className="header">Token Compare</div>
            <CompareChartWidget response={compareData} />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
        }
        .header {
          font-size: 32px;
          font-weight: bold;
          padding: 20px;
          padding-top: 30px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Compare;
