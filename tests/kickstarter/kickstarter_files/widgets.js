! function t(e, i, n) {
    function r(s, a) {
        if (!i[s]) {
            if (!e[s]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(s, !0);
                if (o) return o(s, !0);
                var u = new Error("Cannot find module '" + s + "'");
                throw u.code = "MODULE_NOT_FOUND", u
            }
            var c = i[s] = {
                exports: {}
            };
            e[s][0].call(c.exports, function(t) {
                var i = e[s][1][t];
                return r(i ? i : t)
            }, c, c.exports, t, e, i, n)
        }
        return i[s].exports
    }
    for (var o = "function" == typeof require && require, s = 0; s < n.length; s++) r(n[s]);
    return r
}({
    1: [function(t, e) {
        function i(t, e) {
            var i;
            return e = e || o, (i = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.msRequestAnimationFrame || e.oRequestAnimationFrame || function() {
                e.setTimeout(function() {
                    t(+new Date)
                }, 1e3 / 60)
            })(t)
        }

        function n(t, e) {
            return Math.sin(Math.PI / 2 * e) * t
        }

        function r(t, e, n, r, o) {
            function s() {
                var l = +new Date,
                    u = l - a,
                    c = Math.min(u / n, 1),
                    d = r ? r(e, c) : e * c,
                    h = 1 == c;
                t(d, h), h || i(s, o)
            }
            var a = +new Date;
            i(s)
        }
        var o = t("env/window");
        e.exports = {
            animate: r,
            requestAnimationFrame: i,
            easeOut: n
        }
    }, {
        "env/window": 12
    }],
    2: [function(t, e) {
        function i() {
            return a.builtUrl(u)
        }

        function n(t, e) {
            var i, n, r;
            return i = "default", n = s.isRtlLang(e) ? "rtl" : "ltr", r = [t, l.css, i, n, "css"].join("."), a.base() + "/css/" + r
        }

        function r(t) {
            return function() {
                return o.isEnabled() ? t.apply(null, arguments) : i()
            }
        }
        var o = t("assets/refresh"),
            s = t("i18n/util"),
            a = t("tfw/util/assets"),
            l = t("var/thumbprints"),
            u = "embed/timeline.css";
        e.exports = {
            tweet: r(n.bind(null, "tweet")),
            timeline: i,
            video: r(n.bind(null, "video"))
        }
    }, {
        "assets/refresh": 3,
        "i18n/util": 18,
        "tfw/util/assets": 35,
        "var/thumbprints": 70
    }],
    3: [function(t, e) {
        function i() {
            return a.contains(r.location.hash, l)
        }

        function n() {
            return i() || s.asBoolean(o.val("widgets:new-embed-design"))
        }
        var r = t("env/window"),
            o = t("globals/pagemetadata"),
            s = t("util/typevalidator"),
            a = t("util/util"),
            l = "__twREFRESH__";
        e.exports = {
            isEnabled: n
        }
    }, {
        "env/window": 12,
        "globals/pagemetadata": 15,
        "util/typevalidator": 64,
        "util/util": 67
    }],
    4: [function(t, e) {
        function i(t) {
            return new RegExp("\\b" + t + "\\b", "g")
        }

        function n(t, e) {
            return t.classList ? void t.classList.add(e) : void(i(e)
                .test(t.className) || (t.className += " " + e))
        }

        function r(t, e) {
            return t.classList ? void t.classList.remove(e) : void(t.className = t.className.replace(i(e), " "))
        }

        function o(t, e, i) {
            return void 0 === i && t.classList && t.classList.toggle ? t.classList.toggle(e, i) : (i ? n(t, e) : r(t, e), i)
        }

        function s(t, e, o) {
            return t.classList && a(t, e) ? (r(t, e), void n(t, o)) : void(t.className = t.className.replace(i(e), o))
        }

        function a(t, e) {
            return t.classList ? t.classList.contains(e) : i(e)
                .test(t.className)
        }
        e.exports = {
            add: n,
            remove: r,
            replace: s,
            toggle: o,
            present: a
        }
    }, {}],
    5: [function(t, e) {
        function i(t) {
            var e = t.getAttribute("data-twitter-event-id");
            return e ? e : (t.setAttribute("data-twitter-event-id", ++m), m)
        }

        function n(t, e, i) {
            var n = 0,
                r = t && t.length || 0;
            for (n = 0; r > n; n++) t[n].call(e, i)
        }

        function r(t, e, i) {
            for (var o = i || t.target || t.srcElement, s = o.className.split(" "), a = 0, l = s.length; l > a; a++) n(e["." + s[a]], o, t);
            n(e[o.tagName], o, t), t.cease || o !== this && r.call(this, t, e, o.parentElement || o.parentNode)
        }

        function o(t, e, i, n) {
            function o(n) {
                r.call(t, n, i[e])
            }
            s(t, o, e, n), t.addEventListener(e, o, !1)
        }

        function s(t, e, i, n) {
            t.id && (p[t.id] = p[t.id] || [], p[t.id].push({
                el: t,
                listener: e,
                type: i,
                rootId: n
            }))
        }

        function a(t) {
            var e = p[t];
            e && (e.forEach(function(t) {
                t.el.removeEventListener(t.type, t.listener, !1), delete f[t.rootId]
            }), delete p[t])
        }

        function l(t, e, n, r) {
            var s = i(t);
            f[s] = f[s] || {}, f[s][e] || (f[s][e] = {}, o(t, e, f[s], s)), f[s][e][n] = f[s][e][n] || [], f[s][e][n].push(r)
        }

        function u(t, e, n) {
            var o = i(e),
                s = f[o] && f[o];
            r.call(e, {
                target: n
            }, s[t])
        }

        function c(t) {
            return h(t), d(t), !1
        }

        function d(t) {
            t && t.preventDefault ? t.preventDefault() : t.returnValue = !1
        }

        function h(t) {
            t && (t.cease = !0) && t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
        }
        var f = {},
            m = -1,
            p = {};
        e.exports = {
            stop: c,
            stopPropagation: h,
            preventDefault: d,
            delegate: l,
            simulate: u,
            removeDelegatesForWidget: a
        }
    }, {}],
    6: [function(t, e) {
        function i(t) {
            var e = t.charAt(0);
            return "." === e ? function(e) {
                var i = e.className ? e.className.split(/\s+/) : [];
                return r.contains(i, t.slice(1))
            } : "#" === e ? function(e) {
                return e.id === t.slice(1)
            } : function(e) {
                return e.tagName === t.toUpperCase()
            }
        }

        function n(t, e, o) {
            var s;
            if (e) return o = o || e && e.ownerDocument, s = r.isType("function", t) ? t : i(t), e === o ? s(e) ? e : void 0 : s(e) ? e : n(s, e.parentNode, o)
        }
        var r = t("util/util");
        e.exports = {
            closest: n
        }
    }, {
        "util/util": 67
    }],
    7: [function(t, e) {
        function i(t) {
            return t && 1 === t.nodeType ? t.offsetWidth || i(t.parentNode) : 0
        }
        e.exports = {
            effectiveWidth: i
        }
    }, {}],
    8: [function(t, e) {
        function i(t, e, i) {
            for (var n, r = [], o = 0; n = i[o]; o++) r.push(n[0]), r.push(n[1]);
            return t + e + r.join(":")
        }

        function n(t) {
            var e = t || "";
            return e.replace(/([A-Z])/g, function(t) {
                return "-" + t.toLowerCase()
            })
        }
        var r = t("env/document"),
            o = {};
        e.exports = function(t, e, s) {
            var a, l = r.createElement("span"),
                u = {},
                c = "",
                d = 0,
                h = 0,
                f = [];
            if (s = s || [], e = e || "", c = i(t, e, s), o[c]) return o[c];
            l.className = e + " twitter-measurement";
            try {
                for (; a = s[d]; d++) l.style[a[0]] = a[1]
            } catch (m) {
                for (; a = s[h]; h++) f.push(n(a[0]) + ":" + a[1]);
                l.setAttribute("style", f.join(";") + ";")
            }
            return l.innerHTML = t, r.body.appendChild(l), u.width = l.clientWidth || l.offsetWidth, u.height = l.clientHeight || l.offsetHeight, r.body.removeChild(l), l = null, o[c] = u
        }
    }, {
        "env/document": 9
    }],
    9: [function(t, e) {
        e.exports = document
    }, {}],
    10: [function(t, e) {
        e.exports = location
    }, {}],
    11: [function(t, e) {
        e.exports = navigator
    }, {}],
    12: [function(t, e) {
        e.exports = window
    }, {}],
    13: [function(t, e) {
        function i(t, e, i) {
            e.ready = t.then.bind(t), i && Array.isArray(e[i]) && (e[i].forEach(t.then.bind(t)), delete e[i])
        }
        e.exports = {
            exposeReadyPromise: i
        }
    }, {}],
    14: [function(t, e) {
        function i(t) {
            return s.isType("string", t) ? t.split(".") : s.isType("array", t) ? t : []
        }

        function n(t, e) {
            var n = i(e),
                r = n.slice(0, -1);
            return r.reduce(function(t, e, i) {
                if (t[e] = t[e] || {}, !s.isObject(t[e])) throw new Error(r.slice(0, i + 1)
                    .join(".") + " is already defined with a value.");
                return t[e]
            }, t)
        }

        function r(t, e) {
            e = e || o, e[t] = e[t] || {}, Object.defineProperty(this, "base", {
                value: e[t]
            }), Object.defineProperty(this, "name", {
                value: t
            })
        }
        var o = t("env/window"),
            s = t("util/util");
        s.aug(r.prototype, {
            get: function(t) {
                var e = i(t);
                return e.reduce(function(t, e) {
                    return s.isObject(t) ? t[e] : void 0
                }, this.base)
            },
            set: function(t, e, r) {
                var o = i(t),
                    s = n(this.base, t),
                    a = o.slice(-1);
                return r && a in s ? s[a] : s[a] = e
            },
            init: function(t, e) {
                return this.set(t, e, !0)
            },
            unset: function(t) {
                var e = i(t),
                    n = this.get(e.slice(0, -1));
                n && delete n[e.slice(-1)]
            },
            aug: function(t) {
                var e = this.get(t),
                    i = s.toRealArray(arguments)
                    .slice(1);
                if (e = "undefined" != typeof e ? e : {}, i.unshift(e), !i.every(s.isObject)) throw new Error("Cannot augment non-object.");
                return this.set(t, s.aug.apply(null, i))
            },
            call: function(t) {
                var e = this.get(t),
                    i = s.toRealArray(arguments)
                    .slice(1);
                if (!s.isType("function", e)) throw new Error("Function " + t + "does not exist.");
                return e.apply(null, i)
            },
            fullPath: function(t) {
                var e = i(t);
                return e.unshift(this.name), e.join(".")
            }
        }), e.exports = r
    }, {
        "env/window": 12,
        "util/util": 67
    }],
    15: [function(t, e) {
            function i(t) {
                var e, i, n, s = 0;
                for (r = {}, t = t || o, e = t.getElementsByTagName("meta"); i = e[s]; s++) / ^ twitter: /.test(i.name)&&(n=i.name.replace(/ ^ twitter: /,""),r[n]=i.content)}function n(t){return r[t]}var r,o=t("env/document
                ");i(),e.exports={init:i,val:n}},{"
                env / document ":9}],16:[function(t,e){var i=t("
                globals / object ");e.exports=new i("
                __twttr ")},{"
                globals / object ":14}],17:[function(t,e){var i=t("
                globals / object ");e.exports=new i("
                twttr ")},{"
                globals / object ":14}],18:[function(t,e){function i(t){return t=String(t).toLowerCase(),n.contains(r,t)}var n=t("
                util / util "),r=["
                ar ","
                fa ","
                he ","
                ur "];e.exports={isRtlLang:i}},{"
                util / util ":67}],19:[function(t,e){function i(t){var e=~o.host.indexOf("
                poptip.com ")?"asdf:o.href,i="original_referer="+e;return[t,i].join(-1==t.indexOf("?")?"?":"&")}function n(t){var e,n;t.altKey||t.metaKey||t.shiftKey||(e=a.closest(function(t){return"A"===t.tagName||"AREA"===t.tagName},t.target),e&&u.isIntentURL(e.href)&&(n=i(e.href),n=n.replace(/^http[:]/,"https:"),n=n.replace(/^\/\//,"https://"),l.open(n,e),s.preventDefault(t)))}function r(t){t.addEventListener("click",n,!1)}var o=t("env/location"),s=t("dom/delegate"),a=t("dom/get"),l=t("tfw/widget/intent"),u=t("util/twitter");e.exports={attachTo:r}},{"dom/delegate":5,"dom/get":6,"env/location":10,"tfw/widget/intent":43,"util/twitter":63}],20:[function(t,e){function i(t){var e=[];return d.forIn(t,function(t,i){e.push(t+"="+i)}),e.join(",")}function n(){return h+c.generate()}function r(t,e){function i(t){return Math.round(t/2)}return t>e?{coordinate:0,size:e}:{coordinate:i(e)-i(t),size:t}}function o(t,e,n){var o,a;e=s.parse(e),n=n||{},o=r(e.width,n.width||f),e.left=o.coordinate,e.width=o.size,a=r(e.height,n.height||m),e.top=a.coordinate,e.height=a.size,this.win=t,this.features=i(e)}var s,a=t("env/window"),l=t("util/options_parser"),u=t("util/twitter"),c=t("util/uid"),d=t("util/util"),h="intent_",f=a.screen.width,m=a.screen.height;s=(new l).defaults({width:550,height:520,personalbar:"0",toolbar:"0",location:"1",scrollbars:"1",resizable:"1"}),o.prototype.open=function(t){return u.isTwitterURL(t)?(this.name=n(),this.popup=this.win.open(t,this.name,this.features),this):void 0},o.open=function(t,e){var i=new o(a,e);return i.open(t)},e.exports=o},{"env/window":12,"util/options_parser":58,"util/twitter":63,"util/uid":65,"util/util":67}],21:[function(t,e){function i(t){l[t]=+new Date}function n(t){return l[t]?+new Date-l[t]:null}function r(t,e,i,r,s){var a=n(e);a&&o(t,i,r,a,s)}function o(t,e,i,n,r){var o,l=void 0===r?u:r;100*Math.random()>l||(i=a.aug(i||{},{duration_ms:n}),o={page:e,component:"performance",action:t},s.clientEvent(o,i,!0))}var s=t("scribe/pixel"),a=t("util/util"),l={},u=1;e.exports={start:i,end:n,track:o,endAndTrack:r}},{"scribe/pixel":30,"util/util":67}],22:[function(t,e){e.exports={PARSE_ERROR:{code:-32700,message:"Parse error"},INVALID_REQUEST:{code:-32600,message:"Invalid Request"},INVALID_PARAMS:{code:-32602,message:"Invalid params"},METHOD_NOT_FOUND:{code:-32601,message:"Method not found"},INTERNAL_ERROR:{code:-32603,message:"Internal error"}}},{}],23:[function(t,e){function i(t){this.registry=t||{}}function n(t){return d.isType("string",t)?JSON.parse(t):t}function r(t){var e,i,n;return d.isObject(t)?(e=t.jsonrpc===f,i=d.isType("string",t.method),n=!("id"in t)||o(t.id),e&&i&&n):!1}function o(t){var e,i,n;return e=d.isType("string",t),i=d.isType("number",t),n=null===t,e||i||n}function s(t){return d.isObject(t)&&!d.isType("function",t)}function a(t,e){return{jsonrpc:f,id:t,result:e}}function l(t,e){return{jsonrpc:f,id:o(t)?t:null,error:e}}function u(t){return h.every.apply(h,t).then(function(t){return t=t.filter(function(t){return void 0!==t}),t.length?t:void 0})}var c=t("rpc/jsonrpc/errors"),d=t("util/util"),h=t("util/promise"),f="2.0";i.prototype._invoke=function(t,e){var i,n,r;i=this.registry[t.method],n=t.params||[],n=d.isType("array",n)?n:[n];try{r=i.apply(e.source||null,n)}catch(o){r=h.reject(o.message)}return h.isThenable(r)?r:h.fulfill(r)},i.prototype._processRequest=function(t,e){function i(e){return a(t.id,e)}function n(){return l(t.id,c.INTERNAL_ERROR)}var o;return r(t)?(o="params"in t&&!s(t.params)?h.fulfill(l(t.id,c.INVALID_PARAMS)):this.registry[t.method]?this._invoke(t,{source:e}).then(i,n):h.fulfill(l(t.id,c.METHOD_NOT_FOUND)),null!=t.id?o:h.fulfill()):h.fulfill(l(t.id,c.INVALID_REQUEST))},i.prototype.attachReceiver=function(t){return t.attachTo(this),this},i.prototype.bind=function(t,e){return this.registry[t]=e,this},i.prototype.receive=function(t,e){var i,r,o,s=this;try{t=n(t)}catch(a){return h.fulfill(l(null,c.PARSE_ERROR))}return e=e||null,i=d.isType("array",t),r=i?t:[t],o=r.map(function(t){return s._processRequest(t,e)}),i?u(o):o[0]},e.exports=i},{"rpc/jsonrpc/errors":22,"util/promise":60,"util/util":67}],24:[function(t,e){function i(t,e){t&&t.postMessage&&(e=h?JSON.stringify(e):e,t.postMessage(e,"*"))}function n(t){var e=t.document;this.server=null,this.isTwitterFrame=d.isTwitterURL(e.location.href),t.addEventListener("message",this._onMessage.bind(this),!1)}function r(t){this.pending={},this.target=t,this.isTwitterHost=d.isTwitterURL(s.href),a.addEventListener("message",this._onMessage.bind(this),!1)}function o(t){return arguments.length>0&&(h=!!t),h}var s=t("env/location"),a=t("env/window"),l=t("util/env"),u=t("util/util"),c=t("util/promise"),d=t("util/twitter"),h=l.ie9();u.aug(n.prototype,{_onMessage:function(t){this.server&&(!this.isTwitterFrame||d.isTwitterURL(t.origin))&&this.server.receive(t.data,t.source).then(function(e){e&&i(t.source,e)})},attachTo:function(t){this.server=t},detach:function(){this.server=null}}),u.aug(r.prototype,{_processResponse:function(t){var e=this.pending[t.id];e&&(e.fulfill(t),delete this.pending[t.id])},_onMessage:function(t){var e=t.data;if(!this.isTwitterHost||d.isTwitterURL(t.origin)){if(u.isType("string",e))try{e=JSON.parse(e)}catch(i){return}e=u.isType("array",e)?e:[e],e.forEach(this._processResponse.bind(this))}},send:function(t){var e,n=this.pending;return e=t.id?new c(function(e){n[t.id]=e}):c.fulfill(),i(this.target,t),e}}),e.exports={Receiver:n,Dispatcher:r,_stringifyPayload:o}},{"env/location":10,"env/window":12,"util/env":53,"util/promise":60,"util/twitter":63,"util/util":67}],25:[function(t,e){function i(t,e,i,r){var a,l=this;this.readyPromise=new s(function(t){l.resolver=t}),this.attrs=t||{},this.styles=e||{},this.appender=i||function(t){n.body.appendChild(t)},this.layout=r||function(t){return new s(function(e){return e.fulfill(t())})},this.frame=a=o(this.attrs,this.styles),a.onreadystatechange=a.onload=this.getCallback(this.onLoad),this.layout(function(){l.appender(a)})}var n=t("env/document"),r=t("util/env"),o=t("util/iframe"),s=t("util/promise"),a=t("globals/private"),l=0;i.prototype.getCallback=function(t){var e=this,i=!1;return function(){i||(i=!0,t.call(e))}},i.prototype.registerCallback=function(t){var e="cb"+l++;return a.set(["sandbox",e],t),e},i.prototype.onLoad=function(){try{this.document=this.frame.contentWindow.document}catch(t){return void this.setDocDomain()}this.writeStandardsDoc(),this.resolver.fulfill(this)},i.prototype.ready=function(){return this.readyPromise},i.prototype.setDocDomain=function(){var t=this,e=o(this.attrs,this.styles),i=this.registerCallback(this.getCallback(this.onLoad));e.src=["javascript:",'document.write("");',"try { window.parent.document; }","catch (e) {",'document.domain="'+n.domain+'";',"}","window.parent."+a.fullPath(["sandbox",i])+"();"].join(""),this.layout(function(){t.frame.parentNode.removeChild(t.frame),t.frame=null,t.appender?t.appender(e):n.body.appendChild(e),t.frame=e})},i.prototype.writeStandardsDoc=function(){if(r.anyIE()&&!r.cspEnabled()){var t=["<!DOCTYPE html>","<html>","<head>","<scr","ipt>","try { window.parent.document; }",'catch (e) {document.domain="'+n.domain+'";}',"</scr","ipt>","</head>","<body></body>","</html>"].join("");this.document.write(t),this.document.close()}},e.exports=i},{"env/document":9,"globals/private":16,"util/env":53,"util/iframe":55,"util/promise":60}],26:[function(t,e){function i(){var t,e;g={},o||(t=s.body.offsetHeight,e=s.body.offsetWidth,(t!=v||e!=w)&&(p.forEach(function(t){t.dispatchFrameResize(w,v)}),v=t,w=e))}function n(t){var e;return t.id?t.id:(e=t.getAttribute("data-twttr-id"))?e:(e="twttr-sandbox-"+m++,t.setAttribute("data-twttr-id",e),e)}function r(t,e){var i=this;u.apply(this,[t,e]),this._resizeHandlers=[],p=p.filter(function(t){var e=t._frame.parentElement;return e||h.async(function(){f.removeDelegatesForWidget(t._frame.id)}),e}),p.push(this),this._win.addEventListener("resize",function(){i.dispatchFrameResize()},!1)}var o,s=t("env/document"),a=t("env/window"),l=t("sandbox/baseframe"),u=t("sandbox/minimal"),c=t("util/env"),d=t("util/promise"),h=t("util/util"),f=t("dom/delegate"),m=0,p=[],g={},w=0,v=0;a.addEventListener("resize",i,!1),r.prototype=new u,h.aug(r.prototype,{dispatchFrameResize:function(){var t=this._frame.parentNode,e=n(t),i=g[e];o=!0,this._resizeHandlers.length&&(i||(i=g[e]={w:this._frame.offsetWidth,h:this._frame.offsetHeight}),(this._frameWidth!=i.w||this._frameHeight!=i.h)&&(this._frameWidth=i.w,this._frameHeight=i.h,this._resizeHandlers.forEach(function(t){t(i.w,i.h)}),a.setTimeout(function(){g={}},50)))},appendStyleSheet:function(t){var e=this,i=this._doc.createElement("link");return i.type="text/css",i.rel="stylesheet",i.href=t,this.layout(function(){return e._head.appendChild(i)})},appendCss:function(t){var e,i=this;return c.cspEnabled()?d.reject("CSP enabled; cannot embed inline styles."):(e=this._doc.createElement("style"),e.type="text/css",e.styleSheet?e.styleSheet.cssText=t:e.appendChild(this._doc.createTextNode(t)),this.layout(function(){return i._head.appendChild(e)}))},style:function(t,e){var i=this;return this.layout(function(){e&&(i._frame.style.cssText=""),h.forIn(t,function(t,e){i._frame.style[t]=e})})},onresize:function(t){this._resizeHandlers.push(t)},width:function(t){return void 0!==t&&(this._frame.style.width=t+"px"),c.ios()?Math.min(this._frame.parentNode.offsetWidth,this._frame.offsetWidth):this._frame.offsetWidth},height:function(t){return void 0!==t&&(this._frame.height=t),this._frame.offsetHeight}}),r.createSandbox=function(t,e,i,n){var o=new l(t,e,i,n);return o.ready().then(function(t){return new r(t.frame,t.layout)})},e.exports=r},{"dom/delegate":5,"env/document":9,"env/window":12,"sandbox/baseframe":25,"sandbox/minimal":27,"util/env":53,"util/promise":60,"util/util":67}],27:[function(t,e){function i(t,e){t&&(this._frame=t,this._win=t.contentWindow,this._doc=this._win.document,this._body=this._doc.body,this._head=this._body.parentNode.children[0],this.layout=e,this._doc.documentElement.className="SandboxRoot")}var n=t("sandbox/baseframe"),r=t("util/util");r.aug(i.prototype,{createElement:function(t){return this._doc.createElement(t)},createDocumentFragment:function(){return this._doc.createDocumentFragment()},appendChild:function(t){var e=this;return this.layout(function(){return e._body.appendChild(t)})},setBaseTarget:function(t){var e=this,i=this._doc.createElement("base");return i.target=t,this.layout(function(){return e._head.appendChild(i)})},setTitle:function(t){t&&(this._frame.title=t)},element:function(){return this._frame},document:function(){return this._doc}}),i.createSandbox=function(t,e,r,o){var s=new n(t,e,r,o);return s.ready().then(function(t){return new i(t.frame,t.layout)})},e.exports=i},{"sandbox/baseframe":25,"util/util":67}],28:[function(t,e){function i(){return u.formatGenericEventData("syndicated_impression",{})}function n(){a("tweet")}function r(){a("timeline")}function o(){a("video")}function s(){a("partnertweet")}function a(t){c.isHostPageSensitive()||d[t]||(d[t]=!0,l.scribe(u.formatClientEventNamespace({page:t,action:"impression"}),i(),u.AUDIENCE_ENDPOINT))}var l=t("scribe/pixel"),u=t("scribe/util"),c=t("util/tld"),d={};e.exports={scribePartnerTweetAudienceImpression:s,scribeTweetAudienceImpression:n,scribeTimelineAudienceImpression:r,scribeVideoAudienceImpression:o,resetTracking:function(){d={}}}},{"scribe/pixel":30,"scribe/util":31,"util/tld":62}],29:[function(t,e){function i(){return E?A:(p.createSandbox({id:"rufous-sandbox"},{display:"none"}).then(function(t){d=t,u=a(),c=l(),h.fulfill([u,c])}),E=!0,A)}function n(t,e){var i,n,r;v.isObject(t)&&v.isObject(e)&&(r=w.flattenClientEventPayload(t,e),i=u.firstChild,i.value=+(+i.value||r.dnt||0),n=d.createElement("input"),n.type="hidden",n.name="l",n.value=w.stringify(r),u.appendChild(n))}function r(t,e,i){var r=!v.isObject(t),o=e?!v.isObject(e):!1;r||o||A.then(function(){n(w.formatClientEventNamespace(t),w.formatClientEventData(e,i))})}function o(){return A.then(function(){if(u.children.length<=2)return g.reject();var t=g.every(d.appendChild(u),d.appendChild(c)).then(function(t){var e=t[0],i=t[1];return i.addEventListener("load",function(){s(e,i)(),b.get("events").trigger("logFlushed")}),e.submit(),t});return u=a(),c=l(),t})}function s(t,e){return function(){var i=t.parentNode;i&&(i.removeChild(t),i.removeChild(e))}}function a(){var t=d.createElement("form"),e=d.createElement("input"),i=d.createElement("input");return x++,t.action=w.CLIENT_EVENT_ENDPOINT,t.method="POST",t.target=_+x,t.id=T+x,e.type="hidden",e.name="dnt",e.value=m.enabled(),i.type="hidden",i.name="tfw_redirect",i.value=w.RUFOUS_REDIRECT,t.appendChild(e),t.appendChild(i),t}function l(){var t=_+x;return f({id:t,name:t,width:0,height:0,border:0},{display:"none"},d.document())}var u,c,d,h,f=t("util/iframe"),m=t("util/donottrack"),p=t("sandbox/minimal"),g=t("util/promise"),w=t("scribe/util"),v=t("util/util"),b=t("globals/twttr"),y=Math.floor(1e3*Math.random())+"_",_="rufous-frame-"+y+"-",T="rufous-form-"+y+"-",x=0,E=!1,A=new g(function(t){h=t});e.exports={clientEvent:r,flush:o,init:i}},{"globals/twttr":17,"sandbox/minimal":27,"scribe/util":31,"util/donottrack":52,"util/iframe":55,"util/promise":60,"util/util":67}],30:[function(t,e){function i(t,e,i){return n(t,e,i,2)}function n(t,e,i,n){var r=!f.isObject(t),s=e?!f.isObject(e):!1;r||s||o(h.formatClientEventNamespace(t),h.formatClientEventData(e,i,n),h.CLIENT_EVENT_ENDPOINT)}function r(t,e,i,r){var o=h.extractTermsFromDOM(t.target||t.srcElement);o.action=r||"click",n(o,e,i)}function o(t,e,i){var n,r;i&&f.isObject(t)&&f.isObject(e)&&(n=h.flattenClientEventPayload(t,e),r={l:h.stringify(n)},n.dnt&&(r.dnt=1),u(d.url(i,r)))}function s(t,e,i,n){var r,o=!f.isObject(t),s=e?!f.isObject(e):!1;if(!o&&!s)return r=h.flattenClientEventPayload(h.formatClientEventNamespace(t),h.formatClientEventData(e,i,n)),a(r)}function a(t){return p.push(t),p}function l(){var t,e,i=d.url(h.CLIENT_EVENT_ENDPOINT,{dnt:0,l:""}),n=encodeURIComponent(i).length;return p.length>1&&s({page:"widgets_js",component:"scribe_pixel",action:"batch_log"},{}),t=p,p=[],e=t.reduce(function(e,i,r){var o,s,a=e.length,l=a&&e[a-1],u=r+1==t.length;return u&&i.event_namespace&&"batch_log"==i.event_namespace.action&&(i.message=["entries:"+r,"requests:"+a].join("/")),o=h.stringify(i),s=encodeURIComponent(o).length+3,n+s>m?e:((!l||l.urlLength+s>m)&&(l={urlLength:n,items:[]},e.push(l)),l.urlLength+=s,l.items.push(o),e)},[]),e.map(function(t){var e={l:t.items};return c.enabled()&&(e.dnt=1),u(d.url(h.CLIENT_EVENT_ENDPOINT,e))})}function u(t){var e=new Image;return e.src=t}var c=t("util/donottrack"),d=t("util/querystring"),h=t("scribe/util"),f=t("util/util"),m=2083,p=[];e.exports={_enqueueRawObject:a,scribe:o,clientEvent:n,clientEvent2:i,enqueueClientEvent:s,flushClientEvents:l,interaction:r}},{"scribe/util":31,"util/donottrack":52,"util/querystring":61,"util/util":67}],31:[function(t,e){function i(t,e){var n;return e=e||{},t&&t.nodeType===Node.ELEMENT_NODE?((n=t.getAttribute("data-scribe"))&&n.split(" ").forEach(function(t){var i=t.trim().split(":"),n=i[0],r=i[1];n&&r&&!e[n]&&(e[n]=r)}),i(t.parentNode,e)):e}function n(t){return c.aug({client:"tfw"},t||{})}function r(t,e,i){var n=t&&t.widget_origin||l.referrer;return t=o("tfw_client_event",t,n),t.client_version=f,t.format_version=void 0!==i?i:1,e||(t.widget_origin=n),t}function o(t,e,i){return e=e||{},c.aug(e,{_category_:t,triggered_on:e.triggered_on||+new Date,dnt:u.enabled(i)})}function s(t,e){return c.aug({},e,{event_namespace:t})}function a(t){var e,i=Array.prototype.toJSON;return delete Array.prototype.toJSON,e=JSON.stringify(t),i&&(Array.prototype.toJSON=i),e}var l=t("env/document"),u=t("util/donottrack"),c=t("util/util"),d=t("var/build"),h=t("globals/private"),f=d.version,m=h.get("endpoints.rufous")||"https://syndication.twitter.com/i/jot",p=h.get("endpoints.rufous")||"https://syndication.twitter.com/i/jot/syndication",g=h.get("endpoints.rufousRedirect")||"https://platform.twitter.com/jot.html";e.exports={extractTermsFromDOM:i,flattenClientEventPayload:s,formatGenericEventData:o,formatClientEventData:r,formatClientEventNamespace:n,stringify:a,AUDIENCE_ENDPOINT:p,CLIENT_EVENT_ENDPOINT:m,RUFOUS_REDIRECT:g}},{"env/document":9,"globals/private":16,"util/donottrack":52,"util/util":67,"var/build":69}],32:[function(t,e){function i(t,e,i,n){return t=t||[],i=i||{},function(){var r,a,u,c,d=Array.prototype.slice.apply(arguments,[0,t.length]),h=Array.prototype.slice.apply(arguments,[t.length]);return h.forEach(function(t){return t?1===t.nodeType?void(u=t):o.isType("function",t)?void(r=t):void(o.isType("object",t)&&(a=t)):void 0}),d.length!=t.length||0===h.length?(r&&o.async(function(){r(!1)}),s.reject("Not enough parameters")):u?(a=o.aug(a||{},i),a.targetEl=u,t.forEach(function(t){a[t]=d.shift()}),c=new e(a),l.doLayout(),c.render(),n&&n(),r&&c.completed().then(r,function(){r(!1)}),c.completed()):(r&&o.async(function(){r(!1)}),s.reject("No target specified"))}}function n(t){var e;t.linkColor=t.linkColor||t.previewParams.link_color,t.theme=t.theme||t.previewParams.theme,t.height=t.height||t.previewParams.height,e=new f(t),this.render=e.render.bind(e),this.completed=e.completed.bind(e)}var r=t("env/window"),o=t("util/util"),s=t("util/promise"),a=t("util/twitter"),l=t("tfw/widget/base"),u=t("tfw/widget/tweetbutton"),c=t("tfw/widget/follow"),d=t("tfw/widget/embed"),h=t("tfw/widget/video"),f=t("tfw/widget/timeline"),m=i(["url"],u,{type:"share"}),p=i(["hashtag"],u,{type:"hashtag"}),g=i(["screenName"],u,{type:"mention"}),w=i(["screenName"],c),v=i(["tweetId"],d,{},d.fetchAndRender),b=i(["tweetId"],h,{},h.fetchAndRender),y=i(["widgetId"],f),_=i(["previewParams"],n),T={createShareButton:m,createMentionButton:g,createHashtagButton:p,createFollowButton:w,createTweet:v,createVideo:b,createTweetEmbed:v,createTimeline:y};a.isTwitterURL(r.location.href)&&(T.createTimelinePreview=_),e.exports=T},{"env/window":12,"tfw/widget/base":40,"tfw/widget/embed":41,"tfw/widget/follow":42,"tfw/widget/timeline":45,"tfw/widget/tweetbutton":46,"tfw/widget/video":47,"util/promise":60,"util/twitter":63,"util/util":67}],33:[function(t,e){function i(t,e){var i=l.connect({src:t,iframe:{name:e,style:"position:absolute;top:-9999em;width:10px;height:10px"}});return u(i).expose({trigger:function(t,e,i){e=e||{};var n=e.region;delete e.region,h.get("events").trigger(t,{target:c.find(i),data:e,region:n,type:t})},initXPHub:function(){r(!0)}}),i}function n(t){return t?d.secureHubId:d.contextualHubId}function r(t){var e=a.base(t)+"/widgets/hub.0e7931819b6cfb483aa5ddbe7670a1c6.html",r=n(t);if(!s.getElementById(r))return i(e,r)}function o(t,e){var i=l.connect({window:{width:550,height:450},src:t});u(i).expose({trigger:function(t,i){h.get("events").trigger(t,{target:e,region:"intent",type:t,data:i})}})}var s=t("env/document"),a=t("tfw/util/assets"),l=t("xd/parent"),u=t("xd/jsonrpc"),c=t("tfw/widget/base"),d=t("util/widgetrpc"),h=t("globals/twttr");e.exports={init:r,openIntent:o}},{"env/document":9,"globals/twttr":17,"tfw/util/assets":35,"tfw/widget/base":40,"util/widgetrpc":68,"xd/jsonrpc":75,"xd/parent":76}],34:[function(t,e){function i(t){return t=t||n,t.top.postMessage?t===t.top?void t.addEventListener("message",function(t){var e;if(!t.data||"{"==t.data[0]){try{e=JSON.parse(t.data)}catch(i){}e&&"twttr:private:requestArticleUrl"==e.name&&t.source.postMessage(JSON.stringify({name:"twttr:private:provideArticleUrl",data:{url:r.rootDocumentLocation(),dnt:o.enabled()}}),"*")}},!1):(t.addEventListener("message",function(t){var e;if(!t.data||"{"==t.data[0]){try{e=JSON.parse(t.data)}catch(i){}if(e&&"twttr:private:provideArticleUrl"==e.name){if(!e.data)return;r.rootDocumentLocation(e.data.url),e.data.dnt&&o.setOn()}}},!1),void t.top.postMessage(JSON.stringify({name:"twttr:private:requestArticleUrl"}),"*")):void 0}var n=t("env/window"),r=t("util/document"),o=t("util/donottrack");e.exports={requestArticleUrl:i}},{"env/window":12,"util/document":50,"util/donottrack":52}],35:[function(t,e){function i(t,e){var i,o=l[t];return"embed/timeline.css"===t&&a.contains(r.href,"localhost.twitter.com")?"/components/syndication-templates/lib/css/index.css":(i=s.retina()?"2x":"default",e&&(i+=".rtl"),n()+"/"+o[i])}function n(t){var e=o.get("host");return u(t)+"://"+e}var r=t("env/location"),o=t("globals/private"),s=t("util/env"),a=t("util/util"),l={"embed/timeline.css":{"default":"embed/timeline.ba2a91a7d215f48be9997d41ee8f8d7a.default.css","2x":"embed/timeline.ba2a91a7d215f48be9997d41ee8f8d7a.2x.css",gif:"embed/timeline.ba2a91a7d215f48be9997d41ee8f8d7a.gif.css","default.rtl":"embed/timeline.ba2a91a7d215f48be9997d41ee8f8d7a.default.rtl.css","2x.rtl":"embed/timeline.ba2a91a7d215f48be9997d41ee8f8d7a.2x.rtl.css","gif.rtl":"embed/timeline.ba2a91a7d215f48be9997d41ee8f8d7a.gif.rtl.css"}},u=function(){return/^http\:$/.test(r.protocol)?function(t){return t?"https":"http"}:function(){return"https"}}();e.exports={builtUrl:i,base:n}},{"env/location":10,"globals/private":16,"util/env":53,"util/util":67}],36:[function(t,e){function i(t){return function(e){e.error?t.error&&t.error(e):e.headers&&200!=e.headers.status?(t.error&&t.error(e),u.warn(e.headers.message)):t.success&&t.success(e),t.complete&&t.complete(e),n(t)}}function n(t){var e=t.script;e&&(e.onload=e.onreadystatechange=null,e.parentNode&&e.parentNode.removeChild(e),t.script=void 0,e=void 0),t.callbackName&&l.unset(["callbacks",t.callbackName])}function r(t){var e={};return t.success&&c.isType("function",t.success)&&(e.success=t.success),t.error&&c.isType("function",t.error)&&(e.error=t.error),t.complete&&c.isType("function",t.complete)&&(e.complete=t.complete),e}var o=t("env/document"),s=t("env/location"),a=t("assets/refresh"),l=t("globals/private"),u=t("util/logger"),c=t("util/util"),d=t("util/querystring"),h="cb",f=0,m=!1,p={},g=c.aug({tweets:"https://syndication.twitter.com/tweets.json",timeline:"https://cdn.syndication.twimg.com/widgets/timelines/",timelinePoll:"https://syndication.twitter.com/widgets/timelines/paged/",timelinePreview:"https://syndication.twitter.com/widgets/timelines/preview/",videos:"https://syndication.twitter.com/widgets/video/"},l.get("endpoints")||{});p.jsonp=function(t,e,n){var r=n||h+f,a=l.fullPath(["callbacks",r]),u=o.createElement("script"),c={callback:a,suppress_response_codes:!0};l.set(["callbacks",r],i(e)),(m||!/^https?\:$/.test(s.protocol))&&(t=t.replace(/^\/\//,"https://")),u.src=d.url(t,c),u.async="async",o.body.appendChild(u),e.script=u,e.callbackName=r,n||f++},p.config=function(t){(t.forceSSL===!0||t.forceSSL===!1)&&(m=t.forceSSL)},p.tweets=function(t){var e,i=r(t),n={ids:t.ids.join(","),lang:t.lang};a.isEnabled()&&(n.new_html=!0),e=d.url(g.tweets,n),this.jsonp(e,i)},p.videos=function(t){var e=r(t),i={ids:t.ids.join(","),lang:t.lang},n=d.url(g.videos,i);this.jsonp(n,e)},p.timeline=function(t){var e,i=r(t),n=9e5,o=Math.floor(+new Date/n),a={lang:t.lang,t:o,domain:s.host,dnt:t.dnt,override_type:t.overrideType,override_id:t.overrideId,override_name:t.overrideName,override_owner_id:t.overrideOwnerId,override_owner_name:t.overrideOwnerName,with_replies:t.withReplies};c.compact(a),e=d.url(g.timeline+t.id,a),this.jsonp(e,i,"tl_"+t.id+"_"+t.instanceId)},p.timelinePoll=function(t){var e,i=r(t),n={lang:t.lang,since_id:t.sinceId,max_id:t.maxId,min_position:t.minPosition,max_position:t.maxPosition,domain:s.host,dnt:t.dnt,override_type:t.overrideType,override_id:t.overrideId,override_name:t.overrideName,override_owner_id:t.overrideOwnerId,override_owner_name:t.overrideOwnerName,with_replies:t.withReplies};c.compact(n),e=d.url(g.timelinePoll+t.id,n),this.jsonp(e,i,"tlPoll_"+t.id+"_"+t.instanceId+"_"+(t.sinceId||t.maxId||t.maxPosition||t.minPosition))},p.timelinePreview=function(t){var e=r(t),i=t.params,n=d.url(g.timelinePreview,i);this.jsonp(n,e)},e.exports=p},{"assets/refresh":3,"env/document":9,"env/location":10,"globals/private":16,"util/logger":57,"util/querystring":61,"util/util":67}],37:[function(t,e){function i(){var t=36e5,e=o.combined(r)._;return void 0!==n?n:(n=!1,e&&/^\d+$/.test(e)&&(n=+new Date-parseInt(e)<t),n)}var n,r=t("env/location"),o=t("util/params");e.exports={isDynamicWidget:i}},{"env/location":10,"util/params":59}],38:[function(t,e){function i(t,e){return 2==t||3==t&&0===+e}function n(t){var e=t.split(" ");this.url=decodeURIComponent(e[0].trim()),this.width=+e[1].replace(/w$/,"").trim()}function r(t,e,i){var r,o,s,a;if(t=c.devicePixelRatio?t*c.devicePixelRatio:t,o=e.split(",").map(function(t){return new n(t)}),i)for(a=0;a<o.length;a++)o[a].url===i&&(r=o[a]);return s=o.reduce(function(e,i){return i.width<e.width&&i.width>=t?i:e},o[0]),r&&r.width>s.width?r:s}function o(t,e){var i,n=t.getAttribute("data-srcset"),o=t.src;n&&(i=r(e,n,o),t.src=i.url)}function s(t,e){e=void 0!==e?!!e:h.retina(),e&&d.toRealArray(t.getElementsByTagName("IMG")).forEach(function(t){var e=t.getAttribute("data-src-2x");
                    e && (t.src = e)
            })
    }

    function a(t, e, n, r) {
        var s = 0,
            a = t.querySelector(".multi-photo"),
            c = a && +a.getAttribute("data-photo-count");
        if (t) return d.toRealArray(t.querySelectorAll(".autosized-media"))
            .forEach(function(t) {
                var i = l(t.getAttribute("data-width"), t.getAttribute("data-height"), e, n);
                r(function() {
                    o(t, e), t.width = i.width, t.height = i.height, u(t, i)
                }), s = i.height > s ? i.height : s
            }), d.toRealArray(t.querySelectorAll("img.cropped-media"))
            .forEach(function(t) {
                var a, u, d, h = e - 12,
                    f = t.parentNode,
                    w = t.getAttribute("data-crop-x") || 0,
                    v = t.getAttribute("data-crop-y") || 0,
                    b = i(c, t.getAttribute("data-image-index")),
                    y = Math.floor(h / 2 - m),
                    _ = Math.floor(y / (b ? p : g));
                b || (_ -= m / 2), d = l(t.getAttribute("data-width"), t.getAttribute("data-height"), y, n, y, _), a = d.width - y - w, u = d.height - _ - v, 0 > a && Math.max(0, w += a), 0 > u && Math.max(0, v += u), r(function() {
                    o(t, y), t.width = d.width, t.height = d.height, f.style.width = y - 1 + "px", f.style.height = _ + "px", w && (t.style.marginLeft = "-" + Math.floor(d.width * w / 100) + "px"), v && (t.style.marginTop = "-" + Math.floor(d.height * v / 100) + "px")
                }), s = d.height * (b ? 2 : 1) > s ? d.height : s
            }), s
    }

    function l(t, e, i, n, r, o) {
        return i = i || t, n = n || e, r = r || 0, o = o || 0, t > i && (e *= i / t, t = i), e > n && (t *= n / e, e = n), r > t && (e *= r / t, t = r), o > e && (t *= o / e, e = o), {
            width: Math.floor(t),
            height: Math.floor(e)
        }
    }

    function u(t, e) {
        function i() {
            var t = {
                name: "tfw:resize",
                dimensions: e
            };
            r.postMessage(t, "*")
        }
        var n, r, o, s, a;
        t && (r = t.contentWindow, n = t.ownerDocument && t.ownerDocument.defaultView, o = h.ios() || h.android(), s = f.isTwitterURL(t.src), a = r && h.canPostMessage(r), o && s && a && (i(), n && n.addEventListener("message", function(t) {
            "tfw:requestsize" === t.data && i()
        }, !1)))
    }
    var c = t("env/window"),
        d = t("util/util"),
        h = t("util/env"),
        f = t("util/twitter"),
        m = 6,
        p = 8 / 9,
        g = 16 / 9;e.exports = {
        scaleDimensions: l,
        retinize: s,
        constrainMedia: a,
        __setSrcFromSet: o
    }
}, {
    "env/window": 12,
    "util/env": 53,
    "util/twitter": 63,
    "util/util": 67
}], 39: [function(t, e) {
    var i = t("util/querystring"),
        n = t("util/twitter");
    e.exports = function(t, e) {
        return function(r) {
            var o, s, a = "data-tw-params";
            if (r && n.isTwitterURL(r.href) && !r.getAttribute(a)) {
                if (r.setAttribute(a, !0), "function" == typeof e) {
                    o = e.call(this, r);
                    for (s in o) o.hasOwnProperty(s) && (t[s] = o[s])
                }
                r.href = i.url(r.href, t)
            }
        }
    }
}, {
    "util/querystring": 61,
    "util/twitter": 63
}], 40: [function(t, e) {
    function i(t) {
        var e, i = this;
        t && (t.ownerDocument ? (this.srcEl = t, this.classAttr = t.className.split(" ")) : (this.srcOb = t, this.classAttr = []), e = this.params(), this.id = this.generateId(), this.setLanguage(), this.related = e.related || this.dataAttr("related"), this.partner = e.partner || this.dataAttr("partner") || g.val("partner"), this.styleAttr = [], this.targetEl = t.targetEl, m.asBoolean(e.dnt || this.dataAttr("dnt")) && w.setOn(), T[this.id] = this, this.completePromise = new h(function(t) {
                i.completeResolver = t
            }), this.completed()
            .then(function(t) {
                t && t != s.body && y.get("events")
                    .trigger("rendered", {
                        target: t
                    })
            }))
    }

    function n() {
        x.forEach(function(t) {
            t()
        }), i.doLayout()
    }

    function r(t) {
        return t ? t.lang ? t.lang : r(t.parentNode) : void 0
    }
    var o, s = t("env/document"),
        a = t("env/window"),
        l = t("tfw/util/assets"),
        u = t("performance/perf-timers"),
        c = t("util/iframe"),
        d = t("util/layout"),
        h = t("util/promise"),
        f = t("util/querystring"),
        m = t("util/typevalidator"),
        p = t("util/util"),
        g = t("globals/pagemetadata"),
        w = t("util/donottrack"),
        v = t("util/logger"),
        b = t("util/document"),
        y = t("globals/twttr"),
        _ = 0,
        T = {},
        x = [],
        E = new d,
        A = "data-twttr-rendered",
        I = {
            ar: {
                "%{followers_count} followers": "عدد المتابعين %{followers_count}",
                "100K+": "+100 ألف",
                "10k unit": "10 آلاف وحدة",
                Follow: "تابِع",
                "Follow %{screen_name}": "تابِع %{screen_name}",
                K: "ألف",
                M: "م",
                Tweet: "غرِّد",
                "Tweet %{hashtag}": "غرِّد %{hashtag}",
                "Tweet to %{name}": "غرِّد لـ %{name}"
            },
            bn: {
                "Follow %{screen_name}": "%{screen_name}-কে অনুসরণ করুন"
            },
            cs: {
                "Follow %{screen_name}": "Sledovat uživatele %{screen_name}"
            },
            da: {
                "%{followers_count} followers": "%{followers_count} følgere",
                "10k unit": "10k enhed",
                Follow: "Følg",
                "Follow %{screen_name}": "Følg %{screen_name}",
                "Tweet to %{name}": "Tweet til %{name}"
            },
            de: {
                "%{followers_count} followers": "%{followers_count} Follower",
                "100K+": "100Tsd+",
                "10k unit": "10tsd-Einheit",
                Follow: "Folgen",
                "Follow %{screen_name}": "%{screen_name} folgen",
                K: "Tsd",
                Tweet: "Twittern",
                "Tweet to %{name}": "Tweet an %{name}"
            },
            es: {
                "%{followers_count} followers": "%{followers_count} seguidores",
                "10k unit": "unidad de 10 mil",
                Follow: "Seguir",
                "Follow %{screen_name}": "Seguir a %{screen_name}",
                Tweet: "Twittear",
                "Tweet %{hashtag}": "Twittear %{hashtag}",
                "Tweet to %{name}": "Twittear a %{name}"
            },
            fa: {
                "%{followers_count} followers": "%{followers_count} دنبال‌کننده",
                "100K+": ">۱۰۰هزار",
                "10k unit": "۱۰هزار واحد",
                Follow: "دنبال کردن",
                "Follow %{screen_name}": "دنبال کردن %{screen_name}",
                K: "هزار",
                M: "میلیون",
                Tweet: "توییت",
                "Tweet %{hashtag}": "توییت کردن %{hashtag}",
                "Tweet to %{name}": "به %{name} توییت کنید"
            },
            fi: {
                "%{followers_count} followers": "%{followers_count} seuraajaa",
                "100K+": "100 000+",
                "10k unit": "10 000 yksikköä",
                Follow: "Seuraa",
                "Follow %{screen_name}": "Seuraa käyttäjää %{screen_name}",
                K: "tuhatta",
                M: "milj.",
                Tweet: "Twiittaa",
                "Tweet %{hashtag}": "Twiittaa %{hashtag}",
                "Tweet to %{name}": "Twiittaa käyttäjälle %{name}"
            },
            fil: {
                "%{followers_count} followers": "%{followers_count} mga tagasunod",
                "10k unit": "10k yunit",
                Follow: "Sundan",
                "Follow %{screen_name}": "Sundan si %{screen_name}",
                Tweet: "I-tweet",
                "Tweet %{hashtag}": "I-tweet ang %{hashtag}",
                "Tweet to %{name}": "Mag-Tweet kay %{name}"
            },
            fr: {
                "%{followers_count} followers": "%{followers_count} abonnés",
                "10k unit": "unité de 10k",
                Follow: "Suivre",
                "Follow %{screen_name}": "Suivre %{screen_name}",
                Tweet: "Tweeter",
                "Tweet %{hashtag}": "Tweeter %{hashtag}",
                "Tweet to %{name}": "Tweeter à %{name}"
            },
            he: {
                "%{followers_count} followers": "%{followers_count} עוקבים",
                "100K+": "מאות אלפים",
                "10k unit": "עשרות אלפים",
                Follow: "מעקב",
                "Follow %{screen_name}": "לעקוב אחר %{screen_name}",
                K: "אלף",
                M: "מיליון",
                Tweet: "ציוץ",
                "Tweet %{hashtag}": "צייצו %{hashtag}",
                "Tweet to %{name}": "ציוץ אל %{name}"
            },
            hi: {
                "%{followers_count} followers": "%{followers_count} फ़ॉलोअर्स",
                "100K+": "1 लाख से अधिक",
                "10k unit": "10 हजार इकाईयां",
                Follow: "फ़ॉलो",
                "Follow %{screen_name}": "%{screen_name} को फ़ॉलो करें",
                K: "हजार",
                M: "मिलियन",
                Tweet: "ट्वीट",
                "Tweet %{hashtag}": "ट्वीट %{hashtag}",
                "Tweet to %{name}": "%{name} के प्रति ट्वीट करें"
            },
            hu: {
                "%{followers_count} followers": "%{followers_count} követő",
                "100K+": "100E+",
                "10k unit": "10E+",
                Follow: "Követés",
                "Follow %{screen_name}": "%{screen_name} követése",
                K: "E",
                "Tweet %{hashtag}": "%{hashtag} tweetelése",
                "Tweet to %{name}": "Tweet küldése neki: %{name}"
            },
            id: {
                "%{followers_count} followers": "%{followers_count} pengikut",
                "100K+": "100 ribu+",
                "10k unit": "10 ribu unit",
                Follow: "Ikuti",
                "Follow %{screen_name}": "Ikuti %{screen_name}",
                K: "&nbsp;ribu",
                M: "&nbsp;juta",
                "Tweet to %{name}": "Tweet ke %{name}"
            },
            it: {
                "%{followers_count} followers": "%{followers_count} follower",
                "10k unit": "10k unità",
                Follow: "Segui",
                "Follow %{screen_name}": "Segui %{screen_name}",
                "Tweet %{hashtag}": "Twitta %{hashtag}",
                "Tweet to %{name}": "Twitta a %{name}"
            },
            ja: {
                "%{followers_count} followers": "%{followers_count}人のフォロワー",
                "100K+": "100K以上",
                "10k unit": "万",
                Follow: "フォローする",
                "Follow %{screen_name}": "%{screen_name}さんをフォロー",
                Tweet: "ツイート",
                "Tweet %{hashtag}": "%{hashtag} をツイートする",
                "Tweet to %{name}": "%{name}さんへツイートする"
            },
            ko: {
                "%{followers_count} followers": "%{followers_count}명의 팔로워",
                "100K+": "100만 이상",
                "10k unit": "만 단위",
                Follow: "팔로우",
                "Follow %{screen_name}": "%{screen_name} 님 팔로우하기",
                K: "천",
                M: "백만",
                Tweet: "트윗",
                "Tweet %{hashtag}": "%{hashtag} 관련 트윗하기",
                "Tweet to %{name}": "%{name} 님에게 트윗하기"
            },
            msa: {
                "%{followers_count} followers": "%{followers_count} pengikut",
                "100K+": "100 ribu+",
                "10k unit": "10 ribu unit",
                Follow: "Ikut",
                "Follow %{screen_name}": "Ikut %{screen_name}",
                K: "ribu",
                M: "juta",
                "Tweet to %{name}": "Tweet kepada %{name}"
            },
            nl: {
                "%{followers_count} followers": "%{followers_count} volgers",
                "100K+": "100k+",
                "10k unit": "10k-eenheid",
                Follow: "Volgen",
                "Follow %{screen_name}": "%{screen_name} volgen",
                K: "k",
                M: " mln.",
                Tweet: "Tweeten",
                "Tweet %{hashtag}": "%{hashtag} tweeten",
                "Tweet to %{name}": "Tweeten naar %{name}"
            },
            no: {
                "%{followers_count} followers": "%{followers_count} følgere",
                "100K+": "100 K+",
                "10k unit": "10-K-enhet",
                Follow: "Følg",
                "Follow %{screen_name}": "Følg %{screen_name}",
                "Tweet to %{name}": "Send en tweet til %{name}"
            },
            pl: {
                "%{followers_count} followers": "%{followers_count} obserwujących",
                "100K+": "100 tys.+",
                "10k unit": "10 tys.",
                Follow: "Obserwuj",
                "Follow %{screen_name}": "Obserwuj %{screen_name}",
                K: "tys.",
                M: "mln",
                Tweet: "Tweetnij",
                "Tweet %{hashtag}": "Tweetnij %{hashtag}",
                "Tweet to %{name}": "Tweetnij do %{name}"
            },
            pt: {
                "%{followers_count} followers": "%{followers_count} seguidores",
                "100K+": "+100 mil",
                "10k unit": "10 mil unidades",
                Follow: "Seguir",
                "Follow %{screen_name}": "Seguir %{screen_name}",
                K: "Mil",
                Tweet: "Tweetar",
                "Tweet %{hashtag}": "Tweetar %{hashtag}",
                "Tweet to %{name}": "Tweetar para %{name}"
            },
            ro: {
                "Follow %{screen_name}": "Urmăreşte pe %{screen_name}"
            },
            ru: {
                "%{followers_count} followers": "Читатели: %{followers_count} ",
                "100K+": "100 тыс.+",
                "10k unit": "блок 10k",
                Follow: "Читать",
                "Follow %{screen_name}": "Читать %{screen_name}",
                K: "тыс.",
                M: "млн.",
                Tweet: "Твитнуть",
                "Tweet %{hashtag}": "Твитнуть %{hashtag}",
                "Tweet to %{name}": "Твитнуть %{name}"
            },
            sv: {
                "%{followers_count} followers": "%{followers_count} följare",
                "10k unit": "10k",
                Follow: "Följ",
                "Follow %{screen_name}": "Följ %{screen_name}",
                Tweet: "Tweeta",
                "Tweet %{hashtag}": "Tweeta %{hashtag}",
                "Tweet to %{name}": "Tweeta till %{name}"
            },
            th: {
                "%{followers_count} followers": "%{followers_count} ผู้ติดตาม",
                "100K+": "100พัน+",
                "10k unit": "หน่วย 10พัน",
                Follow: "ติดตาม",
                "Follow %{screen_name}": "ติดตาม %{screen_name}",
                M: "ล้าน",
                Tweet: "ทวีต",
                "Tweet %{hashtag}": "ทวีต %{hashtag}",
                "Tweet to %{name}": "ทวีตถึง %{name}"
            },
            tr: {
                "%{followers_count} followers": "%{followers_count} takipçi",
                "100K+": "+100 bin",
                "10k unit": "10 bin birim",
                Follow: "Takip et",
                "Follow %{screen_name}": "Takip et: %{screen_name}",
                K: "bin",
                M: "milyon",
                Tweet: "Tweetle",
                "Tweet %{hashtag}": "Tweetle: %{hashtag}",
                "Tweet to %{name}": "Tweetle: %{name}"
            },
            uk: {
                "Follow %{screen_name}": "Читати %{screen_name}"
            },
            ur: {
                "%{followers_count} followers": "%{followers_count} فالورز",
                "100K+": "ایک لاکھ سے زیادہ",
                "10k unit": "دس ہزار یونٹ",
                Follow: "فالو کریں",
                "Follow %{screen_name}": "%{screen_name} کو فالو کریں",
                K: "ہزار",
                M: "ملین",
                Tweet: "ٹویٹ کریں",
                "Tweet %{hashtag}": "%{hashtag} ٹویٹ کریں",
                "Tweet to %{name}": "%{name} کو ٹویٹ کریں"
            },
            vi: {
                "Follow %{screen_name}": "Theo dõi %{screen_name}"
            },
            "zh-cn": {
                "%{followers_count} followers": "%{followers_count} 关注者",
                "100K+": "10万+",
                "10k unit": "1万单元",
                Follow: "关注",
                "Follow %{screen_name}": "关注 %{screen_name}",
                K: "千",
                M: "百万",
                Tweet: "发推",
                "Tweet %{hashtag}": "以 %{hashtag} 发推",
                "Tweet to %{name}": "发推给 %{name}"
            },
            "zh-tw": {
                "%{followers_count} followers": "%{followers_count} 位跟隨者",
                "100K+": "超過十萬",
                "10k unit": "1萬 單位",
                Follow: "跟隨",
                "Follow %{screen_name}": "跟隨 %{screen_name}",
                K: "千",
                M: "百萬",
                Tweet: "推文",
                "Tweet %{hashtag}": "推文%{hashtag}",
                "Tweet to %{name}": "推文給%{name}"
            }
        };
    p.aug(i.prototype, {
        setLanguage: function(t) {
            var e;
            return t || (t = this.params()
                .lang || this.dataAttr("lang") || r(this.srcEl)), (t = t && t.toLowerCase()) ? I[t] ? this.lang = t : (e = t.replace(/[\-_].*/, ""), I[e] ? this.lang = e : void(this.lang = "en")) : this.lang = "en"
        },
        _: function(t, e) {
            var i = this.lang;
            return e = e || {}, i && I.hasOwnProperty(i) || (i = this.lang = "en"), t = I[i] && I[i][t] || t, this.ringo(t, e, /%\{([\w_]+)\}/g)
        },
        ringo: function(t, e, i) {
            return i = i || /\{\{([\w_]+)\}\}/g, t.replace(i, function(t, i) {
                return void 0 !== e[i] ? e[i] : t
            })
        },
        makeIframeSource: function() {
            if (this.iframeSource) {
                var t = f.encode(this.widgetUrlParams());
                return [l.base(), "/", this.ringo(this.iframeSource, {
                    lang: this.lang
                }), "#", t].join("")
            }
        },
        add: function(t) {
            T[this.id] = t
        },
        create: function(t, e, i) {
            var n, r = this;
            return i[A] = !0, n = c(p.aug({
                id: this.id,
                src: t,
                "class": this.classAttr.join(" ")
            }, i), e, this.targetEl && this.targetEl.ownerDocument), this.srcEl ? this.layout(function() {
                return r.srcEl.parentNode.replaceChild(n, r.srcEl), r.completeResolver.fulfill(n), n
            }) : this.targetEl ? this.layout(function() {
                return r.targetEl.appendChild(n), r.completeResolver.fulfill(n), n
            }) : h.reject("Did not append widget")
        },
        params: function() {
            var t, e;
            return this.srcOb ? e = this.srcOb : (t = this.srcEl && this.srcEl.href && this.srcEl.href.split("?")[1], e = t ? f.decode(t) : {}), this.params = function() {
                return e
            }, e
        },
        widgetUrlParams: function() {
            return {}
        },
        dataAttr: function(t) {
            return this.srcEl && this.srcEl.getAttribute("data-" + t)
        },
        attr: function(t) {
            return this.srcEl && this.srcEl.getAttribute(t)
        },
        layout: function(t) {
            return E.enqueue(t)
        },
        styles: {
            base: [
                ["font", "normal normal normal 11px/18px 'Helvetica Neue', Arial, sans-serif"],
                ["margin", "0"],
                ["padding", "0"],
                ["whiteSpace", "nowrap"]
            ],
            button: [
                ["fontWeight", "bold"],
                ["textShadow", "0 1px 0 rgba(255,255,255,.5)"]
            ],
            large: [
                ["fontSize", "13px"],
                ["lineHeight", "26px"]
            ],
            vbubble: [
                ["fontSize", "16px"]
            ]
        },
        width: function() {
            throw new Error("not implemented")
        },
        height: function() {
            return "m" == this.size ? 20 : 28
        },
        minWidth: function() {},
        maxWidth: function() {},
        minHeight: function() {},
        maxHeight: function() {},
        dimensions: function() {
            function t(t) {
                switch (typeof t) {
                    case "string":
                        return t;
                    case "undefined":
                        return;
                    default:
                        return t + "px"
                }
            }
            var e = {
                width: this.width(),
                height: this.height()
            };
            return this.minWidth() && (e["min-width"] = this.minWidth()), this.maxWidth() && (e["max-width"] = this.maxWidth()), this.minHeight() && (e["min-height"] = this.minHeight()), this.maxHeight() && (e["max-height"] = this.maxHeight()), p.forIn(e, function(i, n) {
                e[i] = t(n)
            }), e
        },
        generateId: function() {
            return this.srcEl && this.srcEl.id || "twitter-widget-" + _++
        },
        completed: function() {
            return this.completePromise
        }
    }), i.afterLoad = function(t) {
        x.push(t)
    }, i.doLayout = function() {
        E.exec()
    }, i.doLayoutAsync = function() {
        E.delayedExec()
    }, i.init = function(t) {
        o = t
    }, i.reset = function() {
        T = {}
    }, i.find = function(t) {
        return t && T[t] ? T[t].element : null
    }, i.embed = function(t) {
        var e = [],
            r = [],
            a = [];
        m.isArray(t) || (t = [t || s]), v.time("sandboxes"), t.forEach(function(t) {
                p.forIn(o, function(i, n) {
                    var r = t.querySelectorAll(i);
                    p.toRealArray(r)
                        .forEach(function(t) {
                            var i;
                            t.getAttribute(A) || (t.setAttribute(A, "true"), i = new n(t), e.push(i), a.push(i.sandboxCreated))
                        })
                })
            }), h.every.apply(null, a)
            .then(function() {
                v.timeEnd("sandboxes")
            }), i.doLayout(), e.forEach(function(t) {
                r.push(t.completed()), t.render()
            }), h.every.apply(null, r)
            .then(function(t) {
                t = t.filter(function(t) {
                    return t
                }), t.length && (y.get("events")
                    .trigger("loaded", {
                        widgets: t
                    }), v.timeEnd("load"))
            })
            .then(i.trackRender), i.doLayoutAsync(), n()
    }, i.trackRender = function() {
        u.endAndTrack("render", "widgets-js-load", "page", {
            widget_origin: b.rootDocumentLocation(),
            widget_frame: b.isFramed() && b.currentDocumentLocation()
        })
    }, a.setInterval(function() {
        i.doLayout()
    }, 500), e.exports = i
}, {
    "env/document": 9,
    "env/window": 12,
    "globals/pagemetadata": 15,
    "globals/twttr": 17,
    "performance/perf-timers": 21,
    "tfw/util/assets": 35,
    "util/document": 50,
    "util/donottrack": 52,
    "util/iframe": 55,
    "util/layout": 56,
    "util/logger": 57,
    "util/promise": 60,
    "util/querystring": 61,
    "util/typevalidator": 64,
    "util/util": 67
}], 41: [function(t, e) {
    function i(t, e) {
        var i = t.querySelector("blockquote.subject"),
            n = t.querySelector("blockquote.reply"),
            r = i && i.getAttribute("data-tweet-id"),
            o = n && n.getAttribute("data-tweet-id"),
            s = {},
            a = {};
        r && (s[r] = {
            item_type: 0
        }, y.clientEvent({
            page: "tweet",
            section: "subject",
            component: "tweet",
            action: "results"
        }, g.aug({}, e, {
            item_ids: [r],
            item_details: s
        }), !0), b.scribeTweetAudienceImpression(), o && (a[o] = {
            item_type: 0
        }, y.clientEvent({
            page: "tweet",
            section: "conversation",
            component: "tweet",
            action: "results"
        }, g.aug({}, e, {
            item_ids: [o],
            item_details: a,
            associations: {
                4: {
                    association_id: r,
                    association_type: 4
                }
            }
        }), !0)))
    }

    function n(t, e) {
        var i = {};
        t && (i[t] = {
            item_type: 0
        }, y.clientEvent({
            page: "tweet",
            section: "subject",
            component: "rawembedcode",
            action: "no_results"
        }, {
            widget_origin: T.rootDocumentLocation(),
            widget_frame: T.isFramed() && T.currentDocumentLocation(),
            message: e,
            item_ids: [t],
            item_details: i
        }, !0), b.scribeTweetAudienceImpression())
    }

    function r(t, e, i, n) {
        N[t] = N[t] || [], N[t].push({
            s: i,
            f: n,
            lang: e
        })
    }

    function o(t) {
        if (t) {
            var e, i, n;
            u.apply(this, [t]), e = this.params(), i = this.srcEl && this.srcEl.getElementsByTagName("A"), n = i && i[i.length - 1], this.hideThread = "none" == (e.conversation || this.dataAttr("conversation")) || g.contains(this.classAttr, "tw-hide-thread"), this.hideCard = "hidden" == (e.cards || this.dataAttr("cards")) || g.contains(this.classAttr, "tw-hide-media"), "left" == (e.align || this.attr("align")) || g.contains(this.classAttr, "tw-align-left") ? this.align = "left" : "right" == (e.align || this.attr("align")) || g.contains(this.classAttr, "tw-align-right") ? this.align = "right" : ("center" == (e.align || this.attr("align")) || g.contains(this.classAttr, "tw-align-center")) && (this.align = "center", this.containerWidth > this.dimensions.MIN_WIDTH * (1 / .7) && this.width > .7 * this.containerWidth && (this.width = .7 * this.containerWidth)), this.narrow = e.narrow || this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), this.tweetId = e.tweetId || n && w.status(n.href)
        }
    }
    var s = t("assets/css"),
        a = t("env/window"),
        l = t("tfw/widget/base"),
        u = t("tfw/widget/syndicatedbase"),
        c = t("util/datetime"),
        d = t("tfw/util/params"),
        h = t("dom/classname"),
        f = t("dom/get"),
        m = t("performance/perf-timers"),
        p = t("util/promise"),
        g = t("util/util"),
        w = t("util/twitter"),
        v = t("tfw/util/data"),
        b = t("scribe/audience"),
        y = t("scribe/frame"),
        _ = t("tfw/util/media"),
        T = t("util/document"),
        x = t("globals/twttr"),
        E = t("dom/delegate"),
        A = t("scribe/pixel"),
        I = "tweetembed",
        N = {},
        S = [];
    o.prototype = new u, g.aug(o.prototype, {
        renderedClassNames: "twitter-tweet twitter-tweet-rendered",
        dimensions: {
            DEFAULT_HEIGHT: "0",
            DEFAULT_WIDTH: "500",
            NARROW_WIDTH: "350",
            maxHeight: "375",
            FULL_BLEED_PHOTO_MAX_HEIGHT: "600",
            MIN_WIDTH: "220",
            MIN_HEIGHT: "0",
            MARGIN: "10px 0",
            WIDE_MEDIA_PADDING: 32,
            NARROW_MEDIA_PADDING: 32,
            BORDERS: 0
        },
        styleSheetUrl: s.tweet,
        create: function(t) {
            var e, n, r = this,
                o = this.sandbox.createElement("div");
            return o.innerHTML = t, (e = o.children[0] || !1) ? ("dark" == this.theme && this.classAttr.push("thm-dark"), this.linkColor && this.addSiteStyles(), h.present(e, "media-forward") && (this.fullBleedPhoto = !0, this.dimensions.maxHeight = this.dimensions.FULL_BLEED_PHOTO_MAX_HEIGHT), _.retinize(e), e.id = this.id, e.className += " " + this.classAttr.join(" "), e.lang = this.lang, this.sandbox.setTitle(e.getAttribute("data-iframe-title") || "Tweet"), this.sandbox.appendChild(e)
                .then(function() {
                    r.renderResolver.fulfill(r.sandbox)
                }), h.present(e, "with-border") || h.present(e, "EmbeddedTweet") || this.sandbox.style({
                    border: "#ddd 1px solid",
                    borderTopColor: "#eee",
                    borderBottomColor: "#bbb",
                    borderRadius: "5px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    maxWidth: "99%"
                }), n = this.layout(function() {
                    r.predefinedWidth = r.width, r.width = r.sandbox.width(r.width), r.collapseRegions()
                }), n.then(function() {
                    r.constrainMedia(e, r.contentWidth(r.width)), r.setNarrow()
                        .then(function() {
                            r.layout(function() {
                                r.completeResolver.fulfill(r.sandbox.element())
                            })
                        })
                }), i(e, this.baseScribeData(), this.partner), e) : void 0
        },
        render: function() {
            var t = this,
                e = "",
                i = this.tweetId;
            return i ? (this.hideCard && (e += "c"), this.hideThread && (e += "t"), e && (i += "-" + e), this.rendered()
                .then(function(e) {
                    var i = t.srcEl;
                    i && i.parentNode && t.layout(function() {
                            i && i.parentNode && i.parentNode.removeChild(i)
                        }), "center" == t.align ? e.style({
                            margin: "7px auto",
                            cssFloat: "none"
                        }) : t.align && (t.width == t.dimensions.DEFAULT_WIDTH && (t.predefinedWidth = t.width = t.dimensions.NARROW_WIDTH), e.style({
                            cssFloat: t.align
                        })), t.layout(function() {
                            t.height = t.sandbox.height(t.element.offsetHeight)
                        })
                        .then(function() {
                            return l.doLayoutAsync(), t.layout(function() {
                                t.height = t.sandbox.height(t.element.offsetHeight)
                            })
                        })
                        .then(function() {
                            e.onresize(t.handleResize.bind(t))
                        }), e.style({
                            position: "static",
                            visibility: "visible"
                        }), l.doLayoutAsync()
                }), r(i, this.lang, function(e) {
                    t.ready()
                        .then(function() {
                            t.element = t.create(e), t.readTimestampTranslations(), t.updateTimeStamps(), t.bindIntentHandlers(), t.bindPermalinkHandler(), l.doLayoutAsync()
                        })
                }, function() {
                    n(t.tweetId, t.partner), t.completeResolver.fulfill(t.srcEl)
                }), S.push(this.completed()), this.completed()
                .then(this.scribePerformance.bind(this)), this.completed()) : (this.completeResolver.fulfill(this.srcEl), this.completed())
        },
        bindPermalinkHandler: function() {
            var t = this;
            h.present(this.element, "decider-tapOpensPermalink") && (E.delegate(this.element, "click", "A", function(t) {
                E.stopPropagation(t)
            }), E.delegate(this.element, "click", ".twitter-tweet", function(e) {
                var i = this.querySelectorAll("blockquote.tweet"),
                    n = i[i.length - 1];
                t.openPermalink(n), t.scribePermalinkClick(n, e), E.stopPropagation(e)
            }))
        },
        scribePermalinkClick: function(t, e) {
            var i = this.createScribeData(t);
            A.interaction(e, i, !1)
        },
        openPermalink: function(t) {
            var e = t.cite;
            w.isStatus(e) && a.open(e)
        },
        scribePerformance: function() {
            m.endAndTrack("render", "widgets-js-load", "tweet", this.baseScribeData())
        },
        addUrlParams: function(t) {
            var e = this,
                i = {
                    related: this.related,
                    partner: this.partner,
                    original_referer: T.rootDocumentLocation(),
                    tw_p: I
                };
            return this.addUrlParams = d(i, function(t) {
                var i = f.closest(".tweet", t, e.element);
                return {
                    tw_i: i.getAttribute("data-tweet-id")
                }
            }), this.addUrlParams(t)
        },
        baseScribeData: function() {
            return {
                widget_origin: T.rootDocumentLocation(),
                widget_frame: T.isFramed() && T.currentDocumentLocation(),
                message: this.partner
            }
        },
        handleResize: function(t) {
            var e = this;
            t != this.width && (this.width = t, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(t)), this.collapseRegions(), this.layout(function() {
                e.height = e.sandbox.height(e.element.offsetHeight), x.get("events")
                    .trigger("resize", {
                        target: e.sandbox.element()
                    })
            }), l.doLayoutAsync())
        },
        readTimestampTranslations: function() {
            var t = this.element,
                e = "data-dt-",
                i = t.getAttribute(e + "months") || "";
            this.datetime = new c(g.compact({
                phrases: {
                    AM: t.getAttribute(e + "am"),
                    PM: t.getAttribute(e + "pm")
                },
                months: i.split("|"),
                formats: {
                    full: t.getAttribute(e + "full")
                }
            }))
        },
        updateTimeStamps: function() {
            var t = this.element.querySelector(".long-permalink"),
                e = t.getAttribute("data-datetime"),
                i = e && this.datetime.localTimeStamp(e),
                n = t.getElementsByTagName("TIME")[0];
            i && (this.layout(function() {
                return n && n.innerHTML ? void(n.innerHTML = i) : void(t.innerHTML = i)
            }, "Update Timestamp"), l.doLayoutAsync())
        }
    }), o.fetchAndRender = function() {
        var t, e, i = N,
            n = [];
        if (N = {}, i.keys) n = i.keys();
        else
            for (t in i) i.hasOwnProperty(t) && n.push(t);
        n.length && (y.init(), e = i[n[0]][0].lang, v.tweets({
                ids: n.sort(),
                lang: e,
                complete: function(t) {
                    g.forIn(t, function(t, e) {
                        var n = i[t];
                        n.forEach(function(t) {
                            t.s && t.s.call(this, e)
                        }), delete i[t]
                    }), l.doLayout(), g.forIn(i, function(t, e) {
                        e.forEach(function(e) {
                            e.f && e.f.call(this, t)
                        })
                    }), l.doLayout()
                }
            }), p.every.apply(null, S)
            .then(function() {
                y.flush()
            }), S = [])
    }, l.afterLoad(o.fetchAndRender), e.exports = o
}, {
    "assets/css": 2,
    "dom/classname": 4,
    "dom/delegate": 5,
    "dom/get": 6,
    "env/window": 12,
    "globals/twttr": 17,
    "performance/perf-timers": 21,
    "scribe/audience": 28,
    "scribe/frame": 29,
    "scribe/pixel": 30,
    "tfw/util/data": 36,
    "tfw/util/media": 38,
    "tfw/util/params": 39,
    "tfw/widget/base": 40,
    "tfw/widget/syndicatedbase": 44,
    "util/datetime": 49,
    "util/document": 50,
    "util/promise": 60,
    "util/twitter": 63,
    "util/util": 67
}], 42: [function(t, e) {
    function i(t) {
        if (t) {
            var e, i, n, r;
            o.apply(this, [t]), e = this.params(), i = e.size || this.dataAttr("size"), n = e.showScreenName || this.dataAttr("show-screen-name"), r = e.count || this.dataAttr("count"), this.classAttr.push("twitter-follow-button"), this.showScreenName = "false" != n, this.showCount = !(e.showCount === !1 || "false" == this.dataAttr("show-count")), "none" == r && (this.showCount = !1), this.explicitWidth = e.width || this.dataAttr("width") || "", this.screenName = e.screen_name || e.screenName || s.screenName(this.attr("href")), this.preview = e.preview || this.dataAttr("preview") || "", this.align = e.align || this.dataAttr("align") || "", this.size = "large" == i ? "l" : "m"
        }
    }
    var n = t("util/donottrack"),
        r = t("util/util"),
        o = t("tfw/widget/base"),
        s = t("util/twitter"),
        a = t("util/promise"),
        l = t("dom/textsize");
    i.prototype = new o, r.aug(i.prototype, {
        iframeSource: "widgets/follow_button.08e6af8d36f276a2b5c6602a155e2fe3.{{lang}}.html",
        widgetUrlParams: function() {
            return r.compact({
                screen_name: this.screenName,
                lang: this.lang,
                show_count: this.showCount,
                show_screen_name: this.showScreenName,
                align: this.align,
                id: this.id,
                preview: this.preview,
                size: this.size,
                partner: this.partner,
                dnt: n.enabled(),
                _: +new Date
            })
        },
        width: function() {
            if (this.calculatedWidth) return this.calculatedWidth;
            if (this.explicitWidth) return this.explicitWidth;
            var t, e, i = {
                    cnt: 13,
                    btn: 24,
                    xlcnt: 22,
                    xlbtn: 38
                },
                n = this.showScreenName ? "Follow %{screen_name}" : "Follow",
                o = this._(n, {
                    screen_name: "@" + this.screenName
                }),
                s = this._(r.contains(["ja", "ko"], this.lang) ? "10k unit" : "M"),
                a = this._("%{followers_count} followers", {
                    followers_count: "88888" + s
                }),
                u = 0,
                c = 0,
                d = this.styles.base;
            return "l" == this.size ? (d = d.concat(this.styles.large), t = i.xlbtn, e = i.xlcnt) : (t = i.btn, e = i.cnt), this.showCount && (c = l(a, "", d)
                    .width + e), u = l(o, "", d.concat(this.styles.button))
                .width + t, this.calculatedWidth = u + c
        },
        render: function() {
            if (!this.screenName) return a.reject("Missing Screen Name");
            var t = this,
                e = this.makeIframeSource(),
                i = this.create(e, this.dimensions(), {
                    title: this._("Twitter Follow Button")
                })
                .then(function(e) {
                    return t.element = e
                });
            return i
        }
    }), e.exports = i
}, {
    "dom/textsize": 8,
    "tfw/widget/base": 40,
    "util/donottrack": 52,
    "util/promise": 60,
    "util/twitter": 63,
    "util/util": 67
}], 43: [function(t, e) {
    function i(t) {
        f.open(t)
    }

    function n(e, i) {
        var n = t("tfw/hub/client");
        n.openIntent(e, i)
    }

    function r(t, e) {
        if (h.isTwitterURL(t))
            if (p.get("eventsHub") && e) {
                var r = new o(a.generateId(), e);
                a.add(r), n(t, e), m.get("events")
                    .trigger("click", {
                        target: e,
                        region: "intent",
                        type: "click",
                        data: {}
                    })
            } else i(t)
    }

    function o(t, e) {
        this.id = t, this.element = this.srcEl = e
    }

    function s(t) {
        this.srcEl = [], this.element = t
    }
    var a, l = t("env/document"),
        u = t("tfw/widget/base"),
        c = t("util/util"),
        d = t("util/promise"),
        h = t("util/twitter"),
        f = t("intents/intent"),
        m = t("globals/twttr"),
        p = t("globals/private");
    s.prototype = new u, c.aug(s.prototype, {
        render: function() {
            return a = this, d.fulfill(l.body)
        }
    }), s.open = r, e.exports = s
}, {
    "env/document": 9,
    "globals/private": 16,
    "globals/twttr": 17,
    "intents/intent": 20,
    "tfw/hub/client": 33,
    "tfw/widget/base": 40,
    "util/promise": 60,
    "util/twitter": 63,
    "util/util": 67
}], 44: [function(t, e) {
    function i() {
        o = n.VALID_COLOR.test(d.val("widgets:link-color")) && RegExp.$1, a = n.VALID_COLOR.test(d.val("widgets:border-color")) && RegExp.$1, s = d.val("widgets:theme")
    }

    function n(t) {
        if (t) {
            var e, i = this;
            this.readyPromise = new _(function(t) {
                    i.readyResolver = t
                }), this.renderedPromise = new _(function(t) {
                    i.renderResolver = t
                }), u.apply(this, [t]), e = this.params(), this.targetEl = this.srcEl && this.srcEl.parentNode || e.targetEl || l.body, this.predefinedWidth = n.VALID_UNIT.test(e.width || this.attr("width")) && RegExp.$1, this.layout(function() {
                    return i.containerWidth = v.effectiveWidth(i.targetEl)
                })
                .then(function(t) {
                    var r = i.predefinedWidth || t || i.dimensions.DEFAULT_WIDTH;
                    i.height = n.VALID_UNIT.test(e.height || i.attr("height")) && RegExp.$1, i.width = Math.max(i.dimensions.MIN_WIDTH, Math.min(r, i.dimensions.DEFAULT_WIDTH))
                }), this.linkColor = n.VALID_COLOR.test(e.linkColor || this.dataAttr("link-color")) ? RegExp.$1 : o, this.borderColor = n.VALID_COLOR.test(e.borderColor || this.dataAttr("border-color")) ? RegExp.$1 : a, this.theme = e.theme || this.attr("data-theme") || s, this.theme = /(dark|light)/.test(this.theme) ? this.theme : "", this.classAttr.push(y.touch() ? "is-touch" : "not-touch"), y.ie9() && this.classAttr.push("ie9"), this.sandboxCreated = b.createSandbox({
                    "class": this.renderedClassNames,
                    id: this.id,
                    allowfullscreen: ""
                }, {
                    position: "absolute",
                    visibility: "hidden"
                }, function(t) {
                    i.srcEl ? i.targetEl.insertBefore(t, i.srcEl) : i.targetEl.appendChild(t)
                }, this.layout)
                .then(function(t) {
                    i.setupSandbox(t), new m(t.element()
                        .contentWindow)
                }), this.rendered()
                .then(function(t) {
                    i.applyVisibleSandboxStyles(t)
                })
        }
    }

    function r(t, e) {
        return t + e
    }
    var o, s, a, l = t("env/document"),
        u = t("tfw/widget/base"),
        c = t("tfw/widget/intent"),
        d = t("globals/pagemetadata"),
        h = t("tfw/util/media"),
        f = t("scribe/pixel"),
        m = t("video/video_post_message_interface"),
        p = t("dom/classname"),
        g = t("dom/get"),
        w = t("dom/delegate"),
        v = t("dom/size"),
        b = t("sandbox/frame"),
        y = t("util/env"),
        _ = t("util/promise"),
        T = t("util/twitter"),
        x = t("util/typevalidator"),
        E = t("util/util"),
        A = [".customisable", ".customisable:link", ".customisable:visited", ".customisable:hover", ".customisable:focus", ".customisable:active", ".customisable-highlight:hover", ".customisable-highlight:focus", "a:hover .customisable-highlight", "a:focus .customisable-highlight"],
        I = ["a:hover .ic-mask", "a:focus .ic-mask"],
        N = [".customisable-border"],
        S = [".timeline-header h1.summary", ".timeline-header h1.summary a:link", ".timeline-header h1.summary a:visited"],
        D = {
            TWEET: 0,
            RETWEET: 10
        };
    n.prototype = new u, E.aug(n.prototype, {
        styleSheetUrl: function() {
            throw new Error("must set styleSheetUrl")
        },
        setupSandbox: function(t) {
            var e = this;
            this.sandbox = t, _.some(e.applyInitialSandboxStyles(t), t.appendCss(".SandboxRoot { display:none }"), t.setBaseTarget("_blank"), t.appendStyleSheet(this.styleSheetUrl(this.lang)))
                .then(function() {
                    e.readyResolver.fulfill(t)
                })
        },
        ready: function() {
            return this.readyPromise
        },
        rendered: function() {
            return this.renderedPromise
        },
        contentWidth: function(t) {
            var e = this.dimensions,
                i = this.borderless ? 0 : e.BORDERS,
                n = this.fullBleedPhoto ? 0 : this.chromeless && this.narrow ? e.NARROW_MEDIA_PADDING_CL : this.chromeless ? e.WIDE_MEDIA_PADDING_CL : this.narrow ? e.NARROW_MEDIA_PADDING : e.WIDE_MEDIA_PADDING;
            return (t || this.width) - (n + i)
        },
        applyInitialSandboxStyles: function(t) {
            var e = this;
            return t.style({
                border: "none",
                maxWidth: "100%",
                minWidth: e.dimensions.MIN_WIDTH + "px",
                margin: e.dimensions.MARGIN,
                padding: "0",
                display: "block",
                position: "absolute",
                visibility: "hidden"
            }, !0)
        },
        applyVisibleSandboxStyles: function(t) {
            return t.style({
                position: "static",
                visibility: "visible"
            })
        },
        addSiteStyles: function() {
            function t(t) {
                return ("dark" == e.theme ? ".thm-dark " : "") + t
            }
            var e = this,
                i = [];
            return this.headingStyle && i.push(S.map(t)
                .join(",") + "{" + this.headingStyle + "}"), this.linkColor && (i.push(A.map(t)
                .join(",") + "{color:" + this.linkColor + "}"), i.push(I.map(t)
                .join(",") + "{background-color:" + this.linkColor + "}")), this.borderColor && i.push(N.map(t)
                .concat("dark" == this.theme ? [".thm-dark.customisable-border"] : [])
                .join(",") + "{border-color:" + this.borderColor + "}"), i.length ? this.sandbox.appendCss(i.join("")) : void 0
        },
        setNarrow: function() {
            var t = this,
                e = this.narrow;
            return this.narrow = this.width < this.dimensions.NARROW_WIDTH, e != this.narrow ? this.layout(function() {
                return p.toggle(t.element, "var-narrow", t.narrow)
            }) : _.fulfill(this.narrow)
        },
        createScribeData: function(t) {
            var e = E.aug({}, this.baseScribeData(), {
                item_ids: [],
                item_details: this.extractTweetScribeDetails(t)
            });
            return E.forIn(e.item_details, function(t) {
                e.item_ids.push(t)
            }), e
        },
        bindIntentHandlers: function() {
            function t(t) {
                var n = g.closest(".tweet", this, i),
                    r = e.createScribeData(n);
                f.interaction(t, r, !0)
            }
            var e = this,
                i = this.element;
            w.delegate(i, "click", "A", t), w.delegate(i, "click", "BUTTON", t), w.delegate(i, "click", ".profile", function() {
                e.addUrlParams(this)
            }), w.delegate(i, "click", ".follow-button", function(t) {
                var i;
                t.altKey || t.metaKey || t.shiftKey || y.ios() || y.android() || x.asBoolean(this.getAttribute("data-age-gate")) || (i = T.intentForFollowURL(this.href, !0), i && (c.open(i, e.sandbox.element()), w.preventDefault(t)))
            }), w.delegate(i, "click", ".web-intent", function(t) {
                e.addUrlParams(this), t.altKey || t.metaKey || t.shiftKey || (c.open(this.href, e.sandbox.element()), w.preventDefault(t))
            })
        },
        baseScribeData: function() {
            return {}
        },
        extractTweetScribeDetails: function(t) {
            var e, i, n = {};
            return t ? (e = t.getAttribute("data-tweet-id"), i = t.getAttribute("data-rendered-tweet-id") || e, i == e ? n[i] = {
                item_type: D.TWEET
            } : e && (n[i] = {
                item_type: D.RETWEET,
                target_type: D.TWEET,
                target_id: e
            }), n) : n
        },
        constrainMedia: function(t, e) {
            return h.constrainMedia(t || this.element, e || this.contentWidth(), this.dimensions.maxHeight, this.layout)
        },
        collapseRegions: function() {
            var t = this;
            E.toRealArray(this.element.querySelectorAll(".collapsible-container"))
                .forEach(function(e) {
                    var i, n, o = E.toRealArray(e.children),
                        s = o.length && e.offsetWidth,
                        a = o.length && o.map(function(t) {
                            return t.offsetWidth
                        }),
                        l = o.length;
                    if (o.length)
                        for (; l > 0;) {
                            if (l--, i = a.reduce(r, 0), !s || !i) return;
                            if (s > i) return;
                            n = o[l].getAttribute("data-collapsed-class"), n && (p.add(t.element, n), a[l] = o[l].offsetWidth)
                        }
                })
        }
    }), n.VALID_UNIT = /^([0-9]+)( ?px)?$/, n.VALID_COLOR = /^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i, i(), e.exports = n
}, {
    "dom/classname": 4,
    "dom/delegate": 5,
    "dom/get": 6,
    "dom/size": 7,
    "env/document": 9,
    "globals/pagemetadata": 15,
    "sandbox/frame": 26,
    "scribe/pixel": 30,
    "tfw/util/media": 38,
    "tfw/widget/base": 40,
    "tfw/widget/intent": 43,
    "util/env": 53,
    "util/promise": 60,
    "util/twitter": 63,
    "util/typevalidator": 64,
    "util/util": 67,
    "video/video_post_message_interface": 71
}], 45: [function(t, e) {
    function i(t) {
        if (t) {
            var e, i, n, r, o, a, l, u;
            s.apply(this, [t]), e = this.params(), i = (e.chrome || this.dataAttr("chrome") || "")
                .split(" "), this.preview = e.previewParams, this.widgetId = e.widgetId || this.dataAttr("widget-id"), this.instanceId = ++q, this.cursors = {
                    maxPosition: 0,
                    minPosition: 0
                }, this.override = (r = e.screenName || this.dataAttr("screen-name")) || (o = e.userId || this.dataAttr("user-id")) ? {
                    overrideType: "user",
                    overrideId: o,
                    overrideName: r,
                    withReplies: w.asBoolean(e.showReplies || this.dataAttr("show-replies")) ? "true" : "false"
                } : (r = e.favoritesScreenName || this.dataAttr("favorites-screen-name")) || (o = e.favoritesUserId || this.dataAttr("favorites-user-id")) ? {
                    overrideType: "favorites",
                    overrideId: o,
                    overrideName: r
                } : ((r = e.listOwnerScreenName || this.dataAttr("list-owner-screen-name")) || (o = e.listOwnerId || this.dataAttr("list-owner-id"))) && ((a = e.listId || this.dataAttr("list-id")) || (l = e.listSlug || this.dataAttr("list-slug"))) ? {
                    overrideType: "list",
                    overrideOwnerId: o,
                    overrideOwnerName: r,
                    overrideId: a,
                    overrideName: l
                } : (u = e.customTimelineId || this.dataAttr("custom-timeline-id")) ? {
                    overrideType: "custom",
                    overrideId: u
                } : {}, this.tweetLimit = w.asInt(e.tweetLimit || this.dataAttr("tweet-limit")), this.staticTimeline = this.tweetLimit > 0, i.length && (n = v.contains(i, "none"), this.chromeless = n || v.contains(i, "transparent"), this.headerless = n || v.contains(i, "noheader"), this.footerless = n || v.contains(i, "nofooter"), this.borderless = n || v.contains(i, "noborders"), this.noscrollbar = v.contains(i, "noscrollbar")), this.headingStyle = p.sanitize(e.headingStyle || this.dataAttr("heading-style"), void 0, !0), this.classAttr.push("twitter-timeline-rendered"), this.ariaPolite = e.ariaPolite || this.dataAttr("aria-polite")
        }
    }
    var n = t("env/window"),
        r = t("assets/css"),
        o = t("tfw/widget/base"),
        s = t("tfw/widget/syndicatedbase"),
        a = t("util/datetime"),
        l = t("anim/transition"),
        u = t("performance/perf-timers"),
        c = t("tfw/util/data"),
        d = t("tfw/util/media"),
        h = t("scribe/audience"),
        f = t("scribe/frame"),
        m = t("tfw/util/params"),
        p = t("util/css"),
        g = t("util/env"),
        w = t("util/typevalidator"),
        v = t("util/util"),
        b = t("dom/delegate"),
        y = t("dom/classname"),
        _ = t("dom/get"),
        T = t("util/donottrack"),
        x = t("util/document"),
        E = t("globals/twttr"),
        A = t("globals/private"),
        I = {
            CLIENT_SIDE_USER: 0,
            CLIENT_SIDE_APP: 2
        },
        N = ".timeline",
        S = ".new-tweets-bar",
        D = ".timeline-header",
        R = ".timeline-footer",
        k = ".stream",
        L = ".h-feed",
        P = ".tweet",
        C = ".detail-expander",
        M = ".expand",
        O = ".permalink",
        F = ".no-more-pane",
        j = "expanded",
        H = "pending-scroll-in",
        W = "pending-new-tweet-display",
        U = "pending-new-tweet",
        q = 0;
    i.prototype = new s, v.aug(i.prototype, {
        renderedClassNames: "twitter-timeline twitter-timeline-rendered",
        dimensions: {
            DEFAULT_HEIGHT: "600",
            DEFAULT_WIDTH: "520",
            NARROW_WIDTH: "320",
            maxHeight: "375",
            MIN_WIDTH: "180",
            MIN_HEIGHT: "200",
            MARGIN: "0",
            WIDE_MEDIA_PADDING: 81,
            NARROW_MEDIA_PADDING: 16,
            WIDE_MEDIA_PADDING_CL: 60,
            NARROW_MEDIA_PADDING_CL: 12,
            BORDERS: 2
        },
        styleSheetUrl: r.timeline,
        create: function(t) {
            var e, i, n, r, o = this,
                s = this.sandbox.createElement("div"),
                a = [];
            return s.innerHTML = t.body, (e = s.children[0] || !1) ? (this.reconfigure(t.config), this.discardStaticOverflow(e), this.sandbox.setTitle(e.getAttribute("data-iframe-title") || "Timeline"), d.retinize(e), this.constrainMedia(e), this.searchQuery = e.getAttribute("data-search-query"), this.profileId = e.getAttribute("data-profile-id"), this.timelineType = e.getAttribute("data-timeline-type"), r = this.getTweetDetails(s.querySelector(L)), v.forIn(r, function(t) {
                    a.push(t)
                }), n = this.baseScribeData(), n.item_ids = a, n.item_details = r, this.timelineType && f.clientEvent({
                    page: this.timelineType + "_timeline",
                    component: "timeline",
                    element: "initial",
                    action: a.length ? "results" : "no_results"
                }, n, !0), f.clientEvent({
                    page: "timeline",
                    component: "timeline",
                    element: "initial",
                    action: a.length ? "results" : "no_results"
                }, n, !0), h.scribeTimelineAudienceImpression(), f.flush(), "assertive" == this.ariaPolite && (i = e.querySelector(S), i.setAttribute("aria-polite", "assertive")), e.id = this.id, e.className += " " + this.classAttr.join(" "), e.lang = this.lang, this.ready()
                .then(function(t) {
                    t.appendChild(e)
                        .then(function() {
                            o.renderResolver.fulfill(o.sandbox)
                        }), t.style({
                            display: "inline-block"
                        }), o.layout(function() {
                            o.srcEl && o.srcEl.parentNode && o.srcEl.parentNode.removeChild(o.srcEl), o.predefinedWidth = o.width, o.predefinedHeight = o.height, o.width = t.width(o.width), o.height = t.height(o.height)
                        })
                        .then(function() {
                            o.setNarrow(), o.sandbox.onresize(o.handleResize.bind(o)), o.completeResolver.fulfill(o.sandbox.element())
                        })
                }), e) : void 0
        },
        render: function() {
            var t = this;
            return this.preview || this.widgetId ? (this.rendered()
                .then(this.staticTimeline ? function(e) {
                    t.layout(function() {
                        e.height(t.height = t.element.offsetHeight)
                    }), o.doLayoutAsync()
                } : function() {
                    t.recalculateStreamHeight(), o.doLayoutAsync()
                }), this.preview ? this.getPreviewTimeline() : this.getTimeline(), this.completed()
                .then(this.scribePerformance.bind(this)), this.completed()) : (this.completeResolver.reject(400), this.completed())
        },
        scribePerformance: function() {
            u.endAndTrack("render", "widgets-js-load", "timeline", this.baseScribeData())
        },
        getPreviewTimeline: function() {
            var t = this;
            c.timelinePreview({
                success: function(e) {
                    t.ready()
                        .then(function() {
                            t.element = t.create(e), t.readTranslations(), t.bindInteractions(), t.updateCursors(e.headers, {
                                initial: !0
                            }), o.doLayoutAsync()
                        })
                },
                error: function(e) {
                    return e && e.headers ? void t.completeResolver.reject(e.headers.status) : void t.completeResolver.fulfill(t.srcEl)
                },
                params: this.preview
            })
        },
        getTimeline: function() {
            var t = this;
            f.init(), c.timeline(v.aug({
                id: this.widgetId,
                instanceId: this.instanceId,
                dnt: T.enabled(),
                lang: this.lang,
                success: function(e) {
                    t.ready()
                        .then(function() {
                            t.element = t.create(e), t.readTranslations(), t.bindInteractions(), t.updateTimeStamps(), t.updateCursors(e.headers, {
                                initial: !0
                            }), e.headers.xPolling && /\d/.test(e.headers.xPolling) && (t.pollInterval = 1e3 * e.headers.xPolling), t.staticTimeline || t.schedulePolling(), o.doLayoutAsync()
                        })
                },
                error: function(e) {
                    return e && e.headers ? void t.completeResolver.reject(e.headers.status) : void t.completeResolver.fulfill(t.srcEl)
                }
            }, this.override))
        },
        reconfigure: function(t) {
            this.lang = t.lang, this.theme || (this.theme = t.theme), "dark" == this.theme && this.classAttr.push("thm-dark"), this.chromeless && this.classAttr.push("var-chromeless"), this.borderless && this.classAttr.push("var-borderless"), this.headerless && this.classAttr.push("var-headerless"), this.footerless && this.classAttr.push("var-footerless"), this.staticTimeline && this.classAttr.push("var-static"), !this.linkColor && t.linkColor && s.VALID_COLOR.test(t.linkColor) && (this.linkColor = RegExp.$1), !this.height && s.VALID_UNIT.test(t.height) && (this.height = RegExp.$1), this.height = Math.max(this.dimensions.MIN_HEIGHT, this.height ? this.height : this.dimensions.DEFAULT_HEIGHT), this.preview && this.classAttr.push("var-preview"), this.narrow = this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), this.addSiteStyles()
        },
        getTweetDetails: function(t) {
            var e, i = this,
                n = {};
            return e = t && t.children || [], v.toRealArray(e)
                .forEach(function(t) {
                    v.aug(n, i.extractTweetScribeDetails(t))
                }), n
        },
        baseScribeData: function() {
            return {
                widget_id: this.widgetId,
                widget_origin: x.rootDocumentLocation(),
                widget_frame: x.isFramed() && x.currentDocumentLocation(),
                message: this.partner,
                query: this.searchQuery,
                profile_id: this.profileId
            }
        },
        bindInteractions: function() {
            var t = this,
                e = this.element,
                i = !0;
            this.bindIntentHandlers(), b.delegate(e, "click", ".load-tweets", function(e) {
                i && (i = !1, t.forceLoad(), b.stop(e))
            }), b.delegate(e, "click", ".display-sensitive-image", function(i) {
                t.showNSFW(_.closest(P, this, e)), b.stop(i)
            }), b.delegate(e, "mouseover", N, function() {
                t.mouseOver = !0
            }), b.delegate(e, "mouseout", N, function() {
                t.mouseOver = !1
            }), b.delegate(e, "mouseover", S, function() {
                t.mouseOverNotifier = !0
            }), b.delegate(e, "mouseout", S, function() {
                t.mouseOverNotifier = !1, n.setTimeout(function() {
                    t.hideNewTweetNotifier()
                }, 3e3)
            }), this.staticTimeline || (b.delegate(e, "click", M, function(i) {
                i.altKey || i.metaKey || i.shiftKey || (t.toggleExpando(_.closest(P, this, e)), b.stop(i))
            }), b.delegate(e, "click", "A", function(t) {
                b.stopPropagation(t)
            }), b.delegate(e, "click", ".with-expansion", function(e) {
                t.toggleExpando(this), b.stop(e)
            }), b.delegate(e, "click", ".load-more", function() {
                t.loadMore()
            }), b.delegate(e, "click", S, function() {
                t.scrollToTop(), t.hideNewTweetNotifier(!0)
            }))
        },
        scrollToTop: function() {
            var t = this.element.querySelector(k);
            t.scrollTop = 0, t.focus()
        },
        update: function() {
            var t = this,
                e = this.element.querySelector(L),
                i = e && e.children[0],
                n = i && i.getAttribute("data-tweet-id");
            this.updateTimeStamps(), this.requestTweets(n, !0, function(e) {
                e.childNodes.length > 0 && t.insertNewTweets(e)
            })
        },
        loadMore: function() {
            var t = this,
                e = v.toRealArray(this.element.querySelectorAll(P))
                .pop(),
                i = e && e.getAttribute("data-tweet-id");
            this.requestTweets(i, !1, function(e) {
                var n = t.element.querySelector(F),
                    r = e.childNodes[0];
                return n.style.cssText = "", r && r.getAttribute("data-tweet-id") == i && e.removeChild(r), e.childNodes.length > 0 ? void t.appendTweets(e) : (y.add(t.element, "no-more"), void n.focus())
            })
        },
        forceLoad: function() {
            var t = this,
                e = !!this.element.querySelectorAll(L)
                .length;
            this.requestTweets(1, !0, function(i) {
                i.childNodes.length && (t[e ? "insertNewTweets" : "appendTweets"](i), y.add(t.element, "has-tweets"))
            })
        },
        schedulePolling: function(t) {
            var e = this;
            null !== this.pollInterval && (t = A.get("timeline.pollInterval") || t || this.pollInterval || 1e4, t > -1 && n.setTimeout(function() {
                e.isUpdating || e.update(), e.schedulePolling()
            }, t))
        },
        updateCursors: function(t, e) {
            (e || {})
            .initial ? (this.cursors.maxPosition = t.maxPosition, this.cursors.minPosition = t.minPosition) : (e || {})
                .newer ? this.cursors.maxPosition = t.maxPosition || this.cursors.maxPosition : this.cursors.minPosition = t.minPosition || this.cursors.minPosition
        },
        requestTweets: function(t, e, i) {
            var n = this,
                r = {
                    id: this.widgetId,
                    instanceId: this.instanceId,
                    screenName: this.widgetScreenName,
                    userId: this.widgetUserId,
                    withReplies: this.widgetShowReplies,
                    dnt: T.enabled(),
                    lang: this.lang
                };
            e && this.cursors.maxPosition ? r.minPosition = this.cursors.maxPosition : !e && this.cursors.minPosition ? r.maxPosition = this.cursors.minPosition : e ? r.sinceId = t : r.maxId = t, r.complete = function() {
                n.isUpdating = !1
            }, r.error = function(t) {
                if (t && t.headers) {
                    if ("404" == t.headers.status) return void(n.pollInterval = null);
                    if ("503" == t.headers.status) return void(n.pollInterval *= 1.5)
                }
            }, r.success = function(t) {
                var r, o, s = n.sandbox.createDocumentFragment(),
                    a = n.sandbox.createElement("ol"),
                    l = [];
                if (n.updateCursors(t.headers, {
                        newer: e
                    }), t && t.headers && t.headers.xPolling && /\d+/.test(t.headers.xPolling) && (n.pollInterval = 1e3 * t.headers.xPolling), t && void 0 !== t.body) {
                    if (a.innerHTML = t.body, a.children[0] && "LI" != a.children[0].tagName) return;
                    for (o = n.getTweetDetails(a), v.forIn(o, function(t) {
                            l.push(t)
                        }), l.length && (r = n.baseScribeData(), r.item_ids = l, r.item_details = o, r.event_initiator = e ? I.CLIENT_SIDE_APP : I.CLIENT_SIDE_USER, n.timelineType && f.clientEvent({
                            page: n.timelineType + "_timeline",
                            component: "timeline",
                            element: "initial",
                            action: l.length ? "results" : "no_results"
                        }, r, !0), f.clientEvent({
                            page: "timeline",
                            component: "timeline",
                            element: e ? "newer" : "older",
                            action: "results"
                        }, r, !0), f.flush()), d.retinize(a), n.constrainMedia(a); a.children[0];) s.appendChild(a.children[0]);
                    i(s)
                }
            }, c.timelinePoll(v.aug(r, this.override))
        },
        insertNewTweets: function(t) {
            var e, i = this,
                r = this.element.querySelector(k),
                o = r.querySelector(L),
                s = o.offsetHeight;
            return o.insertBefore(t, o.firstChild), e = o.offsetHeight - s, E.get("events")
                .trigger("timelineUpdated", {
                    target: this.sandbox.element(),
                    region: "newer"
                }), r.scrollTop > 40 || this.mouseIsOver() ? (r.scrollTop = r.scrollTop + e, this.updateTimeStamps(), void this.showNewTweetNotifier()) : (y.remove(this.element, H), o.style.cssText = "margin-top: -" + e + "px", n.setTimeout(function() {
                    r.scrollTop = 0, y.add(i.element, H), g.cssTransitions() ? o.style.cssText = "" : l.animate(function(t) {
                        o.style.cssText = e > t ? "margin-top: -" + (e - t) + "px" : ""
                    }, e, 500, l.easeOut)
                }, 500), this.updateTimeStamps(), void("custom" != this.timelineType && this.gcTweets(50)))
        },
        appendTweets: function(t) {
            var e = this.element.querySelector(L);
            e.appendChild(t), this.updateTimeStamps(), E.get("events")
                .trigger("timelineUpdated", {
                    target: this.sandbox.element(),
                    region: "older"
                })
        },
        gcTweets: function(t) {
            var e, i = this.element.querySelector(L),
                n = i.children.length;
            for (t = t || 50; n > t && (e = i.children[n - 1]); n--) i.removeChild(e)
        },
        showNewTweetNotifier: function() {
            var t = this,
                e = this.element.querySelector(S),
                i = e.children[0];
            e.style.cssText = "", e.removeChild(i), e.appendChild(i), y.add(this.element, W), n.setTimeout(function() {
                y.add(t.element, U)
            }, 10), this.newNoticeDisplayTime = +new Date, n.setTimeout(function() {
                t.hideNewTweetNotifier()
            }, 5e3)
        },
        hideNewTweetNotifier: function(t) {
            var e = this;
            (t || !this.mouseOverNotifier) && (y.remove(this.element, U), n.setTimeout(function() {
                y.remove(e.element, W)
            }, 500))
        },
        discardStaticOverflow: function(t) {
            var e, i = t.querySelector(L);
            if (this.staticTimeline)
                for (this.height = 0; e = i.children[this.tweetLimit];) i.removeChild(e)
        },
        hideStreamScrollBar: function() {
            var t, e = this.element.querySelector(k),
                i = this.element.querySelector(L);
            e.style.width = "", t = this.element.offsetWidth - i.offsetWidth, t > 0 && (e.style.width = this.element.offsetWidth + t + "px")
        },
        readTranslations: function() {
            var t = this.element,
                e = "data-dt-";
            this.datetime = new a(v.compact({
                phrases: {
                    now: t.getAttribute(e + "now"),
                    s: t.getAttribute(e + "s"),
                    m: t.getAttribute(e + "m"),
                    h: t.getAttribute(e + "h"),
                    second: t.getAttribute(e + "second"),
                    seconds: t.getAttribute(e + "seconds"),
                    minute: t.getAttribute(e + "minute"),
                    minutes: t.getAttribute(e + "minutes"),
                    hour: t.getAttribute(e + "hour"),
                    hours: t.getAttribute(e + "hours")
                },
                months: t.getAttribute(e + "months")
                    .split("|"),
                formats: {
                    abbr: t.getAttribute(e + "abbr"),
                    shortdate: t.getAttribute(e + "short"),
                    longdate: t.getAttribute(e + "long")
                }
            }))
        },
        updateTimeStamps: function() {
            for (var t, e, i, n, r = this.element.querySelectorAll(O), o = 0; t = r[o]; o++) i = t.getAttribute("data-datetime"), n = i && this.datetime.timeAgo(i, this.i18n), e = t.getElementsByTagName("TIME")[0], n && (e && e.innerHTML ? e.innerHTML = n : t.innerHTML = n)
        },
        mouseIsOver: function() {
            return this.mouseOver
        },
        addUrlParams: function(t) {
            var e = this,
                i = {
                    tw_w: this.widgetId,
                    related: this.related,
                    partner: this.partner,
                    query: this.searchQuery,
                    profile_id: this.profileId,
                    original_referer: x.rootDocumentLocation(),
                    tw_p: "embeddedtimeline"
                };
            return this.addUrlParams = m(i, function(t) {
                var i = _.closest(P, t, e.element);
                return i && {
                    tw_i: i.getAttribute("data-tweet-id")
                }
            }), this.addUrlParams(t)
        },
        showNSFW: function(t) {
            var e, i, n, r, o, s, a = t.querySelector(".nsfw"),
                l = 0;
            a && (i = d.scaleDimensions(a.getAttribute("data-width"), a.getAttribute("data-height"), this.contentWidth(), a.getAttribute("data-height")), e = !!(r = a.getAttribute("data-player")), e ? o = this.sandbox.createElement("iframe") : (o = this.sandbox.createElement("img"), r = a.getAttribute(g.retina() ? "data-image-2x" : "data-image"), o.alt = a.getAttribute("data-alt"), s = this.sandbox.createElement("a"), s.href = a.getAttribute("data-href"), s.appendChild(o)), o.title = a.getAttribute("data-title"), o.src = r, o.width = i.width, o.height = i.height, n = _.closest(C, a, t), l = i.height - a.offsetHeight, a.parentNode.replaceChild(e ? o : s, a), n.style.cssText = "height:" + (n.offsetHeight + l) + "px")
        },
        toggleExpando: function(t) {
            var e, i, n = t.querySelector(C),
                r = n && n.children[0],
                s = r && r.getAttribute("data-expanded-media"),
                a = 0,
                l = t.querySelector(M),
                u = l && l.getElementsByTagName("B")[0],
                c = u && (u.innerText || u.textContent);
            if (u) {
                if (this.layout(function() {
                        u.innerHTML = l.getAttribute("data-toggled-text"), l.setAttribute("data-toggled-text", c)
                    }), y.present(t, j)) return this.layout(function() {
                    y.remove(t, j)
                }), n ? (this.layout(function() {
                    n.style.cssText = "", r.innerHTML = ""
                }), void o.doLayout()) : void o.doLayout();
                s && (e = this.sandbox.createElement("DIV"), e.innerHTML = s, d.retinize(e), a = this.constrainMedia(e), this.layout(function() {
                    r.appendChild(e)
                })), n && this.layout(function() {
                    i = Math.max(r.offsetHeight, a), n.style.cssText = "height:" + i + "px"
                }), this.layout(function() {
                    y.add(t, j)
                }), o.doLayout()
            }
        },
        recalculateStreamHeight: function(t) {
            var e = this,
                i = this.element.querySelector(D),
                n = this.element.querySelector(R),
                r = this.element.querySelector(k);
            this.layout(function() {
                var o = i.offsetHeight + (n ? n.offsetHeight : 0),
                    s = t || e.sandbox.height();
                r.style.cssText = "height:" + (s - o - 2) + "px", e.noscrollbar && e.hideStreamScrollBar()
            })
        },
        handleResize: function(t, e) {
            var i = this,
                n = Math.min(this.dimensions.DEFAULT_WIDTH, Math.max(this.dimensions.MIN_WIDTH, Math.min(this.predefinedWidth || this.dimensions.DEFAULT_WIDTH, t)));
            (n != this.width || e != this.height) && (this.width = n, this.height = e, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(n)), this.staticTimeline ? this.layout(function() {
                i.height = i.element.offsetHeight, i.sandbox.height(i.height), E.get("events")
                    .trigger("resize", {
                        target: i.sandbox.element()
                    })
            }) : (this.recalculateStreamHeight(e), E.get("events")
                .trigger("resize", {
                    target: this.sandbox.element()
                })), o.doLayoutAsync())
        }
    }), e.exports = i
}, {
    "anim/transition": 1,
    "assets/css": 2,
    "dom/classname": 4,
    "dom/delegate": 5,
    "dom/get": 6,
    "env/window": 12,
    "globals/private": 16,
    "globals/twttr": 17,
    "performance/perf-timers": 21,
    "scribe/audience": 28,
    "scribe/frame": 29,
    "tfw/util/data": 36,
    "tfw/util/media": 38,
    "tfw/util/params": 39,
    "tfw/widget/base": 40,
    "tfw/widget/syndicatedbase": 44,
    "util/css": 48,
    "util/datetime": 49,
    "util/document": 50,
    "util/donottrack": 52,
    "util/env": 53,
    "util/typevalidator": 64,
    "util/util": 67
}], 46: [function(t, e) {
    function i(t) {
        o.apply(this, [t]);
        var e = this.params(),
            i = e.count || this.dataAttr("count"),
            n = e.size || this.dataAttr("size"),
            r = l.getScreenNameFromPage(),
            c = "" + (e.shareWithRetweet || this.dataAttr("share-with-retweet") || s.val("share-with-retweet"));
        this.classAttr.push("twitter-tweet-button"), "hashtag" == e.type || a.contains(this.classAttr, "twitter-hashtag-button") ? (this.type = "hashtag", this.classAttr.push("twitter-hashtag-button")) : "mention" == e.type || a.contains(this.classAttr, "twitter-mention-button") ? (this.type = "mention", this.classAttr.push("twitter-mention-button")) : this.classAttr.push("twitter-share-button"), this.text = e.text || this.dataAttr("text"), this.text && /\+/.test(this.text) && !/ /.test(this.text) && (this.text = this.text.replace(/\+/g, " ")), this.counturl = e.counturl || this.dataAttr("counturl"), this.searchlink = e.searchlink || this.dataAttr("searchlink"), this.button_hashtag = u.hashTag(e.button_hashtag || e.hashtag || this.dataAttr("button-hashtag"), !1), this.size = "large" == n ? "l" : "m", this.align = e.align || this.dataAttr("align") || "", this.via = e.via || this.dataAttr("via"), this.hashtags = e.hashtags || this.dataAttr("hashtags"), this.screen_name = u.screenName(e.screen_name || e.screenName || this.dataAttr("button-screen-name")), this.url = e.url || this.dataAttr("url"), this.type ? (this.count = "none", this.shareWithRetweet = "never", r && (this.related = this.related ? r + "," + this.related : r)) : (this.text = this.text || h, this.url = this.url || l.getCanonicalURL() || f, this.count = a.contains(m, i) ? i : "horizontal", this.count = "vertical" == this.count && "l" == this.size ? "none" : this.count, this.via = this.via || r, c && a.contains(p, c) && (this.shareWithRetweet = c.replace("-", "_")))
    }
    var n = t("env/document"),
        r = t("env/location"),
        o = t("tfw/widget/base"),
        s = t("globals/pagemetadata"),
        a = t("util/util"),
        l = t("util/uri"),
        u = t("util/twitter"),
        c = t("dom/textsize"),
        d = t("util/donottrack"),
        h = n.title,
        f = r.href,
        m = ["vertical", "horizontal", "none"],
        p = ["never", "publisher-first", "publisher-only", "author-first", "author-only"];
    i.prototype = new o, a.aug(i.prototype, {
        iframeSource: "widgets/tweet_button.493c8c24c1d977b6441c6c398ad48dfb.{{lang}}.html",
        widgetUrlParams: function() {
            return a.compact({
                text: this.text,
                url: this.url,
                via: this.via,
                related: this.related,
                count: this.count,
                lang: this.lang,
                counturl: this.counturl,
                searchlink: this.searchlink,
                placeid: this.placeid,
                original_referer: r.href,
                id: this.id,
                size: this.size,
                type: this.type,
                screen_name: this.screen_name,
                share_with_retweet: this.shareWithRetweet,
                button_hashtag: this.button_hashtag,
                hashtags: this.hashtags,
                align: this.align,
                partner: this.partner,
                dnt: d.enabled(),
                _: +new Date
            })
        },
        height: function() {
            return "vertical" == this.count ? 62 : "m" == this.size ? 20 : 28
        },
        width: function() {
            var t = {
                    ver: 8,
                    cnt: 14,
                    btn: 24,
                    xlcnt: 18,
                    xlbtn: 38
                },
                e = "vertical" == this.count,
                i = "hashtag" == this.type && this.button_hashtag ? "Tweet %{hashtag}" : "mention" == this.type && this.screen_name ? "Tweet to %{name}" : "Tweet",
                n = this._(i, {
                    name: "@" + this.screen_name,
                    hashtag: "#" + this.button_hashtag
                }),
                r = this._("K"),
                o = this._("100K+"),
                s = (e ? "8888" : "88888") + r,
                l = 0,
                u = 0,
                d = 0,
                h = 0,
                f = this.styles.base,
                m = f;
            return a.contains(["ja", "ko"], this.lang) ? s += this._("10k unit") : s = s.length > o.length ? s : o, e ? (m = f.concat(this.styles.vbubble), h = t.ver, d = t.btn) : "l" == this.size ? (f = m = f.concat(this.styles.large), d = t.xlbtn, h = t.xlcnt) : (d = t.btn, h = t.cnt), "none" != this.count && (u = c(s, "", m)
                    .width + h), l = c(n, "", f.concat(this.styles.button))
                .width + d, e ? l > u ? l : u : this.calculatedWidth = l + u
        },
        render: function() {
            var t, e = this,
                i = this.makeIframeSource();
            return this.count && this.classAttr.push("twitter-count-" + this.count), t = this.create(i, this.dimensions(), {
                    title: this._("Twitter Tweet Button")
                })
                .then(function(t) {
                    return e.element = t
                })
        }
    }), e.exports = i
}, {
    "dom/textsize": 8,
    "env/document": 9,
    "env/location": 10,
    "globals/pagemetadata": 15,
    "tfw/widget/base": 40,
    "util/donottrack": 52,
    "util/twitter": 63,
    "util/uri": 66,
    "util/util": 67
}], 47: [function(t, e) {
    function i(t, e, i, n) {
        v[t] = v[t] || [], v[t].push({
            s: i,
            f: n,
            lang: e
        })
    }

    function n(t, e) {
        var i = {};
        i[t] = {
            item_type: 0
        }, p.clientEvent({
            page: "video",
            component: "tweet",
            action: "results"
        }, d.aug({}, e, {
            item_ids: [t],
            item_details: i
        }), !0), m.scribeVideoAudienceImpression()
    }

    function r(t, e) {
        var i = {};
        i[t] = {
            item_type: 0
        }, p.clientEvent({
            page: "video",
            component: "rawembedcode",
            action: "no_results"
        }, {
            widget_origin: h.rootDocumentLocation(),
            widget_frame: h.isFramed() && h.currentDocumentLocation(),
            message: e,
            item_ids: [t],
            item_details: i
        }, !0), m.scribeVideoAudienceImpression()
    }

    function o(t) {
        if (t) {
            l.apply(this, [t]);
            var e = this.srcEl && this.srcEl.getElementsByTagName("A"),
                i = e && e[e.length - 1],
                n = this.params();
            this.hideStatus = "hidden" === (n.status || this.dataAttr("status")), this.tweetId = n.tweetId || i && w.status(i.href)
        }
    }
    var s = t("assets/css"),
        a = t("tfw/widget/base"),
        l = t("tfw/widget/syndicatedbase"),
        u = t("util/datetime"),
        c = t("util/promise"),
        d = t("util/util"),
        h = t("util/document"),
        f = t("tfw/util/data"),
        m = t("scribe/audience"),
        p = t("scribe/frame"),
        g = t("globals/twttr"),
        w = t("util/twitter"),
        v = {},
        b = [];
    o.prototype = new l, d.aug(o.prototype, {
        renderedClassNames: "twitter-video twitter-video-rendered",
        videoPlayer: !0,
        dimensions: {
            DEFAULT_HEIGHT: "360",
            DEFAULT_WIDTH: "640",
            maxHeight: "500",
            MIN_WIDTH: "320",
            MIN_HEIGHT: "180",
            MARGIN: "10px 0",
            WIDE_MEDIA_PADDING: 0,
            NARROW_MEDIA_PADDING: 0,
            BORDERS: 0
        },
        styleSheetUrl: s.video,
        create: function(t) {
            var e, i = this,
                r = this.sandbox.createElement("div");
            return r.innerHTML = t, (e = r.children[0]) ? (this.playerConfig = JSON.parse(e.getAttribute("data-player-config")), this.sandbox.setTitle(e.getAttribute("data-iframe-title") || "Video"), this.sandbox.appendChild(e)
                .then(function() {
                    i.renderResolver.fulfill(i.sandbox)
                }), this.layout(function() {
                    i.predefinedWidth = i.width, i.width = i.sandbox.width(i.width), i.constrainMedia(e, i.contentWidth(i.width)), i.completeResolver.fulfill(i.sandbox.element())
                }), n(this.tweetId, this.baseScribeData()), e) : void 0
        },
        render: function() {
            var t = this;
            return this.tweetId ? (this.rendered()
                .then(function(e) {
                    var i = t.srcEl;
                    i && i.parentNode && t.layout(function() {
                            i && i.parentNode && i.parentNode.removeChild(i)
                        }), t.layout(function() {
                            t.height = t.sandbox.height(t.element.offsetHeight)
                        })
                        .then(function() {
                            e.onresize(t.handleResize.bind(t))
                        }), a.doLayoutAsync()
                }), i(this.tweetId, this.lang, function(e) {
                    t.ready()
                        .then(function() {
                            t.element = t.create(e), t.readTimestampTranslations(), t.writePlayerConfig(), a.doLayoutAsync()
                        })
                }, function() {
                    r(t.tweetId, t.partner), t.completeResolver.fulfill(t.srcEl)
                }), b.push(this.completed()), this.completed()) : (this.completeResolver.fulfill(this.srcEl), this.completed())
        },
        handleResize: function(t) {
            var e = this;
            t != this.width && (this.width = t, this.constrainMedia(this.element, this.contentWidth(this.width)), this.layout(function() {
                e.height = e.sandbox.height(e.element.offsetHeight), g.get("events")
                    .trigger("resize", {
                        target: e.sandbox.element()
                    })
            }), a.doLayoutAsync())
        },
        baseScribeData: function() {
            return {
                widget_origin: h.rootDocumentLocation(),
                widget_frame: h.isFramed() && h.currentDocumentLocation(),
                message: this.partner
            }
        },
        readTimestampTranslations: function() {
            var t = this.element,
                e = "data-dt-",
                i = t.getAttribute(e + "months") || "";
            this.datetime = new u(d.compact({
                phrases: {
                    AM: t.getAttribute(e + "am"),
                    PM: t.getAttribute(e + "pm")
                },
                months: i.split("|"),
                formats: {
                    full: t.getAttribute(e + "full")
                }
            }))
        },
        getTimestamp: function() {
            var t = this.element.getAttribute("data-datetime"),
                e = t && this.datetime.localTimeStamp(t);
            return {
                local: e
            }
        },
        writePlayerConfig: function() {
            this.playerConfig.statusTimestamp = this.getTimestamp(), this.playerConfig.hideStatus = this.hideStatus, this.element.setAttribute("data-player-config", JSON.stringify(this.playerConfig))
        }
    }), o.fetchAndRender = function() {
        var t = v,
            e = [];
        v = {};
        for (var i in t) t.hasOwnProperty(i) && e.push(i);
        e.length && (f.videos({
            ids: e.sort(),
            lang: t[e[0]][0].lang,
            complete: function(e) {
                d.forIn(e, function(e, i) {
                    var n = t[e];
                    n.forEach(function(t) {
                        t.s && t.s.call(this, i)
                    }), delete t[e]
                }), a.doLayout(), d.forIn(t, function(t, e) {
                    e.forEach(function(e) {
                        e.f && e.f.call(this, t)
                    })
                }), a.doLayout()
            }
        }), c.every.apply(null, b), b = [])
    }, a.afterLoad(o.fetchAndRender), e.exports = o
}, {
    "assets/css": 2,
    "globals/twttr": 17,
    "scribe/audience": 28,
    "scribe/frame": 29,
    "tfw/util/data": 36,
    "tfw/widget/base": 40,
    "tfw/widget/syndicatedbase": 44,
    "util/datetime": 49,
    "util/document": 50,
    "util/promise": 60,
    "util/twitter": 63,
    "util/util": 67
}], 48: [function(t, e) {
    e.exports = {
        sanitize: function(t, e, i) {
            var n, r = /^[\w ,%\/"'\-_#]+$/,
                o = t && t.split(";")
                .map(function(t) {
                    return t.split(":")
                        .slice(0, 2)
                        .map(function(t) {
                            return t.trim()
                        })
                }),
                s = 0,
                a = [],
                l = i ? "!important" : "";
            for (e = e || /^(font|text\-|letter\-|color|line\-)[\w\-]*$/; o && (n = o[s]); s++) n[0].match(e) && n[1].match(r) && a.push(n.join(":") + l);
            return a.join(";")
        }
    }
}, {}], 49: [function(t, e) {
    function i(t) {
        return 10 > t ? "0" + t : t
    }

    function n(t) {
        function e(t, e) {
            return r && r[t] && (t = r[t]), t.replace(/%\{([\w_]+)\}/g, function(t, i) {
                return void 0 !== e[i] ? e[i] : t
            })
        }
        var r = t && t.phrases,
            o = t && t.months || a,
            s = t && t.formats || l;
        this.timeAgo = function(t) {
            var i, r = n.parseDate(t),
                a = +new Date,
                l = a - r;
            return r ? isNaN(l) || 2 * u > l ? e("now") : c > l ? (i = Math.floor(l / u), e(s.abbr, {
                number: i,
                symbol: e(f, {
                    abbr: e("s"),
                    expanded: e(i > 1 ? "seconds" : "second")
                })
            })) : d > l ? (i = Math.floor(l / c), e(s.abbr, {
                number: i,
                symbol: e(f, {
                    abbr: e("m"),
                    expanded: e(i > 1 ? "minutes" : "minute")
                })
            })) : h > l ? (i = Math.floor(l / d), e(s.abbr, {
                number: i,
                symbol: e(f, {
                    abbr: e("h"),
                    expanded: e(i > 1 ? "hours" : "hour")
                })
            })) : 365 * h > l ? e(s.shortdate, {
                day: r.getDate(),
                month: e(o[r.getMonth()])
            }) : e(s.longdate, {
                day: r.getDate(),
                month: e(o[r.getMonth()]),
                year: r.getFullYear()
                    .toString()
                    .slice(2)
            }) : ""
        }, this.localTimeStamp = function(t) {
            var r = n.parseDate(t),
                a = r && r.getHours();
            return r ? e(s.full, {
                day: r.getDate(),
                month: e(o[r.getMonth()]),
                year: r.getFullYear(),
                hours24: i(a),
                hours12: 13 > a ? a ? a : "12" : a - 12,
                minutes: i(r.getMinutes()),
                seconds: i(r.getSeconds()),
                amPm: e(12 > a ? "AM" : "PM")
            }) : ""
        }
    }
    var r = /(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/,
        o = /[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i,
        s = /^\d+$/,
        a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        l = {
            abbr: "%{number}%{symbol}",
            shortdate: "%{day} %{month}",
            longdate: "%{day} %{month} %{year}",
            full: "%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"
        },
        u = 1e3,
        c = 60 * u,
        d = 60 * c,
        h = 24 * d,
        f = '<abbr title="%{expanded}">%{abbr}</abbr>';
    n.parseDate = function(t) {
        var e, i, n = t || "",
            l = n.toString();
        return (e = function() {
            var t;
            return s.test(l) ? parseInt(l, 10) : (t = l.match(o)) ? Date.UTC(t[7], a.indexOf(t[1]), t[2], t[3], t[4], t[5]) : (t = l.match(r)) ? Date.UTC(t[1], t[2] - 1, t[3], t[4], t[5], t[6]) : void 0
        }()) ? (i = new Date(e), !isNaN(i.getTime()) && i) : !1
    }, e.exports = n
}, {}], 50: [function(t, e) {
    function i(t) {
        return t && a.isType("string", t) && (l = t), l
    }

    function n() {
        return u
    }

    function r() {
        return l !== u
    }
    var o = t("env/location"),
        s = t("util/uri"),
        a = t("util/util"),
        l = s.getCanonicalURL() || o.href,
        u = l;
    e.exports = {
        isFramed: r,
        rootDocumentLocation: i,
        currentDocumentLocation: n
    }
}, {
    "env/location": 10,
    "util/uri": 66,
    "util/util": 67
}], 51: [function(t, e) {
    function i() {
        l = 1;
        for (var t = 0, e = u.length; e > t; t++) u[t]()
    }
    var n, r, o, s = t("env/document"),
        a = t("env/window"),
        l = 0,
        u = [],
        c = !1,
        d = s.createElement("a");
    /^loade|c/.test(s.readyState) && (l = 1), s.addEventListener && s.addEventListener("DOMContentLoaded", r = function() {
        s.removeEventListener("DOMContentLoaded", r, c), i()
    }, c), d.doScroll && s.attachEvent("onreadystatechange", n = function() {
        /^c/.test(s.readyState) && (s.detachEvent("onreadystatechange", n), i())
    }), o = d.doScroll ? function(t) {
        a.self != a.top ? l ? t() : u.push(t) : ! function() {
            try {
                d.doScroll("left")
            } catch (e) {
                return setTimeout(function() {
                    o(t)
                }, 50)
            }
            t()
        }()
    } : function(t) {
        l ? t() : u.push(t)
    }, e.exports = o
}, {
    "env/document": 9,
    "env/window": 12
}], 52: [function(t, e) {
    function i() {
        d = !0
    }

    function n(t, e) {
        return d ? !0 : u.asBoolean(c.val("dnt")) ? !0 : !s || 1 != s.doNotTrack && 1 != s.msDoNotTrack ? l.isUrlSensitive(e || o.host) ? !0 : a.isFramed() && l.isUrlSensitive(a.rootDocumentLocation()) ? !0 : (t = h.test(t || r.referrer) && RegExp.$1, t && l.isUrlSensitive(t) ? !0 : !1) : !0
    }
    var r = t("env/document"),
        o = t("env/location"),
        s = t("env/navigator"),
        a = t("util/document"),
        l = t("util/tld"),
        u = t("util/typevalidator"),
        c = t("globals/pagemetadata"),
        d = !1,
        h = /https?:\/\/([^\/]+).*/i;
    e.exports = {
        setOn: i,
        enabled: n
    }
}, {
    "env/document": 9,
    "env/location": 10,
    "env/navigator": 11,
    "globals/pagemetadata": 15,
    "util/document": 50,
    "util/tld": 62,
    "util/typevalidator": 64
}], 53: [function(t, e) {
    function i(t) {
        return t = t || m, t.devicePixelRatio ? t.devicePixelRatio >= 1.5 : t.matchMedia ? t.matchMedia("only screen and (min-resolution: 144dpi)")
            .matches : !1
    }

    function n(t) {
        return t = t || y, /(Trident|MSIE \d)/.test(t)
    }

    function r(t) {
        return t = t || y, /MSIE 9/.test(t)
    }

    function o(t) {
        return t = t || y, /(iPad|iPhone|iPod)/.test(t)
    }

    function s(t) {
        return t = t || y, /^Mozilla\/5\.0 \(Linux; (U; )?Android/.test(t)
    }

    function a() {
        return _
    }

    function l(t, e) {
        return t = t || m, e = e || y, t.postMessage && !(n(e) && t.opener)
    }

    function u(t) {
        t = t || f;
        try {
            return !!t.plugins["Shockwave Flash"] || !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
        } catch (e) {
            return !1
        }
    }

    function c(t, e, i) {
        return t = t || m, e = e || f, i = i || y, "ontouchstart" in t || /Opera Mini/.test(i) || e.msMaxTouchPoints > 0
    }

    function d() {
        var t = h.body.style;
        return void 0 !== t.transition || void 0 !== t.webkitTransition || void 0 !== t.mozTransition || void 0 !== t.oTransition || void 0 !== t.msTransition
    }
    var h = t("env/document"),
        f = t("env/navigator"),
        m = t("env/window"),
        p = t("util/domready"),
        g = t("util/typevalidator"),
        w = t("util/logger"),
        v = t("globals/pagemetadata"),
        b = t("globals/private"),
        y = f.userAgent,
        _ = !1,
        T = !1,
        x = "twitter-csp-test";
    b.set("verifyCSP", function(t) {
        var e = h.getElementById(x);
        T = !0, _ = !!t, e && e.parentNode.removeChild(e)
    }), p(function() {
        var t;
        return g.asBoolean(v.val("widgets:csp")) ? _ = !0 : (t = h.createElement("script"), t.id = x, t.text = b.fullPath("verifyCSP") + "(false);", h.body.appendChild(t), void m.setTimeout(function() {
            T || (w.warn('TWITTER: Content Security Policy restrictions may be applied to your site. Add <meta name="twitter:widgets:csp" content="on"> to supress this warning.'), w.warn("TWITTER: Please note: Not all embedded timeline and embedded Tweet functionality is supported when CSP is applied."))
        }, 5e3))
    }), e.exports = {
        retina: i,
        anyIE: n,
        ie9: r,
        ios: o,
        android: s,
        cspEnabled: a,
        flashEnabled: u,
        canPostMessage: l,
        touch: c,
        cssTransitions: d
    }
}, {
    "env/document": 9,
    "env/navigator": 11,
    "env/window": 12,
    "globals/pagemetadata": 15,
    "globals/private": 16,
    "util/domready": 51,
    "util/logger": 57,
    "util/typevalidator": 64
}], 54: [function(t, e) {
    var i = t("util/util"),
        n = {
            bind: function(t, e) {
                return this._handlers = this._handlers || {}, this._handlers[t] = this._handlers[t] || [], this._handlers[t].push(e)
            },
            unbind: function(t, e) {
                if (this._handlers[t])
                    if (e) {
                        var i = this._handlers[t].indexOf(e);
                        i >= 0 && this._handlers[t].splice(i, 1)
                    } else this._handlers[t] = []
            },
            trigger: function(t, e) {
                var n = this._handlers && this._handlers[t];
                e = e || {}, e.type = t, n && n.forEach(function(t) {
                    i.async(t.bind(this, e))
                })
            }
        };
    e.exports = {
        Emitter: n
    }
}, {
    "util/util": 67
}], 55: [function(t, e) {
    var i = t("env/document"),
        n = t("util/util");
    e.exports = function(t, e, r) {
        var o;
        if (r = r || i, t = t || {}, e = e || {}, t.name) {
            try {
                o = r.createElement('<iframe name="' + t.name + '"></iframe>')
            } catch (s) {
                o = r.createElement("iframe"), o.name = t.name
            }
            delete t.name
        } else o = r.createElement("iframe");
        return t.id && (o.id = t.id, delete t.id), o.allowtransparency = "true", o.scrolling = "no", o.setAttribute("frameBorder", 0), o.setAttribute("allowTransparency", !0), n.forIn(t, function(t, e) {
            o.setAttribute(t, e)
        }), n.forIn(e, function(t, e) {
            o.style[t] = e
        }), o
    }
}, {
    "env/document": 9,
    "util/util": 67
}], 56: [function(t, e) {
    function i() {}
    var n, r = t("env/window"),
        o = t("util/promise"),
        s = [];
    i.prototype.enqueue = function(t, e) {
        return new o(function(i) {
            s.push({
                action: t,
                resolver: i,
                note: e
            })
        })
    }, i.prototype.exec = function() {
        var t, e = s;
        if (e.length)
            for (s = []; e.length;) t = e.shift(), t && t.action ? t.resolver.fulfill(t.action()) : t.resolver.reject()
    }, i.prototype.delayedExec = function() {
        n && r.clearTimeout(n), n = r.setTimeout(this.exec, 100)
    }, e.exports = i
}, {
    "env/window": 12,
    "util/promise": 60
}], 57: [function(t, e) {
    function i() {
        l("info", d.toRealArray(arguments))
    }

    function n() {
        l("warn", d.toRealArray(arguments))
    }

    function r() {
        l("error", d.toRealArray(arguments))
    }

    function o(t) {
        m && (f[t] = a())
    }

    function s(t) {
        var e;
        m && (f[t] ? (e = a(), i("_twitter", t, e - f[t])) : r("timeEnd() called before time() for id: ", t))
    }

    function a() {
        return c.performance && +c.performance.now() || +new Date
    }

    function l(t, e) {
        if (c[h] && c[h][t]) switch (e.length) {
            case 1:
                c[h][t](e[0]);
                break;
            case 2:
                c[h][t](e[0], e[1]);
                break;
            case 3:
                c[h][t](e[0], e[1], e[2]);
                break;
            case 4:
                c[h][t](e[0], e[1], e[2], e[3]);
                break;
            case 5:
                c[h][t](e[0], e[1], e[2], e[3], e[4]);
                break;
            default:
                0 !== e.length && c[h].warn && c[h].warn("too many params passed to logger." + t)
        }
    }
    var u = t("env/location"),
        c = t("env/window"),
        d = t("util/util"),
        h = ["con", "sole"].join(""),
        f = {},
        m = d.contains(u.href, "tw_debug=true");
    e.exports = {
        info: i,
        warn: n,
        error: r,
        time: o,
        timeEnd: s
    }
}, {
    "env/location": 10,
    "env/window": 12,
    "util/util": 67
}], 58: [function(t, e) {
    function i(t) {
        return function(e) {
            return r.hasValue(e[t])
        }
    }

    function n() {
        this.assertions = [], this._defaults = {}
    }
    var r = t("util/typevalidator"),
        o = t("util/util");
    n.prototype.assert = function(t, e) {
        return this.assertions.push({
            fn: t,
            msg: e || "assertion failed"
        }), this
    }, n.prototype.defaults = function(t) {
        return this._defaults = t || this._defaults, this
    }, n.prototype.require = function(t) {
        var e = this;
        return t = Array.isArray(t) ? t : o.toRealArray(arguments), t.forEach(function(t) {
            e.assert(i(t), "required: " + t)
        }), this
    }, n.prototype.parse = function(t) {
        var e, i;
        if (e = o.aug({}, this._defaults, t || {}), i = this.assertions.reduce(function(t, i) {
                return i.fn(e) || t.push(i.msg), t
            }, []), i.length > 0) throw new Error(i.join("\n"));
        return e
    }, e.exports = n
}, {
    "util/typevalidator": 64,
    "util/util": 67
}], 59: [function(t, e) {
    var i, n, r, o = t("util/querystring");
    i = function(t) {
        var e = t.search.substr(1);
        return o.decode(e)
    }, n = function(t) {
        var e = t.href,
            i = e.indexOf("#"),
            n = 0 > i ? "" : e.substring(i + 1);
        return o.decode(n)
    }, r = function(t) {
        var e, r = {},
            o = i(t),
            s = n(t);
        for (e in o) o.hasOwnProperty(e) && (r[e] = o[e]);
        for (e in s) s.hasOwnProperty(e) && (r[e] = s[e]);
        return r
    }, e.exports = {
        combined: r,
        fromQuery: i,
        fromFragment: n
    }
}, {
    "util/querystring": 61
}], 60: [function(t, e) {
    var i = t("util/util"),
        n = function(t) {
            try {
                var e = t.then;
                if ("function" == typeof e) return !0
            } catch (i) {}
            return !1
        },
        r = function(t) {
            Error.call(this, t)
        };
    r.prototype = Object.create(Error.prototype);
    var o = function() {
            var t = [];
            return t.pump = function(e) {
                i.async(function() {
                    for (var i = t.length, n = 0; i > n;) n++, t.shift()(e)
                })
            }, t
        },
        s = function(t, e, r, o, s, a) {
            var l = !1,
                u = this,
                c = function(t) {
                    i.async(function() {
                        a("fulfilled"), o(t), e.pump(t)
                    })
                },
                d = function(t) {
                    i.async(function() {
                        a("rejected"), s(t), r.pump(t)
                    })
                },
                h = function(t) {
                    return n(t) ? void t.then(h, d) : void c(t)
                },
                f = function(t) {
                    return function(e) {
                        l || (l = !0, t(e))
                    }
                };
            this.resolve = f(h, "resolve"), this.fulfill = f(c, "fulfill"), this.reject = f(d, "reject"), this.cancel = function() {
                u.reject(new Error("Cancel"))
            }, this.timeout = function() {
                u.reject(new Error("Timeout"))
            }, a("pending")
        },
        a = function(t) {
            var e, i, n = new o,
                r = new o,
                a = "pending";
            this._addAcceptCallback = function(t) {
                n.push(t), "fulfilled" == a && n.pump(e)
            }, this._addRejectCallback = function(t) {
                r.push(t), "rejected" == a && r.pump(i)
            };
            var l = new s(this, n, r, function(t) {
                e = t
            }, function(t) {
                i = t
            }, function(t) {
                a = t
            });
            try {
                t && t(l)
            } catch (u) {
                l.reject(u)
            }
        },
        l = function(t) {
            return "function" == typeof t
        },
        u = function(t, e, i) {
            return l(t) ? function() {
                try {
                    var i = t.apply(null, arguments);
                    e.resolve(i)
                } catch (n) {
                    e.reject(n)
                }
            } : e[i].bind(e)
        },
        c = function(t, e, i) {
            return l(t) && i._addAcceptCallback(t), l(e) && i._addRejectCallback(e), i
        };
    i.aug(a.prototype, {
        then: function(t, e) {
            var i = this;
            return new a(function(n) {
                c(u(t, n, "resolve"), u(e, n, "reject"), i)
            })
        },
        "catch": function(t) {
            var e = this;
            return new a(function(i) {
                c(null, u(t, i, "reject"), e)
            })
        }
    }), a.isThenable = n;
    var d = function(t) {
        return i.toRealArray(t)
            .map(a.resolve)
    };
    a.any = function() {
        var t = d(arguments);
        return new a(function(e) {
            if (t.length) {
                var i = !1,
                    n = function(t) {
                        i || (i = !0, e.resolve(t))
                    },
                    r = function(t) {
                        i || (i = !0, e.reject(t))
                    };
                t.forEach(function(t) {
                    t.then(n, r)
                })
            } else e.reject("No futures passed to Promize.any()")
        })
    }, a.every = function() {
        var t = d(arguments);
        return new a(function(e) {
            if (t.length) {
                var i = new Array(t.length),
                    n = 0,
                    r = function(r, o) {
                        n++, i[r] = o, n == t.length && e.resolve(i)
                    };
                t.forEach(function(t, i) {
                    t.then(r.bind(null, i), e.reject)
                })
            } else e.reject("No futures passed to Promize.every()")
        })
    }, a.some = function() {
        var t = d(arguments);
        return new a(function(e) {
            if (t.length) {
                var i = 0,
                    n = function() {
                        i++, i == t.length && e.reject()
                    };
                t.forEach(function(t) {
                    t.then(e.resolve, n)
                })
            } else e.reject("No futures passed to Promize.some()")
        })
    }, a.fulfill = function(t) {
        return new a(function(e) {
            e.fulfill(t)
        })
    }, a.resolve = function(t) {
        return new a(function(e) {
            e.resolve(t)
        })
    }, a.reject = function(t) {
        return new a(function(e) {
            e.reject(t)
        })
    }, e.exports = a
}, {
    "util/util": 67
}], 61: [function(t, e) {
    function i(t) {
        return encodeURIComponent(t)
            .replace(/\+/g, "%2B")
            .replace(/'/g, "%27")
    }

    function n(t) {
        return decodeURIComponent(t)
    }

    function r(t) {
        var e = [];
        return u.forIn(t, function(t, n) {
                var r = i(t);
                u.isType("array", n) || (n = [n]), n.forEach(function(t) {
                    l.hasValue(t) && e.push(r + "=" + i(t))
                })
            }), e.sort()
            .join("&")
    }

    function o(t) {
        var e, i = {};
        return t ? (e = t.split("&"), e.forEach(function(t) {
            var e = t.split("="),
                r = n(e[0]),
                o = n(e[1]);
            return 2 == e.length ? u.isType("array", i[r]) ? void i[r].push(o) : r in i ? (i[r] = [i[r]], void i[r].push(o)) : void(i[r] = o) : void 0
        }), i) : {}
    }

    function s(t, e) {
        var i = r(e);
        return i.length > 0 ? u.contains(t, "?") ? t + "&" + r(e) : t + "?" + r(e) : t
    }

    function a(t) {
        var e = t && t.split("?");
        return 2 == e.length ? o(e[1]) : {}
    }
    var l = t("util/typevalidator"),
        u = t("util/util");
    e.exports = {
        url: s,
        decodeURL: a,
        decode: o,
        encode: r,
        encodePart: i,
        decodePart: n
    }
}, {
    "util/typevalidator": 64,
    "util/util": 67
}], 62: [function(t, e) {
    function i(t) {
        return t in s ? s[t] : s[t] = o.test(t)
    }

    function n() {
        return i(r.host)
    }
    var r = t("env/location"),
        o = /^[^#?]*\.(gov|mil)(:\d+)?([#?].*)?$/i,
        s = {};
    e.exports = {
        isUrlSensitive: i,
        isHostPageSensitive: n
    }
}, {
    "env/location": 10
}], 63: [function(t, e) {
    function i(t) {
        return "string" == typeof t && m.test(t) && RegExp.$1.length <= 20
    }

    function n(t) {
        return i(t) ? RegExp.$1 : void 0
    }

    function r(t, e) {
        var i = f.decodeURL(t);
        return e = e || !1, i.screen_name = n(t), i.screen_name ? f.url("https://twitter.com/intent/" + (e ? "follow" : "user"), i) : void 0
    }

    function o(t) {
        return r(t, !0)
    }

    function s(t) {
        return "string" == typeof t && v.test(t)
    }

    function a(t, e) {
        return e = void 0 === e ? !0 : e, s(t) ? (e ? "#" : "") + RegExp.$1 : void 0
    }

    function l(t) {
        return "string" == typeof t && p.test(t)
    }

    function u(t) {
        return l(t) && RegExp.$1
    }

    function c(t) {
        return g.test(t)
    }

    function d(t) {
        return w.test(t)
    }

    function h(t) {
        return b.test(t)
    }
    var f = t("util/querystring"),
        m = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i,
        p = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i,
        g = /^http(s?):\/\/(\w+\.)*twitter\.com([\:\/]|$)/i,
        w = /^http(s?):\/\/pbs\.twimg\.com\//,
        v = /^#?([^.,<>!\s\/#\-\(\)\'\"]+)$/,
        b = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/;
    e.exports = {
        isHashTag: s,
        hashTag: a,
        isScreenName: i,
        screenName: n,
        isStatus: l,
        status: u,
        intentForProfileURL: r,
        intentForFollowURL: o,
        isTwitterURL: c,
        isTwimgURL: d,
        isIntentURL: h,
        regexen: {
            profile: m
        }
    }
}, {
    "util/querystring": 61
}], 64: [function(t, e) {
    function i(t) {
        return void 0 !== t && null !== t && "" !== t
    }

    function n(t) {
        return o(t) && t % 1 === 0
    }

    function r(t) {
        return o(t) && !n(t)
    }

    function o(t) {
        return i(t) && !isNaN(t)
    }

    function s(t) {
        return i(t) && "array" == d.toType(t)
    }

    function a(t) {
        if (!i(t)) return !1;
        switch (t) {
            case "1":
            case "on":
            case "ON":
            case "true":
            case "TRUE":
            case "yes":
            case "YES":
                return !0;
            case "0":
            case "off":
            case "OFF":
            case "false":
            case "FALSE":
            case "no":
            case "NO":
                return !1;
            default:
                return !!t
        }
    }

    function l(t) {
        return o(t) ? t : void 0
    }

    function u(t) {
        return r(t) ? t : void 0
    }

    function c(t) {
        return n(t) ? t : void 0
    }
    var d = t("util/util");
    e.exports = {
        hasValue: i,
        isInt: n,
        isFloat: r,
        isNumber: o,
        isArray: s,
        asInt: c,
        asFloat: u,
        asNumber: l,
        asBoolean: a
    }
}, {
    "util/util": 67
}], 65: [function(t, e) {
    function i() {
        return String(+new Date) + Math.floor(1e5 * Math.random()) + n++
    }
    var n = 0;
    e.exports = {
        generate: i
    }
}, {}], 66: [function(t, e) {
    function i(t, e) {
        var i, n;
        return e = e || s, /^https?:\/\//.test(t) ? t : /^\/\//.test(t) ? e.protocol + t : (i = e.host + (e.port.length ? ":" + e.port : ""), 0 !== t.indexOf("/") && (n = e.pathname.split("/"), n.pop(), n.push(t), t = "/" + n.join("/")), [e.protocol, "//", i, t].join(""))
    }

    function n() {
        for (var t, e = o.getElementsByTagName("link"), n = 0; t = e[n]; n++)
            if ("canonical" == t.rel) return i(t.href)
    }

    function r() {
        for (var t, e, i, n = o.getElementsByTagName("a"), r = o.getElementsByTagName("link"), s = [n, r], l = 0, u = 0, c = /\bme\b/; t = s[l]; l++)
            for (u = 0; e = t[u]; u++)
                if (c.test(e.rel) && (i = a.screenName(e.href))) return i
    }
    var o = t("env/document"),
        s = t("env/location"),
        a = t("util/twitter");
    e.exports = {
        absolutize: i,
        getCanonicalURL: n,
        getScreenNameFromPage: r
    }
}, {
    "env/document": 9,
    "env/location": 10,
    "util/twitter": 63
}], 67: [function(t, e) {
    function i(t) {
        return c(arguments)
            .slice(1)
            .forEach(function(e) {
                r(e, function(e, i) {
                    t[e] = i
                })
            }), t
    }

    function n(t) {
        return r(t, function(e, i) {
            a(i) && (n(i), l(i) && delete t[e]), (void 0 === i || null === i || "" === i) && delete t[e]
        }), t
    }

    function r(t, e) {
        for (var i in t)(!t.hasOwnProperty || t.hasOwnProperty(i)) && e(i, t[i]);
        return t
    }

    function o(t) {
        return {}.toString.call(t)
            .match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }

    function s(t, e) {
        return t == o(e)
    }

    function a(t) {
        return t === Object(t)
    }

    function l(t) {
        if (!a(t)) return !1;
        if (Object.keys) return !Object.keys(t)
            .length;
        for (var e in t)
            if (t.hasOwnProperty(e)) return !1;
        return !0
    }

    function u(t, e) {
        h.setTimeout(function() {
            t.call(e || null)
        }, 0)
    }

    function c(t) {
        return Array.prototype.slice.call(t)
    }

    function d(t, e) {
        return t && t.indexOf ? t.indexOf(e) > -1 : !1
    }
    var h = t("env/window");
    e.exports = {
        aug: i,
        async: u,
        compact: n,
        contains: d,
        forIn: r,
        isObject: a,
        isEmptyObject: l,
        toType: o,
        isType: s,
        toRealArray: c
    }
}, {
    "env/window": 12
}], 68: [function(t, e) {
    function i() {
        if (r) return r;
        if (l.isDynamicWidget()) {
            var t, e = 0,
                i = a.parent.frames.length;
            try {
                if (r = a.parent.frames[d]) return r
            } catch (n) {}
            if (u.anyIE())
                for (; i > e; e++) try {
                    if (t = a.parent.frames[e], t && "function" == typeof t.openIntent) return r = t
                } catch (n) {}
        }
    }

    function n() {
        var t, e, r, s, u, c, d = {};
        if ("function" === (typeof arguments[0])
            .toLowerCase() ? d.success = arguments[0] : d = arguments[0], t = d.success || function() {}, e = d.timeout || function() {}, r = d.nohub || function() {}, s = d.complete || function() {}, u = void 0 !== d.attempt ? d.attempt : m, !l.isDynamicWidget() || o) return r(), s(), !1;
        c = i(), u--;
        try {
            if (c && c.trigger) return t(c), void s()
        } catch (p) {}
        return 0 >= u ? (o = !0, e(), void s()) : +new Date - h > f * m ? (o = !0, void r()) : void a.setTimeout(function() {
            n({
                success: t,
                timeout: e,
                nohub: r,
                attempt: u,
                complete: s
            })
        }, f)
    }
    var r, o, s = t("env/location"),
        a = t("env/window"),
        l = t("tfw/util/env"),
        u = t("util/env"),
        c = "twttrHubFrameSecure",
        d = "http:" == s.protocol ? "twttrHubFrame" : c,
        h = +new Date,
        f = 100,
        m = 20;
    e.exports = {
        withHub: n,
        contextualHubId: d,
        secureHubId: c
    }
}, {
    "env/location": 10,
    "env/window": 12,
    "tfw/util/env": 37,
    "util/env": 53
}], 69: [function(t, e) {
    e.exports = {
        version: "9d4e0b0d707348003c9dafbf1d0cd36f33d92050:1426796054258"
    }
}, {}], 70: [function(t, e) {
    e.exports = {
        css: "6fb6fef1147ea6a3114d61e3e19df9d1"
    }
}, {}], 71: [function(t, e) {
    function i(t, e) {
        return t && t.getAttribute ? t.getAttribute("data-" + e) : void 0
    }

    function n(t, e) {
        return {
            element: t.element || p,
            action: t.action || g,
            page: r(e) ? "video" : void 0
        }
    }

    function r(t) {
        return u.closest(".embedded-video", t)
    }

    function o(t) {
        return JSON.parse(i(r(t), "player-config"))
    }

    function s(t, e) {
        var n, o, s, a = r(e);
        return a ? n = l.aug({
            item_type: f,
            card_type: m,
            id: i(a, "tweet-id"),
            card_name: i(a, "card-name"),
            publisher_id: i(a, "publisher-id"),
            content_id: i(a, "content-id")
        }, t.itemData || {}) : (o = u.closest(".cards-multimedia", e), s = u.closest(".tweet", e), n = l.aug({
            item_type: f,
            card_type: m,
            id: i(s, "tweet-id"),
            card_name: i(o, "card-name"),
            publisher_id: i(o, "publisher-id"),
            content_id: i(o, "video-content-id")
        }, t.itemData || {})), {
            items: [n]
        }
    }

    function a(t) {
        var e = this;
        this.global = t, this.server = (new c)
            .attachReceiver(new h.Receiver(t))
            .bind("scribe", function(t) {
                e.scribe(t, this)
            })
            .bind("requestPlayerConfig", function() {
                return e.requestPlayerConfig(this)
            })
    }
    var l = t("util/util"),
        u = t("dom/get"),
        c = t("rpc/jsonrpc/server"),
        d = t("scribe/pixel"),
        h = t("rpc/postmessage"),
        f = 0,
        m = 6,
        p = "amplify_player",
        g = "undefined";
    a.prototype.findIframeByWindow = function(t) {
        for (var e = this.global.document.getElementsByTagName("iframe"), i = e.length, n = 0; i > n; n++)
            if (e[n].contentWindow == t) return e[n]
    }, a.prototype.requestPlayerConfig = function(t) {
        var e = this.findIframeByWindow(t);
        if (e) return o(e)
    }, a.prototype.scribe = function(t, e) {
        var i, r, o, a;
        i = t && t.customScribe, r = this.findIframeByWindow(e), i && r && (o = n(i, r), a = s(i, r), d.clientEvent2(o, a, !0))
    }, e.exports = a
}, {
    "dom/get": 6,
    "rpc/jsonrpc/server": 23,
    "rpc/postmessage": 24,
    "scribe/pixel": 30,
    "util/util": 67
}], 72: [function(t) {
    ! function() {
        var e = t("env/document"),
            i = t("env/navigator"),
            n = Function && Function.prototype && Function.prototype.bind,
            r = /MSIE [678]/.test(i.userAgent);
        if (n && !r) {
            var o = t("tfw/util/article"),
                s = t("util/domready"),
                a = t("util/logger"),
                l = t("performance/perf-timers"),
                u = t("tfw/widget/base"),
                c = t("tfw/widget/follow"),
                d = t("tfw/widget/tweetbutton"),
                h = t("tfw/widget/embed"),
                f = t("tfw/widget/timeline"),
                m = t("tfw/widget/video"),
                p = t("tfw/widget/intent"),
                g = t("tfw/factories"),
                w = t("util/events"),
                v = t("tfw/hub/client"),
                b = t("intents/delegate"),
                y = t("globals/twttr"),
                _ = t("globals/private"),
                T = t("events/ready"),
                x = t("util/promise");
            if (_.init("host", "platform.twitter.com"), l.start("widgets-js-load"), o.requestArticleUrl(), _.get("widgets.loaded")) return y.call("widgets.load"), !1;
            if (_.get("widgets.init")) return !1;
            _.set("widgets.init", !0), y.set("init", !0);
            var E, A = new x(function(t) {
                E = t.fulfill.bind(t)
            });
            T.exposeReadyPromise(A, y.base, "_e"), y.set("events", {
                bind: function(t, e) {
                    A.then(function(i) {
                        i.events.bind(t, e)
                    })
                }
            }), s(function() {
                function t() {
                    _.set("eventsHub", v.init()), v.init(!0)
                }
                var i, n = {
                        "a.twitter-share-button": d,
                        "a.twitter-mention-button": d,
                        "a.twitter-hashtag-button": d,
                        "a.twitter-follow-button": c,
                        "blockquote.twitter-tweet": h,
                        "a.twitter-timeline": f,
                        "div.twitter-timeline": f,
                        "blockquote.twitter-video": m,
                        body: p
                    },
                    r = _.get("eventsHub") ? y.get("events") : {};
                y.aug("widgets", g, {
                    load: function(t) {
                        a.time("load"), u.init(n), u.embed(t), _.set("widgets.loaded", !0)
                    }
                }), y.aug("events", r, w.Emitter), i = y.get("events.bind"), y.set("events.bind", function(e, n) {
                    t(), this.bind = i, this.bind(e, n)
                }), E(y.base), b.attachTo(e), y.call("widgets.load")
            })
        }
    }()
}, {
    "env/document": 9,
    "env/navigator": 11,
    "events/ready": 13,
    "globals/private": 16,
    "globals/twttr": 17,
    "intents/delegate": 19,
    "performance/perf-timers": 21,
    "tfw/factories": 32,
    "tfw/hub/client": 33,
    "tfw/util/article": 34,
    "tfw/widget/base": 40,
    "tfw/widget/embed": 41,
    "tfw/widget/follow": 42,
    "tfw/widget/intent": 43,
    "tfw/widget/timeline": 45,
    "tfw/widget/tweetbutton": 46,
    "tfw/widget/video": 47,
    "util/domready": 51,
    "util/events": 54,
    "util/logger": 57,
    "util/promise": 60
}], 73: [function(t, e) {
    function i() {}
    var n = t("util/util"),
        r = t("util/events");
    n.aug(i.prototype, r.Emitter, {
        transportMethod: "",
        init: function() {},
        send: function(t) {
            var e;
            this._ready ? this._performSend(t) : e = this.bind("ready", function() {
                this.unbind("ready", e), this._performSend(t)
            })
        },
        ready: function() {
            this.trigger("ready", this), this._ready = !0
        },
        isReady: function() {
            return !!this._ready
        },
        receive: function(t) {
            this.trigger("message", t)
        }
    }), e.exports = {
        Connection: i
    }
}, {
    "util/events": 54,
    "util/util": 67
}], 74: [function(t, e) {
    function i(t, e) {
        var i = e || Math.floor(100 * Math.random()),
            r = ['<object id="xdflashshim' + i + '" name="xdflashshim' + i + '"', 'type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"', 'width="1" height="1" style="position:absolute;left:-9999px;top:-9999px;">', '<param name="movie" value="' + t + "&debug=" + n.__XDDEBUG__ + '">', '<param name="wmode" value="window">', '<param name="allowscriptaccess" value="always">', "</object>"].join(" ");
        return r
    }
    var n = t("env/window");
    e.exports = {
        object: i
    }
}, {
    "env/window": 12
}], 75: [function(t, e) {
    function i(t) {
        return (JSON.parse || JSON.decode)(t)
    }

    function n(t) {
        this.con = t
    }

    function r() {
        this.id = r.id++
    }
    var o = t("util/util"),
        s = t("util/events");
    o.aug(n.prototype, {
        expose: function(t) {
            this.con.bind("message", this._handleRequest(t))
        },
        call: function(t) {
            var e, n = this;
            return this._requests || (this._requests = {}, this.con.bind("message", function(t) {
                var e;
                try {
                    t = i(t)
                } catch (r) {
                    return
                }
                t.callback && "number" == typeof t.id && (e = n._requests[t.id]) && (t.error ? e.trigger("error", t) : e.trigger("success", t), delete n._requests[t.id])
            })), e = new r, this._requests[e.id] = e, e.send(this.con, t, Array.prototype.slice.call(arguments, 1))
        },
        _handleRequest: function(t) {
            var e = this;
            return function(n) {
                var r, o;
                try {
                    n = i(n)
                } catch (s) {
                    return
                }
                n.callback || "number" == typeof n.id && "function" == typeof t[n.method] && (o = e._responseCallbacks(n.id), r = t[n.method].apply(t, n.params.concat(o)), "undefined" != typeof r && o[0](r))
            }
        },
        _responseCallbacks: function(t) {
            var e = this.con;
            return [function(i) {
                e.send(JSON.stringify({
                    id: t,
                    result: i,
                    callback: !0
                }))
            }, function i(n) {
                e.send(JSON.stringify({
                    id: t,
                    error: i,
                    callback: n
                }))
            }]
        }
    }), r.id = 0, o.aug(r.prototype, s.Emitter, {
        send: function(t, e, i) {
            return t.send(JSON.stringify({
                id: this.id,
                method: e,
                params: i
            })), this
        },
        success: function(t) {
            return this.bind("success", t), this
        },
        error: function(t) {
            return this.bind("error", t), this
        }
    }), e.exports = function(t) {
        return new n(t)
    }
}, {
    "util/events": 54,
    "util/util": 67
}], 76: [function(t, e) {
    function i() {}

    function n(t) {
        this.transportMethod = "PostMessage", this.options = t, this._createChild()
    }

    function r(t) {
        this.transportMethod = "Flash", this.options = t, this.token = Math.random()
            .toString(16)
            .substring(2), this._setup()
    }

    function o(t) {
        this.transportMethod = "Fallback", this.options = t, this._createChild()
    }
    var s, a = t("env/document"),
        l = t("env/window"),
        u = t("xd/base"),
        c = t("util/util"),
        d = t("util/env"),
        h = t("intents/intent"),
        f = "__ready__",
        m = 0;
    i.prototype = new u.Connection, c.aug(i.prototype, {
        _createChild: function() {
            this.options.window ? this._createWindow() : this._createIframe()
        },
        _createIframe: function() {
            function t() {
                o.child = e.contentWindow, o._ready || o.init()
            }
            var e, i, n, r, o = this,
                u = {
                    allowTransparency: !0,
                    frameBorder: "0",
                    scrolling: "no",
                    tabIndex: "0",
                    name: this._name()
                },
                d = c.aug(c.aug({}, u), this.options.iframe);
            l.postMessage ? (s || (s = a.createElement("iframe")), e = s.cloneNode(!1)) : e = a.createElement('<iframe name="' + d.name + '">'), e.id = d.name, c.forIn(d, function(t, i) {
                "style" != t && e.setAttribute(t, i)
            }), r = e.getAttribute("style"), r && "undefined" != typeof r.cssText ? r.cssText = d.style : e.style.cssText = d.style, e.addEventListener("load", t, !1), e.src = this._source(), (i = this.options.appendTo) ? i.appendChild(e) : (n = this.options.replace) ? (i = n.parentNode, i && i.replaceChild(e, n)) : a.body.insertBefore(e, a.body.firstChild)
        },
        _createWindow: function() {
            var t = h.open(this._source())
                .popup;
            t && t.focus(), this.child = t, this.init()
        },
        _source: function() {
            return this.options.src
        },
        _name: function() {
            var t = "_xd_" + m++;
            return l.parent && l.parent != l && l.name && (t = l.name + t), t
        }
    }), n.prototype = new i, c.aug(n.prototype, {
        init: function() {
            function t(t) {
                t.source === e.child && (e._ready || t.data !== f ? e.receive(t.data) : e.ready())
            }
            var e = this;
            l.addEventListener("message", t, !1)
        },
        _performSend: function(t) {
            this.child.postMessage(t, this.options.src)
        }
    }), r.prototype = new i, c.aug(r.prototype, {
        _setup: function() {
            var e = this,
                i = t("xd/flash");
            l["__xdcb" + e.token] = {
                receive: function(t) {
                    e._ready || t !== f ? e.receive(t) : e.ready()
                },
                loaded: function() {}
            };
            var n = a.createElement("div");
            n.innerHTML = i.object("https://platform.twitter.com/xd/ft.swf?&token=" + e.token + "&parent=true&callback=__xdcb" + e.token + "&xdomain=" + e._host(), e.token), a.body.insertBefore(n, a.body.firstChild), e.proxy = n.firstChild, e._createChild()
        },
        init: function() {},
        _performSend: function(t) {
            this.proxy.send(t)
        },
        _host: function() {
            return this.options.src.replace(/https?:\/\//, "")
                .split(/(:|\/)/)[0]
        },
        _source: function() {
            return this.options.src + (this.options.src.match(/\?/) ? "&" : "?") + "xd_token=" + l.escape(this.token)
        }
    }), o.prototype = new i, c.aug(o.prototype, {
        init: function() {},
        _performSend: function() {}
    }), e.exports = {
        connect: function(t) {
            return !d.canPostMessage() || d.anyIE() && t.window ? d.anyIE() && d.flashEnabled() ? new r(t) : new o(t) : new n(t)
        }
    }
}, {
    "env/document": 9,
    "env/window": 12,
    "intents/intent": 20,
    "util/env": 53,
    "util/util": 67,
    "xd/base": 73,
    "xd/flash": 74
}]
}, {}, [72]);