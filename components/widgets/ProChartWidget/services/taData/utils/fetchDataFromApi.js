import { timer, from } from 'rxjs';
import { tap, delayWhen, retryWhen, switchMap, map } from 'rxjs/operators';

const fetchDataFromApi$ = (apiCall, options) => {
  return from(apiCall()).pipe(
    // tap(val => console.log(val)),
    switchMap(response => {
      return [response];
      // if (response.status === 200) {
      //   return response.json();
      // }
      // throw new Error(`Error ${response.status}`);
    }),
    retryWhen(errors =>
      errors.pipe(
        // eslint-disable-next-line no-console
        map(val => {
          return val;
        }),
        tap(val => console.log(`${val} Retrying...`)),
        delayWhen(() => timer(5000))
      )
    )
  );
};

export default fetchDataFromApi$;
