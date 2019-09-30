export const filterSeriesByExchange = (series, exchangeName) => {
  if (!exchangeName) {
    return series;
  }

  return series.filter(item => {
    return item.exchange.toLowerCase() === exchangeName.toLowerCase();
  });
};
