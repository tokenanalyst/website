import React, { useState } from "react";
import Link from "next/link";

const mobile_breakpoint = '815px';
const logo_mobile='../static/img/logo_mobile.png';
const logo_desktop='../static/img/logo_desktop.png';

const TopBar = () => {
  const [seeSubAbout, showSublinkAbout] = useState(false);
  const [_seeSubAbout, _showSublinkAbout] = useState(false);
  const [seeSubContact, showSublinkContact] = useState(false);
  const [_seeSubContact, _showSublinkContact] = useState(false);

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

          <li 
            id="link-about"
            onMouseEnter={ () => { showSublinkAbout(true)} }
            onMouseLeave={ () => { showSublinkAbout(false)} }
            >About Us 

            <div 
              id="below-link-about" 
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
            id="link-contact"
            onMouseEnter={ () => { showSublinkContact(true)} }
            onMouseLeave={ () => { showSublinkContact(false)} }
            >Contact

            <div 
              id="below-link-contact"
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

        #link-about,
        #link-contact {
          position: relative;
        }

        /* ============  SUBLINKS ============ */

        #below-link-about,
        #below-link-contact {
          width: 5em;
          background: black;
          position: absolute;
          top: 1.6em;   
          border-top: 1px solid green;
          padding-top: 0.5em;     
          padding-bottom: 0.3em;     
        }

        #below-link-about {
          display: ${ ( seeSubAbout || _seeSubAbout ) ? '' : 'none' };
        }

        #below-link-contact {
          display: ${ ( seeSubContact || _seeSubContact ) ? '' : 'none' };
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
