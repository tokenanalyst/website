import React, { useContext } from 'react';

import { CompareChartWidget } from '../components/widgets/CompareChartWidget';
import { PageHeader } from '../components/PageHeader';
import { PricingLink } from '../components/PricingLink';
import { LoginContext } from '../contexts/Login';

const Compare = () => {
  const loginCtx = useContext(LoginContext);

  return (
    <>
      <div className="container">
        <PageHeader
          text={'Compare'}
          rightElement={!loginCtx.isLoggedIn ? <PricingLink /> : <div />}
        />
        <CompareChartWidget />
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
        }
        .header {
          font-size: 32px;
          font-weight: bold;
          padding: 20px;
          padding-top: 30px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Compare;
