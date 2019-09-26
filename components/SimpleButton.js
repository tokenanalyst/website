import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

import {
  colors,
  PRIMARY_RED,
  PRIMARY_GREEN,
  NEUTRAL_GREY,
} from '../constants/styles/colors';

export const SimpleButton = ({ backGrounColor, children, onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>{children}</Button>
      <style jsx>{`
        div > :global(.bp3-button:not([class*='bp3-intent-'])) {
          background-color: rgba(${colors[backGrounColor]}, 1);
          color: ${backGrounColor === PRIMARY_GREEN ? 'white' : 'black'};
          min-width: 110px;
          text-align: center;
          max-height: 40px;
          padding: 10px;
          border-radius: 20px;
          cursor: pointer;
          background-image: none;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

SimpleButton.propTypes = {
  backGrounColor: PropTypes.oneOf([PRIMARY_RED, PRIMARY_GREEN, NEUTRAL_GREY]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

SimpleButton.defaultProps = {
  backGrounColor: NEUTRAL_GREY,
  onClick: () => null,
};
