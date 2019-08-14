import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { RadioGroup, Radio, Icon } from "@blueprintjs/core";
import numeral from "numeral";

import { useApi } from "../../../custom-hooks";
import { EXCHANGE_IMAGES } from "../../../constants/image-paths";
import { getExchangeDataSet } from "../../../components/charts/datasets";

import { DATA_WINDOWS } from "../../../constants/filters";

const Chart = dynamic(() => import("../../../components/charts/Chart"), {
  ssr: false
});

const Exchange = () => {
  const router = useRouter();
  const [dataSet, setDataSet] = useState(null);
  const [seriesType, setSeriesType] = useState("line");
  const [overallMetrics, setOverallMetrics] = useState(null);

  // router.query has an annoying bug whereby it is initially undefined (when page refreshed or link
  // directly navigated to) and so the API call that is dependent on it fails.
  // Added as a dependency to the custom hook so API request only fires when the
  // router.query's values have been populated
  const apiResponse = useApi(
    `/api/exchange-metrics?token=${router.query.token}&exchange=${
      router.query.exchange
    }`,
    [router.query.token, router.query.exchange]
  );

  // Again with that damn router.query bug
  useEffect(() => {
    if (apiResponse && router.query.token) {
      setDataSet(getExchangeDataSet(apiResponse, router.query.token));
      setOverallMetrics(
        apiResponse.overall.find(item => item.window === DATA_WINDOWS[0])
      );
    }
  }, [apiResponse, router.query.token]);

  return (
    <>
      <div>
        {overallMetrics && (
          <>
            <div className="banner-container">
              <div className="banner-item">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={`/static/png/${EXCHANGE_IMAGES[router.query.exchange]}`}
                />
                <span className="banner-header">
                  {router.query.exchange} [{router.query.token}]
                </span>
              </div>
              <Separator />
              <div className="banner-item">
                <div>
                  <span className="flow-value">
                    ${numeral(overallMetrics.inflow_usd_sum).format("0.0a")}
                  </span>
                  <img
                    src={
                      overallMetrics.inflow_usd_sum_pct_change < 0
                        ? "/static/svg/down.svg"
                        : overallMetrics.inflow_usd_sum_pct_change > 0
                        ? "/static/svg/up.svg"
                        : "/static/svg/nochange.svg"
                    }
                  />
                  <span
                    className={
                      overallMetrics.inflow_usd_sum_pct_change > 0
                        ? "change-positive"
                        : overallMetrics.inflow_usd_sum_pct_change < 0
                        ? "change-negative"
                        : "change-neutral"
                    }
                  >
                    {overallMetrics.inflow_usd_sum_pct_change}%
                  </span>
                </div>
                <div>Inflow Volume Last 24h</div>
              </div>
              <Separator />
              <div className="banner-item">
                <div>
                  <span className="flow-value">
                    ${numeral(overallMetrics.outflow_usd_sum).format("0.0a")}
                  </span>
                  <img
                    src={
                      overallMetrics.outflow_usd_sum_pct_change < 0
                        ? "/static/svg/down.svg"
                        : overallMetrics.outflow_usd_sum_pct_change > 0
                        ? "/static/svg/up.svg"
                        : "/static/svg/nochange.svg"
                    }
                  />
                  <span
                    className={
                      overallMetrics.outflow_usd_sum_pct_change > 0
                        ? "change-positive"
                        : overallMetrics.outflow_usd_sum_pct_change < 0
                        ? "change-negative"
                        : "change-neutral"
                    }
                  >
                    {overallMetrics.outflow_usd_sum_pct_change}%
                  </span>
                </div>
                <div>Outflow Volume Last 24h</div>
              </div>
            </div>
            <div className="shadow" />
          </>
        )}
        <div className="sub-container">
          <div className="chart">
            <div className="header">
              Inflow / Outflow <Icon icon="chart" color="gray" />
            </div>
            {dataSet && (
              <Chart
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
          {/* <Separator /> */}
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
              {/* <div className="explanation">
                This is an explanation of the current data point
              </div> */}
            </div>
          </div>
        </div>
        <style jsx>{`
          .banner-container {
            border-bottom: solid 1px rgba(151, 151, 151, 0.15);
            padding-top: 40px;
            padding-bottom: 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
          }
          .banner-item {
            font-family: Space Grotesk;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .banner-header {
            padding-left: 10px;
            font-size: 32px;
            font-weight: bold;
          }
          .flow-value {
            font-size: 24px;
            padding-right: 10px;
          }
          .change-positive {
            padding-left: 5px;
            color: #0fd491;
          }
          .change-negative {
            padding-left: 5px;
            color: #fa4e96;
          }
          .container {
            font-family: Space Grotesk;
            padding: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .sub-container {
            font-family: Space Grotesk;
            padding: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .item {
            padding: 20px;
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
            .banner-container {
              flex-direction: column;
              border-bottom: none;
            }
            .shadow {
              height: 4px;
              box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.05);
              margin-left: -20px;
              margin-right: -20px;
            }
            .container {
              padding: 10px;
              flex-direction: column;
            }
            .sub-container {
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
      </div>
    </>
  );
};

export default Exchange;

const Separator = () => (
  <div className="separator">
    <style jsx>{`
      .separator {
        border: solid 0.5px rgba(151, 151, 151, 0.15);
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      @media only screen and (max-width: 768px) {
        .separator {
          visibility: hidden;
        }
      }
    `}</style>
  </div>
);
