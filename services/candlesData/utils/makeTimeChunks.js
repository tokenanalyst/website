const moment = require('moment');

const makeTimeChunks = (start, end, chunkSize) => {
  const startTime = start;
  const chunks = [];
  const endTime = end;
  for (let i = startTime - 1; i < endTime; i += chunkSize) {
    const fromTime = i + 1;
    let toTime = (i + chunkSize > endTime) ?
      (end) :
      (i + chunkSize);

    // snap endTime to the end of the month
    const mFromTime = moment(fromTime).utc();
    if (mFromTime.startOf('month') !== moment(toTime).utc().startOf('month')) {
      toTime = mFromTime.endOf('month').valueOf();
      i = toTime - chunkSize;
    }
    chunks.push({ fromTime, toTime });
  }
  return chunks;
};

export default makeTimeChunks;
