import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga';
import { Popover, Menu, MenuItem, Button, Position } from '@blueprintjs/core';

import { EXCHANGE_IMAGES } from '../../../constants/image-paths';
import { colors } from '../../../constants/styles/colors';
import { LOGGED_OUT_SUPPORTED_EXCHANGES } from '../../../constants/exchanges';
import { LoginContext } from '../../../contexts/Login';
import { ExchangeRegisterDialog } from '../../marketing/marketing-dialogs';

const renderExchangeImg = exchange => {
  return (
    <>
      <img
        src={`/static/png/${EXCHANGE_IMAGES[exchange]}`}
        className="exchange-image"
        alt={EXCHANGE_IMAGES[exchange]}
      />
      <style jsx>
        {`
          .exchange-image {
            width: 24px;
            height: 24px;
          }
        `}
      </style>
    </>
  );
};

export const ExchangeList = ({
  exchanges,
  onChangeExchange,
  selectedExchange,
}) => {
  const loginCtx = useContext(LoginContext);
  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

  const exchangeChangeHandler = exchangeName => {
    if (
      loginCtx.isLoggedIn ||
      LOGGED_OUT_SUPPORTED_EXCHANGES.indexOf(exchangeName) >= 0
    ) {
      onChangeExchange(exchangeName);
      ReactGA.event({
        category: 'User',
        action: `Pro Chart change exchange ${exchangeName}`,
        label: `Pro Charts`,
      });
    } else {
      setIsRegisterDialogShown(true);
    }
  };

  const renderMenuItems = () =>
    Object.keys(exchanges).map(exchange => {
      return (
        <MenuItem
          text={exchange}
          icon={renderExchangeImg(exchange)}
          onKeyDown={() => {
            exchangeChangeHandler(exchange);
          }}
          onClick={() => {
            exchangeChangeHandler(exchange);
          }}
          key={exchange}
        />
      );
    });

  return (
    <>
      <div className="exchange-list">
        <ExchangeRegisterDialog
          isOpen={isRegisterDialogShown}
          closeCb={() => setIsRegisterDialogShown(false)}
        />
        <div className="mobile-select">
          <Popover
            minimal
            content={<Menu>{renderMenuItems()}</Menu>}
            position={Position.BOTTOM_LEFT}
          >
            <Button
              rightIcon="double-caret-vertical"
              text={selectedExchange}
              icon={renderExchangeImg(selectedExchange)}
            />
          </Popover>
        </div>

        <div className="desktop-list">
          {Object.values(exchanges).map(exchangeName => (
            <div
              role="link"
              key={exchangeName}
              className={`${
                loginCtx.isLoggedIn
                  ? 'exchange'
                  : LOGGED_OUT_SUPPORTED_EXCHANGES.indexOf(exchangeName) >= 0
                  ? `exchange`
                  : `exchange-disabled`
              }`}
              tabIndex="0"
              onKeyDown={() => {
                exchangeChangeHandler(exchangeName);
              }}
              onClick={() => {
                exchangeChangeHandler(exchangeName);
              }}
            >
              {renderExchangeImg(exchangeName)}
              <span
                className={`${
                  exchangeName === selectedExchange
                    ? 'exchange-label-selected'
                    : 'exchange-label'
                }`}
              >
                {exchanges[exchangeName]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .exchange {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-bottom: 5px;
            width: 50%;
          }
          .exchange-disabled {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-bottom: 5px;
            width: 50%;
            color: gray;
            font-weight: normal;
            font-style: italic;
          }
          .exchange:hover {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-bottom: 5px;
            width: 50%;
            opacity: 0.5;
          }
          .exchange-image {
            width: 24px;
            height: 24px;
          }
          .exchange-label {
            margin-left: 5px;
          }
          .exchange-label-selected {
            margin-left: 5px;
            border-bottom: 2px solid rgba(${colors.primaryGreen}, 1);
          }
          .mobile-select {
            display: none;
          }
          @media (max-width: 767px) {
            .desktop-list {
              display: none;
            }
            .mobile-select {
              display: inline-block;
            }
          }
        `}
      </style>
    </>
  );
};

ExchangeList.propTypes = {
  exchanges: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  onChangeExchange: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
};
