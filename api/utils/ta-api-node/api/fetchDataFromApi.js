const axios = require('axios');
const makeApiUrl = require('../lib/makeApiUrl');

module.exports = endpoint => async (ta, params) => {
  const {
    config: { apiUrl, apiKey }
  } = ta;

  const apiCall = makeApiUrl(endpoint(params), apiUrl, {
    ...params,
    key: apiKey
  });

  return axios.get(apiCall).then(response => response.data);
};
