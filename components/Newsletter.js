import React, { useState, useEffect } from "react";
import { Icon } from "@blueprintjs/core";
import axios from "axios";
import ReactGA from "react-ga";

import { colors } from "../constants/styles/colors";

export const Newsletter = () => {
  const [isShown, setIsShown] = useState(true);
  const [email, setEmail] = useState("");
  const [hasPosted, setHasPosted] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem("newsletterDismissed")) {
      setIsShown(true);
    }
  }, []);

  const register = async () => {
    await axios.post("https://api.tokenanalyst.io/newsletter", { email });
    setHasPosted(true);
    window.localStorage.setItem("newsletterDismissed", true);
    setTimeout(() => setIsShown(false), 1000);
  };

  const dismiss = () => {
    window.localStorage.setItem("newsletterDismissed", true);
    setIsShown(false);
    ReactGA.event({
      category: "User",
      action: `Dismiss newsletter`,
      label: `Newsletter`
    });
  };

  return (
    <>
      <div className="container">
        <div className="top">
          <span className="header">Newsletter</span>
          <span className="close" onClick={dismiss}>
            <img src="/static/svg/cross.svg" className="icon" />
          </span>
        </div>
        <div className="shadow" />
        <div className="body">
          Our newsletter features the most recent findings, reports and updates
          to our new products.
        </div>
        <div className="input">
          {hasPosted ? (
            <Icon
              icon="tick"
              color={`rgba(${colors.primaryGreen})`}
              iconSize={30}
            />
          ) : (
            <>
              <div className="field">
                <div className="field-header">Your Email</div>
                <input
                  type="text"
                  className="field-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="famoustrader@bitmex.org"
                />
                <div className="button" onClick={register}>
                  Sign up
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          position: fixed;
          bottom: 0px;
          height: 180px;
          background-color: white;
          width: 100%;
          z-index: 10000;
          border-top: solid 3px rgba(151, 151, 151, 0.15);
          padding: 20px;
          display: ${isShown ? "block" : "none"};
        }
        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .header {
          font-size: 24px;
          font-weight: bold;
          border-bottom: 3px solid rgba(${colors.primaryGreen});
          margin-bottom: 10px;
        }
        .close {
          margin-right: 40px;
          cursor: pointer;
          opacity: 0.3;
        }
        .input {
          display: flex;
          flex-direction: row;
          padding-top: 20px;
          align-items: center;
        }
        .field {
          width: 150px;
          height: 24px;
        }
        .field-header {
          font-weight: bold;
          opacity: 0.4;
          padding-bottom: 5px;
        }
        .field-input {
          opacity: 0.5;
          font-style: italic;
          padding: 10px;
          min-width: 300px;
          box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.3);
        }
        .button {
          color: white;
          min-width: 135px;
          text-align: center;
          background-color: rgba(${colors.primaryGreen});
          max-height: 20px;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 10px;
        }
        .icon {
          height: 28;
          width: 28;
        }
        @media only screen and (max-width: 768px) {
          .container {
            height: 180px;
          }
          .top {
            padding-bottom: 10px;
          }
          .body {
            max-width: 270px;
            padding-top: 20px;
            display: none;
          }
          .input {
            justify-content: space-between;
            margin-right: 40px;
          }
          .shadow {
            height: 4px;
            border-bottom: solid 1px rgba(151, 151, 151, 0.15);
            box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
            margin-left: -20px;
            margin-right: -20px;
          }
        }
      `}</style>
    </>
  );
};
