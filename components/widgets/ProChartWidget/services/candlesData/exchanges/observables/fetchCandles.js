import { timer, from } from 'rxjs';
import { tap, delayWhen, retryWhen, switchMap } from 'rxjs/operators';

export const fetchCandles$ = (restApiUrl, requestOptions = {}) => {
  return from(fetch(restApiUrl, requestOptions)).pipe(
    switchMap(async response => {
      if (response.status === 200) {
        const responseBody = await response.json();

        if (responseBody.data) {
          return responseBody.data;
        }
        return responseBody;
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
};

export default fetchCandles$;
