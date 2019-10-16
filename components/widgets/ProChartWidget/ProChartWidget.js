import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { makeTVSymbols } from './utils/makeTVSymbols';

import { ProChartContainer } from './ProChartContainer';
import { LeftSidePanel } from './LeftSidePanel';

export const ProChartWidget = ({
  selectedExchange,
  selectedToken,
  tokensDb,
  onChange,
}) => {
  const tvInstance = useRef(null);
  const studies = useRef({
    flows: { entityId: null },
    transactions: { entityId: null },
  });

  const exchangeSupport = tokensDb.getTokenSupportOnExchange(
    selectedToken,
    selectedExchange
  );

  const TVSymbols = makeTVSymbols(selectedToken, exchangeSupport);

  return (
    <>
      <div className="container">
        <div className="left-panel">
          <div className="controls-card">
            <LeftSidePanel
              selectedExchange={selectedExchange}
              selectedToken={selectedToken}
              tokensDb={tokensDb}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="right-panel">
          <div className="pro-chart">
            <ProChartContainer
              timeFrame="3D"
              interval="60"
              TVSymbols={TVSymbols}
              TASymbol={selectedToken}
              exchangeName={selectedExchange}
              onChartRenderCb={tvWidget => {
                tvInstance.current = tvWidget;
                studies.current.flows.entityId = tvInstance.current
                  .chart()
                  .createStudy('Flows', false, true);
                studies.current.transactions.entityId = tvInstance.current
                  .chart()
                  .createStudy('NetFlows', false, true);
              }}
            />
          </div>
          <div className="kaiko">
            Order book data by
            <a
              href="https://www.kaiko.com/?rfsn=3222089.6abb9f&utm_source=refersion&utm_medium=affiliate&utm_campaign=3222089.6abb9f"
              target="_blank"
              rel="noopener noreferrer"
              className="kaiko-link"
            >
              Kaiko
            </a>
          </div>
        </div>
        <div />
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .controls-card {
          }
          .right-panel {
            width: 100%;
            margin-left: 10px;
          }
          .cat-link {
            padding-bottom: 10px;
          }
          .pro-chart {
            width: 100%;
          }
          .kaiko {
            padding-top: 5px;
            padding-bottom: 5px;
            text-align: right;
          }
          .kaiko-link {
            padding-left: 3px;
          }

          @media (min-width: 768px) and (max-width: 1440px) {
            .controls-card {
            }
            .pro-chart {
            }
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .container {
              flex-direction: column-reverse;
            }
            .pro-chart {
              padding-top: 5px;
              width: 100%;
            }
            .controls-card {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

ProChartWidget.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
};
