import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

export const TokenSnapshot = ({
  token,
  tokenValue,
  tokenValueChange,
  inflowValue,
  inflowChange
}) => (
  <>
    <div className="container">
      <div className="header">{token}</div>
      <div className="top-row">
        <span className="token-value">${tokenValue}</span>
        <span>
          <img src="/static/svg/down.svg" />
          <span className="token-value-change">{tokenValueChange}%</span>
        </span>
      </div>
      <div>
        <div className="section">
          <div className="sparkline-row">
            <span className="sub-header">Inflow</span>
            <span className="sparkline">
              <Sparklines data={[4, 6, 2, 9, 3, 7, 6, 3]}>
                <SparklinesLine
                  style={{ strokeWidth: 6, fill: "none", width: 200 }}
                  // color={getIndicator(inflowChange).hex}
                />
              </Sparklines>
            </span>
          </div>
        </div>
        <div className="section">
          <div className="row">
            <span>
              <img src="/static/svg/down.svg" />
              <span className="token-flow-change">{inflowChange}%</span>
            </span>
            <span className="token-flow-value">${inflowValue}</span>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .container {
        min-width: 300px;
        max-width: 300px;
      }
      .header {
        font-size: 32px;
        font-weight: bold;
      }
      .top-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .token-value {
        font-size: 24px;
        opacity: 0.4;
      }
      .token-value-change {
        color: #fa4e96;
      }
      .section {
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
