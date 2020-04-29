"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consoleColorfy = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var consoleColorfy = function consoleColorfy(message, color) {
  try {
    console.log(_chalk["default"][color](message));
  } catch (err) {
    console.log(message);
  }
};

exports.consoleColorfy = consoleColorfy;