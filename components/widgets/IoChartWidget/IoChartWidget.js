import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@blueprintjs/core";

import { ChartControls } from "../../charts/ChartControls";
import { CHART_TYPES } from "../../../constants/chartTypes";
import { PricingLink } from "../../../components/PricingLink";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

const SimpleChart = dynamic(
  () => import("../../charts/SimpleChart").then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

const SimpleToolTip = dynamic(
  () => import("../../SimpleToolTip").then(mod => mod.SimpleToolTip),
  {
    ssr: false
  }
);

const GRAPH_SIZE = {
  width: {
    mobile: 300,
    tablet: 700,
    desktop: 1000,
    desktopLarge: 1400
  },
  height: {
    mobile: 300,
    desktop: 450
  },
  netflowHeight: 150
};

const TOOL_TIP = {
  ["1h"]: {
    message: (
      <div>
        Hourly data. All times are in UTC.
        <br />
        The displayed hour in the data is the start of the hour
        <br /> for which the data is aggregated. <br />
      </div>
    )
  },
  ["1d"]: {
    message: (
      <div>
        Daily data. All times are in UTC.
        <br />
        The latest day returned is the last full day of data.
        <br />
      </div>
    )
  }
};

export const IoChartWidget = ({
  dataSet,
  setDataSet,
  formatter,
  timeWindow,
  setTimeWindow
}) => {
  const [seriesType, setSeriesType] = useState(CHART_TYPES.line);

  return (
    <>
      {dataSet ? (
        <div className="widget-container">
          <div className="chart-area">
            <div className="header">
              Inflow / Outflow <Icon icon="chart" color="gray" />
              <div className="header-info">
                <div>
                  <SimpleToolTip
                    dataFor={"header-tooltip"}
                    toolTip={
                      TOOL_TIP[timeWindow] && TOOL_TIP[timeWindow].message
                    }
                    type="dark"
                    effect="solid"
                  >
                    <div data-tip data-for="header-tooltip">
                      <Icon icon="info-sign" color="gray" />
                    </div>
                  </SimpleToolTip>
                </div>
              </div>
            </div>
            <div className="chart">
              {dataSet && (
                <>
                  <SimpleChart
                    dataSet={dataSet.mainData}
                    seriesType={seriesType}
                    width={
                      window.matchMedia(
                        "(min-width: 320px) and (max-width: 767px)"
                      ).matches
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
                      window.matchMedia("(max-width: 768px)").matches
                        ? GRAPH_SIZE.height.mobile
                        : GRAPH_SIZE.height.desktop
                    }
                    formatter={formatter}
                  />
                  {/* <SimpleChart
                    dataSet={dataSet.netflowData}
                    width={
                      window.matchMedia(
                        "(min-width: 320px) and (max-width: 767px)"
                      ).matches
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
                    height={GRAPH_SIZE.netflowHeight}
                    formatter={formatter}
                    mode={0}
                  /> */}
                </>
              )}
            </div>
          </div>
          <div className="controls-container">
            <ChartControls
              seriesType={seriesType}
              setSeriesType={setSeriesType}
              dataSet={dataSet.mainData}
              setDataSet={setDataSet}
              setTimeWindow={setTimeWindow}
            />
            <div className="pricing-link">
              <PricingLink />
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <style jsx>{`
        .widget-container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          padding: 10px;
        }
        .chart {
          min-width: ${GRAPH_SIZE.width.desktopLarge}px;
        }
        .header {
          position: relative;
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 20px;
          padding-top: 20px;
          text-align: center;
          width: 100%;
        }
        .header-info {
          position: absolute;
          right: 0;
          top: 0;
        }
        .pricing-link {
          padding-top: 30px;
          text-align: center;
        }
        @media (min-width: 1400px) and (max-width: 1799px) {
          .chart {
            min-width: ${GRAPH_SIZE.width.desktop}px;
          }
        }
        @media (min-width: 768px) and (max-width: 1399px) {
          .widget-container {
            flex-direction: column;
          }
          .chart {
            min-width: ${GRAPH_SIZE.width.tablet}px;
            min-height: ${GRAPH_SIZE.width.mobile}px;
          }
        }
        @media (min-width: 320px) and (max-width: 767px) {
          .widget-container {
            flex-direction: column;
          }
          .chart {
            min-width: ${GRAPH_SIZE.width.mobile}px;
            min-height: ${GRAPH_SIZE.height.mobile}px;
          }
        }
      `}</style>
    </>
  );
};
