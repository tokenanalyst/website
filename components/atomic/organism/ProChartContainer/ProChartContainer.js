/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';

import tvData from '../../../../services/tvData';
import taData from '../../../../services/taData';
import {
  TRADINVIEW_DEFAULT_OPTIONS,
  KAIKO_TIME_FRAMES,
  KAIKO,
} from '../../pages/ExchangeFlows/const';
import candlesData from '../../../../services/candlesData';
import { makeStudiesCb } from '../../../../utils/makeStudiesCb';
import { LoginContext } from '../../../../contexts/Login';

const ProChart = dynamic(() => import('../ProChart').then(mod => mod.default), {
  ssr: false,
});

const taDataArgs =
  process.env.NODE_ENV !== 'development'
    ? {}
    : { apiUrl: 'http://localhost:3000/api' };

export const ProChartContainer = ({
  timeFrame,
  interval,
  TVSymbols,
  TASymbol,
  exchangeName,
  onChartRenderCb,
  isIntraDay,
  instrumentClass,
  TVOptions,
  minerName,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const tokenAnalystService = useRef(taData(taDataArgs));
  const kaikoService = useRef(candlesData(KAIKO));
  const loginCtx = useContext(LoginContext);

  const tradingViewOptions = {
    ...TRADINVIEW_DEFAULT_OPTIONS,
    timeframe: timeFrame,
    interval,
    datafeed: tvData(
      kaikoService.current,
      exchangeName,
      TVSymbols,
      loginCtx.isLoggedIn && isIntraDay,
      instrumentClass
    ),
    symbol: `${TVSymbols[0]}/${TVSymbols[1]}`,
    time_frames: KAIKO_TIME_FRAMES,
    debug: false,
    ...TVOptions,
  };

  tokenAnalystService.current.setToken(TASymbol);

  useEffect(() => {
    kaikoService.current.start();
    kaikoService.current.studies = makeStudiesCb(
      tokenAnalystService.current,
      exchangeName,
      minerName,
      TASymbol
    );
    kaikoService.current.ta = tokenAnalystService.current;

    setIsLoading(false);
  }, [kaikoService, exchangeName, TVSymbols, TASymbol, minerName]);

  return (
    <>
      <div className="container">
        <div className="tv-chart">
          {TVSymbols && !isLoading && (
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
  TASymbol: PropTypes.string.isRequired,
  TVSymbols: PropTypes.arrayOf(PropTypes.string).isRequired,
  TVOptions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  ),
  exchangeName: PropTypes.string.isRequired,
  minerName: PropTypes.string,
  interval: PropTypes.string.isRequired,
  onChartRenderCb: PropTypes.func.isRequired,
  timeFrame: PropTypes.string.isRequired,
  instrumentClass: PropTypes.string.isRequired,
  isIntraDay: PropTypes.bool,
};

ProChartContainer.defaultProps = {
  isIntraDay: false,
  TVOptions: {},
  minerName: null,
};
