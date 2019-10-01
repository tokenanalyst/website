const { filterSeriesByTime } = require('./filterSeriesByTime');

export const limitDataForFreeUsers = (timeLimit, series) => {
  if (!timeLimit) {
    return series;
  }

  const { inflow, netflow, outflow, price, overall } = series;

  return {
    inflow: filterSeriesByTime(inflow, timeLimit),
    outflow: filterSeriesByTime(outflow, timeLimit),
    netflow: filterSeriesByTime(netflow, timeLimit),
    price: filterSeriesByTime(price, timeLimit),
    overall,
  };
};
