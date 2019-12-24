import { API_METRICS } from '../../../../../constants/apiMetrics';

export const BTC_STUDIES = [
  {
    symbol: '#VOLUMEUSD',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_real_usd',
  },
  {
    symbol: '#VOLUMEREAL',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_real',
  },
  {
    symbol: '#VOLUMECHANGEUSD',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_change_usd',
  },
  {
    symbol: '#VOLUMECHANGEREAL',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_change',
  },
  {
    symbol: '#VOLUMEGROSSREALBTC',
    urlSlug: API_METRICS.Volume,
    dataPoint: 'volume_gross',
  },
  {
    symbol: '#AVERAGESIZEBYTES',
    urlSlug: API_METRICS.Fees,
    dataPoint: 'avg_size_bytes',
  },
  {
    symbol: '#AVERAGESATOSHIS',
    urlSlug: API_METRICS.Fees,
    dataPoint: 'avg_satoshis_per_byte',
  },
  {
    symbol: '#<1D',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '<1d',
  },
  {
    symbol: '#1-3M',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '1-3m',
  },
  {
    symbol: '#3-6M',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '3-6m',
  },
  {
    symbol: '#6-12M',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '6-12m',
  },
  {
    symbol: '#12-18M',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '12-18m',
  },
  {
    symbol: '#18-24M',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '18-24m',
  },
  {
    symbol: '#1D-1W',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '1d-1w',
  },
  {
    symbol: '#1W-1M',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '1w-1m',
  },
  {
    symbol: '#2Y-3Y',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '2-3y',
  },
  {
    symbol: '#3Y-5Y',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '3-5y',
  },
  {
    symbol: '#5Y-10Y',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '5-10y',
  },
  {
    symbol: '#>10Y',
    urlSlug: API_METRICS.Utxo,
    dataPoint: '>10y',
  },
  {
    symbol: '#TOTALDAILTYHASHRATE',
    urlSlug: API_METRICS.Hashrate,
    dataPoint: 'total_daily_hashrate',
  },
  {
    symbol: '#TOTALDAILTYBLOCKCOUNT',
    urlSlug: API_METRICS.Hashrate,
    dataPoint: 'total_daily_block_count',
  },
  {
    symbol: '#SOPR',
    urlSlug: API_METRICS.Sopr,
    dataPoint: 'sopr',
  },
];

export const BTC_SYMBOLS = [
  { symbol: '#VOLUMEUSD' },
  { symbol: '#VOLUMEREAL' },
  { symbol: '#VOLUMECHANGEUSD' },
  { symbol: '#VOLUMECHANGEREAL' },
  { symbol: '#VOLUMEGROSSREALBTC' },
  { symbol: '#AVERAGESIZEBYTES' },
  { symbol: '#AVERAGESATOSHIS' },
  { symbol: '#<1D' },
  { symbol: '#1-3M' },
  { symbol: '#3-6M' },
  { symbol: '#6-12M' },
  { symbol: '#12-18M' },
  { symbol: '#18-24M' },
  { symbol: '#1D-1W' },
  { symbol: '#1W-1M' },
  { symbol: '#2Y-3Y' },
  { symbol: '#3Y-5Y' },
  { symbol: '#5Y-10Y' },
  { symbol: '#>10Y' },
  { symbol: '#TOTALDAILTYHASHRATE' },
  { symbol: '#TOTALDAILTYBLOCKCOUNT' },
  { symbol: '#SOPR' },
];
