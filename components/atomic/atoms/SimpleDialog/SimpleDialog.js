import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@blueprintjs/core';

import { ButtonMarketing } from '../../../ButtonMarketing';

export const SimpleDialog = ({
  header,
  subHeader,
  children,
  isOpen,
  onClose,
  ctaText,
  onCtaClick,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      title={header}
      onClose={() => onClose()}
      style={{
        minWidth: '300px',
        width: '45%',
        backgroundColor: 'white',
      }}
    >
      <>
        <div className="container">
          {subHeader && <div className="sub-header">{subHeader}</div>}
          {children}

          <div className="button-container">
            <ButtonMarketing onClick={onCtaClick} text={ctaText} />
          </div>
        </div>
        <style jsx>
          {`
            .container {
              padding: 20px;
            }
            .button-container {
              display: flex;
              margin-top: 40px;
              justify-content: center;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
            }
            .sub-header {
              padding-top: 10px;
              padding-bottom: 10px;
            }
            .cross {
              display: flex;
              justify-content: flex-end;
              cursor: pointer;
              opacity: 0.3;
            }
          `}
        </style>
      </>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.node,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ctaText: PropTypes.string.isRequired,
  onCtaClick: PropTypes.func.isRequired,
};

SimpleDialog.defaultProps = {
  subHeader: null,
  children: null,
};
