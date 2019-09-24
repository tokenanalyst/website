import React from 'react';
import App, { Container } from 'next/app';
import * as Sentry from '@sentry/browser';

import { Layout } from '../components/Layout';
import { Analytics } from '../components/Analytics';
import { LoginProvider } from '../contexts/Login';

// Workaround for the CSS Loader, which breaks the Router
// https://github.com/zeit/next.js/issues/5264#issuecomment-424000127
import '../static/styles/empty.css';

process.env.NODE_ENV !== 'development' &&
  Sentry.init({
    dsn: 'https://04801cfba732405cae39800a34b707ca@sentry.io/1553818',
  });

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <LoginProvider>
          <Analytics>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Analytics>
        </LoginProvider>
      </Container>
    );
  }
}

export default MyApp;
