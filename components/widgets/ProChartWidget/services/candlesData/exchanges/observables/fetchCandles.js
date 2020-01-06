import { timer, from, Observable, throwError } from 'rxjs';
import { delayWhen, retryWhen, switchMap } from 'rxjs/operators';

export const fetchCandles$ = (restApiUrl, requestOptions = {}) => {
  return Observable.create(async observer => {
    try {
      const response = await fetch(restApiUrl, requestOptions);

      if (response.status === 200) {
        const responseBody = await response.json();

        if (responseBody.data) {
          observer.next(responseBody.data);
          observer.complete();
        }
      } else {
        observer.error(Error(response.status));
      }
    } catch (e) {
      observer.error(Error(e));
    }
  }).pipe(
    switchMap(response => {
      return [response];
    }),
    retryWhen(errors => errors.pipe(delayWhen(() => timer(5000))))
  );
};

export default fetchCandles$;
