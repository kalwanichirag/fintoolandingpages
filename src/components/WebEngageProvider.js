"use client";
import { useEffect } from "react";

export default function WebEngageProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (function (w, e, b, n, g) {
      function o(e, t) {
        e[t[t.length - 1]] = function () {
          r.__queue.push([t.join("."), arguments]);
        };
      }
      var i, s,
        r = w[b],
        z = " ",
        l = "init options track screen onReady".split(z),
        a = "webPersonalization feedback survey notification notificationInbox".split(z),
        c = "options render clear abort".split(z),
        p = "Prepare Render Open Close Submit Complete View Click".split(z),
        u = "identify login logout setAttribute".split(z);

      if (!r || !r.__v) {
        for (w[b] = r = { __queue: [], __v: "6.0", user: {} }, i = 0; i < l.length; i++) o(r, [l[i]]);
        for (i = 0; i < a.length; i++) {
          for (r[a[i]] = {}, s = 0; s < c.length; s++) o(r[a[i]], [a[i], c[s]]);
          for (s = 0; s < p.length; s++) o(r[a[i]], [a[i], "on" + p[s]]);
        }
        for (i = 0; i < u.length; i++) o(r.user, ["user", u[i]]);
        setTimeout(function () {
          var f = e.createElement("script");
          f.type = "text/javascript";
          f.async = true;
          f.src =
            (e.location.protocol === "https:"
              ? "https://widgets.in.webengage.com"
              : "http://widgets.in.webengage.com") + "/js/webengage-min-v-6.0.js";
          e.body.appendChild(f);
        });
      }
    })(window, document, "webengage");

    window.webengage.init("in~aa131666");
  }, []);

  return null;
}
