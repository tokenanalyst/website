import React, { useState } from "react";
import dynamic from "next/dynamic";
import { RadioGroup, Radio, Icon } from "@blueprintjs/core";

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
        <div className="controls">
          <div className="control">
            <div className="header">Chart Type</div>
            <RadioGroup
              onChange={e => setSeriesType(e.target.value)}
              selectedValue={seriesType}
              large
            >
              <Radio label="Line" value="line" />{" "}
              <Icon icon="timeline-line-chart" color="gray" />
              <br />
              <Radio label="Area" value="area" />{" "}
              <Icon icon="timeline-area-chart" color="gray" />
              <br />
              <Radio label="Histogram" value="histogram" />{" "}
              <Icon icon="timeline-bar-chart" color="gray" />
            </RadioGroup>
          </div>
          <div className="control">
            <div className="header">Data Points</div>
            <select
              onChange={e =>
                setDataSet(
                  dataSet.reduce(
                    (acc, curr) => [
                      ...acc,
                      {
                        ...curr,
                        visible:
                          curr.dataPoint === e.target.value ? true : false
                      }
                    ],
                    []
                  )
                )
              }
            >
              {dataSet &&
                dataSet
                  .reduce(
                    (acc, { dataPoint }) =>
                      acc.indexOf(dataPoint) < 0 ? [...acc, dataPoint] : acc,
                    []
                  )
                  .map(d => <option value={d}>{d}</option>)}
            </select>
          </div>
        </div>
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
        .explanation {
          padding-top: 20px;
        }
        .controls {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 50px;
          border: 1px solid rgba(151, 151, 151, 0.15);
          max-height: 200px;
        }
        .control {
          padding-bottom: 20px;
        }
        @media only screen and (max-width: 768px) {
          .widget-container {
            flex-direction: column;
            align-items: center;
          }
          .controls {
            flex-direction: row;
            justify-content: space-between;
            max-width: 100%;
            padding: 10px;
          }
          .control {
            max-width: 50%;
            padding-left: 10px;
            padding-right: 10px;
          }
        }
      `}</style>
    </>
  );
};
