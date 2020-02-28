import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga';
import { Popover, Menu, MenuItem, Button, Position } from '@blueprintjs/core';

import { colors } from '../../../../constants/styles/colors';
import { isLoginRequiredToAccessEntity } from '../../../../utils';
import { LoginContext } from '../../../../contexts/Login';
import { ExchangeRegisterDialog } from '../../../marketing/marketing-dialogs';
import { ImgEntity } from '../../atoms/ImgEntity';
import { MINNER_FORMATTED_NAMES } from '../../../../constants';

export const EntityList = ({
  entities,
  onChangeExchange,
  selectedEntity,
  isMiner,
  isExchange,
}) => {
  const loginCtx = useContext(LoginContext);
  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

  const isExchangeDisabled = exchange => {
    return loginCtx.isLoggedIn
      ? false
      : isLoginRequiredToAccessEntity(exchange);
  };

  const exchangeChangeHandler = entityName => {
    if (loginCtx.isLoggedIn || !isLoginRequiredToAccessEntity(entityName)) {
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
              text={selectedEntity}
              icon={<ImgEntity entity={selectedEntity} />}
              fill
            />
          </Popover>
        </div>

        <div className="desktop-list">
          {Object.values(entities).map(entityName => {
            return (
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
                {isExchange && (
                  <div className="entity-img">
                    <ImgEntity
                      entity={entityName}
                      disabled={isExchangeDisabled(entityName)}
                    />
                  </div>
                )}

                <div
                  className={`${
                    entityName === selectedEntity
                      ? 'entity-label-selected'
                      : 'entity-label'
                  }`}
                >
                  {MINNER_FORMATTED_NAMES[entityName] || entities[entityName]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>
        {`
          .entity-enabled {
            height: 25px;
            display: flex;
            cursor: pointer;
            align-items: center;
          }
          .entity-disabled {
            height: 25px;
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
          .entity-img {
            margin-right: 15px;
          }
          .entity-label {
          }
          .entity-label-selected {
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
  selectedEntity: PropTypes.string.isRequired,
  isMiner: PropTypes.bool,
  isExchange: PropTypes.bool,
};

EntityList.defaultProps = {
  isMiner: false,
  isExchange: false,
};
