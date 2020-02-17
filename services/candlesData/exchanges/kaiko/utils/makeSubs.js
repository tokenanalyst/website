const makeSubs = pairs => {
  const subscriptions = [];

  for (const channel in pairs) {
    const { timeFrame, symbols } = pairs[channel];

    subscriptions.push({
      event: 'subscribe',
      channel: 'candles',
      key: `trade:${timeFrame}:t${symbols[0]}${symbols[1]}`,
    });
  }

  return subscriptions;
};

export default makeSubs;
