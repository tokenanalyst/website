import React from 'react';
import { USE_CASES } from './data/casesData';

import { DemoCallOut } from './DemoCallOut';
import { TopUseCases } from './TopUseCases';

export const UseCasesWidget = () => {
  return (
    <div className="container">
      <div className="callout-container">
        <DemoCallOut />
      </div>
      <div className="top-case-container">
        <TopUseCases useCases={USE_CASES} />
      </div>
      <div className="cases-container">Cases Container</div>
      <style jsx>
        {`
          .container {
            height: 100%;
            width: 100%;
            width: calc(1440px - 40px);
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .callout-container {
            height: 100%;
            margin-bottom: 126px;:
          }
          .top-cases-container {
            height: 100%;
          }
          .cases-container {
            height: 100%;
          }
          @media only screen and (max-width: 768px) {
            .container {
              width: 100%;
              margin: auto;
            }
            .callout-container {
              width: 100%;
            }
            .callout {
              padding-left: 0px;
              padding-right: 0px;
              height: 100%;
              padding-bottom: 15px;
            }
            .testimonials-container {
              width: 100%;
            }
            .testimonials {
              padding-left: 0px;
              padding-right: 0px;
            }
            .products-container {
              display: flex;
              flex-direction: column;
              height: 100%;
            }
            .products {
              width: 100%;
            }
            .products-features-container {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};
