import React from "react";
import Nav from "../components/Nav";
import Head from "next/head";

export const Layout = ({ children }) => (
  <div className="layout">
    <Head>
      <title>Token Analyst</title>
      <link href="static/styles/css_reset.css" rel="stylesheet" />
    </Head>
    <Nav />
    {children}
  </div>
);
