/* eslint-disable no-restricted-imports */
import PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { MetricsNav } from './atomic/molecules/MetricsNav';
import { Nav } from './atomic/molecules/Nav';
import { Newsletter } from './atomic/organism/Newsletter';
import { CookieBanner } from './atomic/organism/CookieBanner';
import { Footer } from './Footer';
import { COOKIES } from '../constants/cookies';

import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../node_modules/@blueprintjs/select/lib/css/blueprint-select.css';

const tierParamString = `tier=${Cookies.get(COOKIES.tier)}`;
const metricsTierParamString = `tier_metrics=${Cookies.get(COOKIES.tier)}`;

const STRUCTURED_DATA = JSON.stringify({
  '@context': 'http://schema.org',
  '@type': 'Organization',
  name: 'TokenAnalyst',
  logo: 'https://www.tokenanalyst.io/static/png/logo_desktop.png',
  url: 'https://www.tokenanalyst.io',
});

const WITHOUT_FOOTER = [
  '/exchange/[token]/[exchange]',
  '/miner/[token]/[miner]',
  '/insights',
];

const WITH_DASHBOARD_TABS = [
  '/dashboard',
  '/exchange/[token]/[exchange]',
  '/miner/[token]/[miner]',
  '/insights',
  '/analytics',
];

const tabs = [
  {
    text: 'Dashboard',
    route: '/dashboard',
    link: '/dashboard',
  },
  {
    text: 'Exchange Flows',
    route: '/exchange/[token]/[exchange]',
    link: `/exchange/BTC/Binance?${tierParamString}`,
  },
  {
    text: 'Miner Stats',
    route: '/miner/[token]/[miner]',
    link: `/miner/BTC/antpool?${tierParamString}`,
  },
  {
    text: 'Network Stats',
    route: '/insights',
    link: `/insights?${metricsTierParamString}`,
  },
  {
    text: ' ',
    route: '/analytics',
    link: '/analytics',
  }
];

export const Layout = ({ children }) => {
  const router = useRouter();
  const { route } = router;

  const isWithFooter = !WITHOUT_FOOTER.includes(route);

  const isWithDashboardTabs = WITH_DASHBOARD_TABS.includes(route);

  return (
    <div className="layout">
      <Head>
        <title key="title">TokenAnalyst</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link href="/static/fonts/fonts.css" rel="stylesheet" />
        <script src="https://js.stripe.com/v3/" />
        <script src="/static/js/hotjar.js" />

        <script type="application/ld+json">{STRUCTURED_DATA}</script>

        <script
          type="text/javascript"
          src="/static/charting_library/charting_library.min.js"
        />

        <meta
          key="description"
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
      <div className="not-active-banner"><span className="marker">Attention:</span> The data on this site does not refresh anymore</div>
      <Nav />
      <Newsletter />
      <CookieBanner />
      <div className="page">
        {isWithDashboardTabs && (
          <div className="metrics-nav">
            <MetricsNav tabs={tabs} />
          </div>
        )}

        <div className="main-content">{children}</div>
      </div>
      {isWithFooter && <Footer />}
      <style jsx>
        {`
        .not-active-banner {
          text-align: center;
          font-weight: bold;
          height: 50px;
          width: 100%;
          padding-top: 15px;
          paddding-bottom: 15px;
          background-color: white;
          position: fixed;
          z-index: 2;
      
        }
        .marker { 
          padding: 5px;
          border-radius: 5px;
          background-color: black;
          color: white;

        }
          .page {
            margin-left: 10px;
            margin-right: 10px;
            padding-top: 110px;
            min-height: 700px;
          }
          .metrics-nav {
            position: fixed;
            background-color: white;
            z-index: 1;
            width: 100%;
          }
          .main-content {
            padding-top: ${isWithDashboardTabs ? '40px' : '0px'};
          }
        `}
      </style>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
