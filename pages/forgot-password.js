import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { SimpleFormGroup } from '../components/SimpleFormGroup';
import { SimpleTextInput } from '../components/SimpleTextInput';
import { SimpleButton } from '../components/SimpleButton';
import { colors, PRIMARY_GREEN } from '../constants/styles/colors';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);

  const onClick = async () => {
    try {
      setIsSubmitted(true);
      const response = await axios.put(
        'https://api.tokenanalyst.io/auth/user/forgot-password',
        {
          email,
        }
      );
      if (response.status === 200) {
        setIsResetEmailSent(true);
      }
    } catch (e) {
      setIsSubmitted(false);
      setIsError(true);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Forgot Password</h1>
        {isResetEmailSent ? (
          <div className="confirmation">
            Thanks, an email has been sent to {email}. Please check your inbox.
          </div>
        ) : (
          <form
            onSubmit={async e => {
              e.preventDefault();
              onClick();
            }}
            className="form"
          >
            <SimpleFormGroup
              label={
                <div className="input-title">
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
            <SimpleButton
              background={PRIMARY_GREEN}
              fill
              onClick={onClick}
              loading={isSubmitted}
              type="submit"
            >
              Confirm
            </SimpleButton>
            {isError && (
              <span className="error">
                Sorry, we could not find that email in our system
              </span>
            )}
          </form>
        )}
      </div>
      <style jsx>
        {`
          .container {
            text-align: center;
          }
          .form {
            font-family: Open Sans;
            width: 340px;
            display: inline-block;
          }
          .error {
            color: rgba(${colors.primaryRed});
            max-width: 300px;
            text-align: center;
          }
          .input-title {
            text-align: left;
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

export default ForgotPassword;
