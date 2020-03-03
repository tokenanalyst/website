import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../../../constants/styles/colors';

export const ChangeCell = ({ value }) => (
  <span
    style={{
      color:
        value < 0
          ? `rgba(${colors.primaryRed}, 1)`
          : `rgba(${colors.primaryGreen}, 1)`,
    }}
  >
    {`${(value && Number(value).toFixed(2)) || '0.00'}%`}
  </span>
);

ChangeCell.propTypes = {
  value: PropTypes.number.isRequired,
};
