import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { LoginContext } from "../../../contexts/Login";

export const LoginWidget = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);

  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await axios.post(
        "https://api.tokenanalyst.io/auth/user/login",
        {
          username: email,
          password
        }
      );

      Cookies.set("apiKey", response.data.apiKey);
      loginCtx.setIsLoggedIn(true);
      router.push("/");
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="title">Login</div>
        <div className="header">Email</div>
        <input
          type="text"
          className="input"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
        <div className="header">Password</div>
        <input
          type="text"
          className="input"
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <div className="login-button" onClick={login}>
          Login
        </div>
        {isError ? (
          <div className="error">Incorrect email or password</div>
        ) : null}
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }
        .title {
          font-weight: bold;
          font-size: 24px;
          padding-bottom: 30px;
        }
        .header {
          font-size: 24px;
          padding: 20px;
        }
        .input {
          height: 24px;
          width: 300px;
          border: none;
          border-bottom: 1px solid black;
          font-size: 18px;
        }
        .login-button {
          color: white;
          min-width: 60px;
          text-align: center;
          background-color: #3fcdab;
          max-height: 20px;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 20px;
        }
        .error {
          color: #fa4e96;
          padding-top: 10px;
        }
        @media only screen and (max-width: 768px) {
          .input {
            width: 200px;
          }
        }
      `}</style>
    </>
  );
};
