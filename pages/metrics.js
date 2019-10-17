import React, { useState } from 'react';
import { Card } from '@blueprintjs/core';

import { TokenSelect } from '../components/widgets/ProChartWidget/TokenSelect';
import { tokensDb } from '../services/tokensDb';
import { CollapsibleItem } from '../components/CollapsibleItem';
import { TOKEN_NAMES } from '../constants/token-names';
import { ProChartContainer } from '../components/widgets/ProChartWidget/ProChartContainer';
import { METRICS } from '../constants/tokens';

const MetricsList = ({ token }) => {
  return (
    <>
      <div className="container">
        <div className="card">
          <Card>
            <div className="header">Fundamentals:</div>
            {METRICS[token].map(metric => (
              <CollapsibleItem
                key={metric.category}
                header={metric.category}
                body={
                  <>
                    {metric.values.map(value => (
                      <div className="item" key={value.apiValue}>
                        {value.name}
                      </div>
                    ))}
                  </>
                }
              />
            ))}
          </Card>
        </div>
      </div>
      <style jsx>{`
        .card {
          max-height: 600px;
          overflow: scroll;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 5px;
        }
        .item {
          margin-left: 5px;
          margin-bottom: 5px;
        }
        .item-selected {
          margin-left: 5px;
          margin-bottom: 5px;
          font-weight: bold;
          border-bottom: 2px solid rgba(63, 205, 171, 1);
        }
        .header {
          font-size: 16px;
          font-weight: bold;
          padding-bottom: 10px;
        }
      `}</style>
    </>
  );
};

const Metrics = () => {
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [selectedMetric, setSelectedMetric] = useState('volume_usd');

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
              src={`/static/png/coins/${selectedToken}.png`}
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
            <MetricsList token={selectedToken} />
          </div>
        </div>
        <div className="rhs">
          <ProChartContainer
            timeFrame="3D"
            interval="60"
            TVSymbols={['BTC', 'USDT']}
            TASymbol={selectedToken}
            exchangeName="Binance"
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .lhs {
          width: 25%;
          padding-right: 10px;
        }
        .rhs {
          width: 75%;
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
      `}</style>
    </>
  );
};

export default Metrics;
