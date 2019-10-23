import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, Intent } from '@blueprintjs/core';

import { pricingButton } from '../constants/styles/common-styled-jsx';

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
          {children}
          <br />
          <br />
          <button onClick={onCtaClick}>{ctaText}</button>
        </div>
        <style jsx>{pricingButton}</style>
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
  children: PropTypes.oneOfType(
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ctaText: PropTypes.string.isRequired,
  onCtaClick: PropTypes.func.isRequired,
};

SimpleDialog.defaultProps = {
  subHeader: null,
  children: null,
};
