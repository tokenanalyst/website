/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { TokenSnapshot } from './TokenSnapshot';
import { getTokens } from './helpers';

export const TokenSnapshotWidget = ({
  units,
  dataWindow,
  maxItems,
  itemsDirection,
  disabled,
  isHome,
}) => {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    setTokens(getTokens().slice(0, maxItems));
  }, [maxItems]);

  return (
    <>
      {tokens && (
        <div className="container">
          {tokens.map((token, index) => (
            <div key={token + index} className="token">
              <TokenSnapshot
                initialToken={token}
                dataWindow={dataWindow}
                units={units}
                position={index}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      )}
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: ${itemsDirection};
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 5px;
          }
          .token {
            display: flex;
          }
          @media only screen and (max-width: 1360px) {
            .container {
              flex-direction: ${isHome ? 'column' : 'row'};
              justify-content: ${isHome ? 'flex-end' : 'space-between'};
            }
            .token {
              display: flex;
              justify-content: ${isHome ? 'flex-end' : 'space-between'};
            }
          }
        `}
      </style>
    </>
  );
};

TokenSnapshotWidget.propTypes = {
  dataWindow: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
  maxItems: PropTypes.number,
  itemsDirection: PropTypes.oneOf(['row', 'column']),
  disabled: PropTypes.bool,
  isHome: PropTypes.bool,
};

TokenSnapshotWidget.defaultProps = {
  maxItems: 4,
  itemsDirection: 'row',
  disabled: false,
  isHome: false,
};
