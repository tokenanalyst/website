import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Icon } from '@blueprintjs/core';

import { ChartControls } from '../../charts/ChartControls';
import { CHART_TYPES } from '../../../constants/chartTypes';
import { PricingLink } from '../../../components/PricingLink';

const SimpleChart = dynamic(
  () => import('../../charts/SimpleChart').then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

const SimpleToolTip = dynamic(
  () => import('../../SimpleToolTip').then(mod => mod.SimpleToolTip),
  {
    ssr: false
  }
);

const GRAPH_SIZE = {
  width: {
    mobile: 300,
    tablet: 700,
    desktop: 1000,
    desktopLarge: 1400
  },
  height: {
    mobile: 300,
    desktop: 450
  }
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
    )
  },
  ['1d']: {
    message: (
      <div>
        Daily data. All times are in UTC.
        <br />
        The latest day returned is the last full day of data.
        <br />
      </div>
    )
  }
};

export const IoChartWidget = ({
  dataSet,
  setDataSet,
  formatter,
  timeWindow,
  setTimeWindow
}) => {
  const [seriesType, setSeriesType] = useState(CHART_TYPES.line);

  return (
    <>
      <div className="widget-container">
        <div className="chart">
          <div className="header">
            Inflow / Outflow <Icon icon="chart" color="gray" />
            <div className="header-info">
              <div>
                <SimpleToolTip
                  dataFor={'header-tooltip'}
                  toolTip={TOOL_TIP[timeWindow] && TOOL_TIP[timeWindow].message}
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
          <div className="graph">
            {dataSet && (
              <SimpleChart
                dataSet={dataSet}
                seriesType={seriesType}
                width={
                  window.matchMedia('(min-width: 377px) and (max-width: 768)')
                    .matches
                    ? GRAPH_SIZE.width.tablet
                    : window.matchMedia(
                        '(min-width: 769px) and (max-width: 1400)'
                      ).matches
                    ? GRAPH_SIZE.width.desktop
                    : window.matchMedia('(min-width: 1800px)').matches
                    ? GRAPH_SIZE.width.desktopLarge
                    : GRAPH_SIZE.width.mobile
                }
                height={
                  window.matchMedia('(max-width: 768px)').matches
                    ? GRAPH_SIZE.height.mobile
                    : GRAPH_SIZE.height.desktop
                }
                formatter={formatter}
                isLoading={!dataSet}
              />
            )}
          </div>
        </div>
        <div className="controls-container">
          <ChartControls
            seriesType={seriesType}
            setSeriesType={setSeriesType}
            dataSet={dataSet}
            setDataSet={setDataSet}
            setTimeWindow={setTimeWindow}
          />
          <div className="pricing-link">
            <PricingLink />
          </div>
        </div>
      </div>
      <style jsx>{`
        .widget-container {
          font-family: Open Sans;
          padding: 3%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        .chart {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-weight: bold;
          padding-left: 20px;
          padding-right: 20px;
        }
        .graph {
          width: ${GRAPH_SIZE.width.tablet}px;
          height: ${GRAPH_SIZE.width.mobile}px;
        }
        .header {
          position: relative;
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 20px;
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
        @media (min-width: 377px) and (max-width: 768px) {
          .chart {
            padding-left: 0px;
            padding-right: 0px;
            margin-bottom: 20px;
          }
          .header {
            font-size: 18px;
            font-weight: bold;
            padding-bottom: 20px;
            padding-top: 10px;
            text-align: center;
            width: 100%;
          }
          .header-info {
            position: absolute;
            right: 0;
            top: 10px;
          }
          .widget-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};
