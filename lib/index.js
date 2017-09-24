'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = Gi;
exports.connect = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gi = require('./gi');

var _gi2 = _interopRequireDefault(_gi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: saohui 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2017-09-20 09:56:36 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified by: saohui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified time: 2017-09-22 16:52:16
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var appCtx = null;

/**
 * 
 * 单例
 * @return {obj} 对外只提供四个接口
 * {
 *   use
 *   model
 *   router
 *   start
 * }
 */
function Gi(ops) {
  appCtx = appCtx || new _gi2.default(ops);
  return {
    use: appCtx.use.bind(appCtx),
    model: appCtx.model.bind(appCtx),
    router: appCtx.router.bind(appCtx),
    start: appCtx.start.bind(appCtx)
  };
}

/**
 * 连接 state => 组件的 props
 * 
 * @export
 * @param {any} mapStateToProps 
 */
function connect(mapStateToProps) {
  return function (TagetComponent) {
    return function (_React$Component) {
      _inherits(Wrapper, _React$Component);

      function Wrapper(props) {
        _classCallCheck(this, Wrapper);

        var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

        _this.state = {};

        appCtx.addEventStateToProps(_this.updateState.bind(_this));
        return _this;
      }

      _createClass(Wrapper, [{
        key: 'updateState',
        value: function updateState() {
          this.setState({});
        }
      }, {
        key: 'render',
        value: function render() {
          var props = mapStateToProps(
          // 防止原始值被修改
          Object.assign(appCtx.state));
          return _react2.default.createElement(TagetComponent, _extends({ dispatch: function dispatch(action) {
              appCtx.dispatch(action);
            } }, props));
        }
      }]);

      return Wrapper;
    }(_react2.default.Component);
  };
}