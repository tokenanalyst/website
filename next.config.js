const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')({
  // devtool: 'hidden-source-map',
  // process.env.IS_SENTRY === 'true' ? 'source-map' : 'nosources-source-map',
  // process.env.IS_SENTRY === 'true' ? 'source-map' : 'nosources-source-map',
});

console.log('1 ###########');
console.log(JSON.stringify(process.env.SENTRY_RELEASE));
console.log(JSON.stringify(process.env.IS_SOURCE_MAP));

// module.exports = withCSS(
//   withSourceMaps({
//     // env: {
//     //   SENTRY_RELEASE: process.env.SENTRY_RELEASE,
//     // },
//     webpack(config, _options) {
//       return config;
//     },
//   })
// );

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

// module.exports = withCSS(
//   withSourceMaps({
//     // env: {
//     //   API_KEY: JSON.stringify(process.env.API_KEY),
//     // },
//     // publicRuntimeConfig: {
//     //   API_URL: process.env.API_KEY,
//     // },
//     webpack: (config, { isServer, buildId }) => {
//       // config.plugins.push(
//       //   new webpack.DefinePlugin({
//       //     'process.env.SENTRY_RELEASE': JSON.stringify(
//       //       process.env.SENTRY_RELEASE
//       //     ),
//       //     'process.env.KAIKO_KEY': JSON.stringify(process.env.KAIKO_KEY),
//       //   })
//       // );

//       console.log('2 ###########');
//       console.log(JSON.stringify(process.env.SENTRY_RELEASE));
//       console.log(process.env.KAIKO_KEY);
//       if (!isServer) {
//         config.resolve.alias['@sentry/node'] = '@sentry/browser';
//       }

//       return config;
//     },
//   })
// );
