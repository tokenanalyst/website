import React from "react";
import App, { Container } from "next/app";

import { Layout } from "../components/Layout";
import { Analytics } from "../components/Analytics";

// Workaround for the CSS Loader, which breaks the Router
// https://github.com/zeit/next.js/issues/5264#issuecomment-424000127
import "../static/styles/empty.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Analytics>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Analytics>
      </Container>
    );
  }
}

export default MyApp;
