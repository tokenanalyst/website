/* eslint-disable camelcase */
const { reduce } = require('rxjs/operators');

module.exports = metric => {
  return source => {
    return source.pipe(
      reduce((acc, val) => {
        Object.values(val).forEach(point => {
          const { date, datetime } = point;

          const time = datetime || date;
          if (!acc[date]) {
            acc[time] = { date: time };
            acc[time][metric] = 0;
            acc[time][`${metric}_usd`] = 0;
          }
          acc[time] = {
            ...acc[time],
            [metric]: acc[time][metric] + point[metric],
            [`${metric}_usd`]:
              acc[time][`${metric}_usd`] + point[`${metric}_usd`],
          };
        });

        return acc;
      }, {})
    );
  };
};
