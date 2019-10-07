import { tokensDb } from '../../../../services/tokensDb';

export const makeTVSymbols = (baseToken, exchangeSupport) => {
  if (!exchangeSupport) {
    return null;
  }

  const { quoteToken } = exchangeSupport;

  if (exchangeSupport && tokensDb.isStable(baseToken)) {
    const { BTC } = tokensDb.tokens.group.native;
    const tradingPair = [BTC, quoteToken];

    return tradingPair;
  }

  return [baseToken, quoteToken];
};
