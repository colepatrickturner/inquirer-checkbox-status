'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _checkbox = require('inquirer/lib/prompts/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _screenManager = require('inquirer/lib/utils/screen-manager');

var _screenManager2 = _interopRequireDefault(_screenManager);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _figures = require('figures');

var _figures2 = _interopRequireDefault(_figures);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStatus = function defaultStatus() {
  return "";
};

var statusPrefix = _chalk2.default.cyan(_figures2.default.pointerSmall + _figures2.default.pointerSmall) + " ";

var CustomScreen = function (_ScreenManager) {
  _inherits(CustomScreen, _ScreenManager);

  function CustomScreen() {
    _classCallCheck(this, CustomScreen);

    return _possibleConstructorReturn(this, (CustomScreen.__proto__ || Object.getPrototypeOf(CustomScreen)).apply(this, arguments));
  }

  _createClass(CustomScreen, [{
    key: 'render',
    value: function render(getBottomContent, message, bottomContent) {
      var _bottomInfo = getBottomContent();

      if (!bottomContent && _bottomInfo) {
        bottomContent = '' + statusPrefix + _bottomInfo;
      }

      _screenManager2.default.prototype.render.call(this, message, bottomContent);
    }
  }]);

  return CustomScreen;
}(_screenManager2.default);

var CheckboxStatusPrompt = function (_Checkbox) {
  _inherits(CheckboxStatusPrompt, _Checkbox);

  function CheckboxStatusPrompt() {
    var _ref;

    _classCallCheck(this, CheckboxStatusPrompt);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // Bottom info updater
    var _this2 = _possibleConstructorReturn(this, (_ref = CheckboxStatusPrompt.__proto__ || Object.getPrototypeOf(CheckboxStatusPrompt)).call.apply(_ref, [this].concat(args)));

    if (!_this2.opt.status) {
      _this2.opt.status = defaultStatus;
    }

    _this2._bottomInfo = _this2.opt.status(_this2.opt.choices);
    _this2.screen = new CustomScreen(_this2.rl);
    _this2.screen.render = _this2.screen.render.bind(_this2.screen, function () {
      return _this2._bottomInfo;
    });
    return _this2;
  }

  _createClass(CheckboxStatusPrompt, [{
    key: 'toggleChoice',
    value: function toggleChoice() {
      _checkbox2.default.prototype.toggleChoice.apply(this, arguments);
      this._bottomInfo = this.opt.status(this.opt.choices);
    }
  }]);

  return CheckboxStatusPrompt;
}(_checkbox2.default);

exports.default = CheckboxStatusPrompt;
module.exports = exports['default'];
