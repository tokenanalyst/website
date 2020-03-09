import { NATIVE_TOKENS, STABLE_TOKENS } from '../../../../constants/tokens';
import { APP_STORAGE_KEYS } from '../../../../constants/localStorage';

const defaultTokens = [
  NATIVE_TOKENS.BTC,
  NATIVE_TOKENS.ETH,
  STABLE_TOKENS.USDC,
  STABLE_TOKENS.PAX,
];

export const getTokens = () => {
  if (!window.localStorage.getItem(APP_STORAGE_KEYS.tokenSnapshot)) {
    window.localStorage.setItem(
      APP_STORAGE_KEYS.tokenSnapshot,
      JSON.stringify({ ...defaultTokens })
    );
    return Object.values(defaultTokens);
  }
  const tokens = JSON.parse(
    window.localStorage.getItem(APP_STORAGE_KEYS.tokenSnapshot)
  );

  return Object.values(tokens);
};

export const updateToken = (token, position) => {
  const tokens = JSON.parse(
    window.localStorage.getItem(APP_STORAGE_KEYS.tokenSnapshot)
  );
  tokens[position] = token;
  window.localStorage.setItem(
    APP_STORAGE_KEYS.tokenSnapshot,
    JSON.stringify(tokens)
  );
};
