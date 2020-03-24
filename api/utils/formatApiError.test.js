import formatApiError from './formatApiError';
import { API_ERROR_MSG, API_ERROR_REASON } from '../../constants/apiErrors';

describe('formatApiError function', () => {
  it('should format response error', () => {
    const data = 'testData';
    const status = 500;
    const mockError = {
      response: {
        status,
        data,
      },
    };
    const expectedResponse = {
      status,
      body: {
        message: data,
        reason: API_ERROR_REASON.BACKEND_API_ERROR,
      },
    };
    const formattedResponse = formatApiError(mockError);
    expect(formattedResponse).toEqual(expectedResponse);
  });

  it('should format request error', () => {
    const data = 'testData';
    const status = 500;
    const mockError = {
      request: {
        status,
        data,
      },
    };
    const expectedResponse = {
      status,
      body: {
        message: API_ERROR_MSG.NO_RESPONSE_FROM_API,
        reason: API_ERROR_REASON.BACKEND_API_ERROR,
      },
    };
    const formattedResponse = formatApiError(mockError);
    expect(formattedResponse).toEqual(expectedResponse);
  });

  it('should format other errors', () => {
    const status = 500;
    let mockError = {
      message: 'testMessage',
    };
    let expectedResponse = {
      status,
      body: {
        message: mockError.message,
        reason: API_ERROR_REASON.PROXY_ERROR,
      },
    };
    let formattedResponse = formatApiError(mockError);
    expect(formattedResponse).toEqual(expectedResponse);

    mockError = { status: 400, data: {} };
    expectedResponse = {
      status: 400,
      body: {
        message: {},
        reason: API_ERROR_REASON.BACKEND_API_ERROR,
      },
    };
    formattedResponse = formatApiError(mockError);
    expect(formattedResponse).toEqual(expectedResponse);

    mockError = {};
    expectedResponse = {
      status,
      body: {
        message: {},
        reason: API_ERROR_REASON.PROXY_ERROR,
      },
    };
    formattedResponse = formatApiError(mockError);
    expect(formattedResponse).toEqual(expectedResponse);
  });
});
