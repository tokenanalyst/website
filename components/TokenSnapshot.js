import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

export const TokenSnapshot = ({
  token,
  tokenValue,
  tokenValueChange,
  flows
}) => (
  <>
    <div className="container">
      <div className="header">{token}</div>
      <div className="top-row">
        <span className="token-value">${tokenValue}</span>
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
            }
          >
            {tokenValueChange}%
          </span>
        </span>
      </div>
      {flows.map(flow => (
        <div className="section">
          <>
            <div className="sparkline-row">
              <span className="sub-header">{flow.label}</span>
              <span className="sparkline">
                <Sparklines data={[4, 6, 2, 9, 3, 7, 6, 3]}>
                  <SparklinesLine
                    style={{ strokeWidth: 6, fill: "none", width: 200 }}
                    color={
                      flow.change > 0
                        ? "#3fcdab"
                        : flow.change < 0
                        ? "#fa4e96"
                        : "#0fd491"
                    }
                  />
                </Sparklines>
              </span>
            </div>
          </>
          <>
            <div className="row">
              <span>
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
                  }
                >
                  {flow.change}%
                </span>
              </span>
              <span className="token-flow-value">${flow.value}</span>
            </div>
          </>
        </div>
      ))}
    </div>
    <style jsx>{`
      .container {
        min-width: 300px;
        max-width: 300px;
      }
      .header {
        font-size: 32px;
        font-weight: bold;
        padding-bottom: 30px;
      }
      .top-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px rgba(151, 151, 151, 0.15);
        padding-bottom: 10px;
      }
      .token-value {
        font-size: 20px;
        opacity: 0.4;
      }
      .change-negative {
        color: #fa4e96;
      }
      .change-positive {
        color: #3fcdab;
      }
      .change-neutral {
        color: #0fd491;
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
      .sub-header {
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
      .token-flow-change {
        color: #fa4e96;
      }
      .token-flow-value {
        font-weight: bold;
      }
      @media only screen and (max-width: 800px) {
        .container {
          min-width: 100%;
        }
      }
    `}</style>
  </>
);
