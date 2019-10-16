import React from 'react';

import { pricingButton } from '../constants/styles/common-styled-jsx';

export const DemoCallOutPricing = () => {
  return (
    <div className="container">
      <div className="slogan">
        <h1 className="title">Blockchain Intelligence for Markets</h1>
        <p className="description">
          Intelligence based on proprietary models of wallet behavior and
          exchange flows.
        </p>
        <div>
          <a
            href="mailto:info@tokenanalyst.io"
            target="_blank"
            className="buttonLink"
            rel="noopener noreferrer"
          >
            Request a Demo
          </a>
        </div>
      </div>
      <div className="image-container">
        <img
          src="/static/svg/pricing/pricing_callout.svg"
          alt="Blockchain Intelligence"
          className="intelligence-img"
        />
      </div>
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          .container {
            position: relative;
          }
          .image-container {
            top: 0;
            right: 0;
            position: absolute;
            text-align: right;
          }
          .intelligence-img {
            height: 580px;
            width: 651px;
          }
          .slogan {
            margin-top: 50px;
            margin-left: 5px;
          }
          .title {
            font-family: Space Grotesk;
            font-size: 54px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.11;
            letter-spacing: -0.31px;
            color: #000000;
            margin-bottom: 35px;
            max-width: 300px;
          }
          .description {
            font-family: Cardo;
            font-size: 30px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.26px;
            color: #000000;
            margin-bottom: 50px;
            max-width: 320px;
          }
          a {
            color: #642c2c;
          }
          a:hover {
            color: #642c2c;
            text-decoration: none;
          }
          a:active {
            color: #642c2c;
          }
          a:visited {
            color: #642c2c;
          }
          @media only screen and (max-width: 768px) {
            .slogan {
              margin-top: 0px;
              margin-left: 0px;
            }
            .title {
              font-family: Space Grotesk;
              font-size: 30px;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: 1.11;
              letter-spacing: -0.31px;
              color: #000000;
              margin-bottom: 35px;
              max-width: 300px;
            }
            .description {
              font-family: Cardo;
              font-size: 20px;
              font-weight: normal;
              font-style: normal;
              font-stretch: normal;
              line-height: normal;
              letter-spacing: 0.26px;
              color: #000000;
              margin-bottom: 20px;
              max-width: 350px;
            }
            .image-container {
              display: none;
            }
            .title {
              max-width: 100%;
            }
            .description {
              max-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};
