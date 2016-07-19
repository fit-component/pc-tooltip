import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import $ from 'jquery'
import 'jbox'
import './index.scss'

export default class Tooltip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
        this.$dom = $(this.dom)

        let content = this.props.title
        let type = this.props.follow ? 'Mouse' : 'Tooltip'

        this.jbox = this.$dom.jBox(type, {
            content          : content,
            position         : !this.props.follow && this.props.position,
            trigger          : this.props.trigger,
            closeOnMouseleave: this.props.stay,
            zIndex           : this.props.zIndex,
            adjustPosition   : true,
            adjustTracker    : true
        })
    }

    componentWillUnmount() {
        this.jbox.destroy()
    }

    render() {
        const {className, title, render, ...others} = this.props

        const classes = classNames({
            '_namespace': true,
            [className] : className
        })

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        )
    }
}

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
}