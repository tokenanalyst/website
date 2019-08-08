import React from 'react'
import App, { Container } from 'next/app'
import ReactGA from 'react-ga';

import { Layout } from '../components/Layout';
import { Analytics } from '../components/Analytics';

class MyApp extends App {
 
  render() {
    const { Component, pageProps } = this.props
    
    return (
      <Container>
        <Analytics>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Analytics>
      </Container>
    )
  }
}
 
export default MyApp