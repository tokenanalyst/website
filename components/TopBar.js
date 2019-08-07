import React, { useState } from "react";
import Link from "next/link";

const mobile_breakpoint = '815px';
const logo_mobile='../static/img/logo_mobile.png';
const logo_desktop='../static/img/logo_desktop.png';

const TopBar = () => {
//  const [selected, setIsSelected] = useState(0);

  return (
    <div>
      <div className="topbar">
        <img className="logo logo-desktop" src={logo_desktop} />
        <img className="logo logo-mobile" src={logo_mobile} />

        <ul className="links links-desktop">
          <li>Home</li>
          <li>Research</li>
          <li>Pricing</li>
          <li>API</li>
          <li>About Us </li>
          <li>Contact</li>
        </ul>

        <span className="links links-mobile">LINKS-MOBILE</span>
      </div>

      <style jsx>{`
        .topbar {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          position: fixed;
          height: 60px;
          width: 100%;
          margin-bottom: 60px;

          background-color: black;
        }

        /* ============ LOGO ============ */

        .logo {
          height: 60px;
        }

        .logo-mobile {
          display: none;
        }


        /* ============  LINKS ============ */

        .links {
          color: #999;
        }

        .links-desktop > li {
          display: inline-block;
          
          margin-right: 2em;
          font-family: DIN Alternate Medium,sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.6;
        }

        .links-mobile {
          display:none;
        }

        /* ============ switch to mobile ============ */

        @media only screen and (max-width: ${mobile_breakpoint} ) {
          .logo-desktop,
          .links-desktop {
            display: none;
          }

          .logo-mobile {
            display: inline;
            height: 93%;
          }

          .links-mobile {
            display: inline;
          }
         }
         

      `}</style>
    </div>
  );
};

export default TopBar;
