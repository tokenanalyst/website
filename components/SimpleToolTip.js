/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

export const SimpleToolTip = ({ children, dataFor, toolTip, ...rest }) => {
  return (
    <>
      <div data-tip data-for={`tooltip-${dataFor}`}>
        {children}
      </div>
      <ReactTooltip id={`tooltip-${dataFor}`} {...rest}>
        <div>{toolTip}</div>
      </ReactTooltip>
    </>
  );
};

SimpleToolTip.propTypes = {
  children: PropTypes.node.isRequired,
  dataFor: PropTypes.string.isRequired,
  toolTip: PropTypes.node,
};

SimpleToolTip.defaultProps = {
  toolTip: null,
};
