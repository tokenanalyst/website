import React from "react";
import Link from "next/link";

import { LoginWidget } from "../components/widgets/LoginWidget";

const Login = () => {
  return (
    <>
      <div className="container">
        <LoginWidget />
        <div className="register">Need an account?</div>
        <Link href="/register">
          <a>Sign Up</a>
        </Link>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Space Grotesk;
          margin: 20px;
        }
        .register {
          padding-bottom: 10px;
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
