import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { HTMLSelect, Button, Switch } from '@blueprintjs/core';
import { ProChartContainer } from './ProChartContainer.js';
import { EXCHANGE_NAMES, EXCHANGE_TOKENS } from '../../../constants/exchanges';

const TA_TRADING_PAIRS = [
  ['BTC', 'USD'],
  ['ETH', 'USD'],
  ['ZRX', 'USD'],
  ['OMG', 'USD'],
];

const STUDIES = {
  FLOWS: 'Flows',
  NET_FLOWS: 'NetFlows',
};

export const ProChartWidget = ({
  exchange,
  onChangeExchange,
  token,
  onChangeToken,
}) => {
  const tvInstance = useRef(null);
  const studies = useRef({
    flows: { entityId: null },
    transactions: { entityId: null },
  });

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container">
        <div className="controls">
          {/* <div className="card"> */}
          <div className="controls-lhs">
            <div className="control">
              <div className="label">Token:</div>
              <HTMLSelect
                className="ta-select"
                options={EXCHANGE_TOKENS[exchange]}
                onChange={() => onChangeToken(event.target.value)}
                value={token}
                id="exchange-select"
              />
            </div>
            <div className="control">
              <div className="label">Exchange:</div>
              <HTMLSelect
                className="ta-select"
                options={Object.keys(EXCHANGE_NAMES)}
                onChange={() => onChangeExchange(event.target.value)}
                value={exchange}
                id="exchange-select"
              />
            </div>
            <div className="control">
              <div className="label">Net Flows:</div>
              <Switch
                className=".bp3-large"
                onChange={() => {
                  if (!studies.current.transactions.entityId) {
                    studies.current.transactions.entityId = tvInstance.current
                      .chart()
                      .createStudy(STUDIES.NET_FLOWS, false, true);
                  } else {
                    tvInstance.current
                      .chart()
                      .removeEntity(studies.current.transactions.entityId);
                    studies.current.transactions.entityId = null;
                  }
                }}
                defaultChecked={true}
              />
            </div>
          </div>
          <div className="api-button">
            <Button onClick={() => Router.push('/pricing')}>
              Get API Access
            </Button>
          </div>
        </div>
        <div className="pro-chart">
          <ProChartContainer
            timeFrame="3D"
            interval="60"
            symbols={[token, 'USD']}
            exchangeName={exchange}
            onChartRenderCb={tvWidget => {
              tvInstance.current = tvWidget;
              studies.current.flows.entityId = tvInstance.current
                .chart()
                .createStudy('Flows', false, true);
              studies.current.transactions.entityId = tvInstance.current
                .chart()
                .createStudy('NetFlows', false, true);
            }}
          />
        </div>
      </div>

      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            padding-right: 20px;
            justify-content: flex-start;
          }
          .controls {
            flex-direction: row;
            display: flex;
            padding: 20px;
            justify-content: space-between;
            min-width: 100%;
          }
          .controls-lhs {
            display: flex;
          }
          .control {
            padding: 5px;
            display: flex;
            align-items: center;
            font-weight: bold;
          }
          .label {
            padding-right: 10px;
            padding-left: 5px;
          }
          .legend-flows {
            padding-left: 8px;
          }
          .legend-flows-inflow {
            color: #7cfc00;
          }

          .legend-flows-outflow {
            color: #ff0000;
          }

          .card {
            padding-bottom: 10px;
            display: flex;
          }
          .pro-chart {
            width: 100%;
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .controls-lhs {
              flex-direction: column;
            }
            .controls {
              flex-direction: column;
            }
            .control {
              justify-content: space-between;
            }
            .api-button {
              display: flex;
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
};
