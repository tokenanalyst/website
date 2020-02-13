import PropTypes from 'prop-types';
import React from 'react';
import { colors } from '../../../../constants/styles/colors';

export const SimpleMenuItem = ({ text, selected }) => {
  return (
    <>
      <div className={`${selected ? 'item-selected' : 'item'}`}>{text}</div>
      <style jsx>
        {`
          .item {
          }
          .item-selected {
            border-bottom: 2px solid rgba(${colors.primaryGreen}, 1);
            display: inline-block;
          }
        `}
      </style>
    </>
  );
};

SimpleMenuItem.propTypes = {
  selected: PropTypes.bool,
  text: PropTypes.node.isRequired,
};

SimpleMenuItem.defaultProps = {
  selected: false,
};
