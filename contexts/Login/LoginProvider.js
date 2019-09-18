import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { LoginContext } from "./LoginContext";
import { COOKIES } from "../../constants/cookies";

const isUserCookiesValid = () => {
  return !!(
    Cookies.get("apiKey") &&
    Cookies.get("loggedInAs") &&
    Cookies.get("loggedInAsUsername") &&
    Cookies.get("loggedInAsUserId")
  );
};

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState(null);
  const [paymentData, setPaymentData] = useState({ stripe: null });

  useEffect(() => {
    if (isUserCookiesValid()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      Cookies.remove("apiKey");
      Cookies.remove("loggedInAs");
      Cookies.remove("loggedInAsUsername");
      Cookies.remove("loggedInAsUserId");
    }
  });

  const value = {
    isLoggedIn,
    loggedInAs,
    setIsLoggedIn,
    setLoggedInAs,
    setPaymentData,
    paymentData
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
