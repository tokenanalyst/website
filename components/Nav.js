import React, { useState } from "react";
import Link from "next/link";
import Router from 'next/router';
//import { mobile_breakpoint } from '../bucket/styles/mediaquery.js';

const LOGO_MOBILE = "../static/img/logo_mobile.png";
const LOGO_DESKTOP = "../static/img/logo_desktop.png";
const mobile_breakpoint = "815px";

const TRANSITION_DUR = "0.2s";
const HAMBURGER_COLOR = "#efefef";
const FULL_HAMBURGER_SIZE = "24px";
const REDUCED_HAMBURGER_SIZE = "3px";

const Nav = () => {
  const [menuIsOpen, openMenu] = useState(false);

  const [seeDropdown, showNavDropdown] = useState({
    navAbout: false,
    navItemAbout: false,
    navContact: false,
    navItemContact: false
  });

  const toggleOpenMenu = () => {
    openMenu(!menuIsOpen);
  };

  return (
    <div className="navbar">
      <img className="logo logo-desktop" src={LOGO_DESKTOP} />
      <img className="logo logo-mobile" src={LOGO_MOBILE} />

      <ul className="links links-desktop">

        <Link href="/" >
          <a onClick={() => Router.push('/index')} >Home</a>
        </Link>

        <Link href="/research" >
          <a onClick={() => Router.push('/research')} >Research</a>
        </Link>

        <Link href="/pricing" >
          <a onClick={() => Router.push('/pricing')} >Pricing</a>
        </Link>

        <Link href="/api" >
          <a onClick={() => Router.push('/api')} >API</a>
        </Link>

        <li
          className="link-about"
          onMouseEnter={() => {
            showNavDropdown(seeDropdown => ({
              ...seeDropdown,
              navAbout: true
            }));
          }}
          onMouseLeave={() => {
            showNavDropdown(seeDropdown => ({
              ...seeDropdown,
              navAbout: false
            }));
          }}
        >
          About Us
          <div
            className="below-link-about"
            onMouseEnter={() => {
              showNavDropdown(seeDropdown => ({
                ...seeDropdown,
                navItemAbout: true
              }));
            }}
            onMouseLeave={() => {
              showNavDropdown(seeDropdown => ({
                ...seeDropdown,
                navItemAbout: false
              }));
            }}
          >
            <ul className="links">
              <Link href="/about" >
                <a onClick={() => Router.push('/about')} >About Us</a>
              </Link>

              <li>FAQ</li>
            </ul>
          </div>
        </li>

        <li
          className="link-contact"
          onMouseEnter={() => {
            showNavDropdown(seeDropdown => ({
              ...seeDropdown,
              navContact: true
            }));
          }}
          onMouseLeave={() => {
            showNavDropdown(seeDropdown => ({
              ...seeDropdown,
              navContact: false
            }));
          }}
        >
          Contact
          <div
            className="below-link-contact"
            onMouseEnter={() => {
              showNavDropdown(seeDropdown => ({
                ...seeDropdown,
                navItemContact: true
              }));
            }}
            onMouseLeave={() => {
              showNavDropdown(seeDropdown => ({
                ...seeDropdown,
                navItemContact: false
              }));
            }}
          >
            <ul className="links">
              <li>Follow Us</li>
              <li>Telegram</li>
              <li>Contact</li>
            </ul>
          </div>
        </li>
      </ul>

      <div
        onClick={toggleOpenMenu}
        className={
          menuIsOpen ? 
            "links links-mobile menu_open" : 
            "links links-mobile"
        }
      >
        <div className="hamburger" />
      </div>
    

      <style jsx>{`
        li {
          cursor: pointer;
        }

        .navbar {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          position: fixed;
          height: 60px;
          width: 100%;
          margin-bottom: 60px;

          background-color: black;
          z-index: 101;
        }

        /* ============ LOGO ============ */

        .logo {
          margin-left: 16px;
        }

        .logo-desktop {
          width: 180px;
          height: 36px;
        }

        .logo-mobile {
          display: none;

          width: 50px;
          height: 50px;
        }

        /* ============  LINKS (DESKTOP) ============ */

        .links {
          color: #999;
        }

        .links > li,
        .links a {
          font-family: DIN Alternate Medium, sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.6;
          color: #999;
          text-decoration: none;
        }

        .links-desktop > li,
        .links-desktop > a {
          display: inline-block;
          margin-right: 2em;
        }

        .links-mobile {
          display: none;

          margin-right: 20px;
        }

        .link-about,
        .link-contact {
          position: relative;
        }

        /* ============  SUBLINKS (DESKTOP) ============ */

        .below-link-about,
        .below-link-contact {
          width: 5em;
          background: black;
          position: absolute;
          top: 1.6em;
          padding-top: 0.5em;
          padding-bottom: 0.3em;
        }

        .below-link-about {
          display: ${seeDropdown.navAbout || seeDropdown.navItemAbout
            ? ""
            : "none"};
        }

        .below-link-contact {
          display: ${seeDropdown.navContact || seeDropdown.navItemContact
            ? ""
            : "none"};
        }

        /* ============  HAMBURGER MENU (MOBILE) ============ */

        .links-mobile {
          width: ${FULL_HAMBURGER_SIZE};
          height: ${FULL_HAMBURGER_SIZE};
          display: none;

          position: relative;

          transition-duration: ${TRANSITION_DUR};
        }

        .links-mobile:hover {
          cursor: pointer;
        }

        .hamburger {
          position: relative;
          width: ${FULL_HAMBURGER_SIZE};
          height: ${REDUCED_HAMBURGER_SIZE};
          border-radius: 1px;


          transition-duration: ${TRANSITION_DUR};
          background-color: ${HAMBURGER_COLOR};
        }

        .hamburger:before {
          position: absolute;
          top: -10px;
          width: ${FULL_HAMBURGER_SIZE};
          height: ${REDUCED_HAMBURGER_SIZE};
          border-radius: 1px;

          transition-duration: ${TRANSITION_DUR};
          background-color: ${HAMBURGER_COLOR};
          
          content: "";
        }

        .hamburger:after {
          position: absolute;
          top: 10px;
          width: ${FULL_HAMBURGER_SIZE};
          height: ${REDUCED_HAMBURGER_SIZE};
          border-radius: 1px;

          transition-duration: ${TRANSITION_DUR};
          background-color: ${HAMBURGER_COLOR};
          
          content: "";
        }

        .menu_open .hamburger {
          transition-duration: ${TRANSITION_DUR};
          background: transparent;
        }

        .menu_open .hamburger:before {
          transform: rotateZ(45deg) scaleX(1.25) translate(3px, 10px);
        }
        
        .menu_open .hamburger:after {
          transform: rotateZ(-45deg) scaleX(1.25) translate(3px, -10px);
        }

        /* ============ switch to mobile ============ */

        @media only screen and (max-width: ${mobile_breakpoint}) {
          .logo-desktop,
          .links-desktop {
            display: none;
          }

          .logo-mobile {
            display: inline;
          }

          .links-mobile {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

        }
      `}</style>
    </div>
  );
};

export default Nav;
