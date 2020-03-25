import { Observable, iif, throwError, of } from 'rxjs';
import {
  retryWhen,
  switchMap,
  concatMap,
  delay,
  catchError,
} from 'rxjs/operators';

export const fetchDataFromApi$ = apiCall => {
  return Observable.create(async observer => {
    try {
      const result = await apiCall();
      if (result.status === 200) {
        observer.next(result);
        return observer.complete();
      }
      return observer.error(Error(result));
    } catch (e) {
      return observer.error(Error(e));
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
    catchError(() => throwError())
  );
};

export default fetchDataFromApi$;
