const corsProxy = 'https://no-cors.endpoint.network:1234';
export const wsRootUrl = 'wss://api-pub.ethfinex.com/ws/2';
export const restRootUrl = `${corsProxy}/https://api-pub.bitfinex.com/v2`;
export const timeFrames = {
  // '1m': '1m',
  // '5m': '5m',
  // '15m': '15m',
  // '30m': '30m',
  '1h': '1h',
  '3h': '3h',
  '6h': '6h',
  '12h': '12h',
  '1D': '1D',
  '7D': '7D',
  '14D': '14D',
  '1M': '1M',
};

export const ERROR = {
  NO_INIT_PAIRS_DEFINED: 'No trading pairs defined.',
  NO_CONFIGURATION_PROVIDED: 'No configuration provided.',
  NO_TIME_FRAME_PROVIDED: 'No time frame provided.',
  PAIR_ALREADY_DEFINED: 'Pair already defined.',
  PAIR_NOT_DEFINED: 'Pair not defined.',
  PAIR_IS_NOT_ARRAY: 'Pair must be an array with base ccy and quote ccy.',
  SERVICE_IS_RUNNING: 'The service is already running.',
};
