import { EXCHANGE_NAME, ERROR } from '../const';


const excludedKeys = [
  //kaiko
  'start_time',
  'end_time',
  'page_size',
  //exchange flows
  'from_date',
  'to_date'
];

export const makeQuery = (params = {}) => {
  const query = Object.keys(params)
    .filter(k => !excludedKeys.includes(k))
    .sort()
    .reduce(
      (acc, param) => `${acc}${param.toLowerCase()}=${params[param].toLowerCase()}&`,
      ''
    );

  return `${query.slice(0, -1)}`;
};

const makeCandlesRestApiUrl = (exchangeName, restRootUrl, params) => {
  switch (exchangeName) {
    case EXCHANGE_NAME.BITFINEX: {
      const { symbol, interval, ...rest } = params;

      return `${restRootUrl}/candles/trade:${interval}:t${symbol}/hist?limit=5000&${makeQuery(
        rest
      )}`;
    }
    case EXCHANGE_NAME.BINANCE: {
      return `${restRootUrl}/klines?limit=1000&${makeQuery(params)}`;
    }
    case EXCHANGE_NAME.KAIKO: {
      // https://<eu|us>.market-api.kaiko.io/v1/data/trades.v1/exchanges/cbse/spot/btc-usd/aggregations/ohlcv
      return `${restRootUrl}/kaiko-historical-aggregates&${makeQuery(params)}`;
    }
    default:
      throw Error(ERROR.EXCHANGE_NOT_SUPPORTED);
  }
};

export default makeCandlesRestApiUrl;
