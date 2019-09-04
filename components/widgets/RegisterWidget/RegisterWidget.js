import React, { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Icon } from "@blueprintjs/core";
import Link from "next/link";

import { LoginContext } from "../../../contexts/Login";
import { colors } from "../../../constants/styles/colors";

export const RegisterWidget = () => {
  const loginCtx = useContext(LoginContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errorText, setErrorText] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);

  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isEnthusiast, setIsEnthusiast] = useState(false);
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [isResearcher, setIsResearcher] = useState(false);
  const [isTrader, setIsTrader] = useState(false);
  const [isOther, setIsOther] = useState(false);

  const register = async () => {
    if (password !== passwordVerify) {
      setErrorText("Passwords do not match");
      return;
    }
    try {
      await axios.post("https://api.tokenanalyst.io/auth/user", {
        username: email,
        password,
        name,
        trader: isTrader,
        enterprise: isEnterprise,
        enthusiast: isEnthusiast,
        researcher: isResearcher,
        developer: isDeveloper,
        other: isOther
      });

      const response = await axios.post(
        "https://api.tokenanalyst.io/auth/user/login",
        {
          username: email,
          password
        }
      );

      Cookies.set("apiKey", response.data.apiKey);
      loginCtx.setIsLoggedIn(true);
      setErrorText(null);
      setHasRegistered(true);
    } catch (e) {
      setErrorText(
        "Please provide valid details and ensure that you haven't already registered"
      );
    }
  };

  return (
    <>
      <div className="container">
        {hasRegistered ? (
          <>
            <Icon
              icon="tick"
              color={`rgba(${colors.primaryGreen})`}
              iconSize={48}
            />
            <div className="success">Thanks for registering {name}!</div>
            <br />
            <div className="success">
              An email will shortly be with you containing all your details
              including your API key
            </div>
            <Link href="/" passHref>
              <div className="button">Go Home</div>
            </Link>
          </>
        ) : (
          <>
            <div className="header">Name</div>
            <input
              type="text"
              className="input"
              onChange={e => setName(e.target.value)}
            />
            <div className="header">Email</div>
            <input
              type="text"
              className="input"
              onChange={e => setEmail(e.target.value)}
            />
            <div className="header">Password</div>
            <input
              type="password"
              className="input"
              onChange={e => setPassword(e.target.value)}
            />
            <div className="header">Repeat Password</div>
            <input
              className="input"
              type="password"
              onChange={e => setPasswordVerify(e.target.value)}
            />
            <div className="header">Which apply to you?</div>
            <div className="profession">
              <span>
                <input
                  type="checkbox"
                  checked={isTrader}
                  onClick={() => setIsTrader(!isTrader)}
                />
                <span>Trader</span>
              </span>
            </div>
            <div className="profession">
              <span>
                <input
                  type="checkbox"
                  checked={isDeveloper}
                  onClick={() => setIsDeveloper(!isDeveloper)}
                />
                <span>Developer</span>
              </span>
            </div>
            <div className="profession">
              <span>
                <input
                  type="checkbox"
                  checked={isEnthusiast}
                  onClick={() => setIsEnthusiast(!isEnthusiast)}
                />
                <span>Enthusiast</span>
              </span>
            </div>
            <div className="profession">
              <span>
                <input
                  type="checkbox"
                  checked={isEnterprise}
                  onClick={() => setIsEnterprise(!isEnterprise)}
                />
                <span>Enterprise</span>
              </span>
            </div>
            <div className="profession">
              <span>
                <input
                  type="checkbox"
                  checked={isResearcher}
                  onClick={() => setIsResearcher(!isResearcher)}
                />
                <span>Researcher</span>
              </span>
            </div>
            <div className="profession">
              <span>
                <input
                  type="checkbox"
                  checked={isOther}
                  onClick={() => setIsOther(!isOther)}
                />
                <span>Other</span>
              </span>
            </div>
            <div className="button" onClick={register}>
              Register
            </div>
            {errorText && <div className="error">{errorText}</div>}
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          padding: 30px;
          flex-wrap: wrap;
        }
        .title {
          font-weight: bold;
          font-size: 24px;
          padding-bottom: 30px;
        }
        .header {
          font-size: 16px;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .input {
          height: 24px;
          width: 300px;
          border: none;
          border-bottom: 1px solid
            rgba(${errorText ? colors.primaryRed : "00, 00, 00"});
          font-size: 18px;
        }
        .button {
          color: white;
          min-width: 60px;
          text-align: center;
          background-color: rgba(${colors.primaryGreen});
          max-height: 20px;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 20px;
        }
        .error {
          color: rgba(${colors.primaryRed});
          padding-top: 10px;
          max-width: 300px;
          text-align: center;
        }
        .profession {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 15px;
          width: 250px;
        }
        @media only screen and (max-width: 768px) {
          .input {
            width: 200px;
          }
          .profession {
            width: 200px;
          }
          .error {
            max-width: 200px;
          }
        }
      `}</style>
    </>
  );
};
