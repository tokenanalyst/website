import PropTypes from 'prop-types';
import React from 'react';
import numeral from 'numeral';
import takeRight from 'lodash/takeRight';

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
          const { name, data } = entity;
          return (
            <div key={name} className="metric-summary-charts">
              <div className="metric-summary-entity">{name}</div>
              <div>
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
            width: 50%;
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
