import React from 'react';
import ReactGA from 'react-ga';

import { PageHeader } from '../components/PageHeader';
import { PageSection } from '../components/PageSection';

import {
  ProductSelectionWidget,
  FeatureTableDesktop,
  FeatureTableMobile,
} from '../components/widgets/ProductSelectionWidget';

const Pricing = () => {
  return (
    <div className="container">
      <PageHeader text={'Plans'} />
      <ProductSelectionWidget />
      <div className="researcher">
        If you are a <strong>researcher</strong> or an <strong>analyst</strong>,{' '}
        <a
          href="mailto:info@tokenanalyst.io"
          target="_blank"
          className="item"
          onClick={() =>
            ReactGA.event({
              category: 'User',
              action: `Contact Researcher`,
              label: `Research`,
            })
          }
        >
          contact us
        </a>{' '}
        to get a small sample of our data for your specific use case
      </div>
      <PageSection text={'What you get'} />
      <div className="feature-table">
        <FeatureTableDesktop />
        <FeatureTableMobile />
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            font-family: Space Grotesk;
          }
          .header {
            font-size: 32px;
            font-weight: bold;
            padding: 15px;
            padding-top: 30px;
          }
          .sub-header {
            font-size: 32px;
            font-weight: bold;
            padding: 15px;
            padding-top: 30px;
            opacity: 0.3;
          }
          .product-widget {
            min-width: 100%;
            padding-left: 7px;
            margin-right: 60px;
          }
          .feature-table {
            padding-top: 10px;
          }
          .researcher {
            font-size: 18px;
            padding: 10px;
          }
          @media only screen and (max-width: 768px) {
            .header {
              text-align: center;
            }
            .product-widget {
              padding-left: 2px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Pricing;
