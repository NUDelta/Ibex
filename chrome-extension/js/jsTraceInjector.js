define([],
  function () {
    return function () {
      var originalAddEventListener = EventTarget.prototype.addEventListener;
      (function () {
        var unravelDelete = null; //Leave here for detection

        EventTarget.prototype.addEventListener = function () {
          var unravelDelete = null; //Leave here for detection

          var args = [].splice.call(arguments, 0);
          var eventHandlerFn = args[1];

          args[1] = function () {
            var unravelDelete = null; //Leave here for detection

            var wrapperArgs = [].splice.call(arguments, 0);
            eventHandlerFn.apply(this, wrapperArgs);

            var path = window.unravelAgent.$(this).getPath();

            if (path) {
              window.dispatchEvent(new CustomEvent("eventTrace", {
                "detail": {
                  path: window.unravelAgent.$(this).getPath()
                }
              }));
            }
          };

          return originalAddEventListener.apply(this, args);
        }
      })();

      window.unravelAgent.traceJsOn = function () {
        window.unravelAgent.storedCalls = {};

        if (window.unravelAgent.traceJsActive) {
          window.unravelAgent.traceJsOff();
        }
        window.unravelAgent.traceJsActive = true;

        if (!window.unravelAgent.functionPool) {
          window.unravelAgent.functionPool = {};
        }

        for (var func in document) {
          if (typeof(document[func]) === 'function') {
            window.unravelAgent.functionPool[func] = document[func];
            (function () {
              var functionName = func;  //closure in the func reference
              document[functionName] = function () {
                var args = [].splice.call(arguments, 0);

                if (functionName.indexOf("createEvent") < 0) {
                  var error = new Error();
                  var strArgs;
                  try {
                    strArgs = JSON.stringify(args);
                  } catch (ignored) {
                  }

                  var stackTrace = error.stack.replace(/(?:\r\n|\r|\n)/g, '|||');
                  if (stackTrace.indexOf("getPath") < 0) {
                    var traceObj = {
                      "detail": {
                        stack: error.stack.replace(/(?:\r\n|\r|\n)/g, '|||'),
                        functionName: functionName,
                        args: strArgs,
                        pageOrigin: window.location.origin
                      }
                    };
                    window.dispatchEvent(new CustomEvent("JSTrace", traceObj));
                  }
                }

                var apiReturnVal = window.unravelAgent.functionPool[functionName].apply(document, args);

                try {
                  var path = window.unravelAgent.$(apiReturnVal).getPath();
                  if (path && functionName !== "createElement") {
                    window.dispatchEvent(new CustomEvent("eventTrace", {
                      "detail": {
                        path: path
                      }
                    }));
                  }
                } catch (ignored) {
                }

                return apiReturnVal;
              }
            })();
          }
        }
      };

      window.unravelAgent.traceJsOff = function () {
        if (!window.unravelAgent.functionPool) {
          return;
        }

        for (var func in window.document) {
          if (typeof(window.document[func]) === 'function') {
            window.document[func] = window.unravelAgent.functionPool[func];
          }
        }

        window.unravelAgent.traceJsActive = false;
      };

      window.unravelAgent.reWritePage = function () {
        var http = new XMLHttpRequest();
        http.open("GET", "https://localhost:9001/?url=" + encodeURIComponent(window.location.href) + "&html=true&basePath=" + encodeURIComponent(window.location.origin + window.location.pathname), true);

        http.onreadystatechange = function () {
          if (http.readyState == 4 && http.status == 200) {
            try {
              window.unravelAgent.response = http.responseText;

              var arr = Object.keys(window);
              for (var i = 0; i < arr.length; i++) {
                var key = arr[i];

                if (
                  key !== "unravelAgent" &&
                  key !== "top" &&
                  key !== "location" &&
                  key !== "document" &&
                  key !== "window" &&
                  key !== "external" &&
                  key !== "chrome"
                ) {
                  window[key] = undefined;
                  delete window[key];
                }
              }

              document.open('text/html');
              document.write(http.responseText);
              document.close();
            } catch (err) {
              debugger;
            }
          }
        };

        http.send();
      };

    };

  });
