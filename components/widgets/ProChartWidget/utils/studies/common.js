import { API_METRICS } from '../../../../../constants/apiMetrics';

export const COMMON_STUDIES = [
  {
    symbol: '#TRANSACTIONS',
    urlSlug: API_METRICS.Transactions,
    dataPoint: 'number_of_txns',
  },
  {
    symbol: '#ACTIVESENDERS',
    urlSlug: API_METRICS.Addresses,
    dataPoint: 'active_senders',
  },
  {
    symbol: '#ACTIVERECIPIENTS',
    urlSlug: API_METRICS.Addresses,
    dataPoint: 'active_recipients',
  },
  {
    symbol: '#SUPPLY',
    urlSlug: API_METRICS.Supply,
    dataPoint: 'supply',
  },
  {
    symbol: '#NVT',
    urlSlug: API_METRICS.Nvt,
    dataPoint: 'supply',
  },
  {
    symbol: '#MARKETCAP',
    urlSlug: API_METRICS.Nvt,
    dataPoint: 'supply',
  },
  {
    symbol: '#TOTALFEESREAL',
    urlSlug: API_METRICS.Fees,
    dataPoint: 'total_fee',
  },
  {
    symbol: '#TOTALFEESUSD',
    urlSlug: API_METRICS.Fees,
    dataPoint: 'total_fee_usd',
  },
  {
    symbol: '#AVERAGEFEESREAL',
    urlSlug: API_METRICS.Fees,
    dataPoint: 'avg_fee',
  },
  {
    symbol: '#AVERAGEFEESUSD',
    urlSlug: API_METRICS.Fees,
    dataPoint: 'avg_fee_usd',
  },
];

export const COMMON_SYMBOLS = [
  { symbol: '#TRANSACTIONS' },
  { symbol: '#ACTIVESENDERS' },
  { symbol: '#ACTIVERECIPIENTS' },
  { symbol: '#SUPPLY' },
  { symbol: '#NVT' },
  { symbol: '#MARKETCAP' },
  { symbol: '#TOTALFEESREAL' },
  { symbol: '#TOTALFEESUSD' },
  { symbol: '#AVERAGEFEESREAL' },
  { symbol: '#AVERAGEFEESUSD' },
];
