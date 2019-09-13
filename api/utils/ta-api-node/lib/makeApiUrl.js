const makeQuery = require('./makeQuery');

module.exports = (endpoint, restRootUrl, queryParams) => {
  const defaultParams = {};

  const params = { ...defaultParams, ...queryParams };

  let separator;

  if (endpoint[endpoint.length - 1] === '&') {
    separator = '';
  } else {
    separator = '?';
  }

  return `${restRootUrl}/${endpoint}${separator}${makeQuery(params)}`;
};
