import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Icon, Switch, Card } from '@blueprintjs/core';
import dynamic from 'next/dynamic';
import ReactGA from 'react-ga';

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

export const LeftSidePanel = ({
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

  const {
    tokens: {
      groupName: { NATIVE, STABLE, ERC20 },
    },
  } = tokensDb;

  const nativeTokens = tokensDb.getTokensList(NATIVE, selectedExchange);
  const stableTokens = tokensDb.getTokensList(STABLE, selectedExchange);
  const erc20Tokens = tokensDb.getTokensList(ERC20, selectedExchange);

  const tokensList = [nativeTokens, stableTokens, erc20Tokens];

  return (
    <>
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
                selectedExchange={selectedExchange}
                exchanges={tokensDb.getExchangesList()}
                onChangeExchange={newExchange => {
                  onChange(selectedToken, newExchange);
                }}
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
      <style jsx>
        {`
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

          .exchanges {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .controls {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  );
};

LeftSidePanel.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
};
