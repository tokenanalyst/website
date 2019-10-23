const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')({});

// Generates a common build id to allow matching of generated source maps with deployed build in production
const generateBuildId = async () => {
  return process.env.SENTRY_RELEASE; //
};

const NEXT_CONFIG = {
  sentry: withCSS(
    withSourceMaps({
      webpack(config, _options) {
        return config;
      },
      generateBuildId,
    })
  ),
  production: withCSS({
    env: {
      SENTRY_RELEASE: process.env.SENTRY_RELEASE,
    },
    generateBuildId,
  }),
};

module.exports =
  process.env.IS_SOURCE_MAP === 'true'
    ? NEXT_CONFIG.sentry
    : NEXT_CONFIG.production;
