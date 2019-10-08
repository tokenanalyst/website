import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Position, Icon, Button } from '@blueprintjs/core';
import dynamic from 'next/dynamic';

import { ChartControls } from '../../charts/ChartControls';
import { colors } from '../../../constants/styles/colors';
import { underSubNav } from '../../../constants/styles/common-styled-jsx';
import { TOKEN_IMAGES } from '../../../constants/image-paths';
import { TOKEN_NAMES } from '../../../constants/token-names';
import { CHART_TYPES } from '../../../constants/chartTypes';

const SimpleChart = dynamic(
  () => import('../../charts/SimpleChart').then(mod => mod.SimpleChart),
  {
    ssr: false,
  }
);

const GRAPH_SIZE = {
  width: 320,
  height: 350,
};

export const LayoutMobile = ({
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="container">
        <Drawer
          isOpen={isDrawerOpen}
          position={Position.LEFT}
          size={Drawer.SIZE_LARGE}
        >
          <div className="under-sub-nav" />
          <ChartControls
            dataSet={tokenDataSetLhs.mainData}
            setDataSet={newDataSet => setTokenDataSetLhs(newDataSet)}
            token={tokenLhs}
            setToken={setTokenLhs}
            onPressDismiss={() => setIsDrawerOpen(false)}
          />
          <div className="divider">
            <div className="token-1">Token 1</div>
            <div>
              <Icon
                icon="arrow-up"
                iconSize={24}
                color={`rgba(${colors.primaryRed})`}
              />
              <Icon
                icon="arrow-down"
                iconSize={24}
                color={`rgba(${colors.primaryGreen})`}
              />
            </div>
            <div className="token-2">Token 2</div>
          </div>
          <ChartControls
            dataSet={tokenDataSetRhs.mainData}
            setDataSet={newDataSet => setTokenDataSetRhs(newDataSet)}
            token={tokenRhs}
            setToken={setTokenRhs}
            chartMode={chartMode}
            setChartMode={setChartMode}
          />
          <div style={{ paddingBottom: '50px' }} />
        </Drawer>
        <div className="coins">
          <div className="coin-info">
            <img
              src={`/static/png/coins/${TOKEN_IMAGES[tokenLhs]}`}
              className="coin"
            />
            {TOKEN_NAMES[tokenLhs]}
          </div>
          <Icon icon="arrows-horizontal" iconSize={24} />
          <div className="coin-info">
            <img
              src={`/static/png/coins/${TOKEN_IMAGES[tokenRhs]}`}
              className="coin"
            />
            {TOKEN_NAMES[tokenRhs]}
          </div>
        </div>
        <Button icon="refresh" onClick={() => setIsDrawerOpen(true)}>
          Change
        </Button>
        <div className="chart">
          <SimpleChart
            dataSet={[...tokenDataSetLhs.mainData, ...tokenDataSetRhs.mainData]}
            seriesType={CHART_TYPES.line}
            width={GRAPH_SIZE.width}
            height={GRAPH_SIZE.height}
            isLoading={isLoading}
            mode={chartMode}
          />
        </div>
      </div>
      <style jsx>{underSubNav}</style>
      <style jsx>{`
        @media (min-width: 320px) and (max-width: 767px) {
          .container {
            flex-direction: column;
            display: flex;
            justify-content: space-around;
          }
          .coins {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding-bottom: 10px;
          }
          .coin {
            width: 36px;
            padding-bottom: 10px;
          }
          .coin-info {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .chart {
            padding-top: 20px;
          }
          .divider {
            display: flex;
            justify-content: space-around;
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 10px;
            padding-bottom: 10px;
            align-items: center;
          }
          .token-1 {
            color: rgba(${colors.primaryRed});
          }
          .token-2 {
            color: rgba(${colors.primaryGreen});
          }
          .change-button {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};

LayoutMobile.propTypes = {
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
