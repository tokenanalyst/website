import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';

import { EXCHANGE_IMAGES } from '../../../constants/image-paths';
import { colors } from '../../../constants/styles/colors';

export const ExchangeList = ({
  exchanges,
  onChangeExchange,
  selectedExchange,
}) => {
  return (
    <>
      <div className="exchange-list">
        {Object.values(exchanges)
          .filter(exchangeName => {
            return exchangeName !== exchanges.Okex;
          })
          .map(exchangeName => (
            <div
              role="link"
              key={exchangeName}
              className="exchange"
              onClick={() => {
                onChangeExchange(exchangeName);
                ReactGA.event({
                  category: 'User',
                  action: `Pro Chart change exchange ${exchangeName}`,
                  label: `Pro Charts`,
                });
              }}
            >
              <img
                src={`/static/png/${EXCHANGE_IMAGES[exchangeName]}`}
                className="exchange-image"
                alt={EXCHANGE_IMAGES[exchangeName]}
              />
              <span
                className={`${
                  exchangeName === selectedExchange
                    ? 'exchange-label-selected'
                    : 'exchange-label'
                }`}
              >
                {exchanges[exchangeName]}
              </span>
            </div>
          ))}
      </div>
      <style jsx>
        {`
          .exchange {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-bottom: 5px;
            width: 50%;
          }
          .exchange:hover {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-bottom: 5px;
            width: 50%;
            opacity: 0.5;
          }
          .exchange-image {
            width: 24px;
            height: 24px;
          }
          .exchange-label {
            margin-left: 5px;
          }
          .exchange-label-selected {
            margin-left: 5px;
            border-bottom: 2px solid rgba(${colors.primaryGreen}, 1);
          }
        `}
      </style>
    </>
  );
};

ExchangeList.propTypes = {
  exchanges: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  onChangeExchange: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
};
