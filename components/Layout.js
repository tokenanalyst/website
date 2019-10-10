import React from 'react';
import Head from 'next/head';
import { Nav } from './navs';
import { Newsletter } from './Newsletter';
import { CookieBanner } from './CookieBanner';
import { Footer } from './Footer';

import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../node_modules/@blueprintjs/select/lib/css/blueprint-select.css';

const STRUCTURED_DATA = JSON.stringify({
  '@context': 'http://schema.org',
  '@type': 'Organization',
  name: 'TokenAnalyst',
  logo: 'https://www.tokenanalyst.io/static/png/logo_desktop.png',
  url: 'https://www.tokenanalyst.io',
});

export const Layout = ({ children }) => (
  <div className="layout">
    <Head>
      <title>TokenAnalyst</title>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link href="/static/fonts/fonts.css" rel="stylesheet" />
      <script src="https://js.stripe.com/v3/" />
      <script src="/static/js/intercom.js" />
      <script src="/static/js/hotjar.js" />

      <script type="application/ld+json">{STRUCTURED_DATA}</script>

      <script
        type="text/javascript"
        src="/static/charting_library/charting_library.min.js"
      />

      <meta http-equiv="content-language" content="en-us" />
      <meta
        name="description"
        content="Access comprehensive real-time and historical blockchain data including exchange flows, volumes, and other key trading metrics."
      />
      <meta
        name="keywords"
        content="blockchain, bitcoin, ethereum, data, on-chain, streaming, trading, inflow, outflow, exchange flows"
      />
      <meta property="og:title" content="TokenAnalyst" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.tokenanalyst.io/" />
      <meta
        property="og:description"
        content="TokenAnalyst is the leading provider of real-time and historical blockchain data."
      />
      <meta
        property="og:image"
        content="https://www.tokenanalyst.io/static/png/logo-open-graph.png"
      />
      <meta
        property="og:image:secure_url"
        content="https://www.tokenanalyst.io/static/png/logo-open-graph.png"
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="315" />
      <meta
        property="og:image:alt"
        content="TokenAnalyst is the leading provider of real-time and historical blockchain data."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="google-site-verification"
        content="8zKrdD_6inTAzST2ucgyNW3NMZfGfkAKBz8Qky16lko"
      />
    </Head>
    <Nav />
    <Newsletter />
    <CookieBanner />
    <div className="page">{children}</div>
    <Footer />
    <style jsx>{`
      .page {
        margin-left: 10px;
        margin-right: 10px;
        padding-top: 60px;
        min-height: 700px;
      }
    `}</style>
  </div>
);
