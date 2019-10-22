const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')({});

const getSentryRelease = () => process.env.SENTRY_RELEASE;

module.exports =
  process.env.IS_SOURCE_MAP === 'true'
    ? withCSS(
        withSourceMaps({
          webpack(config, _options) {
            return config;
          },
        })
      )
    : withCSS({
        env: {
          SENTRY_RELEASE: getSentryRelease(),
        },
        webpack(config, _options) {
          return config;
        },
      });
