import { default as taApiClient } from './lib/ta-api-node/ta';
import ta from './api';

let instance;

const taData = ({ apiKey }) =>
  (() => {
    if (!instance) {
      const taInstance = taApiClient({ apiKey });
      ta.setApi(taInstance);
      instance = ta;
      return instance;
    }
    return instance;
  })();

export default taData;
