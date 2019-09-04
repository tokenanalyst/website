import React from "react";

import { RegisterWidget } from "../components/widgets/RegisterWidget";

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
          font-family: Space Grotesk;
        }
        .contents {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .header {
          font-size: 32px;
          font-weight: bold;
          padding: 15px;
          padding-top: 30px;
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
