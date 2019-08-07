import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import { IoTable } from "../components/IoTable";

const DATA_WINDOWS = ["24h", "7d", "30d"];

const SubNav = ({ dataWindow, setDataWindow }) => {
  return (
    <div className="data-window-container">
      <div className="data-windows">
        {DATA_WINDOWS.map(dw => (
          <span className="data-window" onClick={() => setDataWindow(dw)}>
            <span
              className={
                dw === dataWindow
                  ? "data-window-active"
                  : "data-window-inactive"
              }
            >
              {dw.toUpperCase()}
            </span>
          </span>
        ))}
      </div>
      <style jsx>{`
        .data-window-container {
          padding: 10px;
          border-bottom: 1px solid rgb(203, 203, 203);

          position: fixed;
          top: 20px;
          width: 100%;
          z-index: 100;
        }
        .data-windows {
          display: flex;
          justify-content: space-around;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .data-window {
          font-weight: bold;
          padding-left: 5px;
          padding-right: 5px;
          cursor: pointer;
        }
        .data-window-active {
          opacity: 1;
        }
        .data-window-inactive {
          opacity: 0.2;
        }
      `}</style>
    </div>
  );
};

const Home = () => {
  const [dataWindow, setDataWindow] = useState(DATA_WINDOWS[0]);
  return (
    <div>
      <Head>
        <title>Home</title>
        <link href="static/styles/css_reset.css" rel="stylesheet" />
      </Head>

      <SubNav dataWindow={dataWindow} setDataWindow={setDataWindow} />
      <IoTable dataWindow={dataWindow} />
    </div>
  );
};

export default Home;
