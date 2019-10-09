/* eslint-disable react/jsx-wrap-multilines */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import numeral from 'numeral';
import axios from 'axios';
import { Popover, Icon, RadioGroup, Radio, Position } from '@blueprintjs/core';
import ReactGA from 'react-ga';

import { colors } from '../../../constants/styles/colors';
import { LoadingSpinner } from '../../LoadingSpinner';
import { CURRENCIES } from '../../../constants/tokens';
import { tokensDb } from '../../../services/tokensDb';
import { TOKEN_NAMES } from '../../../constants/token-names';
import { updateToken } from './helpers';
import { getTokenSnapshotData } from '../../../data-transformers/widgets/getTokenSnapshot';

const NATIVE_TOKENS = tokensDb.tokens.group.native;
const STABLE_TOKENS = tokensDb.tokens.group.stable;
const ERC20_TOKENS = tokensDb.tokens.group.ERC20;

const TOKEN_OPTIONS = [
  NATIVE_TOKENS.BTC,
  NATIVE_TOKENS.ETH,
  STABLE_TOKENS.DAI,
  STABLE_TOKENS.PAX,
  ERC20_TOKENS.OMG,
  STABLE_TOKENS.TUSD,
  ERC20_TOKENS.LINK,
];

const setValueChangeStatus = (value, status) => {
  if (value < 0) {
    return status[0];
  }

  if (value > 0) {
    return status[1];
  }

  return status[2];
};

export const TokenSnapshot = ({
  initialToken,
  dataWindow,
  units,
  position,
}) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [snapshotToken, setSnapshotToken] = useState(initialToken);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `/api/latest-exchange-flows?tokens=${snapshotToken}`
      );
      setApiResponse(result.data);
    };
    getData();
  }, [snapshotToken]);

  let data;

  if (apiResponse) {
    data = getTokenSnapshotData(apiResponse, snapshotToken, units, dataWindow);
  }

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
                  <RadioGroup
                    selectedValue={snapshotToken}
                    onChange={e => {
                      setApiResponse(null);
                      ReactGA.event({
                        category: 'User',
                        action: `At a glance change ${e.target.value}`,
                        label: `At a glance`,
                      });
                      updateToken(e.target.value, position);
                      setSnapshotToken(e.target.value);
                    }}
                  >
                    {TOKEN_OPTIONS.map(token => (
                      <Radio label={token} value={token} key={token} />
                    ))}
                  </RadioGroup>
                </div>
              }
              position={Position.BOTTOM}
            />
          </div>
          <div className="top-row">
            <span className="token-value">
              {`$ ${numeral(data.price).format('0,0')}`}
            </span>
            <span>
              <img
                src={setValueChangeStatus(data.change, [
                  '/static/svg/down.svg',
                  '/static/svg/up.svg',
                  '/static/svg/nochange.svg',
                ])}
                alt="Price Change"
              />
              <span
                className={setValueChangeStatus(data.change, [
                  'change-negative',
                  'change-positive',
                  'change-neutral',
                ])}
              >
                {`${data.change.toFixed(2)}%`}
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
                        color={setValueChangeStatus(flow.change, [
                          `rgba(${colors.primaryRed})`,
                          `rgba(${colors.primaryGreen})`,
                          `rgba(${colors.neutralGrey})`,
                        ])}
                      />
                    </Sparklines>
                  </div>
                </div>
              </>
              <>
                <div className={index === 1 ? 'last-row' : 'row'}>
                  <div className="token-flow-variation">
                    <img
                      src={setValueChangeStatus(flow.change, [
                        '/static/svg/down.svg',
                        '/static/svg/up.svg',
                        '/static/svg/nochange.svg',
                      ])}
                      alt="Flow Change"
                    />
                    <span
                      className={setValueChangeStatus(flow.change, [
                        'change-negative',
                        'change-positive',
                        'change-neutral',
                      ])}
                    >
                      {`${flow.change.toFixed(2)}%`}
                    </span>
                  </div>
                  <div className="token-flow-value">
                    {units === CURRENCIES.USD ? '$' : ''}
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
      <style jsx>
        {`
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
        `}
      </style>
    </>
  );
};

TokenSnapshot.propTypes = {
  initialToken: PropTypes.string.isRequired,
  dataWindow: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};
