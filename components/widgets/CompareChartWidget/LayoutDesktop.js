import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { ChartControls } from '../../charts/ChartControls';
import { CHART_TYPES } from '../../../constants/chartTypes';

const SimpleChart = dynamic(
  () => import('../../charts/SimpleChart').then(mod => mod.SimpleChart),
  {
    ssr: false,
  }
);

const GRAPH_SIZE = {
  width: {
    tablet: 700,
    desktop: 850,
    desktopLarge: 1200,
  },
  height: {
    desktop: 450,
  },
};

export const LayoutDesktop = ({
  tokenLhs,
  setTokenLhs,
  tokenDataSetLhs,
  setTokenDataSetLhs,
  tokenRhs,
  setTokenRhs,
  tokenDataSetRhs,
  setTokenDataSetRhs,
  chartMode,
  setChartMode,
  isLoading,
}) => {
  return (
    <>
      <div className="container">
        <ChartControls
          dataSet={tokenDataSetLhs.mainData}
          setDataSet={newDataSet => setTokenDataSetLhs(newDataSet)}
          token={tokenLhs}
          setToken={setTokenLhs}
          borderColor="rgba(250, 78, 150, 1)"
          chartMode={chartMode}
          setChartMode={setChartMode}
        />
        <div className="chart">
          <SimpleChart
            dataSet={[...tokenDataSetLhs.mainData, ...tokenDataSetRhs.mainData]}
            seriesType={CHART_TYPES.line}
            width={
              window.matchMedia('(min-width: 768px) and (max-width: 1399px)')
                .matches
                ? GRAPH_SIZE.width.tablet
                : window.matchMedia(
                    '(min-width: 1400px) and (max-width: 1799px)'
                  ).matches
                ? GRAPH_SIZE.width.desktop
                : GRAPH_SIZE.width.desktopLarge
            }
            height={window.matchMedia('(max-width: 768px)').matches ? 400 : 500}
            isLoading={isLoading}
            mode={chartMode}
          />
        </div>
        <ChartControls
          dataSet={tokenDataSetRhs.mainData}
          setDataSet={newDataSet => setTokenDataSetRhs(newDataSet)}
          token={tokenRhs}
          setToken={setTokenRhs}
          borderColor="rgba(63, 205, 171, 1)"
        />
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        @media (min-width: 768px) and (max-width: 1399px) {
          .container {
            flex-direction: column;
          }
          .chart {
            padding-top: 20px;
            padding-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
};

LayoutDesktop.propTypes = {
  tokenLhs: PropTypes.string.isRequired,
  setTokenLhs: PropTypes.func.isRequired,
  tokenDataSetLhs: PropTypes.object.isRequired,
  setTokenDataSetLhs: PropTypes.func.isRequired,
  tokenRhs: PropTypes.string.isRequired,
  setTokenRhs: PropTypes.func.isRequired,
  tokenDataSetRhs: PropTypes.object.isRequired,
  setTokenDataSetRhs: PropTypes.func.isRequired,
  chartMode: PropTypes.number.isRequired,
  setChartMode: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
