import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { getCompareDataSet } from "../../../data-transformers/charts/getCompareDataSet";
import { Controls } from "../IoChartWidget/Controls";
import { CHART_TYPES } from "../../../constants/chartTypes";
import { NATIVE_TOKENS } from "../../../constants/tokens";

const SimpleChart = dynamic(
  () => import("../../charts/SimpleChart").then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

export const CompareChartWidget = ({ response }) => {
  const [tokenLhs, setTokenLhs] = useState(NATIVE_TOKENS.BTC);
  const [tokenDataSetLhs, setTokenDataSetLhs] = useState(null);

  const [tokenRhs, setTokenRhs] = useState(NATIVE_TOKENS.ETH);
  const [tokenDataSetRhs, setTokenDataSetRhs] = useState(null);

  useEffect(() => {
    if (response && tokenLhs) {
      setTokenDataSetLhs(
        getCompareDataSet(response, tokenLhs, "rgba(250, 78, 150, 1)")
      );
    }
    if (response && tokenRhs) {
      setTokenDataSetRhs(
        getCompareDataSet(response, tokenRhs, "rgba(63, 205, 171, 1)")
      );
    }
  }, [tokenLhs, tokenRhs]);

  return (
    <>
      {tokenDataSetRhs && tokenDataSetLhs && (
        <div className="container">
          <Controls
            dataSet={tokenDataSetLhs}
            setDataSet={newDataSet => setTokenDataSetLhs(newDataSet)}
            seriesType={CHART_TYPES.line}
            showChartTypes={false}
            token={tokenLhs}
            setToken={setTokenLhs}
          />
          <SimpleChart
            dataSet={[...tokenDataSetRhs, ...tokenDataSetLhs]}
            seriesType="line"
            width={window.matchMedia("(max-width: 768px)").matches ? 300 : 1000}
            height={window.matchMedia("(max-width: 768px)").matches ? 300 : 500}
          />
          <Controls
            dataSet={tokenDataSetRhs}
            setDataSet={newDataSet => setTokenDataSetRhs(newDataSet)}
            seriesType={CHART_TYPES.line}
            showChartTypes={false}
            token={tokenRhs}
            setToken={setTokenRhs}
          />
        </div>
      )}
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        @media only screen and (max-width: 768px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};
