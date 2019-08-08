import React, { useEffect } from 'react';
import Router from 'next/router'
import ReactGA from 'react-ga';

export const Analytics = ({children}) => {
    useEffect(() => {
        ReactGA.initialize('UA-000000-01');
        const handleRouteChange = () => {
            ReactGA.pageview(Router.pathname);
        };

        Router.events.on('routeChangeComplete', handleRouteChange);

        return () => { Router.events.off('routeChangeComplete', handleRouteChange) }
    }, [])

    return (<div>{children}</div>)
}