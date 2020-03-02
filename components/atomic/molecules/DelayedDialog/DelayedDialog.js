import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SimpleDialog } from '../../atoms/SimpleDialog/SimpleDialog';

export const DelayedDialog = ({
  header,
  subHeader,
  children,
  timeout,
  ctaText,
  onCtaClick,
  onClose,
  onDisplay,
}) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timeoutHandle = setTimeout(() => {
      setIsShown(true);
      onDisplay();
    }, timeout);
    return () => clearTimeout(timeoutHandle);
  }, [onDisplay, timeout]);

  return (
    <SimpleDialog
      header={header}
      subHeader={subHeader}
      isOpen={isShown}
      onClose={() => {
        onClose();
        setIsShown(false);
      }}
      ctaText={ctaText}
      onCtaClick={onCtaClick}
    >
      {children}
    </SimpleDialog>
  );
};

DelayedDialog.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.node,
  children: PropTypes.element,
  timeout: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  ctaText: PropTypes.string.isRequired,
  onCtaClick: PropTypes.func.isRequired,
  onDisplay: PropTypes.func,
};

DelayedDialog.defaultProps = {
  subHeader: null,
  children: null,
  onClose: () => {},
  onDisplay: () => {},
};
