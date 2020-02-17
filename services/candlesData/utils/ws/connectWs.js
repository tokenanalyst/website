import omit from 'lodash/omit';
import WS from 'ws';
import conf from '../../env';
import pingWs from './pingWs';
// eslint-disable-next-line import/no-cycle
import reconnectWs from './reconnectWs';

function connectWs(url, opts = {}) {
  const defOpts = {
    timeout: conf.wsTimeout,
    retryDelay: conf.wsRetryDelay,
    maxRetry: conf.wsMaxRetry,
    initSubs: [],
  };

  const connOpts = { ...defOpts, ...opts };
  const ws =
    typeof window !== 'undefined' && window.WebSocket
      ? new WebSocket(url, connOpts.wsProtocols)
      : new WS(url);
  let pongTime = new Date().getTime();
  let td;
  const { onOpen, onClose, onMessage, onError } = connOpts;

  const isStale = pingTime => {
    if (pingTime - pongTime > connOpts.timeout) {
      ws.close(3000, 'Connection timeout.');
      if (td) {
        clearInterval(td);
      }
      if (onError) {
        onError(new Error('Stale connection detected.'), null);
      }
    }
  };

  ws.subs = connOpts.subs || {};

  ws.addEventListener('open', event => {
    if (connOpts.keepAlive) {
      td = pingWs(ws.send.bind(ws), isStale);
    }

    const { initSubs } = connOpts;
    const subs = Object.keys(ws.subs);

    if (initSubs.length && !subs.length) {
      initSubs.forEach(sub => {
        ws.send(JSON.stringify(sub));
      });
    } else {
      subs.forEach(sub => {
        ws.send(JSON.stringify(ws.subs[sub]));
        ws.subs = omit(ws.subs, sub);
      });
    }

    if (onOpen) {
      onOpen(null, event);
    }
  });

  ws.addEventListener('close', event => {
    if (td) {
      clearInterval(td);
    }

    if (event.code !== 1000 && event.code !== 1005) {
      reconnectWs(url, { ...connOpts, subs: { ...ws.subs } });
    }

    if (onClose) {
      onClose(null, event);
    }
  });

  ws.addEventListener('error', err => {
    if (onError) {
      onError(err, null);
    }
  });

  ws.addEventListener('message', event => {
    const msg = JSON.parse(event.data);

    switch (msg.event) {
      case 'subscribed': {
        const { channel, key } = msg;
        ws.subs = {
          ...ws.subs,
          [msg.chanId]: {
            channel,
            key,
            event: 'subscribe',
          },
        };

        break;
      }
      case 'unsubscribed': {
        ws.subs = omit(ws.subs, [msg.chanId]);
        break;
      }
      case 'pong':
        pongTime = msg.ts;
        break;
      default:
    }

    if (onMessage) {
      onMessage(null, msg);
    }
  });
  return ws;
}

export default connectWs;
