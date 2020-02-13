import PropTypes from 'prop-types';
import React from 'react';

import { EXCHANGE_IMAGES } from '../../../../constants/image-paths';

export const ImgExchange = ({ exchange, disabled }) => {
  return (
    <div>
      <img
        src={`/static/png/${EXCHANGE_IMAGES[exchange]}`}
        className="exchange-image"
        alt={EXCHANGE_IMAGES[exchange]}
      />
      <style jsx>
        {`
          .exchange-image {
            width: 24px;
            height: 24px;
            filter: grayscale(${disabled ? '100%' : '0%'});
          }
        `}
      </style>
    </div>
  );
};

ImgExchange.propTypes = {
  exchange: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

ImgExchange.defaultProps = {
  disabled: false,
};
