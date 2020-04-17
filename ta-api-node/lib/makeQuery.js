const excludedKeys = [
  //kaiko
  "start_time",
  "end_time",
  "page_size",
  //exchange flows
  "from_date",
  "to_date"
]

module.exports = params => {
  if (!params) {
    return '';
  }

  const query = Object.keys(params)
    .filter(k => !excludedKeys.includes(k))
    .sort()
    .reduce(
    (acc, param) => (params[param] ? `${acc}${param}=${params[param]}&` : acc),
    ''
  );
  return `${query.slice(0, -1)}`;
};
