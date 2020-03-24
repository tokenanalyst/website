import React, { useState, useRef } from 'react';
import moment from 'moment';

import { tokensDb } from '../../../../services/tokensDb';
import { TOKEN_NAMES } from '../../../../constants/token-names';
import { ProChartContainer } from '../../organism/ProChartContainer';
import { KaikoLogo } from '../../atoms/KaikoLogo';
import {
  NATIVE_TOKENS,
  STABLE_TOKENS,
  CURRENCIES,
} from '../../../../constants/tokens';
import {
  TOKENS_EXCHANGE_SUPPORT,
  BITSTAMP,
  BINANCE,
} from '../../../../constants/exchanges';
import { SPOT } from '../../../../constants/instruments';
import { LeftSidePanelMetrics } from '../../organism/LeftSidePanelMetrics';

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

  let exchangeName;

  let quoteToken;

  let baseToken;

  if (
    selectedToken === NATIVE_TOKENS.BTC ||
    selectedToken === NATIVE_TOKENS.ETH
  ) {
    exchangeName = BITSTAMP;
    quoteToken = CURRENCIES.USD;
    baseToken = selectedToken;
  } else {
    exchangeName = BINANCE;
    const supportedExchange = Object.keys(
      TOKENS_EXCHANGE_SUPPORT[selectedToken]
    )[0];

    const tokenSupport =
      TOKENS_EXCHANGE_SUPPORT[selectedToken][supportedExchange];

    quoteToken = tokenSupport.quoteToken;
    baseToken = tokenSupport.baseToken || selectedToken;
    exchangeName = supportedExchange;
  }

  return (
    <>
      <div className="container">
        <div className="left-panel">
          <div className="controls-box">
            <LeftSidePanelMetrics
              selectedToken={selectedToken}
              tokenName={TOKEN_NAMES[selectedToken]}
              onChangeToken={setSelectedToken}
              tokensList={tokensList}
              selectedIndicator={selectedIndicator}
              setSelectedIndicator={setSelectedIndicator}
            />
          </div>
        </div>
        <div className="right-panel">
          <div className="pro-chart">
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
          <div className="kaiko">
            <KaikoLogo />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .controls-box {
          }
          .left-panel {
            width: 300px;
          }
          .right-panel {
            width: 100%;
            margin-left: 10px;
          }
          .cat-link {
            padding-bottom: 10px;
          }
          .pro-chart {
            width: 100%;
          }
          .kaiko {
            padding-top: 5px;
            padding-bottom: 5px;
            text-align: right;
          }

          @media (min-width: 768px) and (max-width: 1440px) {
            .controls-box {
            }
            .pro-chart {
            }
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .container {
              flex-direction: column;
            }
            .left-panel {
              width: 100%;
            }
            .pro-chart {
              padding-top: 5px;
              width: 100%;
            }
            .controls-box {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};
