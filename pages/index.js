import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import { IoTable } from "../components/IoTable";
import { SubNav } from "../components/SubNav";

import { DATA_WINDOWS, UNITS } from "../constants/filters";

const Home = () => {
  const [dataWindow, setDataWindow] = useState(DATA_WINDOWS[0]);
  const [units, setUnits] = useState(UNITS[0]);
  return (
    <div>
      <Head>
        <title>Home</title>
        <link href="static/styles/css_reset.css" rel="stylesheet" />
      </Head>

      <SubNav
        dataWindow={dataWindow}
        setDataWindow={setDataWindow}
        units={units}
        setUnits={setUnits}
      />
      <IoTable dataWindow={dataWindow} units={units} />
    </div>
  );
};

export default Home;
