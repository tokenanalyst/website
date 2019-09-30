/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import tvData from './services/tvData';
import taData from './services/taData';
import { TRADINVIEW_DEFAULT_OPTIONS, KAIKO_TIME_FRAMES, KAIKO } from './const';
import candlesData from './services/candlesData';
import { makeStudiesCb } from './utils';

const ProChart = dynamic(
  () => import('../../charts/ProChart').then(mod => mod.default),
  {
    ssr: false,
  }
);

const taDataArgs =
  process.env.NODE_ENV !== 'development'
    ? {}
    : { apiUrl: 'http://localhost:3000/api' };

export const ProChartContainer = ({
  timeFrame,
  interval,
  symbols,
  exchangeName,
  onChartRenderCb,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const tokenAnalystService = useRef(taData(taDataArgs));
  const kaikoService = useRef(candlesData(KAIKO));
  const tradingViewOptions = {
    ...TRADINVIEW_DEFAULT_OPTIONS,
    timeframe: timeFrame,
    interval,
    datafeed: tvData(kaikoService.current, exchangeName, symbols),
    symbol: `${symbols[0]}/${symbols[1]}`,
    time_frames: KAIKO_TIME_FRAMES,
    debug: false,
  };

  tokenAnalystService.current.setTradingPair(symbols);

  useEffect(() => {
    kaikoService.current.start();
    kaikoService.current.studies = makeStudiesCb(
      tokenAnalystService.current,
      exchangeName,
      symbols[0]
    );
    kaikoService.current.ta = tokenAnalystService.current;

    setIsLoading(false);
  }, [kaikoService, exchangeName, symbols]);

  return (
    <>
      <div className="container">
        <div className="tv-chart">
          {symbols && !isLoading && (
            <div>
              <ProChart
                kaikoService={kaikoService.current}
                tradingViewOptions={tradingViewOptions}
                onChartRenderCb={tvWidget => {
                  onChartRenderCb(tvWidget);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: flex-start;
          }
          .tv-chart {
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

ProChartContainer.propTypes = {
  exchangeName: PropTypes.string.isRequired,
  interval: PropTypes.string.isRequired,
  onChartRenderCb: PropTypes.func.isRequired,
  symbols: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeFrame: PropTypes.string.isRequired,
};
