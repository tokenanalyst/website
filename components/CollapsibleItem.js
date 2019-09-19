import React, { useState } from 'react';

import { Card, Collapse, Icon } from '@blueprintjs/core';

export const CollapsibleItem = ({ header, body }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card>
        <div className="header" onClick={() => setIsOpen(!isOpen)}>
          {header}
          <Icon icon={isOpen ? 'chevron-up' : 'chevron-down'} iconSize={20} />
        </div>
        <Collapse isOpen={isOpen}>{body}</Collapse>
      </Card>
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
          }
        `}
      </style>
    </>
  );
};
