import exchangeMetrics from './exchange-metrics';
import url from 'url';
import { API_ERROR_MSG } from '../constants/apiErrors';
import isAuthorised from './auth/isAuthorised';
import TA from './utils/ta-api-node/ta';
import { ETH as ETHUsdPrice } from './__fixtures__/token_price_usd_window_historical';
import { mockExchangeFlowsAllTokens } from './__fixtures__/exchange_flows_all_tokens_v5';
import { ETH as ETHFlows } from './__fixtures__/exchange_flow_window_historical';

jest.mock('./utils/ta-api-node/ta');
jest.mock('./auth/isAuthorised');
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

url.parse = jest.fn().mockImplementation(data => data);

let mockRequest = {
  cookies: {
    apiKey: '',
  },
};

const mockResponse = {};
mockResponse.status = jest.fn().mockReturnValue(mockResponse);
mockResponse.json = jest.fn().mockReturnValue(mockResponse);
mockResponse.send = jest.fn().mockImplementation(data => data);

beforeEach(() => {
  mocksClear([
    url.parse,
    mockResponse.status,
    mockResponse.json,
    mockResponse.send,
    TA,
  ]);
});

describe('exchange-metrics api', () => {
  beforeEach(() => {
    mocksClear([
      url.parse,
      mockResponse.status,
      mockResponse.json,
      mockResponse.send,
      TA,
    ]);
  });

  it('should return 400 if not token or exchange defined', async () => {
    mockRequest = {
      ...mockRequest,
      url: {
        query: { timeWindow: '1d' },
      },
    };
    const expectedRespond = { message: API_ERROR_MSG.TOKEN_EXCHANGE_MISSING };
    const response = await exchangeMetrics(mockRequest, mockResponse);
    expect(url.parse).toHaveBeenCalledWith(mockRequest.url, true);
    expect(isAuthorised).not.toHaveBeenCalled();
    expect(response).toEqual(expectedRespond);
  });

  it('should authorize users', async () => {
    mockRequest = {
      ...mockRequest,
      url: {
        query: { timeWindow: '1d' },
      },
      cookies: {
        apiKey: '123',
      },
    };
    await exchangeMetrics(mockRequest, mockResponse);
    expect(url.parse).toHaveBeenCalledWith(mockRequest.url, true);
    expect(isAuthorised).toHaveBeenCalled();
  });
});
