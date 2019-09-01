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
