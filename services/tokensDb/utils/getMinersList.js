import { TOKENS_MINER_SUPPORT, MINER_NAMES } from '../../../constants';

export const getMinersList = token => {
  if (token && TOKENS_MINER_SUPPORT[token.toUpperCase()]) {
    return Object.keys(TOKENS_MINER_SUPPORT[token.toUpperCase()]).reduce(
      (acc, miner) => {
        return { ...acc, [miner]: MINER_NAMES[miner] };
      },
      {}
    );
  }

  return MINER_NAMES;
};
