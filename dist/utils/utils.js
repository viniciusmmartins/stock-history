"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subtractFromDate = exports.getCurrentDate = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getCurrentDate = function getCurrentDate() {
  return (0, _moment["default"])().format('DD/MM/YYYY');
};

exports.getCurrentDate = getCurrentDate;

var subtractFromDate = function subtractFromDate() {
  var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return (0, _moment["default"])().subtract(days, 'days').format('DD/MM/YYYY');
};

exports.subtractFromDate = subtractFromDate;