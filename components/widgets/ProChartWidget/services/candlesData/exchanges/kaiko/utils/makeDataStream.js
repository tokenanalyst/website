import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, repeat } from 'rxjs/operators';
import { connectWs } from '../../../utils/ws';

let ws;

const wsInstance$ = new Subject();

const reconnect$ = new Subject();

const makeDataStream = (wsUrl, options) => {
  ws = connectWs(wsUrl, {
    wsProtocols: options.wsProtocols,
    initSubs: (options && options.initSubs) || {},
    keepAlive: true,
    onReconnect: (err, data) => {
      ws = data;
      reconnect$.next();
    },
  });

  const dataFeed$ = Observable.create(observer => {
    ws.addEventListener('message', event => {
      observer.next(event);
    });

    wsInstance$.next(ws);
    return () => {
      if (ws.readyState === 1) {
        ws.close();
        console.warn('Kaiko WS closed');
      }
      console.warn('Kaiko dataFeed$ closed');
    };
  }).pipe(
    filter(msg => msg),
    takeUntil(reconnect$),
    repeat()
  );

  return [wsInstance$, dataFeed$];
};

export default makeDataStream;
