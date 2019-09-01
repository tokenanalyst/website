import React, { useState, useEffect } from "react";
import { Icon } from "@blueprintjs/core";
import axios from "axios";
import ReactGA from "react-ga";

import { colors } from "../constants/styles/colors";

export const Newsletter = () => {
  const [isShown, setIsShown] = useState(false);
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
            <Icon icon="cross" color="black" iconSize={28} />
          </span>
        </div>
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
              <span className="field">
                <input
                  type="text"
                  placeholder="email"
                  className="field"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </span>
              <span className="button" onClick={register}>
                Subscribe
              </span>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          position: fixed;
          bottom: 0px;
          height: 100px;
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
        }
        .close {
          margin-right: 40px;
          cursor: pointer;
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
        .button {
          color: white;
          min-width: 60px;
          text-align: center;
          background-color: rgba(${colors.primaryGreen});
          max-height: 20px;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          margin-left: 30px;
        }
        @media only screen and (max-width: 768px) {
          .container {
            height: 150px;
          }
          .body {
            max-width: 270px;
          }
          .input {
            justify-content: space-between;
            margin-right: 40px;
          }
        }
      `}</style>
    </>
  );
};
