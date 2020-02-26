import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga';
import { Popover, Menu, MenuItem, Button, Position } from '@blueprintjs/core';

import { colors } from '../../../../constants/styles/colors';
import { LoginContext } from '../../../../contexts/Login';
import { ExchangeRegisterDialog } from '../../../marketing/marketing-dialogs';
import { ImgExchange } from '../../atoms/ImgExchange';
import { isLoginRequiredToAccessEntity } from '../../../../utils';

export const ExchangeList = ({
  entities,
  onChangeExchange,
  selectedEntity,
}) => {
  const loginCtx = useContext(LoginContext);
  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

  const isExchangeDisabled = exchange => {
    return loginCtx.isLoggedIn
      ? false
      : isLoginRequiredToAccessEntity(exchange);
  };

  const exchangeChangeHandler = exchangeName => {
    if (loginCtx.isLoggedIn || !isLoginRequiredToAccessEntity(exchangeName)) {
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
    Object.keys(entities).map(exchange => {
      return (
        <MenuItem
          text={exchange}
          icon={<ImgExchange exchange={exchange} />}
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
            fill
          >
            <Button
              rightIcon="double-caret-vertical"
              text={selectedEntity}
              icon={<ImgExchange exchange={selectedEntity} />}
              fill
            />
          </Popover>
        </div>

        <div className="desktop-list">
          {Object.values(entities).map(exchangeName => (
            <div
              role="link"
              key={exchangeName}
              className={`${
                isExchangeDisabled(exchangeName)
                  ? `exchange-disabled`
                  : `exchange`
              }`}
              tabIndex="0"
              onKeyDown={() => {
                exchangeChangeHandler(exchangeName);
              }}
              onClick={() => {
                exchangeChangeHandler(exchangeName);
              }}
            >
              <div>
                <ImgExchange
                  exchange={exchangeName}
                  disabled={isExchangeDisabled(exchangeName)}
                />
              </div>
              <div
                className={`${
                  exchangeName === selectedEntity
                    ? 'exchange-label-selected'
                    : 'exchange-label'
                }`}
              >
                {entities[exchangeName]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .exchange {
            display: flex;
            cursor: pointer;
            align-items: center;
          }
          .exchange-disabled {
            display: flex;
            cursor: pointer;
            color: gray;
            align-items: center;
          }
          .exchange:hover {
            display: flex;
            cursor: pointer;
            opacity: 0.5;
          }
          .exchange-label {
            margin-left: 15px;
          }
          .exchange-label-selected {
            margin-left: 15px;
            border-bottom: 2px solid rgba(${colors.primaryGreen}, 1);
          }
          .mobile-select {
            display: none;
          }
          .exchange-img {
            margin: 2px;
          }
          @media (max-width: 767px) {
            .desktop-list {
              display: none;
            }
            .mobile-select {
              display: inline-block;
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

ExchangeList.propTypes = {
  entities: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  onChangeExchange: PropTypes.func.isRequired,
  selectedEntity: PropTypes.string.isRequired,
};
