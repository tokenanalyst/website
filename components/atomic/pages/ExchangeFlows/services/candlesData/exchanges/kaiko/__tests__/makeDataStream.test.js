/* global stfy */
import { WebSocket, Server } from 'mock-socket';
import connectWs from 'utils/ws/connectWs';
import { Observable } from 'rxjs';
import makeDataStream from '../utils/makeDataStream';

jest.mock('utils/ws/connectWs');

const wsUrl = 'ws://localhost:8080';
let mockServer;
let ws = new WebSocket(wsUrl);

const spyCbFn = {
  onOpen: jest.fn(),
  onClose: jest.fn(),
  onError: jest.fn(),
  onMessage: jest.fn(),
};

beforeEach(() => {
  jest.useFakeTimers();
  Object.keys(spyCbFn).forEach(fn => {
    spyCbFn[fn].mockClear();
  });
  mockServer = new Server(wsUrl);
  ws = new WebSocket(wsUrl);
  connectWs.mockImplementation(() => ws);
});

afterEach(() => {
  mockServer.close();
  jest.clearAllTimers();
});

describe('makeDataStream function', () => {
  it('returns wsInstance and dataFeed obsevables success', () => {
    const [wsInstance$, dataFeed$] = makeDataStream(wsUrl, {});
    expect(wsInstance$).toBeInstanceOf(Observable);
    expect(dataFeed$).toBeInstanceOf(Observable);
  });
});
