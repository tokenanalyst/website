import React from 'react';

const BENEFITS = [
  'Historical Order Book and Exchange Flows',
  'Web Platform Access Only',
  'Power-User Charting Tools',
];

export const RegistrationBenefits = () => {
  return (
    <>
      <div className="container">
        <div className="title">Immediate free access to:</div>
        {BENEFITS.map(benefit => (
          <div className="benefit">
            <img src="/static/svg/marketing/checkbox.svg" height="30px" />
            <div className="benefit-text">{benefit}</div>
          </div>
        ))}

        <img src="/static/svg/marketing/man-with-chart.svg" className="image" />
      </div>
      <style jsx>{`
        .container {
          padding-bottom: 150px;
        }
        .title {
          font-weight: bold;
          font-size: 20px;
          padding-bottom: 20px;
        }
        .benefit {
          padding-top: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .benefit-text {
          padding-left: 10px;
        }
        .image {
          padding-top: 10px;
          height: 300px;
        }
        @media only screen and (max-width: 768px) {
          .container {
            padding-bottom: 0px;
          }
          .image {
            padding-top: 10px;
            height: 200px;
          }
        }
      `}</style>
    </>
  );
};
