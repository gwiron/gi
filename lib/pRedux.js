'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonuri = require('jsonuri');

var _jsonuri2 = _interopRequireDefault(_jsonuri);

var _giUtil = require('./giUtil');

var _giUtil2 = _interopRequireDefault(_giUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: saohui 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2017-09-22 16:07:21 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified by: saohui
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified time: 2017-09-23 13:37:29
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PRedux = function (_GiUtil) {
  _inherits(PRedux, _GiUtil);

  function PRedux() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PRedux);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PRedux.__proto__ || Object.getPrototypeOf(PRedux)).call.apply(_ref, [this].concat(args))), _this), _this.MAP_STATE_TO_PROPS = 'MAP_STATE_TO_PROPS', _this.BEFORE_ACTION = 'BEFORE_ACTION', _this.STATE_CHANGE = 'STATE_CHANGE', _this.EFFECT_OR_SUBSCR_ERROR = 'EFFECT_OR_SUBSCR_ERROR', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PRedux, [{
    key: 'dispatch',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(action) {
        var _this2 = this;

        var type, namespace, effect, reducer, stateing, nextState;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                type = action.type, namespace = type.split('/')[0];

                /**
                 * 执行 分发 action 之前，执行 onAction
                 */

                this.emit(this.BEFORE_ACTION, this.dispatch.bind(this), this.getState.bind(this));

                /**
                 * 优先处理 effect
                 * 拥有 effect 的时候 不会进行 reducer 
                 */
                effect = _jsonuri2.default.get(this.effects, type) || null;

                if (!effect) {
                  _context5.next = 6;
                  break;
                }

                _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.prev = 0;
                          _context4.next = 3;
                          return effect(action, {
                            put: function () {
                              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(action) {
                                var typeing, retType;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        typeing = action.type;
                                        retType = '';


                                        if (typeing.indexOf('/') != -1) {
                                          if (typeing.indexOf(namespace + '/') != -1) {
                                            console.warn('[sagaEffects.put] ' + typeing + ' should not be prefixed with namespace ' + namespace);
                                          }

                                          retType = typeing;
                                        } else {
                                          retType = namespace + '/' + typeing;
                                        }

                                        _context.next = 5;
                                        return _this2.dispatch(_extends({}, action, { type: retType
                                        }));

                                      case 5:
                                      case 'end':
                                        return _context.stop();
                                    }
                                  }
                                }, _callee, _this2);
                              }));

                              return function put(_x2) {
                                return _ref4.apply(this, arguments);
                              };
                            }(),
                            call: function () {
                              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(callBack) {
                                for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                                  args[_key2 - 1] = arguments[_key2];
                                }

                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                  while (1) {
                                    switch (_context2.prev = _context2.next) {
                                      case 0:
                                        _context2.next = 2;
                                        return callBack.apply(null, args);

                                      case 2:
                                      case 'end':
                                        return _context2.stop();
                                    }
                                  }
                                }, _callee2, _this2);
                              }));

                              return function call(_x3) {
                                return _ref5.apply(this, arguments);
                              };
                            }(),
                            select: function () {
                              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(getState) {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                  while (1) {
                                    switch (_context3.prev = _context3.next) {
                                      case 0:
                                        _context3.next = 2;
                                        return getState(Object.assign(_this2.state));

                                      case 2:
                                        return _context3.abrupt('return', _context3.sent);

                                      case 3:
                                      case 'end':
                                        return _context3.stop();
                                    }
                                  }
                                }, _callee3, _this2);
                              }));

                              return function select(_x4) {
                                return _ref6.apply(this, arguments);
                              };
                            }()
                          });

                        case 3:
                          _context4.next = 8;
                          break;

                        case 5:
                          _context4.prev = 5;
                          _context4.t0 = _context4['catch'](0);

                          // Error unified processing effect => onError( e )
                          _this2.emit(_this2.EFFECT_OR_SUBSCR_ERROR, _context4.t0, _this2.dispatch.bind(_this2));

                        case 8:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this2, [[0, 5]]);
                }))();
                return _context5.abrupt('return');

              case 6:

                /**
                 * reducer 处理
                 */
                reducer = _jsonuri2.default.get(this.reducers, type) || null;

                if (reducer) {
                  _context5.next = 10;
                  break;
                }

                console.warn('Dispatch\'s action has no qualified reducer');
                return _context5.abrupt('return');

              case 10:
                stateing = _jsonuri2.default.get(this.state, namespace);
                nextState = reducer(stateing, action);

                /**
                 * 更新 state
                 */

                _jsonuri2.default.set(this.state, namespace, nextState);

                this.emit(this.MAP_STATE_TO_PROPS);

                this.emit(this.STATE_CHANGE, this.getState.bind(this));

              case 15:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function dispatch(_x) {
        return _ref2.apply(this, arguments);
      }

      return dispatch;
    }()
  }, {
    key: 'addEventStateToProps',
    value: function addEventStateToProps(mapStateToProps) {
      mapStateToProps && this.on(this.MAP_STATE_TO_PROPS, mapStateToProps);
    }

    /**
     * hooks 订阅区
     * 
     */

  }, {
    key: 'addEventOnAction',
    value: function addEventOnAction(onActions) {
      this.addEventOnFn(this.BEFORE_ACTION, onActions);
    }
  }, {
    key: 'addEventOnStateChange',
    value: function addEventOnStateChange(onStateChanges) {
      this.addEventOnFn(this.STATE_CHANGE, onStateChanges);
    }
  }, {
    key: 'addEventOnError',
    value: function addEventOnError(onErrors) {
      this.addEventOnFn(this.EFFECT_OR_SUBSCR_ERROR, onErrors);
    }
  }, {
    key: 'getState',
    value: function getState() {
      return Object.assign(this.state);
    }
  }]);

  return PRedux;
}(_giUtil2.default);

exports.default = PRedux;