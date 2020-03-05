import React, { useState, useRef } from 'react';
import { Card } from '@blueprintjs/core';
import ReactGA from 'react-ga';
import moment from 'moment';

import { TokenSelect } from '../../organism/TokenSelect/TokenSelect';
import { tokensDb } from '../../../../services/tokensDb';
import { TOKEN_NAMES } from '../../../../constants/token-names';
import { ProChartContainer } from '../../organism/ProChartContainer';
import { NATIVE_TOKENS, STABLE_TOKENS } from '../../../../constants/tokens';
import {
  TOKENS_EXCHANGE_SUPPORT,
  BITSTAMP,
} from '../../../../constants/exchanges';
import { SPOT } from '../../../../constants/instruments';
import { MetricsList } from './MetricsList';
import { EntityLogo } from '../../molecules/EntityLogo';

const TV_INITIAL_DATA_RANGE = 90; // 90 days

export const MetricsPage = () => {
  const [selectedToken, setSelectedToken] = useState(NATIVE_TOKENS.BTC);
  const [selectedIndicator, setSelectedIndicator] = useState({});

  const TVOptions = {
    disabled_features: [
      'volume_force_overlay',
      'header_symbol_search',
      'header_indicators',
      'header_compare',
      'header_saveload',
      'create_volume_indicator_by_default',
    ],
  };
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

  const filteredStableTokens = Object.keys(stableTokens).reduce(
    (acc, curr) =>
      [STABLE_TOKENS.OMNI, STABLE_TOKENS.USDT].indexOf(curr) > -1
        ? acc
        : { ...acc, [curr]: stableTokens[curr] },
    {}
  );
  const erc20Tokens = tokensDb.getTokensList(ERC20);

  const tokensList = [nativeTokens, filteredStableTokens, erc20Tokens];

  const supportedExchanges = TOKENS_EXCHANGE_SUPPORT[selectedToken];
  console.log(supportedExchanges);
  const exchangeName = BITSTAMP;
  const { quoteToken } = supportedExchanges[exchangeName];
  const baseToken = supportedExchanges[exchangeName].baseToken || selectedToken;

  return (
    <>
      <div className="container">
        <div className="lhs">
          <div className="title">
            <EntityLogo
              tokenSymbol={selectedToken}
              entityName={TOKEN_NAMES[selectedToken]}
            />
          </div>
          <Card>
            <TokenSelect
              items={tokensList}
              groups={['Native coins', 'Stablecoins', 'ERC20 tokens']}
              selectedToken={selectedToken}
              onItemSelect={newToken => {
                ReactGA.event({
                  category: 'User',
                  action: `Metrics Page change token ${newToken}`,
                  label: `Metrics Page`,
                });
                setSelectedToken(newToken);
              }}
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
            TVSymbols={[baseToken, quoteToken]}
            TVOptions={TVOptions}
            TASymbol={selectedToken}
            exchangeName={exchangeName}
            instrumentClass={SPOT}
            isIntraDay={selectedIndicator.isIntraDay}
            onChartRenderCb={async tvWidget => {
              tvInstance.current = tvWidget;
              const now = moment().unix();
              const ninetyDaysAgo = moment()
                .subtract(TV_INITIAL_DATA_RANGE, 'days')
                .unix();
              await tvInstance.current.chart().setVisibleRange({
                from: ninetyDaysAgo,
                to: now,
              });
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
            padding-right: 10px;
            width: 250px;
          }
          .rhs {
            width: 85%;
          }
          .title {
            padding-top: 10px;
            padding-bottom: 10px;
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
          @media (min-width: 320px) and (max-width: 767px) {
            .container {
              flex-direction: column-reverse;
            }
            .lhs {
              width: 100%;
              margin-bottom: 150px;
            }
            .rhs {
              width: 100%;
            }
            .title-image {
              display: none;
            }
            .title-name {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};
