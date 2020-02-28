export const KAIKO = 'kaiko';

export const TV_OPTIONS = {
  disabled_features: [
    'volume_force_overlay',
    'header_symbol_search',
    'header_indicators',
    'header_compare',
    'header_saveload',
    'create_volume_indicator_by_default',
  ],
};

export const EXCHANGE_STUDIES = {
  balances: {
    entityId: null,
    name: 'Balances',
    tvIndicatorName: 'Balances',
    isCustomStudy: true,
    isActive: false,
    isSupported: false,
    taEndpoint: 'exchange_balance_window_historical',
  },
  flows: {
    entityId: null,
    name: 'Flows',
    tvIndicatorName: 'Flows',
    isCustomStudy: true,
    isActive: true,
    isSupported: true,
    taEndpoint: 'exchange_flow_window_historical',
  },
  netFlows: {
    entityId: null,
    name: 'NetFlows',
    tvIndicatorName: 'NetFlows',
    isCustomStudy: true,
    isActive: false,
    isSupported: true,
    taEndpoint: 'exchange_flow_window_historical',
  },
  volume: {
    entityId: true,
    name: 'Volume',
    tvIndicatorName: 'Volume',
    isCustomStudy: false,
    isActive: true,
    isSupported: true,
  },
};

export const MINER_STUDIES = {
  hashrate: {
    entityId: null,
    name: 'Hashrate',
    tvIndicatorName: 'Hashrate',
    isCustomStudy: true,
    isActive: false,
    isSupported: false,
    taEndpoint: 'token_miner_hashrate_window_historical',
  },
  rewards: {
    entityId: null,
    name: 'Rewards',
    tvIndicatorName: 'Rewards',
    isCustomStudy: true,
    isActive: false,
    isSupported: false,
    taEndpoint: 'token_miner_rewards_window_historical',
  },
  // flows: {
  //   entityId: null,
  //   name: 'Flows',
  //   tvIndicatorName: 'Miner Flows',
  //   isCustomStudy: true,
  //   isActive: false,
  //   isSupported: false,
  //   taEndpoint: 'miner_flow_window_historical',
  // },
  balances: {
    entityId: null,
    name: 'Balances',
    tvIndicatorName: 'Miner Balances',
    isCustomStudy: true,
    isActive: false,
    isSupported: false,
    taEndpoint: 'miner_balance_window_historical',
  },
};

export const TRADINVIEW_DEFAULT_OPTIONS = {
  debug: false,
  container_id: 'tv_chart_container',
  library_path: '/static/charting_library/',
  locale: 'en',
  disabled_features: [
    'volume_force_overlay',
    'header_symbol_search',
    'header_indicators',
    'header_compare',
    'header_saveload',
  ],
  enabled_features: ['study_templates'],
  charts_storage_url: 'https://saveload.tradingview.com',
  charts_storage_api_version: '1.1',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  fullscreen: false,
  autosize: true,
  studies_overrides: {
    'volume.volume.color.0': '#FD5996',
    'volume.volume.color.1': '#3FCDAB',
  },
  indicators_file_name: './indicators.js',
  overrides: {
    // Candles styles
    'mainSeriesProperties.candleStyle.upColor': '#3FCDAB',
    'mainSeriesProperties.candleStyle.downColor': '#FD5996',
    'mainSeriesProperties.candleStyle.drawWick': true,
    'mainSeriesProperties.candleStyle.drawBorder': true,
    'mainSeriesProperties.candleStyle.borderColor': '#378658',
    'mainSeriesProperties.candleStyle.borderUpColor': '#3FCDAB',
    'mainSeriesProperties.candleStyle.borderDownColor': '#FD5996',
    'mainSeriesProperties.candleStyle.wickUpColor': '#3FCDAB',
    'mainSeriesProperties.candleStyle.wickDownColor': '#FD5996',
    'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,

    // Hollow Candles styles
    'mainSeriesProperties.hollowCandleStyle.upColor': '#3FCDAB',
    'mainSeriesProperties.hollowCandleStyle.downColor': '#FD5996',
    'mainSeriesProperties.hollowCandleStyle.drawWick': true,
    'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
    'mainSeriesProperties.hollowCandleStyle.borderColor': '#378658',
    'mainSeriesProperties.hollowCandleStyle.borderUpColor': '#3FCDAB',
    'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#FD5996',
    'mainSeriesProperties.hollowCandleStyle.wickColor': '#737375',

    // Heikin Ashi styles
    'mainSeriesProperties.haStyle.upColor': '#3FCDAB',
    'mainSeriesProperties.haStyle.downColor': '#FD5996',
    'mainSeriesProperties.haStyle.drawWick': true,
    'mainSeriesProperties.haStyle.drawBorder': true,
    'mainSeriesProperties.haStyle.borderColor': '#378658',
    'mainSeriesProperties.haStyle.borderUpColor': '#3FCDAB',
    'mainSeriesProperties.haStyle.borderDownColor': '#FD5996',
    'mainSeriesProperties.haStyle.wickColor': '#737375',
    'mainSeriesProperties.haStyle.barColorsOnPrevClose': false,

    // Bar styles
    'mainSeriesProperties.barStyle.upColor': '#3FCDAB',
    'mainSeriesProperties.barStyle.downColor': '#FD5996',
    'mainSeriesProperties.barStyle.barColorsOnPrevClose': false,
    'mainSeriesProperties.barStyle.dontDrawOpen': false,

    // Line styles
    'mainSeriesProperties.lineStyle.color': '#2196f3',
    'mainSeriesProperties.lineStyle.linewidth': 3,
    'mainSeriesProperties.lineStyle.priceSource': 'close',

    // Area styles
    'mainSeriesProperties.areaStyle.color1': '#2196f3',
    'mainSeriesProperties.areaStyle.color2': '#2196f3',
    'mainSeriesProperties.areaStyle.linecolor': '#2196f3',
    'mainSeriesProperties.areaStyle.linewidth': 1,
    'mainSeriesProperties.areaStyle.priceSource': 'close',

    // Baseline styles
    'mainSeriesProperties.baselineStyle.baselineColor':
      'rgba( 117, 134, 150, 1)',
    'mainSeriesProperties.baselineStyle.topFillColor1':
      'rgba( 38, 166, 154, 0.05)',
    'mainSeriesProperties.baselineStyle.topFillColor2':
      'rgba( 38, 166, 154, 0.05)',
    'mainSeriesProperties.baselineStyle.bottomFillColor1':
      'rgba( 239, 83, 80, 0.05)',
    'mainSeriesProperties.baselineStyle.bottomFillColor2':
      'rgba( 239, 83, 80, 0.05)',
    'mainSeriesProperties.baselineStyle.topLineColor': 'rgba( 38, 166, 154, 1)',
    'mainSeriesProperties.baselineStyle.bottomLineColor':
      'rgba( 239, 83, 80, 1)',
    'mainSeriesProperties.baselineStyle.topLineWidth': 3,
    'mainSeriesProperties.baselineStyle.bottomLineWidth': 3,
    'mainSeriesProperties.baselineStyle.priceSource': 'close',
    'mainSeriesProperties.baselineStyle.transparency': 50,
    'mainSeriesProperties.baselineStyle.baseLevelPercentage': 50,
    'paneProperties.vertGridProperties.color': '#E1ECF2',
    'paneProperties.horzGridProperties.color': '#E1ECF2',

    volumePaneSize: 'medium',
  },
};

export const KAIKO_TIME_FRAMES = [
  { text: '3y', resolution: '1D', description: '3 years' },
  { text: '1y', resolution: '1D', description: '1 year' },
  { text: '3m', resolution: '1D', description: '3 months' },
  { text: '1m', resolution: '1D', description: '1 month' },
  { text: '7d', resolution: '1D', description: '7 day' },
  { text: '3d', resolution: '1D', description: '3 days' },
  { text: '1d', resolution: '1D', description: '1 day' },
  { text: '6h', resolution: '120', description: '6 hours' },
  { text: '1h', resolution: '60', description: '1 hour' },
];
