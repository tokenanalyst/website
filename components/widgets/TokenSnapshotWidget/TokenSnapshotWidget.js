import PropTypes from "prop-types";
import React from "react";

import { TokenSnapshot } from "./TokenSnapshot";
import { DATA_WINDOWS } from "../../../constants/filters";
import { TOKEN_NAMES } from "../../../constants/token-names";
import { Separator } from "./Separator";

const renderSeparatorIfNotFirstSnapshot = (data, index) =>
  Object.keys(data).length - 1 !== index && <Separator />;

export const TokenSnapshotWidget = ({ units, data, dataWindow }) => (
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
                units={units}
                flows={[
                  {
                    label: "Inflow",
                    change:
                      units === "USD"
                        ? data[token].values[`data-window-${dataWindow}`]
                            .inflow_usd_sum_pct_change
                        : data[token].values[`data-window-${dataWindow}`]
                            .inflow_sum_pct_change,
                    value:
                      units === "USD"
                        ? data[token].values[`data-window-${dataWindow}`]
                            .inflow_usd_sum
                        : data[token].values[`data-window-${dataWindow}`]
                            .inflow_sum,
                    sparkline: getSparklineWindow(
                      dataWindow,
                      data[token].sparklines.inflow
                    )
                  },
                  {
                    label: "Outflow",
                    change:
                      units === "USD"
                        ? data[token].values[`data-window-${dataWindow}`]
                            .outflow_usd_sum_pct_change
                        : data[token].values[`data-window-${dataWindow}`]
                            .outflow_sum_pct_change,
                    value:
                      units === "USD"
                        ? data[token].values[`data-window-${dataWindow}`]
                            .outflow_usd_sum
                        : data[token].values[`data-window-${dataWindow}`]
                            .outflow_sum,
                    sparkline: getSparklineWindow(
                      dataWindow,
                      data[token].sparklines.outflow
                    )
                  }
                ]}
              />
            </div>
            {renderSeparatorIfNotFirstSnapshot(data, index)}
          </React.Fragment>
        ))}
    </div>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
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

TokenSnapshotWidget.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  dataWindow: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired
};

const getSparklineWindow = (dataWindow, sparkline) => {
  const length = sparkline.length;
  return {
    [DATA_WINDOWS[0]]: sparkline.slice(length - 2, length),
    [DATA_WINDOWS[1]]: sparkline.slice(length - 7, length),
    [DATA_WINDOWS[2]]: sparkline
  }[dataWindow];
};
