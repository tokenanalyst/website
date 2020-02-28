import { useState, useEffect } from 'react';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

const TV_INITIAL_DATA_RANGE = 90; // 90 days

export const useActivateStudies = (
  tvStudies,
  tvInstance,
  setTvStudies,
  isMetricSupportReady
) => {
  const [isChartReady, setIsChartReady] = useState(false);

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

      const updatedTvStudies = cloneDeep(tvStudies);
      Object.keys(updatedTvStudies).forEach(study => {
        const { isActive, isSupported, tvIndicatorName } = updatedTvStudies[
          study
        ];

        if (isActive && isSupported) {
          updatedTvStudies[
            study
          ].entityId = tvInstance.current
            .chart()
            .createStudy(tvIndicatorName, false, true);
        }
      });
      setTvStudies(updatedTvStudies);
    };

    if (isChartReady && isMetricSupportReady) {
      activateStudies();
      setIsChartReady(false);
    }
  }, [
    tvStudies,
    tvInstance,
    isChartReady,
    isMetricSupportReady,
    setIsChartReady,
    setTvStudies,
  ]);

  return [setIsChartReady];
};
