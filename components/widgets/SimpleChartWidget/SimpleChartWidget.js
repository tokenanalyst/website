import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@blueprintjs/core";

import { Controls } from "./Controls";

const SimpleChart = dynamic(
  () =>
    import("../../../components/charts/SimpleChart").then(
      mod => mod.SimpleChart
    ),
  {
    ssr: false
  }
);

export const SimpleChartWidget = ({ dataSet, setDataSet }) => {
  const [seriesType, setSeriesType] = useState("line");

  return (
    <>
      <div className="widget-container">
        <div className="chart">
          <div className="header">
            Inflow / Outflow <Icon icon="chart" color="gray" />
          </div>
          {dataSet && (
            <SimpleChart
              dataSet={dataSet}
              seriesType={seriesType}
              width={
                window.matchMedia("(max-width: 768px)").matches ? 300 : 1000
              }
              height={
                window.matchMedia("(max-width: 768px)").matches ? 300 : 450
              }
            />
          )}
        </div>
        <Controls
          seriesType={seriesType}
          setSeriesType={setSeriesType}
          dataSet={dataSet}
          setDataSet={setDataSet}
        />
      </div>
      <style jsx>{`
        .widget-container {
          font-family: Space Grotesk;
          padding: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .chart {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-weight: bold;
          padding-left: 20px;
          padding-right: 20px;
        }
        .header {
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 20px;
        }
        @media only screen and (max-width: 768px) {
          .widget-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};
