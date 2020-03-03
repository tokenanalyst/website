import { NATIVE_TOKENS } from './tokens';

const { BTC, ETH } = NATIVE_TOKENS;

// BTC
export const ANTPOOL = 'antpool';
export const BTCTOP = 'btc-top';
export const BTCCOM = 'btc-com';
export const BITFURY = 'bitfury';
export const F2POOL = 'f2pool';
export const HUOBI_POOL = 'huobi-pool';
export const POOLIN = 'poolin';
export const SLUSHPOOL = 'slushpool';
export const VIABTC = 'viabtc';
export const ONE_THASH_AND_58COIN = '1thash&58coin';
export const OTHERS = 'others';
export const UNKNOWN = 'unknown';

// ETH
export const BIT_CLUB_POOL = 'bitclubpool';
export const COINTRON3 = 'coinotron3';
export const DWARF_POOL_1 = 'dwarfpool1';
export const ETHERMINE = 'ethermine';
export const ETHPOOL_2 = 'ethpool2';
export const F2POOL2 = 'f2pool2';
export const MININGPOOLHUB = 'miningpoolhub';
export const NANOPOOL = 'nanopool';
export const SPARKPOOL = 'sparkpool';
export const ZHIZHU_TOP = 'zhizhu-top';

export const MINER_NAMES = {
  [ANTPOOL]: ANTPOOL,
  [BTCTOP]: BTCTOP,
  [BTCCOM]: BTCCOM,
  [BITFURY]: BITFURY,
  [F2POOL]: F2POOL,
  [HUOBI_POOL]: HUOBI_POOL,
  [POOLIN]: POOLIN,
  [SLUSHPOOL]: SLUSHPOOL,
  [VIABTC]: VIABTC,
  [ONE_THASH_AND_58COIN]: ONE_THASH_AND_58COIN,
  [BIT_CLUB_POOL]: BIT_CLUB_POOL,
  [COINTRON3]: COINTRON3,
  [DWARF_POOL_1]: DWARF_POOL_1,
  [ETHERMINE]: ETHERMINE,
  [ETHPOOL_2]: ETHPOOL_2,
  [F2POOL2]: F2POOL2,
  [MININGPOOLHUB]: MININGPOOLHUB,
  [NANOPOOL]: NANOPOOL,
  [SPARKPOOL]: SPARKPOOL,
  [ZHIZHU_TOP]: ZHIZHU_TOP,
  [OTHERS]: OTHERS,
  [UNKNOWN]: UNKNOWN,
};

export const MINER_FORMATTED_NAMES = {
  [ANTPOOL]: 'Antpool',
  [BITFURY]: 'BitFury',
  [BIT_CLUB_POOL]: 'BitClubPool',
  [BTCCOM]: 'BTC-com',
  [BTCTOP]: 'BTC.TOP',
  [COINTRON3]: 'Coinotron3',
  [DWARF_POOL_1]: 'DwarfPool1',
  [ETHERMINE]: 'Ethermine',
  [ETHPOOL_2]: 'Ethpool2',
  [F2POOL2]: 'F2Pool2',
  [F2POOL]: 'F2Pool',
  [HUOBI_POOL]: 'Huobi Pool',
  [MININGPOOLHUB]: 'MiningPoolHub',
  [NANOPOOL]: 'NanoPool',
  [ONE_THASH_AND_58COIN]: '1THash&58coin',
  [OTHERS]: 'Others',
  [POOLIN]: 'Poolin',
  [SLUSHPOOL]: 'SlushPool',
  [SPARKPOOL]: 'SparkPool',
  [UNKNOWN]: 'Unknown',
  [VIABTC]: 'viaBTC',
  [ZHIZHU_TOP]: 'Zhizhu.top',
};

export const TOKENS_MINER_SUPPORT = {
  [BTC]: {
    [ANTPOOL]: {},
    [BTCTOP]: {},
    [BTCCOM]: {},
    [BITFURY]: {},
    [F2POOL]: {},
    [HUOBI_POOL]: {},
    [POOLIN]: {},
    [SLUSHPOOL]: {},
    [VIABTC]: {},
    [ONE_THASH_AND_58COIN]: {},
    [OTHERS]: {},
    [UNKNOWN]: {},
  },
  [ETH]: {
    [BIT_CLUB_POOL]: {},
    [COINTRON3]: {},
    [DWARF_POOL_1]: {},
    [ETHERMINE]: {},
    [ETHPOOL_2]: {},
    [F2POOL2]: {},
    [MININGPOOLHUB]: {},
    [NANOPOOL]: {},
    [SPARKPOOL]: {},
    [ZHIZHU_TOP]: {},
    [OTHERS]: {},
    [UNKNOWN]: {},
  },
};

export const LOGGED_OUT_SUPPORTED_MINERS = [
  ANTPOOL,
  BTCTOP,
  BTCCOM,
  BIT_CLUB_POOL,
  COINTRON3,
  DWARF_POOL_1,
];
export const LOGGED_OUT_UNSUPPORTED_MINER = [
  BITFURY,
  F2POOL,
  HUOBI_POOL,
  POOLIN,
  SLUSHPOOL,
  VIABTC,
  ONE_THASH_AND_58COIN,
  OTHERS,
  UNKNOWN,
  ETHERMINE,
  ETHPOOL_2,
  F2POOL2,
  MININGPOOLHUB,
  NANOPOOL,
  SPARKPOOL,
  ZHIZHU_TOP,
];
