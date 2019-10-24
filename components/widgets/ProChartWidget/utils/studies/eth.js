import { API_METRICS } from '../../../../../constants/apiMetrics';

export const ETH_STUDIES = [
  {
    symbol: '#VOLUMEINTERNALREAL',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_internal',
  },
  {
    symbol: '#VOLUMEINTERNALUSD',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_internal_usd',
  },
  {
    symbol: '#VOLUMEEXTERNALREAL',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_external',
  },
  {
    symbol: '#VOLUMEEXTERNALUSD',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_external_usd',
  },
  {
    symbol: '#VOLUMEGROSSREAL',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_gross',
  },
  {
    symbol: '#VOLUMEGROSSUSD',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_gross_usd',
  },
  {
    symbol: '#AVERAGEGAS',
    urlSlug: API_METRICS.Fees,
    dataPoint: 'avg_gas',
  },
  {
    symbol: '#AVERAGEGASPRICEWEI',
    urlSlug: API_METRICS.Fees,
    dataPoint: 'avg_gas_price_wei',
  },
];
export const ETH_SYMBOLS = [
  { symbol: '#VOLUMEINTERNALREAL' },
  { symbol: '#VOLUMEINTERNALUSD' },
  { symbol: '#VOLUMEEXTERNALREAL' },
  { symbol: '#VOLUMEEXTERNALUSD' },
  { symbol: '#VOLUMEGROSSREAL' },
  { symbol: '#VOLUMEGROSSUSD' },
  { symbol: '#AVERAGEGAS' },
  { symbol: '#AVERAGEGASPRICEWEI' },
];