import React from "react";

import { LoginWidget } from "../components/widgets/LoginWidget";

const Login = () => {
  return (
    <>
      <div className="container">
        <LoginWidget />
      </div>
      <style jsx>{`
        .container {
          margin: 20px;
        }
        @media only screen and (max-width: 768px) {
          .container {
            margin: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Login;
