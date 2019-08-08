import React from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/Nav";


const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link href="static/styles/css_reset.css" rel="stylesheet" />
    </Head>

    <Nav/>
  </div>
);

export default Home;
