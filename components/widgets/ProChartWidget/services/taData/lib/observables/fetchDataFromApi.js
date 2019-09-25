import { timer, from, Observable } from 'rxjs';
import { tap, delayWhen, retryWhen, switchMap, map } from 'rxjs/operators';

export const fetchDataFromApi_2$ = apiCall => {
  return Observable.create(observer => {
    apiCall().then(
      result => {
        console.log(result);
        observer.next(result);
        observer.complete();
      },
      err => {
        observer.error(err);
        observer.complete();
      }
    );
  }).pipe(
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
