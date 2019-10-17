import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { PLANS } from '../../../constants/plans';
import { Link } from '../../Link';
import { COOKIES } from '../../../constants/cookies';
import { LoginContext } from '../../../contexts/Login';

export const CTALink = () => {
  const router = useRouter();
  const loginContext = useContext(LoginContext);
  const TIER = Number(Cookies.get(COOKIES.tier));

  const renderCTALink = () => {
    if (TIER !== null) {
      if (TIER === PLANS.SIGNED_OUT.id) {
        return (
          <Link
            desktopLabel="Sign Up for 1 Hour Granularity"
            href="/register?exchange=true"
            onClick={() => {
              loginContext.setPostRegisterRedirectUrl(router.asPath);
              ReactGA.event({
                category: 'User',
                action: `Click Sign Up CTA Exchange Page`,
                label: `Funnel`,
              });
            }}
          />
        );
      }

      if (TIER < PLANS.PLATFORM.id) {
        return (
          <Link
            desktopLabel="Get Unlimited Data"
            href="/pricing?exchange=true"
            onClick={() => {
              ReactGA.event({
                category: 'User',
                action: `Click Upgrade CTA Exchange Page`,
                label: `Funnel`,
              });
            }}
          />
        );
      }
      return null;
    }

    return null;
  };

  return <div className="container">{renderCTALink()}</div>;
};
