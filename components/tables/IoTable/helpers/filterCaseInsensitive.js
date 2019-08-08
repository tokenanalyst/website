export const filterCaseInsensitive = ({ id, value }, row) =>
  row[id] ? row[id].toLowerCase().includes(value.toLowerCase()) : true;
