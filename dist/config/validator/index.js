"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validator = void 0;

var _expressJoiValidation = require("express-joi-validation");

var validator = (0, _expressJoiValidation.createValidator)({
  passError: true
});
exports.validator = validator;