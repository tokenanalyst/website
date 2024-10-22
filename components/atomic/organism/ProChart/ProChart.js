import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import moment from 'moment';

let tvWidget = null;

const ProChart = ({ kaikoService, tradingViewOptions, onChartRenderCb }) => {
  useEffect(() => {
    tvWidget = new TradingView.widget(tradingViewOptions);

    tvWidget.onChartReady(() => {
      const chart = tvWidget.chart();
      chart.setVisibleRange({
        from: 1583020800,
        to: 1585699200,
      });
      onChartRenderCb(tvWidget);

      // Fired when the intervall is changed. We then set the time range shown on screen,
      // so for example, the last 2 hours

      chart.onIntervalChanged().subscribe(null, (interval, obj) => {
        const now = moment();
        switch (obj.timeframe) {
          case '2h': {
            const twoHoursBefore = now.subtract(2, 'hours').valueOf();
            chart.setVisibleRange({
              from: 1583020800,
              to: 1585699200,
            });
            break;
          }
          case '6h': {
            const sixHoursBefore = now.subtract(6, 'hours').valueOf();
            chart.setVisibleRange({
              from: 1583020800,
              to: 1585699200,
            });
            break;
          }
          case '1d': {
            const oneDayBefore = now.subtract(1, 'days').valueOf();
            chart.setVisibleRange({
         from: 1583020800,
        to: 1585699200,
            });
            break;
          }
          default:
        }
      });
    });
    return () => {
      if (tvWidget !== null) {
        tvWidget.remove();
        tvWidget = null;
      }
    };
  }, [tradingViewOptions, kaikoService, onChartRenderCb]);

  return (
    <div>
      <div id={tradingViewOptions.container_id} className="tvCharContainer">
        <style jsx>
          {`
            .tvCharContainer {
              height: calc(100vh - 130px);
            }
          `}
        </style>
      </div>
    </div>
  );
};

ProChart.propTypes = {
  kaikoService: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
  onChartRenderCb: PropTypes.func,
  tradingViewOptions: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
      PropTypes.string,
      PropTypes.array,
    ])
  ).isRequired,
};

ProChart.defaultProps = {
  onChartRenderCb: () => null,
};

export default ProChart;
