import React, { useState, useContext } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

import { LoginContext } from "../../contexts/Login";
import { LOGO_IMAGES } from "../../constants/image-paths";

export const DesktopNav = () => {
  const loginCtx = useContext(LoginContext);

  const [shownItems, setShownItems] = useState({
    about: false,
    contact: false
  });

  const collapseAllSubMenus = () => {
    setShownItems({
      about: false,
      contact: false
    });
  };

  const collapseSubMenuDelayed = submenu => {
    setTimeout(() => {
      setShownItems(prev => ({
        ...prev,
        [submenu]: false
      }));
    }, 500);
  };

  return (
    <div className="top">
      <div className="container">
        <div className="desktop">
          <div className="logo-desktop">
            <Link href="/" passHref>
              <img
                src={
                  loginCtx.isLoggedIn
                    ? `/static/png/${LOGO_IMAGES["DesktopPro"]}`
                    : `/static/png/${LOGO_IMAGES["Desktop"]}`
                }
                width="180px"
              />
            </Link>
          </div>
          <div className="desktop-links">
            <Link href="/" passHref>
              <div className="desktop-link">Home</div>
            </Link>
            <Link href="/stablecoins" passHref>
              <div className="desktop-link" onMouseOver={collapseAllSubMenus}>
                Stablecoins
              </div>
            </Link>
            <Link href="/compare" passHref>
              <div className="desktop-link" onMouseOver={collapseAllSubMenus}>
                Token Compare
              </div>
            </Link>
            <a href="https://research.tokenanalyst.io/" target="_blank">
              Research
            </a>
            <Link href="/pricing" passHref>
              <div className="desktop-link">Pricing</div>
            </Link>
            <a
              href="https://docs.tokenanalyst.io/#/api"
              target="_blank"
              onMouseOver={collapseAllSubMenus}
            >
              API
            </a>
            <Link href="/about" passHref>
              <div className="desktop-link" onMouseOver={collapseAllSubMenus}>
                About Us
              </div>
            </Link>
            <div
              className="desktop-link"
              onMouseOver={() => {
                collapseAllSubMenus();
                setShownItems(prev => ({ ...prev, contact: true }));
              }}
            >
              Contact
            </div>
            {loginCtx.isLoggedIn ? (
              <div
                className="login-button"
                onClick={() => {
                  Cookies.remove("apiKey");
                  loginCtx.setIsLoggedIn(false);
                }}
                onMouseOver={() => {
                  collapseAllSubMenus();
                }}
              >
                Logout
              </div>
            ) : (
              <Link href="/login" passHref>
                <div
                  className="login-button"
                  onMouseOver={() => {
                    collapseAllSubMenus();
                  }}
                >
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="desktop-sub-links-container">
        <div
          className="desktop-contact-sub-link-container"
          onClick={collapseAllSubMenus}
        >
          <div className="desktop-sub-links">
            <div
              className="desktop-contact-sub-links"
              onMouseLeave={() => collapseSubMenuDelayed("contact")}
            >
              <div className="desktop-sub-link">
                <a href="https://twitter.com/thetokenanalyst" target="_blank">
                  Follow Us
                </a>
              </div>
              <div className="desktop-sub-link">
                <a
                  href="https://t.me/joinchat/AAAAAEXMAvSpOZao3fRvJA"
                  target="_blank"
                >
                  Telegram
                </a>
              </div>
              <div className="desktop-sub-link">
                <a href="mailto:info@tokenanalyst.io" target="_blank">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .top {
          font-family: DIN Alternate Medium;
          color: white;
        }
        .container {
          position: fixed;
          background-color: black;
          z-index: 100;
          width: 100%;
        }
        .desktop {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-left: 20px;
          height: 60px;
        }
        .logo-desktop {
          cursor: pointer;
        }
        .desktop-links {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          min-width: 100%;
        }
        .desktop-link,
        a {
          opacity: 0.5;
          padding-left: 10px;
          padding-right: 10px;
          text-decoration: none;
          color: white;
        }
        .desktop-link:hover,
        a:hover {
          opacity: 1;
          cursor: pointer;
        }
        .desktop-about-sub-link-container {
          width: 125px;
          background: black;
          position: fixed;
          color: white;
          z-index: 10000;
          top: 60px;
          margin-left: 470px;
          padding-left: 10px;
          border-radius: 0px 0px 5px 5px;
        }
        .desktop-contact-sub-link-container {
          width: 125px;
          background: black;
          position: fixed;
          color: white;
          z-index: 10000;
          top: 60px;
          margin-left: 785px;
          padding-left: 10px;
          border-radius: 0px 0px 5px 5px;
        }
        .desktop-sub-link {
          padding-top: 5px;
          padding-bottom: 5px;
          opacity: 0.5;
        }
        .desktop-sub-link > a {
          padding-left: 0px;
          opacity: 1;
        }
        .desktop-sub-link:hover {
          cursor: pointer;
          opacity: 1;
        }
        .desktop-about-sub-links {
          display: ${shownItems.about ? "block" : "none"};
        }
        .desktop-contact-sub-links {
          display: ${shownItems.contact ? "block" : "none"};
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
          margin-left: 20px;
        }
        @media only screen and (max-width: 768px) {
          .top {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
