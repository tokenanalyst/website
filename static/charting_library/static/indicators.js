/* eslint-disable func-names */
/* eslint-disable object-shorthand */
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

            // Set the plotted line color to dark red
            color: '#7CFC00',
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

            // Set the plotted line color to dark red
            color: '#FF0000',
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

        var symbol = '#FLOWS';
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

        var inFlow = PineJS.Std.open(this._context);
        var outFlow = PineJS.Std.close(this._context);

        return [inFlow, outFlow];
      };
    },
  },
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
            color: '#880000',
          },
        },

        // Precision is set to one digit, e.g. 777.7
        precision: 0,

        // bands: [
        //   {
        //     color: "#808080",
        //     linestyle: 2,
        //     linewidth: 1,
        //     visible: true,
        //     value: 80
        //   },
        //   {
        //     color: "#808080",
        //     linestyle: 2,
        //     linewidth: 1,
        //     visible: true,
        //     value: 20
        //   }
        // ],

        palettes: {
          palette_0: {
            colors: {
              0: {
                color: '#008000',
                width: 1,
                style: 1,
              },
              1: {
                color: '#FF0000',
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

        var symbol = '#NET_FLOWS';
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

        var netFlowValue = PineJS.Std.volume(this._context);

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
