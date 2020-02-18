export const getLocalMetricsConfig = (selectedToken, defaultConfig) => {
  const localMetricsConfig = JSON.parse(
    window.localStorage.getItem('ta_studies')
  );

  return localMetricsConfig && localMetricsConfig[selectedToken]
    ? { ...localMetricsConfig[selectedToken] }
    : defaultConfig;
};
