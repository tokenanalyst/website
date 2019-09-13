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
        dsn: 'https://04801cfba732405cae39800a34b707ca@sentry.io/1553818',
      });

      return () => {
        Router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, []);

  return <div>{children}</div>;
};
