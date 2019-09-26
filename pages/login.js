import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { LoginWidget } from '../components/widgets/LoginWidget';

const Login = () => {
  return (
    <>
      <div className="container">
        <Head>
          <title>TokenAnalyst - Login</title>
        </Head>
        <div className="header">Login</div>
        <div className="contents">
          <div className="login-form">
            <LoginWidget />
          </div>
          <div className="register">
            <div>Need an account?</div>
            <Link href="/register">
              <a>Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .contents {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Space Grotesk;
        }
        .header {
          font-family: Space Grotesk;
          font-size: 32px;
          font-weight: bold;
          padding: 15px;
          padding-top: 30px;
          text-align: center;
        }
        .register {
          font-family: Open Sans;
          padding-bottom: 10px;
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

export default Login;
