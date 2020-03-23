import PropTypes from 'prop-types';
import React from 'react';
import numeral from 'numeral';
import takeRight from 'lodash/takeRight';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames';
import { MetricSummaryChart } from '../../molecules/MetricSummaryChart';
import { ValueVariation } from '../../atoms/ValueVariation';
import { styledBorder } from '../../../../constants/styles/common-styled-jsx';

const latestPoints = {
  '30d': (data, metric) => takeRight(data.days[metric], 30),
  '7d': (data, metric) => takeRight(data.days[metric], 7),
  '24h': (data, metric) => takeRight(data.hours[metric], 24),
};

export const MetricSummary = ({
  token,
  entities,
  value,
  variation,
  dataWindow,
}) => {
  const router = useRouter();

  const onCTAClick = e => {
    e.preventDefault();
    router.push('/pricing');
  };
  return (
    <div className="metric-summary-container">
      <div className="metric-summary-header">
        <div className="metric-summary-title-container">{token}</div>
        <div className="metric-summary-value-container">
          <div className="metric-summary-value">
            {`$ ${numeral(value).format('0,0')}`}
          </div>
          <div className="metric-summary-variation">
            <ValueVariation variation={variation} />
          </div>
        </div>
      </div>
      <div className="metrics-summary">
        {entities.map(entity => {
          const { name, data, isDisabled } = entity;
          return (
            <div
              key={name}
              className="metric-summary-charts"
              onClick={!isDisabled ? () => {} : onCTAClick}
              onKeyDown={!isDisabled ? () => {} : onCTAClick}
              role="button"
              tabIndex={0}
            >
              {isDisabled && (
                <Link href="/pricing">
                  <div className="cta">Get more data</div>
                </Link>
              )}

              <div
                className={classNames(
                  'metric-summary-entity',
                  isDisabled && 'disabled'
                )}
              >
                {name}
              </div>
              <div className={classNames(isDisabled && 'disabled')}>
                <MetricSummaryChart
                  label="Balance"
                  variation={
                    data.values[`data-window-${dataWindow}`].balance_pct_change
                  }
                  amount={numeral(
                    data.values[`data-window-${dataWindow}`].balance_usd_latest
                  ).format('$0,0')}
                  data={latestPoints[dataWindow](data.sparklines, 'balance')}
                  isCurrent
                />
                <MetricSummaryChart
                  label="Inflow"
                  variation={
                    data.values[`data-window-${dataWindow}`]
                      .inflow_usd_sum_pct_change
                  }
                  amount={numeral(
                    data.values[`data-window-${dataWindow}`].inflow_usd_sum
                  ).format('$0,0')}
                  data={latestPoints[dataWindow](data.sparklines, 'inflow')}
                />
                <MetricSummaryChart
                  label="Outflow"
                  variation={
                    data.values[`data-window-${dataWindow}`]
                      .outflow_usd_sum_pct_change
                  }
                  amount={numeral(
                    data.values[`data-window-${dataWindow}`].outflow_usd_sum
                  ).format('$0,0')}
                  data={latestPoints[dataWindow](data.sparklines, 'outflow')}
                />
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{styledBorder}</style>
      <style jsx>
        {`
          .metrics-summary {
            display: flex;
            width: 100%;
            padding-right: 10px;
          }
          .metric-summary-container {
            font-family: Open Sans;
            width: 100%;
          }
          .metric-summary-header {
            padding-top: 15px;
            padding-bottom: 25px;
            margin-right: 15px;
          }
          .metric-summary-charts {
            position: relative;
            width: 50%;
          }
          .disabled {
            opacity: 0.1;
            cursor: pointer;
          }
          .cta {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: Space Grotesk;
            font-size: 24px;
            font-weight: bold;
            color: rgba(250, 78, 150);
            z-index: 1;
            cursor: pointer;
          }
          .entity-name {
            font-family: Open Sans;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .metric-summary-title-container {
            font-family: Space Grotesk;
            font-size: 34px;
            font-weight: bold;
            padding-bottom: 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .metric-summary-entity {
            font-family: Space Grotesk;
            font-size: 24px;
            font-weight: bold;
            padding-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .metric-summary-value-container {
            display: flex;
            justify-content: space-between;
            width: 50%;
            align-items: center;
          }
          .metric-summary-value {
            font-family: Space Grotesk;
            font-size: 20px;
            opacity: 0.4;
          }
          .metric-summary-variation {
            margin-right: 10px;
          }

          @media only screen and (max-width: 768px) {
            .metrics-summary {
              flex-direction: column;
            }
            .metric-summary-value-container {
              width: 100%;
            }
            .metric-summary-charts {
              width: 100%;
            }
            .cta {
              top: 50%;
              left: 50%;
              width: 100%;
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
};

MetricSummary.propTypes = {
  token: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  variation: PropTypes.number.isRequired,
  dataWindow: PropTypes.string.isRequired,
  entities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

MetricSummary.defaultProps = {};
