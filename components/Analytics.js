import React, { useEffect } from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
// import getConfig from 'next/config';

// const { publicRuntimeConfig } = getConfig();
// const { API_URL } = publicRuntimeConfig;

export const Analytics = ({ children }) => {
  useEffect(() => {
    console.log(
      `@@@@@@@@@@ process.env.SENTRY_RELEASE: ${process.env.SENTRY_RELEASE}`
    );
    console.log(`@@@@@@@@@@ process.env.KAIKO_KEY: ${process.env.KAIKO_KEY}`);
    console.log(`@@@@@@@@@@ process.env.API_KEY: ${process.env.API_KEY}`);
    // console.log(`@@@@@@@@@@ TEST_KEY ${process.env.TEST_KEY}`);
    if (process.env.NODE_ENV !== 'development') {
      ReactGA.initialize('UA-113322596-1');
      const handleRouteChange = () => {
        ReactGA.pageview(Router.asPath);
      };

      Router.events.on('routeChangeComplete', handleRouteChange);

      Sentry.init({
        dsn: 'https://e6916351cd4b4bc7aec8487b1dadd5a0@sentry.io/1786013',
        release: process.env.SENTRY_RELEASE,
      });

      return () => {
        Router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, []);

  return <div>{children}</div>;
};
