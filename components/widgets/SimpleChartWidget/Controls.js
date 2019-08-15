import React from "react";
import { RadioGroup, Radio, Icon } from "@blueprintjs/core";

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
                    visible: curr.dataPoint === e.target.value ? true : false
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
