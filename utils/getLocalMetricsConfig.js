export const getLocalMetricsConfig = (
  selectedToken,
  defaultConfig,
  storageKey
) => {
  const localMetricsConfig = JSON.parse(
    window.localStorage.getItem(storageKey)
  );

  if (!localMetricsConfig) {
    const localStorageItems = { ...localStorage };
    const keyParts = storageKey.split('_');
    keyParts.pop();

    Object.keys(localStorageItems).forEach(key => {
      if (key.includes(keyParts.join('_'))) {
        window.localStorage.removeItem(key);
      }
    });
  }

  return localMetricsConfig && localMetricsConfig[selectedToken]
    ? { ...localMetricsConfig[selectedToken] }
    : defaultConfig;
};
