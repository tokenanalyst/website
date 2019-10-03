import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from '@blueprintjs/core';
import { Intent } from '../constants/styles/colors';

const ICONS = {
  [Intent.NONE]: '',
  [Intent.PRIMARY]: '',
  [Intent.SUCCESS]: 'tick',
  [Intent.WARNING]: 'warning-sign',
  [Intent.ERROR]: 'error',
};

export const SimpleToast = ({
  action,
  icon,
  intent,
  message,
  onDismiss,
  timeout,
}) => {
  const toastIcon = ICONS[icon] || icon;

  return (
    <Toast
      action={action}
      icon={toastIcon}
      intent={intent}
      message={message}
      onDismiss={onDismiss}
      timeout={timeout}
    />
  );
};

SimpleToast.propTypes = {
  action: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  ),
  icon: PropTypes.string,
  intent: PropTypes.oneOf([
    Intent.NONE,
    Intent.PRIMARY,
    Intent.SUCCESS,
    Intent.WARNING,
    Intent.ERROR,
  ]),
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  timeout: PropTypes.number,
};

SimpleToast.defaultProps = {
  intent: Intent.NONE,
  onDismiss: () => null,
  icon: '',
  action: {
    onClick: () => null,
    text: '',
  },
  timeout: 5000,
};
