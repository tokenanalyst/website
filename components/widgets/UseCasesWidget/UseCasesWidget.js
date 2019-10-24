import React from 'react';
import { PRODUCTS, USE_CASES } from './data/casesData';

import { DemoCallOut } from './DemoCallOut';
import { TopUseCases } from './TopUseCases';
import { UseCase } from './UseCase';

export const UseCasesWidget = () => {
  return (
    <div className="container">
      <div className="callout-container">
        <DemoCallOut />
      </div>
      <div className="top-case-container">
        <TopUseCases useCases={Object.values(USE_CASES)} />
      </div>
      <div className="cases-container">
        {PRODUCTS.map(product => {
          const {
            stripePlan,
            name,
            cases: {
              buttons,
              description,
              features,
              plan,
              title,
              image,
              isReverseImagePosition,
            },
          } = product;

          return (
            <div key={name}>
              <UseCase
                name={name}
                stripePlan={stripePlan}
                buttons={buttons}
                features={features}
                plan={plan}
                title={title}
                image={image}
                description={description}
                isReverseImagePosition={isReverseImagePosition}
              />
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          .container {
            padding-left: 100px;
            padding-right: 100px;
            height: 100%;
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
              padding-top: 20px;
              padding-left: 0px;
              padding-right: 0px;
              width: 100%;
            }
            .callout-container {
              margin-bottom: 40px;
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
