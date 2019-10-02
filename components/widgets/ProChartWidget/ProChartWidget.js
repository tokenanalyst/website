import React, { useRef, useContext } from 'react';
import { Icon } from '@blueprintjs/core';
import dynamic from 'next/dynamic';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';

import { HTMLSelect, Card, Switch } from '@blueprintjs/core';
import { ProChartContainer } from './ProChartContainer.js';
import {
  EXCHANGE_NAMES,
  EXCHANGE_TOKENS,
  EXCHANGE_DOLLARS,
} from '../../../constants/exchanges';
import { EXCHANGE_IMAGES } from '../../../constants/image-paths';
import { colors } from '../../../constants/styles/colors';
import { Link } from '../../Link';
import { LoginContext } from '../../../contexts/Login';

const TOOLTIP_TEXT = (
  <>
    <div>Below is the legend for each of the charts displayed:</div>
    <div>
      All units are displayed in terms of the selected asset except for the
      Price which is displayed in USD, USDT or appropriate stablecoin
    </div>
    <br />
    <div>
      1: Price of the selected asset on the selected exchange in either USD or
      USDT
    </div>
    <br />
    <div>
      2: Trading volume of the pair shown above on the selected exchange.
      Expressed in terms of the selected asset
    </div>
    <br />
    <div>
      3: Inflows and outflows of the selected asset into and out of the selected
      exchange on the blockchain
    </div>
    <br />
    <div>
      4: "Net" flows of the asset into the exchange on the blockchain. This is
      the sum of inflows minus the outflows
    </div>
    <div>
      Negative net flows mean more funds left the exchange than came in during
      the time interval and vice versa for positive net flows
    </div>
  </>
);

const STUDIES = {
  FLOWS: 'Flows',
  NET_FLOWS: 'NetFlows',
};

const SimpleToolTip = dynamic(
  () => import('../../SimpleToolTip').then(mod => mod.SimpleToolTip),
  {
    ssr: false,
  }
);

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

  const router = useRouter();

  const loginContext = useContext(LoginContext);

  return (
    <div>
      <div className="container">
        <div className="controls-card">
          <Card>
            <div className="controls">
              <div className="control">
                <div className="label">Token:</div>
                <HTMLSelect
                  className="token-select"
                  options={EXCHANGE_TOKENS[exchange]}
                  onChange={() => {
                    ReactGA.event({
                      category: 'User',
                      action: `Pro Chart change token ${event.target.value}`,
                      label: `Pro Charts`,
                    });
                    onChangeToken(event.target.value);
                  }}
                  value={token}
                />
              </div>
              <div className="control">
                <div className="exchanges">
                  <div className="label">Exchange:</div>
                  <div className="exchange-list">
                    {Object.keys(EXCHANGE_NAMES)
                      .filter(
                        exchangeName => exchangeName !== EXCHANGE_NAMES.Okex
                      )
                      .map(exchangeName => (
                        <div
                          key={exchangeName}
                          className="exchange"
                          onClick={() => {
                            onChangeExchange(exchangeName);
                            ReactGA.event({
                              category: 'User',
                              action: `Pro Chart change exchange ${exchangeName}`,
                              label: `Pro Charts`,
                            });
                          }}
                        >
                          <img
                            src={`/static/png/${EXCHANGE_IMAGES[exchangeName]}`}
                            className="exchange-image"
                          />{' '}
                          <span
                            className={`${
                              exchangeName === exchange
                                ? 'exchange-label-selected'
                                : 'exchange-label'
                            }`}
                          >
                            {EXCHANGE_NAMES[exchangeName]}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="control">
                <div className="label">Net Flows:</div>
                <div className="switch">
                  <Switch
                    onChange={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Pro Chart toggle netflow`,
                        label: `Pro Charts`,
                      });
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
                    large
                  />
                </div>
              </div>
              <div className="control">
                <SimpleToolTip
                  dataFor={'header-tooltip'}
                  toolTip={TOOLTIP_TEXT}
                  type="dark"
                  effect="solid"
                >
                  <div data-tip data-for="header-tooltip">
                    <Icon icon="info-sign" color="gray" />
                  </div>
                </SimpleToolTip>
              </div>
            </div>
          </Card>
          <div className="pricing-link">
            {!loginContext.isLoggedIn && (
              <Link
                desktopLabel="Sign Up for 1 Hour Granularity"
                href="/register"
                onClick={() => {
                  loginContext.setPostRegisterRedirectUrl(router.asPath);
                  ReactGA.event({
                    category: 'User',
                    action: `Click Sign Up CTA Exchange Page`,
                    label: `Funnel`,
                  });
                }}
              />
            )}
          </div>
        </div>
        <div className="pro-chart">
          <ProChartContainer
            timeFrame="3D"
            interval="60"
            symbols={[token, EXCHANGE_DOLLARS[exchange]]}
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
            flex-direction: row;
            padding-right: 20px;
            justify-content: space-between;
          }
          .controls-card {
            max-height: 75%;
            min-width: 5%;
            padding-top: 20px;
            padding-left: 5px;
          }
          .controls {
            flex-direction: column;
            display: flex;
          }
          .control {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: bold;
            padding-bottom: 10px;
          }
          .token-select {
            width: 120px;
          }
          .label {
            width: 50%;
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
          .exchanges {
            display: flex;
            flex-direction: row;
            width: 100%;
          }
          .exchange {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-bottom: 5px;
            padding-left: 35px;
            width: 50%;
          }
          .exchange:hover {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-bottom: 5px;
            padding-left: 35px;
            width: 50%;
            opacity: 0.5;
          }
          .exchange-image {
            width: 24px;
            height: 24px;
          }
          .exchange-label {
            margin-left: 5px;
          }
          .exchange-label-selected {
            margin-left: 5px;
            border-bottom: 2px solid rgba(${colors.primaryGreen}, 1);
          }
          .card {
            padding-bottom: 10px;
            display: flex;
          }
          .pro-chart {
            width: 80%;
          }
          .switch {
            padding-top: 10px;
          }
          .pricing-link {
            padding-top: 30px;
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .container {
              flex-direction: column-reverse;
            }
            .pro-chart {
              padding-top: 5px;
              width: 100%;
            }
            .controls-card {
              padding-top: 10px;
            }
            .controls {
              flex-direction: column;
            }
            .pricing-link {
              text-align: center;
            }
        `}
      </style>
    </div>
  );
};
