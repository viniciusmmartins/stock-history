"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewsQuerySchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _joiDate = _interopRequireDefault(require("@hapi/joi-date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getNewsQuerySchema = _joi["default"].object({
  search: _joi["default"].string(),
  order: _joi["default"].string().pattern(/relevant|recent/),
  from: _joi["default"].extend(_joiDate["default"]).date().format("DD/MM/YYYY"),
  to: _joi["default"].extend(_joiDate["default"]).date().format("DD/MM/YYYY")
});

exports.getNewsQuerySchema = getNewsQuerySchema;