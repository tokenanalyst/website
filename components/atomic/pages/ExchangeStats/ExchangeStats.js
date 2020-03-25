import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import { makeTVSymbols } from '../../../../utils/makeTVSymbols';

import { ProChartContainer } from '../../organism/ProChartContainer';
import { LeftSidePanelExchanges } from '../../organism/LeftSidePanelExchanges/LeftSidePanelExchanges';
import { EXCHANGE_STUDIES, TV_OPTIONS } from './const';
import {
  setLocalMetricsConfig,
  getLocalMetricsConfig,
  updateStudies,
} from '../../../../utils';
import { APP_STORAGE_KEYS } from '../../../../constants';
import { KaikoLogo } from '../../atoms/KaikoLogo';
import { useSupportedMetrics, useActivateStudies } from '../../../../hooks';
import { tokensDb } from '../../../../services/tokensDb';

const LOCAL_STORAGE_KEY = APP_STORAGE_KEYS.exchangeFlows;

const propsAreEqual = (prevProps, nextProps) => {
  return (
    isEqual(prevProps.TASymbol, nextProps.TASymbol) &&
    isEqual(prevProps.exchangeName, nextProps.exchangeName)
  );
};

const MemoProChartContainer = React.memo(ProChartContainer, propsAreEqual);

export const ExchangeStatsPage = ({
  selectedExchange,
  selectedToken,
  supportedExchanges,
  onChangeToken,
}) => {
  const tvInstance = useRef(null);

  const {
    tokens: {
      groupName: { NATIVE, STABLE, ERC20 },
    },
  } = tokensDb;

  const localStorageParams = {
    defaultConfig: EXCHANGE_STUDIES,
    storageKey: LOCAL_STORAGE_KEY,
  };

  const exchangeSupport = tokensDb.getTokenSupportForExchange(
    selectedToken,
    selectedExchange
  );

  const TVSymbols = makeTVSymbols(selectedToken, exchangeSupport);

  const [tvStudies, setTvStudies, isMetricSupportReady] = useSupportedMetrics(
    selectedToken,
    selectedExchange,
    localStorageParams
  );

  const [setIsChartReady] = useActivateStudies(
    tvStudies,
    tvInstance,
    setTvStudies,
    isMetricSupportReady
  );

  const nativeTokens = tokensDb.getTokensList(NATIVE, selectedExchange);
  const stableTokens = tokensDb.getTokensList(STABLE, selectedExchange);
  const erc20Tokens = tokensDb.getTokensList(ERC20, selectedExchange);

  const tokensList = [nativeTokens, stableTokens, erc20Tokens];

  useEffect(() => {
    getLocalMetricsConfig(selectedToken, EXCHANGE_STUDIES, LOCAL_STORAGE_KEY);
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
            <LeftSidePanelExchanges
              selectedExchange={selectedExchange}
              selectedToken={selectedToken}
              studies={tvStudies}
              tokensList={tokensList}
              supportedExchanges={supportedExchanges}
              onChangeToken={onChangeToken}
              onSelectStudy={onSelectStudy}
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
              exchangeName={selectedExchange}
              onChartRenderCb={onChartRender}
              isIntraDay
              instrumentClass={TVSymbols.class}
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
          .left-panel {
            width: 300px;
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

ExchangeStatsPage.propTypes = {
  onChangeToken: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  supportedExchanges: PropTypes.objectOf(PropTypes.string).isRequired,
};
