import React from 'react';
import Head from 'next/head';

import { CompareChartWidget } from '../components/widgets/CompareChartWidget';
import { PageHeader } from '../components/PageHeader';

const Compare = () => {
  return (
    <>
      <div className="container">
        <Head>
          <title>TokenAnalyst - Compare fundamental data</title>
        </Head>
        <PageHeader text={'Compare'} />
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
