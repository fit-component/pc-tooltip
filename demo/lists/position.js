import React from 'react'
import Tooltip from 'fit-tooltip'
import Button from 'fit-button'

export default class Demo extends React.Component {
    render() {
        return (
            <Tooltip title="右上的文字提示"
                     position={{x:'right',y:'top'}}>
                <Button>在右上弹出</Button>
            </Tooltip>
        )
    }
}