import u from 'updeep';

const updateCandles = (update, candlesData, formatFn) => {
  const [pair, data, timeFrame] = update;
  const channel = `${timeFrame}:${pair}`;

  // INITIAL SHAPSHOT
  if (Array.isArray(data[0])) {
    const candles = data.map(point => formatFn(point));

    return u(
      {
        [channel]: {
          pair,
          timeFrame,
          candles,
          updates: null,
          meta: { isSnapshot: true, isNewCandle: false, isUpdateCandle: false },
        },
      },
      candlesData
    );
  }

  // UPDATE
  if (!Array.isArray(data[0])) {
    const entry = formatFn(data);

    let meta = { isSnapshot: false };
    const candles = [...candlesData[channel].candles];

    const isLastNthDataPoint = points => {
      let isNew = true;
      let i = 0;
      for (i; i <= points - 1; i += 1) {
        if (candles[i] && entry.time === candles[i].time) {
          isNew = false;
          break;
        }
      }

      return [i, isNew];
    };

    const [i, isNew] = isLastNthDataPoint(2);

    if (isNew) {
      candles.unshift(entry);
      meta = { ...meta, isNewCandle: true, isUpdateCandle: false };
    } else {
      candles[candles.length - i] = entry;
      let isUpdateCandle = false;
      if (i === 0) {
        isUpdateCandle = true;
      }
      meta = { ...meta, isNewCandle: false, isUpdateCandle };
    }

    return u(
      {
        [channel]: {
          candles: [...candles],
          updates: entry,
          meta,
        },
      },
      candlesData
    );
  }
  return null;
};

export default updateCandles;
