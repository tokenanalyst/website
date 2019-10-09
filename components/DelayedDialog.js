import React, { useState, useEffect } from 'react';
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
