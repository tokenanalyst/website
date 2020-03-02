import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';
import { Icon } from '@blueprintjs/core';

import { TokenSelect } from '../TokenSelect/TokenSelect';
import { EntityList } from '../../molecules/EntityList';
import { LinkTelegram } from '../../molecules/LinkTelegram/LinkTelegram';
import { SimpleBox } from '../../molecules/SimpleBox';
import { StudiesList } from '../../molecules/StudiesList/StudiesList';
import { EntityLogo } from '../../molecules/EntityLogo';
import { MINNER_FORMATTED_NAMES } from '../../../../constants';

const makeEntitiesList = entities => {
  return Object.values(entities).reduce((acc, entity) => {
    const icons = {
      others: {
        helpText:
          'All other mining entities we have labelled (grouped into one category due to their relatively smaller size)',
        icon: <Icon icon="help" />,
      },
      unknown: {
        helpText:
          'Miner addresses that we haven’t labelled yet but have received block rewards',
        icon: <Icon icon="help" />,
      },
    };
    const icon = icons[entity] ? icons[entity].icon : null;
    const helpText = icons[entity] ? icons[entity].helpText : null;

    return [
      ...acc,
      {
        value: entity,
        label: MINNER_FORMATTED_NAMES[entity] || entity,
        icon,
        helpText,
      },
    ];
  }, []);
};

export const LeftSidePanelMiners = ({
  onChangeToken,
  onSelectStudy,
  selectedMiner,
  selectedToken,
  supportedMiners,
  tokensList,
  studies,
}) => {
  return (
    <div className="container">
      <div className="cat">
        <LinkTelegram />
      </div>
      <div className="metrics">
        <EntityLogo
          tokenSymbol={selectedToken}
          entityName={MINNER_FORMATTED_NAMES[selectedMiner] || selectedMiner}
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
                  onChangeToken(newToken, selectedMiner);
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
        <SimpleBox title="MINER">
          <div className="controls">
            <div className="control">
              <div className="entities">
                <EntityList
                  selectedEntity={selectedMiner}
                  entities={makeEntitiesList(supportedMiners)}
                  onChangeExchange={newExchange => {
                    onChangeToken(selectedToken, newExchange);
                  }}
                  isMiner
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
          .entities {
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

LeftSidePanelMiners.propTypes = {
  onChangeToken: PropTypes.func.isRequired,
  onSelectStudy: PropTypes.func.isRequired,
  selectedMiner: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensList: PropTypes.arrayOf(PropTypes.object).isRequired,
  supportedMiners: PropTypes.objectOf(PropTypes.string).isRequired,
  studies: PropTypes.objectOf(PropTypes.object).isRequired,
};
