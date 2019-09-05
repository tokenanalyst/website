import React from "react";
import numeral from "numeral";

import { EXCHANGE_IMAGES } from "../../../constants/image-paths";
import { colors } from "../../../constants/styles/colors";

export const ExchangeMetricsWidget = ({ overallMetrics, token, exchange }) => {
  return (
    <>
      {overallMetrics && (
        <>
          <div className="banner-container">
            <div className="banner-logo-container">
              <div className="banner-header">
                <span className="banner-banner-header-symbol">
                  {token.replace("_", " ")}
                </span>
                <span className="banner-banner-header-exchange-name">
                  {exchange}
                </span>
              </div>
              <div className="banner-logo-img-container">
                <img
                  className="banner-banner-logo-img"
                  src={`/static/png/${EXCHANGE_IMAGES[exchange]}`}
                />
              </div>
            </div>
            <Separator />
            <div className="banner-item">
              <div>
                <span className="flow-value">
                  ${numeral(overallMetrics.inflowUsdSum).format("0.0a")}
                </span>
                <img
                  src={
                    overallMetrics.inflowUsdSumPctChange < 0
                      ? "/static/svg/down.svg"
                      : overallMetrics.inflowUsdSumPctChange > 0
                      ? "/static/svg/up.svg"
                      : "/static/svg/nochange.svg"
                  }
                />
                <span
                  className={
                    overallMetrics.inflowUsdSumPctChange > 0
                      ? "change-positive"
                      : overallMetrics.inflowUsdSumPctChange < 0
                      ? "change-negative"
                      : "change-neutral"
                  }
                >
                  {overallMetrics.inflowUsdSumPctChange &&
                    overallMetrics.inflowUsdSumPctChange.toFixed(2)}
                  %
                </span>
              </div>
              <div>Inflow Volume Last 24h</div>
            </div>
            <Separator />
            <div className="banner-item">
              <div>
                <span className="flow-value">
                  ${numeral(overallMetrics.outflowUsdSum).format("0.0a")}
                </span>
                <img
                  src={
                    overallMetrics.outflowUsdSumPctChange < 0
                      ? "/static/svg/down.svg"
                      : overallMetrics.outflowUsdSumPctChange > 0
                      ? "/static/svg/up.svg"
                      : "/static/svg/nochange.svg"
                  }
                />
                <span
                  className={
                    overallMetrics.outflowUsdSumPctChange > 0
                      ? "change-positive"
                      : overallMetrics.outflowUsdSumPctChange < 0
                      ? "change-negative"
                      : "change-neutral"
                  }
                >
                  {overallMetrics.outflowUsdSumPctChange &&
                    overallMetrics.outflowUsdSumPctChange.toFixed(2)}
                  %
                </span>
              </div>
              <div>Outflow Volume Last 24h</div>
            </div>
          </div>
          <div className="shadow" />
          <style jsx>{`
            .banner-logo-container {
              font-family: Space Grotesk;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
            }
            .banner-banner-logo-img {
              width: 40px;
              height: 40px;
            }
            .banner-logo-img-container {
              padding-left: 10px;
            }
            .banner-banner-header-symbol {
              font-weight: 700;
            }
            .banner-banner-header-exchange-name {
              padding-left: 10px;
              opacity: 0.4;
            }
            .banner-container {
              border-bottom: solid 1px rgba(151, 151, 151, 0.15);
              padding-top: 30px;
              padding-bottom: 30px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
            }
            .banner-item {
              font-family: Open Sans;
              display: flex;
              flex-direction: column;
            }
            .banner-header {
              padding-left: 10px;
              font-size: 32px;
              font-weight: bold;
            }
            .flow-value {
              font-size: 24px;
              opacity: 0.4;
              padding-right: 10px;
            }
            .change-positive {
              padding-left: 5px;
              color: rgba(${colors.neutralGrey});
            }
            .change-negative {
              padding-left: 5px;
              color: rgba(${colors.primaryRed}, 1);
            }
            @media only screen and (max-width: 768px) {
              .banner-logo-container {
                font-family: Space Grotesk;
                display: flex;
                flex-direction: column-reverse;
                justify-content: space-around;
                align-items: center;
              }
              .banner-banner-logo-img {
                width: 40px;
                height: 40px;
              }
              .banner-logo-img-container {
                flex: 1;
                padding-bottom: 10px;
              }
              .banner-banner-header {
                flex: 1;
              }
              .banner-banner-header-symbol {
                font-weight: 700;
                flex: 1;
              }
              .banner-banner-header-exchange-name {
                flex: 1;
                padding-left: 10px;
                opacity: 0.4;
              }
              .banner-container {
                flex-direction: column;
                border-bottom: none;
              }
              .banner-item {
                font-family: Space Grotesk;
                display: flex;
                flex-direction: column;
                align-items: center;
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
