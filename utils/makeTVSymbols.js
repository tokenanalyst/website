import { tokensDb } from '../services/tokensDb';
import { SPOT, FUTURE } from '../constants/instruments';

export const makeTVSymbols = (token, exchangeSupport) => {
  if (!exchangeSupport) {
    return null;
  }

  const { quoteToken, baseToken } = exchangeSupport;
  if (tokensDb.isDerivative(quoteToken)) {
    const { BTC } = tokensDb.tokens.group.native;
    return { class: FUTURE, pair: [BTC, quoteToken] };
  }
  if (exchangeSupport && tokensDb.isStable(token)) {
    const { BTC } = tokensDb.tokens.group.native;
    const tradingPair = [!baseToken ? BTC : baseToken, quoteToken];

    return { class: SPOT, pair: tradingPair };
  }

  return { class: SPOT, pair: [token, quoteToken] };
};
