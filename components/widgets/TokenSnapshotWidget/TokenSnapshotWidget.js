import React from "react";

import { TokenSnapshot } from "./TokenSnapshot";
import { DATA_WINDOWS } from "../../../constants/filters";
import { TOKEN_NAMES } from "../../../constants/token-names";

export const TokenSnapshotWidget = ({ data, dataWindow }) => (
  <>
    <div className="container">
      {data &&
        Object.keys(data).map((token, index) => (
          <React.Fragment key={token}>
            <div className="token-snapshot">
              <TokenSnapshot
                token={TOKEN_NAMES[data[token].token.token]}
                tokenValue={data[token].token.price}
                tokenValueChange={data[token].token.price_pct_change}
                flows={[
                  {
                    label: "Inflow",
                    change:
                      data[token].values[`data-window-${dataWindow}`]
                        .inflow_usd_sum_pct_change,
                    value:
                      data[token].values[`data-window-${dataWindow}`]
                        .inflow_usd_sum,
                    sparkline: getSparklineWindow(
                      dataWindow,
                      data[token].sparklines.inflow
                    )
                  },
                  {
                    label: "Outflow",
                    change:
                      data[token].values[`data-window-${dataWindow}`]
                        .outflow_usd_sum_pct_change,
                    value:
                      data[token].values[`data-window-${dataWindow}`]
                        .outflow_usd_sum,
                    sparkline: getSparklineWindow(
                      dataWindow,
                      data[token].sparklines.outflow
                    )
                  }
                ]}
              />
            </div>
            {Object.keys(data).length - 1 != index && <Separator />}
          </React.Fragment>
        ))}
    </div>
    <style jsx>{`
      .container {
        font-family: Space Grotesk;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 5px;
      }
      .token-snapshot {
        padding: 5px;
      }
      @media only screen and (max-width: 768px) {
        .container {
          flex-direction: column;
        }
      }
    `}</style>
  </>
);

const Separator = () => (
  <div className="separator">
    <style jsx>{`
      .separator {
        border: solid 0.5px rgba(151, 151, 151, 0.15);
        margin-left: 20px;
        margin-right: 15px;
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

const getSparklineWindow = (dataWindow, sparkline) => {
  const length = sparkline.length;
  return {
    [DATA_WINDOWS[0]]: sparkline.slice(length - 2, length),
    [DATA_WINDOWS[1]]: sparkline.slice(length - 7, length),
    [DATA_WINDOWS[2]]: sparkline
  }[dataWindow];
};
