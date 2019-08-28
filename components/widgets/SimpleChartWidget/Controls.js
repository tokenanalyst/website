import React from "react";
import { Icon } from "@blueprintjs/core";
import ReactGA from "react-ga";

import { CHART_TYPES } from "../../../constants/chartTypes";

const chartDisplay = [
  {
    type: CHART_TYPES.line,
    label: "Line",
    icon: "timeline-line-chart"
  },
  {
    type: CHART_TYPES.area,
    label: "Area",
    icon: "timeline-area-chart"
  },
  {
    type: CHART_TYPES.histogram,
    label: "Histogram",
    icon: "timeline-bar-chart"
  }
];

export const Controls = ({
  seriesType,
  setSeriesType,
  dataSet,
  setDataSet
}) => (
  <>
    <div className="controls">
      <div className="control">
        <div className="header">Chart Type</div>
        {chartDisplay.map(chartType => (
          <div
            key={chartType.type}
            className="option"
            onClick={() => {
              setSeriesType(chartType.type);
              ReactGA.event({
                category: "User",
                action: `Chart Type ${chartType.type}`,
                label: `Chart Type`
              });
            }}
          >
            <span
              className={
                seriesType === chartType.type ? "button-selected" : "button"
              }
            >
              {chartType.label}
            </span>
            <span className="icon">
              <Icon
                icon={chartType.icon}
                iconSize={24}
                color={seriesType === chartType.type ? "#3fcdab" : "gray"}
              />
            </span>
          </div>
        ))}
      </div>
      <div className="control">
        <div className="header">Data Points</div>
        <select
          onChange={e => {
            setDataSet(
              dataSet.reduce(
                (acc, curr) => [
                  ...acc,
                  {
                    ...curr,
                    visible: curr.dataPoint === e.target.value ? true : false
                  }
                ],
                []
              )
            );
            ReactGA.event({
              category: "User",
              action: `Data Point ${e.target.value}`,
              label: `Data Points`
            });
          }}
        >
          {dataSet &&
            dataSet
              .reduce(
                (acc, { dataPoint, isAlwaysDisplayed }) =>
                  acc.indexOf(dataPoint) < 0 && !isAlwaysDisplayed
                    ? [...acc, dataPoint]
                    : acc,
                []
              )
              .map(optionName => (
                <option key={optionName} value={optionName}>
                  {optionName}
                </option>
              ))}
        </select>
      </div>
    </div>
    <style jsx>{`
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
      .header {
        padding-bottom: 10px;
        font-weight: bold;
      }
      .option {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .button {
        margin-right: 10px;
      }
      .button-selected {
        font-weight: bold;
        border-bottom: 2px solid #3fcdab;
        margin-right: 10px;
      }
      .icon {
        padding-top: 5px;
      }
      @media only screen and (max-width: 768px) {
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
