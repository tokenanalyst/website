import { tokensDb } from '../../../../services/tokensDb';

export const makeTVSymbols = (token, exchangeSupport) => {
  if (!exchangeSupport) {
    return null;
  }

  const { quoteToken, baseToken } = exchangeSupport;

  if (exchangeSupport && tokensDb.isStable(token)) {
    const { BTC } = tokensDb.tokens.group.native;
    const tradingPair = [!baseToken ? BTC : baseToken, quoteToken];

    return tradingPair;
  }

  return [token, quoteToken];
};
