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

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HIDE_EVENT = '__fit__react_tooltip_hide_event';
var REBUILD_EVENT = '__fit__react_tooltip_rebuild_event';

var dispatchEvent = function dispatchEvent(eventName) {
    // Check for ie
    // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
    if (typeof window.Event === 'function') {
        window.dispatchEvent(new window.Event(eventName));
    } else {
        var event = document.createEvent('Event');
        event.initEvent(eventName, false, true);
        window.dispatchEvent(event);
    }
};

var Tooltip = function (_Component) {
    _inherits(Tooltip, _Component);

    function Tooltip(props) {
        _classCallCheck(this, Tooltip);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).call(this, props));

        _this._bind('showTooltip', 'updateTooltip', 'hideTooltip', 'checkStatus', 'onWindowResize', 'bindClickListener', 'globalHide', 'globalRebuild');
        _this.mount = true;
        _this.state = {
            show: false,
            border: false,
            multilineCount: 0,
            x: 'NONE',
            y: 'NONE',
            place: '',
            type: '',
            effect: '',
            multiline: false,
            offset: {},
            delayHide: 0,
            delayShow: 0,
            event: props.event || null,
            placeholder: '123213'
        };
        _this.delayShowLoop = null;
        return _this;
    }

    _createClass(Tooltip, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.bindListener();
            this.setStyleHeader();

            window.removeEventListener(HIDE_EVENT, this.globalHide);
            window.addEventListener(HIDE_EVENT, this.globalHide, false);
            window.removeEventListener(REBUILD_EVENT, this.globalRebuild);
            window.addEventListener(REBUILD_EVENT, this.globalRebuild, false);
            window.removeEventListener('resize', this.onWindowResize);
            window.addEventListener('resize', this.onWindowResize, false);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            this.unbindListener();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updatePosition();
            this.bindListener();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.delayShowLoop);
            this.unbindListener();
            this.removeScrollListener();
            this.mount = false;
            window.removeEventListener(HIDE_EVENT, this.globalHide);
            window.removeEventListener(REBUILD_EVENT, this.globalRebuild);
            window.removeEventListener('resize', this.onWindowResize);
        }
    }, {
        key: 'globalHide',
        value: function globalHide() {
            if (this.mount) {
                this.hideTooltip();
            }
        }
    }, {
        key: 'globalRebuild',
        value: function globalRebuild() {
            if (this.mount) {
                this.unbindListener();
                this.bindListener();
            }
        }
    }, {
        key: '_bind',
        value: function _bind() {
            var _this2 = this;

            for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
                handlers[_key] = arguments[_key];
            }

            handlers.forEach(function (handler) {
                return _this2[handler] = _this2[handler].bind(_this2);
            });
        }

        /* TODO: optimize, bind has been trigger too many times */

    }, {
        key: 'bindListener',
        value: function bindListener() {
            var targetArray = this.getTargetArray();

            var dataEvent = undefined;
            for (var i = 0; i < targetArray.length; i++) {
                if (targetArray[i].getAttribute('currentItem') === null) {
                    targetArray[i].setAttribute('currentItem', 'false');
                }
                dataEvent = this.state.event || targetArray[i].getAttribute('data-event');
                if (dataEvent) {
                    targetArray[i].removeEventListener(dataEvent, this.checkStatus);
                    targetArray[i].addEventListener(dataEvent, this.checkStatus, false);
                } else {
                    targetArray[i].removeEventListener('mouseenter', this.showTooltip);
                    targetArray[i].addEventListener('mouseenter', this.showTooltip, false);

                    if (this.state.effect === 'float') {
                        targetArray[i].removeEventListener('mousemove', this.updateTooltip);
                        targetArray[i].addEventListener('mousemove', this.updateTooltip, false);
                    }

                    targetArray[i].removeEventListener('mouseleave', this.hideTooltip);
                    targetArray[i].addEventListener('mouseleave', this.hideTooltip, false);
                }
            }
        }
    }, {
        key: 'unbindListener',
        value: function unbindListener() {
            var targetArray = document.querySelectorAll('[data-tip]');
            var dataEvent = undefined;

            for (var i = 0; i < targetArray.length; i++) {
                dataEvent = this.state.event || targetArray[i].getAttribute('data-event');
                if (dataEvent) {
                    targetArray[i].removeEventListener(dataEvent, this.checkStatus);
                } else {
                    targetArray[i].removeEventListener('mouseenter', this.showTooltip);
                    targetArray[i].removeEventListener('mousemove', this.updateTooltip);
                    targetArray[i].removeEventListener('mouseleave', this.hideTooltip);
                }
            }
        }

        // Get all tooltip targets

    }, {
        key: 'getTargetArray',
        value: function getTargetArray() {
            var id = this.props.id;

            var targetArray = undefined;

            if (id === undefined) {
                targetArray = document.querySelectorAll('[data-tip]:not([data-for])');
            } else {
                targetArray = document.querySelectorAll('[data-tip][data-for="' + id + '"]');
            }

            return targetArray;
        }

        // listener on window resize

    }, {
        key: 'onWindowResize',
        value: function onWindowResize() {
            if (!this.mount) return;
            var targetArray = this.getTargetArray();

            for (var i = 0; i < targetArray.length; i++) {
                if (targetArray[i].getAttribute('currentItem') === 'true') {
                    // todo: timer for performance

                    var _getPosition = this.getPosition(targetArray[i]);

                    var x = _getPosition.x;
                    var y = _getPosition.y;

                    _reactDom2.default.findDOMNode(this).style.left = x + 'px';
                    _reactDom2.default.findDOMNode(this).style.top = y + 'px';
                    /* this.setState({
                     x,
                     y
                     }) */
                }
            }
        }

        //Used in customer event

    }, {
        key: 'checkStatus',
        value: function checkStatus(e) {
            e.stopPropagation();
            if (this.state.show && e.currentTarget.getAttribute('currentItem') === 'true') {
                this.hideTooltip(e);
            } else {
                e.currentTarget.setAttribute('currentItem', 'true');
                /* when click other place, the tooltip should be removed */
                window.removeEventListener('click', this.bindClickListener);
                window.addEventListener('click', this.bindClickListener, false);

                this.showTooltip(e);
                this.setUntargetItems(e.currentTarget);
            }
        }
    }, {
        key: 'setUntargetItems',
        value: function setUntargetItems(currentTarget) {
            var targetArray = this.getTargetArray();
            for (var i = 0; i < targetArray.length; i++) {
                if (currentTarget !== targetArray[i]) {
                    targetArray[i].setAttribute('currentItem', 'false');
                } else {
                    targetArray[i].setAttribute('currentItem', 'true');
                }
            }
        }
    }, {
        key: 'bindClickListener',
        value: function bindClickListener() {
            this.globalHide();
            window.removeEventListener('click', this.bindClickListener);
        }

        /**
         * When mouse enter, show update
         */

    }, {
        key: 'showTooltip',
        value: function showTooltip(e) {
            var originTooltip = e.currentTarget.getAttribute('data-tip');
            /* Detect multiline */
            var regexp = /<br\s*\/?>/;
            var multiline = e.currentTarget.getAttribute('data-multiline') ? e.currentTarget.getAttribute('data-multiline') : this.props.multiline ? this.props.multiline : false;
            var tooltipText = undefined;
            var multilineCount = 0;
            if (!multiline || multiline === 'false' || !regexp.test(originTooltip)) {
                tooltipText = originTooltip;
            } else {
                tooltipText = originTooltip.split(regexp).map(function (d, i) {
                    multilineCount += 1;
                    return _react2.default.createElement(
                        'span',
                        { key: i,
                            className: 'multi-line' },
                        d
                    );
                });
            }
            /* Define extra class */
            this.setState({
                multilineCount: multilineCount,
                place: e.currentTarget.getAttribute('data-place') ? e.currentTarget.getAttribute('data-place') : this.props.place ? this.props.place : 'top',
                type: e.currentTarget.getAttribute('data-type') ? e.currentTarget.getAttribute('data-type') : this.props.type ? this.props.type : 'dark',
                effect: e.currentTarget.getAttribute('data-effect') ? e.currentTarget.getAttribute('data-effect') : this.props.effect ? this.props.effect : 'float',
                offset: e.currentTarget.getAttribute('data-offset') ? e.currentTarget.getAttribute('data-offset') : this.props.offset ? this.props.offset : {},
                delayShow: e.currentTarget.getAttribute('data-delay-show') ? e.currentTarget.getAttribute('data-delay-show') : this.props.delayShow ? this.props.delayShow : 0,
                delayHide: e.currentTarget.getAttribute('data-delay-hide') ? e.currentTarget.getAttribute('data-delay-hide') : this.props.delayHide ? this.props.delayHide : 0,
                border: e.currentTarget.getAttribute('data-border') ? e.currentTarget.getAttribute('data-border') === 'true' : this.props.border ? this.props.border : false,
                multiline: multiline
            });

            this.addScrollListener();
            this.updateTooltip(e);
        }

        /**
         * When mouse hover, updatetooltip
         */

    }, {
        key: 'updateTooltip',
        value: function updateTooltip(e) {
            var _this3 = this;

            var _state = this.state;
            var delayShow = _state.delayShow;
            var show = _state.show;

            var delayTime = show ? 0 : parseInt(delayShow, 10);
            var eventTarget = e.currentTarget;

            clearTimeout(this.delayShowLoop);
            this.delayShowLoop = setTimeout(function () {
                if (_this3.trim(_this3.state.placeholder).length > 0) {
                    if (_this3.state.effect === 'float') {
                        _this3.setState({
                            show: true,
                            x: e.clientX,
                            y: e.clientY
                        });
                    } else if (_this3.state.effect === 'solid') {
                        var _getPosition2 = _this3.getPosition(eventTarget);

                        var x = _getPosition2.x;
                        var y = _getPosition2.y;

                        _this3.setState({
                            show: true,
                            x: x,
                            y: y
                        });
                    }
                }
            }, delayTime);
        }

        /**
         * When mouse leave, hide tooltip
         */

    }, {
        key: 'hideTooltip',
        value: function hideTooltip() {
            var _this4 = this;

            var delayHide = this.state.delayHide;

            clearTimeout(this.delayShowLoop);
            setTimeout(function () {
                _this4.setState({
                    show: false
                });
                _this4.removeScrollListener();
            }, parseInt(delayHide, 10));
        }

        /**
         * Add scroll eventlistener when tooltip show
         * or tooltip will always existed
         */

    }, {
        key: 'addScrollListener',
        value: function addScrollListener() {
            window.addEventListener('scroll', this.hideTooltip);
        }
    }, {
        key: 'removeScrollListener',
        value: function removeScrollListener() {
            window.removeEventListener('scroll', this.hideTooltip);
        }

        /**
         * Get tooltip poisition by current target
         */

    }, {
        key: 'getPosition',
        value: function getPosition(currentTarget) {
            var _this5 = this;

            var place = this.state.place;

            var node = _reactDom2.default.findDOMNode(this);
            var boundingClientRect = currentTarget.getBoundingClientRect();
            var targetTop = boundingClientRect.top;
            var targetLeft = boundingClientRect.left;
            var tipWidth = node.clientWidth;
            var tipHeight = node.clientHeight;
            var targetWidth = currentTarget.clientWidth;
            var targetHeight = currentTarget.clientHeight;
            var windoWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var x = undefined;
            var y = undefined;
            var defaultTopY = targetTop - tipHeight - 8;
            var defaultBottomY = targetTop + targetHeight + 8;
            var defaultLeftX = targetLeft - tipWidth - 6;
            var defaultRightX = targetLeft + targetWidth + 6;

            var outsideTop = function outsideTop() {
                return defaultTopY - 10 < 0;
            };

            var outsideBottom = function outsideBottom() {
                return targetTop + targetHeight + tipHeight + 25 > windowHeight;
            };

            var outsideLeft = function outsideLeft() {
                return defaultLeftX - 10 < 0;
            };

            var outsideRight = function outsideRight() {
                return targetLeft + targetWidth + tipWidth + 25 > windoWidth;
            };

            var getTopPositionY = function getTopPositionY() {
                if (outsideTop(defaultTopY) && !outsideBottom()) {
                    _this5.setState({
                        place: 'bottom'
                    });
                    return defaultBottomY;
                }

                return defaultTopY;
            };

            var getBottomPositionY = function getBottomPositionY() {
                if (outsideBottom() && !outsideTop()) {
                    _this5.setState({
                        place: 'top'
                    });
                    return defaultTopY;
                }

                return defaultBottomY;
            };

            var getLeftPositionX = function getLeftPositionX() {
                if (outsideLeft() && !outsideRight()) {
                    _this5.setState({
                        place: 'right'
                    });
                    return defaultRightX;
                }

                return defaultLeftX;
            };

            var getRightPositionX = function getRightPositionX() {
                if (outsideRight() && !outsideLeft()) {
                    _this5.setState({
                        place: 'left'
                    });
                    return defaultLeftX;
                }

                return defaultRightX;
            };

            if (place === 'top') {
                x = targetLeft - tipWidth / 2 + targetWidth / 2;
                y = getTopPositionY();
            } else if (place === 'bottom') {
                x = targetLeft - tipWidth / 2 + targetWidth / 2;
                y = getBottomPositionY();
            } else if (place === 'left') {
                x = getLeftPositionX();
                y = targetTop + targetHeight / 2 - tipHeight / 2;
            } else if (place === 'right') {
                x = getRightPositionX();
                y = targetTop + targetHeight / 2 - tipHeight / 2;
            }

            return { x: x, y: y };
        }

        /**
         * Execute in componentDidUpdate, can't put this into render() to support server rendering
         */

    }, {
        key: 'updatePosition',
        value: function updatePosition() {
            var node = _reactDom2.default.findDOMNode(this);

            var tipWidth = node.clientWidth;
            var tipHeight = node.clientHeight;
            var _state2 = this.state;
            var effect = _state2.effect;
            var place = _state2.place;
            var offset = _state2.offset;

            var offsetFromEffect = {};

            /**
             * List all situations for different placement,
             * then tooltip can judge switch to which side if window space is not enough
             * @note only support for float at the moment
             */
            var placements = ['top', 'bottom', 'left', 'right'];
            placements.forEach(function (key) {
                offsetFromEffect[key] = { x: 0, y: 0 };
            });

            if (effect === 'float') {
                offsetFromEffect.top = {
                    x: -(tipWidth / 2),
                    y: -tipHeight
                };
                offsetFromEffect.bottom = {
                    x: -(tipWidth / 2),
                    y: 15
                };
                offsetFromEffect.left = {
                    x: -(tipWidth + 15),
                    y: -(tipHeight / 2)
                };
                offsetFromEffect.right = {
                    x: 10,
                    y: -(tipHeight / 2)
                };
            }

            var xPosition = 0;
            var yPosition = 0;

            /* If user set offset attribute, we have to consider it into out position calculating */
            if (Object.prototype.toString.apply(offset) === '[object String]') {
                offset = JSON.parse(offset.toString().replace(/\'/g, '\"'));
            }
            for (var key in offset) {
                if (key === 'top') {
                    yPosition -= parseInt(offset[key], 10);
                } else if (key === 'bottom') {
                    yPosition += parseInt(offset[key], 10);
                } else if (key === 'left') {
                    xPosition -= parseInt(offset[key], 10);
                } else if (key === 'right') {
                    xPosition += parseInt(offset[key], 10);
                }
            }

            /* If our tooltip goes outside the window we want to try and change its place to be inside the window */
            var x = this.state.x;
            var y = this.state.y;
            var windoWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var getStyleLeft = function getStyleLeft(place) {
                var offsetEffectX = effect === 'solid' ? 0 : place ? offsetFromEffect[place].x : 0;
                return x + offsetEffectX + xPosition;
            };
            var getStyleTop = function getStyleTop(place) {
                var offsetEffectY = effect === 'solid' ? 0 : place ? offsetFromEffect[place].y : 0;
                return y + offsetEffectY + yPosition;
            };

            var outsideLeft = function outsideLeft(place) {
                var styleLeft = getStyleLeft(place);
                return styleLeft < 0 && x + offsetFromEffect['right'].x + xPosition <= windoWidth;
            };
            var outsideRight = function outsideRight(place) {
                var styleLeft = getStyleLeft(place);
                return styleLeft + tipWidth > windoWidth && x + offsetFromEffect['left'].x + xPosition >= 0;
            };
            var outsideTop = function outsideTop(place) {
                var styleTop = getStyleTop(place);
                return styleTop < 0 && y + offsetFromEffect['bottom'].y + yPosition + tipHeight < windowHeight;
            };
            var outsideBottom = function outsideBottom(place) {
                var styleTop = getStyleTop(place);
                return styleTop + tipHeight >= windowHeight && y + offsetFromEffect['top'].y + yPosition >= 0;
            };

            /* We want to make sure the place we switch to will not go outside either */
            var outside = function outside(place) {
                return outsideTop(place) || outsideRight(place) || outsideBottom(place) || outsideLeft(place);
            };

            /* We check each side and switch if the new place will be in bounds */
            if (outsideLeft(place)) {
                if (!outside('right')) {
                    this.setState({
                        place: 'right'
                    });
                    return;
                }
            } else if (outsideRight(place)) {
                if (!outside('left')) {
                    this.setState({
                        place: 'left'
                    });
                    return;
                }
            } else if (outsideTop(place)) {
                if (!outside('bottom')) {
                    this.setState({
                        place: 'bottom'
                    });
                    return;
                }
            } else if (outsideBottom(place)) {
                if (!outside('top')) {
                    this.setState({
                        place: 'top'
                    });
                    return;
                }
            }

            node.style.left = getStyleLeft(place) + 'px';
            node.style.top = getStyleTop(place) + 'px';
        }

        /**
         * Set style tag in header
         * Insert style by this way
         */

    }, {
        key: 'setStyleHeader',
        value: function setStyleHeader() {
            if (!document.getElementsByTagName('head')[0].querySelector('style[id="react-tooltip"]')) {
                var tag = document.createElement('style');
                tag.id = 'react-tooltip';
                document.getElementsByTagName('head')[0].appendChild(tag);
            }
        }
    }, {
        key: 'trim',
        value: function trim(string) {
            if (Object.prototype.toString.call(string) !== '[object String]') {
                return string;
            }
            var newString = string.split('');
            var firstCount = 0;
            var lastCount = 0;
            for (var i = 0; i < string.length; i++) {
                if (string[i] !== ' ') {
                    break;
                }
                firstCount++;
            }
            for (var i = string.length - 1; i >= 0; i--) {
                if (string[i] !== ' ') {
                    break;
                }
                lastCount++;
            }
            newString.splice(0, firstCount);
            newString.splice(-lastCount, lastCount);
            return newString.join('');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var children = _props.children;

            var others = _objectWithoutProperties(_props, ['className', 'children']);

            var classes = (0, _classnames2.default)(_defineProperty({
                'lib-pc-tooltip-lib-tooltip': true,
                'show': this.state.show,
                'border': this.state.border,
                'place-top': this.state.place === 'top',
                'place-bottom': this.state.place === 'bottom',
                'place-left': this.state.place === 'left',
                'place-right': this.state.place === 'right',
                'type-dark': this.state.type === 'dark',
                'type-success': this.state.type === 'success',
                'type-warning': this.state.type === 'warning',
                'type-error': this.state.type === 'error',
                'type-info': this.state.type === 'info',
                'type-light': this.state.type === 'light'
            }, className, className));

            return _react2.default.createElement(
                'div',
                _extends({}, others, { className: classes }),
                children
            );
        }
    }], [{
        key: 'hide',
        value: function hide() {
            dispatchEvent(HIDE_EVENT);
        }
    }, {
        key: 'rebuild',
        value: function rebuild() {
            dispatchEvent(REBUILD_EVENT);
        }
    }]);

    return Tooltip;
}(_react.Component);

exports.default = Tooltip;


Tooltip.defaultProps = {
    // @desc 文字提示的内容
    title: '',

    // @desc 文字提示的内容,可以渲染任意文本,当没有title时生效
    render: function render() {}
};