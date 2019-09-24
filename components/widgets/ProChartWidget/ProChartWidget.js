import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { HTMLSelect, Button, Card, Switch } from '@blueprintjs/core';
import { ProChartContainer } from './ProChartContainer.js';

const TA_TRADING_PAIRS = [
  ['BTC', 'USD'],
  ['ETH', 'USD'],
  ['ZRX', 'USD'],
  ['OMG', 'USD'],
];

const SELECTED_EXCHANGE = 'Bitfinex';

const EXCHANGES = ['Bitfinex', 'Binance'];
const TOKENS = ['BTC', 'ETH'];
const ON_CHAIN_DATA = ['Volumes', 'Addresses'];

const STUDIES = {
  FLOWS: 'Flows',
  NET_FLOWS: 'NetFlows',
};

const makeTickers = symbols =>
  symbols.reduce((curr, symbol) => [...curr, `${symbol[0]}/${symbol[1]}`], []);

export const ProChartWidget = () => {
  const [exchangeName, setExchangeName] = useState(SELECTED_EXCHANGE);
  const [symbols, setSymbols] = useState(TA_TRADING_PAIRS[0]);
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
                options={TOKENS}
                // onChange={event => {

                //   setExchangeName(event.target.value);
                // }}
                id="exchange-select"
              />
            </div>
            <div className="control">
              <div className="label">Exchange:</div>
              <HTMLSelect
                className="ta-select"
                options={EXCHANGES}
                onChange={event => {
                  // setIsLoading(true);
                  setExchangeName(event.target.value);
                }}
                id="exchange-select"
              />
            </div>
            {/* <div className="control">
              <HTMLSelect
                className="ta-select"
                options={makeTickers(TA_TRADING_PAIRS)}
                onChange={event => {
                  setSymbols(event.target.value.split('/'));
                }}
                id="pair-select"
              />
            </div> */}

            {/* <div className="card"> */}
            <div className="control">
              <div className="label">On-Chain Data:</div>
              {/* <Button
                onClick={() => {
                  if (!studies.current.flows.entityId) {
                    const entityId = tvInstance.current
                      .chart()
                      .createStudy(STUDIES.FLOWS, false, true);
                    studies.current.flows.entityId = entityId;
                  } else {
                    tvInstance.current
                      .chart()
                      .removeEntity(studies.current.flows.entityId);
                    studies.current.flows.entityId = null;
                  }
                }}
              >
                In/Out Flows
              </Button> */}
              <HTMLSelect
                className="ta-select"
                options={ON_CHAIN_DATA}
                onChange={event => {
                  // setIsLoading(true);
                  setExchangeName(event.target.value);
                }}
                id="exchange-select"
              />
            </div>

            {/* <div className="legend-flows">
            <div className="legend-flows-inflow">In flows</div>
            <div className="legend-flows-outflow">Out flows</div>
          </div> */}
            {/* <br /> */}
            <div className="control">
              <div className="label">Net Flows:</div>
              <Switch
                className=".bp3-large"
                onChange={() => {
                  // tv.current.chart().createStudy('Equity', false, true);
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
                checked
              />
            </div>
          </div>
          <div className="api-button">
            <Button>Get API</Button>
          </div>
        </div>
        <div className="pro-chart">
          <ProChartContainer
            timeFrame="3D"
            interval="60"
            symbols={symbols}
            exchangeName={exchangeName}
            onChartRenderCb={tvWidget => {
              console.warn('onChartRenderCb');
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
