import { COIN_IMAGES } from '../../../../constants/image-paths';

export const CoinCell = ({ value }) => (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <img
      style={{ height: '16px', width: '20px', paddingRight: '5px' }}
      src={`/static/png/coins/${COIN_IMAGES[value]}`}
      alt={`Token ${COIN_IMAGES[value]}`}
    />
    {value}
  </span>
);
