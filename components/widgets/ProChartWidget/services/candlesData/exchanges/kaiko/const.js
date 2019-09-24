export const wsRootUrl = 'wss://eu.market-ws.kaiko.io/v2/rpc';
export const restRootUrl =
  'https://eu.market-api.kaiko.io/v1/data/trades.v1/exchanges';

export const restRootUrlTAProxy =
  process.env.NODE_ENV !== 'development'
    ? 'https://www.tokenanalyst.io/api'
    : `http://localhost:${process.env.PORT || 3000}/api`;

export const timeFrames = {
  '1m': '1m',
  '5m': '5m',
  '15m': '15m',
  '30m': '30m',
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
  API_KEY_NOT_PROVIDED: 'Api Key not provided',
  EXCHANGE_NOT_SUPPORTED: 'Exchange not supported',
};

export const KAIKO_EXCHANGES_MAP = {
  binance: {
    code: 'bnce',
    name: 'Binance',
  },
  bitfinex: {
    code: 'bfnx',
    name: 'Bitfinex',
  },
  bitstamp: {
    code: 'stmp',
    name: 'Bitstamp',
  },
  bitmex: {
    code: 'btmx',
    name: 'BitMEX',
  },
  kraken: {
    code: 'krkn',
    name: 'Kraken',
  },
  poloniex: {
    code: 'polo',
    name: 'Poloniex',
  },
  bittrex: {
    code: 'btrx',
    name: 'Bittrex',
  },
  okex: {
    code: 'okex',
    name: 'OkEX',
  },
  kucoin: {
    code: 'kcon',
    name: 'KuCoin',
  },
};

export const KAIKO_EXCHANGES = [
  {
    kaikocode: 'abts',
    name: 'AnyBits',
    kaiko_legacy_slug: 'ab',
  },
  {
    code: 'acxi',
    name: 'ACX',
    kaiko_legacy_slug: 'ax',
  },
  {
    code: 'alcn',
    name: 'Allcoin',
    kaiko_legacy_slug: 'al',
  },
  {
    code: 'bbox',
    name: 'Bibox',
    kaiko_legacy_slug: 'bx',
  },
  {
    code: 'bcex',
    name: 'BCEX',
    kaiko_legacy_slug: 'yy',
  },
  {
    code: 'bequ',
    name: 'BeQuant',
    kaiko_legacy_slug: 'bq',
  },
  {
    code: 'bfly',
    name: 'bitFlyer',
    kaiko_legacy_slug: 'bl',
  },
  {
    code: 'bfnx',
    name: 'Bitfinex',
    kaiko_legacy_slug: 'bf',
  },
  {
    code: 'bfrx',
    name: 'BitForex',
    kaiko_legacy_slug: 'br',
  },
  {
    code: 'bgon',
    name: 'BigONE',
    kaiko_legacy_slug: 'bg',
  },
  {
    code: 'bitc',
    name: 'Bit2C',
    kaiko_legacy_slug: 'ic',
  },
  {
    code: 'bitz',
    name: 'Bit-Z',
    kaiko_legacy_slug: 'bz',
  },
  {
    code: 'bl3p',
    name: 'Bl3p',
    kaiko_legacy_slug: 'bp',
  },
  {
    code: 'bnbd',
    name: 'BinanceDEXTestnet',
    kaiko_legacy_slug: 'bd',
  },
  {
    code: 'bnce',
    name: 'Binance',
    kaiko_legacy_slug: 'bn',
  },
  {
    code: 'bndx',
    name: 'BinanceDEX',
    kaiko_legacy_slug: 'dx',
  },
  {
    code: 'bt38',
    name: 'BTC38',
    kaiko_legacy_slug: 'te',
  },
  {
    code: 'btba',
    name: 'Bitbank',
    kaiko_legacy_slug: 'ba',
  },
  {
    code: 'btbu',
    name: 'Bitibu',
    kaiko_legacy_slug: 'bu',
  },
  {
    code: 'btby',
    name: 'BitBay',
    kaiko_legacy_slug: 'by',
  },
  {
    code: 'btca',
    name: 'BTC-Alpha',
    kaiko_legacy_slug: 'ca',
  },
  {
    code: 'btcb',
    name: 'Btcbox',
    kaiko_legacy_slug: 'bb',
  },
  {
    code: 'btcc',
    name: 'BTCC',
    kaiko_legacy_slug: 'bc',
  },
  {
    code: 'bthb',
    name: 'Bithumb',
    kaiko_legacy_slug: 'bh',
  },
  {
    code: 'btma',
    name: 'BitMarket',
    kaiko_legacy_slug: 'ma',
  },
  {
    code: 'btmx',
    name: 'BitMEX',
    kaiko_legacy_slug: 'bm',
  },
  {
    code: 'btrk',
    name: 'BtcTurk',
    kaiko_legacy_slug: 'bk',
  },
  {
    code: 'btrx',
    name: 'Bittrex',
    kaiko_legacy_slug: 'bt',
  },
  {
    code: 'btsh',
    name: 'Bitlish',
    kaiko_legacy_slug: 'sh',
  },
  {
    code: 'btso',
    name: 'Bitso',
    kaiko_legacy_slug: 'so',
  },
  {
    code: 'bxth',
    name: 'bx.in.th',
    kaiko_legacy_slug: 'th',
  },
  {
    code: 'cbse',
    name: 'Coinbase',
    kaiko_legacy_slug: 'cb',
  },
  {
    code: 'ccck',
    name: 'Coincheck',
    kaiko_legacy_slug: 'cc',
  },
  {
    code: 'ccex',
    name: 'C-CEX',
    kaiko_legacy_slug: 'ex',
  },
  {
    code: 'cexi',
    name: 'CEX.IO',
    kaiko_legacy_slug: 'ce',
  },
  {
    code: 'cflr',
    name: 'Coinfloor',
    kaiko_legacy_slug: 'cf',
  },
  {
    code: 'cnex',
    name: 'CoinEx',
    kaiko_legacy_slug: 'cx',
  },
  {
    code: 'cngg',
    name: 'CoinEgg',
    kaiko_legacy_slug: 'cg',
  },
  {
    code: 'cnhd',
    name: 'Cobinhood',
    kaiko_legacy_slug: 'cd',
  },
  {
    code: 'cnmt',
    name: 'CoinMate',
    kaiko_legacy_slug: 'mt',
  },
  {
    code: 'cone',
    name: 'Coinone',
    kaiko_legacy_slug: 'co',
  },
  {
    code: 'crfl',
    name: 'CryptoFacilities',
    kaiko_legacy_slug: 'cr',
  },
  {
    code: 'drbt',
    name: 'Deribit',
    kaiko_legacy_slug: 'db',
  },
  {
    code: 'ethx',
    name: 'Ethfinex',
    kaiko_legacy_slug: 'ef',
  },
  {
    code: 'exxa',
    name: 'EXX',
    kaiko_legacy_slug: 'xx',
  },
  {
    code: 'gacn',
    name: 'Gatecoin',
    kaiko_legacy_slug: 'gc',
  },
  {
    code: 'gmni',
    name: 'Gemini',
    kaiko_legacy_slug: 'gi',
  },
  {
    code: 'hitb',
    name: 'HitBTC',
    kaiko_legacy_slug: 'hi',
  },
  {
    code: 'huob',
    name: 'Huobi',
    kaiko_legacy_slug: 'hb',
  },
  {
    code: 'itbi',
    name: 'Itbit',
    kaiko_legacy_slug: 'ib',
  },
  {
    code: 'kcon',
    name: 'KuCoin',
    kaiko_legacy_slug: 'kc',
  },
  {
    code: 'korb',
    name: 'Korbit',
    kaiko_legacy_slug: 'ko',
  },
  {
    code: 'krkn',
    name: 'Kraken',
    kaiko_legacy_slug: 'kk',
  },
  {
    code: 'lclb',
    name: 'LocalBitcoins',
    kaiko_legacy_slug: 'lb',
  },
  {
    code: 'mtgx',
    name: 'MtGox',
    kaiko_legacy_slug: 'mg',
  },
  {
    code: 'ngcs',
    name: 'NegocieCoins',
    kaiko_legacy_slug: 'nc',
  },
  {
    code: 'nova',
    name: 'Nova',
    kaiko_legacy_slug: 'na',
  },
  {
    code: 'okcn',
    name: 'OkCoin',
    kaiko_legacy_slug: 'oc',
  },
  {
    code: 'okex',
    name: 'OkEX',
    kaiko_legacy_slug: 'oe',
  },
  {
    code: 'polo',
    name: 'Poloniex',
    kaiko_legacy_slug: 'pl',
  },
  {
    code: 'quon',
    name: 'Quoine',
    kaiko_legacy_slug: 'qn',
  },
  {
    code: 'sghd',
    name: 'Stronghold',
    kaiko_legacy_slug: 'sg',
  },
  {
    code: 'stmp',
    name: 'Bitstamp',
    kaiko_legacy_slug: 'bs',
  },
  {
    code: 'sxha',
    name: 'SouthXchange',
    kaiko_legacy_slug: 'ha',
  },
  {
    code: 'tbit',
    name: 'TideBit',
    kaiko_legacy_slug: 'tb',
  },
  {
    code: 'tidx',
    name: 'Tidex',
    kaiko_legacy_slug: 'tx',
  },
  {
    code: 'tocn',
    name: 'The Ocean',
    kaiko_legacy_slug: 'to',
  },
  {
    code: 'trck',
    name: 'TheRockTrading',
    kaiko_legacy_slug: 'tr',
  },
  {
    code: 'uexx',
    name: 'UEX',
    kaiko_legacy_slug: 'ux',
  },
  {
    code: 'upbt',
    name: 'UPbit',
    kaiko_legacy_slug: 'ub',
  },
  {
    code: 'vtro',
    name: 'Vaultoro',
    kaiko_legacy_slug: 'vt',
  },
  {
    code: 'wexn',
    name: 'BTC-e',
    kaiko_legacy_slug: 'be',
  },
  {
    code: 'yobt',
    name: 'Yobit',
    kaiko_legacy_slug: 'yo',
  },
  {
    code: 'zaif',
    name: 'Zaif',
    kaiko_legacy_slug: 'zf',
  },
  {
    code: 'zbcn',
    name: 'ZB',
    kaiko_legacy_slug: 'zb',
  },
];
