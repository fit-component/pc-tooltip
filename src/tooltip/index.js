import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import $ from 'jquery'
import './index.scss'
import './jbox'
import './jbox.scss'

export default class Tooltip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this)
        this.$dom = $(this.dom)

        var content = this.props.title ? this.props.title : this.props.render()

        this.$dom.jBox('Tooltip', {
            content : content,
            position: this.props.position,
            trigger : this.props.trigger
        })
    }

    render() {
        const {className, title, render, ...others} = this.props

        const classes = classNames({
            '_namespace': true,
            [className] : className
        })

        return (
            <div {...others} className={classes}>
                {this.props.children}
            </div>
        )
    }
}

Tooltip.defaultProps = {
    // @desc 文字提示的内容
    title: null,

    // @desc 文字提示的内容,回调函数返回渲染的dom结构,不设置title时才生效
    render: ()=> {
    },

    // @desc 控制显示位置
    position: {
        x: 'top',
        y: 'top'
    },

    // @desc 触发方式
    trigger: 'hover'
}