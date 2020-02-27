import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga';
import { Popover, Menu, MenuItem, Button, Position } from '@blueprintjs/core';

import { colors } from '../../../../constants/styles/colors';
import { LOGGED_OUT_SUPPORTED_EXCHANGES } from '../../../../constants/exchanges';
import { LoginContext } from '../../../../contexts/Login';
import { ExchangeRegisterDialog } from '../../../marketing/marketing-dialogs';
import { ImgEntity } from '../../atoms/ImgEntity';

export const EntityList = ({
  entities,
  onChangeExchange,
  selectedExchange,
}) => {
  const loginCtx = useContext(LoginContext);
  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

  const isExchangeDisabled = exchange => {
    return loginCtx.isLoggedIn
      ? false
      : !(LOGGED_OUT_SUPPORTED_EXCHANGES.indexOf(exchange) >= 0);
  };

  const exchangeChangeHandler = entityName => {
    if (
      loginCtx.isLoggedIn ||
      LOGGED_OUT_SUPPORTED_EXCHANGES.indexOf(entityName) >= 0
    ) {
      onChangeExchange(entityName);
      ReactGA.event({
        category: 'User',
        action: `Pro Chart change exchange ${entityName}`,
        label: `Pro Charts`,
      });
    } else {
      setIsRegisterDialogShown(true);
    }
  };

  const renderMenuItems = () =>
    Object.keys(entities).map(entity => {
      return (
        <MenuItem
          text={entity}
          icon={<ImgEntity entity={entity} />}
          onKeyDown={() => {
            exchangeChangeHandler(entity);
          }}
          onClick={() => {
            exchangeChangeHandler(entity);
          }}
          key={entity}
        />
      );
    });

  return (
    <>
      <div className="entities-list">
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
              text={selectedExchange}
              icon={<ImgEntity exchange={selectedExchange} />}
              fill
            />
          </Popover>
        </div>

        <div className="desktop-list">
          {Object.values(entities).map(entityName => (
            <div
              role="link"
              key={entityName}
              className={`${
                isExchangeDisabled(entityName)
                  ? `entity-disabled`
                  : `entity-enabled`
              }`}
              tabIndex="0"
              onKeyDown={() => {
                exchangeChangeHandler(entityName);
              }}
              onClick={() => {
                exchangeChangeHandler(entityName);
              }}
            >
              <div className="entity-img">
                <ImgEntity
                  entity={entityName}
                  disabled={isExchangeDisabled(entityName)}
                />
              </div>
              <div
                className={`${
                  entityName === selectedExchange
                    ? 'entity-label-selected'
                    : 'entity-label'
                }`}
              >
                {entities[entityName]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .entity-enabled {
            display: flex;
            cursor: pointer;
            align-items: center;
          }
          .entity-disabled {
            display: flex;
            cursor: pointer;
            color: gray;
            align-items: center;
          }
          .entity-enabled:hover {
            display: flex;
            cursor: pointer;
            opacity: 0.5;
          }
          .exchange-image {
            width: 24px;
            height: 24px;
          }
          .entity-label {
            margin-left: 15px;
          }
          .entity-label-selected {
            margin-left: 15px;
            border-bottom: 2px solid rgba(${colors.primaryGreen}, 1);
          }
          .mobile-select {
            display: none;
          }
          .entity-img {
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

EntityList.propTypes = {
  entities: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  onChangeExchange: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
};
