'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: saohui 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2017-09-20 14:16:39 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified by: saohui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified time: 2017-09-23 11:55:53
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var GiUtil = function (_events$EventEmitter) {
  _inherits(GiUtil, _events$EventEmitter);

  function GiUtil() {
    _classCallCheck(this, GiUtil);

    return _possibleConstructorReturn(this, (GiUtil.__proto__ || Object.getPrototypeOf(GiUtil)).apply(this, arguments));
  }

  _createClass(GiUtil, [{
    key: 'emitSubscriptions',


    /**
     * Perform all subscriptions immediately 
     * 
     * @param {any} subscriptions
     */
    value: function emitSubscriptions(subscriptions) {
      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      for (var namespace in subscriptions) {
        var subscriptFns = subscriptions[namespace];
        for (var key in subscriptFns) {
          var subscriptFn = subscriptFns[key];

          subscriptFn.apply(undefined, params);
        }
      }
    }
  }, {
    key: 'arrDeepFlattenL',
    value: function (_arrDeepFlattenL) {
      function arrDeepFlattenL(_x) {
        return _arrDeepFlattenL.apply(this, arguments);
      }

      arrDeepFlattenL.toString = function () {
        return _arrDeepFlattenL.toString();
      };

      return arrDeepFlattenL;
    }(function (arr) {
      var flatten = function flatten(arr) {
        var _ref;

        return (_ref = []).concat.apply(_ref, _toConsumableArray(arr));
      };return flatten(arr.map(function (x) {
        return Array.isArray(x) ? arrDeepFlattenL(x) : x;
      }));
    })
  }, {
    key: 'addEventOnFn',
    value: function addEventOnFn(type, fns) {
      var _this2 = this;

      if (!fns) {
        return;
      }

      fns = this.arrDeepFlattenL([fns]);

      fns.forEach(function (fn) {
        _this2.on(type, fn);
      });
    }
  }]);

  return GiUtil;
}(_events2.default.EventEmitter);

exports.default = GiUtil;