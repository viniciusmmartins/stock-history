"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _globo = _interopRequireDefault(require("./globo"));

var _cei = _interopRequireDefault(require("./cei"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();

var initRouter = function initRouter() {
  router.get('', getHelper);
  router.use('/cei', _cei["default"]);
  router.use('/globo', _globo["default"]);
  return router;
};

var getHelper = function getHelper(req, res) {
  var errorResponse = {
    message: 'You should specify which scrapper you wanna use',
    avaiableScrappers: ['g1', 'globo']
  };
  res.status(400).json(errorResponse);
};

var _default = initRouter();

exports["default"] = _default;