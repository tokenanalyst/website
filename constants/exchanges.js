import {
  NATIVE_TOKENS,
  STABLE_TOKENS,
  CURRENCIES,
  ERC20_TOKENS,
} from './tokens';

const { BTC, ETH } = NATIVE_TOKENS;
const { USDT, PAX, USDT_OMNI, USDT_ERC20 } = STABLE_TOKENS;
const { OMG, LINK, ZIL, ZRX, REP } = ERC20_TOKENS;
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

export const TOKENS_EXCHANGE_SUPPORT = {
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
  [USDT_ERC20]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USDT,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KUCOIN]: {
      quoteToken: USDT,
    },
    [POLONIEX]: {
      quoteToken: USDT,
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

export const TOKENS_TV_SUPPORT = {
  [BINANCE]: [BTC, ETH, OMG, ZRX, USDT_ERC20],
  [BITFINEX]: [BTC, ETH, USDT_ERC20],
  [BITMEX]: [BTC, ETH],
  [BITSTAMP]: [BTC, ETH],
  [BITTREX]: [BTC, ETH, USDT_ERC20],
  [KRAKEN]: [BTC, ETH],
  [KUCOIN]: [BTC, ETH, USDT_ERC20],
  [POLONIEX]: [BTC, ETH, USDT_ERC20],
  [OKEX]: [USDT_OMNI],
};
