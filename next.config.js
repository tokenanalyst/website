const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')({});

console.log(
  `@@@@@@@@@ process.env.SENTRY_RELEASE: ${process.env.SENTRY_RELEASE}`
);
console.log(
  `@@@@@@@@@ process.env.IS_SOURCE_MAP: ${process.env.IS_SOURCE_MAP}`
);

// Expose Sentry release id in front-end
const getSentryRelease = () => process.env.SENTRY_RELEASE;

// Generate a common build id to allow matching of source maps with deployed build in Sentry
const generateBuildId = async () => {
  console.log(
    `@@@@@@@@@ generateBuildId ${
      process.env.IS_SOURCE_MAP === 'true' ? 'LOCAL' : 'REMOTE'
    }: ${process.env.SENTRY_RELEASE}`
  );
  return process.env.SENTRY_RELEASE; //
};

const NEXT_CONFIG = {
  local: withCSS(
    withSourceMaps({
      webpack(config, _options) {
        console.log('@@@@@@@@@ webpack LOCAL');
        return config;
      },
      generateBuildId,
    })
  ),
  remote: withCSS({
    env: {
      SENTRY_RELEASE: getSentryRelease(),
    },
    generateBuildId,
  }),
};

module.exports =
  process.env.IS_SOURCE_MAP === 'true' ? NEXT_CONFIG.local : NEXT_CONFIG.remote;
