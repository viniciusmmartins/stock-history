"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _ = _interopRequireDefault(require(".."));

var _colors = require("../../../utils/colors");

var _timers = require("../../../utils/timers");

var _cei = require("../../../config/cei");

var _cei2 = require("../../storage/cei");

var _utils = require("../../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CEIScrapperController = /*#__PURE__*/function (_ScrapperController) {
  _inherits(CEIScrapperController, _ScrapperController);

  var _super = _createSuper(CEIScrapperController);

  function CEIScrapperController() {
    var _this;

    _classCallCheck(this, CEIScrapperController);

    _this = _super.call(this);
    _this.storageController = new _cei2.CEIStorageController();
    return _this;
  }
  /**
   * 
   * @param {String} category 
   */


  _createClass(CEIScrapperController, [{
    key: "getTransactions",
    value: function () {
      var _getTransactions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(username, password) {
        var cached,
            stocks,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cached = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;

                if (!cached) {
                  _context.next = 14;
                  break;
                }

                _context.next = 4;
                return this.getCachedTransactions(username);

              case 4:
                stocks = _context.sent;

                if (stocks) {
                  _context.next = 11;
                  break;
                }

                _context.next = 8;
                return this.getDataWithPuppetter(username, password);

              case 8:
                return _context.abrupt("return", _context.sent);

              case 11:
                return _context.abrupt("return", stocks);

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.next = 16;
                return this.getDataWithPuppetter(username, password);

              case 16:
                return _context.abrupt("return", _context.sent);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTransactions(_x, _x2) {
        return _getTransactions.apply(this, arguments);
      }

      return getTransactions;
    }()
  }, {
    key: "getDataWithPuppetter",
    value: function () {
      var _getDataWithPuppetter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, password) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                return _context2.abrupt("return", this.startScrapper(username, password));

              case 4:
                _context2.prev = 4;
                _context2.t0 = _context2["catch"](0);
                (0, _colors.consoleColorfy)("Error getting data from web, trying to get last cached response");
                _context2.next = 9;
                return this.getCachedTransactions(username);

              case 9:
                return _context2.abrupt("return", _context2.sent);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 4]]);
      }));

      function getDataWithPuppetter(_x3, _x4) {
        return _getDataWithPuppetter.apply(this, arguments);
      }

      return getDataWithPuppetter;
    }()
  }, {
    key: "startScrapper",
    value: function () {
      var _startScrapper = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username, password) {
        var browser, err, isLogged, page, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _colors.consoleColorfy)('Starting scrapper 😊...\n', 'green');
                _context3.next = 3;
                return _puppeteer["default"].launch({
                  args: ['--no-sandbox']
                });

              case 3:
                browser = _context3.sent;
                err = null;
                isLogged = false; //Creating page

                _context3.next = 8;
                return browser.newPage();

              case 8:
                page = _context3.sent;
                (0, _colors.consoleColorfy)('Entering the page login page...', 'green');
                _context3.prev = 10;
                _context3.next = 13;
                return page["goto"](_cei.CEI_BASE_URL);

              case 13:
                _context3.next = 15;
                return this.login(page, username, password);

              case 15:
                isLogged = _context3.sent;
                _context3.next = 18;
                return page["goto"](_cei.CEI_STOCKS_URL);

              case 18:
                _context3.next = 20;
                return this.queryStocks(page);

              case 20:
                _context3.next = 22;
                return this.getStocks(page);

              case 22:
                response = _context3.sent;
                _context3.next = 25;
                return this.cacheResponse(response, {
                  username: username,
                  password: password
                });

              case 25:
                response = _context3.sent;
                //Close browser
                (0, _colors.consoleColorfy)('Yuhulll, we did it!🥳', 'green');
                return _context3.abrupt("return", response);

              case 30:
                _context3.prev = 30;
                _context3.t0 = _context3["catch"](10);
                console.error("Controller error => ", _context3.t0);
                err = _context3.t0;

              case 34:
                _context3.prev = 34;

                if (!isLogged) {
                  _context3.next = 38;
                  break;
                }

                _context3.next = 38;
                return this.logout(page);

              case 38:
                _context3.next = 40;
                return browser.close();

              case 40:
                (0, _colors.consoleColorfy)('Browser closed', 'red');

                if (!err) {
                  _context3.next = 43;
                  break;
                }

                throw {
                  error: err.code || 500,
                  message: 'Error retrieving stocks'
                };

              case 43:
                return _context3.finish(34);

              case 44:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[10, 30, 34, 44]]);
      }));

      function startScrapper(_x5, _x6) {
        return _startScrapper.apply(this, arguments);
      }

      return startScrapper;
    }()
    /**
     * 
     * @param {puppeteer.Page} page 
     */

  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(page, username, password) {
        var fields;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                (0, _colors.consoleColorfy)("Credentials are { username: ".concat(username, " , password:").concat(password, "}..."), 'cyan');
                (0, _colors.consoleColorfy)('Logging in...', 'blue');
                fields = {
                  username: username,
                  password: password
                };
                _context5.next = 5;
                return page.evaluate(function (fields) {
                  var inputs = document.getElementsByClassName('large-12')[0].querySelectorAll('.row:not(.collapse)');

                  try {
                    inputs[0].querySelector('input').value = fields.username || '32088635866';
                    inputs[1].querySelector('input').type = 'text';
                    inputs[1].querySelector('input').value = fields.password || 'Cafezes@5108';
                  } catch (err) {
                    console.error(err);
                  }

                  return;
                }, fields);

              case 5:
                _context5.prev = 5;
                (0, _colors.consoleColorfy)('Trying to loggin...', 'blue');
                _context5.next = 9;
                return page.click('input[type=submit]');

              case 9:
                page.on('dialog', /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dialog) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return dialog.dismiss();

                          case 2:
                            throw {
                              message: dialog.message()
                            };

                          case 3:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x10) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context5.next = 12;
                return page.waitForNavigation({
                  waitUntil: 'networkidle0'
                });

              case 12:
                (0, _colors.consoleColorfy)('Logged in!!', 'green');
                return _context5.abrupt("return", true);

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](5);
                console.error("Login error", _context5.t0);
                throw {
                  code: 500,
                  message: _context5.t0.message || 'Error loggin in, it may be a problem with your credentials'
                };

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[5, 16]]);
      }));

      function login(_x7, _x8, _x9) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
    /**
    * 
    * @param {puppeteer.Page} page 
    */

  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(page) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                (0, _colors.consoleColorfy)('Logging out...🤫', 'whiteBright');
                _context6.next = 3;
                return page["goto"](_cei.CEI_LOGOUT_URL);

              case 3:
                (0, _colors.consoleColorfy)('Logged out!!😜', 'green');
                return _context6.abrupt("return");

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function logout(_x11) {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
    /**
    * 
    * @param {puppeteer.Page} page 
    */

  }, {
    key: "queryStocks",
    value: function () {
      var _queryStocks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(page) {
        var toDate;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                (0, _colors.consoleColorfy)("Querying transactions...", 'blue');
                toDate = (0, _utils.subtractFromDate)(2);
                _context7.next = 5;
                return page.evaluate(function (toDate) {
                  document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[0].querySelector('select').value = '308';
                  document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[2].querySelector('input').value = '01/01/2020';
                  document.getElementsByClassName('filtro')[0].getElementsByClassName('row')[3].querySelector('input').value = toDate || '15/04/2020';
                }, toDate);

              case 5:
                _context7.next = 7;
                return page.click('input[type=submit]');

              case 7:
                _context7.next = 9;
                return page.waitFor('table');

              case 9:
                (0, _colors.consoleColorfy)("Query done! Table is visible", 'green');
                return _context7.abrupt("return");

              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](0);
                console.error(_context7.t0);
                throw {
                  error: 500,
                  message: 'Querying failed'
                };

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 13]]);
      }));

      function queryStocks(_x12) {
        return _queryStocks.apply(this, arguments);
      }

      return queryStocks;
    }()
    /**
    * 
    * @param {puppeteer.Page} page 
    */

  }, {
    key: "getStocks",
    value: function () {
      var _getStocks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(page) {
        var stocks;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                (0, _colors.consoleColorfy)("Getting transactions tables...", 'blue');
                _context8.next = 3;
                return page.evaluate(function (CEI_HEADER_DICTIONARY) {
                  var header = [];
                  var response = {
                    transactions: []
                  };
                  var theaders = document.querySelector('thead').getElementsByTagName('th');

                  var _loop = function _loop(index) {
                    var th = theaders[index];
                    var label = th.textContent.trim().replace(/\\n/ig, '');
                    var hd = CEI_HEADER_DICTIONARY.find(function (hd) {
                      return label.includes(hd.label);
                    });
                    var headerCell = {
                      key: hd ? hd.key : label,
                      label: label
                    };
                    header.push(headerCell);
                  };

                  for (var index = 0; index < theaders.length; index++) {
                    _loop(index);
                  }

                  var rows = document.querySelector('tbody').getElementsByTagName('tr');

                  for (var trIndex = 0; trIndex < rows.length; trIndex++) {
                    var rowElements = rows[trIndex].querySelectorAll('td');
                    var row = {};

                    for (var tdIndex = 0; tdIndex < rowElements.length; tdIndex++) {
                      row[header[tdIndex].key] = rowElements[tdIndex].textContent.trim().replace(/\\n/ig, '');
                    }

                    response.transactions.push(row);
                  }

                  return response;
                }, _cei.CEI_HEADER_DICTIONARY);

              case 3:
                stocks = _context8.sent;
                (0, _colors.consoleColorfy)("Stocks retrieved!", 'green');
                return _context8.abrupt("return", stocks);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getStocks(_x13) {
        return _getStocks.apply(this, arguments);
      }

      return getStocks;
    }()
  }, {
    key: "getCachedTransactions",
    value: function () {
      var _getCachedTransactions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(username) {
        var docs, stock, date, message;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return this.storageController.getStocks(username, {
                  field: 'date',
                  direction: 'desc'
                }, 1);

              case 3:
                docs = _context9.sent;

                if (docs.empty) {
                  _context9.next = 14;
                  break;
                }

                stock = docs.docs[0].data();
                date = new Date(stock.date);

                if (!(0, _timers.isToday)(date)) {
                  _context9.next = 11;
                  break;
                }

                return _context9.abrupt("return", stock);

              case 11:
                throw new Error('File outdated');

              case 12:
                _context9.next = 15;
                break;

              case 14:
                return _context9.abrupt("return", null);

              case 15:
                _context9.next = 22;
                break;

              case 17:
                _context9.prev = 17;
                _context9.t0 = _context9["catch"](0);
                message = _context9.t0 && _context9.t0.message ? _context9.t0.message : 'Error getting cached response';
                (0, _colors.consoleColorfy)(message, 'red');
                return _context9.abrupt("return", null);

              case 22:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 17]]);
      }));

      function getCachedTransactions(_x14) {
        return _getCachedTransactions.apply(this, arguments);
      }

      return getCachedTransactions;
    }()
  }, {
    key: "cacheResponse",
    value: function () {
      var _cacheResponse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(response, username) {
        var firebaseResponse, stocksSnapshot, stocks;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                (0, _colors.consoleColorfy)('Caching response in the server...', 'blue');
                _context10.prev = 1;
                response = _objectSpread({}, response, {
                  date: Date.now()
                });
                _context10.next = 5;
                return this.storageController.saveStocks(username, response);

              case 5:
                firebaseResponse = _context10.sent;
                _context10.next = 8;
                return firebaseResponse.get();

              case 8:
                stocksSnapshot = _context10.sent;
                stocks = stocksSnapshot.data();
                (0, _colors.consoleColorfy)("Cached sucessfully firebase with id ".concat(stocksSnapshot.id, " "), 'green');
                return _context10.abrupt("return", stocks);

              case 14:
                _context10.prev = 14;
                _context10.t0 = _context10["catch"](1);
                console.error(_context10.t0);
                (0, _colors.consoleColorfy)("Cache failed", 'red');
                return _context10.abrupt("return");

              case 19:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[1, 14]]);
      }));

      function cacheResponse(_x15, _x16) {
        return _cacheResponse.apply(this, arguments);
      }

      return cacheResponse;
    }()
  }]);

  return CEIScrapperController;
}(_["default"]);

exports["default"] = CEIScrapperController;