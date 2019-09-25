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
  bitfinex: {
    // intraday_multipliers: ['1', '5', '15', '30', '60'],
    intraday_multipliers: ['60'],
    // intraday_multipliers: ['1'],
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
        return '1D';
      }

      return null;
    },
  },
  binance: {
    // intraday_multipliers: ['1', '3', '5', '15', '30', '60'],
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
        return '1d';
      }
      if (resolution === 'D') {
        return '1d';
      }
      if (resolution === '1W') {
        return '1w';
      }
      if (resolution === '1M') {
        return '1M';
      }

      return null;
    },
  },
};
