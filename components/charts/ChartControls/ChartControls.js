import PropTypes from 'prop-types';
import React from 'react';
import { Icon, HTMLSelect, Card } from '@blueprintjs/core';
import ReactGA from 'react-ga';

import { Skeleton } from '../../Skeleton';
import { CHART_TYPES } from '../../../constants/chartTypes';
import { STABLE_TOKENS, NATIVE_TOKENS } from '../../../constants/tokens';
import { TOKEN_NAMES } from '../../../constants/token-names';
import { COIN_IMAGES } from '../../../constants/image-paths';
import { colors } from '../../../constants/styles/colors';
import { TIME_WINDOWS } from '../../../constants/filters';

const CHART_DISPLAY = [
  {
    type: CHART_TYPES.line,
    label: 'Line',
    icon: 'timeline-line-chart',
  },
  {
    type: CHART_TYPES.area,
    label: 'Area',
    icon: 'timeline-area-chart',
  },
  {
    type: CHART_TYPES.histogram,
    label: 'Histogram',
    icon: 'timeline-bar-chart',
  },
];

const CHART_MODES = [
  {
    label: 'Linear',
    value: 0,
  },
  {
    label: 'Logarithmic',
    value: 1,
  },
];

const timeWindows = [
  {
    value: TIME_WINDOWS.oneDay,
    label: '1 Day',
  },
  {
    value: TIME_WINDOWS.oneHour,
    label: '1 Hour',
  },
];

export const ChartControls = ({
  dataSet,
  seriesType,
  token,
  chartMode,
  setDataSet,
  setSeriesType,
  setToken,
  setChartMode,
  setDataPoint,
  setTimeWindow,
  borderColor,
}) => {
  const selectedTimeWindow =
    (dataSet && dataSet[0] && dataSet[0].timeWindow) || TIME_WINDOWS.oneDay;

  return (
    <>
      <Card>
        <div className="controls">
          {setToken && (
            <div className="control">
              <div className="select-token">
                <div className="token-header">{TOKEN_NAMES[token]}</div>
                <div>
                  <img
                    src={`/static/png/coins/${COIN_IMAGES[token]}`}
                    className="token-icon"
                  />
                </div>
              </div>
              <div className="control-select-wrapper">
                <HTMLSelect
                  className="control-select"
                  onChange={e => {
                    setToken(e.target.value);
                    ReactGA.event({
                      category: 'User',
                      action: `Token view ${e.target.value}`,
                      label: `Tokens`,
                    });
                  }}
                  value={token}
                >
                  {[
                    ...Object.keys(NATIVE_TOKENS),
                    ...Object.keys(STABLE_TOKENS).filter(
                      token =>
                        token !== STABLE_TOKENS.USDT_OMNI &&
                        token !== STABLE_TOKENS.USDT
                    ),
                  ].map(token => (
                    <option key={token} value={token}>
                      {token}
                    </option>
                  ))}
                </HTMLSelect>
              </div>
            </div>
          )}
          {setSeriesType && (
            <div className="control">
              <div className="header">Chart Type</div>
              {CHART_DISPLAY.map(chartType => (
                <div
                  key={chartType.type}
                  className="option"
                  onClick={() => {
                    setSeriesType(chartType.type);
                    ReactGA.event({
                      category: 'User',
                      action: `Chart Type ${chartType.type}`,
                      label: `Chart Type`,
                    });
                  }}
                >
                  <div
                    className={
                      seriesType === chartType.type
                        ? 'button-selected'
                        : 'button'
                    }
                  >
                    {chartType.label}
                  </div>
                  <div className="icon">
                    <Icon
                      icon={chartType.icon}
                      iconSize={24}
                      color={
                        seriesType === chartType.type
                          ? `rgba(${colors.primaryGreen})`
                          : 'gray'
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="select-boxes">
            {setTimeWindow && (
              <div className="control">
                <div className="select-header">Time Interval</div>
                <div className="control-select-wrapper">
                  <HTMLSelect
                    value={selectedTimeWindow}
                    className="control-select"
                    onChange={e => {
                      setTimeWindow && setTimeWindow(e.target.value);
                      ReactGA.event({
                        category: 'User',
                        action: `Time Interval View ${e.target.value}`,
                        label: `Time Interval`,
                      });
                    }}
                  >
                    {timeWindows.map(timeWindow => (
                      <option key={timeWindow.value} value={timeWindow.value}>
                        {timeWindow.label}
                      </option>
                    ))}
                  </HTMLSelect>
                </div>
              </div>
            )}

            <div className="control">
              <div className="select-header">Data Points</div>
              <Skeleton isSkeleton={!dataSet}>
                <div className="control-select-wrapper">
                  {dataSet && (
                    <>
                      <HTMLSelect
                        className="control-select"
                        onChange={e => {
                          e.persist();
                          setDataSet(prev => ({
                            ...prev,
                            mainData: dataSet.reduce((acc, curr) => {
                              return [
                                ...acc,
                                {
                                  ...curr,
                                  visible: curr.dataPoint === e.target.value,
                                },
                              ];
                            }, []),
                          }));
                          setDataPoint && setDataPoint(e.target.value);
                          ReactGA.event({
                            category: 'User',
                            action: `Data Point View ${e.target.value}`,
                            label: `Data Points`,
                          });
                        }}
                      >
                        {dataSet &&
                          dataSet
                            .reduce(
                              (acc, { dataPoint, isAlwaysDisplayed }) =>
                                acc.indexOf(dataPoint) < 0 && !isAlwaysDisplayed
                                  ? [...acc, dataPoint]
                                  : acc,
                              []
                            )
                            .map(optionName => (
                              <option key={optionName} value={optionName}>
                                {optionName}
                              </option>
                            ))}
                      </HTMLSelect>
                    </>
                  )}
                </div>
              </Skeleton>
            </div>

            {setChartMode && (
              <div className="control">
                <div className="header">Chart Scaling</div>
                {CHART_MODES.map(cm => (
                  <div
                    key={cm.label}
                    className="option-scaling"
                    onClick={() => {
                      setChartMode(cm.value);
                      ReactGA.event({
                        category: 'Chart Mode',
                        action: `Chart Mode ${cm.label}`,
                        label: `Chart Mode`,
                      });
                    }}
                  >
                    <div
                      className={
                        chartMode === cm.value ? 'button-selected' : 'button'
                      }
                    >
                      {cm.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
      <style jsx>{`
        .controls {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 20px;
        }
        .control {
          padding-bottom: 20px;
        }
        .control-select-wrapper {
          height: 20px;
          width: 160px;
          padding-bottom: 20px;
        }
        .control-select {
          border: 1px solid rgba(151, 151, 151, 0.15);
          padding: 5px;
          border-radius: 2px;
          background-color: #ffffff;
          width: 160px;
        }
        .control-select:hover {
          background-color: rgba(156, 156, 156, 0.4);
        }
        .token-control {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 10px;
        }
        .token-icon {
          padding-bottom: 10px;
          width: 36px;
          height: 44px;
        }
        .header {
          padding-top: 10px;
          padding-bottom: 10px;
          font-weight: bold;
        }
        .select-token {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 10px;
          font-size: 18px;
          font-weight: bold;
        }
        .token-header {
          padding-bottom: 10px;
        }
        .select-header {
          padding-bottom: 15px;
          padding-top: 5px;
          font-weight: bold;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .option {
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 160px;
          justify-content: space-between;
        }
        .option-scaling {
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 160px;
          justify-content: space-between;
          height: 28px;
        }
        .button {
          margin-right: 10px;
        }
        .button-selected {
          font-weight: bold;
          border-bottom: 2px solid rgba(${colors.primaryGreen});
          margin-right: 10px;
        }
        .icon {
          padding-top: 5px;
        }
        @media (min-width: 768px) and (max-width: 1399px) {
          .controls {
            flex-direction: row;
            justify-content: center;
            max-width: 100%;
            padding: 10px;
            text-align: center;
          }
          .control {
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
          }
          .control-select-wrapper {
            height: 20px;
            width: 90%;
            padding-bottom: 10px;
          }
          .select-boxes {
            display: flex;
            min-width: 50%;
          }
          .select-header {
            padding-bottom: 15px;
            padding-top: 5px;
            font-weight: bold;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
          }
          .token-icon {
            width: 26px;
            height: 34px;
          }
        }
        @media (min-width: 320px) and (max-width: 767px) {
          .select-boxes {
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

ChartControls.ChartControls = {
  seriesType: PropTypes.string.isRequired,
  setSeriesType: PropTypes.func.isRequired,
  dataSet: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDataSet: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
  borderColor: PropTypes.string.isRequired,
  setDataPoint: PropTypes.func.isRequired,
};
