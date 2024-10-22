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
  GUSD,
  DAI,
} = STABLE_TOKENS;
const {
  OMG,
  LINK,
  ZIL,
  ZRX,
  REP,
  BAT,
  BNT,
  CVC,
  FET,
  GNT,
  KNC,
  LOOM,
  MANA,
  MKR,
  NMR,
  RLC,
  SNT,
  TKN,
} = ERC20_TOKENS;
const { USD } = CURRENCIES;

export const BINANCE = 'Binance';
export const BITFINEX = 'Bitfinex';
export const BITMEX = 'BitMEX';
export const BITSTAMP = 'Bitstamp';
export const BITTREX = 'Bittrex';
export const DERIBIT = 'Deribit';
export const HUOBI = 'Huobi';
export const KRAKEN = 'Kraken';
export const KUCOIN = 'Kucoin';
export const OKEX = 'Okex';
export const POLONIEX = 'Poloniex';
export const GEMINI = 'Gemini';

export const EXCHANGE_NAMES = {
  [BINANCE]: BINANCE,
  [BITFINEX]: BITFINEX,
  [BITMEX]: BITMEX,
  [BITSTAMP]: BITSTAMP,
  [BITTREX]: BITTREX,
  [DERIBIT]: DERIBIT,
  [HUOBI]: HUOBI,
  [KRAKEN]: KRAKEN,
  [KUCOIN]: KUCOIN,
  [OKEX]: OKEX,
  [POLONIEX]: POLONIEX,
  [GEMINI]: GEMINI,
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
    [KRAKEN]: {
      quoteToken: USD,
    },
    [POLONIEX]: {
      quoteToken: USDT,
    },
    [OKEX]: {
      quoteToken: USDT,
    },
    [HUOBI]: {
      quoteToken: USDT,
    },
    [DERIBIT]: {
      quoteToken: USD,
      isFuture: true,
    },
  },
  [ETH]: {
    [BINANCE]: {
      quoteToken: USDT,
    },
    [BITFINEX]: {
      quoteToken: USDT,
    },
    [BITTREX]: {
      quoteToken: USDT,
    },
    [BITSTAMP]: {
      quoteToken: USD,
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
      quoteToken: USDT,
    },
    [HUOBI]: {
      quoteToken: USDT,
    },
    [GEMINI]: {
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
      baseToken: BTC,
      quoteToken: USDT,
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
  [GUSD]: {
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
      baseToken: BTC,
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
    [BITTREX]: {
      quoteToken: USDT,
    },
    [KRAKEN]: {
      baseToken: BTC,
      quoteToken: USD,
    },
    [POLONIEX]: {
      baseToken: OMNI,
      quoteToken: BTC,
    },
    [HUOBI]: {
      baseToken: BTC,
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
  [BAT]: {
    [BINANCE]: {
      baseToken: BAT,
      quoteToken: USDT,
    },
  },
  [BNT]: {
    [BITFINEX]: {
      baseToken: BAT,
      quoteToken: USD,
    },
  },
  [CVC]: {
    [BINANCE]: {
      baseToken: CVC,
      quoteToken: USDT,
    },
  },
  [FET]: {
    [BINANCE]: {
      baseToken: FET,
      quoteToken: USDT,
    },
  },
  [GNT]: {
    [BITFINEX]: {
      baseToken: GNT,
      quoteToken: USD,
    },
  },
  [KNC]: {
    [BITFINEX]: {
      baseToken: KNC,
      quoteToken: USD,
    },
  },
  [LOOM]: {
    [BITFINEX]: {
      baseToken: LOOM,
      quoteToken: USD,
    },
  },
  [MANA]: {
    [BITFINEX]: {
      baseToken: MANA,
      quoteToken: USD,
    },
  },
  [MKR]: {
    [BITFINEX]: {
      baseToken: MANA,
      quoteToken: USD,
    },
  },
  [NMR]: {
    [BINANCE]: {
      baseToken: BTC,
      quoteToken: USDT,
    },
  },
  [RLC]: {
    [BITFINEX]: {
      baseToken: RLC,
      quoteToken: USD,
    },
  },
  [SNT]: {
    [BITFINEX]: {
      baseToken: SNT,
      quoteToken: USD,
    },
  },
  [TKN]: {
    [BINANCE]: {
      baseToken: BTC,
      quoteToken: USDT,
    },
  },
  [DAI]: {
    [BINANCE]: {
      baseToken: BTC,
      quoteToken: USDT,
    },
  },
};

export const TOKENS_TV_SUPPORT = {
  [BINANCE]: [BTC, ETH, OMG, ZRX, USDT_ERC20, USDC, PAX, TUSD],
  [BITFINEX]: [BTC, ETH, USDT_ERC20, USDT_OMNI, USDC, PAX, TUSD],
  [BITMEX]: [BTC],
  [BITSTAMP]: [BTC, ETH],
  [BITTREX]: [BTC, USDT_ERC20, USDT_OMNI, PAX],
  [KRAKEN]: [BTC, ETH, USDT_OMNI],
  [KUCOIN]: [ETH, USDT_ERC20, USDT_OMNI],
  [POLONIEX]: [BTC, ETH, USDT_ERC20, USDT_OMNI],
  [OKEX]: [BTC, ETH],
  [HUOBI]: [BTC, ETH, USDT_OMNI],
  [DERIBIT]: [BTC],
  [GEMINI]: [ETH],
};

export const EXCHANGE_DISPLAY_NAME = {
  Bitmex: BITMEX,
};

export const LOGGED_OUT_SUPPORTED_EXCHANGES = [BINANCE, BITFINEX, BITMEX];
export const LOGGED_OUT_UNSUPPORTED_EXCHANGES = [
  BITSTAMP,
  BITTREX,
  KRAKEN,
  KUCOIN,
  POLONIEX,
  HUOBI,
  OKEX,
  DERIBIT,
  GEMINI,
];
