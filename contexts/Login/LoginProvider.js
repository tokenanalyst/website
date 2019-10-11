import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { LoginContext } from './LoginContext';
import { COOKIES } from '../../constants/cookies';
import { intercom, isUserCookiesValid } from './utils';

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentData, setPaymentData] = useState({ stripe: null });
  const [postRegisterRedirectUrl, setPostRegisterRedirectUrl] = useState(null);

  useEffect(() => {
    if (isUserCookiesValid()) {
      intercom.setUser(Cookies.get(COOKIES.loggedInAsUsername));
      setIsLoggedIn(true);
    } else {
      intercom.removeUser();
      setIsLoggedIn(false);
      Cookies.remove(COOKIES.apiKey);
      Cookies.remove(COOKIES.loggedInAsUsername);
      Cookies.remove(COOKIES.loggedInAsUserId);
    }

    if (Cookies.get(COOKIES.tier) === undefined) {
      Cookies.set(COOKIES.tier, -1);
      Cookies.remove(COOKIES.apiKey);
      Cookies.remove(COOKIES.loggedInAsUsername);
      Cookies.remove(COOKIES.loggedInAsUserId);
    }
  });

  const value = {
    isLoggedIn,
    paymentData,
    intercom,
    postRegisterRedirectUrl,
    setIsLoggedIn,
    setLoggedInAs,
    setPaymentData,
    setPostRegisterRedirectUrl,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
