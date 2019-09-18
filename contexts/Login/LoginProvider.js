import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { LoginContext } from "./LoginContext";
import { COOKIES } from "../../constants/cookies";
import { intercom, isUserCookiesValid } from "./utils";

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState(null);
  const [paymentData, setPaymentData] = useState({ stripe: null });

  useEffect(() => {
    if (isUserCookiesValid()) {
      intercom.setUser(
        Cookies.get(COOKIES.loggedInAs),
        Cookies.get(COOKIES.loggedInAsUsername)
      );
      setIsLoggedIn(true);
    } else {
      intercom.removeUser();
      setIsLoggedIn(false);
      Cookies.remove(COOKIES.apiKey);
      Cookies.remove(COOKIES.loggedInAs);
      Cookies.remove(COOKIES.loggedInAsUsername);
      Cookies.remove(COOKIES.loggedInAsUserId);
    }
  });

  const value = {
    isLoggedIn,
    loggedInAs,
    setIsLoggedIn,
    setLoggedInAs,
    setPaymentData,
    paymentData,
    intercom
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
