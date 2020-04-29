"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CEItransactionsSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CEItransactionsSchema = _joi["default"].object({
  cached: _joi["default"]["boolean"]()
});

exports.CEItransactionsSchema = CEItransactionsSchema;