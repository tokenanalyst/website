/* eslint-disable camelcase */
export const makeCallParams = (baseParams, direction, from_date, to_date) => {
  const callParams = direction
    ? { ...baseParams, direction }
    : { ...baseParams };

  if (!from_date && !to_date) {
    return callParams;
  }
  if (!from_date) {
    return {
      ...callParams,
      to_date,
    };
  }
  if (!to_date) {
    return {
      ...callParams,
      from_date,
    };
  }
  return {
    ...callParams,
    from_date,
    to_date,
  };
};
