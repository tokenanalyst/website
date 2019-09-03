import React from "react";
import Head from "next/head";
import { Nav } from "./navs";
import { Newsletter } from "./Newsletter";
import { CookieBanner } from "./CookieBanner";
import { Footer } from "./Footer";

export const Layout = ({ children }) => (
  <div className="layout">
    <Head>
      <title>TokenAnalyst</title>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link href="/static/styles/css_reset.css" rel="stylesheet" />
      <link href="/static/fonts/fonts.css" rel="stylesheet" />
      <script src="https://js.stripe.com/v3/" />
      <meta
        name="description"
        content="TokenAnalyst is the leading provider of real-time and historical blockchain data. Our offering includes on-chain inflow and outflow from exchanges and low-latency alerts on significant transactions."
      />
      <meta
        name="keywords"
        content="blockchain, bitcoin, ethereum, data, on-chain, streaming, alerts, bots, trading"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="TokenAnalyst is the leading provider of real-time and historical blockchain data. Our offering includes on-chain inflow and outflow from exchanges and low-latency alerts on significant transactions."
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
