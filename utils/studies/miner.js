import { API_METRICS } from '../../constants/apiMetrics';

export const MINER_STUDIES = [
  {
    symbol: '#MINER_HASHRATE',
    urlSlug: API_METRICS.MinerHashrate,
    dataPoint: 'hashrate',
  },
  {
    symbol: '#MINER_REWARD',
    urlSlug: API_METRICS.MinerRewards,
    dataPoint: 'block_reward',
  },
  //  {
  //    symbol: '#MINER_FLOWS',
  //    urlSlug: API_METRICS.MinerFlow,
  //    dataPoint: 'number_of_txns',
  //  },
  {
    symbol: '#MINER_BALANCES',
    urlSlug: API_METRICS.MinerBalances,
    dataPoint: 'balance',
  },
];

export const MINER_SYMBOLS = [
  { symbol: '#MINER_HASHRATE' },
  { symbol: '#MINER_REWARD' },
  // { symbol: '#MINER_FLOWS' },
  { symbol: '#MINER_BALANCES' },
];
