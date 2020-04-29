"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _ = _interopRequireDefault(require(".."));

var _colors = require("../../../utils/colors");

var _chalk = _interopRequireDefault(require("chalk"));

var fse = _interopRequireWildcard(require("fs-extra"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var GloboScrapperController = /*#__PURE__*/function (_ScrapperController) {
  _inherits(GloboScrapperController, _ScrapperController);

  var _super = _createSuper(GloboScrapperController);

  function GloboScrapperController() {
    _classCallCheck(this, GloboScrapperController);

    return _super.call(this);
  }
  /**
   * 
   * @param {String} category 
   */


  _createClass(GloboScrapperController, [{
    key: "getNews",
    value: function () {
      var _getNews = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fields) {
        var browser, url, err, page, news;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _colors.consoleColorfy)('Openning browser...\n', 'green');
                _context.next = 3;
                return _puppeteer["default"].launch();

              case 3:
                browser = _context.sent;
                url = this.getURL(fields);
                err = null;
                _context.prev = 6;
                (0, _colors.consoleColorfy)('Browser open...');
                _context.next = 10;
                return browser.newPage();

              case 10:
                page = _context.sent;
                _context.next = 13;
                return page["goto"](url);

              case 13:
                _context.next = 15;
                return this.getDataFromMainPage(page, url);

              case 15:
                news = _context.sent;
                _context.next = 18;
                return this.getDataFromNewsPage(page, news);

              case 18:
                news = _context.sent;
                // await this.generateFilesByNews(news)
                consolejColorfy('Closing browser...');
                return _context.abrupt("return", news);

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](6);
                console.error("Controller error => ", JSON.parse(JSON.stringify(_context.t0)));
                err = _context.t0;

              case 27:
                _context.prev = 27;
                browser.close();
                (0, _colors.consoleColorfy)('Browser closed...\n');
                console.log(_chalk["default"].bgGreen.black('Have a nice one!🖖'));

                if (!err) {
                  _context.next = 33;
                  break;
                }

                throw {
                  error: err.code || 500,
                  message: 'Error retrieving news'
                };

              case 33:
                return _context.finish(27);

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 23, 27, 34]]);
      }));

      function getNews(_x) {
        return _getNews.apply(this, arguments);
      }

      return getNews;
    }()
    /**
    * 
    * @param {puppeteer.Page} page 
    * @param {Array<Object>} news 
    */

  }, {
    key: "getDataFromNewsPage",
    value: function () {
      var _getDataFromNewsPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(page, news) {
        var _this = this;

        var index, element, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                for (index = 0; index < array.length; index++) {
                  element = array[index];
                }

                _context3.next = 4;
                return news.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(n, index) {
                    var href, article;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            href = n.title.href;
                            (0, _colors.consoleColorfy)("Getting article from news number ".concat(index, " "));
                            _context2.next = 4;
                            return _this.getContentFromPage(page, href);

                          case 4:
                            article = _context2.sent;
                            news[index].resume = article;

                          case 6:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x4, _x5) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 4:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", news);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      function getDataFromNewsPage(_x2, _x3) {
        return _getDataFromNewsPage.apply(this, arguments);
      }

      return getDataFromNewsPage;
    }()
    /**
    * 
    * @param {puppeteer.Page} page 
    * @param {string} url 
    */

  }, {
    key: "getContentFromPage",
    value: function () {
      var _getContentFromPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(page, url) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                (0, _colors.consoleColorfy)("Entering page ".concat(url, "..."));
                _context4.next = 4;
                return page["goto"](url);

              case 4:
                _context4.next = 6;
                return page.evaluate(function () {
                  var paragraphs = document.querySelectorAll('article  p');
                  var article = '';

                  for (var index = 0; index < paragraphs.length; index++) {
                    var p = paragraphs[index];
                    article = +p.textContent;
                  }

                  return article;
                });

              case 6:
                return _context4.abrupt("return", _context4.sent);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                console.error(_context4.t0);
                return _context4.abrupt("return", '');

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 9]]);
      }));

      function getContentFromPage(_x6, _x7) {
        return _getContentFromPage.apply(this, arguments);
      }

      return getContentFromPage;
    }()
    /**
     * 
     * @param {puppeteer.Page} page 
     */

  }, {
    key: "getDataFromMainPage",
    value: function () {
      var _getDataFromMainPage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(page, url) {
        var itemTargetCount,
            items,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                itemTargetCount = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 10;
                (0, _colors.consoleColorfy)("Getting news from ".concat(url), 'green');
                items = [];
                _context5.prev = 3;

              case 4:
                if (!(items.length < itemTargetCount)) {
                  _context5.next = 27;
                  break;
                }

                _context5.next = 7;
                return this.getItems(page);

              case 7:
                items = _context5.sent;
                (0, _colors.consoleColorfy)("Number of news retrieved: ".concat(items.length, " of ").concat(itemTargetCount));
                _context5.prev = 9;
                _context5.next = 12;
                return page.waitFor('.pagination a');

              case 12:
                _context5.next = 14;
                return page.waitFor(200);

              case 14:
                _context5.next = 16;
                return page.click('.pagination a');

              case 16:
                _context5.next = 18;
                return page.waitFor(function (itemsLength) {
                  return document.querySelectorAll('.widget--info__text-container').length > itemsLength;
                }, {}, items.length);

              case 18:
                _context5.next = 25;
                break;

              case 20:
                _context5.prev = 20;
                _context5.t0 = _context5["catch"](9);
                console.error(_context5.t0);
                (0, _colors.consoleColorfy)('End of news!', 'red');
                return _context5.abrupt("break", 27);

              case 25:
                _context5.next = 4;
                break;

              case 27:
                return _context5.abrupt("return", items);

              case 30:
                _context5.prev = 30;
                _context5.t1 = _context5["catch"](3);
                console.error(_context5.t1);
                (0, _colors.consoleColorfy)('Returning finded items', 'green');
                return _context5.abrupt("return", items);

              case 35:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[3, 30], [9, 20]]);
      }));

      function getDataFromMainPage(_x8, _x9) {
        return _getDataFromMainPage.apply(this, arguments);
      }

      return getDataFromMainPage;
    }()
    /**
    * 
    * @param {Array<Object>} news 
    */

  }, {
    key: "generateFilesByNews",
    value: function () {
      var _generateFilesByNews = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(news) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return news.forEach( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(n, index) {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            fse.outputFileSync("news/doc_".concat(index, ".txt"), n.title.text);
                            if (index % 10) console.log("File number ".concat(_chalk["default"].green(index), " out of ").concat(_chalk["default"].red(news.length), " generated"));

                          case 2:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x11, _x12) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 2:
                return _context7.abrupt("return", news);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function generateFilesByNews(_x10) {
        return _generateFilesByNews.apply(this, arguments);
      }

      return generateFilesByNews;
    }()
    /**
    * 
    * @param {puppeteer.Page} page 
    */

  }, {
    key: "getItems",
    value: function () {
      var _getItems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(page) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return page.evaluate(function () {
                  var list = document.querySelector('.results__list').querySelectorAll('li');
                  var items = [];

                  for (var index = 0; index < list.length; index++) {
                    try {
                      var info = list[index];
                      var title = info.getElementsByClassName('widget--info__title');
                      var href = info.getElementsByTagName('a')[0].getAttribute('href'); // let resume = info.getElementsByClassName('widget--info__description')

                      var datetime = info.getElementsByClassName('widget--info__meta');
                      var source = info.getElementsByClassName('widget--info__header');
                      var news = {
                        title: {
                          text: title[0].textContent.trim().replace(/\\n/ig, ''),
                          href: href
                        },
                        // resume: resume[0].textContent.trim().replace(/\\n/ig, ''),
                        metadata: {
                          datetime: datetime[0].textContent.trim().replace(/\\n/ig, ''),
                          source: source[0].textContent.trim().replace(/\\n/ig, '')
                        }
                      };
                      items.push(news);
                    } catch (err) {
                      var noResultElement = document.querySelector('.widget--no-results');

                      if (noResultElement) {
                        items.push({
                          title: 'No itens were found for this search'
                        });
                      }
                    }
                  }

                  return JSON.parse(JSON.stringify(items));
                });

              case 3:
                return _context8.abrupt("return", _context8.sent);

              case 6:
                _context8.prev = 6;
                _context8.t0 = _context8["catch"](0);
                console.error("Get items error", _context8.t0);
                throw _context8.t0;

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 6]]);
      }));

      function getItems(_x13) {
        return _getItems.apply(this, arguments);
      }

      return getItems;
    }()
  }, {
    key: "getURL",
    value: function getURL() {
      var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = "https://g1.globo.com/busca/";
      var search = fields.search,
          order = fields.order,
          from = fields.from,
          to = fields.to;
      var date = new Date(from);
      var formattedDate = date.toISOString().replace(/.[^.]*$/, '-0300');

      try {
        url += '?';
        url += "q=".concat(search || 'economia', "&");
        url += "order=".concat(order || 'recent', "&");
        url += "species=not\xEDcias&";
        url += "from=".concat(formattedDate || 'now-1w', "&");
        if (to) url += "to=".concat(to, "&");
      } catch (_unused) {
        console.error(error);
      }

      console.log(url);
      return url;
    }
  }]);

  return GloboScrapperController;
}(_["default"]);

exports["default"] = GloboScrapperController;