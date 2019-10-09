import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import ReactGA from 'react-ga';

import { LoginContext } from '../../contexts/Login';
import { LOGO_IMAGES } from '../../constants/image-paths';
import { colors } from '../../constants/styles/colors';
import { COOKIES } from '../../constants/cookies';

export const setLinkActive = (pathName, link) =>
  pathName === link ? 'active' : '';

export const DesktopNav = () => {
  const loginCtx = useContext(LoginContext);
  const router = useRouter();
  const { asPath } = router;

  const [shownItems, setShownItems] = useState({
    about: false,
    contact: false,
    exchanges: false,
  });

  const collapseAllSubMenus = () => {
    setShownItems({
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

  const tierParamString = `tier=${Cookies.get(COOKIES.tier)}`;

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
                      ? `/static/png/${LOGO_IMAGES['DesktopPro']}`
                      : `/static/png/${LOGO_IMAGES['Desktop']}`
                  }
                  width="180px"
                  onMouseOver={() => {
                    collapseAllSubMenus();
                  }}
                  alt="TokenAnalyst Home Page"
                />
              </Link>
            </div>
            <div className={'links-metrics'}>
              <Link href="/" passHref>
                <div
                  className={classNames(
                    'desktop-link',
                    setLinkActive(asPath, '/')
                  )}
                  onMouseOver={() => {
                    collapseAllSubMenus();
                    setShownItems(prev => ({ ...prev, exchanges: true }));
                  }}
                >
                  Exchange Flows
                </div>
              </Link>
              <Link href="/stablecoins" passHref>
                <div
                  className={classNames(
                    'desktop-link',
                    setLinkActive(asPath, '/stablecoins')
                  )}
                  onMouseOver={collapseAllSubMenus}
                >
                  Stablecoins
                </div>
              </Link>
              <Link href="/compare" passHref>
                <div
                  className={classNames(
                    'desktop-link',
                    setLinkActive(asPath, '/compare')
                  )}
                  onMouseOver={collapseAllSubMenus}
                >
                  Compare
                </div>
              </Link>
            </div>

            <div className={'links-products'}>
              <a
                href="https://websockets.tokenanalyst.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WebSocket
              </a>
              <a
                href="https://research.tokenanalyst.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Research
              </a>
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
              >
                About Us
              </div>
            </div>
          </div>
          <div className="right-side">
            {loginCtx.isLoggedIn ? (
              <>
                <div style={{ color: 'white' }}>
                  Welcome, {Cookies.get('loggedInAs')}
                </div>
                <div
                  className="login-button"
                  onClick={() => {
                    // TO DO: put all auth logic into its own module
                    Cookies.remove(COOKIES.apiKey);
                    Cookies.remove(COOKIES.loggedInAs);
                    Cookies.remove(COOKIES.loggedInAsUsername);
                    Cookies.remove(COOKIES.loggedInAsUserId);
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
                >
                  Logout
                </div>
              </>
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
        <div
          className="desktop-exchanges-sub-link-container"
          onClick={collapseAllSubMenus}
        >
          <div className="desktop-sub-links">
            <div
              className="desktop-exchanges-sub-links"
              onMouseLeave={() => collapseSubMenuDelayed('exchanges')}
            >
              <div>
                <Link
                  href="/exchange/[token]/[exchange]"
                  as={`/exchange/BTC/Binance?${tierParamString}`}
                  passHref
                >
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click BTC Binance`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(
                        asPath,
                        `/exchange/BTC/Binance?${tierParamString}`
                      )
                    )}
                  >
                    BTC Binance
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="/exchange/[token]/[exchange]"
                  as={`/exchange/BTC/Bitstamp?${tierParamString}`}
                  passHref
                >
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click BTC Bitstamp`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(
                        asPath,
                        `/exchange/BTC/Bitstamp?${tierParamString}`
                      )
                    )}
                  >
                    BTC Bitstamp
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="/exchange/[token]/[exchange]"
                  as={`/exchange/BTC/Huobi?${tierParamString}`}
                  passHref
                >
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click BTC Huobi`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(
                        asPath,
                        `/exchange/BTC/Huobi?${tierParamString}`
                      )
                    )}
                  >
                    BTC Huobi
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="/exchange/[token]/[exchange]"
                  as={`/exchange/ETH/Bitfinex?${tierParamString}`}
                  passHref
                >
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click ETH Bitfinex`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(
                        asPath,
                        `/exchange/ETH/Bitfinex?${tierParamString}`
                      )
                    )}
                  >
                    ETH Bitfinex
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="/exchange/[token]/[exchange]"
                  as={`/exchange/ETH/Bittrex?${tierParamString}`}
                  passHref
                >
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click ETH Bittrex`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(
                        asPath,
                        `/exchange/ETH/Bittrex?${tierParamString}`
                      )
                    )}
                  >
                    ETH Bittrex
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="/exchange/[token]/[exchange]"
                  as="/exchange/USDT_OMNI/Kraken"
                  passHref
                >
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click USDT_OMNI Kraken`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(asPath, '/exchange/USDT/Kraken')
                    )}
                  >
                    USDT Kraken
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="/exchange/[token]/[exchange]"
                  as="/exchange/USDC/Binance"
                  passHref
                >
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click USDC Binance`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(asPath, '/exchange/USDC/Binance')
                    )}
                  >
                    USDC Binance
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="/exchange/[token]/[exchange]"
                  as="/exchange/TUSD/Binance"
                  passHref
                >
                  <div
                    onClick={() => {
                      ReactGA.event({
                        category: 'User',
                        action: `Click TUSD Binance`,
                        label: `Desktop Nav`,
                      });
                    }}
                    className={classNames(
                      'desktop-sub-link',
                      setLinkActive(asPath, '/exchange/TUSD/Binance')
                    )}
                  >
                    TUSD Binance
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
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
          padding-left: 10px;
        }
        .logo-desktop {
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
          opacity: 0.5;
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
          width: 125px;
          background: black;
          position: fixed;
          color: white;
          z-index: 10000;
          top: 60px;
          right: ${loginCtx.isLoggedIn ? '145px' : '75px'};
          padding-left: 10px;
          border-radius: 0px 0px 5px 5px;
        }
        .desktop-exchanges-sub-link-container {
          width: 125px;
          background: black;
          position: fixed;
          color: white;
          z-index: 10000;
          top: 60px;
          margin-left: 190px;
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
          display: ${shownItems.about ? 'block' : 'none'};
        }
        .desktop-contact-sub-links {
          display: ${shownItems.contact ? 'block' : 'none'};
        }
        .desktop-exchanges-sub-links {
          display: ${shownItems.exchanges ? 'block' : 'none'};
        }
        .login-button {
          color: white;
          min-width: 80px;
          text-align: center;
          background-color: rgba(${colors.primaryGreen});
          max-height: 40px;
          padding: 10px;
          border-radius: 20px;
          cursor: pointer;
          margin-left: 20px;
        }
      `}</style>
    </>
  );
};
