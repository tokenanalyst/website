import axios from 'axios';
import { setResponseCache } from './utils/setResponseCache';

module.exports = async (_, res) => {
  const { data } = await axios.get(
    'https://api.tokenanalyst.io/analytics/last?job=exchange_flows_all_tokens_v5&format=json'
  );

  setResponseCache().map(cacheHeader => {
    res.setHeader(...cacheHeader);
  });
  res.send({ ta_response: data });
};
