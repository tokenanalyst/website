import * as exchanges from './exchanges';
import candlesDataBase from './candlesDataBase';

let instance;
let selectedExchange;

const candlesData = exchange =>
  (() => {
    if (!exchanges[exchange]) {
      throw new Error(`${exchange} not supported.`);
    }

    if (!instance || selectedExchange !== exchange) {
      instance = { ...candlesDataBase, ...exchanges[exchange] };
      selectedExchange = exchange;
      return instance;
    }
    return instance;
  })();

export default candlesData;
