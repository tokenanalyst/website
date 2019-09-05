import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { getCompareDataSet } from "../../../data-transformers/charts/getCompareDataSet";
import { ChartControls } from "../../charts/ChartControls";
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
  const [dataPointLhs, setDataPointLhs] = useState(null);

  const [tokenRhs, setTokenRhs] = useState(NATIVE_TOKENS.ETH);
  const [tokenDataSetRhs, setTokenDataSetRhs] = useState(null);
  const [dataPointRhs, setDataPointRhs] = useState(null);

  useEffect(() => {
    if (response && tokenLhs) {
      const dataSet = !dataPointLhs
        ? getCompareDataSet(response, tokenLhs, "rgba(250, 78, 150, 1)")
        : getCompareDataSet(response, tokenLhs, "rgba(250, 78, 150, 1)").map(
            datum => ({ ...datum, visible: datum.dataPoint === dataPointLhs })
          );

      setTokenDataSetLhs(
        dataSet.some(datum => datum.visible)
          ? dataSet
          : dataSet.reduce(
              (acc, curr, index) => [...acc, { ...curr, visible: index === 0 }],
              []
            )
      );
    }
    if (response && tokenRhs) {
      const dataSet = !dataPointRhs
        ? getCompareDataSet(response, tokenRhs, "rgba(63, 205, 171, 1)")
        : getCompareDataSet(response, tokenRhs, "rgba(63, 205, 171, 1)").map(
            datum => ({ ...datum, visible: datum.dataPoint === dataPointRhs })
          );

      setTokenDataSetRhs(
        dataSet.some(datum => datum.visible)
          ? dataSet
          : dataSet.reduce(
              (acc, curr, index) => [...acc, { ...curr, visible: index === 0 }],
              []
            )
      );
    }
  }, [tokenLhs, tokenRhs]);

  return (
    <>
      {tokenDataSetRhs && tokenDataSetLhs && (
        <div className="container">
          <ChartControls
            dataSet={tokenDataSetLhs}
            setDataSet={newDataSet => setTokenDataSetLhs(newDataSet)}
            token={tokenLhs}
            setToken={setTokenLhs}
            setDataPoint={setDataPointLhs}
            borderColor="rgba(250, 78, 150, 1)"
          />
          <div className="chart">
            <SimpleChart
              dataSet={[...tokenDataSetRhs, ...tokenDataSetLhs]}
              seriesType={CHART_TYPES.line}
              width={
                window.matchMedia("(max-width: 768px)").matches ? 300 : 1000
              }
              height={
                window.matchMedia("(max-width: 768px)").matches ? 300 : 500
              }
            />
          </div>
          <ChartControls
            dataSet={tokenDataSetRhs}
            setDataSet={newDataSet => setTokenDataSetRhs(newDataSet)}
            token={tokenRhs}
            setToken={setTokenRhs}
            setDataPoint={setDataPointRhs}
            borderColor="rgba(63, 205, 171, 1)"
          />
        </div>
      )}
      <style jsx>{`
        .container {
          font-family: Open Sans;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .chart {
          padding-top: 20px;
        }
        @media only screen and (max-width: 768px) {
          .container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};
