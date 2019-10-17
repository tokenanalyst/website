import React, { useState, useContext } from 'react';
import { Icon } from '@blueprintjs/core';
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    value: null,
    strength: 0,
  });
  const [errorText, setErrorText] = useState(null);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isRedirectedForFreeTier = loginCtx.paymentData.isFreeTier;

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
      password,
    };

    setIsSubmitted(true);

    const result = await onFormRegister(loginCtx, formValues);

    const { isSuccess, errorMsg, redirectFn } = result;

    if (isSuccess) {
      setErrorText(null);
      setHasRegistered(true);
      redirectFn && redirectFn();
    } else {
      setErrorText(errorMsg);
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">Sign Up</div>

        {hasRegistered ? (
          <>
            <Icon
              icon="tick"
              color={`rgba(${colors.primaryGreen})`}
              iconSize={48}
            />
            <div className="success">{`Thanks for registering!`}</div>
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
              <SimpleFormGroup label="Email" labelFor="registration-email">
                <SimpleTextInput
                  id="registration-email"
                  onChange={e => setEmail(e.target.value.trim())}
                />
              </SimpleFormGroup>
              <SimpleFormGroup
                label="Password"
                labelFor="registration-password"
                helperText={<PasswordStrength score={password.strength} />}
              >
                <SimpleTextInput
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="registration-password"
                  onChange={onPasswordChange}
                  rightElement={
                    <Icon
                      icon={isPasswordVisible ? 'eye-off' : 'eye-open'}
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  }
                />
              </SimpleFormGroup>
              <SimpleButton
                background={PRIMARY_GREEN}
                fill
                onClick={onRegister}
                loading={isSubmitted}
              >
                Sign Up
              </SimpleButton>
              {errorText && <div className="error">{errorText}</div>}
              {isRedirectedForFreeTier ? (
                <div className="message">
                  Please register to access your free tier.
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
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
            .error {
              max-width: 200px;
            }
          }
        `}
      </style>
    </>
  );
};
