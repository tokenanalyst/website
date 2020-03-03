import cloneDeep from 'lodash/cloneDeep';

export const updateStudies = (study, studies, tvInstance) => {
  const updatedStudies = cloneDeep(studies);

  if (tvInstance) {
    try {
      if (updatedStudies[study].isActive && updatedStudies[study].entityId) {
        tvInstance.chart().removeEntity(updatedStudies[study].entityId);
        updatedStudies[study].entityId = null;
      } else {
        updatedStudies[study].entityId = tvInstance
          .chart()
          .createStudy(updatedStudies[study].tvIndicatorName, false, true);
      }
      updatedStudies[study].isActive = !updatedStudies[study].isActive;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Study not ready.');
    }
  }

  return updatedStudies;
};
