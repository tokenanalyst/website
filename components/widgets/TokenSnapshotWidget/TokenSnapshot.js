import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import numeral from 'numeral';
import axios from 'axios';
import { Popover, Icon, RadioGroup, Radio, Position } from '@blueprintjs/core';
import ReactGA from 'react-ga';

import { colors } from '../../../constants/styles/colors';
import { LoadingSpinner } from '../../LoadingSpinner';
import { NATIVE_TOKENS, STABLE_TOKENS } from '../../../constants/tokens';
import { TOKEN_NAMES } from '../../../constants/token-names';
import { updateToken } from './helpers';
import { getTokenSnapshotData } from '../../../data-transformers/widgets/getTokenSnapshot';

const TOKEN_OPTIONS = [
  NATIVE_TOKENS.BTC,
  NATIVE_TOKENS.ETH,
  STABLE_TOKENS.DAI,
  STABLE_TOKENS.PAX,
  STABLE_TOKENS.OMG,
  STABLE_TOKENS.TUSD,
  STABLE_TOKENS.LINK,
];

export const TokenSnapshot = ({
  initialToken,
  dataWindow,
  units,
  position,
}) => {
  const [data, setData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [snapshotToken, setSnapshotToken] = useState(initialToken);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `/api/latest-exchange-flows?tokens=${snapshotToken}`
      );
      setApiResponse(result.data);
      setData(
        getTokenSnapshotData(result.data, snapshotToken, units, dataWindow)
      );
    };

    setData(null);
    getData();
  }, [snapshotToken]);

  useEffect(() => {
    if (data) {
      setData(
        getTokenSnapshotData(apiResponse, snapshotToken, units, dataWindow)
      );
    }
  }, [units, dataWindow]);

  return (
    <>
      {data ? (
        <div className="container">
          <div className="header">
            {TOKEN_NAMES[snapshotToken]}
            <Popover
              target={
                <div className="chevron">
                  <Icon icon="chevron-down" iconSize={24} />
                </div>
              }
              content={
                <div className="radio-group">
                  <RadioGroup selectedValue={snapshotToken}>
                    {TOKEN_OPTIONS.map(token => (
                      <Radio
                        defaultChecked
                        label={token}
                        value={token}
                        onClick={e => {
                          setData(null);
                          ReactGA.event({
                            category: 'User',
                            action: `At a glance change ${e.target.value}`,
                            label: `At a glance`,
                          });
                          updateToken(e.target.value, position);
                          setSnapshotToken(e.target.value);
                        }}
                      />
                    ))}
                  </RadioGroup>
                </div>
              }
              position={Position.BOTTOM}
            />
          </div>
          <div className="top-row">
            <span className="token-value">
              ${numeral(data.price).format('0,0')}
            </span>
            <span>
              <img
                src={
                  data.change < 0
                    ? '/static/svg/down.svg'
                    : data.change > 0
                    ? '/static/svg/up.svg'
                    : '/static/svg/nochange.svg'
                }
              />
              <span
                className={
                  data.change > 0
                    ? 'change-positive'
                    : data.change < 0
                    ? 'change-negative'
                    : 'change-neutral'
                }
              >
                {data.change.toFixed(2)}%
              </span>
            </span>
          </div>
          <div className="shadow" />
          {data.flows.map((flow, index) => (
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
          padding-left: 5px;
          padding-right: 5px;
        }
        .header {
          font-family: Space Grotesk;
          font-size: 32px;
          font-weight: bold;
          padding-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
        .radio-group {
          padding: 10px;
        }
        .chevron {
          cursor: pointer;
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
            padding-top: 10px;
          }
        }
      `}</style>
    </>
  );
};

TokenSnapshot.propTypes = {
  initialToken: PropTypes.string.isRequired,
  dataWindow: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};
