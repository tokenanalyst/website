const filterSeriesByTime = require('./filterSeriesByTime');

module.exports = (timeLimit, series, endpoint) => {
  if (!timeLimit) {
    return series;
  }

  if (endpoint === 'kaiko') {
    const { data } = series;

    return {
      ...series,
      data: data.filter(item => {
        return item.timestamp > timeLimit;
      }),
    };
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
