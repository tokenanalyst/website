import TA from './utils/ta-api-node/ta';
import ta from './api';

let instance;

console.log(TA);

const taData = ({ apiKey }) =>
  (() => {
    if (!instance) {
      const taInstance = TA({ apiKey });
      ta.setApi(taInstance);
      instance = ta;
      return instance;
    }
    return instance;
  })();

export default taData;
