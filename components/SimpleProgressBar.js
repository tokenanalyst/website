import PropTypes from 'prop-types';
import React from 'react';
import { ProgressBar } from '@blueprintjs/core';
import { Intent } from '../constants/styles/colors';

export const SimpleProgressBar = ({ isAnimate, isStripes, value, intent }) => (
  <ProgressBar
    animate={isAnimate}
    stripes={isStripes}
    value={value}
    intent={intent}
  />
);

SimpleProgressBar.propTypes = {
  isAnimate: PropTypes.bool,
  isStripes: PropTypes.bool,
  value: PropTypes.number,
  intent: PropTypes.oneOf([
    Intent.DANGER,
    Intent.NONE,
    Intent.PRIMARY,
    Intent.SUCCESS,
    Intent.WARNING,
  ]),
};

SimpleProgressBar.defaultProps = {
  isAnimate: false,
  isStripes: false,
  value: 0,
  intent: Intent.NONE,
};
