import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <div className="container">
        <div className="top">
          <div className="section">
            <div className="header">Navigation</div>
            <Link href="/">
              <a className="item">Home</a>
            </Link>
            <Link href="/about">
              <a className="item">About</a>
            </Link>
            <Link href="/stablecoins">
              <a className="item">Stablecoins</a>
            </Link>
            <Link href="/compare">
              <a className="item">Compare</a>
            </Link>
          </div>
          <div className="section">
            <div className="header">Products</div>
            <Link href="/pricing">
              <a className="item">Historical Data</a>
            </Link>
            <Link href="/pricing">
              <a className="item">Websocket and API</a>
            </Link>
          </div>
          <div className="section">
            <div className="header">Social Media</div>
            <a
              href="https://twitter.com/thetokenanalyst"
              target="_blank"
              className="item"
            >
              Follow Us
            </a>
            <a
              href="https://t.me/joinchat/AAAAAEXMAvSpOZao3fRvJA"
              target="_blank"
              className="item"
            >
              Telegram
            </a>
            <div className="desktop-sub-link">
              <a
                href="mailto:info@tokenanalyst.io"
                target="_blank"
                className="item"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
        <div className="bottom">
          <Link href="/about">
            <a>© 2019 TokenAnalyst Limited</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .container {
          border-top: 1px solid rgba(151, 151, 151, 0.15);
          font-family: Space Grotesk;
          margin-top: 20px;
          padding: 10px;
          padding-top: 20px;
          opacity: 0.6;
        }
        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .bottom {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          opacity: 0.7;
          margin-top: 10px;
          padding-top: 10px;
          border-top: solid 1px rgba(151, 151, 151, 0.15);
        }
        .section {
          display: flex;
          flex-direction: column;
          align-items: left;
          padding-right: 3%;
        }
        .item {
          padding-bottom: 10px;
        }
        .header {
          font-size: 18px;
          padding-bottom: 15px;
          font-weight: bold;
        }
        a {
          text-decoration: none;
          color: black;
        }
        a:hover {
          opacity: 0.5;
        }
        @media only screen and (max-width: 768px) {
          .container {
            margin-left: 10px;
          }
          .section {
            padding-right: 25px;
          }
        }
      `}</style>
    </>
  );
};
