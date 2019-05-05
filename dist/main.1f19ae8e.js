// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.getAll = getAll;
exports.createEl = createEl;

function get(selector) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return target.querySelector(selector);
}

function getAll(selector) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return target.querySelectorAll(selector);
}

function createEl(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'div' : _ref$type,
      _ref$target = _ref.target,
      target = _ref$target === void 0 ? document.body : _ref$target,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'beforeend' : _ref$position,
      _ref$innerHTML = _ref.innerHTML,
      innerHTML = _ref$innerHTML === void 0 ? '' : _ref$innerHTML;
  var el = document.createElement(type);
  el.innerHTML = innerHTML;
  target.insertAdjacentElement(position, el);
  return el;
}
},{}],"js/service.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCards = getCards;
exports.addNewCard = addNewCard;
exports.deleteCard = deleteCard;

function getCards() {
  return fetch('cards') //sinnvoll das http wegzulassen, denn wenn man die Anwendung später mal ins richtige Internet stellt, gibt es localhost ja nicht mehr
  .then(function (response) {
    return response.json();
  }); //    .then(cards => console.log(cards));
}
/*
function showCardById(id) {
  fetch('cards/30')
    .then(response => response.json())
    .then(peter => console.log(peter));
}
*/


function addNewCard(data) {
  fetch('cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (item) {
    return console.log(item);
  });
} // bei fetch kommt die id als Parameter rein, deshalb ergänze ich sie mit +


function deleteCard(id) {
  fetch('cards/' + id, {
    method: 'DELETE'
  }).then(function (response) {
    return console.log('Card deleted', response);
  });
}
},{}],"js/Card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

var _utils = require("./utils");

var _service = require("./service");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Card =
/*#__PURE__*/
function () {
  function Card(target, card) {
    _classCallCheck(this, Card);

    this.el = (0, _utils.createEl)({
      type: 'form',
      //hier eine form als type angeben, denn diese hat die Eigenart, dass sie nach einem Abschicken sich neu läd, und das wollen wir, damit die entfernte Karte auch aus dem View verschwindet
      target: target,
      position: 'beforeend'
    });
    this.title = card.title;
    this.description = card.description;
    this.category = card.category;
    this.id = card.id;
    this.el.innerHTML = "<h3>".concat(this.title, "</h3><ul><li>").concat(this.description, "</li><li>").concat(this.category, "</li><li>").concat(this.id, "</li></ul>");
    this.deleteButton = document.createElement('button');
    this.deleteButton.innerText = 'Delete';
    this.el.appendChild(this.deleteButton);
    this.deleteButton.addEventListener('click', this.onClick.bind(this));
  }

  _createClass(Card, [{
    key: "onClick",
    value: function onClick() {
      (0, _service.deleteCard)(this.id);
    }
  }]);

  return Card;
}();

exports.Card = Card;
},{"./utils":"js/utils.js","./service":"js/service.js"}],"js/CardList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardList = void 0;

var _utils = require("./utils");

var _service = require("./service");

var _Card = require("./Card");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CardList =
/*#__PURE__*/
function () {
  function CardList() {
    var _this = this;

    _classCallCheck(this, CardList);

    this.el = (0, _utils.createEl)({
      type: 'div',
      position: 'beforeend'
    });
    (0, _service.getCards)().then(function (cards) {
      return _this.render(cards);
    }); //then(this.render) -- Funktion render ist nun Parameter vom Promise
  }

  _createClass(CardList, [{
    key: "render",
    value: function render(cards) {
      var _this2 = this;

      cards.forEach(function (card) {
        return new _Card.Card(_this2.el, card);
      });
    }
  }]);

  return CardList;
}();

exports.CardList = CardList;
},{"./utils":"js/utils.js","./service":"js/service.js","./Card":"js/Card.js"}],"js/Form.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form =
/*#__PURE__*/
function () {
  function Form(target, onSubmit) {
    _classCallCheck(this, Form);

    this.onSubmit = onSubmit;
    this.el = (0, _utils.createEl)({
      type: 'form',
      target: target,
      position: 'afterbegin'
    });
    this.titleInput = this.createInput('title');
    this.descriptionInput = this.createInput('description');
    this.categoryInput = this.createInput('category');
    this.addButton = document.createElement('button');
    this.addButton.innerText = 'Submit';
    this.el.appendChild(this.addButton);
    this.addButton.addEventListener('click', this.onClick.bind(this)); //muss hier this binden, da sonst das this auf den Button bezogen ist und dieser hat kein InputValue --> muss zurück an die Form!
  }

  _createClass(Form, [{
    key: "createInput",
    value: function createInput(placeholder) {
      var input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', placeholder);
      this.el.appendChild(input);
      return input;
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      //event.preventDefault();
      var card = {
        title: this.titleInput.value,
        description: this.descriptionInput.value,
        category: this.categoryInput.value
      };
      this.onSubmit(card);
    }
  }]);

  return Form;
}();

exports.Form = Form;
},{"./utils":"js/utils.js"}],"js/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _CardList = require("./CardList");

var _Form = require("./Form");

var _service = require("./service");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
  _classCallCheck(this, App);

  var body = document.getElementsByTagName('body')[0];
  body.innerHTML = '';
  console.log(_service.addNewCard);
  this.form = new _Form.Form(document.body, _service.addNewCard);
  this.cardList = new _CardList.CardList();
};

exports.App = App;
},{"./CardList":"js/CardList.js","./Form":"js/Form.js","./service":"js/service.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _App = require("./js/App");

new _App.App();
},{"./js/App":"js/App.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50752" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map