import React, { useEffect, useContext } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoginContext } from '../contexts/Login';
import { RegistrationBenefits } from '../components/marketing/registration';

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

      {/* <div className="container"> */}
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
      {/* </div> */}
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
