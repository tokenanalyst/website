import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { ExchangeRegisterDialog } from '../../../marketing/marketing-dialogs';
import { SimpleMenuItem } from '../../atoms/SimpleMenuItem';
import { SimpleToolTip } from '../../../SimpleToolTip';

export const StudiesList = ({ studies, onSelectStudy }) => {
  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

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
              role="link"
              key={study}
              tabIndex="0"
              onKeyDown={() => onSelectStudy(study)}
              onClick={() => onSelectStudy(study)}
            >
              <SimpleToolTip
                dataFor={`metric-tooltip-${study}`}
                disable={!!studies[study].isSupported}
                toolTip={
                  studies[study].isSupported
                    ? 'Supported'
                    : 'Metric not supported'
                }
                type="dark"
                effect="solid"
                place="right"
              >
                <div
                  className={
                    studies[study].isSupported ? 'study' : 'study-not-supported'
                  }
                >
                  <SimpleMenuItem
                    key={`${studies[study].name}`}
                    selected={!!studies[study].isActive}
                    text={studies[study].name}
                  />
                </div>
              </SimpleToolTip>
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
          .study-not-supported {
            height: 25px;
            opacity: 0.2;
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
