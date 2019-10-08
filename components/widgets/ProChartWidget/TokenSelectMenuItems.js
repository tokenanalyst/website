import PropTypes from 'prop-types';
import React from 'react';
import { Menu, Divider } from '@blueprintjs/core';
import { Scrollbars } from 'react-custom-scrollbars';

const renderGroupItems = (tokens, query, renderItemFn) =>
  Object.values(tokens)
    .filter(item => item.symbol.includes(query.toUpperCase()))
    .map(token => {
      return (
        <div key={token.symbol} className="container">
          <div className="token">{renderItemFn(token.symbol)}</div>
          <style jsx>
            {`
              .container {
                cursor: pointer;
              }
              .token {
                padding-top: 5px;
              }
            `}
          </style>
        </div>
      );
    });

const renderTokens = (groups, tokens, renderItemFn, query) =>
  groups.map((group, index) => {
    const menuItems = renderGroupItems(tokens[index], query, renderItemFn);

    return (
      <div key={group}>
        <div className="header">
          <div>{group}</div>
          <div className="items-number">{`(${menuItems.length})`}</div>
        </div>
        <Divider />
        <div className={menuItems.length ? menuItems : 'no-results'}>
          {menuItems.length ? menuItems : 'No results'}
        </div>
        <style jsx>
          {`
            .header {
              padding-top: 10px;
              padding-left: 5px;
              font-weight: 700;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .no-results {
              opacity: 0.6;
              padding-left: 5px;
            }
            .items-number {
              font-weight: 400;
              font-size: 12px;
              opacity: 0.6;
              padding-right: 6px;
            }
          `}
        </style>
      </div>
    );
  });

export const TokenSelectMenuItems = ({
  groups,
  tokens,
  renderItemFn,
  query,
}) => (
  <>
    <div className="container">
      <Menu style={{ height: '400px' }}>
        <Scrollbars
          autoHideTimeout={1000}
          renderThumbHorizontal={({ style, ...props }) => (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              style={{
                ...style,
                opacity: '0.9',
              }}
            />
          )}
        >
          <div className="token-list">
            {renderTokens(groups, tokens, renderItemFn, query)}
          </div>
        </Scrollbars>
      </Menu>
    </div>
    <style jsx>
      {`
        .token-list {
          padding: 5px;
          height: 400px;
        }
        .token {
          padding: 5px;
        }
      `}
    </style>
  </>
);

TokenSelectMenuItems.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItemFn: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};
