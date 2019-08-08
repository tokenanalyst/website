import React, { useState } from "react";
import Link from "next/link";
import { mobile_breakpoint } from '../bucket/styles/mediaquery.js';

const LOGO_MOBILE = '../static/img/logo_mobile.png';
const LOGO_DESKTOP = '../static/img/logo_desktop.png';

const TRANSITION_DUR = '0.3s';
const HAMBURGER_COLOR = '#efefef';
const FULL_HAMBURGER_SIZE = '50px';
const REDUCED_HAMBURGER_SIZE = '4px';

const Nav = () => {
  const [seeSubAbout, showSublinkAbout] = useState(false);
  const [_seeSubAbout, _showSublinkAbout] = useState(false);
  const [seeSubContact, showSublinkContact] = useState(false);
  const [_seeSubContact, _showSublinkContact] = useState(false);

  const [menuIsOpen, openMenu] = useState(false);

  const toggleOpenMenu = () => {
    openMenu (!menuIsOpen);
  }

  return (
    <div>
      <div className="navbar">
        <img className="logo logo-desktop" src= {LOGO_DESKTOP} />
        <img className="logo logo-mobile" src= {LOGO_MOBILE} />

        <ul className="links links-desktop">
          <li>Home</li>
          <li>Research</li>
          <li>Pricing</li>
          <li>API</li>

          <li 
            className="link-about"
            onMouseEnter={ () => { showSublinkAbout(true)} }
            onMouseLeave={ () => { showSublinkAbout(false)} }
          >
            About Us 

            <div 
              className="below-link-about" 
              onMouseEnter={ () => { _showSublinkAbout(true)} }
              onMouseLeave={ () => { _showSublinkAbout(false)} }
            >
              <ul className="links">
                <li>About</li>
                <li>FAQ</li>
              </ul>
            </div>
          </li>

          <li
            className="link-contact"
            onMouseEnter={ () => { showSublinkContact(true)} }
            onMouseLeave={ () => { showSublinkContact(false)} }
          >
            Contact

            <div 
              className="below-link-contact"
              onMouseEnter={ () => { _showSublinkContact(true)} }
              onMouseLeave={ () => { _showSublinkContact(false)} }
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
          onClick={ toggleOpenMenu }
          className={ menuIsOpen ? 
            "hamburger_wrapper menu_open":
            "hamburger_wrapper" 
          }
        >
          <div className="hamburger"></div>
        </div>
      </div>

      <style jsx>{`
        li { cursor: pointer; }
        
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
        }

        /* ============ LOGO ============ */

        .logo {
          height: 60px;
        }

        .logo-mobile {
          display: none;
        }


        /* ============  LINKS (DESKTOP) ============ */

        .links {
          color: #999;
        }

        .links > li {
          font-family: DIN Alternate Medium,sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.6;
        }

        .links-desktop > li {
          display: inline-block;
          margin-right: 2em;
        }

        .links-mobile {
          display:none;
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
          border-top: 1px solid green;
          padding-top: 0.5em;     
          padding-bottom: 0.3em;     
        }

        .below-link-about {
          display: ${ ( seeSubAbout || _seeSubAbout ) ? '' : 'none' };
        }

        .below-link-contact {
          display: ${ ( seeSubContact || _seeSubContact ) ? '' : 'none' };
        }



        /* ============  HAMBURGER MENU (MOBILE) ============ */


        .hamburger_wrapper{
          width: ${FULL_HAMBURGER_SIZE};
          height: ${FULL_HAMBURGER_SIZE};
          display: none;

          transition-duration: ${TRANSITION_DUR};
        }

        .hamburger_wrapper:hover {
          cursor: pointer;
        }


        .hamburger {
          position: absolute;
          top: 30px;
          width: ${FULL_HAMBURGER_SIZE};
          height: ${REDUCED_HAMBURGER_SIZE};
          
          transition-duration: ${TRANSITION_DUR};
          background-color: ${HAMBURGER_COLOR};
        }
            

        .hamburger:before {
          position: absolute;
          top: -20px;
          width: ${FULL_HAMBURGER_SIZE};
          height: ${REDUCED_HAMBURGER_SIZE};
          
          transition-duration: ${TRANSITION_DUR};
          background-color: ${HAMBURGER_COLOR};

          content: "";
        }


        .hamburger:after {
          position: absolute;
          top: 20px;
          width: ${FULL_HAMBURGER_SIZE};
          height: ${REDUCED_HAMBURGER_SIZE};
          
          transition-duration: ${TRANSITION_DUR};
          background-color: ${HAMBURGER_COLOR};
          
          content: "";
        }

        
        .menu_open .hamburger {
          transition-duration: ${TRANSITION_DUR};
          background: transparent;
        }

        .menu_open .hamburger:before {
          transform: rotateZ(45deg) scaleX(1.25) translate(13px, 13px);
        }

        .menu_open .hamburger:after {
          transform: rotateZ(-45deg) scaleX(1.25) translate(12px, -12px);
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

          .hamburger_wrapper {
            display: inline;
          }
         }

      `}</style>
    </div>
  );
};

export default Nav;
