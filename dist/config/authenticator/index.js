"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var NoneSecureRoutes = ['/globo', '/g1'];

var _default = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, user, _token$split, _token$split2, username, password;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!NoneSecureRoutes.some(function (route) {
              return req.path.includes(route);
            })) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            token = req.headers['authorization'];

            if (!token) {
              _context.next = 28;
              break;
            }

            _context.prev = 4;

            if (!token.includes('Basic')) {
              _context.next = 19;
              break;
            }

            token = token.split('Basic ')[1].trim();
            token = new Buffer.from(token, 'base64').toString('ascii');
            _token$split = token.split(':'), _token$split2 = _slicedToArray(_token$split, 2), username = _token$split2[0], password = _token$split2[1];
            user = {
              username: username,
              password: password
            };
            req.user = user;

            if (user) {
              _context.next = 15;
              break;
            }

            throw {
              code: 401
            };

          case 15:
            req.user = user;
            return _context.abrupt("return", next());

          case 17:
            _context.next = 20;
            break;

          case 19:
            throw new Error('Auth method not allowed');

          case 20:
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](4);
            console.trace(_context.t0);
            res.status(_context.t0.code || 401).json({
              type: 'headers',
              message: 'You should provide an auth for this route'
            });

          case 26:
            _context.next = 29;
            break;

          case 28:
            res.status(401).json({
              type: 'headers',
              message: 'You should provide an auth for this route'
            });

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 22]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;