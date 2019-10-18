/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */

const METRIC_INDICATORS = [
  { title: 'Transactions', symbol: '#TRANSACTIONS' },
  { title: 'Volume USD', symbol: '#VOLUMEUSD' },
  { title: 'Volume Real', symbol: '#VOLUMEREAL' },
  { title: 'Volume Change USD', symbol: '#VOLUMECHANGEUSD' },
  { title: 'Volume CHANGE Real', symbol: '#VOLUMECHANGEREAL' },
  { title: 'Active Senders', symbol: '#ACTIVESENDERS' },
  { title: 'Active Recipients', symbol: '#ACTIVERECIPIENTS' },
  { title: 'Supply', symbol: '#SUPPLY' },
  { title: 'NVT', symbol: '#NVT' },
  { title: 'Market Cap', symbol: '#MARKETCAP' },
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
