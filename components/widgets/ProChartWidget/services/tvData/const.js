/* eslint-disable import/prefer-default-export */
export const config = {
  kaiko: {
    intraday_multipliers: ['60'],
    supported_resolutions: ['60', '120', '180', '240', '1D'],
    makeTimeFrame: resolution => {
      if (!Number.isNaN(resolution)) {
        if (Number(resolution) < '60') {
          return `${resolution}m`;
        }
        if (resolution === '60') {
          return '1h';
        }
      }
      if (resolution === '1D') {
        return resolution;
      }
      if (resolution === 'D') {
        return '1d';
      }

      return null;
    },
  },
};
