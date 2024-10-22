import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Button } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { TokenSelectMenuItems } from '../../atoms/TokenSelectMenuItems/TokenSelectMenuItems';
import { TokenIcon } from '../../../TokenIcon';

const createList = (listItems, groups) => ({
  items: listItems,
  itemRenderer: (item, itemProps) => {
    return (
      <TokenIcon
        token={item}
        key={item}
        hasText
        size={24}
        onClick={itemProps.handleClick}
      />
    );
  },
  itemListRenderer: ({ items, renderItem, query }) => (
    <TokenSelectMenuItems
      groups={groups}
      tokens={items}
      renderItemFn={renderItem}
      query={query}
    />
  ),
});

export const TokenSelect = ({ groups, items, onItemSelect, selectedToken }) => {
  const select = useMemo(() => createList(items, groups), [items, groups]);

  return (
    <>
      <Select
        items={select.items}
        filterable
        itemRenderer={select.itemRenderer}
        itemListRenderer={select.itemListRenderer}
        popoverProps={{
          minimal: true,
          fill: true,
        }}
        onItemSelect={onItemSelect}
      >
        <Button
          style={{ justifyContent: 'space-between' }}
          text={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <TokenIcon
              token={selectedToken}
              key={selectedToken}
              hasText
              size={24}
            />
          }
          fill
          rightIcon="double-caret-vertical"
        />
      </Select>
    </>
  );
};

TokenSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedToken: PropTypes.string.isRequired,
};
