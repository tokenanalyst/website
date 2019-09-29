export const filterSeriesByExchange = (series, exchangeName) => {
  return series.filter(item => {
    // console.log(item)
    return item.exchange.toLowerCase() === exchangeName;
  });
};
