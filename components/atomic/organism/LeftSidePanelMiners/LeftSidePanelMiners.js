import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';

import { TokenSelect } from '../TokenSelect/TokenSelect';
import { ExchangeList } from '../../molecules/ExchangeList';
import { ExchangeMetricsWidget } from '../../../widgets/ProExchangeMetricsWidget';
import { LinkTelegram } from '../../molecules/LinkTelegram/LinkTelegram';
import { SimpleBox } from '../../molecules/SimpleBox';
import { StudiesList } from '../../molecules/StudiesList/StudiesList';

export const LeftSidePanelMiners = ({
  onChangeToken,
  onSelectStudy,
  selectedMiner,
  selectedToken,
  studies,
  tokensDb,
}) => {
  const {
    tokens: {
      groupName: { NATIVE, STABLE, ERC20 },
    },
  } = tokensDb;

  const nativeTokens = tokensDb.getTokensList(NATIVE, selectedMiner);
  const stableTokens = tokensDb.getTokensList(STABLE, selectedMiner);
  const erc20Tokens = tokensDb.getTokensList(ERC20, selectedMiner);

  console.log(nativeTokens, stableTokens, erc20Tokens);

  const tokensList = [nativeTokens, stableTokens, erc20Tokens];

  return (
    <div className="container">
      <div className="cat">
        <LinkTelegram />
      </div>
      <div className="controls-container">
        <SimpleBox title="TOKEN">
          <div className="controls">
            <div className="control">
              {/* <TokenSelect
                items={tokensList}
                groups={['Native coins', 'Stablecoins', 'ERC20 tokens']}
                selectedToken={selectedToken}
                onItemSelect={newToken => {
                  ReactGA.event({
                    category: 'User',
                    action: `Pro Chart change token ${newToken}`,
                    label: `Pro Charts`,
                  });
                  onChangeToken(newToken, selectedMiner);
                }}
              /> */}
            </div>
          </div>
        </SimpleBox>
        <SimpleBox title="METRIC">
          <div className="controls">
            <div className="control">
              <StudiesList studies={studies} onSelectStudy={onSelectStudy} />
            </div>
          </div>
        </SimpleBox>
        <SimpleBox title="MINER">
          <div className="controls">
            <div className="control">
              <div className="exchanges">
                {/* <ExchangeList
                  selectedExchange={selectedExchange}
                  exchanges={tokensDb.getExchangesList()}
                  onChangeExchange={newExchange => {
                    onChangeToken(selectedToken, newExchange);
                  }}
                /> */}
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
               {
                /* margin: auto; */
              }
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

LeftSidePanelMiners.propTypes = {
  onChangeToken: PropTypes.func.isRequired,
  onSelectStudy: PropTypes.func.isRequired,
  selectedMiner: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
  studies: PropTypes.objectOf(PropTypes.object).isRequired,
};
