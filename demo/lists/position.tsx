import * as React from 'react'
import Tooltip from '../../src'
import Button from '../../../button/src'

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <Tooltip title="右上的文字提示"
                     position={{x:'right',y:'top'}}>
                <Button>在右上弹出</Button>
            </Tooltip>
        )
    }
}