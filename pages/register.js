import React from 'react';

import { RegisterWidget } from '../components/widgets/RegisterWidget';

const Register = () => {
  return (
    <>
      <div className="container">
        <div className="header">Register</div>
        <div className="contents">
          <RegisterWidget />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          font-family: Space Grotesk;
          flex-direction: column;
        }
        .contents {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .header {
          font-size: 32px;
          font-weight: bold;
          padding: 15px;
          padding-top: 30px;
          text-align: center;
        }
        @media only screen and (max-width: 768px) {
          .contents {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default Register;
