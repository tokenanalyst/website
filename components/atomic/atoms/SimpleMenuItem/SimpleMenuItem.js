import PropTypes from 'prop-types';
import React from 'react';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { colorsHex } from '../../../../constants/styles/colors';

export const SimpleMenuItem = ({ text, selected }) => {
  return (
    <div className="container">
      <div>{text}</div>
      <div>
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
            width: 100%;
          }
          .container:hover {
            opacity: 0.5;
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
