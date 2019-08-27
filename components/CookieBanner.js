import React, { useState, useEffect } from "react";
import { Icon } from "@blueprintjs/core";
import ReactGA from "react-ga";

export const CookieBanner = () => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem("cookieBannerDismissed")) {
      setIsShown(true);
    }
  }, []);

  const dismiss = () => {
    window.localStorage.setItem("cookieBannerDismissed", true);
    setIsShown(false);
    ReactGA.event({
      category: "User",
      action: `Dismiss cookie banner`,
      label: `CookieBanner`
    });
  };

  return (
    <>
      <div className="container">
        <div className="top">
          <span className="header">Cookies</span>
          <span className="close" onClick={dismiss}>
            <Icon icon="cross" color="black" iconSize={28} />
          </span>
        </div>
        <div className="body">
          This site uses cookies to provide you with a great user experience.
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          position: fixed;
          bottom: 142px;
          height: 50px;
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
        @media only screen and (max-width: 768px) {
          .container {
            height: 80px;
            bottom: 192px;
          }
          .body {
            max-width: 270px;
          }
        }
      `}</style>
    </>
  );
};
