import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head';
import Router from 'next/router';

import { PageHeader } from '../components/PageHeader';
import { TestimonialsWidget } from '../components/widgets/TestimonialsWidget';
import { PageSection } from '../components/PageSection';
import { Link } from '../components/Link';
import { LoginContext } from '../contexts/Login';

import {
  ProductSelectionWidget,
  FeatureTableDesktop,
  FeatureTableMobile,
} from '../components/widgets/ProductSelectionWidget';

const Pricing = () => {
  const loginCtx = useContext(LoginContext);

  return (
    <div className="container">
      <Head>
        <title>TokenAnalyst - Pricing</title>
      </Head>
      <PageHeader text={'Plans'} />
      <ProductSelectionWidget />
      <div className="researcher">
        If you are a <strong>researcher</strong> or an <strong>analyst</strong>,
        {` `}
        <Link
          desktopLabel="contact us"
          onClick={() => {
            ReactGA.event({
              category: 'User',
              action: `Plan select Free`,
              label: `Plans`,
            });
            if (!loginCtx.isLoggedIn) {
              loginCtx.setPaymentData({
                isFreeTier: true,
              });
            }
            return Router.push('/register');
          }}
        />
        {` `}to get free access to small set of our data
      </div>
      <PageSection text={'Testimonials'} />
      <div>
        <TestimonialsWidget />
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
