import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Icon } from "@blueprintjs/core";
import Link from "next/link";

import { LoginContext } from "../../../contexts/Login";
import { colors } from "../../../constants/styles/colors";
import { API_ERROR_MSG } from '../../../constants/apiErrors'

export const RegisterWidget = () => {
  const loginCtx = useContext(LoginContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errorText, setErrorText] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [profession, setProfession] = useState({
    trader: false,
    enterprise: false,
    enthusiast: false,
    researcher: false,
    developer: false,
    other: false
  })

  const { trader, enterprise, enthusiast, researcher, developer, other } = profession

  console.log(profession)

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
        ...profession
      });

      // const response = await axios.post(
      //   "https://api.tokenanalyst.io/auth/user/login",
      //   {
      //     username: email,
      //     password
      //   }
      // );

      // Cookies.set("apiKey", response.data.apiKey);
      // loginCtx.setIsLoggedIn(true);
      // setErrorText(null);
      // setHasRegistered(true);
    } catch (e) {
      console.log(e)
      if (e.message === API_ERROR_MSG.USER_ALREADY_EXISTS) {
        setErrorText(
          "You are already registered, please login."
        );
      } else {
        setErrorText(
          "Please provide valid details and ensure that you haven't already registered"
        );
      }

    }
  };

  return (
    <>
      <div className="container">
        <div className="header">Register</div>
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
              <div className="label">Name</div>
              <input
                type="text"
                className="input"
                onChange={e => setName(e.target.value)}
              />
              <div className="label">Email</div>
              <input
                type="text"
                className="input"
                onChange={e => setEmail(e.target.value)}
              />
              <div className="label">Password</div>
              <input
                type="password"
                className="input"
                onChange={e => setPassword(e.target.value)}
              />
              <div className="label">Repeat Password</div>
              <input
                className="input"
                type="password"
                onChange={e => setPasswordVerify(e.target.value)}
              />
              <div className="label">Which apply to you?</div>
              <div className="profession">
                <span>
                  <input
                    type="checkbox"
                    checked={trader}
                    onChange={() => {
                      console.log({
                        ...profession,
                        trader: !trader
                      })
                      return setProfession({
                        ...profession,
                        trader: !trader
                      })
                    }}
                  />
                  <span>Trader</span>
                </span>
              </div>
              <div className="profession">
                <span>
                  <input
                    type="checkbox"
                    checked={developer}
                    onChange={() => setProfession({
                      ...profession,
                      developer: !developer
                    })}
                  />
                  <span>Developer</span>
                </span>
              </div>
              <div className="profession">
                <span>
                  <input
                    type="checkbox"
                    checked={enthusiast}
                    onChange={() => setProfession({
                      ...profession,
                      enthusiast: !enthusiast
                    })}
                  />
                  <span>Enthusiast</span>
                </span>
              </div>
              <div className="profession">
                <span>
                  <input
                    type="checkbox"
                    checked={enterprise}
                    onChange={() => setProfession({
                      ...profession,
                      enterprise: !enterprise
                    })}
                  />
                  <span>Enterprise</span>
                </span>
              </div>
              <div className="profession">
                <span>
                  <input
                    type="checkbox"
                    checked={researcher}
                    onChange={() => setProfession({
                      ...profession,
                      researcher: !researcher
                    })}
                  />
                  <span>Researcher</span>
                </span>
              </div>
              <div className="profession">
                <span>
                  <input
                    type="checkbox"
                    checked={other}
                    onChange={() => setProfession({
                      ...profession,
                      other: !other
                    })}
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
          font-family: Open Sans;
          padding: 30px;
          flex-wrap: wrap;
        }
        .title {
          font-weight: bold;
          font-size: 24px;
          padding-bottom: 30px;
        }
        .header {
          font-size: 32px;
          font-weight: bold;
          padding: 15px;
          padding-top: 30px;
          text-align: center;
        }
        .label {
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
