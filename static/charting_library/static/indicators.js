/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */

const BTC_INDICATORS = [
  { title: 'Volume USD', symbol: '#VOLUMEUSD' },
  { title: 'Volume BTC', symbol: '#VOLUMEREAL' },
  { title: 'Volume Change USD', symbol: '#VOLUMECHANGEUSD' },
  { title: 'Volume Change', symbol: '#VOLUMECHANGEREAL' },
  { title: 'Gross Volume ', symbol: '#VOLUMEGROSSREALBTC' },
  { title: 'Average Size in Bytes', symbol: '#AVERAGESIZEBYTES' },
  { title: 'Average Satoshis per Byte', symbol: '#AVERAGESATOSHIS' },
  { title: 'UTXO < 1 day', symbol: '#<1D' },
  { title: 'UTXO 1-3 months', symbol: '#1-3M' },
  { title: 'UTXO 3-6 months', symbol: '#3-6M' },
  { title: 'UTXO 6-12 months', symbol: '#6-12M' },
  { title: 'UTXO 12-18 months', symbol: '#12-18M' },
  { title: 'UTXO 18-24 months', symbol: '#18-24M' },
  { title: 'UTXO 1 day-1 week', symbol: '#1D-1W' },
  { title: 'UTXO 1 week-1 month', symbol: '#1W-1M' },
  { title: 'UTXO 2 years-3 years', symbol: '#1Y-3Y' },
  { title: 'UTXO 3 years-5 years', symbol: '#3Y-5Y' },
  { title: 'UTXO 5 years-10 years', symbol: '#5Y-10Y' },
  { title: 'UTXO > 10 years', symbol: '#>10Y' },
];

const ETH_INDICATORS = [
  { title: 'Internal Volume', symbol: '#VOLUMEINTERNALREAL' },
  { title: 'Internal Volume USD', symbol: '#VOLUMEINTERNALUSD' },
  { title: 'External Volume', symbol: '#VOLUMEEXTERNALREAL' },
  { title: 'External Volume USD', symbol: '#VOLUMEEXTERNALUSD' },
  { title: 'Gross Volume', symbol: '#VOLUMEEXTERNALREAL' },
  { title: 'Gross Volume USD', symbol: '#VOLUMEEXTERNALUSD' },
  { title: 'Average Gas', symbol: '#AVERAGEGAS' },
  { title: 'Average Gas Price (Wei)', symbol: '#AVERAGEGASPRICEWEI' },
  { title: 'Total Daily Uncle Count', symbol: '#TOTALDAILTYUNCLECOUNT' },
  { title: 'Total Daily Uncle Percent', symbol: '#TOTALDAILTYUNCLEPERCENT' },
  { title: 'Total Daily Uncle Reward', symbol: '#TOTALDAILTYUNCLEREWARD' },
  {
    title: 'Total Daily Uncle Reward USD',
    symbol: '#TOTALDAILTYUNCLEREWARDUSD',
  },
];

const COMMON_INDICATORS = [
  { title: 'Transactions', symbol: '#TRANSACTIONS' },
  { title: 'Active Senders', symbol: '#ACTIVESENDERS' },
  { title: 'Active Recipients', symbol: '#ACTIVERECIPIENTS' },
  { title: 'Supply', symbol: '#SUPPLY' },
  { title: 'NVT', symbol: '#NVT' },
  { title: 'Market Cap', symbol: '#MARKETCAP' },
  { title: 'Total Fees', symbol: '#TOTALFEESREAL' },
  { title: 'Total Fees USD', symbol: '#TOTALFEESUSD' },
  { title: 'Average Fees', symbol: '#AVERAGEFEESREAL' },
  { title: 'Average Fees USD', symbol: '#AVERAGEFEESUSD' },
  { title: 'Total Daily Hashrate', symbol: '#TOTALDAILTYHASHRATE' },
  { title: 'Total Daily Block Count', symbol: '#TOTALDAILTYBLOCKCOUNT' },
  { title: 'Total Daily Block Reward', symbol: '#TOTALDAILTYBLOCKREWARD' },
  {
    title: 'Total Daily Block Reward USD',
    symbol: '#TOTALDAILTYBLOCKREWARDUSD',
  },
];

const ERC20_INDICATORS = [
  { title: 'ERC20 Volume', symbol: '#ERC20VOLUME' },
  { title: 'ERC20 Volume USD', symbol: '#ERC20VOLUMEUSD' },
];

const METRIC_INDICATORS = [
  ...BTC_INDICATORS,
  ...ETH_INDICATORS,
  ...COMMON_INDICATORS,
  ...ERC20_INDICATORS,
].map(metricIndicator => ({
  name: metricIndicator.title,
  metainfo: {
    _metainfoVersion: 40,
    id: `${metricIndicator.title}@tv-basicstudies-1`,
    scriptIdPart: '',
    name: metricIndicator.title,
    description: metricIndicator.title,
    shortDescription: metricIndicator.title,

    is_hidden_study: false,
    is_price_study: false,
    isCustomIndicator: true,

    plots: [{ id: 'plot_0', type: 'line' }],
    defaults: {
      styles: {
        plot_0: {
          linestyle: 0,
          visible: true,

          // Make the line thinner
          linewidth: 2,

          // Plot type is Line
          plottype: 2,

          // Show price line
          trackPrice: false,

          transparency: 40,

          color: '#3FCDAB',
        },
      },
      precision: 0,

      inputs: {},
    },
    styles: {
      plot_0: {
        // Output name will be displayed in the Style window
        title: metricIndicator.title,
        histogramBase: 0,
      },
    },
    inputs: [],
  },
  constructor: function() {
    this.init = function(context, inputCallback) {
      // console.warn(context);
      this._context = context;
      this._input = inputCallback;

      const symbol = metricIndicator.symbol;
      this._context.new_sym(
        symbol,
        PineJS.Std.period(this._context),
        PineJS.Std.period(this._context)
      );
    };

    this.main = function(context, inputCallback) {
      this._context = context;
      this._input = inputCallback;
      this._context.select_sym(1);

      const inFlow = PineJS.Std.open(this._context);
      const outFlow = PineJS.Std.close(this._context);

      return [inFlow, outFlow];
    };
  },
}));

__customIndicators = [
  {
    name: 'Flows',
    metainfo: {
      _metainfoVersion: 40,
      id: 'Flows@tv-basicstudies-1',
      scriptIdPart: '',
      name: 'Flows',
      description: 'Flows',
      shortDescription: 'In/Out Flows',

      is_hidden_study: false,
      is_price_study: false,
      isCustomIndicator: true,

      plots: [{ id: 'plot_0', type: 'line' }, { id: 'plot_1', type: 'line' }],
      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            visible: true,

            // Make the line thinner
            linewidth: 2,

            // Plot type is Line
            plottype: 2,

            // Show price line
            trackPrice: false,

            transparency: 40,

            color: '#3FCDAB',
          },
          plot_1: {
            linestyle: 0,
            visible: true,

            // Make the line thinner
            linewidth: 2,

            // Plot type is Line
            plottype: 2,

            // Show price line
            trackPrice: false,

            transparency: 40,

            color: '#FD5996',
          },
        },

        // Precision is set to one digit, e.g. 777.7
        precision: 0,

        inputs: {},
      },
      styles: {
        plot_0: {
          // Output name will be displayed in the Style window
          title: 'Flows value',
          histogramBase: 0,
        },
      },
      inputs: [],
    },

    constructor: function() {
      this.init = function(context, inputCallback) {
        // console.warn(context);
        this._context = context;
        this._input = inputCallback;

        const symbol = '#FLOWS';
        this._context.new_sym(
          symbol,
          PineJS.Std.period(this._context),
          PineJS.Std.period(this._context)
        );
      };

      this.main = function(context, inputCallback) {
        this._context = context;
        this._input = inputCallback;
        this._context.select_sym(1);

        const inFlow = PineJS.Std.open(this._context);
        const outFlow = PineJS.Std.close(this._context);

        return [inFlow, outFlow];
      };
    },
  },
  ...METRIC_INDICATORS,
  {
    name: 'NetFlows',
    metainfo: {
      _metainfoVersion: 40,
      id: 'NetFlows@tv-basicstudies-1',
      scriptIdPart: '',
      name: 'NetFlows',
      description: 'NetFlows',
      shortDescription: 'Net Flows',

      is_hidden_study: false,
      is_price_study: false,
      isCustomIndicator: true,

      plots: [
        { id: 'plot_0', type: 'line' },
        {
          id: 'plot_1',
          palette: 'palette_0',
          target: 'plot_0',
          type: 'colorer',
        },
      ],

      palettes: {
        palette_0: {
          colors: {
            0: {
              name: 'Color 0',
            },
            1: {
              name: 'Color 1',
            },
          },
          valToIndex: {
            100: 0,
            200: 1,
          },
        },
      },

      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            visible: true,

            // Make the line thinner
            linewidth: 4,

            // Plot type is Line
            plottype: 5,

            // Show price line
            trackPrice: false,

            transparency: 40,

            // Set the plotted line color to dark red
            color: '#3FCDAB',
          },
        },

        // Precision is set to one digit, e.g. 777.7
        precision: 0,

        palettes: {
          palette_0: {
            colors: {
              0: {
                color: '#3FCDAB',
                width: 1,
                style: 1,
              },
              1: {
                color: '#FD5996',
                width: 1,
                style: 1,
              },
            },
          },
        },

        inputs: {},
      },
      styles: {
        plot_0: {
          // Output name will be displayed in the Style window
          title: 'Net Flows value',
          histogramBase: 0,
        },
      },
      inputs: [],
    },

    constructor: function() {
      this.init = function(context, inputCallback) {
        this._context = context;
        this._input = inputCallback;
        // console.warn(context);

        const symbol = '#FLOWS';
        this._context.new_sym(
          symbol,
          PineJS.Std.period(this._context),
          PineJS.Std.period(this._context)
        );
      };

      this.main = function(context, inputCallback) {
        this._context = context;
        this._input = inputCallback;

        this._context.select_sym(1);

        const netFlowValue = PineJS.Std.volume(this._context);

        return [
          {
            value: netFlowValue,
          },
          netFlowValue < 0 ? 200 : 100,
        ];
      };
    },
  },
];
