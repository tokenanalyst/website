const axios = require('axios');

const setResponseCache = require('./utils/setResponseCache');
const formatApiError = require('./utils/formatApiError');

const mapTokensToEntity = endpoints => {
  const uniqueMap = {};

  return endpoints.reduce((acc, curr) => {
    const {
      parameters: { token, exchange, miner },
    } = curr;
    const entity = exchange || miner;

    if (!uniqueMap[token]) {
      uniqueMap[token] = {};
    }

    if (uniqueMap[token][entity]) {
      return acc;
    }

    uniqueMap[token][entity] = true;

    if (!acc[token]) {
      return { ...acc, [token]: [entity] };
    }
    return { ...acc, [token]: [...acc[token], entity] };
  }, {});
};

const makeArrayOfEndpoints = jobs =>
  jobs.reduce((acc, curr) => {
    return [...acc, ...curr.endpoints];
  }, []);

module.exports = async (req, res) => {
  const EXCHANGE_BALANCE_METRICS =
    'https://api.tokenanalyst.io/catalog/data/exchange_balance_window_historical';

  const EXCHANGE_FLOW_METRICS =
    'https://api.tokenanalyst.io/catalog/data/exchange_flow_window_historical';

  const MINER_HASHRATE_METRICS =
    'https://api.tokenanalyst.io/catalog/data/token_miner_hashrate_window_historical';

  const MINER_REWARDS_METRICS =
    'https://api.tokenanalyst.io/catalog/data/token_miner_rewards_window_historical';

  const MINER_FLOW_METRICS =
    'https://api.tokenanalyst.io/catalog/data/miner_flow_window_historical';

  const MINER_BALANCES_METRICS =
    'https://api.tokenanalyst.io/catalog/data/miner_balance_window_historical';

  let resBody;

  const reqArray = [
    axios(EXCHANGE_BALANCE_METRICS),
    axios(EXCHANGE_FLOW_METRICS),
    axios(MINER_HASHRATE_METRICS),
    axios(MINER_REWARDS_METRICS),
    axios(MINER_FLOW_METRICS),
    axios(MINER_BALANCES_METRICS),
  ];

  try {
    const resArray = await Promise.all(reqArray);

    resBody = resArray.reduce((acc, curr) => {
      const {
        data: { jobs, name },
      } = curr;
      const endpoints = makeArrayOfEndpoints(jobs);
      const metricSupport = mapTokensToEntity(endpoints);

      return { ...acc, [name]: metricSupport };
    }, {});
  } catch (err) {
    const { status, body } = formatApiError(err);
    return res.status(status).send(body);
  }

  const withMissingCatalogueEntries = {
    ...resBody,
    exchange_balance_window_historical: {
      ...resBody.exchange_balance_window_historical,
      usdt_erc20: ['binance', 'bittrex', 'bitfinex', 'kucoin', 'poloniex'],
      usdc: ['binance', 'bitfinex'],
    },
  };

  setResponseCache().forEach(cacheHeader => {
    res.setHeader(...cacheHeader);
  });

  return res.send({ metricsSupport: withMissingCatalogueEntries });
};
