import React from 'react';
import PropTypes from 'prop-types';

export const EntityLogo = ({ tokenSymbol, entityName }) => {
  return (
    <>
      <div className="banner-logo-container">
        <div className="banner-header">
          <div className="banner-header-symbol">
            {tokenSymbol.split('_')[0].toUpperCase()}
          </div>
          <div className="banner-header-entity-name">{entityName}</div>
        </div>
      </div>
      <style jsx>
        {`
          .banner-logo-container {
            font-family: Space Grotesk;
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .banner-header {
            font-size: 32px;
            font-weight: bold;
            display: flex;
            flex-direction: row;
          }
          .banner-header-symbol {
            font-weight: 700;
          }
          .banner-header-entity-name {
            padding-left: 10px;
            opacity: 0.4;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 200px;
          }
          @media only screen and (max-width: 768px) {
            .banner-logo-container {
              font-family: Space Grotesk;
              display: flex;
              flex-direction: column-reverse;
              justify-content: space-around;
              align-items: center;
            }
            .banner-header {
              padding-left: 0px;
            }

            .banner-header-symbol {
              font-weight: 700;
              flex: 1;
            }
            .banner-header-entity-name {
              flex: 1;
              padding-left: 10px;
              opacity: 0.4;
            }
          }
        `}
      </style>
    </>
  );
};

EntityLogo.propTypes = {
  tokenSymbol: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
};
