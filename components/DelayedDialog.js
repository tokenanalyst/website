import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SimpleDialog } from './SimpleDialog';

export const DelayedDialog = ({
  header,
  subHeader,
  children,
  timeout,
  ctaText,
  onClose,
  onCtaClick,
}) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timeoutHandle = setTimeout(() => setIsShown(true), timeout);
    return () => clearTimeout(timeoutHandle);
  }, []);

  return (
    <SimpleDialog
      header={header}
      subHeader={subHeader}
      children={children}
      isOpen={isShown}
      onClose={() => {
        onClose();
        setIsShown(false);
      }}
      ctaText={ctaText}
      onCtaClick={onCtaClick}
    />
  );
};

DelayedDialog.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  children: PropTypes.element,
  timeout: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ctaText: PropTypes.string.isRequired,
  onCtaClick: PropTypes.func.isRequired,
};

DelayedDialog.defaultProps = {
  subHeader: null,
  children: null,
};
