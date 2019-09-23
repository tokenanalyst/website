const defaultConfig = require('./config');
const bind = require('./lib/bind_api');

module.exports = (userConfig = {}) => {
  let ta = bind();

  ta.config = { ...defaultConfig, ...userConfig };

  ta.isBrowser = typeof window !== 'undefined';

  return ta;
};
