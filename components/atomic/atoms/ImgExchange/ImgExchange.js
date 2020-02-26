import PropTypes from 'prop-types';
import React from 'react';

import { EXCHANGE_IMAGES } from '../../../../constants/image-paths';

export const ImgExchange = ({ exchange, disabled, size }) => {
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
            width: ${size.toString()}px;
            height: ${size.toString()}px;
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
  size: PropTypes.number,
};

ImgExchange.defaultProps = {
  size: 22,
  disabled: false,
};
