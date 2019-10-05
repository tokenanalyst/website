import { NATIVE_TOKENS, STABLE_TOKENS, CURRENCIES } from './tokens';

const { BTC, ETH } = NATIVE_TOKENS;
const { USDT, OMG, LINK, ZIL, ZRX, PAX, REP, USDT_OMNI } = STABLE_TOKENS;
const { USD } = CURRENCIES;

export const BINANCE = 'Binance';
export const BITFINEX = 'Bitfinex';
export const BITMEX = 'BitMEX';
export const BITSTAMP = 'Bitstamp';
export const BITTREX = 'Bittrex';
export const KRAKEN = 'Kraken';
export const KUCOIN = 'Kucoin';
export const POLONIEX = 'Poloniex';
export const OKEX = 'Okex';

export const EXCHANGE_NAMES = {
  [BINANCE]: BINANCE,
  [BITFINEX]: BITFINEX,
  [BITMEX]: BITMEX,
  [BITSTAMP]: BITSTAMP,
  [BITTREX]: BITTREX,
  [KRAKEN]: KRAKEN,
  [KUCOIN]: KUCOIN,
  [POLONIEX]: POLONIEX,
  [OKEX]: OKEX,
};

export const EXCHANGE_DOLLARS = {
  BINANCE: 'USDT',
  BITFINEX: 'USDT',
  BITMEX: 'USD',
  BITTREX: 'USD',
  KUCOIN: 'USDT',
  OKEX: 'USD',
};

export const QUOTE_TOKENS = {
  [BTC]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USDT,
    },
    [BITMEX]: {
      quoteToken: USD,
    },
    [BITSTAMP]: {
      quoteToken: USD,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USD,
    },
  },
  [ETH]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USDT,
    },
    [BITMEX]: {
      quoteToken: USD,
    },
    [BITSTAMP]: {
      quoteToken: USD,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USD,
    },
  },
  [LINK]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USDT,
    },
    [BITMEX]: {
      quoteToken: USD,
    },
    [BITSTAMP]: {
      quoteToken: USD,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USD,
    },
  },
  [OMG]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USD,
    },
    [BITSTAMP]: {
      quoteToken: USD,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USD,
    },
  },
  [PAX]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USDT,
    },
    [BITMEX]: {
      quoteToken: USD,
    },
    [BITSTAMP]: {
      quoteToken: USD,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USD,
    },
  },
  [REP]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USDT,
    },
    [BITMEX]: {
      quoteToken: USD,
    },
    [BITSTAMP]: {
      quoteToken: USD,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USD,
    },
  },
  [USDT]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USDT,
    },
    [BITMEX]: {
      quoteToken: USD,
    },
    [BITSTAMP]: {
      quoteToken: USD,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USD,
    },
  },
  [ZIL]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USDT,
    },
    [BITMEX]: {
      quoteToken: USD,
    },
    [BITSTAMP]: {
      quoteToken: USD,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USD,
    },
  },
  [ZRX]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USD,
    },
    [BITSTAMP]: {
      quoteToken: USD,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USD,
    },
  },
};

export const SUPPORTED_TOKENS = {
  [BINANCE]: [BTC, ETH, OMG, ZRX],
  [BITFINEX]: [BTC, ETH, OMG, ZRX],
  [BITMEX]: [BTC, ETH],
  [BITSTAMP]: [BTC, ETH, OMG, ZRX],
  [BITTREX]: [BTC, ETH, OMG, ZRX],
  [KRAKEN]: [BTC, ETH, OMG, ZRX],
  [KUCOIN]: [BTC, ETH, OMG, ZRX],
  [POLONIEX]: [BTC, ETH, OMG, ZRX],
  [OKEX]: [USDT_OMNI],
};
