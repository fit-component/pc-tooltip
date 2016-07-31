import * as React from 'react'
import Tooltip from '../../src'
import Button from '../../../button/src'

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <Tooltip title="跟随鼠标的提示文字"
                     follow={true}>
                <Button>跟随鼠标</Button>
            </Tooltip>
        )
    }
}