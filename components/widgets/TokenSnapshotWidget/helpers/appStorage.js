import { NATIVE_TOKENS, STABLE_TOKENS } from '../../../../constants/tokens';

const defaultTokens = [
  NATIVE_TOKENS.BTC,
  NATIVE_TOKENS.ETH,
  STABLE_TOKENS.USDC,
  STABLE_TOKENS.DAI,
];

export const getTokens = () => {
  if (!window.localStorage.getItem('atAGlance')) {
    window.localStorage.setItem(
      'atAGlance',
      JSON.stringify({ ...defaultTokens })
    );
    return Object.values(defaultTokens);
  } else {
    const tokens = JSON.parse(window.localStorage.getItem('atAGlance'));
    return Object.values(tokens);
  }
};

export const updateToken = (token, position) => {
  const tokens = JSON.parse(window.localStorage.getItem('atAGlance'));
  tokens[position] = token;
  window.localStorage.setItem('atAGlance', JSON.stringify(tokens));
};
