const TA = require('../services/ta-api-node/ta');
const formatApiError = require('./utils/formatApiError');

const setResponseCache = require('./utils/setResponseCache');
const { tokensDb } = require('../services/tokensDb');

const { USDT_ERC20, USDC, PAX, DAI, TUSD, GUSD } = tokensDb.tokens.group.stable;

const STABLE_COINS = [USDT_ERC20, USDC, PAX, DAI, TUSD, GUSD];

module.exports = async (req, res) => {
  const FORMAT = 'json';
  const PUBLIC_API_URL = 'https://api.tokenanalyst.io/analytics';

  const publicApi = TA({
    apiUrl: PUBLIC_API_URL,
  });

  const apiRequests = STABLE_COINS.map(token =>
    Promise.all([
      publicApi.holderAddress24hRollingV5({
        token,
        format: FORMAT,
      }),
      publicApi.volume24HRollingV5({
        token,
        format: FORMAT,
      }),
      publicApi.count24HRollingV5({
        token,
        format: FORMAT,
      }),
      publicApi.publicTotalSupplyV5({
        token,
        format: FORMAT,
      }),
    ])
  );

  let results;

  try {
    results = await Promise.all(apiRequests);
  } catch (err) {
    const { code, body } = formatApiError(err);
    return res.status(code).send(body);
  }
  const response = results.reduce(
    (acc, curr) => [
      ...acc,
      {
        address: { ...curr[0].data[0] },
        volume: { ...curr[1].data[0] },
        count: { ...curr[2].data[0] },
        supply: { ...curr[3].data[0] },
      },
    ],
    []
  );

  setResponseCache().forEach(cacheHeader => {
    res.setHeader(...cacheHeader);
  });

  return res.send({ ta_response: response });
};
