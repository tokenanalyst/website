import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import { IoTable } from "../components/IoTable";
import { SubNav } from "../components/SubNav";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link href="static/styles/css_reset.css" rel="stylesheet" />
      </Head>

      <Link href="/exchange">
        <a className="link">Go to exchange page</a>
      </Link>
      <style jsx>{`
        .link {
          margin: 20px;
          color: green;
        }
      `}</style>
    </div>
  );
};

export default Home;
