import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Button } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

const createList = list => ({
  items: list,
  itemRenderer: (item, itemProps) => {
    return (
      <div onClick={itemProps.handleClick} key={item} role="button">
        {item}
      </div>
    );
  },
});

export const TokenSelect = ({ selectedToken, tokensList, onItemSelect }) => {
  const list = useMemo(() => createList(tokensList), [tokensList]);

  return (
    <Select
      items={list.items}
      filterable
      itemRenderer={list.itemRenderer}
      popoverProps={{
        minimal: true,
      }}
      onItemSelect={onItemSelect}
      itemPredicate={(query, item) => {
        return item.includes(query.toUpperCase());
      }}
    >
      <Button text={selectedToken} rightIcon="double-caret-vertical" />
    </Select>
  );
};

TokenSelect.propTypes = {
  tokensList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedToken: PropTypes.string.isRequired,
};
