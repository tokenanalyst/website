import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { TokenSnapshot } from './TokenSnapshot';
import { getTokens } from './helpers';

export const TokenSnapshotWidget = ({ units, dataWindow }) => {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    setTokens(getTokens());
  }, []);

  return (
    <>
      {tokens && (
        <div className="container">
          {tokens.map((token, index) => (
            <>
              <TokenSnapshot
                key={token}
                initialToken={token}
                dataWindow={dataWindow}
                units={units}
                position={index}
              />
              {index != tokens.length - 1 && <Separator />}
            </>
          ))}
        </div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 5px;
        }
        @media only screen and (max-width: 768px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

const Separator = () => (
  <>
    <div className="container" />
    <style jsx>{`
      .container {
        border-right: 1px solid rgb(203, 203, 203);
      }
    `}</style>
  </>
);

TokenSnapshotWidget.propTypes = {
  dataWindow: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
};
