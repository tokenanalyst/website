/* eslint-disable camelcase */
const { reduce } = require('rxjs/operators');

module.exports = flow => {
  return source => {
    return source.pipe(
      reduce((acc, val) => {
        Object.values(val).forEach(point => {
          const {
            date,
            datetime,
            inflow,
            inflow_usd,
            outflow,
            outflow_usd,
          } = point;

          const time = datetime || date;
          if (!acc[date]) {
            acc[time] = { date: time };
            acc[time][flow] = 0;
            acc[time][`${flow}_usd`] = 0;
          }
          acc[time] = {
            ...acc[time],
            [flow]: acc[time][flow] + (flow === 'inflow' ? inflow : outflow),
            [`${flow}_usd`]:
              acc[time][`${flow}_usd`] +
              (flow === 'inflow' ? inflow_usd : outflow_usd),
          };
        });

        return acc;
      }, {})
    );
  };
};
