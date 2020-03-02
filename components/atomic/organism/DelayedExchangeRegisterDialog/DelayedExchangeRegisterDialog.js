/* eslint-disable react/jsx-curly-newline */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';

import { DelayedDialog } from '../../molecules/DelayedDialog/DelayedDialog';
import { COOKIES } from '../../../../constants/cookies';
import { LoginContext } from '../../../../contexts/Login';

const DialogText = (
  <>
    <div className="text">
      Sign up now for
      <span className="bold"> FREE </span>
      to access TokenAnalyst charts in a 1 hour granularity across ALL tokens,
      exchanges and metrics!
    </div>

    <style jsx>
      {`
        .text {
          line-height: 1.5em;
          font-size: 16px;
          padding-bottom: 20px;
        }
        .bold {
          font-weight: 700;
        }
      `}
    </style>
  </>
);

export const DelayedExchangeRegisterDialog = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);

  return (
    <DelayedDialog
      header="Need More Granularity?"
      subHeader={DialogText}
      timeout={25000}
      onCtaClick={() => {
        loginCtx.setPostRegisterRedirectUrl(router.asPath.split('?')[0]);
        router.push('/register?exchange=true');
        Cookies.set(COOKIES.hasSeenRegisterDialog, true);
        ReactGA.event({
          category: 'User',
          action: `Register Dialog Sign Up Clicked`,
          label: `Funnel`,
        });
      }}
      onClose={() => {
        Cookies.set(COOKIES.hasSeenRegisterDialog, true);
        ReactGA.event({
          category: 'User',
          action: `Register Dialog Dismissed`,
          label: `Funnel`,
        });
      }}
      ctaText="Sign Up"
      onDisplay={() =>
        ReactGA.event({
          category: 'User',
          action: `Register Dialog Shown`,
          label: `Funnel`,
        })
      }
    >
      <>
        <div className="image-container">
          <img
            src="/static/png/chart-register-desktop.png"
            className="image-desktop"
            alt="register-desktop"
          />
          <img
            src="/static/png/chart-register-mobile.png"
            className="image-mobile"
            alt="redirect-mobile"
          />
        </div>

        <style jsx>
          {`
            .image-container {
              box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15),
                0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
            }
            .image-desktop {
              width: 100%;
              display: block;
            }
            .image-mobile {
              display: none;
            }
            @media only screen and (max-width: 768px) {
              .image-mobile {
                width: 280px;
                display: block;
              }
              .image-desktop {
                display: none;
              }
            }
          `}
        </style>
      </>
    </DelayedDialog>
  );
};
