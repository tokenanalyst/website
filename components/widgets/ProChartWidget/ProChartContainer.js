/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import tvData from './services/tvData';
import taData from './services/taData';
import { TRADINVIEW_DEFAULT_OPTIONS, KAIKO_TIME_FRAMES, KAIKO } from './const';
import { TA_API_KEY, KAIKO_API_KEY } from './const/secrets';
import candlesData from './services/candlesData';
import { makeStudiesCb } from './utils';

const ProChart = dynamic(
  () => import('../../charts/ProChart').then(mod => mod.default),
  {
    ssr: false,
  }
);

const testKaiko = () => {
  fetch(
    'http://10.3.0.145:3000/api/kaiko-historical-aggregates?instrument=btc-usd&instrument_class=spot&interval=1h&start_time=2019-09-21T10:06:50.000Z&end_time=2019-09-24T10:07:50.000Z&exchange=bfnx&commodity=trades'
  )
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
};

export const ProChartContainer = ({
  timeFrame,
  interval,
  symbols,
  exchangeName,
  onChartRenderCb,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const tokenAnalystService = useRef(taData({ apiKey: TA_API_KEY }));
  const kaikoService = useRef(candlesData(KAIKO));
  const tradingViewOptions = {
    ...TRADINVIEW_DEFAULT_OPTIONS,
    timeframe: timeFrame,
    interval,
    datafeed: tvData(kaikoService.current, exchangeName, symbols),
    symbol: `${symbols[0]}/${symbols[1]}`,
    time_frames: KAIKO_TIME_FRAMES,
  };

  tokenAnalystService.current.setTradingPair(symbols);

  useEffect(() => {
    testKaiko();
    kaikoService.current.start({ apiKey: KAIKO_API_KEY });
    kaikoService.current.studies = makeStudiesCb(
      tokenAnalystService.current,
      exchangeName,
      symbols[0]
    );

    setIsLoading(false);
  }, [kaikoService]);

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
                  console.warn('ProChart on render callback');
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
