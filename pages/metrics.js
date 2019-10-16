import React, { useState } from 'react';
import { Card } from '@blueprintjs/core';

import { TokenSelect } from '../components/widgets/ProChartWidget/TokenSelect';
import { tokensDb } from '../services/tokensDb';
import { CollapsibleItem } from '../components/CollapsibleItem';
import { TOKEN_NAMES } from '../constants/token-names';
import { ProChartContainer } from '../components/widgets/ProChartWidget/ProChartContainer';

const MetricsList = () => {
  return (
    <>
      <div className="container">
        <div className="card">
          <Card>
            <div className="header">Fundamentals:</div>
            <CollapsibleItem
              header="Volumes"
              body={
                <>
                  <div className="item">USD</div>
                  <div className="item">Real</div>
                </>
              }
            />
            <CollapsibleItem
              header="Transactions"
              body={
                <>
                  <div className="item">Number</div>
                </>
              }
            />
            <CollapsibleItem
              header="Addresses"
              body={
                <>
                  <div className="item">Senders</div>
                  <div className="item">Recipients</div>
                </>
              }
            />
            <CollapsibleItem
              header="Supply"
              body={
                <>
                  <div className="item">Amount</div>
                </>
              }
            />
            <CollapsibleItem
              header="NVT"
              body={
                <>
                  <div className="item">USD</div>
                  <div className="item">Market Cap</div>
                </>
              }
            />
            <CollapsibleItem
              header="NVT"
              body={
                <>
                  <div className="item">USD</div>
                  <div className="item">Market Cap</div>
                </>
              }
            />
            <CollapsibleItem
              header="NVT"
              body={
                <>
                  <div className="item">USD</div>
                  <div className="item">Market Cap</div>
                </>
              }
            />
            <CollapsibleItem
              header="NVT"
              body={
                <>
                  <div className="item">USD</div>
                  <div className="item">Market Cap</div>
                </>
              }
            />
            <CollapsibleItem
              header="NVT"
              body={
                <>
                  <div className="item">USD</div>
                  <div className="item">Market Cap</div>
                </>
              }
            />
            <CollapsibleItem
              header="NVT"
              body={
                <>
                  <div className="item">USD</div>
                  <div className="item">Market Cap</div>
                </>
              }
            />
          </Card>
        </div>
      </div>
      <style jsx>{`
        .card {
          width: 1000%;
          max-height: 800px;
          overflow: scroll;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 5px;
        }
        .item {
          padding: 5px;
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
          <MetricsList />
        </div>
        <div className="rhs">
          <div>Yo</div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .lhs {
          width: 25%;
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
      `}</style>
    </>
  );
};

export default Metrics;
