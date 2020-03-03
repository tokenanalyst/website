import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import { makeTVSymbols } from '../../../../utils/makeTVSymbols';

import { ProChartContainer } from '../../organism/ProChartContainer';
import { LeftSidePanelMiners } from '../../organism/LeftSidePanelMiners';
import { MINER_STUDIES, TV_OPTIONS } from './const';
import {
  setLocalMetricsConfig,
  getLocalMetricsConfig,
  updateStudies,
} from '../../../../utils';
import { KaikoLogo } from '../../atoms/KaikoLogo';
import { useSupportedMetrics, useActivateStudies } from '../../../../hooks';
import { APP_STORAGE_KEYS } from '../../../../constants';
import { tokensDb } from '../../../../services/tokensDb';

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
  onChangeToken,
}) => {
  const tvInstance = useRef(null);

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

  const [tvStudies, setTvStudies, isMetricSupportReady] = useSupportedMetrics(
    selectedToken,
    selectedMiner,
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
    setTvStudies(studies => {
      const updatedStudies = updateStudies(study, studies, tvInstance.current);
      setLocalMetricsConfig(selectedToken, updatedStudies, LOCAL_STORAGE_KEY);
      return updatedStudies;
    });
  };

  const onChartRender = async tvWidget => {
    tvInstance.current = tvWidget;
    setIsChartReady(true);
  };

  return (
    <>
      <div className="container">
        <div className="left-panel">
          <div className="controls-box">
            <LeftSidePanelMiners
              selectedMiner={selectedMiner}
              selectedToken={selectedToken}
              studies={tvStudies}
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
          .controls-box {
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
            .controls-box {
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
            .controls-box {
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
};
