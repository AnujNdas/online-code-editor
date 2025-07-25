import {
  __toESM,
  require_react
} from "./chunk-5WQJO2FO.js";

// node_modules/use-debounce/dist/index.module.js
var import_react = __toESM(require_react());
function c(e2, u2, c2, i2) {
  var a2 = this, o2 = (0, import_react.useRef)(null), f = (0, import_react.useRef)(0), l = (0, import_react.useRef)(0), v = (0, import_react.useRef)(null), m = (0, import_react.useRef)([]), d = (0, import_react.useRef)(), g = (0, import_react.useRef)(), p = (0, import_react.useRef)(e2), w = (0, import_react.useRef)(true);
  p.current = e2;
  var s = "undefined" != typeof window, x = !u2 && 0 !== u2 && s;
  if ("function" != typeof e2) throw new TypeError("Expected a function");
  u2 = +u2 || 0;
  var h = !!(c2 = c2 || {}).leading, y = !("trailing" in c2) || !!c2.trailing, F = "maxWait" in c2, A = "debounceOnServer" in c2 && !!c2.debounceOnServer, D = F ? Math.max(+c2.maxWait || 0, u2) : null;
  (0, import_react.useEffect)(function() {
    return w.current = true, function() {
      w.current = false;
    };
  }, []);
  var T = (0, import_react.useMemo)(function() {
    var r2 = function(r3) {
      var n3 = m.current, t3 = d.current;
      return m.current = d.current = null, f.current = r3, l.current = l.current || r3, g.current = p.current.apply(t3, n3);
    }, n2 = function(r3, n3) {
      x && cancelAnimationFrame(v.current), v.current = x ? requestAnimationFrame(r3) : setTimeout(r3, n3);
    }, t2 = function(r3) {
      if (!w.current) return false;
      var n3 = r3 - o2.current;
      return !o2.current || n3 >= u2 || n3 < 0 || F && r3 - f.current >= D;
    }, e3 = function(n3) {
      return v.current = null, y && m.current ? r2(n3) : (m.current = d.current = null, g.current);
    }, c3 = function r3() {
      var c4 = Date.now();
      if (h && l.current === f.current && T2(), t2(c4)) return e3(c4);
      if (w.current) {
        var i3 = u2 - (c4 - o2.current), a3 = F ? Math.min(i3, D - (c4 - f.current)) : i3;
        n2(r3, a3);
      }
    }, T2 = function() {
      i2 && i2({});
    }, W = function() {
      if (s || A) {
        var e4 = Date.now(), i3 = t2(e4);
        if (m.current = [].slice.call(arguments), d.current = a2, o2.current = e4, i3) {
          if (!v.current && w.current) return f.current = o2.current, n2(c3, u2), h ? r2(o2.current) : g.current;
          if (F) return n2(c3, u2), r2(o2.current);
        }
        return v.current || n2(c3, u2), g.current;
      }
    };
    return W.cancel = function() {
      v.current && (x ? cancelAnimationFrame(v.current) : clearTimeout(v.current)), f.current = 0, m.current = o2.current = d.current = v.current = null;
    }, W.isPending = function() {
      return !!v.current;
    }, W.flush = function() {
      return v.current ? e3(Date.now()) : g.current;
    }, W;
  }, [h, F, u2, D, y, x, s, A, i2]);
  return T;
}
function i(r2, n2) {
  return r2 === n2;
}
function a(n2, t2, a2) {
  var o2 = a2 && a2.equalityFn || i, f = (0, import_react.useRef)(n2), l = (0, import_react.useState)({})[1], v = c((0, import_react.useCallback)(function(r2) {
    f.current = r2, l({});
  }, [l]), t2, a2, l), m = (0, import_react.useRef)(n2);
  return o2(m.current, n2) || (v(n2), m.current = n2), [f.current, v];
}
function o(r2, n2, t2) {
  var e2 = void 0 === t2 ? {} : t2, u2 = e2.leading, i2 = e2.trailing;
  return c(r2, n2, { maxWait: n2, leading: void 0 === u2 || u2, trailing: void 0 === i2 || i2 });
}
export {
  a as useDebounce,
  c as useDebouncedCallback,
  o as useThrottledCallback
};
//# sourceMappingURL=use-debounce.js.map
