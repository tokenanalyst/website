import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Popover, Menu, MenuItem, Button, Position } from '@blueprintjs/core';

import { ExchangeRegisterDialog } from '../../../marketing/marketing-dialogs';
import { ImgExchange } from '../../atoms/ImgExchange';
import { SimpleMenuItem } from '../../atoms/SimpleMenuItem';

export const StudiesList = ({ studies, onSelectStudy }) => {
  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

  const renderMenuItems = () =>
    Object.keys(studies).map(exchange => {
      return (
        <MenuItem
          text={exchange}
          icon={<ImgExchange exchange={exchange} />}
          onKeyDown={() => {}}
          onClick={() => {}}
          key={exchange}
        />
      );
    });

  return (
    <>
      <div className="studies-list">
        <ExchangeRegisterDialog
          isOpen={isRegisterDialogShown}
          closeCb={() => setIsRegisterDialogShown(false)}
        />

        <div className="desktop-list">
          {Object.keys(studies).map(study => (
            <div
              className="study"
              role="link"
              key={study}
              tabIndex="0"
              onKeyDown={() => onSelectStudy(study)}
              onClick={() => onSelectStudy(study)}
            >
              <SimpleMenuItem
                key={`${studies[study].name}`}
                selected={!!studies[study].isActive}
                text={studies[study].name}
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .study {
            height: 25px;
            cursor: pointer;
            align-items: center;
          }
          @media (max-width: 767px) {
            .desktop-list {
              display: flex;
              justify-content: space-between;
            }
          }
        `}
      </style>
    </>
  );
};

StudiesList.propTypes = {
  studies: PropTypes.objectOf(PropTypes.object).isRequired,
  onSelectStudy: PropTypes.func.isRequired,
};
