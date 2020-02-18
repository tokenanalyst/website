import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { makeTVSymbols } from '../../../../utils/makeTVSymbols';

import { ProChartContainer } from '../../organism/ProChartContainer';
import { LeftSidePanel } from '../../organism/LeftSidePanel/LeftSidePanel';
import { TV_STUDIES, TV_OPTIONS } from './const';
import {
  setLocalMetricsConfig,
  getLocalMetricsConfig,
} from '../../../../utils';

const TV_INITIAL_DATA_RANGE = 90; // 90 days

const propsAreEqual = (prevProps, nextProps) => {
  return isEqual(prevProps.TASymbol, nextProps.TASymbol);
};

const MemoProChartContainer = React.memo(ProChartContainer, propsAreEqual);

export const ExchangeFlowsPage = ({
  selectedExchange,
  selectedToken,
  tokensDb,
  onChangeToken,
}) => {
  const tvInstance = useRef(null);
  const [tvStudies, setTvStudies] = useState(() =>
    getLocalMetricsConfig(selectedToken, TV_STUDIES)
  );
  const [isChartReady, setIsChartReady] = useState(false);
  const [isMetricSupportReady, setIsMetricSupporReady] = useState(false);

  const exchangeSupport = tokensDb.getTokenSupportOnExchange(
    selectedToken,
    selectedExchange
  );

  const TVSymbols = makeTVSymbols(selectedToken, exchangeSupport);

  useEffect(() => {
    getLocalMetricsConfig(selectedToken, TV_STUDIES);
  }, [selectedToken]);

  useEffect(() => {
    const getSupportedMetrics = async () => {
      const supported = await tokensDb.getMetricSupportOnExchange();

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

        setLocalMetricsConfig(selectedToken, updatedStudies);

        return updatedStudies;
      });
    };
    getSupportedMetrics();
    setIsMetricSupporReady(true);
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
        const { isActive, isSupported, tvName } = tvStudies[study];

        if (isActive && isSupported) {
          tvStudies[study].entityId = tvInstance.current
            .chart()
            .createStudy(tvName, false, true);
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
              .createStudy(updatedStudies[study].tvName, false, true);
          }
          updatedStudies[study].isActive = !updatedStudies[study].isActive;
        } catch (err) {
          console.log('Study not ready.');
        }
      }

      setLocalMetricsConfig(selectedToken, updatedStudies);
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
            <LeftSidePanel
              selectedExchange={selectedExchange}
              selectedToken={selectedToken}
              studies={tvStudies}
              tokensDb={tokensDb}
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
              flex-direction: column;
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

ExchangeFlowsPage.propTypes = {
  onChangeToken: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
};
