import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { makeTVSymbols } from '../../../../utils/makeTVSymbols';

import { ProChartContainer } from '../../organism/ProChartContainer';
import { LeftSidePanelMiners } from '../../organism/LeftSidePanelMiners';
import { MINER_STUDIES, TV_OPTIONS } from './const';
import {
  setLocalMetricsConfig,
  getLocalMetricsConfig,
} from '../../../../utils';
import { KaikoLogo } from '../../atoms/KaikoLogo';
import { useSupportedMetrics, useActivateStudies } from '../../../../hooks';
import { APP_STORAGE_KEYS } from '../../../../constants';

const LOCAL_STORAGE_KEY = APP_STORAGE_KEYS.minerStats;

const propsAreEqual = (prevProps, nextProps) => {
  return (
    isEqual(prevProps.TASymbol, nextProps.TASymbol) &&
    isEqual(prevProps.minerName, nextProps.minerName)
  );
};

const MemoProChartContainer = React.memo(ProChartContainer, propsAreEqual);

export const MinerStatsPage = ({
  selectedMiner,
  selectedExchange,
  selectedToken,
  supportedMiners,
  tokensDb,
  onChangeToken,
}) => {
  const {
    tokens: {
      group: {
        all: { BTC, ETH },
      },
    },
  } = tokensDb;
  const localStorageParams = {
    defaultConfig: MINER_STUDIES,
    storageKey: LOCAL_STORAGE_KEY,
  };
  const exchangeSupport = tokensDb.getTokenSupportForExchange(
    selectedToken,
    selectedExchange
  );
  const TVSymbols = makeTVSymbols(selectedToken, exchangeSupport);

  const tvInstance = useRef(null);

  const [tvStudies, setTvStudies, isMetricSupportReady] = useSupportedMetrics(
    selectedToken,
    selectedMiner,
    tokensDb,
    localStorageParams
  );

  const [setIsChartReady] = useActivateStudies(
    tvStudies,
    tvInstance,
    setTvStudies,
    isMetricSupportReady
  );

  const btcDetails = tokensDb.getTokenDetails(BTC);
  const ethDetails = tokensDb.getTokenDetails(ETH);

  const tokensList = [{ BTC: btcDetails, ETH: ethDetails }, {}, {}];

  useEffect(() => {
    getLocalMetricsConfig(selectedToken, MINER_STUDIES, LOCAL_STORAGE_KEY);
  }, [selectedToken]);

  const onSelectStudy = study => {
    const updateStudy = studies => {
      const updatedStudies = cloneDeep(studies);

      if (tvInstance.current) {
        try {
          if (
            updatedStudies[study].isActive &&
            updatedStudies[study].entityId
          ) {
            tvInstance.current
              .chart()
              .removeEntity(updatedStudies[study].entityId);
            updatedStudies[study].entityId = null;
          } else {
            updatedStudies[
              study
            ].entityId = tvInstance.current
              .chart()
              .createStudy(updatedStudies[study].tvIndicatorName, false, true);
          }
          updatedStudies[study].isActive = !updatedStudies[study].isActive;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log('Study not ready.');
        }
      }

      setLocalMetricsConfig(selectedToken, updatedStudies, LOCAL_STORAGE_KEY);
      return updatedStudies;
    };
    setTvStudies(studies => updateStudy(studies));
  };

  const onChartRender = async tvWidget => {
    tvInstance.current = tvWidget;
    setIsChartReady(true);
  };

  return (
    <>
      <div className="container">
        <div className="left-panel">
          <div className="controls-card">
            <LeftSidePanelMiners
              selectedMiner={selectedMiner}
              selectedToken={selectedToken}
              studies={tvStudies}
              tokensDb={tokensDb}
              supportedMiners={supportedMiners}
              onChangeToken={onChangeToken}
              onSelectStudy={onSelectStudy}
              tokensList={tokensList}
            />
          </div>
        </div>
        <div className="right-panel">
          <div className="pro-chart">
            <MemoProChartContainer
              timeFrame="3M"
              interval="D"
              TVSymbols={TVSymbols.pair}
              TASymbol={selectedToken}
              TVOptions={TV_OPTIONS}
              exchangeName="binance"
              onChartRenderCb={onChartRender}
              isIntraDay
              instrumentClass={TVSymbols.class}
              minerName={selectedMiner}
            />
          </div>
          <div className="kaiko">
            <KaikoLogo />
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
          .left-panel {
            width: 300px;
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

          @media (min-width: 768px) and (max-width: 1440px) {
            .controls-card {
            }
            .pro-chart {
            }
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .container {
              flex-direction: column;
            }
            .left-panel {
              width: 100%;
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

MinerStatsPage.propTypes = {
  onChangeToken: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedMiner: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  supportedMiners: PropTypes.objectOf(PropTypes.string).isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
};
