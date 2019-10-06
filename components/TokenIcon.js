import PropTypes from 'prop-types';
import React from 'react';
import { TOKEN_IMAGES } from '../constants/image-paths';

export const TokenIcon = ({ token, size, withText, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        role="presentation"
        onKeyPress={onClick}
        className="container"
      >
        <div size={size}>
          <img
            src={`/static/png/coins/${TOKEN_IMAGES[token]}`}
            className="token-icon"
            alt={`Token ${token}`}
          />
        </div>
        {withText && <div className="text">{token.replace('_', ' ')}</div>}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            align-items: center;
          }
          .token-icon {
            width: ${`${size}px;`};
            height: ${`${size}px;`};
            vertical-align: middle;
          }
          .text {
            padding-left: 10px;
          }
        `}
      </style>
    </>
  );
};

TokenIcon.propTypes = {
  token: PropTypes.string.isRequired,
  size: PropTypes.number,
  onClick: PropTypes.func,
  withText: PropTypes.bool,
};

TokenIcon.defaultProps = {
  size: 32,
  withText: false,
  onClick: () => null,
};
