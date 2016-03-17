import React from 'react'
import Tooltip from 'fit-tooltip'

export default class Demo extends React.Component {
    customRender() {
        return (
            <div>
                <h4>标题</h4>
                <p>任意内容</p>
            </div>
        )
    }

    render() {
        return (
            <Tooltip render={this.customRender.bind(this)}>
                渲染任意内容
            </Tooltip>
        )
    }
}