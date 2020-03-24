const { map } = require('rxjs/operators');

const makeFlowSummary = require('../../makeFlowSummary');

module.exports = (direction, summary, window = 'day') => {
  return source => {
    return source.pipe(
      map(val => {
        const dataPoints = Object.values(val);

        const data = dataPoints.map(point => {
          return point[`${direction}_usd`];
        });

        const dataSummary = summary.reduce((acc, period) => {
          const key = window === 'day' ? `${period}d` : `${period}h`;

          return {
            ...acc,
            [key]: makeFlowSummary(period, dataPoints, direction),
          };
        }, {});

        return {
          [direction]: {
            data,
            summary: {
              ...dataSummary,
            },
          },
        };
      })
    );
  };
};
