import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@blueprintjs/core";
import ReactTooltip from "react-tooltip";

import { ChartControls } from "../../charts/ChartControls";
import { CHART_TYPES } from "../../../constants/chartTypes";
import { PricingLink } from "../../../components/PricingLink";
import {SimpleToolTip} from "../../SimpleToolTip"

const SimpleChart = dynamic(
  () => import("../../charts/SimpleChart").then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

const GRAPH_SIZE = {
  width: {
    mobile: 300,
    tablet: 1000,
    desktop: 1400
  },
  height: {
    mobile: 300,
    desktop: 450
  }
};

export const IoChartWidget = ({
  dataSet,
  setDataSet,
  formatter,
  setTimeWindow
}) => {
  const [seriesType, setSeriesType] = useState(CHART_TYPES.line);

  return (
    <>
      <div className="widget-container">
        <div className="chart">
          <div className="header">
            Inflow / Outflow <Icon icon="chart" color="gray" />
            <div className="header-info">
              <div data-tip data-for="data-info">
                <Icon icon="info-sign" color="gray" />
              </div>
              <div>
                <SimpleToolTip>Test Simple Tooltip</SimpleToolTip>
              </div>

              <ReactTooltip id="data-info" type="light" effect="solid">
                <span>Show happy face</span>
              </ReactTooltip>
            </div>
          </div>
          <div className="graph">
            {dataSet && (
              <SimpleChart
                dataSet={dataSet}
                seriesType={seriesType}
                width={
                  window.matchMedia("(max-width: 768px)").matches
                    ? GRAPH_SIZE.width.mobile
                    : window.matchMedia("(min-width: 1920px)").matches
                    ? GRAPH_SIZE.width.desktop
                    : GRAPH_SIZE.width.tablet
                }
                height={
                  window.matchMedia("(max-width: 768px)").matches
                    ? GRAPH_SIZE.height.mobile
                    : GRAPH_SIZE.height.desktop
                }
                formatter={formatter}
              />
            )}
          </div>
        </div>
        <div className="controls-container">
          <ChartControls
            seriesType={seriesType}
            setSeriesType={setSeriesType}
            dataSet={dataSet}
            setDataSet={setDataSet}
            setTimeWindow={setTimeWindow}
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
          justify-content: space-between;
        }
        .chart {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-weight: bold;
          padding-left: 20px;
          padding-right: 20px;
        }
        .graph {
          width: ${GRAPH_SIZE.width.tablet}px;
          height: ${GRAPH_SIZE.width.mobile}px;
        }
        .header {
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 20px;
          text-align: center;
          width: 100%;
        }
        .pricing-link {
          padding-top: 30px;
          text-align: center;
        }
        @media only screen and (max-width: 768px) {
          .graph {
            width: ${GRAPH_SIZE.width.mobile}px;
            height: ${GRAPH_SIZE.height.mobile}px;
          }
          .header {
            font-size: 18px;
            font-weight: bold;
            padding-bottom: 20px;
            padding-top: 10px;
            text-align: center;
            width: 100%;
          }
          .widget-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};
