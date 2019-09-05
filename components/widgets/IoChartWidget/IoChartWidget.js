import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@blueprintjs/core";

import { ChartControls } from "../../charts/ChartControls";
import { CHART_TYPES } from "../../../constants/chartTypes";
import { PricingLink } from "../../../components/PricingLink";

const SimpleChart = dynamic(
  () => import("../../charts/SimpleChart").then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

export const IoChartWidget = ({ dataSet, setDataSet, formatter }) => {
  const [seriesType, setSeriesType] = useState(CHART_TYPES.line);

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
              formatter={formatter}
            />
          )}
        </div>
        <div>
          <ChartControls
            seriesType={seriesType}
            setSeriesType={setSeriesType}
            dataSet={dataSet}
            setDataSet={setDataSet}
          />
          <div className="pricing-link">
            <PricingLink />
          </div>
        </div>
      </div>
      <style jsx>{`
        .widget-container {
          font-family: Open Sans;
          padding: 3%;
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
        .pricing-link {
          padding-top: 30px;
          text-align: center;
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
