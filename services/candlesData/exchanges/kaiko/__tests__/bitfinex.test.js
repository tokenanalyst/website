/* global mocksClear */
import { Observable, Subject } from 'rxjs';
import makeSubs from '../utils/makeSubs';
import bitfinex from '../bitfinex';
import { subPairs, unsubPairs } from '../utils/wsUtils';
import mockWsData from './__fixtures__/wsData.json';
import { ERROR, wsRootUrl, restRootUrl } from '../const';
import { makeDataStream } from '../utils';
import { fetchCandles } from '../../../utils';

jest.mock('../utils/wsUtils');
jest.mock('../utils/makeDataStream');
jest.mock('../../../utils/makeCandlesRestApiUrl');
jest.mock('../../../utils/fetchCandles');

const ws = { send: jest.fn(), close: jest.fn(), subs: {} };

const wsInstance$ = new Observable(observer => {
  observer.next(ws);
});

const mockObservable = new Subject();

describe('bitfinex connector', () => {
  beforeEach(() => {
    mocksClear([makeDataStream, subPairs, unsubPairs, ws.send, ws.close]);
  });
  it('detects no pairs defined success', () => {
    const status = bitfinex.start();
    expect(status).toEqual(new Error(ERROR.NO_INIT_PAIRS_DEFINED));
  });

  it('throws error on addTradingPair success', () => {
    const timeFrame = '1m';
    makeDataStream.mockImplementation(() => [wsInstance$, mockObservable]);
    const result = bitfinex.addTradingPair(['ETH', 'USD'], { timeFrame });

    expect(result).toEqual(bitfinex.getPairs());

    bitfinex.start();
    expect(bitfinex.addTradingPair()).toEqual(
      new Error(ERROR.NO_CONFIGURATION_PROVIDED)
    );
    expect(bitfinex.addTradingPair('ETHUSD', { timeFrame })).toEqual(
      new Error(ERROR.PAIR_IS_NOT_ARRAY)
    );
    expect(bitfinex.addTradingPair('ETHUSD')).toEqual(
      new Error(ERROR.NO_CONFIGURATION_PROVIDED)
    );
    expect(bitfinex.addTradingPair(['ETH', 'USD'], {})).toEqual(
      new Error(ERROR.NO_TIME_FRAME_PROVIDED)
    );
    expect(bitfinex.addTradingPair(['ETH', 'USD'], { timeFrame })).toEqual(
      new Error(ERROR.PAIR_ALREADY_DEFINED)
    );

    bitfinex.stop();
  });

  it('throws error on removeTradingPair success', () => {
    const timeFrame = '1m';

    expect(bitfinex.removeTradingPair()).toEqual(
      new Error(ERROR.PAIR_IS_NOT_ARRAY)
    );
    expect(bitfinex.removeTradingPair('ETHUSD', timeFrame)).toEqual(
      new Error(ERROR.PAIR_IS_NOT_ARRAY)
    );
    expect(bitfinex.removeTradingPair(['ETH', 'USD'])).toEqual(
      new Error(ERROR.NO_TIME_FRAME_PROVIDED)
    );
    expect(bitfinex.removeTradingPair(['ETH', 'USD'], timeFrame)).toEqual(
      new Error(ERROR.PAIR_NOT_DEFINED)
    );

    bitfinex.addTradingPair(['ETH', 'USD'], { timeFrame });

    ws.subs = {
      123: {
        key: `trade:${timeFrame}:tETHUSD`,
      },
    };
    makeDataStream.mockImplementation(() => [wsInstance$, mockObservable]);
    bitfinex.start();
    expect(bitfinex.removeTradingPair(['ETH', 'USD'], timeFrame)).toEqual(
      bitfinex.getPairs()
    );

    bitfinex.stop();
    ws.subs = {};
  });

  it('runs success', done => {
    const timeFrame = '1m';
    makeDataStream.mockImplementation(() => [wsInstance$, mockObservable]);
    bitfinex.setDebug(true);
    bitfinex.addTradingPair(['ETH', 'USD'], { timeFrame });
    const status = bitfinex.start();
    expect(status).toEqual({
      isRunning: true,
      exchange: { name: 'bitfinex' },
      debug: true,
    });
    const tradingPairs = bitfinex.getPairs();
    expect(makeDataStream).toHaveBeenCalledWith(wsRootUrl, {
      initSubs: makeSubs(tradingPairs),
      keepAlive: true,
    });

    const data$ = bitfinex.data$();
    expect(data$).toBeInstanceOf(Observable);

    data$.subscribe(data => {
      expect(Object.values(data)[0]).toContainAllKeys([
        'pair',
        'timeFrame',
        'candles',
        'updates',
        'meta',
      ]);
      bitfinex.stop();
      done();
    });
    mockObservable.next({
      data: JSON.stringify({
        event: 'subscribed',
        key: 'trade:1m:tBTCUSD',
        chanId: 1,
      }),
    });
    mockObservable.next({ data: JSON.stringify(mockWsData.event.data) });
  });

  it('adds and removes trading pair before run success', () => {
    const timeFrame = '1m';
    makeDataStream.mockImplementation(() => [wsInstance$, mockObservable]);
    bitfinex.addTradingPair(['ETH', 'USD'], { timeFrame });
    let tradingPairs = bitfinex.getPairs();
    expect(subPairs).not.toHaveBeenCalled();
    expect(tradingPairs).toEqual({
      '1m:ETHUSD': { timeFrame, symbols: ['ETH', 'USD'], ticker: 'ETHUSD' },
    });

    bitfinex.addTradingPair(['ZRX', 'USD'], { timeFrame });
    tradingPairs = bitfinex.getPairs();
    expect(subPairs).not.toHaveBeenCalled();
    expect(tradingPairs).toEqual({
      '1m:ETHUSD': { timeFrame, symbols: ['ETH', 'USD'], ticker: 'ETHUSD' },
      '1m:ZRXUSD': { timeFrame, symbols: ['ZRX', 'USD'], ticker: 'ZRXUSD' },
    });

    bitfinex.removeTradingPair(['ZRX', 'USD'], timeFrame);
    tradingPairs = bitfinex.getPairs();
    expect(unsubPairs).not.toHaveBeenCalled();
    expect(tradingPairs).toEqual({
      '1m:ETHUSD': { timeFrame, symbols: ['ETH', 'USD'], ticker: 'ETHUSD' },
    });

    bitfinex.removeTradingPair(['ETH', 'USD'], timeFrame);
    tradingPairs = bitfinex.getPairs();
    expect(unsubPairs).not.toHaveBeenCalled();
    expect(tradingPairs).toEqual({});
  });

  it('adds and removes trading pair before after run success', () => {
    const timeFrame = '1m';
    makeDataStream.mockImplementation(() => [wsInstance$, mockObservable]);
    bitfinex.setDebug(false);
    bitfinex.addTradingPair(['ETH', 'USD'], { timeFrame });
    bitfinex.start();
    let tradingPairs = bitfinex.getPairs();
    expect(subPairs).not.toHaveBeenCalled();
    expect(tradingPairs).toEqual({
      '1m:ETHUSD': { timeFrame, symbols: ['ETH', 'USD'], ticker: 'ETHUSD' },
    });

    bitfinex.addTradingPair(['ZRX', 'USD'], { timeFrame });
    tradingPairs = bitfinex.getPairs();
    expect(subPairs).toHaveBeenCalledTimes(1);
    expect(tradingPairs).toEqual({
      '1m:ETHUSD': { timeFrame, symbols: ['ETH', 'USD'], ticker: 'ETHUSD' },
      '1m:ZRXUSD': { timeFrame, symbols: ['ZRX', 'USD'], ticker: 'ZRXUSD' },
    });

    ws.subs = {
      ETHUSD: { key: 'trade:1m:tETHUSD' },
      ZRXUSD: { key: 'trade:1m:tZRXUSD' },
    };
    bitfinex.removeTradingPair(['ZRX', 'USD'], timeFrame);
    tradingPairs = bitfinex.getPairs();
    expect(unsubPairs).toHaveBeenCalledTimes(1);
    expect(tradingPairs).toEqual({
      '1m:ETHUSD': { timeFrame, symbols: ['ETH', 'USD'], ticker: 'ETHUSD' },
    });

    bitfinex.removeTradingPair(['ETH', 'USD'], timeFrame);
    tradingPairs = bitfinex.getPairs();
    expect(unsubPairs).toHaveBeenCalledTimes(2);
    expect(tradingPairs).toEqual({});
    bitfinex.stop();
  });

  it('gets status success', () => {
    expect(bitfinex.getStatus()).toEqual({
      isRunning: false,
      exchange: {
        name: 'bitfinex',
      },
      debug: false,
    });
  });

  it('fetchCandles success', async () => {
    const pair = ['BTC', 'USD'];
    const timeFrame = '1m';
    const start = 1565885185000;
    const end = 1565971645000;
    const limit = 1000;
    await bitfinex.fetchCandles(pair, timeFrame, start, end, limit);
    expect(fetchCandles).toHaveBeenCalled();

    expect(fetchCandles.mock.calls[0][0]).toEqual(restRootUrl);
    expect(fetchCandles.mock.calls[0][1]).toEqual(pair);
    expect(fetchCandles.mock.calls[0][2]).toEqual(timeFrame);
    expect(fetchCandles.mock.calls[0][3]).toEqual(start);
    expect(fetchCandles.mock.calls[0][4]).toEqual(end);
    expect(fetchCandles.mock.calls[0][5]).toEqual(limit);
    expect(fetchCandles.mock.calls[0][6].status).toEqual(bitfinex.getStatus());
    expect(fetchCandles.mock.calls[0][6]).toContainKeys(['status', 'options']);
  });
});
