import {
  NATIVE_TOKENS,
  ERC20_TOKENS,
  STABLE_TOKENS,
} from '../constants/tokens';
import {
  EXCHANGE_NAMES,
  TOKENS_EXCHANGE_SUPPORT,
  TOKENS_TV_SUPPORT,
} from '../constants/exchanges';

let instance;

const initTokensDb = () => {
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
        },
      };

      return { ...acc, ...tokenDetails };
    }, {});
  };

  const nativeTokens = makeList(NATIVE_TOKENS, NATIVE);

  const stableTokens = makeList(STABLE_TOKENS, STABLE);

  const erc20Tokens = makeList(ERC20_TOKENS, ERC20);

  const tokensList = { ...nativeTokens, ...erc20Tokens, ...stableTokens };
  console.log(tokensList);
  const getTokenDetails = token => {
    if (!token) {
      return null;
    }
    console.log(tokensList[token.toUpperCase()]);
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

  return {
    tokens: {
      group: {
        all: [...NATIVE, ...STABLE, ...ERC20],
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
    getTokensList: (tokenType, exchange) => {
      if (tokenType === NATIVE) {
        return filterByExchange(nativeTokens, exchange);
      }
      if (tokenType === STABLE) {
        return filterByExchange(stableTokens, exchange);
      }
      if (tokenType === ERC20) {
        return filterByExchange(erc20Tokens, exchange);
      }

      return filterByExchange(tokensList, exchange);
    },
    getTokenDetails: token => getTokenDetails(token),
    getTokenSupportOnExchange: (token, exchange) => {
      if (!(token && exchange)) {
        return null;
      }
      const { exchangeSupport } = tokensList[token];

      if (exchangeSupport && exchangeSupport[exchange]) {
        return exchangeSupport[exchange];
      }

      return null;
    },
    getTokenType: token => {
      if (!token) {
        return null;
      }
      const tokenDetails = getTokenDetails(token);

      if (tokenDetails) {
        return tokenDetails.tokenType;
      }

      return null;
    },
    getExchangesList: () => EXCHANGE_NAMES,
    isNative: token => token in nativeTokens,
    isStable: token => token in stableTokens,
    isERC20: token => token in erc20Tokens,
  };
};

export const tokensDb = (() => {
  if (instance) {
    return instance;
  }
  instance = initTokensDb();

  return instance;
})();
