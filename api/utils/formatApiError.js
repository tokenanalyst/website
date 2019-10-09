const {
  API_ERROR_MSG,
  API_ERROR_REASON,
} = require('../../constants/apiErrors');

module.exports = (error, errorMsg = API_ERROR_REASON.BACKEND_API_ERROR) => {
  if (error.response) {
    const { status, data } = error.response;
    return {
      status,
      body: {
        message: data,
        reason: errorMsg,
      },
    };
  }

  if (error.request) {
    return {
      status: 500,
      body: {
        message: API_ERROR_MSG.NO_RESPONSE_FROM_API,
        reason: errorMsg,
      },
    };
  }

  if (error.data) {
    const errorResponse = {
      status: error.data.status,
      body: {
        message: error.data.message,
        reason: errorMsg,
      },
    };

    return errorResponse;
  }

  return {
    status: 500,
    body: {
      message: error.message || error,
      reason: API_ERROR_REASON.PROXY_ERROR,
    },
  };
};
