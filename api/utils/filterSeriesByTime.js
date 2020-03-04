const moment = require('moment');

module.exports = (series, timeRange) => {
  const formatDate = item => {
    if (!item) {
      return null;
    }

    if (item.timestamp) {
      return item.timestamp;
    }

    if (item.hour && item.date) {
      return `${item.date} ${item.hour}`;
    }

    return `${item.date} 23:59:59`;
  };

  if (timeRange < moment.utc(formatDate(series[0]))) {
    // console.log(series[0]);
    return series;
  }

  const filteredArray = series
    .reduce((acc, curr, index) => {
      if (index === 0) return acc;
      return curr && moment.utc(formatDate(curr)).valueOf() > timeRange
        ? [curr, ...acc]
        : acc;
    }, [])
    .reverse();

  return filteredArray;
};
