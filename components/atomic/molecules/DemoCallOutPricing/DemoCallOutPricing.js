import React from 'react';

import { pricingButton } from '../../../../constants/styles/common-styled-jsx';

export const DemoCallOutPricing = () => {
  return (
    <div className="container">
      <div className="slogan">
        <h1 className="title">Blockchain Market Intelligence</h1>
        <p className="description">
          Enterprise-grade data and tools to understand and access blockchains.
        </p>
        <div>
          <button
            className="button"
            type="button"
            onClick={() => window.Intercom('show')}
          >
            Request a demo
          </button>
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
            top: -20px;
            right: 25px;
            position: absolute;
            text-align: right;
          }
          .intelligence-img {
            height: 550px;
            width: 651px;
          }
          .slogan {
            margin-top: 100px;
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
            color: #222;
          }
          a:hover {
            color: #222;
            text-decoration: none;
          }
          a:active {
            color: #222;
          }
          a:visited {
            color: #222;
          }
          @media only screen and (max-width: 768px) {
            .slogan {
              margin-top: 0px;
              margin-left: 0px;
            }
            .title {
              font-family: Space Grotesk;
              font-size: 25px;
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
              font-size: 15px;
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
