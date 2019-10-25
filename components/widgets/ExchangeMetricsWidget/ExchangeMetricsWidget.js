import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import { Skeleton } from '../../Skeleton';

import { EXCHANGE_IMAGES } from '../../../constants/image-paths';
import { EXCHANGE_NAMES } from '../../../constants/exchanges';
import { colors } from '../../../constants/styles/colors';
import { useApi } from '../../../custom-hooks';
import { getExchangeMetrics } from '../../../data-transformers/widgets/getExchangeMetrics';
import { DATA_WINDOWS } from '../../../constants/filters';

const setValueChangeStatus = (value, status) => {
  if (value < 0) {
    return status.negative;
  }

  if (value > 0) {
    return status.positive;
  }

  return status.neutral;
};

export const ExchangeMetricsWidget = ({ token, exchange }) => {
  const [overallMetrics, setOverallMetrics] = useState(null);

  const apiResponse = useApi(
    `/api/exchange-metrics?token=${token}&exchange=${exchange}&timeWindow=1d`,
    [token, exchange]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (apiResponse && token) {
      if (!apiResponse.overall.length) {
        return setOverallMetrics({
          inflowUsdSum: null,
          inflowUsdSumPctChange: null,
          outflowUsdSum: null,
          outflowUsdSumPctChange: null,
        });
      }
      setOverallMetrics(
        getExchangeMetrics(
          apiResponse.overall.find(item => item.window === DATA_WINDOWS[0])
        )
      );
    }
  }, [apiResponse, token]);

  return (
    <>
      <div className="banner-container">
        <Skeleton isSkeleton={!token}>
          <div className="banner-logo-container">
            {token && (
              <>
                <div className="banner-header">
                  <span className="banner-banner-header-symbol">
                    {token.replace('_', ' ')}
                  </span>
                  <span className="banner-banner-header-exchange-name">
                    {EXCHANGE_NAMES[exchange]}
                  </span>
                </div>
                <div className="banner-logo-img-container">
                  <img
                    className="banner-banner-logo-img"
                    src={`/static/png/${EXCHANGE_IMAGES[exchange]}`}
                    alt={`Exchange ${EXCHANGE_IMAGES[exchange]}`}
                  />
                </div>
              </>
            )}
          </div>
        </Skeleton>
        <Skeleton isSkeleton={!overallMetrics}>
          <div className="banner-metric-container">
            {overallMetrics && (
              <>
                <div className="banner-item">
                  <div>
                    <span className="flow-value">
                      {`$ ${numeral(overallMetrics.inflowUsdSum).format(
                        '0.0a'
                      )}`}
                    </span>
                    <img
                      src={setValueChangeStatus(
                        overallMetrics.inflowUsdSumPctChange,
                        {
                          negative: '/static/svg/down.svg',
                          positive: '/static/svg/up.svg',
                          neutral: '/static/svg/nochange.svg',
                        }
                      )}
                      alt="Inflow Change"
                    />
                    <span
                      className={setValueChangeStatus(
                        overallMetrics.inflowUsdSumPctChange,
                        {
                          negative: 'change-negative',
                          positive: 'change-positive',
                          neutral: 'change-neutral',
                        }
                      )}
                    >
                      {overallMetrics.inflowUsdSumPctChange &&
                        overallMetrics.inflowUsdSumPctChange.toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className="volume-label">Inflow Volume Last 24h</div>
                </div>
              </>
            )}
          </div>
        </Skeleton>
        <Skeleton isSkeleton={!overallMetrics}>
          <div className="banner-metric-container">
            {overallMetrics && (
              <>
                <div className="banner-item">
                  <div>
                    <span className="flow-value">
                      {`$ ${numeral(overallMetrics.outflowUsdSum).format(
                        '0.0a'
                      )}`}
                    </span>
                    <img
                      src={setValueChangeStatus(
                        overallMetrics.outflowUsdSumPctChange,
                        {
                          negative: '/static/svg/down.svg',
                          positive: '/static/svg/up.svg',
                          neutral: '/static/svg/nochange.svg',
                        }
                      )}
                      alt="Outflow Change"
                    />
                    <span
                      className={setValueChangeStatus(
                        overallMetrics.outflowUsdSumPctChange,
                        {
                          negative: 'change-negative',
                          positive: 'change-positive',
                          neutral: 'change-neutral',
                        }
                      )}
                    >
                      {overallMetrics.outflowUsdSumPctChange &&
                        overallMetrics.outflowUsdSumPctChange.toFixed(2)}
                      %
                    </span>
                  </div>
                  <div>Outflow Volume Last 24h</div>
                </div>
              </>
            )}
          </div>
        </Skeleton>
      </div>
      <div className="shadow" />
      <style jsx>
        {`
          .banner-logo-container {
            font-family: Space Grotesk;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            height: 40px;
            width: 300px;
          }

          .banner-banner-logo-img {
            width: 40px;
            height: 40px;
          }
          .banner-logo-img-container {
            padding-left: 10px;
          }
          .banner-banner-header-symbol {
            font-weight: 700;
          }
          .banner-banner-header-exchange-name {
            padding-left: 10px;
            opacity: 0.4;
          }
          .banner-container {
            border-bottom: solid 1px rgba(151, 151, 151, 0.15);
            padding-top: 30px;
            padding-bottom: 30px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            padding-right: 20px;
          }
          .banner-metric-container {
            height: 40px;
            width: 200px;
          }
          .banner-item {
            font-family: Open Sans;
            display: flex;
            flex-direction: column;
          }
          .banner-header {
            padding-left: 10px;
            font-size: 32px;
            font-weight: bold;
          }
          .flow-value {
            font-size: 24px;
            opacity: 0.4;
            padding-right: 10px;
          }
          .change-positive {
            padding-left: 5px;
            color: rgba(${colors.neutralGrey});
          }
          .change-negative {
            padding-left: 5px;
            color: rgba(${colors.primaryRed}, 1);
          }
          .skeleton {
            border-radius: 4px;
            animation: pulse 1s infinite ease-in-out;
            @keyframes pulse {
              0% {
                background-color: rgba(165, 165, 165, 0.1);
              }
              50% {
                background-color: rgba(165, 165, 165, 0.3);
              }
              100% {
                background-color: rgba(165, 165, 165, 0.1);
              }
            }
          }
          @media only screen and (max-width: 768px) {
            .banner-logo-container {
              font-family: Space Grotesk;
              display: flex;
              flex-direction: column-reverse;
              justify-content: space-around;
              align-items: center;
              padding-bottom: 70px;
            }
            .banner-header {
              padding-left: 0px;
            }
            .banner-banner-logo-img {
              width: 40px;
              height: 40px;
            }
            .banner-logo-img-container {
              flex: 1;
              padding-top: 50px;
            }
            .banner-banner-header {
              flex: 1;
            }
            .banner-banner-header-symbol {
              font-weight: 700;
              flex: 1;
            }
            .banner-banner-header-exchange-name {
              flex: 1;
              padding-left: 10px;
              opacity: 0.4;
            }
            .banner-container {
              flex-direction: column;
              border-bottom: none;
              padding-bottom: 10px;
            }
            .banner-metric-container {
              height: 60px;
            }
            .banner-item {
              font-family: Space Grotesk;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .flow-value {
              padding-top: 5px;
            }
            .volume-label {
              padding-top: 2px;
              padding-bottom: 2px;
            }
            .shadow {
              height: 4px;
              box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.05);
            }
          }
        `}
      </style>
    </>
  );
};

ExchangeMetricsWidget.propTypes = {
  token: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
};
