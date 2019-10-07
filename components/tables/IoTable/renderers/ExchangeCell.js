import { Icon } from '@blueprintjs/core';
import { EXCHANGE_IMAGES } from '../../../../constants/image-paths';
import { EXCHANGE_NAMES, BITMEX } from '../../../../constants/exchanges';

import { colors } from '../../../../constants/styles/colors';

const formatName = name => (name === 'Bitmex' ? BITMEX : name);

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
        src={`/static/png/${EXCHANGE_IMAGES[formatName(value)]}`}
        alt={`Exchange ${EXCHANGE_IMAGES[formatName(value)]}`}
      />
      {EXCHANGE_NAMES[formatName(value)]}
    </span>
    <Icon icon="chart" iconSize={12} color={`rgba(${colors.primaryGreen})`} />
  </span>
);
