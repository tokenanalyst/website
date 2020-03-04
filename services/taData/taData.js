// eslint-disable-next-line import/no-named-default
import { default as taApiClient } from 'ta-api-node';
import ta from './api';

let instance;

const serverlessApi = {
  exchange_flows: 'exchange-flows',
  single_metric: 'single-metric',
};

const taData = options =>
  (() => {
    if (!instance) {
      const taInstance = taApiClient({
        ...options,
        extend: serverlessApi,
      });
      ta.setApi(taInstance);
      instance = ta;
      return instance;
    }
    return instance;
  })();

export default taData;
