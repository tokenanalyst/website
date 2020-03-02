export const getLocalMetricsConfig = (
  selectedToken,
  defaultConfig,
  storageKey
) => {
  const localMetricsConfig = JSON.parse(
    window.localStorage.getItem(storageKey)
  );

  return localMetricsConfig && localMetricsConfig[selectedToken]
    ? { ...localMetricsConfig[selectedToken] }
    : defaultConfig;
};
