/* global mocksClear */
import pingWs from '../pingWs';

const spySendFn = jest.fn();
const spyCbFn = jest.fn();

beforeEach(() => {
  mocksClear([spySendFn, spyCbFn]);
});

afterEach(() => {
  jest.clearAllTimers();
});

describe('pingWs function', () => {
  it('sends a ping and call cb success', () => {
    jest.useFakeTimers();
    const msg = {
      event: 'ping',
    };
    const td = pingWs(spySendFn, spyCbFn);

    expect(td).not.toBeNaN();

    jest.runTimersToTime(10000);

    expect(spySendFn).toHaveBeenCalledTimes(5);

    expect(spySendFn).toHaveBeenLastCalledWith(JSON.stringify(msg));

    expect(spyCbFn).toHaveBeenCalledTimes(5);
  });
});
