import { timer, from, Observable } from 'rxjs';
import { tap, delayWhen, retryWhen, switchMap, map } from 'rxjs/operators';

export const fetchDataFromApi$ = apiCall => {
  return Observable.create(async observer => {
    try {
      const result = await apiCall();

      if (result.status === 200) {
        observer.next(result);
        observer.complete();
      } else {
        observer.error(Error(result));
      }
    } catch (e) {
      observer.error(Error(e));
    }
  }).pipe(
    switchMap(response => {
      return [response];
    }),
    retryWhen(errors =>
      errors.pipe(
        map(val => {
          return val;
        }),
        tap(val => console.log(`Retrying in 5 seconds...`)),
        delayWhen(() => timer(5000))
      )
    )
  );
};

export default fetchDataFromApi$;
