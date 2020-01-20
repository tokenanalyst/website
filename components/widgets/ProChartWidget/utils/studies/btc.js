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
    symbol: '#TOTALDAILTYHASHRATEBTC',
    urlSlug: API_METRICS.HashrateBtc,
    dataPoint: 'hashrate',
  },
  {
    symbol: '#TOTALDAILTYBLOCKCOUNTBTC',
    urlSlug: API_METRICS.HashrateBtc,
    dataPoint: 'block_count',
  },
  {
    symbol: '#SOPR',
    urlSlug: API_METRICS.Sopr,
    dataPoint: 'sopr',
  },
  {
    symbol: '#BTCNEWADDRESS',
    urlSlug: API_METRICS.NewAddress,
    dataPoint: 'number_of_new_addresses',
  },
  {
    symbol: '#BTCNEWADDRESSTOTAL',
    urlSlug: API_METRICS.NewAddress,
    dataPoint: 'total_number_of_addresses',
  },
  {
    symbol: '#BALANCE>0',
    urlSlug: API_METRICS.AddressBalances,
    dataPoint: 'balance_greater_than_0',
  },
  {
    symbol: '#BALANCE>1',
    urlSlug: API_METRICS.AddressBalances,
    dataPoint: 'balance_greater_than_1',
  },
  {
    symbol: '#BALANCE>10',
    urlSlug: API_METRICS.AddressBalances,
    dataPoint: 'balance_greater_than_10',
  },
  {
    symbol: '#BALANCE>100',
    urlSlug: API_METRICS.AddressBalances,
    dataPoint: 'balance_greater_than_100',
  },
  {
    symbol: '#BALANCE>1000',
    urlSlug: API_METRICS.AddressBalances,
    dataPoint: 'balance_greater_than_1000',
  },
  {
    symbol: '#BALANCE>10000',
    urlSlug: API_METRICS.AddressBalances,
    dataPoint: 'balance_greater_than_10000',
  },
  {
    symbol: '#TOTALDAILTYBLOCKREWARDBTC',
    urlSlug: API_METRICS.RewardsBtc,
    dataPoint: 'block_reward',
  },
  {
    symbol: '#TOTALDAILTYBLOCKREWARDUSDBTC',
    urlSlug: API_METRICS.RewardsBtc,
    dataPoint: 'block_reward_usd',
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
  { symbol: '#TOTALDAILTYHASHRATEBTC' },
  { symbol: '#TOTALDAILTYBLOCKCOUNTBTC' },
  { symbol: '#SOPR' },
  { symbol: '#BTCNEWADDRESS' },
  { symbol: '#BTCNEWADDRESSTOTAL' },
  { symbol: '#BALANCE>0' },
  { symbol: '#BALANCE>1' },
  { symbol: '#BALANCE>10' },
  { symbol: '#BALANCE>100' },
  { symbol: '#BALANCE>1000' },
  { symbol: '#BALANCE>10000' },
  { symbol: '#TOTALDAILTYBLOCKREWARDBTC' },
  { symbol: '#TOTALDAILTYBLOCKREWARDUSDBTC' },
];
