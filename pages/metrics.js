import React, { useState, useRef, useContext } from 'react';
import { Card } from '@blueprintjs/core';

import { TokenSelect } from '../components/widgets/ProChartWidget/TokenSelect';
import { tokensDb } from '../services/tokensDb';
import { CollapsibleItem } from '../components/CollapsibleItem';
import { TOKEN_NAMES } from '../constants/token-names';
import { ProChartContainer } from '../components/widgets/ProChartWidget/ProChartContainer';
import { NATIVE_TOKENS, METRICS } from '../constants/tokens';
import { LoginContext } from '../contexts/Login';
import { SimpleDialog } from '../components/SimpleDialog';

const MetricsList = ({ token, selectedIndicator, setSelectedIndicator }) => {
  const loginCtx = useContext(LoginContext);

  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

  return (
    <>
      <div className="container">
        <SimpleDialog
          header="Sign Up for FREE Access top this Metric and Many, Many more!"
          subHeader="TokenAnalyst provides a World Class amount of metrics across all major tokens and blockchains. By signing up you will have access to all metrics, in both daily and hourly granularities (depending on metrics)"
          ctaText="Sign Up"
          isOpen={isRegisterDialogShown}
          onClose={() => setIsRegisterDialogShown(false)}
        ></SimpleDialog>
        <div className="card">
          <Card>
            <div className="header">Fundamentals:</div>
            {METRICS[
              token === NATIVE_TOKENS.BTC || token === NATIVE_TOKENS.ETH
                ? token
                : 'ERC_20'
            ].map(metric => (
              <CollapsibleItem
                key={metric.category}
                header={metric.category}
                defaultIsOpen={metric.isDefault}
                body={
                  <>
                    {metric.values.map(value => (
                      <div className="item-row">
                        <span
                          className={
                            value.requiresLogin
                              ? loginCtx.isLoggedIn
                                ? selectedIndicator.name === value.indicator
                                  ? 'item-selected'
                                  : 'item'
                                : 'item-greyed'
                              : selectedIndicator.name === value.indicator
                              ? 'item-selected'
                              : 'item'
                          }
                          key={value.indicator}
                          onClick={() =>
                            loginCtx.isLoggedIn || !value.requiresLogin
                              ? setSelectedIndicator({
                                  name: value.indicator,
                                  isIntraDay: value.isIntraDay,
                                })
                              : setIsRegisterDialogShown(true)
                          }
                        >
                          {value.name}
                        </span>
                      </div>
                    ))}
                  </>
                }
              />
            ))}
          </Card>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            max-height: 500px;
            overflow: scroll;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 5px;
          }
          .item-row {
            padding-top: 5px;
            padding-bottom: 5px;
            display: flex;
            align-items: center;
          }
          .item {
            margin-left: 5px;
            margin-bottom: 5px;
            cursor: pointer;
          }
          .item-greyed {
            margin-left: 5px;
            margin-bottom: 5px;
            cursor: pointer;
            opacity: 0.5;
            font-style: italic;
          }
          .item-selected {
            margin-left: 5px;
            margin-bottom: 5px;
            font-weight: bold;
            border-bottom: 2px solid rgba(63, 205, 171, 1);
            cursor: pointer;
          }
          .header {
            font-size: 16px;
            font-weight: bold;
            padding-bottom: 10px;
          }
        `}
      </style>
    </>
  );
};

const Metrics = () => {
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [selectedIndicator, setSelectedIndicator] = useState({
    name: 'Volume USD',
    isIntraDay: true,
  });
  // const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

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

  const nativeTokens = tokensDb.getTokensList(NATIVE);
  const stableTokens = tokensDb.getTokensList(STABLE);
  const erc20Tokens = tokensDb.getTokensList(ERC20);

  const tokensList = [nativeTokens, stableTokens, erc20Tokens];

  return (
    <>
      <div className="container">
        <div className="lhs">
          <div className="title">
            <img
              src={`/static/png/coins/${selectedToken.toLowerCase()}.png`}
              className="title-image"
            />
            <div className="title-name">{TOKEN_NAMES[selectedToken]}</div>
          </div>
          <Card>
            <TokenSelect
              items={tokensList}
              groups={['Native coins', 'Stable tokens', 'ERC20 tokens']}
              selectedToken={selectedToken}
              onItemSelect={newToken => setSelectedToken(newToken)}
            />
          </Card>
          <div className="metrics-list">
            <MetricsList
              token={selectedToken}
              selectedIndicator={selectedIndicator}
              setSelectedIndicator={setSelectedIndicator}
            />
          </div>
        </div>
        <div className="rhs">
          <ProChartContainer
            timeFrame="3D"
            interval="60"
            TVSymbols={['BTC', 'USDT']}
            TASymbol={selectedToken}
            exchangeName="Binance"
            isIntraDay={selectedIndicator.isIntraDay}
            onChartRenderCb={tvWidget => {
              tvInstance.current = tvWidget;
              studies.current.flows.entityId = tvInstance.current
                .chart()
                .createStudy(selectedIndicator.name, false, true);
            }}
          />
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
          }
          .lhs {
            width: 15%;
            padding-right: 10px;
          }
          .rhs {
            width: 85%;
          }
          .title {
            display: flex;
            align-items: center;
            padding: 20px;
          }
          .title-image {
            width: 60px;
          }
          .title-name {
            font-size: 20px;
            font-weight: bold;
            padding-left: 10px;
          }
          .metrics-list {
            padding-top: 10px;
          }
        `}
      </style>
    </>
  );
};

export default Metrics;
