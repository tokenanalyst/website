import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';
import { debugError, makeTimeChunks } from '.';
import { fetchCandles$ } from '../exchanges/observables';
import timePeriods from './timePeriods';

const fetchCandles = async (pair, timeFrame, start, end, limit, opts) => {
  const { status, options, makeCandlesUrlFn, requestOptions } = opts;

  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `${status.exchange.name} fetchCandles(${pair}, ${timeFrame}, ${start}, ${end}, ${limit})`
    );
  }

  // Set to max 1000, because Binance has the lowest limit among exchanges: 1000.
  // TO DO: add condition to set custom limit.
  const apiLimit = options.apiLimit || 1000;

  const timePeriod = timePeriods[timeFrame.slice(-1)];

  const unixTimeFrame = moment
    .duration(Number(timeFrame.slice(0, timeFrame.length - 1)), timePeriod)
    .asMilliseconds();

  const chunksSize = Math.ceil(apiLimit * unixTimeFrame);

  const timeIntervalChunks = makeTimeChunks(start, end, chunksSize);

  const fetchCallsArray = timeIntervalChunks
    .map(chunk => {
      try {
        return makeCandlesUrlFn(
          `${pair[0]}${pair[1]}`,
          timeFrame,
          chunk.fromTime,
          chunk.toTime
        );
      } catch (e) {
        return debugError(e.message, options.debug);
      }
    })
    .map(url => fetchCandles$(url, requestOptions));

  return forkJoin(...fetchCallsArray)
    .pipe(
      map(data => data.reduce((acc, item) => [...acc, ...item], [])),
      map(data =>
        data
          .map(candle => options.format(candle))
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      ),
      map(data =>
        data.map(item => {
          const { close, high, low, open, time, volume } = item;
          return {
            time,
            close: Number(close),
            high: Number(high),
            low: Number(low),
            open: Number(open),
            volume: Number(volume),
          };
        })
      )
    )
    .toPromise();
};

export default fetchCandles;
