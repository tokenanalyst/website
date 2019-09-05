import React from "react";
import Link from "next/link";

import { LoginWidget } from "../components/widgets/LoginWidget";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="header">Login</div>
        <div className="contents">
          <LoginWidget />
          <div>
            <div className="register">Need an account?</div>
            <Link href="/register">
              <a>Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
        }
        .contents {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-family: Space Grotesk;
        }
        .header {
          font-family: Space Grotesk;
          font-size: 32px;
          font-weight: bold;
          padding: 15px;
          padding-top: 30px;
        }
        .register {
          font-family: Open Sans;
          padding-bottom: 10px;
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

export default Login;
