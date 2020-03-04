import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';

import { Skeleton } from '../../../Skeleton';
import { EXCHANGE_NAMES } from '../../../../constants/exchanges';
import { colors } from '../../../../constants/styles/colors';
import { useApi } from '../../../../hooks';
import { getExchangeMetrics } from '../../../../utils/data-transformers/widgets/getExchangeMetrics';
import { DATA_WINDOWS } from '../../../../constants/filters';
import { EntityLogo } from '../../molecules/EntityLogo';

const setValueChangeStatus = (value, status) => {
  if (value < 0) {
    return status.negative;
  }

  if (value > 0) {
    return status.positive;
  }

  return status.neutral;
};

const ExchangeMetricsWidgetComponent = ({ token, exchange }) => {
  const [overallMetrics, setOverallMetrics] = useState(null);
  const apiResponse = useApi(
    `/api/exchange-flows?token=${token}&exchange=${exchange}&timeWindow=1d`,
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

    return () => {};
  }, [apiResponse, token]);

  return (
    <>
      <div className="banner-container">
        <Skeleton isSkeleton={!token}>
          <div className="banner-logo-container">
            {token && (
              <EntityLogo
                tokenSymbol={token}
                entityName={EXCHANGE_NAMES[exchange]}
              />
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
                      {`$${numeral(overallMetrics.inflowUsdSum).format(
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
                          negative: `change-negative`,
                          positive: `change-positive`,
                          neutral: `change-neutral`,
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
                      {`$${numeral(overallMetrics.outflowUsdSum).format(
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
                          negative: `change-negative`,
                          positive: `change-positive`,
                          neutral: `change-neutral`,
                        }
                      )}
                    >
                      {overallMetrics.outflowUsdSumPctChange &&
                        Number(overallMetrics.outflowUsdSumPctChange).toFixed(
                          2
                        )}
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
      <style jsx>
        {`
          .metrics-container {
            display: flex;
            flex-direction: row;
          }
          .banner-logo-container {
            font-family: Space Grotesk;
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          .banner-banner-logo-img {
            width: 40px;
            height: 40px;
          }
          .banner-logo-img-container {
            padding-left: 10px;
          }
          .banner-container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
          .banner-metric-container {
            min-height: 40px;
            width: 200px;
            padding-bottom: 5px;
          }
          .banner-item {
            font-family: Open Sans;
            display: flex;
            flex-direction: column;
          }
          .flow-value {
            font-size: 24px;
            opacity: 0.4;
            padding-right: 10px;
          }
          .change-positive {
            padding-left: 5px;
            color: rgba(${colors.neutralGrey}, 1);
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
            .banner-container {
              flex-direction: column;
              border-bottom: none;
            }
            .banner-metric-container {
              height: 60px;
              margin: auto;
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
          }
        `}
      </style>
    </>
  );
};

ExchangeMetricsWidgetComponent.propTypes = {
  token: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
};

export const ExchangeMetricsWidget = React.memo(ExchangeMetricsWidgetComponent);
