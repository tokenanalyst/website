import PropTypes from 'prop-types';
import React from 'react';
import { ProgressBar } from '@blueprintjs/core';
import { Intent } from '../constants/styles/colors';

export const SimpleProgressBar = ({ animate, stripes, value, intent }) => (
  <ProgressBar
    animate={animate}
    stripes={stripes}
    value={value}
    intent={intent}
  />
);

SimpleProgressBar.propTypes = {
  animate: PropTypes.bool,
  stripes: PropTypes.bool,
  value: PropTypes.number,
  intent: PropTypes.oneOf([
    Intent.NONE,
    Intent.PRIMARY,
    Intent.SUCCESS,
    Intent.WARNING,
    Intent.ERROR,
  ]),
};

SimpleProgressBar.defaultProps = {
  animate: false,
  stripes: false,
  value: 0,
  intent: Intent.NONE,
};
