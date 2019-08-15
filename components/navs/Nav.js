import React, { useState } from "react";
import Link from "next/link";

import { LOGO_IMAGES } from "../../constants/image-paths";

export const Nav = () => {
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
            <Link href="/">
              <img
                src={`/static/png/${LOGO_IMAGES["Desktop"]}`}
                width="180px"
              />
            </Link>
          </div>
          <div className="desktop-links">
            <Link href="/">
              <div className="desktop-link">Home</div>
            </Link>
            <a href="https://research.tokenanalyst.io/" target="_blank">
              Research
            </a>
            <Link href="/pricing">
              <div className="desktop-link">Pricing</div>
            </Link>
            <a
              href="https://docs.tokenanalyst.io/#/api"
              target="_blank"
              onMouseOver={collapseAllSubMenus}
            >
              API
            </a>
            <div
              className="desktop-link"
              onMouseOver={() => {
                collapseAllSubMenus();
                setShownItems(prev => ({ ...prev, about: true }));
              }}
            >
              About Us
            </div>
            <div
              className="desktop-link"
              onMouseOver={() => {
                collapseAllSubMenus();
                setShownItems(prev => ({ ...prev, contact: true }));
              }}
            >
              Contact
            </div>
          </div>
        </div>
      </div>
      <div className="desktop-sub-links-container">
        <div
          className="desktop-about-sub-link-container"
          onClick={collapseAllSubMenus}
        >
          <div className="desktop-sub-links">
            <div
              className="desktop-about-sub-links"
              onMouseLeave={() => collapseSubMenuDelayed("about")}
            >
              <Link href="/">
                <div className="desktop-sub-link">About</div>
              </Link>
              <Link href="/">
                <div className="desktop-sub-link">FAQ</div>
              </Link>
            </div>
          </div>
        </div>
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
        .logo-mobile {
        }
        .desktop-links {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
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
          margin-left: 550px;
          padding-left: 10px;
          border-radius: 0px 0px 5px 5px;
        }
        .desktop-sub-links {
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
      `}</style>
    </div>
  );
};

// const LOGO_MOBILE = "/static/img/logo_mobile.png";
// const LOGO_DESKTOP = "/static/img/logo_desktop.png";
// const mobile_breakpoint = "815px";

// const TRANSITION_DUR = "0.3s";
// const HAMBURGER_COLOR = "#efefef";
// const FULL_HAMBURGER_SIZE = "50px";
// const REDUCED_HAMBURGER_SIZE = "4px";

// export const Nav = () => {
//   const [menuIsOpen, openMenu] = useState(false);

//   const [seeDropdown, showNavDropdown] = useState({
//     navAbout: false,
//     navItemAbout: false,
//     navContact: false,
//     navItemContact: false
//   });

//   const toggleOpenMenu = () => {
//     openMenu(!menuIsOpen);
//   };

//   return (
//     // <div>
//     <>
//       <div className="navbar">
//         <img className="logo logo-desktop" src={LOGO_DESKTOP} />
//         <img className="logo logo-mobile" src={LOGO_MOBILE} />

//         <ul className="links links-desktop">
//           <li>Home</li>
//           <li>Research</li>
//           <li>Pricing</li>
//           <li>API</li>

//           <li
//             className="link-about"
//             onMouseEnter={() => {
//               showNavDropdown(seeDropdown => ({
//                 ...seeDropdown,
//                 navAbout: true
//               }));
//             }}
//             onMouseLeave={() => {
//               showNavDropdown(seeDropdown => ({
//                 ...seeDropdown,
//                 navAbout: false
//               }));
//             }}
//           >
//             About Us
//             <div
//               className="desktop-about-sub-link-container"
//               onMouseEnter={() => {
//                 showNavDropdown(seeDropdown => ({
//                   ...seeDropdown,
//                   navItemAbout: true
//                 }));
//               }}
//               onMouseLeave={() => {
//                 showNavDropdown(seeDropdown => ({
//                   ...seeDropdown,
//                   navItemAbout: false
//                 }));
//               }}
//             >
//               <ul className="links">
//                 <li>About</li>
//                 <li>FAQ</li>
//               </ul>
//             </div>
//           </li>

//           <li
//             className="link-contact"
//             onMouseEnter={() => {
//               showNavDropdown(seeDropdown => ({
//                 ...seeDropdown,
//                 navContact: true
//               }));
//             }}
//             onMouseLeave={() => {
//               showNavDropdown(seeDropdown => ({
//                 ...seeDropdown,
//                 navContact: false
//               }));
//             }}
//           >
//             Contact
//             <div
//               className="below-link-contact"
//               onMouseEnter={() => {
//                 showNavDropdown(seeDropdown => ({
//                   ...seeDropdown,
//                   navItemContact: true
//                 }));
//               }}
//               onMouseLeave={() => {
//                 showNavDropdown(seeDropdown => ({
//                   ...seeDropdown,
//                   navItemContact: false
//                 }));
//               }}
//             >
//               <ul className="links">
//                 <li>Follow Us</li>
//                 <li>Telegram</li>
//                 <li>Contact</li>
//               </ul>
//             </div>
//           </li>
//         </ul>

//         <div
//           onClick={toggleOpenMenu}
//           className={
//             menuIsOpen ? "hamburger_wrapper menu_open" : "hamburger_wrapper"
//           }
//         >
//           <div className="hamburger" />
//         </div>
//       </div>

//       <style jsx>{`
//         li {
//           cursor: pointer;
//         }

//         .navbar {
//           display: flex;
//           flex-direction: row;
//           justify-content: space-between;
//           align-items: center;

//           position: fixed;
//           height: 60px;
//           width: 100%;
//           margin-bottom: 60px;

//           background-color: black;
//           z-index: 101;
//         }

//         /* ============ LOGO ============ */

//         .logo {
//           height: 60px;
//         }

//         .logo-mobile {
//           display: none;
//         }

//         /* ============  LINKS (DESKTOP) ============ */

//         .links {
//           color: #999;
//         }

//         .links > li {
//           font-family: DIN Alternate Medium, sans-serif;
//           font-weight: 400;
//           font-size: 1rem;
//           line-height: 1.6;
//         }

//         .links-desktop > li {
//           display: inline-block;
//           margin-right: 2em;
//         }

//         .links-mobile {
//           display: none;
//         }

//         .link-about,
//         .link-contact {
//           position: relative;
//         }

//         /* ============  SUBLINKS (DESKTOP) ============ */

//         .desktop-about-sub-link-container,
//         .below-link-contact {
//           width: 5em;
//           background: black;
//           position: absolute;
//           top: 1.6em;
//           border-top: 1px solid green;
//           padding-top: 0.5em;
//           padding-bottom: 0.3em;
//         }

//         .desktop-about-sub-link-container {
//           display: ${seeDropdown.navAbout || seeDropdown.navItemAbout
//             ? ""
//             : "none"};
//         }

//         .below-link-contact {
//           display: ${seeDropdown.navContact || seeDropdown.navItemContact
//             ? ""
//             : "none"};
//         }

//         /* ============  HAMBURGER MENU (MOBILE) ============ */

//         .hamburger_wrapper {
//           width: ${FULL_HAMBURGER_SIZE};
//           height: ${FULL_HAMBURGER_SIZE};
//           display: none;

//           transition-duration: ${TRANSITION_DUR};
//         }

//         .hamburger_wrapper:hover {
//           cursor: pointer;
//         }

//         .hamburger {
//           position: absolute;
//           top: 30px;
//           width: ${FULL_HAMBURGER_SIZE};
//           height: ${REDUCED_HAMBURGER_SIZE};

//           transition-duration: ${TRANSITION_DUR};
//           background-color: ${HAMBURGER_COLOR};
//         }

//         .hamburger:before {
//           position: absolute;
//           top: -20px;
//           width: ${FULL_HAMBURGER_SIZE};
//           height: ${REDUCED_HAMBURGER_SIZE};

//           transition-duration: ${TRANSITION_DUR};
//           background-color: ${HAMBURGER_COLOR};

//           content: "";
//         }

//         .hamburger:after {
//           position: absolute;
//           top: 20px;
//           width: ${FULL_HAMBURGER_SIZE};
//           height: ${REDUCED_HAMBURGER_SIZE};

//           transition-duration: ${TRANSITION_DUR};
//           background-color: ${HAMBURGER_COLOR};

//           content: "";
//         }

//         .menu_open .hamburger {
//           transition-duration: ${TRANSITION_DUR};
//           background: transparent;
//         }

//         .menu_open .hamburger:before {
//           transform: rotateZ(45deg) scaleX(1.25) translate(13px, 13px);
//         }

//         .menu_open .hamburger:after {
//           transform: rotateZ(-45deg) scaleX(1.25) translate(12px, -12px);
//         }

//         /* ============ switch to mobile ============ */

//         @media only screen and (max-width: ${mobile_breakpoint}) {
//           .logo-desktop,
//           .links-desktop {
//             display: none;
//           }

//           .logo-mobile {
//             display: inline;
//             height: 93%;
//           }

//           .links-mobile {
//             display: inline;
//           }

//           .hamburger_wrapper {
//             display: inline;
//           }
//         }
//       `}</style>
//     </>
//   );
// };
