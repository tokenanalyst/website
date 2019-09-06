import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import { getCompareDataSet } from "../../../data-transformers/charts/getCompareDataSet";
import { ChartControls } from "../../charts/ChartControls";
import { CHART_TYPES } from "../../../constants/chartTypes";
import { NATIVE_TOKENS } from "../../../constants/tokens";
import { LoadingSpinner } from "../../LoadingSpinner";
import { colors } from "../../../constants/styles/colors";

const SimpleChart = dynamic(
  () => import("../../charts/SimpleChart").then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

const tokenCache = {};

async function getTokenDataSet(token, color) {
  let response;
  if (!tokenCache[token]) {
    response = await axios.get(`/api/network-data?token=${token}`);
    tokenCache[token] = response;
  } else {
    response = tokenCache[token];
  }

  return getCompareDataSet(response.data.ta_response, token, color);
}

export const CompareChartWidget = () => {
  const [tokenLhs, setTokenLhs] = useState(NATIVE_TOKENS.BTC);
  const [tokenDataSetLhs, setTokenDataSetLhs] = useState(null);

  const [tokenRhs, setTokenRhs] = useState(NATIVE_TOKENS.ETH);
  const [tokenDataSetRhs, setTokenDataSetRhs] = useState(null);

  useEffect(() => {
    const updateData = async () => {
      let dataSet = await getTokenDataSet(
        tokenLhs,
        `rgba(${colors.primaryRed}, 1)`
      );
      setTokenDataSetLhs(dataSet);
    };

    updateData();
  }, [tokenLhs]);

  useEffect(() => {
    const updateData = async () => {
      let dataSet = await getTokenDataSet(
        tokenRhs,
        `rgba(${colors.primaryGreen}, 1)`
      );
      setTokenDataSetRhs(dataSet, `rgba(${colors.primaryGreen})`);
    };

    updateData();
  }, [tokenRhs]);

  return (
    <>
      {tokenDataSetLhs && tokenDataSetRhs ? (
        <div className="container">
          <ChartControls
            dataSet={tokenDataSetLhs}
            setDataSet={newDataSet => setTokenDataSetLhs(newDataSet)}
            token={tokenLhs}
            setToken={setTokenLhs}
            borderColor="rgba(250, 78, 150, 1)"
          />
          <div className="chart">
            {/* <SimpleChart
              dataSet={[...tokenDataSetRhs, ...tokenDataSetLhs]}
              seriesType={CHART_TYPES.line}
              width={
                window.matchMedia("(max-width: 768px)").matches ? 300 : 1000
              }
              height={
                window.matchMedia("(max-width: 768px)").matches ? 300 : 500
              }
            /> */}
            <SimpleChart
              dataSet={[...tokenDataSetLhs, ...tokenDataSetRhs]}
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
            borderColor="rgba(63, 205, 171, 1)"
          />
        </div>
      ) : (
        <LoadingSpinner />
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
