import PropTypes from 'prop-types';
import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { scroller } from 'react-scroll';
import ReactGA from 'react-ga';

import { pricingButton } from '../../../constants/styles/common-styled-jsx';
import { FeaturesList } from './FeaturesList';

const emitProductEvent = name => {
  ReactGA.event({
    category: 'User',
    action: `View Plan ${name}`,
    label: `New Plans`,
  });
};

export const TopUseCases = ({ useCases }) => {
  const onClick = (title, plan) => {
    emitProductEvent(plan);
    scroller.scrollTo(kebabCase(title), {
      duration: 800,
      delay: 0,
      offset: -65,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div className="container">
      <div className="cases">
        <div className="title-container">
          <div className="title">Top Use Cases</div>
          <div className="title-image" />
        </div>
        <div className="features-container">
          {useCases.map(useCase => {
            const { features, title, plan } = useCase;
            return (
              <div key={kebabCase(title)} className="feature-list">
                <div className="case-title-container">
                  <div className="case-title">{title}</div>
                  <div className="case-plan">{`${plan} Plan`}</div>
                </div>
                <div className="features">
                  <FeaturesList features={features} />
                </div>
                <button
                  type="button"
                  className="buttonActive"
                  onKeyDown={() => onClick(title, plan)}
                  onClick={() => onClick(title, plan)}
                >
                  See use case
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          .container {
            position: relative;
          }
          .cases {
            padding-top: 113px;
            padding-bottom: 126px;
            background-image: url('/static/svg/usecases/top_cases_background.svg');
            background-repeat: no-repeat;
            background-position: center;
          }
          .title-container {
            font-family: Space Grotesk;
            font-size: 30px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.26px;
            color: #000000;
            padding-bottom: 101px;
            display: flex;
            flex-direction: row;
          }
          .features-container {
            display: flex;
            flex-direction: row;
          }
          .feature-list {
            width: 718px;
          }
          .features {
            padding-top: 78px;
            padding-bottom: 69px;
            display: flex;
            flex-direction: column;
          }
          .case-title {
            font-family: Space Grotesk;
            font-size: 25px;
            line-height: 29px;
            letter-spacing: 0.217168px;
            color: #000000;
            padding-bottom: 14px;
            font-weight: 700;
          }
          .case-plan {
            font-family: Space Grotesk;
            font-size: 25px;
            line-height: 29px;
            letter-spacing: 0.217168px;
            color: #a9a9a9;
            font-weight: 600;
          }
          .title {
            font-family: Space Grotesk;
            font-size: 30px;
            line-height: 35px;
            letter-spacing: 0.260601px;
            color: #000000;
          }
          .title-image {
            background-image: url('/static/svg/pricing/feature_title.svg');
            background-repeat: no-repeat;
            background-position: left;
            width: 500px;
            margin-left: 40px;
          }

          @media only screen and (max-width: 768px) {
            .slogan {
              margin-top: 0px;
              margin-left: 0px;
            }
            .cases {
              padding-top: 0px;
              padding-bottom: 0px;
              background: none;
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
            .title-container {
              padding-bottom: 0px;
            }
            .features {
              padding-top: 20px;
              padding-bottom: 20px;
            }
            .feature-list {
              width: 100%;
              padding-bottom: 40px;
            }
            .feature {
              max-width: calc(100% - 20%);
            }
            .features-container {
              display: flex;
              flex-direction: column;
            }
            .title-image {
              display: none;
            }
            .title {
              max-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

TopUseCases.propTypes = {
  useCases: PropTypes.arrayOf(PropTypes.object).isRequired,
};
