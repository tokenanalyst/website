import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { LoginContext } from "./LoginContext";

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get("apiKey")) setIsLoggedIn(true);
  });

  const value = {
    isLoggedIn,
    setIsLoggedIn
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
