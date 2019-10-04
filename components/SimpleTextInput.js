import PropTypes from 'prop-types';
import React from 'react';
import { InputGroup } from '@blueprintjs/core';

export const SimpleTextInput = ({ fill, ...restProps }) => (
  <div>
    <InputGroup {...restProps} fill />
    <style jsx>
      {`
        div :global(.bp3-input) {
          border-radius: 0px;
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          border-bottom: 1px solid black;
          box-shadow: none;
        }
      `}
    </style>
  </div>
);

SimpleTextInput.propTypes = {
  fill: PropTypes.bool,
};

SimpleTextInput.defaultProps = {
  fill: false,
};
