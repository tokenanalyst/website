module.exports = params => {
  if (!params) {
    return '';
  }

  const query = Object.keys(params).reduce((acc, param = {}) => {
    if (param) {
      return `${acc}${param}=${params[param]}&`;
    }
    return acc;
  }, '');
  return `${query.slice(0, -1)}`;
};
