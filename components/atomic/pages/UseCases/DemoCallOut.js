import React from 'react';

import { pricingButton } from '../../../../constants/styles/common-styled-jsx';

export const DemoCallOut = () => {
  return (
    <div className="container">
      <div className="slogan">
        <h1 className="title">Use Cases</h1>
        <p className="description">
          TokenAnalyst is used for fundamental research and analysis,
          quantitative trading, and for running enterprise-grade blockchain
          infrastructure.
        </p>
        <div>
          <button
            className="button"
            type="button"
          >
            Request a demo
          </button>
        </div>
      </div>
      <div className="image-container">
        <img
          src="/static/svg/usecases/callout.svg"
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
            top: -60px;
            right: 0px;
            position: absolute;
            text-align: right;
          }
          .intelligence-img {
          }
          .slogan {
            margin-top: 149px;
          }
          h1 {
            margin-top: 0px;
            margin-bottom: 35px;
            margin-left: 0px;
            margin-right: 0px;
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
            margin-bottom: 74px;
            max-width: 450px;
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
