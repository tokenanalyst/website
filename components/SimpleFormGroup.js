import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Intent } from '@blueprintjs/core';

export const SimpleFormGroup = ({
  disabled,
  helperText,
  inline,
  intent,
  label,
  labelFor,
  labelInfo,
  children,
}) => (
  <div>
    <FormGroup
      disabled={disabled}
      helperText={helperText}
      inline={inline}
      intent={intent}
      label={label}
      labelFor={labelFor}
      labelInfo={labelInfo}
    >
      {children}
    </FormGroup>
    <style jsx>
      {`
        div :global(.bp3-label) {
          font-size: 16px;
        }
      `}
    </style>
  </div>
);

SimpleFormGroup.propTypes = {
  disabled: PropTypes.bool,
  helperText: PropTypes.node,
  inline: PropTypes.bool,
  intent: PropTypes.string,
  label: PropTypes.node,
  labelFor: PropTypes.string,
  labelInfo: PropTypes.string,
  children: PropTypes.node.isRequired,
};

SimpleFormGroup.defaultProps = {
  disabled: false,
  helperText: '',
  inline: false,
  intent: Intent.NONE,
  label: '',
  labelFor: '',
  labelInfo: '',
};
