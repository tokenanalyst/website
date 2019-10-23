import React from 'react';
import Head from 'next/head';

import { MetricsWidget } from '../components/widgets/MetricsWidget';

const Metrics = () => {
  return (
    <>
      <Head>
        <title>TokenAnalyst - On-Chain Insights</title>
      </Head>
      <MetricsWidget />
    </>
  );
};

export default Metrics;
