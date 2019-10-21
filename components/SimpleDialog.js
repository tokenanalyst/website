import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, Intent } from '@blueprintjs/core';

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
      style={{
        minWidth: '300px',
        width: '45%',
        backgroundColor: 'white',
        marginTop: '80px',
      }}
    >
      <>
        <div className="container">
          <div className="cross" onClick={() => onClose()}>
            <img src="/static/svg/cross.svg" />
          </div>
          <div className="header">{header}</div>
          {subHeader && <div className="sub-header">{subHeader}</div>}
          <div className="button">
            <Button
              className="button"
              icon="arrow-right"
              intent={Intent.SUCCESS}
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>
          {children}
        </div>
        <style jsx>{`
          .container {
            padding: 20px;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
          }
          .sub-header {
            padding-top: 10px;
            padding-bottom: 10px;
          }
          .button {
            display: flex;
            justify-content: flex-end;
            padding: 20px;
          }
          .cross {
            display: flex;
            justify-content: flex-end;
            cursor: pointer;
            opacity: 0.3;
          }
        `}</style>
      </>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  children: PropTypes.element,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ctaText: PropTypes.string.isRequired,
  onCtaClick: PropTypes.func.isRequired,
};

SimpleDialog.defaultProps = {
  subHeader: null,
  children: null,
};
