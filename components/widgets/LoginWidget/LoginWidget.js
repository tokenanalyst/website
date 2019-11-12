import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@blueprintjs/core';

import { LoginContext } from '../../../contexts/Login';
import { SimpleButton } from '../../SimpleButton';
import { colors, PRIMARY_GREEN } from '../../../constants/styles/colors';
import { login } from '../../../services/login/login';

export const LoginWidget = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);

  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isToRedirectToStripe = loginCtx.paymentData.stripe;

  return (
    <>
      <div className="container">
        <Card>
          <form
            onSubmit={e => {
              e.preventDefault();
              login(
                email,
                password,
                loginCtx,
                router,
                setIsSubmitted,
                setIsError
              );
            }}
          >
            <div className="header">Email</div>
            <input
              type="text"
              className="input"
              onChange={e => setEmail(e.target.value.trim())}
            />
            <div className="header">Password</div>
            <input
              className="input"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <div className="login-button">
              <SimpleButton
                background={PRIMARY_GREEN}
                fill
                onClick={login}
                loading={isSubmitted}
                type="submit"
              >
                Login
              </SimpleButton>
            </div>
            {isError ? (
              <div className="error">Incorrect email or password</div>
            ) : null}
            {isToRedirectToStripe ? (
              <div className="message">
                Please login to complete your purchase.
              </div>
            ) : null}
          </form>
        </Card>
      </div>
      <style jsx>
        {`
          .container {
            font-family: Open Sans;
            padding: 30px;
          }
          .title {
            font-weight: bold;
            font-size: 24px;
            padding-bottom: 30px;
          }
          .header {
            font-size: 16px;
            text-align: left;
            padding-top: 10px;
            padding-bottom: 10px;
          }
          .input {
            height: 24px;
            width: 300px;
            border: none;
            border-bottom: 1px solid
              rgba(${isError ? colors.primaryRed : '00, 00, 00'});
            font-size: 18px;
          }
          .login-button {
            padding-top: 10px;
          }
          .error {
            color: rgba(${colors.primaryRed}, 1);
            padding-top: 10px;
            text-align: center;
          }
          .message {
            padding-top: 10px;
            text-align: center;
          }
          @media only screen and (max-width: 768px) {
            .input {
              width: 200px;
            }
            .error {
              max-width: 200px;
            }
          }
        `}
      </style>
    </>
  );
};
