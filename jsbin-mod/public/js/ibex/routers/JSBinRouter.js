def([
  "jquery",
  "backbone",
  "underscore",
  "../views/GutterPillView",
  "../views/DropDownJSView",
  "../views/HeaderControlView",
  "../views/CodeMirrorJSView",
  "../views/CodeMirrorHTMLView",
  "../views/CodeMirrorCSSView",
  "../views/HTMLJSLinksView",
  "../collections/SourceCollection",
  "../collections/ActiveNodeCollection",
  "../routers/JSBinSocketRouter"
], function ($, Backbone, _,
             GutterPillView,
             DropDownJSView,
             HeaderControlView,
             CodeMirrorJSView,
             CodeMirrorHTMLView,
             CodeMirrorCSSView,
             HTMLJSLinksView,
             SourceCollection,
             ActiveNodeCollection,
             JSBinSocketRouter) {
  var instance = null;

  var JSBinRouter = Backbone.Router.extend({
    codeMirrors: {
      js: null,
      html: null,
      css: null
    },

    initialize: function () {
      if (instance !== null) {
        throw new Error("Cannot instantiate more than one Singleton, use MySingleton.getInstance()");
      }

      this.activeNodeCollection = new ActiveNodeCollection();
      this.sourceCollection = new SourceCollection(null, {
        scripts: [],
        activeNodeCollection: this.activeNodeCollection
      });

      this.codeMirrorJSView = new CodeMirrorJSView(this.codeMirrors, this.sourceCollection, this.activeNodeCollection, this);
      this.codeMirrorHTMLView = new CodeMirrorHTMLView(this.codeMirrors, this.activeNodeCollection, this);
      this.dropDownJSView = new DropDownJSView(this.sourceCollection, this.codeMirrorJSView);
      this.headerControlView = new HeaderControlView();
      this.headerControlView.render();
      this.codeMirrorCSSView = new CodeMirrorCSSView(this.codeMirrors);
      this.htmlJSLinksView = new HTMLJSLinksView(this.codeMirrorJSView, this.codeMirrorHTMLView, this.activeNodeCollection);
      this.codeMirrorJSView.htmlJSLinksView = this.htmlJSLinksView;
      this.codeMirrorHTMLView.htmlJSLinksView = this.htmlJSLinksView;

      this.jsBinSocketRouter = JSBinSocketRouter.getInstance();

      this.bindSocketHandlers();
      this.bindViewListeners();
    },

    bindSocketHandlers: function () {
      this.jsBinSocketRouter.onSocketData("fondueDTO:arrInvocations", function (obj) {
        this.activeNodeCollection.mergeInvocations(obj.invocations);

        if (!this.sourceCollection.length) {
          // this jsbin doesn't have all the setup code the browser sent
          // trigger a fetch to get everything we need

          if (!this.resendRequested) {
            console.log("Don't have scripts, requesting...");
            this.jsBinSocketRouter.emit("jsbin:resendAll", {});
            this.resendRequested = true;
          }

          return;
        }

        this.resendRequested = false;

        if (this.activeNodeCollection.hasFullNodeList) {
          this.updateMirrors();
        }
      }, this);

      this.jsBinSocketRouter.onSocketData("fondueDTO:css", function (obj) {
        console.log("fondueDTO:css");
        this.codeMirrorCSSView.setCode(obj.css);
      }, this);

      this.jsBinSocketRouter.onSocketData("fondueDTO:html", function (obj) {
        console.log("fondueDTO:html");
        if (!this.uiPaused) {
          this.codeMirrorHTMLView.htmlSource = obj.html;
          this.codeMirrorHTMLView.render();
        }
      }, this);

      this.jsBinSocketRouter.onSocketData("fondueDTO:scripts", function (obj) {
        console.log("fondueDTO:scripts");

        this.sourceCollection.empty();
        this.sourceCollection.add(obj.scripts);
        this.dropDownJSView.render();
        this.updateMirrors();
      }, this);

      this.jsBinSocketRouter.onSocketData("fondueDTO:newNodeList", function (obj) {
        console.log("fondueDTO:newNodeList", obj.nodes.length, "new nodes.");
        this.activeNodeCollection.mergeNodes(obj.nodes);
        this.resumeUIUpdates();
      }, this);

      this.headerControlView.on("jsDetailChange", function (val) {
        this.pauseUIUpdates();
        this.dropDownJSView.detailChange(val);
      }, this);
    },

    bindViewListeners: function () {
      this.headerControlView.on("activeCodePanel:pause", function (pause) {
        if (pause) {
          this.pauseUIUpdates();
        } else {
          this.resumeUIUpdates();
        }
      }, this);

      this.headerControlView.on("activeCodePanel:reset", function () {
        this.pauseUIUpdates();
        this.activeNodeCollection.empty();
        this.jsBinSocketRouter.emit("jsbin:reset", {});
      }, this);

      this.headerControlView.on("controlView:order", function (jsOrderReversed) {
        this.sourceCollection.setOrder(jsOrderReversed);
        this.dropDownJSView.render();
        this.updateMirrors();
      }, this);
    },

    pauseUIUpdates: function () {
      this.uiPaused = true;
      this.headerControlView.pause();
    },

    resumeUIUpdates: function () {
      this.uiPaused = false;
      this.updateMirrors();
      this.headerControlView.resume();
    },

    updateMirrors: function () {
      if (!this.uiPaused) {
        this.codeMirrorJSView.showSources();
        this.codeMirrorHTMLView.render();
      }
    },

    nav: function (panelType, codeMirrorInstance) {
      this[panelType](codeMirrorInstance);
    },

    javascript: function (codeMirrorInstance) {
      this.codeMirrors.js = codeMirrorInstance;
      this.codeMirrorJSView.showSources();
    },

    html: function (codeMirrorInstance) {
      this.codeMirrors.html = codeMirrorInstance;
      this.codeMirrorHTMLView.render();
    },

    css: function (codeMirrorInstance) {
      this.codeMirrors.css = codeMirrorInstance;
      this.codeMirrorCSSView.render();
    }
  });

  JSBinRouter.getInstance = function () {
    if (instance === null) {
      instance = new JSBinRouter();
    }
    return instance;
  };

  return JSBinRouter;
});