import PropTypes from 'prop-types';
import React from 'react';

import numeral from 'numeral';

export const AmountCell = ({ value, units }) => (
  <div style={{ textAlign: 'right' }}>
    {units === 'USD' ? '$' : ''}
    {numeral(value).format('0,0') || '0'}
  </div>
);

AmountCell.propTypes = {
  value: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired,
};
