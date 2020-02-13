import PropTypes from 'prop-types';
import React from 'react';
import { Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { colors, colorsHex } from '../../../../constants/styles/colors';

export const SimpleMenuItem = ({ text, selected }) => {
  return (
    <div className="container">
      <div className="">{text}</div>
      <div className="">
        <Icon
          icon={IconNames.SYMBOL_CIRCLE}
          color={selected ? colorsHex.primaryGreen : colorsHex.neutralGrey}
          iconSize={14}
        />
      </div>
      <style jsx>
        {`
          .item {
          }
          .container {
            display: flex;
            justify-content: space-between;
          }
          .container:hover {
            opacity: 0.5;
          }
          .item-selected {
            border-bottom: 2px solid rgba(${colors.primaryGreen}, 1);
            display: inline-block;
          }
        `}
      </style>
    </div>
  );
};

SimpleMenuItem.propTypes = {
  selected: PropTypes.bool,
  text: PropTypes.node.isRequired,
};

SimpleMenuItem.defaultProps = {
  selected: false,
};
