import React, { useEffect, useState } from "react";
import axios from "axios";

import { TokenSnapshot } from "./TokenSnapshot";

import { DATA_WINDOWS } from "../constants/filters";

export const TokenSnapshotWidget = ({ dataWindow, units }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getApiResult = async () => {
      const apiResult = await axios.get(
        "/api/latest-exchange-flows?tokens=BTC,ETH,USDC,DAI"
      );
      setData(apiResult.data.ta_response);
      console.log(apiResult.data.ta_response);
    };

    getApiResult();
  }, []);

  return (
    <>
      <div className="container">
        {data &&
          Object.keys(data).map(token => (
            <>
              <div className="token-snapshot">
                <TokenSnapshot
                  token={data[token].token.token}
                  tokenValue={data[token].token.price}
                  tokenValueChange={data[token].token.price_pct_change}
                  key={token}
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
              <Separator />
            </>
          ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          padding: 5px;
        }
        .token-snapshot {
          padding: 5px;
        }
        @media only screen and (max-width: 800px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

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
      @media only screen and (max-width: 800px) {
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
