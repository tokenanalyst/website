import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import { getCompareDataSet } from "../../../data-transformers/charts/getCompareDataSet";
import { ChartControls } from "../../charts/ChartControls";
import { CHART_TYPES, CHART_MODES } from "../../../constants/chartTypes";
import { NATIVE_TOKENS } from "../../../constants/tokens";
import { LoadingSpinner } from "../../LoadingSpinner";
import { colors } from "../../../constants/styles/colors";

const SimpleChart = dynamic(
  () => import("../../charts/SimpleChart").then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

const GRAPH_SIZE = {
  width: {
    mobile: 300,
    tablet: 700,
    desktop: 850,
    desktopLarge: 1200
  },
  height: {
    mobile: 300,
    desktop: 450
  }
};

export const CompareChartWidget = () => {
  const [tokenLhs, setTokenLhs] = useState(NATIVE_TOKENS.BTC);
  const [tokenDataSetLhs, setTokenDataSetLhs] = useState(null);

  const [tokenRhs, setTokenRhs] = useState(NATIVE_TOKENS.ETH);
  const [tokenDataSetRhs, setTokenDataSetRhs] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [tokenCache, setTokenCache] = useState({});

  const [chartMode, setChartMode] = useState(CHART_MODES.logarithmic);

  async function getTokenDataSet(token, color) {
    let response;
    if (!tokenCache[token]) {
      setIsLoading(true);
      response = await axios.get(`/api/network-data?token=${token}`);
      tokenCache[token] = response;
      setTokenCache(prevCache => ({ ...prevCache, [token]: response }));
      setIsLoading(false);
    } else {
      response = { ...tokenCache[token] };
    }

    return getCompareDataSet(response.data.ta_response, token, color);
  }

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
      setTokenDataSetRhs(dataSet);
    };

    updateData();
  }, [tokenRhs]);

  return (
    <>
      {tokenDataSetLhs && tokenDataSetRhs ? (
        <div className="container">
          <ChartControls
            dataSet={tokenDataSetLhs.mainData}
            setDataSet={newDataSet => setTokenDataSetLhs(newDataSet)}
            token={tokenLhs}
            setToken={setTokenLhs}
            borderColor="rgba(250, 78, 150, 1)"
            chartMode={chartMode}
            setChartMode={setChartMode}
          />
          <div className="chart">
            <SimpleChart
              dataSet={[
                ...tokenDataSetLhs.mainData,
                ...tokenDataSetRhs.mainData
              ]}
              seriesType={CHART_TYPES.line}
              width={
                window.matchMedia("(min-width: 320px) and (max-width: 767px)")
                  .matches
                  ? GRAPH_SIZE.width.mobile
                  : window.matchMedia(
                      "(min-width: 768px) and (max-width: 1399px)"
                    ).matches
                  ? GRAPH_SIZE.width.tablet
                  : window.matchMedia(
                      "(min-width: 1400px) and (max-width: 1799px)"
                    ).matches
                  ? GRAPH_SIZE.width.desktop
                  : GRAPH_SIZE.width.desktopLarge
              }
              height={
                window.matchMedia("(max-width: 768px)").matches ? 400 : 500
              }
              isLoading={isLoading}
              mode={chartMode}
            />
          </div>
          <ChartControls
            dataSet={tokenDataSetRhs.mainData}
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
        @media (min-width: 768px) and (max-width: 1399px) {
          .container {
            flex-direction: column;
          }
          .chart {
            padding-top: 20px;
            padding-bottom: 20px;
          }
        }
        @media (min-width: 320px) and (max-width: 767px) {
          .container {
            flex-direction: column;
          }
          .chart {
            padding-top: 20px;
            padding-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
};
