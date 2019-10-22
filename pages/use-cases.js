import React from 'react';

import { UseCasesWidget } from '../components/widgets/UseCasesWidget';

const UseCases = () => {
  return (
    <div className="container">
      <UseCasesWidget />
      <style jsx>
        {`
          .container {
            height: 100%;
            width: 100%;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          @media only screen and (max-width: 768px) {
            .container {
              width: 100%;
              margin: auto;
            }
          }
        `}
      </style>
    </div>
  );
};

export default UseCases;
