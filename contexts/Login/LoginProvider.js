import PropTypes from 'prop-types';
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
  const [
    postRegisterViaAnalyticsUrl,
    setPostRegisterViaAnalyticsUrl,
  ] = useState(null);

  useEffect(() => {
    if (isUserCookiesValid()) {
      const username = Cookies.get(COOKIES.loggedInAsUsername);
      const userId = Cookies.get(COOKIES.userId);
      intercom.setUser('', username, userId);
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
    postRegisterViaAnalyticsUrl,
    setIsLoggedIn,
    setPostRegisterRedirectUrl,
    setPostRegisterViaMetricsRedirectUrl,
    setPostRegisterViaAnalyticsUrl,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
