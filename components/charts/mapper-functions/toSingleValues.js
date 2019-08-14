export const toSingleValues = (data, timeKey, valueKey) =>
  data.map(datum => ({
    time: datum[timeKey],
    value: datum[valueKey]
  }));
