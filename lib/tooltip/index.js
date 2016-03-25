'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('jbox');

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_React$Component) {
    _inherits(Tooltip, _React$Component);

    function Tooltip(props) {
        _classCallCheck(this, Tooltip);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Tooltip, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.dom = _reactDom2.default.findDOMNode(this);
            this.$dom = (0, _jquery2.default)(this.dom);

            var content = this.props.title;
            var type = this.props.follow ? 'Mouse' : 'Tooltip';

            this.jbox = this.$dom.jBox(type, {
                content: content,
                position: !this.props.follow && this.props.position,
                trigger: this.props.trigger,
                closeOnMouseleave: this.props.stay,
                zIndex: this.props.zIndex,
                adjustPosition: true,
                adjustTracker: true
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.jbox.destroy();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var title = _props.title;
            var render = _props.render;

            var others = _objectWithoutProperties(_props, ['className', 'title', 'render']);

            var classes = (0, _classnames2.default)(_defineProperty({
                'lib-pc-tooltip-lib-tooltip': true
            }, className, className));

            return _react2.default.createElement(
                'div',
                _extends({}, others, { className: classes }),
                this.props.children
            );
        }
    }]);

    return Tooltip;
}(_react2.default.Component);

exports.default = Tooltip;


Tooltip.defaultProps = {
    // @desc 文字提示的内容
    title: null,

    // @desc 控制显示位置
    position: {
        x: 'center',
        y: 'top'
    },

    // @desc 触发方式
    trigger: 'mouseenter',

    // @desc 是否跟随鼠标
    follow: false,

    // @desc 相对于内容,在外部移动文字提示的相对位置
    outside: 'y',

    // @desc 鼠标移动到文字提示上,文字提示是否还显示
    stay: false,

    // @desc 层级
    zIndex: 999
};