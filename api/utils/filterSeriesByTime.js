const moment = require('moment');

export const filterSeriesByTime = (series, timeRange) =>
  series
    .filter(item => item)
    .filter(item => moment(item.date).valueOf() > timeRange);
