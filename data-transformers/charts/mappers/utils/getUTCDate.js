export const getUTCDate = datum => {
  if (datum.date && datum.hour) {
    const { date, hour } = datum;
    const splitDate = date.split("-");
    const splitHour = hour.split(":");
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
    const splitDate = datum.day.split("-");

    return Date.UTC(splitDate[0], splitDate[1] - 1, splitDate[2]);
  }
};
