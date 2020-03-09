import pick from 'lodash/pick';

export const formatDate = (item, itemKeys) => {
  let timePoint = item;

  if (item.hour) {
    timePoint = { ...item, date: `${item.date} ${item.hour}` };
  } else {
    timePoint = { ...item, date: `${item.date} 23:59:59` };
  }
  return pick(timePoint, itemKeys);
};
