import React, { useEffect } from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';

export const Analytics = ({ children }) => {
  useEffect(() => {
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
