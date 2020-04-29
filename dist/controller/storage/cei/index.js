"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CEIStorageController = void 0;

var admin = _interopRequireWildcard(require("firebase-admin"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CEIStorageController = /*#__PURE__*/function () {
  function CEIStorageController() {
    _classCallCheck(this, CEIStorageController);

    this.firestore = admin.firestore();
  }
  /**
   * 
   * @param {String} username 
   * @param {{field:String,direction: 'asc' | 'desc'}} sort 
   * @param {number} limit 
   */


  _createClass(CEIStorageController, [{
    key: "getStocks",
    value: function () {
      var _getStocks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, sort) {
        var limit,
            userSnapshot,
            user,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                limit = _args.length > 2 && _args[2] !== undefined ? _args[2] : 10;
                _context.next = 3;
                return this.firestore.collection('users').where('username', '==', username).get();

              case 3:
                userSnapshot = _context.sent;

                if (!userSnapshot.empty) {
                  _context.next = 8;
                  break;
                }

                throw new Error('User not found');

              case 8:
                user = userSnapshot.docs[0];
                _context.next = 11;
                return this.firestore.collection('stocks').where('user_id', '==', user.id).orderBy(sort.field, sort.direction).limit(limit).get();

              case 11:
                return _context.abrupt("return", _context.sent);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getStocks(_x, _x2) {
        return _getStocks.apply(this, arguments);
      }

      return getStocks;
    }()
    /**
     * 
     * @param {{username:String, password:String}} user 
     */

  }, {
    key: "saveStocks",
    value: function () {
      var _saveStocks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user, stocks) {
        var user_id, userSnapshot, newUser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.firestore.collection('users').where('username', '==', user.username).get();

              case 2:
                userSnapshot = _context2.sent;

                if (!userSnapshot.empty) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 6;
                return this.firestore.collection('users').add(user);

              case 6:
                newUser = _context2.sent;
                user_id = newUser.id;
                _context2.next = 11;
                break;

              case 10:
                user_id = userSnapshot.docs[0].id;

              case 11:
                if (user_id) {
                  _context2.next = 13;
                  break;
                }

                throw new Error('User id not found');

              case 13:
                stocks = _objectSpread({}, stocks, {
                  user_id: user_id
                });
                _context2.next = 16;
                return this.firestore.collection('stocks').add(stocks);

              case 16:
                return _context2.abrupt("return", _context2.sent);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveStocks(_x3, _x4) {
        return _saveStocks.apply(this, arguments);
      }

      return saveStocks;
    }()
  }]);

  return CEIStorageController;
}();

exports.CEIStorageController = CEIStorageController;