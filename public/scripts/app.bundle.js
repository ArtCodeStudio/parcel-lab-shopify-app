/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4971:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// UNUSED EXPORTS: Main

// NAMESPACE OBJECT: ./ts/components/index.ts
var components_namespaceObject = {};
__webpack_require__.r(components_namespaceObject);
__webpack_require__.d(components_namespaceObject, {
  "AccountConnectsComponent": () => AccountConnectsComponent,
  "ParcelLabListTrackingComponent": () => ParcelLabListTrackingComponent,
  "ParcelLabSettingsComponent": () => ParcelLabSettingsComponent,
  "PlansComponent": () => PlansComponent,
  "SidebarComponent": () => SidebarComponent,
  "SidebarMaskComponent": () => SidebarMaskComponent,
  "SidebarTogglerComponent": () => SidebarTogglerComponent,
  "SocketEventCardComponent": () => SocketEventCardComponent,
  "TdaI18nSwitcherComponent": () => TdaI18nSwitcherComponent,
  "WebhookExplorerComponent": () => WebhookExplorerComponent
});

// NAMESPACE OBJECT: ./ts/binders/index.ts
var binders_namespaceObject = {};
__webpack_require__.r(binders_namespaceObject);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(4575);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(9713);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/@ribajs/core/src/index.ts
var src = __webpack_require__(425);
// EXTERNAL MODULE: ./node_modules/@ribajs/utils/src/dom.ts
var dom = __webpack_require__(8277);
// EXTERNAL MODULE: ./node_modules/debug/src/browser.js
var browser = __webpack_require__(1227);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/@ribajs/router/src/index.ts
var router_src = __webpack_require__(6889);
// EXTERNAL MODULE: ./node_modules/@ribajs/i18n/src/index.ts
var i18n_src = __webpack_require__(4181);
// EXTERNAL MODULE: ./node_modules/@ribajs/bs4/src/index.ts + 69 modules
var bs4_src = __webpack_require__(686);
// EXTERNAL MODULE: ./node_modules/@ribajs/shopify-easdk/src/index.ts + 11 modules
var shopify_easdk_src = __webpack_require__(8187);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(7757);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(8926);
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(1506);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/get.js
var get = __webpack_require__(6525);
var get_default = /*#__PURE__*/__webpack_require__.n(get);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(3913);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(2205);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(8585);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(9754);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@ribajs/jquery/src/index.ts + 5 modules
var jquery_src = __webpack_require__(3544);
// EXTERNAL MODULE: ./ts/components/account-connects/account-connects.component.pug
var account_connects_component = __webpack_require__(1648);
var account_connects_component_default = /*#__PURE__*/__webpack_require__.n(account_connects_component);

// CONCATENATED MODULE: ./ts/services/auth.service.ts








var AuthService = /*#__PURE__*/function () {
  function AuthService() {
    classCallCheck_default()(this, AuthService);

    defineProperty_default()(this, "debug", browser_default()('services:AuthService'));

    if (AuthService.instance) {
      return AuthService.instance;
    }

    AuthService.instance = this;
  }

  createClass_default()(AuthService, [{
    key: "connect",
    // protected shopifyApp = new shopifyEasdkModule.services.EASDKWrapperService();
    value: function connect(type, myshopifyDomain) {
      this.debug('connect');
      var connectUrl = "/".concat(type, "/auth?shop=").concat(myshopifyDomain);

      if (shopify_easdk_src/* EASDKWrapperService.inIframe */.KG.inIframe()) {
        var win = window.open(connectUrl + '&iniframe=true');

        if (win) {
          var timer = setInterval(function () {
            if (win.closed) {
              clearInterval(timer);
              location.reload();
            }
          }, 100);
        }
      } else {
        window.location.href = connectUrl;
      }
    }
  }, {
    key: "shopifyConnectIframe",
    value: function () {
      var _shopifyConnectIframe = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(myshopifyDomain) {
        var _this = this;

        var connectUrl;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                connectUrl = "/shopify/auth/iframe?shop=".concat(myshopifyDomain);
                console.debug('connectUrl', connectUrl);
                return _context.abrupt("return", src.HttpService.getJSON(connectUrl).then(function (result) {
                  _this.debug('shopifyConnectIframe', result.authUrl);

                  return result;
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function shopifyConnectIframe(_x) {
        return _shopifyConnectIframe.apply(this, arguments);
      }

      return shopifyConnectIframe;
    }()
  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2(type, profile) {
        var _this2 = this;

        var id, disconnectUrl;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('disconnect TODO');
                id = profile.shopifyID;
                disconnectUrl = "/".concat(type, "/auth/disconnect/").concat(id);
                return _context2.abrupt("return", src.HttpService.getJSON(disconnectUrl).then(function (result) {
                  _this2.debug('disconnected', result);

                  return result;
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function disconnect(_x2, _x3) {
        return _disconnect.apply(this, arguments);
      }

      return disconnect;
    }()
    /**
     * Get user account of type
     * @param type
     */

  }, {
    key: "connected",
    value: function () {
      var _connected = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3(type) {
        var _this3 = this;

        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", src.HttpService.getJSON("/".concat(type, "/auth/connected/current")).then(function (account) {
                  _this3.debug('isConnected', account);

                  return account;
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function connected(_x4) {
        return _connected.apply(this, arguments);
      }

      return connected;
    }()
    /**
     * Check if the current user is logged in
     */

  }, {
    key: "loggedIn",
    value: function () {
      var _loggedIn = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var _this4 = this;

        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", src.HttpService.getJSON("/shopify/auth/loggedIn").then(function (loggedIn) {
                  _this4.debug('loggedIn', loggedIn);

                  return loggedIn;
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function loggedIn() {
        return _loggedIn.apply(this, arguments);
      }

      return loggedIn;
    }()
  }, {
    key: "logout",
    value: function logout() {
      this.debug('logout');
      var logoutUrl = "/shopify/auth/logout";
      window.location.href = logoutUrl;
    }
  }]);

  return AuthService;
}();

defineProperty_default()(AuthService, "instance", void 0);
// CONCATENATED MODULE: ./ts/components/account-connects/account-connects.component.ts











function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var AccountConnectsComponent = /*#__PURE__*/function (_Component) {
  inherits_default()(AccountConnectsComponent, _Component);

  var _super = _createSuper(AccountConnectsComponent);

  createClass_default()(AccountConnectsComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['type'];
    }
  }]);

  function AccountConnectsComponent(element) {
    var _this;

    classCallCheck_default()(this, AccountConnectsComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "$el", void 0);

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('component:' + AccountConnectsComponent.tagName));

    defineProperty_default()(assertThisInitialized_default()(_this), "authService", new AuthService());

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      myshopify_domain: window.shop || undefined,
      account: undefined,
      isConnected: false,
      type: undefined,
      avatarUrl: undefined,
      locales: {
        title: 'components.accountConnects.{type}.title',
        info: 'components.accountConnects.{type}.info',
        notConnected: 'components.accountConnects.{type}.notConnected'
      },
      connect: _this.connect,
      disconnect: _this.disconnect,
      logout: _this.logout,
      inIframe: shopify_easdk_src/* EASDKWrapperService.inIframe */.KG.inIframe()
    });

    _this.$el = (0,jquery_src/* JQuery */.Vk)(_this.el);

    _this.debug('constructor', assertThisInitialized_default()(_this));

    return _this;
  }

  createClass_default()(AccountConnectsComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      get_default()(getPrototypeOf_default()(AccountConnectsComponent.prototype), "connectedCallback", this).call(this);

      this.init(AccountConnectsComponent.observedAttributes);
    }
  }, {
    key: "connect",
    value: function connect() {
      this.debug('connect');

      if (!this.scope.type) {
        throw new Error('Type attribute is required on this component');
      }

      return this.authService.connect(this.scope.type, this.scope.myshopify_domain);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this2 = this;

      if (!this.scope.type) {
        throw new Error('Type attribute is required on this component');
      }

      if (!this.scope.account) {
        throw new Error("You can't disconnect an account that does not exist");
      }

      this.authService.disconnect(this.scope.type, this.scope.account).then(function (result) {
        if (result.success) {
          _this2.scope.isConnected = false;
          _this2.scope.account = undefined;
          _this2.scope.avatarUrl = undefined;
        }
      });
    }
    /**
     * Logout from app
     */

  }, {
    key: "logout",
    value: function logout() {
      this.debug('logout');
      return this.authService.logout();
    }
  }, {
    key: "getAvatarUrl",
    value: function () {
      var _getAvatarUrl = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.scope.type === 'shopify')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", '/icons/shopify.svg');

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAvatarUrl() {
        return _getAvatarUrl.apply(this, arguments);
      }

      return getAvatarUrl;
    }()
  }, {
    key: "isConnected",
    value: function () {
      var _isConnected = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.scope.type) {
                  _context2.next = 2;
                  break;
                }

                throw new Error('Type attribute is required on this component');

              case 2:
                return _context2.abrupt("return", this.authService.connected(this.scope.type));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function isConnected() {
        return _isConnected.apply(this, arguments);
      }

      return isConnected;
    }()
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        var _this3 = this;

        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.debug('beforeBind');
                this.scope.locales.title = this.scope.locales.title.replace('{type}', this.scope.type);
                this.scope.locales.info = this.scope.locales.info.replace('{type}', this.scope.type);
                this.scope.locales.notConnected = this.scope.locales.notConnected.replace('{type}', this.scope.type);
                return _context5.abrupt("return", this.isConnected().then(function (account) {
                  if (account) {
                    _this3.scope.isConnected = true;
                    _this3.scope.account = account;
                  }

                  _this3.debug('account', account);

                  return account;
                }).then( /*#__PURE__*/asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3() {
                  return regenerator_default().wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (!_this3.scope.isConnected) {
                            _context3.next = 2;
                            break;
                          }

                          return _context3.abrupt("return", _this3.getAvatarUrl());

                        case 2:
                          return _context3.abrupt("return", null);

                        case 3:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }))).then( /*#__PURE__*/function () {
                  var _ref2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee4(avatar) {
                    return regenerator_default().wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _this3.scope.avatarUrl = avatar ? avatar : undefined;
                            return _context4.abrupt("return", _this3.scope.avatarUrl);

                          case 2:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }())["catch"](function (error) {
                  console.error(error.responseJSON ? error.responseJSON : error);
                  /**
                   * If Access token has expired
                   * @see https://developers.facebook.com/docs/graph-api/using-graph-api/error-handling/
                   */

                  if (_this3.scope.type === 'facebook' && error.responseJSON && error.responseJSON.code === 190) {
                    // TODO this.scope.needReconnect and delete account on server
                    _this3.scope.isConnected = false;
                    _this3.scope.account = undefined;
                  }
                }));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee6() {
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.debug('afterBind', this.scope);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['type'];
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      get_default()(getPrototypeOf_default()(AccountConnectsComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      var template = null; // Only set the component template if there no childs already

      if ((0,dom/* hasChildNodesTrim */.Np)(this.el)) {
        this.debug('Do not template, because element has child nodes');
        return template;
      } else {
        template = account_connects_component_default()(this.scope);
        this.debug('Use template', template);
        return template;
      }
    }
  }]);

  return AccountConnectsComponent;
}(src.Component);

defineProperty_default()(AccountConnectsComponent, "tagName", 'rv-account-connects');
// EXTERNAL MODULE: ./node_modules/socket.io-client/lib/index.js
var lib = __webpack_require__(6809);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__(7187);
// CONCATENATED MODULE: ./ts/services/webhooks.service.ts










function webhooks_service_createSuper(Derived) { var hasNativeReflectConstruct = webhooks_service_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function webhooks_service_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var WebhooksService = /*#__PURE__*/function (_EventEmitter) {
  inherits_default()(WebhooksService, _EventEmitter);

  var _super = webhooks_service_createSuper(WebhooksService);

  function WebhooksService(host) {
    var _this;

    classCallCheck_default()(this, WebhooksService);

    _this = _super.call(this);

    defineProperty_default()(assertThisInitialized_default()(_this), "socket", void 0);

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('services:WebhooksService'));

    defineProperty_default()(assertThisInitialized_default()(_this), "host", void 0);

    _this.host = host;

    _this.debug('constructor');

    _this.debug('host: ' + host); // this.on = this.socket.on;
    // this.once = this.socket.once;


    if (WebhooksService.instance) {
      return possibleConstructorReturn_default()(_this, WebhooksService.instance);
    }

    _this.init();

    WebhooksService.instance = assertThisInitialized_default()(_this);
    return _this;
  }

  createClass_default()(WebhooksService, [{
    key: "init",
    value: function () {
      var _init = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _this2 = this;

        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('init');
                this.socket = lib_default()("/socket.io/shopify/api/webhooks", {
                  secure: true,
                  transports: ['polling']
                });
                this.socket.on('connect', function () {
                  _this2.debug('connect');

                  _this2.emit('connect');
                });
                this.socket.on('exception', function (data) {
                  console.error('exception', data);

                  _this2.emit('exception', data);
                });
                this.socket.on('disconnect', function () {
                  _this2.debug('disconnect');

                  _this2.emit('disconnect');
                });
                this.socket.on('carts/create', function (data) {
                  _this2.debug('carts/create', data);

                  _this2.emit('webhook:carts/create', data);
                });
                this.socket.on('carts/update', function (data) {
                  _this2.debug('carts/update', data);

                  _this2.emit('webhook:carts/update', data);
                });
                this.socket.on('checkouts/create', function (data) {
                  _this2.debug('checkouts/create', data);

                  _this2.emit('webhook:checkouts/create', data);
                });
                this.socket.on('checkouts/update', function (data) {
                  _this2.debug('checkouts/update', data);

                  _this2.emit('webhook:checkouts/update', data);
                });
                this.socket.on('checkouts/delete', function (data) {
                  _this2.debug('checkouts/delete', data);

                  _this2.emit('webhook:checkouts/delete', data);
                });
                this.socket.on('collections/create', function (data) {
                  _this2.debug('collections/create', data);

                  _this2.emit('webhook:collections/create', data);
                });
                this.socket.on('collections/update', function (data) {
                  _this2.debug('collections/update', data);

                  _this2.emit('webhook:collections/update', data);
                });
                this.socket.on('collections/delete', function (data) {
                  _this2.debug('collections/delete', data);

                  _this2.emit('webhook:collections/delete', data);
                });
                this.socket.on('collection_listings/add', function (data) {
                  _this2.debug('collection_listings/add', data);

                  _this2.emit('webhook:collection_listings/add', data);
                });
                this.socket.on('collection_listings/remove', function (data) {
                  _this2.debug('collection_listings/remove', data);

                  _this2.emit('webhook:collection_listings/remove', data);
                });
                this.socket.on('collection_listings/update', function (data) {
                  _this2.debug('collection_listings/update', data);

                  _this2.emit('webhook:collection_listings/update', data);
                });
                this.socket.on('customers/create', function (data) {
                  _this2.debug('customers/create', data);

                  _this2.emit('webhook:customers/create', data);
                });
                this.socket.on('customers/disable', function (data) {
                  _this2.debug('customers/disable', data);

                  _this2.emit('webhook:customers/disable', data);
                });
                this.socket.on('customers/enable', function (data) {
                  _this2.debug('customers/enable', data);

                  _this2.emit('webhook:customers/enable', data);
                });
                this.socket.on('customers/update', function (data) {
                  _this2.debug('customers/update', data);

                  _this2.emit('webhook:customers/update', data);
                });
                this.socket.on('customers/delete', function (data) {
                  _this2.debug('customers/delete', data);

                  _this2.emit('webhook:customers/delete', data);
                });
                this.socket.on('customer_groups/create', function (data) {
                  _this2.debug('customer_groups/create', data);

                  _this2.emit('webhook:customer_groups/create', data);
                });
                this.socket.on('customer_groups/update', function (data) {
                  _this2.debug('customer_groups/update', data);

                  _this2.emit('webhook:customer_groups/update', data);
                });
                this.socket.on('customer_groups/delete', function (data) {
                  _this2.debug('customer_groups/delete', data);

                  _this2.emit('webhook:customer_groups/delete', data);
                });
                this.socket.on('draft_orders/create', function (data) {
                  _this2.debug('draft_orders/create', data);

                  _this2.emit('webhook:draft_orders/create', data);
                });
                this.socket.on('draft_orders/update', function (data) {
                  _this2.debug('draft_orders/update', data);

                  _this2.emit('webhook:draft_orders/update', data);
                });
                this.socket.on('fulfillments/create', function (data) {
                  _this2.debug('fulfillments/create', data);

                  _this2.emit('webhook:fulfillments/create', data);
                });
                this.socket.on('fulfillments/update', function (data) {
                  _this2.debug('fulfillments/update', data);

                  _this2.emit('webhook:fulfillments/update', data);
                });
                this.socket.on('fulfillment_events/create', function (data) {
                  _this2.debug('fulfillment_events/create', data);

                  _this2.emit('webhook:fulfillment_events/create', data);
                });
                this.socket.on('fulfillment_events/delete', function (data) {
                  _this2.debug('fulfillment_events/delete', data);

                  _this2.emit('webhook:fulfillment_events/delete', data);
                });
                this.socket.on('inventory_items/create', function (data) {
                  _this2.debug('inventory_items/create', data);

                  _this2.emit('webhook:inventory_items/create', data);
                });
                this.socket.on('inventory_items/update', function (data) {
                  _this2.debug('inventory_items/update', data);

                  _this2.emit('webhook:inventory_items/update', data);
                });
                this.socket.on('inventory_items/delete', function (data) {
                  _this2.debug('inventory_items/delete', data);

                  _this2.emit('webhook:inventory_items/delete', data);
                });
                this.socket.on('inventory_levels/connect', function (data) {
                  _this2.debug('inventory_levels/connect', data);

                  _this2.emit('webhook:inventory_levels/connect', data);
                });
                this.socket.on('inventory_levels/update', function (data) {
                  _this2.debug('inventory_levels/update', data);

                  _this2.emit('webhook:inventory_levels/update', data);
                });
                this.socket.on('inventory_levels/disconnect', function (data) {
                  _this2.debug('inventory_levels/disconnect', data);

                  _this2.emit('webhook:inventory_levels/disconnect', data);
                });
                this.socket.on('locations/create', function (data) {
                  _this2.debug('locations/create', data);

                  _this2.emit('webhook:locations/create', data);
                });
                this.socket.on('locations/update', function (data) {
                  _this2.debug('locations/update', data);

                  _this2.emit('webhook:locations/update', data);
                });
                this.socket.on('locations/delete', function (data) {
                  _this2.debug('locations/delete', data);

                  _this2.emit('webhook:locations/delete', data);
                });
                this.socket.on('orders/cancelled', function (data) {
                  _this2.debug('orders/cancelled', data);

                  _this2.emit('webhook:orders/cancelled', data);
                });
                this.socket.on('orders/create', function (data) {
                  _this2.debug('orders/create', data);

                  _this2.emit('webhook:orders/create', data);
                });
                this.socket.on('orders/fulfilled', function (data) {
                  _this2.debug('orders/fulfilled', data);

                  _this2.emit('webhook:orders/fulfilled', data);
                });
                this.socket.on('orders/paid', function (data) {
                  _this2.debug('orders/paid', data);

                  _this2.emit('webhook:orders/paid', data);
                });
                this.socket.on('orders/partially_fulfilled', function (data) {
                  _this2.debug('orders/partially_fulfilled', data);

                  _this2.emit('webhook:orders/partially_fulfilled', data);
                });
                this.socket.on('orders/updated', function (data) {
                  _this2.debug('orders/updated', data);

                  _this2.emit('webhook:orders/updated', data);
                });
                this.socket.on('orders/delete', function (data) {
                  _this2.debug('orders/delete', data);

                  _this2.emit('webhook:orders/delete', data);
                });
                this.socket.on('order_transactions/create', function (data) {
                  _this2.debug('order_transactions/create', data);

                  _this2.emit('webhook:order_transactions/create', data);
                });
                this.socket.on('products/create', function (data) {
                  _this2.debug('products/create', data);

                  _this2.emit('webhook:products/create', data);
                });
                this.socket.on('products/update', function (data) {
                  _this2.debug('products/update', data);

                  _this2.emit('webhook:products/update', data);
                });
                this.socket.on('products/delete', function (data) {
                  _this2.debug('products/delete', data);

                  _this2.emit('webhook:products/delete', data);
                });
                this.socket.on('product_listings/add', function (data) {
                  _this2.debug('product_listings/add', data);

                  _this2.emit('webhook:product_listings/add', data);
                });
                this.socket.on('product_listings/remove', function (data) {
                  _this2.debug('product_listings/remove', data);

                  _this2.emit('webhook:product_listings/remove', data);
                });
                this.socket.on('product_listings/update', function (data) {
                  _this2.debug('product_listings/update', data);

                  _this2.emit('webhook:product_listings/update', data);
                });
                this.socket.on('refunds/create', function (data) {
                  _this2.debug('refunds/create', data);

                  _this2.emit('webhook:refunds/create', data);
                });
                this.socket.on('app/uninstalled', function (data) {
                  _this2.debug('app/uninstalled', data);

                  _this2.emit('webhook:app/uninstalled', data);
                });
                this.socket.on('shop/update', function (data) {
                  _this2.debug('shop/update', data);

                  _this2.emit('webhook:shop/update', data);
                });
                this.socket.on('themes/create', function (data) {
                  _this2.debug('themes/create', data);

                  _this2.emit('webhook:themes/create', data);
                });
                this.socket.on('themes/publish', function (data) {
                  _this2.debug('themes/publish', data);

                  _this2.emit('webhook:themes/publish', data);
                });
                this.socket.on('themes/update', function (data) {
                  _this2.debug('themes/update', data);

                  _this2.emit('webhook:themes/update', data);
                });
                this.socket.on('themes/delete', function (data) {
                  _this2.debug('themes/delete', data);

                  _this2.emit('webhook:themes/delete', data);
                });

              case 60:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }]);

  return WebhooksService;
}(events.EventEmitter);

defineProperty_default()(WebhooksService, "instance", void 0);
// EXTERNAL MODULE: ./ts/components/webhook-explorer/webhook-explorer.component.pug
var webhook_explorer_component = __webpack_require__(54);
var webhook_explorer_component_default = /*#__PURE__*/__webpack_require__.n(webhook_explorer_component);

// CONCATENATED MODULE: ./ts/components/webhook-explorer/webhook-explorer.component.ts











function webhook_explorer_component_createSuper(Derived) { var hasNativeReflectConstruct = webhook_explorer_component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function webhook_explorer_component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var WebhookExplorerComponent = /*#__PURE__*/function (_Component) {
  inherits_default()(WebhookExplorerComponent, _Component);

  var _super = webhook_explorer_component_createSuper(WebhookExplorerComponent);

  createClass_default()(WebhookExplorerComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['environment'];
    }
  }]);

  function WebhookExplorerComponent(element) {
    var _this;

    classCallCheck_default()(this, WebhookExplorerComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "webhooksService", new WebhooksService(window.host));

    defineProperty_default()(assertThisInitialized_default()(_this), "localesService", i18n_src.LocalesStaticService.getInstance('main'));

    defineProperty_default()(assertThisInitialized_default()(_this), "cardContainer", void 0);

    defineProperty_default()(assertThisInitialized_default()(_this), "autobind", true);

    defineProperty_default()(assertThisInitialized_default()(_this), "_debug", true);

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      langcode: 'en',
      environment: 'production'
    });

    _this.debug('constructor', assertThisInitialized_default()(_this));

    return _this;
  }

  createClass_default()(WebhookExplorerComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      get_default()(getPrototypeOf_default()(WebhookExplorerComponent.prototype), "connectedCallback", this).call(this);

      this.init(WebhookExplorerComponent.observedAttributes);
    }
  }, {
    key: "initLocales",
    value: function initLocales() {
      var _this2 = this;

      // set avaible langcodes
      this.scope.langcode = this.localesService.getLangcode();
      this.localesService.event.on('changed', function (changedLangcode)
      /*, initial: boolean*/
      {
        // Activate localcode and disable the other
        _this2.scope.langcode = changedLangcode;
      });
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.scope.environment === 'production') {
                  this.initLocales();
                }

                this.debug('beforeBind');

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);

                if (this.scope.environment === 'production') {
                  this.cardContainer = this.el.querySelector('.card-container') || undefined;
                  this.watchSocketEvents();
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "prependNewSocketCard",
    value: function prependNewSocketCard(eventName, data, role) {
      this.debug('prependNewSocketCard', eventName, data);

      for (var key in data) {
        if (typeof data[key] === 'string') {
          data[key] = data[key].replace(/&quot;/g, '"');
        }
      }

      var newCard = document.createElement('rv-webhook-card');
      newCard.classList.add('col-auto');
      newCard.setAttribute('event', eventName);
      newCard.setAttribute('data', JSON.stringify(data).replace(/'/g, "&#39;"));
      newCard.setAttribute('role', role || '');
      this.debug('newCard', newCard);

      if (this.cardContainer) {
        this.cardContainer.prepend(newCard);
        this.debug('cardContainer', this.cardContainer);
        this.build();
      }
    }
  }, {
    key: "watchSocketEvents",
    value: function watchSocketEvents() {
      var _this3 = this;

      this.webhooksService.on("webhook:carts/create", function (data) {
        _this3.prependNewSocketCard('webhook:carts/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:carts/update", function (data) {
        _this3.prependNewSocketCard('carts/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:checkouts/create", function (data) {
        _this3.prependNewSocketCard('checkouts/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:checkouts/update", function (data) {
        _this3.prependNewSocketCard('checkouts/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:checkouts/delete", function (data) {
        _this3.prependNewSocketCard('checkouts/delete', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:collections/create", function (data) {
        _this3.prependNewSocketCard('collections/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:collections/update", function (data) {
        _this3.prependNewSocketCard('collections/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:collections/delete", function (data) {
        _this3.prependNewSocketCard('collections/delete', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:collection_listings/add", function (data) {
        _this3.prependNewSocketCard('collection_listings/add', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:collection_listings/remove", function (data) {
        _this3.prependNewSocketCard('collection_listings/remove', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:collection_listings/update", function (data) {
        _this3.prependNewSocketCard('collection_listings/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:customers/create", function (data) {
        _this3.prependNewSocketCard('customers/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:customers/disable", function (data) {
        _this3.prependNewSocketCard('customers/disable', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:customers/enable", function (data) {
        _this3.prependNewSocketCard('customers/enable', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:customers/update", function (data) {
        _this3.prependNewSocketCard('customers/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:customers/delete", function (data) {
        _this3.prependNewSocketCard('customers/delete', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:customer_groups/create", function (data) {
        _this3.prependNewSocketCard('customer_groups/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:customer_groups/update", function (data) {
        _this3.prependNewSocketCard('customer_groups/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:customer_groups/delete", function (data) {
        _this3.prependNewSocketCard('customer_groups/delete', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:draft_orders/create", function (data) {
        _this3.prependNewSocketCard('draft_orders/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:draft_orders/update", function (data) {
        _this3.prependNewSocketCard('draft_orders/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:fulfillments/create", function (data) {
        _this3.prependNewSocketCard('fulfillments/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:fulfillments/update", function (data) {
        _this3.prependNewSocketCard('fulfillments/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:fulfillment_events/create", function (data) {
        _this3.prependNewSocketCard('fulfillment_events/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:fulfillment_events/delete", function (data) {
        _this3.prependNewSocketCard('fulfillment_events/delete', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:inventory_items/create", function (data) {
        _this3.prependNewSocketCard('inventory_items/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:inventory_items/update", function (data) {
        _this3.prependNewSocketCard('inventory_items/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:inventory_items/delete", function (data) {
        _this3.prependNewSocketCard('inventory_items/delete', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:inventory_levels/connect", function (data) {
        _this3.prependNewSocketCard('inventory_levels/connect', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:inventory_levels/update", function (data) {
        _this3.prependNewSocketCard('inventory_levels/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:inventory_levels/disconnect", function (data) {
        _this3.prependNewSocketCard('inventory_levels/disconnect', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:locations/create", function (data) {
        _this3.prependNewSocketCard('locations/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:locations/update", function (data) {
        _this3.prependNewSocketCard('locations/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:locations/delete", function (data) {
        _this3.prependNewSocketCard('locations/delete', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:orders/cancelled", function (data) {
        _this3.prependNewSocketCard('orders/cancelled', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:orders/create", function (data) {
        _this3.prependNewSocketCard('orders/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:orders/fulfilled", function (data) {
        _this3.prependNewSocketCard('orders/fulfilled', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:orders/paid", function (data) {
        _this3.prependNewSocketCard('orders/paid', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:orders/partially_fulfilled", function (data) {
        _this3.prependNewSocketCard('orders/partially_fulfilled', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:orders/updated", function (data) {
        _this3.prependNewSocketCard('orders/updated', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:orders/delete", function (data) {
        _this3.prependNewSocketCard('orders/delete', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:order_transactions/create", function (data) {
        _this3.prependNewSocketCard('order_transactions/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on('products/create', function (product) {
        _this3.debug('products/create', product);

        var role; // Unpublised products can only be recived in the app backend

        if (product.published_at === null) {
          role = 'shopify-staff-member';
        }

        _this3.prependNewSocketCard('products/create', product, role);
      });
      this.webhooksService.on('products/update', function (product) {
        _this3.debug('products/update', product);

        var role; // Unpublised products can only be recived in the app backend

        if (product.published_at === null) {
          role = 'shopify-staff-member';
        }

        _this3.prependNewSocketCard('products/update', product, role);
      });
      this.webhooksService.on('products/delete', function (data) {
        _this3.debug('products/delete', data);

        _this3.prependNewSocketCard('products/delete', data);
      });
      this.webhooksService.on("webhook:product_listings/add", function (data) {
        _this3.prependNewSocketCard('product_listings/add', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:product_listings/remove", function (data) {
        _this3.prependNewSocketCard('product_listings/remove', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:product_listings/update", function (data) {
        _this3.prependNewSocketCard('product_listings/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:refunds/create", function (data) {
        _this3.prependNewSocketCard('refunds/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:app/uninstalled", function (data) {
        _this3.prependNewSocketCard('app/uninstalled', data);
      });
      this.webhooksService.on("webhook:shop/update", function (data) {
        _this3.prependNewSocketCard('shop/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:themes/create", function (data) {
        _this3.prependNewSocketCard('themes/create', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:themes/publish", function (data) {
        _this3.prependNewSocketCard('themes/publish', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:themes/update", function (data) {
        _this3.prependNewSocketCard('themes/update', data, 'shopify-staff-member');
      });
      this.webhooksService.on("webhook:themes/delete", function (data) {
        _this3.prependNewSocketCard('themes/delete', data, 'shopify-staff-member');
      });
    }
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      get_default()(getPrototypeOf_default()(WebhookExplorerComponent.prototype), "attributeChangedCallback", this).call(this, attributeName, oldValue, newValue, namespace);
    } // deconstructor

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      get_default()(getPrototypeOf_default()(WebhookExplorerComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      var template = null; // Only set the component template if there no childs already

      if (this.el.hasChildNodes()) {
        this.debug('Do not template, because element has child nodes');
        return template;
      } else {
        template = webhook_explorer_component_default()(this.scope);
        this.debug('Use template', template);
        return template;
      }
    }
  }]);

  return WebhookExplorerComponent;
}(src.Component);

defineProperty_default()(WebhookExplorerComponent, "tagName", 'webhook-explorer');
// EXTERNAL MODULE: ./ts/components/webhook-explorer/webhook-card/webhook-card.component.pug
var webhook_card_component = __webpack_require__(1438);
var webhook_card_component_default = /*#__PURE__*/__webpack_require__.n(webhook_card_component);

// CONCATENATED MODULE: ./ts/components/webhook-explorer/webhook-card/webhook-card.component.ts











function webhook_card_component_createSuper(Derived) { var hasNativeReflectConstruct = webhook_card_component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function webhook_card_component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var SocketEventCardComponent = /*#__PURE__*/function (_Component) {
  inherits_default()(SocketEventCardComponent, _Component);

  var _super = webhook_card_component_createSuper(SocketEventCardComponent);

  createClass_default()(SocketEventCardComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['event', 'data', 'role'];
    }
  }]);

  function SocketEventCardComponent(element) {
    var _this;

    classCallCheck_default()(this, SocketEventCardComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "autobind", true);

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('component:' + SocketEventCardComponent.tagName));

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      close: _this.close,
      event: undefined,
      data: undefined,
      role: undefined
    });

    return _this;
  }

  createClass_default()(SocketEventCardComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      get_default()(getPrototypeOf_default()(SocketEventCardComponent.prototype), "connectedCallback", this).call(this);

      this.init(SocketEventCardComponent.observedAttributes);
    }
  }, {
    key: "close",
    value: function close() {
      this.debug('close');
      this.remove();
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['event'];
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      get_default()(getPrototypeOf_default()(SocketEventCardComponent.prototype), "attributeChangedCallback", this).call(this, attributeName, oldValue, newValue, namespace);
    } // deconstructor

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      get_default()(getPrototypeOf_default()(SocketEventCardComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      var template = null; // Only set the component template if there no childs already

      if (this.el.hasChildNodes()) {
        this.debug('Do not template, because element has child nodes');
        return template;
      } else {
        template = webhook_card_component_default()(this.scope);
        this.debug('Use template', template);
        return template;
      }
    }
  }]);

  return SocketEventCardComponent;
}(src.Component);

defineProperty_default()(SocketEventCardComponent, "tagName", 'rv-webhook-card');
// EXTERNAL MODULE: ./ts/components/plans/plans.component.pug
var plans_component = __webpack_require__(606);
var plans_component_default = /*#__PURE__*/__webpack_require__.n(plans_component);

// CONCATENATED MODULE: ./ts/components/plans/plans.component.ts











function plans_component_createSuper(Derived) { var hasNativeReflectConstruct = plans_component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function plans_component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var PlansComponent = /*#__PURE__*/function (_Component) {
  inherits_default()(PlansComponent, _Component);

  var _super = plans_component_createSuper(PlansComponent);

  createClass_default()(PlansComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function PlansComponent(element) {
    var _this;

    classCallCheck_default()(this, PlansComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('component:' + PlansComponent.tagName));

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      plans: [],
      active: undefined,
      hasActive: false,
      activate: _this.activate
    });

    _this.debug('constructor', assertThisInitialized_default()(_this));

    return _this;
  }

  createClass_default()(PlansComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      get_default()(getPrototypeOf_default()(PlansComponent.prototype), "connectedCallback", this).call(this);

      this.loadAvailableCharges().then(function () {
        return _this2.loadActiveCharge();
      }).then(function () {
        return _this2.init(PlansComponent.observedAttributes);
      })["catch"](function (error) {
        _this2.debug('error', error);
      });
    }
    /**
     * Create and acivate the charge
     * @param plan
     */

  }, {
    key: "activate",
    value: function activate(plan) {
      this.debug('activate');
      var activateUrl = "/shopify/charge/create/".concat(plan.name);
      window.location.href = activateUrl;
    }
  }, {
    key: "loadActiveCharge",
    value: function () {
      var _loadActiveCharge = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _this3 = this;

        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", src.HttpService.getJSON("/shopify/charge/active").then(function (activeCharge) {
                  _this3.debug('activeCharge', activeCharge);

                  _this3.scope.active = activeCharge ? activeCharge : undefined;

                  if (_this3.scope.active) {
                    _this3.scope.hasActive = true;
                  }

                  return _this3.scope.active;
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function loadActiveCharge() {
        return _loadActiveCharge.apply(this, arguments);
      }

      return loadActiveCharge;
    }()
  }, {
    key: "loadAvailableCharges",
    value: function () {
      var _loadAvailableCharges = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        var _this4 = this;

        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", src.HttpService.getJSON("/shopify/charge/available").then(function (availableCharges) {
                  _this4.debug('available charges', availableCharges);

                  _this4.scope.plans = availableCharges;
                  return _this4.scope.plans;
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function loadAvailableCharges() {
        return _loadAvailableCharges.apply(this, arguments);
      }

      return loadAvailableCharges;
    }()
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.debug('beforeBind');

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.debug('afterBind', this.scope);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      get_default()(getPrototypeOf_default()(PlansComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      var template = null; // Only set the component template if there no childs already

      if (this.el.hasChildNodes()) {
        this.debug('Do not template, because element has child nodes');
        return template;
      } else {
        template = plans_component_default()(this.scope);
        this.debug('Use template', template);
        return template;
      }
    }
  }]);

  return PlansComponent;
}(src.Component);

defineProperty_default()(PlansComponent, "tagName", 'rv-plans');
// EXTERNAL MODULE: ./ts/components/sidebar/sidebar.component.pug
var sidebar_component = __webpack_require__(562);
var sidebar_component_default = /*#__PURE__*/__webpack_require__.n(sidebar_component);

// CONCATENATED MODULE: ./ts/components/sidebar/sidebar.component.ts











function sidebar_component_createSuper(Derived) { var hasNativeReflectConstruct = sidebar_component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function sidebar_component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var SidebarComponent = /*#__PURE__*/function (_Component) {
  inherits_default()(SidebarComponent, _Component);

  var _super = sidebar_component_createSuper(SidebarComponent);

  createClass_default()(SidebarComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['environment'];
    }
  }]);

  function SidebarComponent(element) {
    var _this;

    classCallCheck_default()(this, SidebarComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "event", new src.EventDispatcher('sidebar'));

    defineProperty_default()(assertThisInitialized_default()(_this), "router", new src.EventDispatcher('main'));

    defineProperty_default()(assertThisInitialized_default()(_this), "shopifyApp", new shopify_easdk_src/* EASDKWrapperService */.KG());

    defineProperty_default()(assertThisInitialized_default()(_this), "localesService", i18n_src.LocalesStaticService.getInstance('main'));

    defineProperty_default()(assertThisInitialized_default()(_this), "$el", void 0);

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('component:' + SidebarComponent.tagName));

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      environment: 'production',
      visable: false,
      reload: _this.reload
    });

    _this.$el = (0,jquery_src/* JQuery */.Vk)(_this.el);

    _this.debug('constructor', assertThisInitialized_default()(_this));

    return _this;
  }

  createClass_default()(SidebarComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      get_default()(getPrototypeOf_default()(SidebarComponent.prototype), "connectedCallback", this).call(this);

      this.init(SidebarComponent.observedAttributes);
      this.event.on('hide', this.hide.bind(this, false));
      this.event.on('show', this.show.bind(this, false));
      this.event.on('toggle', this.toggle.bind(this, false));
      this.event.on('state', this.state.bind(this));
      window.addEventListener('resize', this.onResize.bind(this, false), false);
      this.router.on('newPageReady', this.onRoute.bind(this));
      this.onResize(true);
      this.localesService.event.on('changed', this.onResize.bind(this, false));
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.scope.visable || force) {
        this.scope.visable = false;
        this.el.style.display = 'none';
        setTimeout(function () {
          _this2.event.trigger('afterHide', {
            width: _this2.el.clientWidth,
            height: _this2.el.clientHeight,
            visable: _this2.scope.visable
          });
        }, 0);
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.scope.visable || force) {
        this.scope.visable = true;
        this.el.style.display = 'flex';
        setTimeout(function () {
          if (_this3.el.clientWidth > 0) {
            _this3.event.trigger('afterShow', {
              width: _this3.el.clientWidth,
              height: _this3.el.clientHeight,
              visable: _this3.scope.visable
            });
          }
        }, 0);
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.scope.visable) {
        return this.hide();
      }

      return this.show();
    }
  }, {
    key: "state",
    value: function state() {
      if (this.scope.visable && this.el.clientWidth > 0 || !this.scope.visable) {
        // WORKAROUND
        this.event.trigger('onState', {
          width: this.el.clientWidth,
          height: this.el.clientHeight,
          visable: this.scope.visable
        });
      }
    }
    /**
     * For debugging
     */

  }, {
    key: "reload",
    value: function reload() {
      this.shopifyApp.Bar.loadingOn();
      location.reload();
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var _this4 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var vp = (0,dom/* getViewportDimensions */.cc)();
      this.debug('onResize', vp.w);

      if (vp.w < 1200) {
        this.hide(force);
      } else {
        this.show(force); // on force the hide or show event is fired and we do not fire the state event byself

        if (!force) {
          setTimeout(function () {
            _this4.state();
          }, 0);
        }
      }
    }
  }, {
    key: "onRoute",
    value: function onRoute() {
      var _this5 = this;

      setTimeout(function () {
        var vp = (0,dom/* getViewportDimensions */.cc)();

        _this5.debug('onResize', vp.w);

        if (vp.w < 1200) {
          _this5.hide();
        } else {
          _this5.state();
        }
      }, 0);
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      get_default()(getPrototypeOf_default()(SidebarComponent.prototype), "disconnectedCallback", this).call(this);

      window.removeEventListener('resize', this.onResize.bind(this, false));
      this.localesService.event.off('changed', this.onResize.bind(this, false));
      this.router.off('newPageReady', this.onRoute.bind(this));
    }
  }, {
    key: "template",
    value: function template() {
      var template = null; // Only set the component template if there no childs already

      if (this.el.hasChildNodes()) {
        this.debug('Do not template, because element has child nodes');
        return template;
      } else {
        template = sidebar_component_default()(this.scope);
        this.debug('Use template', template);
        return template;
      }
    }
  }]);

  return SidebarComponent;
}(src.Component);

defineProperty_default()(SidebarComponent, "tagName", 'rv-sidebar');
// CONCATENATED MODULE: ./ts/components/sidebar-mask/sidebar-mask.component.ts











function sidebar_mask_component_createSuper(Derived) { var hasNativeReflectConstruct = sidebar_mask_component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function sidebar_mask_component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var SidebarMaskComponent = /*#__PURE__*/function (_Component) {
  inherits_default()(SidebarMaskComponent, _Component);

  var _super = sidebar_mask_component_createSuper(SidebarMaskComponent);

  createClass_default()(SidebarMaskComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function SidebarMaskComponent(element) {
    var _this;

    classCallCheck_default()(this, SidebarMaskComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "autobind", false);

    defineProperty_default()(assertThisInitialized_default()(_this), "event", new src.EventDispatcher('sidebar'));

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('component:' + SidebarMaskComponent.tagName));

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      show: false
    });

    _this.debug('constructor', _this.el.constructor, assertThisInitialized_default()(_this));

    return _this;
  }

  createClass_default()(SidebarMaskComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      get_default()(getPrototypeOf_default()(SidebarMaskComponent.prototype), "connectedCallback", this).call(this);

      this.init(SidebarMaskComponent.observedAttributes);
      this.event.on('afterShow', this.onState.bind(this));
      this.event.on('afterHide', this.onState.bind(this));
      this.event.on('onState', this.onState.bind(this));
    }
  }, {
    key: "onState",
    value: function onState(state) {
      this.debug('onState', state);
      var vp = (0,dom/* getViewportDimensions */.cc)();
      this.debug('onResize', vp.w);

      if (vp.w < 1200) {
        this.scope.show = state.visable;
      } else {
        this.scope.show = false;
      }

      if (this.scope.show) {
        this.el.style.display = 'block';
      } else {
        this.el.style.display = 'none';
      }
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.debug('beforeBind', this.bound));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.debug('afterBind', this.bound, this.scope));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      get_default()(getPrototypeOf_default()(SidebarMaskComponent.prototype), "attributeChangedCallback", this).call(this, attributeName, oldValue, newValue, namespace);
    } // deconstructor

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      get_default()(getPrototypeOf_default()(SidebarMaskComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      return null;
    }
  }]);

  return SidebarMaskComponent;
}(src.Component);

defineProperty_default()(SidebarMaskComponent, "tagName", 'rv-sidebar-mask');
// EXTERNAL MODULE: ./ts/components/sidebar-toggler/sidebar-toggler.component.pug
var sidebar_toggler_component = __webpack_require__(9152);
var sidebar_toggler_component_default = /*#__PURE__*/__webpack_require__.n(sidebar_toggler_component);

// CONCATENATED MODULE: ./ts/components/sidebar-toggler/sidebar-toggler.component.ts











function sidebar_toggler_component_createSuper(Derived) { var hasNativeReflectConstruct = sidebar_toggler_component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function sidebar_toggler_component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var SidebarTogglerComponent = /*#__PURE__*/function (_Component) {
  inherits_default()(SidebarTogglerComponent, _Component);

  var _super = sidebar_toggler_component_createSuper(SidebarTogglerComponent);

  createClass_default()(SidebarTogglerComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function SidebarTogglerComponent(element) {
    var _this;

    classCallCheck_default()(this, SidebarTogglerComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "event", new src.EventDispatcher('sidebar'));

    defineProperty_default()(assertThisInitialized_default()(_this), "$el", void 0);

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('component:' + SidebarTogglerComponent.tagName));

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      sidebarVisable: false,
      hide: _this.hide,
      show: _this.show,
      toggle: _this.toggle
    });

    _this.$el = (0,jquery_src/* JQuery */.Vk)(_this.el);

    _this.debug('constructor', _this.el.constructor, assertThisInitialized_default()(_this));

    return _this;
  }

  createClass_default()(SidebarTogglerComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      get_default()(getPrototypeOf_default()(SidebarTogglerComponent.prototype), "connectedCallback", this).call(this);

      this.init(SidebarTogglerComponent.observedAttributes);
      this.event.on('afterShow', this.afterShow.bind(this));
      this.event.on('afterHide', this.afterHide.bind(this));
      this.event.on('onState', this.onState.bind(this));
      this.demandState();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.event.trigger('hide');
    }
  }, {
    key: "show",
    value: function show() {
      this.event.trigger('show');
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.event.trigger('toggle');
    }
  }, {
    key: "demandState",
    value: function demandState() {
      this.event.trigger('state');
    }
  }, {
    key: "afterHide",
    value: function afterHide(state) {
      this.debug('afterHide', state);
      this.scope.sidebarVisable = state.visable;
      this.el.style.right = state.width.toString();
    }
  }, {
    key: "afterShow",
    value: function afterShow(state) {
      this.debug('afterShow', state);
      this.scope.sidebarVisable = state.visable;
      this.el.style.right = state.width.toString();
    }
  }, {
    key: "onState",
    value: function onState(state) {
      this.debug('onState', state);
      this.scope.sidebarVisable = state.visable;
      this.el.style.right = state.width.toString();
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.debug('beforeBind', this.bound));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.debug('afterBind', this.bound, this.scope));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      get_default()(getPrototypeOf_default()(SidebarTogglerComponent.prototype), "attributeChangedCallback", this).call(this, attributeName, oldValue, newValue, namespace);
    } // deconstructor

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      get_default()(getPrototypeOf_default()(SidebarTogglerComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      var template = null; // Only set the component template if there no childs already

      if (this.el.hasChildNodes()) {
        this.debug('Do not template, because element has child nodes');
        return template;
      } else {
        template = sidebar_toggler_component_default()(this.scope);
        this.debug('Use template', template);
        return template;
      }
    }
  }]);

  return SidebarTogglerComponent;
}(src.Component);

defineProperty_default()(SidebarTogglerComponent, "tagName", 'rv-sidebar-toggler');
// CONCATENATED MODULE: ./ts/components/switcher/switcher.component.ts











function switcher_component_createSuper(Derived) { var hasNativeReflectConstruct = switcher_component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function switcher_component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var TdaI18nSwitcherComponent = /*#__PURE__*/function (_AI18nSwitcherCompone) {
  inherits_default()(TdaI18nSwitcherComponent, _AI18nSwitcherCompone);

  var _super = switcher_component_createSuper(TdaI18nSwitcherComponent);

  createClass_default()(TdaI18nSwitcherComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    } // protected $el: JQuery<HTMLElement>;

  }]);

  function TdaI18nSwitcherComponent(element) {
    var _this;

    classCallCheck_default()(this, TdaI18nSwitcherComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "localesService", i18n_src.LocalesStaticService.getInstance('main'));

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('component:' + TdaI18nSwitcherComponent.tagName));

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      langcodes: [],
      "switch": _this["switch"],
      toggle: _this.toggle,
      ready: false
    });

    return _this;
  }

  createClass_default()(TdaI18nSwitcherComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      get_default()(getPrototypeOf_default()(TdaI18nSwitcherComponent.prototype), "connectedCallback", this).call(this);

      this.init(TdaI18nSwitcherComponent.observedAttributes);
    }
    /**
     * Switch to language by langcode
     * @param langcode
     * @param event
     */

  }, {
    key: "switch",
    value: function _switch(langcode, event) {
      return get_default()(getPrototypeOf_default()(TdaI18nSwitcherComponent.prototype), "switch", this).call(this, langcode, event);
    }
    /**
     * Toggle language, makes only sense if you have only two languages
     * @param langcode
     * @param event
     */

  }, {
    key: "toggle",
    value: function toggle(event) {
      return get_default()(getPrototypeOf_default()(TdaI18nSwitcherComponent.prototype), "toggle", this).call(this, event);
    }
  }, {
    key: "setLangcode",
    value: function setLangcode(langcode) {
      this.debug('setLangcode', langcode);
      return get_default()(getPrototypeOf_default()(TdaI18nSwitcherComponent.prototype), "setLangcode", this).call(this, langcode);
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind', this.scope);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      get_default()(getPrototypeOf_default()(TdaI18nSwitcherComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      return null;
    }
  }]);

  return TdaI18nSwitcherComponent;
}(i18n_src/* AI18nSwitcherComponent */.V);

defineProperty_default()(TdaI18nSwitcherComponent, "tagName", 'rv-i18n-switcher');
// EXTERNAL MODULE: ./ts/components/parcel-lab-settings/parcel-lab-settings.component.pug
var parcel_lab_settings_component = __webpack_require__(3206);
var parcel_lab_settings_component_default = /*#__PURE__*/__webpack_require__.n(parcel_lab_settings_component);

// CONCATENATED MODULE: ./ts/services/parcel-lab.service.ts







var ParcelLabService = /*#__PURE__*/function () {
  function ParcelLabService() {
    classCallCheck_default()(this, ParcelLabService);

    defineProperty_default()(this, "debug", browser_default()('services:ParcelLabService'));
  }

  createClass_default()(ParcelLabService, [{
    key: "getSettings",
    value: function () {
      var _getSettings = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var settings;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return src.HttpService.getJSON("/parcel-lab/settings");

              case 2:
                settings = _context.sent;
                this.debug('settings', settings);
                return _context.abrupt("return", settings);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSettings() {
        return _getSettings.apply(this, arguments);
      }

      return getSettings;
    }()
  }, {
    key: "setSettings",
    value: function () {
      var _setSettings = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2(settings) {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", src.HttpService.post("/parcel-lab/settings", {
                  settings: settings
                }, 'json'));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function setSettings(_x) {
        return _setSettings.apply(this, arguments);
      }

      return setSettings;
    }()
  }, {
    key: "listTrackings",
    value: function () {
      var _listTrackings = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3(search, page, size) {
        var query, queryStr, url, list;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = {};
                if (search) query.search = search;
                if (page) query.page = page;
                if (size) query.size = size;
                queryStr = new URLSearchParams(query).toString();
                url = '/parcel-lab/tracking/list' + (queryStr && queryStr.length > 0 ? '?' + queryStr : '');
                _context3.next = 8;
                return src.HttpService.getJSON(url);

              case 8:
                list = _context3.sent;
                this.debug('list', list);
                return _context3.abrupt("return", list);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function listTrackings(_x2, _x3, _x4) {
        return _listTrackings.apply(this, arguments);
      }

      return listTrackings;
    }()
  }]);

  return ParcelLabService;
}();
// CONCATENATED MODULE: ./ts/components/parcel-lab-settings/parcel-lab-settings.component.ts











function parcel_lab_settings_component_createSuper(Derived) { var hasNativeReflectConstruct = parcel_lab_settings_component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function parcel_lab_settings_component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var ParcelLabSettingsComponent = /*#__PURE__*/function (_Component) {
  inherits_default()(ParcelLabSettingsComponent, _Component);

  var _super = parcel_lab_settings_component_createSuper(ParcelLabSettingsComponent);

  createClass_default()(ParcelLabSettingsComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function ParcelLabSettingsComponent(element) {
    var _this;

    classCallCheck_default()(this, ParcelLabSettingsComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "parcelLab", new ParcelLabService());

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('component:' + ParcelLabSettingsComponent.tagName));

    defineProperty_default()(assertThisInitialized_default()(_this), "autobind", true);

    defineProperty_default()(assertThisInitialized_default()(_this), "easdk", new shopify_easdk_src/* EASDKWrapperService */.KG());

    defineProperty_default()(assertThisInitialized_default()(_this), "localesService", i18n_src.LocalesStaticService.getInstance('main'));

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      locales: {
        error: ''
      },
      settings: {
        user: 0,
        token: '',
        prefer_checkout_shipping_method: false
      },
      showPasswort: false,
      passwortInputType: 'password',
      // Methods
      save: _this.save,
      togglePassword: _this.togglePassword
    });

    _this.debug('constructor', assertThisInitialized_default()(_this));

    return _this;
  }

  createClass_default()(ParcelLabSettingsComponent, [{
    key: "get",
    value: function () {
      var _get2 = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var settings;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.parcelLab.getSettings();

              case 3:
                settings = _context.sent;
                this.debug('get settings', settings);
                return _context.abrupt("return", settings);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);
                return _context.abrupt("return", null);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function get() {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        var result, successfullySavedMessage, notSuccessfullySavedMessage;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('save settings', this.scope.settings);

                if (this.scope.settings) {
                  _context2.next = 4;
                  break;
                }

                this.scope.locales.error = 'components.parcelLabSettings.errors.generalSave';
                throw new Error('No settings found to save!');

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return this.parcelLab.setSettings(this.scope.settings);

              case 7:
                result = _context2.sent;
                this.resetErrors();
                _context2.next = 11;
                return this.localesService.getByCurrentLang(['components', 'parcelLabSettings', 'successfullySavedMessage']);

              case 11:
                successfullySavedMessage = _context2.sent;
                this.easdk.flashNotice(successfullySavedMessage);
                return _context2.abrupt("return", result);

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](4);
                console.error(_context2.t0);
                this.scope.locales.error = 'components.parcelLabSettings.errors.generalSave';
                _context2.next = 22;
                return this.localesService.getByCurrentLang(['components', 'parcelLabSettings', 'notSuccessfullySavedMessage']);

              case 22:
                notSuccessfullySavedMessage = _context2.sent;
                this.easdk.flashError(notSuccessfullySavedMessage);

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 16]]);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "togglePassword",
    value: function togglePassword() {
      this.scope.showPasswort = !this.scope.showPasswort;

      if (this.scope.showPasswort) {
        this.scope.passwortInputType = 'text';
      } else {
        this.scope.passwortInputType = 'password';
      }
    }
  }, {
    key: "resetErrors",
    value: function resetErrors() {
      this.scope.locales.error = '';
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      get_default()(getPrototypeOf_default()(ParcelLabSettingsComponent.prototype), "connectedCallback", this).call(this);

      return this.init(ParcelLabSettingsComponent.observedAttributes);
    }
  }, {
    key: "init",
    value: function () {
      var _init = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee3(observedAttributes) {
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", get_default()(getPrototypeOf_default()(ParcelLabSettingsComponent.prototype), "init", this).call(this, observedAttributes).then(function (view) {
                  return view;
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var settings;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return get_default()(getPrototypeOf_default()(ParcelLabSettingsComponent.prototype), "beforeBind", this).call(this);

              case 2:
                this.debug('beforeBind', this.scope);
                _context4.next = 5;
                return this.get();

              case 5:
                settings = _context4.sent;
                this.scope.settings = settings || this.scope.settings;
                this.debug('setted settings', this.scope.settings);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return get_default()(getPrototypeOf_default()(ParcelLabSettingsComponent.prototype), "afterBind", this).call(this);

              case 2:
                this.debug('afterBind', this.scope);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      return get_default()(getPrototypeOf_default()(ParcelLabSettingsComponent.prototype), "attributeChangedCallback", this).call(this, attributeName, oldValue, newValue, namespace);
    }
  }, {
    key: "parsedAttributeChangedCallback",
    value: function parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      return get_default()(getPrototypeOf_default()(ParcelLabSettingsComponent.prototype), "parsedAttributeChangedCallback", this).call(this, attributeName, oldValue, newValue, namespace);
    } // deconstructor

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      return get_default()(getPrototypeOf_default()(ParcelLabSettingsComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      var template = null; // Only set the component template if there no childs already

      if ((0,dom/* hasChildNodesTrim */.Np)(this.el)) {
        this.debug('Do not template, because element has child nodes');
        return template;
      } else {
        template = parcel_lab_settings_component_default()(this.scope);
        this.debug('Use template', template);
        return template;
      }
    }
  }]);

  return ParcelLabSettingsComponent;
}(src.Component);

defineProperty_default()(ParcelLabSettingsComponent, "tagName", 'parcel-lab-settings');
// EXTERNAL MODULE: ./ts/components/parcel-lab-list-tracking/parcel-lab-list-tracking.component.pug
var parcel_lab_list_tracking_component = __webpack_require__(9820);
var parcel_lab_list_tracking_component_default = /*#__PURE__*/__webpack_require__.n(parcel_lab_list_tracking_component);

// CONCATENATED MODULE: ./ts/components/parcel-lab-list-tracking/parcel-lab-list-tracking.component.ts











function parcel_lab_list_tracking_component_createSuper(Derived) { var hasNativeReflectConstruct = parcel_lab_list_tracking_component_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function parcel_lab_list_tracking_component_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }






var ParcelLabListTrackingComponent = /*#__PURE__*/function (_Component) {
  inherits_default()(ParcelLabListTrackingComponent, _Component);

  var _super = parcel_lab_list_tracking_component_createSuper(ParcelLabListTrackingComponent);

  createClass_default()(ParcelLabListTrackingComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function ParcelLabListTrackingComponent(element) {
    var _this;

    classCallCheck_default()(this, ParcelLabListTrackingComponent);

    _this = _super.call(this, element);

    defineProperty_default()(assertThisInitialized_default()(_this), "parcelLab", new ParcelLabService());

    defineProperty_default()(assertThisInitialized_default()(_this), "debug", browser_default()('component:' + ParcelLabListTrackingComponent.tagName));

    defineProperty_default()(assertThisInitialized_default()(_this), "autobind", true);

    defineProperty_default()(assertThisInitialized_default()(_this), "scope", {
      list: []
    });

    _this.debug('constructor', assertThisInitialized_default()(_this));

    return _this;
  }

  createClass_default()(ParcelLabListTrackingComponent, [{
    key: "list",
    value: function () {
      var _list = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _list2;

        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.parcelLab.listTrackings();

              case 3:
                _list2 = _context.sent;
                this.debug('list', _list2);
                return _context.abrupt("return", _list2);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);
                return _context.abrupt("return", null);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function list() {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      get_default()(getPrototypeOf_default()(ParcelLabListTrackingComponent.prototype), "connectedCallback", this).call(this);

      return this.init(ParcelLabListTrackingComponent.observedAttributes);
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        var list;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return get_default()(getPrototypeOf_default()(ParcelLabListTrackingComponent.prototype), "beforeBind", this).call(this);

              case 2:
                this.debug('beforeBind', this.scope);
                _context2.next = 5;
                return this.list();

              case 5:
                list = _context2.sent;

                if (list && list.results) {
                  this.scope.list = list.results;
                }

                this.debug('setted list', this.scope.list);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "template",
    value: function template() {
      var template = null; // Only set the component template if there no childs already

      if ((0,dom/* hasChildNodesTrim */.Np)(this.el)) {
        this.debug('Do not template, because element has child nodes');
        return template;
      } else {
        template = parcel_lab_list_tracking_component_default()(this.scope);
        this.debug('Use template', template);
        return template;
      }
    }
  }]);

  return ParcelLabListTrackingComponent;
}(src.Component);

defineProperty_default()(ParcelLabListTrackingComponent, "tagName", 'parcel-lab-list-tracking');
// CONCATENATED MODULE: ./ts/components/index.ts
// export { ComponentSkeletonComponent } from './component-skeleton/component-skeleton.component';









 // example
// CONCATENATED MODULE: ./ts/binders/index.ts

// EXTERNAL MODULE: ./ts/locales/orders/webhooks/description.en.html
var description_en = __webpack_require__(4678);
var description_en_default = /*#__PURE__*/__webpack_require__.n(description_en);

// EXTERNAL MODULE: ./ts/locales/components/webhook-explorer/placeholder-card-content.en.html
var placeholder_card_content_en = __webpack_require__(2456);
var placeholder_card_content_en_default = /*#__PURE__*/__webpack_require__.n(placeholder_card_content_en);

// CONCATENATED MODULE: ./ts/locales/en.ts


/* harmony default export */ const en = ({
  components: {
    parcelLabSettings: {
      title: 'ParcelLab',
      info: 'Enter your Parcel Lab data here to enable this app to send orders to Parcel Lab.',
      saveLabel: 'Save',
      showPasswordLabel: 'Show',
      hidePasswordLabel: 'Hide',
      tokenHelp: "We'll never share your token with anyone else.",
      preferCheckoutShippingMethodLabel: 'Try to identify the courier from the shipping method',
      preferCheckoutShippingMethodInfo: 'If active, the app tries to identify the courier by the title of the shipping method selected by the customer during the ordering process. We recommend to leave this option disabled and to activate it only if there are problems with the courier sent to ParcelLab',
      successfullySavedMessage: 'ParcelLab settings successfully saved',
      notSuccessfullySavedMessage: 'ParcelLab settings could not be saved',
      errors: {
        generalSave: 'Settings could not be saved, please check your input.'
      }
    },
    accountConnects: {
      shopify: {
        title: 'Shopify account',
        info: 'The Shopify account where you installed this app or have been granted access.',
        notConnected: 'This app has not yet been connected with Shopify. Enter your Shopify domain below to connect this app with Shopify.'
      },
      connect: 'Connect now',
      disconnect: 'Disconnect',
      logout: 'Logout'
    },
    plans: {
      title: 'App plan',
      info: 'Your plan for this app.',
      plan: 'Plan',
      activated_on: 'Activated on',
      price: 'Price',
      price_html: '{{price}} USD / month',
      trial: {
        ends_on: 'Trial ends on {{date}}',
        ended_on: 'Trial ended on {{date}}',
        days: 'Testing period',
        days_html: '{{days}} days'
      },
      activate: 'Activate',
      name: {
        customers: 'Customers tariff',
        "default": 'Standard tariff'
      }
    },
    apiExplorer: {
      input: {
        placeholder: 'Rest API URL for testing'
      },
      send: 'Send',
      edit: 'Edit',
      freestyle: {
        short_desc: 'Try the API itself by enter the URL yourself.'
      },
      roles: {
        'shopify-staff-member': {
          label: 'Backend only',
          info: 'For security reasons, this API can only be used in the backend and not in the theme.'
        }
      },
      query: {
        title: 'Activate optional query parameters'
      },
      shopify: {
        themes: {
          all: {
            short_desc: 'Retrieves a list of themes.'
          },
          theme_id: {
            short_desc: 'Retrieves a single theme.'
          },
          active: {
            short_desc: 'Retrieves the single active theme.'
          },
          assets: {
            list: {
              short_desc: 'Retrieve a list of all assets for a theme'
            },
            assets_filename: {
              short_desc: 'Retrieves a single theme asset file for a theme by its filename.'
            },
            templates_filename: {
              short_desc: 'Retrieves a single theme template file for a theme by its filename.'
            },
            snippets_filename: {
              short_desc: 'Retrieves a single theme snippets file for a theme by its filename.'
            },
            config_filename: {
              short_desc: 'Retrieves a single theme config file for a theme by its filename.'
            },
            layout_filename: {
              short_desc: 'Retrieves a single theme layout file for a theme by its filename.'
            },
            locales_filename: {
              short_desc: 'Retrieves a single theme locales file for a theme by its filename.'
            },
            sections_filename: {
              short_desc: 'Retrieves a single theme sections file for a theme by its filename.'
            },
            key: {
              short_desc: 'Retrieves a single theme file for a theme by its key.'
            }
          },
          locales: {
            all: {
              short_desc: 'Retrieve all language translations for a theme.'
            },
            list: {
              short_desc: 'Retrieve a list of locale asset files for a theme.'
            },
            json: {
              short_desc: 'Retrieves a single locale asset file for a theme by its filename.'
            },
            liquid: {
              short_desc: 'Retrieves a single section locale object for a theme by its liquid filename.'
            },
            property_path: {
              short_desc: 'Retrieves a locale subset or translation for a theme by its property path.'
            }
          }
        },
        products: {
          short_desc: 'Retrieves a list of products.',
          count: {
            short_desc: 'Retrieves a count of products.'
          },
          product_id: {
            short_desc: 'Retrieves a single product.'
          }
        }
      }
    },
    webhookExplorer: {
      placeholderCard: {
        content_html: (placeholder_card_content_en_default())
      },
      simulate: {
        label: 'Simulate',
        info: 'Creates a dummy product and removes it again to trigger the appropriate webhooks.'
      }
    },
    socketEventCard: {
      roles: {
        'shopify-staff-member': {
          label: 'Backend only',
          info: 'For security reasons, this webhook can only be received in the backend and not in the theme.'
        }
      }
    }
  },
  titles: {
    overview: 'Overview',
    settings: 'Settings',
    orders: 'Orders',
    'webhooks-api': 'Webhook Websocket API'
  },
  overview: {
    settings_desc: 'General settings and account connections',
    orders_desc: 'Show you the transferred orders'
  },
  orders: {
    webhooks: {
      title: 'Show current received order webhooks',
      description_html: (description_en_default())
    }
  }
});
// EXTERNAL MODULE: ./ts/locales/orders/webhooks/description.de.html
var description_de = __webpack_require__(4729);
var description_de_default = /*#__PURE__*/__webpack_require__.n(description_de);

// EXTERNAL MODULE: ./ts/locales/components/webhook-explorer/placeholder-card-content.de.html
var placeholder_card_content_de = __webpack_require__(129);
var placeholder_card_content_de_default = /*#__PURE__*/__webpack_require__.n(placeholder_card_content_de);

// CONCATENATED MODULE: ./ts/locales/de.ts


/* harmony default export */ const de = ({
  components: {
    parcelLabSettings: {
      title: 'ParcelLab',
      info: 'Hinterlege hier deine Parcel Lab Daten um es dieser App zu ermöglichen Bestellungen an Parcel Lab zu senden.',
      saveLabel: 'Speichern',
      showPasswordLabel: 'Anzeigen',
      hidePasswordLabel: 'Verstecken',
      tokenHelp: 'Wir werden deinen Token niemals an andere weitergeben.',
      preferCheckoutShippingMethodLabel: 'Versuche den Kuriers aus der Versandmethode herzuleiten',
      preferCheckoutShippingMethodInfo: 'Wenn aktiv, versucht die App den Kurier anhand des Titels der Versandmethode (die der Kunde im Bestellvorgang ausgewählt hat) herzuleiten. Wir empfehlen diese Option deaktiviert zu lassen und nur zu aktivieren wenn es Probleme mit dem an ParcelLab übergebenen Kurier gibt.',
      successfullySavedMessage: 'ParcelLab Einstellungen erfolgreich gespeichert',
      notSuccessfullySavedMessage: 'ParcelLab Einstellungen konnten nicht gespeichert werden',
      errors: {
        generalSave: 'Einstellungen konnten nicht gespeichert werden, bitte überprüfe deine Eingabe.'
      }
    },
    accountConnects: {
      shopify: {
        title: 'Shopify-Konto',
        info: 'Das Shopify-Konto, in dem Sie diese App installiert haben oder Zugriff gewährt bekommen haben.',
        notConnected: 'Diese App wurde noch nicht mit Shopify verbunden. Geben Sie unten ihre Shopify-Domain ein um diese App mit Shopify zu verbinden.'
      },
      connect: 'Jetzt verbinden',
      disconnect: 'Trennen',
      logout: 'Abmelden'
    },
    plans: {
      title: 'App-Tarif',
      info: 'Ihr Tarif für diese App.',
      plan: 'Tarif',
      activated_on: 'Aktivert am',
      price: 'Preis',
      price_html: '{{price}} USD / Monat',
      trial: {
        ends_on: 'Testversion endet am {{date}}',
        ended_on: 'Testversion endete am {{date}}',
        days: 'Testzeitraum',
        days_html: '{{days}} Tage'
      },
      activate: 'Aktivieren',
      name: {
        customers: 'Kundentarif',
        "default": 'Standardtarif'
      }
    },
    apiExplorer: {
      input: {
        placeholder: 'Rest-API URL zum Testen'
      },
      send: 'Senden',
      edit: 'Bearbeiten',
      freestyle: {
        short_desc: 'Probiere die API selber aus indem du die die URL selber eingibst.'
      },
      roles: {
        'shopify-staff-member': {
          label: 'Nur Backend',
          info: 'Diese API kann aus Sicherheitsgründen nur im Backend und nicht im Theme verwendet werden.'
        }
      },
      query: {
        title: 'Aktiviere optionale Query-Parameter'
      },
      shopify: {
        themes: {
          all: {
            short_desc: 'Ruft eine Liste aller Themes ab.'
          },
          theme_id: {
            short_desc: 'Ruft ein einzelnes Theme ab.'
          },
          active: {
            short_desc: 'Ruft das einzelne aktive Theme ab.'
          },
          assets: {
            list: {
              short_desc: 'Ruft eine Liste aller Assets eines Themes ab.'
            },
            assets_filename: {
              short_desc: 'Ruft eine einzelne Asset-Datei eines Themes anhand seines Dateinamens ab.'
            },
            templates_filename: {
              short_desc: 'Ruft eine einzelne Template-Datei eines Themes anhand seines Dateinamens ab.'
            },
            snippets_filename: {
              short_desc: 'Ruft eine einzelne Snippet-Datei eines Themes anhand seines Dateinamens ab.'
            },
            config_filename: {
              short_desc: 'Ruft eine einzelne Config-Datei eines Themes anhand seines Dateinamens ab.'
            },
            layout_filename: {
              short_desc: 'Ruft eine einzelne Layout-Datei eines Themes anhand seines Dateinamens ab.'
            },
            locales_filename: {
              short_desc: 'Ruft eine einzelne Locales-Datei eines Themes anhand seines Dateinamens ab.'
            },
            sections_filename: {
              short_desc: 'Ruft eine einzelne Sections-Datei eines Themes anhand seines Dateinamens ab.'
            },
            key: {
              short_desc: 'Ruft ein einzelnes Assets eines Themes anhand seines Keys ab.'
            }
          },
          locales: {
            all: {
              short_desc: 'Ruft alle Übersetzungen eines Themes ab.'
            },
            list: {
              short_desc: 'Ruft eine Liste von Asset-Sprachdateien ab.'
            },
            json: {
              short_desc: 'Ruft eine einzelne Asset-Sprachdatei eines Themes anhand seines Dateinamens ab.'
            },
            liquid: {
              short_desc: 'Ruft ein einzelnes Snippet Sprachobject eines Themes anhand des Liquid-Dateinamens ab.'
            },
            property_path: {
              short_desc: 'Ruft eine Untermenge oder eine Übersetzung eines Themes anhand des Json-Pfad ab.'
            }
          }
        },
        products: {
          short_desc: 'Ruft eine Liste von Produkten ab.',
          count: {
            short_desc: 'Ruft eine Anzahl von Produkten ab.'
          },
          product_id: {
            short_desc: 'Ruft ein einzelnes Produkt ab.'
          }
        }
      }
    },
    webhookExplorer: {
      placeholderCard: {
        content_html: (placeholder_card_content_de_default())
      },
      simulate: {
        label: 'Simuliere',
        info: 'Erzeugt ein Dummy-Produkt und entfernt es wieder um die entsprechenden Webhooks auszulösen.'
      }
    },
    socketEventCard: {
      roles: {
        'shopify-staff-member': {
          label: 'Nur Backend',
          info: 'Dieser Webhook kann aus Sicherheitsbedenken nur im Backend und nicht im Theme empfangen werden.'
        }
      }
    }
  },
  titles: {
    overview: 'Übersicht',
    settings: 'Einstellungen',
    orders: 'Bestellungen',
    'webhooks-api': 'Webhook Websocket-API'
  },
  overview: {
    settings_desc: 'Generelle Einstellungen und Konto-Anbindungen',
    orders_desc: 'Zeige dir die übertragenen Bestellungen an'
  },
  orders: {
    webhooks: {
      title: 'Zeige gerade empfange Order-Webhooks',
      description_html: (description_de_default())
    }
  }
});
// CONCATENATED MODULE: ./ts/locales/index.ts


/* harmony default export */ const locales = ({
  en: en,
  de: de
});
// CONCATENATED MODULE: ./ts/main.ts



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



 // Extensions / Modules




 // Own






var handleize = function handleize(str) {
  return str.toLowerCase().trim().replace(/[^\w\s]/gi, '').replace(/ /g, '-');
};

var Main = function Main() {
  var _this = this;

  classCallCheck_default()(this, Main);

  defineProperty_default()(this, "debug", browser_default()('app:main'));

  defineProperty_default()(this, "riba", new src.Riba());

  defineProperty_default()(this, "model", {});

  defineProperty_default()(this, "dispatcher", new src.EventDispatcher());

  defineProperty_default()(this, "authService", new AuthService());

  defineProperty_default()(this, "shopifyApp", new shopify_easdk_src/* EASDKWrapperService */.KG(shopify_easdk_src/* ShopifyApp */.xq));

  defineProperty_default()(this, "localesService", new i18n_src.LocalesStaticService(locales, undefined, false));

  this.debug('init the main application');
  this.shopifyApp.Bar.initialize({
    title: 'The Developer App'
  });
  this.shopifyApp.Bar.autoIcon();
  this.shopifyApp.Bar.autoLoading();
  this.shopifyApp.Bar.autoTitle(function (title) {
    return _this.localesService.getByCurrentLang(['titles', handleize(title)]);
  });
  this.authService.loggedIn().then(function (loggedIn) {
    if (loggedIn) {
      _this.debug('ok');
    } else {
      // not logged in
      console.warn('Not logged in', loggedIn);

      if (shopify_easdk_src/* EASDKWrapperService.inIframe */.KG.inIframe()) {
        return _this.authService.shopifyConnectIframe(window.shop).then(function (result) {
          console.warn('Redirect to auth url', result);
          return _this.shopifyApp.redirect(result.authUrl);
        })["catch"](function (error) {
          console.error(error);
          return error;
        });
      }

      if (window.shop && window.shop.length) {
        window.location.href = '/shopify/auth?shop=' + window.shop;
      } else {
        window.location.href = '/'; // login / install input
      }
    }
  })["catch"](function (e) {
    console.error(e);
  }); // Regist custom components

  this.riba.module.regist({
    components: components_namespaceObject,
    binders: _objectSpread({}, binders_namespaceObject)
  }); // Regist modules

  console.debug('regist coreModule');
  this.riba.module.regist(src.coreModule);
  console.debug('regist routerModule', router_src.routerModule);
  this.riba.module.regist(router_src.routerModule);
  console.debug('regist i18nModule');
  this.riba.module.regist((0,i18n_src.i18nModule)(this.localesService));
  console.debug('regist shopifyEasdkModule');
  this.riba.module.regist(shopify_easdk_src/* shopifyEasdkModule */.vJ);
  console.debug('regist bs4Module');
  this.riba.module.regist(bs4_src/* bs4Module */.$); // this.dispatcher.on('newPageReady', (viewId: string, currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) => {
  //   this.debug('newPageReady', viewId, currentStatus, dataset);
  // });

  (0,dom/* ready */.Cd)(function () {
    _this.riba.bind(document.body, _this.model);
  });
};

var bootstrap = function bootstrap() {
  if (window.shop) {
    // set shop in header for all javascript requests
    src.HttpService.setRequestHeaderEachRequest('shop', window.shop);
    shopify_easdk_src/* ShopifyApp.init */.xq.init({
      apiKey: window.apiKey,
      shopOrigin: "https://".concat(window.shop),
      forceRedirect: true,
      // If we want to allow to use the app outsite of the iframe we need to set false here
      debug: true
    });
  } else {
    console.error('Shop not detected', window.shop);
    window.location.href = '/';
  }

  shopify_easdk_src/* ShopifyApp.ready */.xq.ready(function () {
    new Main();
  });
};

(0,dom/* ready */.Cd)(function () {
  bootstrap();
});

/***/ }),

/***/ 129:
/***/ ((module) => {

// Module
var code = "<p> Hier kannst du nachverfolgen wie die App Bestellungen bemerkt um sie anschließend an ParcelLab weiterzuleiten. Der Sinn dieser Ansicht bestehst darin die App zu debuggen.<br/> Bearbeite beispielsweise eine Bestellung um den <code>order/update</code> Webhook auszulösen den du hier dann sehen wirst. Sobald ein beobachteter Webhook ausgelöst wurde, erscheint eine neue Karte links neben dieser Karte.<br/> Bitte beachte, dass es einige Minuten dauern kann bis der Webhook hier erscheint. </p>";
// Exports
module.exports = code;

/***/ }),

/***/ 2456:
/***/ ((module) => {

// Module
var code = "<p> Here you can see how the app notices orders and forwards them to ParcelLab. The purpose of this view is to debug the app.<br/> For example, you can edit an order to trigger the <code>order/update</code> webhook which you will then see here. Once a supported webhook has been triggered, a new card will appear to the left of this card.<br/> Please note that it may take a few seconds for the webhook to appear here. </p>";
// Exports
module.exports = code;

/***/ }),

/***/ 4729:
/***/ ((module) => {

// Module
var code = "<p> Unterstütze Webhooks um diese in deinem Theme zu empfangen sind: </p><ul> <li><code>order/create</code>,</li> <li><code>order/update</code>,</li> <li><code>order/delete</code> und</li> <li><code>app/uninstalled</code>.</li> </ul> Weitere Webhooks werden aus Sicherheitsbedenken - oder weil der Bedarf bisher nicht da war - nicht unterstüzt.<br> Außerdem werden nur veröffentlichte Produkt-Webhooks an das Theme weitergeleitet. <p></p> <p> Solltest du weitere Webhooks benötigen, scheibe uns einfach eine Mail und wir werden schauen ob wir diese für dich einbauen können. </p>";
// Exports
module.exports = code;

/***/ }),

/***/ 4678:
/***/ ((module) => {

// Module
var code = "<p> Supported webhook topics you can receive in your theme are: </p><ul> <li><code>order/create</code>,</li> <li><code>order/update</code>,</li> <li><code>order/delete</code> and</li> <li><code>app/uninstalled</code>.</li> </ul> Currently more webhooks are not supported for security reasons or because the need for it was not there yet. In addition, only webhooks of published products will be redirected to the theme. <p></p> <p> If you need more webhooks write us an email and we will see if we can support this webhook for you. </p>";
// Exports
module.exports = code;

/***/ }),

/***/ 1648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (type) {
      pug_html = pug_html + "\u003Csection class=\"row\"\u003E\u003Cdiv class=\"col-12 col-md-4\"\u003E\u003Ch2 class=\"my-3\" rv-i18n-text=\"locales.title\"\u003E\u003C\u002Fh2\u003E\u003Cp class=\"text-muted\" rv-i18n-text=\"locales.info\"\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-12 col-md-8\"\u003E\u003Cdiv class=\"card\"\u003E\u003Cdiv class=\"card-body\" rv-show=\"isConnected\"\u003E\u003Cdiv class=\"card-text\"\u003E\u003Cp class=\"d-flex align-items-center\"\u003E\u003Cbs4-icon class=\"mr-3\" rv-src=\"avatarUrl\" size=\"50\"\u003E\u003C\u002Fbs4-icon\u003E";
if (type === 'shopify') {
pug_html = pug_html + "{account.shop.name}";
}
else {
pug_html = pug_html + "{account.displayName} ({account.facebookID})";
}
pug_html = pug_html + "\u003C\u002Fp\u003E\u003Cp class=\"m-1 badge badge-primary\" rv-each-role=\"account.roles\" rv-text=\"role\"\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cbutton class=\"btn btn-link card-link\" rv-show=\"inIframe | not | and type | eq 'shopify'\" rv-on-click=\"logout\" rv-i18n-text=\"'components.accountConnects.logout'\"\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-link card-link\" rv-hide=\"type | eq 'shopify'\" rv-on-click=\"disconnect\" rv-i18n-text=\"'components.accountConnects.disconnect'\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"card-body\" rv-hide=\"isConnected\"\u003E\u003Cdiv class=\"card-text\"\u003E\u003Cp rv-i18n-text=\"locales.notConnected\"\u003E\u003C\u002Fp\u003E";
if (type === 'shopify') {
pug_html = pug_html + "\u003Cform action=\"\u002Fshopify\u002Fauth\"\u003E\u003Cdiv class=\"input-group\"\u003E\u003Cinput class=\"form-control\" type=\"text\" name=\"shop\" placeholder=\"your-shop.myshopify.com\" rv-value=\"myshopify_domain\"\u003E\u003Cdiv class=\"input-group-append\"\u003E\u003Cinput class=\"btn btn-outline-primary\" type=\"submit\" rv-i18n-value=\"'components.accountConnects.connect'\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cbutton class=\"btn btn-link card-link\" rv-on-click=\"connect\" rv-i18n-text=\"'components.accountConnects.connect'\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
    }.call(this, "type" in locals_for_with ?
        locals_for_with.type :
        typeof type !== 'undefined' ? type : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ 9820:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection class=\"row\"\u003E\u003Cdiv class=\"col-12\"\u003E\u003Cdiv class=\"card\"\u003E\u003Cdiv class=\"cart-header\"\u003E\u003Ch2 class=\"my-3\" rv-i18n-text=\"'components.parcelLabListTracking.title'\"\u003E\u003C\u002Fh2\u003E\u003Cp class=\"text-muted\" rv-i18n-text=\"'components.parcelLabListTracking.info'\"\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"card-body\"\u003E\u003Cdiv class=\"card-text\"\u003E\u003Ctable class=\"table table-borderless table-hover\"\u003E\u003Cthead\u003E\u003Ctr\u003E\u003Cth\u003E#\u003C\u002Fth\u003E\u003Cth\u003ECourier\u003C\u002Fth\u003E\u003Cth\u003EStatus\u003C\u002Fth\u003E\u003Cth\u003EDate\u003C\u002Fth\u003E\u003Cth\u003ETracking number\u003C\u002Fth\u003E\u003Cth\u003EUpdates\u003C\u002Fth\u003E\u003Cth\u003EClient\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E\u003Ctbody\u003E\u003Ctr rv-each-item=\"list\"\u003E\u003Cth scope=\"row\" rv-text=\"item.inf.orn\"\u003E \u003C\u002Fth\u003E\u003Ctd rv-text=\"item.co.p\"\u003E\u003C\u002Ftd\u003E\u003Ctd rv-text=\"item.lst.sta.status_details\"\u003E\u003C\u002Ftd\u003E\u003Ctd rv-text=\"item.lst.ago\"\u003E\u003C\u002Ftd\u003E\u003Ctd rv-text=\"item.tn\"\u003E\u003C\u002Ftd\u003E\u003Ctd rv-text=\"item.inf.imprtsrc.number_of_updates\"\u003E\u003C\u002Ftd\u003E\u003Ctd rv-text=\"item.oth.cli\"\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 3206:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection class=\"row\"\u003E\u003Cdiv class=\"col-12 col-md-4\"\u003E\u003Ch2 class=\"my-3\" rv-i18n-text=\"'components.parcelLabSettings.title'\"\u003E\u003C\u002Fh2\u003E\u003Cp class=\"text-muted\" rv-i18n-text=\"'components.parcelLabSettings.info'\"\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-12 col-md-8\"\u003E\u003Cdiv class=\"card\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Cdiv class=\"card-text\"\u003E\u003Cform\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel for=\"parcel-lab-user-id\"\u003EUser-ID\u003C\u002Flabel\u003E\u003Cinput class=\"form-control\" id=\"parcel-lab-user-id\" type=\"number\" rv-value=\"settings.user\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel for=\"parcel-lab-token\"\u003EToken\u003C\u002Flabel\u003E\u003Cdiv class=\"input-group\"\u003E\u003Cinput class=\"form-control\" id=\"parcel-lab-token\" rv-type=\"passwortInputType\" aria-describedby=\"parcel-lab-token-help\" rv-value=\"settings.token\"\u003E\u003Cdiv class=\"input-group-append\"\u003E\u003Cdiv class=\"input-group-text cursor-pointer\" rv-hide=\"showPasswort\" rv-on-click=\"togglePassword\" rv-i18n-text=\"'components.parcelLabSettings.showPasswordLabel'\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"input-group-text cursor-pointer\" rv-show=\"showPasswort\" rv-on-click=\"togglePassword\" rv-i18n-text=\"'components.parcelLabSettings.hidePasswordLabel'\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Csmall class=\"form-text text-muted\" id=\"parcel-lab-token-help\" rv-i18n-text=\"'components.parcelLabSettings.tokenHelp'\"\u003E\u003C\u002Fsmall\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Cdiv class=\"custom-control custom-checkbox\"\u003E\u003Cinput class=\"custom-control-input\" id=\"prefer_checkout_shipping_method\" type=\"checkbox\" rv-checked=\"settings.prefer_checkout_shipping_method\" aria-describedby=\"prefer-checkout-shipping-method-info\"\u003E\u003Clabel class=\"custom-control-label\" for=\"prefer_checkout_shipping_method\" rv-i18n-text=\"'components.parcelLabSettings.preferCheckoutShippingMethodLabel'\"\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Csmall class=\"form-text text-muted\" id=\"prefer-checkout-shipping-method-info\" rv-i18n-text=\"'components.parcelLabSettings.preferCheckoutShippingMethodInfo'\"\u003E\u003C\u002Fsmall\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"alert alert-danger\" role=\"alert\" rv-if=\"locales.error\" rv-i18n-text=\"locales.error\"\u003E\u003C\u002Fdiv\u003E\u003Cbutton class=\"btn btn-link card-link\" type=\"button\" rv-on-click=\"save\" rv-i18n-text=\"'components.parcelLabSettings.saveLabel'\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 606:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (hasActive) {
      pug_html = pug_html + "\u003Csection class=\"row\"\u003E\u003Cdiv class=\"col-12 col-md-4\"\u003E\u003Ch2 class=\"my-3\" rv-i18n-text=\"'components.plans.title'\"\u003E\u003C\u002Fh2\u003E\u003Cp class=\"text-muted\" rv-i18n-text=\"'components.plans.info'\"\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-12 col-md-8\"\u003E";
if (hasActive) {
pug_html = pug_html + "\u003Cdiv class=\"card\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Cdiv class=\"card-title d-flex justify-content-between\"\u003E\u003Cdiv\u003E\u003Ch2 rv-i18n-text=\"'components.plans.plan'\"\u003E\u003C\u002Fh2\u003E\u003Cspan rv-i18n-text=\"active.name | handleize | prepend 'components.plans.name.'\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Ch2 rv-i18n-text=\"'components.plans.activated_on'\"\u003E\u003C\u002Fh2\u003E\u003Cspan rv-text=\"active.activated_on\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Ch2 rv-i18n-text=\"'components.plans.price'\"\u003E\u003C\u002Fh2\u003E\u003Cspan rv-i18n-html=\"'components.plans.price_html'\" rv-data-price=\"active.price\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp class=\"card-text\"\u003E\u003Cspan rv-show=\"active.trial_days | gt 0\" rv-i18n-html=\"'components.plans.trial.ends_on'\" rv-data-date=\"active.trial_ends_on\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-12\" rv-each-plan=\"plans\"\u003E\u003Cdiv class=\"card\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Cdiv class=\"card-title d-flex justify-content-between\"\u003E\u003Cdiv\u003E\u003Ch2 rv-i18n-text=\"'components.plans.plan'\"\u003E\u003C\u002Fh2\u003E\u003Cspan rv-i18n-text=\"plan.name | handleize | prepend 'components.plans.name.'\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Ch2 rv-i18n-text=\"'components.plans.trial.days'\"\u003E\u003C\u002Fh2\u003E\u003Cspan rv-i18n-text=\"'components.plans.trial.days_html'\" rv-data-days=\"plan.trial_days\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E\u003Ch2 rv-i18n-text=\"'components.plans.price'\"\u003E\u003C\u002Fh2\u003E\u003Cspan rv-i18n-html=\"'components.plans.price_html'\" rv-data-price=\"plan.price\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp class=\"card-text\"\u003E\u003C\u002Fp\u003E\u003Cbutton class=\"btn btn-link card-link\" rv-on-click=\"activate | args plan\" rv-i18n-text=\"'components.plans.activate'\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
    }.call(this, "hasActive" in locals_for_with ?
        locals_for_with.hasActive :
        typeof hasActive !== 'undefined' ? hasActive : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ 9152:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"toggler-button p-3 cursor-pointer\" rv-on-click=\"toggle\" rv-class-active=\"sidebarVisable\"\u003E\u003Cbs4-icon rv-hide=\"sidebarVisable\" src=\"\u002Ficonset\u002Fsvg\u002Ficon_menu.svg\" size=\"32\"\u003E\u003C\u002Fbs4-icon\u003E\u003Cbs4-icon rv-show=\"sidebarVisable\" src=\"\u002Ficonset\u002Fsvg\u002Ficon_close.svg\" size=\"32\"\u003E\u003C\u002Fbs4-icon\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 562:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (environment) {
      pug_html = pug_html + "\u003Cdiv class=\"sidebar-content list-group\"\u003E";
if (environment !== 'production') {
pug_html = pug_html + "\u003Cbutton class=\"btn-link list-group-item list-group-item-action d-flex align-items-center cursor-pointer\" rv-on-click=\"reload\"\u003E\u003Cbs4-icon class=\"mr-3\" src=\"\u002Ficonset\u002Fsvg\u002Ficon_refresh.svg\" size=\"20\"\u003E\u003C\u002Fbs4-icon\u003EReload\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\u003Ca class=\"list-group-item list-group-item-action d-flex align-items-center\" rv-route=\"'\u002Fview\u002Fsettings'\" rv-route-class-active=\"'\u002Fview\u002Fsettings'\"\u003E\u003Cbs4-icon class=\"mr-3\" src=\"\u002Ficonset\u002Fsvg\u002Ficon_cog.svg\" size=\"20\"\u003E\u003C\u002Fbs4-icon\u003E\u003Cspan rv-i18n-text=\"'titles.settings'\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003Ca class=\"list-group-item list-group-item-action d-flex align-items-center\" rv-route=\"'\u002Fview\u002Forders'\" rv-route-class-active=\"'\u002Fview\u002Forders'\"\u003E\u003Cbs4-icon class=\"mr-3\" src=\"\u002Ficonset\u002Fsvg\u002Ficon_cogs.svg\" size=\"20\"\u003E\u003C\u002Fbs4-icon\u003E\u003Cspan rv-i18n-text=\"'titles.orders'\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"list-group-item list-group-item-action\"\u003E\u003Crv-i18n-switcher\u003E\u003Cdiv class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\"\u003E\u003Clabel class=\"btn btn-outline-primary\" rv-each-langcode=\"langcodes\" rv-class-active=\"langcode.active\"\u003E\u003Cinput type=\"radio\" name=\"langs\" id=\"langcode.code\" autocomplete=\"off\" rv-on-click=\"switch | args langcode\" rv-checked=\"langcode.active\"\u003E\u003Cspan rv-text=\"langcode.code\"\u003E\u003C\u002Fspan\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Frv-i18n-switcher\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }.call(this, "environment" in locals_for_with ?
        locals_for_with.environment :
        typeof environment !== 'undefined' ? environment : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ 1438:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"card monaco-editor-card\"\u003E\u003Cbs4-icon class=\"close m-2\" src=\"\u002Ficonset\u002Fsvg\u002Ficon_close.svg\" size=\"32\" rv-on-click=\"close\"\u003E\u003C\u002Fbs4-icon\u003E\u003Cdiv class=\"card-body pb-0\"\u003E\u003Cdiv class=\"card-title\"\u003ERecived webhook \u003Ccode rv-html=\"event\"\u003E\u003C\u002Fcode\u003E\u003Cspan class=\"badge badge-primary mx-1\" rv-show=\"role | filled\" rv-i18n-text=\"'components.socketEventCard.roles.' | append role | append '.label'\" rv-bs4-tooltip=\"'components.socketEventCard.roles.' | append role | append '.info' | t langcode\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"card-text\"\u003E\u003Ccode rv-html=\"data | json\"\u003E\u003C\u002Fcode\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ 54:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var pug = __webpack_require__(7055);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (environment) {
      if (environment !== 'production') {
pug_html = pug_html + "\u003Cdiv class=\"row flex-nowrap scrollbar-primary scrollbar-x-auto scrollbar-y-hidden card-container\"\u003E\u003Cdiv class=\"card monaco-editor-card placeholder-card col-auto\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Cdiv class=\"card-text\" rv-i18n-html=\"'components.webhookExplorer.placeholderCard.content_html'\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
    }.call(this, "environment" in locals_for_with ?
        locals_for_with.environment :
        typeof environment !== 'undefined' ? environment : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ 2661:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 418:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			143: 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			[4971,216]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = () => {
/******/ 		
/******/ 		};
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = () => {
/******/ 		
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = () => {
/******/ 		
/******/ 			}
/******/ 			chunkLoadingGlobal = chunkLoadingGlobal.slice();
/******/ 			for(var i = 0; i < chunkLoadingGlobal.length; i++) webpackJsonpCallback(chunkLoadingGlobal[i]);
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkparcel_lab_shopify_app_frontend"] = self["webpackChunkparcel_lab_shopify_app_frontend"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;