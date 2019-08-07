import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import { IoTable } from "../components/IoTable";

const DATA_WINDOWS = ["24h", "7d", "30d"];
const UNITS = ["USD", "BTC"];

const SubNav = ({ dataWindow, setDataWindow, units, setUnits }) => {
  return (
    <div className="container">
      <div className="options">
        {DATA_WINDOWS.map(dw => (
          <span className="option" onClick={() => setDataWindow(dw)}>
            <span
              className={
                dw === dataWindow ? "option-active" : "option-inactive"
              }
            >
              {dw.toUpperCase()}
            </span>
          </span>
        ))}
      </div>
      <div className="options">
        {UNITS.map(unit => (
          <span className="option" onClick={() => setUnits(unit)}>
            <span
              className={unit === units ? "option-active" : "option-inactive"}
            >
              {unit.toUpperCase()}
            </span>
          </span>
        ))}
      </div>
      <style jsx>{`
        .container {
          padding: 10px;
          border-bottom: 1px solid rgb(203, 203, 203);
          position: fixed;
          top: 0;
          width: 100%;
          height: 30px;
          background-color: #ffffff;
          z-index: 100;
          display: flex;
          justify-content: space-between;
        }
        .options {
          display: flex;
          justify-content: space-evenly;
          padding-top: 10px;
          padding-bottom: 10px;
          width: 100%;
          border-right: 1px solid rgb(203, 203, 203);
        }
        .option {
          font-weight: bold;
          padding-left: 5px;
          padding-right: 5px;
          cursor: pointer;
        }
        .option-active {
          opacity: 1;
        }
        .option-inactive {
          opacity: 0.2;
        }
        @media only screen and (max-width: 600px) {
          .option {
            cursor: auto;
          }
        }
      `}</style>
    </div>
  );
};

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
