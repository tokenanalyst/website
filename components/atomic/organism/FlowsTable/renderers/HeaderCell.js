import PropTypes from 'prop-types';
import React from 'react';

export const HeaderCell = ({ value }) => (
  <div style={{ fontWeight: 'bold', textAlign: 'left' }}>{value}</div>
);

HeaderCell.propTypes = {
  value: PropTypes.number.isRequired,
};
