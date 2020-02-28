import PropTypes from 'prop-types';
import React from 'react';
import { TOKEN_IMAGES } from '../constants/image-paths';

export const TokenIcon = ({ token, size, hasText, onClick }) => {
  const fileName = TOKEN_IMAGES[token.toUpperCase()];

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
            src={`/static/png/coins/${fileName}`}
            className="token-icon"
            alt={`Token ${token}`}
          />
        </div>
        {hasText && (
          <div className="text">{token.replace('_', ' ').toUpperCase()}</div>
        )}
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
  hasText: PropTypes.bool,
};

TokenIcon.defaultProps = {
  size: 32,
  hasText: false,
  onClick: () => null,
};
