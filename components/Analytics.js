import React, { useEffect } from 'react';
import Router from 'next/router';
import ReactGA from 'react-ga';

export const Analytics = ({ children }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      ReactGA.initialize('UA-113322596-1');
      const handleRouteChange = () => {
        ReactGA.pageview(Router.asPath);
      };

      Router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        Router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, []);

  return <div>{children}</div>;
};
