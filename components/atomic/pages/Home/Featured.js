import React from 'react';

export const Featured = () => {
  return (
    <div className="featured-container">
      <div className="title">In the news</div>
      <div className="featured-list">
        <div className="item">
          <a
            href="https://www.bloomberg.com/news/articles/2019-08-15/bitcoin-drop-not-likely-triggered-by-scam-dump-researcher-says"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/static/png/featuredIn/bloomberg.png"
              className="featured-image"
              height={60}
              alt="Bloomberg"
            />
          </a>
        </div>
        <div className="item">
          <a
            href="https://www.forbes.com/sites/jeffkauflin/2018/10/29/where-did-the-money-go-inside-the-big-crypto-icos-of-2017/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/static/png/featuredIn/forbes.png"
              className="featured-image"
              height={80}
              alt="Forbes"
            />
          </a>
        </div>
        <div className="item">
          <a
            href="https://www.businessinsider.com/bitcoin-spike-led-by-market-whales-tokenanalyst-2019-4?r=US&IR=T"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/static/png/featuredIn/business-insider.png"
              className="featured-image"
              height={80}
              alt="Business Insider"
            />
          </a>
        </div>
        <div className="item">
          <a
            href="https://www.vice.com/en_uk/article/bjwjpd/someone-just-moved-a-billion-dollars-in-bitcoin-and-no-one-knows-why"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/static/png/featuredIn/vice.png"
              className="featured-image"
              height={70}
              alt="Vice"
            />
          </a>
        </div>
        <div className="item">
          <a
            href="https://finance.yahoo.com/news/crypto-projects-promise-decentralisation-data-shows-thats-far-true-070013815.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/static/png/featuredIn/yahoo.png"
              className="featured-image"
              height={70}
              alt="Yahoo"
            />
          </a>
        </div>
        <div className="item">
          <a
            href="https://blog.bitmex.com/tracking-us-25-billion-of-tokens-ico-makers-allocated-themselves/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/static/png/featuredIn/bitmex.png"
              className="featured-image"
              height={40}
              alt="BitMEX"
            />
          </a>
        </div>
        <div className="item">
          <a
            href="https://techcrunch.com/2018/03/22/meet-the-startups-that-pitched-at-efs-9th-demo-day-in-london/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/static/png/featuredIn/techcrunch.png"
              className="featured-image"
              height={45}
              alt="TechCrunch"
            />
          </a>
        </div>
        <div className="item">
          <a
            href="https://www.producthunt.com/posts/tokenanalyst"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/static/png/featuredIn/producthunt.png"
              className="featured-image"
              height={70}
              alt="ProductHunt"
            />
          </a>
        </div>
      </div>
      <style jsx>
        {`
          .featured-container {
            margin-top: 75px;
          }
          img {
            height: 50px;
          }
          .featured-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .title {
            font-family: Space Grotesk;
            font-size: 30px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.11;
            -webkit-letter-spacing: -0.31px;
            -moz-letter-spacing: -0.31px;
            -ms-letter-spacing: -0.31px;
            letter-spacing: -0.31px;
            color: #000000;
            max-width: 160px;
            margin-bottom: 50px;
            border-bottom-style: solid;
            border-bottom-width: 2px;
            border-bottom-color: #35caab;
          }
          .item {
            margin: 20px 20px 70px 20px;
            width: 280px;
            height: 85px;
            text-align: center;
          }
          @media only screen and (max-width: 768px) {
            .featured-container {
              margin-top: 5px;
            }
            img {
              height: 30px;
            }
            .title {
              font-family: Space Grotesk;
              font-size: 20px;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.11;
              -webkit-letter-spacing: -0.31px;
              -moz-letter-spacing: -0.31px;
              -ms-letter-spacing: -0.31px;
              letter-spacing: -0.31px;
              color: #000000;
              max-width: 105px;
              margin-bottom: 30px;
              border-bottom-style: solid;
              border-bottom-width: 2px;
              border-bottom-color: #35caab;
            }
            .item {
              margin: 5px 0px 0px 5px;
              width: 280px;
              height: 70px;
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
};
