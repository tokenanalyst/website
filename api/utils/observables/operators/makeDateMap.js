const { Observable } = require('rxjs');
const takeRight = require('lodash/takeRight');

module.exports = period => {
  return source => {
    return Observable.create(subscriber => {
      const subscription = source.subscribe(
        value => {
          if (value.status !== 200) {
            throw value.data;
          }
          try {
            const data = period ? takeRight(value.data, period) : value.data;

            const dateMap = data.reduce((acc, point) => {
              const { date, datetime } = point;
              const key = datetime || date;

              return { ...acc, [key]: point };
            }, {});

            subscriber.next(dateMap);
          } catch (err) {
            subscriber.error(err);
          }
        },
        err => subscriber.error(err),
        () => subscriber.complete()
      );

      return subscription;
    });
  };
};
