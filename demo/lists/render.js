import React from 'react'
import Button from 'fit-button'
import Tooltip from 'fit-tooltip'

export default class Demo extends React.Component {
    render() {
        return (
            <Tooltip title="<div><h4>标题</h4><p>任意内容</p></div>">
                <Button>渲染复杂文本</Button>
            </Tooltip>
        )
    }
}