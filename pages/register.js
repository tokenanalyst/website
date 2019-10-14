import React, { useEffect, useContext } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoginContext } from '../contexts/Login';

const RegisterWidget = dynamic(
  () =>
    import('../components/widgets/RegisterWidget').then(
      mod => mod.RegisterWidget
    ),
  {
    ssr: false,
  }
);

const Register = () => {
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    if (loginCtx.isLoggedIn) {
      Router.push('/');
    }
  }, [loginCtx.isLoggedIn]);

  return (
    <>
      <Head>
        <title>TokenAnalyst - Register</title>
      </Head>

      <div className="container">
        {!loginCtx.isLoggedIn && (
          <>
            <div className="contents">
              <RegisterWidget />
            </div>
            <div
              style={{
                borderLeft: 'solid 1px gray',
                opacity: 0.3,
                height: '100%',
              }}
            />
            <div className="benefits">
              <div className="benefit"></div>
            </div>
          </>
        )}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            font-family: Space Grotesk;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            height: 800px;
          }
          .contents {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40%;
            padding-bottom: 300px;
          }
          .header {
            font-size: 32px;
            font-weight: bold;
            padding: 15px;
            padding-top: 30px;
            text-align: center;
          }
          .benefits {
            width: 40%;
          }
          @media only screen and (max-width: 768px) {
            .contents {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  );
};

export default Register;
