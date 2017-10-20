'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _pRedux = require('./pRedux');

var _pRedux2 = _interopRequireDefault(_pRedux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: saohui 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2017-09-22 16:20:57 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified by: saohui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified time: 2017-10-20 08:40:53
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var isStarted = false;

var pages = {};
function register(pathname, page) {
  if (!pages[pathname]) {
    pages[pathname] = page;
  } else {
    throw new Error('"' + pathname + '" Already exist');
  }
}

var GiApp = function (_PRedux) {
  _inherits(GiApp, _PRedux);

  function GiApp(ops) {
    _classCallCheck(this, GiApp);

    var _this = _possibleConstructorReturn(this, (GiApp.__proto__ || Object.getPrototypeOf(GiApp)).call(this));

    _this.state = {};
    _this.reducers = {};
    _this.effects = {};
    _this.subscriptions = {};

    var pathname = window.location.pathname;
    //截取页面名字 /a/b.html ==> b.html
    var pageName = pathname.match(/(\/[\w\-]+\.(html|php)$)/); //tms中会有php的页面
    pageName = pageName && pageName[1] ? pageName[1] : null;
    _this.pageName = pageName;

    ops && _this.use(ops);
    return _this;
  }

  _createClass(GiApp, [{
    key: 'use',
    value: function use(ops) {
      var typeofOps = typeof ops === 'undefined' ? 'undefined' : _typeof(ops);
      if (typeofOps != 'object' && typeofOps == 'function') {
        throw 'Ops can only be object or function';
      }

      this.addEventOnAction(ops.onAction);
      this.addEventOnError(ops.onError);
      this.addEventOnStateChange(ops.onStateChange);
    }
  }, {
    key: 'model',
    value: function model(item) {

      if (!item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) != 'object') {
        console.warn('Model needs to be an object');
        return;
      }

      var namespace = item.namespace;

      if (!namespace || namespace == '') {
        throw TypeError('Namespace can\'t empty');
      }

      /**
       * model register
       */
      this.state[namespace] = item.state || {};
      this.reducers[namespace] = item.reducers || {};
      this.effects[namespace] = item.effects || {};
      this.subscriptions[namespace] = item.subscriptions || {};
    }
  }, {
    key: 'router',
    value: function router(registerRouter) {

      if (!registerRouter || typeof registerRouter != 'function') {
        throw TypeError('Model needs to be an function');
      }

      registerRouter(register);
    }
  }, {
    key: 'start',
    value: function start(appDom) {
      var _this2 = this;

      if (isStarted) {
        console.warn('Multiple start cannot be performed');
        return;
      }
      isStarted = true;

      /**
       * Perform all subscriptions immediately 
       */
      this.emitSubscriptions(this.subscriptions, { dispatch: this.dispatch.bind(this) }, function (e) {
        _this2.emit(_this2.EFFECT_OR_SUBSCR_ERROR, e);
      });

      var pageName = this.pageName;
      var Page = pageName ? pages[pageName] : null;

      if (!appDom) {
        return Page;
      }

      (0, _reactDom.render)(_react2.default.createElement(Page, null), document.querySelector(appDom));
    }
  }]);

  return GiApp;
}(_pRedux2.default);

exports.default = GiApp;