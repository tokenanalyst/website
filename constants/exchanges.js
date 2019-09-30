import { NATIVE_TOKENS, STABLE_TOKENS, CURRENCIES } from './tokens';

const { BTC, ETH } = NATIVE_TOKENS;
const { USDT, OMG, LINK, ZIL, ZRX, PAX, REP } = STABLE_TOKENS;
const { USD } = CURRENCIES;

const BINANCE = 'Binance';
const BITFINEX = 'Bitfinex';
const BITMEX = 'BitMEX';
const BITSTAMP = 'Bitstamp';
const BITTREX = 'Bittrex';
const KRAKEN = 'Kraken';
const KUCOIN = 'Kucoin';
const POLONIEX = 'Poloniex';
const OKEX = 'Okex';

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
};

export const EXCHANGE_NAMES = {
  BINANCE: 'Binance',
  BITFINEX: 'Bitfinex',
  BITMEX: 'BitMEX',
  BITSTAMP: 'Bitstamp',
  BITTREX: 'Bittrex',
  KRAKEN: 'Kraken',
  KUCOIN: 'Kucoin',
  POLONIEX: 'Poloniex',
  OKEX: 'Okex',
};

export const EXCHANGE_DOLLARS = {
  BINANCE: 'USDT',
  BITFINEX: 'USDT',
  Bitmex: 'USD',
  BITMEX: 'USD',
  KUCOIN: 'USDT',
  BITTREX: 'USD',
  Kucoin: 'USDT',
  KUCOIN: 'USDT',
  OKEX: 'USD',
};

export const SUPPORTED_EXCHANGES = {
  [EXCHANGE_NAMES.BINANCE]: [
    BTC,
    ETH,
    OMG,
    LINK,
    PAX,
    ZIL,
    ZRX,
    // STABLE_TOKENS.USDT_ERC20,
    // STABLE_TOKENS.USDC,
    // STABLE_TOKENS.PAX,
    // STABLE_TOKENS.TUSD,
    // STABLE_TOKENS.LINK,
    // STABLE_TOKENS.ZRX,
    // STABLE_TOKENS.LOOM,
    // STABLE_TOKENS.BAT,
    // STABLE_TOKENS.REP,
    // STABLE_TOKENS.CVC,
    // STABLE_TOKENS.OMG,
    // STABLE_TOKENS.GNT,
    // STABLE_TOKENS.KNC,
    // STABLE_TOKENS.SNT,
    // STABLE_TOKENS.MANA,
    // STABLE_TOKENS.FET,
    // STABLE_TOKENS.RLC,
    // STABLE_TOKENS.BNT,
    // STABLE_TOKENS.DAI,
    // STABLE_TOKENS.ZIL,
    // STABLE_TOKENS.GUSD,
    // STABLE_TOKENS.TKN,
    // STABLE_TOKENS.NMR,
    // STABLE_TOKENS.MKR,
  ],
  [EXCHANGE_NAMES.BITFINEX]: [
    BTC,
    ETH,
    OMG,
    // STABLE_TOKENS.USDT_ERC20,
    // STABLE_TOKENS.USDT_OMNI,
    // STABLE_TOKENS.ZRX,
    // STABLE_TOKENS.OMG,
    // STABLE_TOKENS.USDC,
    // STABLE_TOKENS.LINK,
    // STABLE_TOKENS.DAI,
    // STABLE_TOKENS.PAX,
    // STABLE_TOKENS.GUSD,
    // STABLE_TOKENS.MKR,
    // STABLE_TOKENS.TUSD,
    // STABLE_TOKENS.BAT,
    // STABLE_TOKENS.GNT,
    // STABLE_TOKENS.CVC,
    // STABLE_TOKENS.SNT,
    // STABLE_TOKENS.REP,
    // STABLE_TOKENS.MANA,
    // STABLE_TOKENS.KNC,
    // STABLE_TOKENS.FET,
    // STABLE_TOKENS.RLC,
    // STABLE_TOKENS.LOOM,
    // STABLE_TOKENS.BNT,
    // STABLE_TOKENS.TKN,
    // STABLE_TOKENS.NMR,
    // STABLE_TOKENS.ZIL,
  ],
  [EXCHANGE_NAMES.BITMEX]: [BTC],
  [EXCHANGE_NAMES.BITSTAMP]: [BTC, ETH],
  [EXCHANGE_NAMES.BITTREX]: [
    BTC,
    ETH,
    // STABLE_TOKENS.USDT_ERC20,
    // STABLE_TOKENS.TUSD,
    // STABLE_TOKENS.ZRX,
    // STABLE_TOKENS.LOOM,
    // STABLE_TOKENS.MANA,
    // STABLE_TOKENS.MKR,
    // STABLE_TOKENS.OMG,
    // STABLE_TOKENS.PAX,
    // STABLE_TOKENS.BAT,
    // STABLE_TOKENS.DAI,
    // STABLE_TOKENS.GNT,
    // STABLE_TOKENS.NMR,
    // STABLE_TOKENS.REP,
    // STABLE_TOKENS.USDT_OMNI,
    // STABLE_TOKENS.GUSD,
    // STABLE_TOKENS.USDC,
    // STABLE_TOKENS.LINK,
    // STABLE_TOKENS.FET,
    // STABLE_TOKENS.RLC,
    // STABLE_TOKENS.KNC,
    // STABLE_TOKENS.CVC,
    // STABLE_TOKENS.SNT,
    // STABLE_TOKENS.BNT,
    // STABLE_TOKENS.TKN,
    // STABLE_TOKENS.ZIL,
  ],
  [EXCHANGE_NAMES.KRAKEN]: [
    ETH,
    // STABLE_TOKENS.USDT_OMNI,
    // STABLE_TOKENS.GUSD,
    // STABLE_TOKENS.TUSD,
    // STABLE_TOKENS.PAX,
    // STABLE_TOKENS.USDC,
    // STABLE_TOKENS.LINK,
    // STABLE_TOKENS.FET,
    // STABLE_TOKENS.RLC,
    // STABLE_TOKENS.KNC,
    // STABLE_TOKENS.CVC,
    // STABLE_TOKENS.SNT,
    // STABLE_TOKENS.LOOM,
    // STABLE_TOKENS.BNT,
    // STABLE_TOKENS.TKN,
    // STABLE_TOKENS.NMR,
    // STABLE_TOKENS.MANA,
    // STABLE_TOKENS.ZIL,
    // STABLE_TOKENS.ZRX,
    // STABLE_TOKENS.GNT,
    // STABLE_TOKENS.REP,
    // STABLE_TOKENS.OMG,
    // STABLE_TOKENS.BAT,
    // STABLE_TOKENS.MKR,
  ],
  [EXCHANGE_NAMES.KUCOIN]: [
    ETH,
    // STABLE_TOKENS.USDT_OMNI,
    // STABLE_TOKENS.GUSD,
    // STABLE_TOKENS.TUSD,
    // STABLE_TOKENS.PAX,
    // STABLE_TOKENS.USDC,
    // STABLE_TOKENS.LINK,
    // STABLE_TOKENS.FET,
    // STABLE_TOKENS.RLC,
    // STABLE_TOKENS.KNC,
    // STABLE_TOKENS.CVC,
    // STABLE_TOKENS.SNT,
    // STABLE_TOKENS.LOOM,
    // STABLE_TOKENS.BNT,
    // STABLE_TOKENS.TKN,
    // STABLE_TOKENS.NMR,
    // STABLE_TOKENS.MANA,
    // STABLE_TOKENS.ZIL,
    // STABLE_TOKENS.ZRX,
    // STABLE_TOKENS.GNT,
    // STABLE_TOKENS.REP,
    // STABLE_TOKENS.OMG,
    // STABLE_TOKENS.BAT,
    // STABLE_TOKENS.MKR,
  ],
  [EXCHANGE_NAMES.POLONIEX]: [
    BTC,
    ETH,
    // STABLE_TOKENS.USDT_OMNI,
    // STABLE_TOKENS.GUSD,
    // STABLE_TOKENS.TUSD,
    // STABLE_TOKENS.PAX,
    // STABLE_TOKENS.USDC,
    // STABLE_TOKENS.LINK,
    // STABLE_TOKENS.FET,
    // STABLE_TOKENS.RLC,
    // STABLE_TOKENS.KNC,
    // STABLE_TOKENS.CVC,
    // STABLE_TOKENS.SNT,
    // STABLE_TOKENS.LOOM,
    // STABLE_TOKENS.BNT,
    // STABLE_TOKENS.TKN,
    // STABLE_TOKENS.NMR,
    // STABLE_TOKENS.MANA,
    // STABLE_TOKENS.ZIL,
    // STABLE_TOKENS.ZRX,
    // STABLE_TOKENS.GNT,
    // STABLE_TOKENS.REP,
    // STABLE_TOKENS.OMG,
    // STABLE_TOKENS.BAT,
    // STABLE_TOKENS.MKR,
  ],
  [EXCHANGE_NAMES.OKEX]: [STABLE_TOKENS.USDT_OMNI],
};
