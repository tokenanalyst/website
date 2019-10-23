const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')({});

console.log(
  `@@@@@@@@@ process.env.SENTRY_RELEASE: ${process.env.SENTRY_RELEASE}`
);
console.log(
  `@@@@@@@@@ process.env.IS_SOURCE_MAP: ${process.env.IS_SOURCE_MAP}`
);

const getSentryRelease = () => process.env.SENTRY_RELEASE;

module.exports =
  process.env.IS_SOURCE_MAP === 'true'
    ? withCSS(
        withSourceMaps({
          webpack(config, _options) {
            console.log('@@@@@@@@@ webpack LOCAL');
            return config;
          },
          generateBuildId: async () => {
            // For example get the latest git commit hash here
            console.log(
              `@@@@@@@@@ generateBuildId LOCAL: ${process.env.SENTRY_RELEASE}`
            );
            return process.env.SENTRY_RELEASE;
          },
        })
      )
    : withCSS({
        env: {
          SENTRY_RELEASE: getSentryRelease(),
        },

        webpack(config, _options) {
          console.log('@@@@@@@@@ webpack REMOTE');
          return config;
        },
        generateBuildId: async () => {
          // For example get the latest git commit hash here
          console.log(
            `@@@@@@@@@ generateBuildId REMOTE: ${process.env.SENTRY_RELEASE}`
          );
          return process.env.SENTRY_RELEASE;
        },
      });
