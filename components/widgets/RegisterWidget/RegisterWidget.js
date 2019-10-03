import React, { useState, useContext } from 'react';
import { Icon, Checkbox, Card } from '@blueprintjs/core';
import Link from 'next/link';
import zxcvbn from 'zxcvbn';

import { LoginContext } from '../../../contexts/Login';
import { colors, PRIMARY_GREEN } from '../../../constants/styles/colors';
import { SimpleFormGroup } from '../../SimpleFormGroup';
import { SimpleTextInput } from '../../SimpleTextInput';
import { onFormRegister } from './utils/onFormRegister';
import { PasswordStrength } from './PasswordStrength';
import { SimpleButton } from '../../SimpleButton';

export const RegisterWidget = () => {
  const loginCtx = useContext(LoginContext);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    value: null,
    verify: null,
    strength: 0,
  });
  const [errorText, setErrorText] = useState(null);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const onPasswordChange = e => {
    const passwordStrength = zxcvbn(e.target.value);

    setPassword({
      ...password,
      value: e.target.value,
      strength: passwordStrength.score,
    });
  };

  const onRegister = async () => {
    const formValues = {
      email,
      fullName,
      password,
      profession,
    };
    const result = await onFormRegister(loginCtx, formValues);

    const { isSuccess, errorMsg, redirectFn } = result;

    setIsSubmitted(true);

    if (isSuccess) {
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
          `/exchange/[token]/[exchange]?tier=0`,
          `${loginCtx.postRegisterRedirectUrl}?registered=true`
        );
      } else {
        ReactGA.event({
          category: 'User',
          action: `Registered organically`,
          label: `Funnel`,
        });
        Router.push('/?registered=true');
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
      redirectFn();
    } else {
      setErrorText(errorMsg);
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Register</h1>
        <div className="header">Register</div>

        {hasRegistered ? (
          <>
            <Icon
              icon="tick"
              color={`rgba(${colors.primaryGreen})`}
              iconSize={48}
            />
            <div className="success">{`Thanks for registering ${fullName}!`}</div>
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
            <div className="register-form">
              <Card>
                <SimpleFormGroup label="Name" labelFor="registration-name">
                  <SimpleTextInput
                    id="registration-name"
                    onChange={e => setFullName(e.target.value)}
                  />
                </SimpleFormGroup>
                <SimpleFormGroup label="Email" labelFor="registration-email">
                  <SimpleTextInput
                    id="registration-email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </SimpleFormGroup>
                <SimpleFormGroup
                  label="Password"
                  labelFor="registration-password"
                  helperText={<PasswordStrength score={password.strength} />}
                >
                  <SimpleTextInput
                    type="password"
                    id="registration-password"
                    onChange={onPasswordChange}
                    rightElement={<Icon icon="lock" />}
                  />
                </SimpleFormGroup>

                <SimpleFormGroup
                  label="Repeat Password"
                  labelFor="registration-password-verify"
                >
                  <SimpleTextInput
                    type="password"
                    id="registration-password-verify"
                    onChange={e =>
                      setPassword({ ...password, verify: e.target.value })
                    }
                    rightElement={<Icon icon="lock" />}
                  />
                </SimpleFormGroup>

                <div className="label">Which apply to you?</div>
                <div className="professions-list">
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
                </div>

                <SimpleButton
                  background={PRIMARY_GREEN}
                  fill
                  onClick={onRegister}
                  loading={isSubmitted}
                >
                  Register
                </SimpleButton>
                {errorText && <div className="error">{errorText}</div>}
                {isRedirectedForFreeTier ? (
                  <div className="message">
                    Please register to access your free tier.
                  </div>
                ) : null}
              </Card>
            </div>
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
        h1 {
          font-size: 32px;
          font-weight: bold;
          padding: 15px;
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
      <style jsx>
        {`
          .container {
            font-family: Open Sans;
            flex-wrap: wrap;
            width: 340px;
          }
          .title {
            font-weight: bold;
            font-size: 24px;
            padding-bottom: 30px;
          }
          .header {
            font-family: Space Grotesk;
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
          .register-form {
            margin-top: 30px;
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
          .professions-list {
            padding-bottom: 15px;
          }
          .message {
            padding-top: 10px;
            text-align: center;
          }
          @media only screen and (max-width: 768px) {
            .container {
              font-family: Open Sans;
              flex-wrap: wrap;
              width: 98%;
            }
            .profession {
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
