import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { makeTVSymbols } from '../../../../utils/makeTVSymbols';

import { ProChartContainer } from '../../organism/ProChartContainer';
import { LeftSidePanelExchanges } from '../../organism/LeftSidePanelExchanges/LeftSidePanelExchanges';
import { EXCHANGE_STUDIES, TV_OPTIONS } from './const';
import {
  setLocalMetricsConfig,
  getLocalMetricsConfig,
} from '../../../../utils';
import { APP_STORAGE_KEYS } from '../../../../constants';
import { KaikoLogo } from '../../atoms/KaikoLogo';

const TV_INITIAL_DATA_RANGE = 90; // 90 days

const LOCAL_STORAGE_KEY = APP_STORAGE_KEYS.exchangeFlows;

const propsAreEqual = (prevProps, nextProps) => {
  return (
    isEqual(prevProps.TASymbol, nextProps.TASymbol) &&
    isEqual(prevProps.exchangeName, nextProps.exchangeName)
  );
};

const MemoProChartContainer = React.memo(ProChartContainer, propsAreEqual);

export const ExchangeFlowsPage = ({
  selectedExchange,
  selectedToken,
  supportedExchanges,
  tokensDb,
  onChangeToken,
}) => {
  const tvInstance = useRef(null);
  const [tvStudies, setTvStudies] = useState(() =>
    getLocalMetricsConfig(selectedToken, EXCHANGE_STUDIES, LOCAL_STORAGE_KEY)
  );
  const [isChartReady, setIsChartReady] = useState(false);
  const [isMetricSupportReady, setIsMetricSupportReady] = useState(false);

  const exchangeSupport = tokensDb.getTokenSupportForExchange(
    selectedToken,
    selectedExchange
  );

  const TVSymbols = makeTVSymbols(selectedToken, exchangeSupport);

  useEffect(() => {
    getLocalMetricsConfig(selectedToken, EXCHANGE_STUDIES, LOCAL_STORAGE_KEY);
  }, [selectedToken]);

  useEffect(() => {
    const getSupportedMetrics = async () => {
      const supported = await tokensDb.getMetricSupportForEntity();

      setTvStudies(studies => {
        const updatedStudies = Object.keys(studies).reduce((acc, study) => {
          if (study === 'volume') {
            return { ...acc, [study]: { ...studies[study] } };
          }

          const { taEndpoint } = studies[study];

          let isSupported = false;

          if (supported[taEndpoint][selectedToken.toLowerCase()]) {
            isSupported = supported[taEndpoint][
              selectedToken.toLowerCase()
            ].includes(selectedExchange.toLowerCase());
          }

          return {
            ...acc,
            [study]: {
              ...studies[study],
              isSupported,
            },
          };
        }, {});

        setLocalMetricsConfig(selectedToken, updatedStudies, LOCAL_STORAGE_KEY);

        return updatedStudies;
      });
    };
    getSupportedMetrics();
    setIsMetricSupportReady(true);
  }, [selectedToken, tokensDb, selectedExchange]);

  useEffect(() => {
    const activateStudies = async () => {
      const now = moment().unix();
      const ninetyDaysAgo = moment()
        .subtract(TV_INITIAL_DATA_RANGE, 'days')
        .unix();
      await tvInstance.current.chart().setVisibleRange({
        from: ninetyDaysAgo,
        to: now,
      });

      Object.keys(tvStudies).forEach(study => {
        const { isActive, isSupported, tvIndicatorName } = tvStudies[study];
        if (isActive && isSupported) {
          tvStudies[study].entityId = tvInstance.current
            .chart()
            .createStudy(tvIndicatorName, false, true);
        }
      });
      setTvStudies({ ...tvStudies });
    };

    if (isChartReady && isMetricSupportReady) {
      activateStudies();
      setIsChartReady(false);
    }
  }, [tvStudies, isChartReady, isMetricSupportReady]);

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
          <div className="controls-box">
            <LeftSidePanelExchanges
              selectedExchange={selectedExchange}
              selectedToken={selectedToken}
              studies={tvStudies}
              tokensDb={tokensDb}
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

ExchangeFlowsPage.propTypes = {
  onChangeToken: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  supportedExchanges: PropTypes.objectOf(PropTypes.string).isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
};
