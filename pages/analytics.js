import React from 'react';

import { Analytics } from '../components/atomic/pages/Analytics';

const Metrics = () => {
  return (
    <div className="analytics-container">
      <Analytics />
      <style jsx>
        {`
          .analytics-container {
            margin-right: 10px;
            margin-left: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Metrics;
