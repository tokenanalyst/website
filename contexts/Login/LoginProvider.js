import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { LoginContext } from './LoginContext';
import { COOKIES } from '../../constants/cookies';
import { intercom, isUserCookiesValid } from './utils';

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postRegisterRedirectUrl, setPostRegisterRedirectUrl] = useState(null);
  const [
    postRegisterViaMetricsRedirectUrl,
    setPostRegisterViaMetricsRedirectUrl,
  ] = useState(null);

  useEffect(() => {
    if (isUserCookiesValid()) {
      intercom.setUser(Cookies.get(COOKIES.loggedInAsUsername));
      setIsLoggedIn(true);
    } else {
      intercom.removeUser();
      setIsLoggedIn(false);
      Cookies.remove(COOKIES.apiKey);
      Cookies.remove(COOKIES.loggedInAsUsername);
    }

    if (Cookies.get(COOKIES.tier) === undefined) {
      Cookies.set(COOKIES.tier, -1);
      Cookies.remove(COOKIES.apiKey);
      Cookies.remove(COOKIES.loggedInAsUsername);
    }
  }, []);

  const value = {
    isLoggedIn,
    intercom,
    postRegisterRedirectUrl,
    postRegisterViaMetricsRedirectUrl,
    setIsLoggedIn,
    setPostRegisterRedirectUrl,
    setPostRegisterViaMetricsRedirectUrl,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
