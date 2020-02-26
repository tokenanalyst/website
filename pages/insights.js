import React from 'react';

import { MetricsPage } from '../components/atomic/pages/Metrics';

const Metrics = () => {
  return (
    <div className="insight-container">
      <MetricsPage />
      <style jsx>
        {`
          .insight-container {
            margin-right: 10px;
            margin-left: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Metrics;
