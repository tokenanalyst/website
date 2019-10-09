import PropTypes from 'prop-types';
import React, { useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { Icon, Switch, Card } from '@blueprintjs/core';
import dynamic from 'next/dynamic';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';
import { makeTVSymbols } from './utils/makeTVSymbols';

import { ProChartContainer } from './ProChartContainer';
import { COOKIES } from '../../../constants/cookies';
import { PLANS } from '../../../constants/plans';
import { Link } from '../../Link';
import { LoginContext } from '../../../contexts/Login';
import { TokenSelect } from './TokenSelect';
import { TOOLTIP_TEXT } from './ToolTipText';
import { ExchangeList } from './ExchangeList';

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
  selectedExchange,
  selectedToken,
  tokensDb,
  onChange,
}) => {
  const tvInstance = useRef(null);
  const studies = useRef({
    flows: { entityId: null },
    transactions: { entityId: null },
  });

  const exchangeSupport = tokensDb.getTokenSupportOnExchange(
    selectedToken,
    selectedExchange
  );

  const TVSymbols = makeTVSymbols(selectedToken, exchangeSupport);

  const router = useRouter();

  const loginContext = useContext(LoginContext);

  const TIER = Number(Cookies.get(COOKIES.tier));

  const {
    tokens: {
      groupName: { NATIVE, STABLE, ERC20 },
    },
  } = tokensDb;
  const nativeTokens = tokensDb.getTokensList(NATIVE, selectedExchange);
  const stableTokens = tokensDb.getTokensList(STABLE, selectedExchange);
  const erc20Tokens = tokensDb.getTokensList(ERC20, selectedExchange);

  const tokensList = [nativeTokens, stableTokens, erc20Tokens];

  const renderCTALink = () => {
    if (TIER !== null) {
      if (TIER === PLANS.SIGNED_OUT.id) {
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
      } else if (TIER < PLANS.PLATFORM.id) {
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
      } else {
        return null;
      }
    }

    return null;
  };

  return (
    <div>
      <div className="container">
        <div className="controls-card">
          <div className="cat-link">{renderCTALink()}</div>

          <Card>
            <div className="controls">
              <div className="control">
                <div className="label">Token:</div>
                <TokenSelect
                  className="token-select"
                  items={tokensList}
                  groups={['Native coins', 'Stable tokens', 'ERC20 tokens']}
                  selectedToken={selectedToken}
                  onItemSelect={newToken => {
                    ReactGA.event({
                      category: 'User',
                      action: `Pro Chart change token ${newToken}`,
                      label: `Pro Charts`,
                    });
                    onChange(newToken, selectedExchange);
                  }}
                />
              </div>
              <div className="control">
                <div className="exchanges">
                  <div className="label">Exchange:</div>
                  <ExchangeList
                    exchanges={tokensDb.getExchangesList()}
                    onChangeExchange={newExchange => {
                      onChange(selectedToken, newExchange);
                    }}
                    selectedExchange={selectedExchange}
                  />
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
            TVSymbols={TVSymbols}
            TASymbol={selectedToken}
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
            padding-bottom: 10px;
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
          }
        `}
      </style>
    </div>
  );
};

ProChartWidget.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
};
