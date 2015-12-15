/*! scripts/vendor/cedexis/cedexis.radar.js */
(function(K, g) {
    var z = {
        "true": true
    };
    var s = 4000;
    var a = 4000;

    function b(X, V, W) {
        return [W, X.requestorZoneId, X.requestorCustomerId, V.provider.getZoneId(), V.provider.getCustomerId(), V.provider.getProviderId(), X.transactionId, X.requestSignature].join("-")
    }

    function P(W, V) {
        return [W.requestorZoneId, W.requestorCustomerId, V.provider.getZoneId(), V.provider.getCustomerId(), V.provider.getProviderId(), D(8), W.requestSignature].join("-")
    }

    function D(X, Y) {
        Y = Y || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var V = [];
        for (var W = 0; W < X; W += 1) {
            V.push(Y.charAt(R(0, Y.length - 1)))
        }
        return V.join("")
    }

    function R(W, V) {
        return Math.floor(Math.random() * (V - W + 1)) + W
    }

    function x(W) {
        var V = W.slice(W.lastIndexOf("/") + 1);
        if (/\.js(\?)?/i.test(V)) {
            return "script"
        }
        if (/\.(ico|png|bmp|gif|jpg|jpeg)(\?)?/i.test(V)) {
            return "image"
        }
        if (/\.(htm(l)?)(\?)?/i.test(V)) {
            return "html;custom"
        }
        return "unknown"
    }

    function k(V, Z, X) {
        var W = X.baseUrl;
        if (X.provider.getCacheBusting()) {
            var Y = "?rnd=";
            if (-1 < W.indexOf("?", 0)) {
                Y = "&rnd="
            }
            Y += b(Z, X, V.getQueryStringProbeId());
            W += Y
        }
        if ("auto" === X.resourceType) {
            X.resourceType = x(X.baseUrl)
        }
        switch (X.resourceType) {
            case "image":
                return new A(X, W, V);
            case "image;dns":
                if (!!(W = M(W))) {
                    return new j(X, W, V)
                }
                break;
            case "script":
                return new Q(X, W, V);
            case "html;dsa":
                return new r(X, W, V);
            default:
                throw N("createProbeBehavior for " + X.resourceType)
        }
        return new y(X, V)
    }

    function I(V, Z, X) {
        var W = X.baseUrl;
        if (X.provider.getCacheBusting()) {
            var Y = "?rnd=";
            if (-1 < W.indexOf("?", 0)) {
                Y = "&rnd="
            }
            Y += P(Z, X);
            W += Y
        }
        switch (X.resourceType) {
            case "uni;jsonp":
                return new J(X, W, V, Z);
            case "uni;ajax":
                return new n(X, W, V, Z);
            default:
                throw N("createCacheNodeIdDetectionBehavior for " + X.resourceType)
        }
    }

    function U(W, X, Y) {
        var V;
        try {
            V = JSON.parse(X)
        } catch (Z) {}
        return o(V, W, Y)
    }

    function o(Y, X, Z) {
        var V = [];
        if (Y) {
            for (var W = 0; W < Y.length; W++) {
                var aa = new S(Y[W], X, Z);
                aa.addMeasurementReadyHandler(Z.measurementReady);
                V.push(aa)
            }
        }
        return V
    }

    function G(W, X) {
        var Z = /(\d+)kb\./i;
        var Y = Z.exec(X);
        if (Y && Y[1]) {
            var V = parseInt(Y[1], 10);
            return Math.floor(8 * 1000 * V / W)
        }
        return 0
    }

    function N(V) {
        return V + " not implemented"
    }

    function p(V) {
        return "function" === typeof V
    }

    function v(V) {
        return "undefined" !== typeof V
    }

    function M(W) {
        var Z = W.indexOf("//");
        if (-1 < Z) {
            var V = W.substring(Z + 2);
            var Y = "//";
            if (0 < Z) {
                Y = W.substring(0, Z) + "//"
            }
            var X = V.split("/");
            X[0] = D(63, "abcdefghijklmnopqrstuvwxyz") + "." + X[0];
            return Y + X.join("/")
        }
        return null
    }

    function l(V) {
        this.__window = V;
        this.__clearManually = false
    }
    l.prototype.setResourceTimingBufferSize = function(X) {
        var W = this.getPerformanceObject();
        if (W) {
            var V = W.setResourceTimingBufferSize || W.webkitSetResourceTimingBufferSize;
            if (V) {
                V.call(W, X)
            }
        }
    };
    l.prototype.installResourceTimingBufferFullHandler = function() {
        var V = this.getPerformanceObject();
        if (V) {
            var W = this.makeResourceTimingBufferFullHandler();
            if (V.addEventListener && "undefined" !== typeof V.onresourcetimingbufferfull) {
                V.addEventListener("resourcetimingbufferfull", W, false)
            } else {
                if (V.addEventListener && "undefined" !== typeof V.onwebkitresourcetimingbufferfull) {
                    V.addEventListener("webkitresourcetimingbufferfull", W, false)
                } else {
                    if ("undefined" !== typeof V.onresourcetimingbufferfull) {
                        V.onresourcetimingbufferfull = W
                    } else {
                        this.__clearManually = true
                    }
                }
            }
        }
    };
    l.prototype.makeResourceTimingBufferFullHandler = function() {
        var V = this;
        return function() {
            V.clearResourceTimingBuffer()
        }
    };
    l.prototype.checkBuffer = function() {
        if (this.__clearManually) {
            var W = 300;
            this.setResourceTimingBufferSize(W);
            var V = this.getResourceEntries();
            if (V) {
                if ((W - 50) < V.length) {
                    this.clearResourceTimingBuffer()
                }
            }
        }
    };
    l.prototype.getPerformanceObject = function() {
        if ("performance" in this.__window) {
            return this.__window.performance
        }
        return null
    };
    l.prototype.clearResourceTimingBuffer = function() {
        var W = this.getPerformanceObject();
        if (W) {
            var V = W.clearResourceTimings || W.webkitClearResourceTimings;
            if (V) {
                V.call(W)
            }
        }
    };
    l.prototype.getResourceEntries = function() {
        var V = this.getPerformanceObject();
        if (V) {
            if (V && V.getEntriesByType) {
                return V.getEntriesByType("resource")
            }
        }
    };

    function u(W, V) {
        this.__window = W;
        this.__document = V
    }
    u.prototype.setDocumentCookie = function(V) {
        this.__document.cookie = V
    };
    u.prototype.getDocumentCookie = function() {
        return this.__document.cookie
    };
    u.prototype.cdxSetTimeout = function(W, V) {
        return this.__window.setTimeout(W, V)
    };
    u.prototype.cdxClearTimeout = function(V) {
        this.__window.clearTimeout(V)
    };
    u.prototype.getPerformanceObject = function() {
        if ("performance" in this.__window) {
            return this.__window.performance
        }
        return null
    };
    u.prototype.getResourceTimingEntry = function(X) {
        var W = this.__window.performance;
        if (W) {
            var V;
            if ("getEntriesByName" in W) {
                V = W.getEntriesByName(X);
                if (V && V.length) {
                    return V[V.length - 1]
                }
            }
            if ("getEntriesByType" in W) {
                V = W.getEntriesByType("resource");
                var Y = V.length;
                while (Y--) {
                    if (V[Y]["name"] === X) {
                        return V[Y]
                    }
                }
            }
        }
        return null
    };
    u.prototype.getUserAgentString = function() {
        return this.__window.navigator.userAgent
    };
    u.prototype.testUserAgentString = function(V) {
        return V.test(this.__window.navigator.userAgent)
    };
    u.prototype.testQueryString = function(V) {
        return V.test(this.__window.location.search)
    };
    u.prototype.createWindowObject = function(V, W, X) {
        if (!Object.prototype.hasOwnProperty.call(this.__window, V) || X) {
            this.__window[V] = W
        }
        return this.__window[V]
    };
    u.prototype.insertScript = function(W, Y, X) {
        var V = this.__document.createElement("script");
        V.async = true;
        V.src = W;
        if (Y) {
            V.onload = Y
        }
        if (X) {
            V.onerror = X
        }
        this.addToContainer(V)
    };
    u.prototype.insertIframe = function(V, X) {
        var W = this.__document.createElement("iframe");
        W.style["display"] = "none";
        W.src = V;
        if (X) {
            W.addEventListener("load", X, false)
        }
        this.addToContainer(W)
    };
    u.prototype.addToContainer = function(W) {
        var V = this.__document.getElementById("cdx");
        if (!V) {
            V = this.__document.createElement("div");
            V.id = "cdx";
            this.__document.body.appendChild(V)
        }
        V.appendChild(W)
    };
    u.prototype.clearCdxDiv = function() {
        var V = this.__document.getElementById("cdx");
        if (V) {
            while (V.firstChild) {
                V.removeChild(V.firstChild)
            }
        }
    };
    u.prototype.getCrypto = function() {
        return this.__window.crypto || this.__window.msCrypto
    };
    u.prototype.createElement = function(V) {
        return this.__document.createElement(V)
    };
    u.prototype.getDocumentProperty = function(V) {
        return this.__document[V]
    };
    u.prototype.getWindowProperty = function(V) {
        return this.__window[V]
    };
    u.prototype.getQueryStringArgument = function(V) {
        var Z = this.__window.location.search.slice(1);
        if (Z) {
            var X = Z.split("&");
            var W = X.length;
            while (W--) {
                var Y = X[W].split("=");
                if (Y[0] === V && Y[1]) {
                    return Y[1]
                }
            }
        }
    };
    u.prototype.getPageProtocol = function() {
        return this.__window.location.protocol
    };
    u.prototype.clearResourceTimings = function() {
        var W = this.getPerformanceObject();
        if (W) {
            var V = W.clearResourceTimings || W.webkitClearResourceTimings;
            if (V) {
                V.call(W)
            }
        }
    };
    u.prototype.setResourceTimingBufferSize = function(X) {
        var W = this.getPerformanceObject();
        if (W) {
            var V = W.setResourceTimingBufferSize || W.webkitSetResourceTimingBufferSize;
            if (V) {
                V.call(W, X)
            }
        }
    };

    function S(V, aa, Y) {
        var af;
        this.__cacheBusting = ("boolean" === typeof V.a) ? V.a : true;
        var W = V.p;
        this.__zoneId = W.z;
        this.__customerId = W.c;
        this.__providerId = W.i;
        this.__transactionId = Y.transactionId;
        this.__currentProbe = null;
        this.__onProviderComplete = Y.providerComplete;
        this.__onMeasurementReadyHandlers = [];
        this.__cacheNodeId = null;
        this.__savedColdProbeFinishedEvent = null;
        this.__substitutionConfiguration = null;
        if (!!(af = V.c)) {
            this.__substitutionConfiguration = {
                zoneId: af.a,
                customerId: af.b,
                providerId: af.c
            }
        }
        this.__probes = [];
        if ("p" in W) {
            var ab = W.p;
            var ae = this.makeOnProbeFinishedCallback();
            var ad = this.makeOnCacheNodeIdProbeFinishedCallback();
            if (ab.a && ab.a["a"]) {
                af = ab.a["a"]
            } else {
                if (ab.b && ab.b["a"]) {
                    af = ab.b["a"]
                }
            }
            if (af) {
                this.__probes.push(new f(Y, {
                    browserProperties: aa,
                    provider: this,
                    resourceType: this.__resourceTypeMap[af.t],
                    baseUrl: af.u,
                    timeoutInMs: s,
                    sendReport: true,
                    isThroughput: false,
                    probeFinished: ae,
                    cacheNodeIdProbeFinished: ad
                }, !!ab.d))
            }
            if (!!(af = ab.d)) {
                this.__probes.push(new E(Y, {
                    browserProperties: aa,
                    provider: this,
                    resourceType: this.__resourceTypeMap[af.t],
                    baseUrl: af.u,
                    timeoutInMs: s,
                    sendReport: true,
                    isThroughput: false,
                    probeFinished: ae,
                    cacheNodeIdProbeFinished: ad
                }))
            }
            var ag = ("number" === typeof V.b) ? V.b : 1;
            if (ab.a) {
                if (!!(af = ab.a["b"])) {
                    this.__probes.push(new B(Y, {
                        browserProperties: aa,
                        provider: this,
                        resourceType: this.__resourceTypeMap[af.t],
                        baseUrl: af.u,
                        timeoutInMs: s,
                        sendReport: true,
                        isThroughput: false,
                        probeFinished: ae,
                        cacheNodeIdProbeFinished: function() {}
                    }))
                }
                if (!!(af = ab.a["c"])) {
                    this.__addThroughputProbes({
                        browserProperties: aa,
                        resourceType: this.__resourceTypeMap[af.t],
                        largeObjectRepeatCount: ag,
                        probeFinished: ae,
                        sessionProperties: Y,
                        url: af.u
                    })
                }
            } else {
                if (ab.b) {
                    if (!!(af = ab.b["b"])) {
                        this.__probes.push(new B(Y, {
                            browserProperties: aa,
                            provider: this,
                            resourceType: this.__resourceTypeMap[af.t],
                            baseUrl: af.u,
                            timeoutInMs: s,
                            sendReport: true,
                            isThroughput: false,
                            probeFinished: ae,
                            cacheNodeIdProbeFinished: function() {}
                        }))
                    }
                    if (!!(af = ab.b["c"])) {
                        this.__addThroughputProbes({
                            browserProperties: aa,
                            resourceType: this.__resourceTypeMap[af.t],
                            largeObjectRepeatCount: ag,
                            probeFinished: ae,
                            sessionProperties: Y,
                            url: af.u
                        })
                    }
                }
            }
            if (!!(af = ab.c)) {
                var X = ac(af.u);
                var Z = K.location["protocol"];
                if (X && ("http:" === Z || "https" === X)) {
                    this.__probes.push(new h(Y, {
                        browserProperties: aa,
                        provider: this,
                        resourceType: this.__resourceTypeMap[af.t],
                        baseUrl: af.u,
                        timeoutInMs: s,
                        sendReport: true,
                        isThroughput: false,
                        probeFinished: ae,
                        cacheNodeIdProbeFinished: function() {}
                    }))
                }
            }
        }

        function ac(ah) {
            if (/http:/i.test(ah)) {
                return "http"
            }
            if (/https:/i.test(ah)) {
                return "https"
            }
            if (/\/\//.test(ah)) {
                return K.location.protocol.replace(":", "")
            }
            return null
        }
    }
    S.prototype.addMeasurementReadyHandler = function(V) {
        this.__onMeasurementReadyHandlers.push(V)
    };
    S.prototype.getSubstitutionConfiguration = function() {
        return this.__substitutionConfiguration
    };
    S.prototype.makeOnProbeFinishedCallback = function() {
        var V = this;
        return function(W) {
            V.onProbeFinished(W)
        }
    };
    S.prototype.makeOnCacheNodeIdProbeFinishedCallback = function() {
        var V = this;
        return function(W) {
            V.onCacheNodeIdProbeFinished(W)
        }
    };
    S.prototype.beginMeasurements = function() {
        this.beginNextMeasurement()
    };
    S.prototype.onProbeFinished = function(W) {
        if (W.getAbortProvider()) {
            this.__onProviderComplete(new e())
        } else {
            var V = W.getProbe();
            if (V.waitForUni) {
                this.saveColdMeasurement(W);
                this.beginNextMeasurement()
            } else {
                this.notifyMeasurementReadySubscribers(new q({
                    provider: this,
                    probeTypeId: V.getProbeId(),
                    resultCode: W.getResultCode(),
                    value: W.getMeasurement(),
                    sendReport: W.getSendReport()
                }));
                if (0 === W.getResultCode()) {
                    this.beginNextMeasurement()
                } else {
                    this.__onProviderComplete(new e())
                }
            }
        }
    };
    S.prototype.onCacheNodeIdProbeFinished = function(V) {
        this.__cacheNodeId = V.cacheNodeId;
        if (this.__savedColdProbeFinishedEvent) {
            this.notifyMeasurementReadySubscribers(new q({
                provider: this,
                probeTypeId: 1,
                resultCode: this.__savedColdProbeFinishedEvent.getResultCode(),
                value: this.__savedColdProbeFinishedEvent.getMeasurement(),
                sendReport: true
            }))
        }
        this.beginNextMeasurement()
    };
    S.prototype.saveColdMeasurement = function(V) {
        this.__savedColdProbeFinishedEvent = V
    };
    S.prototype.beginNextMeasurement = function() {
        if (0 < this.__probes.length) {
            this.__currentProbe = this.__probes.shift();
            this.__currentProbe.beginMeasurement()
        } else {
            this.__onProviderComplete(new e())
        }
    };
    S.prototype.notifyMeasurementReadySubscribers = function(W) {
        var V = this.__onMeasurementReadyHandlers.length;
        while (V--) {
            this.__onMeasurementReadyHandlers[V](W)
        }
    };
    S.prototype.__addThroughputProbes = function(W) {
        for (var V = 0; V < W.largeObjectRepeatCount; V++) {
            this.__probes.push(new i(W.sessionProperties, {
                browserProperties: W.browserProperties,
                provider: this,
                resourceType: W.resourceType,
                baseUrl: W.url,
                timeoutInMs: a,
                sendReport: (V === (W.largeObjectRepeatCount - 1)),
                isThroughput: true,
                probeFinished: W.probeFinished,
                cacheNodeIdProbeFinished: function() {}
            }, V))
        }
    };
    S.prototype.__resourceTypeMap = {
        1: "script",
        2: "image",
        3: "html;custom",
        4: "html;dsa",
        5: "script;other",
        6: "auto",
        7: "uni;ajax",
        8: "uni;jsonp",
        9: "image;dns"
    };
    S.prototype.getZoneId = function() {
        return this.__zoneId
    };
    S.prototype.getCustomerId = function() {
        return this.__customerId
    };
    S.prototype.getProviderId = function() {
        return this.__providerId
    };
    S.prototype.getTransactionId = function() {
        return this.__transactionId
    };
    S.prototype.getCacheBusting = function() {
        return this.__cacheBusting
    };
    S.prototype.getCacheNodeId = function() {
        return this.__cacheNodeId
    };
    S.prototype.processWindowMessageData = function(V) {
        if (this.__currentProbe && this.__currentProbe.processWindowMessageData && V.p && V.r) {
            if (V.p["z"] == this.__zoneId && V.p["c"] == this.__customerId && V.p["i"] == this.__providerId) {
                this.__currentProbe.processWindowMessageData(V)
            }
        }
    };

    function f(X, V, W) {
        this.__provider = V.provider;
        this.__transactionId = X.transactionId;
        this.waitForUni = W;
        this.__behavior = k(this, X, V);
        this.__cancelled = false
    }
    f.prototype.getProvider = function() {
        return this.__provider
    };
    f.prototype.getProbeId = function() {
        return 1
    };
    f.prototype.getProbeIdAsString = function() {
        return this.getProbeId()
            .toString()
    };
    f.prototype.getQueryStringProbeId = function() {
        return "" + this.getProbeId()
    };
    f.prototype.beginMeasurement = function() {
        this.__behavior.execute()
    };
    f.prototype.cdxClearTimeout = function() {
        this.__behavior.cdxClearTimeout()
    };
    f.prototype.processWindowMessageData = function(V) {
        this.__behavior.processWindowMessageData(V)
    };
    f.prototype.setCancelled = function(V) {
        this.__cancelled = V
    };
    f.prototype.getCancelled = function() {
        return this.__cancelled
    };

    function E(W, V) {
        this.__provider = V.provider;
        this.__behavior = I(this, W, V);
        this.__cancelled = false
    }
    E.prototype.getProvider = function() {
        return this.__provider
    };
    E.prototype.getProbeId = function() {
        throw N("CacheNodeIdProbe.prototype.getProbeId")
    };
    E.prototype.getProbeIdAsString = function() {
        return "uni"
    };
    E.prototype.processWindowMessageData = function(V) {
        this.__behavior.processWindowMessageData(V)
    };
    E.prototype.getQueryStringProbeId = function() {
        return "uni"
    };
    E.prototype.beginMeasurement = function() {
        this.__behavior.execute()
    };
    E.prototype.cdxClearTimeout = function() {
        this.__behavior.cdxClearTimeout()
    };
    E.prototype.setCancelled = function(V) {
        this.__cancelled = V
    };
    E.prototype.getCancelled = function() {
        return this.__cancelled
    };

    function i(W, V, X) {
        this.__provider = V.provider;
        this.__repeatIndex = X;
        this.__behavior = k(this, W, V);
        this.__isThroughput = true;
        this.__cancelled = false
    }
    i.prototype.getProvider = function() {
        return this.__provider
    };
    i.prototype.getProbeId = function() {
        return 14
    };
    i.prototype.getProbeIdAsString = function() {
        return this.getProbeId()
            .toString()
    };
    i.prototype.probeSuffixFromIndex = function() {
        if (0 === this.__repeatIndex) {
            return ""
        }
        return String.fromCharCode(97 + this.__repeatIndex)
    };
    i.prototype.getQueryStringProbeId = function() {
        return this.getProbeId() + this.probeSuffixFromIndex()
    };
    i.prototype.beginMeasurement = function() {
        this.__behavior.execute()
    };
    i.prototype.cdxClearTimeout = function() {
        this.__behavior.cdxClearTimeout()
    };
    i.prototype.processWindowMessageData = function() {};
    i.prototype.setCancelled = function(V) {
        this.__cancelled = V
    };
    i.prototype.getCancelled = function() {
        return this.__cancelled
    };

    function B(W, V) {
        this.__provider = V.provider;
        this.__behavior = k(this, W, V);
        this.__cancelled = false
    }
    B.prototype.getProvider = function() {
        return this.__provider
    };
    B.prototype.getProbeId = function() {
        return 0
    };
    B.prototype.getProbeIdAsString = function() {
        return this.getProbeId()
            .toString()
    };
    B.prototype.getQueryStringProbeId = function() {
        return "" + this.getProbeId()
    };
    B.prototype.beginMeasurement = function() {
        this.__behavior.execute()
    };
    B.prototype.cdxClearTimeout = function() {
        this.__behavior.cdxClearTimeout()
    };
    B.prototype.processWindowMessageData = function(V) {
        this.__behavior.processWindowMessageData(V)
    };
    B.prototype.setCancelled = function(V) {
        this.__cancelled = V
    };
    B.prototype.getCancelled = function() {
        return this.__cancelled
    };

    function h(W, V) {
        this.__provider = V.provider;
        this.__behavior = k(this, W, V);
        this.__cancelled = false
    }
    h.prototype.getProbeId = function() {
        return 2
    };
    h.prototype.getProbeIdAsString = function() {
        return this.getProbeId()
            .toString()
    };
    h.prototype.getProvider = function() {
        return this.__provider
    };
    h.prototype.getQueryStringProbeId = function() {
        return "" + this.getProbeId()
    };
    h.prototype.beginMeasurement = function() {
        this.__behavior.execute()
    };
    h.prototype.cdxClearTimeout = function() {
        this.__behavior.cdxClearTimeout()
    };
    h.prototype.processWindowMessageData = function() {};
    h.prototype.setCancelled = function(V) {
        this.__cancelled = V
    };
    h.prototype.getCancelled = function() {
        return this.__cancelled
    };

    function B(W, V) {
        this.__provider = V.provider;
        this.__behavior = k(this, W, V);
        this.__cancelled = false
    }
    B.prototype.getProvider = function() {
        return this.__provider
    };
    B.prototype.getProbeId = function() {
        return 0
    };
    B.prototype.getProbeIdAsString = function() {
        return this.getProbeId()
            .toString()
    };
    B.prototype.getQueryStringProbeId = function() {
        return "" + this.getProbeId()
    };
    B.prototype.beginMeasurement = function() {
        this.__behavior.execute()
    };
    B.prototype.cdxClearTimeout = function() {
        this.__behavior.cdxClearTimeout()
    };
    B.prototype.processWindowMessageData = function(V) {
        this.__behavior.processWindowMessageData(V)
    };
    B.prototype.setCancelled = function(V) {
        this.__cancelled = V
    };
    B.prototype.getCancelled = function() {
        return this.__cancelled
    };

    function Q(X, W, V) {
        this.__browserProperties = X.browserProperties;
        this.__probe = V;
        this.__url = W;
        this.__baseUrl = X.baseUrl;
        this.__cancelled = false;
        this.__status = null;
        this.__timeoutInMs = X.timeoutInMs;
        this.__timeoutId = 0;
        this.__onComplete = X.probeFinished;
        this.__startTime = null
    }
    Q.prototype.setCancelled = function() {
        this.__cancelled = true
    };
    Q.prototype.setStatus = function(V) {
        this.__status = V
    };
    Q.prototype.execute = function() {
        this.__status = "loading";
        this.__browserProperties.insertScript(this.__url, this.makeScriptOnLoadCallback(), this.makeScriptOnErrorCallback());
        this.__startTime = (new Date())
            .getTime();
        this.__timeoutId = this.__browserProperties.cdxSetTimeout(this.makeTimeoutCallback(), this.__timeoutInMs)
    };
    Q.prototype.makeScriptOnLoadCallback = function() {
        var V = this;
        return function() {
            V.cdxClearTimeout();
            V.onScriptLoaded()
        }
    };
    Q.prototype.makeScriptOnErrorCallback = function() {
        var V = this;
        return function() {
            V.cdxClearTimeout();
            V.setCancelled();
            V.onScriptError()
        }
    };
    Q.prototype.makeTimeoutCallback = function() {
        var V = this;
        return function() {
            V.setCancelled();
            V.onScriptTimeout()
        }
    };
    Q.prototype.onScriptLoaded = function() {
        var V = (new Date())
            .getTime() - this.__startTime;
        if (!this.__cancelled) {
            var W = V;
            if (this.__probe.__isThroughput) {
                W = G(V, this.__baseUrl)
            }
            if (1 > W) {
                this.__onComplete(w(this.__probe, null, null, true, true))
            } else {
                if (V <= this.__timeoutInMs) {
                    this.__onComplete(w(this.__probe, 0, W, false, true))
                } else {
                    this.__onComplete(w(this.__probe, 1, 0, false, true))
                }
            }
        }
    };
    Q.prototype.onScriptError = function() {
        this.cdxClearTimeout();
        this.setCancelled();
        this.setStatus("error");
        this.__onComplete(w(this.__probe, 4, 0, false, true))
    };
    Q.prototype.onScriptTimeout = function() {
        this.setCancelled();
        this.__onComplete(w(this.__probe, 1, 0, false, true))
    };
    Q.prototype.cdxClearTimeout = function() {
        this.__browserProperties.cdxClearTimeout(this.__timeoutId)
    };
    Q.prototype.processWindowMessageData = function() {};

    function A(X, W, V) {
        this.__browserProperties = X.browserProperties;
        this.__probe = V;
        this.__url = W;
        this.__baseUrl = X.baseUrl;
        this.__cancelled = false;
        this.__status = null;
        this.__timeoutInMs = X.timeoutInMs;
        this.__timeoutId = 0;
        this.__sendReport = X.sendReport;
        this.__onComplete = X.probeFinished
    }
    A.prototype.setCancelled = function() {
        this.__cancelled = true
    };
    A.prototype.setStatus = function(V) {
        this.__status = V
    };
    A.prototype.setTimeoutId = function(V) {
        this.__timeoutId = V
    };
    A.prototype.execute = function() {
        var X = this.__browserProperties.getPerformanceObject();
        if (X && "getEntriesByType" in X) {
            var W = new Image();
            W.onload = this.makeOnloadCallback();
            var V = this.makeOnerrorCallback();
            if (W.addEventListenter) {
                W.addEventListenter("error", V)
            } else {
                W.onerror = V
            }
            this.setStatus("loading");
            this.setTimeoutId(this.__browserProperties.cdxSetTimeout(this.makeTimeoutCallback(), this.__timeoutInMs));
            W.src = this.__url
        } else {
            this.__onComplete(w(this.__probe, null, null, false, this.__sendReport))
        }
    };
    A.prototype.makeTimeoutCallback = function() {
        var V = this;
        return function() {
            V.setCancelled();
            V.__onComplete(w(V.__probe, 1, 0, false, V.__sendReport))
        }
    };
    A.prototype.onImageLoad = function(Z) {
        this.cdxClearTimeout();
        if (!this.__cancelled) {
            if (this.__sendReport) {
                var Y = this.__browserProperties.getResourceTimingEntry(Z.src);
                if (Y) {
                    var W;
                    var V = this.__probe;
                    if (0 < Y.requestStart) {
                        if (V.__isThroughput) {
                            W = Math.round(Y.responseEnd - Y.requestStart)
                        } else {
                            W = Math.round(Y.responseStart - Y.requestStart)
                        }
                    } else {
                        W = Math.round(Y.duration)
                    }
                    var X = W;
                    if (V.__isThroughput) {
                        X = G(W, this.__baseUrl)
                    }
                    if (1 > X) {
                        this.__onComplete(w(this.__probe, null, null, true, this.__sendReport))
                    } else {
                        if (W <= this.__timeoutInMs) {
                            this.__onComplete(w(this.__probe, 0, X, false, this.__sendReport))
                        } else {
                            this.__onComplete(w(this.__probe, 1, 0, false, this.__sendReport))
                        }
                    }
                } else {
                    this.__onComplete(w(this.__probe, null, null, true, false))
                }
            } else {
                this.__onComplete(w(this.__probe, null, null, false, this.__sendReport))
            }
        }
    };
    A.prototype.makeOnloadCallback = function() {
        var V = this;
        return function() {
            V.onImageLoad(this)
        }
    };
    A.prototype.makeOnerrorCallback = function() {
        var V = this;
        return function() {
            V.onError()
        }
    };
    A.prototype.onError = function() {
        this.cdxClearTimeout();
        this.setCancelled();
        this.setStatus("error");
        this.__onComplete(w(this.__probe, 4, 0, false, this.__sendReport))
    };
    A.prototype.cdxClearTimeout = function() {
        this.__browserProperties.cdxClearTimeout(this.__timeoutId)
    };
    A.prototype.processWindowMessageData = function() {};

    function n(X, W, V, Y) {
        this.__browserProperties = X.browserProperties;
        this.__url = W;
        this.__probe = V;
        this.__timeoutInMs = X.timeoutInMs;
        this.__timeoutId = 0;
        this.__status = null;
        this.__onComplete = X.cacheNodeIdProbeFinished;
        this.__transactionComparator = Y.transactionComparator
    }
    n.prototype.setStatus = function(V) {
        this.__status = V
    };
    n.prototype.getStatus = function() {
        return this.__status
    };
    n.prototype.execute = function() {
        if (this.browserHasAjaxUniSupport()) {
            this.__browserProperties.insertIframe(this.__url);
            this.__timeoutId = this.__browserProperties.cdxSetTimeout(this.makeTimeoutCallback(), this.__timeoutInMs)
        } else {
            this.__onComplete(new H({
                probe: this.__probe,
                cacheNodeId: "1"
            }))
        }
    };
    n.prototype.makeTimeoutCallback = function() {
        var V = this;
        return function() {
            if (V.__transactionComparator(V.__probe.getProvider()
                    .getTransactionId()) && !V.__probe.getCancelled()) {
                V.__probe.setCancelled(true);
                V.__onComplete(new H({
                    probe: V.__probe,
                    cacheNodeId: "2"
                }))
            }
        }
    };
    n.prototype.processWindowMessageData = function(W) {
        switch (W.s) {
            case "l":
                this.cdxClearTimeout();
                this.setStatus("loaded");
                break;
            case "e":
            case "s":
                var V = "2";
                if ("e" === W.s) {
                    this.setStatus("error")
                } else {
                    V = W.node_id
                }
                this.__onComplete(new H({
                    probe: this.__probe,
                    cacheNodeId: V
                }));
                break
        }
    };
    n.prototype.cdxClearTimeout = function() {
        this.__browserProperties.cdxClearTimeout(this.__timeoutId)
    };
    n.prototype.browserHasAjaxUniSupport = function() {
        if (this.__browserProperties.testQueryString(/radar-no-ajax/)) {
            return false
        }
        return p(this.__browserProperties.getWindowProperty("postMessage")) && p(this.__browserProperties.getWindowProperty("addEventListener"))
    };

    function J(X, W, V, Y) {
        this.__browserProperties = X.browserProperties;
        this.__url = W;
        this.__probe = V;
        this.__timeoutInMs = X.timeoutInMs;
        this.__timeoutId = 0;
        this.__onComplete = X.cacheNodeIdProbeFinished;
        this.__transactionComparator = Y.transactionComparator
    }
    J.prototype.execute = function() {
        var V = this.__browserProperties.createWindowObject("cdx", {}, false);
        V.s = V.s || {};
        V.s["b"] = this.makeUniJsonpCallback();
        this.__browserProperties.insertScript(this.__url, null, this.makeOnErrorCallback());
        this.__timeoutId = this.__browserProperties.cdxSetTimeout(this.makeOnTimeoutCallback(), this.__timeoutInMs)
    };
    J.prototype.makeUniJsonpCallback = function() {
        var V = this;
        return function(W) {
            if (W.id == V.__probe.getProvider()
                .getProviderId() && V.__transactionComparator(V.__probe.getProvider()
                    .getTransactionId()) && !V.__probe.getCancelled()) {
                V.cdxClearTimeout();
                V.__onComplete(new H({
                    probe: V.__probe,
                    cacheNodeId: W.node
                }))
            }
        }
    };
    J.prototype.makeOnTimeoutCallback = function() {
        var V = this;
        return function() {
            if (V.__transactionComparator(V.__probe.getProvider()
                    .getTransactionId()) && !V.__probe.getCancelled()) {
                V.__probe.setCancelled(true);
                V.__onComplete(new H({
                    probe: V.__probe,
                    cacheNodeId: "2"
                }))
            }
        }
    };
    J.prototype.makeOnErrorCallback = function() {
        var V = this;
        return function() {
            V.cdxClearTimeout();
            V.__probe.setCancelled(true);
            V.__onComplete(new H({
                probe: V.__probe,
                cacheNodeId: "2"
            }))
        }
    };
    J.prototype.cdxClearTimeout = function() {
        this.__browserProperties.cdxClearTimeout(this.__timeoutId)
    };
    J.prototype.processWindowMessageData = function() {};

    function r(X, W, V) {
        this.__browserProperties = X.browserProperties;
        this.__probe = V;
        this.__url = W;
        this.__cancelled = false;
        this.__status = null;
        this.__timeoutInMs = X.timeoutInMs;
        this.__timeoutId = 0;
        this.__onComplete = X.probeFinished
    }
    r.prototype.setCancelled = function() {
        this.__cancelled = true
    };
    r.prototype.setStatus = function(V) {
        this.__status = V
    };
    r.prototype.setTimeoutId = function(V) {
        this.__timeoutId = V
    };
    r.prototype.execute = function() {
        this.__browserProperties.insertIframe(this.__url, null);
        this.setStatus("loading");
        this.setTimeoutId(this.__browserProperties.cdxSetTimeout(this.makeTimeoutCallback(), this.__timeoutInMs))
    };
    r.prototype.makeTimeoutCallback = function() {
        var V = this;
        return function() {
            V.setCancelled();
            V.__onComplete(new t({
                probe: V.__probe,
                resultCode: 1,
                measurement: 0,
                abortProvider: false,
                sendReport: true
            }))
        }
    };
    r.prototype.cdxClearTimeout = function() {
        this.__browserProperties.cdxClearTimeout(this.__timeoutId)
    };
    r.prototype.processWindowMessageData = function(W) {
        if ("l" === W.s) {
            this.cdxClearTimeout();
            this.setStatus("loaded")
        } else {
            if ("s" === W.s && W.m && !this.__cancelled) {
                var V = W.m["responseEnd"] - W.m["domainLookupStart"];
                if (1 > V) {
                    this.__onComplete(w(this.__probe, null, null, true, true))
                } else {
                    if (V <= this.__timeoutInMs) {
                        this.__onComplete(w(this.__probe, 0, V, false, true))
                    } else {
                        this.__onComplete(w(this.__probe, 1, 0, false, true))
                    }
                }
            }
        }
    };

    function j(X, W, V) {
        this.__browserProperties = X.browserProperties;
        this.__probe = V;
        this.__url = W;
        this.__baseUrl = X.baseUrl;
        this.__status = null;
        this.__timeoutInMs = X.timeoutInMs;
        this.__timeoutId = 0;
        this.__sendReport = X.sendReport;
        this.__onComplete = X.probeFinished
    }
    j.prototype.setStatus = function(V) {
        this.__status = V
    };
    j.prototype.setTimeoutId = function(V) {
        this.__timeoutId = V
    };
    j.prototype.execute = function() {
        var W = this.__browserProperties.getPerformanceObject();
        if (W && "getEntriesByType" in W) {
            var V = new Image();
            V.addEventListener("load", this.makeOnloadCallback());
            V.addEventListener("error", this.makeOnerrorCallback());
            this.setStatus("loading");
            this.setTimeoutId(this.__browserProperties.cdxSetTimeout(this.makeTimeoutCallback(), this.__timeoutInMs));
            V.src = this.__url
        } else {
            this.__onComplete(w(this.__probe, null, null, false, this.__sendReport))
        }
    };
    j.prototype.makeTimeoutCallback = function() {
        var V = this;
        return function() {
            if (!V.__probe.getCancelled()) {
                V.__probe.setCancelled(true);
                V.__onComplete(w(V.__probe, 1, 0, false, V.__sendReport))
            }
        }
    };
    j.prototype.onImageLoad = function(X) {
        this.cdxClearTimeout();
        if (!this.__probe.getCancelled()) {
            var W = this.__browserProperties.getResourceTimingEntry(X.src);
            if (W) {
                var V;
                if (0 < W.requestStart) {
                    V = Math.round(W.domainLookupEnd - W.domainLookupStart)
                } else {
                    V = Math.round(W.duration)
                }
                if (10 > V) {
                    this.__onComplete(w(this.__probe, null, null, true, this.__sendReport))
                } else {
                    if (V <= this.__timeoutInMs) {
                        this.__onComplete(w(this.__probe, 0, V, false, this.__sendReport))
                    } else {
                        this.__onComplete(w(this.__probe, 1, 0, false, this.__sendReport))
                    }
                }
            } else {
                this.__onComplete(w(this.__probe, null, null, true, false))
            }
        }
    };
    j.prototype.onError = function() {
        if (!this.__probe.getCancelled()) {
            this.cdxClearTimeout();
            this.__probe.setCancelled(true);
            this.setStatus("error");
            this.__onComplete(w(this.__probe, 4, 0, false, this.__sendReport))
        }
    };
    j.prototype.makeOnloadCallback = function() {
        var V = this;
        return function() {
            V.onImageLoad(this)
        }
    };
    j.prototype.makeOnerrorCallback = function() {
        var V = this;
        return function() {
            V.onError()
        }
    };
    j.prototype.cdxClearTimeout = function() {
        this.__browserProperties.cdxClearTimeout(this.__timeoutId)
    };
    j.prototype.processWindowMessageData = function() {};

    function y(W, V) {
        this.__probe = V;
        this.__onComplete = W.probeFinished
    }
    y.prototype.cdxClearTimeout = function() {};
    y.prototype.processWindowMessageData = function() {};
    y.prototype.execute = function() {
        this.__onComplete(w(this.__probe, null, null, true, true))
    };

    function t(V) {
        this.__probe = V.probe;
        this.__resultCode = V.resultCode;
        this.__measurement = V.measurement;
        this.__abortProvider = V.abortProvider;
        this.__sendReport = V.sendReport
    }
    t.prototype.getAbortProvider = function() {
        return this.__abortProvider
    };
    t.prototype.getSendReport = function() {
        return this.__sendReport
    };
    t.prototype.getProbe = function() {
        return this.__probe
    };
    t.prototype.getResultCode = function() {
        return this.__resultCode
    };
    t.prototype.getMeasurement = function() {
        return this.__measurement
    };

    function w(X, W, Y, Z, V) {
        return new t({
            probe: X,
            resultCode: W,
            measurement: Y,
            abortProvider: Z,
            sendReport: V
        })
    }

    function H(V) {
        this.probe = V.probe;
        this.cacheNodeId = V.cacheNodeId
    }

    function e() {}

    function q(V) {
        this.__provider = V.provider;
        this.__probeTypeId = V.probeTypeId;
        this.__resultCode = V.resultCode;
        this.__value = V.value;
        this.__sendReport = V.sendReport
    }
    q.prototype.getProvider = function() {
        return this.__provider
    };
    q.prototype.getProbeTypeId = function() {
        return this.__probeTypeId
    };
    q.prototype.getResultCode = function() {
        return this.__resultCode
    };
    q.prototype.getValue = function() {
        return this.__value
    };
    q.prototype.getSendReport = function() {
        return this.__sendReport
    };

    function m() {}

    function c(V) {
        this.__browserProperties = new u(V.window, V.document);
        this.__requestorZoneId = V.requestorZoneId;
        this.__requestorCustomerId = V.requestorCustomerId;
        this.__transactionComparator = V.transactionComparator;
        this.__samplerId = V.samplerId;
        this.__samplerMajorVersion = V.samplerMajorVersion;
        this.__samplerMinorVersion = V.samplerMinorVersion;
        this.__providersJsonpCallbackName = V.providersJsonpCallbackName;
        this.__transactionId = this.makeTransactionId();
        this.__onSessionFinished = function() {};
        this.__domains = {
            init: V.initDomain || "init.cedexis-radar.net",
            report: V.reportDomain || "rpt.cedexis.com",
            providers: V.providersDomain || "radar.cedexis.com"
        };
        this.__requestSignature = "";
        this.__providers = null;
        this.__currentProvider = null;
        this.__reportTag = V.reportTag || null
    }
    c.prototype.setSessionFinishedCallback = function(V) {
        this.__onSessionFinished = V
    };
    c.prototype.getRequestorZoneId = function() {
        return this.__requestorZoneId
    };
    c.prototype.getRequestorCustomerId = function() {
        return this.__requestorCustomerId
    };
    c.prototype.hasRequestSignature = function() {
        return !!(this.__requestSignature)
    };
    c.prototype.getRequestSignature = function() {
        return this.__requestSignature
    };
    c.prototype.getTransactionId = function() {
        return this.__transactionId
    };
    c.prototype.makeOnProviderCompleteCallback = function() {
        var V = this;
        return function() {
            V.onProviderComplete()
        }
    };
    c.prototype.onProviderComplete = function() {
        this.measureNextProvider()
    };
    c.prototype.makeMeasurementReadyCallback = function() {
        var V = this;
        return function(W) {
            V.onMeasurementReady(W)
        }
    };
    c.prototype.onMeasurementReady = function(Z) {
        var ab = Z.getProvider();
        if (ab === this.__currentProvider && Z.getSendReport()) {
            var Y = ab.getZoneId();
            var X = ab.getCustomerId();
            var V = ab.getProviderId();
            var aa = ab.getSubstitutionConfiguration();
            if (aa) {
                Y = aa.zoneId;
                X = aa.customerId;
                V = aa.providerId
            }
            var W = [this.__domains.report, "f1", this.__requestSignature, Y, X, V, Z.getProbeTypeId(), Z.getResultCode(), Z.getValue(), ab.getCacheNodeId() || "0", this.__reportTag || "0"];
            this.sendReport("//" + W.join("/"))
        }
    };
    c.prototype.setRequestSignature = function(V) {
        this.__requestSignature = V
    };
    c.prototype.setCookie = function(V) {
        this.__browserProperties.setDocumentCookie(V)
    };
    c.prototype.getCookie = function(Z) {
        var W = Z + "=";
        var Y = this.__browserProperties.getDocumentCookie()
            .split(";");
        var X = Y.length;
        var V;
        while (X--) {
            V = Y[X];
            while (" " === V.charAt(0)) {
                V = V.substring(1)
            }
            if (-1 < V.indexOf(W)) {
                return V.substring(W.length, V.length)
            }
        }
        return ""
    };
    c.prototype.makeTransactionId = function() {
        var W = this.__browserProperties.getCrypto();
        if (W && W.getRandomValues) {
            var V = new Uint32Array(1);
            W.getRandomValues(V);
            return V[0]
        }
        return Math.floor(1000000000 * Math.random())
    };
    c.prototype.startInitRequest = function(V) {
        if (this.browserSupportsAjax()) {
            this.startInitRequestAjax(V)
        } else {
            this.startInitRequestJsonp(V)
        }
    };
    c.prototype.sendReport = function(V) {
        if (this.browserSupportsAjax()) {
            this.makeAjaxGetRequest(V)
        } else {
            this.__browserProperties.insertScript(V)
        }
    };
    c.prototype.requestProviders = function() {
        if (this.browserSupportsAjax()) {
            this.requestProvidersAjax()
        } else {
            this.requestProvidersJsonp()
        }
    };
    c.prototype.makeProvidersUrl = function(ac) {
        var W = [this.__domains.providers, this.__requestorZoneId, this.__requestorCustomerId, "radar", "1433807157", D(20), "providers.json"];
        var ab = this.getDeviceCapabilities();
        var aa = [];
        for (var Z in ab) {
            if (ab.hasOwnProperty(Z)) {
                aa.push(Z + "=" + ab[Z])
            }
        }
        var ad = this.__browserProperties.getQueryStringArgument("radar-geo");
        if (ad) {
            var X = ad.split("-");
            aa.push("country=" + X[0]);
            aa.push("asn=" + X[1])
        }
        var Y = this.__browserProperties.getQueryStringArgument("radar-provider-count");
        if (!isNaN(Y)) {
            aa.push("providerCount=" + Y)
        }
        if (ac) {
            aa.push("callback=" + ac)
        }
        var V = "";
        if (0 < aa.length) {
            V = "?" + aa.join("&")
        }
        return "//" + W.join("/") + V
    };
    c.prototype.getDeviceCapabilities = function() {
        return {
            a: this.getCorsSupportFlag(),
            b: this.getScriptLoadSupportLevel(),
            n: this.getNavigationTimingSupportFlag(),
            p: this.getHasPostMessageFlag(),
            r: this.getResourceTimingSupportFlag()
        }
    };
    c.prototype.getCorsSupportFlag = function() {
        if (!this.browserSupportsAjax() || this.__browserProperties.testQueryString(/radar-no-ajax/i)) {
            return "0"
        }
        return "1"
    };
    c.prototype.getScriptLoadSupportLevel = function() {
        var V = this.__browserProperties.createElement("script");
        if (p(V.addEventListener)) {
            return "2"
        }
        if (v(V.readyState)) {
            return "1"
        }
        return "0"
    };
    c.prototype.getNavigationTimingSupportFlag = function() {
        if (this.__browserProperties.testUserAgentString(/msie/i)) {
            var V = this.__browserProperties.getDocumentProperty("documentMode");
            var W = this.__browserProperties.getDocumentProperty("compatMode");
            if (V) {
                if (9 > V) {
                    return "0"
                }
            } else {
                if ("BackCompat" === W) {
                    return "0"
                }
            }
        }
        if (!this.__browserProperties.getPerformanceObject()) {
            return "0"
        }
        return "1"
    };
    c.prototype.getHasPostMessageFlag = function() {
        if (p(this.__browserProperties.getWindowProperty("postMessage"))) {
            return "1"
        }
        return "0"
    };
    c.prototype.getResourceTimingSupportFlag = function() {
        function X(Z) {
            var Y = /msie (\d+)/i.exec(Z);
            if (Y) {
                return 10 >= parseInt(Y[1], 10)
            }
            return false
        }
        var V = this.__browserProperties.getPerformanceObject();
        var W = this.__browserProperties.getUserAgentString();
        if (V && p(V.getEntriesByType) && !X(W)) {
            return "1"
        }
        return "0"
    };
    c.prototype.makeAjaxProvidersHandler = function() {
        var V = this;
        return function() {
            V.handleOnGotProviders(this["responseText"])
        }
    };
    c.prototype.handleOnGotProviders = function(V) {
        if (!this.__providers) {
            this.__providers = U(this.__browserProperties, V, this.makeSessionPropertiesObject());
            this.measureNextProvider()
        }
    };
    c.prototype.handleOnGotProvidersAsJsonp = function(V) {
        if (!this.__providers && V.requestor["zoneId"] == this.__requestorZoneId && V.requestor["customerId"] == this.__requestorCustomerId) {
            this.__providers = o(V.providers, this.__browserProperties, this.makeSessionPropertiesObject());
            this.measureNextProvider()
        }
    };
    c.prototype.onGotJsonpProviders = function(V) {
        if (!this.__providers && this.__requestorZoneId === V.requestor["zoneId"] && this.__requestorCustomerId === V.requestor["customerId"]) {
            this.__providers = o(V.providers, this.__browserProperties, this.makeSessionPropertiesObject());
            this.measureNextProvider()
        }
    };
    c.prototype.makeSessionPropertiesObject = function() {
        return {
            requestorZoneId: this.__requestorZoneId,
            requestorCustomerId: this.__requestorCustomerId,
            transactionId: this.__transactionId,
            requestSignature: this.__requestSignature,
            providerComplete: this.makeOnProviderCompleteCallback(),
            measurementReady: this.makeMeasurementReadyCallback(),
            transactionComparator: this.__transactionComparator
        }
    };
    c.prototype.measureNextProvider = function() {
        if (0 < this.__providers.length) {
            this.__currentProvider = this.__providers.shift();
            this.__currentProvider.beginMeasurements()
        } else {
            this.__browserProperties.clearCdxDiv();
            this.__onSessionFinished(new m())
        }
    };
    c.prototype.requestProvidersAjax = function() {
        this.makeAjaxGetRequest(this.makeProvidersUrl(null), this.makeAjaxProvidersHandler())
    };
    c.prototype.requestProvidersJsonp = function() {
        var V = this.makeProvidersUrl(this.__providersJsonpCallbackName);
        this.__browserProperties.insertScript(V)
    };
    c.prototype.browserSupportsAjax = function() {
        if (this.__browserProperties.testQueryString(/radar-no-ajax/i)) {
            return false
        }
        var V = this.getXhr();
        if (V) {
            if (v(V.withCredentials)) {
                return true
            }
        }
        return false
    };
    c.prototype.startInitRequestAjax = function(V) {
        this.makeAjaxGetRequest(this.makeInitUrl("xml"), this.makeAjaxInitCallback(V))
    };
    c.prototype.makeAjaxInitCallback = function(W) {
        var V = this;
        return function() {
            if (this.responseText) {
                var X = /<requestSignature>([^<]+)/.exec(this.responseText);
                if (X && X[1]) {
                    V.setRequestSignature(X[1]);
                    W()
                }
            }
        }
    };
    c.prototype.startInitRequestJsonp = function(Z) {
        var W = this.makeInitUrl("jsonp");
        var V = this.__browserProperties.createWindowObject("cdx", {}, false);
        V.f = V.f || this.makeJsonpInitCallback();
        var Y = this.__requestorZoneId + ";" + this.__requestorCustomerId;
        var X = this.__browserProperties.createWindowObject("cedexis", {}, false);
        X.requestors = X.requestors || {};
        X.requestors[Y] = this.makeJsonpInitCallbackForSession(Z);
        this.__browserProperties.insertScript(W)
    };
    c.prototype.makeJsonpInitCallbackForSession = function(W) {
        var V = this;
        return function(X) {
            if ("a" in X) {
                V.setRequestSignature(X.a);
                W()
            }
        }
    };
    c.prototype.makeJsonpInitCallback = function() {
        var V = this.__browserProperties;
        return function(Y) {
            if ("c" in Y && "d" in Y) {
                var X = Y.c + ";" + Y.d;
                var W = V.getWindowProperty("cedexis");
                if (X in W.requestors) {
                    var Z = W.requestors[X];
                    if (Z) {
                        delete W.requestors[X];
                        Z(Y)
                    }
                }
            }
        }
    };
    c.prototype.makeInitUrl = function(Y) {
        var X = "https:" === this.__browserProperties.getPageProtocol() ? "s" : "i";
        var V = [];
        V.push("i1");
        V.push(this.__samplerId);
        V.push(this.__samplerMajorVersion);
        V.push(this.__samplerMinorVersion);
        V.push(this.__requestorZoneId);
        V.push(this.__requestorCustomerId);
        V.push(this.__transactionId);
        V.push(X);
        V = V.join("-");
        var W = [];
        W.push(V + "." + this.__domains.init);
        W.push("i1");
        W.push(Math.floor((new Date())
                .getTime() / 1000)
            .toString(10));
        W.push(this.__transactionId);
        W.push(Y);
        W = "//" + W.join("/");
        W += "?seed=" + V;
        return W
    };
    c.prototype.makeAjaxGetRequest = function(V, Z, X) {
        var W = this.getXhr();
        if (W) {
            try {
                W.open("GET", V, true);
                if (Z) {
                    W.onreadystatechange = function() {
                        if ((200 === this.status) && (4 === this.readyState)) {
                            Z.call(this)
                        }
                    }
                }
                W.timeout = X || 10000;
                //W.send()
            } catch (Y) {}
        }
    };
    c.prototype.sendPltReport = function(Y) {
        var V = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "secureConnectionStart", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"];

        function aa(ad) {
            if (undefined === ad) {
                return 0
            }
            return ad
        }

        function ab(ad) {
            if (ad.connectEnd < ad.connectStart) {
                return false
            }
            if (ad.domainLookupEnd < ad.domainLookupStart) {
                return false
            }
            if (ad.domComplete < ad.domLoading) {
                return false
            }
            if (ad.fetchStart < ad.navigationStart) {
                return false
            }
            if (ad.loadEventEnd < ad.loadEventStart) {
                return false
            }
            if (ad.loadEventEnd < ad.navigationStart) {
                return false
            }
            if (ad.responseEnd < ad.responseStart) {
                return false
            }
            if (ad.responseStart < ad.requestStart) {
                return false
            }
            return true
        }
        var ac = this.__browserProperties.getPerformanceObject();
        if (ac) {
            var Z = ac.timing;
            if (Z) {
                var W = [this.__domains.report, "n1", 0];
                for (var X = 0; X < V.length; X += 1) {
                    W.push(Y.pltSent ? "0" : aa(Z[V[X]]))
                }
                W.push(this.__requestSignature);
                W.push(Y.reportTag);
                W.push(Y.pltSent ? "0" : this.getStartRenderTimestamp());
                if (ab(Z)) {
                    this.sendReport("//" + W.join("/"))
                }
            }
        }
        return this
    };
    c.prototype.getStartRenderTimestamp = function() {
        var V = this.__browserProperties.getWindowProperty("chrome");
        if (V && V.loadTimes) {
            var X = V.loadTimes();
            return Math.round(1000 * X.firstPaintTime)
        } else {
            var W = this.__browserProperties.getPerformanceObject();
            if (W && W.timing && W.timing["msFirstPaint"]) {
                return Math.round(W.timing["msFirstPaint"])
            }
        }
        return 0
    };
    c.prototype.getXhr = function() {
        var V = this.__browserProperties.getWindowProperty("XMLHttpRequest");
        if (V) {
            return new V()
        }
    };
    c.prototype.processWindowMessage = function(V) {
        if (this.__currentProvider && "data" in V) {
            var W;
            try {
                W = JSON.parse(V.data)
            } catch (X) {}
            if (W) {
                if ("source" in W && ("uni" === W.source || "dsa" === W.source)) {
                    this.__currentProvider.processWindowMessageData(W)
                }
            }
        }
    };
    c.prototype.clearResourceTimings = function() {
        this.__browserProperties.clearResourceTimings()
    };
    c.prototype.setResourceTimingBufferSize = function(V) {
        this.__browserProperties.setResourceTimingBufferSize(V)
    };

    function O(X) {
        var W = [/opera mini/i, /skyfire/i, /teashark/i, /uzard/i, /puffin/i, /yabrowser/i, /msie (5|6|7|8)\./i],
            V = W.length;
        while (V--) {
            if (W[V].test(X.navigator["userAgent"])) {
                return true
            }
        }
        return false
    }

    function C(Y) {
        var X = {
            keynote: /keynote/i,
            gomez: /gomez/i,
            catchpoint: /catchpoint/i,
            pingdom: /pingdom/i,
            ip_label: /ip-label/,
            witbe: /witbe-/i
        };
        var Z = Y.cedexis["radar"]["allowed_monitoring_agents"] || [];

        function V(ac) {
            var aa, ab;
            for (aa = 0; aa < Z.length; aa += 1) {
                ab = Z[aa].toLowerCase();
                if (ab === ac) {
                    return true
                }
            }
            return false
        }
        for (var W in X) {
            if (X.hasOwnProperty(W)) {
                if (X[W].test(Y.navigator.userAgent)) {
                    if (!V(W)) {
                        return true
                    }
                }
            }
        }
        return false
    }

    function d(V) {
        return /radar-allow-monitors=1/.test(V.location["search"])
    }

    function L() {
        this.__recipient = null
    }
    L.prototype.setRecipient = function(V) {
        this.__recipient = V
    };
    L.prototype.getRecipient = function() {
        return this.__recipient
    };
    L.prototype.clearRecipient = function() {
        this.__recipient = null
    };
    L.prototype.makePostMessageHandler = function() {
        var V = this;
        return function(W) {
            var X = V.getRecipient();
            if (X) {
                X.handleMessage(W)
            }
        }
    };
    L.prototype.makeResourceTimingBufferFullHandler = function() {
        var V = this;
        return function() {
            var W = V.getRecipient();
            if (W) {
                W.clearResourceTimingBuffer()
            }
        }
    };
    L.prototype.setProviders = function(V) {
        this.__recipient.setProviders(V)
    };
    L.prototype.setProviders = L.prototype.setProviders;

    function T(W) {
        this.__window = W.window;
        var V = {
            window: W.window,
            document: W.document,
            samplerId: W.samplerId,
            samplerMajorVersion: W.samplerMajorVersion,
            samplerMinorVersion: W.samplerMinorVersion,
            providersJsonpCallbackName: W.providersJsonpCallbackName,
            requestorZoneId: W.requestorZoneId,
            requestorCustomerId: W.requestorCustomerId,
            providersDomain: W.providersDomain,
            initDomain: W.initDomain,
            reportDomain: W.reportDomain,
            sendPlt: W.sendPlt,
            transactionComparator: this.makeTransactionComparator()
        };
        this.__session = new c(V);
        this.__session.setSessionFinishedCallback(this.makeSessionFinishedCallback())
    }
    T.prototype.init = function(X) {
        var W = 300;
        if (X) {
            this.__session.setResourceTimingBufferSize(W)
        }
        var V = this.getResourceEntries();
        if (V) {
            if (X && (W - 50) < V.length) {
                this.clearResourceTimingBuffer()
            }
        }
        this.__session.startInitRequest(this.makeInitCallback())
    };
    T.prototype.makeInitCallback = function() {
        var V = this;
        return function() {
            V.beginSession()
        }
    };
    T.prototype.beginSession = function() {
        this.__session.sendPltReport({
                reportTag: "0",
                pltSent: false
            })
            .requestProviders()
    };
    T.prototype.makeSessionFinishedCallback = function() {
        return function() {
            delete K.cedexis["radar"]["container"]
        }
    };
    T.prototype.handleMessage = function(V) {
        this.__session.processWindowMessage(V)
    };
    T.prototype.clearResourceTimingBuffer = function() {
        this.__session.clearResourceTimings()
    };
    T.prototype.getPerformanceObject = function() {
        return this.__window.performance
    };
    T.prototype.getResourceEntries = function() {
        var V = this.getPerformanceObject();
        if (V) {
            if (V && V.getEntriesByType) {
                return V.getEntriesByType("resource")
            }
        }
    };
    T.prototype.getRadarSession = function() {
        return this.__session
    };
    T.prototype.makeTransactionComparator = function() {
        var V = this;
        return function(X) {
            var W = V.__window.cedexis["radar"]["container"];
            if (W === V) {
                return X === V.getRadarSession()
                    .getTransactionId()
            }
            return false
        }
    };
    T.prototype.setProviders = function(V) {
        this.__session.handleOnGotProvidersAsJsonp(V)
    };
    K.cedexis = K.cedexis || {};
    K.cedexis["radar"] = K.cedexis["radar"] || {};
    if (!O(K) && (!C(K) || d(K))) {
        if (!K.cedexis["radar"]["messenger"]) {
            K.cedexis["radar"]["messenger"] = new L();
            (function() {
                var X = K.cedexis["radar"]["messenger"];
                var W = X.makePostMessageHandler();
                if (K.addEventListener) {
                    K.addEventListener("message", W, false)
                } else {
                    K.attachEvent("onmessage", W)
                }
                var V = K.performance;
                if (V) {
                    W = X.makeResourceTimingBufferFullHandler();
                    if (V.addEventListener && "undefined" !== typeof V.onresourcetimingbufferfull) {
                        V.addEventListener("resourcetimingbufferfull", W, false)
                    } else {
                        if (V.addEventListener && "undefined" !== typeof V.onwebkitresourcetimingbufferfull) {
                            V.addEventListener("webkitresourcetimingbufferfull", W, false)
                        } else {
                            if ("undefined" !== typeof V.onresourcetimingbufferfull) {
                                V.onresourcetimingbufferfull = W
                            } else {
                                K.cedexis["radar"]["clearResourceTimingEntriesManually"] = true
                            }
                        }
                    }
                }
            }())
        }
        if (!K.cedexis["radar"]["container"]) {
            var F = K.cedexis["radar"]["container"] = new T({
                window: K,
                document: g,
                samplerId: "j4",
                samplerMajorVersion: 19,
                samplerMinorVersion: 0,
                providersJsonpCallbackName: "cedexis.radar.messenger.setProviders",
                requestorZoneId: parseInt("1", 10),
                requestorCustomerId: parseInt("13960", 10),
                providersDomain: "radartumblr.cedexis.com",
                initDomain: "init.cedexis-radar.net",
                reportDomain: "tumblrreports.cedexis.com",
                sendPlt: "true" in z
            });
            K.cedexis["radar"]["messenger"].setRecipient(F);
            setTimeout(function() {
                F.init(K.cedexis["radar"]["clearResourceTimingEntriesManually"])
            }, 2000)
        }
    }
}(window, document));