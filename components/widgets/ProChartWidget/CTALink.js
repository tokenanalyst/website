import React from 'react';
import ReactGA from 'react-ga';

import { Link } from '../../Link';
import { colors } from '../../../constants/styles/colors';

export const CTALink = () => {
  const renderCTALink = () => {
    return (
      <>
        <div className="container">
          <div className="link">Add Telegram Bot</div>
          <div className="image">
            <img src="/static/svg/telegram_black.svg" alt="telegram" />
          </div>
        </div>
        <style jsx>
          {`
            .container {
              position: relative;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            .image {
              width: 25px;
            }

            .link {
              border-bottom-style: solid;
              border-bottom-width: 2px;
              border-bottom-color: rgba(${colors.primaryRed}, 1);
              margin-bottom: 5px;
              padding-right: 10px;
            }
            @media (min-width: 320px) and (max-width: 767px) {
              .container {
                justify-content: center;
              }
              .link {
                margin-right: 15px;
              }
            }
          `}
        </style>
      </>
    );
  };

  return (
    <div className="container">
      <Link
        href="https://alerts.tokenanalyst.io/"
        desktopLabel={renderCTALink()}
        isOpenInNewWindow
        onClick={() => {
          ReactGA.event({
            category: 'User',
            action: `Click Telegram Bot Exchange Page`,
            label: `Social media`,
          });
        }}
      />
    </div>
  );
};
