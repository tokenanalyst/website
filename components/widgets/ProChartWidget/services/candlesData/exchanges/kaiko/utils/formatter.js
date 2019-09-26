const formatter = {
  tradingview: data => {
    const { timestamp, open, close, high, low, volume } = data;
    return {
      time: timestamp,
      open,
      close,
      high,
      low,
      volume,
    };
  },
  default: data => {
    const { timestamp, open, close, high, low, volume } = data;
    return {
      time: timestamp,
      open,
      close,
      high,
      low,
      volume,
    };
  },
};

export default formatter;
