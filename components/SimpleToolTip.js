import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

export const SimpleToolTip = ({ children, dataFor, toolTip, ...rest }) => {
  return (
    <>
      {children}
      <ReactTooltip className="customeTheme" id={dataFor} {...rest}>
        <div id={`tooltip-${dataFor}`}>{toolTip}</div>
      </ReactTooltip>
    </>
  );
};

SimpleToolTip.propTypes = {
  children: PropTypes.node,
  dataFor: PropTypes.string,
  toolTip: PropTypes.node,
};
