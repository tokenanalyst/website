import React from "react";
import Link from "next/link";
import Head from "next/head";
import TopBar from "../components/TopBar";


const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link href="static/styles/css_reset.css" rel="stylesheet" />
    </Head>

    <TopBar/>
  </div>
);

export default Home;
