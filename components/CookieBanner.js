import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';

import { colors } from '../constants/styles/colors';

export const CookieBanner = () => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem('cookieBannerDismissed')) {
      setIsShown(true);
    }
  }, []);

  const dismiss = () => {
    window.localStorage.setItem('cookieBannerDismissed', true);
    setIsShown(false);
    ReactGA.event({
      category: 'User',
      action: `Dismiss cookie banner`,
      label: `CookieBanner`,
    });
  };

  return (
    <>
      <div className="container">
        <div className="top">
          <span className="header">Cookies</span>
          <span className="close" onClick={dismiss}>
            <img
              src="/static/svg/cross.svg"
              className="icon"
              alt="Close Cookie Banner"
            />
          </span>
        </div>
        <div className="body">
          This site uses cookies to provide you with a great user experience.
        </div>
      </div>
      <style jsx>
        {`
          .container {
            font-family: Space Grotesk;
            position: fixed;
            bottom: 223px;
            height: 100px;
            background-color: white;
            width: 100%;
            z-index: 10000;
            border-top: solid 3px rgba(151, 151, 151, 0.15);
            padding: 20px;
            display: ${isShown ? 'block' : 'none'};
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
          .icon {
            height: 28;
            width: 28;
          }
          @media only screen and (max-width: 768px) {
            .container {
              height: 150px;
              bottom: 223px;
            }
            .body {
              max-width: 270px;
            }
          }
        `}
      </style>
    </>
  );
};
