import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';

import { TokenSelect } from '../TokenSelect/TokenSelect';
import { EntityList } from '../../molecules/EntityList';
import { ExchangeMetricsWidget } from '../../../widgets/ProExchangeMetricsWidget';
import { LinkTelegram } from '../../molecules/LinkTelegram/LinkTelegram';
import { SimpleBox } from '../../molecules/SimpleBox';
import { StudiesList } from '../../molecules/StudiesList/StudiesList';

const makeEntitiesList = entities => {
  return Object.values(entities).reduce((acc, entity) => {
    return [
      ...acc,
      { value: entity, label: entity, incon: null, helpText: null },
    ];
  }, []);
};

export const LeftSidePanelExchanges = ({
  onChangeToken,
  onSelectStudy,
  selectedExchange,
  selectedToken,
  supportedExchanges,
  studies,
  tokensDb,
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
          key={`metrics${selectedToken}${selectedExchange}`}
          token={selectedToken}
          exchange={selectedExchange}
        />
      </div>
      <div className="controls-container">
        <SimpleBox title="TOKEN">
          <div className="controls">
            <div className="control">
              <TokenSelect
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
            </div>
          </div>
        </SimpleBox>
        <SimpleBox title="EXCHANGE">
          <div className="controls">
            <div className="control">
              <div className="exchanges">
                <EntityList
                  selectedEntity={selectedExchange}
                  entities={makeEntitiesList(supportedExchanges)}
                  onChangeExchange={newExchange => {
                    onChangeToken(selectedToken, newExchange);
                  }}
                  entityType="exchange"
                />
              </div>
            </div>
          </div>
        </SimpleBox>
      </div>
      <style jsx>
        {`
          .metrics {
            padding-top: 5px;
            padding-bottom: 15px;
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
            .metrics {
              padding-bottom: 10px;
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

LeftSidePanelExchanges.propTypes = {
  onChangeToken: PropTypes.func.isRequired,
  onSelectStudy: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
  supportedExchanges: PropTypes.objectOf(PropTypes.string).isRequired,
  studies: PropTypes.objectOf(PropTypes.object).isRequired,
};
