const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')({});

// Generates a common build id to allow matching of generated source maps with deployed build in production
const generateBuildId = async () => {
  if (process.env.SENTRY_RELEASE) {
    return process.env.SENTRY_RELEASE;
  }

  return null;
};

const NEXT_CONFIG = {
  production: withCSS({
    exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  }})
};

module.exports = NEXT_CONFIG.production;
