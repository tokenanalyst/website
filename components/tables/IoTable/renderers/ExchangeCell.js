import { EXCHANGE_IMAGES } from '../../../../constants/image-paths';
import { EXCHANGE_NAMES } from '../../../../constants/exchanges';
import { Icon } from '@blueprintjs/core';

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
        src={`/static/png/${EXCHANGE_IMAGES[value]}`}
        alt={`Exchange ${EXCHANGE_IMAGES[value]}`}
      />
      {EXCHANGE_NAMES[value]}
    </span>
    <Icon icon="chart" iconSize={12} color={`rgba(${colors.primaryGreen})`} />
  </span>
);
