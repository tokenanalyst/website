import { tokensDb } from '../../../../services/tokensDb';

export const makeTVSymbols = (baseToken, exchangeName) => {
  const exchangeSupport = tokensDb.getTokenSupportOnExchange(
    baseToken,
    exchangeName
  );

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
