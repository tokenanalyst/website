import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga';
import { Popover, Menu, MenuItem, Button, Position } from '@blueprintjs/core';

import classNames from 'classnames';
import { colors } from '../../../../constants/styles/colors';
import { isLoginRequiredToAccessEntity } from '../../../../utils';
import { LoginContext } from '../../../../contexts/Login';
import { ExchangeRegisterDialog } from '../../../marketing/marketing-dialogs';
import { ImgEntity } from '../../atoms/ImgEntity';
import { SimpleToolTip } from '../../../SimpleToolTip';

export const EntityList = ({
  entities,
  onChangeExchange,
  selectedEntity,
  entityType,
}) => {
  const loginCtx = useContext(LoginContext);
  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

  const isExchangeDisabled = entity => {
    return loginCtx.isLoggedIn ? false : isLoginRequiredToAccessEntity(entity);
  };

  const exchangeChangeHandler = entityName => {
    if (loginCtx.isLoggedIn || !isLoginRequiredToAccessEntity(entityName)) {
      onChangeExchange(entityName);
      ReactGA.event({
        category: 'User',
        action: `Pro Chart change entity ${entityName}`,
        label: `Pro Charts`,
      });
    } else {
      setIsRegisterDialogShown(true);
    }
  };
  const renderMenuItems = () =>
    entities.map(entity => {
      const { label, value } = entity;

      return (
        <MenuItem
          text={entity.label}
          icon={<ImgEntity entity={label} />}
          onKeyDown={() => {
            exchangeChangeHandler(value);
          }}
          onClick={() => {
            exchangeChangeHandler(value);
          }}
          key={value}
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
          {entities.map(entity => {
            const { value, label, icon, helpText } = entity;
            return (
              <SimpleToolTip
                dataFor={value}
                disable={!helpText}
                toolTip={helpText}
                type="dark"
                effect="solid"
                place="right"
              >
                <div
                  role="link"
                  data-tip
                  data-for={value}
                  key={value}
                  className={classNames(
                    'entity',
                    `${
                      isExchangeDisabled(value)
                        ? `entity-disabled`
                        : `entity-enabled`
                    }`
                  )}
                  tabIndex="0"
                  onKeyDown={() => {
                    exchangeChangeHandler(value);
                  }}
                  onClick={() => {
                    exchangeChangeHandler(value);
                  }}
                >
                  {entityType === 'exchange' && (
                    <div className="entity-img">
                      <ImgEntity
                        entity={value}
                        disabled={isExchangeDisabled(value)}
                      />
                    </div>
                  )}

                  <div className="entity-text">
                    <div
                      className={`${
                        value === selectedEntity
                          ? 'entity-label-selected'
                          : 'entity-label'
                      }`}
                    >
                      {label}
                    </div>

                    <div
                      className={`${
                        value === selectedEntity
                          ? 'entity-label-selected'
                          : 'entity-label'
                      }`}
                    >
                      {icon || <div />}
                    </div>
                  </div>
                </div>
              </SimpleToolTip>
            );
          })}
        </div>
      </div>
      <style jsx>
        {`
          .entity {
            display: flex;
            flex-direction: row;
          }
          .entity-text {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }
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
  entities: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  onChangeExchange: PropTypes.func.isRequired,
  selectedEntity: PropTypes.string.isRequired,
  entityType: PropTypes.string,
};

EntityList.defaultProps = {
  entityType: undefined,
};
