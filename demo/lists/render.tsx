import * as React from 'react'
import Tooltip from '../../src'
import Button from '../../../button/src'

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <Tooltip title="<div><h4>标题</h4><p>任意内容</p></div>">
                <Button>渲染复杂文本</Button>
            </Tooltip>
        )
    }
}