import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

export const SimpleToolTip = ({ children, dataFor, toolTip, ...rest }) => {
  return (
    <>
      {children}
      test
      <ReactTooltip id={dataFor} {...rest}>
        <div id={`tooltip-${dataFor}`}>{toolTip}</div>
      </ReactTooltip>
    </>
  );
};

SimpleToolTip.propTypes = {
  children: PropTypes.node.isRequired,
  dataFor: PropTypes.string.isRequired,
  toolTip: PropTypes.node.isRequired,
};
