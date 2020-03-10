/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext, useMemo } from 'react';
import { Card } from '@blueprintjs/core';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';

import { CollapsibleItem } from '../../molecules/CollapsibleItem';
import { METRICS, TOKEN_TYPES } from '../../../../constants/tokens';
import { LoginContext } from '../../../../contexts/Login';
import { tokensDb } from '../../../../services/tokensDb';
import { InsightsRegisterDialog } from '../../organism/InsightsRegisterDialog';

const getIndicator = token => {
  return METRICS[tokensDb.isNative(token) ? token : TOKEN_TYPES.ERC_20].filter(
    metric => metric.isDefaultCategory
  )[0].defaultIndicator;
};

const computeMetricClass = (isLoggedIn, value, selectedIndicator) => {
  if (value.requiresLogin) {
    if (isLoggedIn) {
      return selectedIndicator.name === value.indicator
        ? 'item-selected'
        : 'item';
    }
    return 'item-greyed';
  }

  return selectedIndicator.name === value.indicator ? 'item-selected' : 'item';
};

const isFreeMetric = (isLoggedIn, requiresLogin) =>
  isLoggedIn || !requiresLogin;

export const MetricsList = ({
  token,
  selectedIndicator,
  setSelectedIndicator,
}) => {
  const loginCtx = useContext(LoginContext);

  const [isRegisterDialogShown, setIsRegisterDialogShown] = useState(false);

  useMemo(() => {
    setSelectedIndicator({
      name: getIndicator(token),
      isIntraDay: false,
    });
  }, [setSelectedIndicator, token]);

  return (
    <>
      <div className="container">
        <InsightsRegisterDialog
          isOpen={isRegisterDialogShown}
          onClose={() => setIsRegisterDialogShown(false)}
        />
        <div className="card">
          <Card>
            <div className="header">Fundamentals:</div>
            {METRICS[tokensDb.isNative(token) ? token : TOKEN_TYPES.ERC_20].map(
              metric => (
                <CollapsibleItem
                  key={metric.category}
                  header={metric.category}
                  defaultIsOpen={metric.isDefaultCategory}
                  body={
                    <>
                      {metric.values.map(value => (
                        <div className="item-row" key={value.indicator}>
                          <span
                            className={computeMetricClass(
                              loginCtx.isLoggedIn,
                              value,
                              selectedIndicator
                            )}
                            onClick={() => {
                              ReactGA.event({
                                category: 'User',
                                action: `Metrics Page change data point ${value.indicator}`,
                                label: `Metrics Page`,
                              });
                              isFreeMetric(
                                loginCtx.isLoggedIn,
                                value.requiresLogin
                              )
                                ? setSelectedIndicator({
                                    name: value.indicator,
                                    isIntraDay: value.isIntraDay,
                                  })
                                : setIsRegisterDialogShown(true);
                            }}
                          >
                            {value.name}
                          </span>
                        </div>
                      ))}
                    </>
                  }
                />
              )
            )}
          </Card>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            max-height: 500px;
            overflow: scroll;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 5px;
          }
          .item-row {
            padding-top: 5px;
            padding-bottom: 5px;
            display: flex;
            align-items: center;
          }
          .item {
            margin-left: 5px;
            margin-bottom: 5px;
            cursor: pointer;
          }
          .item-greyed {
            margin-left: 5px;
            margin-bottom: 5px;
            cursor: pointer;
            opacity: 0.5;
            font-style: italic;
          }
          .item-selected {
            margin-left: 5px;
            margin-bottom: 5px;
            font-weight: bold;
            border-bottom: 2px solid rgba(63, 205, 171, 1);
            cursor: pointer;
          }
          .header {
            font-size: 16px;
            font-weight: bold;
            padding-bottom: 10px;
          }
          @media (min-width: 1800px) {
            .card {
              max-height: 650px;
            }
          }
        `}
      </style>
    </>
  );
};

MetricsList.propTypes = {
  token: PropTypes.string.isRequired,
  selectedIndicator: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  ).isRequired,
  setSelectedIndicator: PropTypes.func.isRequired,
};
