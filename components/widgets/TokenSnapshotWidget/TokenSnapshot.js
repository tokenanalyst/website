import PropTypes from "prop-types";
import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import numeral from "numeral";

import { colors } from "../../../constants/styles/colors";

export const TokenSnapshot = ({
  token,
  tokenValue,
  tokenValueChange,
  flows,
  units
}) => (
  <>
    <div className="container">
      <div className="header">{token}</div>
      <div className="top-row">
        <span className="token-value">
          ${numeral(tokenValue).format("0,0")}
        </span>
        <span>
          <img
            src={
              tokenValueChange < 0
                ? "/static/svg/down.svg"
                : tokenValueChange > 0
                ? "/static/svg/up.svg"
                : "/static/svg/nochange.svg"
            }
          />
          <span
            className={
              tokenValueChange > 0
                ? "change-positive"
                : tokenValueChange < 0
                ? "change-negative"
                : "change-neutral"
            }>
            {tokenValueChange.toFixed(2)}%
          </span>
        </span>
      </div>
      <div className="shadow" />
      {flows.map((flow, index) => (
        <div className="section" key={index}>
          <>
            <div className="sparkline-row">
              <div className="sparkline-header">{flow.label}</div>
              <div className="sparkline">
                <Sparklines data={flow.sparkline}>
                  <SparklinesLine
                    style={{ strokeWidth: 6, fill: "none", width: 200 }}
                    color={
                      flow.change > 0
                        ? `rgba(${colors.primaryGreen})`
                        : flow.change < 0
                        ? `rgba(${colors.primaryRed})`
                        : `rgba(${colors.neutralGrey})`
                    }
                  />
                </Sparklines>
              </div>
            </div>
          </>
          <>
            <div className={index === flows.length - 1 ? "last-row" : "row"}>
              <div className="token-flow-variation">
                <img
                  src={
                    flow.change < 0
                      ? "/static/svg/down.svg"
                      : flow.change > 0
                      ? "/static/svg/up.svg"
                      : "/static/svg/nochange.svg"
                  }
                />
                <span
                  className={
                    flow.change > 0
                      ? "change-positive"
                      : flow.change < 0
                      ? "change-negative"
                      : "change-neutral"
                  }>
                  {flow.change.toFixed(2)}%
                </span>
              </div>
              <div className="token-flow-value">
                {units === "USD" ? "$" : ""}
                {numeral(flow.value).format("0.0a")}
              </div>
            </div>
          </>
        </div>
      ))}
    </div>
    <style jsx>{`
      .container {
        font-family: Open Sans;
        min-width: 300px;
        max-width: 300px;
      }
      .header {
        font-family: Space Grotesk;
        font-size: 32px;
        font-weight: bold;
        padding-bottom: 30px;
      }
      .top-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
      }
      .token-value {
        font-size: 20px;
        opacity: 0.4;
      }
      .change-negative {
        color: rgba(${colors.primaryRed});
      }
      .change-positive {
        color: rgba(${colors.primaryGreen});
      }
      .change-neutral {
        color: #4a4a4a;
        opacity: 0.4;
      }
      .section {
        padding-top: 20px;
      }
      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: solid 1px rgba(151, 151, 151, 0.15);
        padding-bottom: 20px;
      }
      .last-row {
        visibility: hidden;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 20px;
      }
      .sparkline-header {
        font-weight: 700;
        font-size: 18px;
      }
      .sparkline-row {
        display: flex;
        justify-content: space-between;
        height: 40px;
      }
      .sparkline {
        height: 40px;
        width: 150px;
        opacity: 1;
      }
      .token-flow-variation {
        text-align: left;
      }
      .token-flow-value {
        text-align: left;
        width: 150px;
      }
      @media only screen and (max-width: 768px) {
        .container {
          min-width: 100%;
        }
        .sparkline-header {
          font-weight: 700;
          font-size: 18px;
          width: 50%;
        }
        .token-flow-variation {
          text-align: left;
        }
        .token-flow-value {
          text-align: left;
          width: 150px;
        }
        .row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: solid 1px rgba(151, 151, 151, 0.15);
          padding-bottom: 20px;
          margin-left: -20px;
          margin-right: -20px;
          padding-left: 20px;
          padding-right: 20px;
        }
        .last-row {
          visibility: visible;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: solid 1px rgba(151, 151, 151, 0.15);
          padding-bottom: 20px;
          margin-left: -20px;
          margin-right: -20px;
          padding-left: 20px;
          padding-right: 20px;
        }
        .shadow {
          height: 4px;
          box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
          margin-left: -20px;
          margin-right: -20px;
        }
        .header {
          padding-bottom: 5px;
        }
      }
    `}</style>
  </>
);

TokenSnapshot.propTypes = {
  token: PropTypes.string.isRequired,
  tokenValue: PropTypes.number.isRequired,
  tokenValueChange: PropTypes.number.isRequired,
  flows: PropTypes.arrayOf(PropTypes.object),
  units: PropTypes.string.isRequired
};
