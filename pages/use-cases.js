import React from 'react';

import { UseCasesPage } from '../components/atomic/pages/UseCases';

const UseCases = () => {
  return (
    <div className="container">
      <UseCasesPage />
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
              margin: auto;
            }
          }
        `}
      </style>
    </div>
  );
};

export default UseCases;
