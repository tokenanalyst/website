import React from "react";
import numeral from "numeral";

import { EXCHANGE_IMAGES } from "../../../constants/image-paths";

export const ExchangeMetricsWidget = ({ overallMetrics, token, exchange }) => {
  return (
    <>
      {overallMetrics && (
        <>
          <div className="banner-container">
            <div className="banner-item">
              <img
                style={{ width: "40px", height: "40px" }}
                src={`/static/png/${EXCHANGE_IMAGES[exchange]}`}
              />
              <span className="banner-header">
                {exchange} [{token}]
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
                  {overallMetrics.inflow_usd_sum_pct_change &&
                    overallMetrics.inflow_usd_sum_pct_change.toFixed(2)}
                  %
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
                  {overallMetrics.outflow_usd_sum_pct_change &&
                    overallMetrics.outflow_usd_sum_pct_change.toFixed(2)}
                  %
                </span>
              </div>
              <div>Outflow Volume Last 24h</div>
            </div>
          </div>
          <div className="shadow" />
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
            @media only screen and (max-width: 768px) {
              .banner-container {
                flex-direction: column;
                border-bottom: none;
              }
              .shadow {
                height: 4px;
                box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.05);
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};

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
