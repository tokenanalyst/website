import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';
import ReactGA from 'react-ga';

import { TokenSelect } from './TokenSelect';
import { ExchangeList } from './ExchangeList';
import { ExchangeMetricsWidget } from '../../widgets/ProExchangeMetricsWidget';
import { LinkTelegram } from './LinkTelegram';

export const LeftSidePanel = ({
  selectedExchange,
  selectedToken,
  tokensDb,
  onChange,
}) => {
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
    <div className="container">
      <div className="cat">
        <LinkTelegram />
      </div>
      <div className="metrics">
        <ExchangeMetricsWidget
          token={selectedToken}
          exchange={selectedExchange}
        />
      </div>
      <div className="controls-container">
        <Card>
          <div className="controls">
            <div className="control">
              <div className="label">Token:</div>
              <TokenSelect
                className="token-select"
                items={tokensList}
                groups={['Native coins', 'Stablecoins', 'ERC20 tokens']}
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
          </div>
        </Card>
      </div>
      <style jsx>
        {`
          .metrics {
            padding-bottom: 10px;
          }
          .controls {
            flex-direction: column;
            display: flex;
            margin-top: -10px;
            margin-bottom: -5px;
            margin-left: -5px;
            margin-right: -5px;
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
          .cat {
            padding-top: 10px;
            padding-bottom: 10px;
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .control {
              margin: auto;
            }
            .controls {
              flex-direction: column;
            }
            .label {
              margin: auto;
            }
            .cat {
              text-align: center;
            }
          }
        `}
      </style>
    </div>
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
