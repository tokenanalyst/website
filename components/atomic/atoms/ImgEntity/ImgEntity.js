import PropTypes from 'prop-types';
import React from 'react';

import {
  EXCHANGE_IMAGES,
  MINER_IMAGES,
} from '../../../../constants/image-paths';

export const ImgEntity = ({ entity, disabled, size }) => {
  const imageName =
    EXCHANGE_IMAGES[entity] || MINER_IMAGES[entity] || 'no-entity-image.png';
  return (
    <div>
      <img
        src={`/static/png/${imageName}`}
        className="entity-image"
        alt={EXCHANGE_IMAGES[entity]}
      />
      <style jsx>
        {`
          .entity-image {
            width: ${size.toString()}px;
            height: ${size.toString()}px;
            filter: grayscale(${disabled ? '100%' : '0%'});
          }
        `}
      </style>
    </div>
  );
};

ImgEntity.propTypes = {
  entity: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.number,
};

ImgEntity.defaultProps = {
  disabled: false,
  size: 20,
};
