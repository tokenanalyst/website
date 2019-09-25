webpackJsonp([6], {
  1031: function(e, t, i) {
    'use strict';
    (function(t) {
      function o() {}
      var n = i(823),
        a = n.PropertyPage,
        s = n.GreateTransformer,
        r = n.LessTransformer,
        l = n.ToIntTransformer,
        p = n.ToFloatTransformer,
        d = n.SimpleStringBinder,
        h = n.SimpleComboBinder,
        c = n.ColorBinding,
        u = n.BooleanBinder,
        b = n.SliderBinder,
        y = n.generateLabelElementStr,
        g = i(40),
        C = i(42).chartStyleStudyId,
        _ = i(1105).createPriceSourceEditor,
        m = i(105).NumericFormatter;
      inherit(o, a),
        (o.prototype.i18nCache = [
          window.t('Style'),
          window.t('Box size assignment method'),
          window.t('Color Bars Based on Previous Close'),
          window.t('Candles'),
          window.t('Borders'),
          window.t('Wick'),
          window.t('HLC Bars'),
          window.t('Price Source'),
          window.t('Type'),
          window.t(
            'Show real prices on price scale (instead of Heikin-Ashi price)'
          ),
          window.t('Up bars'),
          window.t('Down bars'),
          window.t('Projection up bars'),
          window.t('Projection down bars'),
          window.t('Projection Up Color'),
          window.t('Projection Down Color'),
          window.t('Line'),
          window.t('Fill'),
          window.t('Up Color'),
          window.t('Down Color'),
          window.t('Traditional'),
          window.t('ATR Length'),
          window.t('Number Of Line'),
          window.t('Reversal Amount'),
          window.t('Box Size'),
          window.t('Phantom Bars'),
        ]),
        (o.prototype.getInputTitle = function(e, t) {
          return 'style' === e
            ? window.t('Box size assignment method')
            : 'boxSize' === e
            ? window.t('Box Size')
            : t.inputInfo
            ? window.t(t.inputInfo[e].name.value())
            : e.toLowerCase().replace(/\b\w/g, function(e) {
                return e.toUpperCase();
              });
        }),
        (o.prototype.prepareLayoutImpl = function(e, t, i, o) {
          function n(t) {
            b.refreshStateControls(c, e.inputs, i.inputs);
          }
          function a(e) {
            return new m().format(e);
          }
          var c, b, _, w, T, f, v, L, k, S, x, P, B, E, R, F, I, D, V, A, W;
          for (o = o || {}, c = {}, b = this, _ = 0; _ < e.inputs.length; _++) {
            (w = e.inputs[_]),
              (T = w.id),
              (v =
                e.name === C(g.STYLE_RENKO) ||
                e.name === C(g.STYLE_KAGI) ||
                e.name === C(g.STYLE_PB)),
              e.name === C(g.STYLE_PNF) &&
                'sources' === T &&
                (w.options = w.options.filter(function(e) {
                  return 'HL' === e || 'Close' === e;
                }));
            try {
              f = this.getInputTitle(T, i);
            } catch (e) {
              continue;
            }
            if (
              !(
                (e.name === C(g.STYLE_RENKO) && 'wicks' === T) ||
                (e.name === C(g.STYLE_RANGE) && 'range' === T)
              ) &&
              (!v || 'source' !== T)
            ) {
              if (
                ((L = $('<tr/>')),
                (S = this._labelToId(T)),
                e.name === C(g.STYLE_RANGE) &&
                  'phantomBars' === T &&
                  ((k = $('<table><tr></tr></table>')), k.appendTo(L)),
                w.isHidden || L.appendTo(t),
                e.name === C(g.STYLE_RANGE) &&
                  'phantomBars' === T &&
                  (L = k.find('tr')),
                (x = $(
                  '<td' +
                    (o.nameColspan
                      ? ' colspan = "' + o.nameColspan + '"'
                      : '') +
                    '/>'
                )),
                x.addClass('propertypage-name-label'),
                x.html(y(f, S)),
                (e.name === C(g.STYLE_RANGE) && 'phantomBars' === T) ||
                  x.appendTo(L),
                (P = $(
                  '<td' +
                    (o.valueColspan
                      ? ' colspan = "' + o.valueColspan + '"'
                      : '') +
                    '/>'
                )),
                P.appendTo(L),
                (B = null),
                w.options)
              )
                for (
                  B = $("<select id='" + S + "' />"), E = 0;
                  E < w.options.length;
                  E++
                )
                  (R = w.options[E]),
                    $(
                      "<option value='" + R + "'>" + $.t(R) + '</option>'
                    ).appendTo(B);
              else
                (F = 'bool' === w.type ? 'checkbox' : 'text'),
                  (B = $("<input id='" + S + "' type='" + F + "' />"));
              B.appendTo(P),
                (e.name === C(g.STYLE_RANGE) && 'phantomBars' === T) ||
                  B.css('width', '100px'),
                e.name === C(g.STYLE_RANGE) &&
                  'phantomBars' === T &&
                  x.appendTo(L),
                (I = 'Change ' + f),
                w.options
                  ? this.bindControl(
                      new h(B, i.inputs[T], null, !0, this.model(), I)
                    )
                  : 'integer' === w.type
                  ? ((D = [l(w.defval)]),
                    w.min && D.push(s(w.min)),
                    w.max && D.push(r(w.max)),
                    this.bindControl(
                      new d(B, i.inputs[T], D, !1, this.model(), I)
                    ),
                    B.addClass('ticker'))
                  : 'float' === w.type
                  ? ((D = [p(w.defval)]),
                    w.min &&
                      ((((e.id === C(g.STYLE_RENKO) ||
                        e.id === C(g.STYLE_PNF)) &&
                        'boxSize' === w.id) ||
                        (e.id === C(g.STYLE_KAGI) &&
                          'reversalAmount' === w.id)) &&
                        null !==
                          (A = this._model
                            .model()
                            .mainSeries()
                            .symbolInfo()) &&
                        (V = A.minmov / A.pricescale),
                      D.push(s(V || w.min))),
                    w.max && D.push(r(w.max)),
                    (W = new d(B, i.inputs[T], D, !1, this.model(), I)),
                    W.addFormatter(a),
                    this.bindControl(W),
                    B.addClass('ticker'))
                  : 'text' === w.type
                  ? this.bindControl(
                      new d(
                        B,
                        this._property.inputs[T],
                        null,
                        !1,
                        this.model(),
                        I
                      )
                    )
                  : 'bool' === w.type &&
                    this.bindControl(
                      new u(B, i.inputs[T], !0, this.model(), I)
                    ),
                B.change(n),
                (c[w.id] = L);
            }
          }
          this.refreshStateControls(c, e.inputs, i.inputs);
        }),
        (o.prototype.getMetaInfo = function(e) {
          var t,
            i = this._model.m_model._studiesMetaData;
          for (t = 0; t < i.length; t++) if (i[t].id === e) return i[t];
          return null;
        }),
        (o.prototype._isShowStyleSwitcher = function() {
          return !1;
        }),
        (o.prototype._isJapaneseChartsAvailable = function() {
          return !0;
        }),
        (o.prototype._prepareSeriesStyleLayout = function(e, i, o, n) {
          var a,
            p,
            y,
            C,
            m,
            w,
            T,
            f,
            v,
            L,
            k,
            S,
            x,
            P,
            B,
            E,
            R,
            F,
            I,
            D,
            V,
            A,
            W,
            M,
            O,
            z,
            H,
            N,
            G,
            j,
            q,
            U,
            Y,
            K,
            J,
            Z,
            Q,
            X,
            ee,
            te,
            ie,
            oe,
            ne,
            ae,
            se,
            re,
            le,
            pe,
            de,
            he,
            ce,
            ue,
            be,
            ye,
            ge,
            Ce,
            _e = $('<tbody>').appendTo(e),
            $e = (this._candlesColorerTbody = $('<tbody>').appendTo(i)),
            me = (this._barsColorerTbody = $('<tbody>').appendTo(i)),
            we = (this._haColorerTbody = $('<tbody>').appendTo(i)),
            Te = (this._candlesTbody = $('<tbody>').appendTo(o)),
            fe = (this._hollowCandlesTbody = $('<tbody>').appendTo(o)),
            ve = (this._haTbody = $('<tbody>').appendTo(o)),
            Le = (this._barsTbody = $('<tbody>').appendTo(o)),
            ke = (this._lineTbody = $('<tbody>').appendTo(o)),
            Se = (this._areaTbody = $('<tbody>').appendTo(o)),
            xe = (this._baselineTbody = $('<tbody>').appendTo(o));
          this._isShowStyleSwitcher() &&
            ((p = this.addLabeledRow(_e, 'Style')),
            (y = $(document.createElement('td')).appendTo(p)),
            y.addClass('property-wide-select'),
            (a = $(document.createElement('select'))),
            $(
              '<option value=' + g.STYLE_BARS + '>' + $.t('Bars') + '</option>'
            ).appendTo(a),
            $(
              '<option value=' +
                g.STYLE_CANDLES +
                '>' +
                $.t('Candles') +
                '</option>'
            ).appendTo(a),
            $(
              '<option value=' +
                g.STYLE_HOLLOW_CANDLES +
                '>' +
                $.t('Hollow Candles') +
                '</option>'
            ).appendTo(a),
            this._isJapaneseChartsAvailable() &&
              $(
                '<option value=' +
                  g.STYLE_HEIKEN_ASHI +
                  '>' +
                  $.t('Heikin Ashi') +
                  '</option>'
              ).appendTo(a),
            $(
              '<option value=' + g.STYLE_LINE + '>' + $.t('Line') + '</option>'
            ).appendTo(a),
            $(
              '<option value=' + g.STYLE_AREA + '>' + $.t('Area') + '</option>'
            ).appendTo(a),
            $(
              '<option value=' +
                g.STYLE_BASELINE +
                '>' +
                $.t('Baseline') +
                '</option>'
            ).appendTo(a),
            a.css('width', '100px').appendTo(y),
            this.switchStyle(),
            this.bindControl(
              new h(
                a,
                n.style,
                parseInt,
                !0,
                this.model(),
                'Change Series Style'
              )
            )),
            n.style.listeners().subscribe(this, this.switchStyle),
            (C = this.createColorPicker()),
            (m = this.createColorPicker()),
            (w = this.createColorPicker()),
            (T = this.createColorPicker()),
            (f = this.createColorPicker()),
            (v = this.createColorPicker()),
            (L = $("<input type='checkbox' class='visibility-switch'/>").data(
              'hides',
              $(f).add(v)
            )),
            (k = $("<input type='checkbox' class='visibility-switch'/>").data(
              'hides',
              $(w).add(T)
            )),
            (S = $("<input type='checkbox'/>")),
            (x = this.addLabeledRow(
              $e,
              'Color Bars Based on Previous Close',
              S
            )),
            $('<td>')
              .append(S)
              .prependTo(x),
            (x = this.addLabeledRow(Te, 'Candles')),
            $('<td>').prependTo(x),
            $('<td>')
              .append(C)
              .appendTo(x),
            $('<td>')
              .append(m)
              .appendTo(x),
            (x = this.addLabeledRow(Te, 'Borders', L)),
            $('<td>')
              .append(L)
              .prependTo(x),
            $('<td>')
              .append(f)
              .appendTo(x),
            $('<td>')
              .append(v)
              .appendTo(x),
            (x = this.addLabeledRow(Te, 'Wick', k)),
            $('<td>')
              .append(k)
              .prependTo(x),
            $('<td>')
              .append(w)
              .appendTo(x),
            $('<td>')
              .append(T)
              .appendTo(x),
            this.bindControl(
              new c(
                C,
                n.candleStyle.upColor,
                !0,
                this.model(),
                'Change Candle Up Color'
              )
            ),
            this.bindControl(
              new c(
                m,
                n.candleStyle.downColor,
                !0,
                this.model(),
                'Change Candle Down Color'
              )
            ),
            this.bindControl(
              new u(
                k,
                n.candleStyle.drawWick,
                !0,
                this.model(),
                'Change Candle Wick Visibility'
              )
            ),
            this.bindControl(
              new c(
                w,
                n.candleStyle.wickUpColor,
                !0,
                this.model(),
                'Change Candle Wick Up Color'
              )
            ),
            this.bindControl(
              new c(
                T,
                n.candleStyle.wickDownColor,
                !0,
                this.model(),
                'Change Candle Wick Down Color'
              )
            ),
            this.bindControl(
              new u(
                L,
                n.candleStyle.drawBorder,
                !0,
                this.model(),
                'Change Candle Border Visibility'
              )
            ),
            this.bindControl(
              new c(
                f,
                n.candleStyle.borderUpColor,
                !0,
                this.model(),
                'Change Candle Up Border Color'
              )
            ),
            this.bindControl(
              new c(
                v,
                n.candleStyle.borderDownColor,
                !0,
                this.model(),
                'Change Candle Down Border Color'
              )
            ),
            this.bindControl(
              new u(
                S,
                n.candleStyle.barColorsOnPrevClose,
                !0,
                this.model(),
                'Change Color Bars Based on Previous Close'
              )
            ),
            (P = this.createColorPicker()),
            (B = this.createColorPicker()),
            (E = this.createColorPicker()),
            (R = this.createColorPicker()),
            (F = this.createColorPicker()),
            (I = this.createColorPicker()),
            (D = $("<input type='checkbox' class='visibility-switch'/>").data(
              'hides',
              $(F).add(I)
            )),
            (V = $("<input type='checkbox' class='visibility-switch'/>").data(
              'hides',
              $(E).add(R)
            )),
            (x = this.addLabeledRow(fe, 'Candles')),
            $('<td>').prependTo(x),
            $('<td>')
              .append(P)
              .appendTo(x),
            $('<td>')
              .append(B)
              .appendTo(x),
            (x = this.addLabeledRow(fe, 'Borders', D)),
            $('<td>')
              .append(D)
              .prependTo(x),
            $('<td>')
              .append(F)
              .appendTo(x),
            $('<td>')
              .append(I)
              .appendTo(x),
            (x = this.addLabeledRow(fe, 'Wick', V)),
            $('<td>')
              .append(V)
              .prependTo(x),
            $('<td>')
              .append(E)
              .appendTo(x),
            $('<td>')
              .append(R)
              .appendTo(x),
            this.bindControl(
              new c(
                P,
                n.hollowCandleStyle.upColor,
                !0,
                this.model(),
                'Change Hollow Candle Up Color'
              )
            ),
            this.bindControl(
              new c(
                B,
                n.hollowCandleStyle.downColor,
                !0,
                this.model(),
                'Change Hollow Candle Down Color'
              )
            ),
            this.bindControl(
              new u(
                V,
                n.hollowCandleStyle.drawWick,
                !0,
                this.model(),
                'Change Hollow Candle Wick Visibility'
              )
            ),
            this.bindControl(
              new c(
                E,
                n.hollowCandleStyle.wickUpColor,
                !0,
                this.model(),
                'Change Hollow Candle Wick Up Color'
              )
            ),
            this.bindControl(
              new c(
                R,
                n.hollowCandleStyle.wickDownColor,
                !0,
                this.model(),
                'Change Hollow Candle Down Wick Color'
              )
            ),
            this.bindControl(
              new u(
                D,
                n.hollowCandleStyle.drawBorder,
                !0,
                this.model(),
                'Change Hollow Candle Border Visibility'
              )
            ),
            this.bindControl(
              new c(
                F,
                n.hollowCandleStyle.borderUpColor,
                !0,
                this.model(),
                'Change Hollow Candle Up Border Color'
              )
            ),
            this.bindControl(
              new c(
                I,
                n.hollowCandleStyle.borderDownColor,
                !0,
                this.model(),
                'Change Hollow Candle Down Border Color'
              )
            ),
            (A = $("<input type='checkbox'/>")),
            (x = this.addLabeledRow(
              me,
              'Color Bars Based on Previous Close',
              A
            )),
            $('<td>')
              .append(A)
              .prependTo(x),
            (W = $("<input type='checkbox'/>")),
            (x = this.addLabeledRow(me, 'HLC Bars', W)),
            $('<td>')
              .append(W)
              .prependTo(x),
            (M = this.addColorPickerRow(Le, 'Up Color')),
            (O = this.addColorPickerRow(Le, 'Down Color')),
            this.bindControl(
              new c(
                M,
                n.barStyle.upColor,
                !0,
                this.model(),
                'Change Bar Up Color'
              )
            ),
            this.bindControl(
              new c(
                O,
                n.barStyle.downColor,
                !0,
                this.model(),
                'Change Bar Down Color'
              )
            ),
            this.bindControl(
              new u(
                A,
                n.barStyle.barColorsOnPrevClose,
                !0,
                this.model(),
                'Change Color Bars Based on Previous Close'
              )
            ),
            this.bindControl(
              new u(
                W,
                n.barStyle.dontDrawOpen,
                !0,
                this.model(),
                'Change HLC Bars'
              )
            ),
            (z = _()),
            (x = this.addLabeledRow(ke, 'Price Source')),
            $('<td colspan="3">')
              .append(z)
              .appendTo(x),
            (H = this.addLabeledRow(ke, 'Type')),
            (N = $('<td colspan="3">').appendTo(H)),
            N.addClass('property-wide-select'),
            (G = $(document.createElement('select'))),
            $(
              '<option value=' +
                g.STYLE_LINE_TYPE_SIMPLE +
                '>' +
                $.t('Simple') +
                '</option>'
            ).appendTo(G),
            $(
              '<option value=' +
                g.STYLE_LINE_TYPE_MARKERS +
                '>' +
                $.t('With Markers') +
                '</option>'
            ).appendTo(G),
            $(
              '<option value=' +
                g.STYLE_LINE_TYPE_STEP +
                '>' +
                $.t('Step') +
                '</option>'
            ).appendTo(G),
            G.appendTo(N),
            (x = this.addLabeledRow(ke, 'Line')),
            (j = this.createColorPicker()),
            (q = this.createLineWidthEditor()),
            $('<td>')
              .append(j)
              .appendTo(x),
            $('<td>')
              .append(q)
              .appendTo(x),
            this.bindControl(
              new h(
                z,
                n.lineStyle.priceSource,
                null,
                !0,
                this.model(),
                'Change Price Source'
              )
            ),
            this.bindControl(
              new h(
                G,
                n.lineStyle.styleType,
                parseInt,
                !0,
                this.model(),
                'Change Line Type'
              )
            ),
            this.bindControl(
              new c(j, n.lineStyle.color, !0, this.model(), 'Change Line Color')
            ),
            this.bindControl(
              new b(
                q,
                n.lineStyle.linewidth,
                !0,
                this.model(),
                'Change Line Width'
              )
            ),
            n.haStyle &&
              ((U = this.createColorPicker()),
              (Y = this.createColorPicker()),
              (K = this.createColorPicker()),
              (J = this.createColorPicker()),
              (Z = this.createColorPicker()),
              (Q = this.createColorPicker()),
              (X = $("<input type='checkbox' class='visibility-switch'/>").data(
                'hides',
                $(Z).add(Q)
              )),
              (ee = $(
                "<input type='checkbox' class='visibility-switch'/>"
              ).data('hides', $(K).add(J))),
              (te = $("<input type='checkbox'/>")),
              (x = this.addLabeledRow(
                we,
                $.t('Color Bars Based on Previous Close'),
                te
              )),
              $('<td>')
                .append(te)
                .prependTo(x),
              (x = this.addLabeledRow(ve, $.t('Candles'))),
              $('<td>').prependTo(x),
              $('<td>')
                .append(U)
                .appendTo(x),
              $('<td>')
                .append(Y)
                .appendTo(x),
              (x = this.addLabeledRow(ve, $.t('Borders'), X)),
              $('<td>')
                .append(X)
                .prependTo(x),
              $('<td>')
                .append(Z)
                .appendTo(x),
              $('<td>')
                .append(Q)
                .appendTo(x),
              (x = this.addLabeledRow(ve, $.t('Wick'), ee)),
              $('<td>')
                .append(ee)
                .prependTo(x),
              $('<td>')
                .append(K)
                .appendTo(x),
              $('<td>')
                .append(J)
                .appendTo(x),
              this.bindControl(
                new c(
                  U,
                  n.haStyle.upColor,
                  !0,
                  this.model(),
                  'Change Heikin Ashi Up Color'
                )
              ),
              this.bindControl(
                new c(
                  Y,
                  n.haStyle.downColor,
                  !0,
                  this.model(),
                  'Change Heikin Ashi Down Color'
                )
              ),
              this.bindControl(
                new u(
                  ee,
                  n.haStyle.drawWick,
                  !0,
                  this.model(),
                  'Change Heikin Ashi Wick Visibility'
                )
              ),
              this.bindControl(
                new c(
                  K,
                  n.haStyle.wickUpColor,
                  !0,
                  this.model(),
                  'Change Heikin Ashi Wick Up Color'
                )
              ),
              this.bindControl(
                new c(
                  J,
                  n.haStyle.wickDownColor,
                  !0,
                  this.model(),
                  'Change Heikin Ashi Wick Down Color'
                )
              ),
              this.bindControl(
                new u(
                  X,
                  n.haStyle.drawBorder,
                  !0,
                  this.model(),
                  'Change Heikin Ashi Border Visibility'
                )
              ),
              this.bindControl(
                new c(
                  Z,
                  n.haStyle.borderUpColor,
                  !0,
                  this.model(),
                  'Change Heikin Ashi Up Border Color'
                )
              ),
              this.bindControl(
                new c(
                  Q,
                  n.haStyle.borderDownColor,
                  !0,
                  this.model(),
                  'Change Heikin Ashi Down Border Color'
                )
              ),
              this.bindControl(
                new u(
                  te,
                  n.haStyle.barColorsOnPrevClose,
                  !0,
                  this.model(),
                  'Change Color Bars Based on Previous Close'
                )
              )),
            this._isJapaneseChartsAvailable() &&
              t.enabled('japanese_chart_styles'),
            (ie = _()),
            (x = this.addLabeledRow(Se, 'Price Source')),
            $('<td colspan="3">')
              .appendTo(x)
              .append(ie),
            (oe = this.createColorPicker()),
            (ne = this.createLineWidthEditor()),
            (x = this.addLabeledRow(Se, 'Line')),
            $('<td>')
              .appendTo(x)
              .append(oe),
            $('<td colspan="2">')
              .appendTo(x)
              .append(ne),
            (ae = this.createColorPicker()),
            (se = this.createColorPicker()),
            (x = this.addLabeledRow(Se, 'Fill')),
            $('<td>')
              .appendTo(x)
              .append(ae),
            $('<td>')
              .appendTo(x)
              .append(se),
            this.bindControl(
              new h(
                ie,
                n.areaStyle.priceSource,
                null,
                !0,
                this.model(),
                'Change Price Source'
              )
            ),
            this.bindControl(
              new c(
                oe,
                n.areaStyle.linecolor,
                !0,
                this.model(),
                'Change Line Color'
              )
            ),
            this.bindControl(
              new b(
                ne,
                n.areaStyle.linewidth,
                !0,
                this.model(),
                'Change Line Width'
              )
            ),
            this.bindControl(
              new c(
                ae,
                n.areaStyle.color1,
                !0,
                this.model(),
                'Change Line Color',
                n.areaStyle.transparency
              )
            ),
            this.bindControl(
              new c(
                se,
                n.areaStyle.color2,
                !0,
                this.model(),
                'Change Line Color',
                n.areaStyle.transparency
              )
            ),
            (re = _()),
            (x = this.addLabeledRow(xe, window.t('Price Source'))),
            $('<td colspan="3">')
              .appendTo(x)
              .append(re),
            this.bindControl(
              new h(
                re,
                n.baselineStyle.priceSource,
                null,
                !0,
                this.model(),
                'Change Price Source'
              )
            ),
            (le = this.createColorPicker()),
            (pe = this.createLineWidthEditor()),
            (x = this.addLabeledRow(xe, window.t('Top Line'))),
            $('<td>')
              .appendTo(x)
              .append(le),
            $('<td>')
              .appendTo(x)
              .append(pe),
            this.bindControl(
              new c(
                le,
                n.baselineStyle.topLineColor,
                !0,
                this.model(),
                'Change Top Line Color'
              )
            ),
            this.bindControl(
              new b(
                pe,
                n.baselineStyle.topLineWidth,
                !0,
                this.model(),
                'Change Top Line Width'
              )
            ),
            (de = this.createColorPicker()),
            (he = this.createLineWidthEditor()),
            (x = this.addLabeledRow(xe, window.t('Bottom Line'))),
            $('<td>')
              .appendTo(x)
              .append(de),
            $('<td>')
              .appendTo(x)
              .append(he),
            this.bindControl(
              new c(
                de,
                n.baselineStyle.bottomLineColor,
                !0,
                this.model(),
                'Change Bottom Line Color'
              )
            ),
            this.bindControl(
              new b(
                he,
                n.baselineStyle.bottomLineWidth,
                !0,
                this.model(),
                'Change Bottom Line Width'
              )
            ),
            (ce = this.createColorPicker()),
            (ue = this.createColorPicker()),
            (x = this.addLabeledRow(xe, window.t('Fill Top Area'))),
            $('<td>')
              .appendTo(x)
              .append(ce),
            $('<td>')
              .appendTo(x)
              .append(ue),
            this.bindControl(
              new c(
                ce,
                n.baselineStyle.topFillColor1,
                !0,
                this.model(),
                'Change Fill Top Area Color 1'
              ),
              n.baselineStyle.transparency
            ),
            this.bindControl(
              new c(
                ue,
                n.baselineStyle.topFillColor2,
                !0,
                this.model(),
                'Change Fill Top Area Color 2'
              ),
              n.baselineStyle.transparency
            ),
            (be = this.createColorPicker()),
            (ye = this.createColorPicker()),
            (x = this.addLabeledRow(xe, window.t('Fill Bottom Area'))),
            $('<td>')
              .appendTo(x)
              .append(be),
            $('<td>')
              .appendTo(x)
              .append(ye),
            this.bindControl(
              new c(
                be,
                n.baselineStyle.bottomFillColor1,
                !0,
                this.model(),
                'Change Fill Bottom Area Color 1'
              ),
              n.baselineStyle.transparency
            ),
            this.bindControl(
              new c(
                ye,
                n.baselineStyle.bottomFillColor2,
                !0,
                this.model(),
                'Change Fill Bottom Area Color 2'
              ),
              n.baselineStyle.transparency
            ),
            (x = this.addLabeledRow(xe, window.t('Base Level'))),
            (ge = $('<input type="text" class="ticker">')),
            $('<td colspan="2">')
              .appendTo(x)
              .append($('<span></span>').append(ge))
              .append($('<span class="percents-label">%</span>')),
            (Ce = [
              l(n.baselineStyle.baseLevelPercentage.value()),
              r(100),
              s(0),
            ]),
            this.bindControl(
              new d(
                ge,
                n.baselineStyle.baseLevelPercentage,
                Ce,
                !0,
                this.model(),
                'Change Base Level'
              )
            );
        }),
        (e.exports = o);
    }.call(t, i(5)));
  },
  1105: function(e, t, i) {
    'use strict';
    function o() {
      var e = $('<select>');
      return (
        $('<option value="open">' + $.t('Open') + '</option>').appendTo(e),
        $('<option value="high">' + $.t('High') + '</option>').appendTo(e),
        $('<option value="low">' + $.t('Low') + '</option>').appendTo(e),
        $('<option value="close">' + $.t('Close') + '</option>').appendTo(e),
        $('<option value="hl2">' + $.t('(H + L)/2') + '</option>').appendTo(e),
        $(
          '<option value="hlc3">' + $.t('(H + L + C)/3') + '</option>'
        ).appendTo(e),
        $(
          '<option value="ohlc4">' + $.t('(O + H + L + C)/4') + '</option>'
        ).appendTo(e),
        e
      );
    }
    var n;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.createPriceSourceEditor = o),
      (n = i(14)),
      i.n(n),
      i(11);
  },
  1106: function(e, t) {},
  1107: function(e, t) {},
  1108: function(e, t, i) {
    'use strict';
    function o() {
      return $(
        '<select><option value="' +
          a.MarkLocation.AboveBar +
          '">' +
          $.t('Above Bar') +
          '</option><option value="' +
          a.MarkLocation.BelowBar +
          '">' +
          $.t('Below Bar') +
          '</option><option value="' +
          a.MarkLocation.Top +
          '">' +
          $.t('Top') +
          '</option><option value="' +
          a.MarkLocation.Bottom +
          '">' +
          $.t('Bottom') +
          '</option><option value="' +
          a.MarkLocation.Absolute +
          '">' +
          $.t('Absolute') +
          '</option></select>'
      );
    }
    var n, a;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.createShapeLocationEditor = o),
      (n = i(14)),
      i.n(n),
      i(11),
      (a = i(212));
  },
  1109: function(e, t, i) {
    'use strict';
    function o() {
      var e = '<select>';
      return (
        Object.keys(a.plotShapesData).forEach(function(t) {
          var i = a.plotShapesData[t];
          e += '<option value="' + i.id + '">' + i.guiName + '</option>';
        }),
        (e += '</select>'),
        $(e)
      );
    }
    var n, a;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.createShapeStyleEditor = o),
      (n = i(14)),
      i.n(n),
      (a = i(211));
  },
  1110: function(e, t, i) {
    'use strict';
    function o() {
      return $('<input type="checkbox" class="visibility-switch"/>');
    }
    var n;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.createVisibilityEditor = o),
      (n = i(14)),
      i.n(n);
  },
  1111: function(e, t, i) {
    'use strict';
    function o() {
      var e = $('<select />');
      return (
        $(
          '<option value="' + a.LeftToRight + '">' + $.t('Left') + '</option>'
        ).appendTo(e),
        $(
          '<option value="' + a.RightToLeft + '">' + $.t('Right') + '</option>'
        ).appendTo(e),
        e
      );
    }
    var n, a, s;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (n = i(14)),
      i(11),
      (function(e) {
        (e.LeftToRight = 'left_to_right'), (e.RightToLeft = 'right_to_left');
      })(a || (a = {})),
      (function(e) {
        (e.Relative = 'relative'), (e.Absolute = 'absolute');
      })(s || (s = {})),
      (t.createHHistDirectionEditor = o);
  },
  1112: function(e, t, i) {
    'use strict';
    function o() {
      var e = $('<select />');
      return (
        $(
          '<option value="' + a.PlotType.Line + '">' + $.t('Line') + '</option>'
        ).appendTo(e),
        $(
          '<option value="' +
            a.PlotType.LineWithBreaks +
            '">' +
            $.t('Line With Breaks') +
            '</option>'
        ).appendTo(e),
        $(
          '<option value="' +
            a.PlotType.StepLine +
            '">' +
            $.t('Step Line') +
            '</option>'
        ).appendTo(e),
        $(
          '<option value="' +
            a.PlotType.Histogram +
            '">' +
            $.t('Histogram') +
            '</option>'
        ).appendTo(e),
        $(
          '<option value="' +
            a.PlotType.Cross +
            '">' +
            $.t('Cross', { context: 'chart_type' }) +
            '</option>'
        ).appendTo(e),
        $(
          '<option value="' + a.PlotType.Area + '">' + $.t('Area') + '</option>'
        ).appendTo(e),
        $(
          '<option value="' +
            a.PlotType.AreaWithBreaks +
            '">' +
            $.t('Area With Breaks') +
            '</option>'
        ).appendTo(e),
        $(
          '<option value="' +
            a.PlotType.Columns +
            '">' +
            $.t('Columns') +
            '</option>'
        ).appendTo(e),
        $(
          '<option value="' +
            a.PlotType.Circles +
            '">' +
            $.t('Circles') +
            '</option>'
        ).appendTo(e),
        e
      );
    }
    var n, a;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.createPlotEditor = o),
      (n = i(14)),
      i.n(n),
      i(11),
      (a = i(86));
  },
  320: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      s.call(this, e, t), (this._study = i), this.prepareLayout();
    }
    function n(e, t, i) {
      s.call(this, e, t),
        (this._study = i),
        (this._property = e),
        this.prepareLayout();
    }
    var a = i(823),
      s = a.PropertyPage,
      r = a.GreateTransformer,
      l = a.LessTransformer,
      p = a.ToIntTransformer,
      d = a.ToFloatTransformer,
      h = a.SimpleComboBinder,
      c = a.BooleanBinder,
      u = a.DisabledBinder,
      b = a.ColorBinding,
      y = a.SliderBinder,
      g = a.SimpleStringBinder,
      C = i(829).addColorPicker,
      _ = i(830).createLineStyleEditor,
      m = i(1108).createShapeLocationEditor,
      w = i(1109).createShapeStyleEditor,
      T = i(1110).createVisibilityEditor,
      f = i(1111).createHHistDirectionEditor,
      v = i(1112).createPlotEditor,
      L = i(105).NumericFormatter,
      k = i(26),
      S = i(86).PlotType,
      x = i(4).getLogger('Chart.Study.PropertyPage');
    inherit(o, s),
      (o.prototype.prepareLayout = function() {
        function e(e) {
          return new L().format(e);
        }
        var t,
          i,
          n,
          a,
          s,
          r,
          l,
          p,
          u,
          m,
          w,
          T,
          f,
          v,
          S,
          P,
          B,
          E,
          R,
          F,
          I,
          D,
          V,
          A,
          W,
          M,
          O,
          z,
          H,
          N,
          G,
          j,
          q,
          U,
          Y,
          K;
        for (
          this._table = $('<table/>'),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            t = this._study.metaInfo(),
            i = {},
            n = 0;
          n < t.plots.length;
          ++n
        )
          if (
            !(
              this._study.isSelfColorerPlot(n) ||
              this._study.isTextColorerPlot(n) ||
              this._study.isDataOffsetPlot(n) ||
              this._study.isOHLCColorerPlot(n)
            )
          ) {
            if (((r = t.plots[n]), t.styles)) {
              if (t.styles[r.id]) a = t.styles[r.id].isHidden;
              else if (!this._study.isOHLCSeriesPlot(n)) continue;
              if (this._study.isOHLCSeriesPlot(n)) {
                if (((s = t.plots[n].target), i[s])) continue;
                (a = t.ohlcPlots[s].isHidden), (i[s] = s);
              }
              if (a) continue;
            }
            this._study.isLinePlot(n) ||
            this._study.isBarColorerPlot(n) ||
            this._study.isBgColorerPlot(n)
              ? this._prepareLayoutForPlot(n, r)
              : this._study.isPlotArrowsPlot(n)
              ? this._prepareLayoutForArrowsPlot(n, r)
              : this._study.isPlotCharsPlot(n)
              ? this._prepareLayoutForCharsPlot(n, r)
              : this._study.isPlotShapesPlot(n)
              ? this._prepareLayoutForShapesPlot(n, r)
              : this._study.isOHLCSeriesPlot(n)
              ? ((l = { id: s, type: 'ohlc' }),
                this._study.isOHLCBarsPlot(n)
                  ? this._prepareLayoutForBarsPlot(n, l)
                  : this._study.isOHLCCandlesPlot(n) &&
                    this._prepareLayoutForCandlesPlot(n, l))
              : x.logError('Unknown plot type: ' + r.type);
          }
        if ((p = this._study.properties().bands) && p.childCount() > 0)
          for (n = 0; n < p.childCount(); n++)
            (u = p[n]),
              (u.isHidden && u.isHidden.value()) ||
                ((m = $('<tr class="line"/>')),
                m.appendTo(this._table),
                (w = $('<td/>')),
                w.appendTo(m),
                (T = $("<input type='checkbox' class='visibility-switch'/>")),
                T.appendTo(w),
                (f = $.t(u.name.value(), { context: 'input' })),
                (v = this.createLabeledCell(f, T)
                  .appendTo(m)
                  .addClass('propertypage-name-label')),
                (S = $('<td/>')),
                S.appendTo(m),
                S.addClass('colorpicker-cell'),
                (P = C(S)),
                (B = $('<td/>')),
                B.appendTo(m),
                (E = this.createLineWidthEditor()),
                E.appendTo(B),
                (R = $('<td colspan="4">').css({ whiteSpace: 'nowrap' })),
                R.appendTo(m),
                (F = _()),
                F.render().appendTo(R),
                (I = $("<input class='property-page-bandwidth' type='text'/>")),
                I.appendTo(R),
                (D = [d(u.value.value())]),
                (V = 'Change band'),
                (A = new g(I, u.value, D, !1, this.model(), V)),
                A.addFormatter(e),
                this.bindControl(A),
                this.bindControl(new c(T, u.visible, !0, this.model(), V)),
                this.bindControl(new b(P, u.color, !0, this.model(), V)),
                this.bindControl(
                  new h(F, u.linestyle, parseInt, !0, this.model(), V)
                ),
                this.bindControl(new y(E, u.linewidth, !0, this.model(), V)));
        if (
          (this._study.properties().bandsBackground &&
            ((u = this._study.properties().bandsBackground),
            (W = $.t('Background')),
            (V = $.t('Change band background')),
            (m = this._prepareFilledAreaBackground(
              u.fillBackground,
              u.backgroundColor,
              u.transparency,
              W,
              V
            )),
            m.appendTo(this._table)),
          this._study.properties().areaBackground &&
            ((u = this._study.properties().areaBackground),
            (W = $.t('Background')),
            (V = $.t('Change area background')),
            (m = this._prepareFilledAreaBackground(
              u.fillBackground,
              u.backgroundColor,
              u.transparency,
              W,
              V
            )),
            m.appendTo(this._table)),
          void 0 !== (M = t.filledAreas))
        )
          for (n = 0; n < M.length; ++n)
            (O = M[n]),
              O.isHidden ||
                ((V = 'Change ' + W),
                (u = this._study.properties().filledAreasStyle[O.id]),
                (W = O.title || $.t('Background')),
                O.palette
                  ? ((m = $('<tr class="line"/>')),
                    (w = $('<td/>')),
                    w.appendTo(m),
                    (T = $(
                      "<input type='checkbox' class='visibility-switch'/>"
                    )),
                    T.appendTo(w),
                    this.bindControl(
                      new c(T, u.visible, !0, this.model(), V + ' visibility')
                    ),
                    this.createLabeledCell(W, T)
                      .appendTo(m)
                      .addClass('propertypage-name-label'),
                    m.appendTo(this._table),
                    (z = this._findPlotPalette(n, O)),
                    (H = z.palette),
                    (N = z.paletteProps),
                    this._prepareLayoutForPalette(0, O, H, N, V))
                  : ((m = this._prepareFilledAreaBackground(
                      u.visible,
                      u.color,
                      u.transparency,
                      W,
                      V
                    )),
                    m.appendTo(this._table)));
        for (G in t.graphics) {
          j = t.graphics[G];
          for (q in j)
            (u = this._property.graphics[G][q]),
              o['_createRow_' + G].call(this, this._table, u);
        }
        (U = this._table.find('.visibility-switch.plot-visibility-switch')),
          1 === U.length &&
            ((w = U.parent()),
            w.css('display', 'none'),
            (v = this._table.find('.propertypage-plot-with-palette')),
            1 === v.length
              ? v.css('display', 'none')
              : ((v = this._table.find('.propertypage-name-label')),
                v.css('padding-left', 0),
                v.find('label').attr('for', ''))),
          (Y = this._prepareStudyPropertiesLayout()),
          (this._table = this._table.add(Y)),
          k.isScriptStrategy(t) &&
            ((K = this._prepareOrdersSwitches()),
            (this._table = this._table.add(K))),
          this.loadData();
      }),
      (o.prototype._prepareOrdersSwitches = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          s,
          r = $(
            '<table class="property-page study-strategy-properties" cellspacing="0" cellpadding="2">'
          ),
          l = 'chart-orders-switch_' + Date.now().toString(36),
          p = $('<tr>').appendTo(r),
          d = $('<input id="' + l + '" type="checkbox">').appendTo(
            $('<td>').appendTo(p)
          );
        return (
          $(
            '<label for="' + l + '">' + $.t('Trades on Chart') + '</label>'
          ).appendTo($('<td>').appendTo(p)),
          (e = 'chart-orders-labels-switch_' + Date.now().toString(36)),
          (t = $('<tr>').appendTo(r)),
          (i = $('<input id="' + e + '" type="checkbox">').appendTo(
            $('<td>').appendTo(t)
          )),
          $(
            '<label for="' + e + '">' + $.t('Signal Labels') + '</label>'
          ).appendTo($('<td>').appendTo(t)),
          (o = 'chart-orders-qty-switch_' + Date.now().toString(36)),
          (n = $('<tr>').appendTo(r)),
          (a = $('<input id="' + o + '" type="checkbox">').appendTo(
            $('<td>').appendTo(n)
          )),
          $('<label for="' + o + '">' + $.t('Quantity') + '</label>').appendTo(
            $('<td>').appendTo(n)
          ),
          (s = this._study.properties()),
          this.bindControl(
            new c(
              d,
              s.strategy.orders.visible,
              !0,
              this.model(),
              'Trades on chart visibility'
            )
          ),
          this.bindControl(
            new c(
              i,
              s.strategy.orders.showLabels,
              !0,
              this.model(),
              'Signal labels visibility'
            )
          ),
          this.bindControl(
            new u(
              i,
              s.strategy.orders.visible,
              !0,
              this.model(),
              'Signal labels visibility',
              !0
            )
          ),
          this.bindControl(
            new c(
              a,
              s.strategy.orders.showQty,
              !0,
              this.model(),
              'Quantity visibility'
            )
          ),
          this.bindControl(
            new u(
              a,
              s.strategy.orders.visible,
              !0,
              this.model(),
              'Quantity visibility',
              !0
            )
          ),
          r
        );
      }),
      (o.prototype._prepareLayoutForPlot = function(e, t) {
        var i,
          o,
          n,
          a,
          s,
          r,
          l,
          p,
          d,
          u,
          g,
          _,
          m = t.id,
          w = this._study.properties().styles[m],
          T = this._findPlotPalette(e, t),
          f = T.palette,
          L = T.paletteProps,
          k = 'Change ' + m;
        f
          ? ((i = $('<tr class="line"/>')),
            i.appendTo(this._table),
            (o = $('<td/>')),
            o.appendTo(i),
            o.addClass('visibility-cell'),
            (n = $(
              "<input type='checkbox' class='visibility-switch plot-visibility-switch'/>"
            )),
            n.appendTo(o),
            this.bindControl(new c(n, w.visible, !0, this.model(), k)),
            (a = $.t(w.title.value(), { context: 'input' })),
            this.createLabeledCell(a, n)
              .appendTo(i)
              .addClass(
                'propertypage-name-label propertypage-plot-with-palette'
              ),
            this._prepareLayoutForPalette(e, t, f, L, k))
          : ((i = $('<tr class="line"/>')),
            i.appendTo(this._table),
            (o = $('<td/>')),
            o.appendTo(i),
            o.addClass('visibility-cell'),
            (n = $(
              "<input type='checkbox' class='visibility-switch plot-visibility-switch'/>"
            )),
            n.appendTo(o),
            (a = $.t(this._study.properties().styles[m].title.value(), {
              context: 'input',
            })),
            this.createLabeledCell(a, n)
              .appendTo(i)
              .addClass('propertypage-name-label'),
            (s = $('<td/>')),
            s.appendTo(i),
            s.addClass('colorpicker-cell'),
            (r = C(s)),
            (l = $('<td/>')),
            l.appendTo(i),
            (p = this.createLineWidthEditor()),
            p.appendTo(l),
            (d = $('<td>')),
            d.appendTo(i),
            (u = v()),
            u.appendTo(d),
            (g = $('<td>')),
            g.appendTo(i),
            (_ = $("<input type='checkbox'>")),
            _.appendTo(g),
            this.createLabeledCell('Price Line', _).appendTo(i),
            this.bindControl(new c(n, w.visible, !0, this.model(), k)),
            this.bindControl(
              new b(r, w.color, !0, this.model(), k, w.transparency)
            ),
            this.bindControl(
              new y(
                p,
                w.linewidth,
                !0,
                this.model(),
                k,
                this._study.metaInfo().isTVScript
              )
            ),
            this.bindControl(
              new h(u, w.plottype, parseInt, !0, this.model(), k)
            ),
            this.bindControl(
              new c(_, w.trackPrice, !0, this.model(), 'Change Price Line')
            ));
      }),
      (o.prototype._prepareLayoutForBarsPlot = function(e, t) {
        var i,
          o,
          n,
          a,
          s,
          r,
          l = t.id,
          p = this._study.properties().ohlcPlots[l],
          d = this._findPlotPalette(e, t),
          h = d.palette,
          u = d.paletteProps,
          y = 'Change ' + l,
          g = $('<tr class="line"/>');
        g.appendTo(this._table),
          (i = $('<td/>')),
          i.appendTo(g),
          i.addClass('visibility-cell'),
          (o = $("<input type='checkbox' class='visibility-switch'/>")),
          o.appendTo(i),
          this.bindControl(new c(o, p.visible, !0, this.model(), y)),
          (n = p.title.value()),
          this.createLabeledCell(n, o)
            .appendTo(g)
            .addClass('propertypage-name-label'),
          h
            ? ((a = !0), this._prepareLayoutForPalette(e, t, h, u, y, a))
            : ((s = $('<td/>')),
              s.appendTo(g),
              s.addClass('colorpicker-cell'),
              (r = C(s)),
              this.bindControl(new b(r, p.color, !0, this.model(), y)));
      }),
      (o.prototype._prepareLayoutForCandlesPlot = function(e, t) {
        var i, o, n, a, s, r, l, p, d;
        this._prepareLayoutForBarsPlot(e, t),
          (i = t.id),
          (o = this._study.properties().ohlcPlots[i]),
          (n = 'Change ' + i),
          (a = $('<tr class="line"/>')),
          a.appendTo(this._table),
          (s = $('<td/>')),
          s.appendTo(a),
          s.addClass('visibility-cell'),
          (r = $("<input type='checkbox' class='visibility-switch'/>")),
          r.appendTo(s),
          this.bindControl(new c(r, o.drawWick, !0, this.model(), n)),
          (l = 'Wick'),
          this.createLabeledCell(l, r).appendTo(a),
          (p = $('<td/>')),
          p.appendTo(a),
          p.addClass('colorpicker-cell'),
          (d = C(p)),
          this.bindControl(new b(d, o.wickColor, !0, this.model(), n));
      }),
      (o.prototype._prepareLayoutForShapesPlot = function(e, t) {
        var i,
          o,
          n,
          a,
          s,
          r,
          l,
          p,
          d,
          u = t.id,
          y = this._study.properties().styles[u],
          g = this._findPlotPalette(e, t),
          _ = g.palette,
          T = g.paletteProps,
          f = 'Change ' + u,
          v = $('<tr class="line"/>');
        v.appendTo(this._table),
          (i = $('<td/>')),
          i.appendTo(v),
          i.addClass('visibility-cell'),
          (o = $("<input type='checkbox' class='visibility-switch'/>")),
          o.appendTo(i),
          this.bindControl(new c(o, y.visible, !0, this.model(), f)),
          (n = $.t(this._study.properties().styles[u].title.value(), {
            context: 'input',
          })),
          this.createLabeledCell(n, o)
            .appendTo(v)
            .addClass('propertypage-name-label'),
          (a = $('<td/>')),
          a.appendTo(v),
          (s = w()),
          s.appendTo(a),
          this.bindControl(new h(s, y.plottype, null, !0, this.model(), f)),
          (r = $('<td/>')),
          r.appendTo(v),
          (l = m()),
          l.appendTo(r),
          this.bindControl(new h(l, y.location, null, !0, this.model(), f)),
          _
            ? this._prepareLayoutForPalette(e, t, _, T, f)
            : ((v = $('<tr class="line"/>')),
              v.appendTo(this._table),
              $('<td/>').appendTo(v),
              $('<td/>').appendTo(v),
              (p = $('<td/>')),
              p.appendTo(v),
              p.addClass('colorpicker-cell'),
              (d = C(p)),
              this.bindControl(
                new b(d, y.color, !0, this.model(), f, y.transparency)
              ));
      }),
      (o.prototype._prepareLayoutForCharsPlot = function(e, t) {
        var i,
          o,
          n,
          a,
          s,
          r,
          l,
          p,
          d,
          u = t.id,
          y = this._study.properties().styles[u],
          _ = this._findPlotPalette(e, t),
          w = _.palette,
          T = _.paletteProps,
          f = 'Change ' + u,
          v = $('<tr class="line"/>');
        v.appendTo(this._table),
          (i = $('<td/>')),
          i.appendTo(v),
          i.addClass('visibility-cell'),
          (o = $("<input type='checkbox' class='visibility-switch'/>")),
          o.appendTo(i),
          this.bindControl(new c(o, y.visible, !0, this.model(), f)),
          (n = $.t(this._study.properties().styles[u].title.value(), {
            context: 'input',
          })),
          this.createLabeledCell(n, o)
            .appendTo(v)
            .addClass('propertypage-name-label'),
          (a = $('<td/>')),
          a.appendTo(v),
          (s = $('<input type="text"/>')),
          s.appendTo(a),
          s.keyup(function() {
            var e = $(this),
              t = e.val();
            t && (e.val(t.split('')[t.length - 1]), e.change());
          }),
          this.bindControl(new g(s, y.char, null, !1, this.model(), f)),
          (r = $('<td/>')),
          r.appendTo(v),
          (l = m()),
          l.appendTo(r),
          this.bindControl(new h(l, y.location, null, !0, this.model(), f)),
          w
            ? this._prepareLayoutForPalette(e, t, w, T, f)
            : ((v = $('<tr class="line"/>')),
              v.appendTo(this._table),
              $('<td/>').appendTo(v),
              $('<td/>').appendTo(v),
              (p = $('<td/>')),
              p.appendTo(v),
              p.addClass('colorpicker-cell'),
              (d = C(p)),
              this.bindControl(
                new b(d, y.color, !0, this.model(), f, y.transparency)
              ));
      }),
      (o.prototype._isStyleNeedsConnectPoints = function(e) {
        return [S.Cross, S.Circles].indexOf(e) >= 0;
      }),
      (o.prototype._prepareLayoutForPalette = function(e, t, i, o, n, a) {
        var s,
          r,
          l,
          p,
          d,
          u,
          g,
          _,
          m,
          w,
          T,
          f,
          L,
          k,
          S,
          x = e,
          P = t.id,
          B = null,
          E = P.startsWith('fill');
        (B = a
          ? this._study.properties().ohlcPlots[P]
          : E
          ? this._study.properties().filledAreasStyle[P]
          : this._study.properties().styles[P]),
          (s = 0);
        for (r in i.colors)
          (l = o.colors[r]),
            (p = $('<tr class="line"/>')),
            p.appendTo(this._table),
            $('<td/>').appendTo(p),
            (d = $('<td/>')),
            d.appendTo(p),
            d.addClass('propertypage-name-label'),
            d.html($.t(l.name.value(), { context: 'input' })),
            (u = $('<td/>')),
            u.appendTo(p),
            u.addClass('colorpicker-cell'),
            (g = C(u)),
            this.bindControl(
              new b(g, l.color, !0, this.model(), n, B.transparency)
            ),
            !E &&
              this._study.isLinePlot(x) &&
              ((_ = $('<td/>')),
              _.appendTo(p),
              (m = this.createLineWidthEditor()),
              m.appendTo(_),
              this.bindControl(
                new y(
                  m,
                  l.width,
                  !0,
                  this.model(),
                  n,
                  this._study.metaInfo().isTVScript
                )
              ),
              (w = $('<td>')),
              w.appendTo(p),
              0 === s &&
                ((T = v()),
                T.appendTo(w),
                this.bindControl(
                  new h(T, B.plottype, parseInt, !0, this.model(), n)
                ),
                (f = $("<input type='checkbox'>")),
                (L = $('<td colspan="4">').css({ whiteSpace: 'nowrap' })),
                (k = $('<span>').html($.t('Price Line'))),
                (S = $('<span>')),
                S.append(f),
                L.append(S)
                  .append(k)
                  .appendTo(p),
                this.bindControl(
                  new c(f, B.trackPrice, !0, this.model(), 'Change Price Line')
                ))),
            s++;
      }),
      (o.prototype._prepareLayoutForArrowsPlot = function(e, t) {
        var i,
          o,
          n,
          a,
          s,
          r,
          l,
          p = t.id,
          d = this._study.properties().styles[p],
          h = 'Change ' + p,
          u = $('<tr class="line"/>');
        u.appendTo(this._table),
          (i = $('<td/>')),
          i.appendTo(u),
          i.addClass('visibility-cell'),
          (o = $("<input type='checkbox' class='visibility-switch'/>")),
          o.appendTo(i),
          (n = $.t(this._study.properties().styles[p].title.value(), {
            context: 'input',
          })),
          this.createLabeledCell(n, o)
            .appendTo(u)
            .addClass('propertypage-name-label'),
          (a = $('<td/>')),
          a.appendTo(u),
          a.addClass('colorpicker-cell'),
          (s = C(a)),
          (r = $('<td/>')),
          r.appendTo(u),
          r.addClass('colorpicker-cell'),
          (l = C(r)),
          this.bindControl(new c(o, d.visible, !0, this.model(), h)),
          this.bindControl(
            new b(s, d.colorup, !0, this.model(), h, d.transparency)
          ),
          this.bindControl(
            new b(l, d.colordown, !0, this.model(), h, d.transparency)
          );
      }),
      (o.prototype._findPlotPalette = function(e, t) {
        var i,
          o = e,
          n = t.id,
          a = null,
          s = null,
          r = this._study.metaInfo().plots;
        if (this._study.isBarColorerPlot(o) || this._study.isBgColorerPlot(o))
          (a = this._study.metaInfo().palettes[t.palette]),
            (s = this._study.properties().palettes[t.palette]);
        else
          for (i = 0; i < r.length; i++)
            if (
              r[i].target === n &&
              (this._study.isSelfColorerPlot(i) ||
                this._study.isOHLCColorerPlot(i))
            ) {
              (a = this._study.metaInfo().palettes[r[i].palette]),
                (s = this._study.properties().palettes[r[i].palette]);
              break;
            }
        return { palette: a, paletteProps: s };
      }),
      (o.prototype._prepareStudyPropertiesLayout = function() {
        var e = $(
            '<table class="property-page study-properties" cellspacing="0" cellpadding="2">'
          ),
          t = this.createPrecisionEditor(),
          i = $('<tr>');
        return (
          i.appendTo(e),
          $('<td>' + $.t('Precision') + '</td>').appendTo(i),
          $('<td>')
            .append(t)
            .appendTo(i),
          this.bindControl(
            new h(
              t,
              this._study.properties().precision,
              null,
              !0,
              this.model(),
              'Change Precision'
            )
          ),
          'Compare@tv-basicstudies' === this._study.metaInfo().id &&
            ((t = this.createSeriesMinTickEditor()),
            (i = $('<tr>')),
            i.appendTo(e),
            $('<td>' + $.t('Override Min Tick') + '</td>').appendTo(i),
            $('<td>')
              .append(t)
              .appendTo(i),
            this.bindControl(
              new h(
                t,
                this._study.properties().minTick,
                null,
                !0,
                this.model(),
                'Change MinTick'
              )
            )),
          this._putStudyDefaultStyles(e),
          e
        );
      }),
      (o.prototype._putStudyDefaultStyles = function(e, t) {
        var i,
          o,
          n,
          a,
          s,
          r,
          l = null,
          p = this._study;
        return (
          (!p.properties().linkedToSeries ||
            !p.properties().linkedToSeries.value()) &&
          ($.each(this._model.m_model.panes(), function(e, t) {
            $.each(t.dataSources(), function(e, i) {
              if (i === p) return (l = t), !1;
            });
          }),
          (this._pane = l),
          this._pane &&
            (-1 !==
            this._pane
              .leftPriceScale()
              .dataSources()
              .indexOf(this._study)
              ? (i = 'left')
              : -1 !==
                this._pane
                  .rightPriceScale()
                  .dataSources()
                  .indexOf(this._study)
              ? (i = 'right')
              : this._pane.isOverlay(this._study) && (i = 'none')),
          i &&
            ((o = this),
            (n = { left: $.t('Scale Left'), right: $.t('Scale Right') }),
            o._pane.actionNoScaleIsEnabled(p) &&
              (n.none = $.t('Screen (No Scale)')),
            (a = this.createKeyCombo(n)
              .val(i)
              .change(function() {
                switch (this.value) {
                  case 'left':
                    o._model.move(o._study, o._pane, o._pane.leftPriceScale());
                    break;
                  case 'right':
                    o._model.move(o._study, o._pane, o._pane.rightPriceScale());
                    break;
                  case 'none':
                    o._model.move(o._study, o._pane, null);
                }
              })),
            (s = this.addRow(e)),
            $('<td>' + $.t('Scale') + '</td>').appendTo(s),
            (r = $('<td>')
              .appendTo(s)
              .append(a)),
            t && t > 2 && r.attr('colspan', t - 1)),
          e)
        );
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (o.prototype._prepareFilledAreaBackground = function(e, t, i, o, n) {
        var a,
          s,
          r,
          l = $('<tr class="line"/>'),
          p = $('<td/>');
        return (
          p.appendTo(l),
          (a = $("<input type='checkbox' class='visibility-switch'/>")),
          a.appendTo(p),
          this.createLabeledCell(o, a)
            .appendTo(l)
            .addClass('propertypage-name-label'),
          (s = $('<td/>')),
          s.appendTo(l),
          s.addClass('colorpicker-cell'),
          (r = C(s)),
          this.bindControl(new c(a, e, !0, this.model(), n + ' visibility')),
          this.bindControl(new b(r, t, !0, this.model(), n + ' color', i)),
          l
        );
      }),
      inherit(n, s),
      (n.prototype.prepareLayout = function() {
        if (
          this._study.properties().linkedToSeries &&
          this._study.properties().linkedToSeries.value()
        )
          return void (this._table = $());
        this._table = $();
      }),
      (n.prototype.widget = function() {
        return this._table;
      }),
      (o._createRow_horizlines = function(e, t) {
        var i = this.addRow(e),
          o = t.name.value(),
          n = $("<input type='checkbox' class='visibility-switch'/>"),
          a = this.createColorPicker(),
          s = this.createLineWidthEditor(),
          r = _();
        $('<td>')
          .append(n)
          .appendTo(i),
          this.createLabeledCell(o, n).appendTo(i),
          $('<td>')
            .append(a)
            .appendTo(i),
          $('<td>')
            .append(s)
            .appendTo(i),
          $('<td>')
            .append(r.render())
            .appendTo(i),
          this.bindControl(
            new c(n, t.visible, !0, this.model(), 'Change ' + o + ' visibility')
          ),
          this.bindControl(
            new b(a, t.color, !0, this.model(), 'Change ' + o + ' color')
          ),
          this.bindControl(
            new h(
              r,
              t.style,
              parseInt,
              !0,
              this.model(),
              'Change ' + o + ' style'
            )
          ),
          this.bindControl(
            new y(s, t.width, !0, this.model(), 'Change ' + o + ' width')
          );
      }),
      (o._createRow_vertlines = function(e, t) {
        var i = this.addRow(e),
          o = t.name.value(),
          n = $("<input type='checkbox' class='visibility-switch'/>"),
          a = this.createColorPicker(),
          s = this.createLineWidthEditor(),
          r = _();
        $('<td>')
          .append(n)
          .appendTo(i),
          this.createLabeledCell(o, n).appendTo(i),
          $('<td>')
            .append(a)
            .appendTo(i),
          $('<td>')
            .append(s)
            .appendTo(i),
          $('<td>')
            .append(r.render())
            .appendTo(i),
          this.bindControl(
            new c(n, t.visible, !0, this.model(), 'Change ' + o + ' visibility')
          ),
          this.bindControl(
            new b(a, t.color, !0, this.model(), 'Change ' + o + ' color')
          ),
          this.bindControl(
            new h(
              r,
              t.style,
              parseInt,
              !0,
              this.model(),
              'Change ' + o + ' style'
            )
          ),
          this.bindControl(
            new y(s, t.width, !0, this.model(), 'Change ' + o + ' width')
          );
      }),
      (o._createRow_lines = function(e, t) {
        var i = this.addRow(e),
          o = t.title.value(),
          n = $("<input type='checkbox' class='visibility-switch'/>"),
          a = this.createColorPicker(),
          s = this.createLineWidthEditor(),
          r = _();
        $('<td>')
          .append(n)
          .appendTo(i),
          this.createLabeledCell(o, n).appendTo(i),
          $('<td>')
            .append(a)
            .appendTo(i),
          $('<td>')
            .append(s)
            .appendTo(i),
          $('<td>')
            .append(r.render())
            .appendTo(i),
          this.bindControl(
            new c(n, t.visible, !0, this.model(), 'Change ' + o + ' visibility')
          ),
          this.bindControl(
            new b(a, t.color, !0, this.model(), 'Change ' + o + ' color')
          ),
          this.bindControl(
            new h(
              r,
              t.style,
              parseInt,
              !0,
              this.model(),
              'Change ' + o + ' style'
            )
          ),
          this.bindControl(
            new y(s, t.width, !0, this.model(), 'Change ' + o + ' width')
          );
      }),
      (o._createRow_hlines = function(e, t) {
        var i,
          o,
          n,
          a = this.addRow(e),
          s = t.name.value(),
          r = $("<input type='checkbox' class='visibility-switch'/>"),
          l = this.createColorPicker(),
          p = this.createLineWidthEditor(),
          d = _(),
          u = $("<input type='checkbox'>");
        $('<td>')
          .append(r)
          .appendTo(a),
          this.createLabeledCell(s, r).appendTo(a),
          $('<td>')
            .append(l)
            .appendTo(a),
          $('<td>')
            .append(p)
            .appendTo(a),
          $('<td>')
            .append(d.render())
            .appendTo(a),
          $('<td>').appendTo(a),
          $('<td>')
            .append(u)
            .appendTo(a),
          this.createLabeledCell('Show Price', u).appendTo(a),
          this.bindControl(
            new c(r, t.visible, !0, this.model(), 'Change ' + s + ' visibility')
          ),
          this.bindControl(
            new b(l, t.color, !0, this.model(), 'Change ' + s + ' color')
          ),
          this.bindControl(
            new h(
              d,
              t.style,
              parseInt,
              !0,
              this.model(),
              'Change ' + s + ' style'
            )
          ),
          this.bindControl(
            new y(p, t.width, !0, this.model(), 'Change ' + s + ' width')
          ),
          this.bindControl(
            new c(
              u,
              t.showPrice,
              !0,
              this.model(),
              'Change ' + s + ' show price'
            )
          ),
          t.enableText.value() &&
            ((a = this.addRow(e)),
            $('<td colspan="2">').appendTo(a),
            (i = $("<input type='checkbox'>")),
            $('<td class="text-center">')
              .append(i)
              .appendTo(a),
            this.createLabeledCell('Show Text', i).appendTo(a),
            this.bindControl(
              new c(
                i,
                t.showText,
                !0,
                this.model(),
                'Change ' + s + ' show text'
              )
            ),
            (o = TradingView.createTextPosEditor()),
            $('<td>')
              .append(o.render())
              .appendTo(a),
            this.bindControl(
              new h(
                o,
                t.textPos,
                parseInt,
                !0,
                this.model(),
                'Change ' + s + ' text position'
              )
            ),
            (n = this.createFontSizeEditor()),
            $('<td colspan="2">')
              .append(n)
              .appendTo(a),
            this.bindControl(
              new h(
                n,
                t.fontSize,
                parseInt,
                !0,
                this.model(),
                'Change ' + s + ' font size'
              )
            ));
      }),
      (o._createRow_hhists = function(e, t) {
        var i,
          o,
          n,
          a,
          s,
          d,
          u = t.title.value(),
          y = [],
          C = [],
          _ = this.addRow(e),
          m = T();
        $('<td>')
          .append(m)
          .appendTo(_),
          this.createLabeledCell(u, m).appendTo(_),
          this.bindControl(
            new c(m, t.visible, !0, this.model(), 'Change ' + u + ' Visibility')
          ),
          (_ = this.addRow(e)),
          (i = $('<input/>')),
          i.attr('type', 'text'),
          i.addClass('ticker'),
          this.createLabeledCell($.t('Width (% of the Box)'), i).appendTo(_),
          $('<td>')
            .append(i)
            .appendTo(_),
          (o = [p(40)]),
          o.push(r(0)),
          o.push(l(100)),
          this.bindControl(
            new g(
              i,
              t.percentWidth,
              o,
              !1,
              this.model(),
              'Change Percent Width'
            )
          ),
          (_ = this.addLabeledRow(e, 'Placement')),
          (n = f()),
          $('<td>')
            .append(n)
            .appendTo(_),
          this.bindControl(
            new h(
              n,
              t.direction,
              null,
              !0,
              this.model(),
              'Change ' + u + ' Placement'
            )
          ),
          (_ = this.addRow(e)),
          (a = $("<input type='checkbox'>")),
          $('<td>')
            .append(a)
            .appendTo(_),
          this.createLabeledCell($.t('Show Values'), a).appendTo(_),
          this.bindControl(
            new c(
              a,
              t.showValues,
              !0,
              this.model(),
              'Change ' + u + ' Show Values'
            )
          ),
          (_ = this.addRow(e)),
          (s = this.createColorPicker()),
          this.createLabeledCell($.t('Text Color'), s).appendTo(_),
          $('<td>')
            .append(s)
            .appendTo(_),
          this.bindControl(
            new b(
              s,
              t.valuesColor,
              !0,
              this.model(),
              'Change ' + u + ' Text Color'
            )
          );
        for (d in t.colors)
          isNumber(parseInt(d, 10)) &&
            ((_ = this.addRow(e)),
            (y[d] = t.titles[d].value()),
            (C[d] = this.createColorPicker()),
            $('<td>')
              .append(y[d])
              .appendTo(_),
            $('<td>')
              .append(C[d])
              .appendTo(_),
            this.bindControl(
              new b(
                C[d],
                t.colors[d],
                !0,
                this.model(),
                'Change ' + y[d] + ' color'
              )
            ));
      }),
      (o._createRow_backgrounds = function(e, t) {
        var i = this.addRow(e),
          o = $("<input type='checkbox' class='visibility-switch'/>"),
          n = t.name.value(),
          a = this.createColorPicker();
        $('<td>')
          .append(o)
          .appendTo(i),
          this.createLabeledCell(n, o).appendTo(i),
          $('<td>')
            .append(a)
            .appendTo(i),
          this.bindControl(
            new c(o, t.visible, !0, this.model(), 'Change ' + n + ' visibility')
          ),
          this.bindControl(
            new b(
              a,
              t.color,
              !0,
              this.model(),
              'Change ' + n + ' color',
              t.transparency
            )
          );
      }),
      (o._createRow_polygons = function(e, t) {
        var i = this.addRow(e),
          o = t.name.value(),
          n = this.createColorPicker();
        $('<td>')
          .append(o)
          .appendTo(i),
          $('<td>')
            .append(n)
            .appendTo(i),
          this.bindControl(
            new b(n, t.color, !0, this.model(), 'Change ' + o + ' color')
          );
      }),
      (o._createRow_trendchannels = function(e, t) {
        var i = this.addRow(e),
          o = t.name.value(),
          n = this.createColorPicker();
        $('<td>')
          .append(o)
          .appendTo(i),
          $('<td>')
            .append(n)
            .appendTo(i),
          this.bindControl(
            new b(
              n,
              t.color,
              !0,
              this.model(),
              'Change ' + o + ' color',
              t.transparency
            )
          );
      }),
      (o._createRow_textmarks = function(e, t) {
        var i = this.addLabeledRow(e),
          o = t.name.value(),
          n = this.createColorPicker(),
          a = this.createColorPicker(),
          s = this.createFontEditor(),
          r = this.createFontSizeEditor(),
          l = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          ),
          p = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          );
        $('<td>')
          .append(o)
          .appendTo(i),
          'rectangle' !== t.shape.value() &&
            $('<td>')
              .append(n)
              .appendTo(i),
          $('<td>')
            .append(a)
            .appendTo(i),
          $('<td>')
            .append(s)
            .appendTo(i),
          $('<td>')
            .append(r)
            .appendTo(i),
          $('<td>')
            .append(l)
            .appendTo(i),
          $('<td>')
            .append(p)
            .appendTo(i),
          this.bindControl(
            new b(
              n,
              t.color,
              !0,
              this.model(),
              'Change ' + o + ' color',
              t.transparency
            )
          ),
          this.bindControl(
            new b(
              a,
              t.fontColor,
              !0,
              this.model(),
              'Change ' + o + ' text color',
              t.transparency
            )
          ),
          this.bindControl(
            new h(
              r,
              t.fontSize,
              parseInt,
              !0,
              this.model(),
              'Change ' + o + ' font size'
            )
          ),
          this.bindControl(
            new h(
              s,
              t.fontFamily,
              null,
              !0,
              this.model(),
              'Change ' + o + ' font'
            )
          ),
          this.bindControl(
            new c(l, t.fontBold, !0, this.model(), 'Change Text Font Bold')
          ),
          this.bindControl(
            new c(p, t.fontItalic, !0, this.model(), 'Change Text Font Italic')
          );
      }),
      (o._createRow_shapemarks = function(e, t) {
        var i = this.addRow(e),
          o = $("<input type='checkbox' class='visibility-switch'/>"),
          n = t.name.value(),
          a = this.createColorPicker(),
          s = $('<input/>');
        s.attr('type', 'text'),
          s.addClass('ticker'),
          $('<td>')
            .append(o)
            .appendTo(i),
          this.createLabeledCell(n, o).appendTo(i),
          $('<td>')
            .append(a)
            .appendTo(i),
          this.createLabeledCell('Size', s).appendTo(i),
          $('<td>')
            .append(s)
            .appendTo(i),
          this.bindControl(
            new c(o, t.visible, !0, this.model(), 'Change ' + n + ' visibility')
          ),
          this.bindControl(
            new b(
              a,
              t.color,
              !0,
              this.model(),
              'Change ' + n + ' back color',
              t.transparency
            )
          ),
          this.bindControl(
            new g(s, t.size, null, !1, this.model(), 'Change size')
          );
      }),
      (t.StudyStylesPropertyPage = o),
      (t.StudyDisplayPropertyPage = n);
  },
  341: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      l.call(this, e, t), (this._linetool = i), this.prepareLayout();
    }
    function n(e, t, i) {
      a.call(this, e, t, i), this.prepareLayout();
    }
    var a = i(825),
      s = i(691),
      r = i(823),
      l = r.PropertyPage,
      p = r.SliderBinder,
      d = i(835).createTransparencyEditor,
      h = i(874);
    inherit(o, s),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          r = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ),
          l = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).data({
            'layout-tab': h.TabNames.inputs,
            'layout-tab-priority': h.TabPriority.Inputs,
          });
        (this._table = r.add(l)),
          s.prototype.prepareLayoutForTable.call(this, r),
          (e = $('<tr>').appendTo(l)),
          $('<td>')
            .append($.t('Avg HL in minticks'))
            .appendTo(e),
          (t = $('<td>').appendTo(e)),
          (i = $("<input type='text'>")
            .addClass('ticker')
            .appendTo(t)),
          (e = $('<tr>').appendTo(l)),
          $('<td>')
            .append($.t('Variance'))
            .appendTo(e),
          (o = $('<td>').appendTo(e)),
          (n = $("<input type='text'>")
            .addClass('ticker')
            .appendTo(o)),
          (a = this._linetool.properties()),
          this.bindInteger(
            i,
            a.averageHL,
            $.t('Change Average HL value'),
            1,
            5e4
          ),
          this.bindInteger(n, a.variance, $.t('Change Variance value'), 1, 100),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      inherit(n, a),
      (n.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, s, r, l, h, c;
        (this._widget = $('<div>')),
          (e = $('<table cellspacing=4>').appendTo(this._widget)),
          (t = this.createColorPicker()),
          (i = this.createColorPicker()),
          (o = this.createColorPicker()),
          (n = this.createColorPicker()),
          (a = this.createColorPicker()),
          (s = $("<input type='checkbox' class='visibility-switch'/>").data(
            'hides',
            $(n).add(a)
          )),
          (r = $("<input type='checkbox' class='visibility-switch'/>").data(
            'hides',
            $(o)
          )),
          (l = this.addLabeledRow(e, $.t('Candles'))),
          $('<td>').prependTo(l),
          $('<td>')
            .append(t)
            .appendTo(l),
          $('<td>')
            .append(i)
            .appendTo(l),
          (l = this.addLabeledRow(e, $.t('Borders'), s)),
          $('<td>')
            .append(s)
            .prependTo(l),
          $('<td>')
            .append(n)
            .appendTo(l),
          $('<td>')
            .append(a)
            .appendTo(l),
          $('<td>').appendTo(l),
          (l = this.addLabeledRow(e, $.t('Wick'), r)),
          $('<td>')
            .append(r)
            .prependTo(l),
          $('<td>')
            .append(o)
            .appendTo(l),
          $('<td>').appendTo(l),
          (e = $('<table>').appendTo(this._widget)),
          (l = $('<tr>').appendTo(e)),
          $("<td colspan='2'>")
            .append($.t('Transparency'))
            .appendTo(l),
          (h = d()),
          $("<td colspan='2'>")
            .append(h)
            .appendTo(l),
          (c = this._linetool.properties()),
          this.bindColor(t, c.candleStyle.upColor, 'Change Candle Up Color'),
          this.bindColor(
            i,
            c.candleStyle.downColor,
            'Change Candle Down Color'
          ),
          this.bindBoolean(
            r,
            c.candleStyle.drawWick,
            'Change Candle Wick Visibility'
          ),
          this.bindColor(
            o,
            c.candleStyle.wickColor,
            'Change Candle Wick Color'
          ),
          this.bindBoolean(
            s,
            c.candleStyle.drawBorder,
            'Change Candle Border Visibility'
          ),
          this.bindColor(
            n,
            c.candleStyle.borderUpColor,
            'Change Candle Up Border Color'
          ),
          this.bindColor(
            a,
            c.candleStyle.borderDownColor,
            'Change Candle Down Border Color'
          ),
          this.bindControl(
            new p(
              h,
              c.transparency,
              !0,
              this.model(),
              'Change Guest Feed Transparency'
            )
          );
      }),
      (n.prototype.widget = function() {
        return this._widget;
      }),
      (t.LineToolGhostFeedInputsPropertyPage = o),
      (t.LineToolGhostFeedStylesPropertyPage = n);
  },
  342: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      a.call(this, e, t, i), this.prepareLayout();
    }
    function n(e, t, i) {
      s.call(this, e, t, i);
    }
    var a = i(825),
      s = i(691),
      r = i(823),
      l = r.BooleanBinder,
      p = r.SimpleComboBinder,
      d = r.SimpleStringBinder,
      h = r.ColorBinding,
      c = r.SliderBinder,
      u = i(830).createLineStyleEditor;
    inherit(o, a),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, s, r, b, y, g, C, _, m;
        (this._res = $('<div>')),
          (this._table = $(
            '<table class="property-page" cellspacing="0" cellpadding="2" style="width:100%"></table>'
          ).appendTo(this._res)),
          (e = this.createLineWidthEditor()),
          (t = u()),
          (i = this.createColorPicker()),
          (o = this.addLabeledRow(this._table, 'Line')),
          $('<td>')
            .append(i)
            .appendTo(o),
          $('<td>')
            .append(e)
            .appendTo(o),
          $('<td colspan="3">')
            .append(t.render().css('display', 'block'))
            .appendTo(o),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          (o = $('<tr>').appendTo(this._table)),
          $('<td colspan="3">')
            .append(
              $('<label>')
                .append(n)
                .append($.t('Show Price'))
            )
            .prependTo(o),
          (a = $("<input type='checkbox'>")),
          (o = $('<tr>').appendTo(this._table)),
          $('<td colspan="3">')
            .append(
              $('<label>')
                .append(a)
                .append($.t('Show Text'))
            )
            .prependTo(o),
          (o = this.addLabeledRow(this._table, 'Text:')),
          (s = this.createColorPicker()),
          (r = this.createFontSizeEditor()),
          (b = this.createFontEditor()),
          (y = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          )),
          (g = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          )),
          $('<td>')
            .append(s)
            .appendTo(o),
          $('<td>')
            .append(b)
            .appendTo(o),
          $('<td>')
            .append(r)
            .appendTo(o),
          $('<td>')
            .append(y)
            .appendTo(o),
          $('<td>')
            .append(g)
            .appendTo(o),
          (o = $('<tr>').appendTo(this._table)),
          $("<td colspan='2'>")
            .append($.t('Text Alignment:'))
            .appendTo(o),
          (C = $(
            "<select><option value='left'>" +
              $.t('left') +
              "</option><option value='center'>" +
              $.t('center') +
              "</option><option value='right'>" +
              $.t('right') +
              '</option></select>'
          )),
          (_ = $(
            "<select><option value='bottom'>" +
              $.t('top') +
              "</option><option value='middle'>" +
              $.t('middle') +
              "</option><option value='top'>" +
              $.t('bottom') +
              '</option></select>'
          ).data('selectbox-css', { display: 'block' })),
          $('<td>')
            .append(C)
            .appendTo(o),
          $("<td colspan='3'>")
            .append(_)
            .appendTo(o),
          (m = $("<textarea rows='7' cols='60'>").css('width', '100%')),
          (o = $('<tr>').appendTo(this._table)),
          $("<td colspan='7'>")
            .append(m)
            .appendTo(o),
          this.bindControl(
            new l(
              a,
              this._linetool.properties().showLabel,
              !0,
              this.model(),
              'Change Horz Line Text Visibility'
            )
          ),
          this.bindControl(
            new p(
              C,
              this._linetool.properties().horzLabelsAlign,
              null,
              !0,
              this.model(),
              'Change Horz Line Labels Alignment'
            )
          ),
          this.bindControl(
            new p(
              _,
              this._linetool.properties().vertLabelsAlign,
              null,
              !0,
              this.model(),
              'Change Horz Line Labels Alignment'
            )
          ),
          this.bindControl(
            new d(
              m,
              this._linetool.properties().text,
              null,
              !0,
              this.model(),
              'Change Text'
            )
          ),
          this.bindControl(
            new l(
              n,
              this._linetool.properties().showPrice,
              !0,
              this.model(),
              'Change Horz Line Price Visibility'
            )
          ),
          this.bindControl(
            new h(
              i,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Horz Line Color'
            )
          ),
          this.bindControl(
            new p(
              t,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Horz Line Style'
            )
          ),
          this.bindControl(
            new c(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Horz Line Width'
            )
          ),
          this.bindControl(
            new p(
              r,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new p(
              b,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new h(
              s,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Text Color'
            )
          ),
          this.bindControl(
            new l(
              y,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new l(
              g,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._res;
      }),
      inherit(n, s),
      (n.prototype.prepareLayout = function() {
        var e, t, i, o;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = this._linetool.points()[0]) &&
            ((t = this._linetool.properties().points[0]),
            (i = this.createPriceEditor(t.price)),
            (o = $('<tr>').appendTo(this._table)),
            $('<td>' + $.t('Price') + '</td>').appendTo(o),
            $('<td>')
              .append(i)
              .appendTo(o),
            this.loadData());
      }),
      (t.LineToolHorzLineStylesPropertyPage = o),
      (t.LineToolHorzLineInputsPropertyPage = n);
  },
  343: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      s.call(this, e, t, i), this.prepareLayout();
    }
    function n(e, t, i) {
      a.call(this, e, t, i), this.prepareLayout();
    }
    var a = i(825),
      s = i(691),
      r = i(823),
      l = r.LessTransformer,
      p = r.GreateTransformer,
      d = r.ToIntTransformer,
      h = r.ToFloatTransformer,
      c = r.SimpleStringBinder,
      u = r.ColorBinding,
      b = r.SliderBinder,
      y = r.SimpleComboBinder,
      g = r.BooleanBinder,
      C = i(105).NumericFormatter;
    inherit(o, s),
      (o.prototype.prepareLayout = function() {
        function e(e) {
          return new C().format(e);
        }
        var t, i, o, n, a, s, r, u, b, y, g, _;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (t = $('<tbody>').appendTo(this._table)),
          (i = this.addLabeledRow(t, $.t('Stop Level. Ticks:'))),
          (o = $('<input type="text">')),
          $('<td>')
            .append(o)
            .appendTo(i),
          o.addClass('ticker'),
          (n = $('<input type="text" class="ticker">')),
          $('<td>' + $.t('Price:') + '</td>').appendTo(i),
          $('<td>')
            .append(n)
            .appendTo(i),
          (a = this.addLabeledRow(t, $.t('Entry price:'))),
          (s = $('<input type="text" class="ticker">')),
          $('<td colspan="2">')
            .append(s)
            .appendTo(a),
          (r = this.addLabeledRow(t, $.t('Profit Level. Ticks:'))),
          (u = $('<input type="text" class="ticker">')),
          $('<td>')
            .append(u)
            .appendTo(r),
          (b = $('<input type="text" class="ticker">')),
          $('<td>' + $.t('Price:') + '</td>').appendTo(r),
          $('<td>')
            .append(b)
            .appendTo(r),
          'LineToolRiskRewardLong' === this._linetool.getConstructor() &&
            (i.detach().appendTo(t), r.detach().prependTo(t)),
          (y = [
            d(this._linetool.properties().stopLevel.value()),
            p(0),
            l(1e9),
          ]),
          this.bindControl(
            new c(
              o,
              this._linetool.properties().stopLevel,
              y,
              !1,
              this.model(),
              'Change ' + this._linetool + ' stop level'
            )
          ),
          (y = [
            d(this._linetool.properties().profitLevel.value()),
            p(0),
            l(1e9),
          ]),
          this.bindControl(
            new c(
              u,
              this._linetool.properties().profitLevel,
              y,
              !1,
              this.model(),
              'Change ' + this._linetool + ' profit level'
            )
          ),
          (y = [h(this._linetool.properties().entryPrice.value())]),
          (g = new c(
            s,
            this._linetool.properties().entryPrice,
            y,
            !1,
            this.model(),
            'Change ' + this._linetool + ' entry price'
          )),
          g.addFormatter(e),
          this.bindControl(g),
          (_ = this),
          (y = [
            h(this._linetool.properties().stopPrice.value()),
            function(e) {
              return _._linetool.preparseStopPrice(e);
            },
          ]),
          (g = new c(
            n,
            this._linetool.properties().stopPrice,
            y,
            !1,
            this.model(),
            'Change ' + this._linetool + ' stop price'
          )),
          g.addFormatter(e),
          this.bindControl(g),
          (y = [
            h(this._linetool.properties().targetPrice.value()),
            function(e) {
              return _._linetool.preparseProfitPrice(e);
            },
          ]),
          (g = new c(
            b,
            this._linetool.properties().targetPrice,
            y,
            !1,
            this.model(),
            'Change ' + this._linetool + ' stop price'
          )),
          g.addFormatter(e),
          this.bindControl(g);
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      inherit(n, a),
      (n.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          s,
          r,
          d,
          C,
          _,
          m,
          w,
          T,
          f,
          v = this._linetool,
          L = v.properties();
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = this.createColorPicker()),
          (o = this.addLabeledRow(e, $.t('Lines:'))),
          $('<td>')
            .append(i)
            .appendTo(o),
          $('<td>')
            .append(t)
            .appendTo(o),
          (o = this.addLabeledRow(e, $.t('Stop Color:'))),
          (n = this.createColorPicker()),
          $('<td>')
            .append(n)
            .appendTo(o),
          (o = this.addLabeledRow(e, $.t('Target Color:'))),
          (a = this.createColorPicker()),
          $('<td>')
            .append(a)
            .appendTo(o),
          (o = this.addLabeledRow(e, $.t('Text:'))),
          (s = this.createColorPicker()),
          (r = this.createFontSizeEditor()),
          (d = this.createFontEditor()),
          $('<td>')
            .append(s)
            .appendTo(o),
          $('<td>')
            .append(d)
            .appendTo(o),
          $('<td>')
            .append(r)
            .appendTo(o),
          (o = $('<tr>').appendTo(e)),
          (C = $('<label>').text($.t('Compact'))),
          (_ = $('<input type="checkbox">').prependTo(C)),
          $('<td>')
            .append(C)
            .appendTo(o),
          (o = this.addLabeledRow(e, $.t('Account Size'))),
          (m = $('<input type="text" class="ticker">')),
          $('<td>')
            .append(m)
            .appendTo(o),
          (o = this.addLabeledRow(e, $.t('Risk'))),
          (this._riskEdit = $('<input type="text" class="ticker">')),
          $('<td>')
            .append(this._riskEdit)
            .appendTo(o),
          this._riskEdit.data('step', v.getRiskStep(L.riskDisplayMode.value())),
          L.riskDisplayMode.subscribe(this, this._onRiskDisplayModeChange),
          (w = this.createKeyCombo({ percents: $.t('%'), money: $.t('Cash') })),
          $('<td>')
            .append(w)
            .appendTo(o),
          this.bindControl(
            new u(
              i,
              L.linecolor,
              !0,
              this.model(),
              'Change Risk/Reward line Color'
            )
          ),
          this.bindControl(
            new b(
              t,
              L.linewidth,
              !0,
              this.model(),
              'Change Risk/Reward line width'
            )
          ),
          this.bindControl(
            new u(
              n,
              L.stopBackground,
              !0,
              this.model(),
              'Change stop color',
              L.stopBackgroundTransparency
            )
          ),
          this.bindControl(
            new u(
              a,
              L.profitBackground,
              !0,
              this.model(),
              'Change target color',
              L.profitBackgroundTransparency
            )
          ),
          this.bindControl(
            new y(
              r,
              L.fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new y(d, L.font, null, !0, this.model(), 'Change Text Font')
          ),
          this.bindControl(
            new u(s, L.textcolor, !0, this.model(), 'Change Text Color')
          ),
          this.bindControl(
            new g(_, L.compact, !0, this.model(), 'Compact mode')
          ),
          (T = [h(L.accountSize.value()), p(1), l(1e9)]),
          this.bindControl(
            new c(
              m,
              L.accountSize,
              T,
              !1,
              this.model(),
              'Change ' + this._linetool + ' Account Size'
            )
          ),
          this.bindControl(
            new y(w, L.riskDisplayMode, null, !0, this.model(), '% / Cash')
          ),
          (f = [
            h(L.risk.value()),
            p(1),
            function(e) {
              var t,
                i = L.riskDisplayMode.value();
              return (
                'percents' === i
                  ? (e = e > 100 ? 100 : e)
                  : ((t = L.accountSize.value()), (e = e > t ? t : e)),
                v.riskFormatter(i).format(e)
              );
            },
          ]),
          this.bindControl(
            new c(
              this._riskEdit,
              L.risk,
              f,
              !1,
              this.model(),
              'Change ' + this._linetool + ' Risk'
            )
          ),
          this.loadData();
      }),
      (n.prototype._onRiskDisplayModeChange = function() {
        var e = this._linetool,
          t = e.properties(),
          i = t.riskDisplayMode.value(),
          o = e.riskFormatter(i);
        this._riskEdit.data('TVTicker', {
          step: e.getRiskStep(i),
          formatter: o.format.bind(o),
        });
      }),
      (n.prototype.destroy = function() {
        this._linetool
          .properties()
          .riskDisplayMode.unsubscribe(this, this._onRiskDisplayModeChange),
          a.prototype.destroy.call(this);
      }),
      (n.prototype.onResoreDefaults = function() {
        this._linetool.recalculate();
      }),
      (n.prototype.widget = function() {
        return this._table;
      }),
      (t.LineToolRiskRewardInputsPropertyPage = o),
      (t.LineToolRiskRewardStylesPropertyPage = n);
  },
  344: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      a.call(this, e, t, i), this.prepareLayout();
    }
    function n(e, t, i) {
      s.call(this, e, t, i);
    }
    var a = i(825),
      s = i(691),
      r = i(823),
      l = r.GreateTransformer,
      p = r.LessTransformer,
      d = r.ToFloatTransformer,
      h = r.ColorBinding,
      c = r.BooleanBinder,
      u = r.SimpleComboBinder,
      b = r.SimpleStringBinder,
      y = r.SliderBinder,
      g = i(830).createLineStyleEditor,
      C = i(105).NumericFormatter,
      _ = i(323).StatsPosition;
    inherit(o, a),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, s, r, l, p, d, b, C, m, w, T, f, v, L;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = g()),
          (o = this.createColorPicker()),
          (n = this.addLabeledRow(e, $.t('Line'))),
          $('<td>')
            .append(o)
            .appendTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          $('<td colspan="3">')
            .append(i.render())
            .appendTo(n),
          (a = $('<tbody>').appendTo(this._table)),
          (n = this.addLabeledRow(a, $.t('Text'))),
          (s = this.createColorPicker()),
          (r = this.createFontSizeEditor()),
          (l = this.createFontEditor()),
          (p = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          )),
          (d = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          )),
          (b = $('<input type="checkbox">')),
          $('<td>')
            .append(s)
            .appendTo(n),
          $('<td>')
            .append(l)
            .appendTo(n),
          $('<td>')
            .append(r)
            .appendTo(n),
          $('<td>')
            .append(p)
            .appendTo(n),
          $('<td>')
            .append(d)
            .appendTo(n),
          (C = $(
            "<select><option value='" +
              _.Left +
              "'>" +
              $.t('Left') +
              "</option><option value='" +
              _.Center +
              "'>" +
              $.t('Center') +
              "</option><option value='" +
              _.Right +
              "'>" +
              $.t('Right') +
              '</option></select>'
          )),
          (m = this.addLabeledRow(a, $.t('Stats Position'))),
          $('<td colspan="3">')
            .appendTo(m)
            .append(C),
          (w = $('<input type="checkbox">')),
          (T = $('<input type="checkbox">')),
          (n = this.addLabeledRow(a, $.t('Extend Right End'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(w),
          (n = this.addLabeledRow(a, $.t('Extend Left End'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(T),
          (f = $('<input type="checkbox">')),
          (v = $('<input type="checkbox">')),
          (L = $('<input type="checkbox">')),
          (n = this.addLabeledRow(a, $.t('Show Price Range'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(f),
          (n = this.addLabeledRow(a, $.t('Show Bars Range'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(v),
          (n = this.addLabeledRow(a, $.t('Always Show Stats'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(L),
          (n = this.addLabeledRow(a, $.t('Show Middle Point'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(b),
          this.bindControl(
            new c(
              f,
              this._linetool.properties().showPriceRange,
              !0,
              this.model(),
              'Change Trend Angle Show Price Range'
            )
          ),
          this.bindControl(
            new c(
              v,
              this._linetool.properties().showBarsRange,
              !0,
              this.model(),
              'Change Trend Angle Show Bars Range'
            )
          ),
          this.bindControl(
            new u(
              r,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new u(
              l,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new h(
              s,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Text Color'
            )
          ),
          this.bindControl(
            new c(
              p,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new c(
              d,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          this.bindControl(
            new h(
              o,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Trend Angle Color'
            )
          ),
          this.bindControl(
            new u(
              i,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Trend Angle Style'
            )
          ),
          this.bindControl(
            new y(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Trend Angle Width'
            )
          ),
          this.bindControl(
            new c(
              w,
              this._linetool.properties().extendRight,
              !0,
              this.model(),
              'Change Trend Angle Extending Right'
            )
          ),
          this.bindControl(
            new c(
              T,
              this._linetool.properties().extendLeft,
              !0,
              this.model(),
              'Change Trend Angle Extending Left'
            )
          ),
          this.bindControl(
            new c(
              L,
              this._linetool.properties().alwaysShowStats,
              !0,
              this.model(),
              'Change Trend Angle Always Show Stats'
            )
          ),
          this.bindControl(
            new c(
              b,
              this._linetool.properties().showMiddlePoint,
              !0,
              this.model(),
              'Change Trend Angle Show Middle Point'
            )
          ),
          this.bindControl(
            new u(
              C,
              this._linetool.properties().statsPosition,
              parseInt,
              !0,
              this.model(),
              'Change Trend Angle Stats Position'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      inherit(n, s),
      (n.prototype.prepareLayout = function() {
        var e, t, i, o, n, a;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = this._linetool.points()[0]),
          (t = this._linetool.properties().points[0]),
          e &&
            t &&
            ((i = this._createPointRow(e, t, '')),
            this._table.append(i),
            (i = $('<tr>').appendTo(this._table)),
            $('<td>')
              .append($.t('Angle'))
              .appendTo(i),
            (o = $("<input type='text'>")),
            $('<td>')
              .append(o)
              .appendTo(i),
            (n = [d(t.price.value()), l(-360), p(360)]),
            (a = new b(
              o,
              this._linetool.properties().angle,
              n,
              !1,
              this.model(),
              'Change angle'
            )),
            a.addFormatter(function(e) {
              return new C().format(e);
            }),
            this.bindControl(a),
            this.loadData());
      }),
      (n.prototype.widget = function() {
        return this._table;
      }),
      (t.LineToolTrendAngleStylesPropertyPage = o),
      (t.LineToolTrendAngleInputsPropertyPage = n);
  },
  345: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.ColorBinding,
      l = a.BooleanBinder,
      p = a.SliderBinder,
      d = i(830).createLineStyleEditor,
      h = i(323).StatsPosition;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, c, u, b, y, g, C, _, m, w, T, f, v, L, k, S, x;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = d()),
          (o = this.createColorPicker()),
          (n = this.addLabeledRow(e, $.t('Line'))),
          $('<td>')
            .append(o)
            .appendTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          $('<td colspan="3">')
            .append(i.render())
            .appendTo(n),
          (a = $('<tbody>').appendTo(this._table)),
          (c = $('<label>' + $.t('Extend') + ' </label>').css({
            'margin-left': '8px',
          })),
          (u = $('<input type="checkbox">').appendTo(c)),
          (b = $('<label>' + $.t('Extend') + ' </label>').css({
            'margin-left': '8px',
          })),
          (y = $('<input type="checkbox">').appendTo(b)),
          (g = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (C = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (n = this.addLabeledRow(a, $.t('Left End'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(g)
            .append(c),
          (n = this.addLabeledRow(a, $.t('Right End'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(C)
            .append(b),
          (_ = $(
            "<select><option value='" +
              h.Left +
              "'>" +
              $.t('Left') +
              "</option><option value='" +
              h.Center +
              "'>" +
              $.t('Center') +
              "</option><option value='" +
              h.Right +
              "'>" +
              $.t('Right') +
              '</option></select>'
          )),
          (m = this.addLabeledRow(a, $.t('Stats Position'))),
          $('<td colspan="3">')
            .appendTo(m)
            .append(_),
          (n = this.addLabeledRow(a, $.t('Stats Text Color'))),
          (w = this.createColorPicker()),
          $('<td>')
            .append(w)
            .appendTo(n),
          this.bindControl(
            new r(
              w,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Text Color'
            )
          ),
          (T = $('<input type="checkbox">')),
          (f = $('<input type="checkbox">')),
          (v = $('<input type="checkbox">')),
          (L = $('<input type="checkbox">')),
          (k = $('<input type="checkbox">')),
          (S = $('<input type="checkbox">')),
          (x = $('<input type="checkbox">')),
          (n = this.addLabeledRow(a, $.t('Show Price Range'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(T),
          (n = this.addLabeledRow(a, $.t('Show Bars Range'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(f),
          (n = this.addLabeledRow(a, $.t('Show Date/Time Range'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(v),
          (n = this.addLabeledRow(a, $.t('Show Distance'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(L),
          (n = this.addLabeledRow(a, $.t('Show Angle'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(k),
          (n = this.addLabeledRow(a, $.t('Always Show Stats'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(S),
          (n = this.addLabeledRow(a, $.t('Show Middle Point'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(x),
          this.bindControl(
            new l(
              u,
              this._linetool.properties().extendLeft,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Extending Left'
            )
          ),
          this.bindControl(
            new l(
              y,
              this._linetool.properties().extendRight,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Extending Right'
            )
          ),
          this.bindControl(
            new r(
              o,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Color'
            )
          ),
          this.bindControl(
            new s(
              i,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Style'
            )
          ),
          this.bindControl(
            new p(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Width'
            )
          ),
          this.bindControl(
            new s(
              g,
              this._linetool.properties().leftEnd,
              parseInt,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Left End'
            )
          ),
          this.bindControl(
            new s(
              C,
              this._linetool.properties().rightEnd,
              parseInt,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Right End'
            )
          ),
          this.bindControl(
            new l(
              T,
              this._linetool.properties().showPriceRange,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Show Price Range'
            )
          ),
          this.bindControl(
            new l(
              f,
              this._linetool.properties().showBarsRange,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Show Bars Range'
            )
          ),
          this.bindControl(
            new l(
              v,
              this._linetool.properties().showDateTimeRange,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Show Date/Time Range'
            )
          ),
          this.bindControl(
            new l(
              L,
              this._linetool.properties().showDistance,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Show Distance'
            )
          ),
          this.bindControl(
            new l(
              k,
              this._linetool.properties().showAngle,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Show Angle'
            )
          ),
          this.bindControl(
            new l(
              S,
              this._linetool.properties().alwaysShowStats,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Always Show Stats'
            )
          ),
          this.bindControl(
            new l(
              x,
              this._linetool.properties().showMiddlePoint,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Show Middle Point'
            )
          ),
          this.bindControl(
            new s(
              _,
              this._linetool.properties().statsPosition,
              parseInt,
              !0,
              this.model(),
              'Change ' + this._linetool.name() + ' Stats Position'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  346: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      a.call(this, e, t, i), this.prepareLayout();
    }
    function n(e, t, i) {
      s.call(this, e, t, i);
    }
    var a = i(825),
      s = i(691),
      r = i(823),
      l = r.BooleanBinder,
      p = r.SimpleComboBinder,
      d = r.SliderBinder,
      h = r.ColorBinding,
      c = i(830).createLineStyleEditor;
    inherit(o, a),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = c()),
          (i = this.createColorPicker()),
          (o = this.addLabeledRow(this._table, 'Line')),
          $('<td>').prependTo(o),
          $('<td>')
            .append(i)
            .appendTo(o),
          $('<td>')
            .append(e)
            .appendTo(o),
          $('<td>')
            .append(t.render())
            .appendTo(o),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          (o = $('<tr>').appendTo(this._table)),
          $('<td>')
            .append(n)
            .prependTo(o),
          this.createLabeledCell(2, window.t('Show Time'), n).appendTo(o),
          this.bindControl(
            new l(
              n,
              this._linetool.properties().showTime,
              !0,
              this.model(),
              'Change Vert Line Time Visibility'
            )
          ),
          this.bindControl(
            new h(
              i,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Vert Line Color'
            )
          ),
          this.bindControl(
            new p(
              t,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Vert Line Style'
            )
          ),
          this.bindControl(
            new d(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Vert Line Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      inherit(n, s),
      (n.prototype.prepareLayout = function() {
        var e, t, i, o;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = this._linetool.points()[0]) &&
            ((t = $('<input type="text" class="ticker">')),
            (i = $('<tr>').appendTo(this._table)),
            $('<td>' + $.t('Bar #') + '</td>').appendTo(i),
            $('<td>')
              .append(t)
              .appendTo(i),
            (o = this._linetool.properties().points[0]),
            this.bindBarIndex(
              o.bar,
              t,
              this.model(),
              'Change ' + this._linetool + ' point bar index'
            ),
            this.loadData());
      }),
      (t.LineToolVertLineStylesPropertyPage = o),
      (t.LineToolVertLineInputsPropertyPage = n);
  },
  347: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      a.call(this, e, t, i), this.prepareLayout();
    }
    function n(e, t, i) {
      s.call(this, e, t, i);
    }
    var a = i(825),
      s = i(691),
      r = i(823),
      l = r.BooleanBinder,
      p = r.SimpleComboBinder,
      d = r.SliderBinder,
      h = r.ColorBinding,
      c = i(830).createLineStyleEditor;
    inherit(o, a),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, s, r;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = c()),
          (i = this.createColorPicker()),
          (o = this.addLabeledRow(this._table, 'Line')),
          $('<td>').prependTo(o),
          $('<td>')
            .append(i)
            .appendTo(o),
          $('<td>')
            .append(e)
            .appendTo(o),
          $('<td>')
            .append(t.render())
            .appendTo(o),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          (a = $('<tr>').appendTo(this._table)),
          $('<td>')
            .append(n)
            .prependTo(a),
          this.createLabeledCell(2, window.t('Show Price'), n).appendTo(a),
          (s = $("<input type='checkbox' class='visibility-switch'>")),
          (r = $('<tr>').appendTo(this._table)),
          $('<td>')
            .append(s)
            .prependTo(r),
          this.createLabeledCell(2, window.t('Show Time'), s).appendTo(r),
          this.bindControl(
            new l(
              s,
              this._linetool.properties().showTime,
              !0,
              this.model(),
              'Change Cross Line Time Visibility'
            )
          ),
          this.bindControl(
            new l(
              n,
              this._linetool.properties().showPrice,
              !0,
              this.model(),
              'Change Cross Line Price Visibility'
            )
          ),
          this.bindControl(
            new h(
              i,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Cross Line Color'
            )
          ),
          this.bindControl(
            new p(
              t,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Cross Line Style'
            )
          ),
          this.bindControl(
            new d(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Cross Line Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      inherit(n, s),
      (n.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2" width="100%">'
        )),
          (e = this._linetool.points()[0]) &&
            ((t = $('<input type="text" class="ticker">')),
            (i = $('<tr>').appendTo(this._table)),
            $('<td>' + $.t('Bar #') + '</td>').appendTo(i),
            $('<td>')
              .append(t)
              .appendTo(i),
            (o = this._linetool.properties().points[0]),
            this.bindBarIndex(
              o.bar,
              t,
              this.model(),
              'Change ' + this._linetool + ' point bar index'
            ),
            (n = this.createPriceEditor(o.price)),
            $('<td>' + $.t('Price') + '</td>').appendTo(i),
            $('<td>')
              .append(n)
              .appendTo(i),
            this.loadData());
      }),
      (t.LineToolCrossLineStylesPropertyPage = o),
      (t.LineToolCrossLineInputsPropertyPage = n);
  },
  691: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      a.call(this, e, t), (this._linetool = i), this.prepareLayout();
    }
    var n = i(823),
      a = n.PropertyPage,
      s = n.GreateTransformer,
      r = n.LessTransformer,
      l = n.ToIntTransformer,
      p = n.SimpleStringBinder;
    i(845),
      inherit(o, a),
      (o.BarIndexPastLimit = -5e4),
      (o.BarIndexFutureLimit = 15e3),
      (o.prototype.bindBarIndex = function(e, t, i, n) {
        var a = [
          l(e.value()),
          s(o.BarIndexPastLimit),
          r(o.BarIndexFutureLimit),
        ];
        this.bindControl(this.createStringBinder(t, e, a, !0, i, n));
      }),
      (o.prototype.createPriceEditor = function(e) {
        var t,
          i,
          o,
          n = this._linetool,
          a = n.ownerSource().formatter(),
          s = function(e) {
            return a.format(e);
          },
          r = function(e) {
            var t = a.parse(e);
            if (t.res) return t.price ? t.price : t.value;
          },
          l = $("<input type='text'>");
        return (
          l.TVTicker({
            step: a._minMove / a._priceScale || 1,
            formatter: s,
            parser: r,
          }),
          e &&
            ((t = [
              function(t) {
                var i = r(t);
                return void 0 === i ? e.value() : i;
              },
            ]),
            (i = 'Change ' + n.title() + ' point price'),
            (o = this.createStringBinder(l, e, t, !1, this.model(), i)),
            o.addFormatter(function(e) {
              return a.format(e);
            }),
            this.bindControl(o)),
          l
        );
      }),
      (o.prototype._createPointRow = function(e, t, i) {
        var o,
          n,
          a,
          s,
          r,
          l = $('<tr>'),
          p = $('<td>');
        return (
          p.html($.t('Price') + i),
          p.appendTo(l),
          (o = $('<td>')),
          o.appendTo(l),
          (n = this.createPriceEditor(t.price)),
          n.appendTo(o),
          (a = $('<td>')),
          a.html($.t('Bar #')),
          a.appendTo(l),
          (s = $('<td>')),
          s.appendTo(l),
          (r = $("<input type='text'>")),
          r.appendTo(s),
          r.addClass('ticker'),
          this.bindBarIndex(
            t.bar,
            r,
            this.model(),
            'Change ' + this._linetool.title() + ' point bar index'
          ),
          l
        );
      }),
      (o.prototype.prepareLayoutForTable = function(e) {
        var t,
          i,
          o,
          n,
          a,
          s = this._linetool.points(),
          r = s.length;
        for (t = 0; t < s.length; t++)
          (i = s[t]),
            (o = this._linetool.properties().points[t]) &&
              ((n = t || r > 1 ? ' ' + (t + 1) : ''),
              (a = this._createPointRow(i, o, n)),
              a.appendTo(e));
      }),
      (o.prototype.prepareLayout = function() {
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          this.prepareLayoutForTable(this._table),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (o.prototype.createStringBinder = function(e, t, i, o, n, a) {
        return new p(e, t, i, o, n, a);
      }),
      (e.exports = o);
  },
  692: function(e, t, i) {
    (function(e) {
      function o(e, t, i, o, n) {
        p.call(this, e, t),
          (this._study = i),
          (this._showOnlyConfirmInputs = o),
          (this._symbolSearchZindex = n),
          this.prepareLayout(),
          (this._$symbolSearchPopup = null);
      }
      var n = i(823),
        a = n.UppercaseTransformer,
        s = n.SymbolBinder,
        r = n.BarTimeBinder,
        l = n.SessionBinder,
        p = n.PropertyPage,
        d = n.GreateTransformer,
        h = n.LessTransformer,
        c = n.ToIntTransformer,
        u = n.ToFloatTransformer,
        b = n.SymbolInfoSymbolTransformer,
        y = n.SimpleComboBinder,
        g = n.BooleanBinder,
        C = n.SimpleStringBinder,
        _ = i(128).bindToInput,
        m = i(105).NumericFormatter,
        w = i(26),
        T = i(4).getLogger('Chart.Study.PropertyPage.Inputs');
      inherit(o, p),
        (o.prototype._addSessionEditor = function(e, t, i, o) {
          var n, a, s, r, p, d;
          if ('session' !== i.type)
            return void T.logError(
              'Session editor adding FAILED: wrong input type.'
            );
          (n = function(e, t) {
            var i,
              o = $('<td/>');
            o.appendTo(e),
              o.css('padding-left', '0px'),
              o.css('padding-right', '0px'),
              (i = $('<input>')),
              i.attr('type', 'text'),
              i.addClass('ticker'),
              i.css('width', '40px'),
              i.attr('id', t),
              i.appendTo(o);
          }),
            (a = function(e, t, i) {
              var o,
                n = $('<td/>');
              n.css('padding-left', i),
                n.css('padding-right', i),
                n.appendTo(e),
                (o = $('<div/>')),
                o.appendTo(n),
                o.append(t),
                o.css('font-size', '150%');
            }),
            (s = $('<table/>')),
            s.appendTo(e),
            (r = $('<tr/>')),
            r.appendTo(s),
            (p = ['start_hours', 'start_minutes', 'end_hours', 'end_minutes']),
            n.call(this, r, p[0]),
            a.call(this, r, ':', 0),
            n.call(this, r, p[1]),
            a.call(this, r, '-', 4),
            n.call(this, r, p[2]),
            a.call(this, r, ':', 0),
            n.call(this, r, p[3]),
            (d = !1),
            this.bindControl(new l(r, p, t, d, this.model(), o));
        }),
        (o.prototype.prepareControl = function(t, i, o) {
          function n(e) {
            return function(t) {
              var i,
                o,
                n,
                a = this,
                s = null;
              if (0 === t.indexOf('#')) {
                if (
                  ((i = t.slice(1, t.indexOf('$'))),
                  null === (o = E._model.model().getStudyById(i)))
                )
                  return void T.logError('Can not get Study by id ' + i);
                if ((o.isStarted() || o.start(null, !0), !(n = o.sourceId())))
                  return void T.logError(
                    'Can not get source id for ' + o.metaInfo().id
                  );
                s = t.replace(/^[^\$]+/, n);
              }
              (!~t.indexOf('$') && !~t.indexOf('#')) ||
                E._study.isStarted() ||
                E._study.start(null, !0),
                E._study.testInputValue(e, t)
                  ? a.setValueToProperty(s || a.value())
                  : a.setValue(E._property.inputs[e.id].value());
            };
          }
          function a(e) {
            return function(t) {
              var i, o, n, a;
              if (
                e.hasOwnProperty(t) ||
                0 === t.indexOf('#') ||
                !~t.indexOf('$')
              )
                return t;
              for (
                i = t.slice(0, t.indexOf('$')),
                  o = E._model.model().allStudies(),
                  n = 0;
                n < o.length;
                ++n
              )
                if (((a = o[n]), a.sourceId() === i)) {
                  t = t.replace(/^[^\$]+/, '#' + a.id());
                  break;
                }
              return t;
            };
          }
          var s,
            r,
            l,
            p,
            d,
            h,
            c,
            u,
            b,
            y,
            g,
            C,
            m,
            f,
            v,
            L,
            k,
            S,
            x,
            P,
            B,
            E = this,
            R = null,
            F = null,
            I = null;
          if ('resolution' === t.type)
            R = $(
              '<select><option value="1">1</option><option value="3">3</option><option value="5">5</option><option value="15">15</option><option value="30">30</option><option value="45">45</option><option value="60">1' +
                window.t('h', { context: 'interval_short' }) +
                '</option><option value="120">2' +
                window.t('h', { context: 'interval_short' }) +
                '</option><option value="180">3' +
                window.t('h', { context: 'interval_short' }) +
                '</option><option value="D">1' +
                window.t('D', { context: 'interval_short' }) +
                '</option><option value="W">1' +
                window.t('W', { context: 'interval_short' }) +
                '</option></select>'
            );
          else if ('symbol' === t.type)
            (R = $('<input class="symbol-edit single">')),
              _(R, {
                onPopupOpen: function(e) {
                  (this._$symbolSearchPopup = e),
                    this._symbolSearchZindex &&
                      e.css('z-index', this._symbolSearchZindex);
                }.bind(this),
                onPopupClose: function() {
                  this._$symbolSearchPopup = null;
                }.bind(this),
              }),
              i.attr('colspan', 5);
          else if ('session' === t.type)
            this._addSessionEditor(i, this._property.inputs[t.id], t, o);
          else if ('source' === t.type) {
            for (
              s = {},
                r = {
                  open: window.t('open'),
                  high: window.t('high'),
                  low: window.t('low'),
                  close: window.t('close'),
                  hl2: window.t('hl2'),
                  hlc3: window.t('hlc3'),
                  ohlc4: window.t('ohlc4'),
                },
                l = Object.keys(r),
                p = 0;
              p < l.length;
              ++p
            )
              s[l[p]] || (s[l[p]] = l[p]);
            if ((d = this._study && this._study.isChildStudy())) {
              (h = this._study.source()),
                (c = h.title(!0, null, !0)),
                (u = w.getChildSourceInputTitles(
                  t,
                  this._study.source().metaInfo(),
                  c
                ));
              for (b in s)
                u[b] && (s[b] = 1 === Object.keys(u).length ? c : u[b]);
            }
            if (
              e.enabled('study_on_study') &&
              this._study &&
              w.isSourceInput(t) &&
              (d || w.canBeChild(this._study.metaInfo()))
            ) {
              for (
                y = [this._study],
                  y = y.concat(this._study.getAllChildren()),
                  g = this._model.model().allStudies(),
                  C = 0;
                C < g.length;
                ++C
              )
                if (((m = g[C]), -1 === y.indexOf(m) && m.canHaveChildren()))
                  if (
                    ((f = m.title(!0, null, !0)),
                    (v = m.sourceId() || '#' + m.id()),
                    (L = m.metaInfo()),
                    (k = L.styles),
                    (S = L.plots || []),
                    1 === S.length)
                  )
                    s[v + '$0'] = f;
                  else
                    for (p = 0; p < S.length; ++p)
                      (x = S[p]),
                        ~w.CHILD_STUDY_ALLOWED_PLOT_TYPES.indexOf(x.type) &&
                          (s[v + '$' + p] =
                            f +
                            ': ' +
                            ((k && k[x.id] && k[x.id].title) || x.id));
              (F = n(t)), (I = a(s));
            }
            R = $(document.createElement('select'));
            for (P in s)
              (B = r[P] || s[P]),
                $('<option>')
                  .attr('value', P)
                  .text(B)
                  .appendTo(R);
            i.addClass('js-value-cell');
          } else if (t.options)
            for (R = $('<select/>'), C = 0; C < t.options.length; C++)
              (P = t.options[C]),
                $("<option value='" + P + "'>" + P + '</option>').appendTo(R);
          else
            (R = $('<input/>')),
              'bool' === t.type
                ? R.attr('type', 'checkbox')
                : R.attr('type', 'text');
          return (
            R &&
              (R.appendTo(i),
              R.is(':checkbox') ||
                'symbol' === t.type ||
                R.css('width', '100px')),
            { valueEditor: R, valueSetter: F, propertyChangedHook: I }
          );
        }),
        (o.prototype._symbolInfoBySymbolProperty = function(e) {
          return this._study.resolvedSymbolInfoBySymbol(e.value());
        }),
        (o.prototype._sortInputs = function(e) {
          return e;
        }),
        (o.prototype.prepareLayoutImpl = function(e, t) {
          function i(e) {
            return new m().format(e);
          }
          var o,
            n,
            l,
            p,
            _,
            w,
            T,
            f,
            v,
            L,
            k,
            S,
            x,
            P,
            B,
            E,
            R,
            F,
            I = this._sortInputs(e.inputs);
          for (o = 0; o < I.length; o++)
            (n = I[o]),
              'first_visible_bar_time' !== (l = n.id) &&
                'last_visible_bar_time' !== l &&
                'time' !== n.type &&
                (n.isHidden ||
                  (this._showOnlyConfirmInputs && !n.confirm) ||
                  (void 0 === n.groupId &&
                    ((p =
                      n.name ||
                      l.toLowerCase().replace(/\b\w/g, function(e) {
                        return e.toUpperCase();
                      })),
                    (_ = 'Change ' + p),
                    (w = $('<tr/>')),
                    w.appendTo(t),
                    (T = $('<td/>')),
                    T.appendTo(w),
                    T.addClass('propertypage-name-label'),
                    T.text(window.t(p, { context: 'input' })),
                    (f = $('<td/>')),
                    f.appendTo(w),
                    (v = this.prepareControl(n, f, _)),
                    (L = v.valueEditor),
                    (k = v.valueSetter),
                    (S = v.propertyChangedHook),
                    n.options
                      ? this.bindControl(
                          new y(
                            L,
                            this._property.inputs[l],
                            null,
                            !0,
                            this.model(),
                            _,
                            k,
                            S
                          )
                        )
                      : 'bar_time' === n.type
                      ? ((x = 10),
                        this.bindControl(
                          new r(
                            L,
                            this._property.inputs[l],
                            !0,
                            this.model(),
                            _,
                            this.model().mainSeries(),
                            x
                          )
                        ),
                        L.addClass('ticker'))
                      : 'integer' === n.type
                      ? ((P = [c(n.defval)]),
                        (0 === n.min || n.min) && P.push(d(n.min)),
                        (0 === n.max || n.max) && P.push(h(n.max)),
                        this.bindControl(
                          new C(
                            L,
                            this._property.inputs[l],
                            P,
                            !1,
                            this.model(),
                            _
                          )
                        ),
                        L.addClass('ticker'),
                        isFinite(n.step) &&
                          n.step > 0 &&
                          L.attr('data-step', n.step))
                      : 'float' === n.type
                      ? ((P = [u(n.defval)]),
                        (0 === n.min || n.min) && P.push(d(n.min)),
                        (0 === n.max || n.max) && P.push(h(n.max)),
                        (B = new C(
                          L,
                          this._property.inputs[l],
                          P,
                          !1,
                          this.model(),
                          _
                        )),
                        B.addFormatter(i),
                        this.bindControl(B),
                        L.addClass('ticker'),
                        isFinite(n.step) &&
                          n.step > 0 &&
                          L.attr('data-step', n.step))
                      : 'text' === n.type
                      ? this.bindControl(
                          new C(
                            L,
                            this._property.inputs[l],
                            null,
                            !1,
                            this.model(),
                            _
                          )
                        )
                      : 'bool' === n.type
                      ? this.bindControl(
                          new g(
                            L,
                            this._property.inputs[l],
                            !0,
                            this.model(),
                            _
                          )
                        )
                      : 'resolution' === n.type
                      ? this.bindControl(
                          new y(
                            L,
                            this._property.inputs[l],
                            a,
                            !0,
                            this.model(),
                            'Change Interval'
                          )
                        )
                      : 'symbol' === n.type &&
                        ((E = this._symbolInfoBySymbolProperty.bind(
                          this,
                          this._property.inputs[l]
                        )),
                        (R = b(E, this._property.inputs[l])),
                        (F = new s(
                          L,
                          this._property.inputs[l],
                          !0,
                          this.model(),
                          'Change Symbol',
                          R,
                          this._study.symbolsResolved()
                        )),
                        this.bindControl(F)))));
          this._property.offset &&
            ((p = this._property.offset.title
              ? this._property.offset.title.value()
              : window.t('Offset')),
            (L = this.addOffsetEditorRow(t, p)),
            (P = [c(this._property.offset.val)]),
            P.push(d(this._property.offset.min)),
            P.push(h(this._property.offset.max)),
            this.bindControl(
              new C(
                L,
                this._property.offset.val,
                P,
                !1,
                this.model(),
                'Undo ' + p
              )
            )),
            this._property.offsets &&
              $.each(
                e.plots,
                function(e, i) {
                  var o, n, a;
                  this._property.offsets[i.id] &&
                    ((o = this._property.offsets[i.id]),
                    (void 0 !== o.isHidden && o.isHidden.value()) ||
                      ((n = o.title.value()),
                      (L = this.addOffsetEditorRow(t, n)),
                      (a = [c(o.val)]),
                      a.push(d(o.min)),
                      a.push(h(o.max)),
                      this.bindControl(
                        new C(L, o.val, a, !1, this.model(), 'Undo ' + n)
                      )));
                }.bind(this)
              );
        }),
        (o.prototype.prepareLayout = function() {
          (this._table = $('<table/>')),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2');
          var e = this._study.metaInfo();
          this.prepareLayoutImpl(e, this._table), this.loadData();
        }),
        (o.prototype.symbolSearchPopup = function() {
          return this._$symbolSearchPopup;
        }),
        (o.prototype.widget = function() {
          return this._table;
        }),
        (t.StudyInputsPropertyPage = o);
    }.call(t, i(5)));
  },
  694: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.FloatBinder,
      r = a.BooleanBinder,
      l = a.SliderBinder,
      p = a.ColorBinding,
      d = a.SimpleComboBinder,
      h = i(829).addColorPicker,
      c = i(830).createLineStyleEditor,
      u = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t) {
        var i,
          o,
          n,
          a,
          l,
          d = t || $('<tr>').appendTo(this._table),
          c = $('<td>');
        return (
          c.appendTo(d),
          (i = $("<input type='checkbox' class='visibility-switch'>")),
          i.appendTo(c),
          t && i.css('margin-left', '15px'),
          (o = $('<td>')),
          o.appendTo(d),
          (n = $("<input type='text'>")),
          n.appendTo(o),
          n.css('width', '70px'),
          this.bindControl(
            new s(n, e.coeff, !1, this.model(), 'Change Pitchfork Line Coeff')
          ),
          (a = $("<td class='colorpicker-cell'>")),
          a.appendTo(d),
          (l = h(a)),
          this.bindControl(
            new r(
              i,
              e.visible,
              !0,
              this.model(),
              'Change Fib Retracement Line Visibility'
            )
          ),
          this.bindControl(
            new p(
              l,
              e.color,
              !0,
              this.model(),
              'Change Fib Retracement Line Color',
              0
            )
          ),
          d
        );
      }),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          s,
          b,
          y,
          g,
          C,
          _,
          m,
          w,
          T,
          f,
          v,
          L,
          k,
          S,
          x,
          P,
          B,
          E,
          R,
          F,
          I,
          D,
          V,
          A,
          W,
          M,
          O;
        for (
          this._div = $(document.createElement('div')).addClass(
            'property-page'
          ),
            e = this._linetool.properties().trendline,
            t = $('<table>')
              .appendTo(this._div)
              .css('padding-bottom', '3px'),
            e &&
              ((i = $('<tr>').appendTo(t)),
              (o = $("<input type='checkbox' class='visibility-switch'>")),
              $('<td>')
                .append(o)
                .appendTo(i),
              $('<td>')
                .append($.t('Trend Line'))
                .appendTo(i),
              this.bindControl(
                new r(
                  o,
                  e.visible,
                  !0,
                  this.model(),
                  'Change Fib Retracement Line Visibility'
                )
              ),
              (n = $("<td class='colorpicker-cell'>").appendTo(i)),
              (a = h(n)),
              this.bindControl(
                new p(
                  a,
                  e.color,
                  !0,
                  this.model(),
                  'Change Fib Retracement Line Color',
                  0
                )
              ),
              (s = $('<td>').appendTo(i)),
              (b = this.createLineWidthEditor()),
              b.appendTo(s),
              this.bindControl(
                new l(
                  b,
                  e.linewidth,
                  parseInt,
                  this.model(),
                  'Change Fib Retracement Line Width'
                )
              ),
              (y = $('<td>').appendTo(i)),
              (g = c()),
              g.render().appendTo(y),
              this.bindControl(
                new d(
                  g,
                  e.linestyle,
                  parseInt,
                  !0,
                  this.model(),
                  'Change Fib Retracement Line Style'
                )
              )),
            C = this._linetool.properties().levelsStyle,
            _ = $('<tr>').appendTo(t),
            $('<td>').appendTo(_),
            $('<td>' + $.t('Levels Line') + '</td>').appendTo(_),
            $('<td>').appendTo(_),
            s = $('<td>').appendTo(_),
            b = this.createLineWidthEditor(),
            b.appendTo(s),
            this.bindControl(
              new l(
                b,
                C.linewidth,
                parseInt,
                this.model(),
                'Change Fib Retracement Line Width'
              )
            ),
            y = $('<td>').appendTo(_),
            g = c(),
            g.render().appendTo(y),
            this.bindControl(
              new d(
                g,
                C.linestyle,
                parseInt,
                !0,
                this.model(),
                'Change Fib Retracement Line Style'
              )
            ),
            this._table = $(document.createElement('table')).appendTo(
              this._div
            ),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            m = {},
            w = 0;
          w < 24;
          w++
        )
          (T = w % 8),
            (_ = m[T]),
            (f = 'level' + (w + 1)),
            (m[T] = this.addLevelEditor(this._linetool.properties()[f], _));
        this.addOneColorPropertyWidget(this._table),
          (v = $('<table cellpadding=0 cellspacing=0>').appendTo(this._div)),
          (L = $('<tr>').appendTo(v)),
          this._linetool.properties().extendLines &&
            ((k = $("<input type='checkbox' class='visibility-switch'>")),
            (S = $('<label>')
              .append(k)
              .append($.t('Extend Lines'))),
            $('<td>')
              .append(S)
              .appendTo(L)),
          this._linetool.properties().extendLeft &&
            ((x = $("<input type='checkbox' class='visibility-switch'>")),
            (S = $('<label>')
              .append(x)
              .append($.t('Extend Left'))),
            $('<td>')
              .append(S)
              .appendTo(L)),
          this._linetool.properties().extendRight &&
            ((P = $("<input type='checkbox' class='visibility-switch'>")),
            (S = $('<label>')
              .append(P)
              .append($.t('Extend Right'))),
            $('<td>')
              .append(S)
              .appendTo(L)),
          this._linetool.properties().reverse &&
            ((B = $("<input type='checkbox' class='visibility-switch'>")),
            (S = $('<label>')
              .append(B)
              .append($.t('Reverse'))),
            $('<td>')
              .append(S)
              .appendTo(L)),
          (E = $('<tr>').appendTo(v)),
          (R = $("<input type='checkbox' class='visibility-switch'>")),
          (S = $('<label>')
            .append(R)
            .append($.t('Levels'))),
          $('<td>')
            .append(S)
            .appendTo(E),
          (F = $("<input type='checkbox' class='visibility-switch'>")),
          (S = $('<label>')
            .append(F)
            .append($.t('Prices'))),
          $('<td>')
            .append(S)
            .appendTo(E),
          (I = $("<input type='checkbox' class='visibility-switch'>")),
          (S = $('<label>')
            .append(I)
            .append($.t('Percents'))),
          $('<td>')
            .append(S)
            .appendTo(E),
          (D = $("<table cellspacing='0' cellpadding='0'>").appendTo(
            this._div
          )),
          (V = $(
            "<select><option value='left'>" +
              $.t('left') +
              "</option><option value='center'>" +
              $.t('center') +
              "</option><option value='right'>" +
              $.t('right') +
              '</option></select>'
          )),
          (A = $(
            "<select><option value='bottom'>" +
              $.t('top') +
              "</option><option value='middle'>" +
              $.t('middle') +
              "</option><option value='top'>" +
              $.t('bottom') +
              '</option></select>'
          )),
          (_ = $('<tr>')),
          _.append('<td>' + $.t('Labels') + '</td>')
            .append(V)
            .append('<td>&nbsp</td>')
            .append(A),
          _.appendTo(D),
          (W = $("<table cellspacing='0' cellpadding='0'>").appendTo(
            this._div
          )),
          (_ = $('<tr>').appendTo(W)),
          (M = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(M)
            .appendTo(_),
          this.createLabeledCell($.t('Background'), M).appendTo(_),
          (O = u()),
          $('<td>')
            .append(O)
            .appendTo(_),
          this.bindControl(
            new r(
              F,
              this._linetool.properties().showPrices,
              !0,
              this.model(),
              'Change Gann Fan Prices Visibility'
            )
          ),
          this.bindControl(
            new r(
              R,
              this._linetool.properties().showCoeffs,
              !0,
              this.model(),
              'Change Gann Fan Levels Visibility'
            )
          ),
          this.bindControl(
            new r(
              M,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Fib Retracement Background Visibility'
            )
          ),
          this.bindControl(
            new l(
              O,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Fib Retracement Background Transparency'
            )
          ),
          this._linetool.properties().extendLines &&
            this.bindControl(
              new r(
                k,
                this._linetool.properties().extendLines,
                !0,
                this.model(),
                'Change Fib Retracement Extend Lines'
              )
            ),
          this._linetool.properties().extendLeft &&
            this.bindControl(
              new r(
                x,
                this._linetool.properties().extendLeft,
                !0,
                this.model(),
                'Change Fib Retracement Extend Lines'
              )
            ),
          this._linetool.properties().extendRight &&
            this.bindControl(
              new r(
                P,
                this._linetool.properties().extendRight,
                !0,
                this.model(),
                'Change Fib Retracement Extend Lines'
              )
            ),
          this._linetool.properties().reverse &&
            this.bindControl(
              new r(
                B,
                this._linetool.properties().reverse,
                !0,
                this.model(),
                'Change Fib Retracement Reverse'
              )
            ),
          this.bindControl(
            new d(
              V,
              this._linetool.properties().horzLabelsAlign,
              null,
              !0,
              this.model(),
              'Change Fib Labels Horizontal Alignment'
            )
          ),
          this.bindControl(
            new d(
              A,
              this._linetool.properties().vertLabelsAlign,
              null,
              !0,
              this.model(),
              'Change Fib Labels Vertical Alignment'
            )
          ),
          this.bindControl(
            new r(
              I,
              this._linetool.properties().coeffsAsPercents,
              !0,
              this.model(),
              'Change Fib Retracement Coeffs As Percents'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._div;
      }),
      (e.exports = o);
  },
  704: function(e, t, i) {
    'use strict';
    (function(t) {
      function o(e, t, i) {
        var o,
          n,
          a = t.m_model.properties();
        r.call(this, a, t),
          (o = this._series = t.mainSeries()),
          (this._chart = t.m_model),
          (this._model = t),
          (this._source = i),
          (this._property = a),
          (this._seriesProperty = o.properties()),
          (this._scaleBindings = {}),
          (this._scaleProperties = this._series.priceScale().properties()),
          this._series
            .priceScaleChanged()
            .subscribe(this, this._updateScaleProperties),
          (this._mainSeriesScaleRatioProperty = t.mainSeriesScaleRatioProperty()),
          (this._mainSeriesPriceScaleNameProperty = t.mainSeriesPriceScaleNameProperty()),
          (n = null),
          t.m_model.panes().forEach(function(e) {
            e.dataSources().forEach(function(t) {
              if (t === o) return (n = e), !1;
            });
          }),
          (this._pane = n),
          this.prepareLayout(),
          (this._themes = []),
          (this.supportThemeSwitcher = !1);
      }
      var n,
        a,
        s,
        r,
        l,
        p,
        d,
        h,
        c,
        u,
        b,
        y,
        g,
        C,
        _,
        m,
        w,
        T,
        f,
        v,
        L,
        k,
        S,
        x,
        P;
      i(11),
        (n = i(1031)),
        (a = i(874)),
        (s = i(823)),
        (r = s.PropertyPage),
        (l = s.GreateTransformer),
        (p = s.LessTransformer),
        (d = s.ToIntTransformer),
        (h = s.SimpleStringBinder),
        (c = s.BooleanBinder),
        (u = s.SliderBinder),
        (b = s.ColorBinding),
        (y = s.SimpleComboBinder),
        (g = s.DisabledBinder),
        (C = s.CheckboxWVBinding),
        (_ = s.ToFloatTransformerWithDynamicDefaultValue),
        (m = s.ToFloatLimitedPrecisionTransformer),
        (w = i(40)),
        (T = i(18)),
        (f = i(829).addColorPicker),
        (v = i(830).createLineStyleEditor),
        i(847).bindPopupMenu,
        (L = i(3).DefaultProperty),
        (k = i(200).availableTimezones),
        i(108).isMultipleLayout,
        (S = i(976)),
        i(82).createConfirmDialog,
        (x = i(39).trackEvent),
        (P = !0),
        inherit(o, r),
        inherit(o, n),
        (o.prototype.setScalesOpenTab = function() {
          this.scalesTab &&
            this.scalesTab.data('layout-tab-open', a.TabOpenFrom.Override);
        }),
        (o.prototype.setTmzOpenTab = function() {
          this.tmzSessTable &&
            this.tmzSessTable.data('layout-tab-open', a.TabOpenFrom.Override);
        }),
        (o.prototype.prepareLayout = function() {
          var e,
            i,
            o,
            n,
            s,
            r,
            g,
            L,
            B,
            E,
            R,
            F,
            I,
            D,
            V,
            A,
            W,
            M,
            O,
            z,
            H,
            N,
            G,
            j,
            q,
            U,
            Y,
            K,
            J,
            Z,
            Q,
            X,
            ee,
            te,
            ie,
            oe,
            ne,
            ae,
            se,
            re,
            le,
            pe,
            de,
            he,
            ce,
            ue,
            be,
            ye,
            ge,
            Ce,
            _e,
            $e,
            me,
            we,
            Te,
            fe,
            ve,
            Le,
            ke,
            Se,
            xe,
            Pe,
            Be,
            Ee,
            Re,
            Fe,
            Ie,
            De,
            Ve,
            Ae,
            We,
            Me,
            Oe,
            ze,
            He,
            Ne,
            Ge,
            je,
            qe,
            Ue,
            Ye,
            Ke,
            Je,
            Ze,
            Qe,
            Xe,
            et,
            tt,
            it,
            ot,
            nt,
            at,
            st,
            rt,
            lt,
            pt,
            dt,
            ht,
            ct,
            ut,
            bt,
            yt,
            gt,
            Ct,
            _t,
            $t,
            mt,
            wt,
            Tt,
            ft,
            vt,
            Lt,
            kt,
            St,
            xt,
            Pt,
            Bt,
            Et,
            Rt,
            Ft,
            It,
            Dt,
            Vt,
            At = this;
          if (
            (t.enabled('chart_property_page_style') &&
              ((e = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.style)),
              (i = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.style)),
              (o = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.style)),
              this._prepareSeriesStyleLayout(e, i, o, this._seriesProperty),
              (this._hasSeriesStyleLayout = !0),
              (r = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.style)),
              this.addLabeledRow(r, window.t('Symbol Last Value'), null, 5),
              (V = $('<input type="checkbox">')),
              (A = this.addLabeledRow(r, window.t('Show Line'), V)),
              $('<td>')
                .append(V)
                .prependTo(A),
              $('<td>')
                .css('width', '9px')
                .prependTo(A),
              this.bindControl(
                new c(
                  V,
                  this._seriesProperty.showPriceLine,
                  !0,
                  this.model(),
                  'Change Price Price Line'
                )
              ),
              (W = $('<input type="checkbox">')),
              (M = this.addLabeledRow(
                r,
                window.t('Show Label on Price Scale'),
                W
              )),
              $('<td>')
                .append(W)
                .prependTo(M),
              M.prepend('<td>'),
              this.bindControl(
                new c(
                  W,
                  this._property.scalesProperties.showSeriesLastValue,
                  !0,
                  this.model(),
                  'Change Symbol Last Value Visibility'
                )
              ),
              (O = f($('<td>').appendTo(A))),
              this.bindControl(
                new b(
                  O,
                  this._seriesProperty.priceLineColor,
                  !0,
                  this.model(),
                  'Change Price Line Color'
                )
              ),
              (z = this.createLineWidthEditor()),
              $('<td>')
                .append(z)
                .appendTo(A),
              this.bindControl(
                new u(
                  z,
                  this._seriesProperty.priceLineWidth,
                  !0,
                  this.model(),
                  'Change Price Line Width'
                )
              ),
              (L = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.style)),
              this._pane &&
                ((H = {
                  left: window.t('Scale Left'),
                  right: window.t('Scale Right'),
                  none: window.t('Screen (No Scale)'),
                }),
                (N = this.createScaleNameList(
                  this._mainSeriesPriceScaleNameProperty,
                  this._series,
                  H
                )),
                (G = this.createKeyCombo(N)),
                (j = this.addRow(L)),
                $('<td>' + window.t('Scale') + '</td>').appendTo(j),
                $('<td>')
                  .appendTo(j)
                  .append(G),
                this.bindControl(
                  new y(
                    G,
                    this._mainSeriesPriceScaleNameProperty,
                    null,
                    !0,
                    this.model(),
                    'Change Scale'
                  )
                ))),
            t.enabled('chart_property_page_scales') &&
              ((q = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.scales)),
              (this._scaleBindings.autoScale = {}),
              (this._scaleBindings.autoScaleDisabled = {}),
              (this._scaleBindings.autoScale.control = $(
                '<input type="checkbox">'
              ).change(function() {
                this.checked &&
                  setTimeout(function() {
                    At._model.m_model.invalidate(new T(T.LIGHT_UPDATE));
                  }, 0);
              })),
              (U = this.addLabeledRow(
                q,
                window.t('Auto Scale'),
                this._scaleBindings.autoScale.control
              )),
              $('<td>')
                .append(this._scaleBindings.autoScale.control)
                .prependTo(U),
              (this._scaleBindings.percentage = {}),
              (this._scaleBindings.percentageDisabled = {}),
              (this._scaleBindings.percentage.control = $(
                '<input type="checkbox">'
              )),
              (Y = this.addLabeledRow(
                q,
                window.t('Percentage'),
                this._scaleBindings.percentage.control
              )),
              $('<td>')
                .append(this._scaleBindings.percentage.control)
                .prependTo(Y),
              (this._scaleBindings.indexedTo100 = {}),
              (this._scaleBindings.indexedTo100Disabled = {}),
              (this._scaleBindings.indexedTo100.control = $(
                '<input type="checkbox">'
              )),
              (K = this.addLabeledRow(
                q,
                window.t('Indexed to 100'),
                this._scaleBindings.indexedTo100.control
              )),
              $('<td>')
                .append(this._scaleBindings.indexedTo100.control)
                .prependTo(K),
              (this._scaleBindings.log = {}),
              (this._scaleBindings.logDisabled = {}),
              (this._scaleBindings.log.control = $('<input type="checkbox">')),
              (J = this.addLabeledRow(
                q,
                window.t('Log Scale'),
                this._scaleBindings.log.control
              )),
              $('<td>')
                .append(this._scaleBindings.log.control)
                .prependTo(J),
              (Z = $('<input type="checkbox">').change(function() {
                this.checked &&
                  setTimeout(function() {
                    At._model.m_model.invalidate(new T(T.LIGHT_UPDATE));
                  }, 0);
              })),
              (Q = this.addLabeledRow(q, window.t('Scale Series Only'), Z)),
              $('<td>')
                .append(Z)
                .prependTo(Q),
              this.bindControl(
                new c(
                  Z,
                  this._property.scalesProperties.scaleSeriesOnly,
                  !0,
                  this.model(),
                  'Scale Series Only'
                )
              ),
              (this._scaleBindings.lockScale = {}),
              (this._scaleBindings.lockScale.control = $(
                "<input type='checkbox'/>"
              )),
              (X = this.addLabeledRow(
                q,
                window.t('Lock Scale'),
                this._scaleBindings.lockScale.control
              )),
              $('<td>')
                .append(this._scaleBindings.lockScale.control)
                .prependTo(X),
              (ee = function(e) {
                X.toggle(e.value() === w.STYLE_PNF);
              }),
              this._seriesProperty.style.listeners().subscribe(this, ee),
              t.enabled('support_multicharts') &&
                ((te = $("<input type='checkbox'/>")),
                (ie = this.addLabeledRow(q, window.t('Track Time'), te)),
                $('<td>')
                  .append(te)
                  .prependTo(ie),
                this.bindControl(
                  new C(
                    te,
                    this._model.trackTime(),
                    null,
                    this.model(),
                    'Change track time'
                  )
                )),
              (oe = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.scales)),
              (ne = $(
                '<input type="text" class="ticker ticker--longer-sign_8">'
              )),
              (ae = this.addLabeledRow(oe, window.t('Top Margin'), ne)),
              $('<td>')
                .appendTo(ae)
                .append(ne),
              $('<td>%</td>').appendTo(ae),
              (se = [d(this._property.paneProperties.topMargin.value())]),
              se.push(p(25)),
              se.push(l(0)),
              this.bindControl(
                new h(
                  ne,
                  this._property.paneProperties.topMargin,
                  se,
                  !0,
                  this.model(),
                  'Top Margin'
                )
              ),
              (re = $(
                '<input type="text" class="ticker ticker--longer-sign_8">'
              )),
              (le = this.addLabeledRow(oe, window.t('Bottom Margin'), re)),
              $('<td>')
                .appendTo(le)
                .append(re),
              $('<td>%</td>').appendTo(le),
              (pe = [d(this._property.paneProperties.bottomMargin.value())]),
              pe.push(p(25)),
              pe.push(l(0)),
              this.bindControl(
                new h(
                  re,
                  this._property.paneProperties.bottomMargin,
                  pe,
                  !0,
                  this.model(),
                  'Bottom Margin'
                )
              ),
              (de = $(
                '<input type="text" class="ticker ticker--longer-sign_8">'
              )),
              (he = this.addLabeledRow(oe, window.t('Right Margin'), de)),
              $('<td>')
                .appendTo(he)
                .append(de),
              $(
                '<td>' + window.t('bars', { context: 'margin' }) + '</td>'
              ).appendTo(he),
              (ce = this._chart.timeScale()),
              (ue = [d(ce.defaultRightOffsetProperty().value())]),
              ue.push(p(~~ce.maxRightOffset())),
              ue.push(l(0)),
              this.bindControl(
                new h(
                  de,
                  ce.defaultRightOffsetProperty(),
                  ue,
                  !0,
                  this.model(),
                  'Right Margin'
                )
              ),
              (be = $(
                '<input type="text" class="ticker ticker--longer-sign_8">'
              )),
              (he = this.addLabeledRow(oe, window.t('Price/Bar Ratio'), be)),
              (ye = !0),
              (ge = function(e) {
                this._undoModel.setScaleRatioProperty(
                  this._property,
                  e,
                  this._undoText
                ),
                  ye &&
                    (x('GUI', 'Scales', 'Edit scale ratio value'), (ye = !1));
              }),
              $('<td>')
                .appendTo(he)
                .append(be),
              be.TVTicker({
                step: this._mainSeriesScaleRatioProperty.getStepChangeValue(),
              }),
              (Ce = m('', 7)),
              (_e = [
                _(
                  this._mainSeriesScaleRatioProperty.value.bind(
                    this._mainSeriesScaleRatioProperty
                  )
                ),
                l(this._mainSeriesScaleRatioProperty.getMinValue()),
                p(this._mainSeriesScaleRatioProperty.getMaxValue()),
                Ce,
              ]),
              ($e = new h(
                be,
                this._mainSeriesScaleRatioProperty,
                _e,
                !1,
                this.model(),
                'Price/Bar Ratio',
                ge
              )),
              $e.addFormatter(Ce),
              this.bindControl($e),
              (me = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.scales)),
              (we = $("<input type='checkbox' />")),
              (Te = this.addLabeledRow(me, window.t('Left Axis'), we)),
              $('<td>')
                .append(we)
                .prependTo(Te),
              setTimeout(
                function() {
                  this.bindControl(
                    new c(
                      we,
                      this._property.scalesProperties.showLeftScale,
                      !0,
                      this.model(),
                      'Show Left Axis'
                    )
                  );
                }.bind(this),
                0
              ),
              (fe = $("<input type='checkbox' />")),
              (ve = this.addLabeledRow(me, window.t('Right Axis'), fe)),
              $('<td>')
                .append(fe)
                .prependTo(ve),
              setTimeout(
                function() {
                  this.bindControl(
                    new c(
                      fe,
                      this._property.scalesProperties.showRightScale,
                      !0,
                      this.model(),
                      'Show Right Axis'
                    )
                  );
                }.bind(this),
                0
              ),
              t.enabled('countdown') &&
                ((Le = $("<input type='checkbox'>")),
                (ke = this.addLabeledRow(me, window.t('Countdown'), Le)),
                $('<td>')
                  .append(Le)
                  .prependTo(ke),
                this.bindControl(
                  new c(
                    Le,
                    this._seriesProperty.showCountdown,
                    !0,
                    this.model(),
                    'Change Show Countdown'
                  )
                )),
              (Se = $('<input type="checkbox">')),
              (xe = this.addLabeledRow(
                me,
                window.t('Indicator Last Value'),
                Se
              )),
              $('<td>')
                .append(Se)
                .prependTo(xe),
              this.bindControl(
                new c(
                  Se,
                  this._property.scalesProperties.showStudyLastValue,
                  !0,
                  this.model(),
                  'Change Indicator Last Value Visibility'
                )
              ),
              (Pe = $('<input type="checkbox">')),
              (Be = this.addLabeledRow(me, window.t('Symbol Labels'), Pe)),
              $('<td>')
                .append(Pe)
                .prependTo(Be),
              this.bindControl(
                new c(
                  Pe,
                  this._property.scalesProperties.showSymbolLabels,
                  !0,
                  this.model(),
                  'Show Symbol Labels'
                )
              ),
              (Ee = $('<input type="checkbox">')),
              (Re = this.addLabeledRow(me, window.t('Indicator Labels'), Ee)),
              $('<td>')
                .append(Ee)
                .prependTo(Re),
              this.bindControl(
                new c(
                  Ee,
                  this._property.scalesProperties.showStudyPlotLabels,
                  !0,
                  this.model(),
                  'Show Study Plots Labels'
                )
              ),
              (this._scaleBindings.alignLabels = {}),
              (this._scaleBindings.alignLabels.control = $(
                "<input type='checkbox' />"
              )),
              (Fe = this.addLabeledRow(
                me,
                window.t('No Overlapping Labels'),
                this._scaleBindings.alignLabels.control
              )),
              $('<td>')
                .append(this._scaleBindings.alignLabels.control)
                .prependTo(Fe),
              this._bindScaleProperties(),
              (Ie = $('<div class="property-page-column-2">')
                .append(q)
                .append(oe)),
              (De = $('<div class="property-page-column-2">').append(me)),
              (B = $('<div>')
                .css('min-width', '520px')
                .data('layout-tab', a.TabNames.scales)),
              B.append(Ie).append(De),
              (this.scalesTab = B),
              (g = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.style)),
              (Ve = this.createSeriesMinTickEditor()),
              (Ae = $('<tr>')),
              (We = $('<tr>').appendTo(me)),
              (Me = $('<td colspan="2">').appendTo(We)),
              $('<td>' + window.t('Decimal Places') + '</td>').appendTo(Ae),
              $('<td>')
                .append(Ve)
                .appendTo(Ae),
              g.append(Ae).appendTo(Me),
              this.bindControl(
                new y(
                  Ve,
                  this._seriesProperty.minTick,
                  null,
                  !0,
                  this.model(),
                  'Change Decimal Places'
                )
              )),
            t.enabled('chart_property_page_background') &&
              ((Oe = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              )),
              (ze = this.createColorPicker({ hideTransparency: !0 })),
              (He = this.addLabeledRow(Oe, window.t('Background'))),
              $('<td colspan="2">')
                .append(ze)
                .appendTo(He),
              this.bindControl(
                new b(
                  ze,
                  this._property.paneProperties.background,
                  !0,
                  this.model(),
                  'Change Chart Background Color'
                )
              ),
              (Ne = this.addLabeledRow(Oe, window.t('Vert Grid Lines'))),
              (Ge = this.createColorPicker()),
              $('<td>')
                .append(Ge)
                .appendTo(Ne),
              this.bindControl(
                new b(
                  Ge,
                  this._property.paneProperties.vertGridProperties.color,
                  !0,
                  this.model(),
                  'Change Vert Grid Lines Color'
                )
              ),
              (je = v()),
              $('<td colspan="2">')
                .append(je.render())
                .appendTo(Ne),
              this.bindControl(
                new y(
                  je,
                  this._property.paneProperties.vertGridProperties.style,
                  parseInt,
                  !0,
                  this.model(),
                  'Change Vert Grid Lines Style'
                )
              ),
              (qe = this.addLabeledRow(Oe, window.t('Horz Grid Lines'))),
              (Ue = this.createColorPicker()),
              $('<td>')
                .append(Ue)
                .appendTo(qe),
              this.bindControl(
                new b(
                  Ue,
                  this._property.paneProperties.horzGridProperties.color,
                  !0,
                  this.model(),
                  'Change Horz Grid Lines Color'
                )
              ),
              (Ye = v()),
              $('<td colspan="2">')
                .append(Ye.render())
                .appendTo(qe),
              this.bindControl(
                new y(
                  Ye,
                  this._property.paneProperties.horzGridProperties.style,
                  parseInt,
                  !0,
                  this.model(),
                  'Change Horz Grid Lines Style'
                )
              ),
              (Ke = this.createColorPicker()),
              (Je = this.addLabeledRow(Oe, window.t('Scales Text'))),
              $('<td>')
                .append(Ke)
                .appendTo(Je),
              this.bindControl(
                new b(
                  Ke,
                  this._property.scalesProperties.textColor,
                  !0,
                  this.model(),
                  'Change Scales Text Color'
                )
              ),
              (Ze = this.createFontSizeEditor()),
              $('<td>')
                .append(Ze)
                .appendTo(Je),
              this.bindControl(
                new y(
                  Ze,
                  this._property.scalesProperties.fontSize,
                  parseInt,
                  !0,
                  this.model(),
                  'Change Scales Font Size'
                )
              ),
              (Qe = this.createColorPicker()),
              (Xe = this.addLabeledRow(Oe, window.t('Scales Lines'))),
              $('<td colspan="2">')
                .append(Qe)
                .appendTo(Xe),
              this.bindControl(
                new b(
                  Qe,
                  this._property.scalesProperties.lineColor,
                  !0,
                  this.model(),
                  'Change Scales Lines Color'
                )
              ),
              null !== this._model.watermarkSource() &&
                ((et = this.addLabeledRow(Oe, window.t('Watermark'))),
                (tt = this.createColorPicker()),
                $('<td>')
                  .append(tt)
                  .appendTo(et),
                this.bindControl(
                  new b(
                    tt,
                    this._property.symbolWatermarkProperties.color,
                    !0,
                    this.model(),
                    'Change Symbol Watermark Color',
                    this._property.symbolWatermarkProperties.transparency
                  )
                )),
              (it = this.addLabeledRow(Oe, window.t('Crosshair'))),
              (ot = this.createColorPicker()),
              $('<td>')
                .append(ot)
                .appendTo(it),
              this.bindControl(
                new b(
                  ot,
                  this._property.paneProperties.crossHairProperties.color,
                  !0,
                  this.model(),
                  'Change Crosshair Color',
                  this._property.paneProperties.crossHairProperties.transparency
                )
              ),
              (nt = v()),
              $('<td>')
                .append(nt.render())
                .appendTo(it),
              this.bindControl(
                new y(
                  nt,
                  this._property.paneProperties.crossHairProperties.style,
                  parseInt,
                  !0,
                  this.model(),
                  'Change Crosshair Style'
                )
              ),
              (at = this.createLineWidthEditor()),
              $('<td>')
                .append(at)
                .appendTo(this.addRow(Oe).prepend('<td/><td/>')),
              this.bindControl(
                new u(
                  at,
                  this._property.paneProperties.crossHairProperties.width,
                  !0,
                  this.model(),
                  'Change Crosshair Width'
                )
              ),
              (st = $('<table class="property-page">')),
              (rt = this.addLabeledRow(
                st,
                window.t('Navigation Buttons'),
                null,
                !0
              )),
              (lt = $(document.createElement('select'))),
              S.availableValues().forEach(function(e) {
                $(document.createElement('option'))
                  .attr('value', e.value)
                  .text(e.title)
                  .appendTo(lt);
              }),
              $('<td>')
                .append(lt)
                .appendTo(rt),
              this.bindControl(
                new y(
                  lt,
                  S.property(),
                  null,
                  !0,
                  this.model(),
                  'Change Navigation Buttons Visibility'
                )
              ),
              (pt = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              )),
              (dt = $('<input type="checkbox">')),
              (ht = this.addLabeledRow(pt, window.t('Symbol Description'), dt)),
              $('<td>')
                .append(dt)
                .prependTo(ht),
              this.bindControl(
                new c(
                  dt,
                  this._property.paneProperties.legendProperties.showSeriesTitle,
                  !0,
                  this.model(),
                  'Change Symbol Description Visibility'
                )
              ),
              (ct = $('<input type="checkbox">')),
              (ut = this.addLabeledRow(pt, window.t('OHLC Values'), ct)),
              $('<td>')
                .append(ct)
                .prependTo(ut),
              this.bindControl(
                new c(
                  ct,
                  this._property.paneProperties.legendProperties.showSeriesOHLC,
                  !0,
                  this.model(),
                  'Change OHLC Values Visibility'
                )
              ),
              P &&
                ((bt = $('<input type="checkbox">')),
                (yt = this.addLabeledRow(
                  pt,
                  window.t('Show Chart Source Value Only'),
                  bt
                )),
                $('<td>')
                  .append(bt)
                  .prependTo(yt),
                this.bindControl(
                  new c(
                    bt,
                    this._property.paneProperties.legendProperties.showOnlyPriceSource,
                    !0,
                    this.model(),
                    'Change Displaying Chart Source Value Only'
                  )
                )),
              (gt = $('<input type="checkbox">')),
              (Ct = this.addLabeledRow(pt, window.t('Bar Change Values'), gt)),
              $('<td>')
                .append(gt)
                .prependTo(Ct),
              this.bindControl(
                new c(
                  gt,
                  this._property.paneProperties.legendProperties.showBarChange,
                  !0,
                  this.model(),
                  'Change Bar Change Visibility'
                )
              ),
              (_t = $('<input type="checkbox">')),
              ($t = this.addLabeledRow(pt, window.t('Indicator Titles'), _t)),
              $('<td>')
                .append(_t)
                .prependTo($t),
              this.bindControl(
                new c(
                  _t,
                  this._property.paneProperties.legendProperties.showStudyTitles,
                  !0,
                  this.model(),
                  'Change Indicator Titles Visibility'
                )
              ),
              (mt = $('<input type="checkbox">')),
              (wt = this.addLabeledRow(
                pt,
                window.t('Indicator Arguments'),
                mt
              )),
              (Tt = function(e) {
                mt.prop('disabled', !e.value());
              }),
              $('<td>')
                .append(mt)
                .prependTo(wt),
              this.bindControl(
                new c(
                  mt,
                  this._property.paneProperties.legendProperties.showStudyArguments,
                  !0,
                  this.model(),
                  'Change Indicator Arguments Visibility'
                )
              ),
              this._property.paneProperties.legendProperties.showStudyTitles
                .listeners()
                .subscribe(this, Tt),
              Tt(
                this._property.paneProperties.legendProperties.showStudyTitles
              ),
              (ft = $('<input type="checkbox">')),
              (vt = this.addLabeledRow(pt, window.t('Indicator Values'), ft)),
              $('<td>')
                .append(ft)
                .prependTo(vt),
              this.bindControl(
                new c(
                  ft,
                  this._property.paneProperties.legendProperties.showStudyValues,
                  !0,
                  this.model(),
                  'Change Indicator Values Visibility'
                )
              ),
              (Lt = $('<div class="property-page-column-2">').append(Oe)),
              (kt = $('<div class="property-page-column-2">').append(pt)),
              (St = $('<div class="property-page-column-1">').append(st)),
              (E = $('<div>')
                .css('min-width', '520px')
                .data('layout-tab', a.TabNames.background)),
              E.append(Lt)
                .append(kt)
                .append(St)),
            t.enabled('chart_property_page_timezone_sessions'))
          ) {
            for (
              F = $(
                '<table class="property-page" cellspacing="0" cellpadding="2">'
              ).data('layout-tab', a.TabNames.timezoneSessions),
                this.tmzSessTable = F,
                he = $('<tr>').appendTo(F),
                xt = $('<td>').appendTo(he),
                Pt = $('<table cellspacing="0" cellpadding="0">').appendTo(xt),
                Bt = $('<tr>'),
                Bt.appendTo(Pt),
                Et = $('<td>'),
                Et.appendTo(Bt),
                Et.text(window.t('Time Zone')),
                Rt = $('<td colspan="2" class="tzeditor">'),
                Rt.appendTo(Bt),
                Ft = '',
                It = 0;
              It < k.length;
              It++
            )
              Ft +=
                '<option value="' + k[It].id + '">' + k[It].title + '</option>';
            (Dt = $('<select>' + Ft + '</select>')),
              Dt.appendTo(Rt),
              this.bindControl(
                new y(
                  Dt,
                  this._property.timezone,
                  null,
                  !0,
                  this.model(),
                  'Change Timezone'
                )
              ),
              this._series.createSessStudy(),
              this.createSessTable(F);
          }
          (Vt =
            t.enabled('trading_options') ||
            t.enabled('chart_property_page_trading')),
            Vt && (I = this.createTradingTable()),
            (n = $(
              '<table class="property-page" cellspacing="0" cellpadding="2">'
            )),
            (s = $(
              '<table class="property-page property-page-unpadded" cellspacing="0" cellpadding="0">'
            )
              .css({ width: '100%' })
              .data('layout-separated', !0)),
            (R = $(
              '<table class="property-page" cellspacing="0" cellpadding="2">'
            ).data('layout-tab', a.TabNames.drawings)),
            (this._table = $()
              .add(e)
              .add(i)
              .add(o)
              .add(n)
              .add(s)
              .add(r)
              .add(L)
              .add(B)
              .add(E)
              .add(R)
              .add(F)
              .add(I)
              .add(D)),
            this.loadData();
        }),
        (o.prototype._bindScaleProperties = function() {
          var e,
            t,
            i,
            o,
            n,
            a = this,
            s = function(t) {
              (e = { autoScale: t }),
                this._undoModel.setPriceScaleMode(
                  e,
                  a._series.priceScale(),
                  this._undoText
                );
            };
          (this._scaleBindings.autoScale.binder = new c(
            this._scaleBindings.autoScale.control,
            this._scaleProperties.autoScale,
            !0,
            this.model(),
            'Auto Scale',
            s
          )),
            (this._scaleBindings.autoScaleDisabled.binder = new g(
              this._scaleBindings.autoScale.control,
              this._scaleProperties.autoScaleDisabled,
              !0,
              this.model(),
              'Auto Scale'
            )),
            this.bindControl(this._scaleBindings.autoScale.binder),
            this.bindControl(this._scaleBindings.autoScaleDisabled.binder),
            (t = function(t) {
              (e = { percentage: t }),
                this._undoModel.setPriceScaleMode(
                  e,
                  a._series.priceScale(),
                  this._undoText
                );
            }),
            (this._scaleBindings.percentage.binder = new c(
              this._scaleBindings.percentage.control,
              this._scaleProperties.percentage,
              !0,
              this.model(),
              'Scale Percentage',
              t
            )),
            (this._scaleBindings.percentageDisabled.binder = new g(
              this._scaleBindings.percentage.control,
              this._scaleProperties.percentageDisabled,
              !0,
              this.model(),
              'Scale Percentage'
            )),
            this.bindControl(this._scaleBindings.percentage.binder),
            this.bindControl(this._scaleBindings.percentageDisabled.binder),
            (i = function(t) {
              (e = { indexedTo100: t }),
                this._undoModel.setPriceScaleMode(
                  e,
                  a._series.priceScale(),
                  this._undoText
                );
            }),
            (this._scaleBindings.indexedTo100.binder = new c(
              this._scaleBindings.indexedTo100.control,
              this._scaleProperties.indexedTo100,
              !0,
              this.model(),
              'Scale Indexed to 100',
              i
            )),
            (this._scaleBindings.indexedTo100Disabled.binder = new g(
              this._scaleBindings.indexedTo100.control,
              this._scaleProperties.percentageDisabled,
              !0,
              this.model(),
              'Scale Indexed to 100'
            )),
            this.bindControl(this._scaleBindings.indexedTo100.binder),
            this.bindControl(this._scaleBindings.indexedTo100Disabled.binder),
            (o = function(t) {
              (e = { log: t }),
                this._undoModel.setPriceScaleMode(
                  e,
                  a._series.priceScale(),
                  this._undoText
                );
            }),
            (this._scaleBindings.log.binder = new c(
              this._scaleBindings.log.control,
              this._scaleProperties.log,
              !0,
              this.model(),
              'Log Scale',
              o
            )),
            (this._scaleBindings.logDisabled.binder = new g(
              this._scaleBindings.log.control,
              this._scaleProperties.logDisabled,
              !0,
              this.model(),
              'Log Scale'
            )),
            this.bindControl(this._scaleBindings.log.binder),
            this.bindControl(this._scaleBindings.logDisabled.binder),
            (n = function(t) {
              (e = { lockScale: t }),
                this._undoModel.setPriceScaleMode(
                  e,
                  a._series.priceScale(),
                  this._undoText
                );
            }),
            (this._scaleBindings.lockScale.binder = new c(
              this._scaleBindings.lockScale.control,
              this._scaleProperties.lockScale,
              !0,
              this.model(),
              'Change lock scale',
              n
            )),
            this.bindControl(this._scaleBindings.lockScale.binder),
            (this._scaleBindings.alignLabels.binder = new c(
              this._scaleBindings.alignLabels.control,
              this._scaleProperties.alignLabels,
              !0,
              this.model(),
              'No Overlapping Labels'
            )),
            this.bindControl(this._scaleBindings.alignLabels.binder);
        }),
        (o.prototype._unbindScaleProperties = function() {
          this.unbindControl(this._scaleBindings.autoScale.binder),
            this.unbindControl(this._scaleBindings.autoScaleDisabled.binder),
            this.unbindControl(this._scaleBindings.percentage.binder),
            this.unbindControl(this._scaleBindings.percentageDisabled.binder),
            this.unbindControl(this._scaleBindings.indexedTo100.binder),
            this.unbindControl(this._scaleBindings.indexedTo100Disabled.binder),
            this.unbindControl(this._scaleBindings.log.binder),
            this.unbindControl(this._scaleBindings.logDisabled.binder),
            this.unbindControl(this._scaleBindings.lockScale.binder),
            this.unbindControl(this._scaleBindings.alignLabels.binder),
            this._scaleBindings.autoScale.binder.destroy(),
            this._scaleBindings.autoScaleDisabled.binder.destroy(),
            this._scaleBindings.percentage.binder.destroy(),
            this._scaleBindings.percentageDisabled.binder.destroy(),
            this._scaleBindings.indexedTo100.binder.destroy(),
            this._scaleBindings.indexedTo100Disabled.binder.destroy(),
            this._scaleBindings.log.binder.destroy(),
            this._scaleBindings.logDisabled.binder.destroy(),
            this._scaleBindings.alignLabels.binder.destroy();
        }),
        (o.prototype._updateScaleProperties = function() {
          this._unbindScaleProperties(),
            (this._scaleProperties = this._series.priceScale().properties()),
            this._bindScaleProperties();
        }),
        (o.prototype.createScaleNameList = function(e, t, i) {
          var o, n, a, s;
          if (!this._pane) return [];
          for (
            o = this._pane.actionNoScaleIsEnabled(t),
              n = e.getValues(o),
              a = {},
              s = 0;
            s < n.length;
            s++
          )
            a[n[s]] = i[n[s]];
          return a;
        }),
        (o.prototype.widget = function() {
          return this._table;
        }),
        (o.prototype.loadData = function() {
          this.superclass.prototype.loadData.call(this), this.switchStyle();
        }),
        (o.prototype.loadTheme = function(e, t, i) {}),
        (o.prototype.applyTheme = function(e, t) {
          this._model
            .chartWidget()
            .chartWidgetCollection()
            .applyTheme(e, t),
            this.loadData();
        }),
        (o.prototype.createTemplateButton = function(e) {
          return t.enabled('chart_property_page_template_button')
            ? (this,
              e || (e = {}),
              $(
                '<a href="#" class="_tv-button">' +
                  window.t('Template') +
                  '<span class="icon-dropdown"></span></a>'
              ))
            : $('<span />');
        }),
        (o.prototype.createApplyToAllButton = function(e) {
          var t = $(
            '<a class="_tv-button ok">' + window.t('Apply To All') + '</a>'
          );
          return t.click(e.bind(this)), t;
        }),
        (o.prototype.switchStyle = function() {
          if (this._hasSeriesStyleLayout)
            switch (
              ($(this._barsTbody)
                .add(this._barsColorerTbody)
                .add(this._candlesTbody)
                .add(this._candlesColorerTbody)
                .add(this._hollowCandlesTbody)
                .add(this._lineTbody)
                .add(this._areaTbody)
                .add(this._haTbody)
                .add(this._haColorerTbody)
                .add(this._baselineTbody)
                .css('display', 'none'),
              this._seriesProperty.style.value())
            ) {
              case w.STYLE_BARS:
                this._barsTbody.css('display', 'table-row-group'),
                  this._barsColorerTbody.css('display', 'table-row-group');
                break;
              case w.STYLE_CANDLES:
                this._candlesTbody.css('display', 'table-row-group'),
                  this._candlesColorerTbody.css('display', 'table-row-group');
                break;
              case w.STYLE_HOLLOW_CANDLES:
                this._hollowCandlesTbody.css('display', 'table-row-group');
                break;
              case w.STYLE_LINE:
                this._lineTbody.css('display', 'table-row-group');
                break;
              case w.STYLE_AREA:
                this._areaTbody.css('display', 'table-row-group');
                break;
              case w.STYLE_HEIKEN_ASHI:
                this._haTbody.css('display', 'table-row-group'),
                  this._haColorerTbody.css('display', 'table-row-group');
                break;
              case w.STYLE_BASELINE:
                this._baselineTbody.css('display', 'table-row-group');
            }
        }),
        (o.prototype.onResoreDefaults = function() {
          var e,
            t,
            i = this._model.model().properties().paneProperties.topMargin,
            o = this._model.model().properties().paneProperties.bottomMargin;
          i.listeners().fire(i),
            o.listeners().fire(o),
            (e = this._chart.timeScale()),
            e.restoreRightOffsetPropertyToDefault(),
            (t = this._model.model().properties().timezone),
            t.listeners().fire(t);
        }),
        (o.prototype.defaultProperties = function() {
          var e = this,
            t = [
              e._seriesProperty.extendedHours,
              e._property.scalesProperties.showLeftScale,
              e._property.scalesProperties.showRightScale,
            ].map(function(e) {
              return { property: e, previousValue: e.value() };
            });
          return (
            setTimeout(function() {
              t.forEach(function(e) {
                e.property.value() !== e.previousValue &&
                  e.property.listeners().fire(e.property);
              });
              var i = new L(
                'chartproperties.paneProperties.rightAxisProperties'
              );
              ['autoScale', 'percentage', 'log', 'indexedTo100'].forEach(
                function(t) {
                  var o = e._scaleProperties[t],
                    n = i[t].value();
                  n !== o.value() && o.setValue(n);
                }
              );
            }, 0),
            [this._property, this._seriesProperty]
          );
        }),
        (o.prototype.createSessTable = function(e) {
          var t,
            i = this._series.sessionsStudy().properties(),
            o = this.createTableInTable(e),
            n = i.name.value(),
            a = $("<input type='checkbox' />"),
            s = this.addLabeledRow(o, window.t('Session Breaks'), a),
            r = v(),
            l = this.createColorPicker(),
            p = this.createLineWidthEditor();
          return (
            $('<td>')
              .append(a)
              .prependTo(s),
            $('<td>')
              .append(l)
              .appendTo(s),
            $('<td>')
              .append(r.render())
              .appendTo(s),
            $('<td>')
              .append(p)
              .appendTo(s),
            this.bindControl(
              new c(
                a,
                i.graphics.vertlines.sessBreaks.visible,
                !0,
                this.model(),
                'Change ' + n + ' visibility'
              )
            ),
            this.bindControl(
              new b(
                l,
                i.graphics.vertlines.sessBreaks.color,
                !0,
                this.model(),
                'Change ' + n + ' color'
              )
            ),
            this.bindControl(
              new y(
                r,
                i.graphics.vertlines.sessBreaks.style,
                parseInt,
                !0,
                this.model(),
                'Change ' + n + ' style'
              )
            ),
            this.bindControl(
              new u(
                p,
                i.graphics.vertlines.sessBreaks.width,
                !0,
                this.model(),
                'Change ' + n + ' width'
              )
            ),
            (t = this._series.isIntradayInterval()),
            a.prop('disabled', !t),
            o
          );
        }),
        (o.prototype._createStudySessRow = function(e, t, i) {
          var o,
            n = $("<input type='checkbox' />"),
            a = this.addLabeledRow(e, t, n),
            s = f($('<td>').appendTo(a));
          return (
            this.bindControl(
              new c(
                n,
                i.visible,
                !0,
                this.model(),
                'Change ' + t + ' visibility'
              )
            ),
            this.bindControl(
              new b(s, i.color, !0, this.model(), t + ' color', i.transparency)
            ),
            (o = $('<td>')),
            o.append(n).prependTo(a),
            a.addClass('offset-row'),
            n
          );
        }),
        (o.prototype.createTradingTable = function() {
          var e,
            t,
            i,
            o,
            n,
            s,
            r,
            b,
            g,
            C,
            _,
            m = $(
              '<table class="property-page" cellspacing="0" cellpadding="2">'
            ).data('layout-tab', a.TabNames.trading),
            w = $('<tr>').appendTo(m),
            T = $('<td>').appendTo(w),
            f = $('<table cellspacing="0" cellpadding="0">').appendTo(T),
            L = $('<input type="checkbox">');
          return (
            (w = this.addLabeledRow(f, window.t('Show Positions'), L)),
            $('<td>')
              .append(L)
              .prependTo(w),
            this.bindControl(
              new c(
                L,
                this._property.tradingProperties.showPositions,
                !0,
                this.model(),
                'Change Positions Visibility'
              )
            ),
            (e = $('<input type="checkbox">')),
            (w = this.addLabeledRow(f, window.t('Show Orders'), e)),
            $('<td>')
              .append(e)
              .prependTo(w),
            this.bindControl(
              new c(
                e,
                this._property.tradingProperties.showOrders,
                !0,
                this.model(),
                'Change Orders Visibility'
              )
            ),
            (t = $('<input type="checkbox">')),
            (i = this.addLabeledRow(f, window.t('Extend Lines Left'), t)),
            $('<td>')
              .append(t)
              .prependTo(i),
            this.bindControl(
              new c(
                t,
                this._property.tradingProperties.extendLeft,
                !0,
                this.model(),
                'Extend Lines Left'
              )
            ),
            (o = this.createLineWidthEditor()),
            this.bindControl(
              new u(
                o,
                this._property.tradingProperties.lineWidth,
                !0,
                this.model(),
                'Change Connecting Line Width'
              )
            ),
            (n = v()),
            this.bindControl(
              new y(
                n,
                this._property.tradingProperties.lineStyle,
                parseInt,
                !0,
                this.model(),
                'Change Connecting Line Style'
              )
            ),
            (s = $('<input type="text" class="ticker">')),
            (r = [
              d(this._property.tradingProperties.lineLength.value()),
              p(100),
              l(0),
            ]),
            this.bindControl(
              new h(
                s,
                this._property.tradingProperties.lineLength,
                r,
                !0,
                this.model(),
                'Change Connecting Line Length'
              )
            ),
            (b = $('<tbody>')),
            (g = this.addLabeledRow(f, window.t('Connecting Line'), b)),
            $('<td>').prependTo(g),
            $('<td>')
              .append(o)
              .appendTo(g),
            $('<td colspan="3">')
              .append(n.render())
              .appendTo(g),
            $('<td colspan="3">')
              .append(s)
              .appendTo(g),
            $('<td>%</td>').appendTo(g),
            (C = $('<input type="checkbox">')),
            (_ = this.addLabeledRow(f, window.t('Show Executions'), C)),
            $('<td>')
              .append(C)
              .prependTo(_),
            this.bindControl(
              new c(
                C,
                this._property.tradingProperties.showExecutions,
                !0,
                this.model(),
                'Change Executions Visibility'
              )
            ),
            m
          );
        }),
        (e.exports = o);
    }.call(t, i(5)));
  },
  705: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.ColorBinding,
      r = a.SliderBinder,
      l = a.SimpleComboBinder,
      p = a.BooleanBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, d, h, c;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = this.createColorPicker()),
          (i = this.createColorPicker()),
          (o = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          )),
          (n = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          )),
          (a = this.createFontSizeEditor()),
          (d = this.createFontEditor()),
          (h = this.addLabeledRow(this._table, 'Border')),
          h.prepend('<td>'),
          $('<td>')
            .append(t)
            .appendTo(h),
          $('<td>')
            .append(e)
            .appendTo(h),
          (d = this.createFontEditor()),
          this.bindControl(
            new s(
              t,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Pattern Line Color'
            )
          ),
          this.bindControl(
            new s(
              i,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Pattern Text Color'
            )
          ),
          this.bindControl(
            new r(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Pattern Border Width'
            )
          ),
          this.bindControl(
            new l(
              a,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new l(
              d,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new p(
              o,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new p(
              n,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          (c = $(
            '<table class="property-page" cellspacing="0" cellpadding="2"><tr>'
          )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(i)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(d)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(a)
            )
            .append(
              $(document.createElement('td'))
                .css('vertical-align', 'top')
                .attr({ width: 1 })
                .append(o)
            )
            .append(
              $(document.createElement('td'))
                .css('vertical-align', 'top')
                .append(n)
            )
            .append($('</tr></table>'))),
          (h = this.addLabeledRow(this._table, '')),
          $('<td colspan="5">')
            .append(c)
            .appendTo(h),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  706: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.SliderBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, 'Border')),
          i.prepend('<td>'),
          $('<td>')
            .append(t)
            .appendTo(i),
          $('<td>')
            .append(e)
            .appendTo(i),
          (o = $('<input type="checkbox" class="visibility-switch">')),
          (n = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, 'Background', o)),
          $('<td>')
            .append(o)
            .prependTo(i),
          $('<td>')
            .append(n)
            .appendTo(i),
          this.bindControl(
            new s(
              o,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Arc Filling'
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Arc Line Color'
            )
          ),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Arc Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new l(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Arc Border Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  707: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleStringBinder,
      r = a.ColorBinding,
      l = a.SimpleComboBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        ).css({ width: '100%' })),
          (e = $("<input type='text'>").css({ width: '100%' })),
          (t = $('<div class="property-page-fullwidth-wrapper">').append(e)),
          (i = this.createColorPicker()),
          (o = this.createFontEditor()),
          (n = $('<tr>').appendTo(this._table)),
          $('<td>')
            .css({ width: '0' })
            .html($.t('Text'))
            .appendTo(n),
          $('<td colspan="2">')
            .append(t)
            .appendTo(n),
          (n = this.addLabeledRow(this._table, $.t('Text Font'))),
          n.children().css({ whiteSpace: 'nowrap' }),
          $('<td>')
            .append(i)
            .appendTo(n)
            .css({ width: '0' }),
          $('<td>')
            .append(o)
            .appendTo(n),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Arrow Mark Text Color'
            )
          ),
          this.bindControl(
            new s(
              e,
              this._linetool.properties().text,
              null,
              !0,
              this.model(),
              'Change Arrow Mark Text'
            )
          ),
          this.bindControl(
            new l(
              o,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Arrow Mark Font'
            )
          ),
          this.loadData(),
          setTimeout(function() {
            e.select(), e.focus();
          }, 20);
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  708: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.ColorBinding,
      l = a.SimpleStringBinder,
      p = i(874).TabOpenFrom;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          d,
          h,
          c = $('<table class="property-page" cellspacing="0" cellpadding="0">')
            .css({ width: '100%' })
            .data('layout-tab-open', p.Override),
          u = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          );
        (this._table = c.add(u)),
          (e = $("<input type='text'>").css({ width: '100%' })),
          (t = this.createColorPicker()),
          (i = this.createFontSizeEditor()),
          (o = this.createColorPicker()),
          (n = this.createColorPicker()),
          (a = $('<tr>').appendTo(c)),
          (d = $('<div class="property-page-fullwidth-wrapper">').append(e)),
          $('<td>')
            .append(d)
            .appendTo(a),
          (h = this.addLabeledRow(u, $.t('Text'))),
          $('<td>')
            .append(t)
            .appendTo(h),
          $('<td>')
            .append(i)
            .appendTo(h),
          (h = this.addLabeledRow(u, $.t('Background'))),
          $('<td>')
            .appendTo(h)
            .append(o),
          (h = this.addLabeledRow(u, $.t('Border'))),
          $('<td>')
            .appendTo(h)
            .append(n),
          $('<td>'),
          this.bindControl(
            new l(
              e,
              this._linetool.properties().text,
              null,
              !0,
              this.model(),
              'Change Balloon Text'
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Baloon Text Color'
            )
          ),
          this.bindControl(
            new s(
              i,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Balloon Text Font Size'
            )
          ),
          this.bindControl(
            new r(
              o,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Balloon Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().borderColor,
              !0,
              this.model(),
              'Change Balloon Border Color'
            )
          ),
          this.loadData(),
          setTimeout(function() {
            e.select(), e.focus();
          }, 0);
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  709: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      a.call(this, e, t, i), this.prepareLayout();
    }
    function n(e, t, i) {
      s.call(this, e, t, i);
    }
    var a = i(825),
      s = i(691),
      r = i(823),
      l = r.ToFloatTransformer,
      p = r.SimpleComboBinder,
      d = r.ColorBinding,
      h = r.BooleanBinder,
      c = r.SimpleStringBinder;
    inherit(o, a),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createColorPicker()),
          (i = this.addLabeledRow(e, 'Color')),
          $('<td>')
            .append(t)
            .appendTo(i),
          (o = $(
            '<select><option value="0">' +
              $.t('HL Bars') +
              '</option><option value="2">' +
              $.t('OC Bars') +
              '</option><option value="1">' +
              $.t('Line - Close') +
              '</option><option value="3">' +
              $.t('Line - Open') +
              '</option><option value="4">' +
              $.t('Line - High') +
              '</option><option value="5">' +
              $.t('Line - Low') +
              '</option><option value="6">' +
              $.t('Line - HL/2') +
              '</option></select>'
          )),
          (i = this.addLabeledRow(e, 'Mode')),
          $('<td>')
            .append(o)
            .appendTo(i),
          (i = $('<tr>').appendTo(e)),
          $('<td>' + $.t('Mirrored') + '</td>').appendTo(i),
          (n = $("<input type='checkbox'>")),
          $('<td>')
            .append(n)
            .appendTo(i),
          (i = $('<tr>').appendTo(e)),
          $('<td>' + $.t('Flipped') + '</td>').appendTo(i),
          (a = $("<input type='checkbox'>")),
          $('<td>')
            .append(a)
            .appendTo(i),
          this.bindControl(
            new h(
              n,
              this._linetool.properties().mirrored,
              !0,
              this.model(),
              'Change Bars Pattern Mirroring'
            )
          ),
          this.bindControl(
            new h(
              a,
              this._linetool.properties().flipped,
              !0,
              this.model(),
              'Change Bars Pattern Flipping'
            )
          ),
          this.bindControl(
            new d(
              t,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Bars Pattern Color'
            )
          ),
          this.bindControl(
            new p(
              o,
              this._linetool.properties().mode,
              null,
              !0,
              this.model(),
              'Change Bars Pattern Mode'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      inherit(n, s),
      (n.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, s, r, p;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = $('<tr>')),
          e.appendTo(this._table),
          (t = $('<td>')),
          t.html($.t('Price')),
          t.appendTo(e),
          (i = $('<td>')),
          i.appendTo(e),
          (o = $("<input type='text'>")),
          o.appendTo(i),
          (n = $('<td>')),
          n.html($.t('Bar #')),
          n.appendTo(e),
          (a = $('<td>')),
          a.appendTo(e),
          (s = $("<input type='text'>")),
          s.appendTo(a),
          s.addClass('ticker'),
          (r = this._linetool.properties().points[0]),
          (p = [l(r.price.value())]),
          this.bindControl(
            new c(
              o,
              r.price,
              p,
              !1,
              this.model(),
              'Change ' + this._linetool + ' point price'
            )
          ),
          this.bindBarIndex(
            r.bar,
            s,
            this.model(),
            'Change ' + this._linetool + ' point bar index'
          ),
          this.loadData();
      }),
      (t.LineToolBarsPatternStylesPropertyPage = o),
      (t.LineToolBarsPatternInputsPropertyPage = n);
  },
  710: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.ColorBinding,
      r = a.SimpleComboBinder,
      l = a.SliderBinder,
      p = a.BooleanBinder,
      d = i(830).createLineStyleEditor;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, h, c, u, b, y, g, C, _, m, w;
        (this._block = $('<div>').addClass('property-page')),
          (e = $('<table cellspacing="0" cellpadding="2">').appendTo(
            this._block
          )),
          (t = $('<tbody>').appendTo(e)),
          (i = this.createLineWidthEditor()),
          (o = d()),
          (n = this.createColorPicker()),
          (a = this.addLabeledRow(t, $.t('Line'))),
          $('<td>')
            .append(n)
            .appendTo(a),
          $('<td>')
            .append(i)
            .appendTo(a),
          $('<td colspan="3">')
            .append(o.render())
            .appendTo(a),
          (h = $('<table cellspacing="0" cellpadding="2">').appendTo(
            this._block
          )),
          (a = this.addLabeledRow(h, $.t('Background'), c)),
          (c = $('<input type="checkbox" class="visibility-switch">')),
          (u = this.createColorPicker()),
          $('<td>')
            .append(c)
            .prependTo(a),
          $('<td>')
            .append(u)
            .appendTo(a),
          (b = $('<table cellspacing="0" cellpadding="2">').appendTo(
            this._block
          )),
          (y = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (g = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (C = $('<label>' + $.t('Extend') + ' </label>').css({
            'margin-left': '8px',
          })),
          (_ = $('<input type="checkbox">').appendTo(C)),
          (m = $('<label>' + $.t('Extend') + ' </label>').css({
            'margin-left': '8px',
          })),
          (w = $('<input type="checkbox">').appendTo(m)),
          (a = this.addLabeledRow(b, $.t('Left End'))),
          $('<td colspan="3">')
            .appendTo(a)
            .append(y)
            .append(C),
          (a = this.addLabeledRow(b, $.t('Right End'))),
          $('<td colspan="3">')
            .appendTo(a)
            .append(g)
            .append(m),
          this.bindControl(
            new s(
              n,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Curve Line Color'
            )
          ),
          this.bindControl(
            new r(
              o,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Curve Line Style'
            )
          ),
          this.bindControl(
            new l(
              i,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Curve Line Width'
            )
          ),
          this.bindControl(
            new p(
              c,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Curve Filling'
            )
          ),
          this.bindControl(
            new s(
              u,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Curve Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new r(
              y,
              this._linetool.properties().leftEnd,
              parseInt,
              !0,
              this.model(),
              'Change Curve Line Left End'
            )
          ),
          this.bindControl(
            new r(
              g,
              this._linetool.properties().rightEnd,
              parseInt,
              !0,
              this.model(),
              'Change Curve Line Right End'
            )
          ),
          this.bindControl(
            new p(
              _,
              this._linetool.properties().extendLeft,
              !0,
              this.model(),
              'Change Curve Line Extending Left'
            )
          ),
          this.bindControl(
            new p(
              w,
              this._linetool.properties().extendRight,
              !0,
              this.model(),
              'Change Curve Line Extending Right'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._block;
      }),
      (e.exports = o);
  },
  711: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SliderBinder,
      r = a.BooleanBinder,
      l = a.ColorBinding,
      p = a.SimpleComboBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, d, h;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = this.createLineWidthEditor()),
          (t = this.createColorPicker()),
          (i = $('<input type="checkbox" class="visibility-switch">')),
          (o = this.createColorPicker()),
          (n = this.addLabeledRow(this._table, 'Line')),
          $('<td>').prependTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          $('<td>')
            .append(e)
            .appendTo(n),
          (n = this.addLabeledRow(this._table, 'Background', i)),
          $('<td>')
            .append(i)
            .prependTo(n),
          $('<td>')
            .append(o)
            .appendTo(n),
          (a = $('<tbody>').appendTo(this._table)),
          (d = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (h = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (n = this.addLabeledRow(a, $.t('Left End'))),
          $('<td>').prependTo(n),
          $('<td colspan="3">')
            .appendTo(n)
            .append(d),
          (n = this.addLabeledRow(a, $.t('Right End'))),
          $('<td>').prependTo(n),
          $('<td colspan="3">')
            .appendTo(n)
            .append(h),
          this.bindControl(
            new l(
              t,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Brush Color'
            )
          ),
          this.bindControl(
            new s(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Brush Line Width'
            )
          ),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Brush Filling'
            )
          ),
          this.bindControl(
            new l(
              o,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Brush Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new p(
              d,
              this._linetool.properties().leftEnd,
              parseInt,
              !0,
              this.model(),
              'Change Trend Line Left End'
            )
          ),
          this.bindControl(
            new p(
              h,
              this._linetool.properties().rightEnd,
              parseInt,
              !0,
              this.model(),
              'Change Trend Line Right End'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  712: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.SimpleComboBinder,
      p = a.SliderBinder,
      d = a.SimpleStringBinder,
      h = i(874).TabOpenFrom;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n = this.createColorPicker(),
          a = this.createFontSizeEditor(),
          c = this.createFontEditor(),
          u = this.createTextEditor(350, 200),
          b = this.createColorPicker(),
          y = this.createLineWidthEditor(),
          g = this.createColorPicker(),
          C = $('<input type="checkbox">'),
          _ = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          ),
          m = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          );
        this.bindControl(
          new r(
            n,
            this._linetool.properties().color,
            !0,
            this.model(),
            'Change Text Color'
          )
        ),
          this.bindControl(
            new l(
              a,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new l(
              c,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new d(
              u,
              this._linetool.properties().text,
              null,
              !0,
              this.model(),
              'Change Text'
            )
          ),
          this.bindControl(
            new r(
              b,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Text Background',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new r(
              g,
              this._linetool.properties().bordercolor,
              !0,
              this.model(),
              'Change Text Color'
            )
          ),
          this.bindControl(
            new p(
              y,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Border Width'
            )
          ),
          this.bindControl(
            new s(
              C,
              this._linetool.properties().wordWrap,
              !0,
              this.model(),
              'Change Text Wrap'
            )
          ),
          this.bindControl(
            new s(
              _,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new s(
              m,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          (e = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          ).data('layout-tab-open', h.Override)),
          (t = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          )),
          (i = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          )),
          (this._table = e.add(i).add(t)),
          $(document.createElement('tr'))
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(n)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(c)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(a)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(_)
            )
            .append($(document.createElement('td')).append(m))
            .appendTo(e),
          $(document.createElement('tr'))
            .append(
              $(document.createElement('td'))
                .attr({ colspan: 5 })
                .append(u)
            )
            .appendTo(e),
          (o = this.addLabeledRow(t, 'Text Wrap', C)),
          $('<td>')
            .append(C)
            .prependTo(o),
          (o = this.addLabeledRow(i, 'Background')),
          $('<td>')
            .append(b)
            .appendTo(o),
          (o = this.addLabeledRow(i, 'Border')),
          $('<td>')
            .append(g)
            .appendTo(o),
          $('<td>')
            .append(y)
            .appendTo(o),
          this.loadData(),
          setTimeout(function() {
            u.select(), u.focus();
          }, 20);
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  713: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.ColorBinding,
      l = a.SliderBinder,
      p = i(830).createLineStyleEditor;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = p()),
          (i = this.createColorPicker()),
          (o = this.addLabeledRow(this._table, 'Lines')),
          $('<td>')
            .append(i)
            .appendTo(o),
          $('<td>')
            .append(e)
            .appendTo(o),
          $('<td>')
            .append(t.render())
            .appendTo(o),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Circle Lines Color'
            )
          ),
          this.bindControl(
            new s(
              t,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Circle Lines Style'
            )
          ),
          this.bindControl(
            new l(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Circle Lines Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  714: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.ColorBinding,
      l = a.BooleanBinder,
      p = a.SliderBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, d, h, c, u, b, y, g, C;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = this.createColorPicker()),
          (o = this.addLabeledRow(e, $.t('Line'))),
          $('<td>').prependTo(o),
          $('<td>')
            .append(i)
            .appendTo(o),
          $('<td>')
            .append(t)
            .appendTo(o),
          (n = this.createColorPicker()),
          (a = this.createColorPicker()),
          (d = this.createFontSizeEditor()),
          (h = this.createFontEditor()),
          (c = this.createColorPicker()),
          (u = $('<input type="checkbox" class="visibility-switch">')),
          (b = this.createColorPicker()),
          (y = $('<input type="checkbox" class="visibility-switch">')),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Text Color'
            )
          ),
          this.bindControl(
            new s(
              d,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new s(
              h,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new r(
              c,
              this._linetool.properties().labelBackgroundColor,
              !0,
              this.model(),
              'Change Text Background',
              this._linetool.properties().labelBackgroundTransparency
            )
          ),
          this.bindControl(
            new l(
              u,
              this._linetool.properties().fillLabelBackground,
              !0,
              this.model(),
              'Change Text Background Fill'
            )
          ),
          this.bindControl(
            new r(
              b,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Text Background',
              this._linetool.properties().backgroundTransparency
            )
          ),
          this.bindControl(
            new l(
              y,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Text Background Fill'
            )
          ),
          this.bindControl(
            new r(
              a,
              this._linetool.properties().borderColor,
              !0,
              this.model(),
              'Change Text Border Color'
            )
          ),
          (g = this.addLabeledRow(e, $.t('Background'), y)),
          $('<td>')
            .append(y)
            .prependTo(g),
          $('<td>')
            .append(b)
            .appendTo(g),
          (C = this.addLabeledRow(e, $.t('Label'))),
          $('<td>').prependTo(C),
          $('<td>')
            .append(n)
            .appendTo(C),
          $('<td>')
            .append(h)
            .appendTo(C),
          $('<td>')
            .append(d)
            .appendTo(C),
          (g = this.addLabeledRow(e, $.t('Label Background'), u)),
          $('<td>')
            .append(u)
            .prependTo(g),
          $('<td>')
            .append(c)
            .appendTo(g),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Date Range Color'
            )
          ),
          this.bindControl(
            new p(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Date Range Line Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  715: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.ColorBinding,
      l = a.BooleanBinder,
      p = a.SliderBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, d, h, c, u, b, y, g, C, _, m, w, T, f, v, L, k, S;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = this.createColorPicker()),
          (o = this.addLabeledRow(e, $.t('Line'))),
          $('<td>').prependTo(o),
          $('<td>')
            .append(i)
            .appendTo(o),
          $('<td>')
            .append(t)
            .appendTo(o),
          (n = this.createColorPicker()),
          (a = this.createColorPicker()),
          (d = this.createFontSizeEditor()),
          (h = this.createFontEditor()),
          (c = this.createColorPicker()),
          (u = $('<input type="checkbox" class="visibility-switch">')),
          (b = this.createColorPicker()),
          (y = $('<input type="checkbox" class="visibility-switch">')),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Text Color'
            )
          ),
          this.bindControl(
            new s(
              d,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new s(
              h,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new r(
              c,
              this._linetool.properties().labelBackgroundColor,
              !0,
              this.model(),
              'Change Text Background',
              this._linetool.properties().labelBackgroundTransparency
            )
          ),
          this.bindControl(
            new l(
              u,
              this._linetool.properties().fillLabelBackground,
              !0,
              this.model(),
              'Change Text Background Fill'
            )
          ),
          this.bindControl(
            new r(
              b,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Text Background',
              this._linetool.properties().backgroundTransparency
            )
          ),
          this.bindControl(
            new l(
              y,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Text Background Fill'
            )
          ),
          this.bindControl(
            new r(
              a,
              this._linetool.properties().borderColor,
              !0,
              this.model(),
              'Change Text Border Color'
            )
          ),
          (g = this.addLabeledRow(e, $.t('Background'), y)),
          $('<td>')
            .append(y)
            .prependTo(g),
          $('<td>')
            .append(b)
            .appendTo(g),
          (C = this.addLabeledRow(e, $.t('Label'))),
          $('<td>').prependTo(C),
          $('<td>')
            .append(n)
            .appendTo(C),
          $('<td>')
            .append(h)
            .appendTo(C),
          $('<td>')
            .append(d)
            .appendTo(C),
          (g = this.addLabeledRow(e, $.t('Label Background'), u)),
          $('<td>')
            .append(u)
            .prependTo(g),
          $('<td>')
            .append(c)
            .appendTo(g),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Date Range Color'
            )
          ),
          this.bindControl(
            new p(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Date Range Line Width'
            )
          ),
          (_ = this._linetool.properties()),
          void 0 !== _.extendTop &&
            void 0 !== _.extendBottom &&
            ((m = $('<input type="checkbox">')),
            (w = $('<input type="checkbox">')),
            this.bindControl(
              new l(
                m,
                this._linetool.properties().extendTop,
                !0,
                this.model(),
                'Change Extend Top'
              )
            ),
            this.bindControl(
              new l(
                w,
                this._linetool.properties().extendBottom,
                !0,
                this.model(),
                'Change Extend Bottom'
              )
            ),
            (T = this.addLabeledRow(e, $.t('Extend Top'), m)),
            $('<td>')
              .append(m)
              .prependTo(T),
            (f = this.addLabeledRow(e, $.t('Extend Bottom'), w)),
            $('<td>')
              .append(w)
              .prependTo(f)),
          void 0 !== _.extendLeft &&
            void 0 !== _.extendRight &&
            ((v = $('<input type="checkbox">')),
            (L = $('<input type="checkbox">')),
            this.bindControl(
              new l(
                v,
                this._linetool.properties().extendLeft,
                !0,
                this.model(),
                'Change Extend Left'
              )
            ),
            this.bindControl(
              new l(
                L,
                this._linetool.properties().extendRight,
                !0,
                this.model(),
                'Change Extend Right'
              )
            ),
            (k = this.addLabeledRow(e, $.t('Extend Left'), v)),
            $('<td>')
              .append(v)
              .prependTo(k),
            (S = this.addLabeledRow(e, $.t('Extend Right'), L)),
            $('<td>')
              .append(L)
              .prependTo(S)),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  716: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.BooleanBinder,
      l = a.ColorBinding,
      p = a.SliderBinder,
      d = i(830).createLineStyleEditor;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          h,
          c,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w,
          T,
          f,
          v,
          L,
          k,
          S,
          x,
          P;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = d()),
          (o = this.createColorPicker()),
          (n = this.addLabeledRow(e, $.t('Line'))),
          $('<td>')
            .append(o)
            .appendTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          $('<td colspan="3">')
            .append(i.render())
            .appendTo(n),
          (n = this.addLabeledRow(e, $.t('Text'))),
          (a = this.createColorPicker()),
          (h = this.createFontSizeEditor()),
          (c = this.createFontEditor()),
          (u = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          )),
          (b = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          )),
          $('<td>')
            .append(a)
            .appendTo(n),
          $('<td>')
            .append(c)
            .appendTo(n),
          $('<td>')
            .append(h)
            .appendTo(n),
          $('<td>')
            .append(u)
            .appendTo(n),
          $('<td>')
            .append(b)
            .appendTo(n),
          (y = $('<tbody>').appendTo(this._table)),
          (g = $('<input type="checkbox" class="visibility-switch">')),
          (C = this.createColorPicker()),
          (n = this.addLabeledRow(y, $.t('Background'), g)),
          (_ = $('<table>')),
          $('<td colspan="5">')
            .append(_)
            .appendTo(n),
          (n = $('<tr>').appendTo(_)),
          $('<td>')
            .append(g)
            .appendTo(n),
          $('<td>')
            .append(C)
            .appendTo(n),
          (m = $('<tbody>').appendTo(this._table)),
          (w = $('<label>' + $.t('Extend') + ' </label>').css({
            'margin-left': '8px',
          })),
          (T = $('<input type="checkbox">').appendTo(w)),
          (f = $('<label>' + $.t('Extend') + ' </label>').css({
            'margin-left': '8px',
          })),
          (v = $('<input type="checkbox">').appendTo(f)),
          (L = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (k = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (n = this.addLabeledRow(m, $.t('Left End'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(L)
            .append(w),
          (n = this.addLabeledRow(m, $.t('Right End'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(k)
            .append(f),
          (S = $('<tbody>').appendTo(this._table)),
          (n = $('<tr>').appendTo(S)),
          (x = $("<input type='checkbox'>")),
          (P = $("<label style='display:block'>")
            .append(x)
            .append($.t('Show Prices'))),
          $("<td colspan='2'>")
            .append(P)
            .appendTo(n),
          this.bindControl(
            new s(
              h,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new s(
              c,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new l(
              a,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Text Color'
            )
          ),
          this.bindControl(
            new r(
              u,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new r(
              b,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          this.bindControl(
            new r(
              x,
              this._linetool.properties().showPrices,
              !0,
              this.model(),
              'Change Disjoint Angle Show Prices'
            )
          ),
          this.bindControl(
            new r(
              T,
              this._linetool.properties().extendLeft,
              !0,
              this.model(),
              'Change Disjoint Angle Extending Left'
            )
          ),
          this.bindControl(
            new r(
              v,
              this._linetool.properties().extendRight,
              !0,
              this.model(),
              'Change Disjoint Angle Extending Right'
            )
          ),
          this.bindControl(
            new l(
              o,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Disjoint Angle Color'
            )
          ),
          this.bindControl(
            new s(
              i,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Disjoint Angle Style'
            )
          ),
          this.bindControl(
            new p(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Disjoint Angle Width'
            )
          ),
          this.bindControl(
            new s(
              L,
              this._linetool.properties().leftEnd,
              parseInt,
              !0,
              this.model(),
              'Change Disjoint Angle Left End'
            )
          ),
          this.bindControl(
            new s(
              k,
              this._linetool.properties().rightEnd,
              parseInt,
              !0,
              this.model(),
              'Change Disjoint Angle Right End'
            )
          ),
          this.bindControl(
            new r(
              g,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Disjoint Angle Filling'
            )
          ),
          this.bindControl(
            new l(
              C,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Disjoint Angle Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  717: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n, a, s, r, l, p;
    i(11),
      (n = i(825)),
      (a = i(823)),
      (s = a.SimpleComboBinder),
      (r = a.ColorBinding),
      (l = a.SliderBinder),
      (p = a.BooleanBinder),
      inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = this._linetool.getDegrees()),
          (t = this.createKeyCombo(e)),
          t.width(300),
          (i = this.createColorPicker()),
          (o = $('<input type="checkbox" class="visibility-switch">')),
          (n = this.addLabeledRow(this._table, window.t('Degree'))),
          $('<td>').prependTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          (n = this.addLabeledRow(this._table, window.t('Line Width'))),
          (a = this.createLineWidthEditor()),
          $('<td>').prependTo(n),
          $('<td>')
            .append(a)
            .appendTo(n),
          (n = this.addLabeledRow(this._table, window.t('Color'))),
          $('<td>').prependTo(n),
          $('<td>')
            .append(i)
            .appendTo(n),
          (n = this.addLabeledRow(this._table, window.t('Show Wave'), o)),
          $('<td>')
            .append(o)
            .prependTo(n),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Elliott Label Color'
            )
          ),
          this.bindControl(
            new s(
              t,
              this._linetool.properties().degree,
              parseInt,
              !0,
              this.model(),
              'Change Elliott Wave Size'
            )
          ),
          this.bindControl(
            new p(
              o,
              this._linetool.properties().showWave,
              !0,
              this.model(),
              'Change Elliott Labels Background'
            )
          ),
          this.bindControl(
            new l(
              a,
              this._linetool.properties().linewidth,
              parseInt,
              this.model(),
              'Change Elliott Wave Line Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  718: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.SliderBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, $.t('Border'))),
          i.prepend('<td>'),
          $('<td>')
            .append(t)
            .appendTo(i),
          $('<td>')
            .append(e)
            .appendTo(i),
          (o = $('<input type="checkbox" class="visibility-switch">')),
          (n = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, $.t('Background'), o)),
          $('<td>')
            .append(o)
            .prependTo(i),
          $('<td>')
            .append(n)
            .appendTo(i),
          this.bindControl(
            new s(
              o,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Ellipse Filling'
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Ellipse Line Color'
            )
          ),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Ellipse Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new l(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Ellipse Border Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  719: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i);
    }
    var n = i(694);
    inherit(o, n), (e.exports = o);
  },
  720: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.FloatBinder,
      r = a.SimpleComboBinder,
      l = a.BooleanBinder,
      p = a.ColorBinding,
      d = a.SliderBinder,
      h = i(829).addColorPicker,
      c = i(830).createLineStyleEditor,
      u = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t, i) {
        var o,
          n,
          a,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w = $('<tr>');
        w.appendTo(this._table),
          (o = $('<td>')),
          o.appendTo(w),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          n.appendTo(o),
          e
            ? ((a = $('<td>')),
              a.appendTo(w),
              (u = $("<input type='text'>")),
              u.appendTo(a),
              u.css('width', '70px'),
              this.bindControl(
                new s(
                  u,
                  t.coeff,
                  !1,
                  this.model(),
                  'Change Pitchfork Line Coeff'
                )
              ))
            : this.createLabeledCell('Trend Line', n).appendTo(w),
          (b = $("<td class='colorpicker-cell'>")),
          b.appendTo(w),
          (y = h(b)),
          (g = $('<td>')),
          g.appendTo(w),
          (C = this.createLineWidthEditor()),
          C.appendTo(g),
          e ||
            ((_ = $('<td>')),
            _.appendTo(w),
            (m = c()),
            m.render().appendTo(_),
            this.bindControl(
              new r(
                m,
                t.linestyle,
                parseInt,
                !0,
                this.model(),
                'Change Fib Circle Style'
              )
            )),
          this.bindControl(
            new l(
              n,
              t.visible,
              !0,
              this.model(),
              'Change Fib Circle Visibility'
            )
          ),
          this.bindControl(
            new p(
              y,
              t.color,
              !0,
              this.model(),
              'Change Fib Circle Line Color',
              0
            )
          ),
          this.bindControl(
            new d(C, t.linewidth, !0, this.model(), 'Change Fib Circle Width')
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, s;
        for (
          this._table = $(document.createElement('table')),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            this.addLevelEditor(
              null,
              this._linetool.properties().trendline,
              !1
            ),
            e = 1;
          e <= 11;
          e++
        )
          (t = 'level' + e),
            this.addLevelEditor(
              'Level ' + e,
              this._linetool.properties()[t],
              !1
            );
        this.addOneColorPropertyWidget(this._table),
          (i = $("<input type='checkbox' class='visibility-switch'>")),
          (o = this.addLabeledRow(this._table, 'Levels', i)),
          $('<td>')
            .append(i)
            .prependTo(o),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          (o = this.addLabeledRow(this._table, 'Coeffs As Percents', n)),
          $('<td>')
            .append(n)
            .prependTo(o),
          this.bindControl(
            new l(
              i,
              this._linetool.properties().showCoeffs,
              !0,
              this.model(),
              'Change Fib Circle Levels Visibility'
            )
          ),
          (o = $('<tr>')),
          o.appendTo(this._table),
          (a = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(a)
            .appendTo(o),
          this.createLabeledCell('Background', a).appendTo(o),
          (s = u()),
          $('<td colspan="3">')
            .append(s)
            .appendTo(o),
          this.bindControl(
            new l(
              a,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Pitchfork Background Visibility'
            )
          ),
          this.bindControl(
            new d(
              s,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Pitchfork Background Transparency'
            )
          ),
          this.bindControl(
            new l(
              n,
              this._linetool.properties().coeffsAsPercents,
              !0,
              this.model(),
              'Change Fib Retracement Coeffs As Percents'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  721: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.FloatBinder,
      r = a.SimpleComboBinder,
      l = a.BooleanBinder,
      p = a.ColorBinding,
      d = a.SliderBinder,
      h = i(829).addColorPicker,
      c = i(830).createLineStyleEditor,
      u = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t, i) {
        var o,
          n,
          a,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w = $('<tr>');
        w.appendTo(this._table),
          (o = $('<td>')),
          o.appendTo(w),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          n.appendTo(o),
          e
            ? ((a = $('<td>')),
              a.appendTo(w),
              (u = $("<input type='text'>")),
              u.appendTo(a),
              u.css('width', '70px'),
              this.bindControl(
                new s(
                  u,
                  t.coeff,
                  !1,
                  this.model(),
                  'Change Pitchfork Line Coeff'
                )
              ))
            : $('<td>' + $.t('Trend Line') + '</td>').appendTo(w),
          (b = $("<td class='colorpicker-cell'>")),
          b.appendTo(w),
          (y = h(b)),
          (g = $('<td>')),
          g.appendTo(w),
          (C = this.createLineWidthEditor()),
          C.appendTo(g),
          e ||
            ((_ = $('<td>')),
            _.appendTo(w),
            (m = c()),
            m.render().appendTo(_),
            this.bindControl(
              new r(
                m,
                t.linestyle,
                parseInt,
                !0,
                this.model(),
                'Change Fib Speed Resistance Arcs Style'
              )
            )),
          this.bindControl(
            new l(
              n,
              t.visible,
              !0,
              this.model(),
              'Change Fib Speed Resistance Arcs Visibility'
            )
          ),
          this.bindControl(
            new p(
              y,
              t.color,
              !0,
              this.model(),
              'Change Fib Speed Resistance Arcs Line Color',
              0
            )
          ),
          this.bindControl(
            new d(
              C,
              t.linewidth,
              !0,
              this.model(),
              'Change Fib Speed Resistance Arcs Width'
            )
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, s;
        for (
          this._table = $(document.createElement('table')),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            this.addLevelEditor(
              null,
              this._linetool.properties().trendline,
              !1
            ),
            e = 1;
          e <= 11;
          e++
        )
          (t = 'level' + e),
            this.addLevelEditor(
              'Level ' + e,
              this._linetool.properties()[t],
              !1
            );
        this.addOneColorPropertyWidget(this._table),
          (i = $("<input type='checkbox' class='visibility-switch'>")),
          (o = this.addLabeledRow(this._table, $.t('Levels'))),
          $('<td>')
            .append(i)
            .prependTo(o),
          this.bindControl(
            new l(
              i,
              this._linetool.properties().showCoeffs,
              !0,
              this.model(),
              'Change Fib Speed Resistance Arcs Levels Visibility'
            )
          ),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          (o = this.addLabeledRow(this._table, $.t('Full Circles'))),
          $('<td>')
            .append(n)
            .prependTo(o),
          this.bindControl(
            new l(
              n,
              this._linetool.properties().fullCircles,
              !0,
              this.model(),
              'Change Fib Speed Resistance Arcs Full Cirlces Mode'
            )
          ),
          (o = $('<tr>')),
          o.appendTo(this._table),
          (a = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(a)
            .appendTo(o),
          $('<td>' + $.t('Background') + '</td>').appendTo(o),
          (s = u()),
          $('<td colspan="3">')
            .append(s)
            .appendTo(o),
          this.bindControl(
            new l(
              a,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Fib Arcs Background Visibility'
            )
          ),
          this.bindControl(
            new d(
              s,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Fib Arcs Background Transparency'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  722: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.FloatBinder,
      p = a.SimpleComboBinder,
      d = a.SliderBinder,
      h = i(829).addColorPicker,
      c = i(830).createLineStyleEditor,
      u = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t, i) {
        var o,
          n,
          a,
          p,
          d,
          c,
          u = $('<tr>');
        u.appendTo(e),
          (o = $('<td>')),
          o.appendTo(u),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          n.appendTo(o),
          (a = $('<td>')),
          a.appendTo(u),
          (p = $("<input type='text'>")),
          p.appendTo(a),
          p.css('width', '70px'),
          this.bindControl(
            new s(
              n,
              i.visible,
              !0,
              this.model(),
              'Change Gann Square Line Visibility'
            )
          ),
          this.bindControl(
            new l(p, i.coeff, !1, this.model(), 'Change Pitchfork Line Coeff')
          ),
          (d = $("<td class='colorpicker-cell'>")),
          d.appendTo(u),
          (c = h(d)),
          this.bindControl(
            new r(
              c,
              i.color,
              !0,
              this.model(),
              'Change Gann Square Line Color',
              0
            )
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, l, h, b, y, g, C, _, m, w, T, f, v, L, k, S, x, P;
        for (
          this._table = $(document.createElement('table')),
            this._table.addClass('property-page property-page-unpadded'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            this._table.css({ width: '100%' }),
            e = $('<tbody>').appendTo(this._table),
            t = $('<tr>'),
            t.appendTo(e),
            i = $('<td width="50%">'),
            i.appendTo(t),
            o = $('<td width="50%">'),
            o.appendTo(t),
            n = $('<table cellspacing="0" cellpadding="2">'),
            n.appendTo(i),
            n.addClass('property-page'),
            a = $('<table cellspacing="0" cellpadding="2">'),
            a.appendTo(o),
            a.addClass('property-page'),
            $(
              "<tr><td align='center' colspan='4'>" +
                $.t('Price Levels') +
                '</td></tr>'
            ).appendTo(n),
            $(
              "<tr><td align='center' colspan='4'>" +
                $.t('Time Levels') +
                '</td></tr>'
            ).appendTo(a),
            l = 1;
          l <= 7;
          l++
        )
          (h = 'hlevel' + l),
            this.addLevelEditor(
              n,
              'Level ' + l,
              this._linetool.properties()[h]
            );
        for (l = 1; l <= 7; l++)
          (h = 'vlevel' + l),
            this.addLevelEditor(
              a,
              'Level ' + l,
              this._linetool.properties()[h]
            );
        this.addOneColorPropertyWidget(n),
          o.css({ 'vertical-align': 'top' }),
          (b = $("<input type='checkbox' class='visibility-switch'>")),
          (y = $("<input type='checkbox' class='visibility-switch'>")),
          (g = $("<input type='checkbox' class='visibility-switch'>")),
          (C = $("<input type='checkbox' class='visibility-switch'>")),
          (_ = $(
            '<table class="property-page property-page-unpadded" cellspacing="0" cellpadding="0">'
          ).css({ width: '100%' })),
          (m = $('<tr>').appendTo(_)),
          (w = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).appendTo(
            $('<td>')
              .css({ width: '50%' })
              .appendTo(m)
          )),
          (T = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).appendTo(
            $('<td>')
              .css({ width: '50%' })
              .appendTo(m)
          )),
          (f = this.addLabeledRow(w, $.t('Left Labels'), b)),
          $('<td>')
            .append(b)
            .prependTo(f),
          (f = this.addLabeledRow(T, $.t('Right Labels'), y)),
          $('<td>')
            .append(y)
            .prependTo(f),
          (f = this.addLabeledRow(w, $.t('Top Labels'), g)),
          $('<td>')
            .append(g)
            .prependTo(f),
          (f = this.addLabeledRow(T, $.t('Bottom Labels'), C)),
          $('<td>')
            .append(C)
            .prependTo(f),
          this.bindControl(
            new s(
              b,
              this._linetool.properties().showLeftLabels,
              !0,
              this.model(),
              'Change Gann Square Left Labels Visibility'
            )
          ),
          this.bindControl(
            new s(
              y,
              this._linetool.properties().showRightLabels,
              !0,
              this.model(),
              'Change Gann Square Right Labels Visibility'
            )
          ),
          this.bindControl(
            new s(
              g,
              this._linetool.properties().showTopLabels,
              !0,
              this.model(),
              'Change Gann Square Top Labels Visibility'
            )
          ),
          this.bindControl(
            new s(
              C,
              this._linetool.properties().showBottomLabels,
              !0,
              this.model(),
              'Change Gann Square Bottom Labels Visibility'
            )
          ),
          (v = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          )),
          (L = this.createLineWidthEditor()),
          (k = c()),
          (S = this.createColorPicker()),
          (x = $("<input type='checkbox' class='visibility-switch'>")),
          (f = this.addLabeledRow(v, $.t('Grid'), x)),
          $('<td>')
            .append(x)
            .prependTo(f),
          $('<td>')
            .append(S)
            .appendTo(f),
          $('<td>')
            .append(L)
            .appendTo(f),
          $('<td>')
            .append(k.render())
            .appendTo(f),
          this.bindControl(
            new s(
              x,
              this._linetool.properties().grid.visible,
              !0,
              this.model(),
              'Change Fib Speed Resistance Fan Grid Visibility'
            )
          ),
          this.bindControl(
            new r(
              S,
              this._linetool.properties().grid.color,
              !0,
              this.model(),
              'Change Fib Speed Resistance Fan Grid Line Color',
              0
            )
          ),
          this.bindControl(
            new p(
              k,
              this._linetool.properties().grid.linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Fib Speed Resistance Fan Grid Line Style'
            )
          ),
          this.bindControl(
            new d(
              L,
              this._linetool.properties().grid.linewidth,
              !0,
              this.model(),
              'Change Fib Speed Resistance Fan Grid Line Width'
            )
          ),
          (this._table = this._table.add(_).add(v)),
          (f = $('<tr>')),
          f.appendTo(v),
          (x = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(x)
            .appendTo(f),
          this.createLabeledCell('Background', x).appendTo(f),
          (P = u()),
          $('<td colspan="3">')
            .append(P)
            .appendTo(f),
          this.bindControl(
            new s(
              x,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Fib Speed/Resistance Fan Background Visibility'
            )
          ),
          this.bindControl(
            new d(
              P,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Fib Speed/Resistance Fan Background Transparency'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  723: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.ColorBinding,
      l = a.SliderBinder,
      p = a.BooleanBinder,
      d = i(830).createLineStyleEditor;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, h;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = d()),
          (o = this.createColorPicker()),
          (n = this.addLabeledRow(e, 'Line')),
          $('<td>')
            .append(o)
            .appendTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          $('<td colspan="3">')
            .append(i.render())
            .appendTo(n),
          this.bindControl(
            new r(
              o,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Fib Spiral Line Color'
            )
          ),
          this.bindControl(
            new s(
              i,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Fib Spiral Line Style'
            )
          ),
          this.bindControl(
            new l(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Fib Spiral Line Width'
            )
          ),
          (a = $('<input type="checkbox">')),
          (h = this.addLabeledRow(
            this._table,
            window.t('Counterclockwise'),
            a
          )),
          $('<td>')
            .append(a)
            .prependTo(h),
          this.bindControl(
            new p(
              a,
              this._linetool.properties().counterclockwise,
              !0,
              this.model(),
              'Change Counterclockwise'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  724: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.FloatBinder,
      r = a.BooleanBinder,
      l = a.ColorBinding,
      p = a.SimpleComboBinder,
      d = a.SliderBinder,
      h = i(829).addColorPicker,
      c = i(830).createLineStyleEditor,
      u = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t, i) {
        var o,
          n,
          a,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w = $('<tr>');
        w.appendTo(this._table),
          (o = $('<td>')),
          o.appendTo(w),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          n.appendTo(o),
          e
            ? ((a = $('<td>')),
              a.appendTo(w),
              (u = $("<input type='text'>")),
              u.appendTo(a),
              u.css('width', '70px'),
              this.bindControl(
                new s(
                  u,
                  t.coeff,
                  !1,
                  this.model(),
                  'Change Pitchfork Line Coeff'
                )
              ))
            : this.createLabeledCell($.t('Trend Line'), n).appendTo(w),
          (b = $("<td class='colorpicker-cell'>")),
          b.appendTo(w),
          (y = h(b)),
          (g = $('<td>')),
          g.appendTo(w),
          (C = this.createLineWidthEditor()),
          C.appendTo(g),
          (_ = $('<td>')),
          _.appendTo(w),
          (m = c()),
          m.render().appendTo(_),
          this.bindControl(
            new r(
              n,
              t.visible,
              !0,
              this.model(),
              'Change Pitchfork Line Visibility'
            )
          ),
          this.bindControl(
            new l(
              y,
              t.color,
              !0,
              this.model(),
              'Change Pitchfork Line Color',
              0
            )
          ),
          this.bindControl(
            new p(
              m,
              t.linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Pitchfork Line Style'
            )
          ),
          this.bindControl(
            new d(
              C,
              t.linewidth,
              parseInt,
              this.model(),
              'Change Pitchfork Line Width'
            )
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, s, l, h;
        for (
          this._table = $(document.createElement('table')),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            e = 1;
          e <= 11;
          e++
        )
          (t = 'level' + e),
            this.addLevelEditor(
              'Level ' + e,
              this._linetool.properties()[t],
              !1
            );
        this.addOneColorPropertyWidget(this._table),
          (i = $("<input type='checkbox' class='visibility-switch'>")),
          (o = this.addLabeledRow(this._table, $.t('Show Labels'), i)),
          $('<td>')
            .append(i)
            .prependTo(o),
          (n = $("<table cellspacing='0' cellpadding='0'>")),
          (a = $(
            "<select><option value='left'>" +
              $.t('left') +
              "</option><option value='center'>" +
              $.t('center') +
              "</option><option value='right'>" +
              $.t('right') +
              '</option></select>'
          )),
          (s = $(
            "<select><option value='top'>" +
              $.t('top') +
              "</option><option value='middle'>" +
              $.t('middle') +
              "</option><option value='bottom'>" +
              $.t('bottom') +
              '</option></select>'
          )),
          (o = $('<tr>')),
          o
            .append('<td>' + $.t('Labels') + '</td>')
            .append(a)
            .append('<td>&nbsp</td>')
            .append(s),
          o.appendTo(n),
          (o = $('<tr>')),
          $("<td colspan='5'>")
            .append(n)
            .appendTo(o),
          o.appendTo(this._table),
          this.bindControl(
            new p(
              a,
              this._linetool.properties().horzLabelsAlign,
              null,
              !0,
              this.model(),
              'Change Fib Time Zone Labels Alignment'
            )
          ),
          this.bindControl(
            new p(
              s,
              this._linetool.properties().vertLabelsAlign,
              null,
              !0,
              this.model(),
              'Change Fib Time Zone Labels Alignment'
            )
          ),
          (o = $('<tr>')),
          o.appendTo(this._table),
          (l = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(l)
            .appendTo(o),
          this.createLabeledCell($.t('Background'), l).appendTo(o),
          (h = u()),
          $('<td colspan="3">')
            .append(h)
            .appendTo(o),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().showLabels,
              !0,
              this.model(),
              'Change Fib Time Zone Labels Visibility'
            )
          ),
          this.bindControl(
            new d(
              h,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Fib Retracement Background Transparency'
            )
          ),
          this.bindControl(
            new r(
              l,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Fib Retracement Background Visibility'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  725: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.FloatBinder,
      r = a.BooleanBinder,
      l = a.ColorBinding,
      p = a.SliderBinder,
      d = i(829).addColorPicker,
      h = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t, i) {
        var o,
          n,
          a,
          h,
          c,
          u,
          b,
          y,
          g = $('<tr>');
        g.appendTo(this._table),
          (o = $('<td>')),
          o.appendTo(g),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          n.appendTo(o),
          e
            ? ((a = $('<td>')),
              a.appendTo(g),
              (h = $("<input type='text'>")),
              h.appendTo(a),
              h.css('width', '70px'),
              this.bindControl(
                new s(
                  h,
                  t.coeff,
                  !1,
                  this.model(),
                  'Change Pitchfork Line Coeff'
                )
              ))
            : this.createLabeledCell('Trend Line', n).appendTo(g),
          (c = $("<td class='colorpicker-cell'>")),
          c.appendTo(g),
          (u = d(c)),
          (b = $('<td>')),
          b.appendTo(g),
          (y = this.createLineWidthEditor()),
          y.appendTo(b),
          this.bindControl(
            new r(n, t.visible, !0, this.model(), 'Change Fib Wedge Visibility')
          ),
          this.bindControl(
            new l(
              u,
              t.color,
              !0,
              this.model(),
              'Change Fib Wedge Line Color',
              0
            )
          ),
          this.bindControl(
            new p(y, t.linewidth, !0, this.model(), 'Change Fib Wedge Width')
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a;
        for (
          this._table = $(document.createElement('table')),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            this.addLevelEditor(
              null,
              this._linetool.properties().trendline,
              !1
            ),
            e = 1;
          e <= 11;
          e++
        )
          (t = 'level' + e),
            this.addLevelEditor(
              'Level ' + e,
              this._linetool.properties()[t],
              !1
            );
        this.addOneColorPropertyWidget(this._table),
          (i = $("<input type='checkbox' class='visibility-switch'>")),
          (o = this.addLabeledRow(this._table, 'Levels', i)),
          $('<td>')
            .append(i)
            .prependTo(o),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().showCoeffs,
              !0,
              this.model(),
              'Change Fib Wedge Levels Visibility'
            )
          ),
          (o = $('<tr>')),
          o.appendTo(this._table),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(n)
            .appendTo(o),
          this.createLabeledCell('Background', n).appendTo(o),
          (a = h()),
          $('<td colspan="3">')
            .append(a)
            .appendTo(o),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Wedge Background Visibility'
            )
          ),
          this.bindControl(
            new p(
              a,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Wedge Background Transparency'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  726: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.ColorBinding,
      l = a.BooleanBinder,
      p = a.SliderBinder,
      d = i(830).createLineStyleEditor;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          h,
          c,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w,
          T,
          f,
          v,
          L,
          k,
          S,
          x,
          P;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = d()),
          (o = this.createColorPicker()),
          (n = this.addLabeledRow(e, $.t('Line'))),
          $('<td>')
            .append(o)
            .appendTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          $('<td colspan="3">')
            .append(i.render())
            .appendTo(n),
          (n = this.addLabeledRow(e, $.t('Text'))),
          (a = this.createColorPicker()),
          (h = this.createFontSizeEditor()),
          (c = this.createFontEditor()),
          (u = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          )),
          (b = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          )),
          $('<td>')
            .append(a)
            .appendTo(n),
          $('<td>')
            .append(c)
            .appendTo(n),
          $('<td>')
            .append(h)
            .appendTo(n),
          $('<td>')
            .append(u)
            .appendTo(n),
          $('<td>')
            .append(b)
            .appendTo(n),
          (y = $('<tbody>').appendTo(this._table)),
          (g = $('<input type="checkbox" class="visibility-switch">')),
          (C = this.createColorPicker()),
          (n = this.addLabeledRow(y, $.t('Background'), g)),
          (_ = $('<table>')),
          $('<td colspan="5">')
            .append(_)
            .appendTo(n),
          (n = $('<tr>').appendTo(_)),
          $('<td>')
            .append(g)
            .appendTo(n),
          $('<td>')
            .append(C)
            .appendTo(n),
          (m = $('<tbody>').appendTo(this._table)),
          (w = $('<label>' + $.t('Extend') + ' </label>').css({
            'margin-left': '8px',
          })),
          (T = $('<input type="checkbox">').appendTo(w)),
          (f = $('<label>' + $.t('Extend') + ' </label>').css({
            'margin-left': '8px',
          })),
          (v = $('<input type="checkbox">').appendTo(f)),
          (L = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (k = $(
            "<select><option value='0'>" +
              $.t('Normal') +
              "</option><option value='1'>" +
              $.t('Arrow') +
              '</option></select>'
          )),
          (n = this.addLabeledRow(m, $.t('Left End'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(L)
            .append(w),
          (n = this.addLabeledRow(m, $.t('Right End'))),
          $('<td colspan="3">')
            .appendTo(n)
            .append(k)
            .append(f),
          (S = $('<tbody>').appendTo(this._table)),
          (n = $('<tr>').appendTo(S)),
          (x = $("<input type='checkbox'>")),
          (P = $("<label style='display:block'>")
            .append(x)
            .append($.t('Show Prices'))),
          $("<td colspan='2'>")
            .append(P)
            .appendTo(n),
          this.bindControl(
            new s(
              h,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new s(
              c,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new r(
              a,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Text Color'
            )
          ),
          this.bindControl(
            new l(
              u,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new l(
              b,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          this.bindControl(
            new l(
              x,
              this._linetool.properties().showPrices,
              !0,
              this.model(),
              'Change Disjoint Angle Show Prices'
            )
          ),
          this.bindControl(
            new l(
              T,
              this._linetool.properties().extendLeft,
              !0,
              this.model(),
              'Change Disjoint Angle Extending Left'
            )
          ),
          this.bindControl(
            new l(
              v,
              this._linetool.properties().extendRight,
              !0,
              this.model(),
              'Change Disjoint Angle Extending Right'
            )
          ),
          this.bindControl(
            new r(
              o,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Disjoint Angle Color'
            )
          ),
          this.bindControl(
            new s(
              i,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Disjoint Angle Style'
            )
          ),
          this.bindControl(
            new p(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Disjoint Angle Width'
            )
          ),
          this.bindControl(
            new s(
              L,
              this._linetool.properties().leftEnd,
              parseInt,
              !0,
              this.model(),
              'Change Disjoint Angle Left End'
            )
          ),
          this.bindControl(
            new s(
              k,
              this._linetool.properties().rightEnd,
              parseInt,
              !0,
              this.model(),
              'Change Disjoint Angle Right End'
            )
          ),
          this.bindControl(
            new l(
              g,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Disjoint Angle Filling'
            )
          ),
          this.bindControl(
            new r(
              C,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Disjoint Angle Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  727: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.LessTransformer,
      r = a.GreateTransformer,
      l = a.ToFloatTransformer,
      p = a.BooleanBinder,
      d = a.SliderBinder,
      h = a.ColorBinding,
      c = a.SimpleComboBinder,
      u = a.SimpleStringBinder,
      b = i(829).addColorPicker,
      y = i(835).createTransparencyEditor;
    i(845),
      inherit(o, n),
      (o.prototype.addOneColorPropertyWidget = function(e) {
        var t = this.createOneColorForAllLinesWidget(),
          i = $('<tr>');
        i
          .append($('<td>'))
          .append($('<td>'))
          .append(t.editor)
          .append($('<td>').append(t.label)),
          i.appendTo(e);
      }),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          g,
          C,
          _,
          m,
          w,
          T,
          f,
          v,
          L,
          k,
          S,
          x,
          P,
          B,
          E,
          R,
          F,
          I,
          D,
          V,
          A,
          W,
          M,
          O,
          z,
          H,
          N,
          G,
          j,
          q,
          U,
          Y,
          K,
          J,
          Z;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page property-page-unpadded'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          this._table.css({ width: '100%' }),
          (e = $('<tr>')),
          e.appendTo(this._table),
          (t = this.model()),
          (i = this._linetool),
          (o = i.properties()),
          (n = $('<table>')),
          $("<td valign='top'>")
            .append(n)
            .appendTo(e),
          (a = $('<tr>')),
          $("<td colspan='3'>" + $.t('Levels') + '</td>').appendTo(a),
          a.appendTo(n);
        for (g in o.levels._childs)
          (C = o.levels[g]),
            (_ = $('<tr>')),
            _.appendTo(n),
            $('<td>' + g + '</td>').appendTo(_),
            (m = $("<input type='checkbox' class='visibility-switch'>")),
            $('<td>')
              .append(m)
              .appendTo(_),
            (w = $("<td class='colorpicker-cell'>")),
            w.appendTo(_),
            (T = b(w)),
            (f = $('<td>')),
            f.appendTo(_),
            (v = this.createLineWidthEditor()),
            v.appendTo(f),
            this.bindControl(
              new p(m, C.visible, !0, t, 'Change Gann Line Visibility')
            ),
            this.bindControl(
              new h(T, C.color, !0, t, 'Change Gann Line Color', 0)
            ),
            this.bindControl(
              new d(v, C.width, !0, t, 'Change Gann Line Width')
            );
        (L = $('<table>')),
          $("<td valign='top'>")
            .append(L)
            .appendTo(e),
          (k = $('<tr>')),
          $("<td colspan='4'>" + $.t('Fans') + '</td>').appendTo(k),
          k.appendTo(L);
        for (g in o.fanlines._childs)
          (S = o.fanlines[g]),
            (x = $('<tr>')),
            x.appendTo(L),
            (m = $("<input type='checkbox' class='visibility-switch'>")),
            $('<td>')
              .append(m)
              .appendTo(x),
            (P = S.x.value() + 'x' + S.y.value()),
            $('<td>' + P + '</td>').appendTo(x),
            (w = $("<td class='colorpicker-cell'>")),
            w.appendTo(x),
            (T = b(w)),
            (f = $('<td>')),
            f.appendTo(x),
            (v = this.createLineWidthEditor()),
            v.appendTo(f),
            this.bindControl(
              new p(m, S.visible, !0, t, 'Change Gann Line Visibility')
            ),
            this.bindControl(
              new h(T, S.color, !0, t, 'Change Gann Fan Color', 0)
            ),
            this.bindControl(
              new d(v, S.width, !0, t, 'Change Gann Line Width')
            );
        (B = $('<table>')),
          $("<td valign='top'>")
            .append(B)
            .appendTo(e),
          (E = $('<tr>')),
          $("<td colspan='4'>" + $.t('Arcs') + '</td>').appendTo(E),
          E.appendTo(B);
        for (g in o.arcs._childs)
          (R = o.arcs[g]),
            (F = $('<tr>')),
            F.appendTo(B),
            (m = $("<input type='checkbox' class='visibility-switch'>")),
            $('<td>')
              .append(m)
              .appendTo(F),
            (P = R.x.value() + 'x' + R.y.value()),
            $('<td>' + P + '</td>').appendTo(F),
            (w = $("<td class='colorpicker-cell'>")),
            w.appendTo(F),
            (T = b(w)),
            (f = $('<td>')),
            f.appendTo(F),
            (v = this.createLineWidthEditor()),
            v.appendTo(f),
            this.bindControl(
              new p(m, R.visible, !0, t, 'Change Gann Line Visibility')
            ),
            this.bindControl(
              new h(T, R.color, !0, t, 'Change Gann Arc Color', 0)
            ),
            this.bindControl(
              new d(v, R.width, !0, t, 'Change Gann Line Width')
            );
        this.addOneColorPropertyWidget(B),
          (I = $('<tbody>').appendTo(this._table)),
          (D = $('<input type="checkbox" class="visibility-switch">')),
          (V = y()),
          (A = $('<tr>').appendTo(I)),
          (W = $('<table>')),
          $('<td colspan="3">')
            .append(W)
            .appendTo(A),
          (A = $('<tr>').appendTo(W)),
          $('<td>')
            .append(D)
            .appendTo(A),
          $('<td>' + $.t('Background') + '</td>').appendTo(A),
          $('<td>')
            .append(V)
            .appendTo(A),
          o.reverse &&
            ((M = $("<input type='checkbox' class='visibility-switch'>")),
            (A = this.addLabeledRow(W, $.t('Reverse'), M, !0)),
            $('<td>')
              .append(M)
              .prependTo(A),
            (O = 'Change Gann Square Reverse'),
            this.bindControl(new p(M, o.reverse, !0, t, O))),
          this.bindControl(
            new p(
              D,
              o.arcsBackground.fillBackground,
              !0,
              t,
              'Change Gann Square Filling'
            )
          ),
          this.bindControl(
            new d(
              V,
              o.arcsBackground.transparency,
              !0,
              t,
              'Change Gann Square Background Transparency'
            )
          ),
          (z = $('<input type="text">')),
          (A = this.addLabeledRow(W, $.t('Price/Bar Ratio'), z, !0)),
          $('<td>')
            .append(z)
            .appendTo(A),
          z.TVTicker({ step: i.getScaleRatioStep() }),
          (O = 'Change Gann Square Scale Ratio'),
          (H = this._getPropertySetter(o.scaleRatio, O)),
          (N = [l(o.scaleRatio.value()), r(1e-7), s(1e8)]),
          (G = new u(z, o.scaleRatio, N, !1, t, O, H)),
          G.addFormatter(function(e) {
            return i.getScaleRatioFormatter().format(e);
          }),
          this.bindControl(G),
          (j = $('<input type="checkbox">')),
          (A = this.addLabeledRow(W, $.t('Ranges And Ratio'), j, !1)),
          $('<td>')
            .append(j)
            .prependTo(A),
          this.bindControl(
            new p(
              j,
              o.showLabels,
              !0,
              t,
              'Change Gann Square Lables Visibility'
            )
          ),
          (v = this.createLineWidthEditor()),
          (T = this.createColorPicker()),
          (q = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          )),
          (U = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          )),
          (Y = this.createFontSizeEditor()),
          (K = this.createFontEditor()),
          (J = o.labelsStyle),
          this.bindControl(
            new c(Y, J.fontSize, parseInt, !0, t, 'Change Text Font Size')
          ),
          this.bindControl(new c(K, J.font, null, !0, t, 'Change Text Font')),
          this.bindControl(new p(q, J.bold, !0, t, 'Change Text Font Bold')),
          this.bindControl(
            new p(U, J.italic, !0, t, 'Change Text Font Italic')
          ),
          (Z = $(
            '<table class="property-page" cellspacing="0" cellpadding="2"><tr>'
          )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(K)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(Y)
            )
            .append(
              $(document.createElement('td'))
                .css('vertical-align', 'top')
                .attr({ width: 1 })
                .append(q)
            )
            .append(
              $(document.createElement('td'))
                .css('vertical-align', 'top')
                .append(U)
            )
            .append($('</tr></table>'))),
          $('<td colspan="5" class="no-left-indent">')
            .append(Z)
            .appendTo(A);
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (o.prototype._getPropertySetter = function(e, t) {
        var i = this.model(),
          o = this._linetool;
        return function(n) {
          i.beginUndoMacro(t),
            i.saveLineToolState(o, 'Save Gann Square State'),
            i.setProperty(e, n, t),
            i.saveLineToolState(o, 'Save Gann Square State'),
            i.endUndoMacro();
        };
      }),
      (e.exports.LineToolGannComplexStylesPropertyPage = o);
  },
  728: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.SliderBinder,
      l = a.ColorBinding,
      p = i(829).addColorPicker,
      d = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addOneColorPropertyWidget = function(e) {
        var t = this.createOneColorForAllLinesWidget(),
          i = $('<tr>');
        i
          .append($('<td>'))
          .append($('<td>'))
          .append(t.editor)
          .append($('<td>').append(t.label)),
          i.appendTo(e);
      }),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          h,
          c,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w,
          T,
          f,
          v,
          L,
          k,
          S,
          x,
          P,
          B,
          E,
          R;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page property-page-unpadded'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          this._table.css({ width: '100%' }),
          (e = $('<tr>')),
          e.appendTo(this._table),
          (t = this._linetool.properties()),
          (i = $('<table>')),
          $("<td valign='top'>")
            .append(i)
            .appendTo(e),
          (o = $('<tr>')),
          $("<td colspan='3'>" + $.t('Levels') + '</td>').appendTo(o),
          o.appendTo(i);
        for (n in t.levels._childs)
          (a = t.levels[n]),
            (h = $('<tr>')),
            h.appendTo(i),
            $('<td>' + n + '</td>').appendTo(h),
            (c = $("<input type='checkbox' class='visibility-switch'>")),
            $('<td>')
              .append(c)
              .appendTo(h),
            (u = $("<td class='colorpicker-cell'>")),
            u.appendTo(h),
            (b = p(u)),
            (y = $('<td>')),
            y.appendTo(h),
            (g = this.createLineWidthEditor()),
            g.appendTo(y),
            this.bindControl(
              new s(
                c,
                a.visible,
                !0,
                this.model(),
                'Change Gann Line Visibility'
              )
            ),
            this.bindControl(
              new l(b, a.color, !0, this.model(), 'Change Gann Line Color', 0)
            ),
            this.bindControl(
              new r(g, a.width, !0, this.model(), 'Change Gann Line Width')
            );
        (C = $('<table>')),
          $("<td valign='top'>")
            .append(C)
            .appendTo(e),
          (_ = $('<tr>')),
          $("<td colspan='4'>" + $.t('Fans') + '</td>').appendTo(_),
          _.appendTo(C);
        for (n in t.fanlines._childs)
          (m = t.fanlines[n]),
            (w = $('<tr>')),
            w.appendTo(C),
            (c = $("<input type='checkbox' class='visibility-switch'>")),
            $('<td>')
              .append(c)
              .appendTo(w),
            (T = m.x.value() + 'x' + m.y.value()),
            $('<td>' + T + '</td>').appendTo(w),
            (u = $("<td class='colorpicker-cell'>")),
            u.appendTo(w),
            (b = p(u)),
            (y = $('<td>')),
            y.appendTo(w),
            (g = this.createLineWidthEditor()),
            g.appendTo(y),
            this.bindControl(
              new s(
                c,
                m.visible,
                !0,
                this.model(),
                'Change Gann Line Visibility'
              )
            ),
            this.bindControl(
              new l(b, m.color, !0, this.model(), 'Change Gann Fan Color', 0)
            ),
            this.bindControl(
              new r(g, m.width, !0, this.model(), 'Change Gann Line Width')
            );
        (f = $('<table>')),
          $("<td valign='top'>")
            .append(f)
            .appendTo(e),
          (v = $('<tr>')),
          $("<td colspan='4'>" + $.t('Arcs') + '</td>').appendTo(v),
          v.appendTo(f);
        for (n in t.arcs._childs)
          (L = t.arcs[n]),
            (k = $('<tr>')),
            k.appendTo(f),
            (c = $("<input type='checkbox' class='visibility-switch'>")),
            $('<td>')
              .append(c)
              .appendTo(k),
            (T = L.x.value() + 'x' + L.y.value()),
            $('<td>' + T + '</td>').appendTo(k),
            (u = $("<td class='colorpicker-cell'>")),
            u.appendTo(k),
            (b = p(u)),
            (y = $('<td>')),
            y.appendTo(k),
            (g = this.createLineWidthEditor()),
            g.appendTo(y),
            this.bindControl(
              new s(
                c,
                L.visible,
                !0,
                this.model(),
                'Change Gann Line Visibility'
              )
            ),
            this.bindControl(
              new l(b, L.color, !0, this.model(), 'Change Gann Arc Color', 0)
            ),
            this.bindControl(
              new r(g, L.width, !0, this.model(), 'Change Gann Line Width')
            );
        this.addOneColorPropertyWidget(f),
          (S = $('<tbody>').appendTo(this._table)),
          (x = $('<input type="checkbox" class="visibility-switch">')),
          (P = d()),
          (B = $('<tr>').appendTo(S)),
          (E = $('<table>')),
          $('<td colspan="3">')
            .append(E)
            .appendTo(B),
          (B = $('<tr>').appendTo(E)),
          $('<td>')
            .append(x)
            .appendTo(B),
          $('<td>' + $.t('Background') + '</td>').appendTo(B),
          $('<td>')
            .append(P)
            .appendTo(B),
          t.reverse &&
            ((R = $("<input type='checkbox' class='visibility-switch'>")),
            (B = this.addLabeledRow(E, $.t('Reverse'), R, !0)),
            $('<td>')
              .append(R)
              .prependTo(B),
            this.bindControl(
              new s(
                R,
                t.reverse,
                !0,
                this.model(),
                'Change Gann Square Reverse'
              )
            )),
          this.bindControl(
            new s(
              x,
              t.arcsBackground.fillBackground,
              !0,
              this.model(),
              'Change Gann Square Filling'
            )
          ),
          this.bindControl(
            new r(
              P,
              t.arcsBackground.transparency,
              !0,
              this.model(),
              'Change Gann Square Background Transparency'
            )
          );
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports.LineToolGannFixedStylesPropertyPage = o);
  },
  729: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.SimpleComboBinder,
      p = a.SliderBinder,
      d = i(829).addColorPicker,
      h = i(830).createLineStyleEditor,
      c = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t, i, o) {
        var n,
          a,
          c,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w = $('<tr>');
        w.appendTo(this._tbody),
          (n = 'control-level-' + i + '-' + o),
          (a = $('<td>')),
          a.appendTo(w),
          (c = $(
            "<input type='checkbox' class='visibility-switch' id='" + n + "'>"
          )),
          c.appendTo(a),
          (u = this.createLabeledCell(e).appendTo(w)),
          u.find('label').attr('for', n),
          (b = $("<td class='colorpicker-cell'>")),
          b.appendTo(w),
          (y = d(b)),
          (g = $('<td>')),
          g.appendTo(w),
          (C = this.createLineWidthEditor()),
          C.appendTo(g),
          (_ = $('<td>')),
          _.appendTo(w),
          (m = h()),
          m.render().appendTo(_),
          this.bindControl(
            new s(
              c,
              t.visible,
              !0,
              this.model(),
              'Change Gann Fan Line Visibility'
            )
          ),
          this.bindControl(
            new r(y, t.color, !0, this.model(), 'Change Gann Fan Line Color', 0)
          ),
          this.bindControl(
            new l(
              m,
              t.linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Gann Fan Line Style'
            )
          ),
          this.bindControl(
            new p(
              C,
              t.linewidth,
              !0,
              this.model(),
              'Change Gann Fan Line Width'
            )
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          r,
          l,
          d,
          h,
          u = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          ),
          b = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          );
        for (this._tbody = $('<tbody>').appendTo(u), e = 1; e <= 9; e++)
          (t = 'level' + e),
            (i = this._linetool.properties()[t]),
            (o = i.coeff1.value()),
            (n = i.coeff2.value()),
            (a = '<sup>' + o + '</sup>&frasl;<sub>' + n + '</sub>'),
            this.addLevelEditor(a, i, o, n);
        this.addOneColorPropertyWidget(this._tbody),
          (r = $("<input type='checkbox' class='visibility-switch'>")),
          (l = this.addLabeledRow(b, $.t('Labels'), r)),
          $('<td>')
            .append(r)
            .prependTo(l),
          this.bindControl(
            new s(
              r,
              this._linetool.properties().showLabels,
              !0,
              this.model(),
              'Change Gann Fan Labels Visibility'
            )
          ),
          (this._table = u.add(b)),
          (l = $('<tr>')),
          l.appendTo(this._table),
          (d = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(d)
            .appendTo(l),
          this.createLabeledCell($.t('Background'), d).appendTo(l),
          (h = c()),
          $('<td colspan="3">')
            .append(h)
            .appendTo(l),
          this.bindControl(
            new s(
              d,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Pitchfan Background Visibility'
            )
          ),
          this.bindControl(
            new p(
              h,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Pitchfan Background Transparency'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  730: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.FloatBinder,
      l = a.ColorBinding,
      p = a.SliderBinder,
      d = i(829).addColorPicker,
      h = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t, i) {
        var o,
          n,
          a,
          p,
          h,
          c,
          u = $('<tr>');
        u.appendTo(e),
          (o = $('<td>')),
          o.appendTo(u),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          n.appendTo(o),
          (a = $('<td>')),
          a.appendTo(u),
          (p = $("<input type='text'>")),
          p.appendTo(a),
          p.css('width', '70px'),
          this.bindControl(
            new s(
              n,
              i.visible,
              !0,
              this.model(),
              'Change Gann Square Line Visibility'
            )
          ),
          this.bindControl(
            new r(p, i.coeff, !1, this.model(), 'Change Pitchfork Line Coeff')
          ),
          (h = $("<td class='colorpicker-cell'>")),
          h.appendTo(u),
          (c = d(h)),
          this.bindControl(
            new l(
              c,
              i.color,
              !0,
              this.model(),
              'Change Gann Square Line Color',
              0
            )
          );
      }),
      (o.prototype.addFannEditor = function(e) {
        var t,
          i,
          o = $('<tr>').appendTo(e),
          n = $("<input type='checkbox' class='visibility-switch'>");
        n.appendTo($('<td>').appendTo(o)),
          $('<td>' + $.t('Angles') + '</td>').appendTo(o),
          (t = $("<td class='colorpicker-cell'>").appendTo(o)),
          (i = d(t)),
          this.bindControl(
            new s(
              n,
              this._linetool.properties().fans.visible,
              !0,
              this.model(),
              'Change Gann Square Angles Visibility'
            )
          ),
          this.bindControl(
            new l(
              i,
              this._linetool.properties().fans.color,
              !0,
              this.model(),
              'Change Gann Square Angles Color',
              0
            )
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, r, l, d, c, u, b, y, g, C, _, m, w, T, f;
        for (
          this._table = $(document.createElement('table')),
            this._table.addClass('property-page property-page-unpadded'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            this._table.css({ width: '100%' }),
            e = $('<tbody>').appendTo(this._table),
            t = $('<tr>'),
            t.appendTo(e),
            i = $('<td width="50%">'),
            i.appendTo(t),
            o = $('<td width="50%">'),
            o.appendTo(t),
            n = $('<table cellspacing="0" cellpadding="2">'),
            n.appendTo(i),
            n.addClass('property-page'),
            a = $('<table cellspacing="0" cellpadding="2">'),
            a.appendTo(o),
            a.addClass('property-page'),
            $(
              "<tr><td align='center' colspan='4'>" +
                $.t('Price Levels') +
                '</td></tr>'
            ).appendTo(n),
            $(
              "<tr><td align='center' colspan='4'>" +
                $.t('Time Levels') +
                '</td></tr>'
            ).appendTo(a),
            r = 1;
          r <= 7;
          r++
        )
          (l = 'hlevel' + r),
            this.addLevelEditor(
              n,
              $.t('Level {0}').format(r),
              this._linetool.properties()[l]
            );
        for (r = 1; r <= 7; r++)
          (l = 'vlevel' + r),
            this.addLevelEditor(
              a,
              $.t('Level {0}').format(r),
              this._linetool.properties()[l]
            );
        this.addFannEditor(n),
          this.addOneColorPropertyWidget(a),
          o.css({ 'vertical-align': 'top' }),
          i.css({ 'vertical-align': 'top' }),
          (d = $("<input type='checkbox' class='visibility-switch'>")),
          (c = $("<input type='checkbox' class='visibility-switch'>")),
          (u = $("<input type='checkbox' class='visibility-switch'>")),
          (b = $("<input type='checkbox' class='visibility-switch'>")),
          (y = $(
            '<table class="property-page property-page-unpadded" cellspacing="0" cellpadding="0">'
          ).css({ width: '100%' })),
          (g = $('<tr>').appendTo(y)),
          (C = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).appendTo(
            $('<td>')
              .css({ width: '50%', 'vertical-align': 'top' })
              .appendTo(g)
          )),
          (_ = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).appendTo(
            $('<td>')
              .css({ width: '50%', 'vertical-align': 'top' })
              .appendTo(g)
          )),
          (m = this.addLabeledRow(C, $.t('Left Labels'), d)),
          $('<td>')
            .append(d)
            .prependTo(m),
          (m = this.addLabeledRow(_, $.t('Right Labels'), c)),
          $('<td>')
            .append(c)
            .prependTo(m),
          (m = this.addLabeledRow(C, $.t('Top Labels'), u)),
          $('<td>')
            .append(u)
            .prependTo(m),
          (m = this.addLabeledRow(_, $.t('Bottom Labels'), b)),
          $('<td>')
            .append(b)
            .prependTo(m),
          this.bindControl(
            new s(
              d,
              this._linetool.properties().showLeftLabels,
              !0,
              this.model(),
              'Change Gann Square Left Labels Visibility'
            )
          ),
          this.bindControl(
            new s(
              c,
              this._linetool.properties().showRightLabels,
              !0,
              this.model(),
              'Change Gann Square Right Labels Visibility'
            )
          ),
          this.bindControl(
            new s(
              u,
              this._linetool.properties().showTopLabels,
              !0,
              this.model(),
              'Change Gann Square Top Labels Visibility'
            )
          ),
          this.bindControl(
            new s(
              b,
              this._linetool.properties().showBottomLabels,
              !0,
              this.model(),
              'Change Gann Square Bottom Labels Visibility'
            )
          ),
          (this._table = this._table.add(y)),
          (m = $('<tr>')),
          m.appendTo(C),
          (w = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(w)
            .appendTo(m),
          (T = h()),
          $('<td>')
            .append(T)
            .appendTo(m),
          this.bindControl(
            new s(
              w,
              this._linetool.properties().fillHorzBackground,
              !0,
              this.model(),
              'Change Gann Square Background Visibility'
            )
          ),
          this.bindControl(
            new p(
              T,
              this._linetool.properties().horzTransparency,
              !0,
              this.model(),
              'Change Gann Square Background Transparency'
            )
          ),
          (m = $('<tr>')),
          m.appendTo(_),
          (w = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(w)
            .appendTo(m),
          (T = h()),
          $('<td>')
            .append(T)
            .appendTo(m),
          this.bindControl(
            new s(
              w,
              this._linetool.properties().fillVertBackground,
              !0,
              this.model(),
              'Change Gann Square Background Visibility'
            )
          ),
          this.bindControl(
            new p(
              T,
              this._linetool.properties().vertTransparency,
              !0,
              this.model(),
              'Change Gann Square Background Transparency'
            )
          ),
          this._linetool.properties().reverse &&
            ((f = $("<input type='checkbox' class='visibility-switch'>")),
            (m = this.addLabeledRow(C, $.t('Reverse'), f)),
            $('<td>')
              .append(f)
              .prependTo(m),
            this.bindControl(
              new s(
                f,
                this._linetool.properties().reverse,
                !0,
                this.model(),
                'Change Gann Box Reverse'
              )
            )),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  731: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823).ColorBinding;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createColorPicker()),
          (t = $.t('Color') + ':'),
          (i = this.addLabeledRow(this._table, t)),
          $('<td>')
            .append(e)
            .appendTo(i),
          (o = this._linetool.properties()),
          (this._div = $('<div>').append(this._table)),
          this.bindControl(
            new a(e, o.color, !0, this.model(), 'Change Icon Color')
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._div;
      }),
      (e.exports = o);
  },
  732: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.SliderBinder,
      p = a.SimpleComboBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, d, h, c, u, b;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = this.createColorPicker()),
          (i = this.createColorPicker()),
          (o = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          )),
          (n = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          )),
          (a = this.createFontSizeEditor()),
          (d = this.createFontEditor()),
          (h = this.addLabeledRow(this._table, 'Border')),
          h.prepend('<td>'),
          $('<td>')
            .append(t)
            .appendTo(h),
          $('<td>')
            .append(e)
            .appendTo(h),
          (c = $('<input type="checkbox" class="visibility-switch">')),
          (u = this.createColorPicker()),
          (d = this.createFontEditor()),
          (h = this.addLabeledRow(this._table, 'Background', c)),
          $('<td>')
            .append(c)
            .prependTo(h),
          $('<td>')
            .append(u)
            .appendTo(h),
          this.bindControl(
            new s(
              c,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Pattern Filling'
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Pattern Line Color'
            )
          ),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Pattern Text Color'
            )
          ),
          this.bindControl(
            new r(
              u,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Pattern Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new l(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Pattern Border Width'
            )
          ),
          this.bindControl(
            new p(
              a,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new p(
              d,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new s(
              o,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new s(
              n,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          (b = $(
            '<table class="property-page" cellspacing="0" cellpadding="2"><tr>'
          )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(i)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(d)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(a)
            )
            .append(
              $(document.createElement('td'))
                .css('vertical-align', 'top')
                .attr({ width: 1 })
                .append(o)
            )
            .append(
              $(document.createElement('td'))
                .css('vertical-align', 'top')
                .append(n)
            )
            .append($('</tr></table>'))),
          (h = this.addLabeledRow(this._table, '')),
          $('<td colspan="5">')
            .append(b)
            .appendTo(h),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  733: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      a.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(6).Point,
      a = i(825),
      s = i(823),
      r = s.ColorBinding,
      l = s.SimpleComboBinder,
      p = s.SimpleStringBinder,
      d = s.BooleanBinder,
      h = i(62).linking;
    inherit(o, a),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n = this.createColorPicker(),
          a = this.createFontSizeEditor(),
          s = this.createFontEditor(),
          h = this.createTextEditor(350, 200),
          c = this.createColorPicker(),
          u = this.createColorPicker(),
          b = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          ),
          y = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          );
        this.bindControl(
          new r(
            n,
            this._linetool.properties().textColor,
            !0,
            this.model(),
            'Change Text Color'
          )
        ),
          this.bindControl(
            new l(
              a,
              this._linetool.properties().fontSize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new l(
              s,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new p(
              h,
              this._linetool.properties().text,
              null,
              !0,
              this.model(),
              'Change Text'
            )
          ),
          this.bindControl(
            new r(
              c,
              this._linetool.properties().markerColor,
              !0,
              this.model(),
              'Change Marker and Border Color'
            )
          ),
          this.bindControl(
            new r(
              u,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Background Color',
              this._linetool.properties().backgroundTransparency
            )
          ),
          this.bindControl(
            new d(
              b,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new d(
              y,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          (e = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          )),
          (t = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          )),
          (i = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          )),
          (this._table = e.add(i).add(t)),
          $(document.createElement('tr'))
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(n)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(s)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(a)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(b)
            )
            .append($(document.createElement('td')).append(y))
            .appendTo(e),
          $(document.createElement('tr'))
            .append(
              $(document.createElement('td'))
                .attr({ colspan: 5 })
                .append(h)
            )
            .appendTo(e),
          (o = this.addLabeledRow(i, $.t('Label'))),
          $('<td>')
            .attr('colspan', 2)
            .append(c)
            .appendTo(o),
          (o = this.addLabeledRow(i, $.t('Background'))),
          $('<td>')
            .append(u)
            .appendTo(o),
          this.loadData(),
          setTimeout(function() {
            h.select(), h.focus();
          }, 20);
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (o.prototype.dialogPosition = function(e, t) {
        var i, o, a, s, r, l, p, d, c, u;
        if (e && t) {
          for (
            i = 0,
              o = this._linetool._model.paneForSource(this._linetool),
              a = h.getChartWidget();
            i < a.paneWidgets().length;
            i++
          )
            if (a.paneWidgets()[i]._state === o) {
              s = $(a.paneWidgets()[i].canvas).offset().left;
              break;
            }
          return (
            (r = (this._linetool.paneViews() || [])[0]),
            (l = new n(0, 0)),
            r && (l = r._floatPoints[0] || this._linetool._fixedPoints[0] || l),
            (p = (s || 0) + l.x),
            (d = this._linetool.getTooltipWidth()),
            (c = p - d / 2),
            (u = t.outerWidth()),
            e.left < c && e.left + u + 10 > c
              ? ((e.left -= e.left + u + 10 - c), e)
              : e.left > c && e.left < c + d + 10
              ? ((e.left += c + d + 10 - e.left), e)
              : void 0
          );
        }
      }),
      (e.exports = o);
  },
  734: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.SimpleComboBinder,
      p = a.SliderBinder,
      d = i(830).createLineStyleEditor;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, h, c, u, b, y, g, C, _, m, w, T;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = d()),
          (o = this.createColorPicker()),
          (n = $('<tr>').appendTo(e)),
          $('<td></td><td>' + $.t('Channel') + '</td>').appendTo(n),
          $('<td>')
            .append(o)
            .appendTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          $('<td>')
            .append(i.render())
            .appendTo(n),
          (n = $('<tr>').appendTo(e)),
          (a = $('<td>').appendTo(n)),
          (h = $("<input type='checkbox' class='visibility-switch'>")),
          h.appendTo(a),
          this.createLabeledCell('Middle', h).appendTo(n),
          (c = this.createLineWidthEditor()),
          (u = d()),
          (b = this.createColorPicker()),
          $('<td>')
            .append(b)
            .appendTo(n),
          $('<td>')
            .append(c)
            .appendTo(n),
          $('<td>')
            .append(u.render())
            .appendTo(n),
          (n = $('<tr>').appendTo(e)),
          (y = $('<td>').appendTo(n)),
          (g = $("<input type='checkbox' class='visibility-switch'>")),
          g.appendTo(y),
          this.createLabeledCell('Background', g).appendTo(n),
          (C = this.createColorPicker()),
          $('<td>')
            .append(C)
            .appendTo(n),
          (_ = $('<tbody>').appendTo(this._table)),
          (m = this.addEditorRow(
            _,
            'Extend Left',
            $("<input type='checkbox'>"),
            2
          )),
          (w = this.addEditorRow(
            _,
            'Extend Right',
            $("<input type='checkbox'>"),
            2
          )),
          (T = this._linetool.properties()),
          this.bindControl(
            new s(
              g,
              T.fillBackground,
              !0,
              this.model(),
              'Change Parallel Channel Fill Background'
            )
          ),
          this.bindControl(
            new s(
              h,
              T.showMidline,
              !0,
              this.model(),
              'Change Parallel Channel Show Center Line'
            )
          ),
          this.bindControl(
            new s(
              m,
              T.extendLeft,
              !0,
              this.model(),
              'Change Parallel Channel Extending Left'
            )
          ),
          this.bindControl(
            new s(
              w,
              T.extendRight,
              !0,
              this.model(),
              'Change Parallel Channel Extending Right'
            )
          ),
          this.bindControl(
            new r(
              o,
              T.linecolor,
              !0,
              this.model(),
              'Change Parallel Channel Color'
            )
          ),
          this.bindControl(
            new l(
              i,
              T.linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Parallel Channel Style'
            )
          ),
          this.bindControl(
            new p(
              t,
              T.linewidth,
              !0,
              this.model(),
              'Change Parallel Channel Width'
            )
          ),
          this.bindControl(
            new r(
              b,
              T.midlinecolor,
              !0,
              this.model(),
              'Change Parallel Channel Middle Color'
            )
          ),
          this.bindControl(
            new l(
              u,
              T.midlinestyle,
              parseInt,
              !0,
              this.model(),
              'Change Parallel Channel Middle Style'
            )
          ),
          this.bindControl(
            new p(
              c,
              T.midlinewidth,
              !0,
              this.model(),
              'Change Parallel Channel Middle Width'
            )
          ),
          this.bindControl(
            new r(
              C,
              T.backgroundColor,
              !0,
              this.model(),
              'Change Parallel Channel Back Color',
              T.transparency
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  735: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.FloatBinder,
      l = a.ColorBinding,
      p = a.SimpleComboBinder,
      d = a.SliderBinder,
      h = i(829).addColorPicker,
      c = i(830).createLineStyleEditor,
      u = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t, i) {
        var o,
          n,
          a,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w = $('<tr>');
        w.appendTo(this._table),
          e
            ? ((o = $('<td>')),
              o.appendTo(w),
              (n = $("<input type='checkbox' class='visibility-switch'>")),
              n.appendTo(o),
              (a = $('<td>')),
              a.appendTo(w),
              (u = $("<input type='text'>")),
              u.appendTo(a),
              u.css('width', '70px'),
              this.bindControl(
                new s(
                  n,
                  t.visible,
                  !0,
                  this.model(),
                  'Change Pitchfork Line Visibility'
                )
              ),
              this.bindControl(
                new r(
                  u,
                  t.coeff,
                  !1,
                  this.model(),
                  'Change Pitchfork Line Coeff'
                )
              ))
            : $("<td colspan='2'>" + $.t('Median') + '</td>').appendTo(w),
          (b = $("<td class='colorpicker-cell'>")),
          b.appendTo(w),
          (y = h(b)),
          (g = $('<td>')),
          g.appendTo(w),
          (C = this.createLineWidthEditor()),
          C.appendTo(g),
          (_ = $('<td>')),
          _.appendTo(w),
          (m = c()),
          m.render().appendTo(_),
          this.bindControl(
            new l(y, t.color, !0, this.model(), 'Change Pitchfork Line Color'),
            0
          ),
          this.bindControl(
            new p(
              m,
              t.linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Pitchfan Line Style'
            )
          ),
          this.bindControl(
            new d(
              C,
              t.linewidth,
              !0,
              this.model(),
              'Change Pitchfan Line Width'
            )
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        for (
          this._table = $(document.createElement('table')),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            this.addLevelEditor(null, this._linetool.properties().median, !1),
            e = 0;
          e <= 8;
          e++
        )
          (t = 'level' + e),
            this.addLevelEditor(
              $.t('Level {0}').format(e + 1),
              this._linetool.properties()[t],
              !1
            );
        this.addOneColorPropertyWidget(this._table),
          (i = $('<tr>')),
          i.appendTo(this._table),
          (o = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(o)
            .appendTo(i),
          this.createLabeledCell($.t('Background'), o).appendTo(i),
          (n = u()),
          $('<td colspan="3">')
            .append(n)
            .appendTo(i),
          this.bindControl(
            new s(
              o,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Pitchfan Background Visibility'
            )
          ),
          this.bindControl(
            new d(
              n,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Pitchfan Background Transparency'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  736: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.FloatBinder,
      l = a.ColorBinding,
      p = a.SimpleComboBinder,
      d = a.SliderBinder,
      h = i(829).addColorPicker,
      c = i(830).createLineStyleEditor,
      u = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.onResoreDefaults = function() {
        this._linetool
          .properties()
          .style.listeners()
          .fire(this._linetool.properties().style);
      }),
      (o.prototype.addLevelEditor = function(e, t, i) {
        var o,
          n,
          a,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w = $('<tr>');
        w.appendTo(this._table),
          e
            ? ((o = $('<td>')),
              o.appendTo(w),
              (n = $("<input type='checkbox' class='visibility-switch'>")),
              n.appendTo(o),
              (a = $('<td>')),
              a.appendTo(w),
              (u = $("<input type='text'>")),
              u.appendTo(a),
              u.css('width', '70px'),
              this.bindControl(
                new s(
                  n,
                  t.visible,
                  !0,
                  this.model(),
                  'Change Pitchfork Line Visibility'
                )
              ),
              this.bindControl(
                new r(
                  u,
                  t.coeff,
                  !1,
                  this.model(),
                  'Change Pitchfork Line Coeff'
                )
              ))
            : ($('<td></td>').appendTo(w),
              $('<td>' + $.t('Median') + '</td>').appendTo(w)),
          (b = $("<td class='colorpicker-cell'>")),
          b.appendTo(w),
          (y = h(b)),
          (g = $('<td>')),
          g.appendTo(w),
          (C = this.createLineWidthEditor()),
          C.appendTo(g),
          (_ = $('<td>')),
          _.appendTo(w),
          (m = c()),
          m.render().appendTo(_),
          this.bindControl(
            new l(
              y,
              t.color,
              !0,
              this.model(),
              'Change Pitchfork Line Color',
              0
            )
          ),
          this.bindControl(
            new p(
              m,
              t.linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Pitchfork Line Style'
            )
          ),
          this.bindControl(
            new d(
              C,
              t.linewidth,
              !0,
              this.model(),
              'Change Pitchfork Line Width'
            )
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a;
        for (
          this._table = $(document.createElement('table')),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            this.addLevelEditor(null, this._linetool.properties().median, !1),
            e = 0;
          e <= 8;
          e++
        )
          (t = 'level' + e),
            this.addLevelEditor(
              $.t('Level {0}').format(e + 1),
              this._linetool.properties()[t],
              !1
            );
        this.addOneColorPropertyWidget(this._table),
          (i = $('<tr>')),
          i.appendTo(this._table),
          (o = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(o)
            .appendTo(i),
          this.createLabeledCell('Background', o).appendTo(i),
          (n = u()),
          $('<td colspan="3">')
            .append(n)
            .appendTo(i),
          (a = $(
            "<select><option value='0'>" +
              $.t('Original') +
              "</option><option value='3'>" +
              $.t('Schiff') +
              "</option><option value='1'>" +
              $.t('Modified Schiff') +
              "</option><option value='2'>" +
              $.t('Inside') +
              '</option></select>'
          )),
          (i = $('<tr>')),
          i.appendTo(this._table),
          $('<td>' + $.t('Style') + '</td>').appendTo(i),
          $('<td>')
            .append(a)
            .appendTo(i),
          this.bindControl(
            new p(
              a,
              this._linetool.properties().style,
              parseInt,
              !0,
              this.model(),
              'Change Pitchfork Style'
            )
          ),
          this.bindControl(
            new s(
              o,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Pitchfork Background Visibility'
            )
          ),
          this.bindControl(
            new d(
              n,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Pitchfork Background Transparency'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  737: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.SliderBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, 'Border')),
          i.prepend('<td>'),
          $('<td>')
            .append(t)
            .appendTo(i),
          $('<td>')
            .append(e)
            .appendTo(i),
          (o = $('<input type="checkbox" class="visibility-switch">')),
          (n = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, 'Background', o)),
          $('<td>')
            .append(o)
            .prependTo(i),
          $('<td>')
            .append(n)
            .appendTo(i),
          this.bindControl(
            new s(
              o,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Polyline Filling'
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Polyline Line Color'
            )
          ),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Polyline Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new l(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Polyline Border Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  738: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.ColorBinding,
      r = a.SliderBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          l,
          p,
          d,
          h,
          c,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          ),
          T = $(
            '<table class="property-page property-page-unpadded" cellspacing="0" cellpadding="0">'
          ).css({ width: '100%' }),
          f = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          );
        (this._table = w.add(T).add(f)),
          (e = this.createColorPicker()),
          (t = this.createLineWidthEditor()),
          (i = this.addLabeledRow(w, 'Line')),
          $('<td>')
            .append(e)
            .appendTo(i),
          $('<td>')
            .append(t)
            .appendTo(i),
          (o = $('<tr>').appendTo(T)),
          (n = $('<td>')
            .appendTo(o)
            .css({ 'vertical-align': 'top', width: '50%' })),
          (a = $('<td>')
            .appendTo(o)
            .css({ 'vertical-align': 'top', width: '50%' })),
          (l = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).appendTo(n)),
          (p = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).appendTo(a)),
          (d = this.addColorPickerRow(l, $.t('Source back color'))),
          (h = this.addColorPickerRow(l, $.t('Source text color'))),
          (c = this.addColorPickerRow(l, $.t('Source border color'))),
          (u = this.addColorPickerRow(l, $.t('Success back color'))),
          (b = this.addColorPickerRow(l, $.t('Success text color'))),
          (y = this.addColorPickerRow(p, $.t('Target back color'))),
          (g = this.addColorPickerRow(p, $.t('Target text color'))),
          (C = this.addColorPickerRow(p, $.t('Target border color'))),
          (_ = this.addColorPickerRow(p, $.t('Failure back color'))),
          (m = this.addColorPickerRow(p, $.t('Failure text color'))),
          this.bindControl(
            new s(
              e,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Forecast Line Color'
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Forecast Line Width'
            )
          ),
          this.bindControl(
            new s(
              e,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Forecast Line Color'
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Forecast Line Width'
            )
          ),
          this.bindControl(
            new s(
              d,
              this._linetool.properties().sourceBackColor,
              !0,
              this.model(),
              'Forecast Source Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new s(
              c,
              this._linetool.properties().sourceStrokeColor,
              !0,
              this.model(),
              'Forecast Source Border Color'
            )
          ),
          this.bindControl(
            new s(
              h,
              this._linetool.properties().sourceTextColor,
              !0,
              this.model(),
              'Forecast Source Text Color'
            )
          ),
          this.bindControl(
            new s(
              y,
              this._linetool.properties().targetBackColor,
              !0,
              this.model(),
              'Forecast Target Background Color'
            )
          ),
          this.bindControl(
            new s(
              C,
              this._linetool.properties().targetStrokeColor,
              !0,
              this.model(),
              'Forecast Target Border Color'
            )
          ),
          this.bindControl(
            new s(
              g,
              this._linetool.properties().targetTextColor,
              !0,
              this.model(),
              'Forecast Target Text Color'
            )
          ),
          this.bindControl(
            new s(
              u,
              this._linetool.properties().successBackground,
              !0,
              this.model(),
              'Forecast Success Back Color'
            )
          ),
          this.bindControl(
            new s(
              b,
              this._linetool.properties().successTextColor,
              !0,
              this.model(),
              'Forecast Success Text Color'
            )
          ),
          this.bindControl(
            new s(
              _,
              this._linetool.properties().failureBackground,
              !0,
              this.model(),
              'Forecast Failure Back Color'
            )
          ),
          this.bindControl(
            new s(
              m,
              this._linetool.properties().failureTextColor,
              !0,
              this.model(),
              'Forecast Failure Text Color'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  739: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.ColorBinding;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createColorPicker()),
          (t = this.createFontSizeEditor()),
          (i = this.createColorPicker()),
          (o = this.createColorPicker()),
          (n = this.addLabeledRow(this._table, $.t('Text'))),
          $('<td>')
            .append(e)
            .appendTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          (n = this.addLabeledRow(this._table, $.t('Background'))),
          $('<td>')
            .append(i)
            .appendTo(n),
          (n = this.addLabeledRow(this._table, $.t('Border'))),
          $('<td>')
            .append(o)
            .appendTo(n),
          this.bindControl(
            new r(
              e,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Price Text Color'
            )
          ),
          this.bindControl(
            new s(
              t,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Price Text Font Size'
            )
          ),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new r(
              o,
              this._linetool.properties().borderColor,
              !0,
              this.model(),
              'Change Border Color'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  740: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SliderBinder,
      r = a.ColorBinding;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createColorPicker()),
          (t = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, 'Background')),
          $('<td>')
            .append(e)
            .appendTo(i),
          $('<td>')
            .append(t)
            .appendTo(i),
          (o = this.createLineWidthEditor()),
          (n = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, 'Border')),
          $('<td>')
            .append(n)
            .appendTo(i),
          $('<td>').appendTo(i),
          $('<td>')
            .append(o)
            .appendTo(i),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().trendline.color,
              !0,
              this.model(),
              'Change Projection Line Color'
            )
          ),
          this.bindControl(
            new r(
              e,
              this._linetool.properties().color1,
              !0,
              this.model(),
              'Change Projection Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().color2,
              !0,
              this.model(),
              'Change Projection Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new s(
              o,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Projection Border Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  741: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.ColorBinding,
      r = a.BooleanBinder,
      l = a.SliderBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, 'Border')),
          i.prepend('<td>'),
          $('<td>')
            .append(t)
            .appendTo(i),
          $('<td>')
            .append(e)
            .appendTo(i),
          (o = $('<input type="checkbox" class="visibility-switch">')),
          (n = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, 'Background', o)),
          $('<td>')
            .append(o)
            .prependTo(i),
          $('<td>')
            .append(n)
            .appendTo(i),
          this.bindControl(
            new r(
              o,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Rectangle Filling'
            )
          ),
          this.bindControl(
            new s(
              t,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Rectangle Line Color'
            )
          ),
          this.bindControl(
            new s(
              n,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Rectangle Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new l(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Rectangle Border Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  742: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleStringBinder,
      r = a.SimpleComboBinder,
      l = a.ColorBinding,
      p = a.BooleanBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n = this.createColorPicker(),
          a = this.createColorPicker(),
          d = this.createFontSizeEditor(),
          h = this.createFontEditor(),
          c = this.createTextEditor(350, 200),
          u = this.createColorPicker(),
          b = $('<input type="checkbox" class="visibility-switch">'),
          y = $('<input type="checkbox" class="visibility-switch">'),
          g = $('<input type="checkbox">'),
          C = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          ),
          _ = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          );
        this.bindControl(
          new l(
            n,
            this._linetool.properties().color,
            !0,
            this.model(),
            'Change Text Color'
          )
        ),
          this.bindControl(
            new r(
              d,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new r(
              h,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new s(
              c,
              this._linetool.properties().text,
              null,
              !0,
              this.model(),
              'Change Text'
            )
          ),
          this.bindControl(
            new l(
              u,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Text Background',
              this._linetool.properties().backgroundTransparency
            )
          ),
          this.bindControl(
            new p(
              b,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Text Background Fill'
            )
          ),
          this.bindControl(
            new p(
              y,
              this._linetool.properties().drawBorder,
              !0,
              this.model(),
              'Change Text Border'
            )
          ),
          this.bindControl(
            new l(
              a,
              this._linetool.properties().borderColor,
              !0,
              this.model(),
              'Change Text Border Color'
            )
          ),
          this.bindControl(
            new p(
              g,
              this._linetool.properties().wordWrap,
              !0,
              this.model(),
              'Change Text Wrap'
            )
          ),
          this.bindControl(
            new p(
              C,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new p(
              _,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          (e = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          )),
          (t = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          )),
          (i = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          )),
          (this._table = e.add(i).add(t)),
          $(document.createElement('tr'))
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(n)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(h)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(d)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(C)
            )
            .append($(document.createElement('td')).append(_))
            .appendTo(e),
          $(document.createElement('tr'))
            .append(
              $(document.createElement('td'))
                .attr({ colspan: 5 })
                .append(c)
            )
            .appendTo(e),
          (o = this.addLabeledRow(t, $.t('Text Wrap'), g)),
          $('<td>')
            .append(g)
            .prependTo(o),
          (o = this.addLabeledRow(i, $.t('Background'), b)),
          $('<td>')
            .append(b)
            .prependTo(o),
          $('<td>')
            .append(u)
            .appendTo(o),
          (o = this.addLabeledRow(i, $.t('Border'), y)),
          $('<td>')
            .append(y)
            .prependTo(o),
          $('<td>')
            .append(a)
            .appendTo(o),
          this.loadData(),
          setTimeout(function() {
            c.select(), c.focus();
          }, 20);
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (o.prototype.dialogPosition = function(e, t) {
        var i,
          o,
          n,
          a,
          s,
          r,
          l,
          p = 5,
          d = 0,
          h = this._linetool,
          c = h._model.paneForSource(h),
          u = this._model._chartWidget;
        return (
          $.each(u.paneWidgets(), function(e, t) {
            if (t._state === c) return (d = $(t.canvas).offset().top), !1;
          }),
          e || (e = {}),
          (o = e.left),
          (n = e.top),
          (a = (this._linetool.paneViews() || [])[0]),
          a && (i = a._floatPoints[0]),
          i && ((o = i.x), (n = i.y + d)),
          (s = $(t).outerHeight()),
          (r = $(window).height()),
          (l = h.properties().fontsize.value()),
          (n = n + s + l + p <= r ? n + l + p : n - s - p),
          { top: n, left: o }
        );
      }),
      (e.exports = o);
  },
  743: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.SimpleComboBinder,
      r = a.ColorBinding,
      l = a.SliderBinder,
      p = a.BooleanBinder,
      d = i(830).createLineStyleEditor;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, h, c;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = $('<tbody>').appendTo(this._table)),
          (t = this.createLineWidthEditor()),
          (i = d()),
          (o = this.createColorPicker()),
          (n = this.addLabeledRow(e, $.t('Line'))),
          $('<td>')
            .append(o)
            .appendTo(n),
          $('<td>')
            .append(t)
            .appendTo(n),
          $('<td colspan="3">')
            .append(i.render())
            .appendTo(n),
          this._linetool.properties().fillBackground &&
            ($('<td>').prependTo(n),
            (a = $('<input type="checkbox" class="visibility-switch">')),
            (h = this.createColorPicker()),
            (c = $('<tbody>').appendTo(this._table)),
            (n = $('<tr>').appendTo(c)),
            $('<td>')
              .append(a)
              .appendTo(n),
            $('<td>')
              .append($.t('Background'))
              .appendTo(n),
            $('<td>')
              .append(h)
              .appendTo(n)),
          this.bindControl(
            new r(
              o,
              this._linetool.properties().linecolor,
              !0,
              this.model(),
              'Change Time Cycles Color'
            )
          ),
          this.bindControl(
            new s(
              i,
              this._linetool.properties().linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Time Cycles Line Style'
            )
          ),
          this.bindControl(
            new l(
              t,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Time Cycles Line Width'
            )
          ),
          a &&
            (this.bindControl(
              new p(
                a,
                this._linetool.properties().fillBackground,
                !0,
                this.model(),
                'Change Time Cycles Filling'
              )
            ),
            this.bindControl(
              new r(
                h,
                this._linetool.properties().backgroundColor,
                !0,
                this.model(),
                'Change Time Cycles Background Color',
                this._linetool.properties().transparency
              )
            ));
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  744: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i);
    }
    var n = i(694);
    inherit(o, n), (e.exports = o);
  },
  745: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.FloatBinder,
      r = a.BooleanBinder,
      l = a.SliderBinder,
      p = a.SimpleComboBinder,
      d = a.ColorBinding,
      h = i(829).addColorPicker,
      c = i(830).createLineStyleEditor,
      u = i(835).createTransparencyEditor;
    inherit(o, n),
      (o.prototype.addLevelEditor = function(e, t, i) {
        var o,
          n,
          a,
          u,
          b,
          y,
          g,
          C,
          _,
          m,
          w = $('<tr>');
        w.appendTo(this._table),
          (o = $('<td>')),
          o.appendTo(w),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          n.appendTo(o),
          e
            ? ((a = $('<td>')),
              a.appendTo(w),
              (u = $("<input type='text'>")),
              u.appendTo(a),
              u.css('width', '70px'),
              this.bindControl(
                new s(
                  u,
                  t.coeff,
                  !1,
                  this.model(),
                  'Change Pitchfork Line Coeff'
                )
              ))
            : this.createLabeledCell($.t('Trend Line'), n).appendTo(w),
          (b = $("<td class='colorpicker-cell'>")),
          b.appendTo(w),
          (y = h(b)),
          (g = $('<td>')),
          g.appendTo(w),
          (C = this.createLineWidthEditor()),
          C.appendTo(g),
          (_ = $('<td>')),
          _.appendTo(w),
          (m = c()),
          m.render().appendTo(_),
          this.bindControl(
            new r(
              n,
              t.visible,
              !0,
              this.model(),
              'Change Pitchfork Line Visibility'
            )
          ),
          this.bindControl(
            new d(
              y,
              t.color,
              !0,
              this.model(),
              'Change Pitchfork Line Color',
              0
            )
          ),
          this.bindControl(
            new p(
              m,
              t.linestyle,
              parseInt,
              !0,
              this.model(),
              'Change Pitchfork Line Style'
            )
          ),
          this.bindControl(
            new l(
              C,
              t.linewidth,
              parseInt,
              this.model(),
              'Change Pitchfork Line Width'
            )
          );
      }),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, s, d, h, c, b;
        for (
          this._table = $(document.createElement('table')),
            this._table.addClass('property-page'),
            this._table.attr('cellspacing', '0'),
            this._table.attr('cellpadding', '2'),
            this.addLevelEditor(
              null,
              this._linetool.properties().trendline,
              !1
            ),
            e = 1;
          e <= 11;
          e++
        )
          (t = 'level' + e),
            this.addLevelEditor(
              $.t('Level {0}').format(e),
              this._linetool.properties()[t],
              !1
            );
        this.addOneColorPropertyWidget(this._table),
          (i = $(
            '<table class="property-page property-page-unpadded" cellspacing="0" cellpadding="0">'
          ).css({ width: '100%' })),
          (o = $('<tr>').appendTo(i)),
          $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).appendTo(
            $('<td>')
              .css({ width: '50%' })
              .appendTo(o)
          ),
          $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).appendTo(
            $('<td>')
              .css({ width: '50%' })
              .appendTo(o)
          ),
          (n = $("<input type='checkbox' class='visibility-switch'>")),
          (a = this.addLabeledRow(this._table, $.t('Show Labels'), n)),
          $('<td>')
            .append(n)
            .prependTo(a),
          (s = $("<table cellspacing='0' cellpadding='0'>")),
          (d = $(
            "<select><option value='left'>" +
              $.t('left') +
              "</option><option value='center'>" +
              $.t('center') +
              "</option><option value='right'>" +
              $.t('right') +
              '</option></select>'
          )),
          (h = $(
            "<select><option value='top'>" +
              $.t('top') +
              "</option><option value='middle'>" +
              $.t('middle') +
              "</option><option value='bottom'>" +
              $.t('bottom') +
              '</option></select>'
          )),
          (a = $('<tr>')),
          a
            .append('<td>' + $.t('Labels') + '</td>')
            .append(d)
            .append('<td>&nbsp</td>')
            .append(h),
          a.appendTo(s),
          (a = $('<tr>')),
          $("<td colspan='5'>")
            .append(s)
            .appendTo(a),
          a.appendTo(this._table),
          this.bindControl(
            new p(
              d,
              this._linetool.properties().horzLabelsAlign,
              null,
              !0,
              this.model(),
              'Change Trend-Based Fib Time Labels Alignment'
            )
          ),
          this.bindControl(
            new p(
              h,
              this._linetool.properties().vertLabelsAlign,
              null,
              !0,
              this.model(),
              'Change Trend-Based Fib Time Labels Alignment'
            )
          ),
          (a = $('<tr>')),
          a.appendTo(this._table),
          (c = $("<input type='checkbox' class='visibility-switch'>")),
          $('<td>')
            .append(c)
            .appendTo(a),
          this.createLabeledCell($.t('Background'), c).appendTo(a),
          (b = u()),
          $('<td colspan="3">')
            .append(b)
            .appendTo(a),
          this.bindControl(
            new r(
              c,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Fib Retracement Background Visibility'
            )
          ),
          this.bindControl(
            new l(
              b,
              this._linetool.properties().transparency,
              !0,
              this.model(),
              'Change Fib Retracement Background Transparency'
            )
          ),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().showCoeffs,
              !0,
              this.model(),
              'Change Fib Retracement Extend Lines'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  746: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.SliderBinder,
      p = a.SimpleComboBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n, a, d, h, c, u, b;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = this.createColorPicker()),
          (i = this.createColorPicker()),
          (o = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-bold"></span></span>'
          )),
          (n = $(
            '<span class="_tv-button _tv-button-fontstyle"><span class="icon-fontstyle-italic"></span></span>'
          )),
          (a = this.createFontSizeEditor()),
          (d = this.createFontEditor()),
          (h = this.addLabeledRow(this._table, 'Border')),
          h.prepend('<td>'),
          $('<td>')
            .append(t)
            .appendTo(h),
          $('<td>')
            .append(e)
            .appendTo(h),
          (c = $('<input type="checkbox" class="visibility-switch">')),
          (u = this.createColorPicker()),
          (d = this.createFontEditor()),
          (h = this.addLabeledRow(this._table, 'Background', c)),
          $('<td>')
            .append(c)
            .prependTo(h),
          $('<td>')
            .append(u)
            .appendTo(h),
          this.bindControl(
            new s(
              c,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Pattern Filling'
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Pattern Line Color'
            )
          ),
          this.bindControl(
            new r(
              i,
              this._linetool.properties().textcolor,
              !0,
              this.model(),
              'Change Pattern Text Color'
            )
          ),
          this.bindControl(
            new r(
              u,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Pattern Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new l(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Pattern Border Width'
            )
          ),
          this.bindControl(
            new p(
              a,
              this._linetool.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Text Font Size'
            )
          ),
          this.bindControl(
            new p(
              d,
              this._linetool.properties().font,
              null,
              !0,
              this.model(),
              'Change Text Font'
            )
          ),
          this.bindControl(
            new s(
              o,
              this._linetool.properties().bold,
              !0,
              this.model(),
              'Change Text Font Bold'
            )
          ),
          this.bindControl(
            new s(
              n,
              this._linetool.properties().italic,
              !0,
              this.model(),
              'Change Text Font Italic'
            )
          ),
          (b = $(
            '<table class="property-page" cellspacing="0" cellpadding="2"><tr>'
          )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(i)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(d)
            )
            .append(
              $(document.createElement('td'))
                .attr({ width: 1 })
                .append(a)
            )
            .append(
              $(document.createElement('td'))
                .css('vertical-align', 'top')
                .attr({ width: 1 })
                .append(o)
            )
            .append(
              $(document.createElement('td'))
                .css('vertical-align', 'top')
                .append(n)
            )
            .append($('</tr></table>'))),
          (h = this.addLabeledRow(this._table, '')),
          $('<td colspan="5">')
            .append(b)
            .appendTo(h),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  747: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(825),
      a = i(823),
      s = a.BooleanBinder,
      r = a.ColorBinding,
      l = a.SliderBinder;
    inherit(o, n),
      (o.prototype.prepareLayout = function() {
        var e, t, i, o, n;
        (this._table = $(document.createElement('table'))),
          this._table.addClass('property-page'),
          this._table.attr('cellspacing', '0'),
          this._table.attr('cellpadding', '2'),
          (e = this.createLineWidthEditor()),
          (t = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, $.t('Border'))),
          i.prepend('<td>'),
          $('<td>')
            .append(t)
            .appendTo(i),
          $('<td>')
            .append(e)
            .appendTo(i),
          (o = $('<input type="checkbox" class="visibility-switch">')),
          (n = this.createColorPicker()),
          (i = this.addLabeledRow(this._table, $.t('Background'), o)),
          $('<td>')
            .append(o)
            .prependTo(i),
          $('<td>')
            .append(n)
            .appendTo(i),
          this.bindControl(
            new s(
              o,
              this._linetool.properties().fillBackground,
              !0,
              this.model(),
              'Change Triangle Filling'
            )
          ),
          this.bindControl(
            new r(
              t,
              this._linetool.properties().color,
              !0,
              this.model(),
              'Change Triangle Line Color'
            )
          ),
          this.bindControl(
            new r(
              n,
              this._linetool.properties().backgroundColor,
              !0,
              this.model(),
              'Change Triangle Background Color',
              this._linetool.properties().transparency
            )
          ),
          this.bindControl(
            new l(
              e,
              this._linetool.properties().linewidth,
              !0,
              this.model(),
              'Change Triangle Border Width'
            )
          ),
          this.loadData();
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  748: function(e, t, i) {
    'use strict';
    (function(t) {
      function o(e, t, i) {
        a.call(this, e, t), (this._linetool = i), this.prepareLayout();
      }
      var n = i(823),
        a = n.PropertyPage,
        s = n.BooleanBinder,
        r = n.RangeBinder,
        l = i(38).IS_RTL;
      inherit(o, a),
        (o.prototype.prepareLayout = function() {
          var e, i, o, n, a, p, d, h, c, u, b, y, g;
          (this._block = $('<table class="property-page">')),
            (e = this._linetool.properties().intervalsVisibilities),
            t.enabled('seconds_resolution') &&
              ((i = $('<tr>').appendTo(this._block)),
              (o = $('<label>').append($.t('Seconds'))),
              (n = $("<input type='checkbox'>")
                .addClass('visibility-checker')
                .prependTo(o)),
              $('<td>')
                .css('padding-right', '15px')
                .append(o)
                .appendTo(i),
              (a = $("<input type='text'>").addClass('ticker-text')),
              $('<td>')
                .append(a)
                .appendTo(i),
              (p = $('<div>')
                .addClass('slider-range ui-slider-horizontal')
                .slider()),
              $('<td>')
                .append(p)
                .appendTo(i),
              (d = $("<input type='text'>").addClass('ticker-text')),
              $('<td>')
                .append(d)
                .appendTo(i),
              this.bindControl(
                new s(
                  n,
                  e.seconds,
                  !0,
                  this.model(),
                  'Change Line Tool Visibility On Seconds'
                )
              ),
              this.bindControl(
                new r(
                  p,
                  [e.secondsFrom, e.secondsTo],
                  [1, 59],
                  !1,
                  this.model(),
                  [a, d],
                  [$.t('Change Seconds From'), $.t('Change Seconds To')],
                  n
                )
              )),
            (i = $('<tr>').appendTo(this._block)),
            (o = $('<label>').append($.t('Minutes'))),
            (h = $("<input type='checkbox'>")
              .addClass('visibility-checker')
              .prependTo(o)),
            (c = l ? 'padding-left' : 'padding-right'),
            $('<td>')
              .css(c, '15px')
              .append(o)
              .appendTo(i),
            (a = $("<input type='text'>").addClass('ticker-text')),
            $('<td>')
              .append(a)
              .appendTo(i),
            (p = $('<div>')
              .addClass('slider-range ui-slider-horizontal')
              .slider()),
            $('<td>')
              .append(p)
              .appendTo(i),
            (d = $("<input type='text'>").addClass('ticker-text')),
            $('<td>')
              .append(d)
              .appendTo(i),
            this.bindControl(
              new s(
                h,
                e.minutes,
                !0,
                this.model(),
                'Change Line Tool Visibility On Minutes'
              )
            ),
            this.bindControl(
              new r(
                p,
                [e.minutesFrom, e.minutesTo],
                [1, 59],
                !1,
                this.model(),
                [a, d],
                [$.t('Change Minutes From'), $.t('Change Minutes To')],
                h
              )
            ),
            (i = $('<tr>').appendTo(this._block)),
            (o = $('<label>').append($.t('Hours'))),
            (u = $("<input type='checkbox'>")
              .addClass('visibility-checker')
              .prependTo(o)),
            $('<td>')
              .append(o)
              .appendTo(i),
            (a = $("<input type='text'>").addClass('ticker-text')),
            $('<td>')
              .append(a)
              .appendTo(i),
            (p = $('<div>')
              .addClass('slider-range ui-slider-horizontal')
              .slider()),
            $('<td>')
              .append(p)
              .appendTo(i),
            (d = $("<input type='text'>").addClass('ticker-text')),
            $('<td>')
              .append(d)
              .appendTo(i),
            this.bindControl(
              new s(
                u,
                e.hours,
                !0,
                this.model(),
                'Change Line Tool Visibility On Hours'
              )
            ),
            this.bindControl(
              new r(
                p,
                [e.hoursFrom, e.hoursTo],
                [1, 24],
                !1,
                this.model(),
                [a, d],
                [$.t('Change Minutes From'), $.t('Change Hours To')],
                u
              )
            ),
            (i = $('<tr>').appendTo(this._block)),
            (o = $('<label>').append($.t('Days'))),
            (b = $("<input type='checkbox'>")
              .addClass('visibility-checker')
              .prependTo(o)),
            $('<td>')
              .append(o)
              .appendTo(i),
            (a = $("<input type='text'>").addClass('ticker-text')),
            $('<td>')
              .append(a)
              .appendTo(i),
            (p = $('<div>')
              .addClass('slider-range ui-slider-horizontal')
              .slider()),
            $('<td>')
              .append(p)
              .appendTo(i),
            (d = $("<input type='text'>").addClass('ticker-text')),
            $('<td>')
              .append(d)
              .appendTo(i),
            this.bindControl(
              new s(
                b,
                e.days,
                !0,
                this.model(),
                'Change Line Tool Visibility On Days'
              )
            ),
            this.bindControl(
              new r(
                p,
                [e.daysFrom, e.daysTo],
                [1, 366],
                !1,
                this.model(),
                [a, d],
                [$.t('Change Minutes From'), $.t('Change Days To')],
                b
              )
            ),
            (i = $('<tr>')
              .css('height', '29px')
              .appendTo(this._block)),
            (o = $('<label>').append($.t('Weeks'))),
            (y = $("<input type='checkbox'>").prependTo(o)),
            $('<td>')
              .append(o)
              .appendTo(i),
            this.bindControl(
              new s(
                y,
                e.weeks,
                !0,
                this.model(),
                'Change Line Tool Visibility On Weeks'
              )
            ),
            (i = $('<tr>')
              .css('height', '29px')
              .appendTo(this._block)),
            (o = $('<label>').append($.t('Months'))),
            (g = $("<input type='checkbox'>").prependTo(o)),
            $('<td>')
              .append(o)
              .appendTo(i),
            this.bindControl(
              new s(
                g,
                e.months,
                !0,
                this.model(),
                'Change Line Tool Visibility On Months'
              )
            ),
            this.loadData();
        }),
        (o.prototype.widget = function() {
          return this._block;
        }),
        (e.exports = o);
    }.call(t, i(5)));
  },
  749: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      a.call(this, e, t, i), this.prepareLayout();
    }
    var n = i(692),
      a = n.StudyInputsPropertyPage;
    inherit(o, a),
      (o.prototype.prepareControl = function(e, t, i) {
        if ('source' === e.id) {
          var o = this.createKeyCombo({
            open: $.t('Open'),
            high: $.t('High'),
            low: $.t('Low'),
            close: $.t('Close'),
          });
          return (
            o.appendTo(t),
            { valueEditor: o, valueSetter: null, propertyChangedHook: null }
          );
        }
        return a.prototype.prepareControl.call(this, e, t, i);
      }),
      (o.prototype._sortInputs = function(e) {
        var t = e.filter(function(e) {
            return 'symbol' === e.id;
          }),
          i = e.filter(function(e) {
            return 'symbol' !== e.id;
          });
        return t.concat(i);
      }),
      (e.exports = o);
  },
  750: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      n.call(this, e, t), (this._linetool = i), this.prepareLayout();
    }
    var n = i(823).PropertyPage,
      a = i(692).StudyInputsPropertyPage,
      s = i(691),
      r = i(26),
      l = i(874);
    inherit(o, s),
      (o.prototype.prepareLayoutImpl = a.prototype.prepareLayoutImpl),
      (o.prototype.prepareControl = a.prototype.prepareControl),
      (o.prototype._symbolInfoBySymbolProperty =
        a.prototype._symbolInfoBySymbolProperty),
      (o.prototype._sortInputs = a.prototype._sortInputs),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          s,
          p,
          d,
          h = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ),
          c = $(
            '<table class="property-page" cellspacing="0" cellpadding="0">'
          ).data({
            'layout-tab': l.TabNames.inputs,
            'layout-tab-priority': l.TabPriority.Inputs,
          });
        for (
          this._table = h.add(c), e = this._linetool.points(), t = 0;
          t < e.length;
          t++
        )
          (i = $('<tr>')),
            i.appendTo(h),
            (o = $('<td>')),
            o.html('Point ' + (t + 1) + ' Bar #'),
            o.appendTo(i),
            (n = $('<td>')),
            n.appendTo(i),
            (s = $("<input type='text'>")),
            s.appendTo(n),
            s.addClass('ticker'),
            (p = this._linetool.properties().points[t]),
            this.bindBarIndex(
              p.bar,
              s,
              this.model(),
              'Change ' + this._linetool + ' point bar index'
            );
        (d = r.findStudyMetaInfo(
          this._model.studiesMetaData(),
          this._linetool.studyId()
        )),
          a.prototype.prepareLayoutImpl.call(this, d, c);
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  751: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      s.call(this, e, t), (this._study = i), this.prepareLayout();
    }
    var n = i(1031),
      a = i(823),
      s = a.PropertyPage,
      r = a.BooleanBinder,
      l = a.SimpleComboBinder,
      p = i(320).StudyStylesPropertyPage,
      d = i(40);
    inherit(o, s),
      inherit(o, n),
      (o.prototype._isJapaneseChartsAvailable = function() {
        return !1;
      }),
      (o.prototype._isShowStyleSwitcher = function() {
        return !0;
      }),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          ),
          a = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          ),
          s = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          ),
          d = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          ),
          h = $(
            '<table class="property-page" cellspacing="0" cellpadding="2">'
          ),
          c = this._study.properties();
        this._prepareSeriesStyleLayout(n, a, s, c),
          (this._table = n
            .add(a)
            .add(s)
            .add(d)
            .add(h)),
          (e = $('<input type="checkbox">')),
          (t = this.addLabeledRow(d, 'Price Line', e)),
          $('<td>')
            .append(e)
            .prependTo(t),
          this.bindControl(
            new r(
              e,
              c.showPriceLine,
              !0,
              this.model(),
              'Change Price Price Line'
            )
          ),
          (i = this.createSeriesMinTickEditor()),
          (o = $('<tr>')),
          o.appendTo(h),
          $('<td>' + $.t('Override Min Tick') + '</td>').appendTo(o),
          $('<td>')
            .append(i)
            .appendTo(o),
          this.bindControl(
            new l(i, c.minTick, null, !0, this.model(), 'Change MinTick')
          ),
          p.prototype._putStudyDefaultStyles.call(this, h);
      }),
      (o.prototype.loadData = function() {
        this.superclass.prototype.loadData.call(this), this.switchStyle();
      }),
      (o.prototype.switchStyle = function() {
        switch (
          ($(this._barsTbody)
            .add(this._barsColorerTbody)
            .add(this._candlesTbody)
            .add(this._candlesColorerTbody)
            .add(this._hollowCandlesTbody)
            .add(this._lineTbody)
            .add(this._areaTbody)
            .add(this._baselineTbody)
            .css('display', 'none'),
          this._study.properties().style.value())
        ) {
          case d.STYLE_BARS:
            this._barsTbody.css('display', 'table-row-group'),
              this._barsColorerTbody.css('display', 'table-row-group');
            break;
          case d.STYLE_CANDLES:
            this._candlesTbody.css('display', 'table-row-group'),
              this._candlesColorerTbody.css('display', 'table-row-group');
            break;
          case d.STYLE_HOLLOW_CANDLES:
            this._hollowCandlesTbody.css('display', 'table-row-group');
            break;
          case d.STYLE_LINE:
            this._lineTbody.css('display', 'table-row-group');
            break;
          case d.STYLE_AREA:
            this._areaTbody.css('display', 'table-row-group');
            break;
          case d.STYLE_BASELINE:
            this._baselineTbody.css('display', 'table-row-group');
        }
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  752: function(e, t, i) {
    'use strict';
    function o(e, t, i) {
      a.call(this, e, t), (this._study = i), this.prepareLayout();
    }
    var n = i(823),
      a = n.PropertyPage,
      s = n.SimpleComboBinder,
      r = n.BooleanBinder,
      l = n.SliderBinder,
      p = n.ColorBinding,
      d = i(320).StudyStylesPropertyPage;
    inherit(o, a),
      (o.prototype.prepareLayout = function() {
        var e,
          t,
          i,
          o,
          n,
          a,
          h,
          c,
          u,
          b,
          y,
          g = this;
        (this._table = $(
          '<table class="property-page" cellspacing="0" cellpadding="2">'
        )),
          (e = this.createFontSizeEditor()),
          (t = this.createFontEditor()),
          (i = $("<input type='checkbox' class='visibility-switch'/>")),
          (o = this.createTableInTable(this._table)),
          (n = this.addLabeledRow(o, 'Labels Font')),
          $('<td>')
            .append(t)
            .appendTo(n),
          $('<td>')
            .append(e)
            .appendTo(n),
          (a = this.createTableInTable(this._table)),
          (n = this.addLabeledRow(a, 'Show Labels')),
          $('<td>')
            .append(i)
            .prependTo(n),
          (this.pivotTypes = {
            Traditional: {
              'S5/R5': !0,
              'S4/R4': !0,
              'S3/R3': !0,
              'S2/R2': !0,
              'S1/R1': !0,
              P: !0,
            },
            Fibonacci: { 'S3/R3': !0, 'S2/R2': !0, 'S1/R1': !0, P: !0 },
            Woodie: {
              'S4/R4': !0,
              'S3/R3': !0,
              'S2/R2': !0,
              'S1/R1': !0,
              P: !0,
            },
            Classic: {
              'S4/R4': !0,
              'S3/R3': !0,
              'S2/R2': !0,
              'S1/R1': !0,
              P: !0,
            },
            DM: { 'S1/R1': !0, P: !0 },
            DeMark: { 'S1/R1': !0, P: !0 },
            Camarilla: {
              'S4/R4': !0,
              'S3/R3': !0,
              'S2/R2': !0,
              'S1/R1': !0,
              P: !0,
            },
          }),
          this.bindControl(
            new s(
              t,
              this._study.properties().font,
              null,
              !0,
              this.model(),
              'Change Pivots Font'
            )
          ),
          this.bindControl(
            new s(
              e,
              this._study.properties().fontsize,
              parseInt,
              !0,
              this.model(),
              'Change Pivots Font Size'
            )
          ),
          this.bindControl(
            new r(
              i,
              this._property.levelsStyle.showLabels,
              !0,
              g.model(),
              'Show Pivot Labels'
            )
          ),
          (h = this._property.levelsStyle.visibility),
          (c = this._property.levelsStyle.colors),
          (u = this._property.levelsStyle.widths),
          (g._rows = []),
          (b = function(e, t, i, o) {
            var n, a, s, r, l;
            for (n = 0; n < e._childs.length; n++)
              (a = e._childs[n]),
                (s = e[a]),
                (r = t[a]),
                (l = i[a]),
                o(s, r, l, a);
          }),
          b(h, c, u, function(e, t, i, o) {
            var n,
              s,
              d,
              h = $("<input type='checkbox' class='visibility-switch'/>");
            g.bindControl(new r(h, e, !0, g.model(), 'Change ' + o)),
              (n = g.addLabeledRow(a, o, h)),
              $('<td>')
                .append(h)
                .prependTo(n),
              (s = g.createColorPicker()),
              $('<td>')
                .append(s)
                .appendTo(n),
              g.bindControl(
                new p(s, t, !0, g.model(), 'Change ' + o + ' color')
              ),
              (d = g.createLineWidthEditor()),
              $('<td>')
                .append(d)
                .appendTo(n),
              g.bindControl(
                new l(d, i, !0, g.model(), 'Change ' + o + ' width')
              ),
              g._rows.push({ row: n, label: o, visibilityEditor: h });
          }),
          (y = g._study._properties.inputs.kind),
          g.lockNotUsedVisEditors(y.value()),
          y.subscribe(g, function(e) {
            g.lockNotUsedVisEditors(e.value());
          }),
          d.prototype._putStudyDefaultStyles.call(this, this._table, 3);
      }),
      (o.prototype.lockNotUsedVisEditors = function(e) {
        var t,
          i,
          o,
          n,
          a = this;
        for (t = 0; t < a._rows.length; t++)
          (i = a._rows[t]),
            (o = i.label),
            (n = a.pivotTypes[e][o]),
            i.visibilityEditor.prop('disabled', !n),
            i.row.css('opacity', n ? 1 : 0.5);
      }),
      (o.prototype.widget = function() {
        return this._table;
      }),
      (e.exports = o);
  },
  823: function(e, t, i) {
    'use strict';
    (function(e) {
      function o(e, t) {
        return '<label for="' + t + '">' + e + '</label>';
      }
      function n(e, t) {
        (this._model = t),
          (this._bindings = []),
          (this._property = e),
          (this.supportThemeSwitcher = !1);
      }
      function a(e) {
        return e.toUpperCase();
      }
      function s(e) {
        return function(t) {
          return t < e ? e : t;
        };
      }
      function r(e) {
        return function(t) {
          return t > e ? e : t;
        };
      }
      function l(e) {
        return function(t) {
          var i = parseInt(t, 10);
          return I(i) ? e : i;
        };
      }
      function p(e) {
        var t = new O();
        return function(i) {
          var o = t.parse(i);
          return I(o) ? e : o;
        };
      }
      function d(e) {
        var t = new O();
        return function(i) {
          var o = t.parse(i);
          return I(o) ? e() : o;
        };
      }
      function h(e, t) {
        var i = new z(t);
        return function(t) {
          var o = i.format(t);
          return I(o) ? e : o;
        };
      }
      function c() {
        return function(e) {
          for (
            var t = e, i = e.replace(/[^\u0000-\u007F]/, '');
            i.length !== t.length;

          )
            (t = i), (i = t.replace(/[^\u0000-\u007F]/, ''));
          return i;
        };
      }
      function u(e) {
        return function(t) {
          return 0 === t.length ? e : t;
        };
      }
      function b(e, t) {
        return function(i) {
          var o = e();
          return i === t.value() && o && (o.ticker || o.full_name)
            ? o.ticker || o.full_name
            : i;
        };
      }
      function y(e, t, i, o, n, a, s) {
        G.call(this, e, t, o, n, a),
          (this._transformFunction = i),
          (this._setter = s),
          this._attachToControl(e, o);
      }
      function g(e, t, i, o, n) {
        y.call(this, e, t, p(t.value()), i, o, n),
          this.addFormatter(function(e) {
            return new O().format(e);
          });
      }
      function C(e, t, i, o, n, a) {
        (this._subControlIds = t),
          G.call(this, e, i, o, n, a),
          this._forEachSubControl(function(e) {
            this._attachToControl(e, o);
          });
      }
      function _(e, t, i, o, n, a, s) {
        (this._model = o),
          (this._mainSeries = a),
          (this._toIntTransformer = l(s)),
          (this._disabled = !1),
          G.call(this, e, t, i, o, n);
        var r = this;
        i &&
          e.change(function() {
            r.setValueToProperty(r.value());
          }),
          this._mainSeries
            .dataEvents()
            .barReceived()
            .subscribe(this, function() {
              r.setValue(this.property().value());
            });
      }
      function m(e, t, i, o, n, a, s) {
        G.call(this, e, t, i, o, n),
          (this._transform = a),
          i &&
            e.on(
              'accept-symbol',
              function(e, t) {
                this.setValueToProperty(t), this.setValue(t);
              }.bind(this)
            ),
          s &&
            (s.subscribe(this, this._updateDisplayedSymbol),
            (this._updateDelegate = s));
      }
      function w(e, t, i, o, n, a, s, r) {
        G.call(this, e, t, o, n, a),
          (this._transformFunction = i),
          (this._propertyChangedHook = r),
          (this._setter = s);
        var l = this;
        o &&
          e.change(function() {
            l._setter
              ? l._setter.call(l, l.value())
              : l.setValueToProperty(l.value());
          });
      }
      function T(e, t) {
        G.call(this, e, t);
      }
      function f(e, t, i, o, n, a) {
        if (!e.is(':checkbox, :radio')) return new L(e, t, i, o, n);
        G.call(this, e, t, i, o, n), (this._setter = a);
        var s = this;
        i &&
          e.change(function() {
            s._setter
              ? s._setter.call(s, s.value())
              : s.setValueToProperty(s.value());
          });
      }
      function v(e, t, i, o, n, a) {
        G.call(this, e, t, i, o, n), (this._inverted = !0 === a);
      }
      function L(e, t, i, o, n) {
        G.call(this, e, t, i, o, n);
        var a = this;
        i &&
          e.click(function() {
            var e = $(this)
              .toggleClass('active')
              .hasClass('active');
            a.setValueToProperty(e);
          });
      }
      function k(e, t, i, o, n, a) {
        var s, r;
        (s = e.is('input') ? e : e.find('input')),
          G.call(this, s, t, i, o, n),
          (this._transparencyProperty = a),
          this.applyOldTransparency(),
          (r = this),
          i &&
            s.change(function() {
              r.setValueToProperty(r.value());
            });
      }
      function S(t, i, o, n, a, s) {
        function r(e, t) {
          var i = p.control().slider('option', 'min'),
            o = p.control().slider('option', 'max'),
            n = p._property.value();
          ((i <= n && n <= o) || (i < t.value && t.value < o)) &&
            p.setValueToProperty(t.value);
        }
        function l(e, t) {
          p.setValueToProperty(t.value);
        }
        isNumber(i.value()) ||
          (j.logWarn(
            'Property cannot be binded to control, bad value (expect number): ' +
              i.value()
          ),
          (i = new e())),
          G.call(this, t, i, o, n, a);
        var p = this;
        o &&
          (s
            ? (t.bind('slidechange', r), t.bind('slide', r))
            : (t.bind('slidechange', l), t.bind('slide', l))),
          t.bind('slidestart', function(e, t) {
            n.beginUndoMacro(a);
          }),
          t.bind('slidestop', function(e, t) {
            n.endUndoMacro();
          });
      }
      function x(e, t, i, o, n, a) {
        f.call(this, e, t, o, n, a),
          (this._intervalProperty = i),
          this._intervalProperty
            .listeners()
            .subscribe(this, this.onIntervalChanged),
          this.onIntervalChanged();
      }
      function P(e, t, i, o, n) {
        (this._control = e),
          (this._wv = t),
          (this._transformFunction = i),
          (this._undoModel = o),
          (this._undoText = n),
          this._attachToControl(this._control),
          (this._setValueBinded = this.setValue.bind(this));
      }
      function B(e, t, i, o, n, a) {
        (this._not = !!a), P.apply(this, arguments);
      }
      function E(e, t, i, o, n, a, s, r) {
        (this._propFrom = t[0]),
          (this._propTo = t[1]),
          (this._control = e),
          (this._applyOnFly = o),
          (this._undoModel = n),
          (this._undoText = s),
          (this._properties = t),
          (this._inputsText = a),
          (this._transformers = i);
        var l = this;
        e.slider({
          range: !0,
          min: i[0],
          max: i[1],
          values: [l._propFrom.value(), l._propTo.value()],
        }),
          (this.$rangeHandleFrom = $(e.find('.ui-slider-handle')[0]).addClass(
            'from'
          )),
          (this.$rangeHandleTo = $(e.find('.ui-slider-handle')[1]).addClass(
            'to'
          )),
          this.setValue(this._propFrom, 0),
          this.setValue(this._propTo, 1),
          r &&
            ($(r).on('change', function(e) {
              $(this).is(':checked')
                ? (l._control.slider('enable'),
                  $(l._inputsText[0]).prop('disabled', !1),
                  $(l._inputsText[1]).prop('disabled', !1))
                : (l._control.slider('disable'),
                  $(l._inputsText[0]).prop('disabled', !0),
                  $(l._inputsText[1]).prop('disabled', !0));
            }),
            $(r).is(':checked')
              ? (l._control.slider('enable'),
                $(l._inputsText[0]).prop('disabled', !1),
                $(l._inputsText[1]).prop('disabled', !1))
              : (l._control.slider('disable'),
                $(l._inputsText[0]).prop('disabled', !0),
                $(l._inputsText[1]).prop('disabled', !0))),
          a &&
            ($(a[0]).val(this._control.slider('values', 0)),
            $(a[1]).val(this._control.slider('values', 1)),
            e.slider({
              slide: function(e, t) {
                $(a[0]).val(t.values[0]), $(a[1]).val(t.values[1]);
              },
            }),
            $(a).each(function() {
              $(this).on('keydown', function(e) {
                parseInt($(a[0]).val()) < l._transformers[0]
                  ? $(a[0]).val(l._transformers[0])
                  : parseInt($(a[1]).val()) > l._transformers[1] &&
                    $(a[1]).val(l._transformers[1]),
                  -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) ||
                    (65 === e.keyCode && !0 === e.ctrlKey) ||
                    (67 === e.keyCode && !0 === e.ctrlKey) ||
                    (88 === e.keyCode && !0 === e.ctrlKey) ||
                    (e.keyCode >= 35 && e.keyCode <= 39) ||
                    ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
                      (e.keyCode < 96 || e.keyCode > 105) &&
                      e.preventDefault());
              });
            }),
            $(a[0]).on('keyup', function(e) {
              parseInt($(this).val()) < l._transformers[0]
                ? $(this).val(l._transformers[0])
                : parseInt($(this).val()) > l._transformers[1] &&
                  $(this).val(l._transformers[1]),
                parseInt($(this).val()) > parseInt($(a[1]).val()) &&
                  $(this).val(a[1].val()),
                l._control.slider('values', 0, $(this).val()),
                E.prototype.setValueToProperty.call(
                  l,
                  l._control.slider('values'),
                  'from'
                );
            }),
            $(a[1]).on('keyup', function(e) {
              parseInt($(this).val()) < l._transformers[0]
                ? $(this).val(l._transformers[0])
                : parseInt($(this).val()) > l._transformers[1] &&
                  $(this).val(l._transformers[1]),
                parseInt($(this).val()) < $(a[0]).val() &&
                  $(this).val(a[0].val()),
                l._control.slider('values', 1, $(this).val()),
                E.prototype.setValueToProperty.call(
                  l,
                  l._control.slider('values'),
                  'to'
                );
            })),
          this._propFrom
            .listeners()
            .subscribe(this, E.prototype.propertyChanged),
          this._propTo.listeners().subscribe(this, E.prototype.propertyChanged),
          o &&
            e.on('slide', function(e, t) {
              l.setValueToProperty(l._control.slider('values'), t.handle);
            }),
          e.slider({
            stop: function(e, t) {
              a &&
                ($(a[0]).val(l._control.slider('values', 0)),
                $(a[1]).val(l._control.slider('values', 1))),
                l.setValueToProperty(l._control.slider('values'), t.handle);
            },
            start: function(e, t) {
              a &&
                ($(a[0]).val(l._control.slider('values', 0)),
                $(a[1]).val(l._control.slider('values', 1))),
                l.setValueToProperty(l._control.slider('values'), t.handle);
            },
          });
      }
      function R(e, t, i, o, n, a) {
        G.call(this, e, t, i, o, n), (this._separator = a || ' ');
        var s = this;
        i &&
          e.change(function() {
            s.setValueToProperty(s.value());
          });
      }
      var F, I, D, V, A, W, M, O, z, H, N, G, j;
      i(866),
        (F = i(7).ensureNotNull),
        (I = i(83).isNaN),
        (D = i(24)),
        (V = D.rgba),
        (A = D.rgbaToString),
        (W = D.parseRgb),
        (M = i(72).TimePointIndexSearchMode),
        (O = i(105).NumericFormatter),
        (z = i(193).LimitedPrecisionNumericFormatter),
        (H = i(29)),
        (N = i(829).addColorPicker),
        (G = i(317).Binding),
        (j = i(4).getLogger('Chart.PropertyPage')),
        (n.prototype.model = function() {
          return this._model;
        }),
        (n.prototype.bindControl = function(e) {
          return this._bindings.push(e), e;
        }),
        (n.prototype.unbindControl = function(e) {
          var t = this._bindings.indexOf(e);
          -1 !== t && this._bindings.splice(t, 1);
        }),
        (n.prototype.loadData = function() {
          var e, t, i;
          for (e = 0; e < this._bindings.length; e++)
            (t = this._bindings[e]),
              t.properties
                ? ((i = t.properties()),
                  t.setValue(i[0], 0),
                  t.setValue(i[1], 1))
                : t.property &&
                  (t.transparencyProperty && t.transparencyProperty()
                    ? t.applyOldTransparency()
                    : t.setValue(t.property().value()));
        }),
        (n.prototype.saveData = function() {
          var e, t;
          for (
            this._model.beginUndoMacro(), e = 0;
            e < this._bindings.length;
            e++
          )
            (t = this._bindings[e]),
              t.changed() && this._model.setProperty(t.property(), t.value());
          this._model.endUndoMacro();
        }),
        (n.prototype.createLineWidthEditor = function() {
          var e = this._model._chartWidget.widget().prop('ownerDocument');
          return $('<div class="linewidth-slider">', e).slider({
            max: 4,
            min: 1,
            step: 1,
          });
        }),
        (n.prototype.createColorPicker = function(e) {
          return N(null, e);
        }),
        (n.prototype.createTextEditor = function(e, t) {
          var i = {};
          return (
            e && (i.width = e),
            t && (i.height = t),
            $(document.createElement('textarea'))
              .css(i)
              .addClass('tv-control-input')
          );
        }),
        (n.prototype.createCombo = function(e) {
          var t = $(document.createElement('select')),
            i = e.reduce(function(e, t) {
              return e.add(
                $(document.createElement('option')).prop({ value: t, text: t })
              );
            }, $());
          return t.append(i);
        }),
        (n.prototype.createKeyCombo = function(e) {
          var t = $(document.createElement('select'));
          return (
            $.each(e || [], function(e, i) {
              $(document.createElement('option'))
                .prop({ value: e, text: i })
                .appendTo(t);
            }),
            t
          );
        }),
        (n.prototype.createFontEditor = function(e) {
          var t =
            e || TradingView.factoryDefaults('chartproperties.editorFontsList');
          return this.createCombo(t);
        }),
        (n.prototype.createFontSizeEditor = function(e) {
          var t = e || [10, 11, 12, 14, 16, 20, 24, 28, 32, 40];
          return this.createCombo(t).addClass('tv-select-container-fontsize');
        }),
        (n.prototype.createSeriesMinTickEditor = function() {
          var e,
            t,
            i,
            o,
            n =
              "<select><option value='default'>" + $.t('Default') + '</option>',
            a = [
              { priceScale: 1, minMove: 1, frac: !1 },
              { priceScale: 10, minMove: 1, frac: !1 },
              { priceScale: 100, minMove: 1, frac: !1 },
              { priceScale: 1e3, minMove: 1, frac: !1 },
              { priceScale: 1e4, minMove: 1, frac: !1 },
              { priceScale: 1e5, minMove: 1, frac: !1 },
              { priceScale: 1e6, minMove: 1, frac: !1 },
              { priceScale: 1e7, minMove: 1, frac: !1 },
              { priceScale: 1e8, minMove: 1, frac: !1 },
              { priceScale: 2, minMove: 1, frac: !0 },
              { priceScale: 4, minMove: 1, frac: !0 },
              { priceScale: 8, minMove: 1, frac: !0 },
              { priceScale: 16, minMove: 1, frac: !0 },
              { priceScale: 32, minMove: 1, frac: !0 },
              { priceScale: 64, minMove: 1, frac: !0 },
              { priceScale: 128, minMove: 1, frac: !0 },
              { priceScale: 320, minMove: 1, frac: !0 },
            ];
          for (e in a)
            (t = a[e]),
              (i = t.priceScale + ',' + t.minMove + ',' + t.frac),
              (o = t.minMove + '/' + t.priceScale),
              (n += "<option value='" + i + "'>" + o + '</option>');
          return (n += '</select>'), $(n);
        }),
        (n.prototype.createPrecisionEditor = function() {
          var e,
            t =
              "<select><option value='default'>" + $.t('Default') + '</option>';
          for (e = 0; e <= 8; e++)
            t += "<option value='" + e + "'>" + e + '</option>';
          return (t += '</select>'), $(t);
        }),
        (n.prototype.createLabeledCell = function(e, t, i) {
          var o,
            n,
            a,
            s,
            r = null;
          return (
            'number' == typeof e.valueOf()
              ? ((r = e), (o = t), (n = i))
              : ((o = e), (n = t)),
            (o += ''),
            (a = this._labelToId(o)),
            (s = $('<td>')),
            $('<label>')
              .html(o.length > 0 ? $.t(o) : '')
              .attr('for', a)
              .appendTo(s),
            r && s.attr('colspan', r),
            n && n.attr('id', a),
            s
          );
        }),
        (n.prototype.createTableInTable = function(e) {
          var t = $('<tr>').appendTo(e),
            i = $('<td>').appendTo(t);
          return $('<table cellpadding="0" cellspacing="0">').appendTo(i);
        }),
        (n.prototype._labelToId = function(e) {
          return (
            'control' +
            e.replace(/(^| )\w/g, function(e) {
              return '-' + e.trim().toLowerCase();
            }) +
            Math.floor(1e3 * Math.random())
          );
        }),
        (n.prototype.addRow = function(e) {
          return $(document.createElement('tr')).appendTo(e);
        }),
        (n.prototype.addLabeledRow = function(e, t, i, n) {
          var a,
            s = t && t.length > 0 ? $.t(t) : '',
            r = $(document.createElement('tr')),
            l = $(document.createElement('td')).html(s);
          return (
            n && ((n = parseInt(n)), I(n) && (n = 2), l.attr('colspan', n)),
            i && ((a = this._labelToId(t)), i.attr('id', a), l.html(o(s, a))),
            r.append(l).appendTo(e)
          );
        }),
        (n.prototype.addEditorRow = function(e, t, i, o) {
          var n = $(document.createElement('td'));
          return (
            (i.row = this.addLabeledRow(e, t, i, o)),
            i.appendTo(n.appendTo(i.row)),
            i
          );
        }),
        (n.prototype.addColorPickerRow = function(e, t) {
          return this.addEditorRow(e, t, this.createColorPicker());
        }),
        (n.prototype.addOffsetEditorRow = function(e, t) {
          var i = $('<input/>');
          return (
            i.attr('type', 'text'),
            i.css('width', '100px'),
            i.addClass('ticker'),
            this.addEditorRow(e, t, i)
          );
        }),
        (n.prototype.addFontEditorRow = function(e, t) {
          return this.addEditorRow(e, t, this.createFontEditor());
        }),
        (n.prototype.refreshStateControls = function(e, t, i) {
          var o, n, a;
          for (o = 0; o < t.length; o++) {
            (n = t[o]), (a = e[n.id]);
            try {
              a.toggle(this.parseRule(n.visible, t, i));
            } catch (e) {
              continue;
            }
            a.attr('disabled', !this.parseRule(n.visible, t, i));
          }
        }),
        (n.prototype.parseRule = function(e, t, i) {
          if (!e) return !0;
          var o = e.split('==');
          return !(o.length < 2) && i[o[0]].value() === o[1];
        }),
        (n.prototype.destroy = function() {
          for (var e = this._bindings.length; e--; )
            this._bindings[e].destroy();
          this._bindings.length = 0;
        }),
        (n.prototype.bindInteger = function(e, t, i, o, n) {
          var a = [l(t.value())];
          void 0 !== o && a.push(s(1)),
            void 0 !== n && a.push(r(1e3)),
            this.bindControl(new y(e, t, a, !1, this.model(), i));
        }),
        (n.prototype.bindColor = function(e, t, i) {
          this.bindControl(new k(e, t, !0, this.model(), i));
        }),
        (n.prototype.bindBoolean = function(e, t, i) {
          this.bindControl(new f(e, t, !0, this.model(), i));
        }),
        inherit(y, G),
        (y.prototype.value = function() {
          var e,
            t = this._control.val();
          if (this._transformFunction)
            if (Array.isArray(this._transformFunction))
              for (e = 0; e < this._transformFunction.length; e++)
                t = this._transformFunction[e](t);
            else t = this._transformFunction(t);
          return t;
        }),
        (y.prototype.setValue = function(e) {
          var t = this._control.val(),
            i = this._formatValue(e);
          t !== i && this._control.val(i);
        }),
        (y.prototype.setValueToProperty = function(e) {
          this._setter
            ? this._setter.call(this, this.value())
            : this._undoModel.setProperty(this._property, e, this._undoText),
            (this._changed = !1);
        }),
        inherit(g, y),
        inherit(C, G),
        (C.prototype._forEachSubControl = function(e) {
          this._subControlIds.forEach(function(t) {
            var i = '#' + t,
              o = this.control().find(i);
            e.call(this, o);
          }, this);
        }),
        (C.prototype._parseSessions = function(e) {
          var t,
            i,
            o = e.split('-', 2);
          return (
            2 !== o.length && (o = ['0', '0']),
            (t = parseInt(o[0])),
            (i = parseInt(o[1])),
            [Math.floor(t / 100), t % 100, Math.floor(i / 100), i % 100]
          );
        }),
        (C.prototype.value = function() {
          var e,
            t,
            i,
            o = [];
          return (
            this._forEachSubControl(function(e) {
              o.push(e.val());
            }),
            (e = function(e, t) {
              return (
                t.forEach(function(t) {
                  e = t(e);
                }),
                ('0' + e).slice(-2)
              );
            }),
            (t = [l(0), s(0), r(23)]),
            (i = [l(0), s(0), r(59)]),
            e(o[0], t) + e(o[1], i) + '-' + e(o[2], t) + e(o[3], i)
          );
        }),
        (C.prototype.setValue = function(e) {
          var t = this._parseSessions(e);
          this._forEachSubControl(function(e) {
            var i = e.val(),
              o = ('0' + t[0]).slice(-2);
            t.shift(), i !== o && e.val(o);
          });
        }),
        inherit(_, G),
        (_.prototype.value = function() {
          var e, t, i;
          return this._disabled
            ? (this._control.attr('disabled', !0), null)
            : ((e = this._control.val()),
              (t = this._toIntTransformer(e)),
              t < 0 && (t = 0),
              (i = this._mainSeries.bars().size()),
              i <= t && (t = i - 1),
              1e3 *
                F(
                  this._mainSeries
                    .bars()
                    .valueAt(F(this._mainSeries.bars().lastIndex()) - t)
                )[TradingView.TIME_PLOT]);
        }),
        (_.prototype.setValue = function(e) {
          var t, i, o;
          return this._disabled || null == e
            ? void this._control.attr('disabled', !0)
            : e < 0
            ? (this._control.val(-e),
              void this._property.setValue(this.value()))
            : null ===
              (t = this._mainSeries
                .data()
                .plotValueToTimePointIndex(
                  e / 1e3,
                  TradingView.TIME_PLOT,
                  M.FromRight
                ))
            ? void (this._disabled = !0)
            : ((i = F(this._mainSeries.bars().lastIndex())),
              (o = i - t),
              void (this._control.val() !== '' + o && this._control.val(o)));
        }),
        inherit(m, G),
        (m.prototype.value = function() {
          return this._control.val();
        }),
        (m.prototype.setValue = function(e) {
          var t = this.value();
          this._transform && (e = this._transform(e)),
            e && t !== e && this._control.val(e);
        }),
        (m.prototype._updateDisplayedSymbol = function() {
          this.setValue(this._property.value());
        }),
        (m.prototype.destroy = function() {
          G.prototype.destroy.call(this),
            this._updateDelegate &&
              this._updateDelegate.unsubscribe(
                this,
                this._updateDisplayedSymbol
              );
        }),
        inherit(w, G),
        (w.prototype.value = function() {
          var e = this._control.val();
          return this._transformFunction && (e = this._transformFunction(e)), e;
        }),
        (w.prototype.setValue = function(e) {
          var t, i;
          if ((this._control.val(e), this._control.selectbox))
            try {
              (t = this._control.find("[value='" + e + "']")),
                t.length > 0 &&
                  ((i = t[0]),
                  this._control.selectbox('change', i.value, i.text));
            } catch (e) {}
        }),
        (w.prototype.propertyChanged = function(e) {
          var t = e.value();
          'function' == typeof this._propertyChangedHook &&
            (t = this._propertyChangedHook(t)),
            this.setValue(t);
        }),
        inherit(T, G),
        (T.prototype.value = function() {
          return this._property.value();
        }),
        (T.prototype.setValue = function(e) {
          return this._control.html(e);
        }),
        inherit(f, G),
        (f.prototype.value = function() {
          return this.control().is(':checked');
        }),
        (f.prototype.setValue = function(e) {
          var t, i, o, n;
          return (
            this.control().is('.visibility-checker') &&
              (e
                ? (this.control()
                    .closest('tr')
                    .find('.slider-range')
                    .slider('enable'),
                  this.control()
                    .closest('tr')
                    .find('input[type="text"]')
                    .each(function() {
                      $(this).prop('disabled', !1);
                    }))
                : (this.control()
                    .closest('tr')
                    .find('.slider-range')
                    .slider('disable'),
                  this.control()
                    .closest('tr')
                    .find('input[type="text"]')
                    .each(function() {
                      $(this).prop('disabled', !0);
                    }))),
            this.control().is('.visibility-switch') &&
              ((t = { opacity: e ? 1 : 0.5 }),
              (i = e ? 'enable' : 'disable'),
              (o = this.control().data('hides')),
              o
                ? o.closest('td').css(t)
                : ((n = this.control()),
                  n
                    .parent()
                    .parent()
                    .data('visible', e)
                    .find('td')
                    .filter(function() {
                      var e = $(this);
                      return (
                        !e.find('label').length &&
                        e.find(':checkbox').attr('id') !== n.attr('id')
                      );
                    })
                    .each(function() {
                      var o = $(this);
                      o.children().each(function() {
                        var n = $(this);
                        n.is('.ui-slider')
                          ? n.slider(i)
                          : n.is('select')
                          ? (n.selectbox(i), o.css(t))
                          : n.is('.custom-select')
                          ? (n.data(i)(), o.css(t))
                          : n.is('.tvcolorpicker-container')
                          ? (n.find('input').prop('disabled', !e), o.css(t))
                          : (n.prop('disabled', !e), o.css(t));
                      });
                    }))),
            this.control().attr('checked', !!e)
          );
        }),
        (f.prototype.destroy = function() {
          G.prototype.destroy.call(this), this._control.off('change');
        }),
        inherit(v, G),
        (v.prototype.value = function() {
          return this.control().is(':disabled');
        }),
        (v.prototype.setValue = function(e) {
          return (
            (e = !!e),
            this._inverted && (e = !e),
            this.control()
              .parents('label')
              .toggleClass('disabled', e),
            this.control().attr('disabled', e)
          );
        }),
        inherit(L, G),
        (L.prototype.value = function() {
          return this.control().hasClass('active');
        }),
        (L.prototype.setValue = function(e) {
          return this.control().toggleClass('active', !!e);
        }),
        inherit(k, G),
        (k.prototype.applyOldTransparency = function() {
          var e, t, i;
          this.transparencyProperty() &&
            (H.isHexColor(this.property().value())
              ? ((e = this.transparencyProperty().value
                  ? this.transparencyProperty().value()
                  : this.transparencyProperty()),
                (t = W(this.property().value())),
                (i = (100 - e) / 100),
                this.control().val(A(V(t, i))))
              : this.control().val(this.property().value()),
            this.control().change());
        }),
        (k.prototype.transparencyProperty = function() {
          return this._transparencyProperty;
        }),
        (k.prototype.value = function() {
          return this._control.val();
        }),
        (k.prototype.setValue = function(e) {
          this._control.val(e),
            this._control.change(),
            this._control.color && this._control.color.fromString(e);
        }),
        inherit(S, G),
        (S.prototype.value = function() {
          return this._control.slider('option', 'value');
        }),
        (S.prototype.setValue = function(e) {
          this._control.slider('option', 'value', e);
        }),
        inherit(x, f),
        (x.prototype.onIntervalChanged = function() {
          +this._intervalProperty.value() < 1440
            ? this._control.attr({
                disabled: !1,
                checked: !!this._property.value(),
              })
            : this._control.attr({ disabled: !0, checked: !1 });
        }),
        (x.prototype.value = function() {
          return this._control.is(':disabled')
            ? this._property.value()
            : f.prototype.value.call(this);
        }),
        (x.prototype.setValue = function(e) {
          if (!this._control.is(':disabled'))
            return f.prototype.setValue.call(this, e);
        }),
        (x.prototype.destroy = function() {
          this._intervalProperty
            .listeners()
            .unsubscribe(this, this.onIntervalChanged),
            delete this._intervalProperty,
            f.prototype.destroy.call(this, arguments);
        }),
        (P.prototype._attachToControl = function(e) {
          var t = this;
          this._wv.subscribe(this._setValueBinded, { callWithLast: !0 }),
            $(this._control).on('change', function() {
              t.setValueToProperty(t.value());
            });
        }),
        (P.prototype.control = function() {
          return this._control;
        }),
        (P.prototype.value = function() {
          var e = $(this._control).val();
          return this._transformFunction && (e = this._transformFunction(e)), e;
        }),
        (P.prototype.setValue = function(e) {
          $(this._control).val(e);
        }),
        (P.prototype.setValueToProperty = function(e) {
          this._undoModel.undoHistory.setWatchedValue(
            this._wv,
            e,
            this._undoText
          );
        }),
        (P.prototype.watchedValue = function() {
          return this._wv;
        }),
        (P.prototype.destroy = function() {
          this._wv.unsubscribe(this._setValueBinded);
        }),
        inherit(B, P),
        (B.prototype._attachToControl = function(e) {
          var t = this;
          this._wv.subscribe(this.setValue.bind(this), { callWithLast: !0 }),
            $(this._control).on('click', function() {
              t.setValueToProperty(t.value());
            });
        }),
        (B.prototype.value = function() {
          var e = $(this._control).attr('checked');
          return (
            this._not && (e = !e),
            this._transformFunction && (e = this._transformFunction(e)),
            e
          );
        }),
        (B.prototype.setValue = function(e) {
          this._not && (e = !e), $(this._control).attr('checked', !!e);
        }),
        (E.prototype.properties = function() {
          return this._properties;
        }),
        (E.prototype.value = function(e) {
          return this._control.slider('values', e);
        }),
        (E.prototype.setValue = function(e, t) {
          this._control.slider('values', t, e.value()),
            this._inputsText && $(this._inputsText[t]).val(e.value());
        }),
        (E.prototype.propertyChanged = function(e) {
          this.setValue(e);
        }),
        (E.prototype.setValueToProperty = function(e, t) {
          ($(t).hasClass('from') || 'from' === t) &&
            (this._undoModel.beginUndoMacro(this._undoText[0]),
            this._undoModel.setProperty(
              this._propFrom,
              e[0],
              this._undoText[0]
            ),
            this._propFrom.setValue(e[0], 0),
            this._undoModel.endUndoMacro()),
            ($(t).hasClass('to') || 'to' === t) &&
              (this._undoModel.beginUndoMacro(this._undoText[1]),
              this._undoModel.setProperty(
                this._propTo,
                e[1],
                this._undoText[1]
              ),
              this._propTo.setValue(e[1], 1),
              this._undoModel.endUndoMacro());
        }),
        (E.prototype.destroy = function() {
          this._propFrom &&
            this._propTo &&
            (this._propFrom
              .listeners()
              .unsubscribe(this, G.prototype.propertyChanged),
            this._propTo
              .listeners()
              .unsubscribe(this, G.prototype.propertyChanged));
        }),
        inherit(R, G),
        (R.prototype.value = function() {
          var e = [];
          return (
            this._control.each(function() {
              var t = $(this);
              t.is(':checked') && e.push(t.attr('value'));
            }),
            e.join(this._separator)
          );
        }),
        (R.prototype.setValue = function(e) {
          var t = e.split(this._separator).filter(Boolean);
          this._control.each(function() {
            var e = $(this),
              i = -1 !== t.indexOf(e.attr('value'));
            e.attr('checked', i), e.parents('label').toggleClass('active', i);
          });
        }),
        (t.PropertyPage = n),
        (t.UppercaseTransformer = a),
        (t.GreateTransformer = s),
        (t.LessTransformer = r),
        (t.ToIntTransformer = l),
        (t.ToFloatTransformer = p),
        (t.ToFloatTransformerWithDynamicDefaultValue = d),
        (t.ToFloatLimitedPrecisionTransformer = h),
        (t.ToAsciiTransformer = c),
        (t.ReplaceEmptyTransformer = u),
        (t.SymbolInfoSymbolTransformer = b),
        (t.SimpleStringBinder = y),
        (t.FloatBinder = g),
        (t.SessionBinder = C),
        (t.BarTimeBinder = _),
        (t.SymbolBinder = m),
        (t.SimpleComboBinder = w),
        (t.StaticContentBinder = T),
        (t.BooleanBinder = f),
        (t.DisabledBinder = v),
        (t.ColorBinding = k),
        (t.SliderBinder = S),
        (t.CheckboxWVBinding = B),
        (t.RangeBinder = E),
        (t.generateLabelElementStr = o);
    }.call(t, i(13)));
  },
  825: function(e, t, i) {
    'use strict';
    function o(e) {
      function t(t, i, o) {
        e.call(this, t, i, o),
          (this._linetool = o),
          (this._templateList = new p(
            this._linetool._constructor,
            this.applyTemplate.bind(this)
          ));
      }
      return (
        inherit(t, e),
        (t.prototype.applyTemplate = function(e) {
          this.model().applyLineToolTemplate(
            this._linetool,
            e,
            'Apply Drawing Template'
          ),
            this.loadData();
        }),
        (t.prototype.createTemplateButton = function(e) {
          var t = this;
          return (
            (e = $.extend({}, e, {
              getDataForSaveAs: function() {
                return t._linetool.template();
              },
            })),
            this._templateList.createButton(e)
          );
        }),
        t
      );
    }
    function n(e, t, i) {
      s.call(this, e, t), (this._linetool = i);
    }
    var a = i(823),
      s = a.PropertyPage,
      r = a.ColorBinding,
      l = i(829).addColorPicker,
      p = i(964);
    inherit(n, s),
      (n.prototype.createOneColorForAllLinesWidget = function() {
        var e = $("<td class='colorpicker-cell'>");
        return (
          this.bindControl(
            new r(
              l(e),
              this._linetool.properties().collectibleColors,
              !0,
              this.model(),
              'Change All Lines Color',
              0
            )
          ),
          { label: $('<td>' + $.t('Use one color') + '</td>'), editor: e }
        );
      }),
      (n.prototype.addOneColorPropertyWidget = function(e) {
        var t = this.createOneColorForAllLinesWidget(),
          i = $('<tr>');
        i
          .append($('<td>'))
          .append(t.label)
          .append(t.editor),
          i.appendTo(e);
      }),
      (n = o(n)),
      (n.createTemplatesPropertyPage = o),
      (e.exports = n);
  },
  828: function(e, t) {
    e.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="13" height="13"><path d="M5.182 6.596l-3.889-3.889-.707-.707 1.414-1.414.707.707 3.889 3.889 3.889-3.889.707-.707 1.414 1.414-.707.707-3.889 3.889 3.889 3.889.707.707-1.414 1.414-.707-.707-3.889-3.889-3.889 3.889-.707.707-1.414-1.414.707-.707 3.889-3.889z"/></svg>';
  },
  829: function(e, t, i) {
    'use strict';
    function o(e) {
      var t = Object(l.parseRgb)(e),
        i = t.map(function(e) {
          return e > 50 ? e - 50 : 0;
        });
      return Object(l.rgbToString)(i);
    }
    function n(e) {
      var t,
        i,
        o,
        n = [];
      for (t = 0, i = e; t < i.length; t++)
        (o = i[t]), null !== Object(l.tryParseRgb)(o) && n.push(o);
      return n;
    }
    function a(e, t) {
      void 0 === t && (t = {});
      var i = $('<span class="tvcolorpicker-container">');
      return (
        null !== e && i.appendTo(e),
        void 0 !== t.addClass && i.addClass(t.addClass),
        $('<div class="tvcolorpicker-transparency">').appendTo(i),
        $('<input class="colorpicker-widget">')
          .tvcolorpicker({
            customColors: n(Object(p.getJSON)('pickerCustomColors', [])),
            direction: t.direction,
            hideTransparency: !!t.hideTransparency,
          })
          .on('change', function() {
            $(this).css('border-color', o($(this).val() || d));
          })
          .bind('customcolorchange', function(e, t) {
            Object(p.setJSON)('pickerCustomColors', t);
          })
          .appendTo(i),
        i
      );
    }
    var s, r, l, p, d;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.addColorPicker = a),
      (s = i(14)),
      i.n(s),
      (r = i(316)),
      i.n(r),
      (l = i(24)),
      i.n(l),
      (p = i(49)),
      i.n(p),
      (d = '#727272');
  },
  830: function(e, t, i) {
    'use strict';
    function o() {
      return new r([
        {
          html:
            '<div class="tv-line-style-option tv-line-style-option--solid"/>',
          value: l.LINESTYLE_SOLID,
        },
        {
          html:
            '<div class="tv-line-style-option tv-line-style-option--dotted"/>',
          value: l.LINESTYLE_DOTTED,
        },
        {
          html:
            '<div class="tv-line-style-option tv-line-style-option--dashed"/>',
          value: l.LINESTYLE_DASHED,
        },
      ]);
    }
    var n, a, s, r, l;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (n = i(14)),
      (a = i(331)),
      (s = (function() {
        function e(e, t) {
          (this.value = e), (this.html = t), (this.jqItem = this._render());
        }
        return (
          (e.prototype.eq = function(e) {
            return this.value === e;
          }),
          (e.prototype.width = function() {
            return this.jqItem.width();
          }),
          (e.prototype.render = function() {
            return this.jqItem;
          }),
          (e.prototype.select = function(e) {
            this.jqItem.toggleClass('selected', !!e);
          }),
          (e.prototype.selectAndReturnIfValueMatch = function(e) {
            return this.eq(e)
              ? (this.select(!0), this)
              : (this.select(!1), null);
          }),
          (e.prototype._render = function() {
            return $('<div class="item">').append($('<span>').html(this.html));
          }),
          e
        );
      })()),
      (r = (function() {
        function e(e) {
          var t = this;
          (this._disabled = !1),
            (this._closeCb = null),
            (this.opened = !1),
            (this._value = null),
            (this.items = []),
            (this.width = 0),
            (this._jqWrapper = $('<div class="custom-select">')),
            this._jqWrapper.data({
              disable: this.disable.bind(this),
              enable: this.enable.bind(this),
            }),
            this._jqWrapper.selectable(!1),
            (this._jqSwitcher = $('<div class="switcher">').appendTo(
              this._jqWrapper
            )),
            this._jqSwitcher.on('click', function() {
              t.toggleItems();
            }),
            (this._jqTitle = $('<span class="title">').appendTo(
              this._jqSwitcher
            )),
            $('<span class="icon">').appendTo(this._jqSwitcher),
            (this._jqItems = $('<div class="items js-hidden">').appendTo(
              this._jqWrapper
            )),
            (this._callback = null),
            e && this.addItems(e);
        }
        return (
          (e.prototype.toggleItems = function() {
            this.opened ? this._close() : this._open();
          }),
          (e.prototype.setWidth = function() {
            this._jqWrapper.width(this.width);
          }),
          (e.prototype.render = function() {
            return this._jqWrapper;
          }),
          (e.prototype.selectItemByValue = function(e) {
            var t,
              i,
              o,
              n,
              a = null;
            for (t = 0, i = this.items; t < i.length; t++)
              (o = i[t]), (n = o.selectAndReturnIfValueMatch(e)) && (a = n);
            return a;
          }),
          (e.prototype.setValue = function(e) {
            if (this._value !== e) {
              var t = this.selectItemByValue(e);
              t &&
                ((this._value = e), this._jqTitle.html(t.html), this.change());
            }
          }),
          (e.prototype.change = function(e) {
            if (e) return void (this._callback = e);
            this._callback && this._callback.call(this);
          }),
          (e.prototype.value = function() {
            return this._value;
          }),
          (e.prototype.val = function(e) {
            return void 0 !== e ? void this.setValue(e) : this.value();
          }),
          (e.prototype.addItems = function(e) {
            var t, i, o;
            for (t = 0, i = e; t < i.length; t++)
              (o = i[t]), this.addItem(o.value, o.html);
          }),
          (e.prototype.addItem = function(e, t) {
            var i,
              o = this,
              n = new s(e, t);
            this.items.push(n),
              (i = n.render()),
              i.on('click', function() {
                o.setValue(e), o.toggleItems();
              }),
              this._jqItems.append(i),
              null === this.value() && this.setValue(e);
          }),
          (e.prototype.disable = function() {
            this._disabled = !0;
          }),
          (e.prototype.enable = function() {
            this._disabled = !1;
          }),
          (e.prototype.disabled = function() {
            return this._disabled;
          }),
          (e.prototype._open = function() {
            var e = this;
            this._disabled ||
              (this._jqItems.removeClass('js-hidden'),
              this._jqSwitcher.addClass('open'),
              (this.opened = !0),
              this._closeCb ||
                ((this._closeCb = {
                  host: this._jqSwitcher.prop('ownerDocument'),
                  cb: function(t) {
                    e._jqWrapper[0].contains(t.target) || e._close();
                  },
                }),
                this._closeCb.host.addEventListener(
                  'mousedown',
                  this._closeCb.cb,
                  !1
                )));
          }),
          (e.prototype._close = function() {
            this._jqItems.addClass('js-hidden'),
              this._jqSwitcher.removeClass('open'),
              (this.opened = !1),
              this._closeCb &&
                (this._closeCb.host.removeEventListener(
                  'mousedown',
                  this._closeCb.cb,
                  !1
                ),
                (this._closeCb = null));
          }),
          e
        );
      })()),
      (l = i(84)),
      (t.createLineStyleEditor = o);
  },
  835: function(e, t, i) {
    'use strict';
    function o(e) {
      var t = $(
          '<div class="transparency-slider"><div class="gradient"></div></div>'
        ).slider({ max: 100, min: 0, step: 1 }),
        i = [
          '-moz-linear-gradient(left, %COLOR 0%, transparent 100%)',
          '-webkit-gradient(linear, left top, right top, color-stop(0%,%COLOR), color-stop(100%,transparent))',
          '-webkit-linear-gradient(left, %COLOR 0%,transparent 100%)',
          '-o-linear-gradient(left, %COLOR 0%,transparent 100%)',
          'linear-gradient(to right, %COLOR 0%,transparent 100%)',
        ];
      return (
        (t.updateColor = function(e) {
          var o = t.find('.gradient');
          i.forEach(function(t) {
            o.css('background-image', t.replace(/%COLOR/, e));
          });
        }),
        e
          ? (t.updateColor(e.val() || 'black'),
            e.on('change', function(e) {
              t.updateColor(e.target.value);
            }))
          : t.updateColor('black'),
        t
      );
    }
    var n, a;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.createTransparencyEditor = o),
      (n = i(14)),
      i.n(n),
      (a = i(866)),
      i.n(a);
  },
  836: function(e, t) {
    e.exports =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8" width="16" height="8"><path d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"/></svg>';
  },
  845: function(e, t, i) {
    'use strict';
    function o(e) {
      var t,
        i,
        o = (e + '').match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return null === o
        ? 0
        : ((t = o[1] ? o[1].length : 0),
          (i = o[2] ? parseInt(o[2], 0) : 0),
          Math.max(0, t - i));
    }
    function n(e) {
      return (
        (e = Math.abs(e)),
        !Object(d.isInteger)(e) &&
          e > 1 &&
          (e = parseFloat(('' + e).replace(/^.+\./, '0.'))),
        0 < e && e < 1 ? Math.pow(10, o(e)) : 1
      );
    }
    function a(e, t) {
      var i, o, a, s, r, l;
      e.trigger('tvticker-beforechange'),
        (i = e.data('TVTicker')),
        (o = i && i.step),
        (a = 0),
        (a = i.parser
          ? i.parser(e.val())
          : Object(d.isInteger)(o)
          ? parseInt(e.val(), 10)
          : parseFloat(e.val())),
        isNaN(a) && (a = 0),
        (s = n(o)),
        (r = Math.max(s, n(a))),
        (l = t(a, r)),
        i.formatter && (l = i.formatter(l)),
        e.val(l),
        e.change();
    }
    function s(e) {
      var t = e.data('TVTicker'),
        i = t && t.step,
        o = t && t.max;
      a(e, function(e, t) {
        var n = (Math.round(e * t) + Math.round(i * t)) / t;
        return void 0 !== o && null !== o && o < n && (n = e), n;
      });
    }
    function r(e) {
      var t = e.data('TVTicker'),
        i = t && t.step,
        o = t && t.min;
      a(e, function(e, t) {
        var n = (Math.round(e * t) - Math.round(i * t)) / t;
        return void 0 !== o && null !== o && n < o && (n = e), n;
      });
    }
    var l, p, d, h;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (l = i(14)),
      i.n(l),
      (p = i(314)),
      i.n(p),
      (d = i(12)),
      i.n(d),
      (h = i(836)),
      i.n(h),
      ($.fn.TVTicker = function(e) {
        return (
          void 0 === e && (e = {}),
          this.each(function() {
            var t,
              i,
              o,
              n = !1,
              a = $(this),
              l = a.data('TVTicker');
            l ? (n = !0) : (l = { step: +a.data('step') || 1 }),
              'step' in e && (l.step = +e.step || l.step),
              'min' in e && (l.min = e.min),
              'max' in e && (l.max = e.max),
              'formatter' in e && (l.formatter = e.formatter),
              'parser' in e && (l.parser = e.parser),
              a.data('TVTicker', l),
              n ||
                ((t = $('<div class="tv-ticker">').appendTo(a.parent())),
                (i = $('<div class="tv-ticker__btn tv-ticker__btn--up">')
                  .html(h)
                  .appendTo(t)),
                (o = $('<div class="tv-ticker__btn tv-ticker__btn--down">')
                  .html(h)
                  .appendTo(t)),
                t.on('mousedown', function(e) {
                  e.preventDefault(), a.focus();
                }),
                i.click(function() {
                  a.is(':disabled') || s(a);
                }),
                o.click(function() {
                  a.is(':disabled') || r(a);
                }),
                a.keydown(function(e) {
                  a.is(':disabled') ||
                    (38 === e.keyCode
                      ? i.addClass('i-active')
                      : 40 === e.keyCode && o.addClass('i-active'));
                }),
                a.keyup(function(e) {
                  a.is(':disabled') ||
                    (38 === e.keyCode
                      ? (s(a), i.removeClass('i-active'))
                      : 40 === e.keyCode && (r(a), o.removeClass('i-active')));
                }),
                a.mousewheel(function(e, t) {
                  t > 0 ? i.click() : o.click();
                }));
          })
        );
      });
  },
  847: function(e, t, i) {
    'use strict';
    var o,
      n = i(192).ESC,
      a = function(e, t, o) {
        var s,
          r,
          l,
          p,
          d,
          h,
          c = '.popup-menu';
        (e = $(e)),
          (o = o || {}),
          (o.activeClass = o.activeClass || ''),
          (s = (o.event || 'click') + c),
          o.hideEvent && (r = o.hideEvent + c),
          (l = function() {}),
          (p = l),
          (d = {}),
          (h = function(s, h, u) {
            function b(t) {
              var i = $(t.target)
                .parents()
                .andSelf();
              i.is(m) ||
                i.is(e) ||
                i.is('.charts-popup-tab-headers, .charts-popup-itemheader') ||
                p();
            }
            function y(e) {
              if (d.preventFirstProcessClick)
                return void (d.preventFirstProcessClick = !1);
              var t = $(e.target)
                .parents()
                .andSelf();
              t.is('.charts-popup-tab-headers, .charts-popup-itemheader') ||
                (o.notCloseOnButtons && t.is('.icon-delete')) ||
                p();
            }
            function g(e) {
              e.keyCode === n && p();
            }
            function C(t, n, s) {
              var r, l, p, d, h, c, u, b, y, g, _, w, T, f, v, L;
              if (t instanceof a.TabGroup) {
                if (!t.tabs || !t.tabs.length) return;
                return 1 !== t.tabs.length || t.tabs[0].title
                  ? ((r = $(
                      '<div class="charts-popup-tab-group"></div>'
                    ).appendTo(s)),
                    (l = $(
                      '<div class="charts-popup-tab-headers"></div>'
                    ).appendTo(r)),
                    (p = null),
                    void $.each(t.tabs || [], function(e, i) {
                      var o, n;
                      i.items &&
                        i.items.length &&
                        ((o = $('<div class="charts-popup-tab"></div>')
                          .hide()
                          .appendTo(r)),
                        $.each(i.items, function() {
                          C(this, void 0, o);
                        }),
                        (n = $('<span class="charts-popup-tab-header">')
                          .append(
                            $(
                              '<a href="javascript://" class="charts-popup-tab-header-label">'
                            ).text(i.name)
                          )
                          .appendTo(l)),
                        n.on('click', function(e) {
                          n.is('.active') ||
                            (l
                              .find('.charts-popup-tab-header.active')
                              .removeClass('active'),
                            n.addClass('active'),
                            r.find('.charts-popup-tab').hide(),
                            o.show(),
                            e && e.preventDefault(),
                            'function' == typeof t.onChange &&
                              t.onChange.call(t, i.name));
                        }),
                        (p && !i.active) ||
                          ((p = n),
                          l
                            .find('.charts-popup-tab-header.active')
                            .removeClass('active'),
                          n.addClass('active'),
                          r.find('.charts-popup-tab').hide(),
                          o.show()));
                    }))
                  : void $.each(t.tabs[0].items, function() {
                      C(this, void 0, s);
                    });
              }
              return t instanceof a.Group
                ? ((d = $('<div class="charts-popup-group"></div>').appendTo(
                    s
                  )),
                  t.title &&
                    ((h = $('<div class="charts-popup-itemheader"></div>')
                      .text(t.title)
                      .prepend(
                        $('<span class="charts-popup-itemheader-icon"></span>')
                      )),
                    t.collapsible &&
                      (d.addClass('charts-popup-group-collapsible'),
                      d.toggleClass('collapsed', t.collapsed),
                      h.on('click', function() {
                        d.toggleClass('collapsed'),
                          'function' == typeof t.onChange &&
                            t.onChange(d.hasClass('collapsed')),
                          m.height() === parseInt(m.css('max-height'))
                            ? m.addClass('popup-menu-scroll-y')
                            : m.height() < parseInt(m.css('max-height')) &&
                              m.removeClass('popup-menu-scroll-y');
                      })),
                    d.append(h)),
                  void $.each(t.items, function(e) {
                    C(this, 1, d);
                  }))
                : t instanceof a.Header
                ? void s.append(
                    $('<div class="charts-popup-itemheader"></div>').text(
                      t.title
                    )
                  )
                : t.separator
                ? ((c = $('<span class="separator"></span>')), void s.append(c))
                : ((c = $('<a class="item">')),
                  t.url && c.attr('href', t.url),
                  t.target && c.attr('target', t.target),
                  n || c.addClass('first'),
                  'function' == typeof t.active
                    ? t.active(t) && c.addClass('active')
                    : t.active && c.addClass('active'),
                  t.addClass && c.addClass(t.addClass),
                  t.addData && c.data(t.addData),
                  t.disabled && c.addClass('disabled'),
                  'function' == typeof t.action &&
                    ((u = t.action),
                    (b = function(e) {
                      $(e.target)
                        .parents()
                        .andSelf()
                        .is(f) ||
                        (u.apply(c, arguments),
                        !t.url &&
                          e &&
                          'function' == typeof e.preventDefault &&
                          e.preventDefault());
                    }),
                    o.upAction ? c.bind('mouseup', b) : c.bind('click', b)),
                  t.date
                    ? ((y = $('<span class="title"></span>').appendTo(c)),
                      $('<span class="date"></span>')
                        .text(t.date || '')
                        .appendTo(c))
                    : t.icon && !o.svg
                    ? ((g = $('<span class="icon"></span>').appendTo(c)),
                      g.css('background-image', t.icon.image || ''),
                      t.icon.offset &&
                        g.css(
                          'background-position',
                          'string' == typeof t.icon.offset
                            ? t.icon.offset
                            : t.icon.offset.x + 'px ' + t.icon.offset.y + 'px'
                        ),
                      (y = $('<span class="title"></span>').appendTo(c)))
                    : !0 === o.svg && t.svg
                    ? (o.wrapIcon
                        ? c.append(
                            $('<span class="icon-wrap">')
                              .addClass(t.iconClass)
                              .append(t.svg)
                          )
                        : c.append(t.svg),
                      (y = $('<span class="title"></span>').appendTo(c)))
                    : t.iconClass
                    ? (c.append(
                        $('<span class="icon"></span>').addClass(t.iconClass)
                      ),
                      (y = $('<span class="title"></span>').appendTo(c)))
                    : (y = $('<span class="title-expanded"></span>').appendTo(
                        c
                      )),
                  t.html
                    ? y.html(t.html)
                    : y.text(TradingView.clean(t.title, !0) || ''),
                  (_ = $('<span class="shortcut"></span>').appendTo(c)),
                  t.shortcut && _.text(t.shortcut.keys),
                  'function' == typeof t.deleteAction &&
                    ((w = t.deleteAction),
                    (T = t.deleteAction.title || $.t('Delete')),
                    (f = $('<span class="icon-delete">')),
                    f.html(i(828)),
                    f.attr('title', T),
                    f.on('click', function(e) {
                      w.apply(c, arguments), e.preventDefault();
                    }),
                    c.append(f)),
                  t.buttons instanceof Array &&
                    t.buttons.length &&
                    t.buttons.forEach(function(e) {
                      e.el instanceof $ || (e.el = $(e.el)),
                        e.el.appendTo(c),
                        e.handler &&
                          e.el.on('click', function(t) {
                            e.handler.apply(c, arguments);
                          });
                    }),
                  void 0 !== t.counter &&
                    ('function' == typeof t.counter
                      ? ((v = $('<span class="counter"></span>').html(
                          t.counter()
                        )),
                        v.appendTo(c))
                      : ((L = t.counterBlue ? 'blue' : ''),
                        $('<span class="counter"></span>')
                          .text(t.counter + '')
                          .addClass(L)
                          .appendTo(c))),
                  s.append(c),
                  void e.data('popup-menu', s));
            }
            var _,
              m,
              w,
              T,
              f,
              v,
              L,
              k,
              S,
              x,
              P,
              B,
              E,
              R,
              F,
              I,
              D,
              V,
              A,
              W,
              M,
              O,
              z,
              H,
              N,
              G,
              j = s.target.ownerDocument,
              q = j.defaultView,
              U = h || t;
            if (
              ('function' == typeof U && (U = U()),
              $(this).hasClass('open') || $(this).hasClass('active'))
            )
              return s.preventDefault(), p(), void (_ = d.scrollTop);
            switch (
              ((p = function() {
                (d.scrollTop = m.scrollTop()),
                  m.remove(),
                  e.removeClass('active open ' + o.activeClass),
                  e.data('popup-menu', null),
                  $(j).off('click', y),
                  $(j).off('mousedown', b),
                  Modernizr.touch && $(j).off('touchstart.chartgui', b),
                  $(j).off('selectstart.' + c),
                  j.removeEventListener('keydown', g, !1),
                  (p = l),
                  o.onRemove && o.onRemove();
              }),
              e.addClass('active open ' + o.activeClass),
              (m = $('<div class="charts-popup-list">')),
              o.addClass && m.addClass(o.addClass),
              o.zIndex && m.css('z-index', o.zIndex),
              (w = m),
              o.listInner && (w = $('<div class="list-inner">').appendTo(w)),
              o.listTable && (w = $('<div class="list-table">').appendTo(w)),
              $.each(U, function(e) {
                C(this, e, w);
              }),
              r || (d.preventFirstProcessClick = !0),
              $(j).on('click', y),
              $(j).on('mousedown', b),
              j.addEventListener('keydown', g, !1),
              Modernizr.touch && $(j).on('touchstart.chartgui', b),
              o.upAction &&
                $(j).on('selectstart.popup-menu', function() {
                  return !1;
                }),
              m.appendTo(j.body),
              (T = $(q).width()),
              (f = Math.min($(q).height(), $('body').height())),
              (v = e.outerWidth()),
              (L = e.outerHeight()),
              (k = e.offset()),
              (_ = $(q).scrollTop() || 0),
              (k.top -= _),
              (k.top = Math.round(k.top)),
              (k.left = Math.round(k.left)),
              (S = m.outerWidth()),
              (x = m.outerHeight()),
              (P = void 0 !== o.viewportSpacing ? o.viewportSpacing : 10),
              (B = o.popupSpacing ? ~~o.popupSpacing : 1),
              (E = o.popupDrift ? ~~o.popupDrift : 0),
              (R = x - m.height()),
              (F = 'down'),
              o.direction &&
                (F =
                  'function' == typeof o.direction
                    ? o.direction()
                    : o.direction),
              (I = !!o.reverse),
              'down' === F
                ? ((D = f - k.top - L - B - P - R),
                  (V = k.top - B - P - R),
                  D < Math.max(x || 0, 100) && V > D && (F = 'up'))
                : 'right' === F &&
                  ((A = T - k.left - v - B - P - R),
                  (W = k.left - B - P - R),
                  A < Math.max(S || 0, 100) && W > A && (F = 'left')),
              F)
            ) {
              case 'down':
              case 'up':
                'down' === F
                  ? m.css('top', k.top + L + B + 'px')
                  : m.css('bottom', f - k.top + B + 'px').css('top', 'auto'),
                  I
                    ? m
                        .css('left', Math.max(k.left + E + v - S, P) + 'px')
                        .css('right', 'auto')
                    : m.css('left', k.left + E + 'px').css('right', 'auto');
                break;
              case 'right':
              case 'left':
                (B = Math.max(B, 4)),
                  'right' === F
                    ? m
                        .css('left', Math.floor(k.left + v + B) + 'px')
                        .css('right', 'auto')
                    : m
                        .css(
                          'left',
                          Math.floor(Math.max(k.left - S - B, P)) + 'px'
                        )
                        .css('right', 'auto'),
                  I
                    ? m.css(
                        'top',
                        Math.floor(Math.max(k.top + E + L - x, P)) + 'px'
                      )
                    : m.css('top', Math.floor(k.top + E) + 'px');
            }
            for (
              m.show(),
                M = k.top,
                'up' === F || ({ left: 1, right: 1 }[F] && I)
                  ? 'up' !== F
                    ? (M += L)
                    : (M -= L + B + R + P)
                  : (M = f - M - L - 2 * B - R),
                m.height() > M && m.addClass('popup-menu-scroll-y'),
                m.css('max-height', M + 'px'),
                o.careRightBorder &&
                  ((O = T + $(q).scrollLeft()),
                  parseInt(m.css('left')) + m.width() + P > O &&
                    m
                      .css('left', O - m.width() - P + 'px')
                      .css('right', 'auto')),
                o.careBottomBorder &&
                  parseInt(m.css('top')) + m.height() + P > f + _ &&
                  m.css('top', f - m.height() - P + _ + 'px'),
                H = e.parents().andSelf(),
                N = H.size();
              N--;

            )
              if ('fixed' === H.eq(N).css('position')) {
                z = H.eq(N);
                break;
              }
            z &&
              ((G = m.offset()),
              m.css({
                position: 'fixed',
                left: G.left - $(j).scrollLeft(),
                right: 'auto',
              })),
              m[0].scrollHeight > m.height() && m.addClass('popup-with-scroll'),
              s && s.preventDefault();
          }),
          s && e.bind(s, h),
          r &&
            e.bind(r, function() {
              p();
            }),
          o.runOpened && h();
      };
    (a.TabGroup = function e(t) {
      if (!(this instanceof e)) return new e(t);
      (t = t || {}),
        (this.tabs = []),
        'function' == typeof t.onChange && (this.onChange = t.onChange);
    }),
      (a.TabGroup.prototype.appendTab = function(e, t, i) {
        if (
          (null == e ? (e = '') : (e += ''),
          t || (t = []),
          i || (i = {}),
          !Array.isArray(t))
        )
          throw new TypeError('items must be an array');
        return this.tabs.push({ name: e, items: t, active: !!i.active }), t;
      }),
      (a.Header = function e(t) {
        if (!(this instanceof e)) return new e(t);
        this.title = t;
      }),
      (a.Group = function e(t) {
        if (!(this instanceof e)) return new e(t);
        (t = t || {}),
          (this.items = []),
          (this.title = null == t.title ? '' : t.title + ''),
          (this.collapsible = !!t.collapsible),
          (this.collapsed = !!t.collapsed),
          'function' == typeof t.onChange && (this.onChange = t.onChange);
      }),
      (a.Group.prototype.push = function() {
        this.items.push.apply(this.items, arguments);
      }),
      (t.bindPopupMenu = a),
      (o = function(e) {
        (e = $(e)), e.unbind('.popup-menu'), e.removeData('popup-menu');
      }),
      (t.unbindPopupMenu = o);
  },
  850: function(e, t, i) {
    var o, n, a;
    !(function(s) {
      (n = [i(14), i(80)]),
        (o = s),
        void 0 !== (a = 'function' == typeof o ? o.apply(t, n) : o) &&
          (e.exports = a);
    })(function(e) {
      return (e.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      });
    });
  },
  851: function(e, t) {},
  866: function(e, t, i) {
    var o, n, a;
    !(function(s) {
      (n = [i(14), i(310), i(850), i(80), i(191)]),
        (o = s),
        void 0 !== (a = 'function' == typeof o ? o.apply(t, n) : o) &&
          (e.exports = a);
    })(function(e) {
      return e.widget('ui.slider', e.ui.mouse, {
        version: '1.12.1',
        widgetEventPrefix: 'slide',
        options: {
          animate: !1,
          classes: {
            'ui-slider': 'ui-corner-all',
            'ui-slider-handle': 'ui-corner-all',
            'ui-slider-range': 'ui-corner-all ui-widget-header',
          },
          distance: 0,
          max: 100,
          min: 0,
          orientation: 'horizontal',
          range: !1,
          step: 1,
          value: 0,
          values: null,
          change: null,
          slide: null,
          start: null,
          stop: null,
        },
        numPages: 5,
        _create: function() {
          (this._keySliding = !1),
            (this._mouseSliding = !1),
            (this._animateOff = !0),
            (this._handleIndex = null),
            this._detectOrientation(),
            this._mouseInit(),
            this._calculateNewMax(),
            this._addClass(
              'ui-slider ui-slider-' + this.orientation,
              'ui-widget ui-widget-content'
            ),
            this._refresh(),
            (this._animateOff = !1);
        },
        _refresh: function() {
          this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue();
        },
        _createHandles: function() {
          var t,
            i,
            o = this.options,
            n = this.element.find('.ui-slider-handle'),
            a = [];
          for (
            i = (o.values && o.values.length) || 1,
              n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
              t = n.length;
            t < i;
            t++
          )
            a.push("<span tabindex='0'></span>");
          (this.handles = n.add(e(a.join('')).appendTo(this.element))),
            this._addClass(
              this.handles,
              'ui-slider-handle',
              'ui-state-default'
            ),
            (this.handle = this.handles.eq(0)),
            this.handles.each(function(t) {
              e(this)
                .data('ui-slider-handle-index', t)
                .attr('tabIndex', 0);
            });
        },
        _createRange: function() {
          var t = this.options;
          t.range
            ? (!0 === t.range &&
                (t.values
                  ? t.values.length && 2 !== t.values.length
                    ? (t.values = [t.values[0], t.values[0]])
                    : e.isArray(t.values) && (t.values = t.values.slice(0))
                  : (t.values = [this._valueMin(), this._valueMin()])),
              this.range && this.range.length
                ? (this._removeClass(
                    this.range,
                    'ui-slider-range-min ui-slider-range-max'
                  ),
                  this.range.css({ left: '', bottom: '' }))
                : ((this.range = e('<div>').appendTo(this.element)),
                  this._addClass(this.range, 'ui-slider-range')),
              ('min' !== t.range && 'max' !== t.range) ||
                this._addClass(this.range, 'ui-slider-range-' + t.range))
            : (this.range && this.range.remove(), (this.range = null));
        },
        _setupEvents: function() {
          this._off(this.handles),
            this._on(this.handles, this._handleEvents),
            this._hoverable(this.handles),
            this._focusable(this.handles);
        },
        _destroy: function() {
          this.handles.remove(),
            this.range && this.range.remove(),
            this._mouseDestroy();
        },
        _mouseCapture: function(t) {
          var i,
            o,
            n,
            a,
            s,
            r,
            l,
            p = this,
            d = this.options;
          return (
            !d.disabled &&
            ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (i = { x: t.pageX, y: t.pageY }),
            (o = this._normValueFromMouse(i)),
            (n = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function(t) {
              var i = Math.abs(o - p.values(t));
              (n > i ||
                (n === i &&
                  (t === p._lastChangedValue || p.values(t) === d.min))) &&
                ((n = i), (a = e(this)), (s = t));
            }),
            !1 !== this._start(t, s) &&
              ((this._mouseSliding = !0),
              (this._handleIndex = s),
              this._addClass(a, null, 'ui-state-active'),
              a.trigger('focus'),
              (r = a.offset()),
              (l = !e(t.target)
                .parents()
                .addBack()
                .is('.ui-slider-handle')),
              (this._clickOffset = l
                ? { left: 0, top: 0 }
                : {
                    left: t.pageX - r.left - a.width() / 2,
                    top:
                      t.pageY -
                      r.top -
                      a.height() / 2 -
                      (parseInt(a.css('borderTopWidth'), 10) || 0) -
                      (parseInt(a.css('borderBottomWidth'), 10) || 0) +
                      (parseInt(a.css('marginTop'), 10) || 0),
                  }),
              this.handles.hasClass('ui-state-hover') || this._slide(t, s, o),
              (this._animateOff = !0),
              !0))
          );
        },
        _mouseStart: function() {
          return !0;
        },
        _mouseDrag: function(e) {
          var t = { x: e.pageX, y: e.pageY },
            i = this._normValueFromMouse(t);
          return this._slide(e, this._handleIndex, i), !1;
        },
        _mouseStop: function(e) {
          return (
            this._removeClass(this.handles, null, 'ui-state-active'),
            (this._mouseSliding = !1),
            this._stop(e, this._handleIndex),
            this._change(e, this._handleIndex),
            (this._handleIndex = null),
            (this._clickOffset = null),
            (this._animateOff = !1),
            !1
          );
        },
        _detectOrientation: function() {
          this.orientation =
            'vertical' === this.options.orientation ? 'vertical' : 'horizontal';
        },
        _normValueFromMouse: function(e) {
          var t, i, o, n, a;
          return (
            'horizontal' === this.orientation
              ? ((t = this.elementSize.width),
                (i =
                  e.x -
                  this.elementOffset.left -
                  (this._clickOffset ? this._clickOffset.left : 0)))
              : ((t = this.elementSize.height),
                (i =
                  e.y -
                  this.elementOffset.top -
                  (this._clickOffset ? this._clickOffset.top : 0))),
            (o = i / t),
            o > 1 && (o = 1),
            o < 0 && (o = 0),
            'vertical' === this.orientation && (o = 1 - o),
            (n = this._valueMax() - this._valueMin()),
            (a = this._valueMin() + o * n),
            this._trimAlignValue(a)
          );
        },
        _uiHash: function(e, t, i) {
          var o = {
            handle: this.handles[e],
            handleIndex: e,
            value: void 0 !== t ? t : this.value(),
          };
          return (
            this._hasMultipleValues() &&
              ((o.value = void 0 !== t ? t : this.values(e)),
              (o.values = i || this.values())),
            o
          );
        },
        _hasMultipleValues: function() {
          return this.options.values && this.options.values.length;
        },
        _start: function(e, t) {
          return this._trigger('start', e, this._uiHash(t));
        },
        _slide: function(e, t, i) {
          var o,
            n = this.value(),
            a = this.values();
          this._hasMultipleValues() &&
            ((o = this.values(t ? 0 : 1)),
            (n = this.values(t)),
            2 === this.options.values.length &&
              !0 === this.options.range &&
              (i = 0 === t ? Math.min(o, i) : Math.max(o, i)),
            (a[t] = i)),
            i !== n &&
              !1 !== this._trigger('slide', e, this._uiHash(t, i, a)) &&
              (this._hasMultipleValues() ? this.values(t, i) : this.value(i));
        },
        _stop: function(e, t) {
          this._trigger('stop', e, this._uiHash(t));
        },
        _change: function(e, t) {
          this._keySliding ||
            this._mouseSliding ||
            ((this._lastChangedValue = t),
            this._trigger('change', e, this._uiHash(t)));
        },
        value: function(e) {
          return arguments.length
            ? ((this.options.value = this._trimAlignValue(e)),
              this._refreshValue(),
              void this._change(null, 0))
            : this._value();
        },
        values: function(t, i) {
          var o, n, a;
          if (arguments.length > 1)
            return (
              (this.options.values[t] = this._trimAlignValue(i)),
              this._refreshValue(),
              void this._change(null, t)
            );
          if (!arguments.length) return this._values();
          if (!e.isArray(arguments[0]))
            return this._hasMultipleValues() ? this._values(t) : this.value();
          for (
            o = this.options.values, n = arguments[0], a = 0;
            a < o.length;
            a += 1
          )
            (o[a] = this._trimAlignValue(n[a])), this._change(null, a);
          this._refreshValue();
        },
        _setOption: function(t, i) {
          var o,
            n = 0;
          switch (
            ('range' === t &&
              !0 === this.options.range &&
              ('min' === i
                ? ((this.options.value = this._values(0)),
                  (this.options.values = null))
                : 'max' === i &&
                  ((this.options.value = this._values(
                    this.options.values.length - 1
                  )),
                  (this.options.values = null))),
            e.isArray(this.options.values) && (n = this.options.values.length),
            this._super(t, i),
            t)
          ) {
            case 'orientation':
              this._detectOrientation(),
                this._removeClass(
                  'ui-slider-horizontal ui-slider-vertical'
                )._addClass('ui-slider-' + this.orientation),
                this._refreshValue(),
                this.options.range && this._refreshRange(i),
                this.handles.css('horizontal' === i ? 'bottom' : 'left', '');
              break;
            case 'value':
              (this._animateOff = !0),
                this._refreshValue(),
                this._change(null, 0),
                (this._animateOff = !1);
              break;
            case 'values':
              for (
                this._animateOff = !0, this._refreshValue(), o = n - 1;
                o >= 0;
                o--
              )
                this._change(null, o);
              this._animateOff = !1;
              break;
            case 'step':
            case 'min':
            case 'max':
              (this._animateOff = !0),
                this._calculateNewMax(),
                this._refreshValue(),
                (this._animateOff = !1);
              break;
            case 'range':
              (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
          }
        },
        _setOptionDisabled: function(e) {
          this._super(e), this._toggleClass(null, 'ui-state-disabled', !!e);
        },
        _value: function() {
          var e = this.options.value;
          return (e = this._trimAlignValue(e));
        },
        _values: function(e) {
          var t, i, o;
          if (arguments.length)
            return (t = this.options.values[e]), (t = this._trimAlignValue(t));
          if (this._hasMultipleValues()) {
            for (i = this.options.values.slice(), o = 0; o < i.length; o += 1)
              i[o] = this._trimAlignValue(i[o]);
            return i;
          }
          return [];
        },
        _trimAlignValue: function(e) {
          if (e <= this._valueMin()) return this._valueMin();
          if (e >= this._valueMax()) return this._valueMax();
          var t = this.options.step > 0 ? this.options.step : 1,
            i = (e - this._valueMin()) % t,
            o = e - i;
          return (
            2 * Math.abs(i) >= t && (o += i > 0 ? t : -t),
            parseFloat(o.toFixed(5))
          );
        },
        _calculateNewMax: function() {
          var e = this.options.max,
            t = this._valueMin(),
            i = this.options.step;
          (e = Math.round((e - t) / i) * i + t),
            e > this.options.max && (e -= i),
            (this.max = parseFloat(e.toFixed(this._precision())));
        },
        _precision: function() {
          var e = this._precisionOf(this.options.step);
          return (
            null !== this.options.min &&
              (e = Math.max(e, this._precisionOf(this.options.min))),
            e
          );
        },
        _precisionOf: function(e) {
          var t = '' + e,
            i = t.indexOf('.');
          return -1 === i ? 0 : t.length - i - 1;
        },
        _valueMin: function() {
          return this.options.min;
        },
        _valueMax: function() {
          return this.max;
        },
        _refreshRange: function(e) {
          'vertical' === e && this.range.css({ width: '', left: '' }),
            'horizontal' === e && this.range.css({ height: '', bottom: '' });
        },
        _refreshValue: function() {
          var t,
            i,
            o,
            n,
            a,
            s = this.options.range,
            r = this.options,
            l = this,
            p = !this._animateOff && r.animate,
            d = {};
          this._hasMultipleValues()
            ? this.handles.each(function(o) {
                (i =
                  ((l.values(o) - l._valueMin()) /
                    (l._valueMax() - l._valueMin())) *
                  100),
                  (d['horizontal' === l.orientation ? 'left' : 'bottom'] =
                    i + '%'),
                  e(this)
                    .stop(1, 1)
                    [p ? 'animate' : 'css'](d, r.animate),
                  !0 === l.options.range &&
                    ('horizontal' === l.orientation
                      ? (0 === o &&
                          l.range
                            .stop(1, 1)
                            [p ? 'animate' : 'css'](
                              { left: i + '%' },
                              r.animate
                            ),
                        1 === o &&
                          l.range[p ? 'animate' : 'css'](
                            { width: i - t + '%' },
                            { queue: !1, duration: r.animate }
                          ))
                      : (0 === o &&
                          l.range
                            .stop(1, 1)
                            [p ? 'animate' : 'css'](
                              { bottom: i + '%' },
                              r.animate
                            ),
                        1 === o &&
                          l.range[p ? 'animate' : 'css'](
                            { height: i - t + '%' },
                            { queue: !1, duration: r.animate }
                          ))),
                  (t = i);
              })
            : ((o = this.value()),
              (n = this._valueMin()),
              (a = this._valueMax()),
              (i = a !== n ? ((o - n) / (a - n)) * 100 : 0),
              (d['horizontal' === this.orientation ? 'left' : 'bottom'] =
                i + '%'),
              this.handle.stop(1, 1)[p ? 'animate' : 'css'](d, r.animate),
              'min' === s &&
                'horizontal' === this.orientation &&
                this.range
                  .stop(1, 1)
                  [p ? 'animate' : 'css']({ width: i + '%' }, r.animate),
              'max' === s &&
                'horizontal' === this.orientation &&
                this.range
                  .stop(1, 1)
                  [p ? 'animate' : 'css']({ width: 100 - i + '%' }, r.animate),
              'min' === s &&
                'vertical' === this.orientation &&
                this.range
                  .stop(1, 1)
                  [p ? 'animate' : 'css']({ height: i + '%' }, r.animate),
              'max' === s &&
                'vertical' === this.orientation &&
                this.range
                  .stop(1, 1)
                  [p ? 'animate' : 'css'](
                    { height: 100 - i + '%' },
                    r.animate
                  ));
        },
        _handleEvents: {
          keydown: function(t) {
            var i,
              o,
              n,
              a = e(t.target).data('ui-slider-handle-index');
            switch (t.keyCode) {
              case e.ui.keyCode.HOME:
              case e.ui.keyCode.END:
              case e.ui.keyCode.PAGE_UP:
              case e.ui.keyCode.PAGE_DOWN:
              case e.ui.keyCode.UP:
              case e.ui.keyCode.RIGHT:
              case e.ui.keyCode.DOWN:
              case e.ui.keyCode.LEFT:
                if (
                  (t.preventDefault(),
                  !this._keySliding &&
                    ((this._keySliding = !0),
                    this._addClass(e(t.target), null, 'ui-state-active'),
                    !1 === this._start(t, a)))
                )
                  return;
            }
            switch (
              ((n = this.options.step),
              (i = o = this._hasMultipleValues()
                ? this.values(a)
                : this.value()),
              t.keyCode)
            ) {
              case e.ui.keyCode.HOME:
                o = this._valueMin();
                break;
              case e.ui.keyCode.END:
                o = this._valueMax();
                break;
              case e.ui.keyCode.PAGE_UP:
                o = this._trimAlignValue(
                  i + (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case e.ui.keyCode.PAGE_DOWN:
                o = this._trimAlignValue(
                  i - (this._valueMax() - this._valueMin()) / this.numPages
                );
                break;
              case e.ui.keyCode.UP:
              case e.ui.keyCode.RIGHT:
                if (i === this._valueMax()) return;
                o = this._trimAlignValue(i + n);
                break;
              case e.ui.keyCode.DOWN:
              case e.ui.keyCode.LEFT:
                if (i === this._valueMin()) return;
                o = this._trimAlignValue(i - n);
            }
            this._slide(t, a, o);
          },
          keyup: function(t) {
            var i = e(t.target).data('ui-slider-handle-index');
            this._keySliding &&
              ((this._keySliding = !1),
              this._stop(t, i),
              this._change(t, i),
              this._removeClass(e(t.target), null, 'ui-state-active'));
          },
        },
      });
    });
  },
  874: function(e, t, i) {
    'use strict';
    var o, n, a;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'TabPriority', function() {
        return o;
      }),
      i.d(t, 'TabNames', function() {
        return n;
      }),
      i.d(t, 'TabOpenFrom', function() {
        return a;
      }),
      (function(e) {
        (e[(e.Coordinates = 100)] = 'Coordinates'),
          (e[(e.Display = 100)] = 'Display'),
          (e[(e.Style = 200)] = 'Style'),
          (e[(e.Inputs = 300)] = 'Inputs'),
          (e[(e.Properties = 250)] = 'Properties');
      })(o || (o = {})),
      (function(e) {
        (e.background = 'Background'),
          (e.coordinates = 'Coordinates'),
          (e.drawings = 'Drawings'),
          (e.events = 'Events'),
          (e.eventsAndAlerts = 'Events & Alerts'),
          (e.inputs = 'Inputs'),
          (e.properties = 'Properties'),
          (e.scales = 'Scales'),
          (e.sourceCode = 'Source Code'),
          (e.style = 'Style'),
          (e.timezoneSessions = 'Timezone/Sessions'),
          (e.trading = 'Trading'),
          (e.visibility = 'Visibility');
      })(n || (n = {})),
      (function(e) {
        (e[(e.Default = 100)] = 'Default'),
          (e[(e.UserSave = 200)] = 'UserSave'),
          (e[(e.Override = 300)] = 'Override');
      })(a || (a = {}));
  },
  964: function(e, t, i) {
    'use strict';
    (function(t) {
      function o(e, i, o) {
        var n = {
          saveAsText: $.t('Save As...'),
          applyDefaultText: $.t('Apply Defaults'),
        };
        (this._toolName = e),
          (this._applyTemplate = i),
          (this._options = $.extend(n, o || {})),
          (this._list = []),
          t.enabled('charting_library_base') ||
            (this.templatesDeferred = this.loadData());
      }
      var n = i(847).bindPopupMenu,
        a = i(196),
        s = a.SaveRenameDialog,
        r = a.InputField,
        l = i(82).createConfirmDialog,
        p = i(4).getLogger('Chart.LineToolTemplatesList');
      (o._cache = {}),
        (o.prototype.getData = function() {
          return this._list;
        }),
        (o.prototype.loadData = function() {
          var e = this;
          return this._toolName in o._cache
            ? ((this._list = o._cache[this._toolName]), $.Deferred().resolve())
            : $.get('/drawing-templates/' + this._toolName + '/', function(t) {
                (e._list = t), (o._cache[e._toolName] = t);
              }).error(function() {
                p.logWarn('Failed to load drawing template: ' + e._toolName);
              });
        }),
        (o.prototype.templatesLoaded = function() {
          return this.templatesDeferred;
        }),
        (o.prototype.invalidateToolCache = function() {
          delete o._cache[this._toolName];
        }),
        (o.prototype.createButton = function(e) {
          var t,
            i = this;
          return (
            (e = $.extend({}, e, i._options)),
            (t = $('<a></span></a>')
              .addClass(e.buttonClass ? e.buttonClass : '_tv-button')
              .html(
                e.buttonInner
                  ? e.buttonInner
                  : $.t('Template') + '<span class="icon-dropdown">'
              )),
            n(t, null, {
              event: 'button-popup',
              hideEvent: 'hide-popup',
              zIndex: e.popupZIndex,
              activeClass: e.popupActiveClass,
              direction: e.popupDirection,
            }),
            t.bind('click', function(t) {
              var o, n, a;
              t.stopPropagation(),
                $(this).is('active') ||
                  ((o = []),
                  'function' == typeof e.getDataForSaveAs &&
                    ((n = function(t) {
                      var o = JSON.stringify(e.getDataForSaveAs());
                      i.saveTemplate(t, o);
                    }),
                    o.push({
                      title: e.saveAsText,
                      action: i.showSaveDialog.bind(i, n),
                      addClass: 'special',
                    })),
                  'function' == typeof e.defaultsCallback &&
                    o.push({
                      title: e.applyDefaultText,
                      action: e.defaultsCallback,
                      addClass: 'special',
                    }),
                  (a = []),
                  $.each(i._list, function(t, o) {
                    a.push({
                      title: o,
                      action: function() {
                        i.loadTemplate.call(i, o, e.loadTemplateCallback);
                      },
                      deleteAction: function() {
                        runOrSignIn(
                          function() {
                            var e = $.t(
                              "Do you really want to delete Drawing Template '{0}' ?"
                            ).format(o);
                            l({ type: 'modal', content: e }).then(function(e) {
                              e.on('action:yes', function(e) {
                                i.removeTemplate.call(i, o), e.close();
                              }),
                                e.open();
                            });
                          },
                          {
                            source: 'Delete line tool template',
                          }
                        );
                      },
                    });
                  }),
                  a.length &&
                    (a.sort(function(e, t) {
                      return (
                        (e = e.title.toUpperCase()),
                        (t = t.title.toUpperCase()),
                        e === t ? 0 : e > t ? 1 : -1
                      );
                    }),
                    o.push({ separator: !0 }),
                    (o = o.concat(a))),
                  $(this).trigger('button-popup', [o]));
            }),
            t
          );
        }),
        (o.prototype.loadTemplate = function(e, t) {
          var i = this;
          return $.get(
            '/drawing-template/' +
              this._toolName +
              '/?templateName=' +
              encodeURIComponent(e),
            function(e) {
              i._applyTemplate(JSON.parse(e.content)), t && t();
            }
          ).error(function(e) {
            p.logWarn(e.responseText);
          });
        }),
        (o.prototype.removeTemplate = function(e) {
          if (e) {
            var t = this;
            $.post('/remove-drawing-template/', {
              name: e,
              tool: t._toolName,
            }).error(function(e) {
              p.logWarn(e.responseText);
            }),
              t.invalidateToolCache(),
              (t._list = $.grep(t._list, function(t) {
                return t !== e;
              }));
          }
        }),
        (o.prototype.saveTemplate = function(e, t) {
          var i,
            o = this;
          e &&
            t &&
            ((e = TradingView.clean(e)),
            (i = -1 !== $.inArray(e, o._list)),
            (function() {
              var n = { name: e, tool: o._toolName, content: t },
                a = function() {
                  i || o._list.push(e);
                };
              $.post('/save-drawing-template/', n, a).error(function(e) {
                p.logWarn(e.responseText);
              }),
                o.invalidateToolCache();
            })());
        }),
        (o.prototype.deleteAction = function(e) {
          var t = e,
            i = this;
          runOrSignIn(
            function() {
              var e = $.t(
                " Do you really want to delete Drawing Template '{0}' ?"
              ).format(t);
              l({ type: 'modal', content: e }).then(function(e) {
                e.on('action:yes', function(e) {
                  i.removeTemplate.call(i, t), e.close();
                }),
                  e.open();
              });
            },
            { source: 'Delete line tool template' }
          );
        }),
        (o.prototype.showSaveDialog = function(e) {
          var t = this,
            i = 'text',
            o = function(e) {
              return TradingView.clean(e[i]);
            },
            n = new s({
              fields: [
                new r({
                  name: i,
                  label: $.t('Template name') + ':',
                  maxLength: 64,
                  error: $.t('Please enter template name'),
                }),
              ],
              title: $.t('Save Drawing Template As'),
              confirm: {
                shouldShowDialog: function(e) {
                  return -1 !== t._list.indexOf(o(e));
                },
                getMessage: function(e) {
                  return $.t(
                    "Drawing Template '{0}' already exists. Do you really want to replace it?"
                  ).format(o(e));
                },
              },
            });
          runOrSignIn(
            function() {
              n.show().then(function(t) {
                e(t[i]);
              });
            },
            { source: 'Save line tool template', sourceMeta: 'Chart' }
          );
        }),
        (e.exports = o);
    }.call(t, i(5)));
  },
  976: function(e, t, i) {
    'use strict';
    function o(e) {
      return 'alwaysOn' === e || 'alwaysOff' === e ? e : 'visibleOnMouseOver';
    }
    function n() {
      if (!h) {
        var e = 'NavigationButtons.visibility';
        (h = new p.a()),
          h.setValue(o(d.getValue(e))),
          h.subscribe(h, function(t) {
            d.setValue(e, o(t.value()));
          });
      }
      return h;
    }
    function a() {
      return [
        {
          value: 'visibleOnMouseOver',
          title: window.t('Visible on Mouse Over'),
        },
        { value: 'alwaysOn', title: window.t('Always Visible') },
        { value: 'alwaysOff', title: window.t('Always Invisible') },
      ];
    }
    function s() {
      var e, t;
      return (
        c ||
          ((c = new p.a()),
          (e = n()),
          (t = function() {
            var t = e.value();
            'alwaysOn' !== t &&
              'alwaysOff' !== t &&
              (t = Modernizr.touch ? 'alwaysOn' : 'visibleOnMouseOver'),
              c && c.setValue(t);
          }),
          e.subscribe(c, t),
          t()),
        c
      );
    }
    var r, l, p, d, h, c;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.property = n),
      (t.availableValues = a),
      (t.actualBehavior = s),
      i(11),
      (r = i(127)),
      i.n(r),
      (l = i(13)),
      (p = i.n(l)),
      (d = i(49)),
      i.n(d);
  },
});
