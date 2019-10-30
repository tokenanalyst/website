import { useContext } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';

import { DelayedDialog } from '../../DelayedDialog';
import { COOKIES } from '../../../constants/cookies';
import { LoginContext } from '../../../contexts/Login';

export const DelayedExchangeRegisterDialog = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);

  return (
    <DelayedDialog
      header="Need More Granularity?"
      subHeader="Sign up now for FREE to access TokenAnalyst charts in a 1 hour granularity across ALL tokens, exchanges and metrics!"
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
        <style jsx>
          {`
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
