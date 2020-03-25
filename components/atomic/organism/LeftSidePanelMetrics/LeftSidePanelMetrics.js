import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';

import { TokenSelect } from '../TokenSelect/TokenSelect';
import { LinkTelegram } from '../../molecules/LinkTelegram/LinkTelegram';
import { SimpleBox } from '../../molecules/SimpleBox';
import { EntityLogo } from '../../molecules/EntityLogo';
import { MetricsList } from '../MetricsList';

export const LeftSidePanelMetrics = ({
  onChangeToken,
  selectedToken,
  tokensList,
  tokenName,
  selectedIndicator,
  setSelectedIndicator,
}) => {
  return (
    <div className="container">
      <div className="cat">
        <LinkTelegram />
      </div>
      <div className="metrics">
        <EntityLogo tokenSymbol={selectedToken} entityName={tokenName} />
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
                    action: `Metrics Page change token ${newToken}`,
                    label: `Metrics Page`,
                  });
                  onChangeToken(newToken);
                }}
              />
            </div>
          </div>
        </SimpleBox>
        <SimpleBox title="METRIC">
          <div className="controls">
            <div className="control">
              <MetricsList
                token={selectedToken}
                selectedIndicator={selectedIndicator}
                setSelectedIndicator={setSelectedIndicator}
              />
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

LeftSidePanelMetrics.propTypes = {
  onChangeToken: PropTypes.func.isRequired,
  tokenName: PropTypes.string.isRequired,
  selectedIndicator: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  ).isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedIndicator: PropTypes.func.isRequired,
};
