import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Card } from '@blueprintjs/core';

import { LoginContext } from '../../../contexts/Login';
import { colors } from '../../../constants/styles/colors';
import { COOKIES } from '../../../constants/cookies';

export const LoginWidget = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);

  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isToRedirectToStripe = loginCtx.paymentData.stripe;

  const login = async () => {
    try {
      const response = await axios.post(
        'https://api.tokenanalyst.io/auth/user/login',
        {
          username: email,
          password,
        }
      );
      const {
        data: { apiKey, name, username, id, profile },
      } = response;

      Cookies.set(COOKIES.apiKey, apiKey);
      Cookies.set(COOKIES.loggedInAsUsername, username);
      Cookies.set(COOKIES.loggedInAsUserId, id);
      Cookies.set(COOKIES.tier, profile);
      loginCtx.setIsLoggedIn(true);
      loginCtx.intercom.setUser(name, username);

      if (
        loginCtx.paymentData.stripe &&
        loginCtx.paymentData.stripe.redirectFn
      ) {
        loginCtx.setPaymentData({ ...loginCtx.paymentData, stripe: null });
        return loginCtx.paymentData.stripe.redirectFn({
          customerEmail: username,
          clientReferenceId: id.toString(),
        });
      }

      router.push('/');
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <>
      <div className="container">
        <Card>
          <div className="header">Email</div>
          <input
            type="text"
            className="input"
            onChange={e => setEmail(e.target.value)}
          />
          <div className="header">Password</div>
          <input
            type="text"
            className="input"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <div className="login-button" onClick={login}>
            Login
          </div>
          {isError ? (
            <div className="error">Incorrect email or password</div>
          ) : null}
          {isToRedirectToStripe ? (
            <div className="message">
              Please login to complete your purchase.
            </div>
          ) : null}
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
            color: white;
            min-width: 60px;
            text-align: center;
            background-color: rgba(${colors.primaryGreen});
            max-height: 40px;
            padding: 10px;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 20px;
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
