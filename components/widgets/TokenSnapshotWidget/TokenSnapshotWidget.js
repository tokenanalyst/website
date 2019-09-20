import PropTypes from 'prop-types';
import React from 'react';

import { TokenSnapshot } from './TokenSnapshot';
import { NATIVE_TOKENS, STABLE_TOKENS } from '../../../constants/tokens';

const defaultTokens = [
  NATIVE_TOKENS.BTC,
  NATIVE_TOKENS.ETH,
  STABLE_TOKENS.DAI,
  STABLE_TOKENS.OMG,
];

export const TokenSnapshotWidget = ({ units, dataWindow }) => {
  return (
    <>
      <div className="container">
        {defaultTokens.map(token => (
          <TokenSnapshot
            key={token}
            token={token}
            dataWindow={dataWindow}
            units={units}
          />
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 5px;
        }
        .token-snapshot {
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

TokenSnapshotWidget.propTypes = {
  dataWindow: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
};
