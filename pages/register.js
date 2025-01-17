import React, { useEffect, useContext } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoginContext } from '../contexts/Login';
import { RegistrationBenefits } from '../components/atomic/molecules/RegistrationBenefits';

const RegisterWidget = dynamic(
  () =>
    import('../components/atomic/organism/RegisterWidget').then(
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
    window.scrollTo(0, 0);
  }, [loginCtx.isLoggedIn]);

  return (
    <>
      <Head>
        <title key="title">TokenAnalyst - Register</title>
      </Head>

      {!loginCtx.isLoggedIn && (
        <div className="container">
          <div className="contents">
            <RegisterWidget />
          </div>
          <div className="benefits">
            <RegistrationBenefits />
          </div>
        </div>
      )}
      <style jsx>
        {`
          .container {
            display: flex;
            font-family: Space Grotesk;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            height: 700px;
          }
          .contents {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40%;
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
            .container {
              padding-top: 0px;
              flex-direction: column;
              height: 100%;
            }
            .contents {
              flex-direction: column;
              padding-bottom: 20px;
            }
            .contents {
              width: 90%;
            }
            .benefits {
              width: 90%;
            }
          }
        `}
      </style>
    </>
  );
};

export default Register;
