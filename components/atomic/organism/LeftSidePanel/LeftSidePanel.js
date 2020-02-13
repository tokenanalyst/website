import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';

import { TokenSelect } from '../TokenSelect/TokenSelect';
import { ExchangeList } from '../../molecules/ExchangeList';
import { ExchangeMetricsWidget } from '../../../widgets/ProExchangeMetricsWidget';
import { LinkTelegram } from '../../molecules/LinkTelegram/LinkTelegram';
import { SimpleBox } from '../../molecules/SimpleBox';
import { StudiesList } from '../../molecules/StudiesList/StudiesList';

export const LeftSidePanel = ({
  selectedExchange,
  selectedToken,
  tokensDb,
  onChangeToken,
  onSelectStudy,
  studies,
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
        <SimpleBox title="TOKEN">
          <div className="controls">
            <div className="control">
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
                  onChangeToken(newToken, selectedExchange);
                }}
              />
            </div>
          </div>
        </SimpleBox>
        <SimpleBox title="METRIC">
          <div className="controls">
            <div className="control">
              <StudiesList studies={studies} onSelectStudy={onSelectStudy} />
              {/* {renderStudies(studies)} */}
            </div>
          </div>
        </SimpleBox>
        <SimpleBox title="EXCHANGE">
          <div className="controls">
            <div className="control">
              <div className="exchanges">
                <ExchangeList
                  selectedExchange={selectedExchange}
                  exchanges={tokensDb.getExchangesList()}
                  onChangeExchange={newExchange => {
                    onChangeToken(selectedToken, newExchange);
                  }}
                />
              </div>
            </div>
          </div>
        </SimpleBox>
      </div>
      <style jsx>
        {`
          .metrics {
            padding-bottom: 10px;
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
          }
          .cat-link {
            padding-bottom: 10px;
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
  onChangeToken: PropTypes.func.isRequired,
  onSelectStudy: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
  studies: PropTypes.objectOf(PropTypes.object).isRequired,
};