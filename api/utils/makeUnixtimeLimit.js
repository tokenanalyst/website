const moment = require('moment');

module.exports = (timeWindow, tierTimeLimit) =>
  moment()
    .subtract(tierTimeLimit, timeWindow === '1h' ? 'hours' : 'days')
    .valueOf();
