import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

import {
  colors,
  PRIMARY_RED,
  PRIMARY_GREEN,
  NEUTRAL_GREY,
} from '../constants/styles/colors';

export const SimpleButton = ({
  background,
  fill,
  loading,
  onClick,
  children,
}) => (
  <div>
    <Button onClick={onClick} fill={fill} loading={loading}>
      {children}
    </Button>
    <style jsx>
      {`
        div > :global(.bp3-button:not([class*='bp3-intent-'])) {
          background-color: rgba(${colors[background]}, 1);
          color: ${background === PRIMARY_GREEN || background === PRIMARY_RED
            ? 'white'
            : 'black'};
          min-width: 110px;
          text-align: center;
          max-height: 40px;
          padding: 10px;
          border-radius: 20px;
          cursor: pointer;
          background-image: none;
          box-shadow: none;
        }
      `}
    </style>
  </div>
);

SimpleButton.propTypes = {
  background: PropTypes.oneOf([PRIMARY_RED, PRIMARY_GREEN, NEUTRAL_GREY]),
  children: PropTypes.node.isRequired,
  fill: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

SimpleButton.defaultProps = {
  background: NEUTRAL_GREY,
  fill: false,
  loading: false,
};
