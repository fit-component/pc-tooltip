import * as React from 'react'
import Tooltip from '../../src'
import Button from '../../../button/src'

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <Tooltip title="可以被选中"
                     stay={true}>
                <Button>移上来,可以选中文字提示</Button>
            </Tooltip>
        )
    }
}