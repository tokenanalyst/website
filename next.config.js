const webpack = require('webpack');

const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withCSS(
  withSourceMaps({
    webpack(config, _options) {
      return config;
    },
  })
);
