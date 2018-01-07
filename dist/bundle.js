var store = (function (exports) {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var reduce = Symbol("reduce");

var Store = function () {
  function Store() {
    var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Store);

    this.reducers = reducers;
    this.state = this[reduce](initialState, {});
    this.subscribers = [];
  }

  createClass(Store, [{
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "subscribe",
    value: function subscribe(fn) {
      var _this = this;

      this.subscriber = [].concat(toConsumableArray(this.subscribers), [fn]);
      fn(this.state);
      return function () {
        _this.subscribers = _this.subscribers.filter(function (sub) {
          return sub !== fn;
        });
      };
    }
  }, {
    key: "dispatch",
    value: function dispatch(action) {
      var _this2 = this;

      this.state = this[reduce](this.state, action);
      this.subscribers.forEach(function (fn) {
        return fn(_this2.state);
      });
    }
  }, {
    key: reduce,
    value: function value(state, action) {
      var newState = _extends({}, state);
      for (var prop in this.reducers) {
        newState[prop] = this.reducers[prop](state[prop], action);
      }
      return newState;
    }
  }]);
  return Store;
}();

exports.Store = Store;

return exports;

}({}));
