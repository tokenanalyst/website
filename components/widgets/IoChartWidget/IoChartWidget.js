import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import { ChartControls } from '../../charts/ChartControls';
import { CHART_TYPES, CHART_MODES } from '../../../constants/chartTypes';
import { Link } from '../../../components/Link';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { getExchangeDataSet } from '../../../data-transformers/charts/getExchangeDataSet';
import { TIME_WINDOWS } from '../../../constants/filters';
import { useApi } from '../../../custom-hooks';

const SimpleChart = dynamic(
  () => import('../../charts/SimpleChart').then(mod => mod.SimpleChart),
  {
    ssr: false,
  }
);

const SimpleToolTip = dynamic(
  () => import('../../SimpleToolTip').then(mod => mod.SimpleToolTip),
  {
    ssr: false,
  }
);

const GRAPH_SIZE = {
  width: {
    mobile: 300,
    tablet: 700,
    desktop: 1000,
    desktopLarge: 1400,
  },
  height: {
    mobile: 300,
    desktop: 450,
  },
  netflowHeight: 150,
};

const TOOL_TIP = {
  ['1h']: {
    message: (
      <div>
        Hourly data. All times are in UTC.
        <br />
        The displayed hour in the data is the start of the hour
        <br /> for which the data is aggregated. <br />
      </div>
    ),
  },
  ['1d']: {
    message: (
      <div>
        Daily data. All times are in UTC.
        <br />
        The latest day returned is the last full day of data.
        <br />
      </div>
    ),
  },
};

export const IoChartWidget = ({ token, exchange, formatter }) => {
  const [seriesType, setSeriesType] = useState(CHART_TYPES.line);
  const [chartMode, setChartMode] = useState(CHART_MODES.linear);
  const [dataSet, setDataSet] = useState(null);
  const [timeWindow, setTimeWindow] = useState(TIME_WINDOWS.oneDay);

  const apiResponse = useApi(
    `/api/exchange-metrics?token=${token}&exchange=${exchange}&timeWindow=${timeWindow}`,
    [token, exchange, timeWindow]
  );

  useEffect(() => {
    window.scrollTo(0, 0); // Very depressing that I need this here but the page remains focused on the footer even after loading - dunno why
    if (apiResponse && token) {
      setDataSet(getExchangeDataSet(apiResponse, token, timeWindow));
    } else {
      setDataSet(null);
    }
  }, [token, apiResponse]);

  return (
    <>
      {dataSet ? (
        <div className="widget-container">
          <div className="chart-area">
            <div className="header">
              Inflow / Outflow <Icon icon="chart" color="gray" />
              <div className="header-info">
                <div>
                  <SimpleToolTip
                    dataFor={'header-tooltip'}
                    toolTip={
                      TOOL_TIP[timeWindow] && TOOL_TIP[timeWindow].message
                    }
                    type="dark"
                    effect="solid"
                  >
                    <div data-tip data-for="header-tooltip">
                      <Icon icon="info-sign" color="gray" />
                    </div>
                  </SimpleToolTip>
                </div>
              </div>
            </div>
            <div className="chart">
              {dataSet && (
                <>
                  <SimpleChart
                    dataSet={dataSet.mainData}
                    seriesType={seriesType}
                    width={
                      window.matchMedia(
                        '(min-width: 320px) and (max-width: 767px)'
                      ).matches
                        ? GRAPH_SIZE.width.mobile
                        : window.matchMedia(
                            '(min-width: 768px) and (max-width: 1399px)'
                          ).matches
                        ? GRAPH_SIZE.width.tablet
                        : window.matchMedia(
                            '(min-width: 1400px) and (max-width: 1799px)'
                          ).matches
                        ? GRAPH_SIZE.width.desktop
                        : GRAPH_SIZE.width.desktopLarge
                    }
                    height={
                      window.matchMedia('(max-width: 768px)').matches
                        ? GRAPH_SIZE.height.mobile
                        : GRAPH_SIZE.height.desktop
                    }
                    formatter={formatter}
                    mode={chartMode}
                  />
                </>
              )}
            </div>
          </div>
          <div className="controls-container">
            <ChartControls
              seriesType={seriesType}
              setSeriesType={setSeriesType}
              dataSet={dataSet.mainData}
              setDataSet={setDataSet}
              setTimeWindow={setTimeWindow}
              chartMode={chartMode}
              setChartMode={setChartMode}
            />
            <div className="pricing-link">
              <Link
                href="/pricing"
                desktopLabel="Access historical data"
                mobileLabel="Historical data"
              />
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <style jsx>{`
        .widget-container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          padding: 10px;
        }
        .chart {
          min-width: ${GRAPH_SIZE.width.desktopLarge}px;
        }
        .header {
          position: relative;
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 20px;
          padding-top: 20px;
          text-align: center;
          width: 100%;
        }
        .header-info {
          position: absolute;
          right: 0;
          top: 0;
        }
        .pricing-link {
          padding-top: 30px;
          text-align: center;
        }
        @media (min-width: 1400px) and (max-width: 1799px) {
          .chart {
            min-width: ${GRAPH_SIZE.width.desktop}px;
          }
        }
        @media (min-width: 768px) and (max-width: 1399px) {
          .widget-container {
            flex-direction: column;
          }
          .chart {
            min-width: ${GRAPH_SIZE.width.tablet}px;
            min-height: ${GRAPH_SIZE.width.mobile}px;
          }
        }
        @media (min-width: 320px) and (max-width: 767px) {
          .widget-container {
            flex-direction: column;
          }
          .chart {
            min-width: ${GRAPH_SIZE.width.mobile}px;
            min-height: ${GRAPH_SIZE.height.mobile}px;
          }
        }
      `}</style>
    </>
  );
};

IoChartWidget.propTypes = {
  token: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
  formatter: PropTypes.func,
};

IoChartWidget.defaultProps = {
  formatter: null,
};
