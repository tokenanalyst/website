#!/bin/bash
export SENTRY_ORG=tokenanalyst-3c
export SENTRY_PROJECT=ta-website
export SENTRY_RELEASE=$(sentry-cli releases propose-version)
export IS_SOURCE_MAP='true'

echo "-> Bulding bundle"
rm -rf .next/
npm run build

echo "-> Creating Sentry release $SENTRY_RELEASE"
sentry-cli releases new $SENTRY_RELEASE
sentry-cli releases set-commits --auto $SENTRY_RELEASE 

echo "-> Uploading sourcemap files"
sentry-cli releases files $SENTRY_RELEASE upload-sourcemaps .next/ --url-prefix '~/_next' --validate

echo "-> Deploying Sentry release $SENTRY_RELEASE"
sentry-cli releases deploys $SENTRY_RELEASE new -e production

export IS_SOURCE_MAP='false'

echo "-> Deploying to Now"

echo y | now secrets rm sentry-release
echo y | now secrets rm is-source-map
# now secrets add sentry-release $SENTRY_RELEASE
# now secrets add is-source-map $IS_SOURCE_MAP
now deploy \
  --env SENTRY_RELEASE=$SENTRY_RELEASE \
  --env IS_SOURCE_MAP=$IS_SOURCE_MAP \
  --build-env SENTRY_RELEASE=$SENTRY_RELEASE \
  --build-env IS_SOURCE_MAP=$IS_SOURCE_MAP






