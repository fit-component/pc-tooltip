import * as React from 'react'
import Tooltip from '../../src'
import Button from '../../../button/src'

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <Tooltip title="文字提示">
                <Button>基本用法</Button>
            </Tooltip>
        )
    }
}