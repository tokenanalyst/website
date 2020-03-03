export const getUTCDate = datum => {
  const { date, hour } = datum;
  if (datum.date && datum.hour) {
    const splitDate = date.split('-');
    const splitHour = hour.split(':');
    return Date.UTC(
      splitDate[0],
      splitDate[1] - 1,
      splitDate[2],
      splitHour[0],
      splitHour[1],
      splitHour[2]
    );
  }
  if (datum.day) {
    const splitDate = datum.day.split('-');

    return Date.UTC(splitDate[0], splitDate[1] - 1, splitDate[2]);
  }

  const splitDate = date.split('-');

  return Date.UTC(splitDate[0], splitDate[1] - 1, splitDate[2]);
};
