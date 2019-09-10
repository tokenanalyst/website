import {API_ERROR_MSG, API_ERROR_REASON} from '../../constants/apiErrors'

export const formatApiError = error => {
  let errorResponse;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;
    errorResponse = {
      status,
      body: {
        message: data,
        reason: API_ERROR_REASON.BACKEND_API_ERROR
      }
    };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    errorResponse = {
      status: 500,
      body: {
        message: API_ERROR_MSG.NO_RESPONSE_FROM_API,
        reason: API_ERROR_REASON.BACKEND_API_ERROR
      }
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    errorResponse = {
      status: 500,
      body: {
        message: error.message || error,
        reason: API_ERROR_REASON.PROXY_ERROR
      }
    };
  }

  return errorResponse;
};