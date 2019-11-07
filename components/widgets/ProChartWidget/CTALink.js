import React from 'react';
import ReactGA from 'react-ga';

import { Link } from '../../Link';

export const CTALink = () => {
  const renderCTALink = () => {
    return (
      <>
        <div className="container">
          <div className="link">
            <Link
              href="https://telegram.me/token_analyst_bot?startgroup=run"
              desktopLabel="Add Telegram Bot"
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

  return <div className="container">{renderCTALink()}</div>;
};
