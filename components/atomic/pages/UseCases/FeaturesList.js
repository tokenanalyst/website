import PropTypes from 'prop-types';
import React from 'react';
import kebabCase from 'lodash/kebabCase';

export const FeaturesList = ({ features }) => {
  return features.map(feature => {
    return (
      <div key={kebabCase(feature)}>
        <div className="feature">
          <div>{feature}</div>
        </div>
        <style jsx>
          {`
            .feature {
              height: 40px;
              background-image: url('/static/svg/pricing/checkbox.svg');
              background-repeat: no-repeat;
              background-position: left;
              font-size: 15px;
              font-family: Space Grotesk;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: normal;
              letter-spacing: 0.13px;
              color: #252525;
              display: flex;
              align-items: center;
              padding-left: 50px;
              margin-bottom: 13px;
              max-width: 370px;
            }
            @media only screen and (max-width: 768px) {
              .feature {
                background-size: 30px 30px;
                padding-left: 40px;
                margin-bottom: 5px;
              }
            }
          `}
        </style>
      </div>
    );
  });
};

FeaturesList.propTypes = {
  fetures: PropTypes.arrayOf(PropTypes.string),
};
