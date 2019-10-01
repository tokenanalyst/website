const moment = require('moment');

module.exports = (timeWindow, tierTimeLimit, isAuthorised) =>
  // isAuthorised
  //   ? moment()
  //       .subtract(tierTimeLimit, timeWindow === '1h' ? 'hours' : 'days')
  //       .valueOf()
  //   : moment().valueOf();
  moment()
    .subtract(tierTimeLimit, timeWindow === '1h' ? 'hours' : 'days')
    .valueOf();
