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
            <Link href="/exchange/BTC/Binance">
              <a className="item">Latest BTC (Binance)</a>
            </Link>
            <Link href="/stablecoins">
              <a className="item">Stablecoins</a>
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
          <div className="hash">
            <div>BTC: 19WTGJFnLSKenzHK2CWmAsoFaiR3csyPHB</div>
            <div>ETH: 0x75bd31C548547Fa76Eab314517A19E334000d8ed</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          border-top: 1px solid black;
          font-family: Space Grotesk;
          margin-top: 20px;
          padding: 10px;
          padding-top: 20px;
          background-color: #f8f8f8;
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
          opacity: 0.5;
          margin-top: 10px;
          padding-top: 10px;
          border-top: solid 1px rgba(151, 151, 151, 0.15);
        }
        .section {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .item {
          padding-bottom: 10px;
        }
        .header {
          font-size: 18px;
          padding-bottom: 15px;
        }
        a {
          text-decoration: none;
          color: black;
        }
        a:hover {
          opacity: 0.5;
        }
        @media only screen and (max-width: 768px) {
          .top {
            flex-direction: column;
          }
          .bottom {
            flex-direction: column;
          }
          .section {
            padding-top: 20px;
          }
          .hash {
            font-size: 12px;
            padding-top: 5px;
          }
        }
      `}</style>
    </>
  );
};
