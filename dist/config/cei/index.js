"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CEI_HEADER_DICTIONARY = exports.CEI_SCREENSHOT_PATH = exports.CEI_LOGOUT_URL = exports.CEI_STOCKS_URL = exports.CEI_BASE_URL = void 0;
var CEI_BASE_URL = 'https://cei.b3.com.br/CEI_Responsivo/';
exports.CEI_BASE_URL = CEI_BASE_URL;
var CEI_STOCKS_URL = 'https://cei.b3.com.br/CEI_Responsivo/negociacao-de-ativos.aspx';
exports.CEI_STOCKS_URL = CEI_STOCKS_URL;
var CEI_LOGOUT_URL = 'https://cei.b3.com.br/CEI_Responsivo/login.aspx?MSG=SESENC';
exports.CEI_LOGOUT_URL = CEI_LOGOUT_URL;
var CEI_SCREENSHOT_PATH = 'assets/screens';
exports.CEI_SCREENSHOT_PATH = CEI_SCREENSHOT_PATH;
var CEI_HEADER_DICTIONARY = [{
  label: 'Data',
  key: 'date'
}, {
  label: 'Compra',
  key: 'operation'
}, {
  label: 'Mercado',
  key: 'market'
}, {
  label: 'Prazo',
  key: 'dueDate'
}, {
  label: 'Código',
  key: 'code'
}, {
  label: 'Especi',
  key: 'specs'
}, {
  label: 'Quantidade',
  key: 'amount'
}, {
  label: 'Preço',
  key: 'price'
}, {
  label: 'Total',
  key: 'total'
}, {
  label: 'Fator',
  key: 'factor'
}];
exports.CEI_HEADER_DICTIONARY = CEI_HEADER_DICTIONARY;