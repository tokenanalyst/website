import { clearEntityId } from './clearEntityId';

export const setLocalMetricsConfig = (key, config, storageKey) => {
  const currConfig = window.localStorage.getItem(storageKey);
  if (currConfig) {
    return window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        ...JSON.parse(currConfig),
        [key]: clearEntityId(config),
      })
    );
  }

  window.localStorage.setItem(
    storageKey,
    JSON.stringify({
      [key]: clearEntityId(config),
    })
  );
};
