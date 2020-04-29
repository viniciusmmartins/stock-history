"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _cei = _interopRequireDefault(require("../../../controller/scrapper/cei"));

var _validator = require("../../../config/validator");

var _schemas = require("./schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();

var initRouter = function initRouter() {
  router.route('/').post(_validator.validator.body(_schemas.CEItransactionsSchema), getTransactions);
  return router;
};

var getTransactions = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var cached, _req$user, username, password, scrapperController, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            cached = req.body.cached;
            _req$user = req.user, username = _req$user.username, password = _req$user.password;
            scrapperController = new _cei["default"]();
            _context.next = 6;
            return scrapperController.getTransactions(username, password, cached);

          case 6:
            response = _context.sent;
            res.status(200).json(response);
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.error("Router error => ", _context.t0);
            res.status(_context.t0.code || 500).json({
              message: _context.t0.message || 'Internal server error'
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function getTransactions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = initRouter();

exports["default"] = _default;