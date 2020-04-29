"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _chalk = _interopRequireDefault(require("chalk"));

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _authenticator = _interopRequireDefault(require("./config/authenticator"));

var admin = _interopRequireWildcard(require("firebase-admin"));

var _router = require("./router");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// --- Routers ---
var serviceCredentials = require('./credentials').CREDENTIALS;

admin.initializeApp({
  credential: admin.credential.cert(serviceCredentials)
});
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.set('PORT', process.env.PORT || 8080);
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
app.use((0, _morgan["default"])(':user-agent :method :url :status :response-time ms'));
var BASE_PATH = '/v1';
app.use(_authenticator["default"]);
app.use("".concat(BASE_PATH, "/scrapper/"), _router.scrapper);
app.use(function (err, req, res, next) {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      type: err.type,
      // it could be 'headers', 'body', 'query' or 'params'
      message: err.error.toString()
    });
  } else {
    console.log(err);
    next(err);
  }
}); // --------------

app.listen(app.get('PORT'), function () {
  /* eslint-disable no-console */
  console.log(_chalk["default"].blue("Express server listening on port ".concat(_chalk["default"].whiteBright(app.get('PORT')))));
});