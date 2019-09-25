import { default as taApiClient } from './lib/ta-api-node/ta';
import ta from './api';

let instance;

const taData = options =>
  (() => {
    if (!instance) {
      // const taInstance = taApiClient({ apiKey });
      const taInstance = taApiClient(options);
      ta.setApi(taInstance);
      instance = ta;
      return instance;
    }
    return instance;
  })();

export default taData;
