import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Icon } from '@blueprintjs/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import classNames from 'classnames'

import { LOGO_IMAGES } from '../../../../constants/image-paths';
import { LoginContext } from '../../../../contexts/Login';

export const setLinkActive = (pathName, link) =>
  pathName.split('?')[0] === link ? 'mobile-link-active' : 'mobile-link';

export const MobileNav = () => {
  const loginCtx = useContext(LoginContext);
  const router = useRouter();
  const { asPath } = router;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className="top">
        <div className="container">
          <div className="mobile">
            <Link href="/" passHref>
              <img
                src={`/static/png/${LOGO_IMAGES.Mobile}`}
                width="50px"
                alt="TokenAnalyst Home Page"
              />
            </Link>
            <div className="menu-icon">
              <Icon
                icon={isVisible ? 'cross' : 'menu'}
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
            <div className={setLinkActive(router.pathname, '/')}>
              Exchange Flows
            </div>
          </Link>
          <Link href="/dashboard" passHref>
            <div className={setLinkActive(router.pathname, '/dashboard')}>
              Dashboard
            </div>
          </Link>
          <Link href="/insights" passHref>
            <div className={setLinkActive(router.pathname, '/insights')}>
              Network Stats
            </div>
          </Link>
          <Link href="/about" passHref>
            <div className={setLinkActive(router.pathname, '/about')}>
              Company
            </div>
          </Link>
          <Link href="/use-cases" passHref>
            <div className={setLinkActive(router.pathname, '/use-cases')}>
              Use Cases
            </div>
          </Link>
          <Link href="/pricing" passHref>
            <div className={setLinkActive(router.pathname, '/pricing')}>
              Pricing
            </div>
          </Link>
        
          <a href="https://medium.com/tokenanalyst"   className={classNames(
                      'desktop-sub-link',
                      setLinkActive(asPath, '/tokenanalyst'))}>
                  <div>
              Research
            </div>
            </a>

          <Link href="/newsletter" passHref>
            <div className={setLinkActive(router.pathname, '/newsletter')}>
              Newsletter
            </div>
          </Link>
          <div className="mobile-link">
            <a
              href="https://docs.tokenanalyst.io/#/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              API
            </a>
          </div>
          {loginCtx.isLoggedIn ? (
            <div
              className="mobile-link"
              onClick={() => {
                // TO DO: put all auth logic into its own module
                Cookies.remove('apiKey');
                Cookies.remove('loggedInAsUsername');
                loginCtx.setIsLoggedIn(false);
                loginCtx.intercom.removeUser();

                ReactGA.event({
                  category: 'User',
                  action: `Click Logout`,
                  label: `Mobile Nav`,
                });
              }}
            >
              Logout
            </div>
          ) : (
            <>
              <Link href="/register" passHref>
                <div className="mobile-link">Sign Up</div>
              </Link>
              <Link href="/login" passHref>
                <div className="mobile-link">Login</div>
              </Link>
            </>
          )}
        </div>
      </div>
      <style jsx>
        {`
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
            display: ${isVisible ? 'block' : 'none'};
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
        `}
      </style>
    </>
  );
};
