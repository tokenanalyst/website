/* eslint-disable react/jsx-wrap-multilines */
import PropTypes from 'prop-types';
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import { colors } from '../../../../constants/styles/colors';
import { LoadingSpinner } from '../../atoms/LoadSpinner';
import { MetricSummaryValues } from '../MetricSummaryValues';

const setValueChangeStatus = (value, status) => {
  if (value < 0) {
    return status.negative;
  }

  if (value > 0) {
    return status.positive;
  }

  return status.neutral;
};

export const MetricSummaryChart = ({ label, data, variation, amount }) => {
  return (
    <>
      {data ? (
        <div className="container">
          <div className="shadow" />
          <div className="section" key={label}>
            <div className="sparkline-row">
              <div className="sparkline-header">{label}</div>
              <div className="sparkline">
                <Sparklines data={data}>
                  <SparklinesLine
                    style={{ strokeWidth: 6, fill: 'none' }}
                    color={setValueChangeStatus(variation, {
                      negative: `rgba(${colors.primaryRed})`,
                      positive: `rgba(${colors.primaryGreen})`,
                      neutral: `rgba(${colors.neutralGrey})`,
                    })}
                  />
                </Sparklines>
              </div>
            </div>

            <div className="last-row">
              <MetricSummaryValues variation={variation} amount={amount} />
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      )}
      <style jsx>
        {`
          .container {
            font-family: Open Sans;
            min-width: 280px;
            max-width: 350px;
          }
          .header {
            font-family: Space Grotesk;
            font-size: 24px;
            font-weight: bold;
            padding-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .change-negative {
            color: rgba(${colors.primaryRed});
          }
          .change-positive {
            color: rgba(${colors.primaryGreen});
          }
          .change-neutral {
            color: #4a4a4a;
            opacity: 0.4;
          }
          .section {
            padding-top: 20px;
          }
          .row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-bottom: solid 1px rgba(151, 151, 151, 0.15);
            padding-bottom: 20px;
          }
          .last-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-bottom: 20px;
          }
          .sparkline-header {
            font-weight: 700;
            font-size: 18px;
          }
          .sparkline-row {
            display: flex;
            justify-content: space-between;
            height: 40px;
            margin-bottom: 5px;
          }
          .sparkline {
            height: 40px;
            width: 50%;
            opacity: 1;
          }
          .spinner {
            min-width: 300px;
            max-width: 300px;
          }
          @media only screen and (max-width: 768px) {
            .container {
              min-width: 100%;
            }
            .sparkline-header {
              font-weight: 700;
              font-size: 18px;
              width: 50%;
            }
            .row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              border-bottom: solid 1px rgba(151, 151, 151, 0.15);
              padding-bottom: 20px;
              margin-left: -20px;
              margin-right: -20px;
              padding-left: 20px;
              padding-right: 20px;
            }
            .last-row {
              visibility: visible;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              border-bottom: solid 1px rgba(151, 151, 151, 0.15);
              padding-bottom: 20px;
              margin-left: -20px;
              margin-right: -20px;
              padding-left: 20px;
              padding-right: 20px;
            }
            .shadow {
              height: 4px;
              box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
              margin-left: -20px;
              margin-right: -20px;
            }
            .header {
              padding-bottom: 5px;
              padding-top: 10px;
            }
          }
        `}
      </style>
    </>
  );
};

MetricSummaryChart.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  variation: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
};

MetricSummaryChart.defaultProps = {};
