const formatter = {
  tradingview: data => {
    const [time, open, close, high, low, volume] = data;
    return {
      time,
      open,
      close,
      high,
      low,
      volume,
    };
  },
  default: data => {
    const [time, open, close, high, low, volume] = data;
    return {
      time,
      open,
      close,
      high,
      low,
      volume,
    };
  },
};

export default formatter;
