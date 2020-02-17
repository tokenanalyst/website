import conf from '../../env';

const ping = (sendFn, cb, pingTime) =>
  setInterval(() => {
    const msg = JSON.stringify({
      event: 'ping',
    });
    sendFn(msg);
    cb(new Date().getTime());
  }, pingTime || conf.wsPingTime);

export default ping;
