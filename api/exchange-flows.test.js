/* global mocksClear */
import url from 'url';
import TA from 'ta-api-node';
import exchangeMetrics from './exchange-flows';
import { API_ERROR_MSG } from '../constants/apiErrors';
import getUserAuth from './auth/getUserAuth';

jest.mock('ta-api-node');
jest.mock('./auth/getUserAuth');
jest.mock('url');

const tokenPriceUsdWindowHistorical = jest.fn();
const exchangeFlowsAllTokens = jest.fn();
const exchangeFlowWindowHistorical = jest.fn();
const erc20ExchangesFlowWindowHistorical = jest.fn();

TA.mockImplementation(() => {
  return {
    tokenPriceUsdWindowHistorical,
    exchangeFlowsAllTokens,
    exchangeFlowWindowHistorical,
    erc20ExchangesFlowWindowHistorical,
  };
});

url.parse.mockImplementation(data => data);

let mockRequest = {
  cookies: {
    apiKey: '',
  },
};

const mockResponse = {};
mockResponse.status = jest.fn().mockReturnValue(mockResponse);
mockResponse.json = jest.fn().mockReturnValue(mockResponse);
mockResponse.send = data => data;

describe('exchange-flows api', () => {
  beforeEach(() => {
    mocksClear([url.parse, mockResponse.status, mockResponse.json, TA]);
  });

  it('should return a 400 if no token or exchange is provided', async () => {
    mockRequest = {
      ...mockRequest,
      url: {
        query: { timeWindow: '1d' },
      },
    };
    const expectedResponse = { message: API_ERROR_MSG.PARAMS_MISSING };
    const response = await exchangeMetrics(mockRequest, mockResponse);
    expect(url.parse).toHaveBeenCalledWith(mockRequest.url, true);
    expect(getUserAuth).not.toHaveBeenCalled();
    expect(response).toEqual(expectedResponse);
  });
});
