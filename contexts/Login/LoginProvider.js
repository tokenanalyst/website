import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { LoginContext } from "./LoginContext";
import { COOKIES } from "../../constants/cookies";

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState(null);

  useEffect(() => {
    if (Cookies.get(COOKIES.apiKey)) setIsLoggedIn(true);
  });

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    loggedInAs,
    setLoggedInAs
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
