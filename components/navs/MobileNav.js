import React, { useState } from "react";
import Link from "next/link";
import { LOGO_IMAGES } from "../../constants/image-paths";
import { Icon } from "@blueprintjs/core";

export const MobileNav = () => {
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
            <div className="mobile-link">Home</div>
          </Link>
          <Link href="/" passHref>
            <div className="mobile-link">About</div>
          </Link>
          <Link href="/" passHref>
            <div className="mobile-link">Pricing</div>
          </Link>
          <Link href="/" passHref>
            <div className="mobile-link">FAQ</div>
          </Link>
          <Link href="/" passHref>
            <div className="mobile-link">Contact</div>
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
          padding-left: 20px;
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
        .mobile-link {
          padding-top: 10px;
          padding-bottom: 10px;
          opacity: 0.5;
        }
        a {
          color: white;
          text-decoration: none;
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
