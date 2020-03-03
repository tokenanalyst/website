import { DATA_WINDOWS } from '../../../constants/filters';
import { CURRENCIES } from '../../../constants/tokens';

const getSparklineWindow = (tokenData, dataWindow, flow) => {
  const { hours, days } = tokenData;
  const sparkLines = {
    [DATA_WINDOWS[0]]: [
      ...hours[flow].slice(hours[flow].length - 24, hours[flow].length),
    ],
    [DATA_WINDOWS[1]]: [
      ...days[flow].slice(days[flow].length - 7, hours[flow].length),
    ],
    [DATA_WINDOWS[2]]: [...days[flow]],
  };
  return sparkLines[dataWindow];
};

export const getTokenSnapshotData = (data, token, units, dataWindow) => ({
  price: data[token].token.price,
  change: data[token].token.price_pct_change,
  flows: [
    {
      label: 'Inflow',
      change:
        units === CURRENCIES.USD
          ? data[token].values[`data-window-${dataWindow}`]
              .inflow_usd_sum_pct_change
          : data[token].values[`data-window-${dataWindow}`]
              .inflow_sum_pct_change,
      value:
        units === CURRENCIES.USD
          ? data[token].values[`data-window-${dataWindow}`].inflow_usd_sum
          : data[token].values[`data-window-${dataWindow}`].inflow_sum,
      sparkline: getSparklineWindow(
        data[token].sparklines,
        dataWindow,
        'inflow'
      ),
    },
    {
      label: 'Outflow',
      change:
        units === CURRENCIES.USD
          ? data[token].values[`data-window-${dataWindow}`]
              .outflow_usd_sum_pct_change
          : data[token].values[`data-window-${dataWindow}`]
              .outflow_sum_pct_change,
      value:
        units === CURRENCIES.USD
          ? data[token].values[`data-window-${dataWindow}`].outflow_usd_sum
          : data[token].values[`data-window-${dataWindow}`].outflow_sum,
      sparkline: getSparklineWindow(
        data[token].sparklines,
        dataWindow,
        'outflow'
      ),
    },
  ],
});
