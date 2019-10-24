import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Collapse, Icon } from '@blueprintjs/core';

export const CollapsibleItem = ({ header, body, defaultIsOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return (
    <>
      <div
        className="header"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={() => setIsOpen(!isOpen)}
        role="button"
      >
        {header}
        <Icon icon={isOpen ? 'chevron-up' : 'chevron-down'} iconSize={20} />
      </div>
      <Collapse isOpen={isOpen}>{body}</Collapse>

      <style jsx>
        {`
          .header {
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            padding-top: 10px;
          }
        `}
      </style>
    </>
  );
};

CollapsibleItem.defaultProps = {
  defaultIsOpen: false,
};

CollapsibleItem.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  defaultIsOpen: PropTypes.bool,
};
