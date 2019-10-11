import React from 'react';

import { pricingButton } from '../constants/styles/common-styled-jsx';

export const DemoCallOutPricing = () => {
  return (
    <div className="container">
      <div className="slogan">
        <h1 className="title">
          Blockchain
          <br />
          Intelligence
          <br />
          for Markets
        </h1>
        <p className="description">
          Intelligence based on
          <br />
          proprietary models of
          <br />
          wallet behavior
          <br />
          and exchange flows.
        </p>
        <div className="button">
          <button type="button">Request a Demo</button>
        </div>
      </div>
      <div className="intelligence-image">
        <img
          src="/static/svg/pricing/pricing_callout.svg"
          alt="Blockchain Intelligence"
        />
      </div>
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          .container {
            position: relative;
          }
          .intelligence-image {
            width: 653px;
            height: 693px;
            top: 0;
            right: 0;
            position: absolute;
            text-align: right;
            margin-right: 50px;
          }
          .slogan {
            margin-top: 90px;
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
          }
        `}
      </style>
    </div>
  );
};
