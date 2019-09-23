const candlesData = require('../index').default;

// const symbols = [
//   ['BTC', 'USD'],
//   ['ETH', 'USD'],
//   ['ZRX', 'USD'],
//   ['OMG', 'USD']
// ];

// Initiate exchange

const dataSource = candlesData('bitfinex');
const { options } = dataSource;

// Add pairs with time frame
dataSource.addTradingPair(['BTC', 'USD'], {
  timeFrame: options.timeFrames['1m'],
});
dataSource.addTradingPair(['ETH', 'USD'], {
  timeFrame: options.timeFrames['15m'],
});
dataSource.addTradingPair(['ZRX', 'USD'], {
  timeFrame: options.timeFrames['1m'],
});

// Open connection
dataSource.start();

// Subscription to data Observable for all channels
dataSource.data$().subscribe(data => {
  console.log(data);
});
