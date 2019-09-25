import { timer, from } from 'rxjs';
import { tap, delayWhen, retryWhen, switchMap, map } from 'rxjs/operators';

const fetchDataFromApi$ = apiCall => {
  return from(apiCall()).pipe(
    switchMap(response => {
      return [response];
    }),
    retryWhen(errors =>
      errors.pipe(
        map(val => {
          return val;
        }),
        // tap(val => console.log(`Retrying...`)),
        delayWhen(() => timer(5000))
      )
    )
  );
};

export default fetchDataFromApi$;
