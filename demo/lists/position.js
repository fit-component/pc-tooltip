import React from 'react'
import Tooltip from 'fit-tooltip'
import Button from 'fit-button'

export default class Demo extends React.Component {
    render() {
        return (
            <Tooltip title="左侧的文字提示"
                     position={{x:'left',y:'left'}}>
                <Button>在左侧弹出</Button>
            </Tooltip>
        )
    }
}