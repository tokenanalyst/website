import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import numeral from 'numeral';
import axios from 'axios';

import { colors } from '../../../constants/styles/colors';
import { LoadingSpinner } from '../../LoadingSpinner';
import { DATA_WINDOWS } from '../../../constants/filters';

const getSparklineWindow = (tokenData, dataWindow, flow) => {
  const { hours, days } = tokenData;
  const sparkLines = {
    [DATA_WINDOWS[0]]: [
      ...hours[flow].slice(hours[flow].length - 24, hours[flow].length),
    ],
    [DATA_WINDOWS[1]]: [
      ...days[flow].slice(days[flow].length - 7, hours[flow].length),
    ],
    [DATA_WINDOWS[2]]: [...days[flow]],
  };
  return sparkLines[dataWindow];
};

export const TokenSnapshot = ({ token, dataWindow, units }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `/api/latest-exchange-flows?tokens=${token}`
      );
      setData(result.data);
    };

    getData();
  }, []);

  return (
    <>
      {data ? (
        <div className="container">
          {console.log(data.BTC)}
          {console.log(dataWindow)}
          <div className="header">{token}</div>
          <div className="top-row">
            <span className="token-value">
              ${numeral(data[token].token.price).format('0,0')}
            </span>
            <span>
              <img
                src={
                  data[token].token.price_pct_change < 0
                    ? '/static/svg/down.svg'
                    : data[token].token.price_pct_change > 0
                    ? '/static/svg/up.svg'
                    : '/static/svg/nochange.svg'
                }
              />
              <span
                className={
                  data[token].token.price_pct_change > 0
                    ? 'change-positive'
                    : data[token].token.price_pct_change < 0
                    ? 'change-negative'
                    : 'change-neutral'
                }
              >
                {data[token].token.price_pct_change.toFixed(2)}%
              </span>
            </span>
          </div>
          <div className="shadow" />
          {[
            {
              label: 'Inflow',
              change:
                units === 'USD'
                  ? data[token].values[`data-window-${dataWindow}`]
                      .inflow_usd_sum_pct_change
                  : data[token].values[`data-window-${dataWindow}`]
                      .inflow_sum_pct_change,
              value:
                units === 'USD'
                  ? data[token].values[`data-window-${dataWindow}`]
                      .inflow_usd_sum
                  : data[token].values[`data-window-${dataWindow}`].inflow_sum,
              sparkline: getSparklineWindow(
                data[token].sparklines,
                dataWindow,
                'inflow'
              ),
            },
            {
              label: 'Outflow',
              change:
                units === 'USD'
                  ? data[token].values[`data-window-${dataWindow}`]
                      .outflow_usd_sum_pct_change
                  : data[token].values[`data-window-${dataWindow}`]
                      .outflow_sum_pct_change,
              value:
                units === 'USD'
                  ? data[token].values[`data-window-${dataWindow}`]
                      .outflow_usd_sum
                  : data[token].values[`data-window-${dataWindow}`].outflow_sum,
              sparkline: getSparklineWindow(
                data[token].sparklines,
                dataWindow,
                'outflow'
              ),
            },
          ].map((flow, index) => (
            <div className="section" key={index}>
              <>
                <div className="sparkline-row">
                  <div className="sparkline-header">{flow.label}</div>
                  <div className="sparkline">
                    <Sparklines data={flow.sparkline}>
                      <SparklinesLine
                        style={{ strokeWidth: 6, fill: 'none', width: 200 }}
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
                <div className={index === 1 ? 'last-row' : 'row'}>
                  <div className="token-flow-variation">
                    <img
                      src={
                        flow.change < 0
                          ? '/static/svg/down.svg'
                          : flow.change > 0
                          ? '/static/svg/up.svg'
                          : '/static/svg/nochange.svg'
                      }
                    />
                    <span
                      className={
                        flow.change > 0
                          ? 'change-positive'
                          : flow.change < 0
                          ? 'change-negative'
                          : 'change-neutral'
                      }
                    >
                      {flow.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="token-flow-value">
                    {units === 'USD' ? '$' : ''}
                    {numeral(flow.value).format('0.0a')}
                  </div>
                </div>
              </>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      )}
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
          font-family: Space Grotesk;
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
          display: flex;
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
        .spinner {
          min-width: 300px;
          max-width: 300px;
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
};

TokenSnapshot.propTypes = {
  token: PropTypes.string.isRequired,
  tokenValue: PropTypes.number.isRequired,
  tokenValueChange: PropTypes.number.isRequired,
  flows: PropTypes.arrayOf(PropTypes.object),
  units: PropTypes.string.isRequired,
};
