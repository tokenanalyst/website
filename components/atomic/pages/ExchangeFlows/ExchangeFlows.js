import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import { makeTVSymbols } from './utils/makeTVSymbols';

import { ProChartContainer } from './ProChartContainer';
import { LeftSidePanel } from '../../organism/LeftSidePanel/LeftSidePanel';
import { TV_STUDIES, TV_OPTIONS } from './const';

const TV_INITIAL_DATA_RANGE = 90; // 90 days

const propsAreEqual = (prevProps, nextProps) =>
  isEqual(prevProps.TVSymbols, nextProps.TVSymbols);

const MemoProChartContainer = React.memo(ProChartContainer, propsAreEqual);

export const ExchangeFlowsPage = ({
  selectedExchange,
  selectedToken,
  tokensDb,
  onChangeToken,
}) => {
  const tvInstance = useRef(null);
  const [tvStudies, setTvStudies] = useState(
    JSON.parse(window.localStorage.getItem('ta_studies')) || TV_STUDIES
  );

  const exchangeSupport = tokensDb.getTokenSupportOnExchange(
    selectedToken,
    selectedExchange
  );

  const TVSymbols = makeTVSymbols(selectedToken, exchangeSupport);

  const onSelectStudy = study => {
    const updatedStudies = { ...tvStudies };

    if (tvInstance.current) {
      if (updatedStudies[study].isActive) {
        tvInstance.current.chart().removeEntity(updatedStudies[study].entityId);
        updatedStudies[study].entityId = null;
      } else {
        updatedStudies[study].entityId = tvInstance.current
          .chart()
          .createStudy(updatedStudies[study].tvName, false, true);
      }
      updatedStudies[study].isActive = !updatedStudies[study].isActive;
      setTvStudies(updatedStudies);
      window.localStorage.setItem('ta_studies', JSON.stringify(updatedStudies));
    }
  };

  const onChartRender = async tvWidget => {
    tvInstance.current = tvWidget;
    const now = moment().unix();
    const ninetyDaysAgo = moment()
      .subtract(TV_INITIAL_DATA_RANGE, 'days')
      .unix();
    await tvInstance.current.chart().setVisibleRange({
      from: ninetyDaysAgo,
      to: now,
    });

    Object.keys(tvStudies).map(study => {
      if (tvStudies[study].isActive) {
        tvStudies[study].entityId = tvInstance.current
          .chart()
          .createStudy(tvStudies[study].tvName, false, true);
      }
    });
    setTvStudies({ ...tvStudies });
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
