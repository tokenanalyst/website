const TA = require('../services/ta-api-node/ta');

const getUserAuth = require('./auth/getUserAuth');
const filterSeriesByTime = require('./utils/filterSeriesByTime');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');
const { tokensDb } = require('../services/tokensDb');
const formatApiError = require('./utils/formatApiError');

const {
  USDT_OMNI,
  USDT_ERC20,
  USDC,
  PAX,
  DAI,
  TUSD,
  GUSD,
} = tokensDb.tokens.group.stable;

const STABLE_COINS = [USDT_OMNI, USDT_ERC20, USDC, PAX, DAI, TUSD, GUSD];

const PARAMS = { window: '1d', format: 'json' };

module.exports = async (req, res) => {
  const { isAuthorised, userData } = await getUserAuth(req.cookies.apiKey);
  const privateApi = TA({ apiKey: process.env.API_KEY });

  const tierTimeLimit = makeUnixtimeLimit(
    PARAMS.window,
    userData.tier.timeLimits[PARAMS.window],
    isAuthorised
  );

  const apiResponses = STABLE_COINS.map(async token =>
    privateApi.tokenVolumeWindowHistorical({
      format: PARAMS.format,
      token,
      window: PARAMS.window,
    })
  );

  let results;

  try {
    results = await Promise.all(apiResponses);
  } catch (err) {
    const { status, body } = formatApiError(err);
    return res.status(status).send(body);
  }

  const response = STABLE_COINS.map((stablecoin, index) => ({
    name: stablecoin,
    data: filterSeriesByTime(results[index].data, tierTimeLimit),
  }));

  return res.send({ ta_response: response });
};
