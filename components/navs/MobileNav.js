import React, { useState, useContext } from "react";
import Link from "next/link";
import { Icon } from "@blueprintjs/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { LOGO_IMAGES } from "../../constants/image-paths";
import { LoginContext } from "../../contexts/Login";
import { colors } from "../../constants/styles/colors";

export const setLinkActive = (pathName, link) =>
  pathName === link ? "mobile-link-active" : "mobile-link";

export const MobileNav = () => {
  const loginCtx = useContext(LoginContext);
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className="top">
        <div className="container">
          <div className="mobile">
            <Link href="/" passHref>
              <img src={`/static/png/${LOGO_IMAGES["Mobile"]}`} width="50px" />
            </Link>
            <div className="menu-icon">
              <Icon
                icon={isVisible ? "cross" : "menu"}
                color="white"
                iconSize={35}
                onClick={() => setIsVisible(prev => !prev)}
              />
            </div>
          </div>
        </div>
        <div
          className="mobile-sub-links-container"
          onClick={() => setIsVisible(false)}
        >
          <Link href="/" passHref>
            <div className={setLinkActive(router.pathname, "/")}>
              Exchange Flows
            </div>
          </Link>
          <Link href="/stablecoins" passHref>
            <div className={setLinkActive(router.pathname, "/stablecoins")}>
              Stablecoins
            </div>
          </Link>
          <Link href="/compare" passHref>
            <div className={setLinkActive(router.pathname, "/compare")}>
              Compare
            </div>
          </Link>
          <Link href="/about" passHref>
            <div className={setLinkActive(router.pathname, "/about")}>
              Company
            </div>
          </Link>
          <Link href="/pricing" passHref>
            <div className={setLinkActive(router.pathname, "/pricing")}>
              Pricing
            </div>
          </Link>
          <div className="mobile-link">
            <a href="https://research.tokenanalyst.io/" target="_blank">
              Research
            </a>
          </div>
          <div className="mobile-link">
            <a href="https://docs.tokenanalyst.io/#/api" target="_blank">
              API
            </a>
          </div>
          {loginCtx.isLoggedIn ? (
            <div
              className="mobile-link"
              onClick={() => {
                Cookies.remove("apiKey");
                loginCtx.setIsLoggedIn(false);
              }}
            >
              Logout
            </div>
          ) : (
            <Link href="/login" passHref>
              <div className="mobile-link">Login</div>
            </Link>
          )}
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
        .mobile {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-left: 10px;
          height: 60px;
        }
        .menu-icon {
          padding-right: 20px;
        }
        .mobile-sub-links-container {
          position: fixed;
          color: white;
          font-size: 18px;
          z-index: 10000;
          top: 60px;
          display: flex;
          justify-content: flex-end;
          display: ${isVisible ? "block" : "none"};
          background-color: black;
          width: 100%;
          text-align: center;
        }
        .mobile-link,
        a {
          opacity: 0.5;
          padding-top: 10px;
          padding-bottom: 10px;
          text-decoration: none;
          color: white;
        }
        .mobile-link-active {
          opacity: 1;
          padding-top: 10px;
          padding-bottom: 10px;
          text-decoration: none;
          color: white;
        }
        a {
          opacity: 1;
          color: white;
          text-decoration: none;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        @media only screen and (min-width: 769px) {
          .top {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
