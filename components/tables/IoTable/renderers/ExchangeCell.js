import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import { EXCHANGE_IMAGES } from '../../../../constants/image-paths';
import {
  EXCHANGE_NAMES,
  EXCHANGE_DISPLAY_NAME,
} from '../../../../constants/exchanges';

import { colors } from '../../../../constants/styles/colors';

export const ExchangeCell = ({ value }) => (
  <span
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <span>
      <img
        style={{ height: '16px', width: '20px', paddingRight: '5px' }}
        src={`/static/png/${
          EXCHANGE_IMAGES[EXCHANGE_DISPLAY_NAME[value] || value]
        }`}
        alt={`Exchange ${
          EXCHANGE_IMAGES[EXCHANGE_DISPLAY_NAME[value] || value]
        }`}
      />
      {EXCHANGE_NAMES[EXCHANGE_DISPLAY_NAME[value] || value]}
    </span>
    <Icon icon="chart" iconSize={12} color={`rgba(${colors.primaryGreen})`} />
  </span>
);

ExchangeCell.propTypes = {
  value: PropTypes.string.isRequired,
};
