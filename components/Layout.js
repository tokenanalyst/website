import React from "react";
import Head from "next/head";
import { Nav } from "./navs";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";

export const Layout = ({ children }) => (
  <div className="layout">
    <Head>
      <title>Token Analyst</title>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link href="/static/styles/css_reset.css" rel="stylesheet" />
      <link href="/static/fonts/fonts.css" rel="stylesheet" />
      <script src="https://js.stripe.com/v3/" />
    </Head>
    <Nav />
    <Newsletter />
    <div className="page">{children}</div>
    <Footer />
    <style jsx>{`
      .page {
        margin-left: 10px;
        margin-right: 10px;
        padding-top: 60px;
      }
    `}</style>
  </div>
);
