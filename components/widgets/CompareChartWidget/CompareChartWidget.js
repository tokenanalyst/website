import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { getCompareDataSet } from "../../../data-transformers/charts/getCompareDataSet";
import { Controls } from "../IoChartWidget/Controls";
import { CHART_TYPES } from "../../../constants/chartTypes";

import { STABLE_TOKENS, NATIVE_TOKENS } from "../../../constants/tokens";

const SimpleChart = dynamic(
  () => import("../../charts/SimpleChart").then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

export const CompareChartWidget = ({ response }) => {
  const [seriesType, setSeriesType] = useState(CHART_TYPES.line);
  const [tokenLhs, setTokenLhs] = useState("OMG");
  const [tokenDataSetLhs, setTokenDataSetLhs] = useState(
    getCompareDataSet(response, "OMG")
  );

  const [tokenRhs, setTokenRhs] = useState("USDC");
  const [tokenDataSetRhs, setTokenDataSetRhs] = useState(
    getCompareDataSet(response, "USDC")
  );

  useEffect(() => {
    if (response && tokenLhs) {
      setTokenDataSetLhs(getCompareDataSet(response, tokenLhs));
    }
    if (response && tokenRhs) {
      setTokenDataSetRhs(getCompareDataSet(response, tokenRhs));
    }
  }, [tokenLhs, tokenRhs]);

  return (
    <>
      <div className="container">
        {console.log(tokenDataSetLhs)}
        <Controls
          dataSet={tokenDataSetLhs}
          setDataSet={newDataSet => setTokenDataSetLhs(newDataSet)}
          seriesType={seriesType}
          setSeriesType={setSeriesType}
          showChartTypes={false}
          token={tokenLhs}
          setToken={setTokenLhs}
        />
        <SimpleChart
          dataSet={[...tokenDataSetRhs, ...tokenDataSetLhs]}
          seriesType="line"
          width={1000}
          height={500}
        />
        <Controls
          dataSet={tokenDataSetRhs}
          setDataSet={newDataSet => setTokenDataSetRhs(newDataSet)}
          seriesType={seriesType}
          setSeriesType={setSeriesType}
          showChartTypes={false}
          token={tokenRhs}
          setToken={setTokenRhs}
        />
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
};
