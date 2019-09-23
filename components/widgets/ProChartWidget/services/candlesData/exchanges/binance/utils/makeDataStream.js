import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { connectWs } from '../../../utils/ws';

let ws;

const wsInstance$ = new Subject();

const makeDataStream = (wsUrlFn, options) => {
  const dataFeed$ = Observable.create(observer => {
    console.warn('Binance dataFeed$ opened');

    const pushEvent = event => observer.next(event);

    ws = connectWs(wsUrlFn(), {
      initSubs: (options && options.initSubs) || {},
      onReconnect: (err, data) => {
        ws.removeEventListener('message', pushEvent);

        ws = data;

        ws.addEventListener('message', pushEvent);
      },
    });
    ws.addEventListener('message', pushEvent);

    wsInstance$.next(ws);

    return () => {
      if (ws) {
        console.warn('Binance dataFeed$ closed');
        ws.close();
      }
    };
  }).pipe(filter(msg => msg));

  return [wsInstance$, dataFeed$];
};

export default makeDataStream;
