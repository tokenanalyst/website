import { useState, useEffect } from 'react';
import { setLocalMetricsConfig, getLocalMetricsConfig } from '../utils';
import { tokensDb } from '../services/tokensDb';

export const useSupportedMetrics = (
  selectedToken,
  selectedEntity,
  localStorageParams
) => {
  const { defaultConfig, storageKey } = localStorageParams;
  const [isMetricSupportReady, setIsMetricSupportReady] = useState(false);
  const [tvStudies, setTvStudies] = useState(() =>
    getLocalMetricsConfig(selectedToken, defaultConfig, storageKey)
  );

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
            ].includes(selectedEntity.toLowerCase());
          }

          return {
            ...acc,
            [study]: {
              ...studies[study],
              isSupported,
            },
          };
        }, {});

        setLocalMetricsConfig(selectedToken, updatedStudies, storageKey);

        return updatedStudies;
      });
    };
    getSupportedMetrics();
    setIsMetricSupportReady(true);
  }, [selectedEntity, selectedToken, setIsMetricSupportReady, storageKey]);

  return [tvStudies, setTvStudies, isMetricSupportReady];
};
