function cI(e, t) {
  const I = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let A = 0; A < n.length; A++)
    I[n[A]] = !0;
  return t ? (A) => !!I[A.toLowerCase()] : (A) => !!I[A];
}
function fI(e) {
  if (p(e)) {
    const t = {};
    for (let I = 0; I < e.length; I++) {
      const n = e[I], A = U(n) ? SA(n) : fI(n);
      if (A)
        for (const R in A)
          t[R] = A[R];
    }
    return t;
  } else {
    if (U(e))
      return e;
    if (C(e))
      return e;
  }
}
const uA = /;(?![^(]*\))/g, MA = /:([^]+)/, TA = /\/\*.*?\*\//gs;
function SA(e) {
  const t = {};
  return e.replace(TA, "").split(uA).forEach((I) => {
    if (I) {
      const n = I.split(MA);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function uI(e) {
  let t = "";
  if (U(e))
    t = e;
  else if (p(e))
    for (let I = 0; I < e.length; I++) {
      const n = uI(e[I]);
      n && (t += n + " ");
    }
  else if (C(e))
    for (const I in e)
      e[I] && (t += I + " ");
  return t.trim();
}
const aA = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", LA = /* @__PURE__ */ cI(aA);
function Tn(e) {
  return !!e || e === "";
}
const Jt = (e) => U(e) ? e : e == null ? "" : p(e) || C(e) && (e.toString === dn || !O(e.toString)) ? JSON.stringify(e, Sn, 2) : String(e), Sn = (e, t) => t && t.__v_isRef ? Sn(e, t.value) : qe(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((I, [n, A]) => (I[`${n} =>`] = A, I), {})
} : an(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : C(t) && !p(t) && !Vn(t) ? String(t) : t, w = {}, ze = [], Ee = () => {
}, dA = () => !1, VA = /^on[^a-z]/, mt = (e) => VA.test(e), MI = (e) => e.startsWith("onUpdate:"), Y = Object.assign, TI = (e, t) => {
  const I = e.indexOf(t);
  I > -1 && e.splice(I, 1);
}, hA = Object.prototype.hasOwnProperty, _ = (e, t) => hA.call(e, t), p = Array.isArray, qe = (e) => bt(e) === "[object Map]", an = (e) => bt(e) === "[object Set]", O = (e) => typeof e == "function", U = (e) => typeof e == "string", SI = (e) => typeof e == "symbol", C = (e) => e !== null && typeof e == "object", Ln = (e) => C(e) && O(e.then) && O(e.catch), dn = Object.prototype.toString, bt = (e) => dn.call(e), KA = (e) => bt(e).slice(8, -1), Vn = (e) => bt(e) === "[object Object]", aI = (e) => U(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ht = /* @__PURE__ */ cI(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Wt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (I) => t[I] || (t[I] = e(I));
}, pA = /-(\w)/g, Te = Wt((e) => e.replace(pA, (t, I) => I ? I.toUpperCase() : "")), GA = /\B([A-Z])/g, Re = Wt((e) => e.replace(GA, "-$1").toLowerCase()), hn = Wt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Yt = Wt((e) => e ? `on${hn(e)}` : ""), rt = (e, t) => !Object.is(e, t), kt = (e, t) => {
  for (let I = 0; I < e.length; I++)
    e[I](t);
}, Ft = (e, t, I) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: I
  });
}, OA = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, BI = (e) => {
  const t = U(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let $I;
const FA = () => $I || ($I = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let Ae;
class HA {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Ae, !t && Ae && (this.index = (Ae.scopes || (Ae.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const I = Ae;
      try {
        return Ae = this, t();
      } finally {
        Ae = I;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Ae = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Ae = this.parent;
  }
  stop(t) {
    if (this._active) {
      let I, n;
      for (I = 0, n = this.effects.length; I < n; I++)
        this.effects[I].stop();
      for (I = 0, n = this.cleanups.length; I < n; I++)
        this.cleanups[I]();
      if (this.scopes)
        for (I = 0, n = this.scopes.length; I < n; I++)
          this.scopes[I].stop(!0);
      if (!this.detached && this.parent && !t) {
        const A = this.parent.scopes.pop();
        A && A !== this && (this.parent.scopes[this.index] = A, A.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function gA(e, t = Ae) {
  t && t.active && t.effects.push(e);
}
function _A() {
  return Ae;
}
const LI = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Kn = (e) => (e.w & He) > 0, pn = (e) => (e.n & He) > 0, mA = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= He;
}, bA = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let I = 0;
    for (let n = 0; n < t.length; n++) {
      const A = t[n];
      Kn(A) && !pn(A) ? A.delete(e) : t[I++] = A, A.w &= ~He, A.n &= ~He;
    }
    t.length = I;
  }
}, AI = /* @__PURE__ */ new WeakMap();
let At = 0, He = 1;
const RI = 30;
let se;
const ve = Symbol(""), sI = Symbol("");
class dI {
  constructor(t, I = null, n) {
    this.fn = t, this.scheduler = I, this.active = !0, this.deps = [], this.parent = void 0, gA(this, n);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = se, I = Oe;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = se, se = this, Oe = !0, He = 1 << ++At, At <= RI ? mA(this) : UI(this), this.fn();
    } finally {
      At <= RI && bA(this), He = 1 << --At, se = this.parent, Oe = I, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    se === this ? this.deferStop = !0 : this.active && (UI(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function UI(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let I = 0; I < t.length; I++)
      t[I].delete(e);
    t.length = 0;
  }
}
let Oe = !0;
const Gn = [];
function Qe() {
  Gn.push(Oe), Oe = !1;
}
function et() {
  const e = Gn.pop();
  Oe = e === void 0 ? !0 : e;
}
function ee(e, t, I) {
  if (Oe && se) {
    let n = AI.get(e);
    n || AI.set(e, n = /* @__PURE__ */ new Map());
    let A = n.get(I);
    A || n.set(I, A = LI()), On(A);
  }
}
function On(e, t) {
  let I = !1;
  At <= RI ? pn(e) || (e.n |= He, I = !Kn(e)) : I = !e.has(se), I && (e.add(se), se.deps.push(e));
}
function ae(e, t, I, n, A, R) {
  const s = AI.get(e);
  if (!s)
    return;
  let P = [];
  if (t === "clear")
    P = [...s.values()];
  else if (I === "length" && p(e)) {
    const E = Number(n);
    s.forEach((o, f) => {
      (f === "length" || f >= E) && P.push(o);
    });
  } else
    switch (I !== void 0 && P.push(s.get(I)), t) {
      case "add":
        p(e) ? aI(I) && P.push(s.get("length")) : (P.push(s.get(ve)), qe(e) && P.push(s.get(sI)));
        break;
      case "delete":
        p(e) || (P.push(s.get(ve)), qe(e) && P.push(s.get(sI)));
        break;
      case "set":
        qe(e) && P.push(s.get(ve));
        break;
    }
  if (P.length === 1)
    P[0] && rI(P[0]);
  else {
    const E = [];
    for (const o of P)
      o && E.push(...o);
    rI(LI(E));
  }
}
function rI(e, t) {
  const I = p(e) ? e : [...e];
  for (const n of I)
    n.computed && zI(n);
  for (const n of I)
    n.computed || zI(n);
}
function zI(e, t) {
  (e !== se || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const WA = /* @__PURE__ */ cI("__proto__,__v_isRef,__isVue"), Fn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(SI)
), xA = /* @__PURE__ */ VI(), yA = /* @__PURE__ */ VI(!1, !0), wA = /* @__PURE__ */ VI(!0), qI = /* @__PURE__ */ CA();
function CA() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...I) {
      const n = m(this);
      for (let R = 0, s = this.length; R < s; R++)
        ee(n, "get", R + "");
      const A = n[t](...I);
      return A === -1 || A === !1 ? n[t](...I.map(m)) : A;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...I) {
      Qe();
      const n = m(this)[t].apply(this, I);
      return et(), n;
    };
  }), e;
}
function vA(e) {
  const t = m(this);
  return ee(t, "has", e), t.hasOwnProperty(e);
}
function VI(e = !1, t = !1) {
  return function(n, A, R) {
    if (A === "__v_isReactive")
      return !e;
    if (A === "__v_isReadonly")
      return e;
    if (A === "__v_isShallow")
      return t;
    if (A === "__v_raw" && R === (e ? t ? nR : bn : t ? mn : _n).get(n))
      return n;
    const s = p(n);
    if (!e) {
      if (s && _(qI, A))
        return Reflect.get(qI, A, R);
      if (A === "hasOwnProperty")
        return vA;
    }
    const P = Reflect.get(n, A, R);
    return (SI(A) ? Fn.has(A) : WA(A)) || (e || ee(n, "get", A), t) ? P : J(P) ? s && aI(A) ? P : P.value : C(P) ? e ? Wn(P) : pI(P) : P;
  };
}
const jA = /* @__PURE__ */ Hn(), BA = /* @__PURE__ */ Hn(!0);
function Hn(e = !1) {
  return function(I, n, A, R) {
    let s = I[n];
    if (ke(s) && J(s) && !J(A))
      return !1;
    if (!e && (!Ht(A) && !ke(A) && (s = m(s), A = m(A)), !p(I) && J(s) && !J(A)))
      return s.value = A, !0;
    const P = p(I) && aI(n) ? Number(n) < I.length : _(I, n), E = Reflect.set(I, n, A, R);
    return I === m(R) && (P ? rt(A, s) && ae(I, "set", n, A) : ae(I, "add", n, A)), E;
  };
}
function $A(e, t) {
  const I = _(e, t);
  e[t];
  const n = Reflect.deleteProperty(e, t);
  return n && I && ae(e, "delete", t, void 0), n;
}
function UA(e, t) {
  const I = Reflect.has(e, t);
  return (!SI(t) || !Fn.has(t)) && ee(e, "has", t), I;
}
function zA(e) {
  return ee(e, "iterate", p(e) ? "length" : ve), Reflect.ownKeys(e);
}
const gn = {
  get: xA,
  set: jA,
  deleteProperty: $A,
  has: UA,
  ownKeys: zA
}, qA = {
  get: wA,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, JA = /* @__PURE__ */ Y({}, gn, {
  get: yA,
  set: BA
}), hI = (e) => e, xt = (e) => Reflect.getPrototypeOf(e);
function Tt(e, t, I = !1, n = !1) {
  e = e.__v_raw;
  const A = m(e), R = m(t);
  I || (t !== R && ee(A, "get", t), ee(A, "get", R));
  const { has: s } = xt(A), P = n ? hI : I ? OI : Pt;
  if (s.call(A, t))
    return P(e.get(t));
  if (s.call(A, R))
    return P(e.get(R));
  e !== A && e.get(t);
}
function St(e, t = !1) {
  const I = this.__v_raw, n = m(I), A = m(e);
  return t || (e !== A && ee(n, "has", e), ee(n, "has", A)), e === A ? I.has(e) : I.has(e) || I.has(A);
}
function at(e, t = !1) {
  return e = e.__v_raw, !t && ee(m(e), "iterate", ve), Reflect.get(e, "size", e);
}
function JI(e) {
  e = m(e);
  const t = m(this);
  return xt(t).has.call(t, e) || (t.add(e), ae(t, "add", e, e)), this;
}
function YI(e, t) {
  t = m(t);
  const I = m(this), { has: n, get: A } = xt(I);
  let R = n.call(I, e);
  R || (e = m(e), R = n.call(I, e));
  const s = A.call(I, e);
  return I.set(e, t), R ? rt(t, s) && ae(I, "set", e, t) : ae(I, "add", e, t), this;
}
function kI(e) {
  const t = m(this), { has: I, get: n } = xt(t);
  let A = I.call(t, e);
  A || (e = m(e), A = I.call(t, e)), n && n.call(t, e);
  const R = t.delete(e);
  return A && ae(t, "delete", e, void 0), R;
}
function XI() {
  const e = m(this), t = e.size !== 0, I = e.clear();
  return t && ae(e, "clear", void 0, void 0), I;
}
function Lt(e, t) {
  return function(n, A) {
    const R = this, s = R.__v_raw, P = m(s), E = t ? hI : e ? OI : Pt;
    return !e && ee(P, "iterate", ve), s.forEach((o, f) => n.call(A, E(o), E(f), R));
  };
}
function dt(e, t, I) {
  return function(...n) {
    const A = this.__v_raw, R = m(A), s = qe(R), P = e === "entries" || e === Symbol.iterator && s, E = e === "keys" && s, o = A[e](...n), f = I ? hI : t ? OI : Pt;
    return !t && ee(R, "iterate", E ? sI : ve), {
      // iterator protocol
      next() {
        const { value: a, done: d } = o.next();
        return d ? { value: a, done: d } : {
          value: P ? [f(a[0]), f(a[1])] : f(a),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function he(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function YA() {
  const e = {
    get(R) {
      return Tt(this, R);
    },
    get size() {
      return at(this);
    },
    has: St,
    add: JI,
    set: YI,
    delete: kI,
    clear: XI,
    forEach: Lt(!1, !1)
  }, t = {
    get(R) {
      return Tt(this, R, !1, !0);
    },
    get size() {
      return at(this);
    },
    has: St,
    add: JI,
    set: YI,
    delete: kI,
    clear: XI,
    forEach: Lt(!1, !0)
  }, I = {
    get(R) {
      return Tt(this, R, !0);
    },
    get size() {
      return at(this, !0);
    },
    has(R) {
      return St.call(this, R, !0);
    },
    add: he(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: he(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: he(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: he(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Lt(!0, !1)
  }, n = {
    get(R) {
      return Tt(this, R, !0, !0);
    },
    get size() {
      return at(this, !0);
    },
    has(R) {
      return St.call(this, R, !0);
    },
    add: he(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: he(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: he(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: he(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Lt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((R) => {
    e[R] = dt(R, !1, !1), I[R] = dt(R, !0, !1), t[R] = dt(R, !1, !0), n[R] = dt(R, !0, !0);
  }), [
    e,
    I,
    t,
    n
  ];
}
const [kA, XA, ZA, QA] = /* @__PURE__ */ YA();
function KI(e, t) {
  const I = t ? e ? QA : ZA : e ? XA : kA;
  return (n, A, R) => A === "__v_isReactive" ? !e : A === "__v_isReadonly" ? e : A === "__v_raw" ? n : Reflect.get(_(I, A) && A in n ? I : n, A, R);
}
const eR = {
  get: /* @__PURE__ */ KI(!1, !1)
}, tR = {
  get: /* @__PURE__ */ KI(!1, !0)
}, IR = {
  get: /* @__PURE__ */ KI(!0, !1)
}, _n = /* @__PURE__ */ new WeakMap(), mn = /* @__PURE__ */ new WeakMap(), bn = /* @__PURE__ */ new WeakMap(), nR = /* @__PURE__ */ new WeakMap();
function AR(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function RR(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : AR(KA(e));
}
function pI(e) {
  return ke(e) ? e : GI(e, !1, gn, eR, _n);
}
function sR(e) {
  return GI(e, !1, JA, tR, mn);
}
function Wn(e) {
  return GI(e, !0, qA, IR, bn);
}
function GI(e, t, I, n, A) {
  if (!C(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const R = A.get(e);
  if (R)
    return R;
  const s = RR(e);
  if (s === 0)
    return e;
  const P = new Proxy(e, s === 2 ? n : I);
  return A.set(e, P), P;
}
function Je(e) {
  return ke(e) ? Je(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ke(e) {
  return !!(e && e.__v_isReadonly);
}
function Ht(e) {
  return !!(e && e.__v_isShallow);
}
function xn(e) {
  return Je(e) || ke(e);
}
function m(e) {
  const t = e && e.__v_raw;
  return t ? m(t) : e;
}
function yn(e) {
  return Ft(e, "__v_skip", !0), e;
}
const Pt = (e) => C(e) ? pI(e) : e, OI = (e) => C(e) ? Wn(e) : e;
function wn(e) {
  Oe && se && (e = m(e), On(e.dep || (e.dep = LI())));
}
function Cn(e, t) {
  e = m(e);
  const I = e.dep;
  I && rI(I);
}
function J(e) {
  return !!(e && e.__v_isRef === !0);
}
function ZI(e) {
  return rR(e, !1);
}
function rR(e, t) {
  return J(e) ? e : new PR(e, t);
}
class PR {
  constructor(t, I) {
    this.__v_isShallow = I, this.dep = void 0, this.__v_isRef = !0, this._rawValue = I ? t : m(t), this._value = I ? t : Pt(t);
  }
  get value() {
    return wn(this), this._value;
  }
  set value(t) {
    const I = this.__v_isShallow || Ht(t) || ke(t);
    t = I ? t : m(t), rt(t, this._rawValue) && (this._rawValue = t, this._value = I ? t : Pt(t), Cn(this));
  }
}
function vn(e) {
  return J(e) ? e.value : e;
}
const ER = {
  get: (e, t, I) => vn(Reflect.get(e, t, I)),
  set: (e, t, I, n) => {
    const A = e[t];
    return J(A) && !J(I) ? (A.value = I, !0) : Reflect.set(e, t, I, n);
  }
};
function jn(e) {
  return Je(e) ? e : new Proxy(e, ER);
}
var Bn;
class DR {
  constructor(t, I, n, A) {
    this._setter = I, this.dep = void 0, this.__v_isRef = !0, this[Bn] = !1, this._dirty = !0, this.effect = new dI(t, () => {
      this._dirty || (this._dirty = !0, Cn(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !A, this.__v_isReadonly = n;
  }
  get value() {
    const t = m(this);
    return wn(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Bn = "__v_isReadonly";
function iR(e, t, I = !1) {
  let n, A;
  const R = O(e);
  return R ? (n = e, A = Ee) : (n = e.get, A = e.set), new DR(n, A, R || !A, I);
}
function Fe(e, t, I, n) {
  let A;
  try {
    A = n ? e(...n) : e();
  } catch (R) {
    yt(R, t, I);
  }
  return A;
}
function De(e, t, I, n) {
  if (O(e)) {
    const R = Fe(e, t, I, n);
    return R && Ln(R) && R.catch((s) => {
      yt(s, t, I);
    }), R;
  }
  const A = [];
  for (let R = 0; R < e.length; R++)
    A.push(De(e[R], t, I, n));
  return A;
}
function yt(e, t, I, n = !0) {
  const A = t ? t.vnode : null;
  if (t) {
    let R = t.parent;
    const s = t.proxy, P = I;
    for (; R; ) {
      const o = R.ec;
      if (o) {
        for (let f = 0; f < o.length; f++)
          if (o[f](e, s, P) === !1)
            return;
      }
      R = R.parent;
    }
    const E = t.appContext.config.errorHandler;
    if (E) {
      Fe(E, null, 10, [e, s, P]);
      return;
    }
  }
  oR(e, I, A, n);
}
function oR(e, t, I, n = !0) {
  console.error(e);
}
let Et = !1, PI = !1;
const q = [];
let ce = 0;
const Ye = [];
let ue = null, we = 0;
const $n = /* @__PURE__ */ Promise.resolve();
let FI = null;
function Un(e) {
  const t = FI || $n;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function lR(e) {
  let t = ce + 1, I = q.length;
  for (; t < I; ) {
    const n = t + I >>> 1;
    Dt(q[n]) < e ? t = n + 1 : I = n;
  }
  return t;
}
function HI(e) {
  (!q.length || !q.includes(e, Et && e.allowRecurse ? ce + 1 : ce)) && (e.id == null ? q.push(e) : q.splice(lR(e.id), 0, e), zn());
}
function zn() {
  !Et && !PI && (PI = !0, FI = $n.then(Jn));
}
function NR(e) {
  const t = q.indexOf(e);
  t > ce && q.splice(t, 1);
}
function cR(e) {
  p(e) ? Ye.push(...e) : (!ue || !ue.includes(e, e.allowRecurse ? we + 1 : we)) && Ye.push(e), zn();
}
function QI(e, t = Et ? ce + 1 : 0) {
  for (; t < q.length; t++) {
    const I = q[t];
    I && I.pre && (q.splice(t, 1), t--, I());
  }
}
function qn(e) {
  if (Ye.length) {
    const t = [...new Set(Ye)];
    if (Ye.length = 0, ue) {
      ue.push(...t);
      return;
    }
    for (ue = t, ue.sort((I, n) => Dt(I) - Dt(n)), we = 0; we < ue.length; we++)
      ue[we]();
    ue = null, we = 0;
  }
}
const Dt = (e) => e.id == null ? 1 / 0 : e.id, fR = (e, t) => {
  const I = Dt(e) - Dt(t);
  if (I === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return I;
};
function Jn(e) {
  PI = !1, Et = !0, q.sort(fR);
  const t = Ee;
  try {
    for (ce = 0; ce < q.length; ce++) {
      const I = q[ce];
      I && I.active !== !1 && Fe(
        I,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    ce = 0, q.length = 0, qn(), Et = !1, FI = null, (q.length || Ye.length) && Jn();
  }
}
function uR(e, t, ...I) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || w;
  let A = I;
  const R = t.startsWith("update:"), s = R && t.slice(7);
  if (s && s in n) {
    const f = `${s === "modelValue" ? "model" : s}Modifiers`, { number: a, trim: d } = n[f] || w;
    d && (A = I.map((G) => U(G) ? G.trim() : G)), a && (A = I.map(OA));
  }
  let P, E = n[P = Yt(t)] || // also try camelCase event handler (#2249)
  n[P = Yt(Te(t))];
  !E && R && (E = n[P = Yt(Re(t))]), E && De(E, e, 6, A);
  const o = n[P + "Once"];
  if (o) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[P])
      return;
    e.emitted[P] = !0, De(o, e, 6, A);
  }
}
function Yn(e, t, I = !1) {
  const n = t.emitsCache, A = n.get(e);
  if (A !== void 0)
    return A;
  const R = e.emits;
  let s = {}, P = !1;
  if (!O(e)) {
    const E = (o) => {
      const f = Yn(o, t, !0);
      f && (P = !0, Y(s, f));
    };
    !I && t.mixins.length && t.mixins.forEach(E), e.extends && E(e.extends), e.mixins && e.mixins.forEach(E);
  }
  return !R && !P ? (C(e) && n.set(e, null), null) : (p(R) ? R.forEach((E) => s[E] = null) : Y(s, R), C(e) && n.set(e, s), s);
}
function wt(e, t) {
  return !e || !mt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), _(e, t[0].toLowerCase() + t.slice(1)) || _(e, Re(t)) || _(e, t));
}
let re = null, kn = null;
function gt(e) {
  const t = re;
  return re = e, kn = e && e.type.__scopeId || null, t;
}
function MR(e, t = re, I) {
  if (!t || e._n)
    return e;
  const n = (...A) => {
    n._d && rn(-1);
    const R = gt(t);
    let s;
    try {
      s = e(...A);
    } finally {
      gt(R), n._d && rn(1);
    }
    return s;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Xt(e) {
  const { type: t, vnode: I, proxy: n, withProxy: A, props: R, propsOptions: [s], slots: P, attrs: E, emit: o, render: f, renderCache: a, data: d, setupState: G, ctx: y, inheritAttrs: g } = e;
  let k, v;
  const de = gt(e);
  try {
    if (I.shapeFlag & 4) {
      const z = A || n;
      k = Ne(f.call(z, z, a, R, G, d, y)), v = E;
    } else {
      const z = t;
      k = Ne(z.length > 1 ? z(R, { attrs: E, slots: P, emit: o }) : z(
        R,
        null
        /* we know it doesn't need it */
      )), v = t.props ? E : TR(E);
    }
  } catch (z) {
    st.length = 0, yt(
      z,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), k = Se(it);
  }
  let H = k;
  if (v && g !== !1) {
    const z = Object.keys(v), { shapeFlag: Ve } = H;
    z.length && Ve & 7 && (s && z.some(MI) && (v = SR(v, s)), H = Xe(H, v));
  }
  return I.dirs && (H = Xe(H), H.dirs = H.dirs ? H.dirs.concat(I.dirs) : I.dirs), I.transition && (H.transition = I.transition), k = H, gt(de), k;
}
const TR = (e) => {
  let t;
  for (const I in e)
    (I === "class" || I === "style" || mt(I)) && ((t || (t = {}))[I] = e[I]);
  return t;
}, SR = (e, t) => {
  const I = {};
  for (const n in e)
    (!MI(n) || !(n.slice(9) in t)) && (I[n] = e[n]);
  return I;
};
function aR(e, t, I) {
  const { props: n, children: A, component: R } = e, { props: s, children: P, patchFlag: E } = t, o = R.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (I && E >= 0) {
    if (E & 1024)
      return !0;
    if (E & 16)
      return n ? en(n, s, o) : !!s;
    if (E & 8) {
      const f = t.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        const d = f[a];
        if (s[d] !== n[d] && !wt(o, d))
          return !0;
      }
    }
  } else
    return (A || P) && (!P || !P.$stable) ? !0 : n === s ? !1 : n ? s ? en(n, s, o) : !0 : !!s;
  return !1;
}
function en(e, t, I) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let A = 0; A < n.length; A++) {
    const R = n[A];
    if (t[R] !== e[R] && !wt(I, R))
      return !0;
  }
  return !1;
}
function LR({ vnode: e, parent: t }, I) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = I, t = t.parent;
}
const dR = (e) => e.__isSuspense;
function VR(e, t) {
  t && t.pendingBranch ? p(e) ? t.effects.push(...e) : t.effects.push(e) : cR(e);
}
function hR(e, t) {
  if ($) {
    let I = $.provides;
    const n = $.parent && $.parent.provides;
    n === I && (I = $.provides = Object.create(n)), I[e] = t;
  }
}
function Kt(e, t, I = !1) {
  const n = $ || re;
  if (n) {
    const A = n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides;
    if (A && e in A)
      return A[e];
    if (arguments.length > 1)
      return I && O(t) ? t.call(n.proxy) : t;
  }
}
const Vt = {};
function pt(e, t, I) {
  return Xn(e, t, I);
}
function Xn(e, t, { immediate: I, deep: n, flush: A, onTrack: R, onTrigger: s } = w) {
  const P = _A() === ($ == null ? void 0 : $.scope) ? $ : null;
  let E, o = !1, f = !1;
  if (J(e) ? (E = () => e.value, o = Ht(e)) : Je(e) ? (E = () => e, n = !0) : p(e) ? (f = !0, o = e.some((H) => Je(H) || Ht(H)), E = () => e.map((H) => {
    if (J(H))
      return H.value;
    if (Je(H))
      return Ue(H);
    if (O(H))
      return Fe(
        H,
        P,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : O(e) ? t ? E = () => Fe(
    e,
    P,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : E = () => {
    if (!(P && P.isUnmounted))
      return a && a(), De(e, P, 3, [d]);
  } : E = Ee, t && n) {
    const H = E;
    E = () => Ue(H());
  }
  let a, d = (H) => {
    a = v.onStop = () => {
      Fe(
        H,
        P,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, G;
  if (lt)
    if (d = Ee, t ? I && De(t, P, 3, [
      E(),
      f ? [] : void 0,
      d
    ]) : E(), A === "sync") {
      const H = as();
      G = H.__watcherHandles || (H.__watcherHandles = []);
    } else
      return Ee;
  let y = f ? new Array(e.length).fill(Vt) : Vt;
  const g = () => {
    if (v.active)
      if (t) {
        const H = v.run();
        (n || o || (f ? H.some((z, Ve) => rt(z, y[Ve])) : rt(H, y))) && (a && a(), De(t, P, 3, [
          H,
          // pass undefined as the old value when it's changed for the first time
          y === Vt ? void 0 : f && y[0] === Vt ? [] : y,
          d
        ]), y = H);
      } else
        v.run();
  };
  g.allowRecurse = !!t;
  let k;
  A === "sync" ? k = g : A === "post" ? k = () => Q(g, P && P.suspense) : (g.pre = !0, P && (g.id = P.uid), k = () => HI(g));
  const v = new dI(E, k);
  t ? I ? g() : y = v.run() : A === "post" ? Q(v.run.bind(v), P && P.suspense) : v.run();
  const de = () => {
    v.stop(), P && P.scope && TI(P.scope.effects, v);
  };
  return G && G.push(de), de;
}
function KR(e, t, I) {
  const n = this.proxy, A = U(e) ? e.includes(".") ? Zn(n, e) : () => n[e] : e.bind(n, n);
  let R;
  O(t) ? R = t : (R = t.handler, I = t);
  const s = $;
  Ze(this);
  const P = Xn(A, R.bind(n), I);
  return s ? Ze(s) : je(), P;
}
function Zn(e, t) {
  const I = t.split(".");
  return () => {
    let n = e;
    for (let A = 0; A < I.length && n; A++)
      n = n[I[A]];
    return n;
  };
}
function Ue(e, t) {
  if (!C(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), J(e))
    Ue(e.value, t);
  else if (p(e))
    for (let I = 0; I < e.length; I++)
      Ue(e[I], t);
  else if (an(e) || qe(e))
    e.forEach((I) => {
      Ue(I, t);
    });
  else if (Vn(e))
    for (const I in e)
      Ue(e[I], t);
  return e;
}
function pR(e) {
  return O(e) ? { setup: e, name: e.name } : e;
}
const Gt = (e) => !!e.type.__asyncLoader, Qn = (e) => e.type.__isKeepAlive;
function GR(e, t) {
  eA(e, "a", t);
}
function OR(e, t) {
  eA(e, "da", t);
}
function eA(e, t, I = $) {
  const n = e.__wdc || (e.__wdc = () => {
    let A = I;
    for (; A; ) {
      if (A.isDeactivated)
        return;
      A = A.parent;
    }
    return e();
  });
  if (Ct(t, n, I), I) {
    let A = I.parent;
    for (; A && A.parent; )
      Qn(A.parent.vnode) && FR(n, t, I, A), A = A.parent;
  }
}
function FR(e, t, I, n) {
  const A = Ct(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  tA(() => {
    TI(n[t], A);
  }, I);
}
function Ct(e, t, I = $, n = !1) {
  if (I) {
    const A = I[e] || (I[e] = []), R = t.__weh || (t.__weh = (...s) => {
      if (I.isUnmounted)
        return;
      Qe(), Ze(I);
      const P = De(t, I, e, s);
      return je(), et(), P;
    });
    return n ? A.unshift(R) : A.push(R), R;
  }
}
const Le = (e) => (t, I = $) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!lt || e === "sp") && Ct(e, (...n) => t(...n), I)
), HR = Le(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), gR = Le(
  "m"
  /* LifecycleHooks.MOUNTED */
), _R = Le(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), mR = Le(
  "u"
  /* LifecycleHooks.UPDATED */
), bR = Le(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), tA = Le(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), WR = Le(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), xR = Le(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), yR = Le(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function wR(e, t = $) {
  Ct("ec", e, t);
}
function We(e, t, I, n) {
  const A = e.dirs, R = t && t.dirs;
  for (let s = 0; s < A.length; s++) {
    const P = A[s];
    R && (P.oldValue = R[s].value);
    let E = P.dir[n];
    E && (Qe(), De(E, I, 8, [
      e.el,
      P,
      e,
      t
    ]), et());
  }
}
const CR = Symbol();
function Zt(e, t, I, n) {
  let A;
  const R = I && I[n];
  if (p(e) || U(e)) {
    A = new Array(e.length);
    for (let s = 0, P = e.length; s < P; s++)
      A[s] = t(e[s], s, void 0, R && R[s]);
  } else if (typeof e == "number") {
    A = new Array(e);
    for (let s = 0; s < e; s++)
      A[s] = t(s + 1, s, void 0, R && R[s]);
  } else if (C(e))
    if (e[Symbol.iterator])
      A = Array.from(e, (s, P) => t(s, P, void 0, R && R[P]));
    else {
      const s = Object.keys(e);
      A = new Array(s.length);
      for (let P = 0, E = s.length; P < E; P++) {
        const o = s[P];
        A[P] = t(e[o], o, P, R && R[P]);
      }
    }
  else
    A = [];
  return I && (I[n] = A), A;
}
const EI = (e) => e ? iA(e) ? bI(e) || e.proxy : EI(e.parent) : null, Rt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Y(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => EI(e.parent),
    $root: (e) => EI(e.root),
    $emit: (e) => e.emit,
    $options: (e) => gI(e),
    $forceUpdate: (e) => e.f || (e.f = () => HI(e.update)),
    $nextTick: (e) => e.n || (e.n = Un.bind(e.proxy)),
    $watch: (e) => KR.bind(e)
  })
), Qt = (e, t) => e !== w && !e.__isScriptSetup && _(e, t), vR = {
  get({ _: e }, t) {
    const { ctx: I, setupState: n, data: A, props: R, accessCache: s, type: P, appContext: E } = e;
    let o;
    if (t[0] !== "$") {
      const G = s[t];
      if (G !== void 0)
        switch (G) {
          case 1:
            return n[t];
          case 2:
            return A[t];
          case 4:
            return I[t];
          case 3:
            return R[t];
        }
      else {
        if (Qt(n, t))
          return s[t] = 1, n[t];
        if (A !== w && _(A, t))
          return s[t] = 2, A[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (o = e.propsOptions[0]) && _(o, t)
        )
          return s[t] = 3, R[t];
        if (I !== w && _(I, t))
          return s[t] = 4, I[t];
        DI && (s[t] = 0);
      }
    }
    const f = Rt[t];
    let a, d;
    if (f)
      return t === "$attrs" && ee(e, "get", t), f(e);
    if (
      // css module (injected by vue-loader)
      (a = P.__cssModules) && (a = a[t])
    )
      return a;
    if (I !== w && _(I, t))
      return s[t] = 4, I[t];
    if (
      // global properties
      d = E.config.globalProperties, _(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, I) {
    const { data: n, setupState: A, ctx: R } = e;
    return Qt(A, t) ? (A[t] = I, !0) : n !== w && _(n, t) ? (n[t] = I, !0) : _(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (R[t] = I, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: I, ctx: n, appContext: A, propsOptions: R } }, s) {
    let P;
    return !!I[s] || e !== w && _(e, s) || Qt(t, s) || (P = R[0]) && _(P, s) || _(n, s) || _(Rt, s) || _(A.config.globalProperties, s);
  },
  defineProperty(e, t, I) {
    return I.get != null ? e._.accessCache[t] = 0 : _(I, "value") && this.set(e, t, I.value, null), Reflect.defineProperty(e, t, I);
  }
};
let DI = !0;
function jR(e) {
  const t = gI(e), I = e.proxy, n = e.ctx;
  DI = !1, t.beforeCreate && tn(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: A,
    computed: R,
    methods: s,
    watch: P,
    provide: E,
    inject: o,
    // lifecycle
    created: f,
    beforeMount: a,
    mounted: d,
    beforeUpdate: G,
    updated: y,
    activated: g,
    deactivated: k,
    beforeDestroy: v,
    beforeUnmount: de,
    destroyed: H,
    unmounted: z,
    render: Ve,
    renderTracked: Bt,
    renderTriggered: Nt,
    errorCaptured: ge,
    serverPrefetch: $t,
    // public API
    expose: _e,
    inheritAttrs: tt,
    // assets
    components: ct,
    directives: ft,
    filters: Ut
  } = t;
  if (o && BR(o, n, null, e.appContext.config.unwrapInjectedRef), s)
    for (const j in s) {
      const W = s[j];
      O(W) && (n[j] = W.bind(I));
    }
  if (A) {
    const j = A.call(I, I);
    C(j) && (e.data = pI(j));
  }
  if (DI = !0, R)
    for (const j in R) {
      const W = R[j], me = O(W) ? W.bind(I, I) : O(W.get) ? W.get.bind(I, I) : Ee, ut = !O(W) && O(W.set) ? W.set.bind(I) : Ee, be = lA({
        get: me,
        set: ut
      });
      Object.defineProperty(n, j, {
        enumerable: !0,
        configurable: !0,
        get: () => be.value,
        set: (ie) => be.value = ie
      });
    }
  if (P)
    for (const j in P)
      IA(P[j], n, I, j);
  if (E) {
    const j = O(E) ? E.call(I) : E;
    Reflect.ownKeys(j).forEach((W) => {
      hR(W, j[W]);
    });
  }
  f && tn(
    f,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function X(j, W) {
    p(W) ? W.forEach((me) => j(me.bind(I))) : W && j(W.bind(I));
  }
  if (X(HR, a), X(gR, d), X(_R, G), X(mR, y), X(GR, g), X(OR, k), X(wR, ge), X(yR, Bt), X(xR, Nt), X(bR, de), X(tA, z), X(WR, $t), p(_e))
    if (_e.length) {
      const j = e.exposed || (e.exposed = {});
      _e.forEach((W) => {
        Object.defineProperty(j, W, {
          get: () => I[W],
          set: (me) => I[W] = me
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Ve && e.render === Ee && (e.render = Ve), tt != null && (e.inheritAttrs = tt), ct && (e.components = ct), ft && (e.directives = ft);
}
function BR(e, t, I = Ee, n = !1) {
  p(e) && (e = iI(e));
  for (const A in e) {
    const R = e[A];
    let s;
    C(R) ? "default" in R ? s = Kt(
      R.from || A,
      R.default,
      !0
      /* treat default function as factory */
    ) : s = Kt(R.from || A) : s = Kt(R), J(s) && n ? Object.defineProperty(t, A, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (P) => s.value = P
    }) : t[A] = s;
  }
}
function tn(e, t, I) {
  De(p(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, I);
}
function IA(e, t, I, n) {
  const A = n.includes(".") ? Zn(I, n) : () => I[n];
  if (U(e)) {
    const R = t[e];
    O(R) && pt(A, R);
  } else if (O(e))
    pt(A, e.bind(I));
  else if (C(e))
    if (p(e))
      e.forEach((R) => IA(R, t, I, n));
    else {
      const R = O(e.handler) ? e.handler.bind(I) : t[e.handler];
      O(R) && pt(A, R, e);
    }
}
function gI(e) {
  const t = e.type, { mixins: I, extends: n } = t, { mixins: A, optionsCache: R, config: { optionMergeStrategies: s } } = e.appContext, P = R.get(t);
  let E;
  return P ? E = P : !A.length && !I && !n ? E = t : (E = {}, A.length && A.forEach((o) => _t(E, o, s, !0)), _t(E, t, s)), C(t) && R.set(t, E), E;
}
function _t(e, t, I, n = !1) {
  const { mixins: A, extends: R } = t;
  R && _t(e, R, I, !0), A && A.forEach((s) => _t(e, s, I, !0));
  for (const s in t)
    if (!(n && s === "expose")) {
      const P = $R[s] || I && I[s];
      e[s] = P ? P(e[s], t[s]) : t[s];
    }
  return e;
}
const $R = {
  data: In,
  props: ye,
  emits: ye,
  // objects
  methods: ye,
  computed: ye,
  // lifecycle
  beforeCreate: Z,
  created: Z,
  beforeMount: Z,
  mounted: Z,
  beforeUpdate: Z,
  updated: Z,
  beforeDestroy: Z,
  beforeUnmount: Z,
  destroyed: Z,
  unmounted: Z,
  activated: Z,
  deactivated: Z,
  errorCaptured: Z,
  serverPrefetch: Z,
  // assets
  components: ye,
  directives: ye,
  // watch
  watch: zR,
  // provide / inject
  provide: In,
  inject: UR
};
function In(e, t) {
  return t ? e ? function() {
    return Y(O(e) ? e.call(this, this) : e, O(t) ? t.call(this, this) : t);
  } : t : e;
}
function UR(e, t) {
  return ye(iI(e), iI(t));
}
function iI(e) {
  if (p(e)) {
    const t = {};
    for (let I = 0; I < e.length; I++)
      t[e[I]] = e[I];
    return t;
  }
  return e;
}
function Z(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ye(e, t) {
  return e ? Y(Y(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function zR(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const I = Y(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    I[n] = Z(e[n], t[n]);
  return I;
}
function qR(e, t, I, n = !1) {
  const A = {}, R = {};
  Ft(R, jt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), nA(e, t, A, R);
  for (const s in e.propsOptions[0])
    s in A || (A[s] = void 0);
  I ? e.props = n ? A : sR(A) : e.type.props ? e.props = A : e.props = R, e.attrs = R;
}
function JR(e, t, I, n) {
  const { props: A, attrs: R, vnode: { patchFlag: s } } = e, P = m(A), [E] = e.propsOptions;
  let o = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || s > 0) && !(s & 16)
  ) {
    if (s & 8) {
      const f = e.vnode.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        let d = f[a];
        if (wt(e.emitsOptions, d))
          continue;
        const G = t[d];
        if (E)
          if (_(R, d))
            G !== R[d] && (R[d] = G, o = !0);
          else {
            const y = Te(d);
            A[y] = oI(
              E,
              P,
              y,
              G,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          G !== R[d] && (R[d] = G, o = !0);
      }
    }
  } else {
    nA(e, t, A, R) && (o = !0);
    let f;
    for (const a in P)
      (!t || // for camelCase
      !_(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Re(a)) === a || !_(t, f))) && (E ? I && // for camelCase
      (I[a] !== void 0 || // for kebab-case
      I[f] !== void 0) && (A[a] = oI(
        E,
        P,
        a,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete A[a]);
    if (R !== P)
      for (const a in R)
        (!t || !_(t, a)) && (delete R[a], o = !0);
  }
  o && ae(e, "set", "$attrs");
}
function nA(e, t, I, n) {
  const [A, R] = e.propsOptions;
  let s = !1, P;
  if (t)
    for (let E in t) {
      if (ht(E))
        continue;
      const o = t[E];
      let f;
      A && _(A, f = Te(E)) ? !R || !R.includes(f) ? I[f] = o : (P || (P = {}))[f] = o : wt(e.emitsOptions, E) || (!(E in n) || o !== n[E]) && (n[E] = o, s = !0);
    }
  if (R) {
    const E = m(I), o = P || w;
    for (let f = 0; f < R.length; f++) {
      const a = R[f];
      I[a] = oI(A, E, a, o[a], e, !_(o, a));
    }
  }
  return s;
}
function oI(e, t, I, n, A, R) {
  const s = e[I];
  if (s != null) {
    const P = _(s, "default");
    if (P && n === void 0) {
      const E = s.default;
      if (s.type !== Function && O(E)) {
        const { propsDefaults: o } = A;
        I in o ? n = o[I] : (Ze(A), n = o[I] = E.call(null, t), je());
      } else
        n = E;
    }
    s[
      0
      /* BooleanFlags.shouldCast */
    ] && (R && !P ? n = !1 : s[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (n === "" || n === Re(I)) && (n = !0));
  }
  return n;
}
function AA(e, t, I = !1) {
  const n = t.propsCache, A = n.get(e);
  if (A)
    return A;
  const R = e.props, s = {}, P = [];
  let E = !1;
  if (!O(e)) {
    const f = (a) => {
      E = !0;
      const [d, G] = AA(a, t, !0);
      Y(s, d), G && P.push(...G);
    };
    !I && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!R && !E)
    return C(e) && n.set(e, ze), ze;
  if (p(R))
    for (let f = 0; f < R.length; f++) {
      const a = Te(R[f]);
      nn(a) && (s[a] = w);
    }
  else if (R)
    for (const f in R) {
      const a = Te(f);
      if (nn(a)) {
        const d = R[f], G = s[a] = p(d) || O(d) ? { type: d } : Object.assign({}, d);
        if (G) {
          const y = sn(Boolean, G.type), g = sn(String, G.type);
          G[
            0
            /* BooleanFlags.shouldCast */
          ] = y > -1, G[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = g < 0 || y < g, (y > -1 || _(G, "default")) && P.push(a);
        }
      }
    }
  const o = [s, P];
  return C(e) && n.set(e, o), o;
}
function nn(e) {
  return e[0] !== "$";
}
function An(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Rn(e, t) {
  return An(e) === An(t);
}
function sn(e, t) {
  return p(t) ? t.findIndex((I) => Rn(I, e)) : O(t) && Rn(t, e) ? 0 : -1;
}
const RA = (e) => e[0] === "_" || e === "$stable", _I = (e) => p(e) ? e.map(Ne) : [Ne(e)], YR = (e, t, I) => {
  if (t._n)
    return t;
  const n = MR((...A) => _I(t(...A)), I);
  return n._c = !1, n;
}, sA = (e, t, I) => {
  const n = e._ctx;
  for (const A in e) {
    if (RA(A))
      continue;
    const R = e[A];
    if (O(R))
      t[A] = YR(A, R, n);
    else if (R != null) {
      const s = _I(R);
      t[A] = () => s;
    }
  }
}, rA = (e, t) => {
  const I = _I(t);
  e.slots.default = () => I;
}, kR = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const I = t._;
    I ? (e.slots = m(t), Ft(t, "_", I)) : sA(t, e.slots = {});
  } else
    e.slots = {}, t && rA(e, t);
  Ft(e.slots, jt, 1);
}, XR = (e, t, I) => {
  const { vnode: n, slots: A } = e;
  let R = !0, s = w;
  if (n.shapeFlag & 32) {
    const P = t._;
    P ? I && P === 1 ? R = !1 : (Y(A, t), !I && P === 1 && delete A._) : (R = !t.$stable, sA(t, A)), s = t;
  } else
    t && (rA(e, t), s = { default: 1 });
  if (R)
    for (const P in A)
      !RA(P) && !(P in s) && delete A[P];
};
function PA() {
  return {
    app: null,
    config: {
      isNativeTag: dA,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let ZR = 0;
function QR(e, t) {
  return function(n, A = null) {
    O(n) || (n = Object.assign({}, n)), A != null && !C(A) && (A = null);
    const R = PA(), s = /* @__PURE__ */ new Set();
    let P = !1;
    const E = R.app = {
      _uid: ZR++,
      _component: n,
      _props: A,
      _container: null,
      _context: R,
      _instance: null,
      version: Ls,
      get config() {
        return R.config;
      },
      set config(o) {
      },
      use(o, ...f) {
        return s.has(o) || (o && O(o.install) ? (s.add(o), o.install(E, ...f)) : O(o) && (s.add(o), o(E, ...f))), E;
      },
      mixin(o) {
        return R.mixins.includes(o) || R.mixins.push(o), E;
      },
      component(o, f) {
        return f ? (R.components[o] = f, E) : R.components[o];
      },
      directive(o, f) {
        return f ? (R.directives[o] = f, E) : R.directives[o];
      },
      mount(o, f, a) {
        if (!P) {
          const d = Se(n, A);
          return d.appContext = R, f && t ? t(d, o) : e(d, o, a), P = !0, E._container = o, o.__vue_app__ = E, bI(d.component) || d.component.proxy;
        }
      },
      unmount() {
        P && (e(null, E._container), delete E._container.__vue_app__);
      },
      provide(o, f) {
        return R.provides[o] = f, E;
      }
    };
    return E;
  };
}
function lI(e, t, I, n, A = !1) {
  if (p(e)) {
    e.forEach((d, G) => lI(d, t && (p(t) ? t[G] : t), I, n, A));
    return;
  }
  if (Gt(n) && !A)
    return;
  const R = n.shapeFlag & 4 ? bI(n.component) || n.component.proxy : n.el, s = A ? null : R, { i: P, r: E } = e, o = t && t.r, f = P.refs === w ? P.refs = {} : P.refs, a = P.setupState;
  if (o != null && o !== E && (U(o) ? (f[o] = null, _(a, o) && (a[o] = null)) : J(o) && (o.value = null)), O(E))
    Fe(E, P, 12, [s, f]);
  else {
    const d = U(E), G = J(E);
    if (d || G) {
      const y = () => {
        if (e.f) {
          const g = d ? _(a, E) ? a[E] : f[E] : E.value;
          A ? p(g) && TI(g, R) : p(g) ? g.includes(R) || g.push(R) : d ? (f[E] = [R], _(a, E) && (a[E] = f[E])) : (E.value = [R], e.k && (f[e.k] = E.value));
        } else
          d ? (f[E] = s, _(a, E) && (a[E] = s)) : G && (E.value = s, e.k && (f[e.k] = s));
      };
      s ? (y.id = -1, Q(y, I)) : y();
    }
  }
}
const Q = VR;
function es(e) {
  return ts(e);
}
function ts(e, t) {
  const I = FA();
  I.__VUE__ = !0;
  const { insert: n, remove: A, patchProp: R, createElement: s, createText: P, createComment: E, setText: o, setElementText: f, parentNode: a, nextSibling: d, setScopeId: G = Ee, insertStaticContent: y } = e, g = (r, D, i, N = null, l = null, M = null, S = !1, u = null, T = !!D.dynamicChildren) => {
    if (r === D)
      return;
    r && !nt(r, D) && (N = Mt(r), ie(r, l, M, !0), r = null), D.patchFlag === -2 && (T = !1, D.dynamicChildren = null);
    const { type: c, ref: V, shapeFlag: L } = D;
    switch (c) {
      case vt:
        k(r, D, i, N);
        break;
      case it:
        v(r, D, i, N);
        break;
      case eI:
        r == null && de(D, i, N, S);
        break;
      case Ie:
        ct(r, D, i, N, l, M, S, u, T);
        break;
      default:
        L & 1 ? Ve(r, D, i, N, l, M, S, u, T) : L & 6 ? ft(r, D, i, N, l, M, S, u, T) : (L & 64 || L & 128) && c.process(r, D, i, N, l, M, S, u, T, Be);
    }
    V != null && l && lI(V, r && r.ref, M, D || r, !D);
  }, k = (r, D, i, N) => {
    if (r == null)
      n(D.el = P(D.children), i, N);
    else {
      const l = D.el = r.el;
      D.children !== r.children && o(l, D.children);
    }
  }, v = (r, D, i, N) => {
    r == null ? n(D.el = E(D.children || ""), i, N) : D.el = r.el;
  }, de = (r, D, i, N) => {
    [r.el, r.anchor] = y(r.children, D, i, N, r.el, r.anchor);
  }, H = ({ el: r, anchor: D }, i, N) => {
    let l;
    for (; r && r !== D; )
      l = d(r), n(r, i, N), r = l;
    n(D, i, N);
  }, z = ({ el: r, anchor: D }) => {
    let i;
    for (; r && r !== D; )
      i = d(r), A(r), r = i;
    A(D);
  }, Ve = (r, D, i, N, l, M, S, u, T) => {
    S = S || D.type === "svg", r == null ? Bt(D, i, N, l, M, S, u, T) : $t(r, D, l, M, S, u, T);
  }, Bt = (r, D, i, N, l, M, S, u) => {
    let T, c;
    const { type: V, props: L, shapeFlag: h, transition: K, dirs: F } = r;
    if (T = r.el = s(r.type, M, L && L.is, L), h & 8 ? f(T, r.children) : h & 16 && ge(r.children, T, null, N, l, M && V !== "foreignObject", S, u), F && We(r, null, N, "created"), Nt(T, r, r.scopeId, S, N), L) {
      for (const b in L)
        b !== "value" && !ht(b) && R(T, b, null, L[b], M, r.children, N, l, fe);
      "value" in L && R(T, "value", null, L.value), (c = L.onVnodeBeforeMount) && le(c, N, r);
    }
    F && We(r, null, N, "beforeMount");
    const x = (!l || l && !l.pendingBranch) && K && !K.persisted;
    x && K.beforeEnter(T), n(T, D, i), ((c = L && L.onVnodeMounted) || x || F) && Q(() => {
      c && le(c, N, r), x && K.enter(T), F && We(r, null, N, "mounted");
    }, l);
  }, Nt = (r, D, i, N, l) => {
    if (i && G(r, i), N)
      for (let M = 0; M < N.length; M++)
        G(r, N[M]);
    if (l) {
      let M = l.subTree;
      if (D === M) {
        const S = l.vnode;
        Nt(r, S, S.scopeId, S.slotScopeIds, l.parent);
      }
    }
  }, ge = (r, D, i, N, l, M, S, u, T = 0) => {
    for (let c = T; c < r.length; c++) {
      const V = r[c] = u ? Ge(r[c]) : Ne(r[c]);
      g(null, V, D, i, N, l, M, S, u);
    }
  }, $t = (r, D, i, N, l, M, S) => {
    const u = D.el = r.el;
    let { patchFlag: T, dynamicChildren: c, dirs: V } = D;
    T |= r.patchFlag & 16;
    const L = r.props || w, h = D.props || w;
    let K;
    i && xe(i, !1), (K = h.onVnodeBeforeUpdate) && le(K, i, D, r), V && We(D, r, i, "beforeUpdate"), i && xe(i, !0);
    const F = l && D.type !== "foreignObject";
    if (c ? _e(r.dynamicChildren, c, u, i, N, F, M) : S || W(r, D, u, null, i, N, F, M, !1), T > 0) {
      if (T & 16)
        tt(u, D, L, h, i, N, l);
      else if (T & 2 && L.class !== h.class && R(u, "class", null, h.class, l), T & 4 && R(u, "style", L.style, h.style, l), T & 8) {
        const x = D.dynamicProps;
        for (let b = 0; b < x.length; b++) {
          const B = x[b], ne = L[B], $e = h[B];
          ($e !== ne || B === "value") && R(u, B, ne, $e, l, r.children, i, N, fe);
        }
      }
      T & 1 && r.children !== D.children && f(u, D.children);
    } else
      !S && c == null && tt(u, D, L, h, i, N, l);
    ((K = h.onVnodeUpdated) || V) && Q(() => {
      K && le(K, i, D, r), V && We(D, r, i, "updated");
    }, N);
  }, _e = (r, D, i, N, l, M, S) => {
    for (let u = 0; u < D.length; u++) {
      const T = r[u], c = D[u], V = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        T.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (T.type === Ie || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !nt(T, c) || // - In the case of a component, it could contain anything.
        T.shapeFlag & 70) ? a(T.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          i
        )
      );
      g(T, c, V, null, N, l, M, S, !0);
    }
  }, tt = (r, D, i, N, l, M, S) => {
    if (i !== N) {
      if (i !== w)
        for (const u in i)
          !ht(u) && !(u in N) && R(r, u, i[u], null, S, D.children, l, M, fe);
      for (const u in N) {
        if (ht(u))
          continue;
        const T = N[u], c = i[u];
        T !== c && u !== "value" && R(r, u, c, T, S, D.children, l, M, fe);
      }
      "value" in N && R(r, "value", i.value, N.value);
    }
  }, ct = (r, D, i, N, l, M, S, u, T) => {
    const c = D.el = r ? r.el : P(""), V = D.anchor = r ? r.anchor : P("");
    let { patchFlag: L, dynamicChildren: h, slotScopeIds: K } = D;
    K && (u = u ? u.concat(K) : K), r == null ? (n(c, i, N), n(V, i, N), ge(D.children, i, V, l, M, S, u, T)) : L > 0 && L & 64 && h && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    r.dynamicChildren ? (_e(r.dynamicChildren, h, i, l, M, S, u), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (D.key != null || l && D === l.subTree) && EA(
      r,
      D,
      !0
      /* shallow */
    )) : W(r, D, i, V, l, M, S, u, T);
  }, ft = (r, D, i, N, l, M, S, u, T) => {
    D.slotScopeIds = u, r == null ? D.shapeFlag & 512 ? l.ctx.activate(D, i, N, S, T) : Ut(D, i, N, l, M, S, T) : xI(r, D, T);
  }, Ut = (r, D, i, N, l, M, S) => {
    const u = r.component = ls(r, N, l);
    if (Qn(r) && (u.ctx.renderer = Be), cs(u), u.asyncDep) {
      if (l && l.registerDep(u, X), !r.el) {
        const T = u.subTree = Se(it);
        v(null, T, D, i);
      }
      return;
    }
    X(u, r, D, i, l, M, S);
  }, xI = (r, D, i) => {
    const N = D.component = r.component;
    if (aR(r, D, i))
      if (N.asyncDep && !N.asyncResolved) {
        j(N, D, i);
        return;
      } else
        N.next = D, NR(N.update), N.update();
    else
      D.el = r.el, N.vnode = D;
  }, X = (r, D, i, N, l, M, S) => {
    const u = () => {
      if (r.isMounted) {
        let { next: V, bu: L, u: h, parent: K, vnode: F } = r, x = V, b;
        xe(r, !1), V ? (V.el = F.el, j(r, V, S)) : V = F, L && kt(L), (b = V.props && V.props.onVnodeBeforeUpdate) && le(b, K, V, F), xe(r, !0);
        const B = Xt(r), ne = r.subTree;
        r.subTree = B, g(
          ne,
          B,
          // parent may have changed if it's in a teleport
          a(ne.el),
          // anchor may have changed if it's in a fragment
          Mt(ne),
          r,
          l,
          M
        ), V.el = B.el, x === null && LR(r, B.el), h && Q(h, l), (b = V.props && V.props.onVnodeUpdated) && Q(() => le(b, K, V, F), l);
      } else {
        let V;
        const { el: L, props: h } = D, { bm: K, m: F, parent: x } = r, b = Gt(D);
        if (xe(r, !1), K && kt(K), !b && (V = h && h.onVnodeBeforeMount) && le(V, x, D), xe(r, !0), L && qt) {
          const B = () => {
            r.subTree = Xt(r), qt(L, r.subTree, r, l, null);
          };
          b ? D.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !r.isUnmounted && B()
          ) : B();
        } else {
          const B = r.subTree = Xt(r);
          g(null, B, i, N, r, l, M), D.el = B.el;
        }
        if (F && Q(F, l), !b && (V = h && h.onVnodeMounted)) {
          const B = D;
          Q(() => le(V, x, B), l);
        }
        (D.shapeFlag & 256 || x && Gt(x.vnode) && x.vnode.shapeFlag & 256) && r.a && Q(r.a, l), r.isMounted = !0, D = i = N = null;
      }
    }, T = r.effect = new dI(
      u,
      () => HI(c),
      r.scope
      // track it in component's effect scope
    ), c = r.update = () => T.run();
    c.id = r.uid, xe(r, !0), c();
  }, j = (r, D, i) => {
    D.component = r;
    const N = r.vnode.props;
    r.vnode = D, r.next = null, JR(r, D.props, N, i), XR(r, D.children, i), Qe(), QI(), et();
  }, W = (r, D, i, N, l, M, S, u, T = !1) => {
    const c = r && r.children, V = r ? r.shapeFlag : 0, L = D.children, { patchFlag: h, shapeFlag: K } = D;
    if (h > 0) {
      if (h & 128) {
        ut(c, L, i, N, l, M, S, u, T);
        return;
      } else if (h & 256) {
        me(c, L, i, N, l, M, S, u, T);
        return;
      }
    }
    K & 8 ? (V & 16 && fe(c, l, M), L !== c && f(i, L)) : V & 16 ? K & 16 ? ut(c, L, i, N, l, M, S, u, T) : fe(c, l, M, !0) : (V & 8 && f(i, ""), K & 16 && ge(L, i, N, l, M, S, u, T));
  }, me = (r, D, i, N, l, M, S, u, T) => {
    r = r || ze, D = D || ze;
    const c = r.length, V = D.length, L = Math.min(c, V);
    let h;
    for (h = 0; h < L; h++) {
      const K = D[h] = T ? Ge(D[h]) : Ne(D[h]);
      g(r[h], K, i, null, l, M, S, u, T);
    }
    c > V ? fe(r, l, M, !0, !1, L) : ge(D, i, N, l, M, S, u, T, L);
  }, ut = (r, D, i, N, l, M, S, u, T) => {
    let c = 0;
    const V = D.length;
    let L = r.length - 1, h = V - 1;
    for (; c <= L && c <= h; ) {
      const K = r[c], F = D[c] = T ? Ge(D[c]) : Ne(D[c]);
      if (nt(K, F))
        g(K, F, i, null, l, M, S, u, T);
      else
        break;
      c++;
    }
    for (; c <= L && c <= h; ) {
      const K = r[L], F = D[h] = T ? Ge(D[h]) : Ne(D[h]);
      if (nt(K, F))
        g(K, F, i, null, l, M, S, u, T);
      else
        break;
      L--, h--;
    }
    if (c > L) {
      if (c <= h) {
        const K = h + 1, F = K < V ? D[K].el : N;
        for (; c <= h; )
          g(null, D[c] = T ? Ge(D[c]) : Ne(D[c]), i, F, l, M, S, u, T), c++;
      }
    } else if (c > h)
      for (; c <= L; )
        ie(r[c], l, M, !0), c++;
    else {
      const K = c, F = c, x = /* @__PURE__ */ new Map();
      for (c = F; c <= h; c++) {
        const te = D[c] = T ? Ge(D[c]) : Ne(D[c]);
        te.key != null && x.set(te.key, c);
      }
      let b, B = 0;
      const ne = h - F + 1;
      let $e = !1, CI = 0;
      const It = new Array(ne);
      for (c = 0; c < ne; c++)
        It[c] = 0;
      for (c = K; c <= L; c++) {
        const te = r[c];
        if (B >= ne) {
          ie(te, l, M, !0);
          continue;
        }
        let oe;
        if (te.key != null)
          oe = x.get(te.key);
        else
          for (b = F; b <= h; b++)
            if (It[b - F] === 0 && nt(te, D[b])) {
              oe = b;
              break;
            }
        oe === void 0 ? ie(te, l, M, !0) : (It[oe - F] = c + 1, oe >= CI ? CI = oe : $e = !0, g(te, D[oe], i, null, l, M, S, u, T), B++);
      }
      const vI = $e ? Is(It) : ze;
      for (b = vI.length - 1, c = ne - 1; c >= 0; c--) {
        const te = F + c, oe = D[te], jI = te + 1 < V ? D[te + 1].el : N;
        It[c] === 0 ? g(null, oe, i, jI, l, M, S, u, T) : $e && (b < 0 || c !== vI[b] ? be(
          oe,
          i,
          jI,
          2
          /* MoveType.REORDER */
        ) : b--);
      }
    }
  }, be = (r, D, i, N, l = null) => {
    const { el: M, type: S, transition: u, children: T, shapeFlag: c } = r;
    if (c & 6) {
      be(r.component.subTree, D, i, N);
      return;
    }
    if (c & 128) {
      r.suspense.move(D, i, N);
      return;
    }
    if (c & 64) {
      S.move(r, D, i, Be);
      return;
    }
    if (S === Ie) {
      n(M, D, i);
      for (let L = 0; L < T.length; L++)
        be(T[L], D, i, N);
      n(r.anchor, D, i);
      return;
    }
    if (S === eI) {
      H(r, D, i);
      return;
    }
    if (N !== 2 && c & 1 && u)
      if (N === 0)
        u.beforeEnter(M), n(M, D, i), Q(() => u.enter(M), l);
      else {
        const { leave: L, delayLeave: h, afterLeave: K } = u, F = () => n(M, D, i), x = () => {
          L(M, () => {
            F(), K && K();
          });
        };
        h ? h(M, F, x) : x();
      }
    else
      n(M, D, i);
  }, ie = (r, D, i, N = !1, l = !1) => {
    const { type: M, props: S, ref: u, children: T, dynamicChildren: c, shapeFlag: V, patchFlag: L, dirs: h } = r;
    if (u != null && lI(u, null, i, r, !0), V & 256) {
      D.ctx.deactivate(r);
      return;
    }
    const K = V & 1 && h, F = !Gt(r);
    let x;
    if (F && (x = S && S.onVnodeBeforeUnmount) && le(x, D, r), V & 6)
      fA(r.component, i, N);
    else {
      if (V & 128) {
        r.suspense.unmount(i, N);
        return;
      }
      K && We(r, null, D, "beforeUnmount"), V & 64 ? r.type.remove(r, D, i, l, Be, N) : c && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (M !== Ie || L > 0 && L & 64) ? fe(c, D, i, !1, !0) : (M === Ie && L & 384 || !l && V & 16) && fe(T, D, i), N && yI(r);
    }
    (F && (x = S && S.onVnodeUnmounted) || K) && Q(() => {
      x && le(x, D, r), K && We(r, null, D, "unmounted");
    }, i);
  }, yI = (r) => {
    const { type: D, el: i, anchor: N, transition: l } = r;
    if (D === Ie) {
      cA(i, N);
      return;
    }
    if (D === eI) {
      z(r);
      return;
    }
    const M = () => {
      A(i), l && !l.persisted && l.afterLeave && l.afterLeave();
    };
    if (r.shapeFlag & 1 && l && !l.persisted) {
      const { leave: S, delayLeave: u } = l, T = () => S(i, M);
      u ? u(r.el, M, T) : T();
    } else
      M();
  }, cA = (r, D) => {
    let i;
    for (; r !== D; )
      i = d(r), A(r), r = i;
    A(D);
  }, fA = (r, D, i) => {
    const { bum: N, scope: l, update: M, subTree: S, um: u } = r;
    N && kt(N), l.stop(), M && (M.active = !1, ie(S, r, D, i)), u && Q(u, D), Q(() => {
      r.isUnmounted = !0;
    }, D), D && D.pendingBranch && !D.isUnmounted && r.asyncDep && !r.asyncResolved && r.suspenseId === D.pendingId && (D.deps--, D.deps === 0 && D.resolve());
  }, fe = (r, D, i, N = !1, l = !1, M = 0) => {
    for (let S = M; S < r.length; S++)
      ie(r[S], D, i, N, l);
  }, Mt = (r) => r.shapeFlag & 6 ? Mt(r.component.subTree) : r.shapeFlag & 128 ? r.suspense.next() : d(r.anchor || r.el), wI = (r, D, i) => {
    r == null ? D._vnode && ie(D._vnode, null, null, !0) : g(D._vnode || null, r, D, null, null, null, i), QI(), qn(), D._vnode = r;
  }, Be = {
    p: g,
    um: ie,
    m: be,
    r: yI,
    mt: Ut,
    mc: ge,
    pc: W,
    pbc: _e,
    n: Mt,
    o: e
  };
  let zt, qt;
  return t && ([zt, qt] = t(Be)), {
    render: wI,
    hydrate: zt,
    createApp: QR(wI, zt)
  };
}
function xe({ effect: e, update: t }, I) {
  e.allowRecurse = t.allowRecurse = I;
}
function EA(e, t, I = !1) {
  const n = e.children, A = t.children;
  if (p(n) && p(A))
    for (let R = 0; R < n.length; R++) {
      const s = n[R];
      let P = A[R];
      P.shapeFlag & 1 && !P.dynamicChildren && ((P.patchFlag <= 0 || P.patchFlag === 32) && (P = A[R] = Ge(A[R]), P.el = s.el), I || EA(s, P)), P.type === vt && (P.el = s.el);
    }
}
function Is(e) {
  const t = e.slice(), I = [0];
  let n, A, R, s, P;
  const E = e.length;
  for (n = 0; n < E; n++) {
    const o = e[n];
    if (o !== 0) {
      if (A = I[I.length - 1], e[A] < o) {
        t[n] = A, I.push(n);
        continue;
      }
      for (R = 0, s = I.length - 1; R < s; )
        P = R + s >> 1, e[I[P]] < o ? R = P + 1 : s = P;
      o < e[I[R]] && (R > 0 && (t[n] = I[R - 1]), I[R] = n);
    }
  }
  for (R = I.length, s = I[R - 1]; R-- > 0; )
    I[R] = s, s = t[s];
  return I;
}
const ns = (e) => e.__isTeleport, Ie = Symbol(void 0), vt = Symbol(void 0), it = Symbol(void 0), eI = Symbol(void 0), st = [];
let Pe = null;
function Ke(e = !1) {
  st.push(Pe = e ? null : []);
}
function As() {
  st.pop(), Pe = st[st.length - 1] || null;
}
let ot = 1;
function rn(e) {
  ot += e;
}
function Rs(e) {
  return e.dynamicChildren = ot > 0 ? Pe || ze : null, As(), ot > 0 && Pe && Pe.push(e), e;
}
function pe(e, t, I, n, A, R) {
  return Rs(Me(
    e,
    t,
    I,
    n,
    A,
    R,
    !0
    /* isBlock */
  ));
}
function ss(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const jt = "__vInternal", DA = ({ key: e }) => e ?? null, Ot = ({ ref: e, ref_key: t, ref_for: I }) => e != null ? U(e) || J(e) || O(e) ? { i: re, r: e, k: t, f: !!I } : e : null;
function Me(e, t = null, I = null, n = 0, A = null, R = e === Ie ? 0 : 1, s = !1, P = !1) {
  const E = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && DA(t),
    ref: t && Ot(t),
    scopeId: kn,
    slotScopeIds: null,
    children: I,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: R,
    patchFlag: n,
    dynamicProps: A,
    dynamicChildren: null,
    appContext: null,
    ctx: re
  };
  return P ? (mI(E, I), R & 128 && e.normalize(E)) : I && (E.shapeFlag |= U(I) ? 8 : 16), ot > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  Pe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (E.patchFlag > 0 || R & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  E.patchFlag !== 32 && Pe.push(E), E;
}
const Se = rs;
function rs(e, t = null, I = null, n = 0, A = null, R = !1) {
  if ((!e || e === CR) && (e = it), ss(e)) {
    const P = Xe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return I && mI(P, I), ot > 0 && !R && Pe && (P.shapeFlag & 6 ? Pe[Pe.indexOf(e)] = P : Pe.push(P)), P.patchFlag |= -2, P;
  }
  if (Ts(e) && (e = e.__vccOpts), t) {
    t = Ps(t);
    let { class: P, style: E } = t;
    P && !U(P) && (t.class = uI(P)), C(E) && (xn(E) && !p(E) && (E = Y({}, E)), t.style = fI(E));
  }
  const s = U(e) ? 1 : dR(e) ? 128 : ns(e) ? 64 : C(e) ? 4 : O(e) ? 2 : 0;
  return Me(e, t, I, n, A, s, R, !0);
}
function Ps(e) {
  return e ? xn(e) || jt in e ? Y({}, e) : e : null;
}
function Xe(e, t, I = !1) {
  const { props: n, ref: A, patchFlag: R, children: s } = e, P = t ? Ds(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: P,
    key: P && DA(P),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      I && A ? p(A) ? A.concat(Ot(t)) : [A, Ot(t)] : Ot(t)
    ) : A,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ie ? R === -1 ? 16 : R | 16 : R,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Xe(e.ssContent),
    ssFallback: e.ssFallback && Xe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Es(e = " ", t = 0) {
  return Se(vt, null, e, t);
}
function Ne(e) {
  return e == null || typeof e == "boolean" ? Se(it) : p(e) ? Se(
    Ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Ge(e) : Se(vt, null, String(e));
}
function Ge(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Xe(e);
}
function mI(e, t) {
  let I = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (p(t))
    I = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const A = t.default;
      A && (A._c && (A._d = !1), mI(e, A()), A._c && (A._d = !0));
      return;
    } else {
      I = 32;
      const A = t._;
      !A && !(jt in t) ? t._ctx = re : A === 3 && re && (re.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    O(t) ? (t = { default: t, _ctx: re }, I = 32) : (t = String(t), n & 64 ? (I = 16, t = [Es(t)]) : I = 8);
  e.children = t, e.shapeFlag |= I;
}
function Ds(...e) {
  const t = {};
  for (let I = 0; I < e.length; I++) {
    const n = e[I];
    for (const A in n)
      if (A === "class")
        t.class !== n.class && (t.class = uI([t.class, n.class]));
      else if (A === "style")
        t.style = fI([t.style, n.style]);
      else if (mt(A)) {
        const R = t[A], s = n[A];
        s && R !== s && !(p(R) && R.includes(s)) && (t[A] = R ? [].concat(R, s) : s);
      } else
        A !== "" && (t[A] = n[A]);
  }
  return t;
}
function le(e, t, I, n = null) {
  De(e, t, 7, [
    I,
    n
  ]);
}
const is = PA();
let os = 0;
function ls(e, t, I) {
  const n = e.type, A = (t ? t.appContext : e.appContext) || is, R = {
    uid: os++,
    vnode: e,
    type: n,
    parent: t,
    appContext: A,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new HA(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(A.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: AA(n, A),
    emitsOptions: Yn(n, A),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: w,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: w,
    data: w,
    props: w,
    attrs: w,
    slots: w,
    refs: w,
    setupState: w,
    setupContext: null,
    // suspense related
    suspense: I,
    suspenseId: I ? I.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return R.ctx = { _: R }, R.root = t ? t.root : R, R.emit = uR.bind(null, R), e.ce && e.ce(R), R;
}
let $ = null;
const Ns = () => $ || re, Ze = (e) => {
  $ = e, e.scope.on();
}, je = () => {
  $ && $.scope.off(), $ = null;
};
function iA(e) {
  return e.vnode.shapeFlag & 4;
}
let lt = !1;
function cs(e, t = !1) {
  lt = t;
  const { props: I, children: n } = e.vnode, A = iA(e);
  qR(e, I, A, t), kR(e, n);
  const R = A ? fs(e, t) : void 0;
  return lt = !1, R;
}
function fs(e, t) {
  const I = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = yn(new Proxy(e.ctx, vR));
  const { setup: n } = I;
  if (n) {
    const A = e.setupContext = n.length > 1 ? Ms(e) : null;
    Ze(e), Qe();
    const R = Fe(n, e, 0, [e.props, A]);
    if (et(), je(), Ln(R)) {
      if (R.then(je, je), t)
        return R.then((s) => {
          Pn(e, s, t);
        }).catch((s) => {
          yt(
            s,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      e.asyncDep = R;
    } else
      Pn(e, R, t);
  } else
    oA(e, t);
}
function Pn(e, t, I) {
  O(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : C(t) && (e.setupState = jn(t)), oA(e, I);
}
let En;
function oA(e, t, I) {
  const n = e.type;
  if (!e.render) {
    if (!t && En && !n.render) {
      const A = n.template || gI(e).template;
      if (A) {
        const { isCustomElement: R, compilerOptions: s } = e.appContext.config, { delimiters: P, compilerOptions: E } = n, o = Y(Y({
          isCustomElement: R,
          delimiters: P
        }, s), E);
        n.render = En(A, o);
      }
    }
    e.render = n.render || Ee;
  }
  Ze(e), Qe(), jR(e), et(), je();
}
function us(e) {
  return new Proxy(e.attrs, {
    get(t, I) {
      return ee(e, "get", "$attrs"), t[I];
    }
  });
}
function Ms(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  let I;
  return {
    get attrs() {
      return I || (I = us(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function bI(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(jn(yn(e.exposed)), {
      get(t, I) {
        if (I in t)
          return t[I];
        if (I in Rt)
          return Rt[I](e);
      },
      has(t, I) {
        return I in t || I in Rt;
      }
    }));
}
function Ts(e) {
  return O(e) && "__vccOpts" in e;
}
const lA = (e, t) => iR(e, t, lt), Ss = Symbol(""), as = () => Kt(Ss), Ls = "3.2.47", ds = "http://www.w3.org/2000/svg", Ce = typeof document < "u" ? document : null, Dn = Ce && /* @__PURE__ */ Ce.createElement("template"), Vs = {
  insert: (e, t, I) => {
    t.insertBefore(e, I || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, I, n) => {
    const A = t ? Ce.createElementNS(ds, e) : Ce.createElement(e, I ? { is: I } : void 0);
    return e === "select" && n && n.multiple != null && A.setAttribute("multiple", n.multiple), A;
  },
  createText: (e) => Ce.createTextNode(e),
  createComment: (e) => Ce.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ce.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, I, n, A, R) {
    const s = I ? I.previousSibling : t.lastChild;
    if (A && (A === R || A.nextSibling))
      for (; t.insertBefore(A.cloneNode(!0), I), !(A === R || !(A = A.nextSibling)); )
        ;
    else {
      Dn.innerHTML = n ? `<svg>${e}</svg>` : e;
      const P = Dn.content;
      if (n) {
        const E = P.firstChild;
        for (; E.firstChild; )
          P.appendChild(E.firstChild);
        P.removeChild(E);
      }
      t.insertBefore(P, I);
    }
    return [
      // first
      s ? s.nextSibling : t.firstChild,
      // last
      I ? I.previousSibling : t.lastChild
    ];
  }
};
function hs(e, t, I) {
  const n = e._vtc;
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : I ? e.setAttribute("class", t) : e.className = t;
}
function Ks(e, t, I) {
  const n = e.style, A = U(I);
  if (I && !A) {
    if (t && !U(t))
      for (const R in t)
        I[R] == null && NI(n, R, "");
    for (const R in I)
      NI(n, R, I[R]);
  } else {
    const R = n.display;
    A ? t !== I && (n.cssText = I) : t && e.removeAttribute("style"), "_vod" in e && (n.display = R);
  }
}
const on = /\s*!important$/;
function NI(e, t, I) {
  if (p(I))
    I.forEach((n) => NI(e, t, n));
  else if (I == null && (I = ""), t.startsWith("--"))
    e.setProperty(t, I);
  else {
    const n = ps(e, t);
    on.test(I) ? e.setProperty(Re(n), I.replace(on, ""), "important") : e[n] = I;
  }
}
const ln = ["Webkit", "Moz", "ms"], tI = {};
function ps(e, t) {
  const I = tI[t];
  if (I)
    return I;
  let n = Te(t);
  if (n !== "filter" && n in e)
    return tI[t] = n;
  n = hn(n);
  for (let A = 0; A < ln.length; A++) {
    const R = ln[A] + n;
    if (R in e)
      return tI[t] = R;
  }
  return t;
}
const Nn = "http://www.w3.org/1999/xlink";
function Gs(e, t, I, n, A) {
  if (n && t.startsWith("xlink:"))
    I == null ? e.removeAttributeNS(Nn, t.slice(6, t.length)) : e.setAttributeNS(Nn, t, I);
  else {
    const R = LA(t);
    I == null || R && !Tn(I) ? e.removeAttribute(t) : e.setAttribute(t, R ? "" : I);
  }
}
function Os(e, t, I, n, A, R, s) {
  if (t === "innerHTML" || t === "textContent") {
    n && s(n, A, R), e[t] = I ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = I;
    const E = I ?? "";
    (e.value !== E || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = E), I == null && e.removeAttribute(t);
    return;
  }
  let P = !1;
  if (I === "" || I == null) {
    const E = typeof e[t];
    E === "boolean" ? I = Tn(I) : I == null && E === "string" ? (I = "", P = !0) : E === "number" && (I = 0, P = !0);
  }
  try {
    e[t] = I;
  } catch {
  }
  P && e.removeAttribute(t);
}
function Fs(e, t, I, n) {
  e.addEventListener(t, I, n);
}
function Hs(e, t, I, n) {
  e.removeEventListener(t, I, n);
}
function gs(e, t, I, n, A = null) {
  const R = e._vei || (e._vei = {}), s = R[t];
  if (n && s)
    s.value = n;
  else {
    const [P, E] = _s(t);
    if (n) {
      const o = R[t] = Ws(n, A);
      Fs(e, P, o, E);
    } else
      s && (Hs(e, P, s, E), R[t] = void 0);
  }
}
const cn = /(?:Once|Passive|Capture)$/;
function _s(e) {
  let t;
  if (cn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(cn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Re(e.slice(2)), t];
}
let II = 0;
const ms = /* @__PURE__ */ Promise.resolve(), bs = () => II || (ms.then(() => II = 0), II = Date.now());
function Ws(e, t) {
  const I = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= I.attached)
      return;
    De(xs(n, I.value), t, 5, [n]);
  };
  return I.value = e, I.attached = bs(), I;
}
function xs(e, t) {
  if (p(t)) {
    const I = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      I.call(e), e._stopped = !0;
    }, t.map((n) => (A) => !A._stopped && n && n(A));
  } else
    return t;
}
const fn = /^on[a-z]/, ys = (e, t, I, n, A = !1, R, s, P, E) => {
  t === "class" ? hs(e, n, A) : t === "style" ? Ks(e, I, n) : mt(t) ? MI(t) || gs(e, t, I, n, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ws(e, t, n, A)) ? Os(e, t, n, R, s, P, E) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Gs(e, t, n, A));
};
function ws(e, t, I, n) {
  return n ? !!(t === "innerHTML" || t === "textContent" || t in e && fn.test(t) && O(I)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || fn.test(t) && U(I) ? !1 : t in e;
}
function Cs(e, t) {
  const I = pR(e);
  class n extends WI {
    constructor(R) {
      super(I, R, t);
    }
  }
  return n.def = I, n;
}
const vs = typeof HTMLElement < "u" ? HTMLElement : class {
};
class WI extends vs {
  constructor(t, I = {}, n) {
    super(), this._def = t, this._props = I, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && n ? n(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Un(() => {
      this._connected || (Mn(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    new MutationObserver((n) => {
      for (const A of n)
        this._setAttr(A.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (n, A = !1) => {
      const { props: R, styles: s } = n;
      let P;
      if (R && !p(R))
        for (const E in R) {
          const o = R[E];
          (o === Number || o && o.type === Number) && (E in this._props && (this._props[E] = BI(this._props[E])), (P || (P = /* @__PURE__ */ Object.create(null)))[Te(E)] = !0);
        }
      this._numberProps = P, A && this._resolveProps(n), this._applyStyles(s), this._update();
    }, I = this._def.__asyncLoader;
    I ? I().then((n) => t(n, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: I } = t, n = p(I) ? I : Object.keys(I || {});
    for (const A of Object.keys(this))
      A[0] !== "_" && n.includes(A) && this._setProp(A, this[A], !0, !1);
    for (const A of n.map(Te))
      Object.defineProperty(this, A, {
        get() {
          return this._getProp(A);
        },
        set(R) {
          this._setProp(A, R);
        }
      });
  }
  _setAttr(t) {
    let I = this.getAttribute(t);
    const n = Te(t);
    this._numberProps && this._numberProps[n] && (I = BI(I)), this._setProp(n, I, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, I, n = !0, A = !0) {
    I !== this._props[t] && (this._props[t] = I, A && this._instance && this._update(), n && (I === !0 ? this.setAttribute(Re(t), "") : typeof I == "string" || typeof I == "number" ? this.setAttribute(Re(t), I + "") : I || this.removeAttribute(Re(t))));
  }
  _update() {
    Mn(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Se(this._def, Y({}, this._props));
    return this._instance || (t.ce = (I) => {
      this._instance = I, I.isCE = !0;
      const n = (R, s) => {
        this.dispatchEvent(new CustomEvent(R, {
          detail: s
        }));
      };
      I.emit = (R, ...s) => {
        n(R, s), Re(R) !== R && n(Re(R), s);
      };
      let A = this;
      for (; A = A && (A.parentNode || A.host); )
        if (A instanceof WI) {
          I.parent = A._instance, I.provides = A._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((I) => {
      const n = document.createElement("style");
      n.textContent = I, this.shadowRoot.appendChild(n);
    });
  }
}
const js = /* @__PURE__ */ Y({ patchProp: ys }, Vs);
let un;
function NA() {
  return un || (un = es(js));
}
const Mn = (...e) => {
  NA().render(...e);
}, Bs = (...e) => {
  const t = NA().createApp(...e), { mount: I } = t;
  return t.mount = (n) => {
    const A = $s(n);
    if (!A)
      return;
    const R = t._component;
    !O(R) && !R.render && !R.template && (R.template = A.innerHTML), A.innerHTML = "";
    const s = I(A, !1, A instanceof SVGElement);
    return A instanceof Element && (A.removeAttribute("v-cloak"), A.setAttribute("data-v-app", "")), s;
  }, t;
};
function $s(e) {
  return U(e) ? document.querySelector(e) : e;
}
const nI = Symbol("style node");
function Us(e, t) {
  for (; ![Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(t.nodeType); ) {
    if (t.parentNode === null)
      throw "Could not inject styling!";
    t = t.parentNode;
  }
  const I = t, n = document.createElement("style");
  return n.innerText = e.join().replace(/[\r\n]+/g, ""), I.prepend(n), n;
}
function zs(e) {
  const t = e.setup;
  return e.setup = function(...I) {
    const n = Bs({});
    n.mixin({
      //any component that we create needs to copy their style to the shadow root(mounted)
      mounted() {
        this.$options.styles && (this[nI] = Us(this.$options.styles, this.$el));
      },
      unmounted() {
        const R = this[nI];
        R !== void 0 && (R.remove(), this[nI] = void 0);
      }
    });
    const A = Ns();
    return A && (A.appContext = n._context), t(...I);
  }, Object.defineProperty(e.setup, "length", {
    get: () => t.length,
    set: () => {
    }
  }), Cs(e);
}
const qs = [
  {
    TOWER: "CS6",
    PREVAILING: "",
    LAT: "28.6291",
    LON: "-80.6237",
    HGT: "",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "0",
    RAINHR: "0.01"
  },
  {
    TOWER: "0001",
    PREVAILING: "",
    LAT: "28.4338",
    LON: "-80.5734",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "005",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "011",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "014",
    "10 MIN PEAK SPD": "12",
    DEV: "9",
    TMP: "76.6",
    DP: "67.7",
    RH: "74",
    DIF: "-.7",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0001",
    PREVAILING: "",
    LAT: "28.4338",
    LON: "-80.5734",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "063",
    "01 MIN AVG SPD": "7",
    "01 MIN PEAK DIR": "041",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "068",
    "10 MIN PEAK SPD": "13",
    DEV: "21",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0001",
    PREVAILING: "",
    LAT: "28.4338",
    LON: "-80.5734",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "77.3",
    DP: "69.5",
    RH: "77",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "78.8",
    SLMOIST: "3.4",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002NW",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "204",
    AV: "01",
    "01 MIN AVG DIR": "076",
    "01 MIN AVG SPD": "9",
    "01 MIN PEAK DIR": "076",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "065",
    "10 MIN PEAK SPD": "14",
    DEV: "10",
    TMP: "75.9",
    DP: "67.4",
    RH: "75",
    DIF: "",
    PRE: "",
    DIFRAD: "71.0",
    REFRAD: "11.0",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002NW",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "145",
    AV: "01",
    "01 MIN AVG DIR": "077",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "078",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "055",
    "10 MIN PEAK SPD": "13",
    DEV: "10",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002NW",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "90",
    AV: "01",
    "01 MIN AVG DIR": "079",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "078",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "054",
    "10 MIN PEAK SPD": "13",
    DEV: "12",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002NW",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "085",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "074",
    "01 PEAK SPD": "9",
    "10 MIN PEAK DIR": "051",
    "10 MIN PEAK SPD": "12",
    DEV: "13",
    TMP: "76.9",
    DP: "69.1",
    RH: "77",
    DIF: "-.1",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002NW",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "075",
    "01 MIN AVG SPD": "4",
    "01 MIN PEAK DIR": "091",
    "01 PEAK SPD": "5",
    "10 MIN PEAK DIR": "065",
    "10 MIN PEAK SPD": "11",
    DEV: "17",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002NW",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "77.0",
    DP: "70.0",
    RH: "79",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "76.5",
    SLMOIST: "12.2",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002SE",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "204",
    AV: "01",
    "01 MIN AVG DIR": "073",
    "01 MIN AVG SPD": "9",
    "01 MIN PEAK DIR": "072",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "067",
    "10 MIN PEAK SPD": "13",
    DEV: "11",
    TMP: "75.9",
    DP: "68.6",
    RH: "78",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002SE",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "145",
    AV: "01",
    "01 MIN AVG DIR": "074",
    "01 MIN AVG SPD": "9",
    "01 MIN PEAK DIR": "074",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "049",
    "10 MIN PEAK SPD": "13",
    DEV: "11",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002SE",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "90",
    AV: "01",
    "01 MIN AVG DIR": "076",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "070",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "062",
    "10 MIN PEAK SPD": "12",
    DEV: "12",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002SE",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "082",
    "01 MIN AVG SPD": "7",
    "01 MIN PEAK DIR": "095",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "047",
    "10 MIN PEAK SPD": "12",
    DEV: "14",
    TMP: "76.5",
    DP: "67.6",
    RH: "74",
    DIF: "-.5",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002SE",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "068",
    "01 MIN AVG SPD": "4",
    "01 MIN PEAK DIR": "075",
    "01 PEAK SPD": "7",
    "10 MIN PEAK DIR": "027",
    "10 MIN PEAK SPD": "10",
    DEV: "19",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0002SE",
    PREVAILING: "SE",
    LAT: "28.4443",
    LON: "-80.5620",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "77.0",
    DP: "68.5",
    RH: "75",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0003",
    PREVAILING: "",
    LAT: "28.4537",
    LON: "-80.5285",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "066",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "066",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "062",
    "10 MIN PEAK SPD": "12",
    DEV: "5",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "999",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0003",
    PREVAILING: "",
    LAT: "28.4537",
    LON: "-80.5285",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "065",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "061",
    "01 PEAK SPD": "8",
    "10 MIN PEAK DIR": "061",
    "10 MIN PEAK SPD": "9",
    DEV: "15",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0003",
    PREVAILING: "",
    LAT: "28.4537",
    LON: "-80.5285",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "84.4",
    SLMOIST: "9.5",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006NW",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "204",
    AV: "01",
    "01 MIN AVG DIR": "066",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "066",
    "01 PEAK SPD": "13",
    "10 MIN PEAK DIR": "065",
    "10 MIN PEAK SPD": "14",
    DEV: "4",
    TMP: "77.8",
    DP: "71.1",
    RH: "80",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006NW",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "162",
    AV: "01",
    "01 MIN AVG DIR": "064",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "064",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "062",
    "10 MIN PEAK SPD": "14",
    DEV: "5",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006NW",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "071",
    "01 MIN AVG SPD": "9",
    "01 MIN PEAK DIR": "065",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "070",
    "10 MIN PEAK SPD": "13",
    DEV: "14",
    TMP: "78.4",
    DP: "70.2",
    RH: "76",
    DIF: "-1.1",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006NW",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "056",
    "01 MIN AVG SPD": "7",
    "01 MIN PEAK DIR": "054",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "071",
    "10 MIN PEAK SPD": "12",
    DEV: "17",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006NW",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "79.5",
    DP: "70.5",
    RH: "74",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "79.0",
    SLMOIST: "4.4",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006SE",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "204",
    AV: "01",
    "01 MIN AVG DIR": "060",
    "01 MIN AVG SPD": "11",
    "01 MIN PEAK DIR": "058",
    "01 PEAK SPD": "13",
    "10 MIN PEAK DIR": "062",
    "10 MIN PEAK SPD": "14",
    DEV: "4",
    TMP: "75.7",
    DP: "68.4",
    RH: "78",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006SE",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "162",
    AV: "01",
    "01 MIN AVG DIR": "062",
    "01 MIN AVG SPD": "11",
    "01 MIN PEAK DIR": "059",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "063",
    "10 MIN PEAK SPD": "13",
    DEV: "6",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006SE",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "056",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "043",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "051",
    "10 MIN PEAK SPD": "12",
    DEV: "16",
    TMP: "78.2",
    DP: "71.2",
    RH: "79",
    DIF: "-1.8",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006SE",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "046",
    "01 MIN AVG SPD": "7",
    "01 MIN PEAK DIR": "050",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "048",
    "10 MIN PEAK SPD": "12",
    DEV: "20",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0006SE",
    PREVAILING: "SE",
    LAT: "28.5130",
    LON: "-80.5613",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "80.0",
    DP: "71.0",
    RH: "74",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0015",
    PREVAILING: "",
    LAT: "28.7029",
    LON: "-80.6679",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "091",
    "01 MIN AVG SPD": "9",
    "01 MIN PEAK DIR": "085",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "085",
    "10 MIN PEAK SPD": "11",
    DEV: "4",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0015",
    PREVAILING: "",
    LAT: "28.7029",
    LON: "-80.6679",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "77.8",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0022",
    PREVAILING: "",
    LAT: "28.7975",
    LON: "-80.7378",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0022",
    PREVAILING: "",
    LAT: "28.7975",
    LON: "-80.7378",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0108",
    PREVAILING: "",
    LAT: "28.5359",
    LON: "-80.5748",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "073",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "077",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "085",
    "10 MIN PEAK SPD": "13",
    DEV: "11",
    TMP: "78.1",
    DP: "70.7",
    RH: "78",
    DIF: "-3.1",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0108",
    PREVAILING: "",
    LAT: "28.5359",
    LON: "-80.5748",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "071",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "068",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "063",
    "10 MIN PEAK SPD": "12",
    DEV: "15",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0108",
    PREVAILING: "",
    LAT: "28.5359",
    LON: "-80.5748",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "81.2",
    DP: "71.3",
    RH: "72",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "84.0",
    SLMOIST: "3.3",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110NW",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "204",
    AV: "01",
    "01 MIN AVG DIR": "063",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "061",
    "01 PEAK SPD": "14",
    "10 MIN PEAK DIR": "050",
    "10 MIN PEAK SPD": "15",
    DEV: "8",
    TMP: "76.3",
    DP: "67.8",
    RH: "75",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110NW",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "162",
    AV: "01",
    "01 MIN AVG DIR": "065",
    "01 MIN AVG SPD": "13",
    "01 MIN PEAK DIR": "069",
    "01 PEAK SPD": "14",
    "10 MIN PEAK DIR": "068",
    "10 MIN PEAK SPD": "15",
    DEV: "9",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110NW",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "058",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "064",
    "01 PEAK SPD": "15",
    "10 MIN PEAK DIR": "046",
    "10 MIN PEAK SPD": "16",
    DEV: "13",
    TMP: "79.6",
    DP: "68.1",
    RH: "68",
    DIF: "-.5",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110NW",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "051",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "047",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "047",
    "10 MIN PEAK SPD": "12",
    DEV: "22",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110NW",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "80.1",
    DP: "70.7",
    RH: "73",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "75.9",
    SLMOIST: "7.2",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110SE",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "204",
    AV: "01",
    "01 MIN AVG DIR": "062",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "068",
    "01 PEAK SPD": "14",
    "10 MIN PEAK DIR": "049",
    "10 MIN PEAK SPD": "15",
    DEV: "8",
    TMP: "77.2",
    DP: "68.7",
    RH: "75",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110SE",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "162",
    AV: "01",
    "01 MIN AVG DIR": "060",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "061",
    "01 PEAK SPD": "14",
    "10 MIN PEAK DIR": "062",
    "10 MIN PEAK SPD": "14",
    DEV: "8",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110SE",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "057",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "059",
    "01 PEAK SPD": "14",
    "10 MIN PEAK DIR": "054",
    "10 MIN PEAK SPD": "16",
    DEV: "13",
    TMP: "77.3",
    DP: "68.0",
    RH: "73",
    DIF: "-2.6",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110SE",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "041",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "033",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "033",
    "10 MIN PEAK SPD": "12",
    DEV: "28",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0110SE",
    PREVAILING: "SE",
    LAT: "28.5697",
    LON: "-80.5864",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "79.9",
    DP: "69.7",
    RH: "71",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0211",
    PREVAILING: "",
    LAT: "28.6061",
    LON: "-80.6214",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "090",
    "01 MIN AVG SPD": "7",
    "01 MIN PEAK DIR": "090",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "066",
    "10 MIN PEAK SPD": "13",
    DEV: "16",
    TMP: "82.1",
    DP: "66.3",
    RH: "67",
    DIF: ".9",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0211",
    PREVAILING: "",
    LAT: "28.6061",
    LON: "-80.6214",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "082",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "085",
    "01 PEAK SPD": "9",
    "10 MIN PEAK DIR": "072",
    "10 MIN PEAK SPD": "11",
    DEV: "16",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0211",
    PREVAILING: "",
    LAT: "28.6061",
    LON: "-80.6214",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "81.2",
    DP: "70.9",
    RH: "71",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "77.2",
    SLMOIST: "7.5",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0300",
    PREVAILING: "",
    LAT: "28.4048",
    LON: "-80.6519",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0300",
    PREVAILING: "",
    LAT: "28.4048",
    LON: "-80.6519",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0303",
    PREVAILING: "",
    LAT: "28.4600",
    LON: "-80.5711",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "053",
    "01 MIN AVG SPD": "4",
    "01 MIN PEAK DIR": "054",
    "01 PEAK SPD": "7",
    "10 MIN PEAK DIR": "047",
    "10 MIN PEAK SPD": "13",
    DEV: "16",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "999",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0303",
    PREVAILING: "",
    LAT: "28.4600",
    LON: "-80.5711",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "074",
    "01 MIN AVG SPD": "2",
    "01 MIN PEAK DIR": "072",
    "01 PEAK SPD": "4",
    "10 MIN PEAK DIR": "037",
    "10 MIN PEAK SPD": "10",
    DEV: "21",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0303",
    PREVAILING: "",
    LAT: "28.4600",
    LON: "-80.5711",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "77.2",
    DP: "69.8",
    RH: "78",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "999",
    SLMOIST: "999",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0311",
    PREVAILING: "",
    LAT: "28.6028",
    LON: "-80.6414",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "074",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "070",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "067",
    "10 MIN PEAK SPD": "13",
    DEV: "13",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "999",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0311",
    PREVAILING: "",
    LAT: "28.6028",
    LON: "-80.6414",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "069",
    "01 MIN AVG SPD": "5",
    "01 MIN PEAK DIR": "060",
    "01 PEAK SPD": "8",
    "10 MIN PEAK DIR": "067",
    "10 MIN PEAK SPD": "11",
    DEV: "17",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0311",
    PREVAILING: "",
    LAT: "28.6028",
    LON: "-80.6414",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "79.6",
    DP: "69.4",
    RH: "71",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "79.2",
    SLMOIST: "8.3",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313NE",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "492",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "999",
    DP: "999",
    RH: "75",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313NE",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "394",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313NE",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "295",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313NE",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "204",
    AV: "01",
    "01 MIN AVG DIR": "069",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "065",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "087",
    "10 MIN PEAK SPD": "15",
    DEV: "11",
    TMP: "76.7",
    DP: "68.6",
    RH: "76",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313NE",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "162",
    AV: "01",
    "01 MIN AVG DIR": "068",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "060",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "076",
    "10 MIN PEAK SPD": "15",
    DEV: "11",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313NE",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "060",
    "01 MIN AVG SPD": "9",
    "01 MIN PEAK DIR": "060",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "069",
    "10 MIN PEAK SPD": "15",
    DEV: "15",
    TMP: "78.7",
    DP: "69.7",
    RH: "74",
    DIF: "-1.8",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313NE",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "074",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "078",
    "01 PEAK SPD": "8",
    "10 MIN PEAK DIR": "107",
    "10 MIN PEAK SPD": "13",
    DEV: "21",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313NE",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "80.5",
    DP: "71.1",
    RH: "73",
    DIF: "",
    PRE: "1014.7",
    DIFRAD: "986.0",
    REFRAD: "172.0",
    SLTEMP: "72.9",
    SLMOIST: "8.6",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313SW",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "492",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313SW",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "394",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313SW",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "295",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313SW",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "204",
    AV: "01",
    "01 MIN AVG DIR": "069",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "053",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "080",
    "10 MIN PEAK SPD": "16",
    DEV: "10",
    TMP: "78.3",
    DP: "67.3",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313SW",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "162",
    AV: "01",
    "01 MIN AVG DIR": "076",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "074",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "077",
    "10 MIN PEAK SPD": "15",
    DEV: "10",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313SW",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "064",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "065",
    "01 PEAK SPD": "13",
    "10 MIN PEAK DIR": "068",
    "10 MIN PEAK SPD": "16",
    DEV: "13",
    TMP: "79.1",
    DP: "70.1",
    RH: "74",
    DIF: "-1.5",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313SW",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "070",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "082",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "098",
    "10 MIN PEAK SPD": "15",
    DEV: "19",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0313SW",
    PREVAILING: "SW",
    LAT: "28.6256",
    LON: "-80.6571",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "80.6",
    DP: "70.7",
    RH: "72",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0403",
    PREVAILING: "",
    LAT: "28.4586",
    LON: "-80.5923",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "057",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "051",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "066",
    "10 MIN PEAK SPD": "13",
    DEV: "12",
    TMP: "76.4",
    DP: "69.4",
    RH: "79",
    DIF: "-.7",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0403",
    PREVAILING: "",
    LAT: "28.4586",
    LON: "-80.5923",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "065",
    "01 MIN AVG SPD": "4",
    "01 MIN PEAK DIR": "070",
    "01 PEAK SPD": "9",
    "10 MIN PEAK DIR": "068",
    "10 MIN PEAK SPD": "10",
    DEV: "18",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0403",
    PREVAILING: "",
    LAT: "28.4586",
    LON: "-80.5923",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "77.1",
    DP: "71.2",
    RH: "82",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "77.0",
    SLMOIST: "4.1",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0412",
    PREVAILING: "",
    LAT: "28.6063",
    LON: "-80.6739",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "041",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "041",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "044",
    "10 MIN PEAK SPD": "13",
    DEV: "16",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "999",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0412",
    PREVAILING: "",
    LAT: "28.6063",
    LON: "-80.6739",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "070",
    "01 MIN AVG SPD": "7",
    "01 MIN PEAK DIR": "070",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "061",
    "10 MIN PEAK SPD": "12",
    DEV: "18",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0412",
    PREVAILING: "",
    LAT: "28.6063",
    LON: "-80.6739",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "79.6",
    DP: "68.5",
    RH: "69",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "77.0",
    SLMOIST: "7.7",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0415",
    PREVAILING: "",
    LAT: "28.6586",
    LON: "-80.6998",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "000",
    "01 MIN AVG SPD": "0",
    "01 MIN PEAK DIR": "035",
    "01 PEAK SPD": "3",
    "10 MIN PEAK DIR": "026",
    "10 MIN PEAK SPD": "5",
    DEV: "20",
    TMP: "78.2",
    DP: "66.4",
    RH: "67",
    DIF: "-2.7",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0415",
    PREVAILING: "",
    LAT: "28.6586",
    LON: "-80.6998",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "064",
    "01 MIN AVG SPD": "4",
    "01 MIN PEAK DIR": "059",
    "01 PEAK SPD": "9",
    "10 MIN PEAK DIR": "031",
    "10 MIN PEAK SPD": "10",
    DEV: "26",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0415",
    PREVAILING: "",
    LAT: "28.6586",
    LON: "-80.6998",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "80.9",
    DP: "68.0",
    RH: "65",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "83.3",
    SLMOIST: "11.5",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0418",
    PREVAILING: "",
    LAT: "28.7055",
    LON: "-80.7265",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "099",
    "01 MIN AVG SPD": "7",
    "01 MIN PEAK DIR": "116",
    "01 PEAK SPD": "9",
    "10 MIN PEAK DIR": "086",
    "10 MIN PEAK SPD": "12",
    DEV: "14",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0418",
    PREVAILING: "",
    LAT: "28.7055",
    LON: "-80.7265",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "81.0",
    DP: "69.9",
    RH: "69",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0421",
    PREVAILING: "",
    LAT: "28.7755",
    LON: "-80.8043",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0421",
    PREVAILING: "",
    LAT: "28.7755",
    LON: "-80.8043",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0506",
    PREVAILING: "",
    LAT: "28.5158",
    LON: "-80.6400",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "074",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "052",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "085",
    "10 MIN PEAK SPD": "12",
    DEV: "15",
    TMP: "78.3",
    DP: "68.5",
    RH: "72",
    DIF: "-1.7",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0506",
    PREVAILING: "",
    LAT: "28.5158",
    LON: "-80.6400",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "080",
    "01 MIN AVG SPD": "7",
    "01 MIN PEAK DIR": "070",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "070",
    "10 MIN PEAK SPD": "11",
    DEV: "17",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0506",
    PREVAILING: "",
    LAT: "28.5158",
    LON: "-80.6400",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "80.0",
    DP: "69.8",
    RH: "71",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "76.8",
    SLMOIST: "9.4",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0509",
    PREVAILING: "",
    LAT: "28.5623",
    LON: "-80.6694",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "069",
    "01 MIN AVG SPD": "9",
    "01 MIN PEAK DIR": "074",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "056",
    "10 MIN PEAK SPD": "13",
    DEV: "17",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "999",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0509",
    PREVAILING: "",
    LAT: "28.5623",
    LON: "-80.6694",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "064",
    "01 MIN AVG SPD": "3",
    "01 MIN PEAK DIR": "087",
    "01 PEAK SPD": "6",
    "10 MIN PEAK DIR": "080",
    "10 MIN PEAK SPD": "9",
    DEV: "31",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0509",
    PREVAILING: "",
    LAT: "28.5623",
    LON: "-80.6694",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "79.7",
    DP: "69.1",
    RH: "70",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "80.1",
    SLMOIST: "14.1",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0511",
    PREVAILING: "",
    LAT: "28.5986",
    LON: "-80.6817",
    HGT: "30",
    AV: "01",
    "01 MIN AVG DIR": "083",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "085",
    "01 PEAK SPD": "13",
    "10 MIN PEAK DIR": "089",
    "10 MIN PEAK SPD": "14",
    DEV: "16",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0511",
    PREVAILING: "",
    LAT: "28.5986",
    LON: "-80.6817",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "79.6",
    DP: "70.6",
    RH: "74",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "75.6",
    SLMOIST: "17.8",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0512",
    PREVAILING: "",
    LAT: "28.6160",
    LON: "-80.6930",
    HGT: "30",
    AV: "01",
    "01 MIN AVG DIR": "087",
    "01 MIN AVG SPD": "9",
    "01 MIN PEAK DIR": "083",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "048",
    "10 MIN PEAK SPD": "12",
    DEV: "15",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0512",
    PREVAILING: "",
    LAT: "28.6160",
    LON: "-80.6930",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "78.3",
    DP: "68.1",
    RH: "71",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "76.3",
    SLMOIST: "17.0",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0513",
    PREVAILING: "",
    LAT: "28.6308",
    LON: "-80.7027",
    HGT: "30",
    AV: "01",
    "01 MIN AVG DIR": "050",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "050",
    "01 PEAK SPD": "11",
    "10 MIN PEAK DIR": "068",
    "10 MIN PEAK SPD": "16",
    DEV: "11",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0513",
    PREVAILING: "",
    LAT: "28.6308",
    LON: "-80.7027",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "78.9",
    DP: "72.2",
    RH: "80",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "76.5",
    SLMOIST: "9.1",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0714",
    PREVAILING: "",
    LAT: "28.6431",
    LON: "-80.7482",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "070",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "072",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "077",
    "10 MIN PEAK SPD": "10",
    DEV: "17",
    TMP: "77.6",
    DP: "68.7",
    RH: "74",
    DIF: "-1.1",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0714",
    PREVAILING: "",
    LAT: "28.6431",
    LON: "-80.7482",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "083",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "090",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "090",
    "10 MIN PEAK SPD": "12",
    DEV: "24",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0714",
    PREVAILING: "",
    LAT: "28.6431",
    LON: "-80.7482",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "78.7",
    DP: "69.3",
    RH: "73",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "78.8",
    SLMOIST: "11.5",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0803",
    PREVAILING: "",
    LAT: "28.4632",
    LON: "-80.6702",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "069",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "063",
    "01 PEAK SPD": "8",
    "10 MIN PEAK DIR": "065",
    "10 MIN PEAK SPD": "10",
    DEV: "16",
    TMP: "76.6",
    DP: "69.2",
    RH: "78",
    DIF: "-.6",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0803",
    PREVAILING: "",
    LAT: "28.4632",
    LON: "-80.6702",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "084",
    "01 MIN AVG SPD": "4",
    "01 MIN PEAK DIR": "054",
    "01 PEAK SPD": "6",
    "10 MIN PEAK DIR": "107",
    "10 MIN PEAK SPD": "8",
    DEV: "24",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0803",
    PREVAILING: "",
    LAT: "28.4632",
    LON: "-80.6702",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "77.2",
    DP: "70.9",
    RH: "81",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "82.0",
    SLMOIST: "8.3",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0805",
    PREVAILING: "",
    LAT: "28.5184",
    LON: "-80.6963",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "058",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "058",
    "01 PEAK SPD": "13",
    "10 MIN PEAK DIR": "058",
    "10 MIN PEAK SPD": "13",
    DEV: "16",
    TMP: "77.8",
    DP: "68.5",
    RH: "73",
    DIF: "-1.7",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0805",
    PREVAILING: "",
    LAT: "28.5184",
    LON: "-80.6963",
    HGT: "12",
    AV: "01",
    "01 MIN AVG DIR": "061",
    "01 MIN AVG SPD": "6",
    "01 MIN PEAK DIR": "052",
    "01 PEAK SPD": "10",
    "10 MIN PEAK DIR": "052",
    "10 MIN PEAK SPD": "10",
    DEV: "16",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0805",
    PREVAILING: "",
    LAT: "28.5184",
    LON: "-80.6963",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "79.5",
    DP: "69.3",
    RH: "71",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "999",
    SLMOIST: "999",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0819",
    PREVAILING: "",
    LAT: "28.7464",
    LON: "-80.8707",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "0819",
    PREVAILING: "",
    LAT: "28.7464",
    LON: "-80.8707",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "1000",
    PREVAILING: "",
    LAT: "28.4079",
    LON: "-80.7604",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "099",
    "01 MIN AVG SPD": "5",
    "01 MIN PEAK DIR": "087",
    "01 PEAK SPD": "7",
    "10 MIN PEAK DIR": "102",
    "10 MIN PEAK SPD": "11",
    DEV: "13",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "1000",
    PREVAILING: "",
    LAT: "28.4079",
    LON: "-80.7604",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "75.0",
    DP: "72.2",
    RH: "91",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "1007",
    PREVAILING: "",
    LAT: "28.5272",
    LON: "-80.7742",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "083",
    "01 MIN AVG SPD": "11",
    "01 MIN PEAK DIR": "081",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "085",
    "10 MIN PEAK SPD": "13",
    DEV: "12",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "1007",
    PREVAILING: "",
    LAT: "28.5272",
    LON: "-80.7742",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "78.9",
    DP: "70.7",
    RH: "76",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "1012",
    PREVAILING: "",
    LAT: "28.6056",
    LON: "-80.8248",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "1012",
    PREVAILING: "",
    LAT: "28.6056",
    LON: "-80.8248",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "1204",
    PREVAILING: "",
    LAT: "28.4843",
    LON: "-80.7856",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "1204",
    PREVAILING: "",
    LAT: "28.4843",
    LON: "-80.7856",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "9404",
    PREVAILING: "",
    LAT: "28.3382",
    LON: "-80.7321",
    HGT: "54",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "9404",
    PREVAILING: "",
    LAT: "28.3382",
    LON: "-80.7321",
    HGT: "6",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC37E",
    PREVAILING: "",
    LAT: "28.5310",
    LON: "-80.5642",
    HGT: "376",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC37E",
    PREVAILING: "",
    LAT: "28.5310",
    LON: "-80.5642",
    HGT: "196",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC37W",
    PREVAILING: "",
    LAT: "28.5313",
    LON: "-80.5648",
    HGT: "376",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC37W",
    PREVAILING: "",
    LAT: "28.5313",
    LON: "-80.5648",
    HGT: "196",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39ANE",
    PREVAILING: "",
    LAT: "0.0000",
    LON: "0.0000",
    HGT: "192",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39ANW",
    PREVAILING: "",
    LAT: "0.0000",
    LON: "0.0000",
    HGT: "192",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39ASE",
    PREVAILING: "",
    LAT: "0.0000",
    LON: "0.0000",
    HGT: "192",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BNE",
    PREVAILING: "",
    LAT: "28.6278",
    LON: "-80.6223",
    HGT: "457",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "999",
    DP: "999",
    RH: "999",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BNE",
    PREVAILING: "",
    LAT: "28.6278",
    LON: "-80.6223",
    HGT: "382",
    AV: "01",
    "01 MIN AVG DIR": "075",
    "01 MIN AVG SPD": "11",
    "01 MIN PEAK DIR": "075",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "077",
    "10 MIN PEAK SPD": "12",
    DEV: "4",
    TMP: "75.0",
    DP: "67.0",
    RH: "75",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BNE",
    PREVAILING: "",
    LAT: "28.6278",
    LON: "-80.6223",
    HGT: "257",
    AV: "01",
    "01 MIN AVG DIR": "068",
    "01 MIN AVG SPD": "11",
    "01 MIN PEAK DIR": "066",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "060",
    "10 MIN PEAK SPD": "12",
    DEV: "3",
    TMP: "77.0",
    DP: "67.0",
    RH: "74",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BNE",
    PREVAILING: "",
    LAT: "28.6278",
    LON: "-80.6223",
    HGT: "132",
    AV: "01",
    "01 MIN AVG DIR": "073",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "066",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "085",
    "10 MIN PEAK SPD": "13",
    DEV: "4",
    TMP: "78.0",
    DP: "67.0",
    RH: "71",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BNW",
    PREVAILING: "",
    LAT: "28.6262",
    LON: "-80.6219",
    HGT: "457",
    AV: "01",
    "01 MIN AVG DIR": "076",
    "01 MIN AVG SPD": "13",
    "01 MIN PEAK DIR": "076",
    "01 PEAK SPD": "13",
    "10 MIN PEAK DIR": "076",
    "10 MIN PEAK SPD": "14",
    DEV: "3",
    TMP: "75.0",
    DP: "67.0",
    RH: "77",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BNW",
    PREVAILING: "",
    LAT: "28.6262",
    LON: "-80.6219",
    HGT: "382",
    AV: "01",
    "01 MIN AVG DIR": "072",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "073",
    "01 PEAK SPD": "13",
    "10 MIN PEAK DIR": "071",
    "10 MIN PEAK SPD": "14",
    DEV: "4",
    TMP: "76.0",
    DP: "68.0",
    RH: "75",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BNW",
    PREVAILING: "",
    LAT: "28.6262",
    LON: "-80.6219",
    HGT: "257",
    AV: "01",
    "01 MIN AVG DIR": "071",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "069",
    "01 PEAK SPD": "14",
    "10 MIN PEAK DIR": "084",
    "10 MIN PEAK SPD": "14",
    DEV: "4",
    TMP: "77.0",
    DP: "69.0",
    RH: "77",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BNW",
    PREVAILING: "",
    LAT: "28.6262",
    LON: "-80.6219",
    HGT: "132",
    AV: "01",
    "01 MIN AVG DIR": "078",
    "01 MIN AVG SPD": "11",
    "01 MIN PEAK DIR": "079",
    "01 PEAK SPD": "15",
    "10 MIN PEAK DIR": "079",
    "10 MIN PEAK SPD": "15",
    DEV: "4",
    TMP: "77.0",
    DP: "68.0",
    RH: "72",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BSW",
    PREVAILING: "",
    LAT: "28.6276",
    LON: "-80.6196",
    HGT: "457",
    AV: "01",
    "01 MIN AVG DIR": "079",
    "01 MIN AVG SPD": "11",
    "01 MIN PEAK DIR": "083",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "083",
    "10 MIN PEAK SPD": "13",
    DEV: "2",
    TMP: "75.0",
    DP: "67.0",
    RH: "77",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BSW",
    PREVAILING: "",
    LAT: "28.6276",
    LON: "-80.6196",
    HGT: "382",
    AV: "01",
    "01 MIN AVG DIR": "067",
    "01 MIN AVG SPD": "11",
    "01 MIN PEAK DIR": "067",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "067",
    "10 MIN PEAK SPD": "13",
    DEV: "4",
    TMP: "75.0",
    DP: "67.0",
    RH: "76",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BSW",
    PREVAILING: "",
    LAT: "28.6276",
    LON: "-80.6196",
    HGT: "257",
    AV: "01",
    "01 MIN AVG DIR": "069",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "068",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "075",
    "10 MIN PEAK SPD": "13",
    DEV: "3",
    TMP: "76.0",
    DP: "67.0",
    RH: "74",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC39BSW",
    PREVAILING: "",
    LAT: "28.6276",
    LON: "-80.6196",
    HGT: "132",
    AV: "01",
    "01 MIN AVG DIR": "066",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "066",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "064",
    "10 MIN PEAK SPD": "13",
    DEV: "2",
    TMP: "78.0",
    DP: "69.0",
    RH: "74",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC40N",
    PREVAILING: "",
    LAT: "28.5625",
    LON: "-80.5775",
    HGT: "150",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC40SE",
    PREVAILING: "",
    LAT: "28.5613",
    LON: "-80.5769",
    HGT: "150",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC40SW",
    PREVAILING: "",
    LAT: "28.5614",
    LON: "-80.5777",
    HGT: "150",
    AV: "01",
    "01 MIN AVG DIR": "999",
    "01 MIN AVG SPD": "999",
    "01 MIN PEAK DIR": "999",
    "01 PEAK SPD": "999",
    "10 MIN PEAK DIR": "999",
    "10 MIN PEAK SPD": "999",
    DEV: "999",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC41NW",
    PREVAILING: "",
    LAT: "28.5840",
    LON: "-80.5832",
    HGT: "230",
    AV: "01",
    "01 MIN AVG DIR": "071",
    "01 MIN AVG SPD": "13",
    "01 MIN PEAK DIR": "070",
    "01 PEAK SPD": "13",
    "10 MIN PEAK DIR": "071",
    "10 MIN PEAK SPD": "14",
    DEV: "3",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC41NW",
    PREVAILING: "",
    LAT: "28.5840",
    LON: "-80.5832",
    HGT: "50",
    AV: "01",
    "01 MIN AVG DIR": "072",
    "01 MIN AVG SPD": "10",
    "01 MIN PEAK DIR": "066",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "071",
    "10 MIN PEAK SPD": "13",
    DEV: "8",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC41SE",
    PREVAILING: "",
    LAT: "28.5828",
    LON: "-80.5826",
    HGT: "230",
    AV: "01",
    "01 MIN AVG DIR": "062",
    "01 MIN AVG SPD": "12",
    "01 MIN PEAK DIR": "063",
    "01 PEAK SPD": "13",
    "10 MIN PEAK DIR": "053",
    "10 MIN PEAK SPD": "15",
    DEV: "3",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "LC41SE",
    PREVAILING: "",
    LAT: "28.5828",
    LON: "-80.5826",
    HGT: "50",
    AV: "01",
    "01 MIN AVG DIR": "063",
    "01 MIN AVG SPD": "8",
    "01 MIN PEAK DIR": "066",
    "01 PEAK SPD": "12",
    "10 MIN PEAK DIR": "081",
    "10 MIN PEAK SPD": "14",
    DEV: "8",
    TMP: "",
    DP: "",
    RH: "",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "VAB_IN1",
    PREVAILING: "",
    LAT: "28.5861",
    LON: "-80.6513",
    HGT: "359",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "77.4",
    DP: "69.2",
    RH: "76",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: "VAB_IN1",
    PREVAILING: "",
    LAT: "28.5861",
    LON: "-80.6513",
    HGT: "195",
    AV: "01",
    "01 MIN AVG DIR": "",
    "01 MIN AVG SPD": "",
    "01 MIN PEAK DIR": "",
    "01 PEAK SPD": "",
    "10 MIN PEAK DIR": "",
    "10 MIN PEAK SPD": "",
    DEV: "",
    TMP: "78.1",
    DP: "68.7",
    RH: "73",
    DIF: "",
    PRE: "",
    DIFRAD: "",
    REFRAD: "",
    SLTEMP: "",
    SLMOIST: "",
    RAINRATE: "",
    RAINHR: ""
  },
  {
    TOWER: ""
  },
  {
    TOWER: ""
  }
], Js = { class: "wrapper" }, Ys = /* @__PURE__ */ Me("h2", null, "WINDS Data", -1), ks = { class: "table-wrapper" }, Xs = {
  __name: "WeatherData",
  props: {
    partId: String
  },
  setup(e) {
    const t = e, I = {
      Tower_0003_eiffel: "0003",
      "Tower_0006_eiffel.002": "0006NW",
      "Tower_0303_eiffel.001": "0303"
    }, n = ZI([{ TOWER: "0", Status: "Loading..." }]), A = ZI("0");
    console.log("weatherData", n.value), pt(
      () => t.partId,
      () => {
        A.value = I[t.partId], n.value = qs.filter((s) => s.TOWER === A.value).sort((s, P) => P.HGT - s.HGT).map((s) => {
          const { LAT: P, LON: E, AVG: o, TOWER: f, AV: a, DIF: d, ...G } = s;
          return G;
        }).map((s) => {
          const P = {};
          return Object.keys(s).forEach((E) => {
            s[E] !== "" && (P[E] = s[E]);
          }), P;
        }).map((s) => {
          const { PREVAILING: P, ...E } = s;
          return { PREV: P, ...E };
        });
      },
      { immediate: !0 }
    );
    const R = lA(() => n.value.length > 0 ? Object.keys(n.value[0]) : []);
    return (s, P) => (Ke(), pe("div", Js, [
      Ys,
      Me("h5", null, "Tower: " + Jt(A.value), 1),
      Me("div", ks, [
        Me("table", null, [
          Me("thead", null, [
            Me("tr", null, [
              (Ke(!0), pe(Ie, null, Zt(vn(R), (E) => (Ke(), pe("th", { key: E }, Jt(E), 1))), 128))
            ])
          ]),
          Me("tbody", null, [
            (Ke(!0), pe(Ie, null, Zt(n.value, (E) => (Ke(), pe("tr", {
              key: E.HGT
            }, [
              (Ke(!0), pe(Ie, null, Zt(Object.values(E), (o) => (Ke(), pe("td", { key: o }, Jt(o), 1))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}, Zs = `.wrapper{display:flex;flex-direction:column;align-items:center;height:100vh;background-color:#000}.wrapper h1,h2,h5{color:var(--pal-v1-status-e-200)}.table-wrapper{width:100%;overflow-x:auto;scrollbar-width:none}table{width:100%;border:1px solid var(--pal-v1-neutrals-300);font-size:.75rem;border-collapse:collapse;color:#fff}table thead{background-color:var(--pal-v1-status-e-200)}table tr{border-top:1px solid var(--pal-v1-text-600);transition:all ease-in-out .1s}table th{text-align:left;padding:.5rem}table td{padding:.5rem}table tr:hover{background-color:var(--pal-v1-accent-500)}
`, Qs = (e, t) => {
  const I = e.__vccOpts || e;
  for (const [n, A] of t)
    I[n] = A;
  return I;
}, e0 = {
  __name: "App.ce",
  props: {
    partId: String
  },
  setup(e) {
    const t = e;
    return (I, n) => (Ke(), pe("main", null, [
      Se(Xs, {
        partId: t.partId
      }, null, 8, ["partId"])
    ]));
  }
}, t0 = /* @__PURE__ */ Qs(e0, [["styles", [Zs]]]), I0 = zs(t0);
export {
  I0 as default
};
