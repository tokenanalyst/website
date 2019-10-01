import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Icon, Checkbox } from '@blueprintjs/core';
import Link from 'next/link';
import Router from 'next/router';
import ReactGA from 'react-ga';

import { LoginContext } from '../../../contexts/Login';
import { colors } from '../../../constants/styles/colors';
import { API_ERROR_MSG } from '../../../constants/apiErrors';
import { COOKIES } from '../../../constants/cookies';

export const RegisterWidget = () => {
  const loginCtx = useContext(LoginContext);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [errorText, setErrorText] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [profession, setProfession] = useState({
    isTrader: false,
    isEnterprise: false,
    isEnthusiast: false,
    isResearcher: false,
    isDeveloper: false,
    isOther: false,
  });

  const isRedirectedForFreeTier = loginCtx.paymentData.isFreeTier;

  const {
    isTrader,
    isEnterprise,
    isEnthusiast,
    isResearcher,
    isDeveloper,
    isOther,
  } = profession;

  const register = async () => {
    if (password !== passwordVerify) {
      setErrorText('Passwords do not match');
      return;
    }

    try {
      await axios.post('https://api.tokenanalyst.io/auth/user', {
        username: email,
        password,
        name: fullName,
        trader: isTrader,
        enterprise: isEnterprise,
        enthusiast: isEnthusiast,
        researcher: isResearcher,
        developer: isDeveloper,
        other: isOther,
      });

      const response = await axios.post(
        'https://api.tokenanalyst.io/auth/user/login',
        {
          username: email,
          password,
        }
      );

      const {
        data: { apiKey, name, username, id },
      } = response;

      Cookies.set(COOKIES.apiKey, apiKey);
      Cookies.set(COOKIES.loggedInAs, name);
      Cookies.set(COOKIES.loggedInAsUsername, username);
      Cookies.set(COOKIES.loggedInAsUserId, id);

      loginCtx.setIsLoggedIn(true);
      loginCtx.setLoggedInAs(name);
      setErrorText(null);
      setHasRegistered(true);
      loginCtx.intercom.setUser(name, username);

      if (
        loginCtx.paymentData.stripe &&
        loginCtx.paymentData.stripe.redirectFn
      ) {
        ReactGA.event({
          category: 'User',
          action: `Registered to make a purchase`,
          label: `Funnel`,
        });
        loginCtx.setPaymentData({ ...loginCtx.paymentData, stripe: null });
        return loginCtx.paymentData.stripe.redirectFn({
          customerEmail: username,
          clientReferenceId: id.toString(),
        });
      } else if (loginCtx.paymentData.isFreeTier) {
        ReactGA.event({
          category: 'User',
          action: `Registered to access free tier`,
          label: `Funnel`,
        });
        loginCtx.setPaymentData({ ...loginCtx.paymentData, isFreeTier: false });
        Router.push('/free-tier-success');
      } else if (loginCtx.postRegisterRedirectUrl) {
        ReactGA.event({
          category: 'User',
          action: `Registered via Exchange Page CTA`,
          label: `Funnel`,
        });
        Router.push(
          `/exchange/[token]/[exchange]`,
          loginCtx.postRegisterRedirectUrl
        );
      }
    } catch (e) {
      if (
        e.response &&
        e.response.data &&
        e.response.data.message === API_ERROR_MSG.USER_ALREADY_EXISTS
      ) {
        setErrorText('You are already registered, please login.');
      } else {
        setErrorText(
          "Please provide valid details and ensure that you haven't already registered"
        );
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">Register</div>
        {hasRegistered ? (
          <>
            <Icon
              icon="tick"
              color={`rgba(${colors.primaryGreen})`}
              iconSize={48}
            />
            <div className="success">Thanks for registering {name}!</div>
            <br />
            <div className="success">
              An email will shortly be with you containing all your details
              including your API key
            </div>
            <Link href="/" passHref>
              <div className="button">Go Home</div>
            </Link>
          </>
        ) : (
          <>
            <div className="label">Name</div>
            <input
              type="text"
              className="input"
              onChange={e => setFullName(e.target.value)}
            />
            <div className="label">Email</div>
            <input
              type="text"
              className="input"
              onChange={e => setEmail(e.target.value)}
            />
            <div className="label">Password</div>
            <input
              type="password"
              className="input"
              onChange={e => setPassword(e.target.value)}
            />
            <div className="label">Repeat Password</div>
            <input
              className="input"
              type="password"
              onChange={e => setPasswordVerify(e.target.value)}
            />
            <div className="label">Which apply to you?</div>
            <div className="profession">
              <Checkbox
                label="Trader"
                type="checkbox"
                checked={isTrader}
                onChange={() => {
                  return setProfession({
                    ...profession,
                    isTrader: !isTrader,
                  });
                }}
              />
            </div>
            <div className="profession">
              <Checkbox
                type="checkbox"
                checked={isDeveloper}
                label="Developer"
                onChange={() =>
                  setProfession({
                    ...profession,
                    isDeveloper: !isDeveloper,
                  })
                }
              />
            </div>
            <div className="profession">
              <Checkbox
                label="Enthusiast"
                type="checkbox"
                checked={isEnthusiast}
                onChange={() =>
                  setProfession({
                    ...profession,
                    isEnthusiast: !isEnthusiast,
                  })
                }
              />
            </div>
            <div className="profession">
              <Checkbox
                label="Enterprise"
                type="checkbox"
                checked={isEnterprise}
                onChange={() =>
                  setProfession({
                    ...profession,
                    isEnterprise: !isEnterprise,
                  })
                }
              />
            </div>
            <div className="profession">
              <Checkbox
                label="Researcher"
                type="checkbox"
                checked={isResearcher}
                onChange={() =>
                  setProfession({
                    ...profession,
                    isResearcher: !isResearcher,
                  })
                }
              />
            </div>
            <div className="profession">
              <Checkbox
                label="Other"
                type="checkbox"
                checked={isOther}
                onChange={() =>
                  setProfession({
                    ...profession,
                    isOther: !isOther,
                  })
                }
              />
            </div>
            <div className="button" onClick={register}>
              Register
            </div>
            {errorText && <div className="error">{errorText}</div>}
            {isRedirectedForFreeTier ? (
              <div className="message">
                Please register to access your free tier.
              </div>
            ) : null}
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          padding: 30px;
          flex-wrap: wrap;
        }
        .title {
          font-weight: bold;
          font-size: 24px;
          padding-bottom: 30px;
        }
        .header {
          font-size: 32px;
          font-weight: bold;
          padding: 15px;
          padding-top: 30px;
          text-align: center;
        }
        .label {
          font-size: 16px;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .input {
          height: 24px;
          width: 300px;
          border: none;
          border-bottom: 1px solid
            rgba(${errorText ? colors.primaryRed : '00, 00, 00'});
          font-size: 18px;
        }
        .button {
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
          color: rgba(${colors.primaryRed});
          padding-top: 10px;
          max-width: 300px;
          text-align: center;
        }
        .profession {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 15px;
          width: 250px;
        }
        .message {
          padding-top: 10px;
          text-align: center;
        }
        @media only screen and (max-width: 768px) {
          .input {
            width: 200px;
          }
          .profession {
            width: 200px;
          }
          .error {
            max-width: 200px;
          }
        }
      `}</style>
    </>
  );
};
