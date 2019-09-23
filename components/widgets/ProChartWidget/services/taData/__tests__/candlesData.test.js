import candlesData from '../candlesData';

describe('candlesData function', () => {
  it('returns same instance on same exchange succes', () => {
    const dataService1 = candlesData('bitfinex');
    const dataService2 = candlesData('bitfinex');
    expect(dataService1).toBe(dataService2);
  });

  it('returns new istance on new exchange succes', () => {
    const dataService1 = candlesData('bitfinex');
    const dataService2 = candlesData('binance');
    expect(dataService1).not.toBe(dataService2);
  });

  it('throws error on unsupported exchange succes', () => {
    expect(() => candlesData('test')).toThrowErrorMatchingSnapshot();
  });
});
