import {
  NATIVE_TOKENS,
  STABLE_TOKENS,
  CURRENCIES,
  ERC20_TOKENS,
} from './tokens';

const { BTC, ETH } = NATIVE_TOKENS;
const {
  USDT,
  PAX,
  USDT_OMNI,
  USDT_ERC20,
  OMNI,
  USDC,
  TUSD,
  DAI,
} = STABLE_TOKENS;
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
export const HUOBI = 'Huobi';

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
  [HUOBI]: HUOBI,
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
    [HUOBI]: {
      quoteToken: USDT,
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
  [DAI]: {
    [BITTREX]: {
      baseToken: BTC,
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
      baseToken: BTC,
      quoteToken: USDT,
    },
    [BITFINEX]: {
      baseToken: BTC,
      quoteToken: USDT,
    },
    [BITTREX]: {
      baseToken: BTC,
      quoteToken: USDT,
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
  [TUSD]: {
    [BITFINEX]: {
      baseToken: BTC,
      quoteToken: USD,
    },
    [BINANCE]: {
      baseToken: BTC,
      quoteToken: USDT,
    },
  },
  [USDC]: {
    [BITFINEX]: {
      baseToken: BTC,
      quoteToken: USD,
    },
    [BINANCE]: {
      baseToken: BTC,
      quoteToken: USDT,
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
  [USDT_OMNI]: {
    [BITFINEX]: {
      baseToken: OMNI,
      quoteToken: BTC,
    },
    [KUCOIN]: {
      baseToken: OMNI,
      quoteToken: BTC,
    },
    [KRAKEN]: {
      baseToken: BTC,
      quoteToken: USD,
    },
    [POLONIEX]: {
      baseToken: OMNI,
      quoteToken: BTC,
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
  [BINANCE]: [BTC, ETH, OMG, ZRX, USDT_ERC20, USDC, PAX, TUSD],
  [BITFINEX]: [BTC, ETH, USDT_ERC20, USDT_OMNI, USDC, PAX, TUSD],
  [BITMEX]: [BTC, ETH],
  [BITSTAMP]: [BTC, ETH],
  [BITTREX]: [BTC, ETH, USDT_ERC20, USDT_OMNI, PAX, DAI],
  [KRAKEN]: [BTC, ETH, USDT_OMNI],
  [KUCOIN]: [BTC, ETH, USDT_ERC20, USDT_OMNI],
  [POLONIEX]: [BTC, ETH, USDT_ERC20, USDT_OMNI],
  [OKEX]: [],
  [HUOBI]: [BTC],
};

export const EXCHANGE_DISPLAY_NAME = {
  Bitmex: BITMEX,
};
