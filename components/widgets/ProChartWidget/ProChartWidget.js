import PropTypes from 'prop-types';
import React, { useRef, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import { Icon, Switch, Card } from '@blueprintjs/core';
import dynamic from 'next/dynamic';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';

import { ProChartContainer } from './ProChartContainer.js';
import { QUOTE_TOKENS, EXCHANGE_NAMES } from '../../../constants/exchanges';
import { STABLE_TOKENS, NATIVE_TOKENS } from '../../../constants/tokens';
import { COOKIES } from '../../../constants/cookies';
import { PLANS } from '../../../constants/plans';
import { EXCHANGE_IMAGES } from '../../../constants/image-paths';
import { colors } from '../../../constants/styles/colors';
import { Link } from '../../Link';
import { LoginContext } from '../../../contexts/Login';
import { TokenSelect } from './TokenSelect';
import { TOOLTIP_TEXT } from './ToolTipText';

const STUDIES = {
  FLOWS: 'Flows',
  NET_FLOWS: 'NetFlows',
};

const TA_SUPPORTED_TOKENS = [
  ...Object.values(NATIVE_TOKENS),
  STABLE_TOKENS.OMG,
  STABLE_TOKENS.ZRX,
];

const SimpleToolTip = dynamic(
  () => import('../../SimpleToolTip').then(mod => mod.SimpleToolTip),
  {
    ssr: false,
  }
);

const makeSymbols = (baseToken, exchangeName, quoteTokenMap) => {
  const { quoteToken } = quoteTokenMap[baseToken.toUpperCase()][exchangeName];

  return [baseToken, quoteToken];
};

export const ProChartWidget = ({
  onChangeExchange,
  onChangeToken,
  selectedExchange,
  selectedToken,
}) => {
  const tvInstance = useRef(null);
  const studies = useRef({
    flows: { entityId: null },
    transactions: { entityId: null },
  });

  const symbols = makeSymbols(selectedToken, selectedExchange, QUOTE_TOKENS);

  const router = useRouter();

  const loginContext = useContext(LoginContext);

  const TIER = Cookies.get(COOKIES.tier);

  const renderCATElement = () => {
    if (TIER !== null) {
      return (
        <Link
          desktopLabel="Sign Up for 1 Hour Granularity"
          href="/register?exchange=true"
          onClick={() => {
            loginContext.setPostRegisterRedirectUrl(router.asPath);
            ReactGA.event({
              category: 'User',
              action: `Click Sign Up CTA Exchange Page`,
              label: `Funnel`,
            });
          }}
        />
      );
    }
    if (TIER < PLANS.PLATFORM.id) {
      return (
        <Link
          desktopLabel="Get Unlimited Data"
          href="/pricing?exchange=true"
          onClick={() => {
            ReactGA.event({
              category: 'User',
              action: `Click Upgrade CTA Exchange Page`,
              label: `Funnel`,
            });
          }}
        />
      );
    }

    return null;
  };

  return (
    <div>
      <div className="container">
        <div className="controls-card">
          <div className="cat-link">{renderCATElement()}</div>

          <Card>
            <div className="controls">
              <div className="control">
                <div className="label">Token:</div>
                <TokenSelect
                  className="token-select"
                  tokensList={TA_SUPPORTED_TOKENS}
                  selectedToken={selectedToken}
                  onItemSelect={token => {
                    ReactGA.event({
                      category: 'User',
                      action: `Pro Chart change token ${token}`,
                      label: `Pro Charts`,
                    });
                    console.log(token);
                    console.log(selectedExchange);
                    console.log(
                      QUOTE_TOKENS[token.toUpperCase()][selectedExchange]
                    );
                    if (
                      !QUOTE_TOKENS[token.toUpperCase()] ||
                      !QUOTE_TOKENS[token.toUpperCase()][selectedExchange]
                    ) {
                      // Temporary full page reload while we are in transition with adding all tokens to TV
                      Router.push(
                        `/exchange/${token.toUpperCase()}/${selectedExchange}`
                      );
                    } else {
                      onChangeToken(token);
                    }
                  }}
                />
              </div>
              <div className="control">
                <div className="exchanges">
                  <div className="label">Exchange:</div>
                  <div className="exchange-list">
                    {Object.values(EXCHANGE_NAMES)
                      .filter(exchangeName => {
                        return exchangeName !== EXCHANGE_NAMES.Okex;
                      })
                      .map(exchangeName => (
                        <div
                          role="link"
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
                          />
                          <span
                            className={`${
                              exchangeName === selectedExchange
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
                    defaultChecked
                    large
                  />
                </div>
              </div>
              <div className="control">
                <SimpleToolTip
                  dataFor="header-tooltip"
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
        </div>
        <div className="pro-chart">
          <ProChartContainer
            timeFrame="3D"
            interval="60"
            symbols={symbols}
            exchangeName={selectedExchange}
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
            padding-top: 20px;
            padding-left: 5px;
            width: 11%;
          }
          .controls {
            flex-direction: column;
            display: flex;
          }
          .control {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-weight: bold;
            padding-bottom: 10px;
          }
          .cat-link {
            padding-bottom: 10px
          }
          .token-select {
            width: 120px;
          }
          .label {
            width: 50%;
            padding-bottom: 10px;
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
            flex-direction: column;
            width: 100%;
          }
          .exchange {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-bottom: 5px;
            width: 50%;
          }
          .exchange:hover {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-bottom: 5px;
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
            width: 88%;
          }
          .switch {
            padding-top: 10px;
          }
          .pricing-link {
            padding-bottom: 30px;
          }
          @media (min-width: 768px) and (max-width: 1440px) {
            .controls-card {
              max-height: 75%;
              padding-top: 20px;
              padding-left: 5px;
              width: 14%;
            }
            .pro-chart {
              width: 85%;
            }
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
              width: 100%;
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

ProChartWidget.propTypes = {
  onChangeExchange: PropTypes.func.isRequired,
  onChangeToken: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
};
