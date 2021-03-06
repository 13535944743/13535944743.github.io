var InstantClick = (function (d, r) {
  var B = navigator.userAgent,
    E = "createTouch" in d,
    C,
    e,
    l,
    c = {},
    G,
    L = false,
    h = false,
    u = false,
    A = false,
    I = {},
    a = false,
    o = false,
    g = [],
    x,
    F,
    v,
    y = { fetch: [], receive: [], wait: [], change: [] }
  function t(R) {
    var Q = R.indexOf("#")
    if (Q < 0) {
      return R
    }
    return R.substr(0, Q)
  }
  function f(Q) {
    while (Q.nodeName != "A") {
      Q = Q.parentNode
    }
    return Q
  }
  function M(Q) {
    do {
      if (!Q.hasAttribute) {
        break
      }
      if (Q.hasAttribute("data-instant")) {
        return false
      }
      if (Q.hasAttribute("data-no-instant")) {
        return true
      }
    } while ((Q = Q.parentNode))
    return false
  }
  function P(Q) {
    do {
      if (!Q.hasAttribute) {
        break
      }
      if (Q.hasAttribute("data-no-instant")) {
        return false
      }
      if (Q.hasAttribute("data-instant")) {
        return true
      }
    } while ((Q = Q.parentNode))
    return false
  }
  function b(S, Q) {
    for (var R = 0; R < y[S].length; R++) {
      y[S][R](Q)
    }
  }
  function k(W, Q, U, T) {
    d.title = W
    d.documentElement.replaceChild(Q, d.body)
    if (U) {
      history.pushState(null, null, U)
      var S = U.indexOf("#"),
        R = S > -1 && d.getElementById(U.substr(S + 1)),
        V = 0
      if (R) {
        while (R.offsetParent) {
          V += R.offsetTop
          R = R.offsetParent
        }
      }
      scrollTo(0, V)
      C = t(U)
    } else {
      scrollTo(0, T)
    }
    m()
    H.done()
    b("change", false)
  }
  function p() {
    a = false
    o = false
  }
  function q(Q) {
    n(f(Q.target).href)
  }
  function K(R) {
    var Q = f(R.target)
    Q.addEventListener("mouseout", N)
    if (!v) {
      n(Q.href)
    } else {
      e = Q.href
      l = setTimeout(n, v)
    }
  }
  function O(R) {
    var Q = f(R.target)
    if (F) {
      Q.removeEventListener("mousedown", q)
    } else {
      Q.removeEventListener("mouseover", K)
    }
    n(Q.href)
  }
  function D(Q) {
    if (Q.which > 1 || Q.metaKey || Q.ctrlKey) {
      return
    }
    Q.preventDefault()
    w(f(Q.target).href)
  }
  function N() {
    if (l) {
      clearTimeout(l)
      l = false
      return
    }
    if (!a || o) {
      return
    }
    G.abort()
    p()
  }
  function s() {
    if (G.readyState < 4) {
      return
    }
    if (G.status == 0) {
      return
    }
    I.ready = +new Date() - I.start
    b("receive")
    if (G.getResponseHeader("Content-Type").match(/\/(x|ht|xht)ml/)) {
      var X = d.implementation.createHTMLDocument("")
      X.documentElement.innerHTML = G.responseText
      h = X.title
      A = X.body
      var T = t(L)
      c[T] = { body: A, title: h, scrollY: T in c ? c[T].scrollY : 0 }
      var Q = X.head.children,
        W = 0,
        U,
        V
      for (var S = Q.length - 1; S >= 0; S--) {
        U = Q[S]
        if (U.hasAttribute("data-instant-track")) {
          V = U.getAttribute("href") || U.getAttribute("src") || U.innerHTML
          for (var R = g.length - 1; R >= 0; R--) {
            if (g[R] == V) {
              W++
            }
          }
        }
      }
      if (W != g.length) {
        u = true
      }
    } else {
      u = true
    }
    if (o) {
      o = false
      w(L)
    }
  }
  function m(Z) {
    var R = d.getElementsByTagName("a"),
      Y,
      U = r.protocol + "//" + r.host
    for (var V = R.length - 1; V >= 0; V--) {
      Y = R[V]
      if (Y.target || Y.hasAttribute("download") || Y.href.indexOf(U + "/") != 0 || (Y.href.indexOf("#") > -1 && t(Y.href) == C) || (x ? !P(Y) : M(Y))) {
        continue
      }
      Y.addEventListener("touchstart", O)
      if (F) {
        Y.addEventListener("mousedown", q)
      } else {
        Y.addEventListener("mouseover", K)
      }
      Y.addEventListener("click", D)
    }
    if (!Z) {
      var S = d.body.getElementsByTagName("script"),
        X,
        Q,
        W,
        T
      for (V = 0, j = S.length; V < j; V++) {
        X = S[V]
        if (X.hasAttribute("data-no-instant")) {
          continue
        }
        Q = d.createElement("script")
        if (X.src) {
          Q.src = X.src
        }
        if (X.innerHTML) {
          Q.innerHTML = X.innerHTML
        }
        W = X.parentNode
        T = X.nextSibling
        W.removeChild(X)
        W.insertBefore(Q, T)
      }
    }
  }
  function n(Q) {
    if (!F && "display" in I && +new Date() - (I.start + I.display) < 100) {
      return
    }
    if (l) {
      clearTimeout(l)
      l = false
    }
    if (!Q) {
      Q = e
    }
    if (a && (Q == L || o)) {
      return
    }
    a = true
    o = false
    L = Q
    A = false
    u = false
    I = { start: +new Date() }
    b("fetch")
    G.open("GET", Q)
    G.send()
  }
  function w(Q) {
    if (!("display" in I)) {
      I.display = +new Date() - I.start
    }
    if (l) {
      if (L && L != Q) {
        r.href = Q
        return
      }
      n(Q)
      H.start(0, true)
      b("wait")
      o = true
      return
    }
    if (!a || o) {
      r.href = Q
      return
    }
    if (u) {
      r.href = L
      return
    }
    if (!A) {
      H.start(0, true)
      b("wait")
      o = true
      return
    }
    c[C].scrollY = pageYOffset
    p()
    k(h, A, L)
  }
  var H = (function () {
    var Z, U, aa, Q, Y
    function ab() {
      Z = d.createElement("div")
      Z.id = "instantclick"
      U = d.createElement("div")
      U.id = "instantclick-bar"
      U.className = "instantclick-bar"
      Z.appendChild(U)
      var af = ["Webkit", "Moz", "O"]
      aa = "transform"
      if (!(aa in U.style)) {
        for (var ac = 0; ac < 3; ac++) {
          if (af[ac] + "Transform" in U.style) {
            aa = af[ac] + "Transform"
          }
        }
      }
      var ae = "transition"
      if (!(ae in U.style)) {
        for (var ac = 0; ac < 3; ac++) {
          if (af[ac] + "Transition" in U.style) {
            ae = "-" + af[ac].toLowerCase() + "-" + ae
          }
        }
      }
      var ad = d.createElement("style")
      ad.innerHTML = "#instantclick{position:" + (E ? "absolute" : "fixed") + ";top:0;left:0;width:100%;pointer-events:none;z-index:2147483647;" + ae + ":opacity .25s .1s}.instantclick-bar{background:#29d;width:100%;margin-left:-100%;height:2px;" + ae + ":all .25s}"
      d.head.appendChild(ad)
      if (E) {
        S()
        addEventListener("resize", S)
        addEventListener("scroll", S)
      }
    }
    function R(ac, ad) {
      Q = ac
      if (d.getElementById(Z.id)) {
        d.body.removeChild(Z)
      }
      Z.style.opacity = "1"
      if (d.getElementById(Z.id)) {
        d.body.removeChild(Z)
      }
      X()
      if (ad) {
        setTimeout(V, 0)
      }
      clearTimeout(Y)
      Y = setTimeout(T, 500)
    }
    function V() {
      Q = 10
      X()
    }
    function T() {
      Q += 1 + Math.random() * 2
      if (Q >= 98) {
        Q = 98
      } else {
        Y = setTimeout(T, 500)
      }
      X()
    }
    function X() {
      U.style[aa] = "translate(" + Q + "%)"
      if (!d.getElementById(Z.id)) {
        d.body.appendChild(Z)
      }
    }
    function W() {
      if (d.getElementById(Z.id)) {
        clearTimeout(Y)
        Q = 100
        X()
        Z.style.opacity = "0"
        return
      }
      R(Q == 100 ? 0 : Q)
      setTimeout(W, 0)
    }
    function S() {
      Z.style.left = pageXOffset + "px"
      Z.style.width = innerWidth + "px"
      Z.style.top = pageYOffset + "px"
      var ad = "orientation" in window && Math.abs(orientation) == 90,
        ac = (innerWidth / screen[ad ? "height" : "width"]) * 2
      Z.style[aa] = "scaleY(" + ac + ")"
    }
    return { init: ab, start: R, done: W }
  })()
  var i = "pushState" in history && (!B.match("Android") || B.match("Chrome/")) && r.protocol != "file:"
  function J() {
    if (C) {
      return
    }
    if (!i) {
      b("change", true)
      return
    }
    for (var S = arguments.length - 1; S >= 0; S--) {
      var Q = arguments[S]
      if (Q === true) {
        x = true
      } else {
        if (Q == "mousedown") {
          F = true
        } else {
          if (typeof Q == "number") {
            v = Q
          }
        }
      }
    }
    C = t(r.href)
    c[C] = { body: d.body, title: d.title, scrollY: pageYOffset }
    var R = d.head.children,
      T,
      U
    for (var S = R.length - 1; S >= 0; S--) {
      T = R[S]
      if (T.hasAttribute("data-instant-track")) {
        U = T.getAttribute("href") || T.getAttribute("src") || T.innerHTML
        g.push(U)
      }
    }
    G = new XMLHttpRequest()
    G.addEventListener("readystatechange", s)
    m(true)
    H.init()
    b("change", true)
    addEventListener("popstate", function () {
      var V = t(r.href)
      if (V == C) {
        return
      }
      if (!(V in c)) {
        r.href = r.href
        return
      }
      c[C].scrollY = pageYOffset
      C = V
      k(c[V].title, c[V].body, false, c[V].scrollY)
    })
  }
  function z(Q, R) {
    y[Q].push(R)
  }
  return { supported: i, init: J, on: z }
})(document, location)
