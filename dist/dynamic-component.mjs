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
      const n = e[I], A = U(n) ? uA(n) : fI(n);
      if (A)
        for (const R in A)
          t[R] = A[R];
    }
    return t;
  } else {
    if (U(e))
      return e;
    if (w(e))
      return e;
  }
}
const cA = /;(?![^(]*\))/g, fA = /:([^]+)/, MA = /\/\*.*?\*\//gs;
function uA(e) {
  const t = {};
  return e.replace(MA, "").split(cA).forEach((I) => {
    if (I) {
      const n = I.split(fA);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function MI(e) {
  let t = "";
  if (U(e))
    t = e;
  else if (p(e))
    for (let I = 0; I < e.length; I++) {
      const n = MI(e[I]);
      n && (t += n + " ");
    }
  else if (w(e))
    for (const I in e)
      e[I] && (t += I + " ");
  return t.trim();
}
const TA = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", SA = /* @__PURE__ */ cI(TA);
function un(e) {
  return !!e || e === "";
}
const qt = (e) => U(e) ? e : e == null ? "" : p(e) || w(e) && (e.toString === Ln || !G(e.toString)) ? JSON.stringify(e, Tn, 2) : String(e), Tn = (e, t) => t && t.__v_isRef ? Tn(e, t.value) : qe(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((I, [n, A]) => (I[`${n} =>`] = A, I), {})
} : Sn(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : w(t) && !p(t) && !dn(t) ? String(t) : t, C = {}, ze = [], Ee = () => {
}, aA = () => !1, LA = /^on[^a-z]/, _t = (e) => LA.test(e), uI = (e) => e.startsWith("onUpdate:"), Y = Object.assign, TI = (e, t) => {
  const I = e.indexOf(t);
  I > -1 && e.splice(I, 1);
}, dA = Object.prototype.hasOwnProperty, _ = (e, t) => dA.call(e, t), p = Array.isArray, qe = (e) => mt(e) === "[object Map]", Sn = (e) => mt(e) === "[object Set]", G = (e) => typeof e == "function", U = (e) => typeof e == "string", SI = (e) => typeof e == "symbol", w = (e) => e !== null && typeof e == "object", an = (e) => w(e) && G(e.then) && G(e.catch), Ln = Object.prototype.toString, mt = (e) => Ln.call(e), VA = (e) => mt(e).slice(8, -1), dn = (e) => mt(e) === "[object Object]", aI = (e) => U(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ht = /* @__PURE__ */ cI(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), bt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (I) => t[I] || (t[I] = e(I));
}, hA = /-(\w)/g, ue = bt((e) => e.replace(hA, (t, I) => I ? I.toUpperCase() : "")), KA = /\B([A-Z])/g, Re = bt((e) => e.replace(KA, "-$1").toLowerCase()), Vn = bt((e) => e.charAt(0).toUpperCase() + e.slice(1)), Jt = bt((e) => e ? `on${Vn(e)}` : ""), rt = (e, t) => !Object.is(e, t), Yt = (e, t) => {
  for (let I = 0; I < e.length; I++)
    e[I](t);
}, Ot = (e, t, I) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: I
  });
}, pA = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, BI = (e) => {
  const t = U(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let $I;
const GA = () => $I || ($I = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let Ae;
class OA {
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
function FA(e, t = Ae) {
  t && t.active && t.effects.push(e);
}
function HA() {
  return Ae;
}
const LI = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, hn = (e) => (e.w & He) > 0, Kn = (e) => (e.n & He) > 0, gA = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= He;
}, _A = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let I = 0;
    for (let n = 0; n < t.length; n++) {
      const A = t[n];
      hn(A) && !Kn(A) ? A.delete(e) : t[I++] = A, A.w &= ~He, A.n &= ~He;
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
    this.fn = t, this.scheduler = I, this.active = !0, this.deps = [], this.parent = void 0, FA(this, n);
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
      return this.parent = se, se = this, Oe = !0, He = 1 << ++At, At <= RI ? gA(this) : UI(this), this.fn();
    } finally {
      At <= RI && _A(this), He = 1 << --At, se = this.parent, Oe = I, this.parent = void 0, this.deferStop && this.stop();
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
const pn = [];
function Qe() {
  pn.push(Oe), Oe = !1;
}
function et() {
  const e = pn.pop();
  Oe = e === void 0 ? !0 : e;
}
function ee(e, t, I) {
  if (Oe && se) {
    let n = AI.get(e);
    n || AI.set(e, n = /* @__PURE__ */ new Map());
    let A = n.get(I);
    A || n.set(I, A = LI()), Gn(A);
  }
}
function Gn(e, t) {
  let I = !1;
  At <= RI ? Kn(e) || (e.n |= He, I = !hn(e)) : I = !e.has(se), I && (e.add(se), se.deps.push(e));
}
function Se(e, t, I, n, A, R) {
  const s = AI.get(e);
  if (!s)
    return;
  let P = [];
  if (t === "clear")
    P = [...s.values()];
  else if (I === "length" && p(e)) {
    const D = Number(n);
    s.forEach((o, f) => {
      (f === "length" || f >= D) && P.push(o);
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
    const D = [];
    for (const o of P)
      o && D.push(...o);
    rI(LI(D));
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
const mA = /* @__PURE__ */ cI("__proto__,__v_isRef,__isVue"), On = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(SI)
), bA = /* @__PURE__ */ VI(), WA = /* @__PURE__ */ VI(!1, !0), xA = /* @__PURE__ */ VI(!0), qI = /* @__PURE__ */ yA();
function yA() {
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
function CA(e) {
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
    if (A === "__v_raw" && R === (e ? t ? tR : mn : t ? _n : gn).get(n))
      return n;
    const s = p(n);
    if (!e) {
      if (s && _(qI, A))
        return Reflect.get(qI, A, R);
      if (A === "hasOwnProperty")
        return CA;
    }
    const P = Reflect.get(n, A, R);
    return (SI(A) ? On.has(A) : mA(A)) || (e || ee(n, "get", A), t) ? P : J(P) ? s && aI(A) ? P : P.value : w(P) ? e ? bn(P) : pI(P) : P;
  };
}
const wA = /* @__PURE__ */ Fn(), vA = /* @__PURE__ */ Fn(!0);
function Fn(e = !1) {
  return function(I, n, A, R) {
    let s = I[n];
    if (ke(s) && J(s) && !J(A))
      return !1;
    if (!e && (!Ft(A) && !ke(A) && (s = m(s), A = m(A)), !p(I) && J(s) && !J(A)))
      return s.value = A, !0;
    const P = p(I) && aI(n) ? Number(n) < I.length : _(I, n), D = Reflect.set(I, n, A, R);
    return I === m(R) && (P ? rt(A, s) && Se(I, "set", n, A) : Se(I, "add", n, A)), D;
  };
}
function jA(e, t) {
  const I = _(e, t);
  e[t];
  const n = Reflect.deleteProperty(e, t);
  return n && I && Se(e, "delete", t, void 0), n;
}
function BA(e, t) {
  const I = Reflect.has(e, t);
  return (!SI(t) || !On.has(t)) && ee(e, "has", t), I;
}
function $A(e) {
  return ee(e, "iterate", p(e) ? "length" : ve), Reflect.ownKeys(e);
}
const Hn = {
  get: bA,
  set: wA,
  deleteProperty: jA,
  has: BA,
  ownKeys: $A
}, UA = {
  get: xA,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, zA = /* @__PURE__ */ Y({}, Hn, {
  get: WA,
  set: vA
}), hI = (e) => e, Wt = (e) => Reflect.getPrototypeOf(e);
function Tt(e, t, I = !1, n = !1) {
  e = e.__v_raw;
  const A = m(e), R = m(t);
  I || (t !== R && ee(A, "get", t), ee(A, "get", R));
  const { has: s } = Wt(A), P = n ? hI : I ? OI : Pt;
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
  return Wt(t).has.call(t, e) || (t.add(e), Se(t, "add", e, e)), this;
}
function YI(e, t) {
  t = m(t);
  const I = m(this), { has: n, get: A } = Wt(I);
  let R = n.call(I, e);
  R || (e = m(e), R = n.call(I, e));
  const s = A.call(I, e);
  return I.set(e, t), R ? rt(t, s) && Se(I, "set", e, t) : Se(I, "add", e, t), this;
}
function kI(e) {
  const t = m(this), { has: I, get: n } = Wt(t);
  let A = I.call(t, e);
  A || (e = m(e), A = I.call(t, e)), n && n.call(t, e);
  const R = t.delete(e);
  return A && Se(t, "delete", e, void 0), R;
}
function XI() {
  const e = m(this), t = e.size !== 0, I = e.clear();
  return t && Se(e, "clear", void 0, void 0), I;
}
function Lt(e, t) {
  return function(n, A) {
    const R = this, s = R.__v_raw, P = m(s), D = t ? hI : e ? OI : Pt;
    return !e && ee(P, "iterate", ve), s.forEach((o, f) => n.call(A, D(o), D(f), R));
  };
}
function dt(e, t, I) {
  return function(...n) {
    const A = this.__v_raw, R = m(A), s = qe(R), P = e === "entries" || e === Symbol.iterator && s, D = e === "keys" && s, o = A[e](...n), f = I ? hI : t ? OI : Pt;
    return !t && ee(R, "iterate", D ? sI : ve), {
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
function Ve(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function qA() {
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
    add: Ve(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Ve(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Ve(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Ve(
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
    add: Ve(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Ve(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Ve(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Ve(
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
const [JA, YA, kA, XA] = /* @__PURE__ */ qA();
function KI(e, t) {
  const I = t ? e ? XA : kA : e ? YA : JA;
  return (n, A, R) => A === "__v_isReactive" ? !e : A === "__v_isReadonly" ? e : A === "__v_raw" ? n : Reflect.get(_(I, A) && A in n ? I : n, A, R);
}
const ZA = {
  get: /* @__PURE__ */ KI(!1, !1)
}, QA = {
  get: /* @__PURE__ */ KI(!1, !0)
}, eR = {
  get: /* @__PURE__ */ KI(!0, !1)
}, gn = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap(), mn = /* @__PURE__ */ new WeakMap(), tR = /* @__PURE__ */ new WeakMap();
function IR(e) {
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
function nR(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : IR(VA(e));
}
function pI(e) {
  return ke(e) ? e : GI(e, !1, Hn, ZA, gn);
}
function AR(e) {
  return GI(e, !1, zA, QA, _n);
}
function bn(e) {
  return GI(e, !0, UA, eR, mn);
}
function GI(e, t, I, n, A) {
  if (!w(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const R = A.get(e);
  if (R)
    return R;
  const s = nR(e);
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
function Ft(e) {
  return !!(e && e.__v_isShallow);
}
function Wn(e) {
  return Je(e) || ke(e);
}
function m(e) {
  const t = e && e.__v_raw;
  return t ? m(t) : e;
}
function xn(e) {
  return Ot(e, "__v_skip", !0), e;
}
const Pt = (e) => w(e) ? pI(e) : e, OI = (e) => w(e) ? bn(e) : e;
function yn(e) {
  Oe && se && (e = m(e), Gn(e.dep || (e.dep = LI())));
}
function Cn(e, t) {
  e = m(e);
  const I = e.dep;
  I && rI(I);
}
function J(e) {
  return !!(e && e.__v_isRef === !0);
}
function RR(e) {
  return sR(e, !1);
}
function sR(e, t) {
  return J(e) ? e : new rR(e, t);
}
class rR {
  constructor(t, I) {
    this.__v_isShallow = I, this.dep = void 0, this.__v_isRef = !0, this._rawValue = I ? t : m(t), this._value = I ? t : Pt(t);
  }
  get value() {
    return yn(this), this._value;
  }
  set value(t) {
    const I = this.__v_isShallow || Ft(t) || ke(t);
    t = I ? t : m(t), rt(t, this._rawValue) && (this._rawValue = t, this._value = I ? t : Pt(t), Cn(this));
  }
}
function wn(e) {
  return J(e) ? e.value : e;
}
const PR = {
  get: (e, t, I) => wn(Reflect.get(e, t, I)),
  set: (e, t, I, n) => {
    const A = e[t];
    return J(A) && !J(I) ? (A.value = I, !0) : Reflect.set(e, t, I, n);
  }
};
function vn(e) {
  return Je(e) ? e : new Proxy(e, PR);
}
var jn;
class ER {
  constructor(t, I, n, A) {
    this._setter = I, this.dep = void 0, this.__v_isRef = !0, this[jn] = !1, this._dirty = !0, this.effect = new dI(t, () => {
      this._dirty || (this._dirty = !0, Cn(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !A, this.__v_isReadonly = n;
  }
  get value() {
    const t = m(this);
    return yn(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
jn = "__v_isReadonly";
function DR(e, t, I = !1) {
  let n, A;
  const R = G(e);
  return R ? (n = e, A = Ee) : (n = e.get, A = e.set), new ER(n, A, R || !A, I);
}
function Fe(e, t, I, n) {
  let A;
  try {
    A = n ? e(...n) : e();
  } catch (R) {
    xt(R, t, I);
  }
  return A;
}
function De(e, t, I, n) {
  if (G(e)) {
    const R = Fe(e, t, I, n);
    return R && an(R) && R.catch((s) => {
      xt(s, t, I);
    }), R;
  }
  const A = [];
  for (let R = 0; R < e.length; R++)
    A.push(De(e[R], t, I, n));
  return A;
}
function xt(e, t, I, n = !0) {
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
    const D = t.appContext.config.errorHandler;
    if (D) {
      Fe(D, null, 10, [e, s, P]);
      return;
    }
  }
  iR(e, I, A, n);
}
function iR(e, t, I, n = !0) {
  console.error(e);
}
let Et = !1, PI = !1;
const q = [];
let ce = 0;
const Ye = [];
let Me = null, Ce = 0;
const Bn = /* @__PURE__ */ Promise.resolve();
let FI = null;
function $n(e) {
  const t = FI || Bn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function oR(e) {
  let t = ce + 1, I = q.length;
  for (; t < I; ) {
    const n = t + I >>> 1;
    Dt(q[n]) < e ? t = n + 1 : I = n;
  }
  return t;
}
function HI(e) {
  (!q.length || !q.includes(e, Et && e.allowRecurse ? ce + 1 : ce)) && (e.id == null ? q.push(e) : q.splice(oR(e.id), 0, e), Un());
}
function Un() {
  !Et && !PI && (PI = !0, FI = Bn.then(qn));
}
function lR(e) {
  const t = q.indexOf(e);
  t > ce && q.splice(t, 1);
}
function NR(e) {
  p(e) ? Ye.push(...e) : (!Me || !Me.includes(e, e.allowRecurse ? Ce + 1 : Ce)) && Ye.push(e), Un();
}
function ZI(e, t = Et ? ce + 1 : 0) {
  for (; t < q.length; t++) {
    const I = q[t];
    I && I.pre && (q.splice(t, 1), t--, I());
  }
}
function zn(e) {
  if (Ye.length) {
    const t = [...new Set(Ye)];
    if (Ye.length = 0, Me) {
      Me.push(...t);
      return;
    }
    for (Me = t, Me.sort((I, n) => Dt(I) - Dt(n)), Ce = 0; Ce < Me.length; Ce++)
      Me[Ce]();
    Me = null, Ce = 0;
  }
}
const Dt = (e) => e.id == null ? 1 / 0 : e.id, cR = (e, t) => {
  const I = Dt(e) - Dt(t);
  if (I === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return I;
};
function qn(e) {
  PI = !1, Et = !0, q.sort(cR);
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
    ce = 0, q.length = 0, zn(), Et = !1, FI = null, (q.length || Ye.length) && qn();
  }
}
function fR(e, t, ...I) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || C;
  let A = I;
  const R = t.startsWith("update:"), s = R && t.slice(7);
  if (s && s in n) {
    const f = `${s === "modelValue" ? "model" : s}Modifiers`, { number: a, trim: d } = n[f] || C;
    d && (A = I.map((O) => U(O) ? O.trim() : O)), a && (A = I.map(pA));
  }
  let P, D = n[P = Jt(t)] || // also try camelCase event handler (#2249)
  n[P = Jt(ue(t))];
  !D && R && (D = n[P = Jt(Re(t))]), D && De(D, e, 6, A);
  const o = n[P + "Once"];
  if (o) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[P])
      return;
    e.emitted[P] = !0, De(o, e, 6, A);
  }
}
function Jn(e, t, I = !1) {
  const n = t.emitsCache, A = n.get(e);
  if (A !== void 0)
    return A;
  const R = e.emits;
  let s = {}, P = !1;
  if (!G(e)) {
    const D = (o) => {
      const f = Jn(o, t, !0);
      f && (P = !0, Y(s, f));
    };
    !I && t.mixins.length && t.mixins.forEach(D), e.extends && D(e.extends), e.mixins && e.mixins.forEach(D);
  }
  return !R && !P ? (w(e) && n.set(e, null), null) : (p(R) ? R.forEach((D) => s[D] = null) : Y(s, R), w(e) && n.set(e, s), s);
}
function yt(e, t) {
  return !e || !_t(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), _(e, t[0].toLowerCase() + t.slice(1)) || _(e, Re(t)) || _(e, t));
}
let re = null, Yn = null;
function Ht(e) {
  const t = re;
  return re = e, Yn = e && e.type.__scopeId || null, t;
}
function MR(e, t = re, I) {
  if (!t || e._n)
    return e;
  const n = (...A) => {
    n._d && sn(-1);
    const R = Ht(t);
    let s;
    try {
      s = e(...A);
    } finally {
      Ht(R), n._d && sn(1);
    }
    return s;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function kt(e) {
  const { type: t, vnode: I, proxy: n, withProxy: A, props: R, propsOptions: [s], slots: P, attrs: D, emit: o, render: f, renderCache: a, data: d, setupState: O, ctx: y, inheritAttrs: g } = e;
  let k, v;
  const Le = Ht(e);
  try {
    if (I.shapeFlag & 4) {
      const z = A || n;
      k = Ne(f.call(z, z, a, R, O, d, y)), v = D;
    } else {
      const z = t;
      k = Ne(z.length > 1 ? z(R, { attrs: D, slots: P, emit: o }) : z(
        R,
        null
        /* we know it doesn't need it */
      )), v = t.props ? D : uR(D);
    }
  } catch (z) {
    st.length = 0, xt(
      z,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), k = Te(it);
  }
  let H = k;
  if (v && g !== !1) {
    const z = Object.keys(v), { shapeFlag: de } = H;
    z.length && de & 7 && (s && z.some(uI) && (v = TR(v, s)), H = Xe(H, v));
  }
  return I.dirs && (H = Xe(H), H.dirs = H.dirs ? H.dirs.concat(I.dirs) : I.dirs), I.transition && (H.transition = I.transition), k = H, Ht(Le), k;
}
const uR = (e) => {
  let t;
  for (const I in e)
    (I === "class" || I === "style" || _t(I)) && ((t || (t = {}))[I] = e[I]);
  return t;
}, TR = (e, t) => {
  const I = {};
  for (const n in e)
    (!uI(n) || !(n.slice(9) in t)) && (I[n] = e[n]);
  return I;
};
function SR(e, t, I) {
  const { props: n, children: A, component: R } = e, { props: s, children: P, patchFlag: D } = t, o = R.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (I && D >= 0) {
    if (D & 1024)
      return !0;
    if (D & 16)
      return n ? QI(n, s, o) : !!s;
    if (D & 8) {
      const f = t.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        const d = f[a];
        if (s[d] !== n[d] && !yt(o, d))
          return !0;
      }
    }
  } else
    return (A || P) && (!P || !P.$stable) ? !0 : n === s ? !1 : n ? s ? QI(n, s, o) : !0 : !!s;
  return !1;
}
function QI(e, t, I) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let A = 0; A < n.length; A++) {
    const R = n[A];
    if (t[R] !== e[R] && !yt(I, R))
      return !0;
  }
  return !1;
}
function aR({ vnode: e, parent: t }, I) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = I, t = t.parent;
}
const LR = (e) => e.__isSuspense;
function dR(e, t) {
  t && t.pendingBranch ? p(e) ? t.effects.push(...e) : t.effects.push(e) : NR(e);
}
function VR(e, t) {
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
      return I && G(t) ? t.call(n.proxy) : t;
  }
}
const Vt = {};
function Xt(e, t, I) {
  return kn(e, t, I);
}
function kn(e, t, { immediate: I, deep: n, flush: A, onTrack: R, onTrigger: s } = C) {
  const P = HA() === ($ == null ? void 0 : $.scope) ? $ : null;
  let D, o = !1, f = !1;
  if (J(e) ? (D = () => e.value, o = Ft(e)) : Je(e) ? (D = () => e, n = !0) : p(e) ? (f = !0, o = e.some((H) => Je(H) || Ft(H)), D = () => e.map((H) => {
    if (J(H))
      return H.value;
    if (Je(H))
      return Ue(H);
    if (G(H))
      return Fe(
        H,
        P,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : G(e) ? t ? D = () => Fe(
    e,
    P,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : D = () => {
    if (!(P && P.isUnmounted))
      return a && a(), De(e, P, 3, [d]);
  } : D = Ee, t && n) {
    const H = D;
    D = () => Ue(H());
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
  }, O;
  if (lt)
    if (d = Ee, t ? I && De(t, P, 3, [
      D(),
      f ? [] : void 0,
      d
    ]) : D(), A === "sync") {
      const H = as();
      O = H.__watcherHandles || (H.__watcherHandles = []);
    } else
      return Ee;
  let y = f ? new Array(e.length).fill(Vt) : Vt;
  const g = () => {
    if (v.active)
      if (t) {
        const H = v.run();
        (n || o || (f ? H.some((z, de) => rt(z, y[de])) : rt(H, y))) && (a && a(), De(t, P, 3, [
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
  const v = new dI(D, k);
  t ? I ? g() : y = v.run() : A === "post" ? Q(v.run.bind(v), P && P.suspense) : v.run();
  const Le = () => {
    v.stop(), P && P.scope && TI(P.scope.effects, v);
  };
  return O && O.push(Le), Le;
}
function hR(e, t, I) {
  const n = this.proxy, A = U(e) ? e.includes(".") ? Xn(n, e) : () => n[e] : e.bind(n, n);
  let R;
  G(t) ? R = t : (R = t.handler, I = t);
  const s = $;
  Ze(this);
  const P = kn(A, R.bind(n), I);
  return s ? Ze(s) : je(), P;
}
function Xn(e, t) {
  const I = t.split(".");
  return () => {
    let n = e;
    for (let A = 0; A < I.length && n; A++)
      n = n[I[A]];
    return n;
  };
}
function Ue(e, t) {
  if (!w(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), J(e))
    Ue(e.value, t);
  else if (p(e))
    for (let I = 0; I < e.length; I++)
      Ue(e[I], t);
  else if (Sn(e) || qe(e))
    e.forEach((I) => {
      Ue(I, t);
    });
  else if (dn(e))
    for (const I in e)
      Ue(e[I], t);
  return e;
}
function KR(e) {
  return G(e) ? { setup: e, name: e.name } : e;
}
const pt = (e) => !!e.type.__asyncLoader, Zn = (e) => e.type.__isKeepAlive;
function pR(e, t) {
  Qn(e, "a", t);
}
function GR(e, t) {
  Qn(e, "da", t);
}
function Qn(e, t, I = $) {
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
      Zn(A.parent.vnode) && OR(n, t, I, A), A = A.parent;
  }
}
function OR(e, t, I, n) {
  const A = Ct(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  eA(() => {
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
const ae = (e) => (t, I = $) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!lt || e === "sp") && Ct(e, (...n) => t(...n), I)
), FR = ae(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), HR = ae(
  "m"
  /* LifecycleHooks.MOUNTED */
), gR = ae(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), _R = ae(
  "u"
  /* LifecycleHooks.UPDATED */
), mR = ae(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), eA = ae(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), bR = ae(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), WR = ae(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), xR = ae(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function yR(e, t = $) {
  Ct("ec", e, t);
}
function We(e, t, I, n) {
  const A = e.dirs, R = t && t.dirs;
  for (let s = 0; s < A.length; s++) {
    const P = A[s];
    R && (P.oldValue = R[s].value);
    let D = P.dir[n];
    D && (Qe(), De(D, I, 8, [
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
  } else if (w(e))
    if (e[Symbol.iterator])
      A = Array.from(e, (s, P) => t(s, P, void 0, R && R[P]));
    else {
      const s = Object.keys(e);
      A = new Array(s.length);
      for (let P = 0, D = s.length; P < D; P++) {
        const o = s[P];
        A[P] = t(e[o], o, P, R && R[P]);
      }
    }
  else
    A = [];
  return I && (I[n] = A), A;
}
const EI = (e) => e ? DA(e) ? bI(e) || e.proxy : EI(e.parent) : null, Rt = (
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
    $nextTick: (e) => e.n || (e.n = $n.bind(e.proxy)),
    $watch: (e) => hR.bind(e)
  })
), Qt = (e, t) => e !== C && !e.__isScriptSetup && _(e, t), wR = {
  get({ _: e }, t) {
    const { ctx: I, setupState: n, data: A, props: R, accessCache: s, type: P, appContext: D } = e;
    let o;
    if (t[0] !== "$") {
      const O = s[t];
      if (O !== void 0)
        switch (O) {
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
        if (A !== C && _(A, t))
          return s[t] = 2, A[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (o = e.propsOptions[0]) && _(o, t)
        )
          return s[t] = 3, R[t];
        if (I !== C && _(I, t))
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
    if (I !== C && _(I, t))
      return s[t] = 4, I[t];
    if (
      // global properties
      d = D.config.globalProperties, _(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, I) {
    const { data: n, setupState: A, ctx: R } = e;
    return Qt(A, t) ? (A[t] = I, !0) : n !== C && _(n, t) ? (n[t] = I, !0) : _(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (R[t] = I, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: I, ctx: n, appContext: A, propsOptions: R } }, s) {
    let P;
    return !!I[s] || e !== C && _(e, s) || Qt(t, s) || (P = R[0]) && _(P, s) || _(n, s) || _(Rt, s) || _(A.config.globalProperties, s);
  },
  defineProperty(e, t, I) {
    return I.get != null ? e._.accessCache[t] = 0 : _(I, "value") && this.set(e, t, I.value, null), Reflect.defineProperty(e, t, I);
  }
};
let DI = !0;
function vR(e) {
  const t = gI(e), I = e.proxy, n = e.ctx;
  DI = !1, t.beforeCreate && en(
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
    provide: D,
    inject: o,
    // lifecycle
    created: f,
    beforeMount: a,
    mounted: d,
    beforeUpdate: O,
    updated: y,
    activated: g,
    deactivated: k,
    beforeDestroy: v,
    beforeUnmount: Le,
    destroyed: H,
    unmounted: z,
    render: de,
    renderTracked: jt,
    renderTriggered: Nt,
    errorCaptured: ge,
    serverPrefetch: Bt,
    // public API
    expose: _e,
    inheritAttrs: tt,
    // assets
    components: ct,
    directives: ft,
    filters: $t
  } = t;
  if (o && jR(o, n, null, e.appContext.config.unwrapInjectedRef), s)
    for (const j in s) {
      const W = s[j];
      G(W) && (n[j] = W.bind(I));
    }
  if (A) {
    const j = A.call(I, I);
    w(j) && (e.data = pI(j));
  }
  if (DI = !0, R)
    for (const j in R) {
      const W = R[j], me = G(W) ? W.bind(I, I) : G(W.get) ? W.get.bind(I, I) : Ee, Mt = !G(W) && G(W.set) ? W.set.bind(I) : Ee, be = Ts({
        get: me,
        set: Mt
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
      tA(P[j], n, I, j);
  if (D) {
    const j = G(D) ? D.call(I) : D;
    Reflect.ownKeys(j).forEach((W) => {
      VR(W, j[W]);
    });
  }
  f && en(
    f,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function X(j, W) {
    p(W) ? W.forEach((me) => j(me.bind(I))) : W && j(W.bind(I));
  }
  if (X(FR, a), X(HR, d), X(gR, O), X(_R, y), X(pR, g), X(GR, k), X(yR, ge), X(xR, jt), X(WR, Nt), X(mR, Le), X(eA, z), X(bR, Bt), p(_e))
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
  de && e.render === Ee && (e.render = de), tt != null && (e.inheritAttrs = tt), ct && (e.components = ct), ft && (e.directives = ft);
}
function jR(e, t, I = Ee, n = !1) {
  p(e) && (e = iI(e));
  for (const A in e) {
    const R = e[A];
    let s;
    w(R) ? "default" in R ? s = Kt(
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
function en(e, t, I) {
  De(p(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, I);
}
function tA(e, t, I, n) {
  const A = n.includes(".") ? Xn(I, n) : () => I[n];
  if (U(e)) {
    const R = t[e];
    G(R) && Xt(A, R);
  } else if (G(e))
    Xt(A, e.bind(I));
  else if (w(e))
    if (p(e))
      e.forEach((R) => tA(R, t, I, n));
    else {
      const R = G(e.handler) ? e.handler.bind(I) : t[e.handler];
      G(R) && Xt(A, R, e);
    }
}
function gI(e) {
  const t = e.type, { mixins: I, extends: n } = t, { mixins: A, optionsCache: R, config: { optionMergeStrategies: s } } = e.appContext, P = R.get(t);
  let D;
  return P ? D = P : !A.length && !I && !n ? D = t : (D = {}, A.length && A.forEach((o) => gt(D, o, s, !0)), gt(D, t, s)), w(t) && R.set(t, D), D;
}
function gt(e, t, I, n = !1) {
  const { mixins: A, extends: R } = t;
  R && gt(e, R, I, !0), A && A.forEach((s) => gt(e, s, I, !0));
  for (const s in t)
    if (!(n && s === "expose")) {
      const P = BR[s] || I && I[s];
      e[s] = P ? P(e[s], t[s]) : t[s];
    }
  return e;
}
const BR = {
  data: tn,
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
  watch: UR,
  // provide / inject
  provide: tn,
  inject: $R
};
function tn(e, t) {
  return t ? e ? function() {
    return Y(G(e) ? e.call(this, this) : e, G(t) ? t.call(this, this) : t);
  } : t : e;
}
function $R(e, t) {
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
function UR(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const I = Y(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    I[n] = Z(e[n], t[n]);
  return I;
}
function zR(e, t, I, n = !1) {
  const A = {}, R = {};
  Ot(R, vt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), IA(e, t, A, R);
  for (const s in e.propsOptions[0])
    s in A || (A[s] = void 0);
  I ? e.props = n ? A : AR(A) : e.type.props ? e.props = A : e.props = R, e.attrs = R;
}
function qR(e, t, I, n) {
  const { props: A, attrs: R, vnode: { patchFlag: s } } = e, P = m(A), [D] = e.propsOptions;
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
        if (yt(e.emitsOptions, d))
          continue;
        const O = t[d];
        if (D)
          if (_(R, d))
            O !== R[d] && (R[d] = O, o = !0);
          else {
            const y = ue(d);
            A[y] = oI(
              D,
              P,
              y,
              O,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          O !== R[d] && (R[d] = O, o = !0);
      }
    }
  } else {
    IA(e, t, A, R) && (o = !0);
    let f;
    for (const a in P)
      (!t || // for camelCase
      !_(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Re(a)) === a || !_(t, f))) && (D ? I && // for camelCase
      (I[a] !== void 0 || // for kebab-case
      I[f] !== void 0) && (A[a] = oI(
        D,
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
  o && Se(e, "set", "$attrs");
}
function IA(e, t, I, n) {
  const [A, R] = e.propsOptions;
  let s = !1, P;
  if (t)
    for (let D in t) {
      if (ht(D))
        continue;
      const o = t[D];
      let f;
      A && _(A, f = ue(D)) ? !R || !R.includes(f) ? I[f] = o : (P || (P = {}))[f] = o : yt(e.emitsOptions, D) || (!(D in n) || o !== n[D]) && (n[D] = o, s = !0);
    }
  if (R) {
    const D = m(I), o = P || C;
    for (let f = 0; f < R.length; f++) {
      const a = R[f];
      I[a] = oI(A, D, a, o[a], e, !_(o, a));
    }
  }
  return s;
}
function oI(e, t, I, n, A, R) {
  const s = e[I];
  if (s != null) {
    const P = _(s, "default");
    if (P && n === void 0) {
      const D = s.default;
      if (s.type !== Function && G(D)) {
        const { propsDefaults: o } = A;
        I in o ? n = o[I] : (Ze(A), n = o[I] = D.call(null, t), je());
      } else
        n = D;
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
function nA(e, t, I = !1) {
  const n = t.propsCache, A = n.get(e);
  if (A)
    return A;
  const R = e.props, s = {}, P = [];
  let D = !1;
  if (!G(e)) {
    const f = (a) => {
      D = !0;
      const [d, O] = nA(a, t, !0);
      Y(s, d), O && P.push(...O);
    };
    !I && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!R && !D)
    return w(e) && n.set(e, ze), ze;
  if (p(R))
    for (let f = 0; f < R.length; f++) {
      const a = ue(R[f]);
      In(a) && (s[a] = C);
    }
  else if (R)
    for (const f in R) {
      const a = ue(f);
      if (In(a)) {
        const d = R[f], O = s[a] = p(d) || G(d) ? { type: d } : Object.assign({}, d);
        if (O) {
          const y = Rn(Boolean, O.type), g = Rn(String, O.type);
          O[
            0
            /* BooleanFlags.shouldCast */
          ] = y > -1, O[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = g < 0 || y < g, (y > -1 || _(O, "default")) && P.push(a);
        }
      }
    }
  const o = [s, P];
  return w(e) && n.set(e, o), o;
}
function In(e) {
  return e[0] !== "$";
}
function nn(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function An(e, t) {
  return nn(e) === nn(t);
}
function Rn(e, t) {
  return p(t) ? t.findIndex((I) => An(I, e)) : G(t) && An(t, e) ? 0 : -1;
}
const AA = (e) => e[0] === "_" || e === "$stable", _I = (e) => p(e) ? e.map(Ne) : [Ne(e)], JR = (e, t, I) => {
  if (t._n)
    return t;
  const n = MR((...A) => _I(t(...A)), I);
  return n._c = !1, n;
}, RA = (e, t, I) => {
  const n = e._ctx;
  for (const A in e) {
    if (AA(A))
      continue;
    const R = e[A];
    if (G(R))
      t[A] = JR(A, R, n);
    else if (R != null) {
      const s = _I(R);
      t[A] = () => s;
    }
  }
}, sA = (e, t) => {
  const I = _I(t);
  e.slots.default = () => I;
}, YR = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const I = t._;
    I ? (e.slots = m(t), Ot(t, "_", I)) : RA(t, e.slots = {});
  } else
    e.slots = {}, t && sA(e, t);
  Ot(e.slots, vt, 1);
}, kR = (e, t, I) => {
  const { vnode: n, slots: A } = e;
  let R = !0, s = C;
  if (n.shapeFlag & 32) {
    const P = t._;
    P ? I && P === 1 ? R = !1 : (Y(A, t), !I && P === 1 && delete A._) : (R = !t.$stable, RA(t, A)), s = t;
  } else
    t && (sA(e, t), s = { default: 1 });
  if (R)
    for (const P in A)
      !AA(P) && !(P in s) && delete A[P];
};
function rA() {
  return {
    app: null,
    config: {
      isNativeTag: aA,
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
let XR = 0;
function ZR(e, t) {
  return function(n, A = null) {
    G(n) || (n = Object.assign({}, n)), A != null && !w(A) && (A = null);
    const R = rA(), s = /* @__PURE__ */ new Set();
    let P = !1;
    const D = R.app = {
      _uid: XR++,
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
        return s.has(o) || (o && G(o.install) ? (s.add(o), o.install(D, ...f)) : G(o) && (s.add(o), o(D, ...f))), D;
      },
      mixin(o) {
        return R.mixins.includes(o) || R.mixins.push(o), D;
      },
      component(o, f) {
        return f ? (R.components[o] = f, D) : R.components[o];
      },
      directive(o, f) {
        return f ? (R.directives[o] = f, D) : R.directives[o];
      },
      mount(o, f, a) {
        if (!P) {
          const d = Te(n, A);
          return d.appContext = R, f && t ? t(d, o) : e(d, o, a), P = !0, D._container = o, o.__vue_app__ = D, bI(d.component) || d.component.proxy;
        }
      },
      unmount() {
        P && (e(null, D._container), delete D._container.__vue_app__);
      },
      provide(o, f) {
        return R.provides[o] = f, D;
      }
    };
    return D;
  };
}
function lI(e, t, I, n, A = !1) {
  if (p(e)) {
    e.forEach((d, O) => lI(d, t && (p(t) ? t[O] : t), I, n, A));
    return;
  }
  if (pt(n) && !A)
    return;
  const R = n.shapeFlag & 4 ? bI(n.component) || n.component.proxy : n.el, s = A ? null : R, { i: P, r: D } = e, o = t && t.r, f = P.refs === C ? P.refs = {} : P.refs, a = P.setupState;
  if (o != null && o !== D && (U(o) ? (f[o] = null, _(a, o) && (a[o] = null)) : J(o) && (o.value = null)), G(D))
    Fe(D, P, 12, [s, f]);
  else {
    const d = U(D), O = J(D);
    if (d || O) {
      const y = () => {
        if (e.f) {
          const g = d ? _(a, D) ? a[D] : f[D] : D.value;
          A ? p(g) && TI(g, R) : p(g) ? g.includes(R) || g.push(R) : d ? (f[D] = [R], _(a, D) && (a[D] = f[D])) : (D.value = [R], e.k && (f[e.k] = D.value));
        } else
          d ? (f[D] = s, _(a, D) && (a[D] = s)) : O && (D.value = s, e.k && (f[e.k] = s));
      };
      s ? (y.id = -1, Q(y, I)) : y();
    }
  }
}
const Q = dR;
function QR(e) {
  return es(e);
}
function es(e, t) {
  const I = GA();
  I.__VUE__ = !0;
  const { insert: n, remove: A, patchProp: R, createElement: s, createText: P, createComment: D, setText: o, setElementText: f, parentNode: a, nextSibling: d, setScopeId: O = Ee, insertStaticContent: y } = e, g = (r, E, i, N = null, l = null, u = null, S = !1, M = null, T = !!E.dynamicChildren) => {
    if (r === E)
      return;
    r && !nt(r, E) && (N = ut(r), ie(r, l, u, !0), r = null), E.patchFlag === -2 && (T = !1, E.dynamicChildren = null);
    const { type: c, ref: V, shapeFlag: L } = E;
    switch (c) {
      case wt:
        k(r, E, i, N);
        break;
      case it:
        v(r, E, i, N);
        break;
      case eI:
        r == null && Le(E, i, N, S);
        break;
      case Ie:
        ct(r, E, i, N, l, u, S, M, T);
        break;
      default:
        L & 1 ? de(r, E, i, N, l, u, S, M, T) : L & 6 ? ft(r, E, i, N, l, u, S, M, T) : (L & 64 || L & 128) && c.process(r, E, i, N, l, u, S, M, T, Be);
    }
    V != null && l && lI(V, r && r.ref, u, E || r, !E);
  }, k = (r, E, i, N) => {
    if (r == null)
      n(E.el = P(E.children), i, N);
    else {
      const l = E.el = r.el;
      E.children !== r.children && o(l, E.children);
    }
  }, v = (r, E, i, N) => {
    r == null ? n(E.el = D(E.children || ""), i, N) : E.el = r.el;
  }, Le = (r, E, i, N) => {
    [r.el, r.anchor] = y(r.children, E, i, N, r.el, r.anchor);
  }, H = ({ el: r, anchor: E }, i, N) => {
    let l;
    for (; r && r !== E; )
      l = d(r), n(r, i, N), r = l;
    n(E, i, N);
  }, z = ({ el: r, anchor: E }) => {
    let i;
    for (; r && r !== E; )
      i = d(r), A(r), r = i;
    A(E);
  }, de = (r, E, i, N, l, u, S, M, T) => {
    S = S || E.type === "svg", r == null ? jt(E, i, N, l, u, S, M, T) : Bt(r, E, l, u, S, M, T);
  }, jt = (r, E, i, N, l, u, S, M) => {
    let T, c;
    const { type: V, props: L, shapeFlag: h, transition: K, dirs: F } = r;
    if (T = r.el = s(r.type, u, L && L.is, L), h & 8 ? f(T, r.children) : h & 16 && ge(r.children, T, null, N, l, u && V !== "foreignObject", S, M), F && We(r, null, N, "created"), Nt(T, r, r.scopeId, S, N), L) {
      for (const b in L)
        b !== "value" && !ht(b) && R(T, b, null, L[b], u, r.children, N, l, fe);
      "value" in L && R(T, "value", null, L.value), (c = L.onVnodeBeforeMount) && le(c, N, r);
    }
    F && We(r, null, N, "beforeMount");
    const x = (!l || l && !l.pendingBranch) && K && !K.persisted;
    x && K.beforeEnter(T), n(T, E, i), ((c = L && L.onVnodeMounted) || x || F) && Q(() => {
      c && le(c, N, r), x && K.enter(T), F && We(r, null, N, "mounted");
    }, l);
  }, Nt = (r, E, i, N, l) => {
    if (i && O(r, i), N)
      for (let u = 0; u < N.length; u++)
        O(r, N[u]);
    if (l) {
      let u = l.subTree;
      if (E === u) {
        const S = l.vnode;
        Nt(r, S, S.scopeId, S.slotScopeIds, l.parent);
      }
    }
  }, ge = (r, E, i, N, l, u, S, M, T = 0) => {
    for (let c = T; c < r.length; c++) {
      const V = r[c] = M ? pe(r[c]) : Ne(r[c]);
      g(null, V, E, i, N, l, u, S, M);
    }
  }, Bt = (r, E, i, N, l, u, S) => {
    const M = E.el = r.el;
    let { patchFlag: T, dynamicChildren: c, dirs: V } = E;
    T |= r.patchFlag & 16;
    const L = r.props || C, h = E.props || C;
    let K;
    i && xe(i, !1), (K = h.onVnodeBeforeUpdate) && le(K, i, E, r), V && We(E, r, i, "beforeUpdate"), i && xe(i, !0);
    const F = l && E.type !== "foreignObject";
    if (c ? _e(r.dynamicChildren, c, M, i, N, F, u) : S || W(r, E, M, null, i, N, F, u, !1), T > 0) {
      if (T & 16)
        tt(M, E, L, h, i, N, l);
      else if (T & 2 && L.class !== h.class && R(M, "class", null, h.class, l), T & 4 && R(M, "style", L.style, h.style, l), T & 8) {
        const x = E.dynamicProps;
        for (let b = 0; b < x.length; b++) {
          const B = x[b], ne = L[B], $e = h[B];
          ($e !== ne || B === "value") && R(M, B, ne, $e, l, r.children, i, N, fe);
        }
      }
      T & 1 && r.children !== E.children && f(M, E.children);
    } else
      !S && c == null && tt(M, E, L, h, i, N, l);
    ((K = h.onVnodeUpdated) || V) && Q(() => {
      K && le(K, i, E, r), V && We(E, r, i, "updated");
    }, N);
  }, _e = (r, E, i, N, l, u, S) => {
    for (let M = 0; M < E.length; M++) {
      const T = r[M], c = E[M], V = (
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
      g(T, c, V, null, N, l, u, S, !0);
    }
  }, tt = (r, E, i, N, l, u, S) => {
    if (i !== N) {
      if (i !== C)
        for (const M in i)
          !ht(M) && !(M in N) && R(r, M, i[M], null, S, E.children, l, u, fe);
      for (const M in N) {
        if (ht(M))
          continue;
        const T = N[M], c = i[M];
        T !== c && M !== "value" && R(r, M, c, T, S, E.children, l, u, fe);
      }
      "value" in N && R(r, "value", i.value, N.value);
    }
  }, ct = (r, E, i, N, l, u, S, M, T) => {
    const c = E.el = r ? r.el : P(""), V = E.anchor = r ? r.anchor : P("");
    let { patchFlag: L, dynamicChildren: h, slotScopeIds: K } = E;
    K && (M = M ? M.concat(K) : K), r == null ? (n(c, i, N), n(V, i, N), ge(E.children, i, V, l, u, S, M, T)) : L > 0 && L & 64 && h && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    r.dynamicChildren ? (_e(r.dynamicChildren, h, i, l, u, S, M), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (E.key != null || l && E === l.subTree) && PA(
      r,
      E,
      !0
      /* shallow */
    )) : W(r, E, i, V, l, u, S, M, T);
  }, ft = (r, E, i, N, l, u, S, M, T) => {
    E.slotScopeIds = M, r == null ? E.shapeFlag & 512 ? l.ctx.activate(E, i, N, S, T) : $t(E, i, N, l, u, S, T) : xI(r, E, T);
  }, $t = (r, E, i, N, l, u, S) => {
    const M = r.component = os(r, N, l);
    if (Zn(r) && (M.ctx.renderer = Be), Ns(M), M.asyncDep) {
      if (l && l.registerDep(M, X), !r.el) {
        const T = M.subTree = Te(it);
        v(null, T, E, i);
      }
      return;
    }
    X(M, r, E, i, l, u, S);
  }, xI = (r, E, i) => {
    const N = E.component = r.component;
    if (SR(r, E, i))
      if (N.asyncDep && !N.asyncResolved) {
        j(N, E, i);
        return;
      } else
        N.next = E, lR(N.update), N.update();
    else
      E.el = r.el, N.vnode = E;
  }, X = (r, E, i, N, l, u, S) => {
    const M = () => {
      if (r.isMounted) {
        let { next: V, bu: L, u: h, parent: K, vnode: F } = r, x = V, b;
        xe(r, !1), V ? (V.el = F.el, j(r, V, S)) : V = F, L && Yt(L), (b = V.props && V.props.onVnodeBeforeUpdate) && le(b, K, V, F), xe(r, !0);
        const B = kt(r), ne = r.subTree;
        r.subTree = B, g(
          ne,
          B,
          // parent may have changed if it's in a teleport
          a(ne.el),
          // anchor may have changed if it's in a fragment
          ut(ne),
          r,
          l,
          u
        ), V.el = B.el, x === null && aR(r, B.el), h && Q(h, l), (b = V.props && V.props.onVnodeUpdated) && Q(() => le(b, K, V, F), l);
      } else {
        let V;
        const { el: L, props: h } = E, { bm: K, m: F, parent: x } = r, b = pt(E);
        if (xe(r, !1), K && Yt(K), !b && (V = h && h.onVnodeBeforeMount) && le(V, x, E), xe(r, !0), L && zt) {
          const B = () => {
            r.subTree = kt(r), zt(L, r.subTree, r, l, null);
          };
          b ? E.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !r.isUnmounted && B()
          ) : B();
        } else {
          const B = r.subTree = kt(r);
          g(null, B, i, N, r, l, u), E.el = B.el;
        }
        if (F && Q(F, l), !b && (V = h && h.onVnodeMounted)) {
          const B = E;
          Q(() => le(V, x, B), l);
        }
        (E.shapeFlag & 256 || x && pt(x.vnode) && x.vnode.shapeFlag & 256) && r.a && Q(r.a, l), r.isMounted = !0, E = i = N = null;
      }
    }, T = r.effect = new dI(
      M,
      () => HI(c),
      r.scope
      // track it in component's effect scope
    ), c = r.update = () => T.run();
    c.id = r.uid, xe(r, !0), c();
  }, j = (r, E, i) => {
    E.component = r;
    const N = r.vnode.props;
    r.vnode = E, r.next = null, qR(r, E.props, N, i), kR(r, E.children, i), Qe(), ZI(), et();
  }, W = (r, E, i, N, l, u, S, M, T = !1) => {
    const c = r && r.children, V = r ? r.shapeFlag : 0, L = E.children, { patchFlag: h, shapeFlag: K } = E;
    if (h > 0) {
      if (h & 128) {
        Mt(c, L, i, N, l, u, S, M, T);
        return;
      } else if (h & 256) {
        me(c, L, i, N, l, u, S, M, T);
        return;
      }
    }
    K & 8 ? (V & 16 && fe(c, l, u), L !== c && f(i, L)) : V & 16 ? K & 16 ? Mt(c, L, i, N, l, u, S, M, T) : fe(c, l, u, !0) : (V & 8 && f(i, ""), K & 16 && ge(L, i, N, l, u, S, M, T));
  }, me = (r, E, i, N, l, u, S, M, T) => {
    r = r || ze, E = E || ze;
    const c = r.length, V = E.length, L = Math.min(c, V);
    let h;
    for (h = 0; h < L; h++) {
      const K = E[h] = T ? pe(E[h]) : Ne(E[h]);
      g(r[h], K, i, null, l, u, S, M, T);
    }
    c > V ? fe(r, l, u, !0, !1, L) : ge(E, i, N, l, u, S, M, T, L);
  }, Mt = (r, E, i, N, l, u, S, M, T) => {
    let c = 0;
    const V = E.length;
    let L = r.length - 1, h = V - 1;
    for (; c <= L && c <= h; ) {
      const K = r[c], F = E[c] = T ? pe(E[c]) : Ne(E[c]);
      if (nt(K, F))
        g(K, F, i, null, l, u, S, M, T);
      else
        break;
      c++;
    }
    for (; c <= L && c <= h; ) {
      const K = r[L], F = E[h] = T ? pe(E[h]) : Ne(E[h]);
      if (nt(K, F))
        g(K, F, i, null, l, u, S, M, T);
      else
        break;
      L--, h--;
    }
    if (c > L) {
      if (c <= h) {
        const K = h + 1, F = K < V ? E[K].el : N;
        for (; c <= h; )
          g(null, E[c] = T ? pe(E[c]) : Ne(E[c]), i, F, l, u, S, M, T), c++;
      }
    } else if (c > h)
      for (; c <= L; )
        ie(r[c], l, u, !0), c++;
    else {
      const K = c, F = c, x = /* @__PURE__ */ new Map();
      for (c = F; c <= h; c++) {
        const te = E[c] = T ? pe(E[c]) : Ne(E[c]);
        te.key != null && x.set(te.key, c);
      }
      let b, B = 0;
      const ne = h - F + 1;
      let $e = !1, wI = 0;
      const It = new Array(ne);
      for (c = 0; c < ne; c++)
        It[c] = 0;
      for (c = K; c <= L; c++) {
        const te = r[c];
        if (B >= ne) {
          ie(te, l, u, !0);
          continue;
        }
        let oe;
        if (te.key != null)
          oe = x.get(te.key);
        else
          for (b = F; b <= h; b++)
            if (It[b - F] === 0 && nt(te, E[b])) {
              oe = b;
              break;
            }
        oe === void 0 ? ie(te, l, u, !0) : (It[oe - F] = c + 1, oe >= wI ? wI = oe : $e = !0, g(te, E[oe], i, null, l, u, S, M, T), B++);
      }
      const vI = $e ? ts(It) : ze;
      for (b = vI.length - 1, c = ne - 1; c >= 0; c--) {
        const te = F + c, oe = E[te], jI = te + 1 < V ? E[te + 1].el : N;
        It[c] === 0 ? g(null, oe, i, jI, l, u, S, M, T) : $e && (b < 0 || c !== vI[b] ? be(
          oe,
          i,
          jI,
          2
          /* MoveType.REORDER */
        ) : b--);
      }
    }
  }, be = (r, E, i, N, l = null) => {
    const { el: u, type: S, transition: M, children: T, shapeFlag: c } = r;
    if (c & 6) {
      be(r.component.subTree, E, i, N);
      return;
    }
    if (c & 128) {
      r.suspense.move(E, i, N);
      return;
    }
    if (c & 64) {
      S.move(r, E, i, Be);
      return;
    }
    if (S === Ie) {
      n(u, E, i);
      for (let L = 0; L < T.length; L++)
        be(T[L], E, i, N);
      n(r.anchor, E, i);
      return;
    }
    if (S === eI) {
      H(r, E, i);
      return;
    }
    if (N !== 2 && c & 1 && M)
      if (N === 0)
        M.beforeEnter(u), n(u, E, i), Q(() => M.enter(u), l);
      else {
        const { leave: L, delayLeave: h, afterLeave: K } = M, F = () => n(u, E, i), x = () => {
          L(u, () => {
            F(), K && K();
          });
        };
        h ? h(u, F, x) : x();
      }
    else
      n(u, E, i);
  }, ie = (r, E, i, N = !1, l = !1) => {
    const { type: u, props: S, ref: M, children: T, dynamicChildren: c, shapeFlag: V, patchFlag: L, dirs: h } = r;
    if (M != null && lI(M, null, i, r, !0), V & 256) {
      E.ctx.deactivate(r);
      return;
    }
    const K = V & 1 && h, F = !pt(r);
    let x;
    if (F && (x = S && S.onVnodeBeforeUnmount) && le(x, E, r), V & 6)
      NA(r.component, i, N);
    else {
      if (V & 128) {
        r.suspense.unmount(i, N);
        return;
      }
      K && We(r, null, E, "beforeUnmount"), V & 64 ? r.type.remove(r, E, i, l, Be, N) : c && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (u !== Ie || L > 0 && L & 64) ? fe(c, E, i, !1, !0) : (u === Ie && L & 384 || !l && V & 16) && fe(T, E, i), N && yI(r);
    }
    (F && (x = S && S.onVnodeUnmounted) || K) && Q(() => {
      x && le(x, E, r), K && We(r, null, E, "unmounted");
    }, i);
  }, yI = (r) => {
    const { type: E, el: i, anchor: N, transition: l } = r;
    if (E === Ie) {
      lA(i, N);
      return;
    }
    if (E === eI) {
      z(r);
      return;
    }
    const u = () => {
      A(i), l && !l.persisted && l.afterLeave && l.afterLeave();
    };
    if (r.shapeFlag & 1 && l && !l.persisted) {
      const { leave: S, delayLeave: M } = l, T = () => S(i, u);
      M ? M(r.el, u, T) : T();
    } else
      u();
  }, lA = (r, E) => {
    let i;
    for (; r !== E; )
      i = d(r), A(r), r = i;
    A(E);
  }, NA = (r, E, i) => {
    const { bum: N, scope: l, update: u, subTree: S, um: M } = r;
    N && Yt(N), l.stop(), u && (u.active = !1, ie(S, r, E, i)), M && Q(M, E), Q(() => {
      r.isUnmounted = !0;
    }, E), E && E.pendingBranch && !E.isUnmounted && r.asyncDep && !r.asyncResolved && r.suspenseId === E.pendingId && (E.deps--, E.deps === 0 && E.resolve());
  }, fe = (r, E, i, N = !1, l = !1, u = 0) => {
    for (let S = u; S < r.length; S++)
      ie(r[S], E, i, N, l);
  }, ut = (r) => r.shapeFlag & 6 ? ut(r.component.subTree) : r.shapeFlag & 128 ? r.suspense.next() : d(r.anchor || r.el), CI = (r, E, i) => {
    r == null ? E._vnode && ie(E._vnode, null, null, !0) : g(E._vnode || null, r, E, null, null, null, i), ZI(), zn(), E._vnode = r;
  }, Be = {
    p: g,
    um: ie,
    m: be,
    r: yI,
    mt: $t,
    mc: ge,
    pc: W,
    pbc: _e,
    n: ut,
    o: e
  };
  let Ut, zt;
  return t && ([Ut, zt] = t(Be)), {
    render: CI,
    hydrate: Ut,
    createApp: ZR(CI, Ut)
  };
}
function xe({ effect: e, update: t }, I) {
  e.allowRecurse = t.allowRecurse = I;
}
function PA(e, t, I = !1) {
  const n = e.children, A = t.children;
  if (p(n) && p(A))
    for (let R = 0; R < n.length; R++) {
      const s = n[R];
      let P = A[R];
      P.shapeFlag & 1 && !P.dynamicChildren && ((P.patchFlag <= 0 || P.patchFlag === 32) && (P = A[R] = pe(A[R]), P.el = s.el), I || PA(s, P)), P.type === wt && (P.el = s.el);
    }
}
function ts(e) {
  const t = e.slice(), I = [0];
  let n, A, R, s, P;
  const D = e.length;
  for (n = 0; n < D; n++) {
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
const Is = (e) => e.__isTeleport, Ie = Symbol(void 0), wt = Symbol(void 0), it = Symbol(void 0), eI = Symbol(void 0), st = [];
let Pe = null;
function he(e = !1) {
  st.push(Pe = e ? null : []);
}
function ns() {
  st.pop(), Pe = st[st.length - 1] || null;
}
let ot = 1;
function sn(e) {
  ot += e;
}
function As(e) {
  return e.dynamicChildren = ot > 0 ? Pe || ze : null, ns(), ot > 0 && Pe && Pe.push(e), e;
}
function Ke(e, t, I, n, A, R) {
  return As(Ge(
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
function Rs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const vt = "__vInternal", EA = ({ key: e }) => e ?? null, Gt = ({ ref: e, ref_key: t, ref_for: I }) => e != null ? U(e) || J(e) || G(e) ? { i: re, r: e, k: t, f: !!I } : e : null;
function Ge(e, t = null, I = null, n = 0, A = null, R = e === Ie ? 0 : 1, s = !1, P = !1) {
  const D = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && EA(t),
    ref: t && Gt(t),
    scopeId: Yn,
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
  return P ? (mI(D, I), R & 128 && e.normalize(D)) : I && (D.shapeFlag |= U(I) ? 8 : 16), ot > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  Pe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (D.patchFlag > 0 || R & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  D.patchFlag !== 32 && Pe.push(D), D;
}
const Te = ss;
function ss(e, t = null, I = null, n = 0, A = null, R = !1) {
  if ((!e || e === CR) && (e = it), Rs(e)) {
    const P = Xe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return I && mI(P, I), ot > 0 && !R && Pe && (P.shapeFlag & 6 ? Pe[Pe.indexOf(e)] = P : Pe.push(P)), P.patchFlag |= -2, P;
  }
  if (us(e) && (e = e.__vccOpts), t) {
    t = rs(t);
    let { class: P, style: D } = t;
    P && !U(P) && (t.class = MI(P)), w(D) && (Wn(D) && !p(D) && (D = Y({}, D)), t.style = fI(D));
  }
  const s = U(e) ? 1 : LR(e) ? 128 : Is(e) ? 64 : w(e) ? 4 : G(e) ? 2 : 0;
  return Ge(e, t, I, n, A, s, R, !0);
}
function rs(e) {
  return e ? Wn(e) || vt in e ? Y({}, e) : e : null;
}
function Xe(e, t, I = !1) {
  const { props: n, ref: A, patchFlag: R, children: s } = e, P = t ? Es(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: P,
    key: P && EA(P),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      I && A ? p(A) ? A.concat(Gt(t)) : [A, Gt(t)] : Gt(t)
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
function Ps(e = " ", t = 0) {
  return Te(wt, null, e, t);
}
function Ne(e) {
  return e == null || typeof e == "boolean" ? Te(it) : p(e) ? Te(
    Ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? pe(e) : Te(wt, null, String(e));
}
function pe(e) {
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
      !A && !(vt in t) ? t._ctx = re : A === 3 && re && (re.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    G(t) ? (t = { default: t, _ctx: re }, I = 32) : (t = String(t), n & 64 ? (I = 16, t = [Ps(t)]) : I = 8);
  e.children = t, e.shapeFlag |= I;
}
function Es(...e) {
  const t = {};
  for (let I = 0; I < e.length; I++) {
    const n = e[I];
    for (const A in n)
      if (A === "class")
        t.class !== n.class && (t.class = MI([t.class, n.class]));
      else if (A === "style")
        t.style = fI([t.style, n.style]);
      else if (_t(A)) {
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
const Ds = rA();
let is = 0;
function os(e, t, I) {
  const n = e.type, A = (t ? t.appContext : e.appContext) || Ds, R = {
    uid: is++,
    vnode: e,
    type: n,
    parent: t,
    appContext: A,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new OA(
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
    propsOptions: nA(n, A),
    emitsOptions: Jn(n, A),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: C,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: C,
    data: C,
    props: C,
    attrs: C,
    slots: C,
    refs: C,
    setupState: C,
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
  return R.ctx = { _: R }, R.root = t ? t.root : R, R.emit = fR.bind(null, R), e.ce && e.ce(R), R;
}
let $ = null;
const ls = () => $ || re, Ze = (e) => {
  $ = e, e.scope.on();
}, je = () => {
  $ && $.scope.off(), $ = null;
};
function DA(e) {
  return e.vnode.shapeFlag & 4;
}
let lt = !1;
function Ns(e, t = !1) {
  lt = t;
  const { props: I, children: n } = e.vnode, A = DA(e);
  zR(e, I, A, t), YR(e, n);
  const R = A ? cs(e, t) : void 0;
  return lt = !1, R;
}
function cs(e, t) {
  const I = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = xn(new Proxy(e.ctx, wR));
  const { setup: n } = I;
  if (n) {
    const A = e.setupContext = n.length > 1 ? Ms(e) : null;
    Ze(e), Qe();
    const R = Fe(n, e, 0, [e.props, A]);
    if (et(), je(), an(R)) {
      if (R.then(je, je), t)
        return R.then((s) => {
          rn(e, s, t);
        }).catch((s) => {
          xt(
            s,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      e.asyncDep = R;
    } else
      rn(e, R, t);
  } else
    iA(e, t);
}
function rn(e, t, I) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : w(t) && (e.setupState = vn(t)), iA(e, I);
}
let Pn;
function iA(e, t, I) {
  const n = e.type;
  if (!e.render) {
    if (!t && Pn && !n.render) {
      const A = n.template || gI(e).template;
      if (A) {
        const { isCustomElement: R, compilerOptions: s } = e.appContext.config, { delimiters: P, compilerOptions: D } = n, o = Y(Y({
          isCustomElement: R,
          delimiters: P
        }, s), D);
        n.render = Pn(A, o);
      }
    }
    e.render = n.render || Ee;
  }
  Ze(e), Qe(), vR(e), et(), je();
}
function fs(e) {
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
      return I || (I = fs(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function bI(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(vn(xn(e.exposed)), {
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
function us(e) {
  return G(e) && "__vccOpts" in e;
}
const Ts = (e, t) => DR(e, t, lt), Ss = Symbol(""), as = () => Kt(Ss), Ls = "3.2.47", ds = "http://www.w3.org/2000/svg", we = typeof document < "u" ? document : null, En = we && /* @__PURE__ */ we.createElement("template"), Vs = {
  insert: (e, t, I) => {
    t.insertBefore(e, I || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, I, n) => {
    const A = t ? we.createElementNS(ds, e) : we.createElement(e, I ? { is: I } : void 0);
    return e === "select" && n && n.multiple != null && A.setAttribute("multiple", n.multiple), A;
  },
  createText: (e) => we.createTextNode(e),
  createComment: (e) => we.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => we.querySelector(e),
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
      En.innerHTML = n ? `<svg>${e}</svg>` : e;
      const P = En.content;
      if (n) {
        const D = P.firstChild;
        for (; D.firstChild; )
          P.appendChild(D.firstChild);
        P.removeChild(D);
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
const Dn = /\s*!important$/;
function NI(e, t, I) {
  if (p(I))
    I.forEach((n) => NI(e, t, n));
  else if (I == null && (I = ""), t.startsWith("--"))
    e.setProperty(t, I);
  else {
    const n = ps(e, t);
    Dn.test(I) ? e.setProperty(Re(n), I.replace(Dn, ""), "important") : e[n] = I;
  }
}
const on = ["Webkit", "Moz", "ms"], tI = {};
function ps(e, t) {
  const I = tI[t];
  if (I)
    return I;
  let n = ue(t);
  if (n !== "filter" && n in e)
    return tI[t] = n;
  n = Vn(n);
  for (let A = 0; A < on.length; A++) {
    const R = on[A] + n;
    if (R in e)
      return tI[t] = R;
  }
  return t;
}
const ln = "http://www.w3.org/1999/xlink";
function Gs(e, t, I, n, A) {
  if (n && t.startsWith("xlink:"))
    I == null ? e.removeAttributeNS(ln, t.slice(6, t.length)) : e.setAttributeNS(ln, t, I);
  else {
    const R = SA(t);
    I == null || R && !un(I) ? e.removeAttribute(t) : e.setAttribute(t, R ? "" : I);
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
    const D = I ?? "";
    (e.value !== D || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = D), I == null && e.removeAttribute(t);
    return;
  }
  let P = !1;
  if (I === "" || I == null) {
    const D = typeof e[t];
    D === "boolean" ? I = un(I) : I == null && D === "string" ? (I = "", P = !0) : D === "number" && (I = 0, P = !0);
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
    const [P, D] = _s(t);
    if (n) {
      const o = R[t] = Ws(n, A);
      Fs(e, P, o, D);
    } else
      s && (Hs(e, P, s, D), R[t] = void 0);
  }
}
const Nn = /(?:Once|Passive|Capture)$/;
function _s(e) {
  let t;
  if (Nn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Nn); )
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
const cn = /^on[a-z]/, ys = (e, t, I, n, A = !1, R, s, P, D) => {
  t === "class" ? hs(e, n, A) : t === "style" ? Ks(e, I, n) : _t(t) ? uI(t) || gs(e, t, I, n, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Cs(e, t, n, A)) ? Os(e, t, n, R, s, P, D) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Gs(e, t, n, A));
};
function Cs(e, t, I, n) {
  return n ? !!(t === "innerHTML" || t === "textContent" || t in e && cn.test(t) && G(I)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || cn.test(t) && U(I) ? !1 : t in e;
}
function ws(e, t) {
  const I = KR(e);
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
    this._connected = !1, $n(() => {
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
        for (const D in R) {
          const o = R[D];
          (o === Number || o && o.type === Number) && (D in this._props && (this._props[D] = BI(this._props[D])), (P || (P = /* @__PURE__ */ Object.create(null)))[ue(D)] = !0);
        }
      this._numberProps = P, A && this._resolveProps(n), this._applyStyles(s), this._update();
    }, I = this._def.__asyncLoader;
    I ? I().then((n) => t(n, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: I } = t, n = p(I) ? I : Object.keys(I || {});
    for (const A of Object.keys(this))
      A[0] !== "_" && n.includes(A) && this._setProp(A, this[A], !0, !1);
    for (const A of n.map(ue))
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
    const n = ue(t);
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
    const t = Te(this._def, Y({}, this._props));
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
let fn;
function oA() {
  return fn || (fn = QR(js));
}
const Mn = (...e) => {
  oA().render(...e);
}, Bs = (...e) => {
  const t = oA().createApp(...e), { mount: I } = t;
  return t.mount = (n) => {
    const A = $s(n);
    if (!A)
      return;
    const R = t._component;
    !G(R) && !R.render && !R.template && (R.template = A.innerHTML), A.innerHTML = "";
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
    const A = ls();
    return A && (A.appContext = n._context), t(...I);
  }, Object.defineProperty(e.setup, "length", {
    get: () => t.length,
    set: () => {
    }
  }), ws(e);
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
], Js = { class: "wrapper" }, Ys = /* @__PURE__ */ Ge("h2", null, "WINDS Data", -1), ks = {
  __name: "WeatherData",
  props: {
    partId: String
  },
  setup(e) {
    const n = {
      Tower_0003_eiffel: "0003",
      "Tower_0006_eiffel.002": "0006NW",
      "Tower_0303_eiffel.001": "0303"
    }[e.partId], A = RR([]);
    return A.value = qs.filter((R) => R.TOWER === n).sort((R, s) => s.HGT - R.HGT).map((R) => {
      const { LAT: s, LON: P, AVG: D, TOWER: o, ...f } = R;
      return f;
    }).map((R) => {
      const s = {};
      return Object.keys(R).forEach((P) => {
        R[P] !== "" && (s[P] = R[P]);
      }), s;
    }), (R, s) => (he(), Ke("div", Js, [
      Ys,
      Ge("h5", null, "Tower: " + qt(wn(n)), 1),
      Ge("table", null, [
        Ge("thead", null, [
          Ge("tr", null, [
            (he(!0), Ke(Ie, null, Zt(Object.keys(A.value[0]), (P) => (he(), Ke("th", { key: P }, qt(P), 1))), 128))
          ])
        ]),
        Ge("tbody", null, [
          (he(!0), Ke(Ie, null, Zt(A.value, (P) => (he(), Ke("tr", {
            key: P.HGT
          }, [
            (he(!0), Ke(Ie, null, Zt(Object.values(P), (D) => (he(), Ke("td", { key: D }, qt(D), 1))), 128))
          ]))), 128))
        ])
      ])
    ]));
  }
}, Xs = `.wrapper{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background-color:#000}.wrapper h1,h2,h5{color:var(--pal-v1-status-e-200)}table{width:100%;border:1px solid var(--pal-v1-neutrals-300);font-size:.75rem;border-collapse:collapse;color:#fff}table thead{background-color:var(--pal-v1-status-e-200)}table tr{border-top:1px solid var(--pal-v1-text-600);transition:all ease-in-out .1s}table td,table th{text-align:left;padding:.5rem}table tr:hover{background-color:var(--pal-v1-accent-500)}
`, Zs = (e, t) => {
  const I = e.__vccOpts || e;
  for (const [n, A] of t)
    I[n] = A;
  return I;
}, Qs = {
  __name: "App.ce",
  props: {
    partId: String
  },
  setup(e) {
    const t = e;
    return console.log(t.partId), (I, n) => (he(), Ke("main", null, [
      Te(ks, {
        partId: t.partId
      }, null, 8, ["partId"])
    ]));
  }
}, e0 = /* @__PURE__ */ Zs(Qs, [["styles", [Xs]]]), t0 = zs(e0);
export {
  t0 as default
};
