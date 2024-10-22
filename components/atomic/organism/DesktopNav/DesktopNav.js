import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import ReactGA from 'react-ga';

import { LoginContext } from '../../../../contexts/Login';
import { LOGO_IMAGES } from '../../../../constants/image-paths';
import { COOKIES } from '../../../../constants/cookies';
import { PLANS } from '../../../../constants/plans';

export const setLinkActive = (pathName, link) =>
  pathName.split('?')[0] === link ? 'active' : '';

export const DesktopNav = () => {
  const loginCtx = useContext(LoginContext);
  const router = useRouter();
  const { asPath } = router;

  const [shownItems, setShownItems] = useState({
    research: false,
    about: false,
    contact: false,
    exchanges: false,
  });

  const collapseAllSubMenus = () => {
    setShownItems({
      research: false,
      about: false,
      contact: false,
      exchanges: false,
    });
  };

  const collapseSubMenuDelayed = submenu => {
    setTimeout(() => {
      setShownItems(prev => ({
        ...prev,
        [submenu]: false,
      }));
    }, 500);
  };

  return (
    <>
      <div className="container">
        <div className="desktop">
          <div className="left-side">
            <div className="logo-desktop">
              <Link href="/" passHref>
                <img
                  src={
                    loginCtx.isLoggedIn
                      ? `/static/png/${LOGO_IMAGES.DesktopPro}`
                      : `/static/png/${LOGO_IMAGES.Desktop}`
                  }
                  width="180px"
                  onMouseOver={() => {
                    collapseAllSubMenus();
                  }}
                  onFocus={() => {
                    collapseAllSubMenus();
                  }}
                  alt="TokenAnalyst Home Page"
                />
              </Link>
            </div>
            <div className="links-metrics">
              <Link href="/dashboard" passHref>
                <div
                  className={classNames(
                    'desktop-link',
                    setLinkActive(asPath, '/dashboard')
                  )}
                  onMouseOver={collapseAllSubMenus}
                >
                  Data Explorer
                </div>
              </Link>
            </div>

            <div className="links-products">
              <Link href="/use-cases" passHref>
                <div
                  className={classNames(
                    'desktop-link',
                    setLinkActive(asPath, '/use-cases')
                  )}
                >
                  Use Cases
                </div>
              </Link>
              <div
                className={classNames(
                  'desktop-link',
                  setLinkActive(asPath, '/research')
                )}
                onMouseOver={() => {
                  collapseAllSubMenus();
                  setShownItems(prev => ({ ...prev, research: true }));
                }}
                onFocus={() => {
                  collapseAllSubMenus();
                  setShownItems(prev => ({ ...prev, research: true }));
                }}
              >
                Research
              </div>
              <Link href="/pricing" passHref>
                <div
                  className={classNames(
                    'desktop-link',
                    setLinkActive(asPath, '/pricing')
                  )}
                >
                  Pricing
                </div>
              </Link>
              <a
                href="https://docs.tokenanalyst.io/#/api"
                target="_blank"
                onMouseOver={collapseAllSubMenus}
                onFocus={collapseAllSubMenus}
                rel="noopener noreferrer"
              >
                API
              </a>
              <div
                className={classNames(
                  'desktop-link',
                  setLinkActive(asPath, '/about')
                )}
                onMouseOver={() => {
                  collapseAllSubMenus();
                  setShownItems(prev => ({ ...prev, contact: true }));
                }}
                onFocus={() => {
                  collapseAllSubMenus();
                  setShownItems(prev => ({ ...prev, contact: true }));
                }}
              >
                About Us
              </div>
            </div>
          </div>
          <div className="right-side">
            {loginCtx.isLoggedIn ? (
              <>
                <div
                  className="login-button"
                  tabIndex="0"
                  onClick={() => {
                    Cookies.remove(COOKIES.apiKey);
                    Cookies.remove(COOKIES.loggedInAsUsername);
                    Cookies.set(COOKIES.tier, PLANS.SIGNED_OUT.id);
                    loginCtx.setIsLoggedIn(false);
                    loginCtx.intercom.removeUser();

                    ReactGA.event({
                      category: 'User',
                      action: `Click Logout`,
                      label: `Desktop Nav`,
                    });
                  }}
                  onKeyDown={() => {
                    Cookies.remove(COOKIES.apiKey);
                    Cookies.remove(COOKIES.loggedInAsUsername);
                    Cookies.set(COOKIES.tier, PLANS.SIGNED_OUT.id);
                    loginCtx.setIsLoggedIn(false);
                    loginCtx.intercom.removeUser();

                    ReactGA.event({
                      category: 'User',
                      action: `Click Logout`,
                      label: `Desktop Nav`,
                    });
                  }}
                  onMouseOver={() => {
                    collapseAllSubMenus();
                  }}
                  role="button"
                  onFocus={() => {
                    collapseAllSubMenus();
                  }}
                >
                  Logout
                </div>
              </>
            ) : (
              <div className="not-logged-in">
                <Link href="/#" passHref>
                  <div
                    onMouseOver={() => {
                      collapseAllSubMenus();
                    }}
                    onFocus={() => {
                      collapseAllSubMenus();
                    }}
                    className="signup"
                  >
                    Sign Up
                  </div>
                </Link>
                <Link href="/#" passHref>
                  <div
                    className="login-button"
                    onMouseOver={() => {
                      collapseAllSubMenus();
                    }}
                    onFocus={() => {
                      collapseAllSubMenus();
                    }}
                  >
                    Login
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="desktop-sub-links-container">
        <div
          className="desktop-research-sub-link-container"
          role="link"
          onClick={collapseAllSubMenus}
          onKeyDown={collapseAllSubMenus}
          tabIndex="0"
        >
          <div className="desktop-sub-links">
            <div
              className="desktop-research-sub-links"
              onMouseLeave={() => collapseSubMenuDelayed('research')}
            >
             
                <a href="https://medium.com/tokenanalyst"   className={classNames(
                      'desktop-sub-link',
                      setLinkActive(asPath, '/tokenanalyst'))}>
                  <div
                
                  >
                    Blog
                  </div>
                  </a>
            
        
           
                <a href="https://github.com/tokenanalyst/tokenanalyst.github.io/tree/master/newsletters"   className={classNames(
                      'desktop-sub-link',
                      setLinkActive(asPath, '/tokenanalyst'))}>
                  <div>
                    Newsletter
                  </div>
                </a>
       
            </div>
          </div>
        </div>

        <div
          className="desktop-contact-sub-link-container"
          role="link"
          onClick={collapseAllSubMenus}
          onKeyDown={collapseAllSubMenus}
          tabIndex="0"
        >
          <div className="desktop-sub-links">
            <div
              className="desktop-contact-sub-links"
              onMouseLeave={() => collapseSubMenuDelayed('contact')}
            >
              <div>
                <Link href="/about" passHref>
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click Company`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(asPath, '/about')
                    )}
                  >
                    Company
                  </div>
                </Link>
              </div>
              <div>
                <Link href="/faqs" passHref>
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click FAQs`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(asPath, '/faqs')
                    )}
                  >
                    FAQs
                  </div>
                </Link>
              </div>
              <div className="desktop-sub-link">
                <a
                  href="https://twitter.com/thetokenanalyst"
                  target="_blank"
                  onClick={() => {
                    ReactGA.event({
                      category: 'User',
                      action: `Click Follow Us`,
                      label: `Desktop Nav`,
                    });
                  }}
                  rel="noopener noreferrer"
                >
                  Follow Us
                </a>
              </div>
              <div className="desktop-sub-link">
                <a
                  href="https://t.me/joinchat/AAAAAEXMAvSpOZao3fRvJA"
                  target="_blank"
                  onClick={() => {
                    ReactGA.event({
                      category: 'User',
                      action: `Click Telegram`,
                      label: `Desktop Nav`,
                    });
                  }}
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </div>
              <div className="desktop-sub-link">
                <a
                  href="mailto:info@tokenanalyst.io"
                  target="_blank"
                  onClick={() => {
                    ReactGA.event({
                      category: 'User',
                      action: `Click Contact`,
                      label: `Desktop Nav`,
                    });
                  }}
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            font-family: Open Sans;
            color: white;
            font-weight: normal;
            position: fixed;
            background-color: black;
            margin-top: 50px;
            z-index: 100;
            width: 100%;
          }
          .desktop {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-left: 10px;
       
            height: 60px;
          }
          .left-side {
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
          }
          .right-side {
            margin-right: 10px;
            display: flex;
            margin-left: 10px;
            border-left: 2px solid #333;
          }
          .logo-desktop {
            margin-left: 10px;
            cursor: pointer;
          }
          .desktop-links {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
          .desktop-link,
          a {
            padding-left: 10px;
            padding-right: 10px;
            text-decoration: none;
            color: white;
          }
          .active {
            opacity: 1 !important;
          }
          .links-metrics {
            display: flex;
          }
          .links-products {
            display: flex;
            flex-grow: 1;
            justify-content: flex-end;
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
            margin-left: 400px;
            padding-left: 10px;
            border-radius: 0px 0px 5px 5px;
          }
          .desktop-contact-sub-link-container {
            width: 200px;
            background: black;
            position: fixed;
            color: white;
            z-index: 10000;
            top: 60px;
            right: ${loginCtx.isLoggedIn ? '0px' : '100px'};
            padding-left: 10px;
          }
          .desktop-research-sub-link-container {
            width: 200px;
            background: black;
            position: fixed;
            color: white;
            z-index: 10000;
            top: 60px;
            right: ${loginCtx.isLoggedIn ? '180px' : '280px'};
            padding-left: 10px;
          }
          .desktop-sub-link {
            padding-top: 10px;
            padding-bottom: 10px;
            opacity: 0.5;
          }
          .desktop-sub-link > a {
            padding: 0;
            opacity: 1;
          }
          .desktop-sub-link:hover {
            cursor: pointer;
            opacity: 1;
          }
          .desktop-about-sub-links {
            display: ${shownItems.about ? 'block' : 'none'};
          }
          .desktop-contact-sub-links {
            display: ${shownItems.contact ? 'block' : 'none'};
          }
          .desktop-research-sub-links {
            display: ${shownItems.research ? 'block' : 'none'};
          }
          .login-button {
            color: white;
            min-width: 80px;
            text-align: center;
            background-color: #333;
            max-height: 40px;
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
            margin-left: 20px;
          }
          .login-button:hover {
            background-color: #444;
          }
          .signup {
            cursor: pointer;
          }
          .not-logged-in {
            margin-left: 20px;
            display: flex;
            min-width: 180px;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};
