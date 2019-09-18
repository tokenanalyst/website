import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { LoginContext } from "./LoginContext";
import { COOKIES } from "../../constants/cookies";

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState(null);
  const [paymentData, setPaymentData] = useState({ stripe: null });

  useEffect(() => {
    if (Cookies.get(COOKIES.apiKey)) setIsLoggedIn(true);
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
