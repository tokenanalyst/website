export const KAIKO = 'kaiko';

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
  studies_overrides: {},
  indicators_file_name: './indicators.js',
  overrides: {
    // paneProperties: { background: '#ffffff' },
    // 'mainSeriesProperties.showCountdown': true,
    // 'paneProperties.background': '#131722',
    // 'paneProperties.vertGridProperties.color': '#363c4e',
    // 'paneProperties.horzGridProperties.color': '#363c4e',
    // 'symbolWatermarkProperties.transparency': 90,
    // 'scalesProperties.textColor': '#AAA',
    // 'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
    // 'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',

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