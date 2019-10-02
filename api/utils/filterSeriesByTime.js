const moment = require('moment');

module.exports = (series, timeRange) => {
  const formatDate = item => {
    if (!item) {
      throw Error();
    }
    if (item.timestamp) {
      return item.timestamp;
    }

    if (item.hour && item.date) {
      return `${item.date} ${item.hour}`;
    }

    return item.date;
  };

  try {
    if (timeRange < moment.utc(formatDate(series[0]))) {
      return series;
    }
  } catch (e) {}

  let filteredArray = [];

  for (let i = series.length - 1; (i -= 1); ) {
    if (series[i] && moment.utc(formatDate(series[i])).valueOf() > timeRange) {
      filteredArray.unshift(series[i]);
    } else {
      break;
    }
    if (i == 0) {
      break;
    }
  }

  return filteredArray;
};
