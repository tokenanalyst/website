import { API_METRICS } from '../../constants/apiMetrics';

export const ERC20_STUDIES = [
  {
    symbol: '#ERC20VOLUME',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume',
  },
  {
    symbol: '#ERC20VOLUMEUSD',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_usd',
  },
];

export const ERC20_SYMBOLS = [
  { symbol: '#ERC20VOLUME' },
  { symbol: '#ERC20VOLUMEUSD' },
];
