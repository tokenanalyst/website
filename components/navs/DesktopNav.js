import React, { useState, useContext } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { LoginContext } from "../../contexts/Login";
import { LOGO_IMAGES } from "../../constants/image-paths";
import { colors } from "../../constants/styles/colors";

export const setLinkActive = (pathName, link) =>
  pathName === link ? "desktop-link-active" : "desktop-link";

export const DesktopNav = () => {
  const loginCtx = useContext(LoginContext);
  const router = useRouter();

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
    <div className="container">
      <div className="desktop">
        <div className="left-side">
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
              <div className={setLinkActive(router.pathname, "/")}>
                Exchange Flows
              </div>
            </Link>
            <Link href="/stablecoins" passHref>
              <div
                className={setLinkActive(router.pathname, "/stablecoins")}
                onMouseOver={collapseAllSubMenus}>
                Stablecoins
              </div>
            </Link>
            <Link href="/compare" passHref>
              <div
                className={setLinkActive(router.pathname, "/compare")}
                onMouseOver={collapseAllSubMenus}>
                Compare
              </div>
            </Link>
            <a href="https://research.tokenanalyst.io/" target="_blank">
              Research
            </a>
            <Link href="/pricing" passHref>
              <div className={setLinkActive(router.pathname, "/pricing")}>
                Pricing
              </div>
            </Link>
            <a
              href="https://docs.tokenanalyst.io/#/api"
              target="_blank"
              onMouseOver={collapseAllSubMenus}>
              API
            </a>
            <div
              className={setLinkActive(router.pathname, "/about")}
              onMouseOver={() => {
                collapseAllSubMenus();
                setShownItems(prev => ({ ...prev, contact: true }));
              }}>
              About Us
            </div>
          </div>
        </div>
        <div className="right-side">
          {loginCtx.isLoggedIn ? (
            <>
              <span style={{ color: "white" }}>
                Welcome, {Cookies.get("loggedInAs")}
              </span>
              <span
                className="login-button"
                onClick={() => {
                  Cookies.remove("apiKey");
                  loginCtx.setIsLoggedIn(false);
                }}
                onMouseOver={() => {
                  collapseAllSubMenus();
                }}>
                Logout
              </span>
            </>
          ) : (
            <Link href="/login" passHref>
              <div
                className="login-button"
                onMouseOver={() => {
                  collapseAllSubMenus();
                }}>
                Login
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="desktop-sub-links-container">
        <div
          className="desktop-contact-sub-link-container"
          onClick={collapseAllSubMenus}>
          <div className="desktop-sub-links">
            <div
              className="desktop-contact-sub-links"
              onMouseLeave={() => collapseSubMenuDelayed("contact")}>
              <div className="desktop-sub-link">
                <Link href="/about" passHref>
                  <a>Company</a>
                </Link>
              </div>
              <div className="desktop-sub-link">
                <a href="https://twitter.com/thetokenanalyst" target="_blank">
                  Follow Us
                </a>
              </div>
              <div className="desktop-sub-link">
                <a
                  href="https://t.me/joinchat/AAAAAEXMAvSpOZao3fRvJA"
                  target="_blank">
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
          font-family: DIN Alternate Medium;
          color: white;
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
        .left-side {
          display: flex;
          flex-direction: row;
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
        .desktop-link-active {
          opacity: 1;
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
          margin-left: 728px;
          padding-left: 10px;
          border-radius: 0px 0px 5px 5px;
        }
        .desktop-sub-link {
          padding-top: 10px;
          padding-bottom: 10px;
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
        .right-side {
          margin-right: 2%;
        }
        .login-button {
          color: white;
          min-width: 60px;
          text-align: center;
          background-color: rgba(${colors.primaryGreen});
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
