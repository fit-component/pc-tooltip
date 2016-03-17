import React from 'react'
import classNames from 'classnames'
import './index.scss'

export default class Tooltip extends React.Component {
    render() {
        const { className, ...others } = this.props
        const classes = classNames({
            '_namespace': true,
            [className] : className
        })

        return <div {...others} className={classes}>
            {this.props.children}
        </div>
    }
}

Tooltip.defaultProps = {
    // @desc 文字提示的内容
    title: '',

    // @desc 文字提示的内容,可以渲染任意文本,当没有title时生效
    render: ()=> {
    }
}