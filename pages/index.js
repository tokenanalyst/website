import React from "react";
import Link from "next/link";
import Head from "next/head";

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link href="static/styles/css_reset.css" rel="stylesheet" />
      <link href="static/styles/fonts/fonts.css" rel="stylesheet" />
    </Head>

    <Link href="/exchange">
      <a className="link">Go to exchange page</a>
    </Link>

    <style jsx>{`
      .link {
        margin: 20px;
        color: green;
        padding-top: 20px;
      }
    `}</style>
  </div>
);

export default Home;
