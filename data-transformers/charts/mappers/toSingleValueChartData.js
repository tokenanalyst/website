import { TIME_WINDOWS } from '../../../constants/filters';
import { getUTCDate } from './utils/getUTCDate';

export const toSingleValueChartData = (
  data,
  timeKey,
  valueKey,
  timeWindow = TIME_WINDOWS.oneDay
) =>
  data.map(datum =>
    timeWindow === TIME_WINDOWS.oneHour
      ? {
          time: new Date(getUTCDate(datum)).getTime() / 1000,
          value: datum[valueKey],
        }
      : {
          time: datum[timeKey],
          value: datum[valueKey],
        }
  );
