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
  {
    symbol: '#TOTALDAILTYHASHRATEETH',
    urlSlug: API_METRICS.Hashrate,
    dataPoint: 'total_daily_hashrate',
  },
  {
    symbol: '#TOTALDAILTYBLOCKCOUNTETH',
    urlSlug: API_METRICS.Hashrate,
    dataPoint: 'total_daily_block_count',
  },
  {
    symbol: '#TOTALDAILTYUNCLECOUNT',
    urlSlug: API_METRICS.Hashrate,
    dataPoint: 'total_daily_uncle_count',
  },
  {
    symbol: '#TOTALDAILTYUNCLEPERCENT',
    urlSlug: API_METRICS.Hashrate,
    dataPoint: 'total_daily_uncle_pct',
  },
  {
    symbol: '#TOTALDAILTYUNCLEREWARD',
    urlSlug: API_METRICS.Rewards,
    dataPoint: 'miner_daily_uncle_reward',
  },
  {
    symbol: '#TOTALDAILTYUNCLEREWARDUSD',
    urlSlug: API_METRICS.Rewards,
    dataPoint: 'miner_daily_uncle_reward_usd',
  },
  {
    symbol: '#ETHNEWADDRESS',
    urlSlug: API_METRICS.NewAddress,
    dataPoint: 'number_of_new_addresses',
  },
  {
    symbol: '#ETHNEWADDRESSTOTAL',
    urlSlug: API_METRICS.NewAddress,
    dataPoint: 'total_number_of_addresses',
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
  { symbol: '#TOTALDAILTYUNCLECOUNT' },
  { symbol: '#TOTALDAILTYUNCLEPERCENT' },
  { symbol: '#TOTALDAILTYUNCLEREWARD' },
  { symbol: '#TOTALDAILTYUNCLEREWARDUSD' },
  { symbol: '#ETHNEWADDRESS' },
  { symbol: '#ETHNEWADDRESSTOTAL' },
];
