import { Observable, iif, throwError, of } from 'rxjs';
import {
  retryWhen,
  switchMap,
  concatMap,
  delay,
  catchError,
} from 'rxjs/operators';

export const fetchCandles$ = (restApiUrl, requestOptions = {}) => {
  return Observable.create(async observer => {
    try {
      const response = await fetch(restApiUrl, requestOptions);

      if (response.status === 200) {
        const responseBody = await response.json();

        if (responseBody.data) {
          observer.next(responseBody.data);
          return observer.complete();
        }
      } else {
        return observer.error(Error(response.status));
      }
    } catch (e) {
      return observer.error(e);
    }
  }).pipe(
    switchMap(response => {
      return [response];
    }),
    retryWhen(errors =>
      errors.pipe(
        concatMap((e, i) =>
          iif(() => i > 5, throwError(e), of(e).pipe(delay(500)))
        )
      )
    ),
    catchError(() => of([]))
  );
};

export default fetchCandles$;
