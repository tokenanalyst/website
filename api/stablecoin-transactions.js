import axios from 'axios';

const { STABLE_TOKENS } = require('../constants/tokens');
const getUserAuth = require('./auth/getUserAuth');
const filterSeriesByTime = require('./utils/filterSeriesByTime');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');

const Stablecoins = [
  STABLE_TOKENS.USDT_OMNI,
  STABLE_TOKENS.USDT_ERC20,
  STABLE_TOKENS.USDC,
  STABLE_TOKENS.PAX,
  STABLE_TOKENS.DAI,
  STABLE_TOKENS.TUSD,
  STABLE_TOKENS.GUSD,
];

const WINDOW = '1d';

module.exports = async (req, res) => {
  const { isAuthorised, userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = makeUnixtimeLimit(
    WINDOW,
    userData.tier.timeLimits[WINDOW],
    isAuthorised
  );

  const apiResponses = Stablecoins.map(
    async stablecoin =>
      await axios.get(
        `https://api.tokenanalyst.io/analytics/private/v1/token_count_window_historical/last?key=${process.env.API_KEY}&format=json&token=${stablecoin}&window=${WINDOW}`
      )
  );

  const results = await Promise.all(apiResponses);

  const response = Stablecoins.map((stablecoin, index) => ({
    name: stablecoin,
    data: filterSeriesByTime(results[index].data, tierTimeLimit),
  }));

  return res.send({ ta_response: response });
};
