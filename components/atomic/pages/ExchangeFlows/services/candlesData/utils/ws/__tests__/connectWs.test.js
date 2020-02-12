/* global stfy */
import { WebSocket, Server } from 'mock-socket';
import reconnectWs from '../reconnectWs';
import connectWs from '../connectWs';

jest.mock('../reconnectWs');

const wsUrl = 'ws://localhost:8080';
let mockServer;
let ws;

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
});

afterEach(() => {
  mockServer.close();
  ws.close();
  jest.clearAllTimers();
});

describe('connectWs function', () => {
  it('returns a ws instance success', () => {
    const connOpts = {
      ...spyCbFn,
    };
    ws = connectWs(wsUrl, connOpts);
    expect(ws).toBeInstanceOf(WebSocket);
    expect(ws).toHaveProperty('subs');
    expect(ws.subs).toEqual({});
  });

  it('saves subscriptions success', done => {
    const connOpts = {
      ...spyCbFn,
    };
    mockServer.on('connection', socket => {
      let chanId = 400;
      socket.on('message', data => {
        chanId += 1;
        const msg = JSON.parse(data);
        if (msg.event === 'subscribe') {
          socket.send(
            stfy({
              event: 'subscribed',
              channel: msg.channel,
              chanId,
              symbol: msg.symbol,
              pair: msg.symbol.substring(1),
            })
          );
        }
        if (msg.event === 'unsubscribe') {
          socket.send(
            stfy({
              event: 'unsubscribed',
              status: 'OK',
              chanId: msg.chanId,
            })
          );
        }
      });
    });
    ws = connectWs(wsUrl, connOpts);
    ws.send(
      stfy({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tETHUSD',
      })
    );
    ws.send(
      stfy({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tNECETH',
      })
    );
    jest.runTimersToTime(100);
    expect(Object.keys(ws.subs).length).toBe(2);
    ws.send(
      stfy({
        event: 'unsubscribe',
        chanId: Object.keys(ws.subs)[0],
      })
    );
    jest.runTimersToTime(100);
    expect(Object.keys(ws.subs).length).toBe(1);
    jest.runTimersToTime(100);
    ws.send(
      stfy({
        event: 'unsubscribe',
        chanId: Object.keys(ws.subs)[0],
      })
    );
    jest.runTimersToTime(100);
    expect(Object.keys(ws.subs).length).toBe(0);
    done();
  });

  it('pings success', done => {
    const connOpts = {
      ...spyCbFn,
    };
    mockServer.on('connection', socket => {
      socket.on('message', data => {
        const msg = JSON.parse(data);
        if (msg.event === 'ping') {
          socket.send(
            stfy({
              event: 'pong',
              ts: '123',
            })
          );
        }
      });
    });
    ws = connectWs(wsUrl, connOpts);
    ws.send(
      stfy({
        event: 'ping',
      })
    );
    jest.runTimersToTime(100);
    expect(spyCbFn.onMessage).toHaveBeenCalledWith(null, {
      event: 'pong',
      ts: '123',
    });
    done();
  });
});

describe('open event', () => {
  it('event listener open success', done => {
    const initSubs = [
      {
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tNECETH',
      },
      {
        event: 'subscribe',
        channel: 'book',
        symbol: 'tNECETH',
      },
    ];
    const connOpts = {
      ...spyCbFn,
      keepAlive: true,
      initSubs,
    };
    const expectedMsg = [
      { event: 'subscribe', channel: 'ticker', symbol: 'tNECETH' },
      { event: 'subscribe', channel: 'book', symbol: 'tNECETH' },
      { event: 'ping' },
    ];
    const receivedMsg = [];
    mockServer.on('connection', socket => {
      socket.on('message', data => {
        const msg = JSON.parse(data);
        receivedMsg.push(msg);
      });
    });
    connectWs(wsUrl, connOpts);
    jest.runTimersToTime(100);
    expect(connOpts.onOpen).toHaveBeenCalledTimes(1);
    connectWs(wsUrl);
    jest.runTimersToTime(2000);
    expect(receivedMsg).toEqual(expectedMsg);
    done();
  });

  it('resubscribe on open success', done => {
    const initSubs = [
      {
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tNECETH',
      },
    ];
    const subs = {
      123: {
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tETHUSD',
      },
      456: {
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD',
      },
    };
    const connOpts = {
      ...spyCbFn,
      initSubs,
      keepAlive: true,
      subs,
    };
    const expectedMsg = [
      { event: 'subscribe', channel: 'ticker', symbol: 'tETHUSD' },
      { event: 'subscribe', channel: 'ticker', symbol: 'tBTCUSD' },
      { event: 'ping' },
    ];
    const receivedMsg = [];
    mockServer.on('connection', socket => {
      socket.on('message', data => {
        const msg = JSON.parse(data);
        receivedMsg.push(msg);
      });
    });
    connectWs(wsUrl, connOpts);
    jest.runTimersToTime(100);
    expect(connOpts.onOpen).toHaveBeenCalledTimes(1);
    connectWs(wsUrl);
    jest.runTimersToTime(2000);
    expect(receivedMsg).toEqual(expectedMsg);
    done();
  });

  it('keeps connection alive success', done => {
    const connOpts = {
      ...spyCbFn,
      keepAlive: true,
    };
    const expectedMsg = [
      { event: 'ping' },
      { event: 'ping' },
      { event: 'ping' },
      { event: 'ping' },
    ];
    const receivedMsg = [];
    mockServer.on('connection', socket => {
      socket.on('message', data => {
        const msg = JSON.parse(data);
        receivedMsg.push(msg);
      });
    });
    connectWs(wsUrl, connOpts);
    jest.runTimersToTime(10000);
    expect(receivedMsg).toEqual(expectedMsg);
    done();
  });
});

describe('close event', () => {
  it('event listener clean close success', done => {
    const connOpts = {
      ...spyCbFn,
    };
    connectWs(wsUrl, connOpts);
    jest.runTimersToTime(100);
    mockServer.close();
    jest.runTimersToTime(100);
    expect(connOpts.onClose).toHaveBeenCalledTimes(1);
    expect(reconnectWs).not.toHaveBeenCalled();

    mockServer = new Server(wsUrl);
    connectWs(wsUrl);
    jest.runTimersToTime(100);
    mockServer.close();
    jest.runTimersToTime(100);
    done();
  });

  it('event listener not clean close success', done => {
    const connOpts = {
      ...spyCbFn,
    };
    connectWs(wsUrl, connOpts);
    jest.runTimersToTime(100);
    mockServer.close({
      code: 3000,
      reason: 'Error',
    });
    jest.runTimersToTime(100);
    expect(connOpts.onClose).toHaveBeenCalledTimes(1);
    expect(reconnectWs).toHaveBeenCalled();
    done();
  });
});

describe('error event', () => {
  it('event listener error from server success', done => {
    const connOpts = {
      ...spyCbFn,
    };
    connectWs(wsUrl, connOpts);
    mockServer.simulate('error');
    jest.runTimersToTime(100);
    expect(connOpts.onError).toHaveBeenCalledTimes(1);
    mockServer.close();

    mockServer = new Server(wsUrl);
    connectWs(wsUrl);
    jest.runTimersToTime(100);
    mockServer.close();
    jest.runTimersToTime(100);
    done();
  });

  it('event listener error no connection to server success', done => {
    const connOpts = {
      ...spyCbFn,
    };
    mockServer.close();
    jest.runTimersToTime(100);
    connectWs(wsUrl, connOpts);
    jest.runTimersToTime(100);
    expect(connOpts.onError).toHaveBeenCalledTimes(1);

    connectWs(wsUrl);
    jest.runTimersToTime(100);
    mockServer.close();
    jest.runTimersToTime(100);
    done();
  });
});
