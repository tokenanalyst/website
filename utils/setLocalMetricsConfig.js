import { clearEntityId } from './clearEntityId';

export const setLocalMetricsConfig = (selectedToken, config) => {
  const currConfig = window.localStorage.getItem('ta_studies');
  if (currConfig) {
    return window.localStorage.setItem(
      'ta_studies',
      JSON.stringify({
        ...JSON.parse(currConfig),
        [selectedToken]: clearEntityId(config),
      })
    );
  }

  window.localStorage.setItem(
    'ta_studies',
    JSON.stringify({
      [selectedToken]: clearEntityId(config),
    })
  );
};
