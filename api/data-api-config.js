const axios = require('axios');

const setResponseCache = require('./utils/setResponseCache');
const formatApiError = require('./utils/formatApiError');

const mapTokensToExchanges = endpoints =>
  endpoints.reduce((acc, curr) => {
    const {
      parameters: { token, exchange },
    } = curr;
    if (!acc[token]) {
      return { ...acc, [token]: [exchange] };
    }
    return { ...acc, [token]: [...acc[token], exchange] };
  }, {});

const makeArrayOfEndpoints = jobs =>
  jobs.reduce((acc, curr) => {
    return [...acc, ...curr.endpoints];
  }, []);

module.exports = async (req, res) => {
  const EXCHANGE_BALANCE_METRICS =
    'https://api.tokenanalyst.io/catalog/data/exchange_balance_window_historical';

  const EXCHANGE_FLOW_METRICS =
    'https://api.tokenanalyst.io/catalog/data/exchange_flow_window_historical';

  let resBody;

  const reqArray = [
    axios(EXCHANGE_BALANCE_METRICS),
    axios(EXCHANGE_FLOW_METRICS),
  ];

  try {
    const resArray = await Promise.all(reqArray);

    resBody = resArray.reduce((acc, curr) => {
      const {
        data: { jobs, name },
      } = curr;
      const endpoints = makeArrayOfEndpoints(jobs);
      const metricSupport = mapTokensToExchanges(endpoints);

      return { ...acc, [name]: metricSupport };
    }, {});
  } catch (err) {
    console.log(err.message);
    const { status, body } = formatApiError(err);
    console.log(body);
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
