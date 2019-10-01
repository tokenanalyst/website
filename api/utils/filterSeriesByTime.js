const moment = require('moment');

module.exports = (series, timeRange) => {
  // console.log(series)
  const formatDate = item => {
    if (item.timestamp) {
      return item.timestamp;
    }

    if (item.hour && item.date) {
      return `${item.date} ${item.hour}`;
    }

    return item.date;
  };

  return series
    .filter(item => item)
    .filter(item => moment.utc(formatDate(item)).valueOf() > timeRange);
};
