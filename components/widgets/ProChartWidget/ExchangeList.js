import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga';
import { Popover, Menu, MenuItem, Button, Position } from '@blueprintjs/core';

import { EXCHANGE_IMAGES } from '../../../constants/image-paths';
import { colors } from '../../../constants/styles/colors';

const renderExchangeImg = exchange => {
  return (
    <>
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
          }
        `}
      </style>
    </>
  );
};

export const ExchangeList = ({
  exchanges,
  onChangeExchange,
  selectedExchange,
}) => {
  const renderMenuItems = () =>
    Object.keys(exchanges).map(exchange => {
      return (
        <MenuItem
          text={exchange}
          icon={renderExchangeImg(exchange)}
          onKeyDown={() => {
            onChangeExchange(exchange);
            ReactGA.event({
              category: 'User',
              action: `Pro Chart change exchange ${exchange}`,
              label: `Pro Charts`,
            });
          }}
          onClick={() => {
            onChangeExchange(exchange);
            ReactGA.event({
              category: 'User',
              action: `Pro Chart change exchange ${exchange}`,
              label: `Pro Charts`,
            });
          }}
        />
      );
    });

  return (
    <>
      <div className="exchange-list">
        <div className="mobile-select">
          <Popover
            minimal
            content={<Menu>{renderMenuItems()}</Menu>}
            position={Position.BOTTOM_LEFT}
          >
            <Button
              rightIcon="double-caret-vertical"
              text={selectedExchange}
              icon={renderExchangeImg(selectedExchange)}
            />
          </Popover>
        </div>

        <div className="desktop-list">
          {Object.values(exchanges)
            .filter(exchangeName => {
              return exchangeName !== exchanges.Okex;
            })
            .map(exchangeName => (
              <div
                role="link"
                key={exchangeName}
                className="exchange"
                tabIndex="0"
                onKeyDown={() => {
                  onChangeExchange(exchangeName);
                  ReactGA.event({
                    category: 'User',
                    action: `Pro Chart change exchange ${exchangeName}`,
                    label: `Pro Charts`,
                  });
                }}
                onClick={() => {
                  onChangeExchange(exchangeName);
                  ReactGA.event({
                    category: 'User',
                    action: `Pro Chart change exchange ${exchangeName}`,
                    label: `Pro Charts`,
                  });
                }}
              >
                {renderExchangeImg(exchangeName)}
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
          .mobile-select {
            display: none;
          }
          @media (max-width: 767px) {
            .desktop-list {
              display: none;
            }
            .mobile-select {
              display: inline-block;
            }
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
