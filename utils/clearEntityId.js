export const clearEntityId = c =>
  Object.keys(c).reduce((curr, metric) => {
    return { ...curr, [metric]: { ...c[metric], entityId: null } };
  }, {});
