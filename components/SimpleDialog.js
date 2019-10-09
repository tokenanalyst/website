import React from 'react';
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
        width: '900px',
        backgroundColor: 'white',
      }}
    >
      <>
        <div className="container">
          <div className="cross" onClick={() => onClose()}>
            <img src="/static/svg/cross.svg" />
          </div>
          <div className="header">{header}</div>
          <div className="sub-header">{subHeader}</div>
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
