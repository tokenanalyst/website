import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';

import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import { MenuItem, Menu } from '@blueprintjs/core';
import css from 'styled-jsx/css';
import { TokenSelect } from './TokenSelect';
import { ExchangeList } from './ExchangeList';
import { ExchangeMetricsWidget } from '../../../widgets/ProExchangeMetricsWidget';
import { LinkTelegram } from '../../molecules/LinkTelegram/LinkTelegram';
import { SimpleBox } from '../../molecules/SimpleBox';

const { className, styles } = css.resolve`
  a {
    color: green;
  }
`;

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

  const renderExchange = (metric, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={metric.name}
        label={metric.name}
        onClick={handleClick}
        text={`${metric.name}`}
        shouldDismissPopover={false}
      />
    );
  };

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
                  onChange(newToken, selectedExchange);
                }}
              />
            </div>
          </div>
        </SimpleBox>
        <SimpleBox title="METRIC">
          <div className="controls">
            <div className="control">
              {/* <MultiSelect
                // createNewItemFromQuery={maybeCreateNewItemFromQuery}
                // createNewItemRenderer={maybeCreateNewItemRenderer}
                // initialContent={initialContent}
                itemRenderer={renderExchange}
                // itemsEqual={areFilmsEqual}
                // we may customize the default filmSelectProps.items by
                // adding newly created items to the list, so pass our own
                items={[
                  { name: 'Price' },
                  { name: 'Volume' },
                  { name: 'Flows' },
                ]}
                noResults={<MenuItem disabled text="No results." />}
                onItemSelect={() => null}
                // onItemsPaste={this.handleFilmsPaste}
                popoverProps={{ minimal: true }}
                tagRenderer={exchange => exchange.name}
                // tagInputProps={{
                //   tagProps: getTagProps,
                //   onRemove: this.handleTagRemove,
                //   rightElement: clearButton,
                // }}
                // selectedItems={this.state.films}
                fill
                placeholder="Select..."
              /> */}
              <Menu>
                <MenuItem text="Price" active />
                <MenuItem text="Volume" active />
                <MenuItem text="Flows" />
                <MenuItem text="Balances" className={className} />
              </Menu>
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
                    onChange(selectedToken, newExchange);
                  }}
                />
              </div>
            </div>
          </div>
        </SimpleBox>
      </div>
      {styles}
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
  onChange: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
};
