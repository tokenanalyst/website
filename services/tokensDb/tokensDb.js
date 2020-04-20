import axios from 'axios';

import {
  NATIVE_TOKENS,
  ERC20_TOKENS,
  STABLE_TOKENS,
  EXCHANGE_NAMES,
  MINER_NAMES,
  TOKENS_EXCHANGE_SUPPORT,
  TOKENS_MINER_SUPPORT,
  TOKENS_TV_SUPPORT,
} from '../../constants';
import { getMinersList } from './utils';

const NATIVE = 'native';
const STABLE = 'stable';
const ERC20 = 'ERC20';

const makeList = (tokenList, tokenType) => {
  return Object.values(tokenList).reduce((acc, token) => {
    const tokenDetails = {
      [token]: {
        symbol: token,
        tokenType,
        exchangeSupport: TOKENS_EXCHANGE_SUPPORT[token],
        minerSupport: TOKENS_MINER_SUPPORT[token],
      },
    };

    return { ...acc, ...tokenDetails };
  }, {});
};

const nativeTokens = makeList(NATIVE_TOKENS, NATIVE);

const stableTokens = makeList(STABLE_TOKENS, STABLE);

const erc20Tokens = makeList(ERC20_TOKENS, ERC20);

const tokensList = { ...nativeTokens, ...erc20Tokens, ...stableTokens };

const getTokenDetails = token => {
  if (!token) {
    return null;
  }

  return tokensList[token.toUpperCase()];
};

const filterByExchange = (tokens, exchangeName) => {
  if (!exchangeName) {
    return tokens;
  }

  return Object.keys(tokens).reduce((acc, token) => {
    if (!TOKENS_TV_SUPPORT[exchangeName].includes(token.toUpperCase())) {
      return acc;
    }
    return { ...acc, [token]: tokens[token] };
  }, {});
};

const filterByMiner = (tokens, minerName) => {
  if (!minerName) {
    return tokens;
  }

  return Object.keys(tokens).reduce((acc, token) => {
    if (
      !(TOKENS_MINER_SUPPORT[token] && TOKENS_MINER_SUPPORT[token][minerName])
    ) {
      return acc;
    }
    return { ...acc, [token]: tokens[token] };
  }, {});
};

export const tokensDb = {
  tokens: {
    group: {
      all: { ...NATIVE_TOKENS, ...STABLE_TOKENS, ...ERC20_TOKENS },
      [NATIVE]: { ...NATIVE_TOKENS },
      [STABLE]: { ...STABLE_TOKENS },
      [ERC20]: { ...ERC20_TOKENS },
    },
    groupName: {
      NATIVE,
      STABLE,
      ERC20,
    },
  },
  getTokensList: (tokenType, entity) => {
    let filterFn = filterByExchange;

    if (MINER_NAMES[entity]) {
      filterFn = filterByMiner;
    }

    if (tokenType === NATIVE) {
      return filterFn(nativeTokens, entity);
    }
    if (tokenType === STABLE) {
      return filterFn(stableTokens, entity);
    }
    if (tokenType === ERC20) {
      return filterFn(erc20Tokens, entity);
    }

    return filterFn(tokensList, entity);
  },
  getTokenDetails: token => getTokenDetails(token),
  getTokenSupportForExchange: (token, exchange) => {
    if (!(token && exchange)) {
      return null;
    }
    const { exchangeSupport } = tokensList[token.toUpperCase()];

    if (exchangeSupport && exchangeSupport[exchange]) {
      return exchangeSupport[exchange];
    }

    return null;
  },
  getTokenSupportForMiner: (token, miner) => {
    if (!(token && miner)) {
      return null;
    }
    const { minerSupport } = tokensList[token.toUpperCase()];

    if (minerSupport && minerSupport[miner]) {
      return minerSupport[miner];
    }

    return null;
  },
  getExchangesList: () => EXCHANGE_NAMES,
  getMinersList: token => getMinersList(token),
  isNative: token => token in nativeTokens,
  isStable: token => token in stableTokens,
  isERC20: token => token in erc20Tokens,
  getMetricSupportForEntity: async () => {
    try {
      const response = await axios.get(`https://www.tokenanalyst.io/static_data/api/data-api-config`);

      return response.data.metricsSupport;
    } catch (err) {
      return {};
    }
  },
};
