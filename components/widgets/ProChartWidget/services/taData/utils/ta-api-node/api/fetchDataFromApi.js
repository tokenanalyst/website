const axios = require('axios');
const makeApiUrl = require('../lib/makeApiUrl');

module.exports = endpointCallFn => async (taInstance, params) => {
  const {
    config: { apiUrl, apiKey },
  } = taInstance;

  const apiCall = makeApiUrl(endpointCallFn(params), apiUrl, {
    ...params,
    key: apiKey,
  });

  let response;

  try {
    response = await axios.get(apiCall);
  } catch (err) {
    if (error.response) {
      const {
        response: { data, status },
      } = error;

      response = {
        status,
        data,
      };
    } else if (error.request) {
      const {
        request: { response, status },
      } = error;

      response = {
        status,
        data: response,
      };
    } else {
      response = {
        status: null,
        data: error.message,
      };
    }
  }

  return response;
};
