webpackJsonp([0], {
  1014: function(e, t, i) {
    'use strict';
    function n(e, t, i, n) {
      return null !== e
        ? Object(a.intersectPolygonAndHalfplane)(
            e,
            Object(r.halfplaneThroughPoint)(
              Object(r.lineThroughPoints)(t, i),
              n
            )
          )
        : null;
    }
    var s, r, o, a, l, h, d, c, p;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'ParallelChannelRenderer', function() {
        return p;
      }),
      (s = i(7)),
      i.n(s),
      (r = i(6)),
      i.n(r),
      (o = i(30)),
      i.n(o),
      (a = i(129)),
      i.n(a),
      (l = i(46)),
      i.n(l),
      (h = i(9)),
      (d = i(27)),
      (c = i(29)),
      (p = (function() {
        function e(e, t) {
          (this._data = null),
            (this._hittestResult =
              e || new h.HitTestResult(h.HitTestResult.MOVEPOINT)),
            (this._backHittestResult =
              t || new h.HitTestResult(h.HitTestResult.MOVEPOINT_BACKGROUND));
        }
        return (
          (e.prototype.setData = function(e) {
            this._data = e;
          }),
          (e.prototype.draw = function(e) {
            var t, i, n, s, r, o, a, h;
            null === this._data ||
              this._data.points.length < 2 ||
              ((e.lineCap = 'butt'),
              (e.strokeStyle = this._data.color),
              (e.lineWidth = this._data.linewidth),
              Object(l.setLineStyle)(e, this._data.linestyle),
              (t = this._data.points),
              (i = t[0]),
              (n = t[1]),
              this._data.skipLines || this._extendAndDrawLineSegment(e, i, n),
              4 === this._data.points.length &&
                ((s = this._data.points),
                (r = s[2]),
                (o = s[3]),
                this._data.skipLines ||
                  this._data.skipTopLine ||
                  this._extendAndDrawLineSegment(e, r, o),
                this._data.fillBackground &&
                  this._drawBackground(e, this._data.points),
                this._data.showMidline &&
                  !this._data.skipLines &&
                  ((e.strokeStyle = this._data.midcolor),
                  (e.lineWidth = this._data.midlinewidth),
                  Object(l.setLineStyle)(e, this._data.midlinestyle),
                  (a = i.add(r).scaled(0.5)),
                  (h = n.add(o).scaled(0.5)),
                  this._extendAndDrawLineSegment(e, a, h))));
          }),
          (e.prototype.hitTest = function(e) {
            var t, i, n, s, r, o, a, l, h, d, c;
            if (null === this._data || this._data.points.length < 2)
              return null;
            if (
              ((t = this._data.points),
              (i = t[0]),
              (n = t[1]),
              null !== (s = this._extendAndHitTestLineSegment(e, i, n)))
            )
              return s;
            if (4 === this._data.points.length && !this._data.skipTopLine) {
              if (
                ((r = this._data.points),
                (o = r[2]),
                (a = r[3]),
                null !== (l = this._extendAndHitTestLineSegment(e, o, a)))
              )
                return l;
              if (
                this._data.showMidline &&
                !this._data.skipLines &&
                ((h = i.add(o).scaled(0.5)),
                (d = n.add(a).scaled(0.5)),
                null !== (c = this._extendAndHitTestLineSegment(e, h, d)))
              )
                return c;
            }
            return this._data.hittestOnBackground && this._data.fillBackground
              ? this._hitTestBackground(e)
              : null;
          }),
          (e.prototype._getColor = function() {
            var e = Object(s.ensureNotNull)(this._data);
            return Object(c.generateColor)(e.backcolor, e.transparency);
          }),
          (e.prototype._extendAndDrawLineSegment = function(e, t, i) {
            var n = this._extendAndClipLineSegment(t, i);
            null !== n && Object(l.drawLine)(e, n[0].x, n[0].y, n[1].x, n[1].y);
          }),
          (e.prototype._extendAndHitTestLineSegment = function(e, t, i) {
            var n,
              s = this._extendAndClipLineSegment(t, i);
            return null !== s &&
              ((n = Object(o.distanceToSegment)(s[0], s[1], e)),
              n.distance <= 3)
              ? this._hittestResult
              : null;
          }),
          (e.prototype._extendAndClipLineSegment = function(e, t) {
            var i = Object(s.ensureNotNull)(this._data);
            return Object(d.extendAndClipLineSegment)(
              e,
              t,
              i.width,
              i.height,
              i.extendleft,
              i.extendright
            );
          }),
          (e.prototype._drawBackground = function(e, t) {
            var i,
              a,
              l,
              h = Object(s.ensureNotNull)(this._data),
              d = t[0],
              c = t[1],
              p = t[2],
              u = t[3];
            if (
              !(
                Object(r.equalPoints)(d, c) ||
                Object(r.equalPoints)(p, u) ||
                Object(o.distanceToLine)(d, c, p).distance < 1e-6 ||
                Object(o.distanceToLine)(d, c, u).distance < 1e-6 ||
                h.width <= 0 ||
                h.height <= 0 ||
                ((i = [
                  new r.Point(0, 0),
                  new r.Point(h.width, 0),
                  new r.Point(h.width, h.height),
                  new r.Point(0, h.height),
                ]),
                (a = i),
                (a = n(a, d, c, u)),
                h.extendright || (a = n(a, c, u, p)),
                (a = n(a, u, p, d)),
                h.extendleft || (a = n(a, p, d, c)),
                null === a)
              )
            ) {
              for (
                e.beginPath(), e.moveTo(a[0].x, a[0].y), l = 1;
                l < a.length;
                l++
              )
                e.lineTo(a[l].x, a[l].y);
              (e.fillStyle = this._getColor()), e.fill();
            }
          }),
          (e.prototype._hitTestBackground = function(e) {
            var t,
              i,
              n,
              r,
              o,
              a,
              l,
              h,
              d,
              c,
              p,
              u = Object(s.ensureNotNull)(this._data);
            return 4 !== u.points.length
              ? null
              : ((t = u.points),
                (i = t[0]),
                (n = t[1]),
                (r = t[2]),
                (o = (n.y - i.y) / (n.x - i.x)),
                (a = i.y + o * (e.x - i.x)),
                (l = r.y + o * (e.x - r.x)),
                (h = Math.max(a, l)),
                (d = Math.min(a, l)),
                (c = Math.min(i.x, n.x)),
                (p = Math.max(i.x, n.x)),
                !u.extendleft && e.x < c
                  ? null
                  : !u.extendright && e.x > p
                  ? null
                  : e.y >= d && e.y <= h
                  ? this._backHittestResult
                  : null);
          }),
          e
        );
      })());
  },
  1032: function(e, t, i) {
    'use strict';
    var n, s, r;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'ArcWedgeRenderer', function() {
        return r;
      }),
      (n = i(9)),
      (s = i(29)),
      (r = (function() {
        function e() {
          (this._data = null),
            (this._hitTest = new n.HitTestResult(n.HitTestResult.MOVEPOINT)),
            (this._backHitTest = new n.HitTestResult(
              n.HitTestResult.MOVEPOINT_BACKGROUND
            ));
        }
        return (
          (e.prototype.setData = function(e) {
            this._data = e;
          }),
          (e.prototype.setHitTest = function(e) {
            this._hitTest = e;
          }),
          (e.prototype.draw = function(e) {
            if (
              null !== this._data &&
              ((e.strokeStyle = this._data.color),
              (e.lineWidth = this._data.linewidth),
              e.beginPath(),
              e.arc(
                this._data.center.x,
                this._data.center.y,
                this._data.radius,
                this._data.edge1,
                this._data.edge2,
                !0
              ),
              e.stroke(),
              this._data.fillBackground)
            ) {
              if (
                (e.arc(
                  this._data.center.x,
                  this._data.center.y,
                  this._data.prevRadius,
                  this._data.edge2,
                  this._data.edge1,
                  !1
                ),
                this._data.gradient)
              ) {
                var t = e.createRadialGradient(
                  this._data.center.x,
                  this._data.center.y,
                  this._data.prevRadius,
                  this._data.center.x,
                  this._data.center.y,
                  this._data.radius
                );
                t.addColorStop(
                  0,
                  Object(s.generateColor)(
                    this._data.color1,
                    this._data.transparency
                  )
                ),
                  t.addColorStop(
                    1,
                    Object(s.generateColor)(
                      this._data.color2,
                      this._data.transparency
                    )
                  ),
                  (e.fillStyle = t);
              } else
                e.fillStyle = Object(s.generateColor)(
                  this._data.color,
                  this._data.transparency,
                  !0
                );
              e.fill();
            }
          }),
          (e.prototype.hitTest = function(e) {
            var t, i, n, s, r, o, a, l, h, d, c, p;
            return null === this._data
              ? null
              : ((t = e.subtract(this._data.center)),
                (i = t.length()),
                Math.abs(i - this._data.radius) <= 4 &&
                ((n = e.subtract(this._data.p1).length()),
                (s = e.subtract(this._data.p2).length()),
                (r = Math.max(n, s)),
                (o = this._data.p1.subtract(this._data.p2).length()),
                r <= o)
                  ? this._hitTest
                  : this._data.fillBackground &&
                    i <= this._data.radius &&
                    ((a = this._data.p1
                      .subtract(this._data.center)
                      .normalized()),
                    (l = this._data.p2
                      .subtract(this._data.center)
                      .normalized()),
                    (h = t.normalized()),
                    (d = a.dotProduct(l)),
                    (c = h.dotProduct(a)),
                    (p = h.dotProduct(l)),
                    c >= d && p >= d)
                  ? this._backHitTest
                  : null);
          }),
          e
        );
      })());
  },
  1033: function(e, t, i) {
    'use strict';
    var n, s, r, o, a, l;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'EllipseRendererSimple', function() {
        return l;
      }),
      (n = i(9)),
      (s = i(50)),
      (r = i(6)),
      i.n(r),
      (o = i(29)),
      (a = i(46)),
      i.n(a),
      (l = (function() {
        function e(e, t, i) {
          (this._data = e),
            (this._hitTest =
              t || new n.HitTestResult(n.HitTestResult.MOVEPOINT)),
            (this._backgroundHitTest =
              i || new n.HitTestResult(n.HitTestResult.MOVEPOINT_BACKGROUND));
        }
        return (
          (e.prototype.draw = function(e) {
            var t, i, n, s, r, l, h, d;
            (e.lineCap = 'butt'),
              (e.strokeStyle = this._data.color),
              (e.lineWidth = this._data.linewidth),
              void 0 !== this._data.linestyle &&
                Object(a.setLineStyle)(e, this._data.linestyle),
              (t = this._data.points[0]),
              (i = this._data.points[1]),
              (n = Math.abs(t.x - i.x)),
              (s = Math.abs(t.y - i.y)),
              (r = t.add(i).scaled(0.5)),
              n < 1 ||
                s < 1 ||
                ((l = 0),
                this._data.wholePoints &&
                  ((h = this._data.wholePoints[0]),
                  (d = this._data.wholePoints[1]),
                  (l = Math.abs(h.x - d.x))),
                e.save(),
                e.translate(r.x, r.y),
                e.scale(1, s / n),
                e.beginPath(),
                e.arc(0, 0, n / 2, 0, 2 * Math.PI, !1),
                e.restore(),
                e.stroke(),
                this._data.fillBackground &&
                  (this._data.wholePoints &&
                    (e.translate(r.x, r.y),
                    e.scale(1, s / n),
                    e.arc(0, 0, l / 2, 0, 2 * Math.PI, !0)),
                  (e.fillStyle = Object(o.generateColor)(
                    this._data.backcolor,
                    this._data.transparency,
                    !0
                  )),
                  e.fill()));
          }),
          (e.prototype.hitTest = function(e) {
            var t, i, n, o, a, l, h, d, c, p;
            return this._data.points.length < 2
              ? null
              : ((t = this._data.points[0]),
                (i = this._data.points[1]),
                (n = 0.5 * Math.abs(t.x - i.x)),
                (o = Math.abs(t.x - i.x)),
                (a = Math.abs(t.y - i.y)),
                (l = t.add(i).scaled(0.5)),
                (h = e.subtract(l)),
                o < 1 || a < 1
                  ? null
                  : ((d = (i.y - t.y) / (i.x - t.x)),
                    (h = new r.Point(h.x, h.y / d)),
                    (c = h.x * h.x + h.y * h.y),
                    (p = c - n * n),
                    (p = Object(s.sign)(p) * Math.sqrt(Math.abs(p / n))),
                    Math.abs(p) < 3
                      ? this._hitTest
                      : this._data.fillBackground &&
                        !this._data.noHitTestOnBackground &&
                        p < 3
                      ? this._backgroundHitTest
                      : null));
          }),
          e
        );
      })());
  },
  1034: function(e, t, i) {
    'use strict';
    var n, s, r, o;
    i.d(t, 'a', function() {
      return o;
    }),
      (n = i(6)),
      i.n(n),
      (s = i(29)),
      (r = i(9)),
      (o = (function() {
        function e() {
          this._data = null;
        }
        return (
          (e.prototype.setData = function(e) {
            this._data = e;
          }),
          (e.prototype.draw = function(e) {
            var t, i, r, o, a, l;
            null !== this._data &&
              ((e.lineCap = 'butt'),
              (e.strokeStyle = this._data.color),
              (e.lineWidth = this._data.linewidth),
              e.translate(this._data.center.x, this._data.center.y),
              (t = this._data.edge.subtract(this._data.center)),
              (i = t.y / t.x),
              (r = this._data.point.subtract(this._data.center)),
              (r = new n.Point(r.x, r.y / i)),
              (o = r.length()),
              (a = this._data.prevPoint.subtract(this._data.center)),
              (a = new n.Point(a.x, a.y / i)),
              (l = a.length()),
              e.scale(1, i),
              this._data.fillBack &&
                (this._data.point.x < this._data.center.x &&
                  ((o = -o), (l = -l)),
                e.beginPath(),
                e.moveTo(l, 0),
                e.lineTo(o, 0),
                e.arcTo(o, o, 0, o, Math.abs(o)),
                e.lineTo(0, l),
                e.arcTo(l, l, l, 0, Math.abs(l)),
                (e.fillStyle = Object(s.generateColor)(
                  this._data.color,
                  this._data.transparency,
                  !0
                )),
                e.fill()),
              e.beginPath(),
              this._data.point.x > this._data.center.x
                ? e.arc(0, 0, Math.abs(o), 0, Math.PI / 2, !1)
                : e.arc(0, 0, Math.abs(o), -Math.PI / 2, -Math.PI, !0),
              e.scale(1, 1 / i),
              e.stroke());
          }),
          (e.prototype.hitTest = function(e) {
            var t, i, s, o, a, l, h;
            return null === this._data
              ? null
              : ((e = e.subtract(this._data.center)),
                (t = this._data.edge.subtract(this._data.center)),
                (i = t.y / t.x),
                (e = new n.Point(e.x, e.y / i)),
                (s = this._data.point.subtract(this._data.center)),
                (s = new n.Point(s.x, s.y / i)),
                (o = s.length()),
                (a = e.length()),
                (l = this._data.prevPoint.subtract(this._data.center)),
                (l = new n.Point(l.x, l.y / i)),
                (h = l.length()),
                Math.abs(a - o) < 5 && t.x * e.x >= 0 && t.y * e.y >= 0
                  ? new r.HitTestResult(r.HitTestResult.MOVEPOINT)
                  : this._data.fillBack &&
                    a >= h &&
                    a <= o &&
                    t.x * e.x >= 0 &&
                    t.y * e.y >= 0
                  ? new r.HitTestResult(r.HitTestResult.MOVEPOINT_BACKGROUND)
                  : null);
          }),
          e
        );
      })());
  },
  1035: function(e, t, i) {
    'use strict';
    function n(e, t, i, n) {
      var s = Object(l.equalPoints)(i, n[0])
        ? Object(l.equalPoints)(i, n[1])
          ? null
          : n[1]
        : n[0];
      return null !== e && null !== s
        ? Object(c.intersectPolygonAndHalfplane)(
            e,
            Object(l.halfplaneThroughPoint)(
              Object(l.lineThroughPoints)(t, i),
              s
            )
          )
        : null;
    }
    function s(e) {
      return Object(l.line)(1, 0, -e);
    }
    function r(e, t, i) {
      return null !== e
        ? Object(c.intersectPolygonAndHalfplane)(
            e,
            Object(l.halfplaneThroughPoint)(s(t), new l.Point(i, 0))
          )
        : null;
    }
    function o(e, t) {
      var i = t.points,
        n = i[0],
        s = i[1];
      return (
        t.extendleft || (e = r(e, n.x, s.x)),
        t.extendright || (e = r(e, s.x, n.x)),
        e
      );
    }
    var a, l, h, d, c, p, u, _, f, g, v;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'DisjointAngleRenderer', function() {
        return g;
      }),
      (a = i(7)),
      i.n(a),
      (l = i(6)),
      i.n(l),
      (h = i(60)),
      i.n(h),
      (d = i(30)),
      i.n(d),
      (c = i(129)),
      i.n(c),
      (p = i(84)),
      (u = i(9)),
      (_ = i(1014)),
      (f = i(29)),
      (g = (function() {
        function e() {
          (this._parallelChannelRenderer = new _.ParallelChannelRenderer()),
            (this._disjointAngleIntersectionRenderer = new v()),
            (this._selectedRenderer = this._disjointAngleIntersectionRenderer);
        }
        return (
          (e.prototype.setData = function(e) {
            var t, i, n, s, r, o, a;
            e.points.length < 4 ||
              ((t = e.points),
              (i = t[0]),
              (n = t[1]),
              (s = t[2]),
              (r = t[3]),
              (o =
                Object(l.equalPoints)(i, n) ||
                Object(l.equalPoints)(s, r) ||
                (Object(d.distanceToLine)(i, n, s).distance < 1e-6 &&
                  Object(d.distanceToLine)(i, n, r).distance < 1e-6)),
              o
                ? (this._selectedRenderer = null)
                : ((a = Object(c.intersectLines)(
                    Object(l.lineThroughPoints)(i, n),
                    Object(l.lineThroughPoints)(s, r)
                  )),
                  null !== a
                    ? (this._disjointAngleIntersectionRenderer.setData(e),
                      (this._selectedRenderer = this._disjointAngleIntersectionRenderer))
                    : (this._parallelChannelRenderer.setData({
                        width: e.width,
                        height: e.height,
                        extendleft: e.extendleft,
                        extendright: e.extendright,
                        points: [i, n, r, s],
                        fillBackground: !0,
                        backcolor: e.backcolor,
                        transparency: e.transparency,
                        color: 'rgba(0,0,0,0)',
                        linestyle: p.LINESTYLE_SOLID,
                        linewidth: 0,
                        showMidline: !1,
                        hittestOnBackground: e.hittestOnBackground,
                      }),
                      (this._selectedRenderer = this._parallelChannelRenderer))));
          }),
          (e.prototype.draw = function(e) {
            null !== this._selectedRenderer && this._selectedRenderer.draw(e);
          }),
          (e.prototype.hitTest = function(e) {
            return null !== this._selectedRenderer
              ? this._selectedRenderer.hitTest(e)
              : null;
          }),
          e
        );
      })()),
      (v = (function() {
        function e() {
          this._data = null;
        }
        return (
          (e.prototype.setData = function(e) {
            this._data = e;
          }),
          (e.prototype.draw = function(e) {
            var t, i, n, s;
            if (!(null === this._data || this._data.points.length < 4))
              for (
                e.fillStyle = Object(f.generateColor)(
                  this._data.backcolor,
                  this._data.transparency
                ),
                  t = 0,
                  i = this._visiblePolygons();
                t < i.length;
                t++
              ) {
                for (
                  n = i[t], e.beginPath(), e.moveTo(n[0].x, n[0].y), s = 1;
                  s < n.length;
                  s++
                )
                  e.lineTo(n[s].x, n[s].y);
                e.fill();
              }
          }),
          (e.prototype.hitTest = function(e) {
            var t, i, n;
            if (null === this._data || !this._data.hittestOnBackground)
              return null;
            for (t = 0, i = this._visiblePolygons(); t < i.length; t++)
              if (((n = i[t]), Object(h.pointInPolygon)(e, n)))
                return new u.HitTestResult(
                  u.HitTestResult.MOVEPOINT_BACKGROUND
                );
            return null;
          }),
          (e.prototype._visiblePolygons = function() {
            var e,
              t,
              i,
              s,
              r,
              h,
              d,
              p,
              u = Object(a.ensureNotNull)(this._data),
              _ = u.points,
              f = _[0],
              g = _[1],
              v = _[2],
              w = _[3];
            return u.width <= 0 || u.height <= 0
              ? []
              : null ===
                (e = Object(c.intersectLines)(
                  Object(l.lineThroughPoints)(f, g),
                  Object(l.lineThroughPoints)(v, w)
                ))
              ? []
              : ((t = [
                  new l.Point(0, 0),
                  new l.Point(u.width, 0),
                  new l.Point(u.width, u.height),
                  new l.Point(0, u.height),
                ]),
                (i = []),
                (s = t),
                (r = f.subtract(g).add(e)),
                (h = w.subtract(v).add(e)),
                (s = n(s, e, r, [h, h])),
                (s = o(s, u)),
                null !== (s = n(s, h, e, [r, r])) && i.push(s),
                (s = t),
                (d = g.subtract(f).add(e)),
                (p = v.subtract(w).add(e)),
                (s = n(s, e, d, [p, p])),
                (s = o(s, u)),
                null !== (s = n(s, p, e, [d, d])) && i.push(s),
                i);
          }),
          e
        );
      })());
  },
  1036: function(e, t, i) {
    'use strict';
    e.exports = function(e, t) {
      var i = document.body,
        n = i[e];
      return (
        n || ((n = document.createElement('img')), (n.src = t), (i[e] = n)), n
      );
    };
  },
  1037: function(e, t, i) {
    'use strict';
    function n(e, t, i, n) {
      var s,
        r,
        o,
        a,
        l,
        h = i.subtract(e).length() + i.subtract(t).length(),
        d = 3 / h;
      for (s = 0; s <= 1; s += d)
        if (
          ((r = e.scaled((1 - s) * (1 - s))),
          (o = i.scaled(2 * s * (1 - s))),
          (a = t.scaled(s * s)),
          (l = r.add(o).add(a)),
          l.subtract(n).length() < 5)
        )
          return !0;
      return !1;
    }
    function s(e, t, i, n, s) {
      var r,
        o,
        a,
        l,
        h,
        d,
        c =
          i.subtract(e).length() +
          n.subtract(i).length() +
          t.subtract(n).length(),
        p = 3 / c;
      for (r = 0; r <= 1; r += p)
        if (
          ((o = e.scaled((1 - r) * (1 - r) * (1 - r))),
          (a = i.scaled(3 * (1 - r) * (1 - r) * r)),
          (l = n.scaled(3 * (1 - r) * r * r)),
          (h = t.scaled(r * r * r)),
          (d = o
            .add(a)
            .add(l)
            .add(h)),
          d.subtract(s).length() < 5)
        )
          return !0;
      return !1;
    }
    function r(e, t, i, n, s) {
      var r,
        o,
        a,
        l,
        h,
        d,
        c,
        p,
        u,
        _ = i.subtract(e).length() + i.subtract(t).length();
      if (!_) return [];
      for (r = 3 / _, o = 500, a = [], l = 1; l <= o * r; l += r)
        (h = e.scaled((1 - l) * (1 - l))),
          (d = i.scaled(2 * l * (1 - l))),
          (c = t.scaled(l * l)),
          (p = h.add(d).add(c)),
          a.length > 0 &&
            ((u = a[a.length - 1]), u.subtract(p).length() < 2 && (r *= 2)),
          a.push(p);
      return a;
    }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.quadroBezierHitTest = n),
      (t.cubicBezierHitTest = s),
      (t.extendQuadroBezier = r);
  },
  1038: function(e, t, i) {
    'use strict';
    function n(e, t) {
      void 0 === t && (t = '&nbsp;');
      var i = (e + '').split('.');
      return (
        i[0].replace(/\B(?=(\d{3})+(?!\d))/g, t) + (i[1] ? '.' + i[1] : '')
      );
    }
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.splitThousands = n);
  },
  213: function(e, t, i) {
    'use strict';
    function n(e, t) {
      p.call(this, e, t), (this._invalidated = !0);
    }
    var s = i(6).Point,
      r = i(24),
      o = r.parseRgb,
      a = r.darkenRgb,
      l = r.rgbToHexString,
      h = r.rgbToBlackWhiteString,
      d = i(1033).EllipseRendererSimple,
      c = i(186).TextRenderer,
      p = i(824).LineSourcePaneView,
      u = i(185).TrendLineRenderer,
      _ = i(9).HitTestResult,
      f = i(69).CompositeRenderer,
      g = i(50),
      v = i(29),
      w = i(103).LineEnd;
    inherit(n, p),
      (n.prototype.renderer = function() {
        var e, t, i, n, r, p, v, w, y, m, x, b, R, S, P, T, L, C, k, I, B, A, M;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          !this._wave)
        )
          return null;
        for (
          e = this.isAnchorsRequired() ? 0 : 1,
            t = new f(),
            i = this._source.properties(),
            n = 0;
          n < this._wave.length;
          n++
        )
          (r = new u()), r.setData(this._wave[n]), t.append(r);
        for (
          p = 1,
            this._points.length > 2 &&
              ((v = this._points[2]),
              (w = this._points[1]),
              (p = g.sign(v.y - w.y))),
            y = [],
            m = 0,
            this._model.lineBeingCreated() === this._source && (m = 1),
            x = h(o(this._model.backgroundColor()), 150),
            b = 'black' === x ? 'white' : 'black',
            R = i.color.value(),
            n = 0;
          n < this._points.length - m;
          n++, p = -p
        )
          n < e ||
            ((S = this._source.label(n)),
            (P = S.label),
            'circle' === S.decoration &&
              ((T = this._points[n].clone()),
              1 === p
                ? (T.y += 13 + S.fontIncrease / 2)
                : (T.y -= 14 + S.fontIncrease / 2),
              (L = (12 + S.fontIncrease) / 2 + 2),
              (v = T.subtract(new s(L, L))),
              (w = T.add(new s(L, L))),
              (C = {
                points: [v, w],
                color: l(a(o(R), 'black' === b ? 15 : -15)),
                linewidth: 1,
                fillBackground: !1,
              }),
              (k = new d(C)),
              t.append(k)),
            'brackets' === S.decoration && (P = '(' + P + ')'),
            (I = {
              points: [this._points[n]],
              text: P,
              color: l(a(o(R), 'black' === b ? 15 : -15)),
              vertAlign: 1 === p ? 'top' : 'bottom',
              horzAlign: 'center',
              font: 'Arial',
              offsetX: 0,
              offsetY: 1 === p ? 5 : -10,
              fontsize: 12 + S.fontIncrease,
              bold: S.bold,
            }),
            y.push(I),
            '' !== S && t.append(new c(I, new _(_.CHANGEPOINT, n))));
        if (this.isAnchorsRequired()) {
          for (B = [], A = 0; A < y.length; A++)
            (M = this._points[A].clone()),
              (M.y = y[A].points[0].y),
              (M.data = A),
              B.push(M);
          this._model.lineBeingCreated() === this._source && B.pop(),
            t.append(this.createLineAnchor({ points: B }));
        }
        return t;
      }),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, r, o, a, l, h, d, c, u, _, f, g, y;
        if (
          (p.prototype._updateImpl.call(this),
          (this._wave = []),
          (e = this._source.properties()),
          (t = this._source.priceScale()),
          (i = this._model.timeScale()),
          t &&
            !t.isEmpty() &&
            !i.isEmpty() &&
            ((n = e.color.value()), e.showWave.value()))
        )
          for (
            r = this._source.ownerSource().firstValue(),
              o = this._source.points(),
              a = 1;
            a < o.length;
            a++
          )
            (l = o[a - 1]),
              (h = o[a]),
              (d = i.indexToCoordinate(l.index)),
              (c = i.indexToCoordinate(h.index)),
              (u = l.price),
              (_ = h.price),
              (f = t.priceToCoordinate(u, r)),
              (g = t.priceToCoordinate(_, r)),
              (y = {
                points: [new s(d, f), new s(c, g)],
                width: i.width(),
                height: t.height(),
                color: v.generateColor(n, 0),
                linewidth: e.linewidth.value(),
                linestyle: CanvasEx.LINESTYLE_SOLID,
                extendleft: !1,
                extendright: !1,
                leftend: w.Circle,
                rightend: w.Circle,
                endstyle: {
                  strokeWidth: 1,
                  fillStyle: this._model.backgroundColor(),
                },
                overlayLineEndings: !0,
              }),
              this._wave.push(y);
      }),
      (t.ElliottLabelsPaneView = n);
  },
  350: function(e, t, i) {
    'use strict';
    function n(e, t, i, n, s, o, l) {
      r.call(this, e, t),
        (this._offsetX = i),
        (this._offsetY = n),
        (this._vertAlign = s),
        (this._horzAlign = o),
        (this._forceTextAlign = !!l),
        (this._renderer = null),
        (this._invalidated = !0),
        (this._noSelection = !1),
        (this._renderer = new a({}));
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(69).CompositeRenderer,
      a = i(186).TextRenderer;
    inherit(n, r),
      (n.prototype.disableSelection = function() {
        this._noSelection = !0;
      }),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        r.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, r, a, l, h, d, c, p;
        return (
          this._invalidated && this.updateImpl(),
          !(e = this._source.priceScale()) || e.isEmpty()
            ? null
            : ((t = {}),
              (i = this._source.properties()),
              (n = i.locked && i.locked.value()),
              (t.points = n ? this._source.fixedPoints() : this._points),
              (t.text = i.text.value()),
              (t.color = i.color.value()),
              (t.font = i.font.value()),
              (t.offsetX = this._offsetX ? this._offsetX : 0),
              (t.offsetY = this._offsetY ? this._offsetY : 0),
              (t.vertAlign = this._vertAlign ? this._vertAlign : 'top'),
              (t.horzAlign = this._horzAlign ? this._horzAlign : 'left'),
              (t.forceTextAlign = this._forceTextAlign),
              (t.fontsize = i.fontsize.value()),
              i.fillBackground &&
                i.fillBackground.value() &&
                ((t.backgroundColor = i.backgroundColor.value()),
                (t.backgroundTransparency =
                  1 - i.backgroundTransparency.value() / 100 || 0)),
              i.drawBorder &&
                i.drawBorder.value() &&
                (t.borderColor = i.borderColor.value()),
              i.wordWrap &&
                i.wordWrap.value() &&
                (t.wordWrapWidth = i.wordWrapWidth.value()),
              (t.bold = i.bold && i.bold.value()),
              (t.italic = i.italic && i.italic.value()),
              (t.highlightBorder =
                this._model.selectedSource() === this._source),
              n ||
                !i.fixedSize ||
                i.fixedSize.value() ||
                ((t.scaleX =
                  this._source._model.timeScale().barSpacing() /
                  this._source._barSpacing),
                (r = e.height() / e.priceRange().length()),
                this._source._isPriceDencityLog &&
                  !e.isLog() &&
                  ((a = e.priceRange().minValue()),
                  (l = e.priceRange().maxValue()),
                  (a = e._toLog(a)),
                  (l = e._toLog(l)),
                  (h = l - a),
                  (r = e.height() / h)),
                !this._source._isPriceDencityLog &&
                  e.isLog() &&
                  ((a = e.priceRange().minValue()),
                  (l = e.priceRange().maxValue()),
                  (a = e._fromLog(a)),
                  (l = e._fromLog(l)),
                  (h = l - a),
                  (r = e.height() / h)),
                (t.scaleY = r / this._source._priceDencity),
                (!isFinite(t.scaleY) || t.scaleY <= 0) && delete t.scaleY),
              this._renderer.setData(t),
              this.isAnchorsRequired() &&
              1 === t.points.length &&
              !this._noSelection &&
              t.wordWrapWidth
                ? ((d = new o()),
                  d.append(this._renderer),
                  (c = t.points[0]),
                  (p = new s(
                    c.x + t.wordWrapWidth + ~~(t.fontsize / 6),
                    c.y +
                      (t.lines
                        ? (t.lines.length * t.fontsize) / 2 + ~~(t.fontsize / 6)
                        : 0)
                  )),
                  (p.data = 0),
                  d.append(this.createLineAnchor({ points: [p] })),
                  d)
                : this._renderer)
        );
      }),
      (t.TextPaneView = n);
  },
  351: function(e, t, i) {
    'use strict';
    function n() {
      this._data = null;
    }
    function s(e, t, i, s, r, o, l) {
      a.call(this, e, t),
        (this._image = i),
        (this._offsetX = o || 0),
        (this._offsetY = l || 0),
        (this._width = s),
        (this._height = r),
        (this._invalidated = !0),
        (this._marksRenderer = new n());
    }
    var r = i(6).Point,
      o = i(60).pointInRectangle,
      a = i(824).LineSourcePaneView,
      l = i(9).HitTestResult,
      h = i(190).SelectionRenderer,
      d = i(69).CompositeRenderer;
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype.draw = function(e) {
        var t, i;
        null !== this._data &&
          0 !== this._data.points.length &&
          ((t = this._data.points[0].x + this._data.offsetX),
          (i = this._data.points[0].y + this._data.offsetY),
          e.translate(-0.5, -0.5),
          e.drawImage(
            this._data.image,
            t,
            i,
            this._data.width,
            this._data.height
          ));
      }),
      (n.prototype.hitTest = function(e) {
        if (null === this._data || 0 === this._data.points.length) return null;
        var t = this._data.points[0].clone();
        return (
          this._data.offsetX && (t.x += this._data.offsetX),
          this._data.offsetY && (t.y += this._data.offsetY),
          o(e, t, t.add(new r(this._data.width, this._data.height)))
            ? new l(l.MOVEPOINT)
            : null
        );
      }),
      inherit(s, a),
      (s.prototype.setAnchors = function(e) {
        this._anchorsOffset = e;
      }),
      (s.prototype.renderer = function() {
        var e, t, i, n;
        if (
          (this._invalidated && this.updateImpl(),
          (e = {}),
          (e.points = this._points),
          (e.color = this._source.properties().color.value()),
          (e.image = this._image),
          (e.offsetX = this._offsetX),
          (e.offsetY = this._offsetY),
          (e.width = this._width),
          (e.height = this._height),
          this._marksRenderer.setData(e),
          this.isAnchorsRequired() && 1 === e.points.length)
        ) {
          if (
            ((t = new d()), t.append(this._marksRenderer), this._anchorsOffset)
          ) {
            for (i = [], n = 0; n < e.points.length; n++)
              i.push(e.points[n].clone().add(this._anchorsOffset));
            t.append(new h({ points: i }));
          } else t.append(new h({ points: e.points }));
          return t;
        }
        return this._marksRenderer;
      }),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        a.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (t.MarkPaneView = s);
  },
  696: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._levels = []),
        (this._invalidated = !0),
        (this._baseTrendRenderer = new o()),
        (this._edgeTrendRenderer = new o());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(185).TrendLineRenderer,
      a = i(312),
      l = i(9).HitTestResult,
      h = i(69).CompositeRenderer,
      d = i(1032).ArcWedgeRenderer,
      c = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype._updateImpl = function() {
        var e, t, i, n, o, a, l, h, d, c, p, u, _, f, g, v, w, y, m;
        if (
          (r.prototype._updateImpl.call(this),
          (this._cacheState = this._source
            .getCache()
            .updateSource(this._source)),
          (this._levels = []),
          !(this._points.length < 3))
        )
          for (
            e = this._points,
              t = e[0],
              i = e[1],
              n = e[2],
              o = i.subtract(t).normalized(),
              a = n.subtract(t).normalized(),
              l = new s(1, 0),
              h = new s(0, 1),
              d = Math.acos(o.dotProduct(l)),
              o.dotProduct(h) < 0 && (d = 2 * Math.PI - d),
              this._edge1 = d,
              c = Math.acos(a.dotProduct(l)),
              a.dotProduct(h) < 0 && (c = 2 * Math.PI - c),
              this._edge2 = c,
              d < c &&
                ((this._edge1 = Math.max(d, c)),
                (this._edge2 = Math.min(d, c) + 2 * Math.PI)),
              Math.abs(d - c) > Math.PI &&
                ((this._edge1 = Math.min(d, c)),
                (this._edge2 = Math.max(d, c) - 2 * Math.PI)),
              p = this._source.properties(),
              u = 1;
            u <= this._source.getCache().levelsCount();
            u++
          )
            (_ = 'level' + u),
              (f = p[_]),
              f.visible.value() &&
                ((g = f.coeff.value()),
                (v = f.color.value()),
                (w = i.subtract(t).length() * g),
                (y = o
                  .add(a)
                  .scaled(0.5)
                  .normalized()
                  .scaled(w)),
                (m = t.add(y)),
                this._levels.push({
                  coeff: g,
                  color: v,
                  radius: w,
                  labelPoint: m,
                  p1: t.add(o.scaled(w)),
                  p2: t.add(a.scaled(w)),
                  linewidth: f.linewidth.value(),
                  linestyle: f.linestyle.value(),
                  index: u,
                }));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, o, p, u, _, f, g, v, w, y, m, x, b, R, S;
        if (
          (this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          (e = new h()),
          this._points.length < 2)
        )
          return e;
        if (
          ((t = this._source.properties()),
          (i = this._points),
          (n = i[0]),
          (s = i[1]),
          (r = {
            points: [n, s],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: t.trendline.color.value(),
            linewidth: t.trendline.visible.value()
              ? t.trendline.linewidth.value()
              : 0,
            linestyle: t.trendline.linestyle.value(),
            extendleft: !1,
            extendright: !1,
            leftend: c.Normal,
            rightend: c.Normal,
          }),
          this._baseTrendRenderer.setData(r),
          e.append(this._baseTrendRenderer),
          this._points.length < 3)
        )
          return this.addAnchors(e), e;
        for (
          o = i[2],
            p = o.data,
            u = s.subtract(n).length(),
            _ = o.subtract(n).normalized(),
            o = n.add(_.scaled(u)),
            o.data = p,
            r = {
              points: [n, o],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: t.trendline.color.value(),
              linewidth: t.trendline.visible.value()
                ? t.trendline.linewidth.value()
                : 0,
              linestyle: t.trendline.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: c.Normal,
              rightend: c.Normal,
            },
            this._edgeTrendRenderer.setData(r),
            e.append(this._edgeTrendRenderer),
            f = this._model._fibWedgeLabelsCache,
            g = f.canvas().get(0),
            v = this._levels.length - 1;
          v >= 0;
          v--
        )
          if (
            ((w = this._levels[v]),
            (y = {}),
            (y.center = this._points[0]),
            (y.radius = w.radius),
            (y.prevRadius = v > 0 ? this._levels[v - 1].radius : 0),
            (y.edge = this._edge),
            (y.color = w.color),
            (y.linewidth = w.linewidth),
            (y.edge1 = this._edge1),
            (y.edge2 = this._edge2),
            (y.p1 = w.p1),
            (y.p2 = w.p2),
            (y.fillBackground = t.fillBackground.value()),
            (y.transparency = t.transparency.value()),
            (m = new d()),
            m.setData(y),
            m.setHitTest(new l(l.MOVEPOINT, null, w.index)),
            e.append(m),
            t.showCoeffs.value())
          ) {
            if (
              !(x = this._cacheState.preparedCells.cells[
                this._levels[v].index - 1
              ])
            )
              continue;
            (b = {
              left: x.left,
              top: f.topByRow(this._cacheState.row),
              width: x.width,
              height: f.rowHeight(this._cacheState.row),
            }),
              (R = {
                left: Math.round(w.labelPoint.x - b.width),
                top: Math.round(w.labelPoint.y - b.height / 2),
                width: x.width,
                height: b.height,
              }),
              (S = new a(g, b, R)),
              e.append(S);
          }
        return (
          this.isAnchorsRequired() &&
            ((i = [n, s]),
            this._model.lineBeingCreated() !== this._source && i.push(o),
            e.append(this.createLineAnchor({ points: i }))),
          e
        );
      }),
      (t.FibWedgePaneView = n);
  },
  697: function(e, t, i) {
    'use strict';
    function n(e, t) {
      s.call(this, e, t),
        (this._numericFormatter = new h()),
        (this._invalidated = !0),
        (this._bcRetracementTrend = new r()),
        (this._xdRetracementTrend = new r()),
        (this._mainTriangleRenderer = new o()),
        (this._triangleRendererPoints234 = new o()),
        (this._abLabelRenderer = new a({})),
        (this._bcLabelRenderer = new a({})),
        (this._cdLabelRenderer = new a({})),
        (this._xdLabelRenderer = new a({})),
        (this._textRendererALabel = new a({})),
        (this._textRendererBLabel = new a({})),
        (this._textRendererCLabel = new a({})),
        (this._textRendererDLabel = new a({})),
        (this._textRendererXLabel = new a({}));
    }
    var s = i(824).LineSourcePaneView,
      r = i(185).TrendLineRenderer,
      o = i(979).TriangleRenderer,
      a = i(186).TextRenderer,
      l = i(69).CompositeRenderer,
      h = i(105).NumericFormatter,
      d = i(103).LineEnd;
    inherit(n, s),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, o, a, h, c;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          this._points.length < 2
            ? null
            : ((e = this._source.properties()),
              (t = new l()),
              (i = [
                this._points[0],
                this._points[1],
                this._points.length < 3 ? this._points[1] : this._points[2],
              ]),
              (n = this),
              (s = function(t, i) {
                return {
                  points: [t],
                  text: i,
                  color: e.textcolor.value(),
                  vertAlign: 'middle',
                  horzAlign: 'center',
                  font: e.font.value(),
                  offsetX: 0,
                  offsetY: 0,
                  bold: e.bold && e.bold.value(),
                  italic: e.italic && e.italic.value(),
                  fontsize: e.fontsize.value(),
                  backgroundColor: n._source.properties().color.value(),
                  backgroundRoundRect: 4,
                };
              }),
              (r = function(e, t) {
                return {
                  points: [e, t],
                  width: n._model.timeScale().width(),
                  height: n._source.priceScale().height(),
                  color: n._source.properties().color.value(),
                  linewidth: 1,
                  linestyle: CanvasEx.LINESTYLE_SOLID,
                  extendleft: !1,
                  extendright: !1,
                  leftend: d.Normal,
                  rightend: d.Normal,
                };
              }),
              (o = {}),
              (o.points = i),
              (o.color = e.color.value()),
              (o.linewidth = e.linewidth.value()),
              (o.backcolor = e.backgroundColor.value()),
              (o.fillBackground = e.fillBackground.value()),
              (o.transparency = e.transparency.value()),
              this._mainTriangleRenderer.setData(o),
              t.append(this._mainTriangleRenderer),
              this._points.length > 3 &&
                ((i = [
                  this._points[2],
                  this._points[3],
                  5 === this._points.length ? this._points[4] : this._points[3],
                ]),
                (o = {}),
                (o.points = i),
                (o.color = e.color.value()),
                (o.linewidth = e.linewidth.value()),
                (o.backcolor = e.backgroundColor.value()),
                (o.fillBackground = e.fillBackground.value()),
                (o.transparency = e.transparency.value()),
                this._triangleRendererPoints234.setData(o),
                t.append(this._triangleRendererPoints234)),
              this._points.length >= 3 &&
                ((a = this._points[0].add(this._points[2]).scaled(0.5)),
                (h = s(a, this._numericFormatter.format(this._ABRetracement))),
                this._abLabelRenderer.setData(h),
                t.append(this._abLabelRenderer)),
              this._points.length >= 4 &&
                ((a = this._points[1].add(this._points[3]).scaled(0.5)),
                (c = r(this._points[1], this._points[3])),
                this._bcRetracementTrend.setData(c),
                t.append(this._bcRetracementTrend),
                (h = s(a, this._numericFormatter.format(this._BCRetracement))),
                this._bcLabelRenderer.setData(h),
                t.append(this._bcLabelRenderer)),
              this._points.length >= 5 &&
                ((a = this._points[2].add(this._points[4]).scaled(0.5)),
                (h = s(a, this._numericFormatter.format(this._CDRetracement))),
                this._cdLabelRenderer.setData(h),
                t.append(this._cdLabelRenderer),
                (c = r(this._points[0], this._points[4])),
                this._xdRetracementTrend.setData(c),
                t.append(this._xdRetracementTrend),
                (a = this._points[0].add(this._points[4]).scaled(0.5)),
                (h = s(a, this._numericFormatter.format(this._XDRetracement))),
                this._xdLabelRenderer.setData(h),
                t.append(this._xdLabelRenderer)),
              (h = s(this._points[0], 'X')),
              this._points[1].y > this._points[0].y
                ? ((h.vertAlign = 'bottom'), (h.offsetY = -10))
                : ((h.vertAlign = 'top'), (h.offsetY = 5)),
              this._textRendererXLabel.setData(h),
              t.append(this._textRendererXLabel),
              (h = s(this._points[1], 'A')),
              this._points[1].y < this._points[0].y
                ? ((h.vertAlign = 'bottom'), (h.offsetY = -10))
                : ((h.vertAlign = 'top'), (h.offsetY = 5)),
              this._textRendererALabel.setData(h),
              t.append(this._textRendererALabel),
              this._points.length > 2 &&
                ((h = s(this._points[2], 'B')),
                this._points[2].y < this._points[1].y
                  ? ((h.vertAlign = 'bottom'), (h.offsetY = -10))
                  : ((h.vertAlign = 'top'), (h.offsetY = 5)),
                this._textRendererBLabel.setData(h),
                t.append(this._textRendererBLabel)),
              this._points.length > 3 &&
                ((h = s(this._points[3], 'C')),
                this._points[3].y < this._points[2].y
                  ? ((h.vertAlign = 'bottom'), (h.offsetY = -10))
                  : ((h.vertAlign = 'top'), (h.offsetY = 5)),
                this._textRendererCLabel.setData(h),
                t.append(this._textRendererCLabel)),
              this._points.length > 4 &&
                ((h = s(this._points[4], 'D')),
                this._points[4].y < this._points[3].y
                  ? ((h.vertAlign = 'bottom'), (h.offsetY = -10))
                  : ((h.vertAlign = 'top'), (h.offsetY = 5)),
                this._textRendererDLabel.setData(h),
                t.append(this._textRendererDLabel)),
              this.addAnchors(t),
              t)
        );
      }),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, r;
        s.prototype._updateImpl.call(this),
          this._source.points().length >= 3 &&
            ((e = this._source.points()[0]),
            (t = this._source.points()[1]),
            (i = this._source.points()[2]),
            (this._ABRetracement =
              Math.round(
                1e3 * Math.abs((i.price - t.price) / (t.price - e.price))
              ) / 1e3)),
          this._source.points().length >= 4 &&
            ((n = this._source.points()[3]),
            (this._BCRetracement =
              Math.round(
                1e3 * Math.abs((n.price - i.price) / (i.price - t.price))
              ) / 1e3)),
          this._source.points().length >= 5 &&
            ((r = this._source.points()[4]),
            (this._CDRetracement =
              Math.round(
                1e3 * Math.abs((r.price - n.price) / (n.price - i.price))
              ) / 1e3),
            (this._XDRetracement =
              Math.round(
                1e3 * Math.abs((r.price - t.price) / (t.price - e.price))
              ) / 1e3));
      }),
      (t.Pattern5PaneView = n);
  },
  753: function(e, t, i) {
    'use strict';
    function n(e, t) {
      o.call(this, e, t),
        (this._rendererCache = {}),
        (this._invalidated = !0),
        (this._trendLineRenderer = new a());
    }
    var s = i(6).Point,
      r = i(303).RectangleRenderer,
      o = i(824).LineSourcePaneView,
      a = i(185).TrendLineRenderer,
      l = i(312),
      h = i(9).HitTestResult,
      d = i(69).CompositeRenderer,
      c = i(103).LineEnd;
    inherit(n, o),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype._updateImpl = function() {
        var e, t, i, n, s, r, a, l, h, d, c, p, u, _, f;
        if (
          (o.prototype._updateImpl.call(this),
          (this._cacheState = this._model._fibRetracementLabelsCache.updateSource(
            this._source
          )),
          !(this._source.points().length < 2) &&
            this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            !this._model.timeScale().isEmpty() &&
            ((e = this._source.points()[0]),
            (t = this._source.points()[1]),
            (i = !1),
            (n = this._source.properties()),
            n.reverse && n.reverse.value() && (i = n.reverse.value()),
            (this._levels = []),
            (s = i ? t.price - e.price : e.price - t.price),
            (r = i ? e.price : t.price),
            null != (a = this._source.ownerSource().firstValue())))
        )
          for (l = this._source.levelsCount(), h = 1; h <= l; h++)
            (d = 'level' + h),
              (c = n[d]),
              c.visible.value() &&
                ((p = c.coeff.value()),
                (u = c.color.value()),
                (_ = r + p * s),
                (f = this._source.priceScale().priceToCoordinate(_, a)),
                this._levels.push({
                  color: u,
                  y: f,
                  linewidth: n.levelsStyle.linewidth.value(),
                  linestyle: n.levelsStyle.linestyle.value(),
                  index: h,
                }));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, o, p, u, _, f, g, v, w, y, m, x, b, R, S, P, T, L, C;
        if (
          (this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          (e = new d()),
          this._points.length < 2)
        )
          return e;
        for (
          t = this._points[0],
            i = this._points[1],
            n = Math.min(t.x, i.x),
            o = Math.max(t.x, i.x),
            p = this._source.properties(),
            u = p.fillBackground.value(),
            _ = p.transparency.value(),
            f = p.extendLines.value() ? this._model.timeScale().width() : o,
            g = this._model._fibRetracementLabelsCache,
            v = g.canvas().get(0),
            w = 0;
          w < this._levels.length;
          w++
        )
          if (
            (w > 0 &&
              u &&
              ((y = this._levels[w - 1]),
              (t = new s(n, this._levels[w].y)),
              (i = new s(f, y.y)),
              (m = {}),
              (m.points = [t, i]),
              (m.color = this._levels[w].color),
              (m.linewidth = 0),
              (m.backcolor = this._levels[w].color),
              (m.fillBackground = !0),
              (m.transparency = _),
              (x = new r(void 0, void 0, !0)),
              x.setData(m),
              e.append(x)),
            (t = new s(n, this._levels[w].y)),
            (i = new s(o, this._levels[w].y)),
            (b = {
              points: [t, i],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: this._levels[w].color,
              linewidth: this._levels[w].linewidth,
              linestyle: this._levels[w].linestyle,
              extendleft: !1,
              extendright: p.extendLines.value(),
              leftend: c.Normal,
              rightend: c.Normal,
            }),
            (x = new a()),
            x.setData(b),
            x.setHitTest(new h(h.MOVEPOINT, null, this._levels[w].index)),
            e.append(x),
            p.showCoeffs.value() || p.showPrices.value())
          ) {
            if (!this._cacheState.preparedCells) continue;
            if (
              !(R = this._cacheState.preparedCells.cells[
                this._levels[w].index - 1
              ])
            )
              continue;
            switch (p.horzLabelsAlign.value()) {
              case 'left':
                S = t;
                break;
              case 'center':
                (S = t.add(i).scaled(0.5)),
                  (S.x += R.width / 2),
                  (S.x = Math.round(S.x));
                break;
              case 'right':
                p.extendLines.value()
                  ? (S = new s(f - 4, this._levels[w].y))
                  : ((S = new s(f + 4, this._levels[w].y)),
                    (S.x += R.width),
                    (S.x = Math.round(S.x)));
            }
            (P = {
              left: R.left,
              top: g.topByRow(this._cacheState.row),
              width: R.width,
              height: g.rowHeight(this._cacheState.row),
            }),
              (T = {
                left: S.x - P.width,
                top: S.y,
                width: R.width,
                height: P.height,
              }),
              (L = p.vertLabelsAlign.value()),
              'middle' === L && (T.top -= T.height / 2),
              'bottom' === L && (T.top -= T.height),
              (C = new l(v, P, T)),
              e.append(C);
          }
        return (
          p.trendline.visible.value() &&
            ((b = {
              points: [this._points[0], this._points[1]],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: p.trendline.color.value(),
              linewidth: p.trendline.linewidth.value(),
              linestyle: p.trendline.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: c.Normal,
              rightend: c.Normal,
            }),
            this._trendLineRenderer.setData(b),
            e.append(this._trendLineRenderer)),
          this.addAnchors(e),
          e
        );
      }),
      (t.FibRetracementPaneView = n);
  },
  754: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t);
    }
    function s(e, t) {
      o.call(this, e, t),
        (this._rendererCache = {}),
        (this._invalidated = !0),
        (this._baseLineRenderer = new a()),
        (this._lastLevelTrendRenderer = new a());
    }
    var r = i(1014).ParallelChannelRenderer,
      o = i(824).LineSourcePaneView,
      a = i(185).TrendLineRenderer,
      l = i(312),
      h = i(69).CompositeRenderer,
      d = i(29),
      c = i(103).LineEnd;
    inherit(n, r),
      (n.prototype._getColor = function() {
        return d.generateColor(
          this._data.backcolor,
          this._data.transparency,
          !0
        );
      }),
      inherit(s, o),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype._updateImpl = function() {
        o.prototype._updateImpl.call(this),
          (this._cacheState = this._model._fibChannelLabelsCache.updateSource(
            this._source
          )),
          this._floatPoints.length < 3 ||
            this._source.points().length < 3 ||
            (this.norm = this._floatPoints[2].subtract(this._floatPoints[0]));
      }),
      (s.prototype.renderer = function() {
        function e(e, n, s) {
          var r, o, h, c, u;
          switch (i.horzLabelsAlign.value()) {
            case 'left':
              r = e;
              break;
            case 'center':
              (r = e.add(n).scaled(0.5)),
                (r.x += s.width / 2),
                (r.x = Math.round(r.x));
              break;
            case 'right':
              (r = n.clone()), (r.x += s.width), (r.x = Math.round(r.x));
          }
          (o = {
            left: s.left,
            top: a.topByRow(p._cacheState.row),
            width: s.width,
            height: a.rowHeight(p._cacheState.row),
          }),
            (h = {
              left: Math.round(r.x - o.width),
              top: Math.round(r.y),
              width: s.width,
              height: o.height,
            }),
            (c = i.vertLabelsAlign.value()),
            'middle' === c && (h.top -= h.height / 2),
            'bottom' === c && (h.top -= h.height),
            (u = new l(d, o, h)),
            t.append(u);
        }
        var t,
          i,
          s,
          r,
          o,
          a,
          d,
          p,
          u,
          _,
          f,
          g,
          v,
          w,
          y,
          m,
          x,
          b,
          R,
          S,
          P,
          T,
          L,
          C;
        if (
          (this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          (t = new h()),
          this._floatPoints.length < 2)
        )
          return this.addAnchors(t), t;
        if (
          ((i = this._source.properties()),
          (s = this._floatPoints[0]),
          (r = this._floatPoints[1]),
          this._floatPoints.length < 3)
        )
          return (
            (o = {
              points: [s, r],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: i.level1.color.value(),
              linewidth: i.levelsStyle.linewidth.value(),
              linestyle: i.levelsStyle.linestyle.value(),
              extendleft: i.extendLeft.value(),
              extendright: i.extendRight.value(),
              leftend: c.Normal,
              rightend: c.Normal,
            }),
            this._baseLineRenderer.setData(o),
            t.append(this._baseLineRenderer),
            this.addAnchors(t),
            t
          );
        for (
          a = this._model._fibChannelLabelsCache,
            d = a.canvas().get(0),
            p = this,
            u = this._source.levelsCount(),
            _ = 1;
          _ < u;
          _++
        )
          if (((f = i['level' + _]), f.visible.value())) {
            for (g = null, v = _ + 1; v <= u; v++)
              if (((w = i['level' + v]), w.visible.value())) {
                g = w;
                break;
              }
            if (!g) break;
            (y = this.norm.scaled(f.coeff.value())),
              (m = s.add(y)),
              (x = r.add(y)),
              (b = this.norm.scaled(g.coeff.value())),
              (R = s.add(b)),
              (S = r.add(b)),
              (P = {}),
              (P.points = [m, x, R, S]),
              (P.color = f.color.value()),
              (P.width = this._model.timeScale().width()),
              (P.height = this._source.priceScale().height()),
              (P.linewidth = i.levelsStyle.linewidth.value()),
              (P.linestyle = i.levelsStyle.linestyle.value()),
              (P.extendleft = i.extendLeft.value()),
              (P.extendright = i.extendRight.value()),
              (P.backcolor = f.color.value()),
              (P.transparency = i.transparency.value()),
              (P.skipTopLine = !0),
              (P.fillBackground = i.fillBackground.value()),
              (P.hittestOnBackground = !0),
              (T = new n()),
              T.setData(P),
              t.append(T),
              (i.showCoeffs.value() || i.showPrices.value()) &&
                ((L = this._cacheState.preparedCells.cells[_ - 1]), e(m, x, L));
          }
        for (C = null, _ = u; _ >= 1; _--)
          if (((f = i['level' + _]), f.visible.value())) {
            C = _;
            break;
          }
        return (
          null != C &&
            ((f = i['level' + C]),
            f.visible.value() &&
              ((y = this.norm.scaled(f.coeff.value())),
              (m = s.add(y)),
              (x = r.add(y)),
              (o = {
                points: [m, x],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: f.color.value(),
                linewidth: i.levelsStyle.linewidth.value(),
                linestyle: i.levelsStyle.linestyle.value(),
                extendleft: i.extendLeft.value(),
                extendright: i.extendRight.value(),
                leftend: c.Normal,
                rightend: c.Normal,
              }),
              this._lastLevelTrendRenderer.setData(o),
              t.append(this._lastLevelTrendRenderer),
              (i.showCoeffs.value() || i.showPrices.value()) &&
                e(m, x, this._cacheState.preparedCells.cells[C - 1]))),
          this.addAnchors(t),
          t
        );
      }),
      (t.FibChannelPaneView = s);
  },
  755: function(e, t, i) {
    'use strict';
    function n(e, t, i) {
      (this._data = e),
        (this._hittest = t || new d(d.MOVEPOINT)),
        (this._backHittest = i || new d(d.MOVEPOINT_BACKGROUND));
    }
    function s(e, t) {
      a.call(this, e, t),
        (this._rendererCache = {}),
        (this._invalidated = !0),
        (this._trendLineRenderer = new l());
    }
    var r = i(6).Point,
      o = i(50),
      a = i(824).LineSourcePaneView,
      l = i(185).TrendLineRenderer,
      h = i(312),
      d = i(9).HitTestResult,
      c = i(69).CompositeRenderer,
      p = i(29),
      u = i(103).LineEnd;
    (n.prototype.draw = function(e) {
      (e.lineCap = 'butt'),
        (e.strokeStyle = this._data.color),
        (e.lineWidth = this._data.linewidth),
        e.translate(this._data.center.x, this._data.center.y),
        e.beginPath(),
        this._data.fullCircles
          ? e.arc(0, 0, this._data.radius, 2 * Math.PI, 0, !1)
          : this._data.dir > 0
          ? e.arc(0, 0, this._data.radius, 0, Math.PI, !1)
          : e.arc(0, 0, this._data.radius, Math.PI, 0, !1),
        e.stroke(),
        this._data.fillBackground &&
          (this._data.radius2 &&
            (this._data.fullCircles
              ? e.arc(0, 0, this._data.radius2, 2 * Math.PI, 0, !0)
              : this._data.dir > 0
              ? e.arc(0, 0, this._data.radius2, Math.PI, 0, !0)
              : e.arc(0, 0, this._data.radius2, 0, Math.PI, !0)),
          (e.fillStyle = p.generateColor(
            this._data.color,
            this._data.transparency,
            !0
          )),
          e.fill());
    }),
      (n.prototype.hitTest = function(e) {
        var t, i, n;
        return o.sign(e.y - this._data.center.y) === this._data.dir ||
          this._data.fullCircles
          ? ((t = e.subtract(this._data.center)),
            (i = t.length()),
            (n = 3),
            Math.abs(i - this._data.radius) < n
              ? this._hittest
              : this._data.hittestOnBackground &&
                Math.abs(i) <= this._data.radius + n
              ? this._backHittest
              : null)
          : null;
      }),
      inherit(s, a),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype._updateImpl = function() {
        var e, t, i, n, s, l, h, d, c, p, u, _, f;
        if (
          (a.prototype._updateImpl.call(this),
          (this._cacheState = this._model._fibSpeedResistanceArcsLabelsCache.updateSource(
            this._source
          )),
          !(this._floatPoints.length < 2) &&
            this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            !this._model.timeScale().isEmpty())
        )
          for (
            e = this._floatPoints[0],
              t = this._floatPoints[1],
              i = e.subtract(t).length(),
              this._levels = [],
              n = this._source.properties(),
              s = this._source.levelsCount(),
              l = 1;
            l <= s;
            l++
          )
            (h = 'level' + l),
              (d = n[h]),
              d.visible.value() &&
                ((c = d.coeff.value()),
                (p = d.color.value()),
                (u = t.subtract(e).length() * c),
                (_ = o.sign(t.y - e.y)),
                (f = new r(e.x, e.y + _ * i * c)),
                this._levels.push({
                  color: p,
                  radius: u,
                  dir: _,
                  labelPoint: f,
                  linewidth: d.linewidth.value(),
                  linestyle: d.linestyle.value(),
                  index: l,
                }));
      }),
      (s.prototype.renderer = function() {
        var e, t, i, s, r, o, a, l, p, _, f, g, v, w, y, m;
        if (
          (this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          (e = new c()),
          this._floatPoints.length < 2)
        )
          return e;
        for (
          t = this._floatPoints[0],
            i = this._source.properties(),
            s = i.fillBackground.value(),
            r = i.transparency.value(),
            o = this._model._fibSpeedResistanceArcsLabelsCache,
            a = o.canvas().get(0),
            l = 0;
          l < this._levels.length;
          l++
        )
          if (
            ((p = this._levels[l]),
            (_ = {}),
            (_.center = t),
            (_.color = p.color),
            (_.linewidth = p.linewidth),
            (_.radius = p.radius),
            (_.dir = p.dir),
            (_.transparency = r),
            (_.fillBackground = s),
            (_.hittestOnBackground = !0),
            (_.fullCircles = i.fullCircles.value()),
            l > 0 && (_.radius2 = this._levels[l - 1].radius),
            (f = new d(d.MOVEPOINT, null, p.index)),
            e.append(new n(_, f)),
            i.showCoeffs.value())
          ) {
            if (
              !(g = this._cacheState.preparedCells.cells[
                this._levels[l].index - 1
              ])
            )
              continue;
            (v = {
              left: g.left,
              top: o.topByRow(this._cacheState.row),
              width: g.width,
              height: o.rowHeight(this._cacheState.row),
            }),
              (w = {
                left: Math.round(p.labelPoint.x - v.width),
                top: Math.round(p.labelPoint.y - v.height / 2),
                width: g.width,
                height: v.height,
              }),
              (y = new h(a, v, w)),
              e.append(y);
          }
        return (
          i.trendline.visible.value() &&
            ((m = {
              points: [this._floatPoints[0], this._floatPoints[1]],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: i.trendline.color.value(),
              linewidth: i.trendline.linewidth.value(),
              linestyle: i.trendline.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: u.Normal,
              rightend: u.Normal,
            }),
            this._trendLineRenderer.setData(m),
            e.append(this._trendLineRenderer)),
          this.addAnchors(e),
          e
        );
      }),
      (t.FibSpeedResistanceArcsPaneView = s);
  },
  756: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._baseTrendRenderer = new o()),
        (this._edgeTrendRenderer = new o()),
        (this._arcWedgeRenderer = new s());
    }
    var s = i(1032).ArcWedgeRenderer,
      r = i(696).FibWedgePaneView,
      o = i(185).TrendLineRenderer,
      a = i(69).CompositeRenderer,
      l = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.update = function() {
        r.prototype.update.call(this);
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, o, h, d, c, p, u;
        return (
          this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          (e = new a()),
          this._points.length < 2
            ? e
            : ((t = this._source.properties()),
              (i = this._points),
              (n = i[0]),
              (s = i[1]),
              (r = {
                points: [n, s],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: t.trendline.color.value(),
                linewidth: t.linewidth.value(),
                linestyle: t.trendline.linestyle.value(),
                extendleft: !1,
                extendright: !1,
                leftend: l.Normal,
                rightend: l.Normal,
              }),
              this._baseTrendRenderer.setData(r),
              e.append(this._baseTrendRenderer),
              this._points.length < 3
                ? (this.addAnchors(e), e)
                : ((o = i[2]),
                  (h = o.data),
                  (d = s.subtract(n).length()),
                  (c = o.subtract(n).normalized()),
                  (o = n.add(c.scaled(d))),
                  (o.data = h),
                  (r = {
                    points: [n, o],
                    width: this._model.timeScale().width(),
                    height: this._source.priceScale().height(),
                    color: t.trendline.color.value(),
                    linewidth: t.linewidth.value(),
                    linestyle: t.trendline.linestyle.value(),
                    extendleft: !1,
                    extendright: !1,
                    leftend: l.Normal,
                    rightend: l.Normal,
                  }),
                  this._edgeTrendRenderer.setData(r),
                  e.append(this._edgeTrendRenderer),
                  (p = this._levels[0]),
                  (u = {}),
                  (u.center = this._points[0]),
                  (u.radius = p.radius),
                  (u.prevRadius = 0),
                  (u.edge = this._edge),
                  (u.color = t.trendline.color.value()),
                  (u.color1 = t.color1.value()),
                  (u.color2 = t.color2.value()),
                  (u.linewidth = t.linewidth.value()),
                  (u.edge1 = this._edge1),
                  (u.edge2 = this._edge2),
                  (u.p1 = p.p1),
                  (u.p2 = p.p2),
                  (u.fillBackground = t.fillBackground.value()),
                  (u.transparency = t.transparency.value()),
                  (u.gradient = !0),
                  this._arcWedgeRenderer.setData(u),
                  e.append(this._arcWedgeRenderer),
                  this.addAnchors(e),
                  e))
        );
      }),
      (t.ProjectionLinePaneView = n);
  },
  757: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._rendererCache = {}),
        (this._trendLineRendererPoints12 = new a()),
        (this._trendLineRendererPoints23 = new a());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(303).RectangleRenderer,
      a = i(185).TrendLineRenderer,
      l = i(312),
      h = i(9).HitTestResult,
      d = i(69).CompositeRenderer,
      c = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype._updateImpl = function() {
        var e, t, i, n, s, o, a, l, h, d, c, p, u, _, f;
        if (
          (r.prototype._updateImpl.call(this),
          (this._cacheState = this._model._trendBasedFibExtensionLabelsCache.updateSource(
            this._source
          )),
          !(this._source.points().length < 3) &&
            this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            !this._model.timeScale().isEmpty())
        )
          for (
            e = this._source.points()[0],
              t = this._source.points()[1],
              i = this._source.points()[2],
              n = !1,
              s = this._source.properties(),
              s.reverse && s.reverse.value() && (n = s.reverse.value()),
              this._levels = [],
              o = n ? e.price - t.price : t.price - e.price,
              a = this._source.ownerSource().firstValue(),
              l = this._source.levelsCount(),
              h = 1;
            h <= l;
            h++
          )
            (d = 'level' + h),
              (c = s[d]),
              c.visible.value() &&
                ((p = c.coeff.value()),
                (u = c.color.value()),
                (_ = i.price + p * o),
                (f = this._source.priceScale().priceToCoordinate(_, a)),
                this._levels.push({
                  color: u,
                  y: f,
                  linewidth: s.levelsStyle.linewidth.value(),
                  linestyle: s.levelsStyle.linestyle.value(),
                  index: h,
                }));
      }),
      (n.prototype.renderer = function() {
        var e,
          t,
          i,
          n,
          r,
          p,
          u,
          _,
          f,
          g,
          v,
          w,
          y,
          m,
          x,
          b,
          R,
          S,
          P,
          T,
          L,
          C,
          k,
          I;
        if (
          (this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          (e = new d()),
          this._points.length < 2)
        )
          return e;
        if (
          ((t = this._points[0]),
          (i = this._points[1]),
          (n = this._source.properties()),
          n.trendline.visible.value() &&
            ((r = {
              points: [t, i],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: n.trendline.color.value(),
              linewidth: n.trendline.linewidth.value(),
              linestyle: n.trendline.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: c.Normal,
              rightend: c.Normal,
            }),
            this._trendLineRendererPoints12.setData(r),
            e.append(this._trendLineRendererPoints12)),
          this._points.length < 3)
        )
          return this.addAnchors(e), e;
        for (
          p = this._points[2],
            n.trendline.visible.value() &&
              ((r = {
                points: [i, p],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: n.trendline.color.value(),
                linewidth: n.trendline.linewidth.value(),
                linestyle: n.trendline.linestyle.value(),
                extendleft: !1,
                extendright: !1,
                leftend: c.Normal,
                rightend: c.Normal,
              }),
              this._trendLineRendererPoints23.setData(r),
              e.append(this._trendLineRendererPoints23)),
            u = Math.min(p.x, i.x),
            _ = Math.max(p.x, i.x),
            f = n.fillBackground.value(),
            g = n.transparency.value(),
            v = n.extendLines.value() ? this._model.timeScale().width() : _,
            w = this._model._trendBasedFibExtensionLabelsCache,
            y = w.canvas().get(0),
            m = 0;
          m < this._levels.length;
          m++
        )
          if (
            (m > 0 &&
              f &&
              ((x = this._levels[m - 1]),
              (t = new s(u, this._levels[m].y)),
              (i = new s(v, x.y)),
              (b = {}),
              (b.points = [t, i]),
              (b.color = this._levels[m].color),
              (b.linewidth = 0),
              (b.backcolor = this._levels[m].color),
              (b.fillBackground = !0),
              (b.transparency = g),
              (R = new o(void 0, void 0, !0)),
              R.setData(b),
              e.append(R)),
            (t = new s(u, this._levels[m].y)),
            (i = new s(_, this._levels[m].y)),
            (r = {
              points: [t, i],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: this._levels[m].color,
              linewidth: this._levels[m].linewidth,
              linestyle: this._levels[m].linestyle,
              extendleft: !1,
              extendright: n.extendLines.value(),
              leftend: c.Normal,
              rightend: c.Normal,
            }),
            (S = new a()),
            S.setData(r),
            S.setHitTest(new h(h.MOVEPOINT, null, this._levels[m].index)),
            e.append(S),
            n.showCoeffs.value() || n.showPrices.value())
          ) {
            if (
              !(P = this._cacheState.preparedCells.cells[
                this._levels[m].index - 1
              ])
            )
              continue;
            switch (n.horzLabelsAlign.value()) {
              case 'left':
                T = t;
                break;
              case 'center':
                (T = t.add(i).scaled(0.5)),
                  (T.x += P.width / 2),
                  (T.x = Math.round(T.x));
                break;
              case 'right':
                n.extendLines.value()
                  ? (T = new s(v - 4, this._levels[m].y))
                  : ((T = new s(v + 4, this._levels[m].y)),
                    (T.x += P.width),
                    (T.x = Math.round(T.x)));
            }
            (L = {
              left: P.left,
              top: w.topByRow(this._cacheState.row),
              width: P.width,
              height: w.rowHeight(this._cacheState.row),
            }),
              (C = {
                left: T.x - L.width,
                top: T.y,
                width: P.width,
                height: L.height,
              }),
              (k = n.vertLabelsAlign.value()),
              'middle' === k && (C.top -= C.height / 2),
              'bottom' === k && (C.top -= C.height),
              (I = new l(y, L, C)),
              e.append(I);
          }
        return this.addAnchors(e), e;
      }),
      (t.TrendBasedFibExtensionPaneView = n);
  },
  758: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._rendererCache = {}),
        (this._invalidated = !0),
        (this._numericFormatter = new d()),
        (this._trendLineRenderer = new o());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(185).TrendLineRenderer,
      a = i(312),
      l = i(9).HitTestResult,
      h = i(69).CompositeRenderer,
      d = i(105).NumericFormatter,
      c = i(1033).EllipseRendererSimple,
      p = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype._updateImpl = function() {
        var e, t, i, n, o, a, l, h, d, c, p, u, _;
        if (
          (r.prototype._updateImpl.call(this),
          (this._cacheState = this._model._fibCirclesLabelsCache.updateSource(
            this._source
          )),
          !(this._source.points().length < 2) &&
            this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            !this._model.timeScale().isEmpty())
        )
          for (
            e = this._points[0],
              t = this._points[1],
              this._center = e.add(t).scaled(0.5),
              i = Math.abs(t.x - e.x),
              n = Math.abs(t.y - e.y),
              this._levels = [],
              o = this._source.properties(),
              a = this._source.levelsCount(),
              l = 1;
            l <= a;
            l++
          )
            (h = 'level' + l),
              (d = o[h]),
              d.visible.value() &&
                ((c = d.coeff.value()),
                (p = d.color.value()),
                (u = []),
                u.push(
                  new s(
                    this._center.x - 0.5 * i * c,
                    this._center.y - 0.5 * n * c
                  )
                ),
                u.push(
                  new s(
                    this._center.x + 0.5 * i * c,
                    this._center.y + 0.5 * n * c
                  )
                ),
                (_ = new s(this._center.x, this._center.y + 0.5 * n * c)),
                this._levels.push({
                  color: p,
                  points: u,
                  labelPoint: _,
                  linewidth: d.linewidth.value(),
                  linestyle: d.linestyle.value(),
                  index: l,
                }));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, o, d, u, _, f, g, v, w, y;
        if (
          (this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          (e = new h()),
          this._points.length < 2)
        )
          return e;
        for (
          t = this._source.properties(),
            i = t.fillBackground.value(),
            n = t.transparency.value(),
            s = this._model._fibCirclesLabelsCache,
            r = s.canvas().get(0),
            o = 0;
          o < this._levels.length;
          o++
        )
          if (
            ((d = this._levels[o]),
            (u = {}),
            (u.points = d.points),
            (u.color = d.color),
            (u.linewidth = d.linewidth),
            (u.backcolor = d.color),
            o > 0 && (u.wholePoints = this._levels[o - 1].points),
            (u.fillBackground = i),
            (u.transparency = n),
            (_ = new l(l.MOVEPOINT, null, d.index)),
            e.append(new c(u, _)),
            t.showCoeffs.value())
          ) {
            if (
              !(f = this._cacheState.preparedCells.cells[
                this._levels[o].index - 1
              ])
            )
              continue;
            (g = {
              left: f.left,
              top: s.topByRow(this._cacheState.row),
              width: f.width,
              height: s.rowHeight(this._cacheState.row),
            }),
              (v = {
                left: Math.round(d.labelPoint.x - g.width),
                top: Math.round(d.labelPoint.y - g.height / 2),
                width: f.width,
                height: g.height,
              }),
              (w = new a(r, g, v)),
              e.append(w);
          }
        return (
          t.trendline.visible.value() &&
            ((y = {
              points: [this._points[0], this._points[1]],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: t.trendline.color.value(),
              linewidth: t.trendline.linewidth.value(),
              linestyle: t.trendline.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: p.Normal,
              rightend: p.Normal,
            }),
            this._trendLineRenderer.setData(y),
            e.append(this._trendLineRenderer)),
          this.addAnchors(e),
          e
        );
      }),
      (t.FibCirclesPaneView = n);
  },
  759: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._lineRenderer = new l());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(867).PaneRendererClockIcon,
      a = i(69).CompositeRenderer,
      l = i(877).VerticalLineRenderer;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        r.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (n.prototype.renderer = function() {
        var e, t, i;
        return (
          this._invalidated && this.updateImpl(),
          (e = {}),
          (e.width = this._model.timeScale().width()),
          (e.height = this._source.priceScale().height()),
          (e.points = this._points),
          (e.color = this._source.properties().linecolor.value()),
          (e.linewidth = this._source.properties().linewidth.value()),
          (e.linestyle = this._source.properties().linestyle.value()),
          this._lineRenderer.setData(e),
          (t = new a()),
          t.append(this._lineRenderer),
          this.addAnchors(t),
          TradingView.printing ||
            !this._source.hasAlert.value() ||
            this._model.readOnly() ||
            1 !== e.points.length ||
            ((i = new s(
              this._points[0].x,
              this._source.priceScale().height() / 2
            )),
            this._source.getAlertIsActive(function(n) {
              t.append(
                new o({
                  point1: i,
                  color: n
                    ? e.color
                    : defaults(
                        'chartproperties.alertsProperties.drawingIcon.color'
                      ),
                })
              );
            })),
          t
        );
      }),
      (t.VertLinePaneView = n);
  },
  760: function(e, t, i) {
    'use strict';
    var n, s, r, o, a, l, h;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'CrossLinePaneView', function() {
        return h;
      }),
      (n = i(1)),
      (s = i(824)),
      (r = i(109)),
      (o = i(877)),
      (a = i(69)),
      (l = i(9)),
      (h = (function(e) {
        function t(t, i) {
          var n = e.call(this, t, i) || this;
          return (
            (n._horizLineRenderer = new r.HorizontalLineRenderer()),
            (n._vertLineRenderer = new o.VerticalLineRenderer()),
            n._horizLineRenderer.setHitTest(
              new l.HitTestResult(l.HitTestResult.MOVEPOINT)
            ),
            n
          );
        }
        return (
          n.c(t, e),
          (t.prototype.update = function() {
            this._invalidated = !0;
          }),
          (t.prototype.updateImpl = function() {
            e.prototype._updateImpl.call(this), (this._invalidated = !1);
          }),
          (t.prototype.renderer = function() {
            var e, t, i;
            return (
              this._invalidated && this.updateImpl(),
              (e = {
                width: this._getModel()
                  .timeScale()
                  .width(),
                points: this._getPoints(),
                color: this._getSource().lineColor(),
                linewidth: this._getSource().lineWidth(),
                linestyle: this._getSource().lineStyle(),
                height: 0,
              }),
              (t = this._getSource().priceScale()),
              null !== t && (e.height = t.height()),
              this._horizLineRenderer.setData(e),
              this._vertLineRenderer.setData(e),
              (i = new a.CompositeRenderer()),
              i.append(this._horizLineRenderer),
              i.append(this._vertLineRenderer),
              this.addAnchors(i),
              i
            );
          }),
          t
        );
      })(s.LineSourcePaneView));
  },
  761: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._vertLineRenderer1 = new o()),
        (this._vertLineRenderer2 = new o()),
        (this._medianRenderer = new l());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(877).VerticalLineRenderer,
      a = i(303).RectangleRenderer,
      l = i(185).TrendLineRenderer,
      h = i(9).HitTestResult,
      d = i(136).PaneRendererLine,
      c = i(69).CompositeRenderer,
      p = i(29),
      u = i(203).LineToolBarsPatternMode,
      _ = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.renderer = function() {
        var e, t, i, n, r, o, l, f, g, v, w, y, m, x, b, R, S, P, T, L, C, k;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          this._pattern && 2 === this._source.points().length)
        ) {
          if (
            ((e = this._source.points()[0].index),
            (t = this._source.points()[1].index),
            !(i = e < t ? this._points[0] : this._points[1]))
          )
            return new c();
          if (
            ((n = parseInt(this._source.properties().mode.value(), 10)),
            (r = Math.abs(
              (this._points[0].x - this._points[1].x) /
                (this._pattern.length - 1)
            )),
            n === u.Bars || n === u.OpenClose)
          ) {
            for (
              o = new c(),
                l = n === u.Bars ? ['high', 'low'] : ['open', 'close'],
                f = l[0],
                g = l[1],
                v = 0;
              v < this._pattern.length;
              v++
            )
              (w = Math.round(i.x + v * r + 0.5)),
                (y = i.y + Math.round(this._pattern[v][f])),
                (m = i.y + Math.round(this._pattern[v][g])),
                (x = {}),
                (x.points = [new s(w - 1, y), new s(w + 1, m)]),
                (x.color = this._source.properties().color.value()),
                (x.linewidth = 1),
                (x.backcolor = this._source.properties().color.value()),
                (x.fillBackground = !0),
                (x.transparency = 10),
                (b = new a()),
                b.setData(x),
                o.append(b);
            return (
              this.isAnchorsRequired() &&
                o.append(this.createLineAnchor({ points: this._points })),
              o
            );
          }
          return (
            (o = new c()),
            (x = {}),
            (x.barSpacing = r),
            (x.items = this._pattern),
            (x.histogramBase = 0),
            (x.lineIndex = 0),
            (x.lineColor = p.generateColor(
              this._source.properties().color.value(),
              10
            )),
            (x.lineStyle = CanvasEx.LINESTYLE_SOLID),
            (x.lineWidth = 2),
            (x.hittest = new h(h.MOVEPOINT)),
            o.append(new d(x)),
            this.isAnchorsRequired() &&
              o.append(this.createLineAnchor({ points: this._points })),
            o
          );
        }
        return (
          (o = new c()),
          this._points.length < 2
            ? o
            : ((R = this._model.timeScale().width()),
              (S = this._source.priceScale().height()),
              (P = this._points[0]),
              (T = this._points[1]),
              (L = {}),
              (L.width = R),
              (L.height = S),
              (L.points = [P]),
              (L.color = '#808080'),
              (L.linewidth = 1),
              (L.linestyle = CanvasEx.LINESTYLE_SOLID),
              this._vertLineRenderer1.setData(L),
              o.append(this._vertLineRenderer1),
              (C = {}),
              (C.width = R),
              (C.height = S),
              (C.points = [T]),
              (C.color = '#808080'),
              (C.linewidth = 1),
              (C.linestyle = CanvasEx.LINESTYLE_SOLID),
              this._vertLineRenderer2.setData(C),
              o.append(this._vertLineRenderer2),
              (k = {
                points: [P, T],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: '#808080',
                linewidth: 1,
                linestyle: CanvasEx.LINESTYLE_SOLID,
                extendleft: !1,
                extendright: !1,
                leftend: _.Normal,
                rightend: _.Normal,
              }),
              this._medianRenderer.setData(k),
              o.append(this._medianRenderer),
              o)
        );
      }),
      (n.prototype.update = function() {
        r.prototype._updateImpl.call(this), (this._invalidated = !0);
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, r, o, a, l, h, d, c, p, u, _;
        !this._source.priceScale() ||
          this._source.priceScale().isEmpty() ||
          this._points.length < 2 ||
          (this._source._pattern &&
          this._source._pattern.length > 0 &&
          2 === this._source.points().length
            ? ((e = this._source.priceScale()),
              (t = this._source.firstPatternPrice()),
              (i = this._source.pressCoeff()),
              (e = this._source.priceScale()),
              (n = this._source.ownerSource().firstValue()),
              (r = e.priceToCoordinate(t, n)),
              (o = function(s) {
                var o = (s - t) * i + t;
                return e.priceToCoordinate(o, n) - r;
              }),
              (a = parseInt(this._source.properties().mode.value())),
              (l = this._source.points()[0].index),
              (h = this._source.points()[1].index),
              (d = l > h ? 1 : 0),
              (c = this._points[d]),
              (p = c.x),
              (u = Math.abs(
                (this._points[0].x - this._points[1].x) /
                  (this._source._pattern.length - 1)
              )),
              (_ = {
                0: function(e) {
                  return {
                    high: o(e[TradingView.HIGH_PLOT]),
                    low: o(e[TradingView.LOW_PLOT]),
                  };
                },
                1: function(e, t) {
                  return new s(p + t * u, o(e[TradingView.CLOSE_PLOT]) + c.y);
                },
                2: function(e) {
                  return {
                    open: o(e[TradingView.OPEN_PLOT]),
                    close: o(e[TradingView.CLOSE_PLOT]),
                  };
                },
                3: function(e, t) {
                  return new s(p + t * u, o(e[TradingView.OPEN_PLOT]) + c.y);
                },
                4: function(e, t) {
                  return new s(p + t * u, o(e[TradingView.HIGH_PLOT]) + c.y);
                },
                5: function(e, t) {
                  return new s(p + t * u, o(e[TradingView.LOW_PLOT]) + c.y);
                },
                6: function(e, t) {
                  return new s(
                    p + t * u,
                    o(
                      (e[TradingView.HIGH_PLOT] + e[TradingView.LOW_PLOT]) / 2
                    ) + c.y
                  );
                },
              }),
              (this._pattern = this._source._pattern.map(_[a])))
            : delete this._pattern);
      }),
      (t.BarsPatternPaneView = n);
  },
  762: function(e, t, i) {
    'use strict';
    function n(e, t) {
      o.call(this, e, t),
        (this._invalidated = !0),
        (this._trendLineRendererPoints12 = new h()),
        (this._trendLineRendererPoints23 = new h());
    }
    var s = i(6).Point,
      r = i(877).VerticalLineRenderer,
      o = i(824).LineSourcePaneView,
      a = i(186).TextRenderer,
      l = i(303).RectangleRenderer,
      h = i(185).TrendLineRenderer,
      d = i(9).HitTestResult,
      c = i(69).CompositeRenderer,
      p = i(103).LineEnd;
    inherit(n, o),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, s, r, a, l, h, d, c, p, u, _;
        if (
          (o.prototype._updateImpl.call(this),
          !(this._source.points().length < 3) &&
            this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            !this._model.timeScale().isEmpty() &&
            ((e = this._source.points()[0]),
            (t = this._source.points()[1]),
            (i = this._source.points()[2]),
            (this._levels = []),
            t.index !== e.index &&
              ((n = t.index - e.index),
              (s = this._source.properties()),
              (r = i.index),
              null !== this._model.timeScale().visibleBars())))
        )
          for (a = 1; a <= 11; a++)
            (l = 'level' + a),
              (h = s[l]),
              h.visible.value() &&
                ((d = h.coeff.value()),
                (c = h.color.value()),
                (p = Math.round(r + d * n)),
                (u = this._model.timeScale().indexToCoordinate(p)),
                (_ = {
                  x: u,
                  coeff: d,
                  color: c,
                  linewidth: h.linewidth.value(),
                  linestyle: h.linestyle.value(),
                  index: a,
                }),
                s.showCoeffs.value() &&
                  ((_.text = d), (_.y = this._source.priceScale().height())),
                this._levels.push(_));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, o, h, u, _, f, g, v, w, y, m, x, b, R, S, P, T, L;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new c()),
          this._points.length < 2)
        )
          return e;
        if (
          ((t = this._points[0]),
          (i = this._points[1]),
          (n = this._source.properties()),
          n.trendline.visible.value() &&
            ((o = {
              points: [t, i],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: n.trendline.color.value(),
              linewidth: n.trendline.linewidth.value(),
              linestyle: n.trendline.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: p.Normal,
              rightend: p.Normal,
            }),
            this._trendLineRendererPoints12.setData(o),
            e.append(this._trendLineRendererPoints12)),
          this._points.length < 3)
        )
          return this.addAnchors(e), e;
        for (
          h = this._points[2],
            n.trendline.visible.value() &&
              ((o = {
                points: [i, h],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: n.trendline.color.value(),
                linewidth: n.trendline.linewidth.value(),
                linestyle: n.trendline.linestyle.value(),
                extendleft: !1,
                extendright: !1,
                leftend: p.Normal,
                rightend: p.Normal,
              }),
              this._trendLineRendererPoints23.setData(o),
              e.append(this._trendLineRendererPoints23)),
            u = n.fillBackground.value(),
            _ = n.transparency.value(),
            f = this._model.timeScale().width(),
            g = this._source.priceScale().height(),
            v = 0;
          v < this._levels.length;
          v++
        ) {
          if (
            (v > 0 &&
              u &&
              ((w = this._levels[v - 1]),
              (t = new s(w.x, 0)),
              (i = new s(
                this._levels[v].x,
                this._source.priceScale().height()
              )),
              (y = {}),
              (y.points = [t, i]),
              (y.color = this._levels[v].color),
              (y.linewidth = 0),
              (y.backcolor = this._levels[v].color),
              (y.fillBackground = !0),
              (y.transparency = _),
              (m = new l(void 0, void 0, !0)),
              m.setData(y),
              e.append(m)),
            void 0 !== this._levels[v].text)
          ) {
            switch (
              ((S = n.horzLabelsAlign.value()),
              (S = 'left' === S ? 'right' : 'right' === S ? 'left' : 'center'))
            ) {
              case 'left':
                b = 3;
                break;
              case 'center':
                b = 0;
                break;
              case 'right':
                b = -3;
            }
            switch (n.vertLabelsAlign.value()) {
              case 'top':
                (x = new s(this._levels[v].x, 0)), (R = 5);
                break;
              case 'middle':
                (x = new s(this._levels[v].x, 0.5 * this._levels[v].y)),
                  (R = 0);
                break;
              case 'bottom':
                (x = new s(this._levels[v].x, this._levels[v].y)), (R = -10);
            }
            (P = {
              points: [x],
              text: '' + this._levels[v].text,
              color: this._levels[v].color,
              vertAlign: 'middle',
              horzAlign: S,
              font: n.font.value(),
              offsetX: b,
              offsetY: R,
              fontsize: 12,
            }),
              e.append(new a(P));
          }
          (T = {}),
            (T.width = f),
            (T.height = g),
            (T.points = [new s(this._levels[v].x, 0)]),
            (T.color = this._levels[v].color),
            (T.linewidth = this._levels[v].linewidth),
            (T.linestyle = this._levels[v].linestyle),
            (L = new d(d.MOVEPOINT, null, this._levels[v].index)),
            (m = new r()),
            m.setData(T),
            m.setHitTest(L),
            e.append(m);
        }
        return this.addAnchors(e), e;
      }),
      (t.TrendBasedFibTimePaneView = n);
  },
  763: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._levels = []),
        (this._invalidated = !0),
        (this._trendRenderer = new h());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(877).VerticalLineRenderer,
      a = i(186).TextRenderer,
      l = i(303).RectangleRenderer,
      h = i(185).TrendLineRenderer,
      d = i(9).HitTestResult,
      c = i(69).CompositeRenderer,
      p = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, s, o, a, l, h, d;
        if (
          (r.prototype._updateImpl.call(this),
          !(this._source.points().length < 1) &&
            this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            !this._model.timeScale().isEmpty() &&
            ((e = this._source.points()[0]),
            2 === this._source.points().length &&
              (t = this._source.points()[1]),
            (i = this._source.properties()),
            (n = this._source.points()[0].index),
            null !== this._model.timeScale().visibleBars()))
        )
          for (
            this._levels = [], s = t ? t.index - e.index : 1, o = 1;
            o <= 11;
            o++
          )
            (a = i['level' + o]),
              a.visible.value() &&
                ((l = Math.round(n + a.coeff.value() * s)),
                (h = this._model.timeScale().indexToCoordinate(l)),
                (d = {
                  index: o,
                  x: h,
                  color: a.color.value(),
                  width: a.linewidth.value(),
                  style: a.linestyle.value(),
                }),
                i.showLabels.value() &&
                  ((d.text = a.coeff.value()),
                  (d.y = this._source.priceScale().height())),
                this._levels.push(d));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, r, h, u, _, f, g, v, w, y, m, x, b, R, S;
        for (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
            e = this._model.timeScale().width(),
            t = this._source.priceScale().height(),
            i = new c(),
            n = this._source.properties(),
            r = 0;
          r < this._levels.length;
          r++
        )
          if (
            ((h = {}),
            (h.width = e),
            (h.height = t),
            (h.points = [new s(this._levels[r].x, 0)]),
            (h.color = this._levels[r].color),
            (h.linewidth = this._levels[r].width),
            (h.linestyle = this._levels[r].style),
            (u = new d(d.MOVEPOINT, null, this._levels[r].index)),
            (_ = new o()),
            _.setData(h),
            _.setHitTest(u),
            i.append(_),
            r > 0 &&
              n.fillBackground.value() &&
              ((f = this._levels[r - 1]),
              (g = new s(this._levels[r].x, 0)),
              (v = new s(f.x, this._source.priceScale().height())),
              (w = {}),
              (w.points = [g, v]),
              (w.color = this._levels[r].color),
              (w.linewidth = 0),
              (w.backcolor = this._levels[r].color),
              (w.fillBackground = !0),
              (w.transparency = n.transparency.value()),
              (_ = new l(void 0, void 0, !0)),
              _.setData(w),
              i.append(_)),
            void 0 !== this._levels[r].text)
          ) {
            switch (
              ((b = n.horzLabelsAlign.value()),
              (b = 'left' === b ? 'right' : 'right' === b ? 'left' : 'center'))
            ) {
              case 'left':
                m = 3;
                break;
              case 'center':
                m = 0;
                break;
              case 'right':
                m = -3;
            }
            switch (n.vertLabelsAlign.value()) {
              case 'top':
                (y = new s(this._levels[r].x, 0)), (x = 5);
                break;
              case 'middle':
                (y = new s(this._levels[r].x, 0.5 * this._levels[r].y)),
                  (x = 0);
                break;
              case 'bottom':
                (y = new s(this._levels[r].x, this._levels[r].y)), (x = -10);
            }
            (R = {
              points: [y],
              text: '' + this._levels[r].text,
              color: h.color,
              vertAlign: 'middle',
              horzAlign: b,
              font: n.font.value(),
              offsetX: m,
              offsetY: x,
              fontsize: 12,
            }),
              i.append(new a(R));
          }
        return (
          2 === this._points.length &&
            ((S = {
              points: [this._points[0], this._points[1]],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: n.trendline.color.value(),
              linewidth: n.trendline.linewidth.value(),
              linestyle: n.trendline.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: p.Normal,
              rightend: p.Normal,
            }),
            this._trendRenderer.setData(S),
            i.append(this._trendRenderer)),
          this.isAnchorsRequired() &&
            (2 === this._source.points().length
              ? i.append(this.createLineAnchor({ points: this._points }))
              : this._points.length > 0 &&
                i.append(
                  this.createLineAnchor({
                    points: [
                      new s(
                        this._points[0].x,
                        this._source.priceScale().height() / 2
                      ),
                    ],
                    hittestResult: d.MOVEPOINT,
                  })
                )),
          i
        );
      }),
      (t.FibTimeZonePaneView = n);
  },
  764: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._lines = []),
        (this._invalidated = !0),
        (this._trendRenderer = new a());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(877).VerticalLineRenderer,
      a = i(185).TrendLineRenderer,
      l = i(9).HitTestResult,
      h = i(69).CompositeRenderer,
      d = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, s, o, a;
        if (
          (r.prototype._updateImpl.call(this),
          !(this._source.points().length < 2) &&
            ((e = this._model.timeScale()),
            this._source.priceScale() &&
              !this._source.priceScale().isEmpty() &&
              !e.isEmpty() &&
              ((t = this._source.points()[0]),
              (i = this._source.points()[1]),
              (n = i ? i.index - t.index : 1),
              (this._lines = []),
              0 !== n)))
        )
          if (((s = e.visibleBars()), n > 0))
            for (o = t.index, a = o; a <= s.lastBar(); a += n)
              this._lines.push({ x: e.indexToCoordinate(a) });
          else
            for (o = t.index, a = o; a >= s.firstBar(); a += n)
              this._lines.push({ x: e.indexToCoordinate(a) });
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, r, a, c, p, u, _, f;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new h()),
          this._points.length < 2)
        )
          return e;
        for (
          t = this._points[0],
            i = this._points[1],
            n = this._source.properties(),
            r = {
              points: [t, i],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: n.trendline.color.value(),
              linewidth: n.trendline.linewidth.value(),
              linestyle: n.trendline.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: d.Normal,
              rightend: d.Normal,
            },
            this._trendRenderer.setData(r),
            e.append(this._trendRenderer),
            a = this._model.timeScale().width(),
            c = this._source.priceScale().height(),
            n = this._source.properties(),
            p = 0;
          p < this._lines.length;
          p++
        )
          (u = {
            width: a,
            height: c,
            points: [new s(this._lines[p].x, 0)],
            color: n.linecolor.value(),
            linewidth: n.linewidth.value(),
            linestyle: n.linestyle.value(),
          }),
            (_ = new o()),
            _.setData(u),
            e.append(_);
        return (
          this.isAnchorsRequired() &&
            (2 === this._source.points().length
              ? ((f = [].concat(this._points)),
                e.append(this.createLineAnchor({ points: f })))
              : e.append(
                  this.createLineAnchor({
                    points: [
                      new s(
                        this._points[0].x,
                        this._source.priceScale().height() / 2
                      ),
                    ],
                    hittestResult: l.MOVEPOINT,
                  })
                )),
          e
        );
      }),
      (t.LineToolCircleLinesPaneView = n);
  },
  765: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._leftBorderRenderer = new l()),
        (this._rightBorderRenderer = new l()),
        (this._distancePriceRenderer = new l()),
        (this._backgroundRenderer = new a()),
        (this._textRenderer = new o({}));
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(186).TextRenderer,
      a = i(303).RectangleRenderer,
      l = i(185).TrendLineRenderer,
      h = i(69).CompositeRenderer,
      d = i(318).TimeSpanFormatter,
      c = i(103).LineEnd,
      p = i(38),
      u = p.forceLTRStr,
      _ = p.startWithLTR;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        r.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (n.prototype.renderer = function(e) {
        var t,
          i,
          n,
          r,
          o,
          a,
          l,
          p,
          f,
          g,
          v,
          w,
          y,
          m,
          x,
          b,
          R,
          S,
          P,
          T,
          L,
          C,
          k,
          I,
          B,
          A,
          M,
          O,
          D;
        return (
          this._invalidated && this.updateImpl(),
          (t = new h()),
          this._points.length < 2 || this._source.points().length < 2
            ? t
            : ((i = this._source.properties()),
              (n = i.extendTop.value()),
              (r = i.extendBottom.value()),
              (o = this._points[0]),
              (a = this._points[1]),
              (l = n ? 0 : Math.min(o.y, a.y)),
              (p = r ? e : Math.max(o.y, a.y)),
              i.fillBackground &&
                i.fillBackground.value() &&
                ((f = {}),
                (f.points = [new s(o.x, l), new s(a.x, p)]),
                (f.color = 'white'),
                (f.linewidth = 0),
                (f.backcolor = i.backgroundColor.value()),
                (f.fillBackground = !0),
                (f.transparency = i.backgroundTransparency.value()),
                this._backgroundRenderer.setData(f),
                t.append(this._backgroundRenderer)),
              (g = this),
              (v = function(e, i, n) {
                var s = {};
                (s.points = [i, n]),
                  (s.width = g._model.timeScale().width()),
                  (s.height = g._source.priceScale().height()),
                  (s.color = g._source.properties().linecolor.value()),
                  (s.linewidth = g._source.properties().linewidth.value()),
                  (s.linestyle = CanvasEx.LINESTYLE_SOLID),
                  (s.extendleft = !1),
                  (s.extendright = !1),
                  (s.leftend = c.Normal),
                  (s.rightend = c.Normal),
                  e.setData(s),
                  t.append(e);
              }),
              v(this._leftBorderRenderer, new s(o.x, l), new s(o.x, p)),
              v(this._rightBorderRenderer, new s(a.x, l), new s(a.x, p)),
              (w = (o.y + a.y) / 2),
              (y = new s(o.x, w)),
              (m = new s(a.x, w)),
              (f = {}),
              (f.points = [y, m]),
              (f.width = g._model.timeScale().width()),
              (f.height = g._source.priceScale().height()),
              (f.color = g._source.properties().linecolor.value()),
              (f.linewidth = g._source.properties().linewidth.value()),
              (f.linestyle = CanvasEx.LINESTYLE_DASHED),
              (f.extendleft = !1),
              (f.extendright = !1),
              (f.leftend = c.Normal),
              (f.rightend = c.Arrow),
              this._distancePriceRenderer.setData(f),
              t.append(this._distancePriceRenderer),
              (x = this._source.points()[0].index),
              (b = this._source.points()[1].index),
              (R = b - x),
              (S = this._model.timeScale().indexToUserTime(x)),
              (P = this._model.timeScale().indexToUserTime(b)),
              (T = ''),
              S &&
                P &&
                ((L = (P.valueOf() - S.valueOf()) / 1e3),
                (C = _(new d().format(L))),
                (T = ', ' + C)),
              (k = $.t('{0} bars').format(u(R)) + T),
              (f = {}),
              (I = { x: 0, y: 10 }),
              (f.text = k),
              (f.color = i.textcolor.value()),
              (f.height = g._source.priceScale().height()),
              (f.font = i.font.value()),
              (f.offsetX = I.x),
              (f.offsetY = I.y),
              (f.vertAlign = 'middle'),
              (f.horzAlign = 'center'),
              (f.fontsize = i.fontsize.value()),
              (f.backgroundRoundRect = 4),
              (f.backgroundHorzInflate = 0.4 * i.fontsize.value()),
              (f.backgroundVertInflate = 0.2 * i.fontsize.value()),
              i.fillLabelBackground &&
                i.fillLabelBackground.value() &&
                ((f.backgroundColor = i.labelBackgroundColor.value()),
                (f.backgroundTransparency =
                  1 - i.labelBackgroundTransparency.value() / 100 || 0)),
              i.drawBorder &&
                i.drawBorder.value() &&
                (f.borderColor = i.borderColor.value()),
              (B = 0.5 * (o.x + a.x)),
              (A = a.y),
              (M = new s(B, A)),
              this._textRenderer.setData(f),
              (O = this._textRenderer.measure()),
              (D = {
                x:
                  B +
                  f.backgroundHorzInflate +
                  O.textBgPadding -
                  O.width / O.textBgPadding,
                y:
                  o.y > a.y
                    ? M.y - O.height - 2 * O.textBgPadding - I.y > 0
                      ? A - O.height - I.y - 2 * O.textBgPadding
                      : I.y - 2 * O.textBgPadding
                    : M.y + O.height + O.textBgPadding + I.y > f.height
                    ? f.height - O.height - I.y
                    : A + O.textBgPadding,
              }),
              this._textRenderer.setPoints([new s(B, D.y)]),
              t.append(this._textRenderer),
              this.addAnchors(t),
              t)
        );
      }),
      (t.DateRangePaneView = n);
  },
  766: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._percentageFormatter = new d()),
        (this._pipFormatter = null),
        (this._lastSymbolInfo = null),
        (this._topBorderRenderer = new l()),
        (this._bottomBorderRenderer = new l()),
        (this._distanceRenderer = new l()),
        (this._backgroundRenderer = new a()),
        (this._labelRenderer = new o({}));
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(186).TextRenderer,
      a = i(303).RectangleRenderer,
      l = i(185).TrendLineRenderer,
      h = i(69).CompositeRenderer,
      d = i(70).PercentageFormatter,
      c = i(315).PipFormatter,
      p = i(103).LineEnd,
      u = i(38).forceLTRStr;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        r.prototype._updateImpl.call(this);
      }),
      (n.prototype.renderer = function() {
        var e,
          t,
          i,
          n,
          r,
          o,
          a,
          l,
          d,
          _,
          f,
          g,
          v,
          w,
          y,
          m,
          x,
          b,
          R,
          S,
          P,
          T,
          L,
          C,
          k,
          I,
          B,
          A;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new h()),
          this._points.length < 2 || this._source.points().length < 2
            ? e
            : ((t = this._source.properties()),
              (i = t.extendLeft.value()),
              (n = t.extendRight.value()),
              (r = this._model.timeScale().width()),
              (o = this._points[0]),
              (a = this._points[1]),
              (l = i ? 0 : Math.min(o.x, a.x)),
              (d = n ? r : Math.max(o.x, a.x)),
              t.fillBackground &&
                t.fillBackground.value() &&
                ((_ = {}),
                (_.points = [new s(l, o.y), new s(d, a.y)]),
                (_.color = 'white'),
                (_.linewidth = 0),
                (_.backcolor = t.backgroundColor.value()),
                (_.fillBackground = !0),
                (_.transparency = t.backgroundTransparency.value()),
                this._backgroundRenderer.setData(_),
                e.append(this._backgroundRenderer)),
              (f = this),
              (g = function(t, i, n) {
                var s = {};
                (s.points = [i, n]),
                  (s.width = f._model.timeScale().width()),
                  (s.height = f._source.priceScale().height()),
                  (s.color = f._source.properties().linecolor.value()),
                  (s.linewidth = f._source.properties().linewidth.value()),
                  (s.linestyle = CanvasEx.LINESTYLE_SOLID),
                  (s.extendleft = !1),
                  (s.extendright = !1),
                  (s.leftend = p.Normal),
                  (s.rightend = p.Normal),
                  t.setData(s),
                  e.append(t);
              }),
              g(this._topBorderRenderer, new s(l, o.y), new s(d, o.y)),
              g(this._bottomBorderRenderer, new s(l, a.y), new s(d, a.y)),
              (o = this._points[0]),
              (a = this._points[1]),
              (v = (o.x + a.x) / 2),
              (w = new s(v, o.y)),
              (y = new s(v, a.y)),
              (_ = {}),
              (_.points = [w, y]),
              (_.width = f._model.timeScale().width()),
              (_.height = f._source.priceScale().height()),
              (_.color = f._source.properties().linecolor.value()),
              (_.linewidth = f._source.properties().linewidth.value()),
              (_.linestyle = CanvasEx.LINESTYLE_DASHED),
              (_.extendleft = !1),
              (_.extendright = !1),
              (_.leftend = p.Normal),
              (_.rightend = p.Arrow),
              this._distanceRenderer.setData(_),
              e.append(this._distanceRenderer),
              (m = this._source.points()[0].price),
              (x = this._source.points()[1].price),
              (b = x - m),
              (R = (100 * b) / m),
              (S = this._model.mainSeries().symbolInfo()),
              S &&
                S !== this._lastSymbolInfo &&
                ((this._pipFormatter = new c(
                  S.pricescale,
                  S.minmov,
                  S.type,
                  S.minmove2
                )),
                (this._lastSymbolInfo = S)),
              (P = u(
                this._source
                  .ownerSource()
                  .formatter()
                  .format(b) +
                  ' (' +
                  this._percentageFormatter.format(R) +
                  ') ' +
                  (this._pipFormatter ? this._pipFormatter.format(b) : '')
              )),
              (_ = {}),
              x > m
                ? ((T = a.clone()),
                  (T.y -= 2 * t.fontsize.value()),
                  (T.x = 0.5 * (o.x + a.x)),
                  (_.points = [T]))
                : ((T = a.clone()),
                  (T.x = 0.5 * (o.x + a.x)),
                  (T.y += 0.7 * t.fontsize.value()),
                  (_.points = [T])),
              (L = { x: 0, y: 10 }),
              (_.text = P),
              (_.color = t.textcolor.value()),
              (_.height = f._source.priceScale().height()),
              (_.font = t.font.value()),
              (_.offsetX = L.x),
              (_.offsetY = L.y),
              (_.vertAlign = 'middle'),
              (_.horzAlign = 'center'),
              (_.fontsize = t.fontsize.value()),
              (_.backgroundRoundRect = 4),
              (_.backgroundHorzInflate = 0.4 * t.fontsize.value()),
              (_.backgroundVertInflate = 0.2 * t.fontsize.value()),
              t.fillLabelBackground &&
                t.fillLabelBackground.value() &&
                ((_.backgroundColor = t.labelBackgroundColor.value()),
                (_.backgroundTransparency =
                  1 - t.labelBackgroundTransparency.value() / 100 || 0)),
              t.drawBorder &&
                t.drawBorder.value() &&
                (_.borderColor = t.borderColor.value()),
              (C = 0.5 * (o.x + a.x)),
              (k = a.y),
              (I = new s(C, k)),
              this._labelRenderer.setData(_),
              (B = this._labelRenderer.measure()),
              (A = {
                x:
                  C +
                  _.backgroundHorzInflate +
                  B.textBgPadding -
                  B.width / B.textBgPadding,
                y:
                  o.y > a.y
                    ? I.y - B.height - 2 * B.textBgPadding - L.y > 0
                      ? k - B.height - L.y - 2 * B.textBgPadding
                      : L.y - 2 * B.textBgPadding
                    : I.y + B.height + B.textBgPadding + L.y > _.height
                    ? _.height - B.height - L.y
                    : k + B.textBgPadding,
              }),
              this._labelRenderer.setPoints([new s(C, A.y)]),
              e.append(this._labelRenderer),
              this.addAnchors(e),
              e)
        );
      }),
      (t.PriceRangePaneView = n);
  },
  767: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._percentageFormatter = new d()),
        (this._pipFormatter = null),
        (this._lastSymbolInfo = null),
        (this._topBorderRenderer = new l()),
        (this._bottomBorderRenderer = new l()),
        (this._leftBorderRenderer = new l()),
        (this._rightBorderRenderer = new l()),
        (this._distanceLineRenderer = new l()),
        (this._distancePriceRenderer = new l()),
        (this._backgroundRenderer = new a()),
        (this._textRenderer = new o({}));
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(186).TextRenderer,
      a = i(303).RectangleRenderer,
      l = i(185).TrendLineRenderer,
      h = i(69).CompositeRenderer,
      d = i(70).PercentageFormatter,
      c = i(318).TimeSpanFormatter,
      p = i(315).PipFormatter,
      u = i(103).LineEnd,
      _ = i(38),
      f = _.forceLTRStr,
      g = _.startWithLTR;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        r.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (n.prototype.renderer = function() {
        var e,
          t,
          i,
          n,
          r,
          o,
          a,
          l,
          d,
          _,
          v,
          w,
          y,
          m,
          x,
          b,
          R,
          S,
          P,
          T,
          L,
          C,
          k,
          I,
          B,
          A,
          M,
          O,
          D,
          E,
          N,
          V,
          z;
        return (
          this._invalidated && this.updateImpl(),
          (e = new h()),
          this._points.length < 2 || this._source.points().length < 2
            ? e
            : ((t = this._source.properties()),
              t.fillBackground &&
                t.fillBackground.value() &&
                ((i = {}),
                (i.points = this._points),
                (i.color = 'white'),
                (i.linewidth = 0),
                (i.backcolor = t.backgroundColor.value()),
                (i.fillBackground = !0),
                (i.transparency = t.backgroundTransparency.value()),
                this._backgroundRenderer.setData(i),
                e.append(this._backgroundRenderer)),
              (n = this),
              (r = function(t, i, s) {
                var r = {};
                (r.points = [i, s]),
                  (r.width = n._model.timeScale().width()),
                  (r.height = n._source.priceScale().height()),
                  (r.color = n._source.properties().linecolor.value()),
                  (r.linewidth = n._source.properties().linewidth.value()),
                  (r.linestyle = CanvasEx.LINESTYLE_SOLID),
                  (r.extendleft = !1),
                  (r.extendright = !1),
                  (r.leftend = u.Normal),
                  (r.rightend = u.Normal),
                  t.setData(r),
                  e.append(t);
              }),
              (o = this._points[0]),
              (a = this._points[1]),
              r(this._topBorderRenderer, o, new s(a.x, o.y)),
              r(this._bottomBorderRenderer, new s(o.x, a.y), a),
              r(this._leftBorderRenderer, o, new s(o.x, a.y)),
              r(this._rightBorderRenderer, new s(a.x, o.y), a),
              (l = (o.y + a.y) / 2),
              (d = new s(o.x, l)),
              (_ = new s(a.x, l)),
              (i = {}),
              (i.points = [d, _]),
              (i.width = n._model.timeScale().width()),
              (i.height = n._source.priceScale().height()),
              (i.color = n._source.properties().linecolor.value()),
              (i.linewidth = n._source.properties().linewidth.value()),
              (i.linestyle = CanvasEx.LINESTYLE_DASHED),
              (i.extendleft = !1),
              (i.extendright = !1),
              (i.leftend = u.Normal),
              (i.rightend = u.Arrow),
              this._distanceLineRenderer.setData(i),
              e.append(this._distanceLineRenderer),
              (o = this._points[0]),
              (a = this._points[1]),
              (v = (o.x + a.x) / 2),
              (d = new s(v, o.y)),
              (_ = new s(v, a.y)),
              (i = {}),
              (i.points = [d, _]),
              (i.width = n._model.timeScale().width()),
              (i.height = n._source.priceScale().height()),
              (i.color = n._source.properties().linecolor.value()),
              (i.linewidth = n._source.properties().linewidth.value()),
              (i.linestyle = CanvasEx.LINESTYLE_DASHED),
              (i.extendleft = !1),
              (i.extendright = !1),
              (i.leftend = u.Normal),
              (i.rightend = u.Arrow),
              this._distancePriceRenderer.setData(i),
              e.append(this._distancePriceRenderer),
              (w = this._source.points()[0].price),
              (y = this._source.points()[1].price),
              (m = y - w),
              (x = (100 * m) / w),
              (b = this._source.points()[0].index),
              (R = this._source.points()[1].index),
              (S = R - b),
              (P = f(S + '')),
              (T = this._model.timeScale().indexToUserTime(b)),
              (L = this._model.timeScale().indexToUserTime(R)),
              (C = ''),
              T &&
                L &&
                ((k = (L.valueOf() - T.valueOf()) / 1e3),
                (C = ', ' + g(new c().format(k)))),
              (I = this._model.mainSeries().symbolInfo()),
              I &&
                I !== this._lastSymbolInfo &&
                ((this._pipFormatter = new p(
                  I.pricescale,
                  I.minmov,
                  I.type,
                  I.minmove2
                )),
                (this._lastSymbolInfo = I)),
              (B =
                this._source
                  .ownerSource()
                  .formatter()
                  .format(m) +
                ' (' +
                this._percentageFormatter.format(Math.round(100 * x) / 100) +
                ') ' +
                (this._pipFormatter ? this._pipFormatter.format(m) : '')),
              (A = f(B) + '\n' + $.t('{0} bars').format(P) + C),
              (i = {}),
              y > w
                ? ((M = a.clone()),
                  (M.y -= 2 * t.fontsize.value()),
                  (M.x = 0.5 * (o.x + a.x)),
                  (i.points = [M]))
                : ((M = a.clone()),
                  (M.x = 0.5 * (o.x + a.x)),
                  (M.y += 0.7 * t.fontsize.value()),
                  (i.points = [M])),
              (O = { x: 0, y: 10 }),
              (i.text = A),
              (i.color = t.textcolor.value()),
              (i.height = n._source.priceScale().height()),
              (i.font = t.font.value()),
              (i.offsetX = O.x),
              (i.offsetY = O.y),
              (i.padding = 5),
              (i.vertAlign = 'middle'),
              (i.horzAlign = 'center'),
              (i.fontsize = t.fontsize.value()),
              (i.backgroundRoundRect = 4),
              (i.backgroundHorzInflate = 0.4 * t.fontsize.value()),
              (i.backgroundVertInflate = 0.2 * t.fontsize.value()),
              t.fillLabelBackground &&
                t.fillLabelBackground.value() &&
                ((i.backgroundColor = t.labelBackgroundColor.value()),
                (i.backgroundTransparency =
                  1 - t.labelBackgroundTransparency.value() / 100 || 0)),
              t.drawBorder &&
                t.drawBorder.value() &&
                (i.borderColor = t.borderColor.value()),
              (D = 0.5 * (o.x + a.x)),
              (E = a.y),
              (N = new s(D, E)),
              this._textRenderer.setData(i),
              (V = this._textRenderer.measure()),
              (z = {
                x:
                  D +
                  i.backgroundHorzInflate +
                  V.textBgPadding -
                  V.width / V.textBgPadding,
                y:
                  o.y > a.y
                    ? N.y - V.height - 2 * V.textBgPadding - O.y > 0
                      ? E - V.height - O.y + V.textBgPadding
                      : O.y - 2 * V.textBgPadding
                    : N.y + V.height + V.textBgPadding + O.y > i.height
                    ? i.height - V.height - O.y
                    : E + V.textBgPadding,
              }),
              this._textRenderer.setPoints([new s(D, z.y)]),
              e.append(this._textRenderer),
              this.addAnchors(e),
              e)
        );
      }),
      (t.DateAndPriceRangePaneView = n);
  },
  768: function(e, t, i) {
    'use strict';
    function n(e, t) {
      s.call(this, e, t),
        (this._invalidated = !0),
        (this._renderer = new r()),
        (this._p3 = null),
        (this._p4 = null);
    }
    var s = i(824).LineSourcePaneView,
      r = i(1014).ParallelChannelRenderer,
      o = i(867).PaneRendererClockIcon,
      a = i(69).CompositeRenderer;
    inherit(n, s),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, r, o, a, l, h, d, c;
        s.prototype._updateImpl.call(this),
          this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            0 !== this._source.points().length &&
            (this._source._priceOffset || this._source.calculatePriceDiff(),
            3 === this._points.length &&
              this._source._priceOffset &&
              ((e = this._points[0]),
              (t = this._points[1]),
              (i = this._source._priceOffset + this._source.points()[0].price),
              (n = this._source._priceOffset + this._source.points()[1].price),
              (this._p3 = e.clone()),
              (this._p4 = t.clone()),
              (r = this._source.priceScale()),
              (o = this._source.ownerSource().firstValue()),
              r.isLog()
                ? ((a = 0.5 * (i + n) - this._source._priceOffset),
                  (l = 0.5 * (i + n)),
                  (h = this._source.priceScale().priceToCoordinate(a, o)),
                  (d = this._source.priceScale().priceToCoordinate(l, o)),
                  (c = d - h),
                  (this._p3.y += c),
                  (this._p4.y += c))
                : ((this._p3.y = this._source
                    .priceScale()
                    .priceToCoordinate(i, o)),
                  (this._p4.y = this._source
                    .priceScale()
                    .priceToCoordinate(n, o)))));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = {}),
          (e.points = []),
          this._points.length > 1 &&
            (e.points.push(this._points[0]), e.points.push(this._points[1])),
          this._points.length > 2 &&
            null !== this._p3 &&
            null !== this._p4 &&
            (e.points.push(this._p3), e.points.push(this._p4)),
          (e.color = this._source.properties().linecolor.value()),
          (e.width = this._model.timeScale().width()),
          (e.height = this._source.priceScale().height()),
          (t = this._source.properties()),
          (e.linewidth = t.linewidth.value()),
          (e.linestyle = t.linestyle.value()),
          (e.extendleft = t.extendLeft.value()),
          (e.extendright = t.extendRight.value()),
          (e.fillBackground = t.fillBackground.value()),
          (e.backcolor = t.backgroundColor.value()),
          (e.transparency = t.transparency.value()),
          (e.showMidline = t.showMidline.value()),
          (e.midlinewidth = t.midlinewidth.value()),
          (e.midlinestyle = t.midlinestyle.value()),
          (e.midcolor = t.midlinecolor.value()),
          (e.fillBackground = t.fillBackground.value()),
          (e.hittestOnBackground = !0),
          this._renderer.setData(e),
          (i = new a()),
          i.append(this._renderer),
          this.isAnchorsRequired() &&
            ((n = []),
            this._points[0] && n.push(this._points[0]),
            this._points[1] && n.push(this._points[1]),
            this._p3 &&
              (n.push(this._p3.add(this._p4).scaled(0.5)),
              (n[n.length - 1].data = n.length - 1)),
            (s = 3 === this._points.length && !this._p3),
            this._model.lineBeingCreated() !== this._source || s || n.pop(),
            i.append(this.createLineAnchor({ points: n }))),
          !TradingView.printing &&
            this._source.hasAlert.value() &&
            !this._model.readOnly() &&
            this._points.length >= 2 &&
            ((r = this._points),
            this._source.getAlertIsActive(function(e) {
              i.append(
                new o({
                  point1: r[0],
                  point2: r[1],
                  color: e
                    ? t.linecolor.value()
                    : defaults(
                        'chartproperties.alertsProperties.drawingIcon.color'
                      ),
                })
              );
            })),
          i
        );
      }),
      (t.ParallelChannelPaneView = n);
  },
  769: function(e, t, i) {
    'use strict';
    function n() {
      this._data = null;
    }
    function s(e, t) {
      o.call(this, e, t),
        (this._label = null),
        (this._rendererCache = {}),
        (this._invalidated = !0),
        (this._pipFormatter = null),
        (this._lastSymbolInfo = null),
        (this._trendLineRenderer = new h()),
        (this._angleRenderer = new n()),
        (this._angleLabelRenderer = new l({}));
    }
    var r = i(6).Point,
      o = i(824).LineSourcePaneView,
      a = i(349).TrendLineStatsRenderer,
      l = i(186).TextRenderer,
      h = i(185).TrendLineRenderer,
      d = i(69).CompositeRenderer,
      c = i(70).PercentageFormatter,
      p = i(190).SelectionRenderer,
      u = i(315).PipFormatter,
      _ = i(103).LineEnd,
      f = i(327).LabelSettings,
      g = i(867).PaneRendererClockIcon,
      v = i(38).forceLTRStr;
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype.hitTest = function() {
        return null;
      }),
      (n.prototype.draw = function(e) {
        var t, i;
        null !== this._data &&
          (e.save(),
          e.translate(this._data.point.x, this._data.point.y),
          (e.strokeStyle = this._data.color),
          (t = [1, 2]),
          'function' == typeof e.setLineDash
            ? e.setLineDash(t)
            : void 0 !== e.mozDash
            ? (e.mozDash = t)
            : void 0 !== e.webkitLineDash && (e.webkitLineDash = t),
          (i = this._data.size),
          e.beginPath(),
          e.moveTo(0, 0),
          e.lineTo(i, 0),
          e.arc(0, 0, i, 0, -this._data.angle, this._data.angle > 0),
          e.stroke(),
          e.restore());
      }),
      inherit(s, o),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        var e, t, i, n, s, a, l, h, d, p, _, f, g, w;
        o.prototype._updateImpl.call(this),
          this._points.length > 0 &&
            void 0 !== this._source._angle &&
            ((e = this._points[0]),
            (t = Math.cos(this._source._angle)),
            (i = -Math.sin(this._source._angle)),
            (n = new r(t, i)),
            (this._secondPoint = e.addScaled(n, this._source._distance)),
            (this._secondPoint.data = 1),
            (this._middlePoint = this._source.calcMiddlePoint(
              this._points[0],
              this._secondPoint
            ))),
          (this._label = null),
          this._source.points().length < 2 ||
            ((e = this._source.points()[0]),
            (s = this._source.points()[1]),
            (a = []),
            this._source.properties().showPriceRange.value() &&
              this._source.priceScale() &&
              ((d = s.price - e.price),
              (p = d / e.price),
              (l =
                this._source
                  .ownerSource()
                  .formatter()
                  .format(d) +
                ' (' +
                new c().format(100 * p) +
                ') '),
              (_ = this._model.mainSeries().symbolInfo()),
              _ &&
                _ !== this._lastSymbolInfo &&
                ((this._pipFormatter = new u(
                  _.pricescale,
                  _.minmov,
                  _.type,
                  _.minmove2
                )),
                (this._lastSymbolInfo = _)),
              (f = this._pipFormatter
                ? ', ' + this._pipFormatter.format(d)
                : ''),
              (l += f),
              a.push('priceRange')),
            (g = this._source.properties().showBarsRange.value()),
            g &&
              ((h = ''),
              (w = s.index - e.index),
              (h += $.t('{0} bars').format(v(w))),
              a.push('barsRange')),
            (this._label =
              [v(l), h]
                .filter(function(e) {
                  return e;
                })
                .join('\n') || null),
            (this._icons = a));
      }),
      (s.prototype.renderer = function() {
        var e, t, i, n, s, r, o, l, h, c, u, w;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new d()),
          (t = {}),
          (i = this.isAnchorsRequired()),
          (n = i || this._source.properties().alwaysShowStats.value()),
          (s =
            (this.isHoveredSource() || this.isSelectedSource()) &&
            this._source.properties().showMiddlePoint.value()),
          this._secondPoint &&
            this._points.length > 0 &&
            ((t.points = [this._points[0], this._secondPoint]),
            (t.width = this._model.timeScale().width()),
            (t.height = this._source.priceScale().height()),
            (t.color = this._source.properties().linecolor.value()),
            (t.linewidth = this._source.properties().linewidth.value()),
            (t.linestyle = this._source.properties().linestyle.value()),
            (t.extendleft = this._source.properties().extendLeft.value()),
            (t.extendright = this._source.properties().extendRight.value()),
            (t.leftend = _.Normal),
            (t.rightend = _.Normal),
            this._trendLineRenderer.setData(t),
            e.append(this._trendLineRenderer),
            n &&
              this._label &&
              2 === this._points.length &&
              ((r = this._source.properties().statsPosition.value()),
              (o = this._source.getPointByPosition(
                r,
                t.points[0],
                this._middlePoint,
                t.points[1]
              )),
              (l = {
                points: [o],
                text: this._label,
                color: this._source.properties().textcolor.value(),
                font: f.font,
                fontsize: f.fontSize,
                lineSpacing: f.lineSpacing,
                backgroundColor: f.bgColor,
                borderColor: f.borderColor,
                borderWidth: 1,
                padding: f.padding,
                paddingLeft: 30,
                doNotAlignText: !0,
                icons: this._icons,
                forceTextAlign: !0,
              }),
              (h = f.offset),
              (l.offsetX = h),
              (this._points[1].y < this._points[0].y &&
                this._points[1].x < this._points[0].x) ||
              (this._points[1].y > this._points[0].y &&
                this._points[1].x > this._points[0].x)
                ? ((l.vertAlign = 'bottom'), (l.offsetY = -h))
                : (l.offsetY = h),
              e.append(new a(l, this._rendererCache))),
            s &&
              this._middlePoint &&
              e.append(new p({ points: [this._middlePoint] })),
            (c = {}),
            (c.point = this._points[0]),
            (c.angle = this._source._angle),
            (c.color = this._source.properties().linecolor.value()),
            (c.size = 50),
            this._angleRenderer.setData(c),
            e.append(this._angleRenderer),
            (u = Math.round((180 * c.angle) / Math.PI) + 'º'),
            (o = this._points[0].clone()),
            (o.x = o.x + 50),
            (w = {
              points: [o],
              text: v(u),
              color: this._source.properties().textcolor.value(),
              horzAlign: 'left',
              font: this._source.properties().font.value(),
              offsetX: 5,
              offsetY: 0,
              bold: this._source.properties().bold.value(),
              italic: this._source.properties().italic.value(),
              fontsize: this._source.properties().fontsize.value(),
              vertAlign: 'middle',
            }),
            this._angleLabelRenderer.setData(w),
            e.append(this._angleLabelRenderer)),
          !TradingView.printing &&
            this._source.hasAlert.value() &&
            !this._model.readOnly() &&
            t &&
            t.points &&
            t.points.length >= 2 &&
            this._source.getAlertIsActive(function(i) {
              e.append(
                new g({
                  point1: t.points[0],
                  point2: t.points[1],
                  color: i
                    ? t.color
                    : defaults(
                        'chartproperties.alertsProperties.drawingIcon.color'
                      ),
                })
              );
            }),
          this._secondPoint &&
            this._points.length > 0 &&
            i &&
            e.append(
              this.createLineAnchor({
                points: [this._points[0], this._secondPoint],
              })
            ),
          e
        );
      }),
      (t.TrendAnglePaneView = s);
  },
  770: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._label = null),
        (this._rendererCache = {}),
        (this._invalidated = !0),
        (this._labelDataInvalidated = !0),
        (this._percentageFormatter = new h()),
        (this._numericFormatter = new d()),
        (this._pipFormatter = null),
        (this._lastSymbolInfo = null),
        (this._trendRenderer = new _());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(312),
      a = i(867).PaneRendererClockIcon,
      l = i(69).CompositeRenderer,
      h = i(70).PercentageFormatter,
      d = i(105).NumericFormatter,
      c = i(318).TimeSpanFormatter,
      p = i(315).PipFormatter,
      u = i(190).SelectionRenderer,
      _ = i(185).TrendLineRenderer,
      f = i(327).LabelSettings,
      g = i(38),
      v = g.forceLTRStr,
      w = g.startWithLTR;
    inherit(n, r),
      (n.prototype.update = function() {
        (this._invalidated = !0), (this._labelDataInvalidated = !0);
      }),
      (n.prototype.updateImpl = function() {
        var e,
          t,
          i,
          n,
          s,
          o,
          a,
          l,
          h,
          d,
          c = this._source.points();
        c.length < 2 ||
          ((e = c[0]),
          (t = c[1]),
          null !== (i = this._model.timeScale().visibleBars()) &&
            ((n = this._source.properties()),
            (e.index < i.firstBar() &&
              t.index < i.firstBar() &&
              !n.extendLeft.value() &&
              !n.extendRight.value()) ||
              (r.prototype._updateImpl.call(this),
              this._points.length < 2 ||
                ((s = n.showBarsRange.value()),
                (o = n.showDateTimeRange.value()),
                (a = n.showDistance.value()),
                (l = n.showPriceRange.value()),
                (h = n.showAngle.value()),
                l || s || o || a || h
                  ? ((d = this),
                    (this._statCache = this._model._trendLineStatsCache.updateSource(
                      this._source,
                      function() {
                        return d._statLabelData();
                      }
                    )))
                  : (this._model._trendLineStatsCache.removeSource(
                      this._source.id()
                    ),
                    (this._label = null),
                    this._labelData &&
                      ((this._labelData.text = ''),
                      (this._labelData.lines = []))),
                (this._invalidated = !1)))));
      }),
      (n.prototype._statLabelData = function() {
        var e,
          t,
          i,
          n,
          r,
          o,
          a,
          l,
          h,
          d,
          u,
          _,
          g,
          y,
          m,
          x,
          b,
          R,
          S,
          P,
          T,
          L,
          C,
          k,
          I,
          B,
          A;
        return (
          this._labelDataInvalidated &&
            ((e = this._source.points()),
            (t = e[0]),
            (i = e[1]),
            (n = this._source.properties()),
            (r = []),
            (u = n.showPriceRange.value()),
            u &&
              this._source.priceScale() &&
              ((h = i.price - t.price),
              (_ = h / t.price),
              (o =
                this._source
                  .ownerSource()
                  .formatter()
                  .format(h) +
                ' (' +
                this._percentageFormatter.format(100 * _) +
                ')'),
              (g = this._model.mainSeries().symbolInfo()),
              g &&
                g !== this._lastSymbolInfo &&
                ((this._pipFormatter = new p(
                  g.pricescale,
                  g.minmov,
                  g.type,
                  g.minmove2
                )),
                (this._lastSymbolInfo = g)),
              (o += this._pipFormatter
                ? ', ' + this._pipFormatter.format(h)
                : ''),
              r.push('priceRange')),
            (y = n.showBarsRange.value()),
            (m = n.showDateTimeRange.value()),
            (x = n.showDistance.value()),
            (y || m || x) &&
              ((a = ''),
              y &&
                ((d = i.index - t.index), (a += $.t('{0} bars').format(v(d)))),
              m &&
                ((b = this._model.timeScale().indexToUserTime(t.index)),
                (R = this._model.timeScale().indexToUserTime(i.index)),
                b &&
                  R &&
                  ((S = (R.valueOf() - b.valueOf()) / 1e3),
                  (P = w(new c().format(S))) && (a += y ? ' (' + P + ')' : P))),
              x &&
                (a && (a += ', '),
                void 0 === h && (h = i.price - t.price),
                void 0 === d && (d = i.index - t.index),
                (T = Math.round(1e5 * Math.sqrt(h * h + d * d)) / 1e5),
                (a += $.t('distance: {0}').format(
                  v(this._numericFormatter.format(T))
                ))),
              a && r.push('barsRange')),
            (L = n.showAngle.value()),
            L &&
              ((C = this._source.pointToScreenPoint(t)),
              (k = this._source.pointToScreenPoint(i)),
              (C = C instanceof Array ? C[0] : C instanceof s ? C : null),
              (k = k instanceof Array ? k[0] : k instanceof s ? k : null),
              C instanceof s &&
                k instanceof s &&
                ((B = k.subtract(C)),
                B.length() > 0 &&
                  ((B = B.normalized()),
                  (I = Math.acos(B.x)),
                  B.y > 0 && (I = -I))),
              'number' != typeof I ||
                TradingView.isNaN(I) ||
                ((l = Math.round((180 * I) / Math.PI) + 'º'), r.push('angle'))),
            (this._label =
              [v(o), a, l]
                .filter(function(e) {
                  return e;
                })
                .join('\n') || null),
            (this._icons = r),
            (this._labelDataInvalidated = !1)),
          (A = {
            points: [this._points[1]],
            text: this._label,
            color: this._source.properties().textcolor.value(),
            font: f.font,
            fontsize: f.fontSize,
            lineSpacing: f.lineSpacing,
            backgroundColor: f.bgColor,
            borderColor: f.borderColor,
            borderWidth: 1,
            padding: f.padding,
            paddingLeft: 30,
            doNotAlignText: !0,
            icons: this._icons,
          }),
          this._points[1].y < this._points[0].y && (A.vertAlign = 'bottom'),
          this._points[1].x < this._points[0].x && (A.horzAlign = 'right'),
          (this._labelData = A),
          A
        );
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, h, d, c, p, _;
        return (
          this._invalidated && this.updateImpl(),
          (e = new l()),
          this._invalidated
            ? e
            : this._source.priceScale()
            ? ((t = {}),
              (t.points = this._points),
              (t.floatPoints = this._floatPoints),
              (t.width = this._model.timeScale().width()),
              (t.height = this._source.priceScale().height()),
              (t.color = this._source.properties().linecolor.value()),
              (t.linewidth = this._source.properties().linewidth.value()),
              (t.linestyle = this._source.properties().linestyle.value()),
              (t.extendleft = this._source.properties().extendLeft.value()),
              (t.extendright = this._source.properties().extendRight.value()),
              (t.leftend = this._source.properties().leftEnd.value()),
              (t.rightend = this._source.properties().rightEnd.value()),
              this._trendRenderer.setData(t),
              e.append(this._trendRenderer),
              (i = this.isAnchorsRequired()),
              (n = i || this._source.properties().alwaysShowStats.value()),
              (s =
                (this.isHoveredSource() || this.isSelectedSource()) &&
                this._source.properties().showMiddlePoint.value()),
              n &&
                this._label &&
                2 === this._points.length &&
                ((r = this._source.properties().statsPosition.value()),
                (h = this._source.getPointByPosition(
                  r,
                  this._points[0],
                  this._middlePoint,
                  this._points[1]
                )),
                (d = {
                  left: 0,
                  top: this._model._trendLineStatsCache.topByRow(
                    this._statCache.row
                  ),
                  width: this._model._trendLineStatsCache.rowWidth(
                    this._statCache.row
                  ),
                  height: this._model._trendLineStatsCache.rowHeight(
                    this._statCache.row
                  ),
                }),
                (c = {
                  left: Math.floor(h.x),
                  top: Math.floor(h.y),
                  width: d.width,
                  height: d.height,
                }),
                (c.left += f.padding),
                (this._points[1].y < this._points[0].y &&
                  this._points[1].x < this._points[0].x) ||
                (this._points[1].y > this._points[0].y &&
                  this._points[1].x > this._points[0].x)
                  ? (c.top -= f.padding + c.height)
                  : (c.top += f.padding),
                (p = this._model._trendLineStatsCache.canvas()),
                (_ = new o(p.get(0), d, c)),
                e.append(_)),
              s &&
                this._middlePoint &&
                e.append(new u({ points: [this._middlePoint] })),
              this.addAnchors(e),
              !TradingView.printing &&
                this._source.hasAlert.value() &&
                !this._model.readOnly() &&
                t.points.length >= 2 &&
                this._source.getAlertIsActive(function(i) {
                  e.append(
                    new a({
                      point1: t.points[0],
                      point2: t.points[1],
                      color: i
                        ? t.color
                        : defaults(
                            'chartproperties.alertsProperties.drawingIcon.color'
                          ),
                    })
                  );
                }),
              e)
            : e
        );
      }),
      (t.TrendLinePaneView = n);
  },
  771: function(e, t, i) {
    'use strict';
    function n(e, t) {
      (this._data = e), (this._adapter = t);
    }
    function s(e, t) {
      o.call(this, e, t), (this._invalidated = !0);
    }
    var r = i(6).Point,
      o = i(824).LineSourcePaneView,
      a = i(131),
      l = i(9).HitTestResult;
    (n.prototype._textWidth = function(e) {
      var t, i;
      return 0 === this._adapter.getText().length
        ? 0
        : (e.save(),
          (e.font = this._adapter.getFont()),
          (t = 5),
          (i = e.measureText(this._adapter.getText()).width),
          e.restore(),
          t + i);
    }),
      (n.prototype._drawArrow = function(e, t, i) {
        var n, s;
        e.save(),
          (e.strokeStyle = this._adapter.getArrowColor()),
          (e.fillStyle = this._adapter.getArrowColor()),
          (n = this._adapter.getArrowHeight()),
          (s = this._adapter.getDirection()),
          e.translate(t, i),
          'buy' !== s && e.rotate(Math.PI),
          CanvasEx.drawArrow(e, 0, 0, 0, n),
          e.restore();
      }),
      (n.prototype._drawText = function(e, t, i) {
        var n,
          s,
          r = this._adapter.getText();
        r &&
          (e.save(),
          (e.textAlign = 'center'),
          (e.textBaseline = 'middle'),
          (e.font = this._adapter.getFont()),
          (e.fillStyle = this._adapter.getTextColor()),
          (n = t + this._textWidth(e) / 2),
          (s = i + a.fontHeight(this._adapter.getFont()) / 2),
          e.fillText(r, n, s - 1),
          e.restore());
      }),
      (n.prototype.draw = function(e) {
        var t,
          i,
          n,
          s,
          r,
          o,
          l = Math.round(this._data.points[0].x + 0.5),
          h = Math.round(this._data.points[0].y);
        this._drawArrow(e, l, h),
          0 !== (t = this._textWidth(e)) &&
            ((i = this._adapter.getArrowHeight()),
            (n = this._adapter.getArrowSpacing()),
            (s = a.fontHeight(this._adapter.getFont())),
            (r = this._adapter.getDirection()),
            (o = 'buy' === r ? h + i + n : h - i - n - s),
            this._drawText(e, Math.round(l - t / 2), o));
      }),
      (n.prototype.hitTest = function(e) {
        var t,
          i,
          n,
          s = Math.round(this._data.points[0].x),
          r = Math.round(this._data.points[0].y),
          o = this._adapter.getArrowHeight();
        return (
          'buy' === this._adapter.getDirection()
            ? ((t = r), (i = r + o))
            : ((t = r - o), (i = r)),
          e.x >= s - 2 && e.x <= s + 2 && e.y >= t && e.y <= i
            ? ((n = this._adapter.getTooltip()),
              new l(l.CUSTOM, {
                mouseDownHandler: function() {
                  TradingView.TradingWidget &&
                    TradingView.TradingWidget.journalDialog();
                },
                tooltip:
                  '' !== n
                    ? { text: n, rect: { x: s, y: t, w: 2, h: i - t } }
                    : null,
              }))
            : null
        );
      }),
      inherit(s, o),
      (s.prototype._renderer = null),
      (s.prototype._rendererCached = !1),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        o.prototype._updateImpl.call(this),
          (this._renderer = null),
          (this._rendererCached = !1),
          (this._invalidated = !1);
      }),
      (s.prototype.renderer = function(e) {
        var t, i, s, o, a, l, h, d;
        return (
          this._invalidated && this.updateImpl(),
          this._rendererCached
            ? this._renderer
            : ((this._rendererCached = !0),
              (t = this._source),
              (i = t.points()),
              0 === i.length
                ? null
                : ((s = t._adapter),
                  (o = t._model.timeScale()),
                  (a = this._source._model
                    .paneForSource(this._source)
                    .executionsPositionController()),
                  (l = a.getXYCoordinate(s, o, i[0].index)),
                  !isFinite(l.y) || l.y < 0 || l.y > e || l.x < 0
                    ? ((this._renderer = null), null)
                    : ((h = [new r(l.x, l.y)]),
                      (d = { points: h }),
                      (this._renderer = new n(d, s)),
                      this._renderer)))
        );
      }),
      (t.ExecutionPaneView = s);
  },
  772: function(e, t, i) {
    'use strict';
    function n(e, t) {
      s.call(this, e, t),
        (this._invalidated = !0),
        (this._medianRenderer = new o()),
        (this._sideRenderer = new o());
    }
    var s = i(824).LineSourcePaneView,
      r = i(977).ChannelRenderer,
      o = i(185).TrendLineRenderer,
      a = i(9).HitTestResult,
      l = i(69).CompositeRenderer,
      h = i(103).LineEnd;
    inherit(n, s),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        s.prototype._updateImpl.call(this),
          0 !== this._floatPoints.length &&
            (3 === this._floatPoints.length
              ? ((this._medianPoint = this._floatPoints[1]
                  .add(this._floatPoints[2])
                  .scaled(0.5)),
                (this._medianPoint.data = 3))
              : 2 === this._floatPoints.length
              ? ((this._medianPoint = this._floatPoints[1]),
                (this._medianPoint.data = 3))
              : ((this._medianPoint = this._floatPoints[0]),
                (this._medianPoint.data = 3)));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, d, c, p, u, _, f, g, v, w, y, m;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new l()),
          this._floatPoints.length < 2)
        )
          return e;
        if (!this._medianPoint) return e;
        if (
          ((t = {
            points: [this._floatPoints[0], this._medianPoint],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: this._source.properties().median.color.value(),
            linewidth: this._source.properties().median.linewidth.value(),
            linestyle: this._source.properties().median.linestyle.value(),
            extendleft: !1,
            extendright: !0,
            leftend: h.Normal,
            rightend: h.Normal,
          }),
          this._medianRenderer.setData(t),
          e.append(this._medianRenderer),
          this._floatPoints.length < 3)
        )
          return this.addAnchors(e), e;
        for (
          i = {
            points: [this._floatPoints[1], this._floatPoints[2]],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: this._source.properties().median.color.value(),
            linewidth: this._source.properties().median.linewidth.value(),
            linestyle: this._source.properties().median.linestyle.value(),
            extendleft: !1,
            extendright: !1,
            leftend: h.Normal,
            rightend: h.Normal,
          },
            this._sideRenderer.setData(i),
            e.append(this._sideRenderer),
            n = 0,
            s = this._floatPoints[2].subtract(this._floatPoints[1]).scaled(0.5),
            d = this._source.properties().fillBackground.value(),
            c = this._source.properties().transparency.value(),
            p = 0;
          p <= 8;
          p++
        )
          (u = 'level' + p),
            (_ = this._source.properties()[u]),
            _.visible.value() &&
              ((f = this._medianPoint.addScaled(s, _.coeff.value())),
              (g = this._medianPoint.addScaled(s, -_.coeff.value())),
              d &&
                ((v = {}),
                (v.width = this._model.timeScale().width()),
                (v.height = this._source.priceScale().height()),
                (v.p1 = this._floatPoints[0]),
                (v.p2 = f),
                (v.p3 = this._floatPoints[0]),
                (v.p4 = this._medianPoint.addScaled(s, n)),
                (v.color = _.color.value()),
                (v.transparency = c),
                (v.hittestOnBackground = !0),
                (w = new r()),
                w.setData(v),
                e.append(w),
                (v = {}),
                (v.width = this._model.timeScale().width()),
                (v.height = this._source.priceScale().height()),
                (v.p1 = this._floatPoints[0]),
                (v.p2 = g),
                (v.p3 = this._floatPoints[0]),
                (v.p4 = this._medianPoint.addScaled(s, -n)),
                (v.color = _.color.value()),
                (v.transparency = c),
                (v.hittestOnBackground = !0),
                (w = new r()),
                w.setData(v),
                e.append(w)),
              (n = _.coeff.value()),
              (y = {
                points: [this._floatPoints[0], f],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: _.color.value(),
                linewidth: _.linewidth.value(),
                linestyle: _.linestyle.value(),
                extendleft: !1,
                extendright: !0,
                leftend: h.Normal,
                rightend: h.Normal,
              }),
              (w = new o()),
              w.setData(y),
              w.setHitTest(new a(a.MOVEPOINT, null, p)),
              e.append(w),
              (m = {
                points: [this._floatPoints[0], g],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: _.color.value(),
                linewidth: _.linewidth.value(),
                linestyle: _.linestyle.value(),
                extendleft: !1,
                extendright: !0,
                leftend: h.Normal,
                rightend: h.Normal,
              }),
              (w = new o()),
              w.setData(m),
              w.setHitTest(new a(a.MOVEPOINT, null, p)),
              e.append(w));
        return this.addAnchors(e), e;
      }),
      (t.PitchfanLinePaneView = n);
  },
  773: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._numericFormatter = new d()),
        (this._invalidated = !0);
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(186).TextRenderer,
      a = i(303).RectangleRenderer,
      l = i(185).TrendLineRenderer,
      h = i(69).CompositeRenderer,
      d = i(105).NumericFormatter,
      c = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.renderer = function() {
        function e(e, t, i) {
          function n(t) {
            var i = new l();
            i.setData(Object.assign({}, P, { points: t })), e.append(i);
          }
          var o,
            a,
            h,
            f,
            g,
            v,
            w,
            y,
            m,
            x = new s(r, d),
            b = new s(p, d),
            R = new s(r, u),
            S = new s(p, u),
            P = {
              width: k._model.timeScale().width(),
              height: k._source.priceScale().height(),
              color: _.fans.color.value(),
              linewidth: _.linewidth.value(),
              linestyle: _.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: c.Normal,
              rightend: c.Normal,
            };
          for (o = 0; o < t.length; ++o)
            (a = i ? u : t[o]),
              (h = i ? d : t[o]),
              (f = i ? t[o] : r),
              (g = i ? t[o] : p),
              (v = new s(g, a)),
              (w = new s(f, a)),
              (y = new s(g, h)),
              (m = new s(f, h)),
              n([R, y]),
              n([S, m]),
              n([x, v]),
              n([b, w]);
        }
        var t, i, n, r, d, p, u, _, f, g, v, w, y, m, x, b, R, S, P, T, L, C, k;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (t = new h()),
          this._points.length < 2)
        )
          return this.addAnchors(t), t;
        for (
          i = this._points[0],
            n = this._points[1],
            r = Math.min(i.x, n.x),
            d = Math.min(i.y, n.y),
            p = Math.max(i.x, n.x),
            u = Math.max(i.y, n.y),
            _ = this._source.properties(),
            f = this._source.properties().fillHorzBackground.value(),
            g = this._source.properties().horzTransparency.value(),
            v = this._source.properties().fillVertBackground.value(),
            w = this._source.properties().vertTransparency.value(),
            y = 0;
          y < this._hlevels.length;
          y++
        )
          y > 0 &&
            f &&
            ((m = this._hlevels[y - 1]),
            (i = new s(r, this._hlevels[y].y)),
            (n = new s(p, m.y)),
            (x = {}),
            (x.points = [i, n]),
            (x.color = this._hlevels[y].color),
            (x.linewidth = 0),
            (x.backcolor = this._hlevels[y].color),
            (x.fillBackground = !0),
            (x.transparency = g),
            (b = new a(void 0, void 0, !0)),
            b.setData(x),
            t.append(b)),
            (i = new s(r, this._hlevels[y].y)),
            (n = new s(p, this._hlevels[y].y)),
            (R = {
              points: [i, n],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: this._hlevels[y].color,
              linewidth: _.linewidth.value(),
              linestyle: _.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: c.Normal,
              rightend: c.Normal,
            }),
            (b = new l()),
            b.setData(R),
            t.append(b),
            _.showLeftLabels.value() &&
              ((S = {
                points: [i],
                text: this._numericFormatter.format(this._hlevels[y].coeff),
                color: this._hlevels[y].color,
                vertAlign: 'middle',
                horzAlign: 'right',
                font: _.font.value(),
                offsetX: -5,
                offsetY: 0,
                fontsize: 12,
                forceTextAlign: !0,
              }),
              t.append(new o(S))),
            _.showRightLabels.value() &&
              ((P = {
                points: [n],
                text: this._numericFormatter.format(this._hlevels[y].coeff),
                color: this._hlevels[y].color,
                vertAlign: 'middle',
                horzAlign: 'left',
                font: _.font.value(),
                offsetX: 5,
                offsetY: 0,
                fontsize: 12,
              }),
              t.append(new o(P)));
        for (y = 0; y < this._vlevels.length; y++)
          (i = new s(this._vlevels[y].x, d)),
            (n = new s(this._vlevels[y].x, u)),
            y > 0 &&
              v &&
              ((m = this._vlevels[y - 1]),
              (T = new s(m.x, d)),
              (x = {}),
              (x.points = [T, n]),
              (x.color = this._vlevels[y].color),
              (x.linewidth = 0),
              (x.backcolor = this._vlevels[y].color),
              (x.fillBackground = !0),
              (x.transparency = w),
              (b = new a(void 0, void 0, !0)),
              b.setData(x),
              t.append(b)),
            (R = {
              points: [i, n],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: this._vlevels[y].color,
              linewidth: _.linewidth.value(),
              linestyle: _.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: c.Normal,
              rightend: c.Normal,
            }),
            (b = new l()),
            b.setData(R),
            t.append(b),
            _.showTopLabels.value() &&
              ((L = {
                points: [i],
                text: this._numericFormatter.format(this._vlevels[y].coeff),
                color: this._vlevels[y].color,
                vertAlign: 'bottom',
                horzAlign: 'center',
                font: _.font.value(),
                offsetX: 0,
                offsetY: -5,
                fontsize: 12,
              }),
              t.append(new o(L))),
            _.showBottomLabels.value() &&
              ((C = {
                points: [n],
                text: this._numericFormatter.format(this._vlevels[y].coeff),
                color: this._vlevels[y].color,
                vertAlign: 'top',
                horzAlign: 'center',
                font: _.font.value(),
                offsetX: 0,
                offsetY: 5,
                fontsize: 12,
              }),
              t.append(new o(C)));
        return (
          (k = this),
          e(t, this._hfans, !0),
          e(t, this._vfans, !1),
          this.addAnchors(t),
          t
        );
      }),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, s, o, a, l, h, d, c, p, u, _, f, g, v, w;
        if (
          (r.prototype._updateImpl.call(this),
          !(this._source.points().length < 2) &&
            this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            !this._model.timeScale().isEmpty())
        ) {
          for (
            e = this._source.points()[0],
              t = this._source.points()[1],
              i = this._source.properties(),
              n = i.reverse && i.reverse.value(),
              this._hlevels = [],
              s = n ? e.price - t.price : t.price - e.price,
              o = n ? t.price : e.price,
              a = this._source.ownerSource().firstValue(),
              l = 1;
            l <= 7;
            l++
          )
            (h = 'hlevel' + l),
              (d = i[h]),
              d.visible.value() &&
                ((c = d.coeff.value()),
                (p = d.color.value()),
                (u = o + c * s),
                (_ = this._source.priceScale().priceToCoordinate(u, a)),
                this._hlevels.push({ coeff: c, color: p, y: _ }));
          for (
            this._vlevels = [],
              f = n ? e.index - t.index : t.index - e.index,
              g = n ? t.index : e.index,
              l = 1;
            l <= 7;
            l++
          )
            (h = 'vlevel' + l),
              (d = i[h]),
              d.visible.value() &&
                ((c = d.coeff.value()),
                (p = d.color.value()),
                (v = Math.round(g + c * f)),
                (w = this._model.timeScale().indexToCoordinate(v)),
                this._vlevels.push({ coeff: c, color: p, x: w }));
          if (((this._hfans = []), (this._vfans = []), i.fans.visible.value()))
            for (l = 1; l <= 7; l++)
              (v = Math.round(g + i['hlevel' + l].coeff.value() * f)),
                (u = o + i['vlevel' + l].coeff.value() * s),
                this._hfans.push(this._model.timeScale().indexToCoordinate(v)),
                this._vfans.push(
                  this._source.priceScale().priceToCoordinate(u, a)
                );
        }
      }),
      (t.GannSquarePaneView = n);
  },
  774: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._numericFormatter = new c()),
        (this._invalidated = !0);
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(977).ChannelRenderer,
      a = i(186).TextRenderer,
      l = i(185).TrendLineRenderer,
      h = i(9).HitTestResult,
      d = i(69).CompositeRenderer,
      c = i(105).NumericFormatter,
      p = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, s, o, a, l, h, d, c, p, u, _;
        if (
          (r.prototype._updateImpl.call(this),
          !(this._source.points().length < 2) &&
            this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            !this._model.timeScale().isEmpty())
        ) {
          for (
            e = this._source.points()[0],
              t = this._source.points()[1],
              this._hlevels = [],
              i = t.price - e.price,
              n = this._source.ownerSource().firstValue(),
              s = 1;
            s <= 7;
            s++
          )
            (o = 'hlevel' + s),
              (a = this._source.properties()[o]),
              a.visible.value() &&
                ((l = a.coeff.value()),
                (h = a.color.value()),
                (d = e.price + l * i),
                (c = this._source.priceScale().priceToCoordinate(d, n, !0)),
                this._hlevels.push({ coeff: l, color: h, y: c, index: s }));
          for (this._vlevels = [], p = t.index - e.index, s = 1; s <= 7; s++)
            (o = 'vlevel' + s),
              (a = this._source.properties()[o]),
              a.visible.value() &&
                ((l = a.coeff.value()),
                (h = a.color.value()),
                (u = Math.round(e.index + l * p)),
                (_ = this._model.timeScale().indexToCoordinate(u, !0)),
                this._vlevels.push({ coeff: l, color: h, x: _, index: s }));
        }
      }),
      (n.prototype.renderer = function() {
        var e,
          t,
          i,
          n,
          r,
          c,
          u,
          _,
          f,
          g,
          v,
          w,
          y,
          m,
          x,
          b,
          R,
          S,
          P,
          T,
          L,
          C,
          k,
          I;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new d()),
          this._floatPoints.length < 2)
        )
          return e;
        for (
          t = this._floatPoints[0],
            i = this._floatPoints[1],
            n = Math.min(t.x, i.x),
            r = Math.min(t.y, i.y),
            c = Math.max(t.x, i.x),
            u = Math.max(t.y, i.y),
            _ = this._source.properties(),
            f = _.grid.color.value(),
            g = _.grid.linewidth.value(),
            v = _.grid.linestyle.value(),
            w = 0;
          w < this._hlevels.length;
          w++
        )
          (t = new s(n, this._hlevels[w].y)),
            (i = new s(c, this._hlevels[w].y)),
            _.grid.visible.value() &&
              ((y = {
                points: [t, i],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: f,
                linewidth: g,
                linestyle: v,
                extendleft: !1,
                extendright: !1,
                leftend: p.Normal,
                rightend: p.Normal,
              }),
              (m = new l()),
              m.setData(y),
              e.append(m)),
            _.showLeftLabels.value() &&
              ((x = {
                points: [t],
                text: this._numericFormatter.format(this._hlevels[w].coeff),
                color: this._hlevels[w].color,
                vertAlign: 'middle',
                horzAlign: 'right',
                font: _.font.value(),
                offsetX: -5,
                offsetY: 0,
                fontsize: 12,
                forceTextAlign: !0,
              }),
              e.append(new a(x))),
            _.showRightLabels.value() &&
              ((b = {
                points: [i],
                text: this._numericFormatter.format(this._hlevels[w].coeff),
                color: this._hlevels[w].color,
                vertAlign: 'middle',
                horzAlign: 'left',
                font: _.font.value(),
                offsetX: 5,
                offsetY: 0,
                fontsize: 12,
                forceTextAlign: !0,
              }),
              e.append(new a(b)));
        for (w = 0; w < this._vlevels.length; w++)
          (t = new s(this._vlevels[w].x, r)),
            (i = new s(this._vlevels[w].x, u)),
            _.grid.visible.value() &&
              ((y = {
                points: [t, i],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: f,
                linewidth: g,
                linestyle: v,
                extendleft: !1,
                extendright: !1,
                leftend: p.Normal,
                rightend: p.Normal,
              }),
              (m = new l()),
              m.setData(y),
              e.append(m)),
            _.showTopLabels.value() &&
              ((R = {
                points: [t],
                text: this._numericFormatter.format(this._vlevels[w].coeff),
                color: this._vlevels[w].color,
                vertAlign: 'bottom',
                horzAlign: 'center',
                font: _.font.value(),
                offsetX: 0,
                offsetY: -5,
                fontsize: 12,
              }),
              e.append(new a(R))),
            _.showBottomLabels.value() &&
              ((S = {
                points: [i],
                text: this._numericFormatter.format(this._vlevels[w].coeff),
                color: this._vlevels[w].color,
                vertAlign: 'top',
                horzAlign: 'center',
                font: _.font.value(),
                offsetX: 0,
                offsetY: 5,
                fontsize: 12,
              }),
              e.append(new a(S)));
        for (
          P = _.fillBackground.value(),
            T = _.transparency.value(),
            t = this._floatPoints[0],
            i = this._floatPoints[1],
            w = 0;
          w < this._hlevels.length;
          w++
        )
          (L = new s(i.x, this._hlevels[w].y)),
            w > 0 &&
              P &&
              ((C = new s(i.x, this._hlevels[w - 1].y)),
              (k = {}),
              (k.width = this._model.timeScale().width()),
              (k.height = this._source.priceScale().height()),
              (k.p1 = t),
              (k.p2 = L),
              (k.p3 = t),
              (k.p4 = C),
              (k.color = this._hlevels[w].color),
              (k.transparency = T),
              (k.hittestOnBackground = !0),
              (m = new o()),
              m.setData(k),
              e.append(m)),
            (y = {
              points: [t, L],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: this._hlevels[w].color,
              linewidth: _.linewidth.value(),
              linestyle: _.linestyle.value(),
              extendleft: !1,
              extendright: !0,
              leftend: p.Normal,
              rightend: p.Normal,
            }),
            (m = new l()),
            m.setData(y),
            m.setHitTest(
              new h(h.MOVEPOINT, null, {
                type: 'h',
                index: this._hlevels[w].index,
              })
            ),
            e.append(m);
        for (w = 0; w < this._vlevels.length; w++)
          (I = new s(this._vlevels[w].x, i.y)),
            w > 0 &&
              P &&
              ((C = new s(this._vlevels[w - 1].x, i.y)),
              (k = {}),
              (k.width = this._model.timeScale().width()),
              (k.height = this._source.priceScale().height()),
              (k.p1 = t),
              (k.p2 = I),
              (k.p3 = t),
              (k.p4 = C),
              (k.color = this._vlevels[w].color),
              (k.transparency = T),
              (k.hittestOnBackground = !0),
              (m = new o()),
              m.setData(k),
              e.append(m)),
            (y = {
              points: [t, I],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: this._vlevels[w].color,
              linewidth: _.linewidth.value(),
              linestyle: _.linestyle.value(),
              extendleft: !1,
              extendright: !0,
              leftend: p.Normal,
              rightend: p.Normal,
            }),
            (m = new l()),
            m.setData(y),
            m.setHitTest(
              new h(h.MOVEPOINT, null, {
                type: 'v',
                index: this._vlevels[w].index,
              })
            ),
            e.append(m);
        return this.addAnchors(e), e;
      }),
      (t.FibSpeedResistanceFanPaneView = n);
  },
  775: function(e, t, i) {
    'use strict';
    var n, s, r, o, a, l, h, d, c, p, u;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'GannComplexPaneView', function() {
        return u;
      }),
      (n = i(1)),
      (s = i(6)),
      i.n(s),
      (r = i(824)),
      (o = i(185)),
      i.n(o),
      (a = i(186)),
      i.n(a),
      (l = i(69)),
      (h = i(103)),
      (d = i(84)),
      (c = i(1034)),
      (p = i(38)),
      (u = (function(e) {
        function t(t, i) {
          var n = e.call(this, t, i) || this;
          return (
            (n._verticalLevelsRenderers = []),
            (n._horizontalLevelsRenderers = []),
            (n._fanRenderers = []),
            (n._arcRenderers = []),
            (n._priceDiffTextRenderer = new a.TextRenderer({})),
            (n._indexDiffTextRenderer = new a.TextRenderer({})),
            (n._ratioTextRenderer = new a.TextRenderer({})),
            n._initRenderers(),
            n
          );
        }
        return (
          n.c(t, e),
          (t.prototype.renderer = function(e) {
            var t, i, n, s, r, o, a, h, d, c, p, u, _, f, g, v;
            return (
              this._invalidated &&
                (this._updateImpl(), (this._invalidated = !1)),
              (t = new l.CompositeRenderer()),
              (i = this._getPoints()),
              i.length < 2
                ? (this.addAnchors(t), t)
                : ((n = i[0]),
                  (s = i[1]),
                  (r = this._getSource()),
                  (o = r.isReversed()),
                  o && ((s = i[0]), (n = i[1])),
                  (a = s.x - n.x),
                  (h = s.y - n.y),
                  (d = n),
                  (c = s),
                  (p = this._getModel()),
                  (u = p.timeScale()),
                  (_ = u.width()),
                  (f = r.isLabelsVisible()),
                  (g = {
                    paneHeight: e,
                    paneWidth: _,
                    barsCoordsRange: a,
                    priceCoordsRange: h,
                    startPoint: d,
                    endPoint: c,
                    p1: n,
                    p2: s,
                    isLabelsVisible: f,
                    reversed: o,
                  }),
                  this._prepareLevels(t, g),
                  this._prepareFanLines(t, g),
                  this._prepareArcs(t, g),
                  this._prepareLabels(t, g),
                  this.isAnchorsRequired() &&
                    ((v = [n, s]),
                    p.lineBeingCreated() === r && v.pop(),
                    t.append(this.createLineAnchor({ points: v }))),
                  t)
            );
          }),
          (t.prototype._initRenderers = function() {
            var e,
              t,
              i,
              n = this._getSource(),
              s = n.levelsCount();
            for (e = 0; e < s; e++)
              this._verticalLevelsRenderers.push(new o.TrendLineRenderer()),
                this._horizontalLevelsRenderers.push(new o.TrendLineRenderer());
            for (t = n.fanLinesCount(), e = 0; e < t; e++)
              this._fanRenderers.push(new o.TrendLineRenderer());
            for (i = n.arcsCount(), e = 0; e < i; e++)
              this._arcRenderers.push(new c.a());
          }),
          (t.prototype._prepareLevels = function(e, t) {
            var i,
              n,
              r,
              o,
              a,
              l,
              c,
              p,
              u,
              _,
              f = t.startPoint,
              g = t.endPoint,
              v = t.paneHeight,
              w = t.paneWidth,
              y = t.barsCoordsRange,
              m = t.priceCoordsRange,
              x = this._getSource(),
              b = x.levels();
            for (i = 0, n = b; i < n.length; i++)
              (r = n[i]),
                r.visible &&
                  ((o = r.index / 5),
                  (a = f.x + o * y),
                  (l = {
                    points: [new s.Point(a, f.y), new s.Point(a, g.y)],
                    width: w,
                    height: v,
                    color: r.color,
                    linewidth: r.width,
                    linestyle: d.LINESTYLE_SOLID,
                    extendleft: !1,
                    extendright: !1,
                    leftend: h.LineEnd.Normal,
                    rightend: h.LineEnd.Normal,
                  }),
                  (c = this._verticalLevelsRenderers[r.index]),
                  c.setData(l),
                  e.append(c),
                  (p = f.y + o * m),
                  (u = {
                    points: [new s.Point(f.x, p), new s.Point(g.x, p)],
                    width: w,
                    height: v,
                    color: r.color,
                    linewidth: r.width,
                    linestyle: d.LINESTYLE_SOLID,
                    extendleft: !1,
                    extendright: !1,
                    leftend: h.LineEnd.Normal,
                    rightend: h.LineEnd.Normal,
                  }),
                  (_ = this._horizontalLevelsRenderers[r.index]),
                  _.setData(u),
                  e.append(_));
          }),
          (t.prototype._prepareFanLines = function(e, t) {
            var i,
              n,
              r,
              o,
              a,
              l,
              c,
              p,
              u,
              _,
              f = t.p1,
              g = t.startPoint,
              v = t.endPoint,
              w = t.paneHeight,
              y = t.paneWidth,
              m = t.barsCoordsRange,
              x = t.priceCoordsRange,
              b = this._getSource(),
              R = b.fanLines();
            for (i = 0, n = R; i < n.length; i++)
              (r = n[i]),
                r.visible &&
                  ((o = r.x),
                  (a = r.y),
                  (l = void 0),
                  (c = void 0),
                  o > a
                    ? ((l = v.x), (p = a / o), (c = g.y + p * x))
                    : ((c = v.y), (p = o / a), (l = g.x + p * m)),
                  (u = {
                    points: [f, new s.Point(l, c)],
                    width: y,
                    height: w,
                    color: r.color,
                    linewidth: r.width,
                    linestyle: d.LINESTYLE_SOLID,
                    extendleft: !1,
                    extendright: !1,
                    leftend: h.LineEnd.Normal,
                    rightend: h.LineEnd.Normal,
                  }),
                  (_ = this._fanRenderers[r.index]),
                  _.setData(u),
                  e.append(_));
          }),
          (t.prototype._prepareArcs = function(e, t) {
            var i,
              n,
              r,
              o,
              a,
              l,
              h,
              d,
              c,
              p = t.p1,
              u = t.startPoint,
              _ = t.endPoint,
              f = t.barsCoordsRange,
              g = t.priceCoordsRange,
              v = p,
              w = this._getSource(),
              y = w.isArcsBackgroundFilled(),
              m = w.arcsBackgroundTransparency(),
              x = w.arcs();
            for (i = 0, n = x; i < n.length; i++)
              (r = n[i]),
                r.visible &&
                  ((o = r.x / 5),
                  (a = r.y / 5),
                  (l = u.x + o * f),
                  (h = u.y + a * g),
                  (d = {
                    center: u,
                    point: new s.Point(l, h),
                    edge: _,
                    color: r.color,
                    linewidth: r.width,
                    fillBack: y,
                    transparency: m,
                    prevPoint: v,
                  }),
                  (c = this._arcRenderers[r.index]),
                  c.setData(d),
                  e.append(c),
                  (v = d.point));
          }),
          (t.prototype._prepareLabels = function(e, t) {
            var i,
              n,
              r,
              o,
              a,
              l,
              h,
              d,
              c,
              u,
              _,
              f,
              g,
              v,
              w = t.p1,
              y = t.p2,
              m = t.isLabelsVisible,
              x = t.reversed;
            m &&
              ((i = this._getSource()),
              (n = i.ownerSource()),
              (r = i.getPriceDiff()),
              (o = i.getIndexDiff()),
              null !== r &&
                null !== o &&
                null !== n &&
                (x && ((r = -r), (o = -o)),
                (a = new s.Point(w.x, y.y)),
                (l = Object(p.forceLTRStr)(n.formatter().format(r))),
                (h = this._getLabelData(a, l)),
                (h.horzAlign = o > 0 ? 'right' : 'left'),
                (h.vertAlign = r > 0 ? 'bottom' : 'top'),
                (h.offsetX = o > 0 ? -10 : 10),
                (h.offsetY = r > 0 ? -10 : 10),
                (h.forceTextAlign = !0),
                this._priceDiffTextRenderer.setData(h),
                e.append(this._priceDiffTextRenderer),
                (d = new s.Point(y.x, w.y)),
                (c = Object(p.forceLTRStr)('' + o)),
                (u = this._getLabelData(d, c)),
                (u.horzAlign = o > 0 ? 'left' : 'right'),
                (u.vertAlign = r > 0 ? 'top' : 'bottom'),
                (u.offsetX = o > 0 ? 10 : -10),
                (u.offsetY = r > 0 ? 10 : -10),
                (u.forceTextAlign = !0),
                this._indexDiffTextRenderer.setData(u),
                e.append(this._indexDiffTextRenderer),
                null !== (_ = i.getScaleRatio()) &&
                  ((f = i.getScaleRatioFormatter()),
                  (g = Object(p.forceLTRStr)(f.format(_))),
                  (v = this._getLabelData(y, g)),
                  (v.horzAlign = o > 0 ? 'left' : 'right'),
                  (v.vertAlign = r > 0 ? 'bottom' : 'top'),
                  (v.offsetX = o > 0 ? 10 : -10),
                  (v.offsetY = r > 0 ? -10 : 10),
                  (v.forceTextAlign = !0),
                  this._ratioTextRenderer.setData(v),
                  e.append(this._ratioTextRenderer))));
          }),
          (t.prototype._getLabelData = function(e, t) {
            var i = this._getSource(),
              n = i.getLabelsStyle(),
              s = n.textColor,
              r = n.font,
              o = n.fontSize;
            return {
              points: [e],
              backgroundColor: 'transparent',
              text: t,
              font: r,
              bold: n.bold,
              italic: n.italic,
              fontsize: o,
              color: s,
              vertAlign: 'top',
              horzAlign: 'center',
              offsetX: 0,
              offsetY: 0,
              backgroundRoundRect: 4,
            };
          }),
          t
        );
      })(r.LineSourcePaneView));
  },
  776: function(e, t, i) {
    'use strict';
    var n, s, r, o, a, l, h, d, c;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'GannFixedPaneView', function() {
        return c;
      }),
      (n = i(1)),
      (s = i(6)),
      i.n(s),
      (r = i(824)),
      (o = i(185)),
      i.n(o),
      (a = i(69)),
      (l = i(103)),
      (h = i(84)),
      (d = i(1034)),
      (c = (function(e) {
        function t(t, i) {
          var n = e.call(this, t, i) || this;
          return (
            (n._verticalLevelsRenderers = []),
            (n._horizontalLevelsRenderers = []),
            (n._fanRenderers = []),
            (n._arcRenderers = []),
            n._initRenderers(),
            n
          );
        }
        return (
          n.c(t, e),
          (t.prototype.renderer = function(e) {
            var t, i, n, s, r, o, l, h, d, c, p, u, _, f;
            return (
              this._invalidated &&
                (this._updateImpl(), (this._invalidated = !1)),
              (t = this._getSource()),
              (i = this._getPoints()),
              (n = new a.CompositeRenderer()),
              i.length < 2
                ? (this.addAnchors(n), n)
                : ((s = i[0]),
                  (r = 3 === i.length ? i[2] : i[1]),
                  (o = r.x - s.x),
                  (l = r.y - s.y),
                  (h = s),
                  (d = r),
                  (c = this._getModel()),
                  (p = c.timeScale()),
                  (u = p.width()),
                  (_ = {
                    paneHeight: e,
                    paneWidth: u,
                    barsCoordsRange: o,
                    priceCoordsRange: l,
                    startPoint: h,
                    endPoint: d,
                    p1: s,
                    p2: r,
                  }),
                  this._prepareLevels(n, _),
                  this._prepareFanLines(n, _),
                  this._prepareArcs(n, _),
                  this.isAnchorsRequired() &&
                    ((f = [s, i[1]]),
                    c.lineBeingCreated() === t && f.pop(),
                    n.append(this.createLineAnchor({ points: f }))),
                  n)
            );
          }),
          (t.prototype._updateImpl = function() {
            var t, i, n, s, r;
            e.prototype._updateImpl.call(this),
              (t = this._getSource()),
              (i = this._getPoints()),
              (n = t.getScreenPoints()),
              i.length < 2 ||
                n.length < 2 ||
                ((s = n[0]),
                (r = n[1]),
                (i[1] = s),
                (i[1].data = 1),
                (i[2] = r));
          }),
          (t.prototype._initRenderers = function() {
            var e,
              t,
              i,
              n = this._getSource(),
              s = n.levelsCount();
            for (e = 0; e < s; e++)
              this._verticalLevelsRenderers.push(new o.TrendLineRenderer()),
                this._horizontalLevelsRenderers.push(new o.TrendLineRenderer());
            for (t = n.fanLinesCount(), e = 0; e < t; e++)
              this._fanRenderers.push(new o.TrendLineRenderer());
            for (i = n.arcsCount(), e = 0; e < i; e++)
              this._arcRenderers.push(new d.a());
          }),
          (t.prototype._prepareLevels = function(e, t) {
            var i,
              n,
              r,
              o,
              a,
              d,
              c,
              p,
              u,
              _,
              f = t.startPoint,
              g = t.endPoint,
              v = t.paneHeight,
              w = t.paneWidth,
              y = t.barsCoordsRange,
              m = t.priceCoordsRange,
              x = this._getSource(),
              b = x.levels();
            for (i = 0, n = b; i < n.length; i++)
              (r = n[i]),
                r.visible &&
                  ((o = r.index / 5),
                  (a = f.x + o * y),
                  (d = {
                    points: [new s.Point(a, f.y), new s.Point(a, g.y)],
                    width: w,
                    height: v,
                    color: r.color,
                    linewidth: r.width,
                    linestyle: h.LINESTYLE_SOLID,
                    extendleft: !1,
                    extendright: !1,
                    leftend: l.LineEnd.Normal,
                    rightend: l.LineEnd.Normal,
                  }),
                  (c = this._verticalLevelsRenderers[r.index]),
                  c.setData(d),
                  e.append(c),
                  (p = f.y + o * m),
                  (u = {
                    points: [new s.Point(f.x, p), new s.Point(g.x, p)],
                    width: w,
                    height: v,
                    color: r.color,
                    linewidth: r.width,
                    linestyle: h.LINESTYLE_SOLID,
                    extendleft: !1,
                    extendright: !1,
                    leftend: l.LineEnd.Normal,
                    rightend: l.LineEnd.Normal,
                  }),
                  (_ = this._horizontalLevelsRenderers[r.index]),
                  _.setData(u),
                  e.append(_));
          }),
          (t.prototype._prepareFanLines = function(e, t) {
            var i,
              n,
              r,
              o,
              a,
              d,
              c,
              p,
              u,
              _,
              f = t.p1,
              g = t.startPoint,
              v = t.endPoint,
              w = t.paneHeight,
              y = t.paneWidth,
              m = t.barsCoordsRange,
              x = t.priceCoordsRange,
              b = this._getSource(),
              R = b.fanLines();
            for (i = 0, n = R; i < n.length; i++)
              (r = n[i]),
                r.visible &&
                  ((o = r.x),
                  (a = r.y),
                  (d = void 0),
                  (c = void 0),
                  o > a
                    ? ((d = v.x), (p = a / o), (c = g.y + p * x))
                    : ((c = v.y), (p = o / a), (d = g.x + p * m)),
                  (u = {
                    points: [f, new s.Point(d, c)],
                    width: y,
                    height: w,
                    color: r.color,
                    linewidth: r.width,
                    linestyle: h.LINESTYLE_SOLID,
                    extendleft: !1,
                    extendright: !1,
                    leftend: l.LineEnd.Normal,
                    rightend: l.LineEnd.Normal,
                  }),
                  (_ = this._fanRenderers[r.index]),
                  _.setData(u),
                  e.append(_));
          }),
          (t.prototype._prepareArcs = function(e, t) {
            var i,
              n,
              r,
              o,
              a,
              l,
              h,
              d,
              c,
              p = t.p1,
              u = t.startPoint,
              _ = t.endPoint,
              f = t.barsCoordsRange,
              g = t.priceCoordsRange,
              v = p,
              w = this._getSource(),
              y = w.isArcsBackgroundFilled(),
              m = w.arcsBackgroundTransparency(),
              x = w.arcs();
            for (i = 0, n = x; i < n.length; i++)
              (r = n[i]),
                r.visible &&
                  ((o = r.x / 5),
                  (a = r.y / 5),
                  (l = u.x + o * f),
                  (h = u.y + a * g),
                  (d = {
                    center: u,
                    point: new s.Point(l, h),
                    edge: _,
                    color: r.color,
                    linewidth: r.width,
                    fillBack: y,
                    transparency: m,
                    prevPoint: v,
                  }),
                  (c = this._arcRenderers[r.index]),
                  c.setData(d),
                  e.append(c),
                  (v = d.point));
          }),
          t
        );
      })(r.LineSourcePaneView));
  },
  777: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t), (this._invalidated = !0);
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(977).ChannelRenderer,
      a = i(186).TextRenderer,
      l = i(185).TrendLineRenderer,
      h = i(9).HitTestResult,
      d = i(69).CompositeRenderer,
      c = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, s, o, a, l, h, d, c, p, u, _;
        if (
          (r.prototype._updateImpl.call(this),
          !(this._source.points().length < 2) &&
            this._source.priceScale() &&
            !this._source.priceScale().isEmpty() &&
            !this._model.timeScale().isEmpty())
        )
          for (
            e = this._floatPoints[0],
              t = this._floatPoints[1],
              this._fans = [],
              i = t.x - e.x,
              n = t.y - e.y,
              a = 1;
            a <= 9;
            a++
          )
            (l = 'level' + a),
              (h = this._source.properties()[l]),
              h.visible.value() &&
                ((d = h.coeff1.value()),
                (c = h.coeff2.value()),
                (p = d / c),
                (u = h.color.value()),
                (_ = d + '/' + c),
                d > c
                  ? ((s = t.x), (o = e.y + n / p))
                  : ((s = e.x + i * p), (o = t.y)),
                this._fans.push({
                  label: _,
                  color: u,
                  x: s,
                  y: o,
                  linewidth: h.linewidth.value(),
                  linestyle: h.linestyle.value(),
                  index: a,
                }));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, r, p, u, _, f, g, v, w;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new d()),
          this._floatPoints.length < 2)
        )
          return e;
        for (
          t = this._floatPoints[0],
            i = this._source.properties(),
            n = this._source.properties().fillBackground.value(),
            r = this._source.properties().transparency.value(),
            p = 0;
          p < this._fans.length;
          p++
        )
          (u = new s(this._fans[p].x, this._fans[p].y)),
            n &&
              (this._fans[p].index < 4
                ? ((_ = new s(this._fans[p + 1].x, this._fans[p + 1].y)),
                  (f = {}),
                  (f.width = this._model.timeScale().width()),
                  (f.height = this._source.priceScale().height()),
                  (f.p1 = t),
                  (f.p2 = u),
                  (f.p3 = t),
                  (f.p4 = _),
                  (f.color = this._fans[p].color),
                  (f.transparency = r),
                  (f.hittestOnBackground = !0),
                  (g = new o()),
                  g.setData(f),
                  e.append(g))
                : this._fans[p].index > 4 &&
                  p > 0 &&
                  ((_ = new s(this._fans[p - 1].x, this._fans[p - 1].y)),
                  (f = {}),
                  (f.width = this._model.timeScale().width()),
                  (f.height = this._source.priceScale().height()),
                  (f.p1 = t),
                  (f.p2 = u),
                  (f.p3 = t),
                  (f.p4 = _),
                  (f.color = this._fans[p].color),
                  (f.transparency = r),
                  (f.hittestOnBackground = !0),
                  (g = new o()),
                  g.setData(f),
                  e.append(g))),
            (v = {
              points: [t, u],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: this._fans[p].color,
              linewidth: this._fans[p].linewidth,
              linestyle: this._fans[p].linestyle,
              extendleft: !1,
              extendright: !0,
              leftend: c.Normal,
              rightend: c.Normal,
            }),
            (g = new l()),
            g.setData(v),
            g.setHitTest(new h(h.MOVEPOINT, null, this._fans[p].index)),
            e.append(g),
            i.showLabels.value() &&
              ((w = {
                points: [u],
                text: this._fans[p].label,
                color: this._fans[p].color,
                vertAlign: 'middle',
                horzAlign: 'left',
                font: i.font.value(),
                offsetX: 0,
                offsetY: -5,
                fontsize: 12,
              }),
              e.append(new a(w)));
        return this.addAnchors(e), e;
      }),
      (t.GannFanPaneView = n);
  },
  778: function(e, t, i) {
    'use strict';
    function n(e, t) {
      l.call(this, e, t),
        (this._invalidated = !0),
        (this._medianRenderer = new h()),
        (this._sideRenderer = new h());
    }
    function s(e, t) {
      n.call(this, e, t),
        (this._invalidated = !0),
        (this._backSideRenderer = new h());
    }
    function r(e, t) {
      s.call(this, e, t), (this._invalidated = !0);
    }
    function o(e, t) {
      n.call(this, e, t),
        (this._invalidated = !0),
        (this._backSideRenderer = new h()),
        (this._centerRenderer = new h());
    }
    var a = i(6).Point,
      l = i(824).LineSourcePaneView,
      h = i(185).TrendLineRenderer,
      d = i(977).ChannelRenderer,
      c = i(9).HitTestResult,
      p = i(69).CompositeRenderer,
      u = i(103).LineEnd;
    inherit(n, l),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        l.prototype._updateImpl.call(this),
          0 !== this._floatPoints.length &&
            (3 === this._floatPoints.length
              ? ((this._medianPoint = this._floatPoints[1]
                  .add(this._floatPoints[2])
                  .scaled(0.5)),
                (this._medianPoint.data = 3))
              : 2 === this._floatPoints.length
              ? ((this._medianPoint = this._floatPoints[1]),
                (this._medianPoint.data = 3))
              : ((this._medianPoint = this._floatPoints[0]),
                (this._medianPoint.data = 3)));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, o, a, l, _, f, g, v, w, y, m, x, b, R, S, P;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new p()),
          this._floatPoints.length < 2)
        )
          return e;
        if (!this._medianPoint) return e;
        if (
          ((t = {
            points: [this._floatPoints[0], this._medianPoint],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: this._source.properties().median.color.value(),
            linewidth: this._source.properties().median.linewidth.value(),
            linestyle: this._source.properties().median.linestyle.value(),
            extendleft: !1,
            extendright: !0,
            leftend: u.Normal,
            rightend: u.Normal,
          }),
          this._medianRenderer.setData(t),
          e.append(this._medianRenderer),
          this._floatPoints.length < 3)
        )
          return this.addAnchors(e), e;
        for (
          i = {
            points: [this._floatPoints[1], this._floatPoints[2]],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: this._source.properties().median.color.value(),
            linewidth: this._source.properties().median.linewidth.value(),
            linestyle: this._source.properties().median.linestyle.value(),
            extendleft: !1,
            extendright: !1,
            leftend: u.Normal,
            rightend: u.Normal,
          },
            this._sideRenderer.setData(i),
            e.append(this._sideRenderer),
            n = this._floatPoints[2].subtract(this._floatPoints[1]).scaled(0.5),
            s = this._medianPoint.subtract(this._floatPoints[0]),
            r = 0,
            o = this._source.properties().fillBackground.value(),
            a = this._source.properties().transparency.value(),
            l = 0;
          l <= 8;
          l++
        )
          (_ = 'level' + l),
            (f = this._source.properties()[_]),
            f.visible.value() &&
              ((g = this._medianPoint.addScaled(n, f.coeff.value())),
              (v = g.add(s)),
              (w = this._medianPoint.addScaled(n, -f.coeff.value())),
              (y = w.add(s)),
              o &&
                ((m = {}),
                (m.p1 = g),
                (m.p2 = v),
                (m.p3 = this._medianPoint.addScaled(n, r)),
                (m.p4 = m.p3.add(s)),
                (m.color = f.color.value()),
                (m.width = this._model.timeScale().width()),
                (m.height = this._source.priceScale().height()),
                (m.transparency = a),
                (m.hittestOnBackground = !0),
                (x = new d()),
                x.setData(m),
                e.append(x),
                (m = {}),
                (m.p1 = w),
                (m.p2 = y),
                (m.p3 = this._medianPoint.addScaled(n, -r)),
                (m.p4 = m.p3.add(s)),
                (m.color = f.color.value()),
                (m.width = this._model.timeScale().width()),
                (m.height = this._source.priceScale().height()),
                (m.transparency = a),
                (m.hittestOnBackground = !0),
                (x = new d()),
                x.setData(m),
                e.append(x)),
              (r = f.coeff.value()),
              (b = {
                points: [g, v],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: f.color.value(),
                linewidth: f.linewidth.value(),
                linestyle: f.linestyle.value(),
                extendleft: !1,
                extendright: !0,
                leftend: u.Normal,
                rightend: u.Normal,
              }),
              (R = new h()),
              R.setData(b),
              R.setHitTest(new c(c.MOVEPOINT, null, l)),
              e.append(R),
              (S = {
                points: [w, y],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: f.color.value(),
                linewidth: f.linewidth.value(),
                linestyle: f.linestyle.value(),
                extendleft: !1,
                extendright: !0,
                leftend: u.Normal,
                rightend: u.Normal,
              }),
              (P = new h()),
              P.setData(S),
              P.setHitTest(new c(c.MOVEPOINT, null, l)),
              e.append(P));
        return this.addAnchors(e), e;
      }),
      inherit(s, n),
      (s.prototype.renderer = function() {
        var e, t, i, n, s, r, o, a, l, _, f, g, v, w, y, m, x, b, R, S;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new p()),
          this._floatPoints.length < 2)
        )
          return e;
        if (
          ((t = {
            points: [this._floatPoints[0], this._floatPoints[1]],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: this._source.properties().median.color.value(),
            linewidth: this._source.properties().median.linewidth.value(),
            linestyle: this._source.properties().median.linestyle.value(),
            extendleft: !1,
            extendright: !1,
            leftend: u.Normal,
            rightend: u.Normal,
          }),
          this._backSideRenderer.setData(t),
          e.append(this._backSideRenderer),
          !this._medianPoint || !this._modifiedBase)
        )
          return this.addAnchors(e), e;
        if (
          ((i = {
            points: [this._modifiedBase, this._medianPoint],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: this._source.properties().median.color.value(),
            linewidth: this._source.properties().median.linewidth.value(),
            linestyle: this._source.properties().median.linestyle.value(),
            extendleft: !1,
            extendright: !0,
            leftend: u.Normal,
            rightend: u.Normal,
          }),
          this._medianRenderer.setData(i),
          e.append(this._medianRenderer),
          this._floatPoints.length < 3)
        )
          return this.addAnchors(e), e;
        for (
          n = {
            points: [this._floatPoints[1], this._floatPoints[2]],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: this._source.properties().median.color.value(),
            linewidth: this._source.properties().median.linewidth.value(),
            linestyle: this._source.properties().median.linestyle.value(),
            extendleft: !1,
            extendright: !1,
            leftend: u.Normal,
            rightend: u.Normal,
          },
            this._sideRenderer.setData(n),
            e.append(this._sideRenderer),
            s = this._floatPoints[2].subtract(this._floatPoints[1]).scaled(0.5),
            r = this._medianPoint.subtract(this._modifiedBase),
            o = 0,
            a = this._source.properties().fillBackground.value(),
            l = this._source.properties().transparency.value(),
            _ = 0;
          _ <= 8;
          _++
        )
          (f = 'level' + _),
            (g = this._source.properties()[f]),
            g.visible.value() &&
              ((v = this._medianPoint.addScaled(s, g.coeff.value())),
              (w = v.add(r)),
              (y = this._medianPoint.addScaled(s, -g.coeff.value())),
              (m = y.add(r)),
              a &&
                ((t = {}),
                (t.p1 = v),
                (t.p2 = w),
                (t.p3 = this._medianPoint.addScaled(s, o)),
                (t.p4 = t.p3.add(r)),
                (t.color = g.color.value()),
                (t.width = this._model.timeScale().width()),
                (t.height = this._source.priceScale().height()),
                (t.transparency = l),
                (t.hittestOnBackground = !0),
                (x = new d()),
                x.setData(t),
                e.append(x),
                (t = {}),
                (t.p1 = y),
                (t.p2 = m),
                (t.p3 = this._medianPoint.addScaled(s, -o)),
                (t.p4 = t.p3.add(r)),
                (t.color = g.color.value()),
                (t.width = this._model.timeScale().width()),
                (t.height = this._source.priceScale().height()),
                (t.transparency = l),
                (t.hittestOnBackground = !0),
                (x = new d()),
                x.setData(t),
                e.append(x)),
              (o = g.coeff.value()),
              (b = {
                points: [v, w],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: g.color.value(),
                linewidth: g.linewidth.value(),
                linestyle: g.linestyle.value(),
                extendleft: !1,
                extendright: !0,
                leftend: u.Normal,
                rightend: u.Normal,
              }),
              (R = new h()),
              R.setData(b),
              R.setHitTest(new c(c.MOVEPOINT, null, _)),
              e.append(R),
              (S = {
                points: [y, m],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: g.color.value(),
                linewidth: g.linewidth.value(),
                linestyle: g.linestyle.value(),
                extendleft: !1,
                extendright: !0,
                leftend: u.Normal,
                rightend: u.Normal,
              }),
              (x = new h()),
              x.setData(S),
              x.setHitTest(new c(c.MOVEPOINT, null, _)),
              e.append(x));
        return this.addAnchors(e), e;
      }),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        n.prototype.updateImpl.call(this),
          this._floatPoints.length > 1 &&
            (this._modifiedBase = this._floatPoints[0]
              .add(this._floatPoints[1])
              .scaled(0.5));
      }),
      inherit(r, s),
      (r.prototype.update = function() {
        this._invalidated = !0;
      }),
      (r.prototype.updateImpl = function() {
        var e, t, i;
        n.prototype.updateImpl.call(this),
          this._floatPoints.length > 2 &&
            ((e = this._floatPoints[0].x),
            (t = 0.5 * (this._floatPoints[0].y + this._floatPoints[1].y)),
            (i = new a(e, t)),
            (this._modifiedBase = i));
      }),
      inherit(o, n),
      (o.prototype.update = function() {
        this._invalidated = !0;
      }),
      (o.prototype.updateImpl = function() {
        n.prototype.updateImpl.call(this),
          this._floatPoints.length > 1 &&
            (this._modifiedBase = this._floatPoints[0]
              .add(this._floatPoints[1])
              .scaled(0.5));
      }),
      (o.prototype.renderer = function() {
        var e, t, i, n, s, r, o, a, l, _, f, g, v, w, y, m, x, b, R, S, P;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new p()),
          this._floatPoints.length < 2)
        )
          return e;
        if (!this._medianPoint || !this._modifiedBase)
          return this.addAnchors(e), e;
        if (
          (3 === this._floatPoints.length &&
            ((t = {
              points: [this._modifiedBase, this._floatPoints[2]],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: this._source.properties().median.color.value(),
              linewidth: this._source.properties().median.linewidth.value(),
              linestyle: this._source.properties().median.linestyle.value(),
              extendleft: !1,
              extendright: !1,
              leftend: u.Normal,
              rightend: u.Normal,
            }),
            this._medianRenderer.setData(t),
            e.append(this._medianRenderer)),
          (i = {
            points: [this._floatPoints[0], this._floatPoints[1]],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: this._source.properties().median.color.value(),
            linewidth: this._source.properties().median.linewidth.value(),
            linestyle: this._source.properties().median.linestyle.value(),
            extendleft: !1,
            extendright: !1,
            leftend: u.Normal,
            rightend: u.Normal,
          }),
          this._backSideRenderer.setData(i),
          e.append(this._backSideRenderer),
          this._floatPoints.length < 3)
        )
          return this.addAnchors(e), e;
        for (
          n = {
            points: [this._floatPoints[1], this._floatPoints[2]],
            width: this._model.timeScale().width(),
            height: this._source.priceScale().height(),
            color: this._source.properties().median.color.value(),
            linewidth: this._source.properties().median.linewidth.value(),
            linestyle: this._source.properties().median.linestyle.value(),
            extendleft: !1,
            extendright: !1,
            leftend: u.Normal,
            rightend: u.Normal,
          },
            this._sideRenderer.setData(n),
            e.append(this._sideRenderer),
            s = this._floatPoints[2].subtract(this._floatPoints[1]).scaled(0.5),
            r = this._floatPoints[2].subtract(this._modifiedBase),
            o = 0,
            a = this._source.properties().fillBackground.value(),
            l = this._source.properties().transparency.value(),
            _ = {
              points: [this._medianPoint, this._medianPoint.add(r)],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: this._source.properties().median.color.value(),
              linewidth: this._source.properties().median.linewidth.value(),
              linestyle: this._source.properties().median.linestyle.value(),
              extendleft: !1,
              extendright: !0,
              leftend: u.Normal,
              rightend: u.Normal,
            },
            this._centerRenderer.setData(_),
            e.append(this._centerRenderer),
            f = 0;
          f <= 8;
          f++
        )
          (g = 'level' + f),
            (v = this._source.properties()[g]),
            v.visible.value() &&
              ((w = this._medianPoint.addScaled(s, v.coeff.value())),
              (y = w.add(r)),
              (m = this._medianPoint.addScaled(s, -v.coeff.value())),
              (x = m.add(r)),
              a &&
                ((i = {}),
                (i.p1 = w),
                (i.p2 = y),
                (i.p3 = this._medianPoint.addScaled(s, o)),
                (i.p4 = i.p3.add(r)),
                (i.color = v.color.value()),
                (i.width = this._model.timeScale().width()),
                (i.height = this._source.priceScale().height()),
                (i.transparency = l),
                (i.hittestOnBackground = !0),
                (b = new d()),
                b.setData(i),
                e.append(b),
                (i = {}),
                (i.p1 = m),
                (i.p2 = x),
                (i.p3 = this._medianPoint.addScaled(s, -o)),
                (i.p4 = i.p3.add(r)),
                (i.color = v.color.value()),
                (i.width = this._model.timeScale().width()),
                (i.height = this._source.priceScale().height()),
                (i.transparency = l),
                (i.hittestOnBackground = !0),
                (b = new d()),
                b.setData(i),
                e.append(b)),
              (o = v.coeff.value()),
              (R = {
                points: [w, y],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: v.color.value(),
                linewidth: v.linewidth.value(),
                linestyle: v.linestyle.value(),
                extendleft: !1,
                extendright: !0,
                leftend: u.Normal,
                rightend: u.Normal,
              }),
              (S = new h()),
              S.setData(R),
              S.setHitTest(new c(c.MOVEPOINT, null, f)),
              e.append(S),
              (P = {
                points: [m, x],
                width: this._model.timeScale().width(),
                height: this._source.priceScale().height(),
                color: v.color.value(),
                linewidth: v.linewidth.value(),
                linestyle: v.linestyle.value(),
                extendleft: !1,
                extendright: !0,
                leftend: u.Normal,
                rightend: u.Normal,
              }),
              (b = new h()),
              b.setData(P),
              b.setHitTest(new c(c.MOVEPOINT, null, f)),
              e.append(b));
        return this.addAnchors(e), e;
      }),
      (t.PitchforkLinePaneView = n),
      (t.SchiffPitchforkLinePaneView = s),
      (t.SchiffPitchfork2LinePaneView = r),
      (t.InsidePitchforkLinePaneView = o);
  },
  779: function(e, t, i) {
    'use strict';
    function n(e, t) {
      s.call(this, e, t),
        (this._label = null),
        (this._invalidated = !0),
        (this._trendLineRendererPoints12 = new o()),
        (this._trendLineRendererPoints43 = new o()),
        (this._disjointAngleRenderer = new r()),
        (this._p1LabelRenderer = new a({})),
        (this._p2LabelRenderer = new a({})),
        (this._p3LabelRenderer = new a({})),
        (this._p4LabelRenderer = new a({}));
    }
    var s = i(824).LineSourcePaneView,
      r = i(1035).DisjointAngleRenderer,
      o = i(185).TrendLineRenderer,
      a = i(186).TextRenderer,
      l = i(69).CompositeRenderer,
      h = i(867).PaneRendererClockIcon;
    inherit(n, s),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, r;
        s.prototype._updateImpl.call(this),
          (this._label = null),
          this._source.points().length < 2 ||
            (this._source.priceScale() &&
              ((e = this._source.points()[0]),
              (t = this._source.points()[1]),
              (i = this._source.ownerSource().firstValue()),
              (this._price1 = this._source
                .priceScale()
                .formatPrice(e.price, i)),
              (this._price2 = this._source
                .priceScale()
                .formatPrice(t.price, i)),
              3 === this._source.points().length &&
                ((n = this._source.points()[2]),
                (this._price3 = this._source
                  .priceScale()
                  .formatPrice(n.price, i)),
                (r = t.price - e.price),
                (this._price4 = this._source
                  .priceScale()
                  .formatPrice(n.price + r, i)))));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, o, a, d, c, p, u, _, f, g, v, w;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new l()),
          this._points.length < 2
            ? e
            : ((t = this._points[0]),
              (i = this._points[1]),
              (r = this._source.properties()),
              (o = this._model),
              (a = this._source),
              this._points.length >= 3 &&
                ((n = this._points[2]),
                (n.x = i.x),
                (d = i.y - t.y),
                (s = t.clone()),
                (s.y = n.y + d),
                (s.data = 3),
                r.fillBackground.value() &&
                  ((c = o.timeScale().width()),
                  (p = a.priceScale().height()),
                  (u = r.extendLeft.value()),
                  (_ = r.extendRight.value()),
                  this._disjointAngleRenderer.setData({
                    width: c,
                    height: p,
                    extendleft: u,
                    extendright: _,
                    points: [t, i, n, s],
                    backcolor: r.backgroundColor.value(),
                    transparency: r.transparency.value(),
                    hittestOnBackground: TradingView.isMobile.any(),
                  }),
                  e.append(this._disjointAngleRenderer))),
              (f = function(e, t) {
                return {
                  points: [e, t],
                  width: o.timeScale().width(),
                  height: a.priceScale().height(),
                  color: r.linecolor.value(),
                  linewidth: r.linewidth.value(),
                  linestyle: r.linestyle.value(),
                  extendleft: r.extendLeft.value(),
                  extendright: r.extendRight.value(),
                  leftend: r.leftEnd.value(),
                  rightend: r.rightEnd.value(),
                };
              }),
              (g = this),
              (v = function(t, i, n, s, r, o) {
                var a;
                g._source.properties().showPrices.value() &&
                  ((a = {
                    points: [n],
                    text: r,
                    color: g._source.properties().textcolor.value(),
                    horzAlign: n.x > s.x ? 'left' : 'right',
                    vertAlign: 'middle',
                    font: g._source.properties().font.value(),
                    offsetX: n.x > s.x ? -5 : 5,
                    offsetY: -5,
                    bold: g._source.properties().bold.value(),
                    italic: g._source.properties().italic.value(),
                    fontsize: g._source.properties().fontsize.value(),
                  }),
                  t.setData(a),
                  e.append(t),
                  (a = {
                    points: [s],
                    text: o,
                    color: g._source.properties().textcolor.value(),
                    horzAlign: n.x < s.x ? 'left' : 'right',
                    vertAlign: 'middle',
                    font: g._source.properties().font.value(),
                    offsetX: n.x > s.x ? -5 : 5,
                    offsetY: -5,
                    bold: g._source.properties().bold.value(),
                    italic: g._source.properties().italic.value(),
                    fontsize: g._source.properties().fontsize.value(),
                  }),
                  i.setData(a),
                  e.append(i));
              }),
              this._trendLineRendererPoints12.setData(f(t, i)),
              e.append(this._trendLineRendererPoints12),
              v(
                this._p1LabelRenderer,
                this._p2LabelRenderer,
                t,
                i,
                this._price1,
                this._price2
              ),
              2 === this._points.length
                ? (this.addAnchors(e), e)
                : (this._trendLineRendererPoints43.setData(f(s, n)),
                  e.append(this._trendLineRendererPoints43),
                  v(
                    this._p3LabelRenderer,
                    this._p4LabelRenderer,
                    n,
                    s,
                    this._price3,
                    this._price4
                  ),
                  this.isAnchorsRequired() &&
                    ((w = [t, i, n, s]),
                    this._model.lineBeingCreated() === this._source && w.pop(),
                    e.append(this.createLineAnchor({ points: w }))),
                  !TradingView.printing &&
                    this._source.hasAlert.value() &&
                    !this._model.readOnly() &&
                    t &&
                    i &&
                    this._source.getAlertIsActive(function(n) {
                      e.append(
                        new h({
                          point1: t,
                          point2: i,
                          color: n
                            ? r.linecolor.value()
                            : defaults(
                                'chartproperties.alertsProperties.drawingIcon.color'
                              ),
                        })
                      );
                    }),
                  e))
        );
      }),
      (t.DisjointAnglePaneView = n);
  },
  780: function(e, t, i) {
    'use strict';
    function n(e, t) {
      s.call(this, e, t),
        (this._label1 = null),
        (this._label2 = null),
        (this._invalidated = !0),
        (this._trendLineRendererPoints12 = new o()),
        (this._trendLineRendererPoints43 = new o()),
        (this._disjointAngleRenderer = new r()),
        (this._p1LabelRenderer = new a({})),
        (this._p2LabelRenderer = new a({})),
        (this._p3LabelRenderer = new a({})),
        (this._p4LabelRenderer = new a({}));
    }
    var s = i(824).LineSourcePaneView,
      r = i(1035).DisjointAngleRenderer,
      o = i(185).TrendLineRenderer,
      a = i(186).TextRenderer,
      l = i(69).CompositeRenderer,
      h = i(867).PaneRendererClockIcon;
    inherit(n, s),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n;
        s.prototype._updateImpl.call(this),
          (this._label1 = null),
          (this._label2 = null),
          this._source.points().length < 2 ||
            (this._source.priceScale() &&
              ((e = this._source.points()[0]),
              (t = this._source.points()[1]),
              (i = this._source.ownerSource().firstValue()),
              (this._price1 = this._source
                .priceScale()
                .formatPrice(e.price, i)),
              (this._price2 = this._source
                .priceScale()
                .formatPrice(t.price, i)),
              3 === this._source.points().length &&
                ((n = this._source.points()[2]),
                (this._price3 = this._source
                  .priceScale()
                  .formatPrice(n.price, i)))));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, o, a, d, c, p, u, _, f, g, v;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new l()),
          this._points.length < 2
            ? e
            : ((t = this._points[0]),
              (i = this._points[1]),
              (r = this._source.properties()),
              (o = this._model),
              (a = this._source),
              3 === this._points.length &&
                ((n = this._points[2]),
                (n.x = i.x),
                (s = t.clone()),
                (s.y = n.y),
                (s.data = 3),
                r.fillBackground.value() &&
                  ((d = o.timeScale().width()),
                  (c = a.priceScale().height()),
                  (p = r.extendLeft.value()),
                  (u = r.extendRight.value()),
                  this._disjointAngleRenderer.setData({
                    width: d,
                    height: c,
                    extendleft: p,
                    extendright: u,
                    points: [t, i, n, s],
                    backcolor: r.backgroundColor.value(),
                    transparency: r.transparency.value(),
                    hittestOnBackground: TradingView.isMobile.any(),
                  }),
                  e.append(this._disjointAngleRenderer))),
              (_ = function(e, t) {
                return {
                  points: [e, t],
                  width: o.timeScale().width(),
                  height: a.priceScale().height(),
                  color: r.linecolor.value(),
                  linewidth: r.linewidth.value(),
                  linestyle: r.linestyle.value(),
                  extendleft: r.extendLeft.value(),
                  extendright: r.extendRight.value(),
                  leftend: r.leftEnd.value(),
                  rightend: r.rightEnd.value(),
                };
              }),
              this._trendLineRendererPoints12.setData(_(t, i)),
              e.append(this._trendLineRendererPoints12),
              2 === this._points.length
                ? (this.addAnchors(e), e)
                : ((f = this),
                  (g = function(t, i, n, s, r, o) {
                    var a;
                    f._source.properties().showPrices.value() &&
                      ((a = {
                        points: [n],
                        text: r,
                        color: f._source.properties().textcolor.value(),
                        horzAlign: n.x > s.x ? 'left' : 'right',
                        vertAlign: 'middle',
                        font: f._source.properties().font.value(),
                        offsetX: n.x > s.x ? -5 : 5,
                        offsetY: -5,
                        bold: f._source.properties().bold.value(),
                        italic: f._source.properties().italic.value(),
                        fontsize: f._source.properties().fontsize.value(),
                      }),
                      t.setData(a),
                      e.append(t),
                      (a = {
                        points: [s],
                        text: o,
                        color: f._source.properties().textcolor.value(),
                        horzAlign: n.x < s.x ? 'left' : 'right',
                        vertAlign: 'middle',
                        font: f._source.properties().font.value(),
                        offsetX: n.x > s.x ? -5 : 5,
                        offsetY: -5,
                        bold: f._source.properties().bold.value(),
                        italic: f._source.properties().italic.value(),
                        fontsize: f._source.properties().fontsize.value(),
                      }),
                      i.setData(a),
                      e.append(i));
                  }),
                  g(
                    this._p1LabelRenderer,
                    this._p2LabelRenderer,
                    t,
                    i,
                    this._price1,
                    this._price2
                  ),
                  this._trendLineRendererPoints43.setData(_(s, n)),
                  e.append(this._trendLineRendererPoints43),
                  g(
                    this._p3LabelRenderer,
                    this._p4LabelRenderer,
                    n,
                    s,
                    this._price3,
                    this._price3
                  ),
                  this.isAnchorsRequired() &&
                    ((v = [t, i, n, s]),
                    this._model.lineBeingCreated() === this._source && v.pop(),
                    e.append(this.createLineAnchor({ points: v }))),
                  !TradingView.printing &&
                    this._source.hasAlert.value() &&
                    !this._model.readOnly() &&
                    t &&
                    i &&
                    this._source.getAlertIsActive(function(n) {
                      e.append(
                        new h({
                          point1: t,
                          point2: i,
                          color: n
                            ? r.linecolor.value()
                            : defaults(
                                'chartproperties.alertsProperties.drawingIcon.color'
                              ),
                        })
                      );
                    }),
                  e))
        );
      }),
      (t.FlatBottomPaneView = n);
  },
  781: function(e, t, i) {
    'use strict';
    function n(e) {
      (this._data = null), (this._cache = e);
    }
    function s(e, t) {
      h.call(this, e, t),
        (this._cache = {}),
        (this._invalidated = !0),
        (this._dashRenderer = new d()),
        this._dashRenderer.setHitTest(null),
        (this._iconRenderer = new n(this._cache));
    }
    var r = i(6).Point,
      o = i(321),
      a = o.rotationMatrix,
      l = o.transformPoint,
      h = i(824).LineSourcePaneView,
      d = i(185).TrendLineRenderer,
      c = i(9).HitTestResult,
      p = i(69).CompositeRenderer,
      u = i(103).LineEnd,
      _ = i(81).calcTextHorizontalShift;
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r;
        null != this._data &&
          ((t = String.fromCharCode(this._data.icon)),
          (e.font = this._data.size + 'px FontAwesome'),
          (i = e.measureText(t).width),
          (e.textBaseline = 'middle'),
          (n = this._data.point),
          e.translate(n.x, n.y),
          e.rotate(this._data.angle - Math.PI / 2),
          e.scale(this._data.scale, 1),
          (s = 65536 * this._data.icon + this._data.size),
          (r = _(e, i)),
          (this._cache[s] = i),
          this._data.selected &&
            ((e.fillStyle = 'rgba(80, 80, 80, 0.2)'),
            e.fillRect(
              -this._cache[s] / 2,
              -this._data.size / 2,
              this._cache[s],
              this._data.size
            )),
          (e.fillStyle = this._data.color),
          e.fillText(t, -this._cache[s] / 2 + r, 0));
      }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s;
        return null === this._data
          ? null
          : ((t = 65536 * this._data.icon + this._data.size),
            (i = this._cache[t] * this._data.scale),
            (n = a(-this._data.angle)),
            (s = e.subtract(this._data.point)),
            (s = l(n, s)),
            Math.abs(s.y) <= i / 2 && Math.abs(s.x) <= this._data.size / 2
              ? new c(c.MOVEPOINT)
              : null);
      }),
      inherit(s, h),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        h.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (s.prototype.renderer = function() {
        var e, t, i, n, s, o, h, d, c, _, f, g, v, w, y, m, x, b;
        return (
          this._invalidated && this.updateImpl(),
          (e = new p()),
          this._points.length < 1
            ? e
            : ((t = this._source.properties()),
              (i = {
                point: this._points[0],
                color: t.color.value(),
                size: t.size.value(),
                icon: t.icon.value(),
                angle: t.angle.value(),
                scale: t.scale.value(),
                selected: this.isAnchorsRequired(),
              }),
              (n = this._model),
              (s = this._source),
              this._iconRenderer.setData(i),
              e.append(this._iconRenderer),
              this.isAnchorsRequired() &&
                ((o = 65536 * i.icon + i.size),
                (h = this._cache[o]),
                (d = i.size),
                (c = this._points[0]),
                (_ = t.scale.value()),
                (f = this._source.getAnchorLimit()),
                (g = new r(Math.max(f, d) / 2, 0)),
                (v = new r(0, Math.max(f, _ * h) / 2)),
                (w = a(t.angle.value())),
                (g = l(w, g)),
                (v = l(w, v)),
                (y = c.add(g)),
                (y.data = 0),
                (m = c.subtract(g)),
                (m.data = 1),
                (x = c.add(v)),
                (x.data = 2),
                (x.square = !0),
                (b = c.subtract(v)),
                (b.data = 3),
                (b.square = !0),
                (i = {
                  points: [y, m],
                  width: n.timeScale().width(),
                  height: s.priceScale().height(),
                  color: '#808080',
                  linewidth: 1,
                  linestyle: CanvasEx.LINESTYLE_DASHED,
                  extendleft: !1,
                  extendright: !1,
                  leftend: u.Normal,
                  rightend: u.Normal,
                }),
                this._dashRenderer.setData(i),
                e.append(this._dashRenderer),
                e.append(this.createLineAnchor({ points: [y, m, x, b] }))),
              e)
        );
      }),
      (t.IconPaneView = s);
  },
  782: function(e, t, i) {
    'use strict';
    function n(e, t) {
      o.call(this, e, t),
        (this._invalidated = !0),
        (this._poligonRenderer = new l());
    }
    var s = i(6).Point,
      r = i(30).distanceToLine,
      o = i(824).LineSourcePaneView,
      a = i(185).TrendLineRenderer,
      l = i(978).PolygonRenderer,
      h = i(69).CompositeRenderer,
      d = i(103).LineEnd;
    inherit(n, o),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        o.prototype._updateImpl.call(this),
          (this._distance = 0),
          3 === this._points.length &&
            (this._distance = r(
              this._points[0],
              this._points[1],
              this._points[2]
            ).distance);
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, r, o, l, c, p, u, _, f, g, v;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          0 === this._points.length
            ? null
            : ((e = new h()),
              (t = this._source.properties()),
              (i = this._points[0]),
              (n = this._points[1]),
              2 === this._points.length
                ? ((p = {}),
                  (p.points = this._points),
                  (p.floatPoints = this._floatPoints),
                  (p.width = this._model.timeScale().width()),
                  (p.height = this._source.priceScale().height()),
                  (p.color = t.color.value()),
                  (p.linewidth = 1),
                  (p.linestyle = CanvasEx.LINESTYLE_SOLID),
                  (p.extendleft = !1),
                  (p.extendright = !1),
                  (p.leftend = d.Normal),
                  (p.rightend = d.Normal),
                  (u = new a()),
                  u.setData(p),
                  e.append(u))
                : 3 === this._points.length &&
                  ((_ = n.subtract(i)),
                  (f = new s(_.y, -_.x).normalized().scaled(this._distance)),
                  (g = f.scaled(-1)),
                  (r = i.add(f)),
                  (o = n.add(f)),
                  (l = i.add(g)),
                  (c = n.add(g)),
                  (p = {}),
                  (p.points = [r, o, c, l]),
                  (p.color = t.color.value()),
                  (p.linewidth = this._source.properties().linewidth.value()),
                  (p.linestyle = CanvasEx.LINESTYLE_SOLID),
                  (p.filled = !0),
                  (p.backcolor = t.backgroundColor.value()),
                  (p.fillBackground = t.fillBackground.value()),
                  (p.transparency = t.transparency.value()),
                  this._poligonRenderer.setData(p),
                  e.append(this._poligonRenderer)),
              this.isAnchorsRequired() &&
                ((v = []),
                v.push(i),
                this._points.length >= 2 && v.push(n),
                3 === this._points.length &&
                  ((r.data = 2),
                  (l.data = 2),
                  (o.data = 2),
                  (c.data = 2),
                  v.push(r),
                  v.push(l),
                  v.push(o),
                  v.push(c)),
                e.append(this.createLineAnchor({ points: v }))),
              e)
        );
      }),
      (t.RotatedRectanglePaneView = n);
  },
  783: function(e, t, i) {
    'use strict';
    function n() {
      this._data = null;
    }
    function s(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._trendLineRenderer = new o()),
        (this._spiralRenderer = new n());
    }
    var r = i(824).LineSourcePaneView,
      o = i(185).TrendLineRenderer,
      a = i(9).HitTestResult,
      l = i(69).CompositeRenderer,
      h = i(103).LineEnd;
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype._fibNumbers = function() {
        return [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
      }),
      (n.prototype._continiusFib = function(e) {
        var t,
          i,
          n = this._fibNumbers(),
          s = Math.floor(e),
          r = Math.ceil(e);
        return r >= n.length
          ? null
          : ((t = e - s),
            (t = Math.pow(t, 1.15)),
            (i = n[r] - n[s]),
            n[s] + i * t);
      }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s, r, o, l, h, d, c, p, u, _, f;
        if (null === this._data) return null;
        for (
          t = this._data.points[0],
            i = this._data.points[1],
            n = i.subtract(t),
            s = e.subtract(t),
            r = n.normalized(),
            o = r.transposed(),
            l = s.normalized(),
            h = Math.acos(r.dotProduct(l)),
            d = Math.asin(o.dotProduct(l)),
            d < 0 && (h = 2 * Math.PI - h),
            c = this._data.counterclockwise ? -1 : 1,
            p = s.length(),
            u = 0;
          u < 4;
          u++
        )
          if (
            ((_ = (c * h) / (0.5 * Math.PI)),
            (f = this._continiusFib(_ + 4 * u)),
            null !== (f = (f * n.length()) / 5) && Math.abs(f - p) < 5)
          )
            return new a(a.MOVEPOINT);
        return null;
      }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r, o, a, l, h, d, c, p, u;
        if (null !== this._data) {
          for (
            e.lineCap = 'round',
              e.strokeStyle = this._data.color,
              t = this._data.points[0],
              i = this._data.points[1],
              e.translate(t.x, t.y),
              n = i.subtract(t),
              s = n.length(),
              n = n.normalized(),
              r = Math.acos(n.x),
              Math.asin(n.y) < 0 && (r = 2 * Math.PI - r),
              e.rotate(r),
              e.scale(s / 5, s / 5),
              e.lineWidth = this._data.linewidth,
              CanvasEx.setLineStyle(e, this._data.linestyle),
              o = 50,
              a = Math.PI / (2 * o),
              e.moveTo(0, 0),
              l = this._data.counterclockwise ? -1 : 1,
              h = 0;
            h < (this._fibNumbers().length - 1) * o;
            h++
          )
            (d = l * h * a),
              (c = this._continiusFib(h / o)),
              (p = Math.cos(d) * c),
              (u = Math.sin(d) * c),
              e.lineTo(p, u);
          e.scale(5 / s, 5 / s), e.rotate(-r), e.stroke();
        }
      }),
      inherit(s, r),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        r.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (s.prototype.renderer = function() {
        var e, t;
        return (
          this._invalidated && this.updateImpl(),
          (e = new l()),
          this._floatPoints.length < 2
            ? e
            : ((t = {}),
              (t.points = this._floatPoints),
              (t.width = this._model.timeScale().width()),
              (t.height = this._source.priceScale().height()),
              (t.color = this._source.properties().linecolor.value()),
              (t.linewidth = this._source.properties().linewidth.value()),
              (t.linestyle = this._source.properties().linestyle.value()),
              (t.extendleft = !1),
              (t.extendright = !0),
              (t.leftend = h.Normal),
              (t.rightend = h.Normal),
              this._trendLineRenderer.setData(t),
              e.append(this._trendLineRenderer),
              (t = {}),
              (t.points = this._floatPoints),
              (t.width = this._model.timeScale().width()),
              (t.height = this._source.priceScale().height()),
              (t.color = this._source.properties().linecolor.value()),
              (t.linewidth = this._source.properties().linewidth.value()),
              (t.linestyle = this._source.properties().linestyle.value()),
              (t.counterclockwise = this._source
                .properties()
                .counterclockwise.value()),
              this._spiralRenderer.setData(t),
              e.append(this._spiralRenderer),
              this.isAnchorsRequired() && this.addAnchors(e),
              e)
        );
      }),
      (t.FibSpiralPaneView = s);
  },
  784: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._trendLineRenderer = new o()),
        (this._triangleRendererPoints234 = new a()),
        (this._intersect1Renderer = new a()),
        (this._intersect2Renderer = new a()),
        (this._leftShoulderLabelRenderer = new l({})),
        (this._headLabelRenderer = new l({})),
        (this._rightShoulderLabelRenderer = new l({}));
    }
    var s = i(129).intersectLineSegments,
      r = i(824).LineSourcePaneView,
      o = i(185).TrendLineRenderer,
      a = i(979).TriangleRenderer,
      l = i(186).TextRenderer,
      h = i(69).CompositeRenderer,
      d = i(29),
      c = i(103).LineEnd;
    inherit(n, r),
      (n.prototype._i18nCache = function() {
        return {
          leftShoulder: $.t('Left Shoulder'),
          rightShoulder: $.t('Right Shoulder'),
          head: $.t('Head'),
        };
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, a, l, p, u, _, f, g, v, w, y, m;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          this._points.length < 2)
        )
          return null;
        for (
          e = this._source.properties(),
            t = new h(),
            i = this,
            n = function(t, n) {
              return {
                points: [t],
                text: $.t(n),
                color: e.textcolor.value(),
                horzAlign: 'center',
                font: e.font.value(),
                offsetX: 0,
                offsetY: 0,
                bold: e.bold && e.bold.value(),
                italic: e.italic && e.italic.value(),
                fontsize: e.fontsize.value(),
                backgroundColor: i._source.properties().color.value(),
                backgroundRoundRect: 4,
              };
            },
            s = function(t, n, s, r) {
              return {
                points: [t, n],
                width: i._model.timeScale().width(),
                height: i._source.priceScale().height(),
                color: d.generateColor(i._source.properties().color.value(), s),
                linewidth: r || e.linewidth.value(),
                linestyle: CanvasEx.LINESTYLE_SOLID,
                extendleft: !1,
                extendright: !1,
                leftend: c.Normal,
                rightend: c.Normal,
              };
            },
            r = function(t, i, n) {
              var s = [t, i, n],
                r = {};
              return (
                (r.points = s),
                (r.color = e.color.value()),
                (r.linewidth = 0),
                (r.backcolor = e.backgroundColor.value()),
                (r.fillBackground = e.fillBackground.value()),
                (r.transparency = e.transparency.value()),
                r
              );
            },
            a = 1;
          a < this._points.length;
          a++
        )
          (l = s(this._points[a - 1], this._points[a], 0)),
            (p = new o()),
            p.setData(l),
            t.append(p);
        return (
          this._points.length >= 5 &&
            ((f = !1),
            (g = !1),
            this._intersect1
              ? (u = this._intersect1)
              : ((u = this._points[2]), (f = !0)),
            this._intersect2
              ? (_ = this._intersect2)
              : ((_ = this._points[4]), (g = !0)),
            (l = s(u, _, 0)),
            (l.extendleft = f),
            (l.extendright = g),
            this._trendLineRenderer.setData(l),
            t.append(this._trendLineRenderer),
            (v = r(this._points[2], this._points[3], this._points[4])),
            this._triangleRendererPoints234.setData(v),
            t.append(this._triangleRendererPoints234)),
          this._intersect1 &&
            ((v = r(this._intersect1, this._points[1], this._points[2])),
            this._intersect1Renderer.setData(v),
            t.append(this._intersect1Renderer)),
          this._intersect2 &&
            ((v = r(this._points[4], this._points[5], this._intersect2)),
            this._intersect2Renderer.setData(v),
            t.append(this._intersect2Renderer)),
          (w = this._i18nCache()),
          this._points.length >= 2 &&
            ((y = this._points[1]),
            (m = n(y, w.leftShoulder)),
            this._points[1].y < this._points[0].y
              ? ((m.vertAlign = 'bottom'), (m.offsetY = -10))
              : ((m.vertAlign = 'top'), (m.offsetY = 5)),
            this._leftShoulderLabelRenderer.setData(m),
            t.append(this._leftShoulderLabelRenderer)),
          this._points.length >= 4 &&
            ((y = this._points[3]),
            (m = n(y, w.head)),
            this._points[3].y < this._points[2].y
              ? ((m.vertAlign = 'bottom'), (m.offsetY = -10))
              : ((m.vertAlign = 'top'), (m.offsetY = 5)),
            this._headLabelRenderer.setData(m),
            t.append(this._headLabelRenderer)),
          this._points.length >= 6 &&
            ((y = this._points[5]),
            (m = n(y, w.rightShoulder)),
            this._points[5].y < this._points[4].y
              ? ((m.vertAlign = 'bottom'), (m.offsetY = -10))
              : ((m.vertAlign = 'top'), (m.offsetY = 5)),
            this._rightShoulderLabelRenderer.setData(m),
            t.append(this._rightShoulderLabelRenderer)),
          this.addAnchors(t),
          t
        );
      }),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, o, a, l, h;
        r.prototype._updateImpl.call(this),
          delete this._intersect1,
          delete this._intersect2,
          this._points.length >= 5 &&
            ((e = this._points[0]),
            (t = this._points[1]),
            (i = this._points[2]),
            (n = this._points[4]),
            (o = s(i, n, e, t)),
            null !== o &&
              ((a = n.subtract(i)), (this._intersect1 = i.add(a.scaled(o)))),
            7 === this._points.length &&
              ((l = this._points[5]),
              (h = this._points[6]),
              null !== (o = s(i, n, l, h)) &&
                ((a = n.subtract(i)),
                (this._intersect2 = i.add(a.scaled(o))))));
      }),
      (t.LineToolHeadAndShouldersPaneView = n);
  },
  785: function(e, t, i) {
    'use strict';
    function n(e, t) {
      s.call(this, e, t), (this._invalidated = !0), (this._renderer = new o());
    }
    var s = i(824).LineSourcePaneView,
      r = i(69).CompositeRenderer,
      o = i(979).TriangleRenderer;
    inherit(n, s),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        s.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (n.prototype.renderer = function() {
        var e, t;
        return (
          this._invalidated && this.updateImpl(),
          (e = {}),
          (e.points = this._points),
          (e.color = this._source.properties().color.value()),
          (e.linewidth = this._source.properties().linewidth.value()),
          (e.backcolor = this._source.properties().backgroundColor.value()),
          (e.fillBackground = this._source.properties().fillBackground.value()),
          (e.transparency = this._source.properties().transparency.value()),
          this._renderer.setData(e),
          this.isAnchorsRequired()
            ? ((t = new r()), t.append(this._renderer), this.addAnchors(t), t)
            : this._renderer
        );
      }),
      (t.TrianglePaneView = n);
  },
  786: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._trendLineRendererPoints01 = new a()),
        (this._trendLineRendererPoints12 = new a()),
        (this._trendLineRendererPoints23 = new a()),
        (this._intersectionRenderer = new o()),
        (this._poligonRenderer = new h()),
        (this._aLabelRenderer = new l({})),
        (this._bLabelRenderer = new l({})),
        (this._cLabelRenderer = new l({})),
        (this._dLabelRenderer = new l({}));
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(979).TriangleRenderer,
      a = i(185).TrendLineRenderer,
      l = i(186).TextRenderer,
      h = i(978).PolygonRenderer,
      d = i(69).CompositeRenderer,
      c = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, o, a, l;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          this._points.length < 2
            ? null
            : ((e = this._source.properties()),
              (t = new d()),
              (i = this),
              (n = function(t, n) {
                return {
                  points: [t],
                  text: n,
                  color: e.textcolor.value(),
                  vertAlign: 'middle',
                  horzAlign: 'center',
                  font: e.font.value(),
                  offsetX: 0,
                  offsetY: 0,
                  bold: e.bold && e.bold.value(),
                  italic: e.italic && e.italic.value(),
                  fontsize: e.fontsize.value(),
                  backgroundColor: i._source.properties().color.value(),
                  backgroundRoundRect: 4,
                };
              }),
              (s = function(t, n) {
                return {
                  points: [t, n],
                  width: i._model.timeScale().width(),
                  height: i._source.priceScale().height(),
                  color: i._source.properties().color.value(),
                  linewidth: e.linewidth.value(),
                  linestyle: CanvasEx.LINESTYLE_SOLID,
                  extendleft: !1,
                  extendright: !1,
                  leftend: c.Normal,
                  rightend: c.Normal,
                };
              }),
              (r = s(this._points[0], this._points[1])),
              this._trendLineRendererPoints01.setData(r),
              t.append(this._trendLineRendererPoints01),
              this._points.length >= 3 &&
                ((r = s(this._points[1], this._points[2])),
                this._trendLineRendererPoints12.setData(r),
                t.append(this._trendLineRendererPoints12)),
              4 === this._points.length &&
                ((r = s(this._points[2], this._points[3])),
                this._trendLineRendererPoints23.setData(r),
                t.append(this._trendLineRendererPoints23),
                this._intersectPoint
                  ? ((o = [
                      this._startPoint1,
                      this._startPoint2,
                      this._intersectPoint,
                    ]),
                    (a = {}),
                    (a.points = o),
                    (a.color = e.color.value()),
                    (a.linewidth = e.linewidth.value()),
                    (a.backcolor = e.backgroundColor.value()),
                    (a.fillBackground = e.fillBackground.value()),
                    (a.transparency = e.transparency.value()),
                    this._intersectionRenderer.setData(a),
                    t.append(this._intersectionRenderer))
                  : this._intersectPoint1 &&
                    this._intersectPoint2 &&
                    ((o = [
                      this._startPoint1,
                      this._startPoint2,
                      this._intersectPoint2,
                      this._intersectPoint1,
                    ]),
                    (a = {}),
                    (a.filled = !0),
                    (a.fillBackground = !0),
                    (a.points = o),
                    (a.color = e.color.value()),
                    (a.linewidth = e.linewidth.value()),
                    (a.backcolor = e.backgroundColor.value()),
                    (a.transparency = e.transparency.value()),
                    this._poligonRenderer.setData(a),
                    t.append(this._poligonRenderer))),
              (l = n(this._points[0], 'A')),
              this._points[1].y > this._points[0].y
                ? ((l.vertAlign = 'bottom'), (l.offsetY = -10))
                : ((l.vertAlign = 'top'), (l.offsetY = 5)),
              this._aLabelRenderer.setData(l),
              t.append(this._aLabelRenderer),
              (l = n(this._points[1], 'B')),
              this._points[1].y < this._points[0].y
                ? ((l.vertAlign = 'bottom'), (l.offsetY = -10))
                : ((l.vertAlign = 'top'), (l.offsetY = 5)),
              this._bLabelRenderer.setData(l),
              t.append(this._bLabelRenderer),
              this._points.length > 2 &&
                ((l = n(this._points[2], 'C')),
                this._points[2].y < this._points[1].y
                  ? ((l.vertAlign = 'bottom'), (l.offsetY = -10))
                  : ((l.vertAlign = 'top'), (l.offsetY = 5)),
                this._cLabelRenderer.setData(l),
                t.append(this._cLabelRenderer)),
              this._points.length > 3 &&
                ((l = n(this._points[3], 'D')),
                this._points[3].y < this._points[2].y
                  ? ((l.vertAlign = 'bottom'), (l.offsetY = -10))
                  : ((l.vertAlign = 'top'), (l.offsetY = 5)),
                this._dLabelRenderer.setData(l),
                t.append(this._dLabelRenderer)),
              this.addAnchors(t),
              t)
        );
      }),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, o, a, l, h, d, c, p, u;
        if (
          (r.prototype._updateImpl.call(this),
          (this._valid = !1),
          delete this._intersectPoint,
          delete this._intersectPoint1,
          delete this._intersectPoint2,
          4 === this._points.length)
        ) {
          if (
            ((e = this._points[0]),
            (t = this._points[1]),
            (i = this._points[2]),
            (n = this._points[3]),
            Math.abs(i.x - e.x) < 1 || Math.abs(n.x - t.x) < 1)
          )
            return;
          if (
            ((o = Math.min(e.x, t.x)),
            (o = Math.min(o, i.x)),
            (o = Math.min(o, n.x)),
            (a = (i.y - e.y) / (i.x - e.x)),
            (l = e.y + (o - e.x) * a),
            (h = (n.y - t.y) / (n.x - t.x)),
            (d = t.y + (o - t.x) * h),
            Math.abs(a - h) < 1e-6)
          )
            return;
          (this._startPoint1 = new s(o, l)),
            (this._startPoint2 = new s(o, d)),
            (c = (t.y - e.y + (e.x * a - t.x * h)) / (a - h)),
            (this._valid = !0),
            c < o &&
              ((p = Math.max(e.x, t.x)),
              (p = Math.max(p, i.x)),
              (p = Math.max(p, n.x)),
              (l = e.y + (p - e.x) * a),
              (d = t.y + (p - t.x) * h),
              (this._startPoint1 = new s(p, l)),
              (this._startPoint2 = new s(p, d))),
            (u = e.y + (c - e.x) * a),
            (this._intersectPoint = new s(c, u));
        }
      }),
      (t.LineToolTrianglePatternPaneView = n);
  },
  787: function(e, t, i) {
    'use strict';
    function n(e, t) {
      s.call(this, e, t),
        (this._numericFormatter = new l()),
        (this._invalidated = !0),
        (this._retrace1LabelRenderer = new o({})),
        (this._retrace12LabelRenderer = new o({}));
    }
    var s = i(824).LineSourcePaneView,
      r = i(185).TrendLineRenderer,
      o = i(186).TextRenderer,
      a = i(69).CompositeRenderer,
      l = i(105).NumericFormatter,
      h = i(29),
      d = i(103).LineEnd;
    inherit(n, s),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, o, l, c, p, u;
        if (
          (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          this._points.length < 2)
        )
          return null;
        for (
          e = this._source.properties(),
            t = new a(),
            i = this,
            n = function(t, n) {
              return {
                points: [t],
                text: n,
                color: e.textcolor.value(),
                vertAlign: 'middle',
                horzAlign: 'center',
                font: e.font.value(),
                offsetX: 0,
                offsetY: 0,
                bold: e.bold && e.bold.value(),
                italic: e.italic && e.italic.value(),
                fontsize: e.fontsize.value(),
                backgroundColor: i._source.properties().color.value(),
                backgroundRoundRect: 4,
              };
            },
            s = function(t, n, s, r) {
              return {
                points: [t, n],
                width: i._model.timeScale().width(),
                height: i._source.priceScale().height(),
                color: h.generateColor(i._source.properties().color.value(), s),
                linewidth: r || e.linewidth.value(),
                linestyle: CanvasEx.LINESTYLE_SOLID,
                extendleft: !1,
                extendright: !1,
                leftend: d.Normal,
                rightend: d.Normal,
              };
            },
            o = 1;
          o < this._points.length;
          o++
        )
          (l = s(this._points[o - 1], this._points[o], 0)),
            (c = new r()),
            c.setData(l),
            t.append(c);
        return (
          this._retrace1 &&
            ((l = s(this._points[1], this._points[3], 70, 1)),
            (c = new r()),
            c.setData(l),
            t.append(c),
            (p = this._points[1].add(this._points[3]).scaled(0.5)),
            (u = n(p, this._numericFormatter.format(this._retrace1))),
            this._retrace1LabelRenderer.setData(u),
            t.append(this._retrace1LabelRenderer)),
          this._retrace2 &&
            ((l = s(this._points[3], this._points[5], 70, 1)),
            (c = new r()),
            c.setData(l),
            t.append(c),
            (p = this._points[5].add(this._points[3]).scaled(0.5)),
            (u = n(p, this._numericFormatter.format(this._retrace2))),
            this._retrace12LabelRenderer.setData(u),
            t.append(this._retrace12LabelRenderer)),
          this.addAnchors(t),
          t
        );
      }),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, r;
        s.prototype._updateImpl.call(this),
          delete this._retrace1,
          delete this._retrace2,
          this._source.points().length >= 4 &&
            ((e = this._source.points()[1]),
            (t = this._source.points()[2]),
            (i = this._source.points()[3]),
            (this._retrace1 =
              Math.round(
                100 * Math.abs((i.price - t.price) / (t.price - e.price))
              ) / 100)),
          this._source.points().length >= 6 &&
            ((i = this._source.points()[3]),
            (n = this._source.points()[4]),
            (r = this._source.points()[5]),
            (this._retrace2 =
              Math.round(
                100 * Math.abs((r.price - n.price) / (n.price - i.price))
              ) / 100));
      }),
      (t.LineToolThreeDrivesPaneView = n);
  },
  788: function(e, t, i) {
    'use strict';
    function n(e, t) {
      s.call(this, e, t),
        (this._numericFormatter = new l()),
        (this._invalidated = !0),
        (this._lineRendererPoints01 = new r()),
        (this._lineRendererPoints12 = new r()),
        (this._lineRendererPoints23 = new r()),
        (this._abRetracementTrend = new r()),
        (this._cdRetracementTrend = new r()),
        (this._abLabelRenderer = new o({})),
        (this._cdLabelRenderer = new o({})),
        (this._textRendererALabel = new o({})),
        (this._textRendererBLabel = new o({})),
        (this._textRendererCLabel = new o({})),
        (this._textRendererDLabel = new o({}));
    }
    var s = i(824).LineSourcePaneView,
      r = i(185).TrendLineRenderer,
      o = i(186).TextRenderer,
      a = i(69).CompositeRenderer,
      l = i(105).NumericFormatter,
      h = i(29),
      d = i(103).LineEnd;
    inherit(n, s),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, o, l, c;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          this._points.length < 2
            ? null
            : ((e = this._source.properties()),
              (t = new a()),
              (i = this._points),
              (n = this),
              (s = function(t, i) {
                return {
                  points: [t],
                  text: i,
                  color: e.textcolor.value(),
                  vertAlign: 'middle',
                  horzAlign: 'center',
                  font: e.font.value(),
                  offsetX: 0,
                  offsetY: 0,
                  bold: e.bold && e.bold.value(),
                  italic: e.italic && e.italic.value(),
                  fontsize: e.fontsize.value(),
                  backgroundColor: n._source.properties().color.value(),
                  backgroundRoundRect: 4,
                };
              }),
              (r = function(t, i, s, r) {
                return {
                  points: [t, i],
                  width: n._model.timeScale().width(),
                  height: n._source.priceScale().height(),
                  color: h.generateColor(
                    n._source.properties().color.value(),
                    s
                  ),
                  linewidth: r || e.linewidth.value(),
                  linestyle: CanvasEx.LINESTYLE_SOLID,
                  extendleft: !1,
                  extendright: !1,
                  leftend: d.Normal,
                  rightend: d.Normal,
                };
              }),
              (o = r(i[0], i[1], 0)),
              this._lineRendererPoints01.setData(o),
              t.append(this._lineRendererPoints01),
              i.length >= 3 &&
                ((o = r(i[1], i[2], 0)),
                this._lineRendererPoints12.setData(o),
                t.append(this._lineRendererPoints12)),
              4 === i.length &&
                ((o = r(i[2], i[3], 0)),
                this._lineRendererPoints23.setData(o),
                t.append(this._lineRendererPoints23)),
              (l = s(this._points[0], 'A')),
              this._points[1].y > this._points[0].y
                ? ((l.vertAlign = 'bottom'), (l.offsetY = -10))
                : ((l.vertAlign = 'top'), (l.offsetY = 5)),
              this._textRendererALabel.setData(l),
              t.append(this._textRendererALabel),
              (l = s(this._points[1], 'B')),
              this._points[1].y < this._points[0].y
                ? ((l.vertAlign = 'bottom'), (l.offsetY = -10))
                : ((l.vertAlign = 'top'), (l.offsetY = 5)),
              this._textRendererBLabel.setData(l),
              t.append(this._textRendererBLabel),
              this._points.length > 2 &&
                ((l = s(this._points[2], 'C')),
                this._points[2].y < this._points[1].y
                  ? ((l.vertAlign = 'bottom'), (l.offsetY = -10))
                  : ((l.vertAlign = 'top'), (l.offsetY = 5)),
                this._textRendererCLabel.setData(l),
                t.append(this._textRendererCLabel)),
              this._points.length > 3 &&
                ((l = s(this._points[3], 'D')),
                this._points[3].y < this._points[2].y
                  ? ((l.vertAlign = 'bottom'), (l.offsetY = -10))
                  : ((l.vertAlign = 'top'), (l.offsetY = 5)),
                this._textRendererDLabel.setData(l),
                t.append(this._textRendererDLabel)),
              this._points.length >= 3 &&
                ((c = this._points[0].add(this._points[2]).scaled(0.5)),
                (o = r(this._points[0], this._points[2], 70, 1)),
                this._abRetracementTrend.setData(o),
                t.append(this._abRetracementTrend),
                (l = s(c, this._numericFormatter.format(this._ABRetracement))),
                this._abLabelRenderer.setData(l),
                t.append(this._abLabelRenderer)),
              this._points.length >= 4 &&
                ((c = this._points[1].add(this._points[3]).scaled(0.5)),
                (o = r(this._points[1], this._points[3], 70, 1)),
                this._cdRetracementTrend.setData(o),
                t.append(this._cdRetracementTrend),
                (l = s(c, this._numericFormatter.format(this._CDRetracement))),
                this._cdLabelRenderer.setData(l),
                t.append(this._cdLabelRenderer)),
              this.addAnchors(t),
              t)
        );
      }),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n;
        s.prototype._updateImpl.call(this),
          this._source.points().length >= 3 &&
            ((e = this._source.points()[0]),
            (t = this._source.points()[1]),
            (i = this._source.points()[2]),
            (this._ABRetracement =
              Math.round(
                1e3 * Math.abs((i.price - t.price) / (t.price - e.price))
              ) / 1e3)),
          4 === this._source.points().length &&
            ((n = this._source.points()[3]),
            (this._CDRetracement =
              Math.round(
                1e3 * Math.abs((n.price - i.price) / (i.price - t.price))
              ) / 1e3));
      }),
      (t.ABCDPaneView = n);
  },
  789: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._percentageFormatter = new c()),
        (this._numericFormatter = new p()),
        (this._pipFormatter = null),
        (this._lastSymbolInfo = null),
        (this._entryLineRenderer = new o()),
        (this._stopLineRenderer = new o()),
        (this._targetLineRenderer = new o()),
        (this._positionLineRenderer = new o()),
        (this._fullStopBgRenderer = new l(
          new h(h.MOVEPOINT),
          new h(h.MOVEPOINT)
        )),
        (this._stopBgRenderer = new l(new h(h.MOVEPOINT), new h(h.MOVEPOINT))),
        (this._fullTargetBgRenderer = new l(
          new h(h.MOVEPOINT),
          new h(h.MOVEPOINT)
        )),
        (this._targetBgRenderer = new l(
          new h(h.MOVEPOINT),
          new h(h.MOVEPOINT)
        )),
        (this._stopLabelRenderer = new a({})),
        (this._middleLabelRenderer = new a({})),
        (this._profitLabelRenderer = new a({}));
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(185).TrendLineRenderer,
      a = i(186).TextRenderer,
      l = i(303).RectangleRenderer,
      h = i(9).HitTestResult,
      d = i(69).CompositeRenderer,
      c = i(70).PercentageFormatter,
      p = i(105).NumericFormatter,
      u = i(315).PipFormatter,
      _ = i(29),
      f = i(103).LineEnd,
      g = i(352).RiskRewardPointIndex,
      v = i(38).forceLTRStr;
    inherit(n, r),
      (n.prototype.i18nCache = {
        pnl: $.t('{0} P&L: {1}'),
        open: $.t('Open', { context: 'line_tool_position' }),
        closed: $.t('Closed', { context: 'line_tool_position' }),
        ratio: $.t('Risk/Reward Ratio: {0}'),
        stop: $.t('Stop: {0} ({1}) {2}, Amount: {3}'),
        target: $.t('Target: {0} ({1}) {2}, Amount: {3}'),
        qty: $.t('Qty: {0}'),
      }),
      (n.prototype._formatInTicks = function(e) {
        var t = this._model.mainSeries().base();
        return Math.round(e * t);
      }),
      (n.prototype.isLabelVisible = function() {
        return this.isHoveredSource() || this.isSelectedSource();
      }),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype._updateImpl = function() {
        var e, t, i, n, s, o;
        r.prototype._updateImpl.call(this),
          (this._stopLevel = null),
          (this._profitLevel = null),
          (e = this._model.timeScale()),
          !(t = this._source.priceScale()) ||
            t.isEmpty() ||
            e.isEmpty() ||
            (0 !== this._source.points().length &&
              0 !== this._points.length &&
              null !==
                this._model
                  .mainSeries()
                  .bars()
                  .last() &&
              (this._source.points().length < 2 ||
                (0 !== this._model.mainSeries().bars().length &&
                  ((this._isClosed = 4 === this._source.points().length),
                  (i = this._source.lastBarData()) &&
                    ((n = this._source.stopPrice()),
                    (s = this._source.profitPrice()),
                    (this._pl =
                      this._source.points().length > 1
                        ? this._source.calculatePL(i.closePrice)
                        : 0),
                    (o = this._source.ownerSource().firstValue()),
                    (this._entryLevel = this._points[g.Entry].y),
                    (this._stopLevel = t.priceToCoordinate(n, o)),
                    (this._profitLevel = t.priceToCoordinate(s, o)),
                    (this._closeLevel = t.priceToCoordinate(i.closePrice, o)),
                    (this._closeBar = this._source._model
                      .timeScale()
                      .indexToCoordinate(i.index)))))));
      }),
      (n.prototype.renderer = function() {
        var e,
          t,
          i,
          n,
          r,
          o,
          a,
          l,
          h,
          c,
          p,
          w,
          y,
          m,
          x,
          b,
          R,
          S,
          P,
          T,
          L,
          C,
          k,
          I,
          B,
          A,
          M,
          O,
          D,
          E,
          N,
          V,
          z,
          H,
          F,
          W,
          j,
          Y;
        return (
          this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          (e = new d()),
          this._points.length < 2 || this._source.points().length < 2
            ? e
            : ((t = this),
              (i = this._source.properties()),
              (n = this._points[g.Entry].x),
              (r = this._points[g.ActualEntry]
                ? this._points[g.ActualEntry].x
                : this._points[g.Close].x),
              (o = this._points[g.ActualClose]
                ? this._points[g.ActualClose].x
                : this._points[g.Close].x),
              (a = this._points[g.Close].x),
              (l = new s(n, this._entryLevel)),
              (h = new s(a, this._stopLevel)),
              (c = {}),
              (c.points = [l, h]),
              (c.color = 'white'),
              (c.linewidth = 0),
              (c.backcolor = i.stopBackground.value()),
              (c.fillBackground = !0),
              (c.transparency = i.stopBackgroundTransparency.value()),
              this._fullStopBgRenderer.setData(c),
              e.append(this._fullStopBgRenderer),
              this._pl < 0 &&
                ((l = new s(r, this._entryLevel)),
                (h = new s(o, this._closeLevel)),
                (c = {}),
                (c.points = [l, h]),
                (c.color = 'white'),
                (c.linewidth = 0),
                (c.backcolor = i.stopBackground.value()),
                (c.fillBackground = !0),
                (p = 0.01 * i.stopBackgroundTransparency.value()),
                (w = 100 * (1 - p * p * p)),
                (y = 100 - w),
                (c.transparency = y),
                this._stopBgRenderer.setData(c),
                e.append(this._stopBgRenderer)),
              (l = new s(n, this._entryLevel)),
              (h = new s(a, this._profitLevel)),
              (c = {}),
              (c.points = [l, h]),
              (c.color = 'white'),
              (c.linewidth = 0),
              (c.backcolor = i.profitBackground.value()),
              (c.fillBackground = !0),
              (c.transparency = i.profitBackgroundTransparency.value()),
              this._fullTargetBgRenderer.setData(c),
              e.append(this._fullTargetBgRenderer),
              this._pl > 0 &&
                ((l = new s(r, this._entryLevel)),
                (h = new s(o, this._closeLevel)),
                (c = {}),
                (c.points = [l, h]),
                (c.color = 'white'),
                (c.linewidth = 0),
                (c.backcolor = i.profitBackground.value()),
                (c.fillBackground = !0),
                (p = 0.01 * i.profitBackgroundTransparency.value()),
                (m = 100 * (1 - p * p * p)),
                (x = 100 - m),
                (c.transparency = x),
                this._targetBgRenderer.setData(c),
                e.append(this._targetBgRenderer)),
              (b = function(i, n, s, r) {
                var o = {};
                (o.points = [n, s]),
                  (o.width = t._model.timeScale().width()),
                  (o.height = t._source.priceScale().height()),
                  (o.color = r || t._source.properties().linecolor.value()),
                  (o.linewidth = t._source.properties().linewidth.value()),
                  (o.linestyle = CanvasEx.LINESTYLE_SOLID),
                  (o.extendleft = !1),
                  (o.extendright = !1),
                  (o.leftend = f.Normal),
                  (o.rightend = f.Normal),
                  i.setData(o),
                  e.append(i);
              }),
              this._points[g.ActualEntry] &&
                ((l = this._points[g.ActualEntry]),
                (h = this._isClosed
                  ? this._points[g.ActualClose]
                  : new s(this._closeBar, this._closeLevel)),
                (c = {}),
                (c.points = [l, h]),
                (c.width = t._model.timeScale().width()),
                (c.height = t._source.priceScale().height()),
                (c.color = t._source.properties().linecolor.value()),
                (c.linewidth = 1),
                (c.linestyle = CanvasEx.LINESTYLE_DASHED),
                (c.extendleft = !1),
                (c.extendright = !1),
                (c.leftend = f.Normal),
                (c.rightend = f.Arrow),
                this._positionLineRenderer.setData(c),
                e.append(this._positionLineRenderer)),
              (t = this),
              (R = function(n, s, r, o, a, l, h) {
                if (t.isLabelVisible() || TradingView.printing) {
                  var d = {};
                  (d.points = [s]),
                    (d.text = r),
                    (d.color = i.textcolor.value()),
                    (d.font = i.font.value()),
                    (d.offsetX = 3),
                    (d.offsetY = l),
                    (d.vertAlign = a),
                    (d.horzAlign = 'center'),
                    (d.backgroundRoundRect = 4),
                    (d.backgroundColor = _.resetTransparency(o)),
                    (d.fontsize = i.fontsize.value()),
                    (d.backgroundHorzInflate = 4),
                    (d.backgroundVertInflate = 2),
                    h && (d.borderColor = h),
                    n.setData(d),
                    e.append(n);
                }
              }),
              (S = this._source.entryPrice()),
              (P = this._source.stopPrice()),
              (T = this._source.profitPrice()),
              (L = Math.abs(P - S)),
              (C = Math.round((1e4 * L) / S) / 100),
              (k = Math.abs(T - S)),
              (I = Math.round((1e4 * k) / S) / 100),
              (B = Math.abs(S - T) / Math.abs(S - P)),
              (l = new s(n, this._points[g.Entry].y)),
              (h = new s(a, this._points[g.Entry].y)),
              b(this._entryLineRenderer, l, h),
              (A = new s((n + a) / 2, Math.round(this._points[0].y) + 0.5)),
              (M = ''),
              (O = ''),
              (D = this._numericFormatter.format(Math.round(100 * B) / 100)),
              this._points[1] &&
                void 0 !== this._pl &&
                (O = this._source
                  .ownerSource()
                  .formatter()
                  .format(this._pl)),
              i.compact.value()
                ? ((M += O ? O + ' ~ ' : ''),
                  (M += i.qty.value() + '\n'),
                  (M += D))
                : ((E = this._isClosed
                    ? this.i18nCache.closed
                    : this.i18nCache.open),
                  (M += O ? this.i18nCache.pnl.format(E, O) + ', ' : ''),
                  (M += this.i18nCache.qty.format(i.qty.value()) + '\n'),
                  (M += this.i18nCache.ratio.format(D) + ' ')),
              (N = i.linecolor.value()),
              this._pl < 0
                ? (N = i.stopBackground.value())
                : this._pl > 0 && (N = i.profitBackground.value()),
              R(this._middleLabelRenderer, A, M, N, 'middle', 0, 'white'),
              (l = new s(n, this._stopLevel)),
              (h = new s(a, this._stopLevel)),
              b(this._stopLineRenderer, l, h, i.stopBackground.value()),
              (V = this._model.mainSeries().symbolInfo()),
              V &&
                V !== this._lastSymbolInfo &&
                ((this._pipFormatter = new u(
                  V.pricescale,
                  V.minmov,
                  V.type,
                  V.minmove2
                )),
                (this._lastSymbolInfo = V)),
              (A = new s((n + a) / 2, this._stopLevel)),
              (M = ''),
              (z = this._source
                .ownerSource()
                .formatter()
                .format(L)),
              (H = this._percentageFormatter.format(C)),
              (M = i.compact.value()
                ? z + ' (' + H + ') ' + i.amountStop.value()
                : this.i18nCache.stop.format(
                    v(
                      this._source
                        .ownerSource()
                        .formatter()
                        .format(L)
                    ),
                    v(this._percentageFormatter.format(C)),
                    this._pipFormatter ? v(this._pipFormatter.format(L)) : '',
                    v(i.amountStop.value())
                  )),
              R(
                this._stopLabelRenderer,
                A,
                M,
                i.stopBackground.value(),
                S < P ? 'bottom' : 'top',
                S < P ? -12 : -1
              ),
              (l = new s(n, this._profitLevel)),
              (h = new s(a, this._profitLevel)),
              b(this._targetLineRenderer, l, h, i.profitBackground.value()),
              (A = new s((n + a) / 2, this._profitLevel)),
              (M = ''),
              (z = this._source
                .ownerSource()
                .formatter()
                .format(k)),
              (H = this._percentageFormatter.format(I)),
              (M = i.compact.value()
                ? z + ' (' + H + ') ' + i.amountTarget.value()
                : this.i18nCache.target.format(
                    v(
                      this._source
                        .ownerSource()
                        .formatter()
                        .format(k)
                    ),
                    v(this._percentageFormatter.format(I)),
                    this._pipFormatter ? v(this._pipFormatter.format(k)) : '',
                    v(i.amountTarget.value())
                  )),
              R(
                this._profitLabelRenderer,
                A,
                M,
                i.profitBackground.value(),
                S < P ? 'top' : 'bottom',
                S < P ? -1 : -12
              ),
              this.isAnchorsRequired() &&
                ((F = this._points[0].clone()),
                (F.data = 0),
                (W = new s(n, this._stopLevel)),
                (W.data = 1),
                (j = new s(n, this._profitLevel)),
                (j.data = 2),
                (Y = new s(a, F.y)),
                (Y.data = 3),
                e.append(this.createLineAnchor({ points: [F, W, j, Y] }))),
              e)
        );
      }),
      (t.RiskRewardPaneView = n);
  },
  790: function(e, t, i) {
    'use strict';
    function n(e, t) {
      s.call(this, e, t), (this._invalidated = !0), (this._renderer = new r());
    }
    var s = i(824).LineSourcePaneView,
      r = i(978).PolygonRenderer,
      o = i(69).CompositeRenderer;
    inherit(n, s),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        s.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (n.prototype.renderer = function() {
        var e, t;
        return (
          this._invalidated && this.updateImpl(),
          (e = {}),
          (e.points = this._points),
          (e.color = this._source.properties().linecolor.value()),
          (e.linewidth = this._source.properties().linewidth.value()),
          (e.linestyle = this._source.properties().linestyle.value()),
          (e.filled = this._source.properties().filled.value()),
          (e.backcolor = this._source.properties().backgroundColor.value()),
          (e.fillBackground = this._source.properties().fillBackground.value()),
          (e.transparency = this._source.properties().transparency.value()),
          this._renderer.setData(e),
          this.isAnchorsRequired()
            ? ((t = new o()), t.append(this._renderer), this.addAnchors(t), t)
            : this._renderer
        );
      }),
      (t.PolylinePaneView = n);
  },
  791: function(e, t, i) {
    'use strict';
    function n() {
      (this._data = null),
        (this._targetFontSize1 = 11),
        (this._targetFontSize2 = 11),
        (this._targetFontSize3 = 14),
        (this._font = 'Arial'),
        (this._sourceFontSize1 = 12),
        (this._sourceFontSize2 = 10);
    }
    function s(e, t) {
      h.call(this, e, t),
        (this._clockWhite = u(
          'prediction-clock-white',
          TradingView.wrapUrl('/static/images/prediction-clock-white.png')
        )),
        (this._clockBlack = u(
          'prediction-clock-black',
          TradingView.wrapUrl('/static/images/prediction-clock-black.png')
        )),
        (this._successIcon = u(
          'prediction-success-white',
          TradingView.wrapUrl('/static/images/prediction-success-white.png')
        )),
        (this._failureIcon = u(
          'prediction-failure-white',
          TradingView.wrapUrl('/static/images/prediction-failure-white.png')
        )),
        (this._percentageFormatter = new f()),
        (this._invalidated = !0),
        (this._renderer = new n());
    }
    var r = i(6).Point,
      o = i(24),
      a = o.parseRgb,
      l = o.rgbToBlackWhiteString,
      h = i(824).LineSourcePaneView,
      d = i(15).Interval,
      c = i(9).HitTestResult,
      p = i(69).CompositeRenderer,
      u = i(1036),
      _ = i(50),
      f = i(70).PercentageFormatter,
      g = i(201).DateFormatter,
      v = i(130).TimeFormatter,
      w = i(318).TimeSpanFormatter,
      y = i(29),
      m = i(353),
      x = i(81).calcTextHorizontalShift,
      b = i(46).drawRoundRect,
      R = i(38),
      S = R.forceLTRStr,
      P = R.startWithLTR;
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype.drawBalloon = function(e, t, i, n, s, o) {
        var a,
          l,
          h = 6,
          d = 5,
          c = 5,
          p = o || 20,
          u = 3;
        return (
          e.beginPath(),
          'down' === s
            ? ((a = new r(t.x - p, t.y - h - c - n)),
              e.moveTo(a.x + u, a.y),
              e.lineTo(a.x + i - u, a.y),
              e.arcTo(a.x + i, a.y, a.x + i, a.y + u, u),
              e.lineTo(a.x + i, a.y + n - u),
              e.arcTo(a.x + i, a.y + n, a.x + i - u, a.y + n, u),
              e.lineTo(a.x + p + d, a.y + n),
              e.lineTo(a.x + p, a.y + n + c),
              e.lineTo(a.x + p - d, a.y + n),
              e.lineTo(a.x + u, a.y + n),
              e.arcTo(a.x, a.y + n, a.x, a.y + n - u, u),
              e.lineTo(a.x, a.y + u),
              e.arcTo(a.x, a.y, a.x + u, a.y, u),
              a)
            : ((l = new r(t.x - p, t.y + h + c + n)),
              e.moveTo(l.x + u, l.y),
              e.lineTo(l.x + i - u, l.y),
              e.arcTo(l.x + i, l.y, l.x + i, l.y - u, u),
              e.lineTo(l.x + i, l.y - n + u),
              e.arcTo(l.x + i, l.y - n, l.x + i - u, l.y - n, u),
              e.lineTo(l.x + p + d, l.y - n),
              e.lineTo(l.x + p, l.y - n - c),
              e.lineTo(l.x + p - d, l.y - n),
              e.lineTo(l.x + u, l.y - n),
              e.arcTo(l.x, l.y - n, l.x, l.y - n + u, u),
              e.lineTo(l.x, l.y - u),
              e.arcTo(l.x, l.y, l.x + u, l.y, u),
              new r(l.x, l.y - n))
        );
      }),
      (n.prototype.drawTargetLabel = function(e) {
        var t,
          i,
          n,
          s,
          r,
          o,
          a,
          l,
          h,
          d,
          c,
          p,
          u,
          _,
          f,
          g,
          v,
          w,
          R,
          S,
          P,
          T,
          L,
          C,
          k,
          I,
          B,
          A,
          M,
          O,
          D,
          E = this._data.points[1];
        if (
          (e.save(),
          e.translate(0.5, 0.5),
          (e.font = 'normal ' + this._targetFontSize3 + 'px ' + this._font),
          (t = 1.5 * this._targetFontSize1 + 1.5 * this._targetFontSize2 + 3),
          (i = e.measureText(this._data.targetLine1).width),
          (n = e.measureText(this._data.targetLine2).width),
          (e.font = 'normal ' + this._targetFontSize2 + 'px ' + this._font),
          (s = e.measureText(this._data.targetLine3).width),
          (r = e.measureText(this._data.targetLine4).width),
          (o = Math.max(i + n, s + r + 10) + 20),
          (a = 'up' === this._data.direction ? 'down' : 'up'),
          (l = E.x + o - e.canvas.width + 5),
          (l = Math.max(20, Math.min(o - 15, l))),
          (h = this.drawBalloon(e, E, o, t, a, l)),
          e.save(),
          (e.fillStyle = y.generateColor(
            this._data.targetBackColor,
            this._data.transparency
          )),
          e.fill(),
          e.restore(),
          e.save(),
          (e.lineWidth = 2),
          (e.strokeStyle = y.generateColor(
            this._data.targetStrokeColor,
            this._data.transparency
          )),
          e.stroke(),
          e.restore(),
          (d = 3),
          e.beginPath(),
          e.arc(E.x, E.y, d, 0, 2 * Math.PI, !1),
          (e.fillStyle = this._data.centersColor),
          e.fill(),
          (e.textAlign = 'start'),
          (c = 6),
          (p = 4),
          (u = x(e, o - 2 * c)),
          (e.fillStyle = this._data.targetTextColor),
          (e.font = 'normal ' + this._targetFontSize3 + 'px ' + this._font),
          e.fillText(
            this._data.targetLine1,
            h.x + c + u,
            h.y + this._targetFontSize1 + p
          ),
          (_ = 13),
          (f = 5),
          (g = c + i + f),
          (v = x(e, o - 2 * g)),
          e.fillText(
            this._data.targetLine2,
            h.x + g + v,
            h.y + this._targetFontSize1 + p
          ),
          (e.font = 'normal ' + this._targetFontSize2 + 'px ' + this._font),
          (w = h.y + this._targetFontSize1 + 2 * p + this._targetFontSize2),
          (R = x(e, o - 2 * c)),
          e.fillText(this._data.targetLine3, h.x + c + R, w),
          (S = c + s + 5),
          (P = x(e, o - 2 * S - _ + 1)),
          e.drawImage(
            this._data.clockWhite,
            h.x + S + 1 + P,
            w - this._targetFontSize2 + 3
          ),
          (T = S + _),
          (L = x(e, o - 2 * T)),
          e.fillText(this._data.targetLine4, h.x + T + L, w),
          !this._data.status)
        )
          return void e.restore();
        switch (
          ((C = this._targetFontSize1 + 4),
          (e.font = 'bold ' + this._targetFontSize1 + 'px ' + this._font),
          this._data.status)
        ) {
          case m.AlertStatus.Success:
            (k = $.t('SUCCESS')),
              (I = y.generateColor(
                this._data.successBackground,
                this._data.transparency
              )),
              (B = this._data.successTextColor),
              (A = this._data.successIcon);
            break;
          case m.AlertStatus.Failure:
            (k = $.t('FAILURE')),
              (I = y.generateColor(
                this._data.failureBackground,
                this._data.transparency
              )),
              (B = this._data.failureTextColor),
              (A = this._data.failureIcon);
        }
        (M = e.measureText(k).width),
          (O = Math.round((o - M) / 2)),
          (D = x(e, M)),
          (e.fillStyle = I),
          'up' === this._data.direction
            ? (b(e, h.x - 1, h.y - C - 2, o + 2, C, 5),
              e.fill(),
              (e.fillStyle = B),
              e.fillText(k, h.x + O + D, h.y - 5),
              e.drawImage(A, h.x + O - 13, h.y - 14))
            : (b(e, h.x - 1, h.y + t + 3, o + 2, C, 5),
              e.fill(),
              (e.fillStyle = B),
              e.fillText(k, h.x + O + D, h.y + t + C - 1),
              e.drawImage(A, h.x + O - 13, h.y + t + 5)),
          e.restore();
      }),
      (n.prototype.drawStartLabel = function(e) {
        var t, i, n, s, r, o, a, l, h, d;
        e.save(),
          e.translate(0.5, 0.5),
          (e.font = 'normal ' + this._sourceFontSize1 + 'px ' + this._font),
          (t = 1.5 * this._sourceFontSize1 + 1.5 * this._sourceFontSize2),
          (i = e.measureText(this._data.sourceLine1).width),
          (e.font = 'normal ' + this._fontsize2 + 'px ' + this._font),
          (n = e.measureText(this._data.sourceLine2).width),
          (s = Math.max(i, n) - 5),
          (r = this._data.points[0]),
          (o = this.drawBalloon(e, r, s, t, this._data.direction)),
          (e.fillStyle = y.generateColor(
            this._data.sourceBackColor,
            this._data.transparency
          )),
          e.fill(),
          (e.lineWidth = 2),
          (e.strokeStyle = y.generateColor(
            this._data.sourceStrokeColor,
            this._data.transparency
          )),
          e.stroke(),
          (a = 3),
          e.beginPath(),
          e.arc(r.x, r.y, a, 0, 2 * Math.PI, !1),
          (e.fillStyle = this._data.centersColor),
          e.fill(),
          (e.textAlign = 'start'),
          (l = 3),
          (h = 2),
          (d = x(e, s - 2 * l)),
          (e.fillStyle = this._data.sourceTextColor),
          (e.font = 'normal ' + this._sourceFontSize1 + 'px ' + this._font),
          e.fillText(
            this._data.sourceLine1,
            o.x + l + d,
            o.y + this._sourceFontSize1 + h
          ),
          (e.font = 'normal ' + this._sourceFontSize2 + 'px ' + this._font),
          e.fillText(
            this._data.sourceLine2,
            o.x + l + d,
            o.y + this._sourceFontSize1 + 2 * h + this._sourceFontSize2
          ),
          e.restore();
      }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r, o, a, l, h, d, c, p, u, _;
        if (!(null === this._data || this._data.points.length < 2)) {
          if (
            ((e.lineCap = 'butt'),
            (e.strokeStyle = this._data.color),
            (e.lineWidth = this._data.linewidth),
            (e.lineStyle = this._data.linestyle),
            (t = this._data.points[0]),
            (i = this._data.points[1]),
            (n = i.subtract(t)),
            Math.abs(n.x) < 1 || Math.abs(n.y) < 1
              ? (e.beginPath(),
                e.moveTo(t.x, t.y),
                e.lineTo(i.x, i.y),
                e.stroke())
              : (e.save(),
                e.beginPath(),
                e.translate(t.x, t.y),
                e.scale(1, n.y / n.x),
                e.moveTo(0, 0),
                e.arcTo(n.x, 0, n.x, n.x, Math.abs(n.x)),
                e.lineTo(n.x, n.x),
                e.restore(),
                e.stroke()),
            this.drawTargetLabel(e),
            this.drawStartLabel(e),
            (s = Math.max(8, 4 * this._data.linewidth)),
            (e.fillStyle = this._data.color),
            (r = n.y < 0 ? 1 : -1),
            Math.abs(n.x) < 1 || Math.abs(n.y) < 1)
          )
            o = Math.atan(n.x / n.y);
          else {
            if (
              ((a = Math.abs(n.x)),
              (l = Math.abs(n.y)),
              (h = 0),
              (d = Math.PI / 2),
              (c = (h + d) / 2),
              n.length() > s)
            )
              for (;;) {
                if (
                  ((p = a * Math.sin(c)),
                  (u = l * (1 - Math.cos(c))),
                  (_ = Math.sqrt((p - a) * (p - a) + (u - l) * (u - l))),
                  Math.abs(_ - s) < 1)
                )
                  break;
                _ > s ? (h = c) : (d = c), (c = (h + d) / 2);
              }
            (o = Math.atan((a - p) / (l - u))), n.x * n.y < 0 && (o = -o);
          }
          e.save(),
            e.beginPath(),
            e.translate(i.x, i.y),
            e.rotate(-o),
            e.moveTo(0, 0),
            e.lineTo(-s / 2, r * s),
            e.lineTo(s / 2, r * s),
            e.lineTo(0, 0),
            e.restore(),
            e.fill();
        }
      }),
      (n.prototype.targetLabelHitTest = function(e) {
        var t,
          i,
          n,
          s,
          r,
          o,
          a,
          l,
          h,
          d = this._data.points[1],
          p = 1.5 * this._targetFontSize1 + 1.5 * this._targetFontSize2,
          u = this._targetFontSize1 * this._data.targetLine1.length,
          _ = this._targetFontSize1 * this._data.targetLine2.length,
          f = this._targetFontSize2 * this._data.targetLine3.length,
          g = this._targetFontSize2 * this._data.targetLine4.length;
        return (
          this._data.status && (p += 1.5 * this._targetFontSize1),
          (t = Math.max(u + _, f + g) - 20),
          (i = 20),
          (n = 5),
          (s = 'up' === this._data.direction ? -1 : 1),
          (r = d.x - i),
          (o = d.y + n * s),
          (a = d.y + (n + p) * s),
          (l = Math.min(o, a)),
          (h = Math.max(o, a)),
          e.x >= r && e.x <= r + t && e.y >= l && e.y <= h
            ? new c(c.MOVEPOINT)
            : null
        );
      }),
      (n.prototype.sourceLabelHitTest = function(e) {
        var t = 1.5 * this._sourceFontSize1 + 1.5 * this._sourceFontSize2,
          i = this._sourceFontSize1 * this._data.sourceLine1.length,
          n = this._sourceFontSize2 * this._data.sourceLine2.length,
          s = Math.max(i, n),
          r = this._data.points[0],
          o = 20,
          a = 5,
          l = 'up' === this._data.direction ? 1 : -1,
          h = r.x - o,
          d = r.y + a * l,
          p = r.y + (a + t) * l,
          u = Math.min(d, p),
          _ = Math.max(d, p);
        return e.x >= h && e.x <= h + s && e.y >= u && e.y <= _
          ? new c(c.MOVEPOINT)
          : null;
      }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s, r, o, a, l;
        return null === this._data || this._data.points.length < 2
          ? null
          : ((t = this._data.points[0]),
            (i = this._data.points[1]),
            (n = i.subtract(t)),
            (n = i.subtract(t)),
            (s = e.subtract(t)),
            (r = Math.abs(n.x)),
            (o = Math.abs(n.y)),
            (a = _.sign(n.y) * (o - o * Math.sqrt(1 - (s.x * s.x) / (r * r)))),
            (l = 3),
            Math.abs(a - s.y) < l
              ? new c(c.MOVEPOINT)
              : this.targetLabelHitTest(e) || this.sourceLabelHitTest(e));
      }),
      inherit(s, h),
      (s.prototype.renderer = function() {
        var e, t, i;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = {}),
          (e.points = this._points),
          (e.color = this._source.properties().linecolor.value()),
          (e.linewidth = this._source.properties().linewidth.value()),
          (e.targetLine1 = this._targetLine1),
          (e.targetLine2 = this._targetLine2),
          (e.targetLine3 = this._targetLine3),
          (e.targetLine4 = this._targetLine4),
          (e.status = this._source.properties().status.value()),
          (e.transparency = this._source.properties().transparency.value()),
          (e.targetBackColor = this._source
            .properties()
            .targetBackColor.value()),
          (e.targetStrokeColor = this._source
            .properties()
            .targetStrokeColor.value()),
          (e.targetTextColor = this._source
            .properties()
            .targetTextColor.value()),
          (e.sourceBackColor = this._source
            .properties()
            .sourceBackColor.value()),
          (e.sourceStrokeColor = this._source
            .properties()
            .sourceStrokeColor.value()),
          (e.sourceTextColor = this._source
            .properties()
            .sourceTextColor.value()),
          (e.successBackground = this._source
            .properties()
            .successBackground.value()),
          (e.successTextColor = this._source
            .properties()
            .successTextColor.value()),
          (e.failureBackground = this._source
            .properties()
            .failureBackground.value()),
          (e.failureTextColor = this._source
            .properties()
            .failureTextColor.value()),
          (e.intermediateBackColor = this._source
            .properties()
            .intermediateBackColor.value()),
          (e.intermediateTextColor = this._source
            .properties()
            .intermediateTextColor.value()),
          (e.sourceLine1 = this._sourceLine1),
          (e.sourceLine2 = this._sourceLine2),
          (e.direction = this._direction),
          (e.clockWhite = this._clockWhite),
          (e.clockBlack = this._clockBlack),
          (e.successIcon = this._successIcon),
          (e.failureIcon = this._failureIcon),
          (e.finished = this._finished),
          (t = l(
            a(this._model._properties.paneProperties.background.value()),
            150
          )),
          (e.centersColor = 'black' === t ? 'white' : 'black'),
          this._renderer.setData(e),
          this.isAnchorsRequired()
            ? ((i = new p()), i.append(this._renderer), this.addAnchors(i), i)
            : this._renderer
        );
      }),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        var e, t, i, n, s, r, o, a, l, c, p, u;
        h.prototype._updateImpl.call(this),
          (this._targetLine1 = ''),
          (this._targetLine2 = ''),
          (this._targetLine3 = ''),
          (this._targetLine4 = ''),
          this._source.points().length < 2 ||
            (this._source.priceScale() &&
              ((e = this._source.ownerSource().formatter()),
              (t = this._source.points()[1]),
              (i = this._source.points()[0]),
              (this._targetLine3 = S(e.format(t.price))),
              (n = t.price - i.price),
              (s = (n / i.price) * 100),
              (this._targetLine1 = S(
                e.format(n) + ' (' + this._percentageFormatter.format(s) + ')'
              )),
              (r = this._model.timeScale().indexToUserTime(i.index)),
              (o = this._model.timeScale().indexToUserTime(t.index)),
              (a = i.time && t.time),
              a &&
                ((r = TradingView.isString(i.time)
                  ? new Date(Date.parse(i.time))
                  : i.time),
                (o = TradingView.isString(t.time)
                  ? new Date(Date.parse(t.time))
                  : t.time)),
              (l = this._model.mainSeries().isDWM()),
              (c = d.isSeconds(this._model.mainSeries().interval())),
              o &&
                r &&
                ((this._targetLine4 = new g().format(o)),
                l ||
                  (this._targetLine4 =
                    this._targetLine4 +
                    '  ' +
                    new v(c ? '%h:%m:%s' : '%h:%m').format(o)),
                (p = (o.valueOf() - r.valueOf()) / 1e3),
                (this._targetLine2 =
                  $.t('in', { context: 'dates' }) +
                  ' ' +
                  P(new w().format(p)))),
              (this._sourceLine1 = e.format(i.price)),
              (this._sourceLine2 = ''),
              (u = this._model.timeScale().indexToUserTime(i.index)),
              u &&
                ((this._sourceLine2 = new g().format(u)),
                l ||
                  (this._sourceLine2 =
                    this._sourceLine2 +
                    ' ' +
                    new v(c ? '%h:%m:%s' : '%h:%m').format(u))),
              (this._direction =
                this._source.direction() === m.Direction.Up ? 'up' : 'down'),
              (this._finished =
                this._model.lineBeingCreated() !== this._source &&
                this._model.lineBeingEdited() !== this._source &&
                this._model.sourceBeingMoved() !== this._source)));
      }),
      (t.PredictionPaneView = s);
  },
  792: function(e, t, i) {
    'use strict';
    function n(e, t) {
      (this._data = null),
        (this._measureCache = e),
        (this._chartModel = t),
        (this._points = null);
    }
    function s(e, t, i) {
      a.call(this, e, t),
        (this._image = c(
          'price_label',
          TradingView.wrapUrl('/static/images/price_label.png')
        )),
        (this._rendererCache = {}),
        (this._invalidated = !0),
        (this._renderer = new n(this._rendererCache, t));
    }
    var r = i(6).Point,
      o = i(60).pointInRectangle,
      a = i(824).LineSourcePaneView,
      l = i(190).SelectionRenderer,
      h = i(9).HitTestResult,
      d = i(69).CompositeRenderer,
      c = i(1036),
      p = i(29),
      u = i(81).calcTextHorizontalShift;
    (n.prototype.setData = function(e) {
      (this._data = e), (this._points = e.points);
    }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r, o, a, l, h, d;
        null !== this._data &&
          null !== this._points &&
          0 !== this._points.length &&
          ((e.font = [
            this._data.fontWeight,
            this._data.fontSize + 'px',
            this._data.fontFamily,
          ].join(' ')),
          (t = e.measureText(this._data.label)),
          (t.height = this._data.fontSize),
          (i = 3),
          (n = 15),
          (s = -9),
          (r = { left: 10, top: 5 }),
          (o = t.width + 2 * r.left),
          (a = t.height + 2 * r.top),
          (l = this._points[0].x - s),
          (h = this._points[0].y - (a + n)),
          (d = u(e, t.width)),
          this._measureCache &&
            $.extend(this._measureCache, {
              innerWidth: o,
              innerHeight: a,
              tailLeft: s,
              tailHeight: n,
            }),
          e.translate(0.5 + l, 0.5 + h),
          e.beginPath(),
          e.moveTo(12, a),
          e.lineTo(s, a + n),
          e.lineTo(s - 1, a + n - 1),
          e.lineTo(5, a),
          e.lineTo(i, a),
          e.arcTo(0, a, 0, 0, i),
          e.lineTo(0, i),
          e.arcTo(0, 0, o, 0, i),
          e.lineTo(o - i, 0),
          e.arcTo(o, 0, o, a, i),
          e.lineTo(o, a - i),
          e.arcTo(o, a, 0, a, i),
          e.lineTo(12, a),
          (e.fillStyle = p.generateColor(
            this._data.backgroundColor,
            this._data.transparency
          )),
          e.fill(),
          (e.strokeStyle = this._data.borderColor),
          (e.lineWidth = 2),
          e.stroke(),
          e.closePath(),
          (e.textBaseline = 'top'),
          (e.fillStyle = this._data.color),
          e.fillText(this._data.label, r.left + d, r.top - 1),
          e.translate(-0.5, -0.5),
          e.beginPath(),
          e.arc(s, a + n, 2.5, 0, 2 * Math.PI, !1),
          (e.fillStyle = p.generateColor(
            this._data.borderColor,
            this._data.transparency
          )),
          e.fill(),
          (e.strokeStyle = this._chartModel.backgroundColor()),
          (e.lineWidth = 1),
          e.stroke(),
          e.closePath());
      }),
      (n.prototype.hitTest = function(e) {
        var t, i;
        return null === this._data ||
          null === this._points ||
          0 === this._points.length
          ? null
          : ((t = this._points[0].x - this._measureCache.tailLeft),
            (i =
              this._points[0].y -
              (this._measureCache.innerHeight + this._measureCache.tailHeight)),
            o(
              e,
              new r(t, i),
              new r(
                t + this._measureCache.innerWidth,
                i + this._measureCache.innerHeight
              )
            )
              ? new h(h.MOVEPOINT)
              : null);
      }),
      inherit(s, a),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        var e, t, i;
        if (
          (a.prototype._updateImpl.call(this), this._source.points().length > 0)
        ) {
          if (
            ((e = this._source.points()[0].price),
            !(t = this._source.priceScale()) || t.isEmpty())
          )
            return;
          (i = this._source.ownerSource().firstValue()),
            (this._priceLabel = t.formatPrice(e, i));
        }
      }),
      (s.prototype.renderer = function() {
        var e, t;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = {}),
          (e.points = this._points),
          (e.borderColor = this._source.properties().borderColor.value()),
          (e.backgroundColor = this._source
            .properties()
            .backgroundColor.value()),
          (e.color = this._source.properties().color.value()),
          (e.fontWeight = this._source.properties().fontWeight.value()),
          (e.fontSize = this._source.properties().fontsize.value()),
          (e.fontFamily = this._source.properties().font.value()),
          (e.transparency = this._source.properties().transparency.value()),
          (e.label = this._priceLabel),
          (e.image = this._image),
          this._renderer.setData(e),
          this.isAnchorsRequired() && 1 === e.points.length
            ? ((t = new d()),
              t.append(this._renderer),
              t.append(new l({ points: e.points })),
              t)
            : this._renderer
        );
      }),
      (t.PriceLabelPaneView = s);
  },
  793: function(e, t, i) {
    'use strict';
    function n() {}
    function s(e) {
      (this._source = e), (this._data = null);
    }
    function r(e, t) {
      l.call(this, e, t),
        (this._rendererSource = new n()),
        (this._invalidated = !0),
        (this._renderer = new s(this._rendererSource));
    }
    var o = i(6).Point,
      a = i(60).pointInRectangle,
      l = i(824).LineSourcePaneView,
      h = i(186).TextRenderer,
      d = i(190).SelectionRenderer,
      c = i(9).HitTestResult,
      p = i(69).CompositeRenderer,
      u = i(29),
      _ = i(81).calcTextHorizontalShift;
    (n.prototype.update = function(e) {
      (this._data &&
        (!this._data ||
          (e.markerColor === this._data.markerColor &&
            e.width === this._data.width &&
            e.height === this._data.height))) ||
        this._createSource(e.width, e.height, e.markerColor),
        (this._data = e);
    }),
      (n.prototype._createSource = function(e, t, i) {
        var n, s;
        (this._sourceCanvas = document.createElement('canvas')),
          (this._sourceCanvas.width = e),
          (this._sourceCanvas.height = t),
          (this._translate = new o(-e / 2, 0.5 - t)),
          this._translate.x % 1 == 0 && (this._translate.x += 0.5),
          (n = this._sourceCanvas.getContext('2d')),
          (s = 0.6 * e),
          (n.fillStyle = i),
          n.beginPath(),
          n.moveTo(e / 2, t),
          n.quadraticCurveTo(e, e / 1.15, e, e / 2),
          n.arc(e / 2, e / 2, e / 2, 0, Math.PI, !0),
          n.quadraticCurveTo(0, e / 1.15, e / 2, t),
          n.fill(),
          (n.globalCompositeOperation = 'destination-out'),
          n.beginPath(),
          n.moveTo((e - s) / 2, e / 2),
          n.arc(e / 2, e / 2, s / 2, 0, 2 * Math.PI),
          n.fill();
      }),
      (n.prototype.drawOn = function(e) {
        var t = new o(
          Math.round(this._data.point.x),
          Math.round(this._data.point.y)
        ).add(this._translate);
        e.drawImage(this._sourceCanvas, t.x, t.y);
      }),
      (n.prototype.hasPoint = function(e) {
        var t = this._data.point.add(this._translate),
          i = new o(this._data.point.x - this._translate.x, this._data.point.y);
        return a(e, t, i);
      }),
      (s.prototype.setData = function(e) {
        this._data = e;
      }),
      (s.prototype.draw = function(e) {
        null !== this._data &&
          (this._source.drawOn(e),
          this._data.tooltipVisible && this.drawTooltipOn(e));
      }),
      (s.prototype.drawTooltipOn = function(e) {
        var t, i, n, s, r, o, a, l, d, c, p, f, g, v, w, y;
        for (
          e.save(),
            t = (this._data.text + '')
              .replace(/^\s+|\s+$/g, '')
              .replace(/[\r\n]+/g, '\n'),
            e.font =
              (this._data.bold ? 'bold ' : '') +
              (this._data.italic ? 'italic ' : '') +
              this._data.fontSize +
              'px ' +
              this._data.font,
            i = this._data.tooltipWidth - 2 * this._data.tooltipPadding,
            n = h.prototype.wordWrap(t, i, e.font),
            s = this._data.point,
            r = this._data.tooltipLineSpacing,
            o = this._data.tooltipWidth,
            a = n.length * this._data.fontSize + 2 * this._data.tooltipPadding,
            n.length > 1 && (a += (n.length - 1) * r),
            l = Math.round(s.x - o / 2),
            d = Math.round(s.y - this._data.height - a - 8),
            c = s.x < 20 || s.x + 20 > this._data.vpWidth,
            p = c ? null : 'top',
            f = c ? null : Math.round(s.x),
            d < 10 ? (d = s.y + 13) : (p = 'bottom'),
            l < 10
              ? (l += Math.abs(l - 10))
              : l + o + 10 > this._data.vpWidth &&
                (l -= l + o + 10 - this._data.vpWidth),
            e.fillStyle = u.generateColor(
              this._data.backgroundColor,
              this._data.backgroundTransparency
            ),
            e.strokeStyle = this._data.markerColor,
            e.lineWidth = 1,
            e.beginPath(),
            e.moveTo(l, d),
            c ||
              'top' !== p ||
              (e.lineTo(f - 7, d), e.lineTo(f, d - 7), e.lineTo(f + 7, d)),
            e.lineTo(l + o, d),
            e.lineTo(l + o, d + a),
            c ||
              'bottom' !== p ||
              (e.lineTo(f + 7, d + a),
              e.lineTo(f, d + a + 7),
              e.lineTo(f - 7, d + a)),
            e.lineTo(l, d + a),
            e.closePath(),
            e.fill(),
            e.stroke(),
            e.textBaseline = 'middle',
            e.fillStyle = this._data.textColor,
            g = _(e, i),
            v = l + this._data.tooltipPadding + g,
            w = d + this._data.tooltipPadding + this._data.fontSize / 2,
            y = 0;
          y < n.length;
          y++
        )
          e.fillText(n[y].replace(/^\s+/, ''), v, w),
            (w += this._data.fontSize + r);
        e.restore();
      }),
      (s.prototype.hitTest = function(e) {
        return null !== this._data && this._source.hasPoint(e)
          ? new c(c.MOVEPOINT)
          : null;
      }),
      inherit(r, l),
      (r.prototype.update = function() {
        this._invalidated = !0;
      }),
      (r.prototype.updateImpl = function() {
        l.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (r.prototype.isLabelVisible = function() {
        return this.isHoveredSource() || this.isSelectedSource();
      }),
      (r.prototype.renderer = function() {
        var e, t, i, n, s, r, o;
        return (
          this._invalidated && this.updateImpl(),
          (e = new p()),
          (t = this._source.properties()),
          (i = t.locked && t.locked.value()),
          (n = i ? this._source.fixedPoints() : this._points),
          n.length < 1
            ? e
            : ((s = this.isLabelVisible()),
              (r = s),
              (o = $.extend(t.state(), {
                point: n[0],
                width: 24,
                height: 32,
                tooltipVisible: r,
                vpWidth: this._model.m_timeScale.m_width,
                vpHeight: this._source.m_priceScale.m_height,
                tooltipWidth: this._source.getTooltipWidth(),
                tooltipPadding: this._source.getTooltipPadding(),
                tooltipLineSpacing: this._source.getTooltipLineSpacing(),
              })),
              this._rendererSource.update(o),
              this._renderer.setData(o),
              e.append(this._renderer),
              s && e.append(new d({ points: n })),
              e)
        );
      }),
      (t.NotePaneView = r);
  },
  794: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._model = t),
        (this._source = e),
        (this._poligonRenderer = new o());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(978).PolygonRenderer,
      a = i(190).SelectionRenderer,
      l = i(69).CompositeRenderer;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype._smoothArray = function(e, t) {
        var i,
          n,
          r,
          o,
          a,
          l = Array(e.length);
        for (i = 0; i < e.length; i++) {
          for (n = new s(0, 0), r = 0; r < t; r++)
            (o = Math.max(i - r, 0)),
              (a = Math.min(i + r, e.length - 1)),
              (n = n.add(e[o])),
              (n = n.add(e[a]));
          l[i] = n.scaled(0.5 / t);
        }
        return l.push(e[e.length - 1]), l;
      }),
      (n.prototype._updateInternal = function() {
        var e, t, i, n, s, o, a, l, h;
        if (
          (r.prototype._updateImpl.call(this),
          (e = Math.max(1, this._source.properties().smooth.value())),
          (t = this._points),
          0 !== t.length)
        ) {
          for (i = [t[0]], n = 1; n < t.length; n++) {
            for (
              s = t[n].subtract(t[n - 1]),
                o = s.length(),
                a = Math.min(5, Math.floor(o / e)),
                l = s.normalized().scaled(o / a),
                h = 0;
              h < a - 1;
              h++
            )
              i.push(t[n - 1].add(l.scaled(h)));
            i.push(t[n]);
          }
          this._points = this._smoothArray(i, e);
        }
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n;
        return (
          this._invalidated &&
            (this._updateInternal(), (this._invalidated = !1)),
          (e = {}),
          (t = this._source.properties()),
          (e.points = this._points),
          (e.color = t.linecolor.value()),
          (e.linewidth = t.linewidth.value()),
          (e.linestyle = t.linestyle.value()),
          (e.skipClosePath = !0),
          (e.leftend = this._source.properties().leftEnd.value()),
          (e.rightend = this._source.properties().rightEnd.value()),
          t.fillBackground.value() &&
            this._model.lineBeingCreated() !== this._source &&
            ((e.filled = !0),
            (e.fillBackground = !0),
            (e.backcolor = t.backgroundColor.value()),
            (e.transparency = t.transparency.value())),
          this._poligonRenderer.setData(e),
          this.isAnchorsRequired() && this._source.finished()
            ? ((i = new l()),
              i.append(this._poligonRenderer),
              e.points.length > 0 &&
                ((n = [e.points[0], e.points[e.points.length - 1]]),
                i.append(new a({ points: n }))),
              i)
            : this._poligonRenderer
        );
      }),
      (t.BrushPaneView = n);
  },
  795: function(e, t, i) {
    'use strict';
    function n() {
      this._data = null;
    }
    function s(e, t) {
      p.call(this, e, t), (this._invalidated = !0), (this._renderer = new n());
    }
    var r = i(6).Point,
      o = i(30).distanceToLine,
      a = i(321),
      l = a.rotationMatrix,
      h = a.scalingMatrix,
      d = a.translationMatrix,
      c = a.transformPoint,
      p = i(824).LineSourcePaneView,
      u = i(9).HitTestResult,
      _ = i(69).CompositeRenderer,
      f = i(29);
    (n.prototype.setData = function(e) {
      (this._data = e),
        (this._data.angleFrom = 0),
        (this._data.angleTo = Math.PI),
        (this._data.clockwise = !1);
    }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, a, p, u, _, g, v, w, y, m, x;
        if (!(null === this._data || this._data.points.length < 2)) {
          if (
            ((t = this._data.points[0]),
            (i = this._data.points[1]),
            this._data.points.length < 3)
          )
            return (
              (e.strokeStyle = this._data.color),
              (e.lineWidth = this._data.linewidth),
              e.beginPath(),
              e.moveTo(t.x, t.y),
              e.lineTo(i.x, i.y),
              void e.stroke()
            );
          if (((n = this._data.points[2]), (s = o(t, i, n).distance) < 1))
            return (
              (e.strokeStyle = this._data.color),
              (e.lineWidth = this._data.linewidth),
              e.beginPath(),
              e.moveTo(t.x, t.y),
              e.lineTo(i.x, i.y),
              void e.stroke()
            );
          (a = i.subtract(t)),
            (p = t.add(i).scaled(0.5)),
            (u = new r(-a.y, a.x)),
            (u = u.normalized()),
            (n = p.add(u.scaled(s))),
            (e.strokeStyle = this._data.color),
            (e.lineWidth = this._data.linewidth),
            (_ = a.length()),
            (g = a.x / _),
            (v = a.y / _),
            (w = Math.acos(g)),
            v < 0 && (w = -w),
            (y = this._data.points[2]),
            (m = d(-p.x, -p.y)),
            (y = c(m, y)),
            (m = l(-w)),
            (y = c(m, y)),
            (m = h(1, _ / (2 * s))),
            (y = c(m, y)),
            y.y < 0 ? (this._data.clockwise = !0) : (this._data.clockwise = !1),
            e.save(),
            e.beginPath(),
            e.translate(t.x, t.y),
            e.rotate(w),
            (x = 1 - Math.sqrt(3) / 2),
            e.scale(1, s / (_ * x)),
            this._data.clockwise
              ? e.arc(
                  0.5 * _,
                  (_ * Math.sqrt(3)) / 2,
                  _,
                  (-2 * Math.PI) / 3,
                  -Math.PI / 3,
                  !1
                )
              : e.arc(
                  0.5 * _,
                  (-_ * Math.sqrt(3)) / 2,
                  _,
                  Math.PI / 3,
                  (2 * Math.PI) / 3,
                  !1
                ),
            e.restore(),
            e.stroke(),
            this._data.fillBackground &&
              ((e.fillStyle = f.generateColor(
                this._data.backcolor,
                this._data.transparency
              )),
              e.fill());
        }
      }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s, a, p, _, f, g, v, w, y, m, x, b, R, S;
        return null === this._data || this._data.points.length < 3
          ? null
          : ((t = 5),
            (i = this._data.points[0]),
            (n = this._data.points[1]),
            (s = this._data.points[2]),
            (a = o(i, n, s).distance) < 1
              ? ((a = o(i, n, e).distance), a < t ? new u(u.MOVEPOINT) : null)
              : ((p = n.subtract(i)),
                (_ = p.length()),
                (f = i.add(n).scaled(0.5)),
                (g = s.subtract(f)),
                (g = g.normalized()),
                (s = f.add(g.scaled(a))),
                (v = p.x / _),
                (w = p.y / _),
                (y = Math.acos(v)),
                w < 0 && (y = -y),
                (m = d(-i.x, -i.y)),
                (e = c(m, e)),
                (m = l(-y)),
                (e = c(m, e)),
                (g = c(m, g)),
                (x = 1 - Math.sqrt(3) / 2),
                (m = h(1, (_ * x) / a)),
                (e = c(m, e)),
                (g = c(m, g)),
                e.y * g.y < 0
                  ? null
                  : ((b =
                      e.y < 0
                        ? new r(0.5 * _, (_ * Math.sqrt(3)) / 2)
                        : new r(0.5 * _, (-_ * Math.sqrt(3)) / 2)),
                    (R = e.subtract(b)),
                    (S = R.length()),
                    Math.abs(S - _) <= t ? new u(u.MOVEPOINT) : null)));
      }),
      inherit(s, p),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        p.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (s.prototype.renderer = function() {
        var e, t, i, n, s, a, p, u, f, g, v, w, y, m, x, b, R, S, P, T;
        return (
          this._invalidated && this.updateImpl(),
          0 === this._points.length
            ? null
            : ((e = {}),
              (e.points = this._points),
              (e.color = this._source.properties().color.value()),
              (e.linewidth = this._source.properties().linewidth.value()),
              (e.backcolor = this._source.properties().backgroundColor.value()),
              (e.fillBackground = this._source
                .properties()
                .fillBackground.value()),
              (e.transparency = this._source.properties().transparency.value()),
              this._renderer.setData(e),
              this.isAnchorsRequired()
                ? ((t = new _()),
                  t.append(this._renderer),
                  (i = []),
                  (n = e.points[0]),
                  (s = new r(n.x, n.y)),
                  (s.data = 0),
                  i.push(s),
                  1 === e.points.length
                    ? t
                    : ((a = e.points[1]),
                      (p = new r(a.x, a.y)),
                      (p.data = 1),
                      2 === e.points.length
                        ? (this.addAnchors(t), t)
                        : (i.push(p),
                          (u = e.points[2]),
                          (f = o(n, a, u).distance),
                          (g = a.subtract(n)),
                          (v = n.add(a).scaled(0.5)),
                          (w = new r(-g.y, g.x)),
                          (w = w.normalized()),
                          (u = v.add(w.scaled(f))),
                          (y = v.add(w.scaled(-f))),
                          (m = g.length()),
                          (x = g.x / m),
                          (b = g.y / m),
                          (R = Math.acos(x)),
                          b < 0 && (R = -R),
                          (S = e.points[2]),
                          (P = d(-v.x, -v.y)),
                          (S = c(P, S)),
                          (P = l(-R)),
                          (S = c(P, S)),
                          (P = h(1, m / (2 * f))),
                          (S = c(P, S)),
                          (T = S.y >= 0 ? new r(u.x, u.y) : new r(y.x, y.y)),
                          (T.data = 2),
                          i.push(T),
                          t.append(this.createLineAnchor({ points: i })),
                          t)))
                : this._renderer)
        );
      }),
      (t.ArcPaneView = s);
  },
  796: function(e, t, i) {
    'use strict';
    function n(e) {
      (this._data = null), (this._textSizeCache = e);
    }
    function s(e, t) {
      o.call(this, e, t),
        (this._textSizeCache = {}),
        (this._invalidated = !0),
        (this._renderer = new n(this._textSizeCache));
    }
    var r = i(6).Point,
      o = i(824).LineSourcePaneView,
      a = i(9).HitTestResult,
      l = i(69).CompositeRenderer,
      h = i(29),
      d = i(354).CalloutConsts,
      c = i(81).calcTextHorizontalShift;
    !(function() {
      function e() {
        var e = document.createElement('canvas');
        (e.width = 0), (e.height = 0), (t = e.getContext('2d')), (e = null);
      }
      var t;
      n.prototype.wordWrap = function(i, n) {
        var s, r, o, a, l, h, d, c, p;
        if (
          (t || e(),
          (n = +n),
          (i += ''),
          (s = i.split(/[^\S\r\n]*(?:\r\n|\r|\n|$)/)),
          s[s.length - 1] || s.pop(),
          !isFinite(n) || n <= 0)
        )
          return s;
        for (t.font = this.fontStyle(), r = [], o = 0; o < s.length; o++)
          if (((a = s[o]), (l = t.measureText(a).width) <= n)) r.push(a);
          else
            for (h = a.split(/([-\)\]\},.!?:;])|(\s+)/); h.length; ) {
              if (
                (d = ~~(((n / l) * (h.length + 2)) / 3)) <= 0 ||
                t.measureText(h.slice(0, 3 * d - 1).join('')).width <= n
              )
                for (
                  ;
                  t.measureText(h.slice(0, 3 * (d + 1) - 1).join('')).width <=
                  n;

                )
                  d++;
              else
                for (
                  ;
                  d > 0 &&
                  t.measureText(h.slice(0, 3 * --d - 1).join('')).width > n;

                );
              if (d > 0)
                r.push(h.slice(0, 3 * d - 1).join('')), h.splice(0, 3 * d);
              else {
                if (
                  ((c = h[0] + (h[1] || '')),
                  (p = 1 === p ? 1 : ~~((n / t.measureText(c)) * c.length)),
                  t.measureText(c.substr(0, p)).width <= n)
                )
                  for (; t.measureText(c.substr(0, p + 1)).width <= n; ) p++;
                else
                  for (; p > 1 && t.measureText(c.substr(0, --p)).width > n; );
                p < 1 && (p = 1),
                  r.push(c.substr(0, p)),
                  (h[0] = c.substr(p)),
                  (h[1] = '');
              }
              if ((l = t.measureText(h.join('')).width) <= n) {
                r.push(h.join(''));
                break;
              }
            }
        return r;
      };
    })(),
      (n.prototype.setData = function(e) {
        (this._data = e),
          (this._data.lines = this.wordWrap(e.text, e.wordWrapWidth));
      }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s, r;
        return null === this._data || this._data.points.length < 2
          ? null
          : ((t = this._data.points[0]),
            (i = this._data.points[1]),
            (n = 3),
            t.subtract(e).length() < n
              ? new a(a.CHANGEPOINT, 0)
              : ((s = i.x - this._textSizeCache.totalWidth / 2),
                (r = i.y - this._textSizeCache.totalHeight / 2),
                e.x >= s &&
                e.x <= s + this._textSizeCache.totalWidth &&
                e.y >= r &&
                e.y <= r + this._textSizeCache.totalHeight
                  ? new a(a.MOVEPOINT)
                  : null));
      }),
      (n.prototype.fontStyle = function() {
        return (
          (this._data.bold ? 'bold ' : '') +
          (this._data.italic ? 'italic ' : '') +
          this._data.fontSize +
          'px ' +
          this._data.font
        );
      }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r, o, a, l, p, u, _, f, g, v, w;
        if (!(null === this._data || this._data.points.length < 2)) {
          for (
            t = this._data.points[0].clone(),
              i = this._data.points[1].clone(),
              e.lineCap = 'butt',
              e.strokeStyle = this._data.bordercolor,
              e.lineWidth = this._data.linewidth,
              e.textBaseline = 'bottom',
              e.font = this.fontStyle(),
              n = this._data.fontSize * this._data.lines.length,
              s =
                this._data.wordWrapWidth ||
                this._data.lines.reduce(function(t, i) {
                  return Math.max(t, e.measureText(i).width);
                }, 0),
              this._textSizeCache.textHeight = n,
              this._textSizeCache.textHeight = s,
              r = d.RoundRadius,
              o = d.TextMargins,
              a = s + 2 * o + 2 * r,
              l = n + 2 * o + 2 * r,
              this._textSizeCache.totalWidth = a,
              this._textSizeCache.totalHeight = l,
              p = i.x - a / 2,
              u = i.y - l / 2,
              _ = 0,
              f = s + 2 * o > 2 * r,
              g = n + 2 * o > 2 * r,
              v = c(e, s),
              t.x > p + a ? (_ = 20) : t.x > p && (_ = 10),
              t.y > u + l ? (_ += 2) : t.y > u && (_ += 1),
              e.save(),
              e.translate(p, u),
              t.x -= p,
              t.y -= u,
              i.x -= p,
              i.y -= u,
              e.beginPath(),
              e.moveTo(r, 0),
              10 === _
                ? f
                  ? (e.lineTo(i.x - r, 0),
                    e.lineTo(t.x, t.y),
                    e.lineTo(i.x + r, 0),
                    e.lineTo(a - r, 0))
                  : (e.lineTo(t.x, t.y), e.lineTo(a - r, 0))
                : e.lineTo(a - r, 0),
              20 === _
                ? (e.lineTo(t.x, t.y), e.lineTo(a, r))
                : e.arcTo(a, 0, a, r, r),
              21 === _
                ? g
                  ? (e.lineTo(a, i.y - r),
                    e.lineTo(t.x, t.y),
                    e.lineTo(a, i.y + r),
                    e.lineTo(a, l - r))
                  : (e.lineTo(t.x, t.y), e.lineTo(a, l - r))
                : e.lineTo(a, l - r),
              22 === _
                ? (e.lineTo(t.x, t.y), e.lineTo(a - r, l))
                : e.arcTo(a, l, a - r, l, r),
              12 === _
                ? f
                  ? (e.lineTo(i.x + r, l),
                    e.lineTo(t.x, t.y),
                    e.lineTo(i.x - r, l),
                    e.lineTo(r, l))
                  : (e.lineTo(t.x, t.y), e.lineTo(r, l))
                : e.lineTo(r, l),
              2 === _
                ? (e.lineTo(t.x, t.y), e.lineTo(0, l - r))
                : e.arcTo(0, l, 0, l - r, r),
              1 === _
                ? g
                  ? (e.lineTo(0, i.y + r),
                    e.lineTo(t.x, t.y),
                    e.lineTo(0, i.y - r),
                    e.lineTo(0, r))
                  : (e.lineTo(t.x, t.y), e.lineTo(0, r))
                : e.lineTo(0, r),
              0 === _
                ? (e.lineTo(t.x, t.y), e.lineTo(r, 0))
                : e.arcTo(0, 0, r, 0, r),
              e.stroke(),
              e.fillStyle = h.generateColor(
                this._data.backcolor,
                this._data.transparency
              ),
              e.fill(),
              e.fillStyle = this._data.color,
              u = r + o + this._data.fontSize,
              p = r + o + v,
              w = 0;
            w < this._data.lines.length;
            w++
          )
            e.fillText(this._data.lines[w], p, u), (u += this._data.fontSize);
          e.restore();
        }
      }),
      inherit(s, o),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        o.prototype._updateImpl.call(this), this._source._calculatePoint2();
      }),
      (s.prototype.renderer = function() {
        var e, t, i, n, s, o, a;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          this._points[0]
            ? this._points.length < 2
              ? void 0
              : ((e = this._source.properties()),
                (t = {}),
                (t.points = []),
                t.points.push(this._points[0]),
                (i = this._points[1].clone()),
                (i.x =
                  this._points[0].x +
                  this._source._barOffset *
                    this._model.timeScale().barSpacing()),
                t.points.push(i),
                (t.color = e.color.value()),
                (t.linewidth = e.linewidth.value()),
                (t.backcolor = e.backgroundColor.value()),
                (t.transparency = e.transparency.value()),
                (t.text = e.text.value()),
                (t.font = e.font.value()),
                (t.fontSize = e.fontsize.value()),
                (t.bordercolor = e.bordercolor.value()),
                e.wordWrap &&
                  e.wordWrap.value() &&
                  (t.wordWrapWidth = e.wordWrapWidth.value()),
                (t.bold = e.bold && e.bold.value()),
                (t.italic = e.italic && e.italic.value()),
                this._renderer.setData(t),
                this.isAnchorsRequired()
                  ? ((n = new l()),
                    n.append(this._renderer),
                    (s = t.points[1]),
                    (o = [].concat(t.points)),
                    o.splice(o.length - 1, 1),
                    n.append(this.createLineAnchor({ points: o })),
                    t.wordWrapWidth &&
                      ((a = new r(
                        s.x +
                          (t.wordWrapWidth >> 1) +
                          d.RoundRadius +
                          d.TextMargins,
                        s.y
                      )),
                      (a.data = 1),
                      n.append(this.createLineAnchor({ points: [a] }))),
                    n)
                  : this._renderer)
            : new l()
        );
      }),
      (t.CalloutPaneView = s);
  },
  797: function(e, t, i) {
    'use strict';
    function n(e) {
      (this._measureCache = e), (this._data = null);
    }
    function s(e, t) {
      a.call(this, e, t),
        (this._rendererCache = {}),
        (this._invalidated = !0),
        (this._renderer = new n(this._rendererCache));
    }
    var r = i(6).Point,
      o = i(60).pointInRectangle,
      a = i(824).LineSourcePaneView,
      l = i(190).SelectionRenderer,
      h = i(9).HitTestResult,
      d = i(69).CompositeRenderer,
      c = i(29),
      p = i(81).calcTextHorizontalShift;
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r, o, a, l;
        null !== this._data &&
          0 !== this._data.points.length &&
          ((e.font = [
            this._data.fontWeight,
            this._data.fontSize + 'px',
            this._data.fontFamily,
          ].join(' ')),
          (t = e.measureText(this._data.label)),
          (t.height = this._data.fontSize),
          (i = 15),
          (n = { left: i, top: (2 * i - t.height) / 2 }),
          (s = t.width + 2 * n.left),
          (r = 2 * i),
          (o = p(e, t.width)),
          (a = this._data.points[0].x - (n.left + 20)),
          (l = this._data.points[0].y - (r + 9)),
          this._measureCache &&
            $.extend(this._measureCache, {
              innerWidth: s,
              innerHeight: r,
              padding: n,
            }),
          e.translate(0.5 + a, 0.5 + l),
          e.beginPath(),
          e.moveTo(i + 9, r),
          e.lineTo(i, r),
          e.arcTo(-1e3, 0, 1e3, 0, i),
          e.lineTo(s - i, 0),
          e.arcTo(1e3, r, -1e3, r, i),
          e.lineTo(i + 18, r),
          e.quadraticCurveTo(i + 18, r + 4, i + 20, r + 9),
          e.quadraticCurveTo(i + 12, r + 6, i + 9, r),
          (e.fillStyle = c.generateColor(
            this._data.backgroundColor,
            this._data.transparency
          )),
          e.fill(),
          (e.strokeStyle = this._data.borderColor),
          (e.lineWidth = 2),
          e.stroke(),
          e.closePath(),
          (e.textBaseline = 'top'),
          (e.fillStyle = this._data.color),
          e.fillText(this._data.label, n.left + o, n.top - 1));
      }),
      (n.prototype.hitTest = function(e) {
        var t, i;
        return null !== this._data &&
          0 !== this._data.points.length &&
          this._measureCache.padding
          ? ((t =
              this._data.points[0].x - (this._measureCache.padding.left + 20)),
            (i = this._data.points[0].y - (this._measureCache.innerHeight + 9)),
            o(
              e,
              new r(t, i),
              new r(
                t + this._measureCache.innerWidth,
                i + this._measureCache.innerHeight
              )
            )
              ? new h(h.MOVEPOINT)
              : null)
          : null;
      }),
      inherit(s, a),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        a.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (s.prototype.renderer = function() {
        var e, t;
        return (
          this._invalidated && this.updateImpl(),
          (e = {}),
          (e.points = this._points),
          (e.color = this._source.properties().color.value()),
          (e.borderColor = this._source.properties().borderColor.value()),
          (e.backgroundColor = this._source
            .properties()
            .backgroundColor.value()),
          (e.transparency = this._source.properties().transparency.value()),
          (e.fontWeight = this._source.properties().fontWeight.value()),
          (e.fontSize = this._source.properties().fontsize.value()),
          (e.fontFamily = this._source.properties().font.value()),
          (e.label = this._source.properties().text.value()),
          this._renderer.setData(e),
          this.isAnchorsRequired() && 1 === e.points.length
            ? ((t = new d()),
              t.append(this._renderer),
              t.append(new l({ points: e.points })),
              t)
            : this._renderer
        );
      }),
      (t.BalloonPaneView = s);
  },
  798: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t),
        (this._rendererCache = {}),
        (this._labelRenderer = new o({})),
        (this._lineRenderer = new h()),
        this._lineRenderer.setHitTest(new a(a.MOVEPOINT));
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(186).TextRenderer,
      a = i(9).HitTestResult,
      l = i(69).CompositeRenderer,
      h = i(109).HorizontalLineRenderer,
      d = i(867).PaneRendererClockIcon;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        r.prototype._updateImpl.call(this);
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, r, o, a, h, c, p, u;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new l()),
          (t = {}),
          (t.width = this._model.timeScale().width()),
          (t.height = this._source.priceScale().height()),
          (t.points = this._points),
          (t.color = this._source.properties().linecolor.value()),
          (t.linewidth = this._source.properties().linewidth.value()),
          (t.linestyle = this._source.properties().linestyle.value()),
          this._lineRenderer.setData(t),
          (i = this._source.properties()),
          e.append(this._lineRenderer),
          this._source.properties().showLabel.value() &&
            1 === this._points.length &&
            ((n = i.vertLabelsAlign.value()),
            (r = i.horzLabelsAlign.value()),
            (o = this._points[0]),
            (a = 0),
            (h = 0),
            'left' === r
              ? (o.x = 3)
              : 'right' === r
              ? ((o.x = this._model.timeScale().width()), (h = -5))
              : (o.x = this._model.timeScale().width() / 2),
            'middle' === n
              ? (a = -this._source.properties().fontsize.value() / 6)
              : 'bottom' === n && (a = -4),
            (c = {
              points: [o],
              text: i.text.value(),
              color: i.textcolor.value(),
              vertAlign: n,
              horzAlign: r,
              font: i.font.value(),
              offsetX: h,
              offsetY: a,
              bold: this._source.properties().bold.value(),
              italic: this._source.properties().italic.value(),
              fontsize: this._source.properties().fontsize.value(),
              forceTextAlign: !0,
            }),
            this._labelRenderer.setData(c),
            e.append(this._labelRenderer)),
          1 === this._points.length &&
            this.isAnchorsRequired() &&
            ((p = new s(
              this._model.timeScale().width() / 2,
              this._points[0].y
            )),
            (p.data = 0),
            e.append(this.createLineAnchor({ points: [p] }))),
          TradingView.printing ||
            !this._source.hasAlert.value() ||
            this._model.readOnly() ||
            1 !== this._points.length ||
            ((u = new s(
              this._model.timeScale().width() / 2,
              this._points[0].y
            )),
            this._source.getAlertIsActive(function(i) {
              e.append(
                new d({
                  point1: u,
                  color: i
                    ? t.color
                    : defaults(
                        'chartproperties.alertsProperties.drawingIcon.color'
                      ),
                })
              );
            })),
          e
        );
      }),
      (t.HorzLinePaneView = n);
  },
  799: function(e, t, i) {
    'use strict';
    function n() {
      this._data = null;
    }
    function s(e, t) {
      r.call(this, e, t),
        (this._invalidated = !0),
        (this._renderer = new n()),
        (this._labelRenderer = new o({}));
    }
    var r = i(824).LineSourcePaneView,
      o = i(186).TextRenderer,
      a = i(9).HitTestResult,
      l = i(69).CompositeRenderer,
      h = i(867).PaneRendererClockIcon;
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype.draw = function(e) {
        var t, i, n, s;
        if (null === this._data || 0 === this._data.points.length) return null;
        (t = e.canvas.width),
          (i = this._data.points[0].y),
          (n = Math.max(0, this._data.points[0].x)),
          (s = Math.max(t, this._data.points[0].x)),
          (e.lineCap = 'square'),
          (e.strokeStyle = this._data.color),
          (e.lineWidth = this._data.linewidth),
          (e.lineStyle = this._data.linestyle),
          CanvasEx.drawLine(e, n, i, s, i);
      }),
      (n.prototype.hitTest = function(e) {
        return null === this._data || 0 === this._data.points.length
          ? null
          : e.x < this._data.points[0].x
          ? null
          : Math.abs(e.y - this._data.points[0].y) <= 3
          ? new a(this._data.hitTestResult)
          : null;
      }),
      inherit(s, r),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        r.prototype._updateImpl.call(this);
      }),
      (s.prototype.renderer = function() {
        var e, t, i, n, s, r, o, d, c;
        return (
          this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
          (e = new l()),
          (t = {}),
          (t.points = this._points),
          (t.color = this._source.properties().linecolor.value()),
          (t.linewidth = this._source.properties().linewidth.value()),
          (t.linestyle = this._source.properties().linestyle.value()),
          (t.hitTestResult = a.MOVEPOINT),
          (i = this._source.properties()),
          this._renderer.setData(t),
          e.append(this._renderer),
          this._source.properties().showLabel.value() &&
            1 === this._points.length &&
            ((n = i.vertLabelsAlign.value()),
            (s = i.horzLabelsAlign.value()),
            (r = this._points[0].clone()),
            (o = 0),
            (d = 0),
            'right' === s
              ? ((r.x = this._model.timeScale().width()), (d = -5))
              : 'center' === s &&
                (r.x = (r.x + this._model.timeScale().width()) / 2),
            'middle' === n
              ? (o = -this._source.properties().fontsize.value() / 6)
              : 'bottom' === n && (o = -4),
            (c = {
              points: [r],
              text: i.text.value(),
              color: i.textcolor.value(),
              vertAlign: n,
              horzAlign: s,
              font: i.font.value(),
              offsetX: d,
              offsetY: o,
              bold: this._source.properties().bold.value(),
              italic: this._source.properties().italic.value(),
              fontsize: this._source.properties().fontsize.value(),
              forceTextAlign: !0,
            }),
            this._labelRenderer.setData(c),
            e.append(this._labelRenderer)),
          this.addAnchors(e),
          TradingView.printing ||
            !this._source.hasAlert.value() ||
            this._model.readOnly() ||
            1 !== this._points.length ||
            this._source.getAlertIsActive(function(i) {
              e.append(
                new h({
                  point1: t.points[0],
                  color: i
                    ? t.color
                    : defaults(
                        'chartproperties.alertsProperties.drawingIcon.color'
                      ),
                })
              );
            }),
          e
        );
      }),
      (t.HorzRayPaneView = s);
  },
  800: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t), (this._invalidated = !0), (this._renderer = new a());
    }
    var s = i(6).Point,
      r = i(824).LineSourcePaneView,
      o = i(69).CompositeRenderer,
      a = i(303).RectangleRenderer;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        r.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, r, a;
        return (
          this._invalidated && this.updateImpl(),
          0 === this._points.length
            ? null
            : ((e = {}),
              (e.points = this._points),
              (e.color = this._source.properties().color.value()),
              (e.linewidth = this._source.properties().linewidth.value()),
              (e.backcolor = this._source.properties().backgroundColor.value()),
              (e.fillBackground = this._source
                .properties()
                .fillBackground.value()),
              (e.transparency = this._source.properties().transparency.value()),
              this._renderer.setData(e),
              this.isAnchorsRequired()
                ? ((t = new o()),
                  t.append(this._renderer),
                  (i = this._points[0]),
                  (n = this._points[1]),
                  (r = new s(i.x, n.y)),
                  (r.data = 2),
                  (a = new s(n.x, i.y)),
                  (a.data = 3),
                  t.append(this.createLineAnchor({ points: [i, n, r, a] })),
                  t)
                : this._renderer)
        );
      }),
      (t.RectanglePaneView = n);
  },
  801: function(e, t, i) {
    'use strict';
    function n() {
      this._data = null;
    }
    function s(e, t) {
      p.call(this, e, t), (this._invalidated = !0), (this._renderer = new n());
    }
    var r = i(6).Point,
      o = i(30).distanceToLine,
      a = i(321),
      l = a.rotationMatrix,
      h = a.scalingMatrix,
      d = a.translationMatrix,
      c = a.transformPoint,
      p = i(824).LineSourcePaneView,
      u = i(9).HitTestResult,
      _ = i(69).CompositeRenderer,
      f = i(29);
    (n.prototype.setData = function(e) {
      (this._data = e),
        (this._data.angleFrom = 0),
        (this._data.angleTo = 2 * Math.PI),
        (this._data.clockwise = !1);
    }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, a, p, u, _, g, v, w, y, m;
        if (!(null === this._data || this._data.points.length < 2)) {
          if (
            ((t = this._data.points[0]),
            (i = this._data.points[1]),
            this._data.points.length < 3)
          )
            return (
              (e.strokeStyle = this._data.color),
              (e.lineWidth = this._data.linewidth),
              e.beginPath(),
              e.moveTo(t.x, t.y),
              e.lineTo(i.x, i.y),
              void e.stroke()
            );
          if (((n = this._data.points[2]), (s = o(t, i, n).distance) < 1))
            return (
              (e.strokeStyle = this._data.color),
              (e.lineWidth = this._data.linewidth),
              e.beginPath(),
              e.moveTo(t.x, t.y),
              e.lineTo(i.x, i.y),
              void e.stroke()
            );
          (a = i.subtract(t)),
            (p = t.add(i).scaled(0.5)),
            (u = new r(-a.y, a.x)),
            (u = u.normalized()),
            (n = p.add(u.scaled(s))),
            (e.strokeStyle = this._data.color),
            (e.lineWidth = this._data.linewidth),
            (_ = a.length()),
            (g = a.x / _),
            (v = a.y / _),
            (w = Math.acos(g)),
            v < 0 && (w = -w),
            (y = this._data.points[2]),
            (m = d(-p.x, -p.y)),
            (y = c(m, y)),
            (m = l(-w)),
            (y = c(m, y)),
            (m = h(1, _ / (2 * s))),
            (y = c(m, y)),
            y.y < 0 ? (this._data.clockwise = !0) : (this._data.clockwise = !1),
            e.save(),
            e.beginPath(),
            e.translate(p.x, p.y),
            e.rotate(w),
            e.scale(1, (2 * s) / _),
            e.arc(
              0,
              0,
              0.5 * _,
              this._data.angleFrom,
              this._data.angleTo,
              this._data.clockwise
            ),
            e.restore(),
            e.stroke(),
            this._data.fillBackground &&
              ((e.fillStyle = f.generateColor(
                this._data.backcolor,
                this._data.transparency
              )),
              e.fill());
        }
      }),
      (n.prototype._additionalPointTest = function(e, t) {
        return !0;
      }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s, a, p, _, f, g, v, w, y, m, x, b;
        return null === this._data || this._data.points.length < 3
          ? null
          : ((t = this._data.points[0]),
            (i = this._data.points[1]),
            (n = this._data.points[2]),
            (s = o(t, i, n).distance),
            (a = i.subtract(t)),
            (p = t.add(i).scaled(0.5)),
            (_ = new r(-a.y, a.x)),
            (_ = _.normalized()),
            (n = p.add(_.scaled(s))),
            (f = a.length()),
            (g = a.x / f),
            (v = a.y / f),
            (w = Math.acos(g)),
            v < 0 && (w = -w),
            (y = d(-p.x, -p.y)),
            (e = c(y, e)),
            (m = c(y, this._data.points[2])),
            (y = l(-w)),
            (e = c(y, e)),
            (m = c(y, m)),
            (y = h(1, f / (2 * s))),
            (e = c(y, e)),
            (m = c(y, m)),
            (x = e.length()),
            (b = 3),
            this._additionalPointTest(e, m)
              ? Math.abs(x - 0.5 * f) <= b
                ? new u(u.MOVEPOINT)
                : this._data.fillBackground &&
                  !this._data.noHitTestOnBackground &&
                  x <= 0.5 * f
                ? new u(u.MOVEPOINT_BACKGROUND)
                : null
              : null);
      }),
      inherit(s, p),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        p.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (s.prototype.renderer = function() {
        var e, t, i, n, s, a, l, h, d, c, p, u, f, g;
        return (
          this._invalidated && this.updateImpl(),
          this._points.length < 2
            ? t
            : ((e = {}),
              (e.points = this._points),
              (e.color = this._source.properties().color.value()),
              (e.linewidth = this._source.properties().linewidth.value()),
              (e.backcolor = this._source.properties().backgroundColor.value()),
              (e.fillBackground = this._source
                .properties()
                .fillBackground.value()),
              (e.transparency = this._source.properties().transparency.value()),
              this._renderer.setData(e),
              this.isAnchorsRequired()
                ? ((t = new _()),
                  t.append(this._renderer),
                  (i = e.points[0]),
                  (n = e.points[1]),
                  2 === this._points.length
                    ? (this.addAnchors(t), t)
                    : ((s = e.points[2]),
                      (a = o(i, n, s).distance),
                      (l = n.subtract(i)),
                      (h = i.add(n).scaled(0.5)),
                      (d = new r(-l.y, l.x)),
                      (d = d.normalized()),
                      (s = h.add(d.scaled(a))),
                      (c = h.add(d.scaled(-a))),
                      (p = new r(i.x, i.y)),
                      (p.data = 0),
                      (u = new r(n.x, n.y)),
                      (u.data = 1),
                      (f = new r(s.x, s.y)),
                      (f.data = 2),
                      (g = new r(c.x, c.y)),
                      (g.data = 3),
                      t.append(this.createLineAnchor({ points: [p, u, f, g] })),
                      t))
                : this._renderer)
        );
      }),
      (t.EllipsePaneView = s);
  },
  802: function(e, t, i) {
    'use strict';
    function n() {
      this._data = null;
    }
    function s(e, t) {
      o.call(this, e, t), (this._invalidated = !0);
    }
    var r = i(6).Point,
      o = i(824).LineSourcePaneView,
      a = i(9).HitTestResult,
      l = i(69).CompositeRenderer,
      h = i(29);
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype.draw = function(e) {
        null !== this._data &&
          ((e.strokeStyle = this._data.color),
          (e.lineWidth = this._data.linewidth),
          CanvasEx.setLineStyle(e, this._data.linestyle),
          e.save(),
          e.translate(this._data.point.x + 1, this._data.point.y),
          e.scale(this._data.width, this._data.height),
          e.beginPath(),
          e.arc(0.5, 0, 0.5, Math.PI, 0, !1),
          e.restore(),
          e.stroke(),
          this._data.fillBackground &&
            ((e.fillStyle = h.generateColor(
              this._data.backcolor,
              this._data.transparency
            )),
            e.fill()));
      }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s, o;
        return null === this._data || e.y > this._data.point.y
          ? null
          : e.x < this._data.point.x ||
            e.x > this._data.point.x + this._data.width
          ? null
          : ((t = new r(
              this._data.point.x + this._data.width / 2,
              this._data.point.y
            )),
            (i = e.subtract(t)),
            (n = this._data.height / this._data.width),
            (i.y /= n),
            (s = i.length()),
            (o = 3),
            Math.abs(s - this._data.width / 2) < o ? new a(a.MOVEPOINT) : null);
      }),
      inherit(s, o),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        o.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (s.prototype.renderer = function() {
        var e, t, i, s, o, a, h, d, c, p, u, _, f, g, v, w, y, m, x;
        if ((this._invalidated && this.updateImpl(), this._points.length < 2))
          return null;
        if (
          ((e = this._source.points()),
          (t = e[0]),
          (i = e[1]),
          (s = Math.min(t.index, i.index)),
          (o = Math.max(t.index, i.index)),
          (a = o - s),
          (h = this._points[0]),
          (d = this._points[1]),
          (c = Math.abs(h.x - d.x)),
          (p = new l()),
          (u = this._source.properties()),
          (_ = this._model.timeScale()),
          0 === a)
        )
          return null;
        for (f = Math.min(h.x, d.x), g = [], v = s; f > -c; v -= a)
          (f = _.indexToCoordinate(v)), g.push(f);
        for (f = Math.max(h.x, d.x), v = o; f < _.width(); v += a)
          (f = _.indexToCoordinate(v)), g.push(f);
        for (w = 0; w < g.length; w++)
          (y = new r(g[w], h.y)),
            (m = {
              point: y,
              width: c,
              height: c,
              color: u.linecolor.value(),
              linewidth: u.linewidth.value(),
              linestyle: u.linestyle.value(),
              fillBackground: u.fillBackground.value(),
              backcolor: u.backgroundColor.value(),
              transparency: u.transparency.value(),
            }),
            (x = new n()),
            x.setData(m),
            p.append(x);
        return this.addAnchors(p), p;
      }),
      (t.TimeCyclesPaneView = s);
  },
  803: function(e, t, i) {
    'use strict';
    function n(e) {
      this._data = e;
    }
    function s(e, t) {
      o.call(this, e, t), (this._invalidated = !0);
    }
    var r = i(6).Point,
      o = i(824).LineSourcePaneView,
      a = i(9).HitTestResult,
      l = i(69).CompositeRenderer;
    (n.prototype.draw = function(e) {
      var t, i, n;
      for (
        e.strokeStyle = this._data.color,
          e.lineWidth = this._data.linewidth,
          CanvasEx.setLineStyle(e, this._data.linestyle),
          e.beginPath(),
          e.moveTo(this._data.point.x, this._data.point.y),
          t = 1;
        t <= 2 * this._data.width;
        t++
      )
        (i = (t * Math.PI) / this._data.width),
          (n = (Math.sin(i - Math.PI / 2) * this._data.height) / 2),
          e.lineTo(
            this._data.point.x + t,
            this._data.point.y + n + this._data.height / 2
          );
      e.stroke();
    }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s;
        return e.x < this._data.point.x ||
          e.x > this._data.point.x + 2 * this._data.width
          ? null
          : ((t = e.x - this._data.point.x),
            (i = (t * Math.PI) / this._data.width),
            (n = (Math.sin(i - Math.PI / 2) * this._data.height) / 2),
            (n = this._data.point.y + n + this._data.height / 2),
            (s = 3),
            Math.abs(n - e.y) <= s ? new a(a.MOVEPOINT) : null);
      }),
      inherit(s, o),
      (s.prototype.update = function() {
        this._invalidated = !0;
      }),
      (s.prototype.updateImpl = function() {
        o.prototype._updateImpl.call(this), (this._invalidated = !1);
      }),
      (s.prototype.renderer = function() {
        var e, t, i, s, o, a, h, d, c, p, u, _, f, g, v, w, y, m, x, b;
        if ((this._invalidated && this.updateImpl(), this._points.length < 2))
          return null;
        if (
          ((e = this._source.points()),
          (t = e[0]),
          (i = e[1]),
          (s = Math.min(t.index, i.index)),
          (o = Math.max(t.index, i.index)),
          (a = 2 * (o - s)),
          (h = this._points[0]),
          (d = this._points[1]),
          (c = Math.abs(h.x - d.x)),
          (p = d.y - h.y),
          (u = new l()),
          (_ = this._source.properties()),
          (f = this._model.timeScale()),
          0 === a)
        )
          return null;
        for (g = f.indexToCoordinate(s), v = [], w = s; g > -c; w -= a)
          (g = f.indexToCoordinate(w)), v.push(g);
        for (
          g = g = f.indexToCoordinate(s + a), w = s + a;
          g < f.width();
          w += a
        )
          (g = f.indexToCoordinate(w)), v.push(g);
        for (y = 0; y < v.length; y++)
          (m = new r(v[y], h.y)),
            (x = {
              point: m,
              width: c,
              height: p,
              color: _.linecolor.value(),
              linewidth: _.linewidth.value(),
              linestyle: _.linestyle.value(),
            }),
            (b = new n(x)),
            u.append(b);
        return this.addAnchors(u), u;
      }),
      (t.SineLinePaneView = s);
  },
  804: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t), (this._invalidated = !0);
    }
    var s = i(50),
      r = i(824).LineSourcePaneView,
      o = i(185).TrendLineRenderer,
      a = i(9).HitTestResult,
      l = i(210).PaneRendererCandles,
      h = i(69).CompositeRenderer,
      d = i(103).LineEnd;
    inherit(n, r),
      (n.prototype.update = function() {
        r.prototype._updateImpl.call(this), (this._invalidated = !0);
      }),
      (n.prototype.udpateImpl = function() {
        var e = this;
        (this._segments = []),
          e._points.length < 2 ||
            (this._segments = this._source
              .segments()
              .map(function(t, i) {
                var n,
                  r,
                  o,
                  a,
                  l,
                  h,
                  d,
                  c,
                  p,
                  u,
                  _,
                  f = e._source.points();
                return i >= e._points.length - 1
                  ? null
                  : ((n = e._points[i].x),
                    (r = f[i].price),
                    (o = f[i + 1].price),
                    (a = f[i + 1].index - f[i].index),
                    (l = e._model.timeScale().barSpacing() * s.sign(a)),
                    (h = (o - r) / (t.bars().length - 1)),
                    (d = e._source.properties()),
                    (c = d.candleStyle.upColor.value()),
                    (p = d.candleStyle.downColor.value()),
                    (u = d.candleStyle.borderUpColor.value()),
                    (_ = d.candleStyle.borderDownColor.value()),
                    {
                      bars: t.bars().map(function(t, i) {
                        var s = t.c >= t.o;
                        return {
                          time: n + i * l,
                          open: e.priceToCoordinate(t.o + r + i * h),
                          high: e.priceToCoordinate(t.h + r + i * h),
                          low: e.priceToCoordinate(t.l + r + i * h),
                          close: e.priceToCoordinate(t.c + r + i * h),
                          color: s ? c : p,
                          borderColor: s ? u : _,
                          hollow: !1,
                        };
                      }),
                    });
              })
              .filter(function(e) {
                return !!e;
              }));
      }),
      (n.prototype.renderer = function() {
        var e, t, i, n, s, r, c, p, u, _, f, g, v;
        for (
          this._invalidated && (this.udpateImpl(), (this._invalidated = !1)),
            e = new h(),
            t = 1;
          t < this._points.length;
          t++
        )
          (i = this._points[t - 1]),
            (n = this._points[t]),
            (s = {
              points: [i, n],
              width: this._model.timeScale().width(),
              height: this._source.priceScale().height(),
              color: '#808080',
              linewidth: 1,
              linestyle: CanvasEx.LINESTYLE_SOLID,
              extendleft: !1,
              extendright: !1,
              leftend: d.Normal,
              rightend: d.Normal,
            }),
            (r = new o()),
            r.setData(s),
            r.setHitTest(new a(a.MOVEPOINT, null)),
            e.append(r);
        for (
          c = this._source.properties(),
            p = c.candleStyle.drawWick.value(),
            u = c.candleStyle.drawBorder.value(),
            _ = c.candleStyle.borderColor.value(),
            f = c.candleStyle.wickColor.value(),
            g = new h(),
            g.setGlobalAlpha(1 - c.transparency.value() / 100),
            t = 0;
          t < this._segments.length;
          t++
        )
          (v = {
            bars: this._segments[t].bars,
            barSpacing: this._model.timeScale().barSpacing(),
            drawWick: p,
            drawBorder: u,
            borderColor: _,
            wickColor: f,
            hittest: new a(a.MOVEPOINT, null),
          }),
            g.append(new l(v));
        return e.append(g), this.addAnchors(e), e;
      }),
      (t.GhostFeedPaneView = n);
  },
  805: function(e, t, i) {
    'use strict';
    function n() {
      this._data = null;
    }
    function s(e, t) {
      o.call(this, e, t), (this._invalidated = !0), (this._renderer = new n());
    }
    var r = i(30).distanceToSegment,
      o = i(824).LineSourcePaneView,
      a = i(185).TrendLineRenderer,
      l = i(9).HitTestResult,
      h = i(69).CompositeRenderer,
      d = i(29),
      c = i(103).LineEnd,
      p = i(1037);
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r, o, l, h, p;
        if (null !== this._data)
          if (
            ((t = this._data.points[0]),
            (i = this._data.points[1]),
            (e.lineCap = 'butt'),
            (e.strokeStyle = this._data.color),
            (e.lineWidth = this._data.linewidth),
            CanvasEx.setLineStyle(e, this._data.linestyle),
            2 === this._data.points.length)
          )
            e.beginPath(), e.moveTo(t.x, t.y), e.lineTo(i.x, i.y), e.stroke();
          else {
            if (
              ((n = this._data.points[2]),
              (s = i.subtract(t)),
              (r = n.subtract(s.scaled(0.25))),
              (o = n.add(s.scaled(0.25))),
              this._data.fillBack &&
                this._data.points.length > 2 &&
                ((e.fillStyle = d.generateColor(
                  this._data.backcolor,
                  this._data.transparency
                )),
                e.beginPath(),
                e.moveTo(t.x, t.y),
                e.quadraticCurveTo(r.x, r.y, n.x, n.y),
                e.quadraticCurveTo(o.x, o.y, i.x, i.y),
                e.fill()),
              e.beginPath(),
              e.moveTo(t.x, t.y),
              this._data.extendLeftPoints.length > 0)
            )
              for (
                l = this._data.extendLeftPoints[
                  this._data.extendLeftPoints.length - 1
                ],
                  e.moveTo(l.x, l.y),
                  h = this._data.extendLeftPoints.length - 2;
                h >= 0;
                h--
              )
                (p = this._data.extendLeftPoints[h]), e.lineTo(p.x, p.y);
            for (
              e.quadraticCurveTo(r.x, r.y, n.x, n.y),
                e.quadraticCurveTo(o.x, o.y, i.x, i.y),
                h = 0;
              h < this._data.extendRightPoints.length;
              h++
            )
              (p = this._data.extendRightPoints[h]), e.lineTo(p.x, p.y);
            e.stroke(),
              this._data.leftend === c.Arrow &&
                a.prototype.drawArrow(r, t, e, e.lineWidth),
              this._data.rightend === c.Arrow &&
                a.prototype.drawArrow(o, i, e, e.lineWidth);
          }
      }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s, o, a, h, d;
        if (null !== this._data && 3 === this._data.points.length) {
          if (
            ((t = this._data.points[0]),
            (i = this._data.points[1]),
            (n = this._data.points[2]),
            (s = i.subtract(t)),
            (o = n.subtract(s.scaled(0.25))),
            (a = n.add(s.scaled(0.25))),
            p.quadroBezierHitTest(n, t, o, e) ||
              p.quadroBezierHitTest(n, i, a, e))
          )
            return new l(l.MOVEPOINT);
          for (h = 3, d = 1; d < this._data.extendLeftPoints.length; d++)
            if (
              ((t = this._data.extendLeftPoints[d - 1]),
              (i = this._data.extendLeftPoints[d]),
              r(t, i, e).distance < h)
            )
              return new l(l.MOVEPOINT);
          for (d = 1; d < this._data.extendRightPoints.length; d++)
            if (
              ((t = this._data.extendRightPoints[d - 1]),
              (i = this._data.extendRightPoints[d]),
              r(t, i, e).distance < h)
            )
              return new l(l.MOVEPOINT);
        }
        return null;
      }),
      inherit(s, o),
      (s.prototype.update = function() {
        o.prototype._updateImpl.call(this), (this._invalidated = !0);
      }),
      (s.prototype.updateImpl = function() {
        var e, t, i, n, s, r, o, a;
        (this._extendLeftPoints = []),
          (this._extendRightPoints = []),
          this._source.points().length < 3 ||
            ((e = this._source.pointToScreenPoint(this._source.points()[0])[1]),
            (t = this._source.pointToScreenPoint(this._source.points()[1])[1]),
            (i = this._source.pointToScreenPoint(this._source.points()[2])[1]),
            (n = t.subtract(e)),
            (s = i.subtract(n.scaled(0.25))),
            (r = i.add(n.scaled(0.25))),
            (o = this._model.timeScale().width()),
            (a = this._source.priceScale().height()),
            this._source.properties().extendLeft.value() &&
              (this._extendLeftPoints = p.extendQuadroBezier(i, e, s, o, a)),
            this._source.properties().extendRight.value() &&
              (this._extendRightPoints = p.extendQuadroBezier(i, t, r, o, a)));
      }),
      (s.prototype.renderer = function() {
        var e, t, i, n;
        return this._points.length < 2
          ? new h()
          : (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
            (e = [].concat(this._points)),
            this._source._controlPoint &&
              e.push(
                this._source.pointToScreenPoint(this._source._controlPoint)[0]
              ),
            (t = {}),
            (i = this._source.properties()),
            (t.points = e),
            (t.color = i.linecolor.value()),
            (t.linewidth = i.linewidth.value()),
            (t.linestyle = i.linestyle.value()),
            (t.leftend = i.leftEnd.value()),
            (t.rightend = i.rightEnd.value()),
            (t.fillBack = i.fillBackground.value()),
            (t.backcolor = i.backgroundColor.value()),
            (t.transparency = i.transparency.value()),
            (t.extendLeftPoints = this._extendLeftPoints),
            (t.extendRightPoints = this._extendRightPoints),
            this._renderer.setData(t),
            (n = new h()),
            n.append(this._renderer),
            this.addAnchors(n),
            n);
      }),
      (t.BezierQuadroPaneView = s);
  },
  806: function(e, t, i) {
    'use strict';
    function n() {
      this._data = null;
    }
    function s(e, t) {
      o.call(this, e, t), (this._invalidated = !0), (this._renderer = new n());
    }
    var r = i(30).distanceToSegment,
      o = i(824).LineSourcePaneView,
      a = i(185).TrendLineRenderer,
      l = i(9).HitTestResult,
      h = i(69).CompositeRenderer,
      d = i(29),
      c = i(103).LineEnd,
      p = i(1037);
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r, o, l, h, p, u, _, f, g;
        if (null !== this._data)
          if (
            ((e.lineCap = 'butt'),
            (e.strokeStyle = this._data.color),
            (e.lineWidth = this._data.linewidth),
            CanvasEx.setLineStyle(e, this._data.linestyle),
            (t = this._data.points[0]),
            (i = this._data.points[1]),
            2 === this._data.points.length)
          )
            e.beginPath(),
              e.moveTo(t.x, t.y),
              e.lineTo(i.x, i.y),
              e.stroke(),
              this._data.leftend === c.Arrow &&
                a.prototype.drawArrow(i, t, e, e.lineWidth),
              this._data.rightend === c.Arrow &&
                a.prototype.drawArrow(t, i, e, e.lineWidth);
          else {
            if (
              ((n = this._data.points[2]),
              (s = this._data.points[3]),
              (r = s.subtract(t)),
              (o = n.subtract(r.scaled(0.25))),
              (l = n.add(r.scaled(0.25))),
              (h = i.subtract(n)),
              (p = s.subtract(h.scaled(0.25))),
              (u = s.add(h.scaled(0.25))),
              this._data.fillBack &&
                this._data.points.length > 2 &&
                ((e.fillStyle = d.generateColor(
                  this._data.backcolor,
                  this._data.transparency
                )),
                e.beginPath(),
                e.moveTo(t.x, t.y),
                e.quadraticCurveTo(o.x, o.y, n.x, n.y),
                e.bezierCurveTo(l.x, l.y, p.x, p.y, s.x, s.y),
                e.quadraticCurveTo(u.x, u.y, i.x, i.y),
                e.fill()),
              e.beginPath(),
              this._data.extendLeftPoints.length > 0)
            )
              for (
                _ = this._data.extendLeftPoints[
                  this._data.extendLeftPoints.length - 1
                ],
                  e.moveTo(_.x, _.y),
                  f = this._data.extendLeftPoints.length - 2;
                f >= 0;
                f--
              )
                (g = this._data.extendLeftPoints[f]), e.lineTo(g.x, g.y);
            for (
              e.moveTo(t.x, t.y),
                e.quadraticCurveTo(o.x, o.y, n.x, n.y),
                e.bezierCurveTo(l.x, l.y, p.x, p.y, s.x, s.y),
                e.quadraticCurveTo(u.x, u.y, i.x, i.y),
                f = 0;
              f < this._data.extendRightPoints.length;
              f++
            )
              (g = this._data.extendRightPoints[f]), e.lineTo(g.x, g.y);
            e.stroke(),
              this._data.leftend === c.Arrow &&
                a.prototype.drawArrow(o, t, e, e.lineWidth),
              this._data.rightend === c.Arrow &&
                a.prototype.drawArrow(u, i, e, e.lineWidth);
          }
      }),
      (n.prototype.hitTest = function(e) {
        var t, i, n, s, o, a, h, d, c, u, _, f;
        if (4 === this._data.points.length) {
          if (
            ((t = this._data.points[0]),
            (i = this._data.points[1]),
            (n = this._data.points[2]),
            (s = this._data.points[3]),
            (o = s.subtract(t)),
            (a = n.subtract(o.scaled(0.25))),
            (h = n.add(o.scaled(0.25))),
            (d = i.subtract(n)),
            (c = s.subtract(d.scaled(0.25))),
            (u = s.add(d.scaled(0.25))),
            p.quadroBezierHitTest(n, t, a, e) ||
              p.cubicBezierHitTest(n, s, h, c, e) ||
              p.quadroBezierHitTest(s, i, u, e))
          )
            return new l(l.MOVEPOINT);
          for (_ = 3, f = 1; f < this._data.extendLeftPoints.length; f++)
            if (
              ((t = this._data.extendLeftPoints[f - 1]),
              (i = this._data.extendLeftPoints[f]),
              r(t, i, e).distance < _)
            )
              return new l(l.MOVEPOINT);
          for (f = 1; f < this._data.extendRightPoints.length; f++)
            if (
              ((t = this._data.extendRightPoints[f - 1]),
              (i = this._data.extendRightPoints[f]),
              r(t, i, e).distance < _)
            )
              return new l(l.MOVEPOINT);
        }
        return null;
      }),
      inherit(s, o),
      (s.prototype.update = function() {
        o.prototype._updateImpl.call(this), (this._invalidated = !0);
      }),
      (s.prototype.updateImpl = function() {
        var e, t, i, n, s, r, o, a, l, h;
        (this._extendLeftPoints = []),
          (this._extendRightPoints = []),
          this._source.points().length < 4 ||
            ((e = this._source.pointToScreenPoint(this._source.points()[0])[1]),
            (t = this._source.pointToScreenPoint(this._source.points()[1])[1]),
            (i = this._source.pointToScreenPoint(this._source.points()[2])[1]),
            (n = this._source.pointToScreenPoint(this._source.points()[3])[1]),
            (s = n.subtract(e)),
            (r = i.subtract(s.scaled(0.25))),
            (o = t.subtract(i)),
            (a = n.add(o.scaled(0.25))),
            (l = this._model.timeScale().width()),
            (h = this._source.priceScale().height()),
            this._source.properties().extendLeft.value() &&
              (this._extendLeftPoints = p.extendQuadroBezier(i, e, r, l, h)),
            this._source.properties().extendRight.value() &&
              (this._extendRightPoints = p.extendQuadroBezier(n, t, a, l, h)));
      }),
      (s.prototype.renderer = function() {
        var e, t, i, n;
        return this._points.length < 2
          ? new h()
          : (this._invalidated && (this.updateImpl(), (this._invalidated = !1)),
            (e = [].concat(this._points)),
            this._source._controlPoints &&
              (e.push(
                this._source.pointToScreenPoint(
                  this._source._controlPoints[0]
                )[0]
              ),
              e.push(
                this._source.pointToScreenPoint(
                  this._source._controlPoints[1]
                )[0]
              )),
            (t = {}),
            (i = this._source.properties()),
            (t.points = e),
            (t.color = i.linecolor.value()),
            (t.linewidth = i.linewidth.value()),
            (t.linestyle = i.linestyle.value()),
            (t.leftend = i.leftEnd.value()),
            (t.rightend = i.rightEnd.value()),
            (t.fillBack = i.fillBackground.value()),
            (t.backcolor = i.backgroundColor.value()),
            (t.transparency = i.transparency.value()),
            (t.extendLeftPoints = this._extendLeftPoints),
            (t.extendRightPoints = this._extendRightPoints),
            this._renderer.setData(t),
            (n = new h()),
            n.append(this._renderer),
            this.addAnchors(n),
            n);
      }),
      (t.BezierCubicPaneView = s);
  },
  807: function(e, t, i) {
    'use strict';
    function n(e, t) {
      r.call(this, e, t), (this._invalidated = !0);
    }
    var s = i(824).LineSourcePaneView,
      r = i(697).Pattern5PaneView;
    inherit(n, r),
      (n.prototype.update = function() {
        this._invalidated = !0;
      }),
      (n.prototype.updateImpl = function() {
        var e, t, i, n, r;
        s.prototype._updateImpl.call(this),
          this._source.points().length >= 3 &&
            ((e = this._source.points()[0]),
            (t = this._source.points()[1]),
            (i = this._source.points()[2]),
            (this._ABRetracement =
              Math.round(
                1e3 * Math.abs((i.price - t.price) / (t.price - e.price))
              ) / 1e3)),
          this._source.points().length >= 4 &&
            ((n = this._source.points()[3]),
            (this._BCRetracement =
              Math.round(
                1e3 * Math.abs((n.price - e.price) / (t.price - e.price))
              ) / 1e3)),
          this._source.points().length >= 5 &&
            ((r = this._source.points()[4]),
            (this._CDRetracement =
              Math.round(
                1e3 * Math.abs((r.price - n.price) / (n.price - i.price))
              ) / 1e3),
            (this._XDRetracement =
              Math.round(
                1e3 * Math.abs((r.price - n.price) / (e.price - n.price))
              ) / 1e3));
      }),
      (t.CypherPaneView = n);
  },
  808: function(e, t, i) {
    'use strict';
    function n(e, t) {
      (this._data = null), (this._cache = e), (this._adapter = t);
    }
    function s(e, t) {
      r.call(this, e, t),
        (this._rendererCache = {}),
        (this._renderer = new n(this._rendererCache, e._adapter));
    }
    var r = i(824).LineSourcePaneView,
      o = i(131),
      a = i(9).HitTestResult,
      l = i(1038).splitThousands,
      h = i(38);
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype._height = function() {
        return Math.max(
          20,
          1 +
            Math.max(
              o.fontHeight(this._adapter.getBodyFont()),
              o.fontHeight(this._adapter.getQuantityFont())
            )
        );
      }),
      (n.prototype._bodyWidth = function(e) {
        var t, i;
        return 0 === this._adapter.getText().length
          ? 0
          : (e.save(),
            (e.font = this._adapter.getBodyFont()),
            (t = 10),
            (i = e.measureText(this._adapter.getText()).width),
            e.restore(),
            Math.round(t + i));
      }),
      (n.prototype._getQuantity = function() {
        return l(this._adapter.getQuantity(), ' ');
      }),
      (n.prototype._quantityWidth = function(e) {
        var t, i;
        return 0 === this._getQuantity().length
          ? 0
          : (e.save(),
            (e.font = this._adapter.getQuantityFont()),
            (t = 10),
            (i = e.measureText(this._getQuantity()).width),
            e.restore(),
            Math.round(Math.max(this._height(), t + i)));
      }),
      (n.prototype._reverseButtonWidth = function() {
        return this._adapter.isOnReverseCallbackPresent() ? this._height() : 0;
      }),
      (n.prototype._closeButtonWidth = function() {
        return this._adapter.isOnCloseCallbackPresent() ? this._height() : 0;
      }),
      (n.prototype._drawLines = function(e, t, i, n, s) {
        e.save(),
          (e.strokeStyle = this._adapter.getLineColor()),
          (e.lineStyle = this._adapter.getLineStyle()),
          (e.lineWidth = this._adapter.getLineWidth()),
          CanvasEx.drawLine(e, i, n, s, n),
          this._adapter.getExtendLeft() && CanvasEx.drawLine(e, 0, n, t, n),
          e.restore();
      }),
      (n.prototype._drawBody = function(e, t, i) {
        var n, s;
        (e.strokeStyle = this._adapter.getBodyBorderColor()),
          (e.fillStyle = this._adapter.getBodyBackgroundColor()),
          (n = this._bodyWidth(e)),
          (s = this._height()),
          e.fillRect(t + 0.5, i + 0.5, n - 1, s - 1),
          e.strokeRect(t, i, n, s);
      }),
      (n.prototype._drawBodyText = function(e, t, i) {
        var n, s;
        e.save(),
          (e.textAlign = 'center'),
          (e.textBaseline = 'middle'),
          (e.font = this._adapter.getBodyFont()),
          (e.fillStyle = this._adapter.getBodyTextColor()),
          (n = t + this._bodyWidth(e) / 2),
          (s = i + this._height() / 2),
          e.fillText(this._adapter.getText(), n, s),
          e.restore();
      }),
      (n.prototype._drawQuantity = function(e, t, i) {
        var n, s;
        (e.strokeStyle = this._adapter.getQuantityBorderColor()),
          (e.fillStyle = this._adapter.getQuantityBackgroundColor()),
          (n = this._quantityWidth(e)),
          (s = this._height()),
          e.fillRect(t + 0.5, i + 0.5, n - 1, s - 1),
          e.strokeRect(t, i, n, s);
      }),
      (n.prototype._drawQuantityText = function(e, t, i) {
        var n, s;
        e.save(),
          (e.textAlign = 'center'),
          (e.textBaseline = 'middle'),
          (e.font = this._adapter.getQuantityFont()),
          (e.fillStyle = this._adapter.getQuantityTextColor()),
          (n = t + this._quantityWidth(e) / 2),
          (s = i + this._height() / 2),
          e.fillText(h.startWithLTR(this._getQuantity() + ''), n, s),
          e.restore();
      }),
      (n.prototype._drawReverseButton = function(e, t, i) {
        var n, s, r, o, a, l, h;
        e.save(),
          (e.strokeStyle = this._adapter.getReverseButtonBorderColor()),
          (e.fillStyle = this._adapter.getReverseButtonBackgroundColor()),
          (n = this._reverseButtonWidth()),
          (s = this._height()),
          e.fillRect(t + 0.5, i + 0.5, n - 1, s - 1),
          e.strokeRect(t, i, n, s),
          (e.strokeStyle = this._adapter.getReverseButtonIconColor()),
          (r = function(e, t) {
            CanvasEx.drawLine(e, 0, 0, 0, t),
              CanvasEx.drawLine(e, -1, 1, 1, 1),
              CanvasEx.drawLine(e, -2, 2, 2, 2);
          }),
          (o = 6),
          (a = 10),
          (l = t + Math.round((this._reverseButtonWidth() - o) / 2)),
          (h = i + 5),
          e.save(),
          e.translate(l, h),
          r(e, a),
          e.translate(o, a),
          e.rotate(Math.PI),
          r(e, a),
          e.restore(),
          this._adapter._blocked &&
            ((e.fillStyle = 'rgba(140, 140, 140, 0.75)'),
            e.fillRect(t + 0.5, i + 0.5, n - 1, s - 1)),
          e.restore();
      }),
      (n.prototype._drawCloseButton = function(e, t, i) {
        var n, s, r, o, a, l, h;
        e.save(),
          (e.strokeStyle = this._adapter.getCloseButtonBorderColor()),
          (e.fillStyle = this._adapter.getCloseButtonBackgroundColor()),
          (n = this._closeButtonWidth()),
          (s = this._height()),
          e.fillRect(t + 0.5, i + 0.5, n - 1, s - 1),
          e.strokeRect(t, i, n, s),
          (r = t + n),
          (o = i + s),
          (e.strokeStyle = this._adapter.getCloseButtonIconColor()),
          (a = 8),
          (l = (this._closeButtonWidth() - a) / 2),
          (h = (this._height() - a) / 2),
          CanvasEx.drawPoly(
            e,
            [{ x: t + l, y: i + h }, { x: r - l, y: o - h }],
            !0
          ),
          CanvasEx.drawPoly(
            e,
            [{ x: r - l, y: i + h }, { x: t + l, y: o - h }],
            !0
          ),
          this._adapter._blocked &&
            ((e.fillStyle = 'rgba(140, 140, 140, 0.75)'),
            e.fillRect(t + 0.5, i + 0.5, n - 1, s - 1)),
          e.restore();
      }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r, o, a, l, h, d, c;
        null === this._data ||
          !this._data.points ||
          this._data.points.length < 1 ||
          ((t = this._data.width),
          (i = this._bodyWidth(e)),
          (n = this._quantityWidth(e)),
          (s = this._reverseButtonWidth(e)),
          (r = i + n + s + this._closeButtonWidth()),
          (o = t - r),
          (a = Math.max((this._adapter.getLineLength() / 100) * t, 1)),
          (l = Math.round(t - Math.min(o, a))),
          (h = l - r),
          (d = Math.round(this._data.points[0].y)),
          (c = Math.round(d - (this._height() + 1) / 2)),
          (this._cache.bodyRight = h + i),
          (this._cache.quantityRight = this._cache.bodyRight + n),
          (this._cache.reverseButtonRight = this._cache.quantityRight + s),
          (this._cache.top = c),
          (this._cache.bottom = c + this._height()),
          (this._cache.left = h),
          (this._cache.right = l),
          this._drawLines(e, h, l, d, t),
          0 !== i && (this._drawBody(e, h, c), this._drawBodyText(e, h, c)),
          0 !== n &&
            (this._drawQuantity(e, this._cache.bodyRight, c),
            this._drawQuantityText(e, this._cache.bodyRight, c)),
          0 !== s && this._drawReverseButton(e, this._cache.quantityRight, c),
          0 !== this._closeButtonWidth() &&
            this._drawCloseButton(e, this._cache.reverseButtonRight, c));
      }),
      (n.prototype.hitTest = function(e) {
        return null === this._data || 0 === this._data.points.length
          ? null
          : e.y < this._cache.top ||
            e.y > this._cache.bottom ||
            e.x < this._cache.left ||
            this._cache.right < e.x
          ? null
          : this._adapter._blocked
          ? new a(a.CUSTOM, {})
          : e.x >= this._cache.bodyRight &&
            e.x < this._cache.quantityRight &&
            this._adapter._onModifyCallback
          ? new a(a.CUSTOM, {
              mouseDownHandler: this._adapter.callOnModify.bind(this._adapter),
              tooltip: {
                text: $.t('Protect Position...'),
                rect: {
                  x: this._cache.bodyRight,
                  y: this._cache.top,
                  w: this._cache.quantityRight - this._cache.bodyRight,
                  h: this._cache.bottom - this._cache.top,
                },
              },
            })
          : e.x >= this._cache.quantityRight &&
            e.x < this._cache.reverseButtonRight
          ? new a(a.CUSTOM, {
              mouseDownHandler: this._adapter.callOnReverse.bind(this._adapter),
              tooltip: {
                text: $.t('Reverse Position'),
                rect: {
                  x: this._cache.quantityRight,
                  y: this._cache.top,
                  w: this._cache.reverseButtonRight - this._cache.quantityRight,
                  h: this._cache.bottom - this._cache.top,
                },
              },
            })
          : e.x >= this._cache.reverseButtonRight && e.x < this._cache.right
          ? new a(a.CUSTOM, {
              mouseDownHandler: this._adapter.callOnClose.bind(this._adapter),
              tooltip: {
                text: $.t('Close Position'),
                rect: {
                  x: this._cache.reverseButtonRight,
                  y: this._cache.top,
                  w: this._cache.right - this._cache.reverseButtonRight,
                  h: this._cache.bottom - this._cache.top,
                },
              },
            })
          : new a(a.REGULAR, { mouseDownHandler: function() {} });
      }),
      inherit(s, r),
      (s.prototype.renderer = function() {
        return (
          this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          this._renderer.setData({
            points: this._points,
            width: this._model.timeScale().width(),
          }),
          this._renderer
        );
      }),
      (t.PositionPaneView = s);
  },
  809: function(e, t, i) {
    'use strict';
    function n(e, t) {
      (this._data = null), (this._cache = e), (this._adapter = t);
    }
    function s(e, t) {
      o.call(this, e, t),
        (this._rendererCache = {}),
        (this._renderer = new n(this._rendererCache, e._adapter));
    }
    var r = i(131),
      o = i(824).LineSourcePaneView,
      a = i(9).HitTestResult,
      l = i(1038).splitThousands;
    (n.prototype.setData = function(e) {
      this._data = e;
    }),
      (n.prototype._height = function() {
        return Math.max(
          20,
          1 +
            Math.max(
              r.fontHeight(this._adapter.getBodyFont()),
              r.fontHeight(this._adapter.getQuantityFont())
            )
        );
      }),
      (n.prototype._bodyWidth = function(e) {
        var t, i, n;
        return 0 === this._adapter.getText().length
          ? 0
          : (e.save(),
            (e.font = this._adapter.getBodyFont()),
            (t = 10),
            (i = 10),
            (n = e.measureText(this._adapter.getText()).width),
            e.restore(),
            Math.round(t + i + n));
      }),
      (n.prototype._getQuantity = function() {
        return l(this._adapter.getQuantity(), ' ');
      }),
      (n.prototype._quantityWidth = function(e) {
        var t, i;
        return 0 === this._getQuantity().length
          ? 0
          : (e.save(),
            (e.font = this._adapter.getQuantityFont()),
            (t = 10),
            (i = e.measureText(this._getQuantity()).width),
            e.restore(),
            Math.round(Math.max(this._height(), t + i)));
      }),
      (n.prototype._cancelButtonWidth = function() {
        return this._adapter.isOnCancelCallbackPresent() ? this._height() : 0;
      }),
      (n.prototype._drawLines = function(e, t, i, n, s) {
        e.save(),
          (e.strokeStyle = this._adapter.getLineColor()),
          (e.lineStyle = this._adapter.getLineStyle()),
          (e.lineWidth = this._adapter.getLineWidth()),
          CanvasEx.drawLine(e, i, n, s, n),
          this._adapter.getExtendLeft() && CanvasEx.drawLine(e, 0, n, t, n),
          e.restore();
      }),
      (n.prototype._drawMovePoints = function(e, t, i) {
        var n, s, r, o, a, l, h, d;
        for (
          e.save(),
            e.strokeStyle = this._adapter.getBodyBorderColor(),
            e.fillStyle = this._adapter.getBodyBorderColor(),
            n = 2,
            s = 4,
            r = 5,
            o = t + s,
            a = o + n,
            l = Math.floor((this._height() - 2 * r) / 2) + 1,
            h = 0;
          h < l;
          ++h
        )
          (d = i + r + 2 * h), CanvasEx.drawLine(e, o, d, a, d);
        e.restore();
      }),
      (n.prototype._drawBody = function(e, t, i) {
        var n, s;
        (e.strokeStyle = this._adapter.getBodyBorderColor()),
          (e.fillStyle = this._adapter.getBodyBackgroundColor()),
          (n = this._bodyWidth(e)),
          (s = this._height()),
          e.fillRect(t + 0.5, i + 0.5, n - 1, s - 1),
          e.strokeRect(t, i, n, s);
      }),
      (n.prototype._drawBodyText = function(e, t, i) {
        var n, s, r;
        (e.textAlign = 'center'),
          (e.textBaseline = 'middle'),
          (e.font = this._adapter.getBodyFont()),
          (e.fillStyle = this._adapter.getBodyTextColor()),
          (n = 5),
          (s = t + this._bodyWidth(e) / 2),
          (r = i + this._height() / 2),
          e.fillText(this._adapter.getText(), n + s - 2, r);
      }),
      (n.prototype._drawQuantity = function(e, t, i, n) {
        var s, r;
        e.save(),
          (e.strokeStyle = this._adapter.getQuantityBorderColor()),
          (e.fillStyle = this._adapter.getQuantityBackgroundColor()),
          (s = this._quantityWidth(e)),
          (r = this._height()),
          e.fillRect(t + 0.5, i + 0.5, s - 1, r - 1),
          n &&
            e.clip &&
            (e.beginPath(), e.rect(t + 0.5, i - 0.5, s + 1, r + 1), e.clip()),
          e.strokeRect(t, i, s, r),
          e.restore();
      }),
      (n.prototype._drawQuantityText = function(e, t, i) {
        var n, s;
        e.save(),
          (e.textAlign = 'center'),
          (e.textBaseline = 'middle'),
          (e.font = this._adapter.getQuantityFont()),
          (e.fillStyle = this._adapter.getQuantityTextColor()),
          (n = t + this._quantityWidth(e) / 2),
          (s = i + this._height() / 2),
          e.fillText(this._getQuantity(), n, s),
          e.restore();
      }),
      (n.prototype._drawCancelButton = function(e, t, i, n) {
        var s, r, o, a, l, h, d;
        (e.strokeStyle = this._adapter.getCancelButtonBorderColor()),
          (e.fillStyle = this._adapter.getCancelButtonBackgroundColor()),
          (s = this._cancelButtonWidth()),
          (r = this._height()),
          e.fillRect(t + 0.5, i + 0.5, s - 1, r - 1),
          this._adapter._blocked &&
            ((e.fillStyle = 'rgba(140, 140, 140, 0.75)'),
            e.fillRect(t + 0.5, i + 0.5, s - 1, r - 1)),
          e.save(),
          n &&
            e.clip &&
            (e.beginPath(), e.rect(t + 0.5, i - 0.5, s + 1, r + 1), e.clip()),
          e.strokeRect(t, i, s, r),
          e.restore(),
          (o = t + s),
          (a = i + r),
          (e.strokeStyle = this._adapter.getCancelButtonIconColor()),
          (l = 8),
          (h = (this._cancelButtonWidth() - l) / 2),
          (d = (this._height() - l) / 2),
          CanvasEx.drawPoly(
            e,
            [{ x: t + h, y: i + d }, { x: o - h, y: a - d }],
            !0
          ),
          CanvasEx.drawPoly(
            e,
            [{ x: o - h, y: i + d }, { x: t + h, y: a - d }],
            !0
          );
      }),
      (n.prototype.draw = function(e) {
        var t, i, n, s, r, o, a, l, h, d, c;
        null === this._data ||
          !this._data.points ||
          this._data.points.length < 1 ||
          ((t = this._data.width),
          (i = this._bodyWidth(e)),
          (n = this._quantityWidth(e)),
          (s = i + n + this._cancelButtonWidth()),
          (r = t - s),
          (o = Math.max((this._adapter.getLineLength() / 100) * t, 1)),
          (a = Math.round(t - Math.min(r, o))),
          (l = a - s),
          (h = Math.round(this._data.points[0].y)),
          (d = Math.round(h - (this._height() + 1) / 2)),
          (this._cache.bodyRight = l + i),
          (this._cache.quantityRight = l + i + n),
          (this._cache.top = d),
          (this._cache.bottom = d + this._height()),
          (this._cache.left = l),
          (this._cache.right = a),
          this._drawLines(e, l, a, h, t),
          (c = !1),
          0 !== i &&
            (this._drawBody(e, l, d),
            this._drawMovePoints(e, l, d),
            this._drawBodyText(e, l, d),
            (c = !0)),
          0 !== n &&
            (this._drawQuantity(e, l + i, d, c),
            this._drawQuantityText(e, l + i, d),
            (c = !0)),
          0 !== this._cancelButtonWidth() &&
            this._drawCancelButton(e, l + i + n, d, c));
      }),
      (n.prototype.hitTest = function(e) {
        return null === this._data || 0 === this._data.points.length
          ? null
          : e.y < this._cache.top || e.y > this._cache.bottom
          ? null
          : this._adapter._blocked &&
            e.x >= this._cache.left &&
            e.x < this._cache.right
          ? new a(a.CUSTOM, {})
          : this._adapter._editable &&
            e.x >= this._cache.left &&
            e.x < this._cache.bodyRight
          ? 0 === this._adapter.getTooltip().length
            ? new a(a.MOVEPOINT)
            : new a(a.MOVEPOINT, {
                tooltip: {
                  text: this._adapter.getTooltip(),
                  rect: {
                    x: this._cache.left,
                    y: this._cache.top,
                    w: this._cache.bodyRight - this._cache.left,
                    h: this._cache.bottom - this._cache.top,
                  },
                },
              })
          : this._adapter.shouldShowModifyOrder() &&
            this._adapter._editable &&
            e.x >= this._cache.bodyRight &&
            e.x < this._cache.quantityRight
          ? new a(a.CUSTOM, {
              mouseDownHandler: this._adapter.callOnModify.bind(this._adapter),
              tooltip: {
                text: $.t('Modify Order...'),
                rect: {
                  x: this._cache.bodyRight,
                  y: this._cache.top,
                  w: this._cache.quantityRight - this._cache.bodyRight,
                  h: this._cache.bottom - this._cache.top,
                },
              },
            })
          : this._adapter._editable &&
            e.x >= this._cache.quantityRight &&
            e.x < this._cache.right
          ? new a(a.CUSTOM, {
              mouseDownHandler: this._adapter.callOnCancel.bind(this._adapter),
              tooltip: {
                text: $.t('Cancel Order'),
                rect: {
                  x: this._cache.quantityRight,
                  y: this._cache.top,
                  w: this._cache.right - this._cache.quantityRight,
                  h: this._cache.bottom - this._cache.top,
                },
              },
            })
          : null;
      }),
      inherit(s, o),
      (s.prototype.renderer = function() {
        return (
          this._invalidated && (this._updateImpl(), (this._invalidated = !1)),
          this._renderer.setData({
            points: this._points,
            width: this._model.timeScale().width(),
          }),
          this._renderer
        );
      }),
      (t.OrderPaneView = s);
  },
  824: function(e, t, i) {
    'use strict';
    var n, s, r, o, a, l;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'LineSourcePaneView', function() {
        return l;
      }),
      (n = i(1)),
      (s = i(6)),
      i.n(s),
      (r = i(71)),
      i.n(r),
      (o = i(9)),
      (a = i(190)),
      i.n(a),
      (l = (function() {
        function e(e, t) {
          (this._invalidated = !0),
            (this._middlePoint = null),
            (this._points = []),
            (this._floatPoints = []),
            (this._source = e),
            (this._model = t);
        }
        return (
          (e.prototype.priceToCoordinate = function(e) {
            var t,
              i,
              n = this._source.priceScale();
            return null === n
              ? null
              : ((t = this._source.ownerSource()),
                (i = null !== t ? t.firstValue() : null),
                null == i ? null : n.priceToCoordinate(e, i));
          }),
          (e.prototype.currentPoint = function() {
            var e = this._model.crossHairSource();
            return new s.Point(e.x, e.y);
          }),
          (e.prototype.anchorColor = function() {
            return this._source.isBeingEdited()
              ? '#D61AD3'
              : this._model.isDark()
              ? '#FFFFFF'
              : '#606060';
          }),
          (e.prototype.isHoveredSource = function() {
            return this._source === this._model.hoveredSource();
          }),
          (e.prototype.isSelectedSource = function() {
            return this._source === this._model.selectedSource();
          }),
          (e.prototype.isAnchorsRequired = function() {
            return (
              (this.isHoveredSource() || this.isSelectedSource()) &&
              !this._model.isSnapshot()
            );
          }),
          (e.prototype.update = function() {
            this._invalidated = !0;
          }),
          (e.prototype.addAnchors = function(e) {
            if (this.isAnchorsRequired()) {
              var t = this._points;
              this._model.lineBeingCreated() === this._source &&
                (t = t.slice(0, -1)),
                e.append(this.createLineAnchor({ points: t }));
            }
          }),
          (e.prototype.createLineAnchor = function(e) {
            var t = r.CheckMobile.any();
            return new a.LineAnchor(
              n.a({}, e, {
                color: this.anchorColor(),
                backgroundColor: this._model.backgroundColor(),
                currentPoint: this.currentPoint(),
                linePointBeingEdited: this._model.linePointBeingEdited(),
                hittestResult: o.HitTestResult.CHANGEPOINT,
                radius: (t ? 15 : 7) + (this.isSelectedSource() ? 1 : 0),
                strokeWidth: (t ? 3 : 1) + (this.isSelectedSource() ? 1 : 0),
              })
            );
          }),
          (e.prototype._updateImpl = function() {
            var e, t, i, n, s, r, o, a;
            if (
              ((this._points = []),
              (this._floatPoints = []),
              (e = this._source.priceScale()),
              (t = this._model.timeScale()),
              e && !e.isEmpty() && !t.isEmpty())
            ) {
              for (i = this._source.points(), n = 0; n < i.length; n++) {
                if (((s = i[n]), !(r = this._source.pointToScreenPoint(s))))
                  return;
                (o = r[0]),
                  (o.data = n),
                  (a = r[1]),
                  (a.data = n),
                  this._floatPoints.push(o),
                  this._points.push(a);
              }
              2 === this._points.length &&
                (this._middlePoint = this._source.calcMiddlePoint(
                  this._points[0],
                  this._points[1]
                ));
            }
          }),
          (e.prototype._getSource = function() {
            return this._source;
          }),
          (e.prototype._getPoints = function() {
            return this._points;
          }),
          (e.prototype._getModel = function() {
            return this._model;
          }),
          e
        );
      })());
  },
  867: function(e, t, i) {
    'use strict';
    function n(e) {
      var t, i, n, o, a, l, h, d, c, p;
      e.point2 || (e.point2 = e.point1),
        (t = e.point1.x),
        (i = e.point1.y),
        (n = e.point2.x),
        (o = e.point2.y),
        (a = 16),
        (l = a - 6),
        (h = a - 6),
        (d = t <= n ? t - l : t + l),
        (c = i <= o ? i + h : i - h),
        (d -= 1),
        (c -= 3),
        (p = {
          items: [new s(d, c)],
          char: [String.fromCharCode('0xF017').toUpperCase()],
          color: e.color,
          vertOffset: 0,
          height: a,
          fontFamily: 'FontAwesome',
        }),
        r.call(this, p);
    }
    var s = i(6).Point,
      r = i(339).PaneRendererUnicodeChar;
    inherit(n, r),
      (t.PaneRendererClockIcon = TradingView.PaneRendererClockIcon = n);
  },
  877: function(e, t, i) {
    'use strict';
    var n, s, r;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'VerticalLineRenderer', function() {
        return r;
      }),
      (n = i(9)),
      (s = i(46)),
      i.n(s),
      (r = (function() {
        function e() {
          (this._data = null), (this._hitTest = null);
        }
        return (
          (e.prototype.setData = function(e) {
            this._data = e;
          }),
          (e.prototype.setHitTest = function(e) {
            this._hitTest = e;
          }),
          (e.prototype.draw = function(e) {
            if (
              null !== this._data &&
              0 !== this._data.points.length &&
              !(this._data.linewidth <= 0)
            ) {
              var t = this._data.points[0].x;
              t < 0 ||
                t > this._data.width ||
                (e.translate(1, 0),
                (e.lineCap = 'square'),
                (e.strokeStyle = this._data.color),
                (e.lineWidth = this._data.linewidth),
                void 0 !== this._data.linestyle &&
                  Object(s.setLineStyle)(e, this._data.linestyle),
                Object(s.drawLine)(e, t, 0, t, this._data.height));
            }
          }),
          (e.prototype.hitTest = function(e) {
            if (null === this._data || 0 === this._data.points.length)
              return null;
            var t =
              this._hitTest || new n.HitTestResult(n.HitTestResult.MOVEPOINT);
            return Math.abs(e.x - this._data.points[0].x) <= 3 ? t : null;
          }),
          e
        );
      })());
  },
  977: function(e, t, i) {
    'use strict';
    function n(e, t, i, n) {
      var s = Object(r.equalPoints)(i, n[0])
        ? Object(r.equalPoints)(i, n[1])
          ? null
          : n[1]
        : n[0];
      return null !== e && null !== s
        ? Object(l.intersectPolygonAndHalfplane)(
            e,
            Object(r.halfplaneThroughPoint)(
              Object(r.lineThroughPoints)(t, i),
              s
            )
          )
        : null;
    }
    var s, r, o, a, l, h, d, c;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'ChannelRenderer', function() {
        return c;
      }),
      (s = i(7)),
      i.n(s),
      (r = i(6)),
      i.n(r),
      (o = i(60)),
      i.n(o),
      (a = i(30)),
      i.n(a),
      (l = i(129)),
      i.n(l),
      (h = i(9)),
      (d = i(29)),
      (c = (function() {
        function e() {
          this._data = null;
        }
        return (
          (e.prototype.setData = function(e) {
            this._data = e;
          }),
          (e.prototype.draw = function(e) {
            var t, i;
            if (null !== this._data && null !== (t = this._visiblePolygon())) {
              for (
                e.beginPath(), e.moveTo(t[0].x, t[0].y), i = 1;
                i < t.length;
                i++
              )
                e.lineTo(t[i].x, t[i].y);
              (e.fillStyle = Object(d.generateColor)(
                this._data.color,
                this._data.transparency,
                !0
              )),
                e.fill();
            }
          }),
          (e.prototype.hitTest = function(e) {
            if (null === this._data || !this._data.hittestOnBackground)
              return null;
            var t = this._visiblePolygon();
            return null !== t && Object(o.pointInPolygon)(e, t)
              ? new h.HitTestResult(h.HitTestResult.MOVEPOINT_BACKGROUND)
              : null;
          }),
          (e.prototype._visiblePolygon = function() {
            var e,
              t,
              i = Object(s.ensureNotNull)(this._data),
              o = i.p1,
              l = i.p2,
              h = i.p3,
              d = i.p4;
            return Object(r.equalPoints)(o, l) ||
              Object(r.equalPoints)(h, d) ||
              (Object(a.distanceToLine)(o, l, h).distance < 1e-6 &&
                Object(a.distanceToLine)(o, l, d).distance < 1e-6)
              ? null
              : i.width <= 0 || i.height <= 0
              ? null
              : ((e = [
                  new r.Point(0, 0),
                  new r.Point(i.width, 0),
                  new r.Point(i.width, i.height),
                  new r.Point(0, i.height),
                ]),
                (t = e),
                (t = n(t, o, l, [d, h])),
                (t = n(t, d, h, [o, l])),
                Object(r.equalPoints)(h, o) || (t = n(t, h, o, [l, d])),
                t);
          }),
          e
        );
      })());
  },
  978: function(e, t, i) {
    'use strict';
    var n, s, r, o, a, l, h, d, c;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'PolygonRenderer', function() {
        return c;
      }),
      (n = i(60)),
      i.n(n),
      (s = i(30)),
      i.n(s),
      (r = i(46)),
      i.n(r),
      (o = i(71)),
      i.n(o),
      (a = i(185)),
      i.n(a),
      (l = i(103)),
      (h = i(9)),
      (d = i(29)),
      (c = (function() {
        function e(e) {
          (this._data = null),
            (this._backHittest = new h.HitTestResult(
              h.HitTestResult.MOVEPOINT_BACKGROUND
            )),
            (this._points = []),
            (this._hittest =
              e || new h.HitTestResult(h.HitTestResult.MOVEPOINT));
        }
        return (
          (e.prototype.setData = function(e) {
            (this._data = e), (this._points = e.points);
          }),
          (e.prototype.draw = function(e) {
            var t, i, n, s;
            if (null !== this._data && 0 !== this._points.length) {
              for (
                e.beginPath(),
                  e.lineCap = 'butt',
                  e.strokeStyle = this._data.color,
                  e.lineWidth = this._data.linewidth,
                  Object(r.setLineStyle)(e, this._data.linestyle),
                  t = this._points[0],
                  e.moveTo(t.x, t.y),
                  i = 0,
                  n = this._points;
                i < n.length;
                i++
              )
                (s = n[i]), e.lineTo(s.x, s.y);
              this._data.filled &&
                this._data.fillBackground &&
                ((e.fillStyle = Object(d.generateColor)(
                  this._data.backcolor,
                  this._data.transparency
                )),
                e.fill()),
                this._data.filled && !this._data.skipClosePath && e.closePath(),
                this._data.linewidth > 0 && e.stroke(),
                this._points.length > 1 &&
                  (this._data.leftend === l.LineEnd.Arrow &&
                    a.TrendLineRenderer.prototype.drawArrow(
                      this._points[1],
                      this._points[0],
                      e,
                      e.lineWidth
                    ),
                  this._data.rightend === l.LineEnd.Arrow &&
                    a.TrendLineRenderer.prototype.drawArrow(
                      this._points[this._points.length - 2],
                      this._points[this._points.length - 1],
                      e,
                      e.lineWidth
                    ));
            }
          }),
          (e.prototype.hitTest = function(e) {
            var t, i, r, a, l;
            if (
              null === this._data ||
              (void 0 !== this._data.mouseTouchable &&
                !this._data.mouseTouchable)
            )
              return null;
            for (
              t = o.CheckMobile.any() ? 24 : 3, i = 1;
              i < this._points.length;
              i++
            )
              if (
                ((r = this._points[i - 1]),
                (a = this._points[i]),
                (l = Object(s.distanceToSegment)(r, a, e)),
                l.distance <= t)
              )
                return this._hittest;
            return this._data.filled &&
              this._data.fillBackground &&
              this._points.length > 0 &&
              ((r = this._points[0]),
              (a = this._points[this._points.length - 1]),
              (l = Object(s.distanceToSegment)(r, a, e)),
              l.distance <= t)
              ? this._hittest
              : this._data.filled &&
                this._data.fillBackground &&
                Object(n.pointInPolygon)(e, this._data.points)
              ? this._backHittest
              : null;
          }),
          e
        );
      })());
  },
  979: function(e, t, i) {
    'use strict';
    var n, s, r, o, a, l;
    Object.defineProperty(t, '__esModule', { value: !0 }),
      i.d(t, 'TriangleRenderer', function() {
        return l;
      }),
      (n = i(9)),
      (s = i(30)),
      i.n(s),
      (r = i(60)),
      i.n(r),
      (o = i(29)),
      (a = i(46)),
      i.n(a),
      (l = (function() {
        function e() {
          this._data = null;
        }
        return (
          (e.prototype.setData = function(e) {
            this._data = e;
          }),
          (e.prototype.draw = function(e) {
            var t, i, n, s;
            null === this._data ||
              this._data.points.length < 2 ||
              ((e.lineCap = 'butt'),
              (e.strokeStyle = this._data.color),
              (e.lineWidth = this._data.linewidth),
              void 0 !== this._data.linestyle &&
                Object(a.setLineStyle)(e, this._data.linestyle),
              (t = this._data.points),
              (i = t[0]),
              (n = t[1]),
              (s = 2 === this._data.points.length ? n : this._data.points[2]),
              e.beginPath(),
              e.moveTo(i.x, i.y),
              e.lineTo(n.x, n.y),
              e.lineTo(s.x, s.y),
              e.lineTo(i.x, i.y),
              this._data.fillBackground &&
                ((e.fillStyle = Object(o.generateColor)(
                  this._data.backcolor,
                  this._data.transparency
                )),
                e.fill()),
              e.stroke());
          }),
          (e.prototype.hitTest = function(e) {
            var t, i, o, a, l;
            return null === this._data || this._data.points.length < 2
              ? null
              : ((t = this._data.points),
                (i = t[0]),
                (o = t[1]),
                (a = Object(s.distanceToSegment)(i, o, e)),
                a.distance <= 3
                  ? new n.HitTestResult(n.HitTestResult.MOVEPOINT)
                  : this._data.points.length < 3
                  ? null
                  : ((l = this._data.points[2]),
                    (a = Object(s.distanceToSegment)(o, l, e)),
                    a.distance <= 3
                      ? new n.HitTestResult(n.HitTestResult.MOVEPOINT)
                      : ((a = Object(s.distanceToSegment)(l, i, e)),
                        a.distance <= 3
                          ? new n.HitTestResult(n.HitTestResult.MOVEPOINT)
                          : this._data.fillBackground &&
                            Object(r.pointInTriangle)(i, o, l, e)
                          ? new n.HitTestResult(
                              n.HitTestResult.MOVEPOINT_BACKGROUND
                            )
                          : null)));
          }),
          e
        );
      })());
  },
});
