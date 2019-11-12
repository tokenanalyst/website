import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Icon } from '@blueprintjs/core';

import { colors, PRIMARY_GREEN } from '../../../constants/styles/colors';
import { LoginContext } from '../../../contexts/Login';
import { login } from '../../../services/login/login';
import { SimpleFormGroup } from '../../SimpleFormGroup';
import { SimpleTextInput } from '../../SimpleTextInput';
// import { PasswordStrength } from '../components/widgets/RegisterWidget/PasswordStrength';
import { SimpleButton } from '../../SimpleButton';

export const ChangePasswordWidget = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onClick = async () => {
    try {
      const response = await axios.put(
        'http://localhost:3009/auth/user/verify-email',
        {
          email,
          password,
          verificationToken: router.query.verificationToken,
        }
      );
      if (response.status === 200) {
        login(email, password, loginCtx, router, setIsSubmitted);
      }
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <>
      <div>
        {router.query.verificationToken && (
          <>
            <form
              onSubmit={async e => {
                e.preventDefault();
                onClick();
              }}
            >
              <SimpleFormGroup
                label={
                  <div>
                    Email <span className="mandatory-field">*</span>
                  </div>
                }
                labelFor="registration-email"
              >
                <SimpleTextInput
                  id="registration-email"
                  onChange={e => setEmail(e.target.value.trim())}
                />
              </SimpleFormGroup>
              <SimpleFormGroup
                label={
                  <div>
                    Password <span className="mandatory-field">*</span>
                  </div>
                }
                labelFor="registration-password"
              >
                <SimpleTextInput
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="registration-password"
                  onChange={e => setPassword(e.target.value)}
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
                onClick={onClick}
                loading={isSubmitted}
                type="submit"
              >
                Sign Up
              </SimpleButton>
              {isError && (
                <div className="error">
                  There has been a problem. Please contact info@tokenanalyst.io
                </div>
              )}
            </form>
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
            padding-top: 0px;
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
          .mandatory-field {
            opacity: 0.5;
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
