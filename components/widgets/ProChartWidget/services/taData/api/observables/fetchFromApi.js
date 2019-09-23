import { timer, from } from 'rxjs';
import { tap, delayWhen, retryWhen, switchMap } from 'rxjs/operators';

export const fetchFromApi$ = restApiUrl =>
  from(fetch(restApiUrl)).pipe(
    switchMap(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(`Error ${response.status}`);
    }),
    retryWhen(errors =>
      errors.pipe(
        // eslint-disable-next-line no-console
        tap(() => console.log('Retrying...')),
        delayWhen(() => timer(5000))
      )
    )
  );

export default fetchFromApi$;
